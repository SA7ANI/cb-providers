/**
 * VegaMovies Provider for Nuvio
 */
var TMDB_API_KEY = "439c478a771f35c05022f9feabcca01c";
var TMDB_BASE_URL = "https://api.themoviedb.org/3";
var MAIN_URL = "https://vegamovies.gallery";
var HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  "Referer": `${MAIN_URL}/`
};

async function getTMDBDetails(tmdbId, mediaType) {
  if (typeof tmdbId === 'string' && tmdbId.startsWith('tt')) {
    try {
      const findUrl = `${TMDB_BASE_URL}/find/${tmdbId}?api_key=${TMDB_API_KEY}&external_source=imdb_id`;
      const res = await fetch(findUrl, { headers: { "Accept": "application/json" } });
      if (res.ok) {
        const findData = await res.json();
        const results = mediaType === "tv" ? findData.tv_results : findData.movie_results;
        if (results && results.length > 0) {
          const item = results[0];
          return {
            title: mediaType === "tv" ? item.name : item.title,
            year: (mediaType === "tv" ? item.first_air_date : item.release_date)?.split("-")[0]
          };
        }
      }
    } catch (e) {}
  }
  const endpoint = mediaType === "tv" ? "tv" : "movie";
  const url = `${TMDB_BASE_URL}/${endpoint}/${tmdbId}?api_key=${TMDB_API_KEY}`;
  const response = await fetch(url, { method: "GET", headers: { "Accept": "application/json" } });
  if (!response.ok) throw new Error(`TMDB error: ${response.status}`);
  const data = await response.json();
  return { 
      title: mediaType === "tv" ? data.name : data.title, 
      year: (mediaType === "tv" ? data.first_air_date : data.release_date)?.split("-")[0] 
  };
}

async function searchVega(imdbId, title) {
  const queriesToTry = [];
  if (imdbId && imdbId.startsWith('tt')) queriesToTry.push(imdbId);
  if (title) queriesToTry.push(title);

  for (const q of queriesToTry) {
    try {
      const searchUrl = `${MAIN_URL}/ts-search.php?q=${encodeURIComponent(q)}&page=1`;
      const response = await fetch(searchUrl, { headers: HEADERS });
      if (!response.ok) continue;
      const data = await response.json();
      if (data && Array.isArray(data.hits) && data.hits.length > 0) {
        return data.hits.map(h => ({
          url: h.document.permalink.startsWith('http') ? h.document.permalink : `${MAIN_URL}${h.document.permalink}`,
          title: h.document.post_title
        }));
      }
    } catch (e) {}
  }
  return [];
}

async function getDownloadLinks(postUrl, postTitle) {
  try {
    const response = await fetch(postUrl, { headers: HEADERS });
    if (!response.ok) return [];
    const html = await response.text();

    const intermediateRegex = /href="([^"]*(?:nexdrive|hubcloud|fast-dl|v-cloud|pixeldrain|drive)[^"]*)"/gi;
    const matches = [...html.matchAll(intermediateRegex)].map(m => m[1]);
    const uniqueInter = [...new Set(matches)];

    const streams = [];
    for (const link of uniqueInter.slice(0, 4)) {
      if (link.includes('nexdrive')) {
        try {
          const nexRes = await fetch(link, { headers: { ...HEADERS, Referer: postUrl } });
          if (!nexRes.ok) continue;
          const nexHtml = await nexRes.text();
          const finalLinks = [...nexHtml.matchAll(/href="([^"]*(?:fastdl|vcloud|filebee|dgdrive|hubcloud|pixeldrain)[^"]*)"[^>]*>([\s\S]*?)<\/a>/gi)];
          for (const f of finalLinks) {
            const serverName = f[2].replace(/<[^>]+>/g, '').trim() || 'Vega Server';
            streams.push({
              name: 'VegaMovies',
              url: f[1],
              title: `${postTitle.slice(0, 60)} - [${serverName}]`,
              behaviorHints: { notWebReady: true }
            });
          }
        } catch (e) {}
      } else {
        streams.push({
          name: 'VegaMovies',
          url: link,
          title: `${postTitle.slice(0, 60)} - [Direct]`,
          behaviorHints: { notWebReady: true }
        });
      }
    }
    return streams;
  } catch (e) {
    return [];
  }
}

async function getStreams(tmdbId, mediaType = "movie", season = null, episode = null) {
  try {
    let imdbId = typeof tmdbId === 'string' && tmdbId.startsWith('tt') ? tmdbId : null;
    let title = '';

    try {
      const mediaInfo = await getTMDBDetails(tmdbId, mediaType);
      title = mediaInfo.title;
    } catch (e) {}

    const searchResults = await searchVega(imdbId, title);
    if (!searchResults || searchResults.length === 0) return [];

    const bestMatch = searchResults[0];
    const streams = await getDownloadLinks(bestMatch.url, bestMatch.title);
    return streams.map(s => ({ ...s, type: mediaType }));
  } catch (e) {
    return [];
  }
}

module.exports = { getStreams };
