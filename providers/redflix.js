/**
 * redflix - Built from src/redflix/
 * Generated: 2026-10-04T17:37:00.750Z
 */
var __defProp = Object.defineProperty;
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

// src/redflix/constants.js
var BASE_URL = "https://redflix.biz";
var TMDB_API_KEYS = [
  "1865f43a0549ca50d341dd9ab8b29f49",
  "1865f43a0549ca50d341dd9ab8b29f49",
  "e49339e830e014e414c2b9a71b2d4f82"
];
var TMDB_BASE_URL = "https://api.tmdb.org/3";
var DEFAULT_HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  "Referer": `${BASE_URL}/`
};

function formatCholeCard(opt) {
  var raw = [opt.filename, opt.server, opt.quality, opt.size, opt.title].filter(Boolean).join(' ');
  var text = raw.trim();

  var res = '';
  if (/2160p|4k|uhd/i.test(text)) res = '4K UHD';
  else if (/1080p|fhd/i.test(text)) res = '1080p FHD';
  else if (/720p|hd/i.test(text)) res = '720p HD';
  else if (/480p|sd/i.test(text)) res = '480p';
  else if (opt.quality && String(opt.quality).length > 1) {
    var q = String(opt.quality).toUpperCase();
    res = q.includes('2160') || q.includes('4K') ? '4K UHD' : (q.includes('1080') ? '1080p FHD' : (q.includes('720') ? '720p HD' : q));
  } else res = '1080p FHD';

  var source = '';
  if (/remux/i.test(text)) source = 'REMUX';
  else if (/bluray|bdrip/i.test(text)) source = 'BluRay';
  else if (/web-?dl|webrip|web/i.test(text)) source = 'WEB-DL';
  else if (/hdtv/i.test(text)) source = 'HDTV';

  var codecs = [];
  if (/hevc|x265|h\.?265/i.test(text)) codecs.push('HEVC');
  else if (/x264|h\.?264|avc/i.test(text)) codecs.push('x264');
  if (/10-?bit/i.test(text)) codecs.push('10-bit');

  var hdr = [];
  if (/dolby\s*vision|\bdv\b/i.test(text)) {
    var dvP = text.match(/profile\s*([0-9]+)/i);
    hdr.push(dvP ? ('Dolby Vision Profile ' + dvP[1]) : 'Dolby Vision');
  }
  if (/hdr10\+/i.test(text)) hdr.push('HDR10+');
  else if (/hdr10/i.test(text)) hdr.push('HDR10');
  else if (/\bhdr\b/i.test(text)) hdr.push('HDR');

  var audio = [];
  var hasAtmos = /atmos/i.test(text);
  var hasTrueHD = /truehd/i.test(text);
  var hasDTSHD = /dts-?hd(\s*ma)?/i.test(text);
  var hasDTS = /dts/i.test(text);
  var hasDDP = /ddp|dd\+|eac3/i.test(text);
  var hasDD = /dd|ac3/i.test(text);
  var has71 = /7\.1/i.test(text);
  var has51 = /5\.1/i.test(text);

  if (hasAtmos && hasTrueHD) audio.push('Dolby Atmos TrueHD' + (has71 ? ' 7.1' : (has51 ? ' 5.1' : '')));
  else if (hasAtmos) audio.push('Dolby Atmos' + (has71 ? ' 7.1' : (has51 ? ' 5.1' : '')));
  else if (hasTrueHD) audio.push('TrueHD' + (has71 ? ' 7.1' : (has51 ? ' 5.1' : '')));
  else if (hasDTSHD) audio.push('DTS-HD MA' + (has71 ? ' 7.1' : (has51 ? ' 5.1' : '')));
  else if (hasDTS) audio.push('DTS' + (has51 ? ' 5.1' : ''));
  else if (hasDDP) audio.push('DDP 5.1');
  else if (hasDD) audio.push('DD 5.1');
  else if (/aac/i.test(text)) audio.push('AAC');

  var langs = [];
  if (/\bhindi\b|\bhin\b/i.test(text)) langs.push('IN Hindi Dub');
  if (/\btamil\b|\btam\b/i.test(text)) langs.push('IN Tamil');
  if (/\btelugu\b|\btel\b/i.test(text)) langs.push('IN Telugu');
  if (/\benglish\b|\beng\b/i.test(text)) langs.push('GB English');
  if (/\bjapanese\b|\bjap\b/i.test(text)) langs.push('JP Japanese');
  if (/multi[- ]?audio/i.test(text)) langs.push('🌐 Multi-Audio');
  else if (/dual[- ]?audio/i.test(text)) langs.push('🌐 Dual-Audio');
  var uniqueLangs = Array.from(new Set(langs));

  var sizeMatch = text.match(/(?:💾\s*|\[|\b)([0-9.]+ ?[GM]B)(?:\]|\b)/i);
  var size = sizeMatch ? sizeMatch[1].toUpperCase() : (opt.size || '');

  var server = opt.server || '';
  if (!server) {
    var grpMatch = text.match(/-([a-zA-Z0-9_]+)(?:\.[a-z]{3})?$/i);
    if (grpMatch && grpMatch[1].length > 2 && grpMatch[1].length < 15) server = grpMatch[1];
  }

  var filename = (opt.filename || '').trim();
  if (!filename || filename === opt.title) {
    var baseTitle = (opt.title || 'Video').replace(/[^a-zA-Z0-9]+/g, '.');
    var yr = opt.year ? ('.' + opt.year) : '';
    var se = (opt.season && opt.episode) ? ('.S' + String(opt.season).padStart(2, '0') + 'E' + String(opt.episode).padStart(2, '0')) : '';
    var r = res ? ('.' + res.replace(' ', '.')) : '';
    var s = source ? ('.' + source) : '';
    var c = codecs.length ? ('.' + codecs.join('.')) : '';
    var a = audio.length ? ('.' + audio[0].replace(/[^a-zA-Z0-9]+/g, '.')) : '';
    var g = server ? ('-' + server) : ('-' + (opt.provider || 'Release'));
    filename = baseTitle + yr + se + r + s + c + a + g + '.mkv';
  }

  var nameParts = [];
  if (opt.latency) nameParts.push('🟢 FAST (' + opt.latency + 'ms)');
  nameParts.push(opt.provider || 'Stream');
  if (server) nameParts.push('🏷️ ' + server);
  if (res) nameParts.push(res);
  if (hdr.length) nameParts.push(hdr[0].includes('Vision') ? 'DV' : hdr[0]);
  if (audio.length) nameParts.push(audio[0].includes('Atmos') ? 'Atmos' : audio[0]);
  var nameLine = nameParts.join(' • ');

  var specTags = [res, source].concat(codecs).filter(Boolean);
  var seasonEp = (opt.season && opt.episode) ? (' • S' + String(opt.season).padStart(2, '0') + 'E' + String(opt.episode).padStart(2, '0')) : '';
  var line1 = '🎬 ' + (opt.title || 'Unknown') + (opt.year ? (' (' + opt.year + ')') : '') + seasonEp + (specTags.length ? (' [' + specTags.join(' • ') + ']') : '');
  var line2 = '📄 ' + filename;
  var av = hdr.concat(audio);
  var line3 = av.length ? ('💎 ' + av.join(' • ')) : '';
  var line4 = uniqueLangs.length ? ('🌐 ' + uniqueLangs.join(' • ')) : '';

  var meta = [];
  if (size) meta.push('📦 ' + size);
  if (server) meta.push('🏷️ ' + server);
  meta.push('🔗 ' + (opt.provider || 'Stream'));
  var line5 = meta.join(' • ');

  var body = [line1, line2, line3, line4, line5].filter(Boolean).join('\n');
  return {
    name: nameLine,
    title: body,
    quality: res.toLowerCase().replace(' uhd', '').replace(' fhd', '').replace(' hd', '')
  };
}

