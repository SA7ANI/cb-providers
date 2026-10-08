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
const cheerio = require("cheerio-without-node-native");
const BASE_URL = "https://animesalt.cam";
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
  if (!str)
    return "";
  return str.toLowerCase().replace(/[^\w\s]/gi, " ").replace(/\s+/g, " ").trim();
}
function titleSimilarity(s1, s2) {
  const n1 = normalizeTitle(s1);
  const n2 = normalizeTitle(s2);
  if (!n1 || !n2)
    return 0;
  if (n1 === n2)
    return 1;
  if (n1.includes(n2) || n2.includes(n1))
    return 0.85;
  const w1 = new Set(n1.split(" ").filter(Boolean));
  const w2 = new Set(n2.split(" ").filter(Boolean));
  let intersection = 0;
  for (const w of w1) {
    if (w2.has(w))
      intersection++;
  }
  const union = (/* @__PURE__ */ new Set([...w1, ...w2])).size;
  return union > 0 ? intersection / union : 0;
}
function formatCholeCard(opt) {
  var raw = [opt.filename || "", opt.rawText || "", opt.server || "", opt.quality || "", opt.size || "", opt.title || ""].join(" ");
  var text = raw.trim();
  var cleanText = text.replace(/4khdhub/gi, "").replace(/hdhub4u/gi, "");
  var res = "";
  var qCheck = opt.quality ? String(opt.quality).trim() : "";
  if (/\b(?:2160p|4k|uhd)\b/i.test(qCheck))
    res = "4K UHD";
  else if (/\b(?:1080p|fhd)\b/i.test(qCheck))
    res = "1080p FHD";
  else if (/\b(?:720p|hd)\b/i.test(qCheck))
    res = "720p HD";
  else if (/\b(?:480p|sd)\b/i.test(qCheck))
    res = "480p";
  else if (/\b(?:2160p|4k|uhd)\b/i.test(cleanText))
    res = "4K UHD";
  else if (/\b(?:1080p|fhd)\b/i.test(cleanText))
    res = "1080p FHD";
  else if (/\b(?:720p|hd)\b/i.test(cleanText))
    res = "720p HD";
  else if (/\b(?:480p|sd)\b/i.test(cleanText))
    res = "480p";
  else
    res = qCheck ? qCheck.toUpperCase() : "1080p FHD";
  var source = "";
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
    codecs.push("x264");
  if (/\b10-?bit\b/i.test(text))
    codecs.push("10-bit");
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
  else if (/\baac\b/i.test(text))
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
  if (langs.length === 0 && opt.defaultLang) {
    langs.push(opt.defaultLang);
  }
  var uniqueLangs = Array.from(new Set(langs));
  var sizeMatch = text.match(/(?:💾\s*|\[|\b)([0-9.]+\s*[GM]B)(?:\]|\b)/i);
  var rawSize = opt.size || (sizeMatch ? sizeMatch[1] : "");
  var size = rawSize ? rawSize.replace(/([0-9.]+)\s*([GM]B)/i, "$1 $2").toUpperCase() : "";
  var server = opt.server || "";
  if (!server) {
    var grpMatch = text.match(/-([a-zA-Z0-9_]+)(?:\.[a-z]{3})?$/i);
    if (grpMatch && grpMatch[1].length > 2 && grpMatch[1].length < 15)
      server = grpMatch[1];
  }
  var nameParts = [];
  if (opt.latency)
    nameParts.push("\u{1F7E2} FAST (" + opt.latency + "ms)");
  nameParts.push(opt.provider || "Stream");
  if (server)
    nameParts.push("\u{1F3F7}\uFE0F " + server);
  if (res)
    nameParts.push(res);
  if (source)
    nameParts.push(source);
  if (codecs.length)
    nameParts.push(codecs.join(" "));
  if (hdr.length)
    nameParts.push(hdr.join(" "));
  if (audio.length)
    nameParts.push(audio[0]);
  if (uniqueLangs.length) {
    var dualTag = uniqueLangs.find(function(l) {
      return l.indexOf("Dual") !== -1 || l.indexOf("Multi") !== -1;
    });
    if (dualTag)
      nameParts.push(dualTag);
    else
      nameParts.push(uniqueLangs.slice(0, 2).join(" + "));
  }
  if (opt.seeders !== void 0 && opt.seeders !== null && opt.seeders !== "") {
    nameParts.push("\u{1F331} " + opt.seeders);
  }
  var nameLine = nameParts.join(" \u2022 ");
  var filename = (opt.filename || "").trim();
  if (!filename || filename === opt.title) {
    var baseTitle = (opt.title || "Video").replace(/[^a-zA-Z0-9]+/g, ".");
    var yr = opt.year ? "." + opt.year : "";
    var se = opt.season && opt.episode ? ".S" + String(opt.season).padStart(2, "0") + "E" + String(opt.episode).padStart(2, "0") : "";
    var r = res ? "." + res.replace(/\s+/g, ".") : "";
    var s = source ? "." + source : "";
    var c = codecs.length ? "." + codecs.join(".") : "";
    var a = audio.length ? "." + audio[0].replace(/[^a-zA-Z0-9]+/g, ".") : "";
    var g = server ? "-" + server.replace(/[\s\-_]+/g, "") : "-" + (opt.provider || "Release");
    filename = baseTitle + yr + se + r + s + c + a + g + ".mkv";
  }
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
  meta.push("\u{1F517} " + (opt.provider || "Stream"));
  var line5 = meta.join(" \u2022 ");
  var body = [line1, line2, line3, line4, line5].filter(Boolean).join("\n");
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
    name: nameLine,
    title: body,
    quality: qualitySlug,
    size: size || ""
  };
}
function getTMDBDetails(tmdbId, mediaType) {
  return __async(this, null, function* () {
    const isSeries = mediaType === "tv" || mediaType === "series";
    const endpoint = isSeries ? "tv" : "movie";
    for (const apiKey of TMDB_API_KEYS) {
      try {
        const res = yield fetch(`${TMDB_BASE_URL}/${endpoint}/${tmdbId}?api_key=${apiKey}`, {
          headers: { "Accept": "application/json" }
        });
        if (res.ok) {
          const data = yield res.json();
          return {
            title: data.name || data.title || "",
            originalTitle: data.original_name || data.original_title || "",
            year: (data.first_air_date || data.release_date || "").split("-")[0]
          };
        }
      } catch (_) {
      }
    }
    return { title: "", originalTitle: "", year: "" };
  });
}
function decodeAbyssSources(url) {
  return __async(this, null, function* () {
    try {
      const cleanUrl = url.replace("https://short.icu", "https://player.abyssplayer.com");
      const reqHeaders = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36",
        "Origin": "https://playhydrax.com",
        "Referer": "https://playhydrax.com/"
      };
      const res = yield fetch(cleanUrl, { headers: reqHeaders });
      if (!res.ok)
        return [];
      const html = yield res.text();
      const match = html.match(/const\s+datas\s*=\s*"([^"]*)"/);
      if (!match || !match[1])
        return [];
      const decRes = yield fetch("https://enc-dec.app/api/dec-abyss", {
        method: "POST",
        headers: Object.assign({}, reqHeaders, { "Content-Type": "application/json" }),
        body: JSON.stringify({ text: match[1] })
      });
      if (!decRes.ok)
        return [];
      const decData = yield decRes.json();
      return decData && decData.result && decData.result.sources || [];
    } catch (_) {
      return [];
    }
  });
}
function getStreams(tmdbId, mediaType = "tv", season = 1, episode = 1) {
  return __async(this, null, function* () {
    try {
      const mediaInfo = yield getTMDBDetails(tmdbId, mediaType);
      if (!mediaInfo.title)
        return [];
      const isSeries = mediaType === "tv" || mediaType === "series";
      const s = parseInt(season) || 1;
      const e = parseInt(episode) || 1;
      const searchTerms = [mediaInfo.title];
      if (mediaInfo.originalTitle && mediaInfo.originalTitle !== mediaInfo.title) {
        searchTerms.push(mediaInfo.originalTitle);
      }
      let searchHits = [];
      for (const term of searchTerms) {
        try {
          const wpUrl = `${BASE_URL}/wp-json/wp/v2/search?search=${encodeURIComponent(term)}&per_page=30`;
          const res = yield fetch(wpUrl, { headers: DEFAULT_HEADERS });
          if (res.ok) {
            const list = yield res.json();
            if (Array.isArray(list)) {
              searchHits = searchHits.concat(list);
            }
          }
        } catch (_) {
        }
      }
      if (searchHits.length === 0) {
        try {
          const bUrl = `${BASE_URL}/browse/?q=${encodeURIComponent(mediaInfo.title)}`;
          const bRes = yield fetch(bUrl, { headers: DEFAULT_HEADERS });
          if (bRes.ok) {
            const bHtml = yield bRes.text();
            const $b = cheerio.load(bHtml);
            $b('a[href*="/tv/"], a[href*="/movies/"]').each((i, el) => {
              const href = $b(el).attr("href");
              const title = $b(el).text().trim();
              if (href && (href.includes("/tv/") || href.includes("/movies/"))) {
                searchHits.push({ title, url: href, subtype: href.includes("/tv/") ? "tv" : "movies" });
              }
            });
          }
        } catch (_) {
        }
      }
      if (searchHits.length === 0)
        return [];
      const scoredCandidates = [];
      for (const hit of searchHits) {
        const hitTitle = hit.title || "";
        const hitUrl = hit.url || "";
        if (!hitUrl)
          continue;
        const sim = Math.max(
          titleSimilarity(mediaInfo.title, hitTitle),
          mediaInfo.originalTitle ? titleSimilarity(mediaInfo.originalTitle, hitTitle) : 0
        );
        if (sim >= 0.45) {
          scoredCandidates.push({
            title: hitTitle,
            url: hitUrl,
            subtype: hit.subtype || (hitUrl.includes("/episode/") ? "episodes" : hitUrl.includes("/tv/") ? "tv" : "movies"),
            sim
          });
        }
      }
      if (scoredCandidates.length === 0)
        return [];
      scoredCandidates.sort((a, b) => b.sim - a.sim);
      let targetEpisodeUrl = null;
      if (isSeries) {
        const epHit = scoredCandidates.find((c) => {
          if (c.subtype !== "episodes" && !c.url.includes("/episode/"))
            return false;
          const hasEp = new RegExp(`episode[-_\\s]*${e}\\b`, "i").test(c.url) || new RegExp(`episode[-_\\s]*${e}\\b`, "i").test(c.title);
          if (s > 1) {
            const hasSeason = new RegExp(`season[-_\\s]*${s}\\b|s0?${s}\\b`, "i").test(c.url) || new RegExp(`season[-_\\s]*${s}\\b`, "i").test(c.title);
            return hasEp && hasSeason;
          }
          return hasEp;
        });
        if (epHit) {
          targetEpisodeUrl = epHit.url;
        } else {
          const tvHit = scoredCandidates.find((c) => c.subtype === "tv" || c.url.includes("/tv/")) || scoredCandidates[0];
          if (tvHit) {
            const tvPageRes = yield fetch(tvHit.url, { headers: DEFAULT_HEADERS });
            if (tvPageRes.ok) {
              const tvHtml = yield tvPageRes.text();
              const $t = cheerio.load(tvHtml);
              const epLinks = [];
              $t('a[href*="/episode/"]').each((i, el) => {
                const h = $t(el).attr("href");
                const t = $t(el).text().trim();
                if (h)
                  epLinks.push({ href: h, text: t });
              });
              const epReg = new RegExp(`episode[-_\\s]*${e}\\b`, "i");
              const found = epLinks.find((l) => epReg.test(l.href) || epReg.test(l.text));
              if (found) {
                targetEpisodeUrl = found.href;
              } else if (epLinks.length > 0) {
                targetEpisodeUrl = epLinks[epLinks.length - e] ? epLinks[epLinks.length - e].href : epLinks[0].href;
              }
            }
          }
        }
      } else {
        const movieHit = scoredCandidates.find((c) => c.subtype === "movies" || c.url.includes("/movies/") || c.url.includes("/episode/")) || scoredCandidates[0];
        if (movieHit)
          targetEpisodeUrl = movieHit.url;
      }
      if (!targetEpisodeUrl)
        return [];
      const epPageRes = yield fetch(targetEpisodeUrl, { headers: DEFAULT_HEADERS });
      if (!epPageRes.ok)
        return [];
      const epHtml = yield epPageRes.text();
      const $ep = cheerio.load(epHtml);
      const serverList = [];
      $ep(".asnt-server-button, [data-embed], [data-src], [data-url]").each((i, el) => {
        const embed = $ep(el).attr("data-embed") || $ep(el).attr("data-src") || $ep(el).attr("data-url");
        let sName = $ep(el).text().trim() || `Server ${i + 1}`;
        if (embed && embed.startsWith("http")) {
          if (embed.includes("animesalt.cam/tv/") || embed.includes("animesalt.cam/movies/") || embed.includes("animesalt.cam/my-list") || embed.includes("animesalt.cam/browse")) {
            return;
          }
          if (embed.includes("abyssplayer") || embed.includes("short.icu"))
            sName = "Abyss Player";
          else if (embed.includes("vidmoly"))
            sName = "VidMoly";
          else if (embed.includes("videasy"))
            sName = "Videasy Stream";
          serverList.push({ name: sName, url: embed });
        }
      });
      $ep("iframe[src]").each((i, el) => {
        const src = $ep(el).attr("src");
        if (src && src.startsWith("http") && !serverList.some((s2) => s2.url === src)) {
          if (!src.includes("animesalt.cam")) {
            serverList.push({ name: `Stream Server ${serverList.length + 1}`, url: src });
          }
        }
      });
      if (serverList.length === 0)
        return [];
      const finalStreams = [];
      const seen = /* @__PURE__ */ new Set();
      for (const srv of serverList) {
        if (srv.url.includes("abyssplayer") || srv.url.includes("short.icu")) {
          const decSources = yield decodeAbyssSources(srv.url);
          if (decSources.length > 0) {
            for (const ds of decSources) {
              if (ds.url && !seen.has(ds.url)) {
                seen.add(ds.url);
                const card = formatCholeCard({
                  provider: "AnimeSalt",
                  title: mediaInfo.title,
                  year: mediaInfo.year,
                  season: isSeries ? s : null,
                  episode: isSeries ? e : null,
                  server: "Abyss Fast",
                  quality: ds.type || "1080p",
                  size: ds.size ? ds.size / (1024 * 1024) > 1024 ? (ds.size / (1024 * 1024 * 1024)).toFixed(2) + " GB" : (ds.size / (1024 * 1024)).toFixed(0) + " MB" : "",
                  defaultLang: "\u{1F1EF}\u{1F1F5} Japanese"
                });
                finalStreams.push({
                  name: card.name,
                  title: card.title,
                  quality: card.quality,
                  url: ds.url,
                  provider: "animesalt"
                });
              }
            }
          } else if (!seen.has(srv.url)) {
            seen.add(srv.url);
            const card = formatCholeCard({
              provider: "AnimeSalt",
              title: mediaInfo.title,
              year: mediaInfo.year,
              season: isSeries ? s : null,
              episode: isSeries ? e : null,
              server: srv.name,
              quality: "1080p",
              defaultLang: "\u{1F1EF}\u{1F1F5} Japanese"
            });
            finalStreams.push({
              name: card.name,
              title: card.title,
              quality: card.quality,
              url: srv.url,
              provider: "animesalt"
            });
          }
        } else if (!seen.has(srv.url)) {
          seen.add(srv.url);
          let srvQuality = "1080p";
          if (/720p/i.test(srv.name))
            srvQuality = "720p";
          else if (/480p/i.test(srv.name))
            srvQuality = "480p";
          const card = formatCholeCard({
            provider: "AnimeSalt",
            title: mediaInfo.title,
            year: mediaInfo.year,
            season: isSeries ? s : null,
            episode: isSeries ? e : null,
            server: srv.name,
            quality: srvQuality,
            defaultLang: "\u{1F1EF}\u{1F1F5} Japanese"
          });
          finalStreams.push({
            name: card.name,
            title: card.title,
            quality: card.quality,
            url: srv.url,
            provider: "animesalt"
          });
        }
      }
      return finalStreams;
    } catch (err) {
      return [];
    }
  });
}
module.exports = { getStreams };
