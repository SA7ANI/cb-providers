#!/usr/bin/env node

/**
 * Nuvio CB Providers - Built-in Health Check & Test Suite
 * 
 * Tests providers locally against realistic media queries (Movie, Series, Anime, Cartoon).
 * 
 * Usage:
 *   npm test                        # Runs benchmark suite on all providers
 *   npm test -- vegamovies          # Tests only vegamovies
 *   node test-fleet.js              # Runs benchmark suite on all providers
 *   node test-fleet.js 4khdhub      # Tests only 4khdhub
 *   node test-fleet.js --all        # Runs exhaustive test on all providers in manifest
 *   node test-fleet.js <name> <type> <id> [season] [episode]  # Custom media probe
 */

const fs = require('fs');
const path = require('path');

// Ensure polyfills for any missing globals in Node test environment
if (typeof globalThis.atob === 'undefined') {
  globalThis.atob = (str) => Buffer.from(str, 'base64').toString('binary');
}
if (typeof globalThis.btoa === 'undefined') {
  globalThis.btoa = (str) => Buffer.from(str, 'binary').toString('base64');
}
if (typeof AbortSignal !== 'undefined' && !AbortSignal.timeout) {
  AbortSignal.timeout = (ms) => {
    const controller = new AbortController();
    setTimeout(() => {
      try { controller.abort(); } catch (_) {}
    }, ms);
    return controller.signal;
  };
}

// Intercept 'cheerio-without-node-native' to standard 'cheerio' if running in Node
const Module = require('module');
const originalRequire = Module.prototype.require;
Module.prototype.require = function (id) {
  if (id === 'cheerio-without-node-native') {
    try {
      return originalRequire.call(this, 'cheerio-without-node-native');
    } catch (_) {
      return originalRequire.call(this, 'cheerio');
    }
  }
  return originalRequire.call(this, id);
};

// Benchmark metadata for deterministic, fast queries without TMDB rate limits
const BENCHMARK_CATALOG = {
  movie_general: { id: '872585', type: 'movie', title: 'Oppenheimer', year: '2023', imdbId: 'tt15398776' },
  movie_indian: { id: '872906', type: 'movie', title: 'Jawan', year: '2023', imdbId: 'tt15354916' },
  movie_classic: { id: '550', type: 'movie', title: 'Fight Club', year: '1999', imdbId: 'tt0137523' },
  tv_general: { id: '1396', type: 'tv', title: 'Breaking Bad', season: 1, episode: 1, year: '2008', imdbId: 'tt0903747' },
  tv_series: { id: '66732', type: 'tv', title: 'Stranger Things', season: 1, episode: 1, year: '2016', imdbId: 'tt4574334' },
  anime_shonen: { id: '1429', type: 'tv', title: 'Attack on Titan', season: 1, episode: 1, year: '2013', imdbId: 'tt2560140' },
  anime_popular: { id: '85937', type: 'tv', title: 'Demon Slayer: Kimetsu no Yaiba', season: 1, episode: 1, year: '2019', imdbId: 'tt9335498' },
  cartoon_movie: { id: '1338692', type: 'movie', title: "Doraemon: Nobita's New Dinosaur", year: '2020', imdbId: 'tt12456770' },
  cartoon_tv: { id: '217288', type: 'tv', title: 'Tom and Jerry', season: 1, episode: 1, year: '1940', imdbId: 'tt1637777' }
};

// Map provider categories to best benchmark target
function getBenchmarkForProvider(providerId, providerName) {
  const p = (providerId + ' ' + providerName).toLowerCase();
  if (/ani|kurage|reanime/i.test(p)) {
    return BENCHMARK_CATALOG.anime_shonen;
  }
  if (/cartoon|puretoon|toon/i.test(p)) {
    return /topcartoon/i.test(p) ? BENCHMARK_CATALOG.cartoon_tv : BENCHMARK_CATALOG.cartoon_movie;
  }
  if (/-tv\b|series/i.test(providerId) || /-tv\b|series/i.test(providerName)) {
    return BENCHMARK_CATALOG.tv_general;
  }
  if (/einthus|desiflix/i.test(p)) {
    return BENCHMARK_CATALOG.movie_indian;
  }
  if (/hdhub4u|vegamovies|moviesdrive|moviesmod|4khdhub/i.test(p)) {
    return BENCHMARK_CATALOG.movie_general;
  }
  return BENCHMARK_CATALOG.movie_general;
}

// Load manifest
const manifestPath = path.join(__dirname, 'manifest.json');
if (!fs.existsSync(manifestPath)) {
  console.error('❌ manifest.json not found at:', manifestPath);
  process.exit(1);
}
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const allProviders = manifest.providers || [];

// Parse CLI arguments
const rawArgs = process.argv.slice(2).filter(a => a !== '--');
let filterTarget = null;
let customType = null;
let customId = null;
let customSeason = 1;
let customEpisode = 1;
let runAll = false;

if (rawArgs.includes('--all')) {
  runAll = true;
} else if (rawArgs.length >= 3) {
  filterTarget = rawArgs[0];
  customType = rawArgs[1];
  customId = rawArgs[2];
  if (rawArgs[3]) customSeason = parseInt(rawArgs[3], 10) || 1;
  if (rawArgs[4]) customEpisode = parseInt(rawArgs[4], 10) || 1;
} else if (rawArgs.length >= 1 && !rawArgs[0].startsWith('-')) {
  filterTarget = rawArgs[0];
}

