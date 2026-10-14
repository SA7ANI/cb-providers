var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

const TMDB_API_KEYS = [
  "1865f43a0549ca50d341dd9ab8b29f49",
  "439c478a771f35c05022f9feabcca01c",
  "8265bd1679663a7ea12ac168da84d2e8"
];

const BASE_URL = "https://toonstream.us";
const HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
  "Referer": "https://toonstream.us/"
};

function httpGet(_0) {
  return __async(this, arguments, function* (url, options = {}) {
    const headers = options.headers || {};
    const timeout = options.timeout || 8e3;
    if (typeof axios !== "undefined" && axios && axios.get) {
      try {
        const res = yield axios.get(url, { headers, timeout });
        return res.data;
      } catch (_) {}
    }
    if (typeof require === "function") {
      try {
        const ax = require("axios");
        if (ax && ax.get) {
          const res = yield ax.get(url, { headers, timeout });
          return res.data;
        }
      } catch (_) {}
    }
    if (typeof fetch === "function") {
      const controller = typeof AbortController !== "undefined" ? new AbortController() : null;
      const timer = controller ? setTimeout(() => controller.abort(), timeout) : null;
      try {
        const res = yield fetch(url, {
          method: "GET",
          headers,
          signal: controller ? controller.signal : void 0
        });
        if (timer) clearTimeout(timer);
        const text = yield res.text();
        try {
          return JSON.parse(text);
        } catch (_) {
          return text;
        }
      } catch (e) {
        if (timer) clearTimeout(timer);
        throw e;
      }
    }
    throw new Error("No HTTP client available");
  });
}

