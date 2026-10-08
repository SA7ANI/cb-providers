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
function formatCholeCard(opt) {
  var raw = [(opt.filename || ''), (opt.rawText || ''), (opt.server || ''), (opt.quality || ''), (opt.size || ''), (opt.title || '')].join(' ');
  var text = raw.trim();
  var cleanText = text.replace(/4khdhub/gi, '').replace(/hdhub4u/gi, '');

  var res = '';
  var qCheck = opt.quality ? String(opt.quality).trim() : '';
  if (/\b(?:2160p|4k|uhd)\b/i.test(qCheck)) res = '4K UHD';
  else if (/\b(?:1080p|fhd)\b/i.test(qCheck)) res = '1080p FHD';
  else if (/\b(?:720p|hd)\b/i.test(qCheck)) res = '720p HD';
  else if (/\b(?:480p|sd)\b/i.test(qCheck)) res = '480p';
  else if (/\b(?:2160p|4k|uhd)\b/i.test(cleanText)) res = '4K UHD';
  else if (/\b(?:1080p|fhd)\b/i.test(cleanText)) res = '1080p FHD';
  else if (/\b(?:720p|hd)\b/i.test(cleanText)) res = '720p HD';
  else if (/\b(?:480p|sd)\b/i.test(cleanText)) res = '480p';
  else res = qCheck ? qCheck.toUpperCase() : '1080p FHD';

  var source = '';
  if (/\bremux\b/i.test(text)) source = 'REMUX';
  else if (/\b(?:bluray|bdrip|brrip)\b/i.test(text)) source = 'BluRay';
  else if (/\b(?:web-?dl|webrip|web)\b/i.test(text)) source = 'WEB-DL';
  else if (/\bhdtv\b/i.test(text)) source = 'HDTV';

  var codecs = [];
  if (/\b(?:hevc|x265|h\.?265)\b/i.test(text)) codecs.push('HEVC');
  else if (/\b(?:x264|h\.?264|avc)\b/i.test(text)) codecs.push('x264');
  if (/\b10-?bit\b/i.test(text)) codecs.push('10-bit');

  var hdr = [];
  if (/\b(?:dolby\s*vision|dv)\b/i.test(text)) hdr.push('Dolby Vision');
  if (/\bhdr10\+\b/i.test(text)) hdr.push('HDR10+');
  else if (/\b(?:hdr10|hdr)\b/i.test(text)) hdr.push('HDR');

  var audio = [];
  var hasAtmos = /\b(?:atmos|ddpa)\b/i.test(text);
  var hasTrueHD = /\btruehd\b/i.test(text);
  var hasDTSHD = /\bdts-?hd(?:\s*ma)?\b/i.test(text);
  var hasDTS = /\bdts\b/i.test(text);
  var hasDDP = /\b(?:ddp|dd\+|eac3)\b/i.test(text);
  var hasDD = /\b(?:dd|ac3)\b/i.test(text);
  var has71 = /7\.1/i.test(text);
  var has51 = /5\.1/i.test(text);

  if (hasAtmos) audio.push('Dolby Atmos' + (has71 ? ' 7.1' : (has51 ? ' 5.1' : '')));
  else if (hasTrueHD) audio.push('TrueHD' + (has71 ? ' 7.1' : (has51 ? ' 5.1' : '')));
  else if (hasDTSHD) audio.push('DTS-HD MA' + (has71 ? ' 7.1' : (has51 ? ' 5.1' : '')));
  else if (hasDTS) audio.push('DTS' + (has51 ? ' 5.1' : ''));
  else if (hasDDP) audio.push('DDP 5.1');
  else if (hasDD) audio.push('DD 5.1');
  else if (/\baac\b/i.test(text)) audio.push('AAC');

  var langs = [];
  if (/\b(?:hindi|hin)\b/i.test(text)) langs.push('🇮🇳 Hindi');
  if (/\b(?:tamil|tam)\b/i.test(text)) langs.push('🇮🇳 Tamil');
  if (/\b(?:telugu|tel)\b/i.test(text)) langs.push('🇮🇳 Telugu');
  if (/\b(?:english|eng)\b/i.test(text)) langs.push('🇬🇧 English');
  if (/\b(?:korean|kor)\b/i.test(text)) langs.push('🇰🇷 Korean');
  if (/\b(?:japanese|jap|jpn)\b/i.test(text)) langs.push('🇯🇵 Japanese');
  if (/\bdual[- ]?audio\b/i.test(text)) langs.push('🌐 Dual-Audio');
  if (/\bmulti[- ]?audio\b/i.test(text)) langs.push('🌐 Multi-Audio');
  if (langs.length === 0 && opt.defaultLang) {
    langs.push(opt.defaultLang);
  }
  var uniqueLangs = Array.from(new Set(langs));

  var sizeMatch = text.match(/(?:💾\s*|\[|\b)([0-9.]+\s*[GM]B)(?:\]|\b)/i);
  var rawSize = opt.size || (sizeMatch ? sizeMatch[1] : '');
  var size = rawSize ? rawSize.replace(/([0-9.]+)\s*([GM]B)/i, '$1 $2').toUpperCase() : '';

  var server = opt.server || '';
  if (!server) {
    var grpMatch = text.match(/-([a-zA-Z0-9_]+)(?:\.[a-z]{3})?$/i);
    if (grpMatch && grpMatch[1].length > 2 && grpMatch[1].length < 15) server = grpMatch[1];
  }

  var nameParts = [];
  if (opt.latency) nameParts.push('🟢 FAST (' + opt.latency + 'ms)');
  nameParts.push(opt.provider || 'Stream');
  if (server) nameParts.push('🏷️ ' + server);
  if (res) nameParts.push(res);
  if (source) nameParts.push(source);
  if (codecs.length) nameParts.push(codecs.join(' '));
  if (hdr.length) nameParts.push(hdr.join(' '));
  if (audio.length) nameParts.push(audio[0]);
  if (uniqueLangs.length) {
    var dualTag = uniqueLangs.find(function(l) { return l.indexOf('Dual') !== -1 || l.indexOf('Multi') !== -1; });
    if (dualTag) nameParts.push(dualTag);
    else nameParts.push(uniqueLangs.slice(0, 2).join(' + '));
  }
  if (opt.seeders !== undefined && opt.seeders !== null && opt.seeders !== '') {
    nameParts.push('🌱 ' + opt.seeders);
  }
  var nameLine = nameParts.join(' • ');

  var filename = (opt.filename || '').trim();
  if (!filename || filename === opt.title) {
    var baseTitle = (opt.title || 'Video').replace(/[^a-zA-Z0-9]+/g, '.');
    var yr = opt.year ? ('.' + opt.year) : '';
    var se = (opt.season && opt.episode) ? ('.S' + String(opt.season).padStart(2, '0') + 'E' + String(opt.episode).padStart(2, '0')) : '';
    var r = res ? ('.' + res.replace(/\s+/g, '.')) : '';
    var s = source ? ('.' + source) : '';
    var c = codecs.length ? ('.' + codecs.join('.')) : '';
    var a = audio.length ? ('.' + audio[0].replace(/[^a-zA-Z0-9]+/g, '.')) : '';
    var g = server ? ('-' + server.replace(/[\s\-_]+/g, '')) : ('-' + (opt.provider || 'Release'));
    filename = baseTitle + yr + se + r + s + c + a + g + '.mkv';
  }

  var specTags = [res, source].concat(codecs).filter(Boolean);
  var seasonEp = (opt.season && opt.episode) ? (' • S' + String(opt.season).padStart(2, '0') + 'E' + String(opt.episode).padStart(2, '0')) : '';
  var line1 = '🎬 ' + (opt.title || 'Unknown') + (opt.year ? (' (' + opt.year + ')') : '') + seasonEp + (specTags.length ? (' [' + specTags.join(' • ') + ']') : '');
  var line2 = '📄 ' + filename;
  var av = hdr.concat(audio);
  var line3 = av.length ? ('💎 ' + av.join(' • ')) : '';
  var line4 = uniqueLangs.length ? ('🌐 ' + uniqueLangs.join(' • ')) : '';

  var meta = [];
  if (size) meta.push('📦 ' + size);
  if (opt.seeders !== undefined && opt.seeders !== null && opt.seeders !== '') meta.push('🟢 ' + opt.seeders + ' Seeders');
  if (server) meta.push('🏷️ ' + server);
  meta.push('🔗 ' + (opt.provider || 'Stream'));
  var line5 = meta.join(' • ');

  var body = [line1, line2, line3, line4, line5].filter(Boolean).join('\n');

  var qualitySlug = '1080p';
  if (res.indexOf('4K') !== -1 || res.indexOf('2160') !== -1) qualitySlug = '4k';
  else if (res.indexOf('1080') !== -1) qualitySlug = '1080p';
  else if (res.indexOf('720') !== -1) qualitySlug = '720p';
  else if (res.indexOf('480') !== -1) qualitySlug = '480p';

  return {
    name: nameLine,
    title: body,
    quality: qualitySlug,
    size: size || ''
  };
}

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
                if (nt && (nt === normTarget || nt === normOrig || (normTarget && (nt.includes(normTarget) || normTarget.includes(nt))))) {
                    return item.slug;
                }
            }
        }
        return null;
    }

    // TV Series matching: only consider items that actually match the title
    const matchingItems = items.filter(item => {
        const titles = getTitles(item);
        return titles.some(t => {
            const nt = normalize(t);
            return nt && (nt === normTarget || nt === normOrig || (normTarget && (nt.includes(normTarget) || normTarget.includes(nt))));
        });
    });
    if (matchingItems.length === 0) return null;

    const s = parseInt(season) || 1;
    if (s > 1) {
        const seasonRegexes = [
            new RegExp(`season\\s*${s}\\b`, 'i'),
            new RegExp(`\\b${s}(?:nd|rd|th)?\\s*season\\b`, 'i'),
            new RegExp(`\\bs${s}\\b`, 'i')
        ];
        for (const item of matchingItems) {
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
        for (const item of matchingItems) {
            const titles = getTitles(item);
            const hasOtherSeason = titles.some(t => otherSeasonRegex.test(t));
            if (!hasOtherSeason) {
                return item.slug;
            }
        }
    }

    return matchingItems[0].slug;
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

                                const card = formatCholeCard({
                                    provider: "AniZone",
                                    title: mediaInfo.title,
                                    year: "",
                                    season: mediaType === 'tv' ? (season || 1) : null,
                                    episode: mediaType === 'tv' ? (episode || 1) : null,
                                    filename: `${mediaInfo.title} S${String(season || 1).padStart(2, '0')}E${String(episode || 1).padStart(2, '0')} [${format}]`,
                                    server: format,
                                    quality: '1080p',
                                    url: masterUrl
                                });

                                resolve([{
                                    ...card,
                                    url: masterUrl,
                                    headers: HEADERS,
                                    subtitles: subtitles,
                                    provider: "anizone"
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
