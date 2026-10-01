/**
 * mycima - Built from src/mycima/
 * Generated: 2026-06-01T14:20:20.835Z
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

// src/mycima/index.js
var import_cheerio_without_node_native2 = __toESM(require("cheerio-without-node-native"));

// src/mycima/constants.js
var MAIN_URL = "https://mycima.red";
var HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  "Referer": MAIN_URL + "/",
  "X-Requested-With": "XMLHttpRequest"
};
var TMDB_BASE_URL = "https://api.themoviedb.org/3";
var TMDB_API_KEY = "439c478a771f35c05022f9feabcca01c";

// src/mycima/utils.js
function getTMDBDetails(tmdbId, mediaType) {
  return __async(this, null, function* () {
    var _a;
    const endpoint = mediaType === "tv" ? "tv" : "movie";
    const url = `${TMDB_BASE_URL}/${endpoint}/${tmdbId}?api_key=${TMDB_API_KEY}&append_to_response=external_ids`;
    const response = yield fetch(url, {
      method: "GET",
      headers: { "Accept": "application/json", "User-Agent": "Mozilla/5.0" }
    });
    if (!response.ok)
      throw new Error(`TMDB API error: ${response.status}`);
    const data = yield response.json();
    const title = mediaType === "tv" ? data.name : data.title;
    const releaseDate = mediaType === "tv" ? data.first_air_date : data.release_date;
    const year = releaseDate ? parseInt(releaseDate.split("-")[0]) : null;
    return { title, year, imdbId: ((_a = data.external_ids) == null ? void 0 : _a.imdb_id) || null };
  });
}
function normalizeTitle(title) {
  if (!title)
    return "";
  return title.toLowerCase().replace(/\b(the|a|an)\b/g, "").replace(/[:\-_]/g, " ").replace(/\s+/g, " ").replace(/[^\w\s]/g, "").trim();
}
function calculateTitleSimilarity(title1, title2) {
  const norm1 = normalizeTitle(title1);
  const norm2 = normalizeTitle(title2);
  if (norm1 === norm2)
    return 1;
  const words1 = norm1.split(/\s+/).filter((w) => w.length > 0);
  const words2 = norm2.split(/\s+/).filter((w) => w.length > 0);
  if (words1.length === 0 || words2.length === 0)
    return 0;
  const set1 = new Set(words1);
  const set2 = new Set(words2);
  const intersection = words1.filter((w) => set2.has(w));
  const union = /* @__PURE__ */ new Set([...words1, ...words2]);
  const jaccard = intersection.length / union.size;
  const extraWordsCount = words2.filter((w) => !set1.has(w)).length;
  let score = jaccard - extraWordsCount * 0.05;
  if (words1.length > 0 && words1.every((w) => set2.has(w))) {
    score += 0.2;
  }
  return score;
}
function findBestTitleMatch(mediaInfo, searchResults, mediaType, season) {
  if (!searchResults || searchResults.length === 0)
    return null;
  let bestMatch = null;
  let bestScore = 0;
  for (const result of searchResults) {
    let score = calculateTitleSimilarity(mediaInfo.title, result.title);
    if (mediaInfo.year && result.year) {
      const yearDiff = Math.abs(mediaInfo.year - result.year);
      if (yearDiff === 0)
        score += 0.2;
      else if (yearDiff <= 1)
        score += 0.1;
      else if (yearDiff > 5)
        score -= 0.3;
    }
    if (score > bestScore && score > 0.3) {
      bestScore = score;
      bestMatch = result;
    }
  }
  return bestMatch;
}
var BASE64_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
function atob(value) {
  if (!value)
    return "";
  let input = String(value).replace(/=+$/, "");
  let output = "";
  let bc = 0, bs, buffer, idx = 0;
  while (buffer = input.charAt(idx++)) {
    buffer = BASE64_CHARS.indexOf(buffer);
    if (~buffer) {
      bs = bc % 4 ? bs * 64 + buffer : buffer;
      if (bc++ % 4) {
        output += String.fromCharCode(255 & bs >> (-2 * bc & 6));
      }
    }
  }
  return output;
}
function getImageURL(style) {
  if (!style)
    return null;
  const match = style.match(/url\((.*?)\)/);
  if (!match)
    return null;
  return match[1].trim().replace(/^['"]|['"]$/g, "");
}
function jsUnpack(code) {
  try {
    let unbase = function(n, base) {
      const alphabet = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
      if (base <= 36)
        return parseInt(n, base).toString(36);
      let dict = {};
      for (let i = 0; i < base; i++)
        dict[alphabet[i]] = i;
      let res = 0;
      for (let i = 0; i < n.length; i++) {
        res = res * base + alphabet.indexOf(n[i]);
      }
      return res;
    };
    const match = code.match(/}\s*\(\s*['"](.+?)['"]\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*['"](.+?)['"]\.split\(['"]\|['"]\)/);
    if (!match)
      return code;
    let [, p, a, c, k] = match;
    a = parseInt(a);
    c = parseInt(c);
    k = k.split("|");
    while (c--) {
      if (k[c]) {
        const word = unbase(c, a);
        const regex = new RegExp("\\b" + word + "\\b", "g");
        p = p.replace(regex, k[c]);
      }
    }
    return p;
  } catch (e) {
    return code;
  }
}

// src/mycima/extractors.js
var import_cheerio_without_node_native = __toESM(require("cheerio-without-node-native"));
var import_crypto_js = __toESM(require("crypto-js"));
function hexDecode(hex) {
  let str = "";
  for (let i = 0; i < hex.length; i += 2) {
    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  }
  return str;
}
function getEmbedUrl(url) {
  if (url.includes("/d/"))
    return url.replace("/d/", "/v/");
  if (url.includes("/download/"))
    return url.replace("/download/", "/v/");
  if (url.includes("/file/"))
    return url.replace("/file/", "/v/");
  if (url.includes("/f/"))
    return url.replace("/f/", "/v/");
  if (url.includes("/e/"))
    return url.replace("/e/", "/v/");
  if (url.includes("/embed/"))
    return url.replace("/embed/", "/v/");
  return url;
}
function vidStackExtractor(url) {
  return __async(this, null, function* () {
    try {
      let hash = "";
      if (url.includes("#")) {
        hash = url.split("#").pop();
      } else {
        hash = url.split("/").filter(Boolean).pop();
      }
      if (!hash)
        return [];
      const urlObj = new URL(url);
      const baseurl = `${urlObj.protocol}//${urlObj.hostname}`;
      const apiUrl = `${baseurl}/api/v1/video?id=${hash}`;
      const response = yield fetch(apiUrl, { headers: __spreadProps(__spreadValues({}, HEADERS), { Referer: url }) });
      if (!response.ok) {
        const altApiUrl = `${baseurl}/api/video?id=${hash}`;
        const altRes = yield fetch(altApiUrl, { headers: __spreadProps(__spreadValues({}, HEADERS), { Referer: url }) });
        if (!altRes.ok)
          return [];
        const encoded2 = (yield altRes.text()).trim();
        return yield decryptVidStack(encoded2, url);
      }
      const encoded = (yield response.text()).trim();
      return yield decryptVidStack(encoded, url);
    } catch (e) {
      return [];
    }
  });
}
function decryptVidStack(encoded, url) {
  return __async(this, null, function* () {
    var _a, _b;
    const key = import_crypto_js.default.enc.Utf8.parse("kiemtienmua911ca");
    const ivs = ["1234567890oiuytr", "0123456789abcdef"];
    for (const ivStr of ivs) {
      try {
        const iv = import_crypto_js.default.enc.Utf8.parse(ivStr);
        const decrypted = import_crypto_js.default.AES.decrypt(
          { ciphertext: import_crypto_js.default.enc.Hex.parse(encoded) },
          key,
          { iv, mode: import_crypto_js.default.mode.CBC, padding: import_crypto_js.default.pad.Pkcs7 }
        );
        const decryptedText = decrypted.toString(import_crypto_js.default.enc.Utf8);
        if (decryptedText && decryptedText.includes("source")) {
          const m3u8 = (_b = (_a = decryptedText.match(/"source":"(.*?)"/)) == null ? void 0 : _a[1]) == null ? void 0 : _b.replace(/\\/g, "");
          if (m3u8) {
            return [{
              source: "Vidstack",
              quality: "M3U8",
              url: m3u8,
              headers: { "Referer": url }
            }];
          }
        }
      } catch (e) {
      }
    }
    return [];
  });
}
function vidHideExtractor(url) {
  return __async(this, null, function* () {
    try {
      const embedUrl = getEmbedUrl(url);
      const res = yield fetch(embedUrl, { headers: __spreadProps(__spreadValues({}, HEADERS), { Referer: url }) });
      if (!res.ok)
        return [];
      const html = yield res.text();
      if (html.includes("File is no longer available"))
        return [];
      let content = html;
      if (html.includes("eval(function(p,a,c,k,e,d)")) {
        content = jsUnpack(html);
      }
      const m3u8Matches = [...content.matchAll(/:\s*["'](.*?m3u8.*?)["']/g)];
      const streams = [];
      for (const match of m3u8Matches) {
        let m3u8Url = match[1];
        if (m3u8Url.startsWith("//"))
          m3u8Url = "https:" + m3u8Url;
        streams.push({
          source: "VidHide",
          quality: "Unknown",
          url: m3u8Url,
          headers: __spreadProps(__spreadValues({}, HEADERS), { Referer: embedUrl })
        });
      }
      if (streams.length > 0)
        return streams;
      const $ = import_cheerio_without_node_native.default.load(html);
      const form = $("form#F1");
      if (form.length > 0) {
        const action = form.attr("action");
        const formData = new URLSearchParams();
        form.find("input[type=hidden]").each((i, el) => {
          formData.append($(el).attr("name"), $(el).attr("value"));
        });
        if (!formData.get("file_code")) {
          const code = embedUrl.split("/").filter(Boolean).pop();
          formData.set("file_code", code);
        }
        const urlObj = new URL(embedUrl);
        const postUrl = action.startsWith("http") ? action : `${urlObj.protocol}//${urlObj.hostname}${action}`;
        const postRes = yield fetch(postUrl, {
          method: "POST",
          headers: __spreadProps(__spreadValues({}, HEADERS), { "Content-Type": "application/x-www-form-urlencoded", Referer: embedUrl }),
          body: formData.toString()
        });
        if (postRes.ok) {
          const postHtml = yield postRes.text();
          return yield genericExtractor(postHtml, postUrl);
        }
      }
      return [];
    } catch (e) {
      return [];
    }
  });
}
function doodStreamExtractor(url) {
  return __async(this, null, function* () {
    var _a;
    try {
      const res = yield fetch(url, { headers: HEADERS });
      const html = yield res.text();
      const md5 = (_a = html.match(/\/pass_md5\/([^'"]+)/)) == null ? void 0 : _a[1];
      if (!md5)
        return [];
      const passRes = yield fetch(`https://dood.re/pass_md5/${md5}`, { headers: __spreadProps(__spreadValues({}, HEADERS), { Referer: url }) });
      const passContent = yield passRes.text();
      const finalUrl = passContent + "abc?token=" + md5 + "&expiry=" + Date.now();
      return [{
        source: "DoodStream",
        quality: "Unknown",
        url: finalUrl,
        headers: __spreadProps(__spreadValues({}, HEADERS), { Referer: url })
      }];
    } catch (e) {
      return [];
    }
  });
}
function streamTapeExtractor(url) {
  return __async(this, null, function* () {
    try {
      const res = yield fetch(url, { headers: HEADERS });
      const html = yield res.text();
      const match = html.match(/id="videolink">([^<]+)/);
      if (match) {
        let videoUrl = "https:" + match[1];
        return [{
          source: "StreamTape",
          quality: "Unknown",
          url: videoUrl,
          headers: __spreadProps(__spreadValues({}, HEADERS), { Referer: url })
        }];
      }
      return [];
    } catch (e) {
      return [];
    }
  });
}
function mixDropExtractor(url) {
  return __async(this, null, function* () {
    try {
      const res = yield fetch(url, { headers: HEADERS });
      const html = yield res.text();
      if (html.includes("eval(function(p,a,c,k,e,d)")) {
        const unpacked = jsUnpack(html);
        const match = unpacked.match(/wurl="([^"]+)"/);
        if (match) {
          let videoUrl = match[1];
          if (videoUrl.startsWith("//"))
            videoUrl = "https:" + videoUrl;
          return [{
            source: "MixDrop",
            quality: "Unknown",
            url: videoUrl,
            headers: __spreadProps(__spreadValues({}, HEADERS), { Referer: url })
          }];
        }
      }
      return [];
    } catch (e) {
      return [];
    }
  });
}
function filemoonExtractor(url) {
  return __async(this, null, function* () {
    try {
      const res = yield fetch(url, { headers: __spreadProps(__spreadValues({}, HEADERS), { Referer: url }) });
      const html = yield res.text();
      let content = html;
      if (html.includes("eval(function(p,a,c,k,e,d)")) {
        content = jsUnpack(html);
      }
      const fileMatch = content.match(/file\s*:\s*["'](http[^"']+)["']/);
      if (fileMatch) {
        return [{ source: "Filemoon", quality: "Unknown", url: fileMatch[1], headers: __spreadProps(__spreadValues({}, HEADERS), { Referer: url }) }];
      }
      return [];
    } catch (e) {
      return [];
    }
  });
}
function govidExtractor(url) {
  return __async(this, null, function* () {
    try {
      const res = yield fetch(url, { headers: __spreadProps(__spreadValues({}, HEADERS), { Referer: url }) });
      const html = yield res.text();
      const hexMatch = html.match(/const\s+\w+\s*=\s*["']([0-9a-f]{20,})["']/i);
      if (hexMatch) {
        const decodedUrl = hexDecode(hexMatch[1]);
        if (decodedUrl.startsWith("http")) {
          return [{ source: "Govid", quality: "Unknown", url: decodedUrl, headers: __spreadProps(__spreadValues({}, HEADERS), { Referer: url }) }];
        }
      }
      return [];
    } catch (e) {
      return [];
    }
  });
}
function genericExtractor(html, url) {
  return __async(this, null, function* () {
    try {
      let content = html;
      if (!content && url) {
        const res = yield fetch(url, { headers: __spreadProps(__spreadValues({}, HEADERS), { Referer: url }) });
        content = yield res.text();
      }
      if (content.includes("eval(function(p,a,c,k,e,d)")) {
        content = jsUnpack(content);
      }
      const m3u8Match = content.match(/["'](http[^"']+\.m3u8[^"']*)["']/);
      if (m3u8Match) {
        return [{ source: "Generic HLS", quality: "Unknown", url: m3u8Match[1], headers: __spreadProps(__spreadValues({}, HEADERS), { Referer: url }) }];
      }
      const mp4Match = content.match(/["'](http[^"']+\.mp4[^"']*)["']/);
      if (mp4Match) {
        return [{ source: "Generic MP4", quality: "Unknown", url: mp4Match[1], headers: __spreadProps(__spreadValues({}, HEADERS), { Referer: url }) }];
      }
      return [];
    } catch (e) {
      return [];
    }
  });
}
function loadExtractor(url) {
  return __async(this, null, function* () {
    try {
      const domain = new URL(url).hostname;
      if (domain.includes("fsdcmo") || domain.includes("hglink") || domain.includes("dingtezuni") || domain.includes("vidhide") || domain.includes("earnvids") || domain.includes("filelions") || domain.includes("smoothpre") || domain.includes("dhtpre") || domain.includes("peytonepre") || domain.includes("ryderjet") || domain.includes("abstream")) {
        return yield vidHideExtractor(url);
      }
      if (domain.includes("vidstack") || domain.includes("hubstream") || domain.includes("bigwarp") || domain.includes("mxdrop") || domain.includes("wasuytm") || domain.includes("upn.one") || domain.includes("server1.uns") || domain.includes("kumi.uns")) {
        return yield vidStackExtractor(url);
      }
      if (domain.includes("dood"))
        return yield doodStreamExtractor(url);
      if (domain.includes("streamtape"))
        return yield streamTapeExtractor(url);
      if (domain.includes("mixdrop"))
        return yield mixDropExtractor(url);
      if (domain.includes("filemoon"))
        return yield filemoonExtractor(url);
      if (domain.includes("govid"))
        return yield govidExtractor(url);
      return yield genericExtractor(null, url);
    } catch (e) {
      return [];
    }
  });
}

// src/mycima/index.js
function search(query) {
  return __async(this, null, function* () {
    const url = `${MAIN_URL}/filtering/?keywords=${encodeURIComponent(query)}`;
    const response = yield fetch(url, { headers: HEADERS });
    if (!response.ok)
      return [];
    const html = yield response.text();
    const $ = import_cheerio_without_node_native2.default.load(html);
    return $("div.GridItem").map((i, el) => {
      const $el = $(el);
      const link = $el.find("div.Thumb--GridItem a");
      const title = $el.find("div.Thumb--GridItem strong").text().trim();
      const url2 = link.attr("href");
      const poster = getImageURL($el.find("span.BG--GridItem").attr("data-lazy-style"));
      const yearMatch = $el.find("span.year").text().match(/\d+/);
      const year = yearMatch ? parseInt(yearMatch[0]) : null;
      return { title, url: url2, poster, year };
    }).get();
  });
}
function getStreams(tmdbId, mediaType = "movie", season = null, episode = null) {
  return __async(this, null, function* () {
    try {
      const mediaInfo = yield getTMDBDetails(tmdbId, mediaType);
      const searchResults = yield search(mediaInfo.title);
      if (searchResults.length === 0)
        return [];
      const bestMatch = findBestTitleMatch(mediaInfo, searchResults, mediaType, season);
      const selectedMedia = bestMatch || searchResults[0];
      const response = yield fetch(selectedMedia.url, { headers: HEADERS });
      const html = yield response.text();
      const $ = import_cheerio_without_node_native2.default.load(html);
      let finalPageUrl = selectedMedia.url;
      if (mediaType === "tv") {
        let postId = "";
        $("script").each((i, el) => {
          const scriptData = $(el).html() || "";
          const match = scriptData.match(/post_id:\s*'(\d+)'/);
          if (match)
            postId = match[1];
        });
        if (postId) {
          const seasonElements = $("div.SeasonsList ul li a[data-season]");
          let seasonId = "";
          seasonElements.each((i, el) => {
            const $el = $(el);
            const sText = $el.text();
            const sNumMatch = sText.match(/\d+/);
            const sNum = sNumMatch ? parseInt(sNumMatch[0]) : i + 1;
            if (sNum === season) {
              seasonId = $el.attr("data-season");
            }
          });
          if (!seasonId && seasonElements.length > 0) {
            seasonId = seasonElements.first().attr("data-season");
          }
          if (seasonId) {
            const ajaxUrl = `${MAIN_URL}/wp-content/themes/mycima/Ajaxt/Single/Episodes.php`;
            const formData = new URLSearchParams();
            formData.append("season", seasonId);
            formData.append("post_id", postId);
            const ajaxResponse = yield fetch(ajaxUrl, {
              method: "POST",
              headers: __spreadProps(__spreadValues({}, HEADERS), { "Content-Type": "application/x-www-form-urlencoded" }),
              body: formData.toString()
            });
            const ajaxHtml = yield ajaxResponse.text();
            const $ep = import_cheerio_without_node_native2.default.load(ajaxHtml);
            const episodesList = $ep("a");
            episodesList.each((i, el) => {
              const $el = $(el);
              const epTitle = $el.find(".EpisodeTitle").text().trim() || $el.text().trim();
              const epNumMatch = epTitle.match(/\d+/);
              const epNum = epNumMatch ? parseInt(epNumMatch[0]) : i + 1;
              if (epNum === episode) {
                finalPageUrl = $el.attr("href");
              }
            });
          }
        }
      }
      const finalResponse = yield fetch(finalPageUrl, { headers: HEADERS });
      const finalHtml = yield finalResponse.text();
      const $final = import_cheerio_without_node_native2.default.load(finalHtml);
      const streams = [];
      const generalQuality = $final("div.Quality a").text().trim() || "Unknown";
      const downloadLinks = $final("div.Download--Wecima--Single a");
      for (const el of downloadLinks.get()) {
        const $el = $(el);
        const url = $el.attr("href");
        const serverName = $el.find("quality").text().trim() || "Unknown";
        const resText = $el.find("resolution").text().trim();
        const qualityMatch = resText.match(/\d+p/i) || generalQuality.match(/\d+p/i);
        const quality = qualityMatch ? qualityMatch[0] : "Unknown";
        if (url && url.startsWith("http")) {
          if (url.includes(".mp4") || url.includes(".m3u8")) {
            streams.push({
              name: `MyCima ${serverName}`,
              title: `Server ${serverName} (${quality})`,
              url,
              quality,
              headers: HEADERS,
              provider: "mycima"
            });
          } else {
            const extracted = yield loadExtractor(url);
            extracted.forEach((s) => {
              streams.push(__spreadProps(__spreadValues({}, s), {
                name: `MyCima ${serverName} (${s.source})`,
                title: `Extracted ${s.source} (${s.quality === "Unknown" ? quality : s.quality})`,
                provider: "mycima"
              }));
            });
          }
        }
      }
      const watchItems = $final("ul#watch li");
      for (const item of watchItems.get()) {
        const encodedUrl = $final(item).attr("data-watch");
        const serverName = $final(item).text().trim() || "Server";
        if (encodedUrl && encodedUrl.includes("/play/")) {
          const base64String = encodedUrl.substring(encodedUrl.indexOf("/play/") + 6).replace(/\/$/, "");
          try {
            let decodedUrl = atob(base64String);
            if (decodedUrl && !decodedUrl.startsWith("http")) {
              if (decodedUrl.startsWith("//"))
                decodedUrl = "https:" + decodedUrl;
              else if (decodedUrl.startsWith("/"))
                decodedUrl = MAIN_URL + decodedUrl;
            }
            if (decodedUrl && decodedUrl.startsWith("http")) {
              const extracted = yield loadExtractor(decodedUrl);
              if (extracted.length > 0) {
                extracted.forEach((s) => {
                  streams.push(__spreadProps(__spreadValues({}, s), {
                    name: `MyCima ${serverName} (${s.source})`,
                    title: `Watch ${serverName} (${s.quality === "Unknown" ? generalQuality : s.quality})`,
                    provider: "mycima"
                  }));
                });
              }
            }
          } catch (e) {
          }
        }
      }
      return streams;
    } catch (error) {
      return [];
    }
  });
}
module.exports = { getStreams };