// src/redflix/utils.js
function normalizeTitle(str) {
  if (!str)
    return "";
  return str.toLowerCase().replace(/\b(the|a|an)\b/g, "").replace(/[:\-_'"`]/g, " ").replace(/[^\w\s]/g, "").replace(/\s+/g, " ").trim();
}
function httpGet(_0) {
  return __async(this, arguments, function* (url, options = {}) {
    const headers = __spreadValues(__spreadValues({}, DEFAULT_HEADERS), options.headers);
    const res = yield fetch(url, __spreadValues({
      headers
    }, options));
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
        const res = yield fetch(url, {
          headers: { "Accept": "application/json", "User-Agent": "Mozilla/5.0" }
        });
        if (!res.ok)
          continue;
        const data = yield res.json();
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
        const cRes = yield fetch(cinemetaUrl, { headers: { "Accept": "application/json", "User-Agent": "Mozilla/5.0" } });
        const cData = yield cRes.json();
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
var cheerioLib = null;
try {
  const raw = require("cheerio-without-node-native");
  cheerioLib = raw && raw.default && (typeof raw.default.load === "function" || typeof raw.default === "function") ? raw.default : raw;
} catch (e) {
}
function loadCheerio(html) {
  if (!html)
    return null;
  let ch = cheerioLib;
  if (!ch) {
    try {
      const raw = require("cheerio-without-node-native");
      ch = raw && raw.default && (typeof raw.default.load === "function" || typeof raw.default === "function") ? raw.default : raw;
    } catch (e) {
    }
  }
  if (ch && typeof ch.load === "function")
    return ch.load(html);
  if (typeof ch === "function")
    return ch(html);
  return null;
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
        const card = formatCholeCard({
          provider: "RedFlix",
          title: mediaInfo.title,
          year: mediaInfo.year || "",
          filename: `${mediaInfo.title} ${mediaInfo.year || ''} [${name}]`.trim(),
          server: name,
          quality: "1080p",
          url
        });
        streams.push(__spreadProps(__spreadValues({}, card), {
          url,
          headers: {
            "Referer": pageUrl,
            "User-Agent": DEFAULT_HEADERS["User-Agent"]
          },
          provider: "redflix"
        }));
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
            const card = formatCholeCard({
              provider: "RedFlix",
              title: mediaInfo.title,
              year: mediaInfo.year || "",
              season: s,
              episode: e,
              filename: `${mediaInfo.title} S${String(s).padStart(2, '0')}E${String(e).padStart(2, '0')} [${serverName}]`.trim(),
              server: serverName,
              quality: "1080p",
              url: src.url
            });
            streams.push(__spreadProps(__spreadValues({}, card), {
              url: src.url,
              headers: {
                "Referer": pageUrl,
                "User-Agent": DEFAULT_HEADERS["User-Agent"]
              },
              provider: "redflix"
            }));
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
