/**
 * RedFlix Stream Extractor
 */

import cheerio from 'cheerio-without-node-native';
import { BASE_URL, DEFAULT_HEADERS } from './constants.js';
import { normalizeTitle, getMediaMetadata, httpGet } from './utils.js';

function loadCheerio(html) {
    if (!html) return null;
    const ch = (cheerio && cheerio.load) ? cheerio : ((cheerio && cheerio.default) || cheerio);
    if (typeof ch.load === 'function') return ch.load(html);
    if (typeof ch === 'function') return ch(html);
    return null;
}

/**
 * Search RedFlix for media item
 */
async function searchRedFlix(baseUrl, title, year, mediaType) {
    const searchUrl = `${baseUrl}/search?q=${encodeURIComponent(title)}`;
    const res = await httpGet(searchUrl);
    const html = res.text || (typeof res.data === 'string' ? res.data : '');
    const $ = loadCheerio(html);
    const typeFilter = mediaType === 'tv' ? '/tv/' : '/movie/';
    const candidates = [];

    $(`a[href*="${typeFilter}"]`).each((i, el) => {
        const href = $(el).attr('href');
        if (!href) return;
        const fullHref = href.startsWith('http') ? href : `${baseUrl}${href.startsWith('/') ? '' : '/'}${href}`;
        const text = $(el).text().trim().replace(/\s+/g, ' ');
        const yMatch = text.match(/\b(19\d\d|20\d\d)\b/) || fullHref.match(/\b(19\d\d|20\d\d)\b/);
        const itemYear = yMatch ? parseInt(yMatch[1], 10) : null;
        candidates.push({ href: fullHref, text, year: itemYear });
    });

    if (candidates.length === 0) return null;

    const normTarget = normalizeTitle(title);

    // 1. Try exact year and title match
    if (year) {
        const yearMatch = candidates.find(c => c.year === year && (normalizeTitle(c.text).includes(normTarget) || normTarget.includes(normalizeTitle(c.text))));
        if (yearMatch) return yearMatch;
    }

    // 2. Try normalized title similarity
    const titleMatch = candidates.find(c => {
        const cNorm = normalizeTitle(c.text);
        return cNorm.includes(normTarget) || normTarget.includes(cNorm);
    });
    if (titleMatch) return titleMatch;

    // 3. Fallback to first candidate
    return candidates[0];
}

/**
 * Extract streams for a movie
 */
async function extractMovieStreams(pageUrl, mediaInfo) {
    const res = await httpGet(pageUrl);
    const html = res.text || (typeof res.data === 'string' ? res.data : '');
    const $ = loadCheerio(html);
    const streams = [];

    $('[data-url]').each((i, el) => {
        const url = $(el).attr('data-url');
        const name = $(el).attr('data-name') || $(el).text().trim() || `Server ${i + 1}`;
        if (url && url.startsWith('http')) {
            streams.push({
                name: `RedFlix [${name}]`,
                title: `RedFlix - ${mediaInfo.title} (${name})`,
                url: url,
                quality: '1080p',
                headers: {
                    'Referer': pageUrl,
                    'User-Agent': DEFAULT_HEADERS['User-Agent']
                },
                provider: 'redflix'
            });
        }
    });

    return streams;
}

/**
 * Extract streams for a TV episode
 */
async function extractTVStreams(baseUrl, pageUrl, season, episode, mediaInfo) {
    const slugMatch = pageUrl.match(/\/tv\/([^\/?#]+)/);
    if (!slugMatch) return [];

    const slug = slugMatch[1];
    const s = season || 1;
    const e = episode || 1;
    const epApiUrl = `${baseUrl}/tv/${slug}/episode/${s}/${e}`;

    try {
        const res = await httpGet(epApiUrl, {
            headers: {
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Referer': pageUrl
            }
        });

        const data = res.json || res.data;
        if (data && data.success && Array.isArray(data.playerSources)) {
            const streams = [];
            data.playerSources.forEach((src, idx) => {
                if (src.url && src.url.startsWith('http')) {
                    const serverName = src.name || `Server ${idx + 1}`;
                    streams.push({
                        name: `RedFlix [${serverName}]`,
                        title: `RedFlix - ${mediaInfo.title} S${s}E${e} (${serverName})`,
                        url: src.url,
                        quality: '1080p',
                        headers: {
                            'Referer': pageUrl,
                            'User-Agent': DEFAULT_HEADERS['User-Agent']
                        },
                        provider: 'redflix'
                    });
                }
            });
            if (streams.length > 0) return streams;
        }
    } catch (err) {
        console.warn(`[RedFlix] Episode API error: ${err.message}`);
    }

    // Fallback: Check if server buttons exist directly on page
    return await extractMovieStreams(pageUrl, mediaInfo);
}

/**
 * Main stream extraction pipeline
 */
export async function extractStreams(id, mediaType, season, episode, userConfig = {}) {
    const domainOverride = userConfig.baseUrl || userConfig.domain || BASE_URL;
    const baseUrl = domainOverride.startsWith('http') ? domainOverride.replace(/\/+$/, '') : `https://${domainOverride}`;

    const mediaInfo = await getMediaMetadata(id, mediaType, userConfig);
    if (!mediaInfo || !mediaInfo.title) {
        console.warn(`[RedFlix] Could not resolve metadata for ID: ${id}`);
        return [];
    }

    console.log(`[RedFlix] Scraping "${mediaInfo.title}" (${mediaInfo.year || 'N/A'}) - ${mediaType}`);

    const match = await searchRedFlix(baseUrl, mediaInfo.title, mediaInfo.year, mediaType);
    if (!match) {
        console.warn(`[RedFlix] No match found on RedFlix for "${mediaInfo.title}"`);
        return [];
    }

    console.log(`[RedFlix] Found page: ${match.href}`);

    if (mediaType === 'tv') {
        return await extractTVStreams(baseUrl, match.href, season, episode, mediaInfo);
    } else {
        return await extractMovieStreams(match.href, mediaInfo);
    }
}
