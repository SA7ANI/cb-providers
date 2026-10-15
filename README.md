# 🌶️ CB Providers

[![Providers](https://img.shields.io/badge/Active_Providers-29_Verified-emerald?style=for-the-badge&logo=fastapi)](manifest.json)
[![Changelog](https://img.shields.io/badge/Changelog-v2.5.0-purple?style=for-the-badge)](CHANGELOG.md)
[![Platform](https://img.shields.io/badge/Platform-Nuvio_App-blue?style=for-the-badge)](https://github.com/yoruix/nuvio-providers)
[![License](https://img.shields.io/badge/License-GNU_GPLv3-orange?style=for-the-badge)](LICENSE)

A curated, high-performance collection of streaming and scraper plugins built for the **Nuvio App**.

All 29 providers are **tested, live-verified**, and optimized for fast stream extraction across 4K UHD, 1080p, Multi-Audio (Hindi, English, Japanese, Tamil, Telugu), and Anime.

---

## ⚡ Quick Start: Add to Nuvio App

1. Open **Nuvio App** > **Settings** > **Plugins**
2. Paste the manifest repository URL:
   ```text
   https://raw.githubusercontent.com/SA7ANI/cb-providers/main/manifest.json
   ```
3. Tap **Add** / **Refresh** to load all 29 active modules.
4. Toggle your desired providers and prioritize as needed.

---

## 🚀 Active Provider Fleet (29 Verified Modules)

| # | Provider Name | ID | Supported Media | Content Languages | Description |
|---|---|---|---|---|---|
| 1 | **MoviesDrive** | `moviesdrive` | Movies, TV | `en`, `hi` | HubCloud & Google Drive high-speed stream extraction |
| 2 | **4KHDHub** | `4khdhub` | Movies, TV | `en`, `hi` | Direct 4K & 1080p high speed links |
| 3 | **HDHub4u** | `hdhub4u` | Movies, TV | `en`, `hi` | Fast direct links with download & streaming mirrors |
| 4 | **VegaMovies** | `vegamovies` | Movies, TV | `en`, `hi` | V-Cloud direct streaming & multi-quality options |
| 5 | **Castle** | `castle` | Movies, TV | `en`, `hi` | Direct fast streaming with multi-server failover |
| 6 | **RedFlix** | `redflix` | Movies, TV | `en`, `hi` | RedFlix catalog streaming |
| 7 | **Kurage** | `kurage` | Anime, TV | `en`, `ja` | Anime streaming with multi-server failover |
| 8 | **AniZone** | `anizone` | Anime, TV | `en`, `ja` | High-quality anime with multi-audio & soft subtitles |
| 9 | **DesiFlix** | `desiflix` | Movies, TV | `en`, `hi` | Indian movies, Bollywood & Hindi series |
| 10 | **Dahmermovies** | `dahmermovies` | Movies | `en` | High-speed direct movie streams |
| 11 | **Dahmermovies-TV** | `dahmermovies-tv` | TV | `en` | Fast TV series multi-episode streams |
| 12 | **Einthusan** | `einthustan` | Movies | `en`, `hi`, `ta`, `te`, `ml`, `kn` | Indian cinema catalog (Hindi, Tamil, Telugu, Malayalam) |
| 13 | **MovieBox** | `moviebox` | Movies, TV | `en` | Multi-server fast streaming |
| 14 | **MoviesMod** | `moviesmod` | Movies, TV | `en`, `hi` | High-speed multi-quality movies with GDrive/HubCloud |
| 15 | **Movix VF** | `movix-vf` | Movies, TV | `fr`, `en` | French audio/subbed streaming |
| 16 | **PlayIMDb** | `playimdb` | Movies, TV | `en` | Multi-hoster movie streaming engine |
| 17 | **TopCartoons** | `topcartoons` | TV | `en` | Animated series, cartoons & family entertainment |
| 18 | **🧲 Torrentio** | `torrentio` | Movies, TV | `en` | Multi-torrent streaming engine for global movies & series |
| 19 | **🪨 VidRock** | `vidrock` | Movies, TV | `en` | Embed video streamer |
| 20 | **Reanime** | `reanime` | Anime, Movies | `en`, `ja` | Anime & Asian content streaming |
| 21 | **AnimeWorld** | `animeworld` | Anime, TV, Movies | `hi`, `ta`, `te`, `en`, `ja` | Multi-Language Indian & Global Anime: Hindi, Tamil, Telugu, English, Japanese |
| 22 | **AnimeSalt** | `animesalt` | Anime, TV, Movies | `ja`, `en`, `hi` | High-speed anime streaming with Multi-Server failover (Abyss, VidMoly, Videasy) |
| 23 | **AniZen** | `anizen` | Anime, Movies, TV | `ja`, `en` | Pure AES decrypted MegaPlay/Vidstream anime streams |
| 24 | **CineFreak** | `cinefreak` | Movies, TV | `en`, `hi` | Typesense-powered Indian & Hollywood direct streams |
| 25 | **NetMirror** | `netmirror` | Movies, TV | `en`, `hi` | Multi-OTT direct HLS streaming across Netflix, Prime Video & Hotstar |
| 26 | **AniKage** | `anikage` | Anime, TV | `en`, `ja` | High-speed anime streaming with direct m3u8 streams |
| 27 | **MultiMovies** | `multimovies` | Movies, TV | `en`, `hi` | Direct multi-embed player (Filesforever, ModiPlay, ScreenScape Hindi dub, GD Mirror, Cineverse) |
| 28 | **ToonStream** | `toonstream` | Anime, Movies, TV | `en`, `hi`, `ja` | Direct anime & cartoon streamer with unpacked direct HLS (master.m3u8) & multi-servers |
| 29 | **PureToons** | `puretoons` | Anime, Movies, TV | `hi`, `en` | Dedicated Indian Hindi dubbed cartoons & anime library (Shinchan, Doraemon, etc.) |

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
