const TMDB_API_KEYS = [
  "1865f43a0549ca50d341dd9ab8b29f49",
  "439c478a771f35c05022f9feabcca01c",
  "8265bd1679663a7ea12ac168da84d2e8",
  "e49339e830e014e414c2b9a71b2d4f82"
];
const CONFIG_TAGS = [
  "aHR0cHM6Ly9hLjExMTQ3Ny54eXovOkExMQ"
  // https://a.111477.xyz/:A11
];
async function httpGet(url, options = {}) {
  const headers = options.headers || {};
  const timeout = options.timeout || 7e3;
  if (typeof axios !== "undefined" && axios && axios.get) {
    try {
      const res = await axios.get(url, { headers, timeout });
      return res.data;
    } catch (_) {}
  }
  if (typeof require === "function") {
    try {
      const ax = require("axios");
      if (ax && ax.get) {
        const res = await ax.get(url, { headers, timeout });
        return res.data;
      }
    } catch (_) {}
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
      if (timer) clearTimeout(timer);
      const text = await res.text();
      try {
        return JSON.parse(text);
      } catch (_) {
        return text;
      }
    } catch (e) {
      if (timer) clearTimeout(timer);
      throw e;
    }
  }
  throw new Error("No HTTP client available");
}

async function getMediaMeta(id, mediaType = "movie") {
  const isImdb = typeof id === "string" && id.startsWith("tt");
  const stremioType = (mediaType === "tv" || mediaType === "series") ? "series" : "movie";
  if (isImdb) {
    try {
      const d = await httpGet(`https://v3-cinemeta.strem.io/meta/${stremioType}/${id}.json`);
      if (d && d.meta && d.meta.name) {
        return {
          imdbId: id,
          title: d.meta.name,
          year: d.meta.year || ""
        };
      }
    } catch (_) {}
  }

  const endpoint = (mediaType === "tv" || mediaType === "series") ? "tv" : "movie";
  for (const key of TMDB_API_KEYS) {
    try {
      const url = `https://api.themoviedb.org/3/${endpoint}/${id}?api_key=${key}&append_to_response=external_ids`;
      const data = await httpGet(url, {
        headers: { "User-Agent": "Mozilla/5.0" },
        timeout: 4e3
      });
      if (data) {
        const imdbId = (data.external_ids && data.external_ids.imdb_id) || (String(id).startsWith("tt") ? id : null);
        const title = data.title || data.name || data.original_title || data.original_name || "";
        const year = (data.release_date || data.first_air_date || "").split("-")[0];
        if (imdbId) {
          return { imdbId, title, year };
        }
      }
    } catch (_) {}
  }
  return { imdbId: isImdb ? id : null, title: "", year: "" };
}

