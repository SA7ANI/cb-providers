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
  var raw = [(opt.filename || ''), (opt.rawText || ''), (opt.server || ''), (opt.quality || ''), (opt.size || ''), (opt.title || '')].join(' ');
  var text = raw.trim();
  var cleanText = text.replace(/4khdhub/gi, '').replace(/hdhub4u/gi, '');

  var res = '';
  var qCheck = opt.quality ? String(opt.quality).trim() : '';
  if (/\b(?:2160p|4k|uhd)\b/i.test(qCheck)) res = '4K UHD';
  else if (/\b(?:1080p|fhd)\b/i.test(qCheck)) res = '1080p FHD';
  else if (/\b(?:720p|hd)\b/i.test(qCheck)) res = '720p HD';
  else if (/\b(?:480p|sd)\b/i.test(qCheck)) res = '480p';
  else if (/\b(?:2160p|4k|uhd)\b/i.test(cleanText)) res = '4K UHD';
  else if (/\b(?:1080p|fhd)\b/i.test(cleanText)) res = '1080p FHD';
  else if (/\b(?:720p|hd)\b/i.test(cleanText)) res = '720p HD';
  else if (/\b(?:480p|sd)\b/i.test(cleanText)) res = '480p';
  else res = qCheck ? qCheck.toUpperCase() : '1080p FHD';

  var source = '';
  if (/\bremux\b/i.test(text)) source = 'REMUX';
  else if (/\b(?:bluray|bdrip|brrip)\b/i.test(text)) source = 'BluRay';
  else if (/\b(?:web-?dl|webrip|web)\b/i.test(text)) source = 'WEB-DL';
  else if (/\bhdtv\b/i.test(text)) source = 'HDTV';

  var codecs = [];
  if (/\b(?:hevc|x265|h\.?265)\b/i.test(text)) codecs.push('HEVC');
  else if (/\b(?:x264|h\.?264|avc)\b/i.test(text)) codecs.push('x264');
  if (/\b10-?bit\b/i.test(text)) codecs.push('10-bit');

  var hdr = [];
  if (/\b(?:dolby\s*vision|dv)\b/i.test(text)) hdr.push('Dolby Vision');
  if (/\bhdr10\+\b/i.test(text)) hdr.push('HDR10+');
  else if (/\b(?:hdr10|hdr)\b/i.test(text)) hdr.push('HDR');

  var audio = [];
  var hasAtmos = /\b(?:atmos|ddpa)\b/i.test(text);
  var hasTrueHD = /\btruehd\b/i.test(text);
  var hasDTSHD = /\bdts-?hd(?:\s*ma)?\b/i.test(text);
  var hasDTS = /\bdts\b/i.test(text);
  var hasDDP = /\b(?:ddp|dd\+|eac3)\b/i.test(text);
  var hasDD = /\b(?:dd|ac3)\b/i.test(text);
  var has71 = /7\.1/i.test(text);
  var has51 = /5\.1/i.test(text);

  if (hasAtmos) audio.push('Dolby Atmos' + (has71 ? ' 7.1' : (has51 ? ' 5.1' : '')));
  else if (hasTrueHD) audio.push('TrueHD' + (has71 ? ' 7.1' : (has51 ? ' 5.1' : '')));
  else if (hasDTSHD) audio.push('DTS-HD MA' + (has71 ? ' 7.1' : (has51 ? ' 5.1' : '')));
  else if (hasDTS) audio.push('DTS' + (has51 ? ' 5.1' : ''));
  else if (hasDDP) audio.push('DDP 5.1');
  else if (hasDD) audio.push('DD 5.1');
  else if (/\baac\b/i.test(text)) audio.push('AAC');

  var langs = [];
  if (/\b(?:hindi|hin)\b/i.test(text)) langs.push('🇮🇳 Hindi');
  if (/\b(?:tamil|tam)\b/i.test(text)) langs.push('🇮🇳 Tamil');
  if (/\b(?:telugu|tel)\b/i.test(text)) langs.push('🇮🇳 Telugu');
  if (/\b(?:english|eng)\b/i.test(text)) langs.push('🇬🇧 English');
  if (/\b(?:korean|kor)\b/i.test(text)) langs.push('🇰🇷 Korean');
  if (/\b(?:japanese|jap|jpn)\b/i.test(text)) langs.push('🇯🇵 Japanese');
  if (/\bdual[- ]?audio\b/i.test(text)) langs.push('🌐 Dual-Audio');
  if (/\bmulti[- ]?audio\b/i.test(text)) langs.push('🌐 Multi-Audio');
  if (langs.length === 0 && opt.defaultLang) {
    langs.push(opt.defaultLang);
  }
  var uniqueLangs = Array.from(new Set(langs));

  var sizeMatch = text.match(/(?:💾\s*|\[|\b)([0-9.]+\s*[GM]B)(?:\]|\b)/i);
  var rawSize = opt.size || (sizeMatch ? sizeMatch[1] : '');
  var size = rawSize ? rawSize.replace(/([0-9.]+)\s*([GM]B)/i, '$1 $2').toUpperCase() : '';

  var server = opt.server || '';
  if (!server) {
    var grpMatch = text.match(/-([a-zA-Z0-9_]+)(?:\.[a-z]{3})?$/i);
    if (grpMatch && grpMatch[1].length > 2 && grpMatch[1].length < 15) server = grpMatch[1];
  }

  var nameParts = [];
  if (opt.latency) nameParts.push('🟢 FAST (' + opt.latency + 'ms)');
  nameParts.push(opt.provider || 'Stream');
  if (server) nameParts.push('🏷️ ' + server);
  if (res) nameParts.push(res);
  if (source) nameParts.push(source);
  if (codecs.length) nameParts.push(codecs.join(' '));
  if (hdr.length) nameParts.push(hdr.join(' '));
  if (audio.length) nameParts.push(audio[0]);
  if (uniqueLangs.length) {
    var dualTag = uniqueLangs.find(function(l) { return l.indexOf('Dual') !== -1 || l.indexOf('Multi') !== -1; });
    if (dualTag) nameParts.push(dualTag);
    else nameParts.push(uniqueLangs.slice(0, 2).join(' + '));
  }
  if (opt.seeders !== undefined && opt.seeders !== null && opt.seeders !== '') {
    nameParts.push('🌱 ' + opt.seeders);
  }
  var nameLine = nameParts.join(' • ');

  var filename = (opt.filename || '').trim();
  if (!filename || filename === opt.title) {
    var baseTitle = (opt.title || 'Video').replace(/[^a-zA-Z0-9]+/g, '.');
    var yr = opt.year ? ('.' + opt.year) : '';
    var se = (opt.season && opt.episode) ? ('.S' + String(opt.season).padStart(2, '0') + 'E' + String(opt.episode).padStart(2, '0')) : '';
    var r = res ? ('.' + res.replace(/\s+/g, '.')) : '';
    var s = source ? ('.' + source) : '';
    var c = codecs.length ? ('.' + codecs.join('.')) : '';
    var a = audio.length ? ('.' + audio[0].replace(/[^a-zA-Z0-9]+/g, '.')) : '';
    var g = server ? ('-' + server.replace(/[\s\-_]+/g, '')) : ('-' + (opt.provider || 'Release'));
    filename = baseTitle + yr + se + r + s + c + a + g + '.mkv';
  }

  var specTags = [res, source].concat(codecs).filter(Boolean);
  var seasonEp = (opt.season && opt.episode) ? (' • S' + String(opt.season).padStart(2, '0') + 'E' + String(opt.episode).padStart(2, '0')) : '';
  var line1 = '🎬 ' + (opt.title || 'Unknown') + (opt.year ? (' (' + opt.year + ')') : '') + seasonEp + (specTags.length ? (' [' + specTags.join(' • ') + ']') : '');
  var line2 = '📄 ' + filename;
  var av = hdr.concat(audio);
  var line3 = av.length ? ('💎 ' + av.join(' • ')) : '';
  var line4 = uniqueLangs.length ? ('🌐 ' + uniqueLangs.join(' • ')) : '';

  var meta = [];
  if (size) meta.push('📦 ' + size);
  if (opt.seeders !== undefined && opt.seeders !== null && opt.seeders !== '') meta.push('🟢 ' + opt.seeders + ' Seeders');
  if (server) meta.push('🏷️ ' + server);
  meta.push('🔗 ' + (opt.provider || 'Stream'));
  var line5 = meta.join(' • ');

  var body = [line1, line2, line3, line4, line5].filter(Boolean).join('\n');

  var qualitySlug = '1080p';
  if (res.indexOf('4K') !== -1 || res.indexOf('2160') !== -1) qualitySlug = '4k';
  else if (res.indexOf('1080') !== -1) qualitySlug = '1080p';
  else if (res.indexOf('720') !== -1) qualitySlug = '720p';
  else if (res.indexOf('480') !== -1) qualitySlug = '480p';

  return {
    name: nameLine,
    title: body,
    quality: qualitySlug,
    size: size || ''
  };
}

