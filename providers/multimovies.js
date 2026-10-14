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

const BASE_URL = "https://multimovies.garden";
const HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
  "Referer": "https://multimovies.garden/"
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

function getMediaMeta(id, mediaType = "movie") {
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
    const endpoint = mediaType === "tv" || mediaType === "series" ? "tv" : "movie";
    for (const key of TMDB_API_KEYS) {
      try {
        const url = `https://api.tmdb.org/3/${endpoint}/${id}?api_key=${key}&append_to_response=external_ids`;
        const data = yield httpGet(url, {
          headers: { "User-Agent": "Mozilla/5.0" },
          timeout: 8e3
        });
        if (data) {
          const imdbId = (data.external_ids && data.external_ids.imdb_id) || (String(id).startsWith("tt") ? id : null);
          const title = data.title || data.name || data.original_title || data.original_name || "";
          const year = (data.release_date || data.first_air_date || "").split("-")[0];
          if (title) {
            return { imdbId, title, year };
          }
        }
      } catch (_) {}
    }
    return { imdbId: isImdb ? id : null, title: "", year: "" };
  });
}

function getStreams(tmdbId, mediaType = "movie", season = 1, episode = 1) {
  return __async(this, null, function* () {
    const isTv = mediaType === "tv" || mediaType === "series";
    const sNum = parseInt(season, 10) || 1;
    const epNum = parseInt(episode, 10) || 1;

    const meta = yield getMediaMeta(tmdbId, isTv ? "tv" : "movie");
    if (!meta || !meta.title) return [];

    const searchUrl = `${BASE_URL}/search?q=${encodeURIComponent(meta.title.toLowerCase())}`;
    let html = "";
    try {
      html = yield httpGet(searchUrl, { headers: HEADERS, timeout: 8e3 });
    } catch (_) {
      return [];
    }

    if (!html || typeof html !== "string") return [];

    const targetType = isTv ? "tv" : "movie";
    const matches = [...html.matchAll(/data-save-title="([^"]+)"/gi)];
    let selected = null;

    for (const m of matches) {
      try {
        const data = JSON.parse(m[1].replace(/&quot;/g, '"'));
        if (data.type === targetType) {
          if (!selected) selected = data;
          if (data.year && meta.year && String(data.year) === String(meta.year)) {
            selected = data;
            break;
          }
        }
      } catch (_) {}
    }

    if (!selected || !selected.url) return [];

    let watchUrl = `${BASE_URL}${selected.url}`;
    if (isTv) {
      watchUrl = `${BASE_URL}${selected.url}/season/${sNum}/episode/${epNum}`;
    }

    let pageHtml = "";
    try {
      pageHtml = yield httpGet(watchUrl, { headers: HEADERS, timeout: 8e3 });
    } catch (_) {
      return [];
    }

    if (!pageHtml || typeof pageHtml !== "string") return [];

    const chipRegex = /<button[^>]+class="server-chip[^"]*"[^>]*data-url="([^"]+)"[^>]*>([\s\S]*?)<\/button>/gi;
    const chipMatches = [...pageHtml.matchAll(chipRegex)];

    const streams = [];
    for (const c of chipMatches) {
      let streamUrl = c[1];
      while (streamUrl.includes("&amp;")) {
        streamUrl = streamUrl.replace(/&amp;/g, "&");
      }
      streamUrl = streamUrl.trim();
      if (!streamUrl.startsWith("http")) continue;

      const chipContent = c[2];
      const serverNameMatch = chipContent.match(/class="server-name">([^<]+)<\/span>/i);
      const badgeMatch = chipContent.match(/class="server-badge">([^<]+)<\/span>/i);

      const serverName = serverNameMatch ? serverNameMatch[1].trim() : "Server";
      const badge = badgeMatch ? badgeMatch[1].trim() : "HD";

      let quality = "1080p";
      const badgeLower = badge.toLowerCase();
      if (badgeLower.includes("4k") || badgeLower.includes("2160")) {
        quality = "4k";
      } else if (badgeLower.includes("720")) {
        quality = "720p";
      } else if (badgeLower.includes("480")) {
        quality = "480p";
      }

      const seInfo = isTv ? ` • S${String(sNum).padStart(2, "0")}E${String(epNum).padStart(2, "0")}` : "";
      const streamName = `🎬 MultiMovies • ${serverName} [${badge}]${seInfo}`;

      streams.push({
        name: streamName,
        title: `${meta.title} (${meta.year})${seInfo} - ${serverName}`,
        url: streamUrl,
        quality: quality,
        size: "Direct",
        provider: "multimovies",
        headers: {
          "User-Agent": HEADERS["User-Agent"],
          "Referer": BASE_URL + "/"
        }
      });
    }

    return streams;
  });
}

module.exports = {
  getStreams
};
