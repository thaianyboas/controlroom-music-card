// debug logging.
import Debug from 'debug/src/browser.js';
import { DEBUG_APP_NAME } from '../constants';
const debuglog = Debug(DEBUG_APP_NAME + ":editor");

// lovelace card imports.
import { css, html, PropertyValues, TemplateResult } from 'lit';
import { state } from 'lit/decorators.js';
import { choose } from 'lit/directives/choose.js';

// our imports.
import {
  getConfigAreaForSection,
  getSectionForConfigArea,
} from '../utils/utils';
import './editor-form';
import './general-editor';
import './design-editor';
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
import { translate, resolveLanguage } from '../localization/i18n';
import { ConfigArea } from '../types/config-area';
import { Section } from '../types/section';
import { Store } from '../model/store';
import { SHOW_SECTION } from '../constants';
import { EditorConfigAreaSelectedEvent } from '../events/editor-config-area-selected';


class CardEditor extends BaseEditor {

  @state() private configArea = ConfigArea.GENERAL;

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

    const lang = resolveLanguage(this.config.language ?? 'auto', this.hass.locale?.language || this.hass.language);
    const labels = {
      pt: { general: 'Geral', design: 'Aparência', player: 'Reprodutor', devices: 'Dispositivos', library: 'Biblioteca', advanced: 'Avançado', settings: 'Configurações do cartão', choose: 'Escolha uma seção' },
      de: { general: 'Allgemein', design: 'Darstellung', player: 'Player', devices: 'Geräte', library: 'Bibliothek', advanced: 'Erweitert', settings: 'Karteneinstellungen', choose: 'Bereich auswählen' },
      en: { general: 'General', design: 'Appearance', player: 'Player', devices: 'Devices', library: 'Library', advanced: 'Advanced', settings: 'Card settings', choose: 'Choose a section' },
    }[lang];

    const libraryAreas = [
      ConfigArea.PLAYLIST_FAVORITES, ConfigArea.ALBUM_FAVORITES,
      ConfigArea.ARTIST_FAVORITES, ConfigArea.TRACK_FAVORITES,
      ConfigArea.AUDIOBOOK_FAVORITES, ConfigArea.EPISODE_FAVORITES,
      ConfigArea.SHOW_FAVORITES, ConfigArea.CATEGORY_BROWSER,
    ];
    const advancedAreas = [
      ConfigArea.USERPRESET_BROWSER, ConfigArea.RECENT_BROWSER,
      ConfigArea.SEARCH_MEDIA_BROWSER,
    ];
    const groups = [
      { id: 'general', title: labels.general, icon: 'mdi:cog-outline', areas: [ConfigArea.GENERAL] },
      { id: 'design', title: labels.design, icon: 'mdi:palette-outline', areas: [ConfigArea.DESIGN] },
      { id: 'player', title: labels.player, icon: 'mdi:play-circle-outline', areas: [ConfigArea.PLAYER] },
      { id: 'devices', title: labels.devices, icon: 'mdi:speaker', areas: [ConfigArea.DEVICE_BROWSER] },
      { id: 'library', title: labels.library, icon: 'mdi:music-box-multiple-outline', areas: libraryAreas },
      { id: 'advanced', title: labels.advanced, icon: 'mdi:tune-variant', areas: advancedAreas },
    ];

