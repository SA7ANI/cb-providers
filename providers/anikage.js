// AniKage Provider for Nuvio & Chole Bhature Ecosystem
// Reverse-engineered from anikage.cc SvelteKit proxy & player layer

const PROXY_URL = "https://og.bakayaro.live";
const ANIKAGE_BASE = "https://anikage.cc";

const DEFAULT_HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  "Accept": "application/json, text/html, */*"
};

async function httpGet(url, customHeaders = {}) {
  const headers = Object.assign({}, DEFAULT_HEADERS, customHeaders);
  if (typeof fetch !== "undefined") {
    try {
      const res = await fetch(url, { headers });
      const ct = res.headers.get("content-type") || "";
      if (ct.includes("application/json")) {
        return await res.json();
      }
      return await res.text();
    } catch (e) {}
  }

  try {
    const https = require("https");
    const http = require("http");
    const client = url.startsWith("https") ? https : http;
    return new Promise((resolve) => {
      client.get(url, { headers }, (res) => {
        let data = "";
        res.on("data", (chunk) => { data += chunk; });
        res.on("end", () => {
          try {
            resolve(JSON.parse(data));
          } catch (err) {
            resolve(data);
          }
        });
      }).on("error", () => resolve(null));
    });
  } catch (e) {
    return null;
  }
}

async function getMediaMeta(id, type) {
  const isImdb = typeof id === "string" && id.startsWith("tt");
  const stremioType = (type === "movie" || type === "movies") ? "movie" : "series";

  if (isImdb) {
    try {
      const d = await httpGet(`https://v3-cinemeta.strem.io/meta/${stremioType}/${id}.json`);
      if (d && d.meta && d.meta.name) {
        return { title: d.meta.name, year: d.meta.year };
      }
    } catch (e) {}
  }

  const tmdbType = (type === "movie" || type === "movies") ? "movie" : "tv";
  const apiKeys = [
    "439c478a771f35c05022f9feabcca01c",
    "1865f43a0549ae50d7878097d6244770",
    "b025d23315a6b0c266cc6cb221a68134",
    "847a158b5489812f851da8cf02476566"
  ];

  for (const key of apiKeys) {
    const rawTmdbUrl = `https://api.themoviedb.org/3/${tmdbType}/${id}?api_key=${key}`;
    const urls = [
      `https://worker.zendax.me/api/fetch?url=${encodeURIComponent(rawTmdbUrl)}`,
      rawTmdbUrl
    ];

    for (const u of urls) {
      try {
        const d = await httpGet(u);
        if (d && typeof d === "object") {
          const title = d.name || d.title || d.original_name || d.original_title;
          if (title) {
            return {
              title: title,
              year: (d.first_air_date || d.release_date || "").substring(0, 4)
            };
          }
        }
      } catch (e) {}
    }
  }

  return null;
}

function formatCholeCard(opt) {
  const audio = opt.audio || "SUB";
  const server = opt.server || "Koto";
  const title = opt.title || "Anime";
  const yr = opt.year ? " (" + opt.year + ")" : "";
  const seasonEp = opt.season && opt.episode ? " • S" + String(opt.season).padStart(2, "0") + "E" + String(opt.episode).padStart(2, "0") : (opt.episode ? " • Ep " + opt.episode : "");
  const specTags = ["1080p FHD", "WEB-DL", "HLS"];
  
  const line1 = "🎬 " + title + yr + seasonEp + " [" + specTags.join(" • ") + "]";
  const cleanTitle = (opt.title || "Anime").replace(/[^a-zA-Z0-9]+/g, ".");
  const filename = `${cleanTitle}${seasonEp ? seasonEp.replace(/[^a-zA-Z0-9]/g, ".") : ""}.1080p.HLS.${audio}-AniKage.mkv`;
  const line2 = "📄 " + filename;
  const line3 = "💎 AAC 2.0 • Softsub";
  const line4 = audio === "DUB" ? "🌐 🇬🇧 English DUB" : "🌐 🇯🇵 Japanese SUB • Multi-Subs";
  const meta = ["📦 Adaptive HLS", "🏷️ " + server, "🔗 AniKage"];
  const line5 = meta.join(" • ");
  
  const body = [line1, line2, line3, line4, line5].filter(Boolean).join(" ");
  return {
    name: body,
    description: body,
    title: body,
    quality: "1080p",
    format: "m3u8",
    type: "m3u8",
    size: "Adaptive HLS",
    provider: "anikage"
  };
}

