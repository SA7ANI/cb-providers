/**
 * RedFlix HTTP Utilities
 */

import { DEFAULT_HEADERS } from './constants.js';

export async function fetchText(url, options = {}) {
    const res = await fetch(url, {
        headers: {
            ...DEFAULT_HEADERS,
            ...options.headers
        },
        ...options
    });

    if (!res.ok) {
        throw new Error(`HTTP ${res.status} for ${url}`);
    }

    return await res.text();
}

export async function fetchJson(url, options = {}) {
    const res = await fetch(url, {
        headers: {
            ...DEFAULT_HEADERS,
            ...options.headers
        },
        ...options
    });

    if (!res.ok) {
        throw new Error(`HTTP ${res.status} for ${url}`);
    }

    return await res.json();
}
