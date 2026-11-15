# 🌶️ CB Providers

[![Providers](https://img.shields.io/badge/Active_Providers-24_Playable-emerald?style=for-the-badge&logo=fastapi)](manifest.json)
[![Changelog](https://img.shields.io/badge/Changelog-v2.6.0-purple?style=for-the-badge)](CHANGELOG.md)
[![Platform](https://img.shields.io/badge/Platform-Nuvio_App-blue?style=for-the-badge)](https://github.com/yoruix/nuvio-providers)
[![License](https://img.shields.io/badge/License-GNU_GPLv3-orange?style=for-the-badge)](LICENSE)

A curated, high-performance collection of streaming and scraper plugins built for the **Nuvio App**.

All active providers are **100% verified for genuine, directly playable video streams** (`.m3u8`, `.mp4`, `.mkv`, Google CDN, or P2P torrent magnets). Zero fake HTML embed links, zero Cloudflare worker 403 blocks, and full ExoPlayer playback header support.

---

## ⚡ Quick Start: Add to Nuvio App

1. Open **Nuvio App** > **Settings** > **Plugins**
2. Paste the manifest repository URL:
   ```text
   https://raw.githubusercontent.com/SA7ANI/cb-providers/main/manifest.json
   ```
3. Tap **Add** / **Refresh** to load the updated fleet.
4. Toggle your desired providers and prioritize as needed.

---

## 🚀 Active Provider Fleet (v2.6.0 Verified)

| # | Provider Name | ID | Status | Supported Media | Content Languages | Description |
|---|---|---|---|---|---|---|
| 1 | **HDHub4u** | `hdhub4u` | ✅ Active | Movies, TV | `en`, `hi` | High-speed direct Matroska (`.mkv`) streams with download mirrors |
| 2 | **VegaMovies** | `vegamovies` | ✅ Active | Movies, TV | `en`, `hi` | Google CDN direct streaming (`video/mkv`) with multi-quality options |
| 3 | **Castle** | `castle` | ✅ Active | Movies, TV | `en`, `hi` | Direct fast HLS streaming with ExoPlayer proxy header authorization |
| 4 | **MovieBox** | `moviebox` | ✅ Active | Movies, TV | `en` | Direct `.mp4` video streaming with proxy header injection |
| 5 | **MoviesMod** | `moviesmod` | ✅ Active | Movies, TV | `en`, `hi` | Direct Google CDN (`video/mkv`) with worker quota pre-validation |
| 6 | **4KHDHub** | `4khdhub` | ✅ Active | Movies, TV | `en`, `hi` | Direct 4K & 1080p stream extraction with live 403 quota pre-check |
| 7 | **DesiFlix** | `desiflix` | ✅ Active | Movies, TV | `en`, `hi` | Indian cinema, Bollywood, and Hindi series (`video/x-matroska`) |
| 8 | **Dahmermovies** | `dahmermovies` | ✅ Active | Movies | `en` | Fast direct movie streams (`application/octet-stream`) |
| 9 | **Dahmermovies-TV** | `dahmermovies-tv` | ✅ Active | TV | `en` | Multi-episode TV series streaming |
| 10 | **VidRock** | `vidrock` | ✅ Active | Movies, TV | `en` | AES-GCM decrypted multi-server direct HLS streams |
| 11 | **Reanime** | `reanime` | ✅ Active | Anime, Movies | `en`, `ja` | High-speed Asian & Anime streaming (`video/x-matroska`) |
| 12 | **AnimeSalt** | `animesalt` | ✅ Active | Anime, TV, Movies | `ja`, `en`, `hi` | High-speed anime streaming with multi-server failover (`video/mp4`) |
| 13 | **AniZen** | `anizen` | ✅ Active | Anime, Movies, TV | `ja`, `en` | Client-side AES decrypted MegaPlay & Vidstream streams (`.m3u8`) |
| 14 | **NetMirror** | `netmirror` | ✅ Active | Movies, TV | `en`, `hi` | Multi-OTT direct HLS streaming across Netflix, Prime Video & Hotstar |
| 15 | **AniKage** | `anikage` | ✅ Active | Anime, TV | `en`, `ja` | High-speed anime streaming with verified direct master playlists |
| 16 | **AniZone** | `anizone` | ✅ Active | Anime, TV | `en`, `ja` | High-quality anime with multi-audio & soft subtitles (`.m3u8`) |
| 17 | **Movix VF** | `movix-vf` | ✅ Active | Movies, TV | `fr`, `en` | French audio & subbed streaming (`application/vnd.apple.mpegurl`) |
| 18 | **🧲 Torrentio** | `torrentio` | ✅ Active | Movies, TV | `en` | Multi-torrent P2P streaming engine for global movies & series |
| 19 | **ToonStream** | `toonstream` | ✅ Active | Anime, Movies, TV | `en`, `hi`, `ja` | Direct Ruby Stream unpacked master HLS; dummy iframe embeds purged |
| 20 | **PureToons** | `puretoons` | ✅ Active | Anime, Movies, TV | `hi`, `en` | Hindi dubbed nostalgia animation library; embed pages sanitized |
| 21 | **AnimeWorld** | `animeworld` | ✅ Active | Anime, TV, Movies | `hi`, `ta`, `te`, `en`, `ja` | Multi-language Indian & global anime; 404 player fallbacks purged |
| 22 | **Kurage** | `kurage` | ✅ Active | Anime, TV | `en`, `ja` | Anime streaming with tRPC API and multi-server proxy support |
| 23 | **TopCartoons** | `topcartoons` | ✅ Active | TV | `en` | Animated series, cartoons & family entertainment |
| 24 | **Einthusan** | `einthustan` | ✅ Active | Movies | `en`, `hi`, `ta`, `te`, `ml`, `kn` | Indian cinema catalog (Hindi, Tamil, Telugu, Malayalam) |
| 25 | **MoviesDrive** | `moviesdrive` | ⏸️ Standby | Movies, TV | `en`, `hi` | Temporarily disabled pending active search mirror updates |
| 26 | **RedFlix** | `redflix` | ⏸️ Standby | Movies, TV | `en`, `hi` | Disabled to prevent unplayable HTML player iframes |
| 27 | **MultiMovies** | `multimovies` | ⏸️ Standby | Movies, TV | `en`, `hi` | Disabled to eliminate external ad-walled embed pages |
| 28 | **PlayIMDb** | `playimdb` | ⏸️ Standby | Movies, TV | `en` | Disabled (upstream API no longer serves stream links) |

---

## 🛠️ Project Structure

```text
cb-providers/
├── providers/                 # Production-ready, standalone provider bundles
│   ├── moviesdrive.js
│   ├── 4khdhub.js
│   ├── torrentio.js
│   └── ... (26 modules)
├── src/                       # Multi-file source development (optional)
├── manifest.json              # Provider plugin registry (Nuvio standard)
├── build.js                   # Hermes/esbuild bundler & transpiler
└── package.json
```

---

## 💻 Provider Development

### Single-File Provider (Standard)

Create a JavaScript file in `providers/<provider-id>.js`. Providers expose a `getStreams` method:

```javascript
// providers/myprovider.js

async function getStreams(tmdbId, mediaType, season, episode, userConfig = {}) {
  try {
    const res = await fetch(`https://api.example.com/streams/${tmdbId}`);
    const data = await res.json();
    return data.streams.map(s => ({
      name: "MyProvider",
      title: s.title,
      url: s.url,
      quality: s.quality || "1080p",
      headers: {
        "User-Agent": "Mozilla/5.0..."
      }
    }));
  } catch (err) {
    console.error('[MyProvider] Error:', err.message);
    return [];
  }
}

module.exports = { getStreams };
```

Register the scraper in `manifest.json`:
```json
{
  "id": "myprovider",
  "name": "My Provider",
  "description": "Short description",
  "version": "1.0.0",
  "author": "Your Name",
  "supportedTypes": ["movie", "tv"],
  "filename": "providers/myprovider.js",
  "enabled": true,
  "formats": ["mp4", "m3u8"],
  "logo": "https://example.com/logo.png",
  "contentLanguage": ["en"]
}
```

---

## 🙏 Credits & Acknowledgements

This repository is built upon, inspired by, and grateful to the open-source community around Nuvio:

- **[Yoruix / Nuvio Team](https://github.com/yoruix/nuvio-providers)**: For creating the foundational Nuvio provider plugin architecture, Hermes engine runtime specifications, and original provider implementations.
- **[D3adlyRocket / All-in-One-Nuvio](https://github.com/D3adlyRocket/All-in-One-Nuvio)**: For scraper logic, community modules, and resolver contributions.
- **[Eclipsia](https://codeberg.org/eclipsia/nuvio-plugin)**: For open-source plugin extensions and extractor patterns.
- **Community Authors & Maintainers**: Special thanks to all community contributors including Kabir, piratezoro9, ChillPill, A2R14N, and all third-party extractor creators.
- **[SA7ANI](https://github.com/SA7ANI)**: For maintaining, live testing, and curating this collection.

---

## ⚖️ License & Disclaimer

- **License**: Licensed under the **GNU General Public License v3.0**.
- **Disclaimer**: This repository does not host any video files or media content. All providers scrape publicly accessible third-party search engines and APIs. Users are solely responsible for ensuring compliance with applicable copyright and local laws.