function formatCholeCard(opt) {
  var raw = [opt.filename || "", opt.rawText || "", opt.server || "", opt.quality || "", opt.size || "", opt.title || ""].join(" ");
  var text = raw.trim();

  var res = "";
  var qCheck = opt.quality ? String(opt.quality).trim() : "";
  if (/\b(?:2160p|4k|uhd)\b/i.test(qCheck) || /\b(?:2160p|4k|uhd)\b/i.test(text)) res = "4K UHD";
  else if (/\b(?:1080p|fhd)\b/i.test(qCheck) || /\b(?:1080p|fhd)\b/i.test(text)) res = "1080p FHD";
  else if (/\b(?:720p|hd)\b/i.test(qCheck) || /\b(?:720p|hd)\b/i.test(text)) res = "720p HD";
  else if (/\b(?:480p|sd)\b/i.test(qCheck) || /\b(?:480p|sd)\b/i.test(text)) res = "480p SD";
  else res = "1080p FHD";

  var source = "";
  if (/\bremux\b/i.test(text)) source = "REMUX";
  else if (/\bbluray|blu-ray\b/i.test(text)) source = "BluRay";
  else if (/\bweb-?dl|webrip\b/i.test(text)) source = "WEB-DL";
  else if (/\bhdtv\b/i.test(text)) source = "HDTV";

  var codecs = [];
  if (/\b(?:hevc|x265|h\.?265|10bit)\b/i.test(text)) codecs.push("HEVC");
  else if (/\b(?:avc|x264|h\.?264)\b/i.test(text)) codecs.push("AVC");

  var hdr = [];
  if (/\b(?:dolby\s*vision|dv)\b/i.test(text)) hdr.push("Dolby Vision");
  if (/\bhdr10\+\b/i.test(text)) hdr.push("HDR10+");
  else if (/\b(?:hdr10|hdr)\b/i.test(text)) hdr.push("HDR");

  var audio = [];
  if (/\b(?:atmos|ddpa)\b/i.test(text)) audio.push("Dolby Atmos 5.1");
  else if (/\btruehd\b/i.test(text)) audio.push("TrueHD 5.1");
  else if (/\bdts-?hd(?:\s*ma)?\b/i.test(text)) audio.push("DTS-HD MA 5.1");
  else if (/\bdts\b/i.test(text)) audio.push("DTS 5.1");
  else if (/\b(?:ddp|dd\+|eac3)\b/i.test(text)) audio.push("DDP 5.1");
  else if (/\b(?:dd|ac3)\b/i.test(text)) audio.push("DD 5.1");
  else if (/\baac\b/i.test(text)) audio.push("AAC");

  var langs = [];
  if (/\b(?:hindi|hin)\b/i.test(text)) langs.push("🇮🇳 Hindi");
  if (/\b(?:tamil|tam)\b/i.test(text)) langs.push("🇮🇳 Tamil");
  if (/\b(?:telugu|tel)\b/i.test(text)) langs.push("🇮🇳 Telugu");
  if (/\b(?:english|eng)\b/i.test(text)) langs.push("🇬🇧 English");
  if (/\b(?:japanese|jap|jpn)\b/i.test(text)) langs.push("🇯🇵 Japanese");
  if (/\bdual[- ]?audio\b/i.test(text)) langs.push("🌐 Dual-Audio");
  if (/\bmulti[- ]?audio\b/i.test(text)) langs.push("🌐 Multi-Audio");
  if (langs.length === 0) langs.push("🌐 Multi-Audio");
  var uniqueLangs = Array.from(new Set(langs));

  var sizeMatch = text.match(/(?:💾\s*|\[|\b)([0-9.]+\s*[GM]B)(?:\]|\b)/i);
  var rawSize = opt.size || (sizeMatch ? sizeMatch[1] : "");
  var size = rawSize ? rawSize.replace(/([0-9.]+)\s*([GM]B)/i, "$1 $2").toUpperCase() : "";

  var server = opt.server || "DahmerMovies";
  var provider = opt.provider || "DahmerMovies";

  var nameParts = [provider];
  if (server && server !== provider) nameParts.push("🏷️ " + server);
  if (res) nameParts.push(res);
  if (source) nameParts.push(source);
  if (codecs.length) nameParts.push(codecs.join(" "));
  if (hdr.length) nameParts.push(hdr.join(" "));
  if (audio.length) nameParts.push(audio[0]);
  if (uniqueLangs.length) nameParts.push(uniqueLangs.slice(0, 2).join(" + "));
  var nameLine = nameParts.join(" • ");

  var filename = (opt.filename || "").trim();
  if (!filename || filename === opt.title) {
    var baseTitle = (opt.title || "Video").replace(/[^a-zA-Z0-9]+/g, ".");
    var yr = opt.year ? "." + opt.year : "";
    var se = opt.season && opt.episode ? ".S" + String(opt.season).padStart(2, "0") + "E" + String(opt.episode).padStart(2, "0") : "";
    var r = res ? "." + res.replace(/\s+/g, ".") : "";
    var s = source ? "." + source : "";
    var c = codecs.length ? "." + codecs.join(".") : "";
    var a = audio.length ? "." + audio[0].replace(/[^a-zA-Z0-9]+/g, ".") : "";
    var g = "-" + provider;
    filename = baseTitle + yr + se + r + s + c + a + g + ".mkv";
  }

  var specTags = [res, source].concat(codecs).filter(Boolean);
  var seasonEp = opt.season && opt.episode ? " • S" + String(opt.season).padStart(2, "0") + "E" + String(opt.episode).padStart(2, "0") : "";
  var line1 = "🎬 " + (opt.title || "Unknown") + (opt.year ? " (" + opt.year + ")" : "") + seasonEp + (specTags.length ? " [" + specTags.join(" • ") + "]" : "");
  var line2 = "📄 " + filename;
  var av = hdr.concat(audio);
  var line3 = av.length ? "💎 " + av.join(" • ") : "";
  var line4 = uniqueLangs.length ? "🌐 " + uniqueLangs.join(" • ") : "";
  var metaArr = [];
  if (size) metaArr.push("📦 " + size);
  if (server) metaArr.push("🏷️ " + server);
  metaArr.push("🔗 " + provider);
  var line5 = metaArr.join(" • ");

  var body = [line1, line2, line3, line4, line5].filter(Boolean).join("\n");
  var qualitySlug = "1080p";
  if (res.indexOf("4K") !== -1 || res.indexOf("2160") !== -1) qualitySlug = "4k";
  else if (res.indexOf("1080") !== -1) qualitySlug = "1080p";
  else if (res.indexOf("720") !== -1) qualitySlug = "720p";
  else if (res.indexOf("480") !== -1) qualitySlug = "480p";

  return {
    name: nameLine,
    title: body,
    quality: qualitySlug,
    size: size || "Direct",
    provider: provider.toLowerCase()
  };
}

async function getStreams(tmdbId, mediaType = "movie", season = 1, episode = 1) {
  if (mediaType === "tv" || mediaType === "series") {
    return [];
  }
  const mediaMeta = await getMediaMeta(tmdbId, "movie");
  if (!mediaMeta || !mediaMeta.imdbId) return [];

  const streams = [];
  for (const tag of CONFIG_TAGS) {
    try {
      const url = `https://st.111477.xyz/config/${tag}/stream/movie/${mediaMeta.imdbId}.json`;
      const data = await httpGet(url, {
        headers: { "User-Agent": "Mozilla/5.0" },
        timeout: 5e3
      });
      const rawStreams = (data && data.streams) || [];
      if (!Array.isArray(rawStreams) || rawStreams.length === 0) continue;

      for (const s of rawStreams) {
        if (!s || !s.url) continue;
        const card = formatCholeCard({
          title: mediaMeta.title,
          year: mediaMeta.year,
          filename: s.title ? s.title.replace(/\s*\[.*?\]\s*$/, "").trim() : "",
          rawText: s.title || "",
          server: "DahmerMovies",
          provider: "DahmerMovies"
        });

        streams.push(Object.assign({}, card, {
          url: s.url,
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"
          }
        }));
      }
      if (streams.length > 0) break;
    } catch (_) {}
  }
  return streams;
}

module.exports = {
  getStreams
};
