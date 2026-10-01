/**
 * dooflix - Built from src/dooflix/
 * Generated: 2026-06-01T14:20:20.721Z
 */
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
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

// src/dooflix/index.js
var dooflix_exports = {};
__export(dooflix_exports, {
  getStreams: () => getStreams
});
module.exports = __toCommonJS(dooflix_exports);

// src/dooflix/constants.js
var BASE_API = "https://panel.watchkaroabhi.com";
var API_KEY = "qNhKLJiZVyoKdi9NCQGz8CIGrpUijujE";
var HEADERS = {
  "X-Package-Name": "com.king.moja",
  "User-Agent": "dooflix",
  "X-App-Version": "305"
};
var STREAM_REFERER = "https://molop.art/";

// src/dooflix/index.js
function getStreams(tmdbId, mediaType = "movie", season = null, episode = null) {
  return __async(this, null, function* () {
    console.log(`[DooFlix] Fetching streams for TMDB ID: ${tmdbId}, Type: ${mediaType}`);
    try {
      let requestUrl;
      if (mediaType === "movie") {
        requestUrl = `${BASE_API}/api/3/movie/${tmdbId}/links?api_key=${API_KEY}`;
      } else {
        if (!season || !episode) {
          console.error("[DooFlix] Missing season or episode for TV show");
          return [];
        }
        requestUrl = `${BASE_API}/api/3/tv/${tmdbId}/season/${season}/episode/${episode}/links?api_key=${API_KEY}`;
      }
      const response = yield fetch(requestUrl, { headers: HEADERS });
      if (!response.ok) {
        console.log(`[DooFlix] API error: ${response.status}`);
        return [];
      }
      const data = yield response.json();
      const links = data.links || [];
      const streams = [];
      for (const linkObj of links) {
        try {
          const res = yield fetch(linkObj.url, {
            method: "GET",
            headers: {
              "Referer": STREAM_REFERER,
              "User-Agent": HEADERS["User-Agent"]
            },
            redirect: "manual"
          });
          let streamUrl = res.headers.get("location") || res.url;
          if (streamUrl && streamUrl !== linkObj.url) {
            streams.push({
              name: "DooFlix",
              title: `DooFlix - ${linkObj.host || "Server"}`,
              url: streamUrl,
              quality: "Auto",
              headers: {
                "Referer": STREAM_REFERER,
                "User-Agent": HEADERS["User-Agent"]
              },
              provider: "dooflix"
            });
          }
        } catch (e) {
          console.log(`[DooFlix] Error fetching redirect for ${linkObj.url}: ${e.message}`);
        }
      }
      return streams;
    } catch (error) {
      console.error(`[DooFlix] Error: ${error.message}`);
      return [];
    }
  });
}
