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
var _cheerioRaw = require("cheerio-without-node-native");
var _cheerio = (_cheerioRaw && _cheerioRaw.default && (typeof _cheerioRaw.default.load === "function" || typeof _cheerioRaw.default === "function")) ? _cheerioRaw.default : _cheerioRaw;
var loadHtml = function(h) { return (_cheerio && _cheerio.load) ? _cheerio.load(h) : (_cheerio ? _cheerio(h) : null); };
var import_cheerio_without_node_native2 = { default: { load: loadHtml }, load: loadHtml };
var DOMAINS_URL = "https://cdn.jsdelivr.net/gh/phisher98/TVVVV@main/domains.json";
var HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36",
  "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
  "Accept-Language": "en-US,en;q=0.9",
  "Cache-Control": "max-age=0",
  "Connection": "keep-alive"
};
var import_cheerio_without_node_native = import_cheerio_without_node_native2;
function formatCholeCard(opt) {
  var raw = (opt.filename || '') + ' ' + (opt.server || '') + ' ' + (opt.quality || '') + ' ' + (opt.size || '');
  var text = raw.trim();
  var res = '';
  if (/2160p|4k|uhd/i.test(text)) res = '4K UHD';
  else if (/1080p|fhd/i.test(text)) res = '1080p FHD';
  else if (/720p|hd/i.test(text)) res = '720p HD';
  else if (/480p|sd/i.test(text)) res = '480p';
  else res = opt.quality ? String(opt.quality).toUpperCase() : '1080P';

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
  if (/dolby\s*vision|\bdv\b/i.test(text)) hdr.push('Dolby Vision');
  if (/hdr10\+/i.test(text)) hdr.push('HDR10+');
  else if (/hdr10|hdr/i.test(text)) hdr.push('HDR10');

  var audio = [];
  if (/atmos/i.test(text)) audio.push('Dolby Atmos');
  if (/truehd/i.test(text)) audio.push('TrueHD');
  else if (/dts-?hd(\s*ma)?/i.test(text)) audio.push('DTS-HD MA');
  else if (/dts/i.test(text)) audio.push('DTS');
  else if (/ddp|dd\+|eac3/i.test(text)) audio.push('DDP 5.1');
  else if (/dd|ac3/i.test(text)) audio.push('DD 5.1');
  else if (/aac/i.test(text)) audio.push('AAC');

  var langs = [];
  if (/\bhindi\b|\bhin\b/i.test(text)) langs.push('🇮🇳 Hindi Dub');
  if (/\btamil\b|\btam\b/i.test(text)) langs.push('🇮🇳 Tamil');
  if (/\btelugu\b|\btel\b/i.test(text)) langs.push('🇮🇳 Telugu');
  if (/\benglish\b|\beng\b/i.test(text)) langs.push('🇬🇧 English');
  if (/dual[- ]?audio/i.test(text)) langs.push('🌐 Dual-Audio');
  if (/multi[- ]?audio/i.test(text)) langs.push('🌐 Multi-Audio');
  var uniqueLangs = Array.from(new Set(langs));

  var sizeMatch = text.match(/(?:💾\s*|\[|\b)([0-9.]+ ?[GM]B)(?:\]|\b)/i);
  var size = sizeMatch ? sizeMatch[1].toUpperCase() : (opt.size || '');

  var nameParts = [opt.provider || 'Stream'];
  if (opt.server) nameParts.push('🏷️ ' + opt.server);
  if (res) nameParts.push(res);
  if (uniqueLangs.some(function(l) { return l.indexOf('Dual') !== -1 || l.indexOf('Multi') !== -1; })) nameParts.push('Dual-Audio');
  var nameLine = nameParts.join(' • ');

  var specTags = [res, source].concat(codecs).filter(Boolean);
  var seasonEp = (opt.season && opt.episode) ? (' • S' + String(opt.season).padStart(2, '0') + 'E' + String(opt.episode).padStart(2, '0')) : '';
  var line1 = '🎬 ' + (opt.title || 'Unknown') + (opt.year ? (' (' + opt.year + ')') : '') + seasonEp + (specTags.length ? (' [' + specTags.join(' • ') + ']') : '');
  
  var filename = (opt.filename || '').trim();
  if (!filename || filename === opt.title) {
    var baseTitle = (opt.title || 'Video').replace(/[^a-zA-Z0-9]+/g, '.');
    var yr = opt.year ? ('.' + opt.year) : '';
    var se = (opt.season && opt.episode) ? ('.S' + String(opt.season).padStart(2, '0') + 'E' + String(opt.episode).padStart(2, '0')) : '';
    var r = res ? ('.' + res.replace(/\s+/g, '.')) : '';
    var s = source ? ('.' + source) : '';
    var c = codecs.length ? ('.' + codecs.join('.')) : '';
    var a = audio.length ? ('.' + audio[0].replace(/[^a-zA-Z0-9]+/g, '.')) : '';
    var g = opt.server ? ('-' + opt.server.replace(/[\s\-_]+/g, '')) : ('-' + (opt.provider || 'Release'));
    filename = baseTitle + yr + se + r + s + c + a + g + '.mkv';
  }
  var line2 = '📄 ' + filename;

  var av = hdr.concat(audio);
  var line3 = av.length ? ('💎 ' + av.join(' • ')) : '';
  var line4 = uniqueLangs.length ? ('🌐 ' + uniqueLangs.join(' • ')) : '';

  var meta = [];
  if (size) meta.push('📦 ' + size);
  if (opt.server) meta.push('🏷️ ' + opt.server);
  meta.push('🔗 ' + (opt.provider || 'Stream'));
  var line5 = meta.join(' • ');

  var body = [line1, line2, line3, line4, line5].filter(Boolean).join('\n');
  return {
    name: nameLine,
    title: body,
    quality: res.toLowerCase().replace(' uhd', '').replace(' fhd', '').replace(' hd', '')
  };
}
var cachedMainUrl = "";
function getMainUrl() {
  return __async(this, null, function* () {
    if (cachedMainUrl)
      return cachedMainUrl;
    try {
      const response = yield fetch("https://cdn.jsdelivr.net/gh/phisher98/TVVVV@main/domains.json", { headers: { "User-Agent": "Mozilla/5.0" } });
      const data = yield response.json();
      cachedMainUrl = data.moviesdrive || "https://new5.moviesdrive.christmas";
      return cachedMainUrl;
    } catch (e) {
      return "https://new5.moviesdrive.christmas";
    }
  });
}
function hubCloudExtractor(url, referer) {
  return __async(this, null, function* () {
    var _a;
    try {
      let currentUrl = url.replace(/hubcloud\.(ink|dad|cx|lol|top|rocks|site|buzz)/gi, "hubcloud.ist");
      const pageResponse = yield fetch(currentUrl, { headers: __spreadProps(__spreadValues({}, HEADERS), { Referer: referer }) });
      let pageData = yield pageResponse.text();
      let finalUrl = currentUrl;
      if (!currentUrl.includes("hubcloud.php")) {
        let nextHref = "";
        const $first = import_cheerio_without_node_native.default.load(pageData);
        const downloadBtn = $first("#download");
        if (downloadBtn.length) {
          nextHref = downloadBtn.attr("href");
        } else {
          const scriptUrlMatch = pageData.match(/var url = '([^']*)'/);
          if (scriptUrlMatch)
            nextHref = scriptUrlMatch[1];
        }
        if (nextHref) {
          if (!nextHref.startsWith("http")) {
            const urlObj = new URL(currentUrl);
            nextHref = `${urlObj.protocol}//${urlObj.hostname}/${nextHref.replace(/^\//, "")}`;
          }
          finalUrl = nextHref;
          const secondResponse = yield fetch(finalUrl, { headers: __spreadProps(__spreadValues({}, HEADERS), { Referer: currentUrl }) });
          pageData = yield secondResponse.text();
        }
      }
      const $ = import_cheerio_without_node_native.default.load(pageData);
      const size = $("i#size").text().trim();
      const header = $("div.card-header").text().trim();
      const qualityStr = (_a = header.match(/(\d{3,4})[pP]/)) == null ? void 0 : _a[1];
      const quality = qualityStr ? parseInt(qualityStr) : 1080;
      const links = [];
      const elements = $("a.btn").get();
      for (const element of elements) {
        const link = $(element).attr("href");
        const text = $(element).text().toLowerCase();
        if (link && !link.includes("telegram") && !link.startsWith("#")) {
          let label = "HubCloud";
          if (link.includes("r2.dev"))
            label = "Direct R2";
          else if (link.includes("workers.dev"))
            label = "ZipDisk Server";
          else if (link.includes("pixeldrain"))
            label = "PixelServer";
          else if (link.includes("gpdl") || text.includes("10gbps"))
            label = "HubCloud - 10Gbps";
          else if (text.includes("fsl server"))
            label = "HubCloud - FSL";
          else if (text.includes("s3 server"))
            label = "HubCloud - S3";
          else if (text.includes("fslv2"))
            label = "HubCloud - FSLv2";
          else if (text.includes("mega server"))
            label = "HubCloud - Mega";
          links.push({ name: label, quality, url: link, size, realFilename: header });
        }
      }
      return links;
    } catch (e) {
      return [];
    }
  });
}
function loadExtractor(url, referer) {
  return __async(this, null, function* () {
    try {
      const hostname = new URL(url).hostname;
      if (hostname.includes("hubcloud"))
        return yield hubCloudExtractor(url, referer);
      if (hostname.includes("gdflix") || hostname.includes("gdlink")) {
        const qMatch = url.match(/(2160p|4k|1080p|720p|480p)/i);
        const qNum = qMatch ? (qMatch[1].toLowerCase().includes("720") ? 720 : (qMatch[1].toLowerCase().includes("480") ? 480 : 1080)) : 1080;
        return [{ name: "Google Drive Fast", quality: qNum, url }];
      }
      return [];
    } catch (e) {
      return [];
    }
  });
}
function getStreams(tmdbId, mediaType, seasonNum = 1, episodeNum = 1) {
  return __async(this, null, function* () {
    var _a2, _b, _c, _d;
    var _a;
    console.log(`[MoviesDrive] Querying streams for TMDB: ${tmdbId}, Type: ${mediaType}`);
    const tmdbApiKey = "1865f43a0549ca50d341dd9ab8b29f49";
    const tmdbUrl = `https://api.tmdb.org/3/${mediaType}/${tmdbId}?api_key=${tmdbApiKey}&append_to_response=external_ids`;
    const tmdbRes = yield fetch(tmdbUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
        "Accept": "application/json",
        "Connection": "keep-alive"
      }
    });
    const tmdbData = yield tmdbRes.json();
    const imdbId = (_a = tmdbData.external_ids) == null ? void 0 : _a.imdb_id;
    if (!imdbId) {
      console.error("[MoviesDrive] Failed to get IMDB ID");
      return [];
    }
    const mainUrl = yield getMainUrl();
    try {
      let match = null;
      console.log(`[MoviesDrive] Searching at: ${mainUrl}/search.php?q=${imdbId}`);
      const searchRes = yield fetch(`${mainUrl}/search.php?q=${imdbId}`, { headers: HEADERS });
      if (searchRes.ok) {
        const searchData = yield searchRes.json();
        match = (_a2 = searchData == null ? void 0 : searchData.hits) == null ? void 0 : _a2.map((h) => h.document).find((d) => d.imdb_id === imdbId);
      }
      const mediaTitle = tmdbData.title || tmdbData.name;
      if (!match && mediaTitle) {
        console.log(`[MoviesDrive] IMDb search failed, falling back to title search: ${mediaTitle}`);
        const titleRes = yield fetch(`${mainUrl}/search.php?q=${encodeURIComponent(mediaTitle)}`, { headers: HEADERS });
        if (titleRes.ok) {
          const titleData = yield titleRes.json();
          match = ((_b = titleData == null ? void 0 : titleData.hits) == null ? void 0 : _b.map((h) => h.document).find((d) => d.imdb_id === imdbId || d.post_title && d.post_title.toLowerCase().includes(mediaTitle.toLowerCase()))) || ((_d = (_c = titleData == null ? void 0 : titleData.hits) == null ? void 0 : _c[0]) == null ? void 0 : _d.document);
        }
      }
      if (!match) {
        console.log("[MoviesDrive] No match found on MoviesDrive");
        return [];
      }
      const permalink = match.permalink;
      const href = permalink.startsWith("http") ? permalink : `${mainUrl}${permalink}`;
      const pageRes = yield fetch(href, { headers: HEADERS });
      const pageHtml = yield pageRes.text();
      const $ = import_cheerio_without_node_native2.default.load(pageHtml);
      const allLinks = [];
      if (mediaType === "movie") {
        const downloadLinks = $("h5 > a, p > a.btn, a[href*='search-recover'], a[href*='hubcloud']").map((i, el) => $(el).attr("href")).get();
        for (const dLink of [...new Set(downloadLinks)]) {
          const extracted = yield extractMdrive(dLink);
          for (const server of extracted) {
            const streams = yield loadExtractor(server, href);
            allLinks.push(...streams.map((s) => __spreadProps(__spreadValues({}, s), __spreadValues({
              provider: "moviesdrive"
            }, formatCholeCard({
              provider: "MoviesDrive",
              title: tmdbData.title || tmdbData.name,
              year: tmdbData.release_date ? tmdbData.release_date.split("-")[0] : "",
              filename: s.realFilename || match.post_title || "",
              server: s.name,
              quality: `${s.quality}p`,
              size: s.size || "",
              url: s.url
            })))));
          }
        }
      } else {
        const stag = `Season ${seasonNum}`;
        const sep = `Ep${String(episodeNum).padStart(2, "0")}|Ep${episodeNum}`;
        const entries = $("h5").filter((i, el) => new RegExp(stag, "i").test($(el).text()));
        for (const entry of entries.get()) {
          const nextHref = $(entry).next().find("a").attr("href");
          if (nextHref) {
            const epPageRes = yield fetch(nextHref, { headers: HEADERS });
            const epPageHtml = yield epPageRes.text();
            const $ep = import_cheerio_without_node_native2.default.load(epPageHtml);
            const epEntries = $ep("h5").filter((i, el) => new RegExp(sep, "i").test($ep(el).text()));
            for (const epEntry of epEntries.get()) {
              const link1 = $ep(epEntry).next().find("a").attr("href");
              const link2 = $ep(epEntry).next().next().find("a").attr("href");
              const epLinks = [link1, link2].filter((l) => !!l);
              for (const epLink of epLinks) {
                const streams = yield loadExtractor(epLink, nextHref);
                allLinks.push(...streams.map((s) => __spreadProps(__spreadValues({}, s), __spreadValues({
                  provider: "moviesdrive"
                }, formatCholeCard({
                  provider: "MoviesDrive",
                  title: tmdbData.title || tmdbData.name,
                  year: tmdbData.first_air_date ? tmdbData.first_air_date.split("-")[0] : "",
                  season: seasonNum,
                  episode: episodeNum,
                  filename: s.realFilename || match.post_title || "",
                  server: s.name,
                  quality: `${s.quality}p`,
                  size: s.size || "",
                  url: s.url
                })))));
              }
            }
          }
        }
      }
      return allLinks;
    } catch (e) {
      console.error("[MoviesDrive] Error:", e.message);
      return [];
    }
  });
}
function extractMdrive(url) {
  return __async(this, null, function* () {
    try {
      const res = yield fetch(url, { headers: __spreadProps(__spreadValues({}, HEADERS), { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" }) });
      const html = yield res.text();
      if (url.includes("search-recover.php")) {
        const qMatch = html.match(/const Q_INITIAL\s*=\s*"([^"]+)"/);
        const tokenMatch = html.match(/const FROM_AC_TOKEN\s*=\s*"([^"]+)"/);
        if (qMatch && tokenMatch) {
          const apiBase = url.split("?")[0];
          const searchParams = new URLSearchParams({
            api: "search",
            q: qMatch[1],
            page: "1",
            from_ac: tokenMatch[1]
          });
          const apiRes = yield fetch(`${apiBase}?${searchParams.toString()}`, {
            headers: __spreadProps(__spreadValues({}, HEADERS), { "Accept": "application/json", "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" })
          });
          const data = yield apiRes.json();
          if (data.hits) {
            return data.hits.map((h) => h.url ? h.url.replace(/hubcloud\.(ink|dad|cx|lol|top|rocks|site|buzz)/gi, "hubcloud.ist") : null).filter((u) => !!u);
          }
        }
      }
      const $ = import_cheerio_without_node_native2.default.load(html);
      const regex = /hubcloud|gdflix|gdlink/i;
      return $("a[href]").map((i, el) => $(el).attr("href")).get().filter((href) => regex.test(href));
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
