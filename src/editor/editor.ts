// debug logging.
import Debug from 'debug/src/browser.js';
import { DEBUG_APP_NAME } from '../constants';
const debuglog = Debug(DEBUG_APP_NAME + ":editor");

// lovelace card imports.
import { css, html, PropertyValues, TemplateResult } from 'lit';
import { state } from 'lit/decorators.js';
import { choose } from 'lit/directives/choose.js';
import { styleMap } from 'lit/directives/style-map.js';

// our imports.
import {
  getConfigAreaForSection,
  getSectionForConfigArea,
} from '../utils/utils';
import './editor-form';
import './general-editor';
import './design-editor';
import './advanced-editor';
import './navigation-settings-editor';
import './player-editor';
import './album-fav-browser-editor';
import './artist-fav-browser-editor';
import './audiobook-fav-browser-editor';
import './category-browser-editor';
import './device-browser-editor';
import './episode-fav-browser-editor';
import './playlist-fav-browser-editor';
import './recent-browser-editor';
import './search-media-browser-editor';
import './show-fav-browser-editor';
import './track-fav-browser-editor';
import './userpreset-browser-editor';
import { BaseEditor } from './base-editor';
import { resolveLanguage } from '../localization/i18n';
import { ConfigArea } from '../types/config-area';
import { Section } from '../types/section';
import { Store } from '../model/store';
import { SHOW_SECTION } from '../constants';
import { EditorConfigAreaSelectedEvent } from '../events/editor-config-area-selected';


class CardEditor extends BaseEditor {

  @state() private configArea = ConfigArea.GENERAL;
  @state() private expandedGroup: string | null = 'general';

