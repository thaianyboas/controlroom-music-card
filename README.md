# 🎵 ControlRoom Music Card

A customizable music dashboard card for Home Assistant, based on the original [SpotifyPlus Card](https://github.com/thlucas1/spotifyplus_card) developed by Todd Lucas (@thlucas1).

ControlRoom Music Card builds upon SpotifyPlus Card with additional interface customizations and multilingual support.

## ✨ Features

- Spotify media player with customizable controls.
- Search for tracks, albums, artists, playlists, podcasts, audiobooks, and other Spotify content.
- Browse favorite albums, artists, tracks, and playlists.
- Manage Spotify Connect playback devices.
- Customizable player appearance and layout.
- Visual configuration editor.
- Multilingual interface support, including English, German, and Portuguese.
- Integration with the [SpotifyPlus custom integration](https://github.com/thlucas1/homeassistantcomponent_spotifyplus).

## 🌍 Languages

ControlRoom Music Card includes interface translations for:

- 🇺🇸 English
- 🇩🇪 Deutsch
- 🇧🇷 Português

Language selection is designed to work with the Home Assistant interface language or the card's language configuration.

## 📦 Installation via HACS

1. Open HACS in Home Assistant.
2. Select **Custom repositories**.
3. Add the following repository:

   `https://github.com/thaianyboas/controlroom-music-card`

4. Select **Dashboard** as the repository type.
5. Open **ControlRoom Music Card** in HACS.
6. Download the card and select an available version.
7. Refresh Home Assistant and add the card to your dashboard.

**Note:** This card requires the SpotifyPlus custom integration for its SpotifyPlus-specific features.

## 🛠️ Development

To build the card locally:

```bash
npm install
npm run rollup
```

The compiled JavaScript is generated at:

`dist/controlroom-music-card.js`

## ❤️ Credits & Acknowledgements

ControlRoom Music Card is a modified version of [SpotifyPlus Card](https://github.com/thlucas1/spotifyplus_card), originally created and maintained by **Todd Lucas (@thlucas1)**.

The original project provides the foundation for the music player, Spotify integration features, and configuration interface.

ControlRoom Music Card introduces additional customizations and multilingual improvements.

Special thanks to Todd Lucas for developing and sharing SpotifyPlus Card with the Home Assistant community.

## 📄 License

This project is distributed under the MIT License.

Original copyright:

Copyright (c) 2019–2025 Todd Lucas @thlucas1

The original copyright and MIT license notices are preserved in the [LICENSE](LICENSE) file.

## ⚠️ Disclaimer

ControlRoom Music Card is an independent community modification and is not an official SpotifyPlus Card release or an official Spotify product.