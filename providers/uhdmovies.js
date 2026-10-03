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
var TMDB_API_KEY = "439c478a771f35c05022f9feabcca01c";
var TMDB_BASE_URL = "https://api.themoviedb.org/3";
var MAIN_URL = "https://uhdmovies.wiki";
var HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
  "Referer": `${MAIN_URL}/`
};
function getTMDBDetails(tmdbId, mediaType) {
  return __async(this, null, function* () {
    var _a;
    const endpoint = mediaType === "tv" ? "tv" : "movie";
    const url = `${TMDB_BASE_URL}/${endpoint}/${tmdbId}?api_key=${TMDB_API_KEY}`;
    const response = yield fetch(url, { method: "GET", headers: { "Accept": "application/json" } });
    if (!response.ok)
      throw new Error(`TMDB error: ${response.status}`);
    const data = yield response.json();
    return {
      title: mediaType === "tv" ? data.name : data.title,
      year: (_a = mediaType === "tv" ? data.first_air_date : data.release_date) == null ? void 0 : _a.split("-")[0]
    };
  });
}
function search(query) {
  return __async(this, null, function* () {
    const searchUrl = `${MAIN_URL}/?s=${encodeURIComponent(query)}`;
    const response = yield fetch(searchUrl, { headers: HEADERS });
    const html = yield response.text();
    const results = [];
    const regex = /<h2 class="title"><a href="([^"]+)">([^<]+)<\/a><\/h2>/g;
    let match;
    while ((match = regex.exec(html)) !== null) {
      results.push({ url: match[1], title: match[2] });
    }
    return results;
  });
}
function getDownloadLinks(mediaUrl) {
  return __async(this, null, function* () {
    const response = yield fetch(mediaUrl, { headers: HEADERS });
    const html = yield response.text();
    const links = [];
    const regex = /href="([^"]+(?:gdtot|pixeldrain|drive)[^"]+)"/ig;
    let match;
    while ((match = regex.exec(html)) !== null) {
      links.push({ source: "UHD Server", quality: 1080, url: match[1] });
    }
    return { finalLinks: links, isMovie: true };
  });
}
function getStreams(tmdbId, mediaType = "movie", season = null, episode = null) {
  return __async(this, null, function* () {
    try {
      const mediaInfo = yield getTMDBDetails(tmdbId, mediaType);
      const searchResults = yield search(mediaInfo.title);
      if (searchResults.length === 0)
        return [];
      const bestMatch = searchResults[0];
      const data = yield getDownloadLinks(bestMatch.url);
      return data.finalLinks.map((link) => ({
        name: `UHDMovies`,
        type: mediaType,
        url: link.url,
        title: `${mediaInfo.title} [4K/1080p] - ${link.source}`,
        behaviorHints: { notWebReady: true }
      }));
    } catch (e) {
      return [];
    }
  });
}
module.exports = { getStreams };
