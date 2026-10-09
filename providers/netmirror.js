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
async function httpGet(url, options = {}) {
  const headers = options.headers || {};
  const timeout = options.timeout || 6e3;
  if (typeof axios !== "undefined" && axios && axios.get) {
    try {
      const res = await axios.get(url, { headers, timeout });
      return res.data;
    } catch (e) {
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
  if (typeof require === "function") {
    try {
      const axios2 = require("axios");
      const res = await axios2.get(url, { headers, timeout });
      return res.data;
    } catch (_) {
    }
    const https = require("https");
    const http = require("http");
    return new Promise((resolve, reject) => {
      const client = url.startsWith("https") ? https : http;
      const req = client.get(url, { headers, timeout }, (res) => {
        let data = "";
        res.on("data", (chunk) => data += chunk);
        res.on("end", () => {
          try {
            resolve(JSON.parse(data));
          } catch (_) {
            resolve(data);
          }
        });
      });
      req.on("error", reject);
      req.on("timeout", () => {
        req.destroy();
        reject(new Error("Request timeout"));
      });
    });
  }
  throw new Error("No HTTP client available in this environment");
}
async function resolveApiBase() {
  const now = Date.now();
  if (cachedApiBase && now - lastApiResolveTime < 36e5) {
    return cachedApiBase;
  }
  for (const d of DISCOVERY_DOMAINS) {
    try {
      const res = await httpGet(`${d}/checknewtv.php`, { headers: NEWTV_HEADERS, timeout: 3500 });
      if (res && res.token_hash) {
        let decoded = "";
        if (typeof atob === "function") {
          decoded = atob(res.token_hash);
        } else if (typeof Buffer !== "undefined") {
          decoded = Buffer.from(res.token_hash, "base64").toString("utf8");
        }
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
async function getMediaMetadata(tmdbId, mediaType) {
  const type = mediaType === "series" || mediaType === "tv" ? "tv" : "movie";
  const isId = /^\d+$/.test(String(tmdbId));
  for (const key of TMDB_API_KEYS) {
    try {
      const url = isId ? `https://api.themoviedb.org/3/${type}/${tmdbId}?api_key=${key}` : `https://api.themoviedb.org/3/find/${tmdbId}?api_key=${key}&external_source=imdb_id`;
      const res = await httpGet(url, { timeout: 4e3 });
      if (res) {
        if (isId) {
          return {
            title: res.title || res.name,
            year: (res.release_date || res.first_air_date || "").split("-")[0]
          };
        } else {
          const results = type === "tv" ? res.tv_results : res.movie_results;
          if (results && results.length > 0) {
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
  return { title: null, year: null };
}
function cleanTitleForCompare(str) {
  return (str || "").toLowerCase().replace(/[^a-z0-9]/g, "");
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
    title = String(tmdbId);
  }
  const apiBase = await resolveApiBase();
  const ottList = [
    { key: "nf", label: "Netflix" },
    { key: "pv", label: "Prime Video" },
    { key: "hs", label: "Hotstar" }
  ];
  const streams = [];
  const normalizedTarget = cleanTitleForCompare(title);
  for (const ott of ottList) {
    try {
      const searchUrl = `${apiBase}/newtv/search.php?s=${encodeURIComponent(title)}&t=${Date.now()}`;
      const searchRes = await httpGet(searchUrl, {
        headers: { ...NEWTV_HEADERS, Ott: ott.key },
        timeout: 4500
      });
      const results = searchRes && searchRes.searchResult || [];
      if (!Array.isArray(results) || results.length === 0)
        continue;
      let match = results.find((r) => cleanTitleForCompare(r.t) === normalizedTarget);
      if (!match) {
        match = results.find((r) => cleanTitleForCompare(r.t).includes(normalizedTarget) || normalizedTarget.includes(cleanTitleForCompare(r.t)));
      }
      if (!match || !match.id)
        continue;
      if (!isSeries) {
        const playerRes = await httpGet(`${apiBase}/newtv/player.php?id=${match.id}`, {
          headers: { ...NEWTV_HEADERS, Ott: ott.key },
          timeout: 4500
        });
        if (playerRes && playerRes.video_link) {
          streams.push({
            name: `NetMirror [${ott.label}]`,
            title: `NetMirror | 1080p FHD | \u26A1 HLS \u2022 Multi-Audio
\u{1F3AC} ${playerRes.title || match.t} (${year || playerRes.ep || "Movie"})`,
            quality: "1080p",
            url: playerRes.video_link,
            size: "Auto HLS",
            type: "m3u8",
            provider: "netmirror",
            headers: {
              "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
              "Referer": playerRes.referer || "https://net52.cc",
              "Origin": "https://net52.cc"
            }
          });
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
          const targetSeason = seasons.find((s) => {
            const sStr = (s.s || "").toLowerCase();
            return sStr.includes(`season ${season}`) || sStr.includes(`s${season}`);
          });
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
                return e.info.some((i) => (i || "").toLowerCase() === `e${episode}`);
              }
              return false;
            });
            if (epMatch) {
              epId = epMatch.id;
              if (epMatch.t)
                epName = epMatch.t;
            }
          } else {
            const eps = (postRes.episodes || []).filter(Boolean);
            const epMatch = eps.find((e) => parseInt(e.ep, 10) === episode);
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
              streams.push({
                name: `NetMirror [${ott.label}]`,
                title: `NetMirror | 1080p FHD | \u26A1 HLS \u2022 Multi-Audio
\u{1F3AC} ${postRes.title || match.t} (S${season} E${episode} - ${epName})`,
                quality: "1080p",
                url: playerRes.video_link,
                size: "Auto HLS",
                type: "m3u8",
                provider: "netmirror",
                headers: {
                  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
                  "Referer": playerRes.referer || "https://net52.cc",
                  "Origin": "https://net52.cc"
                }
              });
            }
          }
        }
      }
    } catch (_) {
    }
  }
  return streams;
}
module.exports = {
  getStreams
};
