const cheerio = require("cheerio-without-node-native");

const BASE_URL = "https://animesalt.cx";
const TMDB_API_KEYS = [
  "1865f43a0549ca50d341dd9ab8b29f49",
  "439c478a771f35c05022f9feabcca01c",
  "e49339e830e014e414c2b9a71b2d4f82"
];
const TMDB_BASE_URL = "https://api.tmdb.org/3";
const DEFAULT_HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.9",
  "Referer": `${BASE_URL}/`
};

function normalizeTitle(str) {
  if (!str) return "";
  return str.toLowerCase().replace(/[^\w\s]/gi, " ").replace(/\s+/g, " ").trim();
}

function titleSimilarity(s1, s2) {
  const n1 = normalizeTitle(s1);
  const n2 = normalizeTitle(s2);
  if (!n1 || !n2) return 0;
  if (n1 === n2) return 1;
  if (n1.includes(n2) || n2.includes(n1)) return 0.85;
  const w1 = new Set(n1.split(" ").filter(Boolean));
  const w2 = new Set(n2.split(" ").filter(Boolean));
  let intersection = 0;
  for (const w of w1) {
    if (w2.has(w)) intersection++;
  }
  const union = (new Set([...w1, ...w2])).size;
  return union > 0 ? intersection / union : 0;
}

function formatCholeCard(opt) {
  var raw = [opt.filename || "", opt.rawText || "", opt.server || "", opt.quality || "", opt.size || "", opt.title || ""].join(" ");
  var text = raw.trim();
  var res = "";
  var qCheck = opt.quality ? String(opt.quality).trim() : "";
  if (/\b(?:2160p|4k|uhd)\b/i.test(qCheck)) res = "4K UHD";
  else if (/\b(?:1080p|fhd)\b/i.test(qCheck)) res = "1080p FHD";
  else if (/\b(?:720p|hd)\b/i.test(qCheck)) res = "720p HD";
  else if (/\b(?:480p|sd)\b/i.test(qCheck)) res = "480p";
  else if (/\b(?:2160p|4k|uhd)\b/i.test(text)) res = "4K UHD";
  else if (/\b(?:1080p|fhd)\b/i.test(text)) res = "1080p FHD";
  else if (/\b(?:720p|hd)\b/i.test(text)) res = "720p HD";
  else if (/\b(?:480p|sd)\b/i.test(text)) res = "480p";
  else res = qCheck ? qCheck.toUpperCase() : "1080p FHD";

  var source = "WEB-DL";
  var codecs = ["HEVC"];
  var hdr = [];
  var audio = ["AAC"];
  var uniqueLangs = [];
  if (opt.defaultLang) uniqueLangs.push(opt.defaultLang);

  var filename = (opt.filename || "").trim();
  if (!filename || filename === opt.title) {
    var baseTitle = (opt.title || "Video").replace(/[^a-zA-Z0-9]+/g, ".");
    var yr = opt.year ? "." + opt.year : "";
    var se = opt.season && opt.episode ? ".S" + String(opt.season).padStart(2, "0") + "E" + String(opt.episode).padStart(2, "0") : "";
    var r = res ? "." + res.replace(/\s+/g, ".") : "";
    var g = opt.server ? "-" + opt.server.replace(/[\s\-_]+/g, "") : "-" + (opt.provider || "AnimeSalt");
    filename = baseTitle + yr + se + r + ".WEB-DL" + g + ".mp4";
  }

  var specTags = [res, source].concat(codecs).filter(Boolean);
  var seasonEp = opt.season && opt.episode ? " • S" + String(opt.season).padStart(2, "0") + "E" + String(opt.episode).padStart(2, "0") : "";
  var line1 = "🎬 " + (opt.title || "Unknown") + (opt.year ? " (" + opt.year + ")" : "") + seasonEp + (specTags.length ? " [" + specTags.join(" • ") + "]" : "");
  var line2 = "📄 " + filename;
  var av = hdr.concat(audio);
  var line3 = av.length ? "💎 " + av.join(" • ") : "";
  var line4 = uniqueLangs.length ? "🌐 " + uniqueLangs.join(" • ") : "";

  var meta = [];
  if (opt.size) meta.push("📦 " + opt.size);
  if (opt.server) meta.push("🏷️ " + opt.server);
  meta.push("🔗 " + (opt.provider || "AnimeSalt"));
  var line5 = meta.join(" • ");

  var body = [line1, line2, line3, line4, line5].filter(Boolean).join(" ");
  var qualitySlug = "1080p";
  if (res.indexOf("4K") !== -1 || res.indexOf("2160") !== -1) qualitySlug = "4k";
  else if (res.indexOf("1080") !== -1) qualitySlug = "1080p";
  else if (res.indexOf("720") !== -1) qualitySlug = "720p";
  else if (res.indexOf("480") !== -1) qualitySlug = "480p";

  return {
    name: body,
    description: body,
    title: body,
    quality: qualitySlug,
    size: opt.size || ""
  };
}

