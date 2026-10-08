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
const CINEFREAK_BASE = "https://cinefreak.net";
const SEARCH_API = "https://search.yagaverse.net/api";
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
  "Referer": `${CINEFREAK_BASE}/`,
  "Origin": CINEFREAK_BASE
};
function httpGet(_0) {
  return __async(this, arguments, function* (url, headers = {}, timeoutMs = 8e3) {
    if (typeof axios !== "undefined" && axios && axios.get) {
      const res = yield axios.get(url, { headers, timeout: timeoutMs });
      return res.data;
    }
    if (typeof fetch === "function") {
      const controller = typeof AbortController !== "undefined" ? new AbortController() : null;
      const timer = controller ? setTimeout(() => controller.abort(), timeoutMs) : null;
      try {
        const res = yield fetch(url, { headers, signal: controller ? controller.signal : void 0 });
        const text = yield res.text();
        try {
          return JSON.parse(text);
        } catch (e) {
          return text;
        }
      } finally {
        if (timer)
          clearTimeout(timer);
      }
    }
    if (typeof require !== "undefined") {
      try {
        const https = require("https");
        const http = require("http");
        const client = url.startsWith("https") ? https : http;
        return new Promise((resolve, reject) => {
          const req = client.get(url, { headers, timeout: timeoutMs }, (res) => {
            let data = "";
            res.on("data", (c) => data += c);
            res.on("end", () => {
              try {
                resolve(JSON.parse(data));
              } catch (e) {
                resolve(data);
              }
            });
          });
          req.on("error", reject);
          req.on("timeout", () => {
            req.destroy();
            reject(new Error("Request timed out"));
          });
        });
      } catch (e) {
      }
    }
    throw new Error("No HTTP client available");
  });
}
function fetchPage(url) {
  return __async(this, null, function* () {
    const proxies = [
      `https://worker.zendax.me/api/fetch?url=${encodeURIComponent(url)}`,
      `https://anizen-api.vgdz6n57j7.workers.dev/api/fetch?url=${encodeURIComponent(url)}`,
      url
    ];
    for (const p of proxies) {
      try {
        const data = yield httpGet(p, {
          "User-Agent": DEFAULT_HEADERS["User-Agent"],
          "Referer": `${CINEFREAK_BASE}/`
        }, 7500);
        if (typeof data === "string" && data.length > 100) {
          return data;
        }
        if (typeof data === "object" && data !== null) {
          return typeof data.contents === "string" ? data.contents : JSON.stringify(data);
        }
      } catch (e) {
      }
    }
    return null;
  });
}
function decodeCinefreakLink(link) {
  if (!link)
    return "";
  try {
    if (link.includes("generate.php") && link.includes("id=")) {
      const qIdx = link.indexOf("?");
      if (qIdx !== -1) {
        const search = link.slice(qIdx + 1);
        const params = new URLSearchParams(search);
        const rawId = params.get("id");
        if (rawId) {
          let decoded = "";
          if (typeof atob === "function") {
            decoded = atob(rawId);
          } else if (typeof Buffer !== "undefined") {
            decoded = Buffer.from(rawId, "base64").toString("utf8");
          }
          if (decoded && decoded.startsWith("http")) {
            return decoded.replace(/newgo\d*$/i, "");
          }
        }
      }
    }
  } catch (e) {
  }
  return link;
}
function getTmdbMeta(tmdbId, mediaType = "movie", seasonNum = 1, episodeNum = 1) {
  return __async(this, null, function* () {
    if (typeof fetchTmdbWithFallback === "function") {
      try {
        const path = mediaType === "tv" ? `/tv/${tmdbId}` : `/movie/${tmdbId}`;
        const data = yield fetchTmdbWithFallback(path);
        if (data && (data.title || data.name)) {
          return {
            title: data.title || data.name,
            year: (data.release_date || data.first_air_date || "").slice(0, 4),
            originalTitle: data.original_title || data.original_name
          };
        }
      } catch (e) {
      }
    }
    for (const key of TMDB_API_KEYS) {
      try {
        const endpoint = mediaType === "tv" ? `${TMDB_BASE_URL}/tv/${tmdbId}?api_key=${key}` : `${TMDB_BASE_URL}/movie/${tmdbId}?api_key=${key}`;
        const data = yield httpGet(endpoint, {}, 5e3);
        if (data && (data.title || data.name)) {
          return {
            title: data.title || data.name,
            year: (data.release_date || data.first_air_date || "").slice(0, 4),
            originalTitle: data.original_title || data.original_name
          };
        }
      } catch (e) {
      }
    }
    return { title: String(tmdbId), year: null, originalTitle: null };
  });
}
function formatCholeCard(meta) {
  const quality = meta.quality || "1080p";
  const cleanQuality = quality.toUpperCase().includes("4K") ? "4K" : quality.includes("2160") ? "4K" : quality.includes("1080") ? "1080p" : quality.includes("720") ? "720p" : quality.includes("480") ? "480p" : "1080p";
  const cleanTitle = (meta.title || "Stream").replace(/[\r\n]+/g, " ").trim();
  let display = `CineFreak | ${cleanQuality}`;
  if (meta.size && meta.size !== "Unknown")
    display += ` | \u{1F4BE} ${meta.size}`;
  if (meta.audioLabel)
    display += ` | \u{1F50A} ${meta.audioLabel}`;
  let streamName = `CineFreak [${cleanQuality}]`;
  if (meta.episode) {
    streamName += ` E${meta.episode}`;
  }
  return {
    name: streamName,
    title: `${display}
\u{1F3AC} ${cleanTitle}`,
    quality: cleanQuality
  };
}
function getStreams(tmdbId, mediaType = "movie", seasonNum = 1, episodeNum = 1) {
  return __async(this, null, function* () {
    var _a;
    try {
      const meta = yield getTmdbMeta(tmdbId, mediaType, seasonNum, episodeNum);
      if (!meta || !meta.title) {
        console.log("[CineFreak] Could not retrieve TMDB metadata");
        return [];
      }
      const query = meta.title.trim();
      console.log(`[CineFreak] Scraping for: "${query}" (${meta.year || "any"}), Type: ${mediaType}, S:${seasonNum} E:${episodeNum}`);
      let searchData = null;
      try {
        searchData = yield httpGet(`${SEARCH_API}/search?q=${encodeURIComponent(query)}&pg=1`, {}, 6e3);
      } catch (e) {
        console.error("[CineFreak] Search API failed:", e.message);
      }
      const hits = (searchData == null ? void 0 : searchData.hits) || [];
      if (!hits.length) {
        console.log("[CineFreak] No hits found for:", query);
        return [];
      }
      const cleanQuery = query.toLowerCase().replace(/[^a-z0-9]/g, "");
      let bestHit = null;
      for (const hit of hits) {
        const doc = hit.document;
        if (!doc || !doc.title)
          continue;
        const docTitle = doc.title.toLowerCase();
        const docClean = docTitle.replace(/[^a-z0-9]/g, "");
        if (mediaType === "tv") {
          const sMatch = docTitle.match(/season\s*(\d+)/i) || docTitle.match(/s(\d+)/i);
          if (sMatch && parseInt(sMatch[1], 10) !== parseInt(seasonNum, 10)) {
            continue;
          }
        }
        if (docClean.includes(cleanQuery)) {
          bestHit = doc;
          break;
        }
      }
      if (!bestHit && hits.length > 0) {
        if (mediaType === "tv") {
          bestHit = (_a = hits.find((h) => {
            var _a2;
            const t = (((_a2 = h.document) == null ? void 0 : _a2.title) || "").toLowerCase();
            const sMatch = t.match(/season\s*(\d+)/i) || t.match(/s(\d+)/i);
            return sMatch && parseInt(sMatch[1], 10) === parseInt(seasonNum, 10);
          })) == null ? void 0 : _a.document;
        }
        if (!bestHit)
          bestHit = hits[0].document;
      }
      if (!bestHit || !bestHit.slug) {
        console.log("[CineFreak] No acceptable document matched");
        return [];
      }
      console.log(`[CineFreak] Matched document: "${bestHit.title}" (slug: ${bestHit.slug})`);
      const postUrl = `${CINEFREAK_BASE}/${bestHit.slug}/`;
      const postHtml = yield fetchPage(postUrl);
      if (!postHtml || !cheerio) {
        console.log("[CineFreak] Failed to fetch or parse post page");
        return [];
      }
      const $ = cheerio.load(postHtml);
      const linkCandidates = [];
      if (mediaType === "tv") {
        const targetEp = parseInt(episodeNum, 10);
        const targetSeason = parseInt(seasonNum, 10);
        $(".ep-card").each((_, el) => {
          const card = $(el);
          const fullCardText = card.text().replace(/\s+/g, " ");
          const epMatch = fullCardText.match(/episode\s*(\d+)/i) || fullCardText.match(/ep\s*(\d+)/i);
          const epNum = epMatch ? parseInt(epMatch[1], 10) : null;
          if (epNum === targetEp) {
            card.find("a[href]").each((_2, aEl) => {
              const href = $(aEl).attr("href");
              const text = $(aEl).text().trim();
              if (href && (href.includes("cinecloud") || href.includes("/f/") || href.includes("/x/") || href.includes("generate.php"))) {
                const qMatch = text.match(/\b(480p|720p|1080p|2160p|4k)\b/i) || fullCardText.match(/\b(480p|720p|1080p|2160p|4k)\b/i);
                linkCandidates.push({
                  quality: qMatch ? qMatch[1].toUpperCase() : "720p",
                  size: "Unknown",
                  title: `${meta.title} S${targetSeason}E${targetEp}`,
                  link: decodeCinefreakLink(href),
                  episode: targetEp
                });
              }
            });
          }
        });
      }
      if (linkCandidates.length === 0) {
        $(".download-links-div h4, .download-links-div h3, .download-links-div p").each((_, hEl) => {
          const heading = $(hEl).text().trim();
          const qMatch = heading.match(/\b(480p|720p|1080p|2160p|4k)\b/i);
          const quality = qMatch ? qMatch[1].toUpperCase() : "1080p";
          const sizeMatch = heading.match(/\[([0-9.]+\s*[GM]B)\]/i);
          const size = sizeMatch ? sizeMatch[1] : "Unknown";
          const container = $(hEl).nextAll(".dlbtn-container").first();
          container.find("a[href]").each((_2, aEl) => {
            const href = $(aEl).attr("href");
            const text = $(aEl).text().trim();
            if (href && (text.includes("Download") || text.includes("Watch") || href.includes("cinecloud") || href.includes("generate.php"))) {
              linkCandidates.push({
                quality,
                size,
                title: heading || meta.title,
                link: decodeCinefreakLink(href)
              });
            }
          });
        });
        if (linkCandidates.length === 0) {
          $('a[href*="/f/"], a[href*="/x/"], a[href*="generate.php"]').each((_, aEl) => {
            const href = $(aEl).attr("href");
            const text = $(aEl).text().trim();
            const qMatch = text.match(/\b(480p|720p|1080p|2160p|4k)\b/i);
            linkCandidates.push({
              quality: qMatch ? qMatch[1].toUpperCase() : "1080p",
              size: "Unknown",
              title: meta.title,
              link: decodeCinefreakLink(href)
            });
          });
        }
      }
      console.log(`[CineFreak] Found ${linkCandidates.length} candidate links`);
      if (!linkCandidates.length)
        return [];
      const seenLinks = /* @__PURE__ */ new Set();
      const uniqueCandidates = [];
      for (const c of linkCandidates) {
        if (!seenLinks.has(c.link)) {
          seenLinks.add(c.link);
          uniqueCandidates.push(c);
        }
      }
      const streams = [];
      for (const item of uniqueCandidates.slice(0, 4)) {
        try {
          let target = item.link;
          if (!target)
            continue;
          const targetHtml = yield fetchPage(target);
          if (!targetHtml)
            continue;
          let directUrl = "";
          const $t = cheerio.load(targetHtml);
          const dBtn = $t('.server-btn[href*="/d/"], .server-btn:contains("Resumable")').first();
          const wBtn = $t('.server-btn[href*="/w/"], .server-btn:contains("Instant")').first();
          let intermediateUrl = "";
          if (dBtn.length && dBtn.attr("href")) {
            const h = dBtn.attr("href");
            intermediateUrl = h.startsWith("http") ? h : new URL(h, target).href;
          } else if (wBtn.length && wBtn.attr("href")) {
            const h = wBtn.attr("href");
            intermediateUrl = h.startsWith("http") ? h : new URL(h, target).href;
          }
          if (intermediateUrl && intermediateUrl !== target) {
            const resolveHtml = yield fetchPage(intermediateUrl);
            if (resolveHtml) {
              const $r = cheerio.load(resolveHtml);
              const fileLink = $r('a[href*="/cdn-cgi/content"], a[href*="cloudflarestorage"], a[href*=".r2.dev"]').first().attr("href");
              if (fileLink)
                directUrl = fileLink;
            }
          }
          if (!directUrl) {
            const fileLink = $t('a[href*="/cdn-cgi/content"], a[href*="cloudflarestorage"], a[href*=".r2.dev"]').first().attr("href");
            if (fileLink)
              directUrl = fileLink;
          }
          if (!directUrl) {
            const match = targetHtml.match(/https?:\/\/[^\s"'<>]*(?:cdn-cgi\/content|cloudflarestorage|r2\.dev)[^\s"'<>]*/);
            if (match)
              directUrl = match[0];
          }
          if (directUrl) {
            const card = formatCholeCard({
              title: item.title || meta.title,
              quality: item.quality,
              size: item.size,
              episode: item.episode,
              audioLabel: "Dual Audio"
            });
            streams.push(__spreadProps(__spreadValues({}, card), {
              url: directUrl,
              quality: card.quality,
              size: item.size || "Unknown",
              type: directUrl.includes(".m3u8") ? "m3u8" : "mp4",
              provider: "cinefreak",
              headers: {
                "User-Agent": DEFAULT_HEADERS["User-Agent"],
                "Referer": target
              }
            }));
          }
        } catch (err) {
          console.error("[CineFreak] Link resolution error:", err.message);
        }
      }
      console.log(`[CineFreak] Successfully resolved ${streams.length} stream links`);
      return streams;
    } catch (e) {
      console.error("[CineFreak] Scraping error:", e.message);
      return [];
    }
  });
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = { getStreams };
} else {
  global.getStreams = getStreams;
}
