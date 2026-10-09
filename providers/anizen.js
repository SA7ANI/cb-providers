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
const TMDB_API_KEYS = [
  "1865f43a0549ca50d341dd9ab8b29f49",
  "439c478a771f35c05022f9feabcca01c",
  "e49339e830e014e414c2b9a71b2d4f82"
];
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const ANIZEN_API_BASE = "https://anizen-api.vgdz6n57j7.workers.dev/anikototv";
const cheerio = (typeof require !== "undefined" ? function() {
  try {
    return require("cheerio-without-node-native");
  } catch (e) {
  }
  try {
    return require("cheerio");
  } catch (e) {
  }
  return null;
}() : null) || typeof global !== "undefined" && global.cheerio || typeof window !== "undefined" && window.cheerio || null;
const DEFAULT_HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
  "Referer": "https://anikoto.net/"
};
function httpGet(_0) {
  return __async(this, arguments, function* (url, headers = {}) {
    if (typeof axios !== "undefined" && axios && axios.get) {
      const res = yield axios.get(url, { headers, timeout: 8e3 });
      return res.data;
    }
    if (typeof fetch === "function") {
      const res = yield fetch(url, { headers });
      const text = yield res.text();
      try {
        return JSON.parse(text);
      } catch (e) {
        return text;
      }
    }
    if (typeof require !== "undefined") {
      try {
        const https = require("https");
        return new Promise((resolve, reject) => {
          https.get(url, { headers }, (res) => {
            let data = "";
            res.on("data", (c) => data += c);
            res.on("end", () => {
              try {
                resolve(JSON.parse(data));
              } catch (e) {
                resolve(data);
              }
            });
          }).on("error", reject);
        });
      } catch (e) {
      }
    }
    throw new Error("No HTTP client available");
  });
}
function rc4(key, input) {
  const s = Array.from({ length: 256 }, (_, i) => i);
  let a = 0;
  for (let n = 0; n < 256; n++) {
    a = (s[n] + a + key.charCodeAt(n % key.length)) % 256;
    const tmp = s[n];
    s[n] = s[a];
    s[a] = tmp;
  }
  let out = "";
  let n2 = 0, a2 = 0;
  for (let r = 0; r < input.length; r++) {
    n2 = (n2 + 1) % 256;
    a2 = (s[n2] + a2) % 256;
    const tmp2 = s[n2];
    s[n2] = s[a2];
    s[a2] = tmp2;
    const k = s[(s[n2] + s[a2]) % 256];
    out += String.fromCharCode(input.charCodeAt(r) ^ k);
  }
  return out;
}
function encodeVrf(animeId) {
  try {
    const encrypted = rc4("simple-hash", String(animeId));
    if (typeof Buffer !== "undefined") {
      return Buffer.from(encrypted, "binary").toString("base64");
    }
    return btoa(encrypted);
  } catch (e) {
    return "";
  }
}
const AES_SBOX = [
  99,
  124,
  119,
  123,
  242,
  107,
  111,
  197,
  48,
  1,
  103,
  43,
  254,
  215,
  171,
  118,
  202,
  130,
  201,
  125,
  250,
  89,
  71,
  240,
  173,
  212,
  162,
  175,
  156,
  164,
  114,
  192,
  183,
  253,
  147,
  38,
  54,
  63,
  247,
  204,
  52,
  165,
  229,
  241,
  113,
  216,
  49,
  21,
  4,
  199,
  35,
  195,
  24,
  150,
  5,
  154,
  7,
  18,
  128,
  226,
  235,
  39,
  178,
  117,
  9,
  131,
  44,
  26,
  27,
  110,
  90,
  160,
  82,
  59,
  214,
  179,
  41,
  227,
  47,
  132,
  83,
  209,
  0,
  237,
  32,
  252,
  177,
  91,
  106,
  203,
  190,
  57,
  74,
  76,
  88,
  207,
  208,
  239,
  170,
  251,
  67,
  77,
  51,
  133,
  69,
  249,
  2,
  127,
  80,
  60,
  159,
  168,
  81,
  163,
  64,
  143,
  146,
  157,
  56,
  245,
  188,
  182,
  218,
  33,
  16,
  255,
  243,
  210,
  205,
  12,
  19,
  236,
  95,
  151,
  68,
  23,
  196,
  167,
  126,
  61,
  100,
  93,
  25,
  115,
  96,
  129,
  79,
  220,
  34,
  42,
  144,
  136,
  70,
  238,
  184,
  20,
  222,
  94,
  11,
  219,
  224,
  50,
  58,
  10,
  73,
  6,
  36,
  92,
  194,
  211,
  172,
  98,
  145,
  149,
  228,
  121,
  231,
  200,
  55,
  109,
  141,
  213,
  78,
  169,
  108,
  86,
  244,
  234,
  101,
  122,
  174,
  8,
  186,
  120,
  37,
  46,
  28,
  166,
  180,
  198,
  232,
  221,
  116,
  31,
  75,
  189,
  139,
  138,
  112,
  62,
  181,
  102,
  72,
  3,
  246,
  14,
  97,
  53,
  87,
  185,
  134,
  193,
  29,
  158,
  225,
  248,
  152,
  17,
  105,
  217,
  142,
  148,
  155,
  30,
  135,
  233,
  206,
  85,
  40,
  223,
  140,
  161,
  137,
  13,
  191,
  230,
  66,
  104,
  65,
  153,
  45,
  15,
  176,
  84,
  187,
  22
];
const AES_INV_SBOX = new Uint8Array(256);
for (let i = 0; i < 256; i++)
  AES_INV_SBOX[AES_SBOX[i]] = i;
