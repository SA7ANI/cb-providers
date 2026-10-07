// Vidnest Scraper for Nuvio Local Scrapers
// React Native & Hermes compatible version
// Extracts streaming links using TMDB ID from Vidnest servers with local substitution cipher decoding

const TMDB_API_KEY = '1865f43a0549ca50d341dd9ab8b29f49';
const TMDB_BASE_URL = 'https://api.tmdb.org/3';

const VIDNEST_BASE_URL = 'https://new.vidnest.fun';
const VIDNEST_ALPHABET = 'RB0fpH8ZEyVLkv7c2i6MAJ5u3IKFDxlS1NTsnGaqmXYdUrtzjwObCgQP94hoeW+/=';
const SERVERS = ['hollymoviehd', 'flixhq', 'rogflix'];

const WORKING_HEADERS = {
    'Accept': '*/*',
    'Origin': 'https://vidnest.fun',
    'Referer': 'https://vidnest.fun/',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
};

const PLAYBACK_HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Referer': 'https://vidnest.fun/'
};

// React Native / Hermes safe Base64 substitution cipher decoder
function customBase64Decode(str, alphabet) {
    if (!str) return '';
    const s = {};
    for (let i = 0; i < alphabet.length; i++) s[alphabet[i]] = i;
    const out = [];
    for (let t = 0; t < str.length; t += 4) {
        let o = str.slice(t, t + 4);
        while (o.length < 4) o += '=';
        const l = [];
        for (let i = 0; i < 4; i++) {
            const val = s[o[i]];
            l.push(val !== undefined ? val : 64);
        }
        out.push((l[0] << 2) | (l[1] >> 4));
        if (l[2] !== 64) {
            out.push(((l[1] & 15) << 4) | (l[2] >> 2));
        }
        if (l[3] !== 64) {
            out.push(((l[2] & 3) << 6) | l[3]);
        }
    }
    if (typeof TextDecoder !== 'undefined') {
        return new TextDecoder().decode(new Uint8Array(out));
    }
    let res = '';
    for (let i = 0; i < out.length; i++) {
        res += String.fromCharCode(out[i]);
    }
    return decodeURIComponent(escape(res));
}

function makeRequest(url, options = {}) {
    return fetch(url, {
        method: options.method || 'GET',
        headers: { ...WORKING_HEADERS, ...options.headers },
        ...options
    }).then(response => {
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        return response;
    });
}

function getTMDBDetails(tmdbId, mediaType) {
    const endpoint = mediaType === 'tv' ? 'tv' : 'movie';
    const url = `${TMDB_BASE_URL}/${endpoint}/${tmdbId}?api_key=${TMDB_API_KEY}`;
    
    return makeRequest(url)
        .then(response => response.json())
        .then(data => {
            const title = mediaType === 'tv' ? data.name : data.title;
            const releaseDate = mediaType === 'tv' ? data.first_air_date : data.release_date;
            const year = releaseDate ? parseInt(releaseDate.split('-')[0]) : null;
            return { title: title || 'Unknown', year: year };
        })
        .catch(() => ({ title: 'Unknown', year: null }));
}

function processVidnestResponse(data, serverName, mediaInfo, seasonNum, episodeNum) {
    const streams = [];
    try {
        let sources = [];
        if (data.streams && Array.isArray(data.streams)) {
            sources = data.streams;
        } else if (data.sources && Array.isArray(data.sources)) {
            sources = data.sources;
        } else if (data.url && typeof data.url === 'string') {
            sources = [{ url: data.url, type: data.type || 'hls', headers: data.headers, subtitles: data.subtitles }];
        } else if (data.data && typeof data.data === 'string') {
            sources = [{ url: data.data, type: 'hls' }];
        }

        if (!Array.isArray(sources) || sources.length === 0) {
            return streams;
        }

        sources.forEach((source) => {
            if (!source) return;
            const videoUrl = source.url || source.file || source.src || source.link;
            if (!videoUrl) return;

            let languageInfo = '';
            if (source.language) {
                languageInfo = ` [${source.language}]`;
            }

            let mediaTitle = mediaInfo.title;
            if (mediaInfo.year) {
                mediaTitle += ` (${mediaInfo.year})`;
            }
            if (seasonNum && episodeNum) {
                mediaTitle = `${mediaInfo.title} S${String(seasonNum).padStart(2, '0')}E${String(episodeNum).padStart(2, '0')}`;
            }

            const streamHeaders = source.headers || PLAYBACK_HEADERS;

            streams.push({
                name: `Vidnest ${serverName.charAt(0).toUpperCase() + serverName.slice(1)}${languageInfo}`,
                title: mediaTitle,
                url: videoUrl,
                quality: 'auto',
                headers: streamHeaders,
                subtitles: source.subtitles || []
            });
        });
    } catch (e) {}
    return streams;
}

function fetchFromServer(serverName, mediaType, tmdbId, mediaInfo, seasonNum, episodeNum) {
    let apiUrl;
    if (mediaType === 'tv' && seasonNum && episodeNum) {
        apiUrl = `${VIDNEST_BASE_URL}/${serverName}/${mediaType}/${tmdbId}/${seasonNum}/${episodeNum}`;
    } else {
        apiUrl = `${VIDNEST_BASE_URL}/${serverName}/${mediaType}/${tmdbId}`;
    }

    return makeRequest(apiUrl)
        .then(response => response.json())
        .then(json => {
            if (json && json.data) {
                const decryptedText = customBase64Decode(json.data, VIDNEST_ALPHABET);
                const decryptedData = JSON.parse(decryptedText);
                return processVidnestResponse(decryptedData, serverName, mediaInfo, seasonNum, episodeNum);
            } else if (json && (json.streams || json.sources || json.url)) {
                return processVidnestResponse(json, serverName, mediaInfo, seasonNum, episodeNum);
            }
            return [];
        })
        .catch(() => []);
}

function getStreams(tmdbId, mediaType, seasonNum, episodeNum) {
    return new Promise((resolve) => {
        getTMDBDetails(tmdbId, mediaType)
            .then(mediaInfo => {
                const serverPromises = SERVERS.map(serverName => 
                    fetchFromServer(serverName, mediaType, tmdbId, mediaInfo, seasonNum, episodeNum)
                );

                return Promise.all(serverPromises)
                    .then(results => {
                        const allStreams = [];
                        const seenUrls = new Set();
                        results.forEach(streams => {
                            streams.forEach(stream => {
                                if (stream && stream.url && !seenUrls.has(stream.url)) {
                                    seenUrls.add(stream.url);
                                    allStreams.push(stream);
                                }
                            });
                        });
                        resolve(allStreams);
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
