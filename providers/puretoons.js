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

const BASE_URL = "https://puretoons.in";
const HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
  "Referer": "https://puretoons.in/"
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

    const searchUrl = `${BASE_URL}/?s=${encodeURIComponent(meta.title.toLowerCase())}`;
    let html = "";
    try {
      html = yield httpGet(searchUrl, { headers: HEADERS, timeout: 8e3 });
    } catch (_) {
      return [];
    }

    if (!html || typeof html !== "string") return [];

    const postMatches = [...html.matchAll(/<h[23][^>]*>\s*<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)];
    if (postMatches.length === 0) return [];

    const postUrl = postMatches[0][1];
    let postHtml = "";
    try {
      postHtml = yield httpGet(postUrl, { headers: HEADERS, timeout: 8e3 });
    } catch (_) {
      return [];
    }

    if (!postHtml || typeof postHtml !== "string") return [];

    const allLinks = [...postHtml.matchAll(/<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)];
    let destUrl = "";

    for (const l of allLinks) {
      const text = l[2].replace(/<[^>]+>/g, "").trim().toLowerCase();
      let href = l[1];
      if (text.includes("watch") || text.includes("online")) {
        if (href.startsWith("/")) href = `${BASE_URL}${href}`;
        if (href.includes("main.php?url=")) {
          href = href.replace("main.php?url=", "solved/");
        }
        try {
          const redRes = yield fetch(href, {
            headers: { "User-Agent": HEADERS["User-Agent"], "Referer": postUrl },
            redirect: "manual"
          });
          const loc = redRes.headers.get("location");
          if (loc && loc.startsWith("http") && !loc.endsWith(".jpg") && !loc.endsWith(".png")) {
            destUrl = loc;
            break;
          }
        } catch (_) {}
      }
    }

    const streams = [];
    const seInfo = isTv ? ` • S${String(sNum).padStart(2, "0")}E${String(epNum).padStart(2, "0")}` : "";

    if (destUrl && (destUrl.includes("toonstream") || destUrl.includes("watchanimeworld"))) {
      let destHtml = "";
      try {
        destHtml = yield httpGet(destUrl, { headers: HEADERS, timeout: 8e3 });
      } catch (_) {}

      if (destHtml && typeof destHtml === "string") {
        const iframes = [...destHtml.matchAll(/<iframe[^>]+(?:src|data-src)="([^"]+)"/gi)];
        for (const ifr of iframes) {
          const u = ifr[1].trim();
          if (!u.startsWith("http") || u.includes("youtube.com")) continue;
          let sName = "Server";
          try {
            sName = new URL(u).hostname.replace(/^www\./, "");
          } catch (_) {}

          streams.push({
            name: `🎬 PureToons • ${sName} [Stream]${seInfo}`,
            title: `${meta.title} (${meta.year})${seInfo} - ${sName}`,
            url: u,
            quality: "1080p",
            size: "Direct",
            provider: "puretoons",
            headers: HEADERS
          });
        }
      }
    }

    return streams;
  });
}

module.exports = {
  getStreams
};
