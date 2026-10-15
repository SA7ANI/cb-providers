# 📜 Changelog — CB Providers (Chole Bhature)

All notable changes to the **CB Providers** project from the moment it branched from the upstream `yoruix/nuvio-providers` template will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2.5.0] - 2026-10-15

### 🚀 Major Provider Audit & Auto-Healing

This milestone represents a comprehensive audit of all scrapers, resolving ISP-level connection resets, modernizing streaming backends, and optimizing scraper latencies.

#### 🔧 Fixed
* **Dahmermovies & Dahmermovies-TV (`providers/dahmermovies.js`, `providers/dahmermovies-4k.js`)**:
  * Root-caused the issue where `dahmermovies-tv` failed to fetch results on TV and timed out after 30+ seconds.
  * Encoded rotated TMDB API keys (`::tmdb=...`) and stream limits (`::limit=3`) directly into the `st.111477.xyz` configuration tags (`CONFIG_TAGS`).
  * Backend now resolves series and episode names directly from TMDB instead of crawling a 4.2 MB directory, dropping response times from **30s+ down to 1.8s**.
* **Global TMDB `ECONNRESET` Resolution**:
  * Replaced `api.themoviedb.org` with the resilient `api.tmdb.org` across multiple scrapers (`dahmermovies`, `dahmermovies-4k`, `topcartoons`, `anizen`, `anikage`, `animesalt`, `netmirror`).
  * Prevents connection resets and handshake drops on restrictive ISP networks and regional firewalls.
* **HDHub4u (`providers/hdhub4u.js`)**:
  * Migrated search backend to `search.pingora.fyi` with Typesense JSON query parsing.
  * Updated primary landing domain to `new7.hdhub4u.cl`.
* **MoviesMod (`providers/moviesmod.js`)**:
  * Updated to active working domain `moviesmod.ai.in`.
* **Movix VF (`providers/movix-vf.js`)**:
  * Migrated API endpoint from dead legacy host to `https://api.movix.cash`.
* **Purstream (`providers/purstream.js`)**:
  * Updated stream resolution route to `/api/v1/stream/...`.
* **CineFreak (`providers/cinefreak.js`)**:
  * Updated domain to `new1.cinefreak.link` and search endpoint to `/search-api.php`.
* **VegaMovies (`providers/vegamovies.js`)**:
  * Resolved title fuzzy-matching bug that was matching partial titles incorrectly.
  * Filtered out unplayable non-streamable landing pages.

#### ⚡ Performance & Latency Optimizations
* **AniKage (`providers/anikage.js`)**:
  * Reduced server probe loop from 5 sequential mirrors down to the top 2 fastest servers, slashing scraper execution time from **20s to 3.5s**.
* **VegaMovies (`providers/vegamovies.js`)**:
  * Optimized V-Cloud resolving flow to return direct streams in **~2 seconds**.

#### 🗑️ Decommissioned & Removed
* **MovieBlast (`movieblast`)**: Removed due to permanently dead API servers and DNS-expired CDN (`linkmove.mbaccess.site`).
* **VidNest (`vidnest`)**: Removed due to Next.js dynamic client-side nonces protected by Cloudflare.
* **AnimeDekho (`animedekho`)**: Removed due to Cloudflare Turnstile verification requirement on `/wp-json/dgt/v1/watch`.
* **ZinkMovies (`zinkmovies`)**: Removed due to Cloudflare 403 blocks on `new4.zinkmovies.foo`.
* **UHDMovies (`uhdmovies`)**: Removed due to download links gated behind `thenaukriadda.in` multi-hop anti-bot shorteners.

---

## [2.4.0] - 2026-10-10

### 🌟 Animation, Regional & Multi-Audio Expansion

#### ➕ Added
* **AnimeWorld (`providers/animeworld.js`)**:
  * Dedicated multi-language anime streaming engine with Hindi, Tamil, Telugu, English, and Japanese dub tracks.
  * Direct stream extraction via Zephyrix Player on `watchanimeworld.one`.
* **AnimeSalt (`providers/animesalt.js`)**:
  * Fast anime streaming with multi-server failover (Abyss, VidMoly, Videasy).
* **AniZen (`providers/anizen.js`)**:
  * Pure client-side AES-decrypted stream extraction for MegaPlay and Vidstream.
* **AniKage (`providers/anikage.js`)**:
  * Fast anime scraper supporting direct `.m3u8` master playlists.
* **NetMirror (`providers/netmirror.js`)**:
  * Multi-OTT direct HLS extractor covering content from Netflix, Prime Video, and Hotstar.
* **MultiMovies (`providers/multimovies.js`)**:
  * Added multi-embed support across Filesforever, ModiPlay, ScreenScape Hindi dub, GD Mirror, and Cineverse.
* **ToonStream (`providers/toonstream.js`)**:
  * Direct cartoon and anime streamer unpacking clean HLS (`master.m3u8`) playlists.
