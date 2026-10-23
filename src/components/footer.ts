
import { css, html, LitElement, TemplateResult, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import {
  mdiAccountMusicOutline,
  mdiAlbum,
  mdiBookmarkOutline,
  mdiBookOpenOutline,
  mdiShapeOutline,
  mdiHistory,
  mdiMicrophoneOutline,
  mdiMusicNoteOutline,
  mdiPlayCircleOutline,
  mdiPlaylistMusicOutline,
  mdiPodcast,
  mdiMagnify,
  mdiSpeakerWireless,
} from '@mdi/js';

import { SHOW_SECTION } from '../constants';
import { CardConfig } from '../types/card-config';
import { Section } from '../types/section';
import { customEvent } from '../utils/utils';

type FooterLanguage = 'de' | 'pt' | 'en';

type HomeAssistantElement = Element & {
  hass?: {
    locale?: {
      language?: string;
    };
    language?: string;
  };
};

const FOOTER_LABELS: Record<
  string,
  Record<FooterLanguage, string>
> = {
  player: {
    de: 'Player',
    pt: 'Reprodutor',
    en: 'Player',
  },
  devices: {
    de: 'Geräte',
    pt: 'Dispositivos',
    en: 'Devices',
  },
  userPresets: {
    de: 'Eigene Presets',
    pt: 'Predefinições pessoais',
    en: 'User Presets',
  },
  recents: {
    de: 'Zuletzt gespielt',
    pt: 'Reproduzidos recentemente',
    en: 'Recently Played',
  },
  categories: {
    de: 'Kategorien',
    pt: 'Categorias',
    en: 'Categories',
  },
  playlistFavorites: {
    de: 'Lieblingsplaylists',
    pt: 'Playlists favoritas',
    en: 'Playlist Favorites',
  },
  albumFavorites: {
    de: 'Lieblingsalben',
    pt: 'Álbuns favoritos',
    en: 'Album Favorites',
  },
  artistFavorites: {
    de: 'Lieblingskünstler',
    pt: 'Artistas favoritos',
    en: 'Artist Favorites',
  },
  trackFavorites: {
    de: 'Lieblingssongs',
    pt: 'Músicas favoritas',
    en: 'Track Favorites',
  },
  audiobookFavorites: {
    de: 'Lieblingshörbücher',
    pt: 'Audiolivros favoritos',
    en: 'Audiobook Favorites',
  },
  showFavorites: {
    de: 'Lieblingssendungen',
    pt: 'Programas favoritos',
    en: 'Show Favorites',
  },
  episodeFavorites: {
    de: 'Lieblingsepisoden',
    pt: 'Episódios favoritos',
    en: 'Episode Favorites',
  },
  searchSpotify: {
    de: 'Spotify durchsuchen',
    pt: 'Pesquisar no Spotify',
    en: 'Search Spotify',
  },
};

@customElement('crm-footer')
export class Footer extends LitElement {

  @property({ attribute: false })
  config!: CardConfig;

  @property()
  section!: Section;

  /**
   * Returns the selected card language.
   * In auto mode, attempts to use the Home Assistant language.
   */
  private getFooterLanguage(): FooterLanguage {
    const selected = String(
      this.config?.language || 'auto'
    ).toLowerCase();

    const homeAssistant = document.querySelector(
      'home-assistant'
    ) as HomeAssistantElement | null;

    const language = selected === 'auto'
      ? String(
          homeAssistant?.hass?.locale?.language ||
          homeAssistant?.hass?.language ||
          document.documentElement.lang ||
          navigator.language ||
          'en'
        ).toLowerCase()
      : selected;

    if (language.startsWith('de')) {
      return 'de';
    }

    if (language.startsWith('pt')) {
      return 'pt';
    }

    return 'en';
  }

  /**
   * Returns the translated label for a footer button.
   */
  private footerLabel(key: string): string {
    const labels = FOOTER_LABELS[key];

    if (!labels) {
      return key;
    }

    return labels[this.getFooterLanguage()] || labels.en;
  }

  protected render(): TemplateResult | void {
    return html`
      <ha-icon-button
        .path=${mdiPlayCircleOutline}
        label=${this.footerLabel('player')}
        @click=${() => this.onSectionClick(Section.PLAYER)}
        selected=${this.getSectionSelected(Section.PLAYER)}
        hide=${this.getSectionEnabled(Section.PLAYER)}
      ></ha-icon-button>

      <ha-icon-button
        .path=${mdiSpeakerWireless}
        label=${this.footerLabel('devices')}
        @click=${() => this.onSectionClick(Section.DEVICES)}
        selected=${this.getSectionSelected(Section.DEVICES)}
        hide=${this.getSectionEnabled(Section.DEVICES)}
      ></ha-icon-button>

      <ha-icon-button
        .path=${mdiBookmarkOutline}
        label=${this.footerLabel('userPresets')}
        @click=${() => this.onSectionClick(Section.USERPRESETS)}
        selected=${this.getSectionSelected(Section.USERPRESETS)}
        hide=${this.getSectionEnabled(Section.USERPRESETS)}
      ></ha-icon-button>

      <ha-icon-button
        .path=${mdiHistory}
        label=${this.footerLabel('recents')}
        @click=${() => this.onSectionClick(Section.RECENTS)}
        selected=${this.getSectionSelected(Section.RECENTS)}
        hide=${this.getSectionEnabled(Section.RECENTS)}
      ></ha-icon-button>

      <ha-icon-button
        .path=${mdiShapeOutline}
        label=${this.footerLabel('categories')}
        @click=${() => this.onSectionClick(Section.CATEGORYS)}
        selected=${this.getSectionSelected(Section.CATEGORYS)}
        hide=${this.getSectionEnabled(Section.CATEGORYS)}
      ></ha-icon-button>

      <ha-icon-button
        .path=${mdiPlaylistMusicOutline}
        label=${this.footerLabel('playlistFavorites')}
        @click=${() => this.onSectionClick(Section.PLAYLIST_FAVORITES)}
        selected=${this.getSectionSelected(Section.PLAYLIST_FAVORITES)}
        hide=${this.getSectionEnabled(Section.PLAYLIST_FAVORITES)}
      ></ha-icon-button>

      <ha-icon-button
        .path=${mdiAlbum}
        label=${this.footerLabel('albumFavorites')}
        @click=${() => this.onSectionClick(Section.ALBUM_FAVORITES)}
        selected=${this.getSectionSelected(Section.ALBUM_FAVORITES)}
        hide=${this.getSectionEnabled(Section.ALBUM_FAVORITES)}
      ></ha-icon-button>

      <ha-icon-button
        .path=${mdiAccountMusicOutline}
        label=${this.footerLabel('artistFavorites')}
        @click=${() => this.onSectionClick(Section.ARTIST_FAVORITES)}
        selected=${this.getSectionSelected(Section.ARTIST_FAVORITES)}
        hide=${this.getSectionEnabled(Section.ARTIST_FAVORITES)}
      ></ha-icon-button>

      <ha-icon-button
        .path=${mdiMusicNoteOutline}
        label=${this.footerLabel('trackFavorites')}
        @click=${() => this.onSectionClick(Section.TRACK_FAVORITES)}
        selected=${this.getSectionSelected(Section.TRACK_FAVORITES)}
        hide=${this.getSectionEnabled(Section.TRACK_FAVORITES)}
      ></ha-icon-button>

      <ha-icon-button
        .path=${mdiBookOpenOutline}
        label=${this.footerLabel('audiobookFavorites')}
        @click=${() => this.onSectionClick(Section.AUDIOBOOK_FAVORITES)}
        selected=${this.getSectionSelected(Section.AUDIOBOOK_FAVORITES)}
        hide=${this.getSectionEnabled(Section.AUDIOBOOK_FAVORITES)}
      ></ha-icon-button>

      <ha-icon-button
        .path=${mdiPodcast}
        label=${this.footerLabel('showFavorites')}
        @click=${() => this.onSectionClick(Section.SHOW_FAVORITES)}
        selected=${this.getSectionSelected(Section.SHOW_FAVORITES)}
        hide=${this.getSectionEnabled(Section.SHOW_FAVORITES)}
      ></ha-icon-button>

      <ha-icon-button
        .path=${mdiMicrophoneOutline}
        label=${this.footerLabel('episodeFavorites')}
        @click=${() => this.onSectionClick(Section.EPISODE_FAVORITES)}
        selected=${this.getSectionSelected(Section.EPISODE_FAVORITES)}
        hide=${this.getSectionEnabled(Section.EPISODE_FAVORITES)}
      ></ha-icon-button>

      <ha-icon-button
        .path=${mdiMagnify}
        label=${this.footerLabel('searchSpotify')}
        @click=${() => this.onSectionClick(Section.SEARCH_MEDIA)}
        selected=${this.getSectionSelected(Section.SEARCH_MEDIA)}
        hide=${this.getSectionEnabled(Section.SEARCH_MEDIA)}
      ></ha-icon-button>
    `;
  }

  static get styles() {
    return css`
      :host > ha-icon-button {
        color: var(--crm-icon-color, #e5f5ee) !important;
        --mdc-icon-button-ink-color: var(--crm-icon-color, #e5f5ee);
        --ha-icon-color: var(--crm-icon-color, #e5f5ee);
        --state-icon-color: var(--crm-icon-color, #e5f5ee);
        --primary-color: var(--crm-accent, #40d99a);
        --mdc-theme-primary: var(--crm-accent, #40d99a);
        --ha-icon-button-selected-color: var(--crm-accent, #40d99a);
        --ha-icon-button-selected-background-color: color-mix(in srgb, var(--crm-accent, #40d99a) 14%, transparent);
        border-radius: 50%;
      }

      :host > ha-icon-button[selected] {
        color: var(--crm-accent, #40d99a) !important;
        background-color: color-mix(in srgb, var(--crm-accent, #40d99a) 12%, transparent);
        --primary-color: var(--crm-accent, #40d99a);
        --mdc-theme-primary: var(--crm-accent, #40d99a);
        --ha-icon-button-selected-color: var(--crm-accent, #40d99a);
        --ha-icon-button-selected-background-color: color-mix(in srgb, var(--crm-accent, #40d99a) 12%, transparent);
      }

      :host > ha-icon-button[hide] {
        display: none;
      }
    `;
  }

  private onSectionClick(section: Section) {
    this.dispatchEvent(customEvent(SHOW_SECTION, section));
  }

  private getSectionSelected(
    section: Section | typeof nothing
  ) {
    return this.section === section || nothing;
  }

  private getSectionEnabled(searchElement: Section) {
    return (
      this.config.sections &&
      !this.config.sections?.includes(searchElement)
    ) || nothing;
  }
}
