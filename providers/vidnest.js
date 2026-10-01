// Vidnest Scraper for Nuvio Local Scrapers
// React Native compatible version - Promise-based approach only
// Extracts streaming links using TMDB ID for Vidnest servers with AES-GCM decryption

// TMDB API Configuration
const TMDB_API_KEY = '439c478a771f35c05022f9feabcca01c';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

// Vidnest Configuration
const VIDNEST_BASE_URL = 'https://first.vidnest.fun';
const VIDNEST_PROXY_URL = 'https://vidnest.animanga.fun/proxy';
const PASSPHRASE = 'A7kP9mQeXU2BWcD4fRZV+Sg8yN0/M5tLbC1HJQwYe6o=';
const SERVERS = ['hollymoviehd', 'primesrc', 'ophim', 'flixhq', 'vidlink', 'rogflix'];

// Working headers for Vidnest API (exact headers from browser)
const WORKING_HEADERS = {
    'accept': '*/*',
    'accept-encoding': 'gzip, deflate, br, zstd',
    'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
    'origin': 'https://vidnest.fun',
    'referer': 'https://vidnest.fun/',
    'sec-ch-ua': '"Google Chrome";v="143", "Chromium";v="143", "Not A(Brand";v="24"',
    'sec-ch-ua-mobile': '?1',
    'sec-ch-ua-platform': '"Android"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-site',
    'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Mobile Safari/537.36'
};

// Headers for stream playback (separate from API headers)
const PLAYBACK_HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36',
    'Accept': 'video/webm,video/ogg,video/*;q=0.9,application/ogg;q=0.7,audio/*;q=0.6,*/*;q=0.5',
    'Accept-Language': 'en-US,en;q=0.9',
    'Accept-Encoding': 'identity',
    'Connection': 'keep-alive',
    'Sec-Fetch-Dest': 'video',
    'Sec-Fetch-Mode': 'no-cors',
    'Sec-Fetch-Site': 'cross-site',
    'DNT': '1'
};

// React Native-safe Base64 utilities (no Buffer dependency)
const BASE64_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function base64ToBytes(base64) {
    if (!base64) return new Uint8Array(0);
    
    // Remove padding
    let input = String(base64).replace(/=+$/, '');
    let output = '';
    let bc = 0, bs, buffer, idx = 0;
    
    while ((buffer = input.charAt(idx++))) {
        buffer = BASE64_CHARS.indexOf(buffer);
        if (~buffer) {
            bs = bc % 4 ? bs * 64 + buffer : buffer;
            if (bc++ % 4) {
                output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6)));
            }
        }
    }
    
    // Convert string to bytes
    const bytes = new Uint8Array(output.length);
    for (let i = 0; i < output.length; i++) {
        bytes[i] = output.charCodeAt(i);
    }
    return bytes;
}

function bytesToBase64(bytes) {
    if (!bytes || bytes.length === 0) return '';
    
    let output = '';
    let i = 0;
    const len = bytes.length;
    
    while (i < len) {
        const a = bytes[i++];
        const b = i < len ? bytes[i++] : 0;
        const c = i < len ? bytes[i++] : 0;
        
        const bitmap = (a << 16) | (b << 8) | c;
        
        output += BASE64_CHARS.charAt((bitmap >> 18) & 63);
        output += BASE64_CHARS.charAt((bitmap >> 12) & 63);
        output += i - 2 < len ? BASE64_CHARS.charAt((bitmap >> 6) & 63) : '=';
        output += i - 1 < len ? BASE64_CHARS.charAt(bitmap & 63) : '=';
    }
    
    return output;
}

// Node.js compatible atob function
function atob(str) {
    return base64ToBytes(str).map(byte => String.fromCharCode(byte)).join('');
}

// AES-GCM Decryption using server (React Native compatible)
function decryptAesGcm(encryptedB64, passphraseB64) {
    console.log('[Vidnest] Starting AES-GCM decryption via server...');
    
    // Use local server for development, remote for production
    const decryptServerUrl = process.env.DECRYPT_SERVER_URL || 'https://aesdec.nuvioapp.space/decrypt';
    
    return fetch(decryptServerUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            encryptedData: encryptedB64,
            passphrase: passphraseB64
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) throw new Error(data.error);
        console.log('[Vidnest] Server decryption successful');
        return data.decrypted;
    })
    .catch(error => {
        console.error(`[Vidnest] Server decryption failed: ${error.message}`);
        throw error;
    });
}

