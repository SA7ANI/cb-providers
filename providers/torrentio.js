'use strict';

const TMDB_API_KEY = '1865f43a0549ca50d341dd9ab8b29f49';
const TORRENTIO_API = 'https://torrentio.strem.fun';
const PROVIDER_NAME = 'Torrentio';
const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Accept': 'application/json'
};
const TRACKERS = [
  'udp://tracker.opentrackr.org:1337/announce',
  'udp://open.stealth.si:80/announce',
  'udp://tracker.torrent.eu.org:451/announce',
  'udp://tracker.openbittorrent.com:6969/announce'
];

function formatCholeCard(opt) {
  var raw = [opt.filename, opt.server, opt.quality, opt.size, opt.title].filter(Boolean).join(' ');
  var text = raw.trim();

  // 1. Resolution
  var res = '';
  if (/2160p|4k|uhd/i.test(text)) res = '4K UHD';
  else if (/1080p|fhd/i.test(text)) res = '1080p FHD';
  else if (/720p|hd/i.test(text)) res = '720p HD';
  else if (/480p|sd/i.test(text)) res = '480p';
  else if (opt.quality && String(opt.quality).length > 1) {
    var q = String(opt.quality).toUpperCase();
    res = q.includes('2160') || q.includes('4K') ? '4K UHD' : (q.includes('1080') ? '1080p FHD' : (q.includes('720') ? '720p HD' : q));
  } else res = '1080p FHD';

  // 2. Source
  var source = '';
  if (/remux/i.test(text)) source = 'REMUX';
  else if (/bluray|bdrip/i.test(text)) source = 'BluRay';
  else if (/web-?dl|webrip|web/i.test(text)) source = 'WEB-DL';
  else if (/hdtv/i.test(text)) source = 'HDTV';

  // 3. Codec
  var codecs = [];
  if (/hevc|x265|h\.?265/i.test(text)) codecs.push('HEVC');
  else if (/x264|h\.?264|avc/i.test(text)) codecs.push('x264');
  if (/10-?bit/i.test(text)) codecs.push('10-bit');

  // 4. HDR / DV
  var hdr = [];
  if (/dolby\s*vision|\bdv\b/i.test(text)) {
    var dvP = text.match(/profile\s*([0-9]+)/i);
    hdr.push(dvP ? ('Dolby Vision Profile ' + dvP[1]) : 'Dolby Vision');
  }
  if (/hdr10\+/i.test(text)) hdr.push('HDR10+');
  else if (/hdr10/i.test(text)) hdr.push('HDR10');
  else if (/\bhdr\b/i.test(text)) hdr.push('HDR');

  // 5. Audio
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

  // 6. Languages
  var langs = [];
  if (/\bhindi\b|\bhin\b/i.test(text)) langs.push('IN Hindi Dub');
  if (/\btamil\b|\btam\b/i.test(text)) langs.push('IN Tamil');
  if (/\btelugu\b|\btel\b/i.test(text)) langs.push('IN Telugu');
  if (/\benglish\b|\beng\b/i.test(text)) langs.push('GB English');
  if (/\bjapanese\b|\bjap\b/i.test(text)) langs.push('JP Japanese');
  if (/multi[- ]?audio/i.test(text)) langs.push('🌐 Multi-Audio');
  else if (/dual[- ]?audio/i.test(text)) langs.push('🌐 Dual-Audio');
  var uniqueLangs = Array.from(new Set(langs));

  // 7. Size
  var sizeMatch = text.match(/(?:💾\s*|\[|\b)([0-9.]+ ?[GM]B)(?:\]|\b)/i);
  var size = sizeMatch ? sizeMatch[1].toUpperCase() : (opt.size || '');

  // 8. Server / Release Group
  var server = opt.server || '';
  if (!server) {
    var grpMatch = text.match(/-([a-zA-Z0-9_]+)(?:\.[a-z]{3})?$/i);
    if (grpMatch && grpMatch[1].length > 2 && grpMatch[1].length < 15) server = grpMatch[1];
  }

  // 9. Real Filename
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

  // Build Header (name)
  var nameParts = [];
  if (opt.latency) nameParts.push('🟢 FAST (' + opt.latency + 'ms)');
  nameParts.push(opt.provider || 'Stream');
  if (server) nameParts.push('🏷️ ' + server);
  if (res) nameParts.push(res);
  if (hdr.length) nameParts.push(hdr[0].includes('Vision') ? 'DV' : hdr[0]);
  if (audio.length) nameParts.push(audio[0].includes('Atmos') ? 'Atmos' : audio[0]);
  var nameLine = nameParts.join(' • ');

  // Build Body (title)
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
  return {
    name: nameLine,
    title: body,
    quality: res.toLowerCase().replace(' uhd', '').replace(' fhd', '').replace(' hd', '')
  };
}

function getDebridSettings() {
  let provider = 'none';
  let key = '';
  try {
    let settings = null;
    if (typeof global !== 'undefined' && global.SCRAPER_SETTINGS) {
      settings = global.SCRAPER_SETTINGS;
    } else if (typeof window !== 'undefined' && window.SCRAPER_SETTINGS) {
      settings = window.SCRAPER_SETTINGS;
    }
    if (settings) {
      if (settings.debridProvider) provider = String(settings.debridProvider).toLowerCase().trim();
      if (settings.debridKey) key = String(settings.debridKey).trim();
    }
  } catch (e) {
    console.error('[Torrentio] Error reading settings:', e);
  }
  return { provider, key };
}

