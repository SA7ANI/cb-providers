/**
 * AnimeWorld Scraper for Nuvio & Chole Bhature Ecosystem
 * Source: https://watchanimeworld.one/
 * Multi-Language Indian & Global Anime: Hindi, Tamil, Telugu, English, Japanese
 */

const cheerio = require('cheerio-without-node-native');

const BASE_URL = 'https://watchanimeworld.one';
const TMDB_API_KEYS = [
  '1865f43a0549ca50d341dd9ab8b29f49',
  '439c478a771f35c05022f9feabcca01c',
  'e49339e830e014e414c2b9a71b2d4f82'
];
const TMDB_BASE_URL = 'https://api.tmdb.org/3';
const DEFAULT_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.9',
  'Referer': `${BASE_URL}/`
};

function normalizeTitle(str) {
  if (!str) return '';
  return str.toLowerCase()
    .replace(/[^\w\s]/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function titleSimilarity(s1, s2) {
  const n1 = normalizeTitle(s1);
  const n2 = normalizeTitle(s2);
  if (!n1 || !n2) return 0;
  if (n1 === n2) return 1;
  if (n1.includes(n2) || n2.includes(n1)) return 0.85;

  const w1 = new Set(n1.split(' ').filter(Boolean));
  const w2 = new Set(n2.split(' ').filter(Boolean));
  let intersection = 0;
  for (const w of w1) {
    if (w2.has(w)) intersection++;
  }
  const union = new Set([...w1, ...w2]).size;
  return union > 0 ? intersection / union : 0;
}
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

async function getTMDBDetails(tmdbId, mediaType) {
  const isSeries = mediaType === 'tv' || mediaType === 'series';
  const endpoint = isSeries ? 'tv' : 'movie';

  for (const apiKey of TMDB_API_KEYS) {
    try {
      const res = await fetch(`${TMDB_BASE_URL}/${endpoint}/${tmdbId}?api_key=${apiKey}`, {
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        const data = await res.json();
        return {
          title: data.name || data.title || '',
          originalTitle: data.original_name || data.original_title || '',
          year: (data.first_air_date || data.release_date || '').split('-')[0]
        };
      }
    } catch (_) {}
  }
  return { title: '', originalTitle: '', year: '' };
}

async function decodeAbyssSources(url) {
  try {
    const cleanUrl = url.replace('https://short.icu', 'https://player.abyssplayer.com');
    const reqHeaders = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36',
      'Origin': 'https://playhydrax.com',
      'Referer': 'https://playhydrax.com/'
    };
    const res = await fetch(cleanUrl, { headers: reqHeaders });
    if (!res.ok) return [];
    const html = await res.text();
    const match = html.match(/const\s+datas\s*=\s*"([^"]*)"/);
    if (!match || !match[1]) return [];

    const decRes = await fetch('https://enc-dec.app/api/dec-abyss', {
      method: 'POST',
      headers: Object.assign({}, reqHeaders, { 'Content-Type': 'application/json' }),
      body: JSON.stringify({ text: match[1] })
    });
    if (!decRes.ok) return [];
    const decData = await decRes.json();
    return (decData && decData.result && decData.result.sources) || [];
  } catch (_) {
    return [];
  }
}

async function getStreams(tmdbId, mediaType = 'tv', season = 1, episode = 1) {
  try {
    const mediaInfo = await getTMDBDetails(tmdbId, mediaType);
    if (!mediaInfo.title) return [];

    const isSeries = mediaType === 'tv' || mediaType === 'series';
    const s = parseInt(season) || 1;
    const e = parseInt(episode) || 1;

    // Search on watchanimeworld.one
    const searchUrl = `${BASE_URL}/?s=${encodeURIComponent(mediaInfo.title)}`;
    const sRes = await fetch(searchUrl, { headers: DEFAULT_HEADERS });
    if (!sRes.ok) return [];
    const sHtml = await sRes.text();
    const $s = cheerio.load(sHtml);

    const candidates = [];
    $s('article, .result-item, div.item, .search-post').each((i, el) => {
      const a = $s(el).find('a').first();
      const title = $s(el).find('.title, h2, h3, .entry-title').text().trim() || a.attr('title') || a.text().trim();
      const href = a.attr('href');
      if (href && (href.includes('/series/') || href.includes('/movies/'))) {
        const sim = Math.max(
          titleSimilarity(mediaInfo.title, title),
          mediaInfo.originalTitle ? titleSimilarity(mediaInfo.originalTitle, title) : 0
        );
        if (sim >= 0.5) {
          candidates.push({ title, href, sim, isMovieLink: href.includes('/movies/') });
        }
      }
    });

    if (candidates.length === 0) return [];
    candidates.sort((a, b) => b.sim - a.sim);

    let targetPageUrl = null;
    const bestCandidate = candidates[0];

    if (isSeries) {
      // Fetch series page to find episode link
      const seriesPageRes = await fetch(bestCandidate.href, { headers: DEFAULT_HEADERS });
      if (!seriesPageRes.ok) return [];
      const seriesHtml = await seriesPageRes.text();
      const $p = cheerio.load(seriesHtml);

      const epLinks = [];
      $p('a[href*="/episode/"]').each((i, el) => {
        const href = $p(el).attr('href');
        const text = $p(el).text().trim();
        epLinks.push({ text, href });
      });

      // Match season and episode (e.g., 1x1, s1e1, episode-1)
      const epRegexes = [
        new RegExp(`${s}x0?${e}\\b`, 'i'),
        new RegExp(`s0?${s}[-_e]0?${e}\\b`, 'i'),
        new RegExp(`season[-_\\s]*${s}[-_\\s]*episode[-_\\s]*${e}\\b`, 'i'),
        new RegExp(`episode[-_\\s]*${e}\\b`, 'i')
      ];

      for (const reg of epRegexes) {
        const found = epLinks.find(link => reg.test(link.href) || reg.test(link.text));
        if (found) {
          targetPageUrl = found.href;
          break;
        }
      }
      if (!targetPageUrl && epLinks.length > 0) {
        // Fallback: try by episode index
        const idxTarget = epLinks[epLinks.length - e];
        if (idxTarget) targetPageUrl = idxTarget.href;
      }
    } else {
      targetPageUrl = bestCandidate.href;
    }

    if (!targetPageUrl) return [];

    // Fetch the target episode / movie page
    const pageRes = await fetch(targetPageUrl, { headers: DEFAULT_HEADERS });
    if (!pageRes.ok) return [];
    const pageHtml = await pageRes.text();
    const $ep = cheerio.load(pageHtml);

    const streamSources = [];

    // 1. Check for dub-player iframe (/dub-player/t/{id}/)
    const iframes = $ep('iframe').map((i, el) => $ep(el).attr('src')).get();
    for (let ifr of iframes) {
      if (!ifr) continue;
      if (ifr.startsWith('/')) ifr = BASE_URL + ifr;

      if (ifr.includes('dub-player')) {
        try {
          const dpRes = await fetch(ifr, {
            headers: Object.assign({}, DEFAULT_HEADERS, { 'Referer': targetPageUrl })
          });
          const dpText = await dpRes.text();
          const cfgMatch = dpText.match(/var\s+CONFIG\s*=\s*({[\s\S]*?});/);
          if (cfgMatch) {
            const config = JSON.parse(cfgMatch[1]);
            const prefix = config.prefix || 'https://player.abyssplayer.com/';
            const ready = config.ready || {};
            const langMap = {
              hin: '🇮🇳 Hindi Dub',
              tam: '🇮🇳 Tamil',
              tel: '🇮🇳 Telugu',
              eng: '🇬🇧 English',
              jpn: '🇯🇵 Japanese'
            };

            for (const [lKey, fileCode] of Object.entries(ready)) {
              if (fileCode) {
                const abyssUrl = prefix + fileCode;
                streamSources.push({
                  url: abyssUrl,
                  server: 'Abyss ' + (langMap[lKey] || lKey.toUpperCase()),
                  lang: langMap[lKey] || 'English',
                  isAbyss: true
                });
              }
            }
          }
        } catch (_) {}
      } else if (ifr.includes('zephyrix.org')) {
        streamSources.push({
          url: ifr,
          server: 'Zephyrix Player',
          lang: 'Multi-Audio'
        });
      }
    }

    // 2. Check for player1.php?data= base64 embed links
    const player1Match = pageHtml.match(/player1\.php\?data=([a-zA-Z0-9+=/]+)/);
    if (player1Match) {
      try {
        const decoded = Buffer.from(player1Match[1], 'base64').toString('utf8');
        const list = JSON.parse(decoded);
        if (Array.isArray(list)) {
          for (const item of list) {
            if (item.link) {
              streamSources.push({
                url: item.link,
                server: item.language ? `Server (${item.language})` : 'Cloud Player',
                lang: item.language || 'English',
                isAbyss: item.link.includes('short.icu') || item.link.includes('abyssplayer')
              });
            }
          }
        }
      } catch (_) {}
    }

    if (streamSources.length === 0) return [];

    const finalStreams = [];
    const seen = new Set();

    for (const src of streamSources) {
      if (src.isAbyss) {
        // Try decoding direct HLS/MP4 stream
        const decSources = await decodeAbyssSources(src.url);
        if (decSources.length > 0) {
          for (const ds of decSources) {
            if (ds.url && !seen.has(ds.url)) {
              seen.add(ds.url);
              const card = formatCholeCard({
                provider: 'AnimeWorld',
                title: mediaInfo.title,
                year: mediaInfo.year,
                season: isSeries ? s : null,
                episode: isSeries ? e : null,
                server: src.server,
                quality: ds.type || '1080p',
                size: ds.size ? (ds.size / (1024 * 1024) > 1024 ? (ds.size / (1024 * 1024 * 1024)).toFixed(2) + ' GB' : (ds.size / (1024 * 1024)).toFixed(0) + ' MB') : '',
                defaultLang: src.lang
              });
              finalStreams.push({
                name: card.name,
                title: card.title,
                quality: card.quality,
                url: ds.url,
                provider: 'animeworld'
              });
            }
          }
        } else if (!seen.has(src.url)) {
          seen.add(src.url);
          const card = formatCholeCard({
            provider: 'AnimeWorld',
            title: mediaInfo.title,
            year: mediaInfo.year,
            season: isSeries ? s : null,
            episode: isSeries ? e : null,
            server: src.server,
            quality: '1080p',
            defaultLang: src.lang
          });
          finalStreams.push({
            name: card.name,
            title: card.title,
            quality: card.quality,
            url: src.url,
            provider: 'animeworld'
          });
        }
      } else if (src.url && !seen.has(src.url)) {
        seen.add(src.url);
        const card = formatCholeCard({
          provider: 'AnimeWorld',
          title: mediaInfo.title,
          year: mediaInfo.year,
          season: isSeries ? s : null,
          episode: isSeries ? e : null,
          server: src.server,
          quality: '1080p',
          defaultLang: src.lang
        });
        finalStreams.push({
          name: card.name,
          title: card.title,
          quality: card.quality,
          url: src.url,
          provider: 'animeworld'
        });
      }
    }

    return finalStreams;
  } catch (err) {
    return [];
  }
}

module.exports = { getStreams };
