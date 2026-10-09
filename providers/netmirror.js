const TMDB_API_KEYS = [
  "439c478a771f35c05022f9feabcca01c",
  "1865f43a0549ca50d341dd9ab8b29f49",
  "8265bd1679663a7ea12ac168da84d2e8",
  "e49339e830e014e414c2b9a71b2d4f82"
];
const DISCOVERY_DOMAINS = [
  "https://mobiledetects.com",
  "https://mobiledetect.app",
  "https://mobidetect.art",
  "https://mobidetect.cc",
  "https://mobidetect.click",
  "https://mobidetect.vip",
  "https://mobidetect.xyz"
];
let cachedApiBase = "https://tv.imgcdn.kim";
let lastApiResolveTime = 0;
const NEWTV_HEADERS = {
  "Cache-Control": "no-cache, no-store, must-revalidate",
  "Pragma": "no-cache",
  "Expires": "0",
  "X-Requested-With": "NetmirrorNewTV v1.0",
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:136.0) Gecko/20100101 Firefox/136.0 /OS.GatuNewTV v1.0",
  "Accept": "application/json, text/plain, */*"
};
function b64Decode(str) {
  if (typeof atob === "function") {
    try {
      return atob(str);
    } catch (_) {
    }
  }
  if (typeof Buffer !== "undefined") {
    try {
      return Buffer.from(str, "base64").toString("utf8");
    } catch (_) {
    }
  }
  const b64chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  let res = "";
  let enc1, enc2, enc3, enc4;
  let i = 0;
  const clean = String(str || "").replace(/[^A-Za-z0-9+/=]/g, "");
  while (i < clean.length) {
    enc1 = b64chars.indexOf(clean.charAt(i++));
    enc2 = b64chars.indexOf(clean.charAt(i++));
    enc3 = b64chars.indexOf(clean.charAt(i++));
    enc4 = b64chars.indexOf(clean.charAt(i++));
    const chr1 = enc1 << 2 | enc2 >> 4;
    const chr2 = (enc2 & 15) << 4 | enc3 >> 2;
    const chr3 = (enc3 & 3) << 6 | enc4;
    res += String.fromCharCode(chr1);
    if (enc3 !== 64 && enc3 !== -1)
      res += String.fromCharCode(chr2);
    if (enc4 !== 64 && enc4 !== -1)
      res += String.fromCharCode(chr3);
  }
  return res;
}
async function httpGet(url, options = {}) {
  const headers = options.headers || {};
  const timeout = options.timeout || 5e3;
  if (typeof axios !== "undefined" && axios && axios.get) {
    try {
      const res = await axios.get(url, { headers, timeout });
      return res.data;
    } catch (_) {
    }
  }
  if (typeof require === "function") {
    try {
      const ax = require("axios");
      if (ax && ax.get) {
        const res = await ax.get(url, { headers, timeout });
        return res.data;
      }
    } catch (_) {
    }
  }
  if (typeof fetch === "function") {
    const controller = typeof AbortController !== "undefined" ? new AbortController() : null;
    const timer = controller ? setTimeout(() => controller.abort(), timeout) : null;
    try {
      const res = await fetch(url, {
        method: "GET",
        headers,
        signal: controller ? controller.signal : void 0
      });
      if (timer)
        clearTimeout(timer);
      const text = await res.text();
      try {
        return JSON.parse(text);
      } catch (_) {
        return text;
      }
    } catch (e) {
      if (timer)
        clearTimeout(timer);
      throw e;
    }
  }
  throw new Error("No HTTP client available");
}
async function resolveApiBase() {
  const now = Date.now();
  if (cachedApiBase && now - lastApiResolveTime < 36e5) {
    return cachedApiBase;
  }
  for (const d of DISCOVERY_DOMAINS) {
    try {
      const res = await httpGet(`${d}/checknewtv.php`, { headers: NEWTV_HEADERS, timeout: 2500 });
      if (res && res.token_hash) {
        const decoded = b64Decode(res.token_hash);
        if (decoded && decoded.startsWith("http")) {
          cachedApiBase = decoded.trim();
          lastApiResolveTime = now;
          return cachedApiBase;
        }
      }
    } catch (_) {
    }
  }
  return cachedApiBase || "https://tv.imgcdn.kim";
}
async function getMediaMetadata(rawId, mediaType) {
  const cleanId = String(rawId || "").replace(/^(?:tmdb|movie|tv)[:\-_]/i, "").trim();
  const isSeries = mediaType === "series" || mediaType === "tv";
  const type = isSeries ? "tv" : "movie";
  if (cleanId.startsWith("tt")) {
    try {
      const cType = isSeries ? "series" : "movie";
      const cinemetaUrl = `https://v3-cinemeta.strem.io/meta/${cType}/${cleanId}.json`;
      const data = await httpGet(cinemetaUrl, { timeout: 3e3 });
      if (data && data.meta && data.meta.name) {
        return {
          title: data.meta.name,
          year: (data.meta.year || "").split("-")[0]
        };
      }
    } catch (_) {
    }
  }
  const isNumeric = /^\d+$/.test(cleanId);
  for (const key of TMDB_API_KEYS) {
    try {
      const url = isNumeric ? `https://api.themoviedb.org/3/${type}/${cleanId}?api_key=${key}` : `https://api.themoviedb.org/3/find/${cleanId}?api_key=${key}&external_source=imdb_id`;
      const res = await httpGet(url, { timeout: 3500 });
      if (res) {
        if (isNumeric && (res.title || res.name)) {
          return {
            title: res.title || res.name,
            year: (res.release_date || res.first_air_date || "").split("-")[0]
          };
        } else if (!isNumeric) {
          const results = type === "tv" ? res.tv_results : res.movie_results;
          if (results && results[0]) {
            return {
              title: results[0].title || results[0].name,
              year: (results[0].release_date || results[0].first_air_date || "").split("-")[0]
            };
          }
        }
      }
    } catch (_) {
    }
  }
  return { title: cleanId, year: null };
}
function formatCholeCard(opt) {
  var specTags = ["1080p FHD", "WEB-DL", "HLS"];
  var yr = opt.year ? " (" + opt.year + ")" : "";
  var seasonEp = opt.season && opt.episode ? " • S" + String(opt.season).padStart(2, "0") + "E" + String(opt.episode).padStart(2, "0") : "";
  var line1 = "🎬 " + (opt.title || "Unknown") + yr + seasonEp + " [" + specTags.join(" • ") + "]";
  var cleanTitle = (opt.title || "Video").replace(/[^a-zA-Z0-9]+/g, ".");
  var filename = `${cleanTitle}${seasonEp ? seasonEp.replace(/[^a-zA-Z0-9]/g, ".") : ""}.1080p.HLS-NetMirror.mkv`;
  var line2 = "📄 " + filename;
  var line3 = "💎 Dolby Digital • Multi-Audio";
  var line4 = "🌐 🇮🇳 Hindi • 🇬🇧 English • Multi";
  var meta = ["📦 Adaptive HLS", "🏷️ " + (opt.server || "NetMirror"), "🔗 NetMirror"];
  var line5 = meta.join(" • ");
  var body = [line1, line2, line3, line4, line5].filter(Boolean).join(" ");
  return {
    name: body,
    description: body,
    title: body,
    quality: "1080p",
    format: "m3u8",
    type: "m3u8",
    size: "Adaptive HLS",
    provider: "netmirror"
  };
}