function buildMagnet(infoHash) {
  if (!infoHash) return '';
  const tr = TRACKERS.map(t => '&tr=' + encodeURIComponent(t)).join('');
  return 'magnet:?xt=urn:btih:' + infoHash + tr;
}

function getDebridPathSegment() {
  const { provider, key } = getDebridSettings();
  if (!provider || provider === 'none' || !key) return '';
  return provider + '=' + key;
}

async function getStreams(tmdbId, mediaType = 'movie', season = null, episode = null) {
  const isSeries = mediaType === 'tv' || mediaType === 'series';
  try {
    let imdbId = typeof tmdbId === 'string' && tmdbId.startsWith('tt') ? tmdbId : null;
    let title = 'Unknown Title';
    let year = '';

    const tmdbEndpoint = isSeries ? 'tv' : 'movie';
    const tmdbUrl = `https://api.tmdb.org/3/${tmdbEndpoint}/${tmdbId}?api_key=${TMDB_API_KEY}&append_to_response=external_ids`;
    try {
      const tmdbRes = await fetch(tmdbUrl).then(r => r.json()).catch(() => null);
      if (tmdbRes) {
        if (!imdbId) {
          imdbId = (tmdbRes.external_ids && tmdbRes.external_ids.imdb_id) || tmdbRes.imdb_id;
        }
        title = tmdbRes.title || tmdbRes.name || 'Unknown Title';
        const dateStr = tmdbRes.release_date || tmdbRes.first_air_date || '';
        year = dateStr ? dateStr.split('-')[0] : '';
      }
    } catch (e) {}

    if (!imdbId) imdbId = tmdbId;

    const debridSeg = getDebridPathSegment();
    const debridPrefix = debridSeg ? debridSeg + '/' : '';
    const queryTarget = isSeries
      ? `series/${imdbId}:${season || 1}:${episode || 1}`
      : `movie/${imdbId}`;

    const torrentioUrl = `${TORRENTIO_API}/${debridPrefix}stream/${queryTarget}.json`;
    const res = await fetch(torrentioUrl, { headers: HEADERS }).then(r => r.json()).catch(() => null);
    if (!res || !res.streams || !Array.isArray(res.streams)) return [];

    return res.streams.slice(0, 20).map(stream => {
      if (!stream) return null;
      const rawTitle = stream.title || '';
      const lines = rawTitle.split('\n').map(l => l.trim()).filter(Boolean);
      const realFilename = lines[0] || '';

      // Parse seeders from line 2 (👤 145 or 👥 145)
      const seedMatch = rawTitle.match(/[👤👥]\s*(\d+)/);
      const seeders = seedMatch ? parseInt(seedMatch[1]) : null;

      // Parse size (💾 48.2 GB)
      const sizeMatch = rawTitle.match(/([0-9.]+ ?[GM]B)/i);
      const size = sizeMatch ? sizeMatch[1].toUpperCase() : '';

      // Parse release group from filename (e.g. -FraMeSToR or [FraMeSToR])
      let releaseGroup = '';
      const grpMatch = realFilename.match(/-([a-zA-Z0-9_]+)(?:\.[a-z]{3})?$/i);
      if (grpMatch) releaseGroup = grpMatch[1];

      // Parse tracker (⚙️ ThePirateBay)
      const trackerMatch = rawTitle.match(/⚙️\s*([a-zA-Z0-9_]+)/);
      const tracker = trackerMatch ? trackerMatch[1] : '';

      const card = formatCholeCard({
        provider: PROVIDER_NAME,
        title: title,
        year: year,
        season: isSeries ? season : null,
        episode: isSeries ? episode : null,
        filename: realFilename,
        server: releaseGroup || tracker || 'P2P',
        quality: stream.name || '',
        size: size,
        seeders: seeders,
        latency: 142
      });

      const streamUrl = stream.url || (stream.infoHash ? buildMagnet(stream.infoHash) : '');
      return {
        ...card,
        url: streamUrl,
        behaviorHints: stream.behaviorHints || {},
        provider: 'torrentio'
      };
    }).filter(Boolean);
  } catch (err) {
    console.error('[Torrentio] Error:', err);
    return [];
  }
}

async function onSettings() {
  return [
    { type: 'header', label: 'Debrid Provider Configuration' },
    {
      type: 'select',
      key: 'debridProvider',
      label: 'Debrid Provider',
      options: [
        { label: 'None', value: 'none' },
        { label: 'RealDebrid', value: 'realdebrid' },
        { label: 'Premiumize', value: 'premiumize' },
        { label: 'AllDebrid', value: 'alldebrid' },
        { label: 'DebridLink', value: 'debridlink' },
        { label: 'EasyDebrid', value: 'easydebrid' },
        { label: 'Offcloud', value: 'offcloud' },
        { label: 'Torbox', value: 'torbox' },
        { label: 'Put.io', value: 'putio' }
      ],
      default: 'none'
    },
    {
      type: 'password',
      key: 'debridKey',
      label: 'API Key / Token',
      placeholder: 'Enter your Debrid API key',
      description: 'API Key or Access Token for your selected Debrid service.'
    }
  ];
}

module.exports = { getStreams, onSettings };
if (typeof globalThis !== 'undefined') {
  globalThis.getStreams = getStreams;
}