// Validate stream URL accessibility
function validateStreamUrl(url, headers) {
    console.log(`[Vidnest] Validating stream URL: ${url.substring(0, 60)}...`);
    
    // Skip validation for HLS streams (.m3u8) - they're often protected and return 403
    // but work fine in video players
    if (url.includes('.m3u8') || url.includes('/streamsvr/') || url.includes('/stream2/')) {
        console.log(`[Vidnest] Skipping validation for HLS/protected stream`);
        return Promise.resolve(true);
    }
    
    return fetch(url, {
        method: 'HEAD',
        headers: headers,
        timeout: 5000
    })
    .then(response => {
        // Accept 200 OK, 206 Partial Content, 302 redirects, or 403 (protected but valid)
        const isValid = response.ok || response.status === 206 || response.status === 302 || response.status === 403;
        console.log(`[Vidnest] URL validation result: ${response.status} - ${isValid ? 'VALID' : 'INVALID'}`);
        return isValid;
    })
    .catch(error => {
        console.log(`[Vidnest] URL validation failed: ${error.message}`);
        // For protected streams, assume valid even if validation fails
        if (url.includes('.m3u8') || url.includes('/streamsvr/') || url.includes('/stream2/')) {
            return true;
        }
        return false;
    });
}

// Helper function to make HTTP requests
function makeRequest(url, options = {}) {
    const defaultHeaders = { ...WORKING_HEADERS };
    
    return fetch(url, {
        method: options.method || 'GET',
        headers: { ...defaultHeaders, ...options.headers },
        ...options
    }).then(function(response) {
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        return response;
    }).catch(function(error) {
        console.error(`[Vidnest] Request failed for ${url}: ${error.message}`);
        throw error;
    });
}

// Get movie/TV show details from TMDB
function getTMDBDetails(tmdbId, mediaType) {
    const endpoint = mediaType === 'tv' ? 'tv' : 'movie';
    const url = `${TMDB_BASE_URL}/${endpoint}/${tmdbId}?api_key=${TMDB_API_KEY}&append_to_response=external_ids`;
    
    return makeRequest(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            const title = mediaType === 'tv' ? data.name : data.title;
            const releaseDate = mediaType === 'tv' ? data.first_air_date : data.release_date;
            const year = releaseDate ? parseInt(releaseDate.split('-')[0]) : null;
            
            return {
                title: title,
                year: year,
                imdbId: data.external_ids?.imdb_id || null
            };
        });
}

// Extract quality from URL or response
function extractQuality(url) {
    if (!url) return 'Unknown';
    
    // Try to extract quality from URL patterns
    const qualityPatterns = [
        /(\d{3,4})p/i,  // 1080p, 720p, etc.
        /(\d{3,4})k/i,  // 1080k, 720k, etc.
        /quality[_-]?(\d{3,4})/i,  // quality-1080, quality_720, etc.
        /res[_-]?(\d{3,4})/i,  // res-1080, res_720, etc.
        /(\d{3,4})x\d{3,4}/i,  // 1920x1080, 1280x720, etc.
    ];

    for (const pattern of qualityPatterns) {
        const match = url.match(pattern);
        if (match) {
            const qualityNum = parseInt(match[1]);
            if (qualityNum >= 240 && qualityNum <= 4320) {
                return `${qualityNum}p`;
            }
        }
    }

    // Additional quality detection based on URL patterns
    if (url.includes('1080') || url.includes('1920')) return '1080p';
    if (url.includes('720') || url.includes('1280')) return '720p';
    if (url.includes('480') || url.includes('854')) return '480p';
    if (url.includes('360') || url.includes('640')) return '360p';
    if (url.includes('240') || url.includes('426')) return '240p';

    return 'Unknown';
}

// Wrap URLs through Vidnest proxy if needed (for flashstream.cc and other protected domains)
function wrapUrlWithProxy(url) {
    // Check if URL needs proxying (flashstream.cc returns 403 without proxy)
    // Also check for patterns that typically need proxy (streamsvr, /pl/, etc.)
    if (url.includes('flashstream.cc') || 
        url.includes('streamsvr/') || 
        url.includes('/pl/') ||
        url.includes('rogflix') ||
        (url.includes('lethe399key.com') && url.includes('/stream2/'))) {
        
        // Determine origin and referer based on URL domain
        let origin = 'https://flashstream.cc';
        let referer = 'https://flashstream.cc/';
        
        if (url.includes('lethe399key.com')) {
            origin = 'https://lethe399key.com';
            referer = 'https://lethe399key.com/';
        }
        
        const proxyHeaders = {
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0',
            'accept': '*/*',
            'accept-language': 'en-US,en;q=0.5',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'cross-site',
            'origin': origin,
            'referer': referer
        };
        
        const encodedUrl = encodeURIComponent(url);
        const encodedHeaders = encodeURIComponent(JSON.stringify(proxyHeaders));
        const proxiedUrl = `${VIDNEST_PROXY_URL}?url=${encodedUrl}&headers=${encodedHeaders}`;
        
        console.log(`[Vidnest] Wrapping URL through proxy: ${url.substring(0, 60)}...`);
        return proxiedUrl;
    }
    
    return url;
}

