var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
"use strict";
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
var TMDB_API_KEY = "1865f43a0549ca50d341dd9ab8b29f49";
var TMDB_BASE_URL = "https://api.tmdb.org/3";
var CASTLE_BASE = "https://api.hlowb.com";
var PKG = "com.external.castle";
var CHANNEL = "IndiaA";
var CLIENT = "1";
var LANG = "en-US";
var API_HEADERS = {
  "User-Agent": "okhttp/4.9.3",
  "Accept": "application/json",
  "Accept-Language": "en-US,en;q=0.9",
  "Connection": "Keep-Alive",
  "Referer": CASTLE_BASE
};
var PLAYBACK_HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36",
  "Accept": "video/webm,video/ogg,video/*;q=0.9,application/ogg;q=0.7,audio/*;q=0.6,*/*;q=0.5",
  "Accept-Language": "en-US,en;q=0.9",
  "Accept-Encoding": "identity",
  "Connection": "keep-alive",
  "Sec-Fetch-Dest": "video",
  "Sec-Fetch-Mode": "no-cors",
  "Sec-Fetch-Site": "cross-site",
  "DNT": "1"
};
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
    name: opt.provider || "Stream",
    title: body,
    quality: qualitySlug,
    size: size || ""
  };
}
function makeRequest(_0) {
  return __async(this, arguments, function* (url, options = {}) {
    try {
      const response = yield fetch(url, {
        method: options.method || "GET",
        headers: __spreadValues(__spreadValues({}, API_HEADERS), options.headers),
        body: options.body
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return response;
    } catch (error) {
      console.error(`[Castle] Request failed for ${url}: ${error.message}`);
      throw error;
    }
  });
}
function extractCipherFromResponse(response) {
  return __async(this, null, function* () {
    const text = yield response.text();
    const trimmed = text.trim();
    if (!trimmed) {
      throw new Error("Empty response");
    }
    try {
      const json = JSON.parse(trimmed);
      if (json && json.data && typeof json.data === "string") {
        return json.data.trim();
      }
    } catch (e) {
    }
    return trimmed;
  });
}
function extractDataBlock(obj) {
  if (obj && obj.data && typeof obj.data === "object") {
    return obj.data;
  }
  return obj || {};
}
function getTMDBDetails(tmdbId, mediaType) {
  return __async(this, null, function* () {
    const endpoint = mediaType === "tv" ? "tv" : "movie";
    const baseUrls = ["https://api.tmdb.org/3", "https://api.tmdb.org/3"];
    for (const base of baseUrls) {
      const url = `${base}/${endpoint}/${tmdbId}?api_key=${TMDB_API_KEY}&append_to_response=external_ids`;
      try {
        const response = yield fetch(url);
        if (response.ok) {
          const data = yield response.json();
          const title = mediaType === "tv" ? data.name : data.title;
          const releaseDate = mediaType === "tv" ? data.first_air_date : data.release_date;
          const year = releaseDate ? parseInt(releaseDate.split("-")[0]) : null;
          return {
            title,
            year,
            tmdbId
          };
        }
      } catch (e) {
      }
    }
    throw new Error(`Failed to fetch TMDB details for ${tmdbId}`);
  });
}
function decryptCastle(encryptedB64, securityKeyB64) {
  return __async(this, null, function* () {
    console.log("[Castle] Starting local AES-CBC decryption...");
    try {
      let CryptoJS = typeof global !== "undefined" && global.CryptoJS ? global.CryptoJS : null;
      if (!CryptoJS) {
        try {
          CryptoJS = require("crypto-js");
        } catch (_) {}
      }

      if (CryptoJS) {
        if (typeof __crypto_aes_decrypt_raw !== "undefined") {
          const originalDecrypt = CryptoJS.AES.decrypt;
          CryptoJS.AES.decrypt = function(cipher, key, options) {
            try {
              const wordArrayToBytes = (wordArray) => {
                const bytes = new Uint8Array(wordArray.sigBytes);
                for (let i = 0; i < wordArray.sigBytes; i++) {
                  bytes[i] = wordArray.words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                }
                return bytes;
              };
              const toUint8Array = (data2) => {
                if (data2 instanceof Uint8Array)
                  return data2;
                if (data2 instanceof ArrayBuffer)
                  return new Uint8Array(data2);
                if (data2 && typeof data2.length === "number")
                  return new Uint8Array(Array.prototype.slice.call(data2));
                return new Uint8Array(0);
              };
              const data = typeof cipher === "string" ? new Uint8Array(Array.from(atob(cipher), (c) => c.charCodeAt(0))) : cipher.ciphertext ? wordArrayToBytes(cipher.ciphertext) : toUint8Array(cipher);
              const kBytes = wordArrayToBytes(key);
              const ivBytes = options && options.iv ? wordArrayToBytes(options.iv) : new Uint8Array(0);
              const mode = options && options.mode || "AES-CBC";
              const keyArg = typeof Int8Array !== "undefined" ? new Int8Array(kBytes.buffer) : kBytes;
              const ivArg = typeof Int8Array !== "undefined" ? new Int8Array(ivBytes.buffer) : ivBytes;
              const dataArg = typeof Int8Array !== "undefined" ? new Int8Array(data.buffer) : data;
              const resBytes = __crypto_aes_decrypt_raw(mode, keyArg, ivArg, dataArg);
              const plain = new TextDecoder().decode(resBytes);
              return { toString: function() {
                return plain;
              } };
            } catch (err) {
              console.error("[Castle JNI Patch] Decrypt failed, falling back:", err);
              return originalDecrypt.call(CryptoJS.AES, cipher, key, options);
            }
          };
        }
        const CASTLE_SUFFIX = "T!BgJB";
        const securityKeyWords = CryptoJS.enc.Base64.parse(securityKeyB64);
        const suffixWords = CryptoJS.enc.Utf8.parse(CASTLE_SUFFIX);
        const keyMaterial = securityKeyWords.concat(suffixWords);
        let finalKey;
        if (keyMaterial.sigBytes < 16) {
          const padding = CryptoJS.lib.WordArray.create(new Array(16 - keyMaterial.sigBytes).fill(0));
          finalKey = keyMaterial.concat(padding);
        } else if (keyMaterial.sigBytes > 16) {
          finalKey = CryptoJS.lib.WordArray.create(keyMaterial.words.slice(0, 4), 16);
        } else {
          finalKey = keyMaterial;
        }
        const iv = finalKey;
        const decrypted = CryptoJS.AES.decrypt(encryptedB64, finalKey, {
          iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7
        });
        const result = decrypted.toString(CryptoJS.enc.Utf8);
        if (result) {
          console.log("[Castle] Local decryption successful");
          return result;
        }
      }

      if (typeof require === "function") {
        try {
          const nodeCrypto = require("crypto");
          const keyBuf = Buffer.concat([Buffer.from(securityKeyB64, "base64"), Buffer.from("T!BgJB", "utf8")]);
          let finalKeyBuf = Buffer.alloc(16, 0);
          keyBuf.copy(finalKeyBuf, 0, 0, Math.min(16, keyBuf.length));
          const decipher = nodeCrypto.createDecipheriv("aes-128-cbc", finalKeyBuf, finalKeyBuf);
          let plain = decipher.update(encryptedB64, "base64", "utf8");
          plain += decipher.final("utf8");
          if (plain) {
            console.log("[Castle] Local Node crypto decryption successful");
            return plain;
          }
        } catch (_) {}
      }

      throw new Error("No cryptographic decryptor available or decryption failed");
    } catch (error) {
      console.error(`[Castle] Local decryption failed: ${error.message}`);
      throw error;
    }
  });
}
function getSecurityKey() {
  return __async(this, null, function* () {
    console.log("[Castle] Fetching security key...");
    const url = `${CASTLE_BASE}/v0.1/system/getSecurityKey/1?channel=${CHANNEL}&clientType=${CLIENT}&lang=${LANG}`;
    const response = yield makeRequest(url);
    const data = yield response.json();
    if (data.code !== 200 || !data.data) {
      throw new Error(`Security key API error: ${JSON.stringify(data)}`);
    }
    console.log("[Castle] Security key obtained");
    return data.data;
  });
}
function searchCastle(securityKey, keyword, page = 1, size = 30) {
  return __async(this, null, function* () {
    console.log(`[Castle] Searching for: ${keyword}`);
    const query = `channel=${CHANNEL}&clientType=${CLIENT}&keyword=${encodeURIComponent(keyword)}&lang=${LANG}&mode=1&packageName=${PKG}&page=${page}&size=${size}`;
    const url = `${CASTLE_BASE}/film-api/v1.1.0/movie/searchByKeyword?${query}`;
    const response = yield makeRequest(url);
    const cipher = yield extractCipherFromResponse(response);
    const decrypted = yield decryptCastle(cipher, securityKey);
    return JSON.parse(decrypted);
  });
}
function getDetails(securityKey, movieId) {
  return __async(this, null, function* () {
    console.log(`[Castle] Fetching details for movieId: ${movieId}`);
    const url = `${CASTLE_BASE}/film-api/v1.9.9/movie?channel=${CHANNEL}&clientType=${CLIENT}&lang=${LANG}&movieId=${movieId}&packageName=${PKG}`;
    const response = yield makeRequest(url);
    const cipher = yield extractCipherFromResponse(response);
    const decrypted = yield decryptCastle(cipher, securityKey);
    return JSON.parse(decrypted);
  });
}
function getVideoV1(securityKey, movieId, episodeId, languageId, resolution = 2) {
  return __async(this, null, function* () {
    console.log(`[Castle] Fetching video (v1) for movieId: ${movieId}, languageId: ${languageId}`);
    const url = `${CASTLE_BASE}/film-api/v2.0.1/movie/getVideo2?clientType=${CLIENT}&packageName=${PKG}&channel=${CHANNEL}&lang=${LANG}`;
    const body = {
      mode: "1",
      appMarket: "GuanWang",
      clientType: CLIENT,
      woolUser: "false",
      apkSignKey: "ED0955EB04E67A1D9F3305B95454FED485261475",
      androidVersion: "13",
      movieId: movieId.toString(),
      episodeId: episodeId.toString(),
      languageId: languageId.toString(),
      isNewUser: "true",
      resolution: resolution.toString(),
      packageName: PKG
    };
    const response = yield makeRequest(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    const cipher = yield extractCipherFromResponse(response);
    const decrypted = yield decryptCastle(cipher, securityKey);
    return JSON.parse(decrypted);
  });
}
function getVideo2(securityKey, movieId, episodeId, resolution = 2) {
  return __async(this, null, function* () {
    console.log(`[Castle] Fetching video (v2) for movieId: ${movieId}, episodeId: ${episodeId}`);
    const url = `${CASTLE_BASE}/film-api/v2.0.1/movie/getVideo2?clientType=${CLIENT}&packageName=${PKG}&channel=${CHANNEL}&lang=${LANG}`;
    const body = {
      mode: "1",
      appMarket: "GuanWang",
      clientType: CLIENT,
      woolUser: "false",
      apkSignKey: "ED0955EB04E67A1D9F3305B95454FED485261475",
      androidVersion: "13",
      movieId: movieId.toString(),
      episodeId: episodeId.toString(),
      isNewUser: "true",
      resolution: resolution.toString(),
      packageName: PKG
    };
    const response = yield makeRequest(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    const cipher = yield extractCipherFromResponse(response);
    const decrypted = yield decryptCastle(cipher, securityKey);
    return JSON.parse(decrypted);
  });
}
function findCastleMovieId(securityKey, tmdbInfo) {
  return __async(this, null, function* () {
    const searchTerm = tmdbInfo.year ? `${tmdbInfo.title} ${tmdbInfo.year}` : tmdbInfo.title;
    const searchResult = yield searchCastle(securityKey, searchTerm);
    const data = extractDataBlock(searchResult);
    const rows = data.rows || [];
    if (rows.length === 0) {
      throw new Error("No search results found");
    }
    for (const item of rows) {
      const itemTitle = (item.title || item.name || "").toLowerCase();
      const searchTitle = tmdbInfo.title.toLowerCase();
      if (itemTitle.includes(searchTitle) || searchTitle.includes(itemTitle)) {
        const movieId2 = item.id || item.redirectId || item.redirectIdStr;
        if (movieId2) {
          console.log(`[Castle] Found match: ${item.title || item.name} (id: ${movieId2})`);
          return movieId2.toString();
        }
      }
    }
    const firstItem = rows[0];
    const movieId = firstItem.id || firstItem.redirectId || firstItem.redirectIdStr;
    if (movieId) {
      console.log(`[Castle] Using first result: ${firstItem.title || firstItem.name} (id: ${movieId})`);
      return movieId.toString();
    }
    throw new Error("Could not extract movie ID from search results");
  });
}
function getQualityValue(quality) {
  if (!quality)
    return 0;
  const cleanQuality = quality.toString().toLowerCase().replace(/^(sd|hd|fhd|uhd|4k)\s*/i, "").replace(/p$/, "").trim();
  const qualityMap = {
    "4k": 2160,
    "2160": 2160,
    "1440": 1440,
    "1080": 1080,
    "720": 720,
    "480": 480,
    "360": 360,
    "240": 240
  };
  if (qualityMap[cleanQuality]) {
    return qualityMap[cleanQuality];
  }
  const numQuality = parseInt(cleanQuality);
  if (!isNaN(numQuality) && numQuality > 0) {
    return numQuality;
  }
  return 0;
}
function formatSize(sizeValue) {
  if (typeof sizeValue !== "number" || sizeValue <= 0) {
    return "Unknown";
  }
  if (sizeValue > 1e9) {
    return `${(sizeValue / 1e9).toFixed(2)} GB`;
  }
  return `${(sizeValue / 1e6).toFixed(0)} MB`;
}
function resolutionToQuality(resolution) {
  const qualityMap = {
    1: "480p",
    2: "720p",
    3: "1080p"
  };
  return qualityMap[resolution] || `${resolution}p`;
}
function processVideoResponse(videoData, mediaInfo, seasonNum, episodeNum, resolution, languageInfo) {
  const streams = [];
  const data = extractDataBlock(videoData);
  const videoUrl = data.videoUrl;
  if (!videoUrl) {
    console.log("[Castle] No videoUrl found in response");
    return streams;
  }
  const subtitles = [];
  if (data.subtitles && Array.isArray(data.subtitles)) {
    data.subtitles.forEach((sub) => {
      if (sub.url) {
        subtitles.push({
          url: sub.url,
          language: sub.abbreviate || "Unknown",
          name: sub.title || sub.abbreviate || "Unknown",
          headers: PLAYBACK_HEADERS
        });
      }
    });
  }
  let mediaTitle = mediaInfo.title || "Unknown";
  if (mediaInfo.year) {
    mediaTitle += ` (${mediaInfo.year})`;
  }
  if (seasonNum && episodeNum) {
    mediaTitle = `${mediaInfo.title} S${String(seasonNum).padStart(2, "0")}E${String(episodeNum).padStart(2, "0")}`;
  }
  const quality = resolutionToQuality(resolution);
  const serverTag = languageInfo ? languageInfo.replace(/[\[\]]/g, "") : "FastCDN";
  if (data.videos && Array.isArray(data.videos)) {
    for (const video of data.videos) {
      let videoQuality = video.resolutionDescription || video.resolution || quality;
      videoQuality = videoQuality.replace(/^(SD|HD|FHD)\s+/i, "");
      const sizeStr = formatSize(video.size);
      const card = formatCholeCard({
        provider: "Castle",
        title: mediaInfo.title,
        year: mediaInfo.year || "",
        season: seasonNum,
        episode: episodeNum,
        filename: `${mediaInfo.title} ${mediaInfo.year || ""} ${languageInfo || ""} ${videoQuality}`.trim(),
        server: serverTag,
        quality: videoQuality,
        size: sizeStr,
        url: video.url || videoUrl
      });
      streams.push(__spreadProps(__spreadValues({}, card), {
        url: video.url || videoUrl,
        headers: PLAYBACK_HEADERS,
        provider: "castle",
        subtitles
      }));
    }
  } else {
    const sizeStr = formatSize(data.size);
    const card = formatCholeCard({
      provider: "Castle",
      title: mediaInfo.title,
      year: mediaInfo.year || "",
      season: seasonNum,
      episode: episodeNum,
      filename: `${mediaInfo.title} ${mediaInfo.year || ""} ${languageInfo || ""} ${quality}`.trim(),
      server: serverTag,
      quality,
      size: sizeStr,
      url: videoUrl
    });
    streams.push(__spreadProps(__spreadValues({}, card), {
      url: videoUrl,
      headers: PLAYBACK_HEADERS,
      provider: "castle",
      subtitles
    }));
  }
  return streams;
}
function getStreams(tmdbId, mediaType, seasonNum, episodeNum) {
  return __async(this, null, function* () {
    console.log(`[Castle] Starting extraction for TMDB ID: ${tmdbId}, Type: ${mediaType}${mediaType === "tv" ? `, S:${seasonNum}E:${episodeNum}` : ""}`);
    try {
      const tmdbInfo = yield getTMDBDetails(tmdbId, mediaType);
      console.log(`[Castle] TMDB Info: "${tmdbInfo.title}" (${tmdbInfo.year || "N/A"})`);
      const securityKey = yield getSecurityKey();
      const movieId = yield findCastleMovieId(securityKey, tmdbInfo);
      let details = yield getDetails(securityKey, movieId);
      let currentMovieId = movieId;
      if (mediaType === "tv" && seasonNum && episodeNum) {
        const data = extractDataBlock(details);
        const seasons = data.seasons || [];
        const season = seasons.find((s) => s.number === seasonNum);
        if (season && season.movieId && season.movieId !== movieId) {
          console.log(`[Castle] Fetching season ${seasonNum} details...`);
          details = yield getDetails(securityKey, season.movieId.toString());
          currentMovieId = season.movieId.toString();
        }
      }
      const detailsData = extractDataBlock(details);
      const episodes = detailsData.episodes || [];
      let episodeId = null;
      if (mediaType === "tv" && seasonNum && episodeNum) {
        const episode2 = episodes.find((e) => e.number === episodeNum);
        if (episode2 && episode2.id) {
          episodeId = episode2.id.toString();
        }
      } else if (episodes.length > 0) {
        episodeId = episodes[0].id.toString();
      }
      if (!episodeId) {
        throw new Error("Could not find episode ID");
      }
      const episode = episodes.find((e) => e.id.toString() === episodeId);
      const tracks = episode && episode.tracks || [];
      const resolution = 2;
      const allStreams = [];
      for (const track of tracks) {
        const langName = track.languageName || track.abbreviate || "Unknown";
        if (track.existIndividualVideo && track.languageId) {
          try {
            console.log(`[Castle] Fetching ${langName} (languageId: ${track.languageId})`);
            const videoData = yield getVideoV1(securityKey, currentMovieId, episodeId, track.languageId, resolution);
            const langStreams = processVideoResponse(videoData, tmdbInfo, seasonNum, episodeNum, resolution, `[${langName}]`);
            if (langStreams.length > 0) {
              console.log(`[Castle] \u2705 ${langName}: Found ${langStreams.length} streams`);
              allStreams.push(...langStreams);
            }
          } catch (error) {
            console.log(`[Castle] \u26A0\uFE0F ${langName}: Failed - ${error.message}`);
          }
        }
      }
      if (allStreams.length === 0) {
        console.log("[Castle] Falling back to shared stream (v2)");
        const videoData = yield getVideo2(securityKey, currentMovieId, episodeId, resolution);
        const sharedStreams = processVideoResponse(videoData, tmdbInfo, seasonNum, episodeNum, resolution, "[Shared]");
        allStreams.push(...sharedStreams);
      }
      allStreams.sort((a, b) => getQualityValue(b.quality) - getQualityValue(a.quality));
      console.log(`[Castle] Total streams found: ${allStreams.length}`);
      return allStreams;
    } catch (error) {
      console.error(`[Castle] Error: ${error.message}`);
      return [];
    }
  });
}
module.exports = { getStreams };