function cleanTitleForCompare(str) {
  if (!str) return "";
  return String(str).toLowerCase().replace(/[^a-z0-9]/g, "");
}

async function getStreams(tmdbId, mediaType = "movie", seasonNum = 1, episodeNum = 1) {
  const isSeries = mediaType === "series" || mediaType === "tv";
  const season = parseInt(seasonNum, 10) || 1;
  const episode = parseInt(episodeNum, 10) || 1;
  let title = null;
  let year = null;
  try {
    const meta = await getMediaMetadata(tmdbId, mediaType);
    if (meta && meta.title) {
      title = meta.title;
      year = meta.year;
    }
  } catch (_) {
  }
  if (!title) {
    title = String(tmdbId || "").replace(/^(?:tmdb|movie|tv)[:\-_]/i, "").trim();
  }
  const apiBase = await resolveApiBase();
  const ottList = [
    { key: "nf", label: "Netflix" },
    { key: "pv", label: "Prime Video" },
    { key: "hs", label: "Hotstar" }
  ];
  const normalizedTarget = cleanTitleForCompare(title);
  const searchPromises = ottList.map(async (ott) => {
    try {
      const searchUrl = `${apiBase}/newtv/search.php?s=${encodeURIComponent(title)}&t=${Date.now()}`;
      const searchRes = await httpGet(searchUrl, {
        headers: { ...NEWTV_HEADERS, Ott: ott.key },
        timeout: 4500
      });
      const results2 = searchRes && searchRes.searchResult || [];
      if (!Array.isArray(results2) || results2.length === 0)
        return [];
      let match = results2.find((r) => cleanTitleForCompare(r.t) === normalizedTarget);
      if (!match) {
        match = results2.find((r) => {
          const rNorm = cleanTitleForCompare(r.t);
          return rNorm.includes(normalizedTarget) || normalizedTarget.includes(rNorm);
        });
      }
      if (!match && results2.length > 0) {
        if (results2.length === 1)
          match = results2[0];
      }
      if (!match || !match.id)
        return [];
      if (!isSeries) {
        const playerRes = await httpGet(`${apiBase}/newtv/player.php?id=${match.id}`, {
          headers: { ...NEWTV_HEADERS, Ott: ott.key },
          timeout: 4500
        });
        if (playerRes && playerRes.video_link) {
          const card = formatCholeCard({
            title: playerRes.title || match.t,
            year: year || playerRes.ep,
            server: ott.label
          });
          return [{
            name: card.name,
            title: card.title,
            quality: card.quality,
            format: "m3u8",
            url: playerRes.video_link,
            size: card.size,
            type: "m3u8",
            provider: "netmirror",
            headers: {
              "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
              "Referer": playerRes.referer || "https://net52.cc",
              "Origin": "https://net52.cc"
            }
          }];
        }
      } else {
        const postRes = await httpGet(`${apiBase}/newtv/post.php?id=${match.id}`, {
          headers: { ...NEWTV_HEADERS, Ott: ott.key },
          timeout: 4500
        });
        if (postRes && (postRes.episodes || postRes.season)) {
          let epId = null;
          let epName = `Episode ${episode}`;
          const seasons = postRes.season || [];
          let targetSeason = seasons.find((s) => {
            const sStr = (s.s || "").toLowerCase();
            return sStr.includes(`season ${season}`) || sStr.includes(`s${season}`) || sStr.includes(`season 0${season}`) || sStr.includes(`s0${season}`) || sStr.startsWith(`${season}`) || sStr.includes(`(${season})`);
          });
          if (!targetSeason && seasons[season - 1]) {
            targetSeason = seasons[season - 1];
          }
          if (targetSeason && !targetSeason.selected) {
            const epRes = await httpGet(`${apiBase}/newtv/episodes.php?id=${targetSeason.id}`, {
              headers: { ...NEWTV_HEADERS, Ott: ott.key },
              timeout: 4500
            });
            const eps = epRes && epRes.episodes || [];
            const epMatch = eps.find((e) => {
              if (parseInt(e.ep, 10) === episode)
                return true;
              if (Array.isArray(e.info)) {
                return e.info.some((i) => {
                  const iStr = (i || "").toLowerCase();
                  return iStr === `e${episode}` || iStr === `e0${episode}` || iStr === `${episode}`;
                });
              }
              return false;
            }) || eps[episode - 1];
            if (epMatch) {
              epId = epMatch.id;
              if (epMatch.t)
                epName = epMatch.t;
            }
          } else {
            const eps = (postRes.episodes || []).filter(Boolean);
            const epMatch = eps.find((e) => {
              if (parseInt(e.ep, 10) === episode)
                return true;
              if (Array.isArray(e.info)) {
                return e.info.some((i) => {
                  const iStr = (i || "").toLowerCase();
                  return iStr === `e${episode}` || iStr === `e0${episode}`;
                });
              }
              return false;
            }) || eps[episode - 1];
            if (epMatch) {
              epId = epMatch.id;
              if (epMatch.t)
                epName = epMatch.t;
            }
          }
          if (epId) {
            const playerRes = await httpGet(`${apiBase}/newtv/player.php?id=${epId}`, {
              headers: { ...NEWTV_HEADERS, Ott: ott.key },
              timeout: 4500
            });
            if (playerRes && playerRes.video_link) {
              const card = formatCholeCard({
                title: playerRes.title || match.t,
                year: year || playerRes.ep,
                season: season,
                episode: episode,
                server: ott.label
              });
              return [{
                name: card.name,
                title: card.title,
                quality: card.quality,
                format: "m3u8",
                url: playerRes.video_link,
                size: card.size,
                type: "m3u8",
                provider: "netmirror",
                headers: {
                  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
                  "Referer": playerRes.referer || "https://net52.cc",
                  "Origin": "https://net52.cc"
                }
              }];
            }
          }
        }
      }
      return [];
    } catch (_) {
      return [];
    }
  });
  const results = await Promise.allSettled(searchPromises);
  const streams = [];
  for (const r of results) {
    if (r.status === "fulfilled" && Array.isArray(r.value)) {
      streams.push(...r.value);
    }
  }
  return streams;
}
module.exports = {
  getStreams
};
