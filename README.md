# 🎵 ControlRoom Music Card

<div align="center">

**Your music. Your space. Your ControlRoom.**

*A refined, customizable Spotify experience for Home Assistant.*

[![Version](https://img.shields.io/github/v/release/thaianyboas/controlroom-music-card?style=for-the-badge&label=VERSION&color=638c79)](https://github.com/thaianyboas/controlroom-music-card/releases/latest)
[![License: MIT](https://img.shields.io/badge/License-MIT-638c79?style=for-the-badge)](LICENSE)
[![Home Assistant](https://img.shields.io/badge/Home%20Assistant-Dashboard-638c79?style=for-the-badge&logo=homeassistant&logoColor=white)](https://www.home-assistant.io/)
[![HACS](https://img.shields.io/badge/HACS-Custom%20Repository-638c79?style=for-the-badge)](https://www.hacs.xyz/)

[Features](#-features) · [Installation](#-installation) · [Customization](#-customization) · [Development](#-development) · [Credits](#-credits--acknowledgements)

</div>

---

## ✨ A More Personal Music Experience

**ControlRoom Music Card** brings music playback, discovery, and device management together in a thoughtfully designed Home Assistant dashboard card.

Built upon the original [SpotifyPlus Card](https://github.com/thlucas1/spotifyplus_card) by **Todd Lucas**, ControlRoom introduces a more personalized interface with refined navigation, flexible appearance options, and multilingual support.

Designed to make your everyday music experience feel seamless, intuitive, and distinctly yours.

### Designed around three principles

**Elegance** — A clean, modern interface that feels at home in a premium smart-home dashboard.

**Personalization** — Flexible themes, colors, and layout options that adapt to your environment.

**Functionality** — Convenient access to Spotify playback, music discovery, favorites, and compatible devices.

---

## 🎧 Features

### Music Playback

- Spotify playback controls and media information.
- Album artwork and playback details.
- Playback management through the SpotifyPlus integration.
- Access to compatible Spotify Connect devices.

### Music Discovery

- Search for tracks, albums, artists, and playlists.
- Explore podcasts, audiobooks, and other supported Spotify content.
- Browse saved music and favorite content.
- Navigate your Spotify library from within Home Assistant.

### Premium Interface

- **Floating Glass Smart Navigation** for an elegant navigation experience.
- **Premium Compact Device Browser** for streamlined device selection.
- Refined music browsing and favorites interfaces.
- Customizable player appearance.
- Responsive layouts for different dashboard configurations.

### Personalization

- Light, dark, automatic, and customizable appearance options.
- Adjustable colors and visual preferences.
- Flexible card configuration.
- Visual configuration editor.
- Multilingual user interface.

---

## 🎨 Customization

ControlRoom Music Card is designed to complement your Home Assistant dashboard rather than compete with it.

Personalize the experience through the card's configuration editor, including supported themes, colors, and appearance settings.

| Appearance | Description |
|---|---|
| ☀️ Light | A clean, bright interface |
| 🌙 Dark | A sophisticated dark appearance |
| 🔄 Automatic | Appearance based on the configured theme behavior |
| 🎨 Custom | Additional control over supported visual settings |

The available options may vary depending on the card version and configuration.

---

## 🌍 Languages

ControlRoom Music Card includes interface support for three languages:

| Language | Availability |
|---|---|
| 🇺🇸 English | Supported |
| 🇩🇪 Deutsch | Supported |
| 🇧🇷 Português | Supported |

Language selection is designed to work with Home Assistant language preferences and the card's own language settings.

---

## 📦 Installation

### Requirements

Before installing ControlRoom Music Card, make sure you have:

- A working Home Assistant installation.
- [HACS](https://www.hacs.xyz/) installed for the recommended installation method.
- The [SpotifyPlus custom integration](https://github.com/thlucas1/homeassistantcomponent_spotifyplus) installed and configured.
- A Spotify account compatible with the SpotifyPlus features you intend to use.

### Install via HACS

**Step 1 — Add the repository**

1. Open **HACS** in Home Assistant.
2. Open the menu for **Custom repositories**.
3. Enter the repository URL:

   `https://github.com/thaianyboas/controlroom-music-card`

4. Select **Dashboard** as the repository category.
5. Confirm to add the repository.

**Step 2 — Install the card**

1. Find **ControlRoom Music Card** in HACS.
2. Open the repository entry.
3. Download the latest stable version.
4. Refresh your browser if needed.

**Step 3 — Add it to your dashboard**

1. Open your Home Assistant dashboard.
2. Enter dashboard editing mode.
3. Add a new card.
4. Select or configure **ControlRoom Music Card**.
5. Choose your SpotifyPlus entity and preferred appearance settings.

> **Important:** ControlRoom Music Card relies on the SpotifyPlus custom integration for its SpotifyPlus-specific functionality. The card itself does not replace that integration.

### Releases and Updates

Stable versions are published through GitHub Releases.

**Latest stable release:** [View releases](https://github.com/thaianyboas/controlroom-music-card/releases/latest)

For regular use, install published stable releases rather than development versions.

---

## ⚙️ Development

ControlRoom Music Card is developed with TypeScript and bundled using Rollup.

### Build locally

Clone the repository:

```bash
git clone https://github.com/thaianyboas/controlroom-music-card.git
cd controlroom-music-card
```

Install dependencies:

```bash
npm install
```

Run TypeScript validation:

```bash
npx tsc --noEmit
```

Build the card:

```bash
npm run rollup
```

The generated JavaScript bundle is located at:

`dist/controlroom-music-card.js`

### Branch Structure

| Branch | Purpose |
|---|---|
| `master` | Stable, officially approved code |
| `develop` | Ongoing development and testing |

Official stable releases are identified using version tags, beginning with **v1.0.0**.

---

## 🧭 Project Direction

ControlRoom Music Card focuses on improving the Home Assistant music experience through:

- Consistent and polished interface design.
- Intuitive music and device navigation.
- Improved customization and theme compatibility.
- Multilingual accessibility.
- Stable, carefully tested updates.

The project continues to evolve while maintaining respect for the original open-source foundation.

---

## ❤️ Credits & Acknowledgements

ControlRoom Music Card exists thanks to the work of developers and contributors in the Home Assistant open-source community.

### Original Project — SpotifyPlus Card

**Todd Lucas ([@thlucas1](https://github.com/thlucas1))**

[SpotifyPlus Card](https://github.com/thlucas1/spotifyplus_card) is the original project on which ControlRoom Music Card is based.

Its foundational code and functionality support the music player, Spotify browsing capabilities, and configuration architecture.

The original author's applicable copyright and license notices are preserved.

### ControlRoom Music Card

**Thaiany Boas ([@thaianyboas](https://github.com/thaianyboas))**

ControlRoom Music Card is independently customized and maintained with additional interface enhancements, visual refinements, navigation improvements, and multilingual functionality.

These contributions build upon the original SpotifyPlus Card rather than replace its authorship.

### Related Open-Source Projects

We also recognize the work behind related Home Assistant music integrations:

| Project | Contributors |
|---|---|
| [SpotifyPlus Integration](https://github.com/thlucas1/homeassistantcomponent_spotifyplus) | Todd Lucas |
| [Spotcast](https://github.com/fondberg/spotcast) | Niklas Fondberg — original creator |
| [Spotcast v6](https://github.com/fondberg/spotcast) | Felix Cusson — rewrite and maintenance |
| [Spotcast (maintained)](https://github.com/Mincka/spotcast) | Mincka — continued maintenance |

These are independent projects. Acknowledgement does not imply that their source code is included in ControlRoom Music Card or that they endorse this project.

**Special thanks to the developers, maintainers, and contributors who make open-source music integrations possible.**

---

## 📄 License & Copyright

ControlRoom Music Card is distributed under the **MIT License**, subject to the applicable licenses and notices for any third-party components.

### Original SpotifyPlus Card

Copyright (c) 2019–2025 Todd Lucas (@thlucas1)

### ControlRoom Contributions

Original modifications and contributions by Thaiany Boas (@thaianyboas), 2026.

The original copyright notice and MIT License terms are preserved in the [LICENSE](LICENSE) file.

Attribution for ControlRoom contributions does not imply ownership of the original SpotifyPlus Card code or other third-party components.

---

## ⚠️ Disclaimer

ControlRoom Music Card is an independent, community-maintained project.

It is not an official SpotifyPlus Card release and is not affiliated with, endorsed by, or sponsored by Spotify AB, Home Assistant, or the maintainers of the related integrations.

Spotify and other product names and trademarks remain the property of their respective owners.

---

<div align="center">

### 💚 Made for a more beautiful smart home.

**ControlRoom Music Card**

*Your music. Your space. Your ControlRoom.*

[GitHub Repository](https://github.com/thaianyboas/controlroom-music-card) · [Latest Release](https://github.com/thaianyboas/controlroom-music-card/releases/latest)

</div>