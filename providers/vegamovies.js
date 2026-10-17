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
var __defProp2 = Object.defineProperty;
var __defProps2 = Object.defineProperties;
var __getOwnPropDescs2 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols2 = Object.getOwnPropertySymbols;
var __hasOwnProp2 = Object.prototype.hasOwnProperty;
var __propIsEnum2 = Object.prototype.propertyIsEnumerable;
var __defNormalProp2 = (obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues2 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp2.call(b, prop))
      __defNormalProp2(a, prop, b[prop]);
  if (__getOwnPropSymbols2)
    for (var prop of __getOwnPropSymbols2(b)) {
      if (__propIsEnum2.call(b, prop))
        __defNormalProp2(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps2 = (a, b) => __defProps2(a, __getOwnPropDescs2(b));
var __async2 = (__this, __arguments, generator) => {
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
var MAIN_URL = "https://vegamoviess.build";
var HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  "Referer": `${MAIN_URL}/`
};
function getTMDBDetails(tmdbId, mediaType) {
  return __async2(this, null, function* () {
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
  return __async2(this, null, function* () {
    const queriesToTry = [];
    if (title)
      queriesToTry.push(title);
    if (imdbId && imdbId.startsWith("tt"))
      queriesToTry.push(imdbId);
    for (const q of queriesToTry) {
      try {
        const params = new URLSearchParams();
        params.append("do", "search");
        params.append("subaction", "search");
        params.append("story", q);
        const searchUrl = `${MAIN_URL}/index.php?do=search`;
        const response = yield fetch(searchUrl, {
          method: "POST",
          headers: __spreadProps(__spreadValues({}, HEADERS), { "Content-Type": "application/x-www-form-urlencoded" }),
          body: params.toString()
        });
        if (!response.ok) continue;
        const html = yield response.text();
        const articleMatches = [...html.matchAll(/<a\s+[^>]*href=["']([^"']+\.html)["'][^>]*title=["']([^"']+)["']/gi)];
        if (articleMatches.length > 0) {
          const qWords = q.toLowerCase().replace(/[^a-z0-9 ]/g, " ").split(/\s+/).filter(w => w.length > 2);
          const matched = articleMatches.filter(m => {
            const t = (m[2] || "").toLowerCase();
            return qWords.some(w => t.includes(w));
          });
          const chosen = matched.length > 0 ? matched : articleMatches;
          return chosen.map(m => ({
            url: m[1].startsWith("http") ? m[1] : `${MAIN_URL}${m[1]}`,
            title: m[2]
          }));
        }
      } catch (e) {
      }
    }
    return [];
  });
}
function formatCholeCard(opt) {
  var raw = [opt.filename || "", opt.rawText || "", opt.server || "", opt.quality || "", opt.size || "", opt.title || ""].join(" ");
  var text = raw.trim();
  var cleanText = text.replace(/4khdhub/gi, "").replace(/hdhub4u/gi, "");
  var res = "";
  var qCheck = opt.quality ? String(opt.quality).trim() : "";
  if (/\b(?:2160p|4k|uhd)\b/i.test(qCheck) || /\b(?:2160p|4k|uhd)\b/i.test(cleanText))
    res = "4K UHD";
  else if (/\b(?:1080p|fhd)\b/i.test(qCheck) || /\b(?:1080p|fhd)\b/i.test(cleanText))
    res = "1080p FHD";
  else if (/\b(?:720p|hd)\b/i.test(qCheck) || /\b(?:720p|hd)\b/i.test(cleanText))
    res = "720p HD";
  else if (/\b(?:480p|sd)\b/i.test(qCheck) || /\b(?:480p|sd)\b/i.test(cleanText))
    res = "480p SD";
  else
    res = qCheck ? qCheck.toUpperCase() : "1080p FHD";

  var source = "WEB-DL";
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
    codecs.push("AVC");
  else
    codecs.push(res.includes("4K") ? "HEVC" : "AVC");

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
  else
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
  if (langs.length === 0)
    langs.push(opt.defaultLang || "\u{1F310} Multi-Audio");
  var uniqueLangs = Array.from(new Set(langs));

  var sizeMatch = text.match(/(?:💾\s*|\[|\b)([0-9.]+\s*[GM]B)(?:\]|\b)/i);
  var rawSize = opt.size || (sizeMatch ? sizeMatch[1] : "");
  var size = rawSize ? rawSize.replace(/([0-9.]+)\s*([GM]B)/i, "$1 $2").toUpperCase() : "Direct";

  var server = opt.server || "VegaMovies";
  var provider = opt.provider || "VegaMovies";

  var baseTitle = (opt.title || "Video").replace(/[^a-zA-Z0-9]+/g, ".");
  var yr = opt.year ? "." + opt.year : "";
  var se = opt.season && opt.episode ? ".S" + String(opt.season).padStart(2, "0") + "E" + String(opt.episode).padStart(2, "0") : "";
  var r = res ? "." + res.replace(/\s+/g, ".") : "";
  var s = source ? "." + source : "";
  var c = codecs.length ? "." + codecs.join(".") : "";
  var a = audio.length ? "." + audio[0].replace(/[^a-zA-Z0-9]+/g, ".") : "";
  var g = "-" + provider;
  var filename = (opt.filename && opt.filename.endsWith(".mkv") && !opt.filename.includes(" "))
    ? opt.filename
    : (baseTitle + yr + se + r + s + c + a + g + ".mkv");

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
  meta.push("\u{1F517} " + provider);
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
    size: size || "Direct"
  };
}
function resolveVegaLink(linkUrl, referer) {
  return __async(this, null, function* () {
    try {
      if (linkUrl.includes("fast-dl") || linkUrl.includes("fastdl")) {
        const fr = yield fetch(linkUrl, {
          headers: __spreadProps(__spreadValues({}, HEADERS), { Referer: referer }),
          signal: AbortSignal.timeout(5e3)
        });
        if (fr.ok) {
          const fh = yield fr.text();
          const dlBtnMatch = fh.match(/href=["'](dl\.php\?code=[^"']+)["']/i);
          if (dlBtnMatch) {
            const finalDlUrl = `https://fast-dl.one/dl/${dlBtnMatch[1]}`;
            const finalRes = yield fetch(finalDlUrl, {
              headers: __spreadProps(__spreadValues({}, HEADERS), { Referer: linkUrl }),
              redirect: 'manual'
            });
            const loc = finalRes.headers.get('location');
            if (loc && loc.startsWith('http')) {
              return loc;
            }
          }
          const m = fh.match(/var\s+reurl\s*=\s*["']([^"']+)["']/i);
          if (m) {
            let direct = m[1];
            if (direct.includes("link=")) {
              direct = direct.split("link=").pop();
            }
            direct = direct.replace(/^\(/, "").replace(/\)$/, "").trim();
            try {
              direct = decodeURIComponent(direct);
            } catch (_) {
            }
            if (direct.startsWith("http")) {
              return direct;
            }
          }
        }
      } else if (linkUrl.includes("pixeldrain.com/u/")) {
        const idMatch = linkUrl.match(/pixeldrain\.com\/u\/([a-zA-Z0-9_-]+)/);
        if (idMatch) {
          return `https://pixeldrain.com/api/file/${idMatch[1]}`;
        }
      } else if (linkUrl.includes("hubcloud")) {
        let currentUrl = linkUrl.replace(/hubcloud\.(ink|dad|cx|lol|top|rocks|site|buzz)/gi, "hubcloud.ist");
        const hr = yield fetch(currentUrl, {
          headers: __spreadProps(__spreadValues({}, HEADERS), { Referer: referer }),
          signal: AbortSignal.timeout(4e3)
        });
        if (hr.ok) {
          const hh = yield hr.text();
          const m = hh.match(/var\s+url\s*=\s*['"]([^'"]+)['']/i) || hh.match(/id=["']download["'][^>]*href=["']([^"']+)["']/i);
          if (m) {
            let nUrl = m[1];
            if (!nUrl.startsWith("http")) {
              const uObj = new URL(currentUrl);
              nUrl = `${uObj.protocol}//${uObj.hostname}/${nUrl.replace(/^\//, "")}`;
            }
            const r2 = yield fetch(nUrl, {
              headers: __spreadProps(__spreadValues({}, HEADERS), { Referer: currentUrl }),
              signal: AbortSignal.timeout(4e3)
            });
            if (r2.ok) {
              const h2 = yield r2.text();
              const mDirect = [...h2.matchAll(/href=["']([^"']*(?:r2\.dev|workers\.dev|gpdl|pixeldrain)[^"']*)["']/gi)].map((x) => x[1]);
              if (mDirect.length > 0) {
                return mDirect[0];
              }
            }
          }
        }
      } else if (linkUrl.endsWith(".mkv") || linkUrl.endsWith(".mp4") || linkUrl.includes(".m3u8")) {
        return linkUrl;
      }
    } catch (_) {
    }
    return null;
  });
}
function getDownloadLinks(postUrl, postTitle, mediaInfo, mediaType, season, episode) {
  return __async(this, null, function* () {
    try {
      const response = yield fetch(postUrl, { headers: HEADERS });
      if (!response.ok)
        return [];
      const html = yield response.text();
      const linkRegex = /href="([^"]*(?:nexdrive|hubcloud|fast-dl|v-cloud|pixeldrain|drive)[^"]*)"/gi;
      let match;
      const downloadBlocks = [];
      while ((match = linkRegex.exec(html)) !== null) {
        const link = match[1];
        const preText = html.slice(Math.max(0, match.index - 800), match.index);
        const headings = [...preText.matchAll(/<(?:h[1-6]|p)[^>]*>([\s\S]*?(?:480p|720p|1080p|2160p|4k)[\s\S]*?)<\/(?:h[1-6]|p)>/gi)];
        let bestHeading = postTitle;
        if (headings.length > 0) {
          const rawH = headings[headings.length - 1][1].replace(/<[^>]+>/g, "").replace(/&#x?[0-9a-f]+;|&[a-z]+;/gi, "").trim();
          const lines = rawH.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
          const qualLine = lines.find((l) => /(?:480p|720p|1080p|2160p|4k)/i.test(l));
          bestHeading = qualLine || lines[lines.length - 1] || postTitle;
        }
        downloadBlocks.push({ url: link, heading: bestHeading });
      }
      const seen = /* @__PURE__ */ new Set();
      const uniqueBlocks = [];
      for (const b of downloadBlocks) {
        if (!seen.has(b.url)) {
          seen.add(b.url);
          uniqueBlocks.push(b);
        }
      }
      const streams = [];
      for (const block of uniqueBlocks.slice(0, 3)) {
        const link = block.url;
        const blockTitle = block.heading;
        const qMatch = blockTitle.match(/(2160p|4k|1080p|720p|480p)/i);
        const qStr = qMatch ? qMatch[1].toUpperCase() : "1080P";
        const sizeMatch = blockTitle.match(/\[([0-9.]+\s*(?:GB|MB))\]/i);
        const sizeStr = sizeMatch ? sizeMatch[1] : "";
        if (link.includes("nexdrive")) {
          try {
            const nexRes = yield fetch(link, { headers: __spreadProps(__spreadValues({}, HEADERS), { Referer: postUrl }) });
            if (!nexRes.ok)
              continue;
            const nexHtml = yield nexRes.text();
            const allLinks = [...nexHtml.matchAll(/href="([^"]*(?:fast-?dl|v-?cloud|filebee|dgdrive|hubcloud|pixeldrain)[^"]*)"[^>]*>([\s\S]*?)<\/a>/gi)];
            const finalLinks = allLinks.slice(0, 2);
            const resolvePromises = finalLinks.map((f) => __async(this, null, function* () {
              const rawTarget = f[1];
              const resolvedUrl = yield resolveVegaLink(rawTarget, link);
              if (!resolvedUrl)
                return null;
              const serverName = f[2].replace(/<[^>]+>/g, "").replace(/&#x?[0-9a-f]+;|&[a-z]+;/gi, "").replace(/\s+/g, " ").trim() || "Vega Server";
              const card = formatCholeCard({
                provider: "VegaMovies",
                title: mediaInfo && mediaInfo.title || postTitle,
                year: mediaInfo && mediaInfo.year || "",
                season: mediaType === "tv" ? season : null,
                episode: mediaType === "tv" ? episode : null,
                filename: blockTitle,
                server: serverName,
                quality: qStr,
                size: sizeStr,
                url: resolvedUrl
              });
              return __spreadProps(__spreadValues({}, card), {
                url: resolvedUrl,
                provider: "vegamovies"
              });
            }));
            const resolvedResults = yield Promise.allSettled(resolvePromises);
            for (const r of resolvedResults) {
              if (r.status === "fulfilled" && r.value) {
                streams.push(r.value);
              }
            }
            if (streams.length >= 4)
              break;
          } catch (e) {
          }
        } else {
          const resolvedUrl = yield resolveVegaLink(link, postUrl);
          if (resolvedUrl) {
            const card = formatCholeCard({
              provider: "VegaMovies",
              title: mediaInfo && mediaInfo.title || postTitle,
              year: mediaInfo && mediaInfo.year || "",
              season: mediaType === "tv" ? season : null,
              episode: mediaType === "tv" ? episode : null,
              filename: blockTitle,
              server: "Direct",
              quality: qStr,
              size: sizeStr,
              url: resolvedUrl
            });
            streams.push(__spreadProps(__spreadValues({}, card), {
              url: resolvedUrl,
              provider: "vegamovies"
            }));
          }
        }
      }
      return streams;
    } catch (e) {
      return [];
    }
  });
}
function getStreams(tmdbId, mediaType = "movie", season = null, episode = null) {
  return __async2(this, null, function* () {
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
      return streams.map((s) => Object.assign({}, s, { type: mediaType }));
    } catch (e) {
      console.error('[VegaMovies] Error in getStreams:', e.message);
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