async function getDownloadLinks(postUrl, postTitle, mediaInfo, mediaType, season, episode) {
  try {
    const response = await fetch(postUrl, { headers: HEADERS });
    if (!response.ok)
      return [];
    const html = await response.text();

    const linkRegex = /href="([^"]*(?:nexdrive|hubcloud|fast-dl|v-cloud|pixeldrain|drive)[^"]*)"/gi;
    let match;
    const downloadBlocks = [];
    while ((match = linkRegex.exec(html)) !== null) {
      const link = match[1];
      const preText = html.slice(Math.max(0, match.index - 800), match.index);
      const headings = [...preText.matchAll(/<(?:h[1-6]|p)[^>]*>([\s\S]*?(?:480p|720p|1080p|2160p|4k)[\s\S]*?)<\/(?:h[1-6]|p)>/gi)];
      let bestHeading = postTitle;
      if (headings.length > 0) {
        const rawH = headings[headings.length - 1][1].replace(/<[^>]+>/g, '').replace(/&#x?[0-9a-f]+;|&[a-z]+;/gi, '').trim();
        const lines = rawH.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
        const qualLine = lines.find(l => /(?:480p|720p|1080p|2160p|4k)/i.test(l));
        bestHeading = qualLine || lines[lines.length - 1] || postTitle;
      }
      downloadBlocks.push({ url: link, heading: bestHeading });
    }

    const seen = new Set();
    const uniqueBlocks = [];
    for (const b of downloadBlocks) {
      if (!seen.has(b.url)) {
        seen.add(b.url);
        uniqueBlocks.push(b);
      }
    }

    const streams = [];
    for (const block of uniqueBlocks.slice(0, 6)) {
      const link = block.url;
      const blockTitle = block.heading;
      const qMatch = blockTitle.match(/(2160p|4k|1080p|720p|480p)/i);
      const qStr = qMatch ? qMatch[1].toUpperCase() : "1080P";
      const sizeMatch = blockTitle.match(/\[([0-9.]+\s*(?:GB|MB))\]/i);
      const sizeStr = sizeMatch ? sizeMatch[1] : "";

      if (link.includes("nexdrive")) {
        try {
          const nexRes = await fetch(link, { headers: { ...HEADERS, Referer: postUrl } });
          if (!nexRes.ok)
            continue;
          const nexHtml = await nexRes.text();
          const finalLinks = [...nexHtml.matchAll(/href="([^"]*(?:fastdl|vcloud|filebee|dgdrive|hubcloud|pixeldrain)[^"]*)"[^>]*>([\s\S]*?)<\/a>/gi)];
          for (const f of finalLinks) {
            const serverName = f[2].replace(/<[^>]+>/g, "").replace(/&#x?[0-9a-f]+;|&[a-z]+;/gi, "").replace(/\s+/g, " ").trim() || "Vega Server";
            const card = formatCholeCard({
              provider: "VegaMovies",
              title: (mediaInfo && mediaInfo.title) || postTitle,
              year: (mediaInfo && mediaInfo.year) || "",
              season: mediaType === "tv" ? season : null,
              episode: mediaType === "tv" ? episode : null,
              filename: blockTitle,
              server: serverName,
              quality: qStr,
              size: sizeStr,
              url: f[1]
            });
            streams.push({
              ...card,
              url: f[1],
              provider: "vegamovies",
              behaviorHints: { notWebReady: true }
            });
          }
        } catch (e) {
        }
      } else {
        const card = formatCholeCard({
          provider: "VegaMovies",
          title: (mediaInfo && mediaInfo.title) || postTitle,
          year: (mediaInfo && mediaInfo.year) || "",
          season: mediaType === "tv" ? season : null,
          episode: mediaType === "tv" ? episode : null,
          filename: blockTitle,
          server: "Direct",
          quality: qStr,
          size: sizeStr,
          url: link
        });
        streams.push({
          ...card,
          url: link,
          provider: "vegamovies",
          behaviorHints: { notWebReady: true }
        });
      }
    }
    return streams;
  } catch (e) {
    return [];
  }
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
