/**
 * AnimeSalt Scraper for Nuvio & Chole Bhature Ecosystem
 * Source: https://animesalt.cam/
 * High-Speed Anime Streaming with Multi-Server Failover (Abyss, VidMoly, Videasy)
 */

const cheerio = require('cheerio-without-node-native');

const BASE_URL = 'https://animesalt.cam';
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

  var source = 'WEB-DL';
  if (/remux/i.test(text)) source = 'REMUX';
  else if (/bluray|bdrip/i.test(text)) source = 'BluRay';
  else if (/hdtv/i.test(text)) source = 'HDTV';

  var codecs = [];
  if (/hevc|x265|h\.?265/i.test(text)) codecs.push('HEVC');
  else if (/x264|h\.?264|avc/i.test(text)) codecs.push('x264');
  if (/10-?bit/i.test(text)) codecs.push('10-bit');

  var hdr = [];
  if (/dolby\s*vision|\bdv\b/i.test(text)) hdr.push('Dolby Vision');
  if (/hdr10\+/i.test(text)) hdr.push('HDR10+');
  else if (/hdr10/i.test(text)) hdr.push('HDR10');
  else if (/\bhdr\b/i.test(text)) hdr.push('HDR');

  var audio = [];
  if (/atmos/i.test(text)) audio.push('Dolby Atmos');
  if (/truehd/i.test(text)) audio.push('TrueHD');
  if (/dts-?hd/i.test(text)) audio.push('DTS-HD MA');
  else if (/dts/i.test(text)) audio.push('DTS');
  if (/ddp|dd\+|eac3/i.test(text)) audio.push('DDP 5.1');
  else if (/dd|ac3/i.test(text)) audio.push('DD 5.1');
  if (/aac/i.test(text)) audio.push('AAC');

  var langs = [];
  if (/\bhindi\b|\bhin\b/i.test(text)) langs.push('🇮🇳 Hindi Dub');
  if (/\btamil\b|\btam\b/i.test(text)) langs.push('🇮🇳 Tamil');
  if (/\btelugu\b|\btel\b/i.test(text)) langs.push('🇮🇳 Telugu');
  if (/\benglish\b|\beng\b/i.test(text)) langs.push('🇬🇧 English');
  if (/\bjapanese\b|\bjap\b/i.test(text)) langs.push('🇯🇵 Japanese');
  if (/multi[- ]?audio/i.test(text)) langs.push('🌐 Multi-Audio');
  if (!langs.length && opt.defaultLang) langs.push(opt.defaultLang);
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
    var r = res ? ('.' + res.replace(/\s+/g, '.')) : '';
    var s = source ? ('.' + source) : '';
    var c = codecs.length ? ('.' + codecs.join('.')) : '';
    var a = audio.length ? ('.' + audio[0].replace(/[^a-zA-Z0-9]+/g, '.')) : '';
    var g = server ? ('-' + server.replace(/\s+/g, '')) : ('-' + (opt.provider || 'Release'));
    filename = baseTitle + yr + se + r + s + c + a + g + '.mkv';
  }

  var nameParts = [];
  if (opt.latency) nameParts.push('🟢 FAST (' + opt.latency + 'ms)');
  nameParts.push(opt.provider || 'Stream');
  if (server) nameParts.push('🏷️ ' + server);
  if (res) nameParts.push(res);
  if (hdr.length) nameParts.push(hdr[0].includes('Vision') ? 'DV' : hdr[0]);
  if (audio.length) nameParts.push(audio[0]);
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

    // Search via AnimeSalt WordPress API and browse page
    const searchTerms = [mediaInfo.title];
    if (mediaInfo.originalTitle && mediaInfo.originalTitle !== mediaInfo.title) {
      searchTerms.push(mediaInfo.originalTitle);
    }

    let searchHits = [];

    for (const term of searchTerms) {
      try {
        const wpUrl = `${BASE_URL}/wp-json/wp/v2/search?search=${encodeURIComponent(term)}&per_page=30`;
        const res = await fetch(wpUrl, { headers: DEFAULT_HEADERS });
        if (res.ok) {
          const list = await res.json();
          if (Array.isArray(list)) {
            searchHits = searchHits.concat(list);
          }
        }
      } catch (_) {}
    }

    // Also fallback to HTML browse if wp-json returned nothing
    if (searchHits.length === 0) {
      try {
        const bUrl = `${BASE_URL}/browse/?q=${encodeURIComponent(mediaInfo.title)}`;
        const bRes = await fetch(bUrl, { headers: DEFAULT_HEADERS });
        if (bRes.ok) {
          const bHtml = await bRes.text();
          const $b = cheerio.load(bHtml);
          $b('a[href*="/tv/"], a[href*="/movies/"]').each((i, el) => {
            const href = $b(el).attr('href');
            const title = $b(el).text().trim();
            if (href && (href.includes('/tv/') || href.includes('/movies/'))) {
              searchHits.push({ title, url: href, subtype: href.includes('/tv/') ? 'tv' : 'movies' });
            }
          });
        }
      } catch (_) {}
    }

    if (searchHits.length === 0) return [];

    // Filter and score candidates
    const scoredCandidates = [];
    for (const hit of searchHits) {
      const hitTitle = hit.title || '';
      const hitUrl = hit.url || '';
      if (!hitUrl) continue;

      const sim = Math.max(
        titleSimilarity(mediaInfo.title, hitTitle),
        mediaInfo.originalTitle ? titleSimilarity(mediaInfo.originalTitle, hitTitle) : 0
      );

      if (sim >= 0.45) {
        scoredCandidates.push({
          title: hitTitle,
          url: hitUrl,
          subtype: hit.subtype || (hitUrl.includes('/episode/') ? 'episodes' : (hitUrl.includes('/tv/') ? 'tv' : 'movies')),
          sim
        });
      }
    }

    if (scoredCandidates.length === 0) return [];
    scoredCandidates.sort((a, b) => b.sim - a.sim);

    let targetEpisodeUrl = null;

    if (isSeries) {
      // 1. Direct episode hit from search (e.g. "Title Season 4 Episode 19")
      const epHit = scoredCandidates.find(c => {
        if (c.subtype !== 'episodes' && !c.url.includes('/episode/')) return false;
        const hasEp = new RegExp(`episode[-_\\s]*${e}\\b`, 'i').test(c.url) || new RegExp(`episode[-_\\s]*${e}\\b`, 'i').test(c.title);
        if (s > 1) {
          const hasSeason = new RegExp(`season[-_\\s]*${s}\\b|s0?${s}\\b`, 'i').test(c.url) || new RegExp(`season[-_\\s]*${s}\\b`, 'i').test(c.title);
          return hasEp && hasSeason;
        }
        return hasEp;
      });

      if (epHit) {
        targetEpisodeUrl = epHit.url;
      } else {
        // Find TV show page to extract episodes
        const tvHit = scoredCandidates.find(c => c.subtype === 'tv' || c.url.includes('/tv/')) || scoredCandidates[0];
        if (tvHit) {
          const tvPageRes = await fetch(tvHit.url, { headers: DEFAULT_HEADERS });
          if (tvPageRes.ok) {
            const tvHtml = await tvPageRes.text();
            const $t = cheerio.load(tvHtml);
            const epLinks = [];
            $t('a[href*="/episode/"]').each((i, el) => {
              const h = $t(el).attr('href');
              const t = $t(el).text().trim();
              if (h) epLinks.push({ href: h, text: t });
            });

            // Match episode
            const epReg = new RegExp(`episode[-_\\s]*${e}\\b`, 'i');
            const found = epLinks.find(l => epReg.test(l.href) || epReg.test(l.text));
            if (found) {
              targetEpisodeUrl = found.href;
            } else if (epLinks.length > 0) {
              // Try indexing
              targetEpisodeUrl = epLinks[epLinks.length - e] ? epLinks[epLinks.length - e].href : epLinks[0].href;
            }
          }
        }
      }
    } else {
      // Movie
      const movieHit = scoredCandidates.find(c => c.subtype === 'movies' || c.url.includes('/movies/') || c.url.includes('/episode/')) || scoredCandidates[0];
      if (movieHit) targetEpisodeUrl = movieHit.url;
    }

    if (!targetEpisodeUrl) return [];

    // Fetch the target episode / movie page to extract stream servers
    const epPageRes = await fetch(targetEpisodeUrl, { headers: DEFAULT_HEADERS });
    if (!epPageRes.ok) return [];
    const epHtml = await epPageRes.text();
    const $ep = cheerio.load(epHtml);

    const serverList = [];

    // Extract server buttons (.asnt-server-button, [data-embed], etc.)
    $ep('.asnt-server-button, [data-embed], [data-src], [data-url]').each((i, el) => {
      const embed = $ep(el).attr('data-embed') || $ep(el).attr('data-src') || $ep(el).attr('data-url');
      let sName = $ep(el).text().trim() || `Server ${i + 1}`;
      if (embed && embed.startsWith('http')) {
        if (embed.includes('animesalt.cam/tv/') || embed.includes('animesalt.cam/movies/') || embed.includes('animesalt.cam/my-list') || embed.includes('animesalt.cam/browse')) {
          return;
        }
        if (embed.includes('abyssplayer') || embed.includes('short.icu')) sName = 'Abyss Player';
        else if (embed.includes('vidmoly')) sName = 'VidMoly';
        else if (embed.includes('videasy')) sName = 'Videasy Stream';
        serverList.push({ name: sName, url: embed });
      }
    });

    // Also check iframes
    $ep('iframe[src]').each((i, el) => {
      const src = $ep(el).attr('src');
      if (src && src.startsWith('http') && !serverList.some(s => s.url === src)) {
        if (!src.includes('animesalt.cam')) {
          serverList.push({ name: `Stream Server ${serverList.length + 1}`, url: src });
        }
      }
    });

    if (serverList.length === 0) return [];

    const finalStreams = [];
    const seen = new Set();

    for (const srv of serverList) {
      if (srv.url.includes('abyssplayer') || srv.url.includes('short.icu')) {
        // Resolve direct stream sources
        const decSources = await decodeAbyssSources(srv.url);
        if (decSources.length > 0) {
          for (const ds of decSources) {
            if (ds.url && !seen.has(ds.url)) {
              seen.add(ds.url);
              const card = formatCholeCard({
                provider: 'AnimeSalt',
                title: mediaInfo.title,
                year: mediaInfo.year,
                season: isSeries ? s : null,
                episode: isSeries ? e : null,
                server: 'Abyss Fast',
                quality: ds.type || '1080p',
                size: ds.size ? (ds.size / (1024 * 1024) > 1024 ? (ds.size / (1024 * 1024 * 1024)).toFixed(2) + ' GB' : (ds.size / (1024 * 1024)).toFixed(0) + ' MB') : '',
                defaultLang: '🇯🇵 Japanese'
              });
              finalStreams.push({
                name: card.name,
                title: card.title,
                quality: card.quality,
                url: ds.url,
                provider: 'animesalt'
              });
            }
          }
        } else if (!seen.has(srv.url)) {
          seen.add(srv.url);
          const card = formatCholeCard({
            provider: 'AnimeSalt',
            title: mediaInfo.title,
            year: mediaInfo.year,
            season: isSeries ? s : null,
            episode: isSeries ? e : null,
            server: srv.name,
            quality: '1080p',
            defaultLang: '🇯🇵 Japanese'
          });
          finalStreams.push({
            name: card.name,
            title: card.title,
            quality: card.quality,
            url: srv.url,
            provider: 'animesalt'
          });
        }
      } else if (!seen.has(srv.url)) {
        seen.add(srv.url);
        let srvQuality = '1080p';
        if (/720p/i.test(srv.name)) srvQuality = '720p';
        else if (/480p/i.test(srv.name)) srvQuality = '480p';

        const card = formatCholeCard({
          provider: 'AnimeSalt',
          title: mediaInfo.title,
          year: mediaInfo.year,
          season: isSeries ? s : null,
          episode: isSeries ? e : null,
          server: srv.name,
          quality: srvQuality,
          defaultLang: '🇯🇵 Japanese'
        });
        finalStreams.push({
          name: card.name,
          title: card.title,
          quality: card.quality,
          url: srv.url,
          provider: 'animesalt'
        });
      }
    }

    return finalStreams;
  } catch (err) {
    return [];
  }
}

module.exports = { getStreams };
