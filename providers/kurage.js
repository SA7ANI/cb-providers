/**
 * kurage - Built from src/kurage/
 * Generated: 2026-06-02T14:17:12.167Z
 */
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

// src/kurage/constants.js
var KURAGE_BASE = "https://kurage.live";
var TMDB_API_KEY = "439c478a771f35c05022f9feabcca01c";
var ANILIST_URL = "https://graphql.anilist.co";
var ARM_BASE = "https://arm.haglund.dev/api/v2";
var CINEMETA_URL = "https://v3-cinemeta.strem.io/meta";
var DEFAULT_HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  "Accept": "application/json, text/plain, */*",
  "Accept-Language": "en-US,en;q=0.9",
  "Origin": KURAGE_BASE,
  "Referer": KURAGE_BASE + "/"
};

// src/kurage/utils.js
function fetchText(_0) {
  return __async(this, arguments, function* (url, options = {}) {
    const response = yield fetch(url, __spreadProps(__spreadValues({}, options), {
      headers: __spreadValues(__spreadValues({}, DEFAULT_HEADERS), options.headers || {})
    }));
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${url}`);
    }
    return yield response.text();
  });
}
function fetchJson(_0) {
  return __async(this, arguments, function* (url, options = {}) {
    const text = yield fetchText(url, options);
    return JSON.parse(text);
  });
}
function getSyncInfo(id, mediaType, season, episode) {
  return __async(this, null, function* () {
    const getCinemetaInfo = (imdbId2) => __async(this, null, function* () {
      const type = mediaType === "movie" ? "movie" : "series";
      const url = `${CINEMETA_URL}/${type}/${imdbId2}.json`;
      try {
        const data = yield fetchJson(url);
        const meta = data.meta;
        if (!meta)
          throw new Error("No Cinemata metadata");
        if (mediaType === "movie")
          return { date: meta.released ? meta.released.split("T")[0] : null, title: meta.name, dayIndex: 1 };
        const videos = meta.videos || [];
        const target = videos.find((v) => v.season == season && v.episode == episode);
        if (!target || !target.released)
          return { date: null, title: null, dayIndex: 1 };
        const targetDate = target.released.split("T")[0];
        const dayIndex = videos.filter((v) => v.season == season && v.released && v.released.split("T")[0] === targetDate && parseInt(v.episode) < parseInt(episode)).length + 1;
        return { date: targetDate, title: target.name || null, dayIndex };
      } catch (e) {
        return { date: null, title: null, dayIndex: 1 };
      }
    });
    const tmdbBase = `https://api.themoviedb.org/3/${mediaType === "movie" ? "movie" : "tv"}/${id}`;
    const [details, base] = yield Promise.all([
      fetchJson(tmdbBase + (mediaType === "movie" ? "" : "/external_ids") + `?api_key=${TMDB_API_KEY}`),
      fetchJson(tmdbBase + `?api_key=${TMDB_API_KEY}`)
    ]);
    let imdbId = details.imdb_id || null;
    const title = base.name || base.title || null;
    if (!imdbId) {
      try {
        const armData = yield fetchJson(`${ARM_BASE}/themoviedb?id=${id}`);
        imdbId = Array.isArray(armData) && armData.length > 0 ? armData[0].imdb : null;
      } catch (e) {
      }
    }
    if (!imdbId)
      throw new Error(`No IMDb ID found for TMDB ${id}`);
    const cMeta = yield getCinemetaInfo(imdbId);
    let finalDate = cMeta.date;
    if (mediaType === "movie" && base.release_date)
      finalDate = base.release_date;
    if (!finalDate)
      throw new Error(`Could not find release date for ID ${imdbId}`);
    return {
      imdbId,
      tmdbId: id,
      releaseDate: finalDate,
      title,
      episodeTitle: cMeta.title,
      dayIndex: cMeta.dayIndex,
      episode
    };
  });
}
function resolveAnilistId(syncInfo) {
  return __async(this, null, function* () {
    var _a, _b;
    const { releaseDate, title, episode, episodeTitle, dayIndex } = syncInfo;
    if (!releaseDate || !/^\d{4}-\d{2}-\d{2}/.test(releaseDate))
      return null;
    const query = "query($search:String){Page(perPage:20){media(search:$search,type:ANIME){id type format title{romaji english}startDate{year month day}endDate{year month day}episodes streamingEpisodes{title}}}}";
    try {
      const json = yield fetchJson(ANILIST_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, variables: { search: title } })
      });
      const candidates = ((_b = (_a = json.data) == null ? void 0 : _a.Page) == null ? void 0 : _b.media) || [];
      if (candidates.length === 0)
        return null;
      const targetDate = new Date(releaseDate);
      for (const anime of candidates) {
        const s = anime.startDate;
        const startStr = s.year && s.month && s.day ? `${s.year}-${String(s.month).padStart(2, "0")}-${String(s.day).padStart(2, "0")}` : null;
        if (!startStr)
          continue;
        const startDate = new Date(startStr);
        const diffDays = Math.ceil(Math.abs(targetDate.getTime() - startDate.getTime()) / (1e3 * 60 * 60 * 24));
        let isMatch = false;
        if (anime.format === "MOVIE" || anime.format === "SPECIAL" || anime.episodes === 1) {
          if (diffDays <= 2)
            isMatch = true;
        } else {
          const startLimit = new Date(startDate);
          startLimit.setDate(startLimit.getDate() - 2);
          if (targetDate >= startLimit) {
            if (anime.endDate && anime.endDate.year) {
              const endDate = new Date(anime.endDate.year, (anime.endDate.month || 12) - 1, anime.endDate.day || 31);
              endDate.setDate(endDate.getDate() + 2);
              if (targetDate <= endDate)
                isMatch = true;
            } else {
              isMatch = true;
            }
          }
        }
        if (isMatch) {
          const isTV = anime.format !== "MOVIE" && anime.format !== "SPECIAL" && anime.episodes !== 1;
          let episodeNum = isTV && episode ? episode : dayIndex || 1;
          const episodes = anime.streamingEpisodes || [];
          if (episodes.length > 1 && episodeTitle) {
            const cleanTarget = episodeTitle.toLowerCase().replace(/[^a-z0-9]/g, "");
            for (let j = 0; j < episodes.length; j++) {
              const cleanAl = (episodes[j].title || "").toLowerCase().replace(/[^a-z0-9]/g, "");
              if (cleanAl && (cleanAl.indexOf(cleanTarget) !== -1 || cleanTarget.indexOf(cleanAl) !== -1)) {
                episodeNum = j + 1;
                break;
              }
            }
          }
          return { alId: anime.id, episode: episodeNum };
        }
      }
    } catch (e) {
    }
    return null;
  });
}