// Select providers to test
let targets = allProviders;
if (filterTarget) {
  const cleanFilter = filterTarget.toLowerCase().replace(/[^a-z0-9]/g, '');
  targets = allProviders.filter(p => {
    const pId = (p.id || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    const pName = (p.name || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    return pId === cleanFilter || pName === cleanFilter || pId.includes(cleanFilter) || pName.includes(cleanFilter);
  });

  if (targets.length === 0) {
    console.error(`❌ Provider "${filterTarget}" not found in manifest.json`);
    console.log(`Available providers (${allProviders.length}):\n  ` + allProviders.map(p => p.id).join(', '));
    process.exit(1);
  }
}

// Header
console.log('\n===============================================================');
console.log('         🚀 NUVIO CB-PROVIDERS HEALTH CHECK SUITE               ');
console.log('===============================================================');
console.log(`📋 Total in Manifest: ${allProviders.length} providers`);
console.log(`🎯 Probing Targets:   ${targets.length} provider(s)\n`);

async function testSingleProvider(providerMeta) {
  const filePath = path.resolve(__dirname, providerMeta.filename || `providers/${providerMeta.id}.js`);
  if (!fs.existsSync(filePath)) {
    return {
      id: providerMeta.id,
      name: providerMeta.name,
      status: 'MISSING_FILE',
      streams: [],
      latency: 0,
      error: `File not found: ${filePath}`
    };
  }

  // Determine media probe query
  let media = getBenchmarkForProvider(providerMeta.id, providerMeta.name);
  if (customType && customId) {
    media = {
      type: customType,
      id: customId,
      season: customSeason,
      episode: customEpisode,
      title: `Custom (${customType} ${customId})`
    };
  }

  const startTime = Date.now();
  let streams = [];
  let errorMsg = null;

  try {
    // Clear module cache to test fresh load
    delete require.cache[require.resolve(filePath)];
    const providerModule = require(filePath);
    const getStreamsFn = providerModule.getStreams || globalThis.getStreams || (global.getStreams);

    if (typeof getStreamsFn !== 'function') {
      throw new Error('Exported getStreams is not a function');
    }

    // Call getStreams with timeout safety
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Scraper timed out (30s limit)')), 30000)
    );

    const callPromise = getStreamsFn(
      media.id,
      media.type,
      media.season || (media.type === 'tv' ? 1 : null),
      media.episode || (media.type === 'tv' ? 1 : null)
    );

    streams = (await Promise.race([callPromise, timeoutPromise])) || [];
  } catch (err) {
    errorMsg = err.message || String(err);
  }

  const latency = Date.now() - startTime;
  const validStreams = Array.isArray(streams) ? streams : [];

  let status = 'PASS';
  if (errorMsg) {
    status = 'ERROR';
  } else if (validStreams.length === 0) {
    status = 'ZERO_STREAMS';
  }

  return {
    id: providerMeta.id,
    name: providerMeta.name,
    mediaTitle: media.title,
    mediaType: media.type,
    status,
    streams: validStreams,
    latency,
    error: errorMsg
  };
}

async function runSuite() {
  const results = [];
  let index = 0;

  for (const provider of targets) {
    index++;
    const progress = `[${String(index).padStart(2, '0')}/${String(targets.length).padStart(2, '0')}]`;
    process.stdout.write(`${progress} Testing ${provider.name.padEnd(20, ' ')} ... `);

    const res = await testSingleProvider(provider);
    results.push(res);

    if (res.status === 'PASS') {
      console.log(`✅ PASS (${res.streams.length} streams, ${res.latency}ms)`);
      if (res.streams.length > 0) {
        const s = res.streams[0];
        const sTitle = s.title || s.name || s.server || 'Direct';
        const sUrl = (s.url || '').slice(0, 65) + (s.url && s.url.length > 65 ? '...' : '');
        console.log(`     ↳ Sample: [${s.quality || 'HD'}] ${sTitle} -> ${sUrl}`);
      }
    } else if (res.status === 'ZERO_STREAMS') {
      console.log(`⚠️  0 STREAMS (${res.latency}ms) - query: ${res.mediaTitle} (${res.mediaType})`);
    } else {
      console.log(`❌ ERROR (${res.latency}ms): ${res.error}`);
    }
  }

  // Summary Report
  const passed = results.filter(r => r.status === 'PASS').length;
  const zero = results.filter(r => r.status === 'ZERO_STREAMS').length;
  const failed = results.filter(r => r.status === 'ERROR').length;
  const avgLatency = Math.round(results.reduce((acc, r) => acc + r.latency, 0) / (results.length || 1));

  console.log('\n===============================================================');
  console.log('                       FLEET SUMMARY                           ');
  console.log('===============================================================');
  console.log(`  Total Probed:   ${results.length}`);
  console.log(`  ✅ Passed:      ${passed}`);
  console.log(`  ⚠️  Zero Streams: ${zero}`);
  console.log(`  ❌ Errors:      ${failed}`);
  console.log(`  ⏱️  Avg Latency:  ${avgLatency}ms`);
  console.log('===============================================================\n');

  if (failed > 0) {
    console.error(`⚠️  ${failed} provider(s) experienced syntax or execution errors.`);
    process.exit(1);
  } else {
    console.log('✨ All probed providers executed safely without syntax or runtime crashes!');
    process.exit(0);
  }
}

runSuite().catch(err => {
  console.error('Fatal error running test suite:', err);
  process.exit(1);
});
