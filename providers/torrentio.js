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
var TMDB_API_KEY = "1865f43a0549ca50d341dd9ab8b29f49";
var TORRENTIO_API = "https://torrentio.strem.fun";
var PROVIDER_NAME = "Torrentio";
var HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  "Accept": "application/json"
};
var TRACKERS = [
  "udp://tracker.opentrackr.org:1337/announce",
  "udp://open.stealth.si:80/announce",
  "udp://tracker.torrent.eu.org:451/announce",
  "udp://tracker.bittor.pw:1337/announce"
];
function getDebridSettings() {
  var provider = "none";
  var key = "";
  try {
    var settings = null;
    if (typeof global !== "undefined" && global.SCRAPER_SETTINGS) {
      settings = global.SCRAPER_SETTINGS;
    } else if (typeof window !== "undefined" && window.SCRAPER_SETTINGS) {
      settings = window.SCRAPER_SETTINGS;
    }
    if (settings) {
      if (settings.debridProvider) {
        provider = String(settings.debridProvider).toLowerCase().trim();
      }
      if (settings.debridKey) {
        key = String(settings.debridKey).trim();
      }
    }
  } catch (err) {
    console.error("[Torrentio] Error reading settings context:", err);
  }
  return { provider, key };
}
function buildMagnet(infoHash) {
  if (!infoHash)
    return "";
  var tr = TRACKERS.map(function(t) {
    return "&tr=" + encodeURIComponent(t);
  }).join("");
  return "magnet:?xt=urn:btih:" + infoHash + tr;
}
function getDebridPathSegment() {
  var debrid = getDebridSettings();
  if (!debrid.provider || debrid.provider === "none" || !debrid.key)
    return "";
  return debrid.provider + "=" + debrid.key;
}
function getStreams(tmdbId, mediaType, season, episode) {
  return __async(this, null, function* () {
    if (mediaType === void 0) {
      mediaType = "movie";
    }
    if (season === void 0) {
      season = null;
    }
    if (episode === void 0) {
      episode = null;
    }
    var isSeries = mediaType === "tv" || mediaType === "series";
    var title = "Unknown Title";
    var year = "2026";
    var imdbId = typeof tmdbId === "string" && tmdbId.startsWith("tt") ? tmdbId : null;
    try {
      var tmdbUrl = "https://api.tmdb.org/3/" + (isSeries ? "tv" : "movie") + "/" + tmdbId + "?api_key=" + TMDB_API_KEY + "&append_to_response=external_ids";
      var tmdbRes = yield fetch(tmdbUrl).then(function(r) {
        return r.json();
      }).catch(function() {
        return null;
      });
      if (tmdbRes) {
        if (!imdbId) {
          imdbId = tmdbRes.external_ids && tmdbRes.external_ids.imdb_id || tmdbRes.imdb_id || tmdbId;
        }
        title = tmdbRes.title || tmdbRes.name || "Unknown Title";
        var dateStr = tmdbRes.release_date || tmdbRes.first_air_date || "";
        if (dateStr)
          year = dateStr.split("-")[0];
      }
    } catch (e) {
    }
    if (!imdbId)
      imdbId = tmdbId;
    var debridSegment = getDebridPathSegment();
    var debridPath = debridSegment ? debridSegment + "/" : "";
    var streamType = isSeries ? "series" : "movie";
    var streamId = isSeries ? imdbId + ":" + (season || 1) + ":" + (episode || 1) : imdbId;
    var torrentioUrl = TORRENTIO_API + "/" + debridPath + "stream/" + streamType + "/" + streamId + ".json";
    var torrentioData = yield fetch(torrentioUrl, { headers: HEADERS }).then(function(r) {
      return r.json();
    }).catch(function() {
      return null;
    });
    if (!torrentioData || !Array.isArray(torrentioData.streams) || torrentioData.streams.length === 0) {
      return [];
    }
    var results = [];
    var streamsList = torrentioData.streams.slice(0, 15);
    for (var i = 0; i < streamsList.length; i++) {
      var stream = streamsList[i];
      if (!stream)
        continue;
      var rawTitle = (stream.title || "").replace(/\n/g, " ");
      var textUpper = rawTitle.toUpperCase();
      var seederMatch = rawTitle.match(/👤\s*(\d+)/);
      var seeders = seederMatch ? seederMatch[1] : "0";
      var size = "";
      var sizeMatch = rawTitle.match(/([0-9.]+ ?[GM]B)/i);
      if (sizeMatch)
        size = sizeMatch[1].toUpperCase();
      var quality = "1080p";
      var qualityIcon = "\u{1F48E}";
      if (textUpper.includes("2160P") || textUpper.includes("4K")) {
        quality = "2160p";
        qualityIcon = "\u{1F525}";
      } else if (textUpper.includes("1080P")) {
        quality = "1080p";
        qualityIcon = "\u{1F48E}";
      } else if (textUpper.includes("720P")) {
        quality = "720p";
        qualityIcon = "\u26A1";
      } else if (textUpper.includes("480P")) {
        quality = "480p";
        qualityIcon = "\u{1F4F1}";
      }
      var lang = "English";
      if (textUpper.includes("DUAL") || textUpper.includes("DUAL-AUDIO")) {
        lang = "Dual-Audio";
      } else if (textUpper.includes("MULTI") || textUpper.includes("MULTI-AUDIO") || textUpper.includes("MULTIAUDIO")) {
        lang = "Multi-Audio";
      } else if (textUpper.includes("HINDI")) {
        lang = "Hindi";
      } else if (textUpper.includes("TAMIL")) {
        lang = "Tamil";
      } else if (textUpper.includes("TELUGU")) {
        lang = "Telugu";
      }
      var tags = [];
      if (textUpper.includes("DV") || textUpper.includes("DOLBY VISION")) {
        tags.push("DV");
      }
      if (textUpper.includes("HDR10+")) {
        tags.push("HDR10+");
      } else if (textUpper.includes("HDR10")) {
        tags.push("HDR10");
      } else if (textUpper.includes("HDR")) {
        tags.push("HDR");
      }
      if (textUpper.includes("HEVC") || textUpper.includes("X265") || textUpper.includes("H.265")) {
        tags.push("HEVC");
      }
      tags.push(lang);
      var tagsLine = tags.join(" \u2022 ");
      var sourceGroup = PROVIDER_NAME;
      var bracketMatch = rawTitle.match(/\[(.*?)\]/);
      if (bracketMatch && bracketMatch[1]) {
        var bContent = bracketMatch[1].trim();
        if (!/\d+P|HEVC|H264|WEB|BLURAY/i.test(bContent)) {
          sourceGroup = bContent;
        }
      }
      if (sourceGroup === PROVIDER_NAME) {
        if (textUpper.includes("RARBG"))
          sourceGroup = "RARBG";
        else if (textUpper.includes("YTS"))
          sourceGroup = "YTS";
        else if (textUpper.includes("THEPIRATEBAY") || textUpper.includes("TPB"))
          sourceGroup = "ThePirateBay";
        else if (textUpper.includes("1337X"))
          sourceGroup = "1337x";
        else if (textUpper.includes("EZTV"))
          sourceGroup = "EZTV";
        else if (textUpper.includes("TGX"))
          sourceGroup = "TGX";
      }
      var streamUrl = stream.url || (stream.infoHash ? buildMagnet(stream.infoHash) : "");
      var headerLine = isSeries ? "\u{1F3AC} " + title + " | S" + (season || 1) + " E" + (episode || 1) : "\u{1F3AC} " + title + " - " + year;
      var formatLine = qualityIcon + " " + quality + " | " + tagsLine;
      var metaLine = "\u{1F465} " + seeders + " | \u{1F4BE} " + size + " | \u2699\uFE0F " + sourceGroup;
      var cardTitle = headerLine + "\n" + formatLine + "\n" + metaLine;
      results.push({
        name: PROVIDER_NAME + " | \u{1F464} " + seeders + " | " + quality.toUpperCase(),
        title: cardTitle,
        size: cardTitle,
        description: cardTitle,
        url: streamUrl
      });
    }
    return results;
  });
}
function onSettings() {
  return [
    { type: "header", label: "Debrid Provider Configuration" },
    {
      type: "select",
      key: "debridProvider",
      label: "Debrid Provider",
      options: [
        { label: "None", value: "none" },
        { label: "RealDebrid", value: "realdebrid" },
        { label: "Premiumize", value: "premiumize" },
        { label: "AllDebrid", value: "alldebrid" },
        { label: "DebridLink", value: "debridlink" },
        { label: "EasyDebrid", value: "easydebrid" },
        { label: "Offcloud", value: "offcloud" },
        { label: "TorBox", value: "torbox" },
        { label: "Put.io", value: "putio" }
      ],
      default: "none"
    },
    {
      type: "text",
      isPassword: true,
      key: "debridKey",
      label: "API Key / Token",
      placeholder: "Enter your Debrid API key",
      description: "API Key or Access Token for your selected Debrid service."
    }
  ];
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = { getStreams, onSettings };
}