async function getStreams(tmdbId, mediaType, seasonNum = 1, episodeNum = 1) {
  try {
    const meta = await getMediaMeta(tmdbId, mediaType);
    if (!meta || !meta.title) return [];

    const query = meta.title.replace(/[^a-zA-Z0-9\s]/g, " ").trim();
    const searchUrl = `${ANIKAGE_BASE}/api/media/anime/browse?q=${encodeURIComponent(query)}&limit=10`;
    const sData = await httpGet(searchUrl, { "Referer": `${ANIKAGE_BASE}/browse` });
    if (!sData || typeof sData !== "object") return [];

    const results = sData.data || sData.results || [];
    if (!results.length) return [];

    const cleanQ = query.toLowerCase();
    const anime = results.find(r => {
      const eng = (r.title?.english || "").toLowerCase();
      const rom = (r.title?.romaji || "").toLowerCase();
      return eng.includes(cleanQ) || cleanQ.includes(eng) || rom.includes(cleanQ) || cleanQ.includes(rom);
    }) || results[0];

    const slug = anime.slug;
    if (!slug) return [];

    const animeTitle = anime.title?.english || anime.title?.romaji || meta.title;
    const reqSeason = Number(seasonNum) || 1;
    const reqEpisode = (mediaType === "movie" || !episodeNum) ? 1 : (Number(episodeNum) || 1);

    // Fetch episodes list to resolve exact episode number
    let targetEpNum = reqEpisode;
    try {
      const epData = await httpGet(`${ANIKAGE_BASE}/api/media/anime/${slug}/episodes`, { "Referer": `${ANIKAGE_BASE}/anime/watch/${slug}` });
      const epList = Array.isArray(epData) ? epData : (epData && epData.episodes ? epData.episodes : []);
      if (epList.length > 0) {
        const matchedEp = epList.find(e => (Number(e.seasonNumber) === reqSeason && Number(e.episodeInSeason) === reqEpisode))
          || epList.find(e => Number(e.number) === reqEpisode)
          || epList[0];
        if (matchedEp && matchedEp.number !== undefined) {
          targetEpNum = Number(matchedEp.number);
        }
      }
    } catch (e) {}

    const srvUrl = `${ANIKAGE_BASE}/api/media/anime/${slug}/episodes/${targetEpNum}/servers`;
    const srvData = await httpGet(srvUrl, { "Referer": `${ANIKAGE_BASE}/anime/watch/${slug}` });
    if (!srvData || !Array.isArray(srvData.servers) || !srvData.servers.length) return [];

    const streams = [];
    const serverList = srvData.servers.slice(0, 5);

    for (const s of serverList) {
      const subTypes = Array.isArray(s.subTypes) && s.subTypes.length ? s.subTypes : ["sub"];
      for (const subType of subTypes) {
        try {
          const srcUrl = `${ANIKAGE_BASE}/api/media/anime/${slug}/episodes/${targetEpNum}/sources?provider=${encodeURIComponent(s.id)}`;
          const srcData = await httpGet(srcUrl, { "Referer": `${ANIKAGE_BASE}/anime/watch/${slug}` });
          if (!srcData || !Array.isArray(srcData.sources) || !srcData.sources.length) continue;

          const mainSrc = srcData.sources[0];
          let streamUrl = "";
          if (mainSrc.url) {
            streamUrl = `${PROXY_URL}/m3u8/${mainSrc.url}`;
          } else if (mainSrc.embedUrl) {
            streamUrl = mainSrc.embedUrl;
          }

          if (!streamUrl || !streamUrl.startsWith("http")) continue;

          const subs = (srcData.subtitles || []).map(sub => {
            let fileUrl = sub.file || sub.url || "";
            if (fileUrl && !fileUrl.startsWith("http")) {
              fileUrl = `${PROXY_URL}/stream/${fileUrl}`;
            }
            return {
              file: fileUrl,
              label: sub.label || sub.language || "Subtitle",
              kind: "captions",
              default: !!sub.default
            };
          }).filter(sub => sub.file);

          const card = formatCholeCard({
            audio: subType.toUpperCase(),
            server: (s.label || s.id).toUpperCase(),
            title: animeTitle,
            year: meta.year,
            season: reqSeason,
            episode: targetEpNum,
            subtitles: subs
          });

          streams.push({
            name: card.name,
            title: card.title,
            url: streamUrl,
            quality: card.quality,
            format: card.format,
            type: card.type,
            size: card.size,
            headers: {
              "User-Agent": DEFAULT_HEADERS["User-Agent"],
              "Referer": `${ANIKAGE_BASE}/`
            },
            subtitles: subs,
            provider: "anikage"
          });
        } catch (err) {}
      }
    }

    return streams;
  } catch (e) {
    return [];
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { getStreams };
}
