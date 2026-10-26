import { css, html, LitElement, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {
  mdiAccountMusicOutline, mdiAlbum, mdiBookmarkOutline, mdiBookOpenOutline,
  mdiHistory, mdiMicrophoneOutline, mdiMusicNoteOutline,
  mdiPlayCircleOutline, mdiPlaylistMusicOutline, mdiPodcast, mdiMagnify,
  mdiSpeakerWireless, mdiDotsHorizontal, mdiClose,
} from '@mdi/js';
import { SHOW_SECTION } from '../constants';
import { CardConfig } from '../types/card-config';
import { Section } from '../types/section';
import { customEvent } from '../utils/utils';

type FooterLanguage = 'de' | 'pt' | 'en';
type HomeAssistantElement = Element & { hass?: { locale?: { language?: string }; language?: string } };
type NavigationItem = { section: Section; key: string; path: string };

const FOOTER_LABELS: Record<string, Record<FooterLanguage, string>> = {
  player: { de: 'Player', pt: 'Reprodutor', en: 'Player' },
  devices: { de: 'Geräte', pt: 'Dispositivos', en: 'Devices' },
  userPresets: { de: 'Eigene Presets', pt: 'Predefinições pessoais', en: 'User Presets' },
  recents: { de: 'Zuletzt gespielt', pt: 'Reproduzidos recentemente', en: 'Recently Played' },
  playlistFavorites: { de: 'Lieblingsplaylists', pt: 'Playlists favoritas', en: 'Playlist Favorites' },
  albumFavorites: { de: 'Lieblingsalben', pt: 'Álbuns favoritos', en: 'Album Favorites' },
  artistFavorites: { de: 'Lieblingskünstler', pt: 'Artistas favoritos', en: 'Artist Favorites' },
  trackFavorites: { de: 'Lieblingssongs', pt: 'Músicas favoritas', en: 'Track Favorites' },
  audiobookFavorites: { de: 'Lieblingshörbücher', pt: 'Audiolivros favoritos', en: 'Audiobook Favorites' },
  showFavorites: { de: 'Lieblingssendungen', pt: 'Programas favoritos', en: 'Show Favorites' },
  episodeFavorites: { de: 'Lieblingsepisoden', pt: 'Episódios favoritos', en: 'Episode Favorites' },
  searchSpotify: { de: 'Spotify durchsuchen', pt: 'Pesquisar no Spotify', en: 'Search Spotify' },
  more: { de: 'Weitere Bereiche', pt: 'Mais opções', en: 'More options' },
  close: { de: 'Schließen', pt: 'Fechar', en: 'Close' },
};

const NAVIGATION: NavigationItem[] = [
  { section: Section.PLAYER, key: 'player', path: mdiPlayCircleOutline },
  { section: Section.DEVICES, key: 'devices', path: mdiSpeakerWireless },
  { section: Section.USERPRESETS, key: 'userPresets', path: mdiBookmarkOutline },
  { section: Section.RECENTS, key: 'recents', path: mdiHistory },
  { section: Section.PLAYLIST_FAVORITES, key: 'playlistFavorites', path: mdiPlaylistMusicOutline },
  { section: Section.ALBUM_FAVORITES, key: 'albumFavorites', path: mdiAlbum },
  { section: Section.ARTIST_FAVORITES, key: 'artistFavorites', path: mdiAccountMusicOutline },
  { section: Section.TRACK_FAVORITES, key: 'trackFavorites', path: mdiMusicNoteOutline },
  { section: Section.AUDIOBOOK_FAVORITES, key: 'audiobookFavorites', path: mdiBookOpenOutline },
  { section: Section.SHOW_FAVORITES, key: 'showFavorites', path: mdiPodcast },
  { section: Section.EPISODE_FAVORITES, key: 'episodeFavorites', path: mdiMicrophoneOutline },
  { section: Section.SEARCH_MEDIA, key: 'searchSpotify', path: mdiMagnify },
];

@customElement('crm-footer')
export class Footer extends LitElement {
  @property({ attribute: false }) config!: CardConfig;
  @property({ attribute: false }) section!: Section;
  @state() private availableWidth = 0;
  @state() private menuOpen = false;
  private widthObserver?: ResizeObserver;

  connectedCallback(): void {
    super.connectedCallback();
    document.addEventListener('pointerdown', this.onOutsidePointer, true);
    document.addEventListener('keydown', this.onDocumentKeydown);
    if (typeof ResizeObserver !== 'undefined') {
      this.widthObserver = new ResizeObserver(entries => {
        const width = entries[0]?.contentRect.width ?? 0;
        if (Math.abs(width - this.availableWidth) > 0.5) this.availableWidth = width;
      });
      this.widthObserver.observe(this);
    }
  }

  disconnectedCallback(): void {
    this.widthObserver?.disconnect();
    this.widthObserver = undefined;
    document.removeEventListener('pointerdown', this.onOutsidePointer, true);
    document.removeEventListener('keydown', this.onDocumentKeydown);
    super.disconnectedCallback();
  }

  protected firstUpdated(): void {
    const width = this.getBoundingClientRect().width;
    if (width > 0) this.availableWidth = width;
  }

  private onOutsidePointer = (event: PointerEvent): void => {
    if (this.menuOpen && !event.composedPath().includes(this)) this.menuOpen = false;
  };

  private onDocumentKeydown = (event: KeyboardEvent): void => {
    if (event.key === 'Escape' && this.menuOpen) {
      this.menuOpen = false;
      this.shadowRoot?.querySelector<HTMLButtonElement>('.more-button')?.focus();
    }
  };

  private getFooterLanguage(): FooterLanguage {
    const selected = String(this.config?.language || 'auto').toLowerCase();
    const ha = document.querySelector('home-assistant') as HomeAssistantElement | null;
    const language = selected === 'auto'
      ? String(ha?.hass?.locale?.language || ha?.hass?.language || document.documentElement.lang || navigator.language || 'en').toLowerCase()
      : selected;
    return language.startsWith('de') ? 'de' : language.startsWith('pt') ? 'pt' : 'en';
  }

  private footerLabel(key: string): string {
    const labels = FOOTER_LABELS[key];
    return labels?.[this.getFooterLanguage()] || labels?.en || key;
  }

  private onSectionClick(section: Section): void {
    this.menuOpen = false;
    this.dispatchEvent(customEvent(SHOW_SECTION, section));
  }

  private renderButton(item: NavigationItem): TemplateResult {
    const selected = this.section === item.section;
    return html`<button class="nav-button ${selected ? 'active' : ''}"
      type="button" title=${this.footerLabel(item.key)} aria-label=${this.footerLabel(item.key)}
      aria-current=${selected ? 'page' : 'false'}
      @click=${() => this.onSectionClick(item.section)}>
      <ha-svg-icon .path=${item.path}></ha-svg-icon>
    </button>`;
  }

  protected render(): TemplateResult {
    const enabled = (this.config?.sections ?? [])
      .map(section => NAVIGATION.find(item => item.section === section))
      .filter((item): item is NavigationItem => item !== undefined);
    // 40px per button + 4px gap; 12px reserved for horizontal padding.
    const width = this.availableWidth || 320;
    const capacity = Math.max(0, Math.floor((width - 12 + 4) / 44));
    const hasOverflow = enabled.length > capacity;
    const visibleCount = hasOverflow ? Math.max(0, capacity - 1) : enabled.length;
    const visible = enabled.slice(0, visibleCount);
    const hidden = enabled.slice(visibleCount);
    const hiddenSelected = hidden.some(item => item.section === this.section);

    return html`
      <div class="glass-dock" role="navigation" aria-label="ControlRoom Music">
        ${visible.map(item => this.renderButton(item))}
        ${hasOverflow ? html`
          <button class="nav-button more-button ${hiddenSelected || this.menuOpen ? 'active' : ''}"
            type="button" title=${this.footerLabel('more')} aria-label=${this.footerLabel('more')}
            aria-haspopup="true" aria-expanded=${this.menuOpen}
            @click=${() => { this.menuOpen = !this.menuOpen; }}>
            <ha-svg-icon .path=${mdiDotsHorizontal}></ha-svg-icon>
          </button>
        ` : ''}
      </div>
      ${this.menuOpen && hidden.length ? html`
        <div class="menu" role="menu" aria-label=${this.footerLabel('more')}>
          <div class="menu-header">
            <span>${this.footerLabel('more')}</span>
            <button class="close-button" type="button" aria-label=${this.footerLabel('close')}
              @click=${() => { this.menuOpen = false; }}>
              <ha-svg-icon .path=${mdiClose}></ha-svg-icon>
            </button>
          </div>
          <div class="menu-grid">
            ${hidden.map(item => html`
              <button class="menu-item ${this.section === item.section ? 'active' : ''}"
                type="button" role="menuitem" title=${this.footerLabel(item.key)}
                @click=${() => this.onSectionClick(item.section)}>
                <ha-svg-icon .path=${item.path}></ha-svg-icon>
                <span>${this.footerLabel(item.key)}</span>
              </button>
            `)}
          </div>
        </div>
      ` : ''}
    `;
  }

  static get styles() {
    return css`
      :host {
        display: flex !important;
        position: relative;
        align-items: center;
        justify-content: center;
        min-width: 0;
        box-sizing: border-box;
        isolation: isolate;
        overflow: visible !important;
        --dock-accent: var(--crm-accent, #34d399);
        --dock-text: var(--crm-icon-color, #e5f5ee);
      }
      *, *::before, *::after { box-sizing: border-box; }
      .glass-dock {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
        width: max-content;
        max-width: 100%;
        min-height: 48px;
        padding: 4px 6px;
        border-radius: 999px;
        border: 1px solid color-mix(in srgb, var(--dock-accent) 24%, transparent);
        background: color-mix(in srgb, var(--crm-background, #101b19) 84%, #29483b);
        box-shadow: 0 5px 20px rgba(0,0,0,.20), inset 0 1px 0 rgba(255,255,255,.08);
        backdrop-filter: blur(18px);
        -webkit-backdrop-filter: blur(18px);
      }
      button { font: inherit; -webkit-tap-highlight-color: transparent; cursor: pointer; }
      .nav-button {
        flex: 0 0 40px;
        width: 40px;
        height: 40px;
        padding: 0;
        display: grid;
        place-items: center;
        border: 1px solid transparent;
        border-radius: 50%;
        background: transparent;
        color: var(--dock-text);
        transition: background .18s ease, color .18s ease, transform .18s ease;
      }
      .nav-button ha-svg-icon { --mdc-icon-size: 21px; width: 21px; height: 21px; }
      .nav-button:hover { background: color-mix(in srgb, var(--dock-accent) 12%, transparent); }
      .nav-button.active {
        color: var(--dock-accent);
        background: color-mix(in srgb, var(--dock-accent) 17%, transparent);
        border-color: color-mix(in srgb, var(--dock-accent) 22%, transparent);
        box-shadow: inset 0 1px 0 rgba(255,255,255,.05);
      }
      button:focus-visible { outline: 2px solid var(--dock-accent); outline-offset: 2px; }
      .menu {
        position: absolute;
        bottom: calc(100% + 8px);
        right: 0;
        z-index: 20;
        width: min(340px, max(240px, 100%));
        max-width: calc(100vw - 24px);
        max-height: min(360px, 65vh);
        overflow: auto;
        padding: 12px;
        border-radius: 18px;
        border: 1px solid color-mix(in srgb, var(--dock-accent) 27%, transparent);
        background: color-mix(in srgb, var(--crm-background, #101b19) 94%, #203b30);
        color: var(--crm-text, #f0fdf4);
        box-shadow: 0 16px 36px rgba(0,0,0,.42), inset 0 1px 0 rgba(255,255,255,.08);
        backdrop-filter: blur(22px);
        -webkit-backdrop-filter: blur(22px);
      }
      .menu-header { display: flex; align-items: center; justify-content: space-between; padding: 0 2px 10px; font-size: 13px; font-weight: 600; letter-spacing: .2px; }
      .close-button { display: grid; place-items: center; width: 28px; height: 28px; border: 0; border-radius: 50%; background: transparent; color: inherit; }
      .close-button ha-svg-icon { --mdc-icon-size: 18px; }
      .menu-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 7px; }
      .menu-item {
        min-width: 0;
        min-height: 74px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 9px 5px;
        border: 1px solid rgba(160,220,185,.08);
        border-radius: 12px;
        background: rgba(145,190,165,.07);
        color: var(--crm-text, #f0fdf4);
      }
      .menu-item ha-svg-icon { --mdc-icon-size: 22px; width: 22px; height: 22px; color: var(--dock-accent); }
      .menu-item span { display: block; width: 100%; font-size: 10px; line-height: 1.25; text-align: center; overflow-wrap: anywhere; }
      .menu-item:hover, .menu-item.active { background: color-mix(in srgb, var(--dock-accent) 16%, transparent); border-color: color-mix(in srgb, var(--dock-accent) 25%, transparent); }
      @media (prefers-reduced-motion: reduce) { .nav-button { transition: none; } }
    `;
  }
}
