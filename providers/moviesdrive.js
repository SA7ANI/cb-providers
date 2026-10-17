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
var _cheerio = _cheerioRaw && _cheerioRaw.default && (typeof _cheerioRaw.default.load === "function" || typeof _cheerioRaw.default === "function") ? _cheerioRaw.default : _cheerioRaw;
var loadHtml = function(h) {
  return _cheerio && _cheerio.load ? _cheerio.load(h) : _cheerio ? _cheerio(h) : null;
};
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
  var raw = [opt.filename || "", opt.rawText || "", opt.server || "", opt.quality || "", opt.size || "", opt.title || ""].join(" ");
  var text = raw.trim();
  var cleanText = text.replace(/4khdhub/gi, "").replace(/hdhub4u/gi, "");
  var res = "";
  var qCheck = opt.quality ? String(opt.quality).trim() : "";
  if (/\b(?:2160p|4k|uhd)\b/i.test(qCheck))
    res = "4K UHD";
  else if (/\b(?:1080p|fhd)\b/i.test(qCheck))
    res = "1080p FHD";
  else if (/\b(?:720p|hd)\b/i.test(qCheck))
    res = "720p HD";
  else if (/\b(?:480p|sd)\b/i.test(qCheck))
    res = "480p";
  else if (/\b(?:2160p|4k|uhd)\b/i.test(cleanText))
    res = "4K UHD";
  else if (/\b(?:1080p|fhd)\b/i.test(cleanText))
    res = "1080p FHD";
  else if (/\b(?:720p|hd)\b/i.test(cleanText))
    res = "720p HD";
  else if (/\b(?:480p|sd)\b/i.test(cleanText))
    res = "480p";
  else
    res = qCheck ? qCheck.toUpperCase() : "1080p FHD";
  var source = "";
  if (/\bremux\b/i.test(text))
    source = "REMUX";
  else if (/\b(?:bluray|bdrip|brrip)\b/i.test(text))
    source = "BluRay";
  else if (/\b(?:web-?dl|webrip|web)\b/i.test(text))
    source = "WEB-DL";
  else if (/\bhdtv\b/i.test(text))
    source = "HDTV";
  var codecs = [];
  if (/\b(?:hevc|x265|h\.?265)\b/i.test(text))
    codecs.push("HEVC");
  else if (/\b(?:x264|h\.?264|avc)\b/i.test(text))
    codecs.push("x264");
  if (/\b10-?bit\b/i.test(text))
    codecs.push("10-bit");
  var hdr = [];
  if (/\b(?:dolby\s*vision|dv)\b/i.test(text))
    hdr.push("Dolby Vision");
  if (/\bhdr10\+\b/i.test(text))
    hdr.push("HDR10+");
  else if (/\b(?:hdr10|hdr)\b/i.test(text))
    hdr.push("HDR");
  var audio = [];
  var hasAtmos = /\b(?:atmos|ddpa)\b/i.test(text);
  var hasTrueHD = /\btruehd\b/i.test(text);
  var hasDTSHD = /\bdts-?hd(?:\s*ma)?\b/i.test(text);
  var hasDTS = /\bdts\b/i.test(text);
  var hasDDP = /\b(?:ddp|dd\+|eac3)\b/i.test(text);
  var hasDD = /\b(?:dd|ac3)\b/i.test(text);
  var has71 = /7\.1/i.test(text);
  var has51 = /5\.1/i.test(text);
  if (hasAtmos)
    audio.push("Dolby Atmos" + (has71 ? " 7.1" : has51 ? " 5.1" : ""));
  else if (hasTrueHD)
    audio.push("TrueHD" + (has71 ? " 7.1" : has51 ? " 5.1" : ""));
  else if (hasDTSHD)
    audio.push("DTS-HD MA" + (has71 ? " 7.1" : has51 ? " 5.1" : ""));
  else if (hasDTS)
    audio.push("DTS" + (has51 ? " 5.1" : ""));
  else if (hasDDP)
    audio.push("DDP 5.1");
  else if (hasDD)
    audio.push("DD 5.1");
  else if (/\baac\b/i.test(text))
    audio.push("AAC");
  var langs = [];
  if (/\b(?:hindi|hin)\b/i.test(text))
    langs.push("\u{1F1EE}\u{1F1F3} Hindi");
  if (/\b(?:tamil|tam)\b/i.test(text))
    langs.push("\u{1F1EE}\u{1F1F3} Tamil");
  if (/\b(?:telugu|tel)\b/i.test(text))
    langs.push("\u{1F1EE}\u{1F1F3} Telugu");
  if (/\b(?:english|eng)\b/i.test(text))
    langs.push("\u{1F1EC}\u{1F1E7} English");
  if (/\b(?:korean|kor)\b/i.test(text))
    langs.push("\u{1F1F0}\u{1F1F7} Korean");
  if (/\b(?:japanese|jap|jpn)\b/i.test(text))
    langs.push("\u{1F1EF}\u{1F1F5} Japanese");
  if (/\bdual[- ]?audio\b/i.test(text))
    langs.push("\u{1F310} Dual-Audio");
  if (/\bmulti[- ]?audio\b/i.test(text))
    langs.push("\u{1F310} Multi-Audio");
  if (langs.length === 0 && opt.defaultLang) {
    langs.push(opt.defaultLang);
  }
  var uniqueLangs = Array.from(new Set(langs));
  var sizeMatch = text.match(/(?:💾\s*|\[|\b)([0-9.]+\s*[GM]B)(?:\]|\b)/i);
  var rawSize = opt.size || (sizeMatch ? sizeMatch[1] : "");
  var size = rawSize ? rawSize.replace(/([0-9.]+)\s*([GM]B)/i, "$1 $2").toUpperCase() : "";
  var server = opt.server || "";
  if (!server) {
    var grpMatch = text.match(/-([a-zA-Z0-9_]+)(?:\.[a-z]{3})?$/i);
    if (grpMatch && grpMatch[1].length > 2 && grpMatch[1].length < 15)
      server = grpMatch[1];
  }
  var nameParts = [];
  if (opt.latency)
    nameParts.push("\u{1F7E2} FAST (" + opt.latency + "ms)");
  nameParts.push(opt.provider || "Stream");
  if (server)
    nameParts.push("\u{1F3F7}\uFE0F " + server);
  if (res)
    nameParts.push(res);
  if (source)
    nameParts.push(source);
  if (codecs.length)
    nameParts.push(codecs.join(" "));
  if (hdr.length)
    nameParts.push(hdr.join(" "));
  if (audio.length)
    nameParts.push(audio[0]);
  if (uniqueLangs.length) {
    var dualTag = uniqueLangs.find(function(l) {
      return l.indexOf("Dual") !== -1 || l.indexOf("Multi") !== -1;
    });
    if (dualTag)
      nameParts.push(dualTag);
    else
      nameParts.push(uniqueLangs.slice(0, 2).join(" + "));
  }
  if (opt.seeders !== void 0 && opt.seeders !== null && opt.seeders !== "") {
    nameParts.push("\u{1F331} " + opt.seeders);
  }
  var nameLine = nameParts.join(" \u2022 ");
  var filename = (opt.filename || "").trim();
  if (!filename || filename === opt.title) {
    var baseTitle = (opt.title || "Video").replace(/[^a-zA-Z0-9]+/g, ".");
    var yr = opt.year ? "." + opt.year : "";
    var se = opt.season && opt.episode ? ".S" + String(opt.season).padStart(2, "0") + "E" + String(opt.episode).padStart(2, "0") : "";
    var r = res ? "." + res.replace(/\s+/g, ".") : "";
    var s = source ? "." + source : "";
    var c = codecs.length ? "." + codecs.join(".") : "";
    var a = audio.length ? "." + audio[0].replace(/[^a-zA-Z0-9]+/g, ".") : "";
    var g = server ? "-" + server.replace(/[\s\-_]+/g, "") : "-" + (opt.provider || "Release");
    filename = baseTitle + yr + se + r + s + c + a + g + ".mkv";
  }
  var specTags = [res, source].concat(codecs).filter(Boolean);
  var seasonEp = opt.season && opt.episode ? " \u2022 S" + String(opt.season).padStart(2, "0") + "E" + String(opt.episode).padStart(2, "0") : "";
  var line1 = "\u{1F3AC} " + (opt.title || "Unknown") + (opt.year ? " (" + opt.year + ")" : "") + seasonEp + (specTags.length ? " [" + specTags.join(" \u2022 ") + "]" : "");
  var line2 = "\u{1F4C4} " + filename;
  var av = hdr.concat(audio);
  var line3 = av.length ? "\u{1F48E} " + av.join(" \u2022 ") : "";
  var line4 = uniqueLangs.length ? "\u{1F310} " + uniqueLangs.join(" \u2022 ") : "";
  var meta = [];
  if (size)
    meta.push("\u{1F4E6} " + size);
  if (opt.seeders !== void 0 && opt.seeders !== null && opt.seeders !== "")
    meta.push("\u{1F7E2} " + opt.seeders + " Seeders");
  if (server)
    meta.push("\u{1F3F7}\uFE0F " + server);
  meta.push("\u{1F517} " + (opt.provider || "Stream"));
  var line5 = meta.join(" \u2022 ");
  var body = [line1, line2, line3, line4, line5].filter(Boolean).join(" ");
  var qualitySlug = "1080p";
  if (res.indexOf("4K") !== -1 || res.indexOf("2160") !== -1)
    qualitySlug = "4k";
  else if (res.indexOf("1080") !== -1)
    qualitySlug = "1080p";
  else if (res.indexOf("720") !== -1)
    qualitySlug = "720p";
  else if (res.indexOf("480") !== -1)
    qualitySlug = "480p";
  return {
    name: body,
    description: body,
    title: body,
    quality: qualitySlug,
    size: size || ""
  };
}
var cachedMainUrl = "";
function getMainUrl() {
  return __async(this, null, function* () {
    if (cachedMainUrl)
      return cachedMainUrl;
    try {
      const response = yield fetch("https://cdn.jsdelivr.net/gh/phisher98/TVVVV@main/domains.json", { headers: { "User-Agent": "Mozilla/5.0" }, signal: AbortSignal.timeout(3000) });
      const data = yield response.json();
      let d = data.moviesdrive || "https://new3.moviesdrive.beer";
      if (d.includes("new2.moviesdrive.beer")) d = "https://new3.moviesdrive.beer";
      cachedMainUrl = d;
      return cachedMainUrl;
    } catch (e) {
      return "https://new3.moviesdrive.beer";
    }
  });
}
function hubCloudExtractor(url, referer) {
  return __async(this, null, function* () {
    var _a;
    try {
      let currentUrl = url.replace(/hubcloud\.(ink|dad|cx|lol|top|rocks|site|buzz)/gi, "hubcloud.ist");
      const pageResponse = yield fetch(currentUrl, { headers: __spreadProps(__spreadValues({}, HEADERS), { Referer: referer }), signal: AbortSignal.timeout(4000) });
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
          const secondResponse = yield fetch(finalUrl, { headers: __spreadProps(__spreadValues({}, HEADERS), { Referer: currentUrl }), signal: AbortSignal.timeout(4000) });
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
        let link = $(element).attr("href");
        const text = $(element).text().toLowerCase();
        if (link && !link.includes("telegram") && !link.startsWith("#")) {
          if (link.includes("gpdl") || link.includes("mega.nz") || link.includes("gamerxyt.com")) {
            continue;
          }
          if (link.includes("pixeldrain.dev/u/")) {
            link = link.replace("pixeldrain.dev/u/", "pixeldrain.com/api/file/");
          } else if (link.includes("pixeldrain.com/u/")) {
            link = link.replace("pixeldrain.com/u/", "pixeldrain.com/api/file/");
          }
          let label = "HubCloud";
          if (link.includes("r2.dev") || link.includes("cloudflarestorage"))
            label = "Direct R2";
          else if (link.includes("workers.dev"))
            label = "ZipDisk Server";
          else if (link.includes("pixel.hubcloud.ist") || text.includes("10gbps"))
            label = "HubCloud - Direct 10Gbps";
          else if (link.includes("pixeldrain"))
            label = "PixelServer";
          else if (text.includes("fsl server") || text.includes("download file"))
            label = "HubCloud - Direct";
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
        const titleRes = yield fetch(`${mainUrl}/search.php?q=${encodeURIComponent(mediaTitle)}`, { headers: HEADERS, signal: AbortSignal.timeout(4000) });
        if (titleRes.ok) {
          const titleData = yield titleRes.json();
          const cleanTitle = mediaTitle.toLowerCase().replace(/[^a-z0-9]/g, '');
          match = (_b = titleData == null ? void 0 : titleData.hits) == null ? void 0 : _b.map((h) => h.document).find((d) => {
            if (d.imdb_id === imdbId) return true;
            if (d.post_title) {
              const cleanPost = d.post_title.toLowerCase().replace(/[^a-z0-9]/g, '');
              return cleanPost.includes(cleanTitle);
            }
            return false;
          });
        }
      }
      if (!match) {
        console.log("[MoviesDrive] No match found on MoviesDrive");
        return [];
      }
      const permalink = match.permalink;
      const href = permalink.startsWith("http") ? permalink : `${mainUrl}${permalink}`;
      const pageRes = yield fetch(href, { headers: HEADERS, signal: AbortSignal.timeout(4000) });
      const pageHtml = yield pageRes.text();
      const $ = import_cheerio_without_node_native2.default.load(pageHtml);
      const allLinks = [];
      if (mediaType === "movie") {
        const downloadLinks = $("h5 > a, p > a.btn, a[href*='search-recover'], a[href*='hubcloud']").map((i, el) => $(el).attr("href")).get();
        const uniqueLinks = [...new Set(downloadLinks)].slice(0, 3);
        for (const dLink of uniqueLinks) {
          const extracted = yield extractMdrive(dLink);
          const loadPromises = extracted.slice(0, 2).map((server) => loadExtractor(server, href));
          const resolvedLists = yield Promise.allSettled(loadPromises);
          for (const rl of resolvedLists) {
            if (rl.status === "fulfilled" && Array.isArray(rl.value)) {
              allLinks.push(...rl.value.map((s) => __spreadProps(__spreadValues({}, s), __spreadValues({
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
          if (allLinks.length >= 4) break;
        }
      } else {
        const stag = `Season ${seasonNum}`;
        const sep = `Ep${String(episodeNum).padStart(2, "0")}|Ep${episodeNum}`;
        const entries = $("h5").filter((i, el) => new RegExp(stag, "i").test($(el).text()));
        for (const entry of entries.get().slice(0, 2)) {
          const nextHref = $(entry).next().find("a").attr("href");
          if (nextHref) {
            const epPageRes = yield fetch(nextHref, { headers: HEADERS, signal: AbortSignal.timeout(4000) });
            const epPageHtml = yield epPageRes.text();
            const $ep = import_cheerio_without_node_native2.default.load(epPageHtml);
            const epEntries = $ep("h5").filter((i, el) => new RegExp(sep, "i").test($ep(el).text()));
            for (const epEntry of epEntries.get().slice(0, 1)) {
              const link1 = $ep(epEntry).next().find("a").attr("href");
              const link2 = $ep(epEntry).next().next().find("a").attr("href");
              const epLinks = [link1, link2].filter((l) => !!l).slice(0, 2);
              const epPromises = epLinks.map((epLink) => loadExtractor(epLink, nextHref));
              const epResolved = yield Promise.allSettled(epPromises);
              for (const er of epResolved) {
                if (er.status === "fulfilled" && Array.isArray(er.value)) {
                  allLinks.push(...er.value.map((s) => __spreadProps(__spreadValues({}, s), __spreadValues({
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
          if (allLinks.length >= 4) break;
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
      const res = yield fetch(url, { headers: __spreadProps(__spreadValues({}, HEADERS), { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" }), signal: AbortSignal.timeout(4000) });
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
            headers: __spreadProps(__spreadValues({}, HEADERS), { "Accept": "application/json", "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" }),
            signal: AbortSignal.timeout(4000)
          });
          const data = yield apiRes.json();
          if (data.hits) {
            return data.hits.map((h) => h.url ? h.url.replace(/hubcloud\.(ink|dad|cx|lol|top|rocks|site|buzz)/gi, "hubcloud.ist") : null).filter((u) => !!u).slice(0, 3);
          }
        }
      }
      const $ = import_cheerio_without_node_native2.default.load(html);
      const regex = /hubcloud/i;
      const allUrls = $("a[href]").map((i, el) => $(el).attr("href")).get().filter((href) => regex.test(href));
      return [...new Set(allUrls)].slice(0, 3);
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
