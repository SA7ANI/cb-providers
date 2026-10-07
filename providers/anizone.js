// AniZone Scraper for Nuvio Local Scrapers
// React Native & Hermes compatible version
// Extracts direct HLS streaming links from anizone.to

const TMDB_API_KEY = '1865f43a0549ca50d341dd9ab8b29f49';
const TMDB_BASE_URL = 'https://api.tmdb.org/3';
const MAIN_URL = 'https://anizone.to';

const HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Referer': 'https://anizone.to/'
};

function normalize(str) {
    return (str || '').toLowerCase().replace(/[^a-z0-9]/g, '').trim();
}

function getTMDBDetails(tmdbId, mediaType) {
    const endpoint = mediaType === 'tv' ? 'tv' : 'movie';
    const url = `${TMDB_BASE_URL}/${endpoint}/${tmdbId}?api_key=${TMDB_API_KEY}`;
    
    return fetch(url, { headers: HEADERS })
        .then(res => res.json())
        .then(data => {
            const title = mediaType === 'tv' ? (data.name || data.original_name) : (data.title || data.original_title);
            const originalTitle = data.original_name || data.original_title || '';
            return { title: title || '', originalTitle };
        })
        .catch(() => ({ title: '', originalTitle: '' }));
}

function matchCard(items, targetTitle, originalTitle, mediaType, season) {
    if (!items || items.length === 0) return null;
    const normTarget = normalize(targetTitle);
    const normOrig = normalize(originalTitle);

    const getTitles = (item) => {
        const set = new Set();
        if (item.main_title) set.add(item.main_title);
        if (item.title_list && typeof item.title_list === 'object') {
            Object.values(item.title_list).forEach(t => {
                if (t) set.add(t);
            });
        }
        return Array.from(set);
    };

    if (mediaType === 'movie') {
        for (const item of items) {
            const titles = getTitles(item);
            for (const t of titles) {
                const nt = normalize(t);
                if (nt === normTarget || nt === normOrig) {
                    return item.slug;
                }
            }
        }
        return items[0].slug;
    }

    // TV Series season matching
    const s = parseInt(season) || 1;
    if (s > 1) {
        const seasonRegexes = [
            new RegExp(`season\\s*${s}\\b`, 'i'),
            new RegExp(`\\b${s}(?:nd|rd|th)?\\s*season\\b`, 'i'),
            new RegExp(`\\bs${s}\\b`, 'i')
        ];
        for (const item of items) {
            const titles = getTitles(item);
            for (const t of titles) {
                if (seasonRegexes.some(r => r.test(t))) {
                    return item.slug;
                }
            }
        }
    } else {
        // Season 1: Avoid items with Season 2+, 2nd season, etc.
        const otherSeasonRegex = /season\s*[2-9]|\b[2-9](?:nd|rd|th)\s*season/i;
        for (const item of items) {
            const titles = getTitles(item);
            const hasOtherSeason = titles.some(t => otherSeasonRegex.test(t));
            if (!hasOtherSeason) {
                return item.slug;
            }
        }
    }

    return items[0].slug;
}

function getStreams(tmdbId, mediaType, season, episode) {
    return new Promise((resolve) => {
        getTMDBDetails(tmdbId, mediaType)
            .then(mediaInfo => {
                const searchTitle = mediaInfo.title || mediaInfo.originalTitle;
                if (!searchTitle) return resolve([]);

                const searchUrl = `${MAIN_URL}/anime?search=${encodeURIComponent(searchTitle)}`;
                return fetch(searchUrl, { headers: HEADERS })
                    .then(res => res.text())
                    .then(searchHtml => {
                        const itemsMatch = searchHtml.match(/items:\s*JSON\.parse\('((?:[^'\\]|\\.)*)'\)/);
                        if (!itemsMatch) return resolve([]);

                        let items = [];
                        try {
                            const jsonStr = itemsMatch[1].replace(/\\u0022/g, '"');
                            items = JSON.parse(jsonStr);
                        } catch (e) {
                            return resolve([]);
                        }

                        const slug = matchCard(items, mediaInfo.title, mediaInfo.originalTitle, mediaType, season);
                        if (!slug) return resolve([]);

                        const epNum = mediaType === 'tv' ? (episode || 1) : 1;
                        const epUrl = `${MAIN_URL}/anime/${slug}/${epNum}`;

                        return fetch(epUrl, { headers: HEADERS })
                            .then(res => res.text())
                            .then(epHtml => {
                                let masterUrl = null;
                                let subtitles = [];

                                const playerMatch = epHtml.match(/vidstackPlayer\(JSON\.parse\('((?:[^'\\]|\\.)*)'\)\)/);
                                if (playerMatch) {
                                    try {
                                        const jsonStr = playerMatch[1].replace(/\\u0022/g, '"').replace(/\\\//g, '/').replace(/\\\\/g, '\\');
                                        const data = JSON.parse(jsonStr);
                                        masterUrl = data.src;
                                        if (Array.isArray(data.subtitles)) {
                                            subtitles = data.subtitles.map(s => ({
                                                name: s.title || 'English',
                                                url: s.url ? (s.url.startsWith('http') ? s.url : `https://seiryuu.vid-cdn.xyz/${s.url}`) : '',
                                                language: s.language || 'en'
                                            }));
                                        }
                                    } catch (e) {}
                                }

                                if (!masterUrl) {
                                    const m = epHtml.match(/https:[^"'\s]+master\.m3u8/);
                                    if (m) masterUrl = m[0].replace(/\\/g, '');
                                }

                                if (!masterUrl) return resolve([]);

                                let format = 'Sub';
                                if (epHtml.includes('English') && epHtml.includes('Japanese')) {
                                    format = 'Sub & Dub';
                                } else if (epHtml.includes('English') && !epHtml.includes('Japanese')) {
                                    format = 'Dub';
                                }

                                const streamTitle = mediaType === 'tv'
                                    ? `${mediaInfo.title} S${String(season || 1).padStart(2, '0')}E${String(episode || 1).padStart(2, '0')} [${format}]`
                                    : `${mediaInfo.title} [${format}]`;

                                resolve([{
                                    name: `AniZone [${format}]`,
                                    title: streamTitle,
                                    url: masterUrl,
                                    quality: 'Multi',
                                    headers: HEADERS,
                                    subtitles: subtitles
                                }]);
                            });
                    });
            })
            .catch(() => resolve([]));
    });
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { getStreams };
} else {
    global.getStreams = getStreams;
}