function unpack(packed) {
  const match = packed.match(/eval\(function\(p,a,c,k,e,[rd]\)\{.*return p\}\('(.*)',(\d+),(\d+),'(.*)'\.split\('\|'\)/s);
  if (!match) return null;
  let [, p, a, c, k] = match;
  a = parseInt(a, 10);
  c = parseInt(c, 10);
  k = k.split('|');
  while (c--) {
    if (k[c]) {
      p = p.replace(new RegExp('\\b' + c.toString(a) + '\\b', 'g'), k[c]);
    }
  }
  return p;
}

function extractRubyM3u8(rubyEmbedUrl) {
  return __async(this, null, function* () {
    try {
      const codeMatch = rubyEmbedUrl.match(/(?:embed-|\/e\/)([a-zA-Z0-9]+)/);
      if (!codeMatch) return null;
      const code = codeMatch[1];
      const res = yield fetch("https://rubystm.com/dl", {
        method: "POST",
        headers: {
          "User-Agent": HEADERS["User-Agent"],
          "Content-Type": "application/x-www-form-urlencoded",
          "Referer": rubyEmbedUrl
        },
        body: new URLSearchParams({
          op: "embed",
          file_code: code,
          auto: "1",
          referer: "https://toonstream.us/"
        }),
        signal: AbortSignal.timeout(6000)
      });
      const html = yield res.text();
      const unpacked = unpack(html);
      const m3u8Match = unpacked ? unpacked.match(/https?:\/\/[^"'\s]+\.m3u8[^"'\s]*/i) : null;
      return m3u8Match ? m3u8Match[0] : null;
    } catch (_) {
      return null;
    }
  });
}

function getMediaMeta(id, mediaType = "tv") {
  return __async(this, null, function* () {
    const isImdb = typeof id === "string" && id.startsWith("tt");
    const stremioType = mediaType === "tv" || mediaType === "series" ? "series" : "movie";
    if (isImdb) {
      try {
        const d = yield httpGet(`https://v3-cinemeta.strem.io/meta/${stremioType}/${id}.json`);
        if (d && d.meta && d.meta.name) {
          return {
            imdbId: id,
            title: d.meta.name,
            year: d.meta.year || ""
          };
        }
      } catch (_) {}
    }
    const endpoint = mediaType === "movie" ? "movie" : "tv";
    for (const key of TMDB_API_KEYS) {
      try {
        const url = `https://api.tmdb.org/3/${endpoint}/${id}?api_key=${key}`;
        const data = yield httpGet(url, {
          headers: { "User-Agent": "Mozilla/5.0" },
          timeout: 8e3
        });
        if (data) {
          const title = data.name || data.title || data.original_name || data.original_title || "";
          const year = (data.first_air_date || data.release_date || "").split("-")[0];
          if (title) {
            return { imdbId: isImdb ? id : null, title, year };
          }
        }
      } catch (_) {}
    }
    return { imdbId: isImdb ? id : null, title: "", year: "" };
  });
}

function getStreams(tmdbId, mediaType = "tv", season = 1, episode = 1) {
  return __async(this, null, function* () {
    const isTv = mediaType === "tv" || mediaType === "series" || mediaType === "anime";
    const sNum = parseInt(season, 10) || 1;
    const epNum = parseInt(episode, 10) || 1;

    const meta = yield getMediaMeta(tmdbId, isTv ? "tv" : "movie");
    if (!meta || !meta.title) return [];

    const searchUrl = `${BASE_URL}/s?q=${encodeURIComponent(meta.title.toLowerCase())}`;
    let searchHtml = "";
    try {
      searchHtml = yield httpGet(searchUrl, { headers: HEADERS, timeout: 8e3 });
    } catch (_) {
      return [];
    }

    if (!searchHtml || typeof searchHtml !== "string") return [];

    let targetUrl = "";

    if (isTv) {
      const seriesMatches = [...searchHtml.matchAll(/<a[^>]+href="(\/series\/[^"]+)"[^>]*class="lnk-blk"/gi)];
      if (seriesMatches.length > 0) {
        const seriesPageUrl = `${BASE_URL}${seriesMatches[0][1]}`;
        let seriesHtml = "";
        try {
          seriesHtml = yield httpGet(seriesPageUrl, { headers: HEADERS, timeout: 8e3 });
        } catch (_) {}

        if (seriesHtml) {
          const epRegex = new RegExp(`href="(\\/episode\\/[^"]+-${sNum}x${epNum}\\/?)"`, "i");
          const epMatch = seriesHtml.match(epRegex);
          if (epMatch) {
            targetUrl = `${BASE_URL}${epMatch[1]}`;
          }
        }
      }
    } else {
      const movieMatches = [...searchHtml.matchAll(/<a[^>]+href="(\/movies\/[^"]+)"[^>]*class="lnk-blk"/gi)];
      if (movieMatches.length > 0) {
        targetUrl = `${BASE_URL}${movieMatches[0][1]}`;
      }
    }

    if (!targetUrl) return [];

    let pageHtml = "";
    try {
      pageHtml = yield httpGet(targetUrl, { headers: HEADERS, timeout: 8e3 });
    } catch (_) {
      return [];
    }

    if (!pageHtml || typeof pageHtml !== "string") return [];

    const iframeRegex = /<iframe[^>]+(?:src|data-src)="([^"]+)"/gi;
    const iframeMatches = [...pageHtml.matchAll(iframeRegex)];

    const streams = [];
    const seInfo = isTv ? ` • S${String(sNum).padStart(2, "0")}E${String(epNum).padStart(2, "0")}` : "";

    for (const m of iframeMatches) {
      const rawUrl = m[1].trim();
      if (!rawUrl.startsWith("http") || rawUrl.includes("youtube.com")) continue;

      if (rawUrl.includes("rubystm.com") || rawUrl.includes("streamruby.net")) {
        const m3u8 = yield extractRubyM3u8(rawUrl);
        if (m3u8) {
          streams.push({
            name: `🎬 ToonStream • Ruby Stream [Direct HLS]${seInfo}`,
            title: `${meta.title} (${meta.year})${seInfo} - Direct HLS`,
            url: m3u8,
            quality: "1080p",
            size: "Direct",
            provider: "toonstream",
            headers: {
              "User-Agent": HEADERS["User-Agent"],
              "Referer": "https://rubystm.com/"
            }
          });
        }
        streams.push({
          name: `🎬 ToonStream • Ruby Stream [Embed]${seInfo}`,
          title: `${meta.title} (${meta.year})${seInfo} - Ruby Embed`,
          url: rawUrl,
          quality: "1080p",
          size: "Direct",
          provider: "toonstream",
          headers: HEADERS
        });
      } else {
        let serverName = "Server";
        try {
          serverName = new URL(rawUrl).hostname.replace(/^www\./, "");
        } catch (_) {}

        streams.push({
          name: `🎬 ToonStream • ${serverName} [Embed]${seInfo}`,
          title: `${meta.title} (${meta.year})${seInfo} - ${serverName}`,
          url: rawUrl,
          quality: "1080p",
          size: "Direct",
          provider: "toonstream",
          headers: HEADERS
        });
      }
    }

    return streams;
  });
}

module.exports = {
  getStreams
};