// Process Vidnest API response
function processVidnestResponse(data, serverName, mediaInfo, seasonNum, episodeNum) {
    const streams = [];
    
    try {
        console.log(`[Vidnest] Processing response from ${serverName}:`, JSON.stringify(data, null, 2));
        
        // Handle different response formats for different servers
        let sources = [];
        
        // Standard format: sources or streams array
        if (data.sources && Array.isArray(data.sources)) {
            sources = data.sources;
        } else if (data.streams && Array.isArray(data.streams)) {
            sources = data.streams;
        }
        // Flixhq format: url directly in response
        else if (data.url && typeof data.url === 'string') {
            sources = [{ url: data.url, type: 'hls', headers: data.headers, subtitles: data.subtitles }];
        }
        // Vidlink format: data field contains the URL
        else if (data.data && typeof data.data === 'string') {
            sources = [{ url: data.data, type: 'hls', headers: data.headers, provider: data.provider }];
        }
        // Check if response has success field
        else if (data.success && (data.sources || data.streams)) {
            sources = data.sources || data.streams || [];
        }
        
        if (!Array.isArray(sources) || sources.length === 0) {
            console.log(`[Vidnest] ${serverName}: No sources/streams found in response`);
            return streams;
        }
        
        // Process each source
        sources.forEach((source, index) => {
            if (!source) return;
            
            // Extract video URL from various possible fields
            let videoUrl = source.file || source.url || source.src || source.link;
            
            if (!videoUrl) {
                console.log(`[Vidnest] ${serverName}: Source ${index} has no video URL`);
                return;
            }
            
            // Wrap URL through Vidnest proxy if needed (for flashstream.cc)
            videoUrl = wrapUrlWithProxy(videoUrl);
            
            // Extract language information
            let languageInfo = '';
            if (source.language) {
                languageInfo = ` [${source.language}]`;
            }
            
            // Extract label/source information for better naming
            let labelInfo = '';
            if (source.label) {
                labelInfo = ` - ${source.label}`;
            } else if (source.source) {
                labelInfo = ` - ${source.source}`;
            }
            
            // Create media title
            let mediaTitle = mediaInfo.title || 'Unknown';
            if (mediaInfo.year) {
                mediaTitle += ` (${mediaInfo.year})`;
            }
            if (seasonNum && episodeNum) {
                mediaTitle = `${mediaInfo.title} S${String(seasonNum).padStart(2, '0')}E${String(episodeNum).padStart(2, '0')}`;
            }
            
            // Use "auto" quality for all streams
            const quality = 'auto';
            
            streams.push({
                name: `Vidnest ${serverName.charAt(0).toUpperCase() + serverName.slice(1)}${labelInfo}${languageInfo}`,
                title: mediaTitle,
                url: videoUrl,
                quality: quality,
                size: 'Unknown',
                provider: 'vidnest'
            });
            
            console.log(`[Vidnest] ${serverName}: Added ${quality}${languageInfo} stream: ${videoUrl.substring(0, 60)}...`);
        });
        
    } catch (error) {
        console.error(`[Vidnest] Error processing ${serverName} response: ${error.message}`);
    }
    
    return streams;
}

// Fetch streams from a single server
function fetchFromServer(serverName, mediaType, tmdbId, mediaInfo, seasonNum, episodeNum) {
    console.log(`[Vidnest] Fetching from ${serverName}...`);
    
    // Build API URL
    let apiUrl;
    if (mediaType === 'tv' && seasonNum && episodeNum) {
        apiUrl = `${VIDNEST_BASE_URL}/${serverName}/${mediaType}/${tmdbId}/${seasonNum}/${episodeNum}`;
    } else {
        apiUrl = `${VIDNEST_BASE_URL}/${serverName}/${mediaType}/${tmdbId}`;
    }
    
    // Handle special query parameters for specific servers
    // Flixhq supports ?server=upcloud parameter
    if (serverName === 'flixhq') {
        apiUrl += '?server=upcloud';
    }
    
    console.log(`[Vidnest] ${serverName} API URL: ${apiUrl}`);
    
    return makeRequest(apiUrl)
        .then(function(response) {
            return response.text();
        })
        .then(function(responseText) {
            console.log(`[Vidnest] ${serverName} response length: ${responseText.length} characters`);
            
            // Try to parse as JSON first
            try {
                const data = JSON.parse(responseText);
                
                // Check if response contains encrypted data
                if (data.encrypted && data.data) {
                    console.log(`[Vidnest] ${serverName}: Detected encrypted response, decrypting...`);
                    
                    return decryptAesGcm(data.data, PASSPHRASE)
                        .then(function(decryptedText) {
                            console.log(`[Vidnest] ${serverName}: Decryption successful`);
                            
                            try {
                                const decryptedData = JSON.parse(decryptedText);
                                return processVidnestResponse(decryptedData, serverName, mediaInfo, seasonNum, episodeNum);
                            } catch (parseError) {
                                console.error(`[Vidnest] ${serverName}: JSON parse error after decryption: ${parseError.message}`);
                                return [];
                            }
                        });
                } else {
                    // Process non-encrypted response
                    return processVidnestResponse(data, serverName, mediaInfo, seasonNum, episodeNum);
                }
            } catch (parseError) {
                console.error(`[Vidnest] ${serverName}: Invalid JSON response: ${parseError.message}`);
                return [];
            }
        })
        .catch(function(error) {
            console.error(`[Vidnest] ${serverName} error: ${error.message}`);
            return [];
        });
}