async function getTMDBDetails(tmdbId, mediaType) {
  const isSeries = mediaType === "tv" || mediaType === "series";
  const endpoint = isSeries ? "tv" : "movie";
  const isImdb = typeof tmdbId === "string" && tmdbId.startsWith("tt");
  if (isImdb) {
    try {
      const cRes = await fetch(`https://v3-cinemeta.strem.io/meta/${isSeries ? "series" : "movie"}/${tmdbId}.json`);
      if (cRes.ok) {
        const cData = await cRes.json();
        if (cData && cData.meta && cData.meta.name) {
          return {
            title: cData.meta.name,
            originalTitle: cData.meta.name,
            year: cData.meta.year || ""
          };
        }
      }
    } catch (_) {}
  }
  for (const apiKey of TMDB_API_KEYS) {
    const rawUrl = `https://api.themoviedb.org/3/${endpoint}/${tmdbId}?api_key=${apiKey}`;
    try {
      const res = await fetch(rawUrl, {
        headers: { "Accept": "application/json", "User-Agent": "Mozilla/5.0" }
      });
      if (res.ok) {
        const data = await res.json();
        const title = data.name || data.title || "";
        if (title) {
          return {
            title: title,
            originalTitle: data.original_name || data.original_title || title,
            year: (data.first_air_date || data.release_date || "").split("-")[0]
          };
        }
      }
    } catch (_) {}
  }
  return { title: "", originalTitle: "", year: "" };
}

async function decodeAbyssSources(url) {
  try {
    const cleanUrl = url.replace("https://short.icu", "https://player.abyssplayer.com");
    const reqHeaders = {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36",
      "Origin": "https://playhydrax.com",
      "Referer": "https://playhydrax.com/"
    };
    const res = await fetch(cleanUrl, { headers: reqHeaders });
    if (!res.ok) return [];
    const html = await res.text();
    const match = html.match(/const\s+datas\s*=\s*"([^"]*)"/);
    if (!match || !match[1]) return [];
    const decRes = await fetch("https://enc-dec.app/api/dec-abyss", {
      method: "POST",
      headers: Object.assign({}, reqHeaders, { "Content-Type": "application/json" }),
      body: JSON.stringify({ text: match[1] })
    });
    if (!decRes.ok) return [];
    const decData = await decRes.json();
    return decData && decData.result && decData.result.sources || [];
  } catch (_) {
    return [];
  }
}