  /**
   * Invoked on each update to perform rendering tasks. 
   * 
   * This method may return any value renderable by lit-html's `ChildPart` (typically a `TemplateResult`). 
   * Setting properties inside this method will *not* trigger the element to update.
  */
  protected render(): TemplateResult | void {

    // just in case hass property has not been set yet.
    if (!this.hass) {
      return html``;
    }

    // just in case config property has not been set yet.
    if (!this.config) {
      return html``;
    }

    // ensure store is created.
    super.createStore();

    //console.log("render (editor) - rendering editor\n- this.store.section=%s\n- this.section=%s\n- Store.selectedConfigArea=%s",
    //  JSON.stringify(this.store.section),
    //  JSON.stringify(this.section),
    //  JSON.stringify(Store.selectedConfigArea),
    //);

    // ControlRoom theme tokens: keep custom choices whenever contrast is sufficient.
    const configuredTheme = this.config.crmTheme;
    const theme = ['light', 'dark', 'custom', 'auto'].includes(configuredTheme ?? '')
      ? configuredTheme : 'dark';
    const haDark = this.hass?.themes?.darkMode === true;
    const dark = theme === 'dark' || (theme === 'auto' && haDark);
    const validColor = (value: unknown, fallback: string): string =>
      typeof value === 'string' && /^#[0-9a-fA-F]{6}$/.test(value.trim()) ? value.trim() : fallback;
    const rgb = (hex: string): number[] => [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16));
    const luminance = (hex: string): number => {
      const [r, g, b] = rgb(hex).map(v => {
        const x = v / 255;
        return x <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };
    const contrast = (a: string, b: string): number => {
      const x = luminance(a), y = luminance(b);
      return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
    };
    const mix = (a: string, b: string, fraction: number): string => {
      const x = rgb(a), y = rgb(b);
      return '#' + x.map((v, i) => Math.round(v * (1 - fraction) + y[i] * fraction)
        .toString(16).padStart(2, '0')).join('');
    };
    const readable = (requested: string, background: string, minimum = 4.5): string => {
      if (contrast(requested, background) >= minimum) return requested;
      const black = '#000000', white = '#ffffff';
      const target = contrast(black, background) > contrast(white, background) ? black : white;
      for (let i = 1; i <= 100; i++) {
        const candidate = mix(requested, target, i / 100);
        if (contrast(candidate, background) >= minimum) return candidate;
      }
      return target;
    };
    const isCustom = theme === 'custom';
    const background = isCustom
      ? validColor(this.config.crmBackground, '#101b19')
      : dark ? '#101b19' : '#ffffff';
    const backgroundIsDark = luminance(background) < 0.179;
    const foreground = readable(isCustom
      ? validColor(this.config.crmText, backgroundIsDark ? '#f0fdf4' : '#17221e')
      : dark ? '#f0fdf4' : '#17221e', background);
    const secondaryBackground = mix(background, backgroundIsDark ? '#ffffff' : '#000000', 0.065);
    const secondaryText = readable(mix(foreground, background, 0.25), secondaryBackground);
    const requestedAccent = isCustom
      ? validColor(this.config.crmAccent, '#34d399')
      : dark ? '#34d399' : '#159568';
    const accent = readable(requestedAccent, background, 3);
    const divider = mix(background, foreground, 0.20);
    const customStyles: Record<string, string> = {
      '--card-background-color': background,
      '--ha-card-background': background,
      '--secondary-background-color': secondaryBackground,
      '--primary-text-color': foreground,
      '--secondary-text-color': secondaryText,
      '--divider-color': divider,
      '--primary-color': accent,
      '--crm-editor-accent': accent,
      'color-scheme': backgroundIsDark ? 'dark' : 'light',
    };

    const lang = resolveLanguage(this.config.language ?? 'auto', this.hass.locale?.language || this.hass.language);
    const labels = {
      pt: { general: 'Geral', design: 'Aparência', player: 'Reprodutor', navigation: 'Navegação', devices: 'Dispositivos', library: 'Biblioteca', advanced: 'Avançado', settings: 'Configurações do cartão', choose: 'Escolha uma seção' },
      de: { general: 'Allgemein', design: 'Darstellung', player: 'Player', navigation: 'Navigation', devices: 'Geräte', library: 'Bibliothek', advanced: 'Erweitert', settings: 'Karteneinstellungen', choose: 'Bereich auswählen' },
      en: { general: 'General', design: 'Appearance', player: 'Player', navigation: 'Navigation', devices: 'Devices', library: 'Library', advanced: 'Advanced', settings: 'Card settings', choose: 'Choose a section' },
    }[lang];

    // Explicit labels avoid relying on translation keys generated from enum values.
    const areaNames: Record<string, Record<string, string>> = {
      pt: {
        [ConfigArea.PLAYLIST_FAVORITES]: 'Playlists favoritas',
        [ConfigArea.ALBUM_FAVORITES]: 'Álbuns favoritos',
        [ConfigArea.ARTIST_FAVORITES]: 'Artistas favoritos',
        [ConfigArea.TRACK_FAVORITES]: 'Músicas favoritas',
        [ConfigArea.AUDIOBOOK_FAVORITES]: 'Audiolivros favoritos',
        [ConfigArea.EPISODE_FAVORITES]: 'Episódios favoritos',
        [ConfigArea.SHOW_FAVORITES]: 'Podcasts favoritos',
        [ConfigArea.CATEGORY_BROWSER]: 'Categorias',
        [ConfigArea.USERPRESET_BROWSER]: 'Presets personalizados',
        [ConfigArea.RECENT_BROWSER]: 'Reproduzidos recentemente',
        [ConfigArea.SEARCH_MEDIA_BROWSER]: 'Pesquisa de mídia',
      },
      de: {
        [ConfigArea.PLAYLIST_FAVORITES]: 'Lieblingsplaylists',
        [ConfigArea.ALBUM_FAVORITES]: 'Lieblingsalben',
        [ConfigArea.ARTIST_FAVORITES]: 'Lieblingskünstler',
        [ConfigArea.TRACK_FAVORITES]: 'Lieblingssongs',
        [ConfigArea.AUDIOBOOK_FAVORITES]: 'Lieblingshörbücher',
        [ConfigArea.EPISODE_FAVORITES]: 'Lieblingsepisoden',
        [ConfigArea.SHOW_FAVORITES]: 'Lieblingssendungen',
        [ConfigArea.CATEGORY_BROWSER]: 'Kategorien',
        [ConfigArea.USERPRESET_BROWSER]: 'Benutzer-Presets',
        [ConfigArea.RECENT_BROWSER]: 'Zuletzt gespielt',
        [ConfigArea.SEARCH_MEDIA_BROWSER]: 'Mediensuche',
      },
      en: {
        [ConfigArea.PLAYLIST_FAVORITES]: 'Favorite playlists',
        [ConfigArea.ALBUM_FAVORITES]: 'Favorite albums',
        [ConfigArea.ARTIST_FAVORITES]: 'Favorite artists',
        [ConfigArea.TRACK_FAVORITES]: 'Favorite tracks',
        [ConfigArea.AUDIOBOOK_FAVORITES]: 'Favorite audiobooks',
        [ConfigArea.EPISODE_FAVORITES]: 'Favorite episodes',
        [ConfigArea.SHOW_FAVORITES]: 'Favorite shows',
        [ConfigArea.CATEGORY_BROWSER]: 'Categories',
        [ConfigArea.USERPRESET_BROWSER]: 'User presets',
        [ConfigArea.RECENT_BROWSER]: 'Recently played',
        [ConfigArea.SEARCH_MEDIA_BROWSER]: 'Media search',
      },
    };
    const areaLabels = areaNames[lang] ?? areaNames.en;

    const libraryAreas = [
      ConfigArea.PLAYLIST_FAVORITES, ConfigArea.ALBUM_FAVORITES,
      ConfigArea.ARTIST_FAVORITES, ConfigArea.TRACK_FAVORITES,
      ConfigArea.AUDIOBOOK_FAVORITES, ConfigArea.EPISODE_FAVORITES,
      ConfigArea.SHOW_FAVORITES, ConfigArea.CATEGORY_BROWSER,
    ];
    const navigationAreas = [
      ConfigArea.USERPRESET_BROWSER,
      ConfigArea.RECENT_BROWSER,
      ConfigArea.SEARCH_MEDIA_BROWSER,
    ];

    const groups = [
      { id: 'general', title: labels.general, icon: 'mdi:cog-outline', areas: [ConfigArea.GENERAL] },
      { id: 'design', title: labels.design, icon: 'mdi:palette-outline', areas: [ConfigArea.DESIGN] },
      { id: 'player', title: labels.player, icon: 'mdi:play-circle-outline', areas: [ConfigArea.PLAYER] },
      { id: 'navigation', title: labels.navigation, icon: 'mdi:compass-outline', areas: navigationAreas },
      { id: 'library', title: labels.library, icon: 'mdi:bookshelf', areas: libraryAreas },
      { id: 'devices', title: labels.devices, icon: 'mdi:speaker-wireless', areas: [ConfigArea.DEVICE_BROWSER] },
      { id: 'advanced', title: labels.advanced, icon: 'mdi:tune-variant', areas: [] },
    ];

    return html`
      <div class="crm-settings-shell" data-theme=${theme} style=${styleMap(customStyles)}>
        <div class="crm-settings-heading">
          <ha-icon icon="mdi:music-circle-outline"></ha-icon>
          <div>
            <div class="crm-settings-brand">ControlRoom</div>
            <div class="crm-settings-caption">${labels.settings}</div>
          </div>
        </div>
        <nav class="crm-settings-grid" aria-label=${labels.choose}>
          ${groups.map((group) => html`
            <button
              type="button"
              class="crm-settings-tile ${this.expandedGroup === group.id ? 'active' : ''}"
              aria-pressed=${this.expandedGroup === group.id ? 'true' : 'false'}
              @click=${() => this.toggleGroup(group.id, group.areas[0])}
            >
              <ha-icon class="crm-tile-icon" icon=${group.icon}></ha-icon>
              <span>${group.title}</span>
              <ha-icon class="crm-tile-arrow" icon="mdi:chevron-right"></ha-icon>
            </button>
          `)}
        </nav>

        ${groups.map((group) => this.expandedGroup === group.id ? html`
          <section class="crm-settings-panel">
            <div class="crm-panel-heading">
              <ha-icon icon=${group.icon}></ha-icon>
              <span>${group.title}</span>
            </div>
            ${group.areas.length > 1 ? html`
              <div class="crm-settings-subnav">
                ${group.areas.map((area) => html`
                  <button
                    type="button"
                    class="crm-settings-subitem ${this.configArea === area ? 'selected' : ''}"
                    aria-current=${this.configArea === area ? 'page' : 'false'}
                    @click=${() => this.onConfigSectionClick(area)}
                  >
                    ${areaLabels[area] ?? String(area)}
                  </button>
                `)}
              </div>
            ` : ''}
            ${group.id === 'navigation' ? html`
              <crm-navigation-settings-editor
                .config=${this.config}
                .hass=${this.hass}
              ></crm-navigation-settings-editor>
            ` : ''}
            <div class="crm-card-editor">
              ${group.areas.length ? this.subEditor() : html`
                <crm-advanced-editor .config=${this.config} .hass=${this.hass}></crm-advanced-editor>
              `}
            </div>
          </section>
        ` : '')}

      </div>
    `;
  }


  /**
   * Style definitions used by this TemplateResult.
   * 
   * Use the following styles to control the HA-FORM look and feel; the values
   * listed in the style below give the dynamically generated content a more
   * compact look and feel, which is nice when a LOT of editor settings are defined.
   * They are applied to the shadowDOM via the _styleRenderRootElements function in editor.form.ts.
   * 
   * --ha-form-style-integer-margin-bottom: 0.5rem;
   * --ha-form-style-multiselect-margin-bottom: 0.5rem;
   * --ha-form-style-selector-margin-bottom: 0.5rem;
   * --ha-form-style-selector-boolean-min-height: 28px;
   * --ha-form-style-string-margin-bottom: 0.5rem;
   */
  static get styles() {
    return css`
      :host { display: block; min-width: 0; }
      .crm-settings-shell {
        min-width: 0;
        padding: 12px;
        border-radius: 16px;
        background: var(--card-background-color, transparent);
        color: var(--primary-text-color);
        color-scheme: normal;
        transition: background-color 150ms ease, color 150ms ease;
      }
      /* Theme colors are provided by the computed inline palette. */

      .crm-settings-heading {
        display: flex; align-items: center; gap: 10px;
        padding: 6px 4px 12px;
      }
      .crm-settings-heading > ha-icon { color: var(--primary-color); --mdc-icon-size: 24px; }
      .crm-settings-brand { font-size: 15px; font-weight: 650; letter-spacing: -0.02em; }
      .crm-settings-caption { margin-top: 2px; font-size: 11px; color: var(--secondary-text-color); }

      .crm-settings-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 9px;
        margin-bottom: 14px;
      }
      .crm-settings-tile {
        display: flex;
        align-items: center;
        gap: 9px;
        min-width: 0;
        min-height: 58px;
        padding: 12px;
        border: 1px solid var(--divider-color);
        border-radius: 13px;
        background: var(--card-background-color, transparent);
        color: var(--primary-text-color);
        font: inherit;
        font-size: 12px;
        font-weight: 550;
        text-align: left;
        cursor: pointer;
        transition: border-color 150ms ease, background 150ms ease;
      }
      .crm-settings-tile > span {
        flex: 1;
        min-width: 0;
        overflow-wrap: anywhere;
      }
      .crm-settings-tile .crm-tile-icon {
        --mdc-icon-size: 21px;
        color: var(--secondary-text-color);
      }
      .crm-settings-tile .crm-tile-arrow {
        --mdc-icon-size: 15px;
        color: var(--secondary-text-color);
      }
      .crm-settings-tile.active {
        border-color: var(--crm-editor-accent, #34d399);
        background: color-mix(in srgb, var(--crm-editor-accent, #34d399) 9%, transparent);
      }
      .crm-settings-tile.active .crm-tile-icon {
        color: var(--crm-editor-accent, #34d399);
      }
      .crm-settings-tile:hover {
        border-color: var(--crm-editor-accent, #34d399);
      }
      .crm-settings-tile:focus-visible,
      .crm-settings-subitem:focus-visible {
        outline: 2px solid var(--crm-editor-accent, #34d399);
        outline-offset: 2px;
      }
      .crm-settings-panel {
        min-width: 0;
        padding: 15px;
        border: 1px solid var(--divider-color);
        border-radius: 15px;
      }
      .crm-panel-heading {
        display: flex;
        align-items: center;
        gap: 9px;
        margin-bottom: 14px;
        font-size: 14px;
        font-weight: 650;
      }
      .crm-panel-heading ha-icon {
        --mdc-icon-size: 19px;
        color: var(--crm-editor-accent, #34d399);
      }
      .crm-settings-subnav {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        margin-bottom: 14px;
      }
      .crm-settings-subitem {
        padding: 7px 10px;
        border: 1px solid var(--divider-color);
        border-radius: 9px;
        background: transparent;
        color: var(--secondary-text-color);
        font: inherit;
        font-size: 12px;
        cursor: pointer;
      }
      .crm-settings-subitem.selected {
        border-color: var(--crm-editor-accent, #34d399);
        color: var(--primary-text-color);
        background: color-mix(in srgb, var(--crm-editor-accent, #34d399) 9%, transparent);
      }
      .crm-empty-panel {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 18px 4px;
        color: var(--secondary-text-color);
        font-size: 12px;
        line-height: 1.5;
      }
      .crm-empty-panel ha-icon {
        --mdc-icon-size: 22px;
        color: var(--crm-editor-accent, #34d399);
      }
      .crm-card-editor {
        min-width: 0;
        --ha-form-style-integer-margin-bottom: 0.5rem;
        --ha-form-style-multiselect-margin-bottom: 0.5rem;
        --ha-form-style-selector-margin-bottom: 0.5rem;
        --ha-form-style-selector-boolean-min-height: 28px;
        --ha-form-style-string-margin-bottom: 0.5rem;
      }
    `;
  }

  private groupForArea(area: ConfigArea): string {
    if ([ConfigArea.PLAYLIST_FAVORITES, ConfigArea.ALBUM_FAVORITES,
      ConfigArea.ARTIST_FAVORITES, ConfigArea.TRACK_FAVORITES,
      ConfigArea.AUDIOBOOK_FAVORITES, ConfigArea.EPISODE_FAVORITES,
      ConfigArea.SHOW_FAVORITES, ConfigArea.CATEGORY_BROWSER].includes(area)) return 'library';
    if ([ConfigArea.USERPRESET_BROWSER, ConfigArea.RECENT_BROWSER,
      ConfigArea.SEARCH_MEDIA_BROWSER].includes(area)) return 'navigation';
    if (area === ConfigArea.DESIGN) return 'design';
    if (area === ConfigArea.PLAYER) return 'player';
    if (area === ConfigArea.DEVICE_BROWSER) return 'devices';
    return 'general';
  }

  private toggleGroup(id: string, firstArea: ConfigArea): void {
    if (this.expandedGroup === id) return;
    this.expandedGroup = id;
    if (id === 'advanced') return;
    if (this.groupForArea(this.configArea) !== id) {
      this.onConfigSectionClick(firstArea);
    }
  }

  private subEditor() {

    // show the desired section editor.
    return choose(this.configArea, [
      [
        ConfigArea.ALBUM_FAVORITES,
        () => html`<crm-album-fav-browser-editor .config=${this.config} .hass=${this.hass}></crm-album-fav-browser-editor>`,
      ],
      [
        ConfigArea.ARTIST_FAVORITES,
        () => html`<crm-artist-fav-browser-editor .config=${this.config} .hass=${this.hass}></crm-artist-fav-browser-editor>`,
      ],
      [
        ConfigArea.AUDIOBOOK_FAVORITES,
        () => html`<crm-audiobook-fav-browser-editor .config=${this.config} .hass=${this.hass}></crm-audiobook-fav-browser-editor>`,
      ],
      [
        ConfigArea.CATEGORY_BROWSER,
        () => html`<crm-category-browser-editor .config=${this.config} .hass=${this.hass}></crm-category-browser-editor>`,
      ],
      [
        ConfigArea.DEVICE_BROWSER,
        () => html`<crm-device-browser-editor .config=${this.config} .hass=${this.hass}></crm-device-browser-editor>`,
      ],
      [
        ConfigArea.EPISODE_FAVORITES,
        () => html`<crm-episode-fav-browser-editor .config=${this.config} .hass=${this.hass}></crm-episode-fav-browser-editor>`,
      ],
      [
        ConfigArea.GENERAL,
        () => html`<crm-general-editor .config=${this.config} .hass=${this.hass}></crm-general-editor>`,
      ],
      [
        ConfigArea.DESIGN,
        () => html`<crm-design-editor .config=${this.config} .hass=${this.hass}></crm-design-editor>`,
      ],
      [
        ConfigArea.PLAYER,
        () => html`<crm-player-editor .config=${this.config} .hass=${this.hass}></crm-player-editor>`,
      ],
      [
        ConfigArea.PLAYLIST_FAVORITES,
        () => html`<crm-playlist-fav-browser-editor .config=${this.config} .hass=${this.hass}></crm-playlist-fav-browser-editor>`,
      ],
      [
        ConfigArea.RECENT_BROWSER,
        () => html`<crm-recent-browser-editor .config=${this.config} .hass=${this.hass}></crm-recent-browser-editor>`,
      ],
      [
        ConfigArea.SEARCH_MEDIA_BROWSER,
        () => html`<crm-search-media-browser-editor .config=${this.config} .hass=${this.hass}></crm-search-media-browser-editor>`,
      ],
      [
        ConfigArea.SHOW_FAVORITES,
        () => html`<crm-show-fav-browser-editor .config=${this.config} .hass=${this.hass}></crm-show-fav-browser-editor>`,
      ],
      [
        ConfigArea.TRACK_FAVORITES,
        () => html`<crm-track-fav-browser-editor .config=${this.config} .hass=${this.hass}></crm-track-fav-browser-editor>`,
      ],
      [
        ConfigArea.USERPRESET_BROWSER,
        () => html`<crm-userpreset-browser-editor .config=${this.config} .hass=${this.hass}></crm-userpreset-browser-editor>`,
      ],
    ]);
  }


  /**
   * Handles the `click` event fired when an editor section button is clicked.
   * 
   * This will set the configArea attribute, which will display the selected editor section settings.
   * 
   * @param args Event arguments that contain the configArea that was clicked on.
   */
  private onConfigSectionClick(configArea: ConfigArea) {

    // show the section that we are editing.
    const sectionNew = getSectionForConfigArea(configArea);

    //console.log("onConfigSectionClick (editor)\n- OLD configArea=%s\n- NEW configArea=%s\n- OLD section=%s\n- NEW section=%s\n- Store.selectedConfigArea=%s",
    //  JSON.stringify(this.configArea),
    //  JSON.stringify(configArea),
    //  JSON.stringify(this.section),
    //  JSON.stringify(sectionNew),
    //  JSON.stringify(Store.selectedConfigArea),
    //);

    // store selected ConfigArea.
    Store.selectedConfigArea = configArea;

    // show the config area and set the section references.
    this.configArea = configArea;
    this.expandedGroup = this.groupForArea(configArea);
    this.section = sectionNew;
    this.store.section = sectionNew;

    // inform the card that it needs to show the section for the selected ConfigArea
    // by dispatching the EDITOR_CONFIG_AREA_SELECTED event.
    document.dispatchEvent(EditorConfigAreaSelectedEvent(this.section));
  }


  /**
   * Invoked when the component is added to the document's DOM.
   *
   * In `connectedCallback()` you should setup tasks that should only occur when
   * the element is connected to the document. The most common of these is
   * adding event listeners to nodes external to the element, like a keydown
   * event handler added to the window.
   *
   * Typically, anything done in `connectedCallback()` should be undone when the
   * element is disconnected, in `disconnectedCallback()`.
   */
  public connectedCallback() {

    // invoke base class method.
    super.connectedCallback();

    // add window level event listeners.
    window.addEventListener(SHOW_SECTION, this.onFooterShowSection);
  }


  /**
   * Invoked when the component is removed from the document's DOM.
   *
   * This callback is the main signal to the element that it may no longer be
   * used. `disconnectedCallback()` should ensure that nothing is holding a
   * reference to the element (such as event listeners added to nodes external
   * to the element), so that it is free to be garbage collected.
   *
   * An element may be re-connected after being disconnected.
   */
  public disconnectedCallback() {

    // remove window level event listeners.
    window.removeEventListener(SHOW_SECTION, this.onFooterShowSection);

    // invoke base class method.
    super.disconnectedCallback();
  }


  /**
   * Called when the element has rendered for the first time. Called once in the
   * lifetime of an element. Useful for one-time setup work that requires access to
   * the DOM.
   */
  protected firstUpdated(changedProperties: PropertyValues): void {

    // invoke base class method.
    super.firstUpdated(changedProperties);

    if (debuglog.enabled) {
      debuglog("firstUpdated (editor) - 1st render complete - changedProperties keys:\n%s",
        JSON.stringify(Array.from(changedProperties.keys())),
      );
    }

    // if there are things that you only want to happen one time when the configuration
    // is initially loaded, then do them here.

    // at this point, the first render has occurred.
    // select the configarea for the first section that has been configured so that its settings
    // are automatically displayed when the card editor dialog opens.
    // if the media player entity has not been configured then display the GENERAL configArea.
    // make sure we check if `this.config` has been set before attempting to access anything
    // in the configuration settings; otherwise, an uncaught exception is raised!
    let configArea = getConfigAreaForSection(this.section);
    if (this.config) {
      if (!this.config.entity) {
        configArea = ConfigArea.GENERAL;
      }
    }
    this.configArea = configArea;
    this.expandedGroup = this.groupForArea(configArea);
    Store.selectedConfigArea = this.configArea;
    super.requestUpdate();

  }


  /**
   * Handles the footer `SHOW_SECTION` event.
   * 
   * This will select the appropriate editor configuration section when a footer
   * icon is clicked.
   * 
   * @param args Event arguments that contain the section that was selected.
  */
  protected onFooterShowSection = (args: Event) => {

    // get the ConfigArea value for the active footer section.
    const sectionToSelect = (args as CustomEvent).detail as Section;
    const configArea = getConfigAreaForSection(sectionToSelect);

    // select the configuration area.
    this.configArea = configArea;
    this.expandedGroup = this.groupForArea(configArea);

    // store selected ConfigArea.
    Store.selectedConfigArea = this.configArea;
  }
}


customElements.define('crm-editor', CardEditor);