// src/kurage/index.js
function getStreams(tmdbId, mediaType, season, episode) {
  return __async(this, null, function* () {
    try {
      const syncInfo = yield getSyncInfo(tmdbId, mediaType, season, episode);
      const resolved = yield resolveAnilistId(syncInfo);
      if (!resolved || !resolved.alId) {
        console.log(`[Kurage] Could not resolve AniList ID for TMDB ${tmdbId}`);
        return [];
      }
      const { alId, episode: alEp } = resolved;
      console.log(`[Kurage] Resolved to AniList ID: ${alId}, Episode: ${alEp}`);
      const input = {
        "0": { "json": { "id": alId } },
        "1": { "json": { "animeId": alId, "episode": alEp, "language": "sub" } },
        "2": { "json": { "animeId": alId, "episode": alEp, "language": "dub" } }
      };
      const url = `${KURAGE_BASE}/api/trpc/catalog.anilistInfo,episodes.source,episodes.source?batch=1&input=${encodeURIComponent(JSON.stringify(input))}`;
      const data = yield fetchJson(url, {
        headers: {
          "trpc-accept": "application/json",
          "x-trpc-source": "nextjs-react"
        }
      });
      const allStreams = [];
      data.forEach((r) => {
        var _a, _b, _c;
        const servers = ((_c = (_b = (_a = r.result) == null ? void 0 : _a.data) == null ? void 0 : _b.json) == null ? void 0 : _c.servers) || [];
        servers.forEach((server) => {
          const url2 = server.url.startsWith("/") ? `${KURAGE_BASE}${server.url}` : server.url;
          let extraHeaders = {};
          try {
            const urlObj = new URL(url2);
            const headersParam = urlObj.searchParams.get("headers");
            if (headersParam) {
              extraHeaders = JSON.parse(atob(headersParam));
            }
          } catch (e) {
          }
          const lang = (server.language || "sub").toUpperCase();
          allStreams.push({
            name: `[${lang}] Kurage - ${server.label}`,
            title: `${syncInfo.title} - ${alEp}`,
            url: url2,
            quality: "Auto",
            headers: __spreadValues(__spreadValues({}, DEFAULT_HEADERS), extraHeaders),
            provider: "kurage",
            type: server.sourceType || "mp4"
          });
        });
      });
      return allStreams;
    } catch (e) {
      console.error(`[Kurage] Error: ${e.message}`);
      return [];
    }
  });
}
module.exports = { getStreams };