async function getStreams(tmdbId, mediaType = "tv", season = 1, episode = 1) {
  try {
    const mediaInfo = await getTMDBDetails(tmdbId, mediaType);
    if (!mediaInfo.title) return [];
    const isSeries = mediaType === "tv" || mediaType === "series";
    const s = parseInt(season) || 1;
    const e = parseInt(episode) || 1;

    const searchUrl = `${BASE_URL}/?s=${encodeURIComponent(mediaInfo.title)}`;
    const searchRes = await fetch(searchUrl, { headers: DEFAULT_HEADERS });
    if (!searchRes.ok) return [];
    const searchHtml = await searchRes.text();
    const $ = cheerio.load(searchHtml);

    const candidates = [];
    $("article").each((i, el) => {
      const itemTitle = $(el).find("h2.entry-title, .entry-title").text().trim();
      const itemHref = $(el).find("a").attr("href");
      if (itemHref && (itemHref.includes("/series/") || itemHref.includes("/movies/"))) {
        const sim = Math.max(
          titleSimilarity(mediaInfo.title, itemTitle),
          mediaInfo.originalTitle ? titleSimilarity(mediaInfo.originalTitle, itemTitle) : 0
        );
        candidates.push({ title: itemTitle, url: itemHref, isSeries: itemHref.includes("/series/"), sim });
      }
    });

    if (candidates.length === 0) return [];
    candidates.sort((a, b) => b.sim - a.sim);
    const matched = candidates[0];
    let targetUrl = matched.url;

    if (isSeries && matched.isSeries) {
      const seriesRes = await fetch(matched.url, { headers: DEFAULT_HEADERS });
      if (seriesRes.ok) {
        const seriesHtml = await seriesRes.text();
        const $s = cheerio.load(seriesHtml);
        const epPattern = new RegExp(`[\\b/-]${s}x${e}[\\b/]`, "i");
        let epLink = null;
        $s('a[href*="/episode/"]').each((i, el) => {
          const h = $s(el).attr("href");
          if (h && epPattern.test(h)) {
            epLink = h;
          }
        });
        if (!epLink) {
          const slugMatch = matched.url.match(/\/series\/([^\/]+)/);
          if (slugMatch) {
            epLink = `${BASE_URL}/episode/${slugMatch[1]}-${s}x${e}/`;
          }
        }
        if (epLink) targetUrl = epLink;
      }
    }

    const pageRes = await fetch(targetUrl, { headers: DEFAULT_HEADERS });
    if (!pageRes.ok) return [];
    const pageHtml = await pageRes.text();
    const $p = cheerio.load(pageHtml);

    const finalStreams = [];
    const seen = new Set();

    const playerIframes = [];
    $p('iframe[src*="player.php"], iframe[data-src*="player.php"]').each((i, el) => {
      playerIframes.push($p(el).attr("src") || $p(el).attr("data-src"));
    });

    for (const pUrl of playerIframes) {
      const dataMatch = pUrl.match(/data=([^&"']+)/);
      if (dataMatch) {
        try {
          const decodedStr = Buffer.from(decodeURIComponent(dataMatch[1]), "base64").toString("utf-8");
          const list = JSON.parse(decodedStr);
          for (const item of list) {
            const abyssUrl = item.link;
            const lang = item.language;
            const decSources = await decodeAbyssSources(abyssUrl);
            for (const ds of decSources) {
              if (ds.url && !seen.has(ds.url)) {
                seen.add(ds.url);
                const sizeStr = ds.size ? (ds.size / (1024 * 1024) > 1024 ? (ds.size / (1024 * 1024 * 1024)).toFixed(2) + " GB" : (ds.size / (1024 * 1024)).toFixed(0) + " MB") : "";
                const langEmoji = lang === "Hindi" ? "🇮🇳 Hindi" : lang === "English" ? "🇬🇧 English" : lang === "Japanese" ? "🇯🇵 Japanese" : lang;
                const card = formatCholeCard({
                  provider: "AnimeSalt",
                  title: mediaInfo.title,
                  year: mediaInfo.year,
                  season: isSeries ? s : null,
                  episode: isSeries ? e : null,
                  server: "Abyss Fast",
                  quality: ds.type || "1080p",
                  size: sizeStr,
                  defaultLang: langEmoji
                });
                finalStreams.push({
                  name: card.title,
                  title: card.title,
                  quality: card.quality,
                  size: card.size,
                  url: ds.url,
                  provider: "animesalt"
                });
              }
            }
          }
        } catch (_) {}
      }
    }

    return finalStreams;
  } catch (err) {
    return [];
  }
}

module.exports = { getStreams };