    return html`
      <div class="crm-settings-shell">
        <div class="crm-settings-heading">
          <ha-icon icon="mdi:music-circle-outline"></ha-icon>
          <div>
            <div class="crm-settings-brand">ControlRoom</div>
            <div class="crm-settings-caption">${labels.settings}</div>
          </div>
        </div>
        <nav class="crm-settings-nav" aria-label=${labels.choose}>
          ${groups.map((group) => {
            const active = group.areas.includes(this.configArea);
            return html`
              <div class="crm-settings-group">
                <button
                  type="button"
                  class="crm-settings-category ${active ? 'active' : ''}"
                  aria-expanded=${active && group.areas.length > 1 ? 'true' : 'false'}
                  @click=${() => {
                    if (!active) this.onConfigSectionClick(group.areas[0]);
                  }}
                >
                  <ha-icon icon=${group.icon}></ha-icon>
                  <span>${group.title}</span>
                  <ha-icon class="crm-settings-chevron" icon=${active && group.areas.length > 1 ? 'mdi:chevron-down' : 'mdi:chevron-right'}></ha-icon>
                </button>
                ${active && group.areas.length > 1 ? html`
                  <div class="crm-settings-subnav">
                    ${group.areas.map((area) => html`
                      <button
                        type="button"
                        class="crm-settings-subitem ${this.configArea === area ? 'selected' : ''}"
                        aria-current=${this.configArea === area ? 'page' : 'false'}
                        @click=${() => this.onConfigSectionClick(area)}
                      >
                        ${translate(
                          `editor.${String(area).toLowerCase().replace(/[^a-z]/g, '')}`,
                          this.config.language ?? 'auto',
                          this.hass.locale?.language || this.hass.language
                        )}
                      </button>
                    `)}
                  </div>
                ` : ''}
              </div>
            `;
          })}
        </nav>
        <div class="crm-settings-divider"></div>
        <div class="crm-card-editor">
          ${this.subEditor()}
        </div>
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
      .crm-settings-shell { min-width: 0; color: var(--primary-text-color); }
      .crm-settings-heading {
        display: flex; align-items: center; gap: 12px;
        padding: 10px 4px 16px;
      }
      .crm-settings-heading > ha-icon { color: var(--primary-color); --mdc-icon-size: 28px; }
      .crm-settings-brand { font-size: 16px; font-weight: 650; letter-spacing: -0.02em; }
      .crm-settings-caption { margin-top: 3px; font-size: 12px; color: var(--secondary-text-color); }
      .crm-settings-nav { display: flex; flex-direction: column; gap: 3px; min-width: 0; }
      .crm-settings-category, .crm-settings-subitem {
        width: 100%; box-sizing: border-box; border: 0; font: inherit;
        text-align: left; cursor: pointer; color: var(--primary-text-color);
        background: transparent; transition: background 150ms ease, color 150ms ease;
      }
      .crm-settings-category {
        display: flex; align-items: center; gap: 12px;
        min-height: 46px; padding: 10px 12px; border-radius: 12px;
        font-size: 14px; font-weight: 500;
      }
      .crm-settings-category > ha-icon { --mdc-icon-size: 20px; color: var(--secondary-text-color); }
      .crm-settings-category > span { flex: 1; }
      .crm-settings-category .crm-settings-chevron { --mdc-icon-size: 18px; opacity: 0.6; }
      .crm-settings-category:hover, .crm-settings-subitem:hover {
        background: var(--secondary-background-color);
      }
      .crm-settings-category.active {
        background: var(--secondary-background-color);
        font-weight: 600;
      }
      .crm-settings-category.active > ha-icon:first-child { color: var(--primary-color); }
      .crm-settings-subnav {
        margin: 4px 0 8px 22px; padding-left: 14px;
        border-left: 1px solid var(--divider-color);
        display: flex; flex-direction: column; gap: 2px;
      }
      .crm-settings-subitem {
        min-height: 36px; padding: 8px 12px; border-radius: 9px;
        font-size: 13px; color: var(--secondary-text-color);
      }
      .crm-settings-subitem.selected {
        background: var(--secondary-background-color);
        color: var(--primary-color); font-weight: 600;
      }
      .crm-settings-category:focus-visible, .crm-settings-subitem:focus-visible {
        outline: 2px solid var(--primary-color); outline-offset: 2px;
      }
      .crm-settings-divider { height: 1px; background: var(--divider-color); margin: 16px 0; }
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

    // store selected ConfigArea.
    Store.selectedConfigArea = this.configArea;
  }
}


customElements.define('crm-editor', CardEditor);
