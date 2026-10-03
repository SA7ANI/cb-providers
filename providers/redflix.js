/**
 * redflix - Built from src/redflix/
 * Generated: 2026-10-03T16:49:34.580Z
 */
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
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

// src/redflix/extractor.js
var cheerioModule = __toESM(require("cheerio-without-node-native"));

// src/redflix/constants.js
var BASE_URL = "https://redflix.biz";
var TMDB_API_KEYS = [
  "1865f43a0549ca50d341dd9ab8b29f49",
  "439c478a771f35c05022f9feabcca01c",
  "e49339e830e014e414c2b9a71b2d4f82"
];
var TMDB_BASE_URL = "https://api.themoviedb.org/3";
var DEFAULT_HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  "Referer": `${BASE_URL}/`
};

// src/redflix/utils.js
function normalizeTitle(str) {
  if (!str)
    return "";
  return str.toLowerCase().replace(/\b(the|a|an)\b/g, "").replace(/[:\-_'"`]/g, " ").replace(/[^\w\s]/g, "").replace(/\s+/g, " ").trim();
}
function httpGet(_0) {
  return __async(this, arguments, function* (url, options = {}) {
    const headers = __spreadValues(__spreadValues({}, DEFAULT_HEADERS), options.headers);
    try {
      let ax;
      if (typeof axios !== "undefined") {
        ax = axios;
      } else {
        try {
          ax = require("axios");
        } catch (e) {
        }
      }
      if (ax && typeof ax.get === "function") {
        const res2 = yield ax.get(url, { headers, timeout: options.timeout || 1e4 });
        return {
          data: res2.data,
          text: typeof res2.data === "string" ? res2.data : JSON.stringify(res2.data),
          json: typeof res2.data === "object" ? res2.data : JSON.parse(res2.data)
        };
      }
    } catch (e) {
    }
    const res = yield fetch(url, __spreadValues({ headers }, options));
    if (!res.ok) {
      throw new Error(`HTTP ${res.status} for ${url}`);
    }
    const rawText = yield res.text();
    let jsonVal = null;
    try {
      jsonVal = JSON.parse(rawText);
    } catch (e) {
    }
    return {
      data: jsonVal || rawText,
      text: rawText,
      json: jsonVal
    };
  });
}
function getMediaMetadata(_0, _1) {
  return __async(this, arguments, function* (id, mediaType, userConfig = {}) {
    var _a, _b;
    if (userConfig && (userConfig.title || userConfig.name)) {
      return {
        title: userConfig.title || userConfig.name,
        year: userConfig.year ? parseInt(userConfig.year, 10) : null,
        imdbId: userConfig.imdbId || userConfig.imdb_id || null,
        tmdbId: userConfig.tmdbId || userConfig.id || null
      };
    }
    if (typeof id === "object" && id !== null) {
      if (id.title || id.name) {
        return {
          title: id.title || id.name,
          year: id.year ? parseInt(id.year, 10) : null,
          imdbId: id.imdbId || id.imdb_id || null,
          tmdbId: id.tmdbId || id.id || null
        };
      }
    }
    const idStr = String(id || "").trim();
    const isImdb = idStr.startsWith("tt");
    const endpoint = mediaType === "tv" ? "tv" : "movie";
    for (const key of TMDB_API_KEYS) {
      try {
        let url;
        if (isImdb) {
          url = `${TMDB_BASE_URL}/find/${idStr}?api_key=${key}&external_source=imdb_id`;
        } else {
          const cleanTmdbId = idStr.replace(/^tmdb:/i, "");
          url = `${TMDB_BASE_URL}/${endpoint}/${cleanTmdbId}?api_key=${key}&append_to_response=external_ids`;
        }
        const response = yield httpGet(url, {
          headers: { "Accept": "application/json" },
          timeout: 6e3
        });
        const data = response.json || response.data;
        if (data) {
          if (isImdb) {
            const results = mediaType === "tv" ? data.tv_results : data.movie_results;
            if (results && results.length > 0) {
              const item = results[0];
              const title = mediaType === "tv" ? item.name : item.title;
              const date = mediaType === "tv" ? item.first_air_date : item.release_date;
              const year = date ? parseInt(date.split("-")[0], 10) : null;
              return { title, year, imdbId: idStr, tmdbId: item.id };
            }
          } else {
            const title = mediaType === "tv" ? data.name : data.title;
            const date = mediaType === "tv" ? data.first_air_date : data.release_date;
            const year = date ? parseInt(date.split("-")[0], 10) : null;
            const imdbId = ((_a = data.external_ids) == null ? void 0 : _a.imdb_id) || null;
            return { title, year, imdbId, tmdbId: data.id };
          }
        }
      } catch (e) {
      }
    }
    if (isImdb) {
      try {
        const cinemetaType = mediaType === "tv" ? "series" : "movie";
        const cinemetaUrl = `https://v3-cinemeta.strem.io/meta/${cinemetaType}/${idStr}.json`;
        const cRes = yield httpGet(cinemetaUrl, { headers: { "Accept": "application/json" } });
        const cData = cRes.json || cRes.data;
        if ((_b = cData == null ? void 0 : cData.meta) == null ? void 0 : _b.name) {
          const yearStr = String(cData.meta.year || "").split("\u2013")[0];
          return {
            title: cData.meta.name,
            year: yearStr ? parseInt(yearStr, 10) : null,
            imdbId: idStr,
            tmdbId: null
          };
        }
      } catch (e) {
      }
    }
    return null;
  });
}

// src/redflix/extractor.js
function loadCheerio(html) {
  if (!html)
    return null;
  const ch = cheerioModule && cheerioModule.load ? cheerioModule : cheerioModule && cheerioModule.default && cheerioModule.default.load ? cheerioModule.default : cheerioModule && cheerioModule.default || cheerioModule;
  if (typeof ch.load === "function") {
    return ch.load(html);
  }
  if (typeof ch === "function") {
    return ch(html);
  }
  try {
    const fallback = require("cheerio");
    if (typeof fallback.load === "function")
      return fallback.load(html);
    if (typeof fallback === "function")
      return fallback(html);
  } catch (e) {
  }
  throw new Error("Cheerio parser not found");
}
function searchRedFlix(baseUrl, title, year, mediaType) {
  return __async(this, null, function* () {
    const searchUrl = `${baseUrl}/search?q=${encodeURIComponent(title)}`;
    const res = yield httpGet(searchUrl);
    const html = res.text || (typeof res.data === "string" ? res.data : "");
    const $ = loadCheerio(html);
    const typeFilter = mediaType === "tv" ? "/tv/" : "/movie/";
    const candidates = [];
    $(`a[href*="${typeFilter}"]`).each((i, el) => {
      const href = $(el).attr("href");
      if (!href)
        return;
      const fullHref = href.startsWith("http") ? href : `${baseUrl}${href.startsWith("/") ? "" : "/"}${href}`;
      const text = $(el).text().trim().replace(/\s+/g, " ");
      const yMatch = text.match(/\b(19\d\d|20\d\d)\b/) || fullHref.match(/\b(19\d\d|20\d\d)\b/);
      const itemYear = yMatch ? parseInt(yMatch[1], 10) : null;
      candidates.push({ href: fullHref, text, year: itemYear });
    });
    if (candidates.length === 0)
      return null;
    const normTarget = normalizeTitle(title);
    if (year) {
      const yearMatch = candidates.find((c) => c.year === year && (normalizeTitle(c.text).includes(normTarget) || normTarget.includes(normalizeTitle(c.text))));
      if (yearMatch)
        return yearMatch;
    }
    const titleMatch = candidates.find((c) => {
      const cNorm = normalizeTitle(c.text);
      return cNorm.includes(normTarget) || normTarget.includes(cNorm);
    });
    if (titleMatch)
      return titleMatch;
    return candidates[0];
  });
}
function extractMovieStreams(pageUrl, mediaInfo) {
  return __async(this, null, function* () {
    const res = yield httpGet(pageUrl);
    const html = res.text || (typeof res.data === "string" ? res.data : "");
    const $ = loadCheerio(html);
    const streams = [];
    $("[data-url]").each((i, el) => {
      const url = $(el).attr("data-url");
      const name = $(el).attr("data-name") || $(el).text().trim() || `Server ${i + 1}`;
      if (url && url.startsWith("http")) {
        streams.push({
          name: `RedFlix [${name}]`,
          title: `RedFlix - ${mediaInfo.title} (${name})`,
          url,
          quality: "1080p",
          headers: {
            "Referer": pageUrl,
            "User-Agent": DEFAULT_HEADERS["User-Agent"]
          },
          provider: "redflix"
        });
      }
    });
    return streams;
  });
}
function extractTVStreams(baseUrl, pageUrl, season, episode, mediaInfo) {
  return __async(this, null, function* () {
    const slugMatch = pageUrl.match(/\/tv\/([^\/?#]+)/);
    if (!slugMatch)
      return [];
    const slug = slugMatch[1];
    const s = season || 1;
    const e = episode || 1;
    const epApiUrl = `${baseUrl}/tv/${slug}/episode/${s}/${e}`;
    try {
      const res = yield httpGet(epApiUrl, {
        headers: {
          "Accept": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          "Referer": pageUrl
        }
      });
      const data = res.json || res.data;
      if (data && data.success && Array.isArray(data.playerSources)) {
        const streams = [];
        data.playerSources.forEach((src, idx) => {
          if (src.url && src.url.startsWith("http")) {
            const serverName = src.name || `Server ${idx + 1}`;
            streams.push({
              name: `RedFlix [${serverName}]`,
              title: `RedFlix - ${mediaInfo.title} S${s}E${e} (${serverName})`,
              url: src.url,
              quality: "1080p",
              headers: {
                "Referer": pageUrl,
                "User-Agent": DEFAULT_HEADERS["User-Agent"]
              },
              provider: "redflix"
            });
          }
        });
        if (streams.length > 0)
          return streams;
      }
    } catch (err) {
      console.warn(`[RedFlix] Episode API error: ${err.message}`);
    }
    return yield extractMovieStreams(pageUrl, mediaInfo);
  });
}
function extractStreams(_0, _1, _2, _3) {
  return __async(this, arguments, function* (id, mediaType, season, episode, userConfig = {}) {
    const domainOverride = userConfig.baseUrl || userConfig.domain || BASE_URL;
    const baseUrl = domainOverride.startsWith("http") ? domainOverride.replace(/\/+$/, "") : `https://${domainOverride}`;
    const mediaInfo = yield getMediaMetadata(id, mediaType, userConfig);
    if (!mediaInfo || !mediaInfo.title) {
      console.warn(`[RedFlix] Could not resolve metadata for ID: ${id}`);
      return [];
    }
    console.log(`[RedFlix] Scraping "${mediaInfo.title}" (${mediaInfo.year || "N/A"}) - ${mediaType}`);
    const match = yield searchRedFlix(baseUrl, mediaInfo.title, mediaInfo.year, mediaType);
    if (!match) {
      console.warn(`[RedFlix] No match found on RedFlix for "${mediaInfo.title}"`);
      return [];
    }
    console.log(`[RedFlix] Found page: ${match.href}`);
    if (mediaType === "tv") {
      return yield extractTVStreams(baseUrl, match.href, season, episode, mediaInfo);
    } else {
      return yield extractMovieStreams(match.href, mediaInfo);
    }
  });
}

// src/redflix/index.js
function getStreams(_0, _1, _2, _3) {
  return __async(this, arguments, function* (tmdbId, mediaType, season, episode, userConfig = {}) {
    try {
      console.log(`[RedFlix] Request: ${mediaType} ${tmdbId} S:${season || "-"} E:${episode || "-"}`);
      const streams = yield extractStreams(tmdbId, mediaType, season, episode, userConfig);
      console.log(`[RedFlix] Found ${streams.length} streams`);
      return streams;
    } catch (error) {
      console.error(`[RedFlix] Error: ${error.message}`);
      return [];
    }
  });
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = { getStreams };
}
if (typeof globalThis !== "undefined") {
  globalThis.getStreams = getStreams;
}
if (typeof global !== "undefined") {
  global.getStreams = getStreams;
}
