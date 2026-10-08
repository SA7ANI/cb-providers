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
var TMDB_API_KEY = "1865f43a0549ca50d341dd9ab8b29f49";
var TMDB_BASE_URL = "https://api.tmdb.org/3";
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

function getDownloadLinks(postUrl, postTitle, mediaInfo, mediaType, season, episode) {
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
      const cleanPostFilename = postTitle.replace(/^Download\s+/i, '').trim();

      for (const link of uniqueInter.slice(0, 4)) {
        if (link.includes("nexdrive")) {
          try {
            const nexRes = yield fetch(link, { headers: __spreadProps(__spreadValues({}, HEADERS), { Referer: postUrl }) });
            if (!nexRes.ok)
              continue;
            const nexHtml = yield nexRes.text();
            const finalLinks = [...nexHtml.matchAll(/href="([^"]*(?:fastdl|vcloud|filebee|dgdrive|hubcloud|pixeldrain)[^"]*)"[^>]*>([\s\S]*?)<\/a>/gi)];
            for (const f of finalLinks) {
              const serverName = f[2].replace(/<[^>]+>/g, "").replace(/&#x?[0-9a-f]+;|&[a-z]+;/gi, "").replace(/\s+/g, " ").trim() || "Vega Server";
              const qMatch = (f[0] + " " + postTitle).match(/(2160p|4k|1080p|720p|480p)/i);
              const qStr = qMatch ? qMatch[1].toUpperCase() : "1080P";
              const sizeMatch = postTitle.match(/\[([0-9.]+\s*(?:GB|MB))\]/i);
              const sizeStr = sizeMatch ? sizeMatch[1] : "";

              const card = formatCholeCard({
                provider: "VegaMovies",
                title: (mediaInfo && mediaInfo.title) || postTitle,
                year: (mediaInfo && mediaInfo.year) || "",
                season: mediaType === "tv" ? season : null,
                episode: mediaType === "tv" ? episode : null,
                filename: cleanPostFilename,
                server: serverName,
                quality: qStr,
                size: sizeStr,
                url: f[1]
              });

              streams.push(__spreadProps(__spreadValues({}, card), {
                url: f[1],
                provider: "vegamovies",
                behaviorHints: { notWebReady: true }
              }));
            }
          } catch (e) {
          }
        } else {
          const qMatch = postTitle.match(/(2160p|4k|1080p|720p|480p)/i);
          const qStr = qMatch ? qMatch[1].toUpperCase() : "1080P";
          const sizeMatch = postTitle.match(/\[([0-9.]+\s*(?:GB|MB))\]/i);
          const sizeStr = sizeMatch ? sizeMatch[1] : "";

          const card = formatCholeCard({
            provider: "VegaMovies",
            title: (mediaInfo && mediaInfo.title) || postTitle,
            year: (mediaInfo && mediaInfo.year) || "",
            season: mediaType === "tv" ? season : null,
            episode: mediaType === "tv" ? episode : null,
            filename: cleanPostFilename,
            server: "Direct",
            quality: qStr,
            size: sizeStr,
            url: link
          });

          streams.push(__spreadProps(__spreadValues({}, card), {
            url: link,
            provider: "vegamovies",
            behaviorHints: { notWebReady: true }
          }));
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
      let mediaInfo = { title: "", year: "" };
      try {
        mediaInfo = yield getTMDBDetails(tmdbId, mediaType);
      } catch (e) {
      }
      const searchResults = yield searchVega(imdbId, mediaInfo.title);
      if (!searchResults || searchResults.length === 0)
        return [];
      const bestMatch = searchResults[0];
      const streams = yield getDownloadLinks(bestMatch.url, bestMatch.title, mediaInfo, mediaType, season, episode);
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