// Main function to extract streaming links for Nuvio
function getStreams(tmdbId, mediaType, seasonNum, episodeNum) {
    console.log(`[Vidnest] Starting extraction for TMDB ID: ${tmdbId}, Type: ${mediaType}${mediaType === 'tv' ? `, S:${seasonNum}E:${episodeNum}` : ''}`);
    
    return new Promise((resolve, reject) => {
        // First, fetch media details from TMDB
        getTMDBDetails(tmdbId, mediaType)
            .then(function(mediaInfo) {
                console.log(`[Vidnest] TMDB Info: "${mediaInfo.title}" (${mediaInfo.year || 'N/A'})`);
                
                // Process both servers in parallel
                const serverPromises = SERVERS.map(serverName => {
                    return fetchFromServer(serverName, mediaType, tmdbId, mediaInfo, seasonNum, episodeNum);
                });
                
                return Promise.all(serverPromises)
                    .then(function(results) {
                        // Combine all streams from all servers
                        const allStreams = [];
                        results.forEach(streams => {
                            allStreams.push(...streams);
                        });
                        
                        // Remove duplicate streams by URL
                        const uniqueStreams = [];
                        const seenUrls = new Set();
                        allStreams.forEach(stream => {
                            if (!seenUrls.has(stream.url)) {
                                seenUrls.add(stream.url);
                                uniqueStreams.push(stream);
                            }
                        });
                        
                        // Validate all streams in parallel
                        console.log(`[Vidnest] Validating ${uniqueStreams.length} streams...`);
                        const validationPromises = uniqueStreams.map(stream => 
                            validateStreamUrl(stream.url, PLAYBACK_HEADERS)
                                .then(isValid => ({ stream, isValid }))
                        );
                        
                        return Promise.all(validationPromises)
                            .then(function(results) {
                                const validStreams = results
                                    .filter(r => r.isValid)
                                    .map(r => r.stream);
                                
                                console.log(`[Vidnest] Filtered ${uniqueStreams.length - validStreams.length} broken links`);
                                
                                // Sort streams by quality (highest first)
                        const getQualityValue = (quality) => {
                            const q = quality.toLowerCase().replace(/p$/, ''); // Remove trailing 'p'
                            
                            // Handle specific quality names
                            if (q === '4k' || q === '2160') return 2160;
                            if (q === '1440') return 1440;
                            if (q === '1080') return 1080;
                            if (q === '720') return 720;
                            if (q === '480') return 480;
                            if (q === '360') return 360;
                            if (q === '240') return 240;
                            
                            // Handle unknown quality (put at end)
                            if (q === 'unknown') return 0;
                            
                            // Try to parse as number
                            const numQuality = parseInt(q);
                            if (!isNaN(numQuality) && numQuality > 0) {
                                return numQuality;
                            }
                            
                            // Default for unrecognized qualities
                            return 1;
                        };
                        
                                validStreams.sort((a, b) => {
                                    const qualityA = getQualityValue(a.quality);
                                    const qualityB = getQualityValue(b.quality);
                                    return qualityB - qualityA;
                                });
                                
                                console.log(`[Vidnest] Total valid streams found: ${validStreams.length}`);
                                resolve(validStreams);
                            });
                    });
            })
            .catch(function(error) {
                console.error(`[Vidnest] Error fetching media details: ${error.message}`);
                resolve([]); // Return empty array on error for Nuvio compatibility
            });
    });
}

// Export for React Native compatibility
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { getStreams };
} else {
    global.getStreams = getStreams;
}
