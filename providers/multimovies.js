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
  "8265bd1679663a7ea12ac168da84d2e8"
];

const BASE_URL = "https://multimovies.garden";
const HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
  "Referer": "https://multimovies.garden/"
};

function httpGet(_0) {
  return __async(this, arguments, function* (url, options = {}) {
    const headers = options.headers || {};
    const timeout = options.timeout || 8e3;
    if (typeof axios !== "undefined" && axios && axios.get) {
      try {
        const res = yield axios.get(url, { headers, timeout });
        return res.data;
      } catch (_) {}
    }
    if (typeof require === "function") {
      try {
        const ax = require("axios");
        if (ax && ax.get) {
          const res = yield ax.get(url, { headers, timeout });
          return res.data;
        }
      } catch (_) {}
    }
    if (typeof fetch === "function") {
      const controller = typeof AbortController !== "undefined" ? new AbortController() : null;
      const timer = controller ? setTimeout(() => controller.abort(), timeout) : null;
      try {
        const res = yield fetch(url, {
          method: "GET",
          headers,
          signal: controller ? controller.signal : void 0
        });
        if (timer) clearTimeout(timer);
        const text = yield res.text();
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
  });
}

function getMediaMeta(id, mediaType = "movie") {
  return __async(this, null, function* () {
    const isImdb = typeof id === "string" && id.startsWith("tt");
    const stremioType = mediaType === "tv" || mediaType === "series" ? "series" : "movie";
    if (isImdb) {
      try {
        const d = yield httpGet(`https://v3-cinemeta.strem.io/meta/${stremioType}/${id}.json`);
        if (d && d.meta && d.meta.name) {
          return {
            imdbId: id,
            title: d.meta.name,
            year: d.meta.year || ""
          };
        }
      } catch (_) {}
    }
    const endpoint = mediaType === "tv" || mediaType === "series" ? "tv" : "movie";
    for (const key of TMDB_API_KEYS) {
      try {
        const url = `https://api.tmdb.org/3/${endpoint}/${id}?api_key=${key}&append_to_response=external_ids`;
        const data = yield httpGet(url, {
          headers: { "User-Agent": "Mozilla/5.0" },
          timeout: 8e3
        });
        if (data) {
          const imdbId = (data.external_ids && data.external_ids.imdb_id) || (String(id).startsWith("tt") ? id : null);
          const title = data.title || data.name || data.original_title || data.original_name || "";
          const year = (data.release_date || data.first_air_date || "").split("-")[0];
          if (title) {
            return { imdbId, title, year };
          }
        }
      } catch (_) {}
    }
    return { imdbId: isImdb ? id : null, title: "", year: "" };
  });
}

function formatCholeCard(opt) {
  var raw = [opt.filename || "", opt.rawText || "", opt.server || "", opt.quality || "", opt.size || "", opt.title || ""].join(" ");
  var text = raw.trim();
  var res = "";
  var qCheck = opt.quality ? String(opt.quality).trim() : "";
  if (/\b(?:2160p|4k|uhd)\b/i.test(qCheck) || /\b(?:2160p|4k|uhd)\b/i.test(text))
    res = "4K UHD";
  else if (/\b(?:1080p|fhd)\b/i.test(qCheck) || /\b(?:1080p|fhd)\b/i.test(text))
    res = "1080p FHD";
  else if (/\b(?:720p|hd)\b/i.test(qCheck) || /\b(?:720p|hd)\b/i.test(text))
    res = "720p HD";
  else if (/\b(?:480p|sd)\b/i.test(qCheck) || /\b(?:480p|sd)\b/i.test(text))
    res = "480p SD";
  else
    res = "1080p FHD";
  var source = "WEB-DL";
  if (/\bremux\b/i.test(text))
    source = "REMUX";
  else if (/\bbluray|blu-ray\b/i.test(text))
    source = "BluRay";
  else if (/\bweb-?dl|webrip\b/i.test(text))
    source = "WEB-DL";
  else if (/\bhdtv\b/i.test(text))
    source = "HDTV";
  var codecs = [];
  if (/\b(?:hevc|x265|h\.?265|10bit)\b/i.test(text))
    codecs.push("HEVC");
  else if (/\b(?:avc|x264|h\.?264)\b/i.test(text))
    codecs.push("AVC");
  else
    codecs.push("AVC");
  var hdr = [];
  if (/\b(?:dolby\s*vision|dv)\b/i.test(text))
    hdr.push("Dolby Vision");
  if (/\bhdr10\+\b/i.test(text))
    hdr.push("HDR10+");
  else if (/\b(?:hdr10|hdr)\b/i.test(text))
    hdr.push("HDR");
  var audio = [];
  if (/\b(?:atmos|ddpa)\b/i.test(text))
    audio.push("Dolby Atmos 5.1");
  else if (/\btruehd\b/i.test(text))
    audio.push("TrueHD 5.1");
  else if (/\bdts-?hd(?:\s*ma)?\b/i.test(text))
    audio.push("DTS-HD MA 5.1");
  else if (/\bdts\b/i.test(text))
    audio.push("DTS 5.1");
  else if (/\b(?:ddp|dd\+|eac3)\b/i.test(text))
    audio.push("DDP 5.1");
  else if (/\b(?:dd|ac3)\b/i.test(text))
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
  if (/\b(?:japanese|jap|jpn)\b/i.test(text))
    langs.push("\u{1F1EF}\u{1F1F5} Japanese");
  if (/\bdual[- ]?audio\b/i.test(text))
    langs.push("\u{1F310} Dual-Audio");
  if (/\bmulti[- ]?audio\b/i.test(text))
    langs.push("\u{1F310} Multi-Audio");
  if (langs.length === 0)
    langs.push("\u{1F310} Multi-Audio");
  var uniqueLangs = Array.from(new Set(langs));
  var sizeMatch = text.match(/(?:💾\s*|\[|\b)([0-9.]+\s*[GM]B)(?:\]|\b)/i);
  var rawSize = opt.size || (sizeMatch ? sizeMatch[1] : "");
  var size = rawSize ? rawSize.replace(/([0-9.]+)\s*([GM]B)/i, "$1 $2").toUpperCase() : "";
  var server = opt.server || "MultiMovies";
  var provider = opt.provider || "MultiMovies";
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
  var seasonEp = opt.season && opt.episode ? " \u2022 S" + String(opt.season).padStart(2, "0") + "E" + String(opt.episode).padStart(2, "0") : "";
  var line1 = "\u{1F3AC} " + (opt.title || "Unknown") + (opt.year ? " (" + opt.year + ")" : "") + seasonEp + (specTags.length ? " [" + specTags.join(" \u2022 ") + "]" : "");
  var line2 = "\u{1F4C4} " + filename;
  var av = hdr.concat(audio);
  var line3 = av.length ? "\u{1F48E} " + av.join(" \u2022 ") : "";
  var line4 = uniqueLangs.length ? "\u{1F310} " + uniqueLangs.join(" \u2022 ") : "";
  var metaArr = [];
  if (size)
    metaArr.push("\u{1F4E6} " + size);
  if (server)
    metaArr.push("\u{1F3F7}\uFE0F " + server);
  metaArr.push("\u{1F517} " + provider);
  var line5 = metaArr.join(" \u2022 ");
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
    size: size || "Direct",
    provider: provider.toLowerCase()
  };
}

function getStreams(tmdbId, mediaType = "movie", season = 1, episode = 1) {
  return __async(this, null, function* () {
    const isTv = mediaType === "tv" || mediaType === "series";
    const sNum = parseInt(season, 10) || 1;
    const epNum = parseInt(episode, 10) || 1;

    const meta = yield getMediaMeta(tmdbId, isTv ? "tv" : "movie");
    if (!meta || !meta.title) return [];

    const searchUrl = `${BASE_URL}/search?q=${encodeURIComponent(meta.title.toLowerCase())}`;
    let html = "";
    try {
      html = yield httpGet(searchUrl, { headers: HEADERS, timeout: 8e3 });
    } catch (_) {
      return [];
    }

    if (!html || typeof html !== "string") return [];

    const targetType = isTv ? "tv" : "movie";
    const matches = [...html.matchAll(/data-save-title="([^"]+)"/gi)];
    let selected = null;

    for (const m of matches) {
      try {
        const data = JSON.parse(m[1].replace(/&quot;/g, '"'));
        if (data.type === targetType) {
          if (!selected) selected = data;
          if (data.year && meta.year && String(data.year) === String(meta.year)) {
            selected = data;
            break;
          }
        }
      } catch (_) {}
    }

    if (!selected || !selected.url) return [];

    let watchUrl = `${BASE_URL}${selected.url}`;
    if (isTv) {
      watchUrl = `${BASE_URL}${selected.url}/season/${sNum}/episode/${epNum}`;
    }

    let pageHtml = "";
    try {
      pageHtml = yield httpGet(watchUrl, { headers: HEADERS, timeout: 8e3 });
    } catch (_) {
      return [];
    }

    if (!pageHtml || typeof pageHtml !== "string") return [];

    const chipRegex = /<button[^>]+class="server-chip[^"]*"[^>]*data-url="([^"]+)"[^>]*>([\s\S]*?)<\/button>/gi;
    const chipMatches = [...pageHtml.matchAll(chipRegex)];

    const streams = [];
    for (const c of chipMatches) {
      let streamUrl = c[1];
      while (streamUrl.includes("&amp;")) {
        streamUrl = streamUrl.replace(/&amp;/g, "&");
      }
      streamUrl = streamUrl.trim();
      if (!streamUrl.startsWith("http")) continue;

      const chipContent = c[2];
      const serverNameMatch = chipContent.match(/class="server-name">([^<]+)<\/span>/i);
      const badgeMatch = chipContent.match(/class="server-badge">([^<]+)<\/span>/i);

      const serverName = serverNameMatch ? serverNameMatch[1].trim() : "Server";
      const badge = badgeMatch ? badgeMatch[1].trim() : "HD";

      let quality = "1080p";
      const badgeLower = badge.toLowerCase();
      if (badgeLower.includes("4k") || badgeLower.includes("2160")) {
        quality = "4k";
      } else if (badgeLower.includes("720")) {
        quality = "720p";
      } else if (badgeLower.includes("480")) {
        quality = "480p";
      }

      const card = formatCholeCard({
        title: meta.title,
        year: meta.year,
        season: isTv ? sNum : null,
        episode: isTv ? epNum : null,
        quality: quality,
        server: serverName,
        rawText: `${meta.title} ${badge} ${serverName} Multi-Audio Dual-Audio Hindi`,
        provider: "MultiMovies"
      });

      streams.push(Object.assign({}, card, {
        url: streamUrl,
        headers: {
          "User-Agent": HEADERS["User-Agent"],
          "Referer": BASE_URL + "/"
        }
      }));
    }

    return streams;
  });
}

module.exports = {
  getStreams
};
