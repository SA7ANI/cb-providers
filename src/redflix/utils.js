/**
 * RedFlix Utilities
 */

import { TMDB_BASE_URL, TMDB_API_KEYS, DEFAULT_HEADERS } from './constants.js';

export function normalizeTitle(str) {
    if (!str) return '';
    return str
        .toLowerCase()
        .replace(/\b(the|a|an)\b/g, '')
        .replace(/[:\-_'"`]/g, ' ')
        .replace(/[^\w\s]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
}

export async function httpGet(url, options = {}) {
    const headers = { ...DEFAULT_HEADERS, ...options.headers };
    const res = await fetch(url, {
        headers,
        ...options
    });
    if (!res.ok) {
        throw new Error(`HTTP ${res.status} for ${url}`);
    }
    const rawText = await res.text();
    let jsonVal = null;
    try { jsonVal = JSON.parse(rawText); } catch (e) {}

    return {
        data: jsonVal || rawText,
        text: rawText,
        json: jsonVal
    };
}

/**
 * Resolve TMDB / Cinemeta metadata with rotated API keys, retries & fallbacks
 */
export async function getMediaMetadata(id, mediaType, userConfig = {}) {
    // 0. Check userConfig or object id for pre-resolved title
    if (userConfig && (userConfig.title || userConfig.name)) {
        return {
            title: userConfig.title || userConfig.name,
            year: userConfig.year ? parseInt(userConfig.year, 10) : null,
            imdbId: userConfig.imdbId || userConfig.imdb_id || null,
            tmdbId: userConfig.tmdbId || userConfig.id || null
        };
    }

    if (typeof id === 'object' && id !== null) {
        if (id.title || id.name) {
            return {
                title: id.title || id.name,
                year: id.year ? parseInt(id.year, 10) : null,
                imdbId: id.imdbId || id.imdb_id || null,
                tmdbId: id.tmdbId || id.id || null
            };
        }
    }

    const idStr = String(id || '').trim();
    const isImdb = idStr.startsWith('tt');
    const endpoint = mediaType === 'tv' ? 'tv' : 'movie';

    // 1. Try TMDB directly across rotated keys with retry
    for (const key of TMDB_API_KEYS) {
        try {
            let url;
            if (isImdb) {
                url = `${TMDB_BASE_URL}/find/${idStr}?api_key=${key}&external_source=imdb_id`;
            } else {
                const cleanTmdbId = idStr.replace(/^tmdb:/i, '');
                url = `${TMDB_BASE_URL}/${endpoint}/${cleanTmdbId}?api_key=${key}&append_to_response=external_ids`;
            }

            const response = await httpGet(url, {
                headers: { 'Accept': 'application/json' },
                timeout: 6000
            });

            const data = response.json || response.data;
            if (data) {
                if (isImdb) {
                    const results = mediaType === 'tv' ? data.tv_results : data.movie_results;
                    if (results && results.length > 0) {
                        const item = results[0];
                        const title = mediaType === 'tv' ? item.name : item.title;
                        const date = mediaType === 'tv' ? item.first_air_date : item.release_date;
                        const year = date ? parseInt(date.split('-')[0], 10) : null;
                        return { title, year, imdbId: idStr, tmdbId: item.id };
                    }
                } else {
                    const title = mediaType === 'tv' ? data.name : data.title;
                    const date = mediaType === 'tv' ? data.first_air_date : data.release_date;
                    const year = date ? parseInt(date.split('-')[0], 10) : null;
                    const imdbId = data.external_ids?.imdb_id || null;
                    return { title, year, imdbId, tmdbId: data.id };
                }
            }
        } catch (e) {
            // Try next key
        }
    }

    // 2. Cinemeta fallback for IMDb IDs
    if (isImdb) {
        try {
            const cinemetaType = mediaType === 'tv' ? 'series' : 'movie';
            const cinemetaUrl = `https://v3-cinemeta.strem.io/meta/${cinemetaType}/${idStr}.json`;
            const cRes = await httpGet(cinemetaUrl, { headers: { 'Accept': 'application/json' } });
            const cData = cRes.json || cRes.data;
            if (cData?.meta?.name) {
                const yearStr = String(cData.meta.year || '').split('–')[0];
                return {
                    title: cData.meta.name,
                    year: yearStr ? parseInt(yearStr, 10) : null,
                    imdbId: idStr,
                    tmdbId: null
                };
            }
        } catch (e) {
            // Ignore
        }
    }

    return null;
}
