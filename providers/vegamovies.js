var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
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
var TMDB_API_KEY = "439c478a771f35c05022f9feabcca01c";
var TMDB_BASE_URL = "https://api.themoviedb.org/3";
var MAIN_URL = "https://vegamovies.gallery";
var HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  "Referer": `${MAIN_URL}/`
};
function getTMDBDetails(tmdbId, mediaType) {
  return __async(this, null, function* () {
    var _a, _b;
    if (typeof tmdbId === "string" && tmdbId.startsWith("tt")) {
      try {
        const findUrl = `${TMDB_BASE_URL}/find/${tmdbId}?api_key=${TMDB_API_KEY}&external_source=imdb_id`;
        const res = yield fetch(findUrl, { headers: { "Accept": "application/json" } });
        if (res.ok) {
          const findData = yield res.json();
          const results = mediaType === "tv" ? findData.tv_results : findData.movie_results;
          if (results && results.length > 0) {
            const item = results[0];
            return {
              title: mediaType === "tv" ? item.name : item.title,
              year: (_a = mediaType === "tv" ? item.first_air_date : item.release_date) == null ? void 0 : _a.split("-")[0]
            };
          }
        }
      } catch (e) {
      }
    }
    const endpoint = mediaType === "tv" ? "tv" : "movie";
    const url = `${TMDB_BASE_URL}/${endpoint}/${tmdbId}?api_key=${TMDB_API_KEY}`;
    const response = yield fetch(url, { method: "GET", headers: { "Accept": "application/json" } });
    if (!response.ok)
      throw new Error(`TMDB error: ${response.status}`);
    const data = yield response.json();
    return {
      title: mediaType === "tv" ? data.name : data.title,
      year: (_b = mediaType === "tv" ? data.first_air_date : data.release_date) == null ? void 0 : _b.split("-")[0]
    };
  });
}
function searchVega(imdbId, title) {
  return __async(this, null, function* () {
    const queriesToTry = [];
    if (imdbId && imdbId.startsWith("tt"))
      queriesToTry.push(imdbId);
    if (title)
      queriesToTry.push(title);
    for (const q of queriesToTry) {
      try {
        const searchUrl = `${MAIN_URL}/ts-search.php?q=${encodeURIComponent(q)}&page=1`;
        const response = yield fetch(searchUrl, { headers: HEADERS });
        if (!response.ok)
          continue;
        const data = yield response.json();
        if (data && Array.isArray(data.hits) && data.hits.length > 0) {
          return data.hits.map((h) => ({
            url: h.document.permalink.startsWith("http") ? h.document.permalink : `${MAIN_URL}${h.document.permalink}`,
            title: h.document.post_title
          }));
        }
      } catch (e) {
      }
    }
    return [];
  });
}
function getDownloadLinks(postUrl, postTitle) {
  return __async(this, null, function* () {
    try {
      const response = yield fetch(postUrl, { headers: HEADERS });
      if (!response.ok)
        return [];
      const html = yield response.text();
      const intermediateRegex = /href="([^"]*(?:nexdrive|hubcloud|fast-dl|v-cloud|pixeldrain|drive)[^"]*)"/gi;
      const matches = [...html.matchAll(intermediateRegex)].map((m) => m[1]);
      const uniqueInter = [...new Set(matches)];
      const streams = [];
      for (const link of uniqueInter.slice(0, 4)) {
        if (link.includes("nexdrive")) {
          try {
            const nexRes = yield fetch(link, { headers: __spreadProps(__spreadValues({}, HEADERS), { Referer: postUrl }) });
            if (!nexRes.ok)
              continue;
            const nexHtml = yield nexRes.text();
            const finalLinks = [...nexHtml.matchAll(/href="([^"]*(?:fastdl|vcloud|filebee|dgdrive|hubcloud|pixeldrain)[^"]*)"[^>]*>([\s\S]*?)<\/a>/gi)];
            for (const f of finalLinks) {
              const serverName = f[2].replace(/<[^>]+>/g, "").trim() || "Vega Server";
              const qMatch = (f[0] + " " + postTitle).match(/(2160p|4k|1080p|720p|480p)/i);
              const qStr = qMatch ? qMatch[1].toUpperCase() : "1080P";
              const qNum = qStr.includes("2160") || qStr.includes("4K") ? 2160 : (qStr.includes("1080") ? 1080 : (qStr.includes("720") ? 720 : 480));
              const sizeMatch = postTitle.match(/\[([0-9.]+\s*(?:GB|MB))\]/i);
              const sizeStr = sizeMatch ? sizeMatch[1] : "";
              streams.push({
                name: `VegaMovies [${serverName}] - ${qStr}`,
                url: f[1],
                quality: qNum,
                size: sizeStr,
                title: `${postTitle.slice(0, 50)} - [${serverName}]`,
                behaviorHints: { notWebReady: true }
              });
            }
          } catch (e) {
          }
        } else {
          const qMatch = postTitle.match(/(2160p|4k|1080p|720p|480p)/i);
          const qStr = qMatch ? qMatch[1].toUpperCase() : "1080P";
          const qNum = qStr.includes("2160") || qStr.includes("4K") ? 2160 : (qStr.includes("1080") ? 1080 : (qStr.includes("720") ? 720 : 480));
          streams.push({
            name: `VegaMovies [Direct] - ${qStr}`,
            url: link,
            quality: qNum,
            title: `${postTitle.slice(0, 50)} - [Direct]`,
            behaviorHints: { notWebReady: true }
          });
        }
      }
      return streams;
    } catch (e) {
      return [];
    }
  });
}
function getStreams(tmdbId, mediaType = "movie", season = null, episode = null) {
  return __async(this, null, function* () {
    try {
      let imdbId = typeof tmdbId === "string" && tmdbId.startsWith("tt") ? tmdbId : null;
      let title = "";
      try {
        const mediaInfo = yield getTMDBDetails(tmdbId, mediaType);
        title = mediaInfo.title;
      } catch (e) {
      }
      const searchResults = yield searchVega(imdbId, title);
      if (!searchResults || searchResults.length === 0)
        return [];
      const bestMatch = searchResults[0];
      const streams = yield getDownloadLinks(bestMatch.url, bestMatch.title);
      return streams.map((s) => __spreadProps(__spreadValues({}, s), { type: mediaType }));
    } catch (e) {
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
