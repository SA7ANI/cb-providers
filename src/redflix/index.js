/**
 * RedFlix Provider
 * Main entry point for Nuvio & Chole Bhature Ecosystem.
 */

import { extractStreams } from './extractor.js';

/**
 * Main getStreams function called by Nuvio / Stremio
 * @param {string|number|object} tmdbId - TMDB ID or IMDb ID or metadata object
 * @param {string} mediaType - 'movie' or 'tv'
 * @param {number} season - Season number (for TV)
 * @param {number} episode - Episode number (for TV)
 * @param {object} userConfig - User configuration options
 * @returns {Promise<Array>} List of stream objects
 */
async function getStreams(tmdbId, mediaType, season, episode, userConfig = {}) {
    try {
        console.log(`[RedFlix] Request: ${mediaType} ${tmdbId} S:${season || '-'} E:${episode || '-'}`);
        const streams = await extractStreams(tmdbId, mediaType, season, episode, userConfig);
        console.log(`[RedFlix] Found ${streams.length} streams`);
        return streams;
    } catch (error) {
        console.error(`[RedFlix] Error: ${error.message}`);
        return [];
    }
}

module.exports = { getStreams };