const AES_RCON = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54];
function aesKeyExpansion(keyBytes) {
  const w = new Uint32Array(60);
  for (let i = 0; i < 8; i++) {
    w[i] = keyBytes[4 * i] << 24 | keyBytes[4 * i + 1] << 16 | keyBytes[4 * i + 2] << 8 | keyBytes[4 * i + 3];
  }
  for (let i = 8; i < 60; i++) {
    let temp = w[i - 1];
    if (i % 8 === 0) {
      temp = temp << 8 | temp >>> 24;
      temp = AES_SBOX[temp >>> 24 & 255] << 24 | AES_SBOX[temp >>> 16 & 255] << 16 | AES_SBOX[temp >>> 8 & 255] << 8 | AES_SBOX[temp & 255];
      temp ^= AES_RCON[i / 8] << 24;
    } else if (i % 8 === 4) {
      temp = AES_SBOX[temp >>> 24 & 255] << 24 | AES_SBOX[temp >>> 16 & 255] << 16 | AES_SBOX[temp >>> 8 & 255] << 8 | AES_SBOX[temp & 255];
    }
    w[i] = w[i - 8] ^ temp;
  }
  return w;
}
function aesMul(a, b) {
  let p = 0;
  for (let i = 0; i < 8; i++) {
    if (b & 1)
      p ^= a;
    const hi = a & 128;
    a = a << 1 & 255;
    if (hi)
      a ^= 27;
    b >>= 1;
  }
  return p;
}
function aesInvMixColumns(s) {
  for (let c = 0; c < 4; c++) {
    const i = c * 4;
    const a = s[i], b = s[i + 1], d = s[i + 2], e = s[i + 3];
    s[i] = aesMul(14, a) ^ aesMul(11, b) ^ aesMul(13, d) ^ aesMul(9, e);
    s[i + 1] = aesMul(9, a) ^ aesMul(14, b) ^ aesMul(11, d) ^ aesMul(13, e);
    s[i + 2] = aesMul(13, a) ^ aesMul(9, b) ^ aesMul(14, d) ^ aesMul(11, e);
    s[i + 3] = aesMul(11, a) ^ aesMul(13, b) ^ aesMul(9, d) ^ aesMul(14, e);
  }
}
function aesDecryptBlock(block, w) {
  const state = new Uint8Array(block);
  const Nr = 14;
  for (let c = 0; c < 4; c++) {
    const rk = w[Nr * 4 + c];
    state[c * 4] ^= rk >>> 24 & 255;
    state[c * 4 + 1] ^= rk >>> 16 & 255;
    state[c * 4 + 2] ^= rk >>> 8 & 255;
    state[c * 4 + 3] ^= rk & 255;
  }
  for (let round = Nr - 1; round >= 1; round--) {
    const t12 = state[13];
    state[13] = state[9];
    state[9] = state[5];
    state[5] = state[1];
    state[1] = t12;
    const t22 = state[2];
    state[2] = state[10];
    state[10] = t22;
    const t62 = state[6];
    state[6] = state[14];
    state[14] = t62;
    const t32 = state[3];
    state[3] = state[7];
    state[7] = state[11];
    state[11] = state[15];
    state[15] = t32;
    for (let i = 0; i < 16; i++)
      state[i] = AES_INV_SBOX[state[i]];
    for (let c = 0; c < 4; c++) {
      const rk = w[round * 4 + c];
      state[c * 4] ^= rk >>> 24 & 255;
      state[c * 4 + 1] ^= rk >>> 16 & 255;
      state[c * 4 + 2] ^= rk >>> 8 & 255;
      state[c * 4 + 3] ^= rk & 255;
    }
    aesInvMixColumns(state);
  }
  const t1 = state[13];
  state[13] = state[9];
  state[9] = state[5];
  state[5] = state[1];
  state[1] = t1;
  const t2 = state[2];
  state[2] = state[10];
  state[10] = t2;
  const t6 = state[6];
  state[6] = state[14];
  state[14] = t6;
  const t3 = state[3];
  state[3] = state[7];
  state[7] = state[11];
  state[11] = state[15];
  state[15] = t3;
  for (let i = 0; i < 16; i++)
    state[i] = AES_INV_SBOX[state[i]];
  for (let c = 0; c < 4; c++) {
    const rk = w[c];
    state[c * 4] ^= rk >>> 24 & 255;
    state[c * 4 + 1] ^= rk >>> 16 & 255;
    state[c * 4 + 2] ^= rk >>> 8 & 255;
    state[c * 4 + 3] ^= rk & 255;
  }
  return state;
}
function decryptMegaPlay(encStr) {
  if (!encStr || typeof encStr !== "string")
    return "";
  try {
    if (typeof crypto !== "undefined" && crypto.createDecipheriv) {
      const key = Buffer.alloc(32);
      Buffer.from("i?LMTAx0Q6,:}50U").copy(key);
      const iv = Buffer.alloc(16);
      Buffer.from("W0;27ToaUpl_P%'c").copy(iv);
      let b64 = encStr.replace(/-/g, "+").replace(/_/g, "/");
      const pad = b64.length % 4;
      if (pad)
        b64 += "====".slice(pad);
      const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
      let decrypted = decipher.update(b64, "base64", "utf8");
      decrypted += decipher.final("utf8");
      return decrypted;
    }
  } catch (e) {
  }
  try {
    const keyStr = "i?LMTAx0Q6,:}50U";
    const ivStr = "W0;27ToaUpl_P%'c";
    const keyBytes = new Uint8Array(32);
    const ivBytes = new Uint8Array(16);
    for (let i = 0; i < Math.min(32, keyStr.length); i++)
      keyBytes[i] = keyStr.charCodeAt(i);
    for (let i = 0; i < Math.min(16, ivStr.length); i++)
      ivBytes[i] = ivStr.charCodeAt(i);
    let b64 = encStr.replace(/-/g, "+").replace(/_/g, "/");
    const pad = b64.length % 4;
    if (pad)
      b64 += "====".slice(pad);
    const binStr = typeof atob === "function" ? atob(b64) : Buffer.from(b64, "base64").toString("binary");
    const cipherBytes = new Uint8Array(binStr.length);
    for (let i = 0; i < binStr.length; i++)
      cipherBytes[i] = binStr.charCodeAt(i);
    const w = aesKeyExpansion(keyBytes);
    const out = new Uint8Array(cipherBytes.length);
    let prev = ivBytes;
    for (let offset = 0; offset < cipherBytes.length; offset += 16) {
      const block = cipherBytes.subarray(offset, offset + 16);
      const decrypted = aesDecryptBlock(block, w);
      for (let i = 0; i < 16; i++)
        out[offset + i] = decrypted[i] ^ prev[i];
      prev = block;
    }
    const pLen = out[out.length - 1];
    const resBytes = pLen > 0 && pLen <= 16 ? out.subarray(0, out.length - pLen) : out;
    let resStr = "";
    for (let i = 0; i < resBytes.length; i++)
      resStr += String.fromCharCode(resBytes[i]);
    return decodeURIComponent(escape(resStr));
  } catch (err) {
    return "";
  }
}
function formatCholeCard(opt) {
  const raw = [opt.filename || "", opt.server || "", opt.quality || "", opt.size || "", opt.title || ""].join(" ");
  const text = raw.trim();
  let res = "1080p FHD";
  if (/\b(?:2160p|4k|uhd)\b/i.test(text))
    res = "4K UHD";
  else if (/\b(?:1080p|fhd)\b/i.test(text))
    res = "1080p FHD";
  else if (/\b(?:720p|hd)\b/i.test(text))
    res = "720p HD";
  else if (/\b(?:480p|sd)\b/i.test(text))
    res = "480p";
  const langs = [];
  if (/\bdub\b/i.test(text) || /\benglish\b/i.test(text))
    langs.push("\u{1F1EC}\u{1F1E7} English");
  if (/\bsub\b/i.test(text) || /\bjapanese\b/i.test(text))
    langs.push("\u{1F1EF}\u{1F1F5} Japanese");
  if (!langs.length && opt.defaultLang)
    langs.push(opt.defaultLang);
  const nameParts = [opt.provider || "AniZen"];
  if (opt.server)
    nameParts.push("\u{1F3F7}\uFE0F " + opt.server);
  nameParts.push(res);
  nameParts.push("HLS");
  if (langs.length)
    nameParts.push(langs.join(" + "));
  let titleParts = [opt.title || "Anime"];
  if (opt.season && opt.episode) {
    titleParts.push(`S${String(opt.season).padStart(2, "0")}E${String(opt.episode).padStart(2, "0")}`);
  } else if (opt.episode) {
    titleParts.push(`Episode ${opt.episode}`);
  }
  if (opt.audioLabel)
    titleParts.push(`[${opt.audioLabel}]`);
  return {
    name: nameParts.join(" \u2022 "),
    title: titleParts.join(" ")
  };
}
function fetchTMDBDetails(tmdbId, mediaType) {
  return __async(this, null, function* () {
    for (const key of TMDB_API_KEYS) {
      try {
        const url = `${TMDB_BASE_URL}/${mediaType === "tv" ? "tv" : "movie"}/${tmdbId}?api_key=${key}`;
        const data = yield httpGet(url);
        if (data && (data.title || data.name)) {
          return {
            title: data.title || data.name || "",
            originalTitle: data.original_title || data.original_name || "",
            year: (data.release_date || data.first_air_date || "").split("-")[0]
          };
        }
      } catch (e) {
      }
    }
    return null;
  });
}
function formatCholeCard(opt) {
  var res = opt.quality ? String(opt.quality).trim() : "1080p FHD";
  var audio = opt.audioLabel || "SUB";
  var server = opt.server || "Stream";
  var provider = opt.provider || "AniZen";

  var seasonEp = opt.season && opt.episode ? " • S" + String(opt.season).padStart(2, "0") + "E" + String(opt.episode).padStart(2, "0") : (opt.episode ? " • Ep " + opt.episode : "");
  var specTags = [res, "WEB-DL", "HLS"].filter(Boolean);

  var line1 = "🎬 " + (opt.title || "Anime") + seasonEp + " [" + specTags.join(" • ") + "]";
  var cleanTitle = (opt.title || "Anime").replace(/[^a-zA-Z0-9]+/g, ".");
  var filename = `${cleanTitle}${seasonEp ? seasonEp.replace(/[^a-zA-Z0-9]/g, ".") : ""}.1080p.HLS.${audio}-${provider}.mkv`;
  var line2 = "📄 " + filename;
  var line3 = "💎 AAC 2.0 • Softsub";
  var line4 = audio === "DUB" ? "🌐 🇬🇧 English DUB" : "🌐 🇯🇵 Japanese SUB • Multi-Subs";
  var metaArr = ["📦 Adaptive HLS", "🏷️ " + server, "🔗 " + provider];
  var line5 = metaArr.join(" • ");

  var body = [line1, line2, line3, line4, line5].filter(Boolean).join("\n");
  return {
    name: `${provider} • ${audio} • ${server}`,
    title: body,
    quality: "1080p",
    format: "m3u8",
    type: "m3u8",
    size: "Adaptive HLS",
    provider: provider.toLowerCase()
  };
}