* **PureToons (`providers/puretoons.js`)**:
  * Dedicated library for Hindi dubbed nostalgia animation (Shin-chan, Doraemon, Pokémon).

#### 🎨 Card Metadata Standard
* Standardized `formatCholeCard()` across all new modules to display:
  * 🎞️ Standardized release filenames.
  * 🏷️ Codec badges (`x264`, `x265`, `HEVC`, `AV1`).
  * 💎 Audio specification badges (`Dolby Atmos`, `DD+ 5.1`, `AAC 2.0`).
  * 🌐 Language badges (Hindi Dub, Multi-Audio, Dual-Audio, Eng Sub).
  * 📦 Verified file sizes.

---

## [2.2.0] - 2026-10-06

### 🛡️ Player Stability & Stream Referer Fixes

#### 🔧 Fixed
* **Anime Referer Headers (`providers/animeworld.js`, `providers/animesalt.js`)**:
  * Added mandatory `PlayHydrax` and CDN referer headers to resolve player buffering and HTTP 403 Forbidden errors on mobile video decoders.
* **False Positive Title Prevention**:
  * Implemented strict year and title boundary verification in anime scrapers to prevent anime modules from serving unrelated streams on Hollywood titles.
* **RedFlix Stream Formats**:
  * Eliminated broken iframe redirects and standardized output to clean MP4 and M3U8 streams.
* **VegaMovies V-Cloud Direct**:
  * Replaced intermediary landing links with direct resolved CDN URLs.

---

## [2.0.0] - 2026-10-04

### ⚡ Hermes Engine (React Native) Transpilation & CI/CD

#### 🚀 Major Architectural Milestones
* **React Native / Hermes Compatibility**:
  * Transpiled all provider bundles from modern ES2020 down to **ES2016 generator syntax** (`__async`, `__generator`).
  * Fixed fatal Hermes JavaScript engine syntax errors and crashes on Android TV and mobile builds.
* **Native HTTP Execution**:
  * Removed external `axios` and `node-cheerio` dependencies that caused runtime import crashes inside React Native.
  * Replaced with lightweight, native `fetch` and custom HTML parsing helpers.
* **Automated CI/CD Pipeline (`.github/workflows/transpile-and-validate.yml`)**:
  * Added automated GitHub Actions workflow to validate, transpile, lint, and test provider bundles on every push.
* **Dual Manifest Format**:
  * Added `scrapers` array alongside `providers` in `manifest.json` ensuring full backward and forward compatibility with all Nuvio app releases.

---

## [1.5.0] - 2026-10-02

### 🌶️ Chole Bhature Card Metadata System

#### ➕ Added
* Introduced the **Chole Bhature Card Formatting Engine**:
  * Transforms raw scraper results into rich, readable, uniform stream cards with clean metadata.
  * Badges for resolution (`4K UHD`, `1080p FHD`, `720p HD`), source (`BluRay`, `WEB-DL`, `HDRip`), and server tags (`HubCloud`, `GDrive`, `Fast-CDN`).
* Added **DesiFlix (`providers/desiflix.js`)** for Indian cinema and Hindi web series.
* Added **AniZone (`providers/anizone.js`)** for soft-subbed Japanese anime.
* Added **VidRock (`providers/vidrock.js`)** for embed video streams.

#### 🔧 Fixed
* Updated **MoviesDrive (`providers/moviesdrive.js`)** and **VegaMovies (`providers/vegamovies.js`)** domain configurations and HubCloud un-shorteners.
* Fixed TMDB API key rotation across scrapers to avoid 429 rate limit errors.

---

## [1.0.0] - 2026-09-28

### 🔱 The Fork (Branched from `yoruix/nuvio-providers`)

* **Repository Initialization**:
  * Forked from upstream `yoruix/nuvio-providers` (`cb4bf14`).
  * Renamed and branded as **CB Providers (Chole Bhature)**.
  * Removed deprecated sample providers (`showbox`, `mapple`, `vidlink`, `cinevibe`).
* **Initial Core Provider Fleet**:
  * **MoviesDrive**: High-speed GDrive & HubCloud links for Hollywood and Bollywood.
  * **4KHDHub**: Direct high-speed 4K & 1080p streams.
  * **HDHub4u**: Direct links with fast mirrors.
  * **VegaMovies**: Direct V-Cloud and multi-quality options.
  * **Castle**: Fast streaming with multi-server failover.
  * **RedFlix**: Direct catalog streaming.
  * **Kurage**: Multi-server anime streams.
  * **Einthusan**: Comprehensive South Indian cinema (Tamil, Telugu, Malayalam, Kannada, Hindi).
  * **MovieBox**: Global movies and series catalog.
  * **TopCartoons**: Family and animated entertainment.
  * **Torrentio**: Global multi-torrent scraper.
  * **Reanime**: Asian drama and anime collection.
