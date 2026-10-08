/**
 * moviesmod - Built from src/moviesmod/
 * Generated: 2026-09-22T08:14:06.813Z
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

// src/moviesmod/index.js
var import_cheerio_without_node_native2 = __toESM(require("cheerio-without-node-native"));

// src/moviesmod/constants.js
var DOMAINS_URL = "https://raw.githubusercontent.com/phisher98/TVVVV/refs/heads/main/domains.json";
var FALLBACK_DOMAIN = "https://moviesmod.army";
var TMDB_API_KEY = "1865f43a0549ca50d341dd9ab8b29f49";
var TMDB_BASE_URL = "https://api.tmdb.org/3";
var HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
  "Accept-Language": "en-US,en;q=0.9",
  "Cache-Control": "max-age=0",
  "Connection": "keep-alive",
  "Upgrade-Insecure-Requests": "1"
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

// src/moviesmod/utils.js
var import_cheerio_without_node_native = __toESM(require("cheerio-without-node-native"));
var cachedDomain = "";
function getMainUrl() {
  return __async(this, null, function* () {
    if (cachedDomain)
      return cachedDomain;
    try {
      const response = yield fetch(DOMAINS_URL);
      const data = yield response.json();
      cachedDomain = data.moviesmod || FALLBACK_DOMAIN;
      return cachedDomain;
    } catch (e) {
      return FALLBACK_DOMAIN;
    }
  });
}
function getBaseUrl(url) {
  try {
    const urlObj = new URL(url);
    return `${urlObj.protocol}//${urlObj.host}`;
  } catch (e) {
    return "";
  }
}
function fixUrl(url, domain) {
  if (!url)
    return "";
  if (url.startsWith("http"))
    return url;
  if (url.startsWith("//"))
    return `https:${url}`;
  if (url.startsWith("/"))
    return domain + url;
  return `${domain}/${url}`;
}
function bypassHrefli(url) {
  return __async(this, null, function* () {
    const host = getBaseUrl(url);
    try {
      const res1 = yield fetch(url, { headers: HEADERS });
      const html1 = yield res1.text();
      const $1 = import_cheerio_without_node_native.default.load(html1);
      const formUrl1 = $1("form#landing").attr("action");
      const formData1 = {};
      $1("form#landing input").each((_, el) => {
        formData1[$1(el).attr("name")] = $1(el).attr("value") || "";
      });
      const res2 = yield fetch(formUrl1, {
        method: "POST",
        headers: __spreadProps(__spreadValues({}, HEADERS), { "Content-Type": "application/x-www-form-urlencoded" }),
        body: new URLSearchParams(formData1).toString()
      });
      const html2 = yield res2.text();
      const $2 = import_cheerio_without_node_native.default.load(html2);
      const formUrl2 = $2("form#landing").attr("action");
      const formData2 = {};
      $2("form#landing input").each((_, el) => {
        formData2[$2(el).attr("name")] = $2(el).attr("value") || "";
      });
      const res3 = yield fetch(formUrl2, {
        method: "POST",
        headers: __spreadProps(__spreadValues({}, HEADERS), { "Content-Type": "application/x-www-form-urlencoded" }),
        body: new URLSearchParams(formData2).toString()
      });
      const html3 = yield res3.text();
      const $3 = import_cheerio_without_node_native.default.load(html3);
      const script = $3("script:contains(?go=)").html() || "";
      const skTokenMatch = script.match(/\?go=([^"]+)/);
      if (!skTokenMatch)
        return null;
      const skToken = skTokenMatch[1];
      const wpHttp2 = formData2["_wp_http2"] || "";
      const res4 = yield fetch(`${host}?go=${skToken}`, {
        headers: __spreadProps(__spreadValues({}, HEADERS), { "Cookie": `${skToken}=${wpHttp2}` })
      });
      const html4 = yield res4.text();
      const $4 = import_cheerio_without_node_native.default.load(html4);
      const metaRefresh = $4('meta[http-equiv="refresh"]').attr("content") || "";
      const driveUrlMatch = metaRefresh.match(/url=(.+)/);
      if (!driveUrlMatch)
        return null;
      const driveUrl = driveUrlMatch[1];
      const res5 = yield fetch(driveUrl, { headers: HEADERS });
      const html5 = yield res5.text();
      const pathMatch = html5.match(/replace\("([^"]+)"\)/);
      if (!pathMatch || pathMatch[1] === "/404")
        return null;
      return fixUrl(pathMatch[1], getBaseUrl(driveUrl));
    } catch (e) {
      return null;
    }
  });
}
function fetchTmdbDetails(tmdbId, mediaType) {
  return __async(this, null, function* () {
    var _a;
    try {
      const url = `${TMDB_BASE_URL}/${mediaType}/${tmdbId}?api_key=${TMDB_API_KEY}&append_to_response=external_ids`;
      const res = yield fetch(url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          "Accept": "application/json"
        }
      });
      const data = yield res.json();
      return {
        title: mediaType === "movie" ? data.title || data.original_title : data.name || data.original_name,
        year: (data.release_date || data.first_air_date || "").substring(0, 4),
        imdbId: (_a = data.external_ids) == null ? void 0 : _a.imdb_id
      };
    } catch (e) {
      return null;
    }
  });
}
function getIndexQuality(str) {
  if (!str)
    return "Unknown";
  const match = str.match(/(\d{3,4})[pP]/);
  if (match)
    return match[1] + "p";
  if (str.toUpperCase().includes("4K") || str.toUpperCase().includes("UHD"))
    return "2160p";
  return "Unknown";
}
function extractVideoSeed(finallink) {
  return __async(this, null, function* () {
    try {
      const urlObj = new URL(finallink);
      const host = finallink.includes("video-leech") ? "video-leech.xyz" : urlObj.host || "video-seed.xyz";
      const token = finallink.includes("?url=") ? finallink.split("?url=")[1] : finallink;
      if (!token)
        return null;
      const res = yield fetch(`https://${host}/api`, {
        method: "POST",
        headers: __spreadProps(__spreadValues({}, HEADERS), {
          "Content-Type": "application/x-www-form-urlencoded",
          "x-token": host,
          "Referer": finallink,
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"
        }),
        body: `keys=${encodeURIComponent(token)}`
      });
      const data = yield res.json();
      if (data && data.url) {
        return data.url.replace(/\\\//g, "/");
      }
      return null;
    } catch (e) {
      return null;
    }
  });
}
function instantLink(url) {
  return __async(this, null, function* () {
    try {
      if (url.includes("cdn.video-gen.xyz")) {
        const res = yield fetch(url, { headers: HEADERS, redirect: "follow" });
        if (res.url && res.url.includes("url=")) {
          const redirected = res.url.split("url=")[1];
          if (redirected && !redirected.includes("?url="))
            return redirected;
          return yield extractVideoSeed(redirected);
        }
      }
      if (url.includes("?url=")) {
        return yield extractVideoSeed(url);
      }
      return url;
    } catch (e) {
      return null;
    }
  });
}
function resumeBot(url) {
  return __async(this, null, function* () {
    try {
      const res = yield fetch(url, { headers: HEADERS });
      const html = yield res.text();
      const setCookie = res.headers.get("set-cookie") || "";
      const ssidMatch = setCookie.match(/PHPSESSID=([^;]+)/);
      const ssid = ssidMatch ? ssidMatch[1] : "";
      const tokenMatch = html.match(/formData\.append\('token',\s*'([a-f0-9]+)'\)/);
      const pathMatch = html.match(/fetch\('\/download\?id=([a-zA-Z0-9/+]+)'/);
      if (!tokenMatch || !pathMatch)
        return null;
      const baseUrl = url.substring(0, url.indexOf("/download"));
      const downloadUrl = `${baseUrl}/download?id=${pathMatch[1]}`;
      const postRes = yield fetch(downloadUrl, {
        method: "POST",
        headers: __spreadValues(__spreadProps(__spreadValues({}, HEADERS), {
          "Accept": "*/*",
          "Origin": baseUrl,
          "Sec-Fetch-Site": "same-origin",
          "Content-Type": "application/x-www-form-urlencoded"
        }), ssid ? { "Cookie": `PHPSESSID=${ssid}` } : {}),
        body: `token=${encodeURIComponent(tokenMatch[1])}`
      });
      const data = yield postRes.json();
      return data && data.url && data.url.startsWith("http") ? data.url : null;
    } catch (e) {
      return null;
    }
  });
}
function CFType1(url) {
  return __async(this, null, function* () {
    try {
      const wfileUrl = url.replace("/file", "/wfile") + "?type=1";
      const res = yield fetch(wfileUrl, { headers: HEADERS });
      const html = yield res.text();
      const $ = import_cheerio_without_node_native.default.load(html);
      const links = [];
      $("a.btn-success").each((_, el) => {
        const h = $(el).attr("href");
        if (h && h.startsWith("http"))
          links.push(h);
      });
      return links;
    } catch (e) {
      return [];
    }
  });
}
function resumeCloudLink(url) {
  return __async(this, null, function* () {
    try {
      const res = yield fetch(url, { headers: HEADERS });
      const html = yield res.text();
      const keyMatch = html.match(/formData\.append\(\s*['"]key['"]\s*,\s*['"]([^'"]+)['"]\s*\)/);
      if (keyMatch) {
        const host = new URL(url).host;
        const postRes = yield fetch(url, {
          method: "POST",
          headers: __spreadProps(__spreadValues({}, HEADERS), {
            "Content-Type": "application/x-www-form-urlencoded",
            "x-token": host,
            "X-Requested-With": "XMLHttpRequest"
          }),
          body: `action=cloud&key=${encodeURIComponent(keyMatch[1])}&action_token=`
        });
        const data = yield postRes.json();
        if (data && data.url) {
          return data.url.replace(/\\\//g, "/");
        }
      }
      const $ = import_cheerio_without_node_native.default.load(html);
      return $("a.btn-success").first().attr("href") || null;
    } catch (e) {
      return null;
    }
  });
}
function extractDriveseedPage(url) {
  return __async(this, null, function* () {
    const streams = [];
    try {
      let pageUrl = url;
      if (url.includes("r?key=")) {
        const res2 = yield fetch(url, { headers: HEADERS });
        const html2 = yield res2.text();
        const redirectMatch = html2.match(/replace\("([^"]+)"\)/);
        if (redirectMatch) {
          pageUrl = getBaseUrl(url) + redirectMatch[1];
        }
      }
      const res = yield fetch(pageUrl, { headers: HEADERS });
      const html = yield res.text();
      const $ = import_cheerio_without_node_native.default.load(html);
      const baseDomain = getBaseUrl(pageUrl);
      const rawNameText = $("li.list-group-item:contains(Name)").first().text() || "";
      const nameText = rawNameText.replace(/.*Name\s*:\s*/i, "").trim() || "";
      const sizeText = $("li.list-group-item:contains(Size)").first().text() || $("li:nth-child(3)").text() || "";
      const size = sizeText.replace(/.*Size\s*:\s*/i, "").trim();
      const quality = getIndexQuality(nameText || $("li.list-group-item").first().text() || "");
      const instantHref = $("a.btn-danger").attr("href");
      if (instantHref) {
        const finalInstant = yield instantLink(instantHref);
        if (finalInstant) {
          streams.push({ name: "Driveseed Instant", url: finalInstant, quality, size, fileName: nameText });
        }
      }
      const resumeBotHref = $("a.btn.btn-light").attr("href");
      if (resumeBotHref) {
        const finalBot = yield resumeBot(resumeBotHref);
        if (finalBot) {
          streams.push({ name: "Driveseed ResumeBot", url: finalBot, quality, size });
        }
      }
      const cfLinks = yield CFType1(pageUrl);
      for (const cfLink of cfLinks) {
        streams.push({ name: "Driveseed CF Type1", url: cfLink, quality, size });
      }
      const resumeCloudHref = $("a.btn-warning").attr("href");
      if (resumeCloudHref) {
        const fullCloudUrl = resumeCloudHref.startsWith("http") ? resumeCloudHref : `${baseDomain}${resumeCloudHref}`;
        const finalCloud = yield resumeCloudLink(fullCloudUrl);
        if (finalCloud) {
          streams.push({ name: "Driveseed ResumeCloud", url: finalCloud, quality, size });
        }
      }
    } catch (e) {
    }
    return streams;
  });
}

// src/moviesmod/index.js
function getStreams(tmdbId, mediaType, seasonNum = 1, episodeNum = 1) {
  return __async(this, null, function* () {
    console.log(`[MoviesMod] Querying streams for TMDB: ${tmdbId}, Type: ${mediaType}`);
    const details = yield fetchTmdbDetails(tmdbId, mediaType);
    if (!details)
      return [];
    const mainUrl = yield getMainUrl();
    console.log(`[MoviesMod] Main URL: ${mainUrl}`);
    const query = details.imdbId ? details.imdbId : details.title;
    const searchUrl = mediaType === "movie" ? `${mainUrl.replace(/\/$/, "")}/search/${encodeURIComponent(query)}` : `${mainUrl.replace(/\/$/, "")}/search/${encodeURIComponent(query)} ${seasonNum}`;
    try {
      console.log(`[MoviesMod] Searching at: ${searchUrl}`);
      const searchRes = yield fetch(searchUrl, { headers: __spreadProps(__spreadValues({}, HEADERS), { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" }), cfKiller: true });
      const searchHtml = yield searchRes.text();
      const $search = import_cheerio_without_node_native2.default.load(searchHtml);
      let targetUrl = $search("#content_box article > a").first().attr("href") || $search("#content_box article a").first().attr("href");
      if (!targetUrl && details.imdbId && details.title) {
        const fallbackQuery = mediaType === "movie" ? `${mainUrl.replace(/\/$/, "")}/search/${encodeURIComponent(details.title)}` : `${mainUrl.replace(/\/$/, "")}/search/${encodeURIComponent(details.title)} ${seasonNum}`;
        const fallbackRes = yield fetch(fallbackQuery, { headers: __spreadProps(__spreadValues({}, HEADERS), { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" }), cfKiller: true });
        const fallbackHtml = yield fallbackRes.text();
        const $fallback = import_cheerio_without_node_native2.default.load(fallbackHtml);
        targetUrl = $fallback("#content_box article > a").first().attr("href") || $fallback("#content_box article a").first().attr("href");
      }
      if (!targetUrl) {
        console.log("[MoviesMod] No search result found");
        return [];
      }
      const pageRes = yield fetch(targetUrl, { headers: __spreadProps(__spreadValues({}, HEADERS), { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" }), cfKiller: true });
      const pageHtml = yield pageRes.text();
      const $ = import_cheerio_without_node_native2.default.load(pageHtml);
      const allStreams = [];
      const contentBox = $(".thecontent");
      const hTag = mediaType === "movie" ? "h4" : "h3";
      const aTag = mediaType === "movie" ? "Download" : "Episode";
      const sTag = mediaType === "movie" ? "" : `(S0${seasonNum}|Season ${seasonNum})`;
      const qualityRegex = new RegExp(`${sTag}.*(480p|720p|1080p|2160p)`, "i");
      const entries = contentBox.find(hTag).filter((i, el) => {
        const text = $(el).text();
        return qualityRegex.test(text) && !text.includes("MoviesMod");
      });
      for (const entry of entries.get()) {
        const quality = getIndexQuality($(entry).text());
        let linkEl = $(entry).next().find(`a:contains('${aTag}')`).first();
        if (!linkEl.length) {
          linkEl = $(entry).nextAll("p, div").find(`a:contains('${aTag}')`).first();
        }
        let nextHref = linkEl.attr("href");
        if (nextHref && nextHref.includes("=")) {
          nextHref = nextHref.substring(nextHref.indexOf("=") + 1);
        }
        if (nextHref) {
          const streams = yield processModLink(nextHref, targetUrl, quality, mediaType, episodeNum, details, seasonNum);
          allStreams.push(...streams);
        }
      }
      return allStreams;
    } catch (e) {
      console.error("[MoviesMod] Error:", e.message);
      return [];
    }
  });
}
function processModLink(url, referer, quality, mediaType, episodeNum, details, seasonNum) {
  return __async(this, null, function* () {
    try {
      const res = yield fetch(url, { headers: __spreadProps(__spreadValues({}, HEADERS), { Referer: referer }) });
      const html = yield res.text();
      const $ = import_cheerio_without_node_native2.default.load(html);
      const selector = mediaType === "movie" ? "p a.maxbutton, a:contains('Download')" : `h3 a:contains('Episode ${episodeNum}'), a:contains('Episode ${episodeNum}'), a.maxbutton`;
      let source = $(selector).first().attr("href");
      if (!source) {
        source = $('a[href*="driveseed.org"], a[href*="tech.unblockedgames.world"], a[href*="video-seed"]').first().attr("href");
      }
      if (!source)
        return [];
      let finalLink = source;
      if (source.includes("unblockedgames") || source.includes("tech.") || source.includes("href.li")) {
        finalLink = yield bypassHrefli(source);
      }
      const results = [];
      const title = (details && details.title) || "";
      const year = (details && details.year) || "";

      if (finalLink && finalLink.includes("driveseed")) {
        const streams = yield extractDriveseedPage(finalLink);
        results.push(...streams.map((s) => {
          const card = formatCholeCard({
            provider: "MoviesMod",
            title: title,
            year: year,
            season: mediaType === "tv" ? seasonNum : null,
            episode: mediaType === "tv" ? episodeNum : null,
            filename: s.fileName || title,
            server: s.name || "Driveseed",
            quality: s.quality || quality,
            size: s.size || "",
            url: s.url
          });
          return __spreadProps(__spreadValues({}, card), {
            url: s.url,
            provider: "moviesmod"
          });
        }));
      } else if (finalLink && (finalLink.includes("video-seed") || finalLink.includes("video-leech"))) {
        const streamUrl = yield extractVideoSeed(finalLink);
        if (streamUrl) {
          const card = formatCholeCard({
            provider: "MoviesMod",
            title: title,
            year: year,
            season: mediaType === "tv" ? seasonNum : null,
            episode: mediaType === "tv" ? episodeNum : null,
            filename: title,
            server: "VideoSeed",
            quality: quality,
            url: streamUrl
          });
          results.push(__spreadProps(__spreadValues({}, card), {
            url: streamUrl,
            provider: "moviesmod"
          }));
        }
      }
      return results;
    } catch (e) {
      return [];
    }
  });
}
module.exports = { getStreams };
