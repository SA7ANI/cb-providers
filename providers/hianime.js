/**
 * hianime - Built from src/hianime/
 * Generated: 2026-06-01T14:20:20.767Z
 */
var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
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
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
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

// src/hianime/index.js
var import_cheerio_without_node_native = __toESM(require("cheerio-without-node-native"));

// src/hianime/constants.js
var MEGAPLAY_BASE = "https://megaplay.buzz";
var VIDWISH_BASE = "https://vidwish.live";
var MEGACLOUD_BASE = "https://megacloud.bloggy.click";
var TMDB_API_KEY = "1865f43a0549ca50d341dd9ab8b29f49";
var DEFAULT_HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  "Accept": "*/*",
  "Connection": "keep-alive"
};

// src/hianime/utils.js
function fetchText(_0) {
  return __async(this, arguments, function* (url, options = {}) {
    const response = yield fetch(url, __spreadValues({
      headers: __spreadValues(__spreadValues({}, DEFAULT_HEADERS), options.headers)
    }, options));
    if (!response.ok)
      throw new Error(`HTTP ${response.status} on ${url}`);
    return yield response.text();
  });
}
function fetchJson(_0) {
  return __async(this, arguments, function* (url, options = {}) {
    const text = yield fetchText(url, options);
    return JSON.parse(text);
  });
}
function getImdbId(tmdbId, mediaType) {
  return __async(this, null, function* () {
    try {
      const url = `https://api.themoviedb.org/3/${mediaType === "tv" ? "tv" : "movie"}/${tmdbId}/external_ids?api_key=${TMDB_API_KEY}`;
      const data = yield fetchJson(url);
      return data.imdb_id || null;
    } catch (e) {
      return null;
    }
  });
}
function getTmdbShowTitle(tmdbId, mediaType) {
  return __async(this, null, function* () {
    try {
      const url = `https://api.themoviedb.org/3/${mediaType === "tv" ? "tv" : "movie"}/${tmdbId}?api_key=${TMDB_API_KEY}`;
      const data = yield fetchJson(url);
      return data.name || data.title || data.original_title || null;
    } catch (e) {
      return null;
    }
  });
}
function resolveMapping(imdbId, season, episode) {
  return __async(this, null, function* () {
    try {
      const url = `https://id-mapping-api-malid.hf.space/api/resolve?id=${imdbId}&s=${season}&e=${episode}`;
      const data = yield fetchJson(url);
      if (data.error)
        return null;
      return data;
    } catch (e) {
      return null;
    }
  });
}
function searchMalId(title, mediaType) {
  return __async(this, null, function* () {
    try {
      const type = mediaType === "movie" ? "movie" : "tv";
      const url = `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(title)}&type=${type}&limit=1`;
      const data = yield fetchJson(url);
      if (data.data && data.data.length > 0) {
        return data.data[0].mal_id;
      }
      return null;
    } catch (e) {
      return null;
    }
  });
}

