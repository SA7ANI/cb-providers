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
async function getImdbId(id, mediaType = "tv") {
  if (String(id).startsWith("tt"))
    return id;
  const endpoint = mediaType === "tv" || mediaType === "series" ? "tv" : "movie";
  for (const key of TMDB_API_KEYS) {
    try {
      const url = `https://api.themoviedb.org/3/${endpoint}/${id}/external_ids?api_key=${key}`;
      const data = await httpGet(url, {
        headers: { "User-Agent": "Mozilla/5.0" },
        timeout: 4e3
      });
      if (data && data.imdb_id)
        return data.imdb_id;
    } catch (_) {
    }
  }
  return null;
}
function parseStreamMeta(title) {
  const raw = String(title || "");
  let quality = "1080p";
  let resBadge = "1080p FHD";
  if (/2160p|4k|uhd/i.test(raw)) {
    quality = "4k";
    resBadge = "4K UHD";
  } else if (/720p/i.test(raw)) {
    quality = "720p";
    resBadge = "720p HD";
  } else if (/480p/i.test(raw)) {
    quality = "480p";
    resBadge = "480p";
  }
  let source = "";
  if (/remux/i.test(raw))
    source = "REMUX";
  else if (/bluray|blu-ray/i.test(raw))
    source = "BluRay";
  else if (/web-dl|webdl|webrip/i.test(raw))
    source = "WEB-DL";
  else if (/hdtv/i.test(raw))
    source = "HDTV";
  const codecs = [];
  if (/hevc|x265|h\.265/i.test(raw))
    codecs.push("HEVC");
  else if (/avc|x264|h\.264/i.test(raw))
    codecs.push("AVC");
  if (/10bit|10-bit/i.test(raw))
    codecs.push("10-Bit");
  const hdr = [];
  if (/dv|dolby\s*vision/i.test(raw))
    hdr.push("Dolby Vision");
  if (/hdr10\+|hdr10plus/i.test(raw))
    hdr.push("HDR10+");
  else if (/hdr/i.test(raw))
    hdr.push("HDR");
  const audio = [];
  if (/atmos/i.test(raw))
    audio.push("Atmos");
  if (/truehd/i.test(raw))
    audio.push("TrueHD");
  else if (/dts-hd|dts\s*hd/i.test(raw))
    audio.push("DTS-HD");
  else if (/ddp|dd\+|eac3/i.test(raw))
    audio.push("DDP 5.1");
  const langs = [];
  if (/hindi|hin/i.test(raw))
    langs.push("\u{1F1EE}\u{1F1F3} Hindi");
  if (/english|eng/i.test(raw))
    langs.push("\u{1F1EC}\u{1F1E7} English");
  if (/tamil|tam/i.test(raw))
    langs.push("Tamil");
  if (/telugu|tel/i.test(raw))
    langs.push("Telugu");
  if (langs.length === 0)
    langs.push("\u{1F310} Multi-Audio");
  let size = "";
  const sizeMatch = raw.match(/\[(?:[A-Z0-9]+\s+)?([0-9.]+\s*[KMGT]B)\]/i);
  if (sizeMatch)
    size = sizeMatch[1];
  const filename = raw.replace(/\s*\[.*?\]\s*$/, "").trim();
  return {
    quality,
    resBadge,
    source,
    codecs,
    hdr,
    audio,
    langs,
    size,
    filename
  };
}
async function getStreams(tmdbId, mediaType = "tv", season = 1, episode = 1) {
  const sNum = parseInt(season, 10) || 1;
  const epNum = parseInt(episode, 10) || 1;
  const imdbId = await getImdbId(tmdbId, "tv");
  if (!imdbId)
    return [];
  const streams = [];
  for (const tag of CONFIG_TAGS) {
    try {
      const url = `https://st.111477.xyz/config/${tag}/stream/series/${imdbId}:${sNum}:${epNum}.json`;
      const data = await httpGet(url, {
        headers: { "User-Agent": "Mozilla/5.0" },
        timeout: 5e3
      });
      const rawStreams = data && data.streams || [];
      if (!Array.isArray(rawStreams) || rawStreams.length === 0)
        continue;
      for (const s of rawStreams) {
        if (!s || !s.url)
          continue;
        const meta = parseStreamMeta(s.title);
        const nameTags = ["\u{1F7E2} Dahmermovies-TV", meta.resBadge];
        if (meta.source)
          nameTags.push(meta.source);
        if (meta.hdr.length > 0)
          nameTags.push(meta.hdr[0]);
        if (meta.audio.length > 0)
          nameTags.push(meta.audio[0]);
        if (meta.langs.length > 0)
          nameTags.push(meta.langs[0]);
        const line1 = `\u{1F3AC} TV Series \u2022 S${sNum}E${epNum} [${meta.resBadge}${meta.source ? " \u2022 " + meta.source : ""}]`;
        const line2 = `\u{1F4C4} ${meta.filename}`;
        const line3 = meta.hdr.concat(meta.audio).length > 0 ? `\u{1F48E} ${meta.hdr.concat(meta.audio).join(" \u2022 ")}` : "";
        const line4 = `\u{1F310} ${meta.langs.join(" \u2022 ")}`;
        const line5 = [meta.size ? `\u{1F4E6} ${meta.size}` : "", "\u{1F517} Dahmermovies-TV"].filter(Boolean).join(" \u2022 ");
        const formattedTitle = [line1, line2, line3, line4, line5].filter(Boolean).join("\n");
        streams.push({
          name: nameTags.join(" \u2022 "),
          title: formattedTitle,
          quality: meta.quality,
          size: meta.size || "Direct",
          url: s.url,
          provider: "dahmermovies-tv",
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"
          }
        });
      }
      if (streams.length > 0)
        break;
    } catch (_) {
    }
  }
  return streams;
}
module.exports = {
  getStreams
};