function getStreams(tmdbId, mediaType, seasonNum = 1, episodeNum = 1) {
  return __async(this, null, function* () {
    try {
      console.log(`[AniZen] Scraping streams for TMDB:${tmdbId}, Type:${mediaType}, S:${seasonNum} E:${episodeNum}`);
      const mediaInfo = yield fetchTMDBDetails(tmdbId, mediaType);
      if (!mediaInfo || !mediaInfo.title) {
        console.log("[AniZen] Could not extract media title from TMDB");
        return [];
      }
      const queryTitle = mediaInfo.title.replace(/[:\-]/g, " ").replace(/\s+/g, " ").trim();
      const searchUrl = `${ANIZEN_API_BASE}/search?keyword=${encodeURIComponent(queryTitle)}`;
      const searchHtml = yield httpGet(searchUrl, DEFAULT_HEADERS);
      const $ = cheerio.load(searchHtml);
      let matchHref = "";
      let matchTitle = "";
      const cleanQuery = queryTitle.toLowerCase().replace(/[^a-z0-9]/g, "");
      $(".ani.items .item, .items .item, div.item").each((_, el) => {
        if (matchHref)
          return;
        const itemTitle = $(el).find(".info a.name, .info a.d-title, a.name.d-title").first().text().trim();
        const href = $(el).find("a.poster, a.name").first().attr("href");
        if (!itemTitle || !href)
          return;
        const cleanItem = itemTitle.toLowerCase().replace(/[^a-z0-9]/g, "");
        if (cleanItem.includes(cleanQuery) || cleanQuery.includes(cleanItem)) {
          matchHref = href;
          matchTitle = itemTitle;
        }
      });
      if (!matchHref) {
        const firstEl = $(".ani.items .item, .items .item, div.item").first();
        matchHref = firstEl.find("a.poster, a.name").first().attr("href") || "";
        matchTitle = firstEl.find(".info a.name, .info a.d-title, a.name.d-title").first().text().trim() || mediaInfo.title;
      }
      if (!matchHref) {
        console.log("[AniZen] No matching anime found for", queryTitle);
        return [];
      }
      const slugMatch = matchHref.match(/\/watch\/([^/]+)/);
      const slug = slugMatch ? slugMatch[1] : "";
      if (!slug)
        return [];
      const targetEp = mediaType === "tv" ? episodeNum || 1 : 1;
      const watchUrl = `${ANIZEN_API_BASE}/watch/${slug}/ep-1`;
      const watchHtml = yield httpGet(watchUrl, DEFAULT_HEADERS);
      const $w = cheerio.load(watchHtml);
      const animeId = $w("#watch-page, #watch-main, .watch-wrap, [data-id]").first().attr("data-id");
      if (!animeId)
        return [];
      const vrf = encodeURIComponent(encodeVrf(animeId));
      const epAjaxUrl = `${ANIZEN_API_BASE}/ajax/episode/list/${animeId}?vrf=${vrf}&style=default`;
      const epJson = yield httpGet(epAjaxUrl, __spreadProps(__spreadValues({}, DEFAULT_HEADERS), { "X-Requested-With": "XMLHttpRequest" }));
      if (!epJson || !epJson.result)
        return [];
      const $ep = cheerio.load(epJson.result);
      let targetEpEl = $ep(`ul.ep-range a[data-num="${targetEp}"], a[data-ids][data-num="${targetEp}"]`).first();
      if (!targetEpEl.length) {
        targetEpEl = $ep("ul.ep-range a, a[data-ids]").first();
      }
      const dataIds = targetEpEl.attr("data-ids");
      if (!dataIds)
        return [];
      const srvUrl = `${ANIZEN_API_BASE}/ajax/server/list?servers=${encodeURIComponent(dataIds)}`;
      const srvJson = yield httpGet(srvUrl, __spreadProps(__spreadValues({}, DEFAULT_HEADERS), { "X-Requested-With": "XMLHttpRequest" }));
      if (!srvJson || !srvJson.result)
        return [];
      const $s = cheerio.load(srvJson.result);
      const serverTasks = [];
      $s("div.type").each((_, typeEl) => {
        const dataType = $s(typeEl).attr("data-type") || "sub";
        $s(typeEl).find("[data-link-id]").each((_2, sEl) => {
          const linkId = $s(sEl).attr("data-link-id");
          const serverName = $s(sEl).text().trim() || "Server";
          if (linkId)
            serverTasks.push({ dataType, serverName, linkId });
        });
      });
      const streams = [];
      yield Promise.all(serverTasks.slice(0, 6).map((task) => __async(this, null, function* () {
        var _a, _b, _c, _d, _e;
        try {
          const getUrl = `${ANIZEN_API_BASE}/ajax/server?get=${encodeURIComponent(task.linkId)}`;
          const getRes = yield httpGet(getUrl, __spreadProps(__spreadValues({}, DEFAULT_HEADERS), { "X-Requested-With": "XMLHttpRequest" }));
          const iframeUrl = (_a = getRes == null ? void 0 : getRes.result) == null ? void 0 : _a.url;
          if (!iframeUrl)
            return;
          const urlObj = new URL(iframeUrl.startsWith("//") ? "https:" + iframeUrl : iframeUrl);
          const host = urlObj.host;
          const iframeHtml = yield httpGet(iframeUrl, { "User-Agent": DEFAULT_HEADERS["User-Agent"], Referer: "https://anikoto.net/" });
          const $i = cheerio.load(iframeHtml);
          const dataId = $i("#megaplay-player").attr("data-id");
          if (!dataId)
            return;
          const getSrcUrl = `https://${host}/stream/getSources?id=${dataId}&id=${dataId}`;
          const srcData = yield httpGet(getSrcUrl, { "X-Requested-With": "XMLHttpRequest", Referer: iframeUrl });
          if (!srcData)
            return;
          let streamUrl = "";
          if (srcData.enc) {
            const dec = decryptMegaPlay(srcData.enc);
            try {
              const parsed = JSON.parse(dec);
              streamUrl = parsed.file || ((_c = (_b = parsed.sources) == null ? void 0 : _b[0]) == null ? void 0 : _c.file) || (typeof parsed === "string" ? parsed : "");
            } catch (e) {
              if (dec.startsWith("http"))
                streamUrl = dec;
            }
          } else if ((_e = (_d = srcData.sources) == null ? void 0 : _d[0]) == null ? void 0 : _e.file) {
            streamUrl = srcData.sources[0].file;
          } else if (srcData.file) {
            streamUrl = srcData.file;
          }
          if (streamUrl && streamUrl.startsWith("http")) {
            const isDub = task.dataType.toLowerCase() === "dub";
            const audioLabel = isDub ? "DUB" : "SUB";
            const card = formatCholeCard({
              provider: "AniZen",
              server: task.serverName,
              quality: "1080p",
              title: mediaInfo.title,
              season: mediaType === "tv" ? seasonNum : null,
              episode: mediaType === "tv" ? targetEp : null,
              audioLabel,
              defaultLang: isDub ? "\u{1F1EC}\u{1F1E7} English" : "\u{1F1EF}\u{1F1F5} Japanese"
            });
            const subtitles = (srcData.tracks || []).filter((t) => t.file && t.kind === "captions").map((t) => ({
              name: t.label || "English",
              url: t.file,
              language: t.label ? t.label.slice(0, 3).toLowerCase() : "en"
            }));
            streams.push(__spreadProps(__spreadValues({}, card), {
              url: streamUrl,
              quality: "1080p FHD",
              size: "Unknown",
              type: "m3u8",
              provider: "anizen",
              headers: {
                "User-Agent": DEFAULT_HEADERS["User-Agent"],
                "Referer": `https://${host}/`,
                "Origin": `https://${host}`
              },
              subtitles: subtitles.length > 0 ? subtitles : void 0
            }));
          }
        } catch (err) {
        }
      })));
      console.log(`[AniZen] Successfully scraped ${streams.length} stream links`);
      return streams;
    } catch (e) {
      console.error("[AniZen] Scraping error:", e.message);
      return [];
    }
  });
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = { getStreams };
} else {
  global.getStreams = getStreams;
}