// src/hianime/index.js
function extractSources(apiUrl, referer, origin, serverName, animeTitle, episodeNum, type) {
  return __async(this, null, function* () {
    var _a;
    try {
      const json = yield fetchJson(apiUrl, {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "Referer": referer,
          "Origin": origin
        }
      });
      const file = (_a = json.sources) == null ? void 0 : _a.file;
      if (!file)
        return [];
      const streamTitle = `${animeTitle} - Episode ${episodeNum} (${type.toUpperCase()})`;
      const streams = [];
      streams.push({
        name: `HiAnime [${serverName}] (${type.toUpperCase()})`,
        title: streamTitle,
        url: file,
        quality: "Auto",
        headers: __spreadProps(__spreadValues({}, DEFAULT_HEADERS), {
          "Referer": `${origin}/`,
          "Origin": origin
        }),
        provider: "hianime",
        type: "m3u8"
      });
      if (json.tracks && json.tracks.length > 0) {
        const subtitles = json.tracks.filter((t) => t.file && t.kind === "captions").map((t) => ({
          url: t.file,
          name: t.label || "English",
          language: t.label ? t.label.slice(0, 3).toLowerCase() : "en"
        }));
        streams[0].subtitles = subtitles;
      }
      return streams;
    } catch (e) {
      return [];
    }
  });
}
function scrapeType(malId, episode, type, animeTitle) {
  return __async(this, null, function* () {
    const streams = [];
    const megaUrl = `${MEGAPLAY_BASE}/stream/mal/${malId}/${episode}/${type}`;
    try {
      const html = yield fetchText(megaUrl, {
        headers: { "Referer": megaUrl }
      });
      const $ = import_cheerio_without_node_native.default.load(html);
      const player = $("div.fix-area#megaplay-player");
      if (!player.length)
        return [];
      const dataId = player.attr("data-id");
      const realId = player.attr("data-realid");
      const extractions = [];
      if (dataId) {
        const apiUrl = `${MEGAPLAY_BASE}/stream/getSources?id=${dataId}&id=${dataId}`;
        extractions.push(
          extractSources(apiUrl, megaUrl, MEGAPLAY_BASE, "MegaPlay", animeTitle, episode, type)
        );
      }
      if (realId) {
        const vidPage = `${VIDWISH_BASE}/stream/s-2/${realId}/${type}`;
        extractions.push((() => __async(this, null, function* () {
          try {
            const vidHtml = yield fetchText(vidPage, { headers: { "Referer": megaUrl } });
            const $v = import_cheerio_without_node_native.default.load(vidHtml);
            const vPlayer = $v("div.fix-area#megaplay-player");
            const vDataId = vPlayer.attr("data-id");
            if (vDataId) {
              const apiUrl = `${VIDWISH_BASE}/stream/getSources?id=${vDataId}&id=${vDataId}`;
              return yield extractSources(apiUrl, vidPage, VIDWISH_BASE, "Vidwish", animeTitle, episode, type);
            }
          } catch (err) {
          }
          return [];
        }))());
      }
      if (realId) {
        const megacloudPage = `${MEGACLOUD_BASE}/stream/s-3/${realId}/${type}`;
        extractions.push((() => __async(this, null, function* () {
          try {
            const mcHtml = yield fetchText(megacloudPage, { headers: { "Referer": megaUrl } });
            const $m = import_cheerio_without_node_native.default.load(mcHtml);
            const mPlayer = $m("div.fix-area#megaplay-player");
            const mDataId = mPlayer.attr("data-id");
            if (mDataId) {
              const apiUrl = `${MEGACLOUD_BASE}/stream/getSources?id=${mDataId}&id=${mDataId}`;
              return yield extractSources(apiUrl, megacloudPage, MEGACLOUD_BASE, "MegaCloud", animeTitle, episode, type);
            }
          } catch (err) {
          }
          return [];
        }))());
      }
      const results = yield Promise.all(extractions);
      for (const res of results) {
        streams.push(...res);
      }
    } catch (e) {
    }
    return streams;
  });
}
function onSettings() {
  return __async(this, null, function* () {
    return [
      { type: "header", label: "Stream Preferences" },
      {
        type: "select",
        key: "subDub",
        label: "Audio/Subtitle Preference",
        options: [
          { label: "Sub & Dub", value: "both" },
          { label: "Sub Only", value: "sub" },
          { label: "Dub Only", value: "dub" }
        ],
        defaultValue: "both"
      }
    ];
  });
}
function getStreams(tmdbId, mediaType = "tv", season = 1, episode = 1) {
  return __async(this, null, function* () {
    try {
      let malId = null;
      let mappedEp = episode;
      let showTitle = "";
      const imdbId = yield getImdbId(tmdbId, mediaType);
      showTitle = (yield getTmdbShowTitle(tmdbId, mediaType)) || (mediaType === "movie" ? "Movie" : "Anime");
      if (!imdbId)
        return [];
      const s = mediaType === "movie" ? 1 : season;
      const e = mediaType === "movie" ? 1 : episode;
      if (mediaType === "movie") {
        malId = yield searchMalId(showTitle, "movie");
        mappedEp = 1;
      }
      if (!malId && mediaType !== "movie") {
        const mapping = yield resolveMapping(imdbId, s, e);
        if (mapping && mapping.mal_id) {
          malId = mapping.mal_id;
          mappedEp = mapping.mal_episode || episode;
        }
      }
      if (!malId)
        return [];
      const settings = globalThis.SCRAPER_SETTINGS || {};
      const preference = settings.subDub || "both";
      let allStreams = [];
      if (preference === "both") {
        const [subStreams, dubStreams] = yield Promise.all([
          scrapeType(malId, mappedEp, "sub", showTitle),
          scrapeType(malId, mappedEp, "dub", showTitle)
        ]);
        allStreams = [...subStreams, ...dubStreams];
      } else {
        allStreams = yield scrapeType(malId, mappedEp, preference, showTitle);
      }
      const seen = /* @__PURE__ */ new Set();
      return allStreams.filter((s2) => {
        if (seen.has(s2.url))
          return false;
        seen.add(s2.url);
        return true;
      });
    } catch (e) {
      return [];
    }
  });
}
module.exports = { getStreams, onSettings };
