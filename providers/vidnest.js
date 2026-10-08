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

function formatCholeCard(opt) {
  var raw = [opt.filename, opt.server, opt.quality, opt.size, opt.title].filter(Boolean).join(' ');
  var text = raw.trim();

  var res = '';
  if (/2160p|4k|uhd/i.test(text)) res = '4K UHD';
  else if (/1080p|fhd/i.test(text)) res = '1080p FHD';
  else if (/720p|hd/i.test(text)) res = '720p HD';
  else if (/480p|sd/i.test(text)) res = '480p';
  else if (opt.quality && String(opt.quality).length > 1) {
    var q = String(opt.quality).toUpperCase();
    res = q.includes('2160') || q.includes('4K') ? '4K UHD' : (q.includes('1080') ? '1080p FHD' : (q.includes('720') ? '720p HD' : q));
  } else res = '1080p FHD';

  var source = '';
  if (/remux/i.test(text)) source = 'REMUX';
  else if (/bluray|bdrip/i.test(text)) source = 'BluRay';
  else if (/web-?dl|webrip|web/i.test(text)) source = 'WEB-DL';
  else if (/hdtv/i.test(text)) source = 'HDTV';

  var codecs = [];
  if (/hevc|x265|h\.?265/i.test(text)) codecs.push('HEVC');
  else if (/x264|h\.?264|avc/i.test(text)) codecs.push('x264');
  if (/10-?bit/i.test(text)) codecs.push('10-bit');

  var hdr = [];
  if (/dolby\s*vision|\bdv\b/i.test(text)) {
    var dvP = text.match(/profile\s*([0-9]+)/i);
    hdr.push(dvP ? ('Dolby Vision Profile ' + dvP[1]) : 'Dolby Vision');
  }
  if (/hdr10\+/i.test(text)) hdr.push('HDR10+');
  else if (/hdr10/i.test(text)) hdr.push('HDR10');
  else if (/\bhdr\b/i.test(text)) hdr.push('HDR');

  var audio = [];
  var hasAtmos = /atmos/i.test(text);
  var hasTrueHD = /truehd/i.test(text);
  var hasDTSHD = /dts-?hd(\s*ma)?/i.test(text);
  var hasDTS = /dts/i.test(text);
  var hasDDP = /ddp|dd\+|eac3/i.test(text);
  var hasDD = /dd|ac3/i.test(text);
  var has71 = /7\.1/i.test(text);
  var has51 = /5\.1/i.test(text);

  if (hasAtmos && hasTrueHD) audio.push('Dolby Atmos TrueHD' + (has71 ? ' 7.1' : (has51 ? ' 5.1' : '')));
  else if (hasAtmos) audio.push('Dolby Atmos' + (has71 ? ' 7.1' : (has51 ? ' 5.1' : '')));
  else if (hasTrueHD) audio.push('TrueHD' + (has71 ? ' 7.1' : (has51 ? ' 5.1' : '')));
  else if (hasDTSHD) audio.push('DTS-HD MA' + (has71 ? ' 7.1' : (has51 ? ' 5.1' : '')));
  else if (hasDTS) audio.push('DTS' + (has51 ? ' 5.1' : ''));
  else if (hasDDP) audio.push('DDP 5.1');
  else if (hasDD) audio.push('DD 5.1');
  else if (/aac/i.test(text)) audio.push('AAC');

  var langs = [];
  if (/\bhindi\b|\bhin\b/i.test(text)) langs.push('IN Hindi Dub');
  if (/\btamil\b|\btam\b/i.test(text)) langs.push('IN Tamil');
  if (/\btelugu\b|\btel\b/i.test(text)) langs.push('IN Telugu');
  if (/\benglish\b|\beng\b/i.test(text)) langs.push('GB English');
  if (/\bjapanese\b|\bjap\b/i.test(text)) langs.push('JP Japanese');
  if (/multi[- ]?audio/i.test(text)) langs.push('🌐 Multi-Audio');
  else if (/dual[- ]?audio/i.test(text)) langs.push('🌐 Dual-Audio');
  var uniqueLangs = Array.from(new Set(langs));

  var sizeMatch = text.match(/(?:💾\s*|\[|\b)([0-9.]+ ?[GM]B)(?:\]|\b)/i);
  var size = sizeMatch ? sizeMatch[1].toUpperCase() : (opt.size || '');

  var server = opt.server || '';
  if (!server) {
    var grpMatch = text.match(/-([a-zA-Z0-9_]+)(?:\.[a-z]{3})?$/i);
    if (grpMatch && grpMatch[1].length > 2 && grpMatch[1].length < 15) server = grpMatch[1];
  }

  var filename = (opt.filename || '').trim();
  if (!filename || filename === opt.title) {
    var baseTitle = (opt.title || 'Video').replace(/[^a-zA-Z0-9]+/g, '.');
    var yr = opt.year ? ('.' + opt.year) : '';
    var se = (opt.season && opt.episode) ? ('.S' + String(opt.season).padStart(2, '0') + 'E' + String(opt.episode).padStart(2, '0')) : '';
    var r = res ? ('.' + res.replace(' ', '.')) : '';
    var s = source ? ('.' + source) : '';
    var c = codecs.length ? ('.' + codecs.join('.')) : '';
    var a = audio.length ? ('.' + audio[0].replace(/[^a-zA-Z0-9]+/g, '.')) : '';
    var g = server ? ('-' + server) : ('-' + (opt.provider || 'Release'));
    filename = baseTitle + yr + se + r + s + c + a + g + '.mkv';
  }

  var nameParts = [];
  if (opt.latency) nameParts.push('🟢 FAST (' + opt.latency + 'ms)');
  nameParts.push(opt.provider || 'Stream');
  if (server) nameParts.push('🏷️ ' + server);
  if (res) nameParts.push(res);
  if (hdr.length) nameParts.push(hdr[0].includes('Vision') ? 'DV' : hdr[0]);
  if (audio.length) nameParts.push(audio[0].includes('Atmos') ? 'Atmos' : audio[0]);
  var nameLine = nameParts.join(' • ');

  var specTags = [res, source].concat(codecs).filter(Boolean);
  var seasonEp = (opt.season && opt.episode) ? (' • S' + String(opt.season).padStart(2, '0') + 'E' + String(opt.episode).padStart(2, '0')) : '';
  var line1 = '🎬 ' + (opt.title || 'Unknown') + (opt.year ? (' (' + opt.year + ')') : '') + seasonEp + (specTags.length ? (' [' + specTags.join(' • ') + ']') : '');
  var line2 = '📄 ' + filename;
  var av = hdr.concat(audio);
  var line3 = av.length ? ('💎 ' + av.join(' • ')) : '';
  var line4 = uniqueLangs.length ? ('🌐 ' + uniqueLangs.join(' • ')) : '';

  var meta = [];
  if (size) meta.push('📦 ' + size);
  if (server) meta.push('🏷️ ' + server);
  meta.push('🔗 ' + (opt.provider || 'Stream'));
  var line5 = meta.join(' • ');

  var body = [line1, line2, line3, line4, line5].filter(Boolean).join('\n');
  return {
    name: nameLine,
    title: body,
    quality: res.toLowerCase().replace(' uhd', '').replace(' fhd', '').replace(' hd', '')
  };
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

        const serverCap = serverName.charAt(0).toUpperCase() + serverName.slice(1);

        sources.forEach((source) => {
            if (!source) return;
            const videoUrl = source.url || source.file || source.src || source.link;
            if (!videoUrl) return;

            let languageInfo = source.language ? ` [${source.language}]` : '';
            const streamHeaders = source.headers || PLAYBACK_HEADERS;

            const card = formatCholeCard({
                provider: "Vidnest",
                title: mediaInfo.title,
                year: mediaInfo.year || "",
                season: seasonNum,
                episode: episodeNum,
                filename: `${mediaInfo.title} ${mediaInfo.year || ''} [${serverCap}]${languageInfo}`.trim(),
                server: serverCap,
                quality: "1080p",
                url: videoUrl
            });

            streams.push({
                ...card,
                url: videoUrl,
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
