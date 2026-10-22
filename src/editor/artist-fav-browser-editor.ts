import { css, html, TemplateResult } from 'lit';

import { BaseEditor } from './base-editor';
import { Section } from '../types/section';
import { EDITOR_DEFAULT_BROWSER_ITEMS_PER_ROW } from '../constants';
import { translate } from '../localization/i18n';

class ArtistFavBrowserEditor extends BaseEditor {
  protected render(): TemplateResult {
    super.createStore();

    const t = (key: string): string =>
      translate(
        `editor.artistFavoritesSettings.${key}`,
        this.config.language ?? 'auto',
        this.hass?.locale?.language || this.hass?.language || 'en',
      );

    const language = this.config.language === 'auto' || !this.config.language
      ? this.hass?.locale?.language || this.hass?.language || 'en'
      : this.config.language;
    const pt = language.toLowerCase().startsWith('pt');
    const de = language.toLowerCase().startsWith('de');
    const tr = (ptText: string, deText: string, enText: string) =>
      pt ? ptText : de ? deText : enText;

    const layoutSchema = [
      { name: 'artistFavBrowserItemsLimit', label: t('itemsLimit'), help: t('itemsLimitHelp'), required: false, type: 'integer', default: 200, valueMin: 1, valueMax: 1000 },
      { name: 'artistFavBrowserItemsPerRow', label: t('itemsPerRow'), help: t('itemsPerRowHelp'), required: true, type: 'integer', default: EDITOR_DEFAULT_BROWSER_ITEMS_PER_ROW, valueMin: 1, valueMax: 12 },
    ];

    const visibilitySchema = [
      { name: 'artistFavBrowserItemsHideTitle', label: t('hideTitle'), required: false, selector: { boolean: {} } },
      { name: 'artistFavBrowserItemsHideSubTitle', label: t('hideSubtitle'), help: t('hideSubtitleHelp'), required: false, selector: { boolean: {} } },
    ];
    const playbackSchema = [
      { name: 'artistFavBrowserItemsSortTitle', label: t('sortTitle'), required: false, selector: { boolean: {} } },
      { name: 'artistFavBrowserShuffleOnPlay', label: t('shuffleOnPlay'), required: false, selector: { boolean: {} } },
    ];
    const refreshSchema = [
      { name: 'artistFavBrowserItemsRefreshOnEntry', label: t('refreshOnEntry'), required: false, selector: { boolean: {} } },
    ];

    const form = (schema: Array<any>) => html`
      <crm-editor-form
        .schema=${schema}
        .section=${Section.ARTIST_FAVORITES}
        .store=${this.store}
        .config=${this.config}
        .hass=${this.hass}
        @value-changed=${this.onValueChanged}
      ></crm-editor-form>
    `;

    return html`
      <div class="studio-artists">
        <div class="intro">
          <span class="intro-icon"><ha-icon icon="mdi:account-music-outline"></ha-icon></span>
          <div>
            <strong>${tr('Artistas favoritos', 'Lieblingskünstler', 'Favorite artists')}</strong>
            <small>${t('description')}</small>
          </div>
        </div>

        <section class="studio-panel">
          <div class="studio-panel-heading">
            <span class="studio-icon"><ha-icon icon="mdi:view-grid-outline"></ha-icon></span>
            <div class="studio-heading-copy">
              <strong>${tr('Organização', 'Anordnung', 'Layout')}</strong>
              <small>${tr('Quantidade e disposição dos artistas', 'Anzahl und Anordnung der Künstler', 'Artist count and arrangement')}</small>
            </div>
          </div>
          ${form(layoutSchema)}
        </section>

        <section class="studio-panel">
          <div class="studio-panel-heading">
            <span class="studio-icon"><ha-icon icon="mdi:tune-variant"></ha-icon></span>
            <div class="studio-heading-copy">
              <strong>${tr('Exibição e reprodução', 'Anzeige und Wiedergabe', 'Display and playback')}</strong>
              <small>${tr('Visibilidade, ordenação e atualização', 'Sichtbarkeit, Sortierung und Aktualisierung', 'Visibility, sorting and refresh')}</small>
            </div>
          </div>
          <div class="subsection">
            <div class="subsection-heading"><ha-icon icon="mdi:eye-outline"></ha-icon><strong>${tr('Visibilidade', 'Sichtbarkeit', 'Visibility')}</strong></div>
            ${form(visibilitySchema)}
          </div>
          <div class="subsection">
            <div class="subsection-heading"><ha-icon icon="mdi:sort-alphabetical-ascending"></ha-icon><strong>${tr('Ordenação e reprodução', 'Sortierung und Wiedergabe', 'Sorting and playback')}</strong></div>
            ${form(playbackSchema)}
          </div>
          <div class="subsection last">
            <div class="subsection-heading"><ha-icon icon="mdi:refresh"></ha-icon><strong>${tr('Atualização', 'Aktualisierung', 'Refresh')}</strong></div>
            ${form(refreshSchema)}
          </div>
        </section>
      </div>
    `;
  }

  static get styles() {
    return css`
      :host { display: block; min-width: 0; --studio-accent: var(--success-color, #38c997); }
      * { box-sizing: border-box; }
      .studio-artists { display: grid; gap: 12px; min-width: 0; }
      .intro { display: flex; align-items: center; gap: 11px; padding: 3px 2px 5px; }
      .intro-icon { display: grid; place-items: center; flex: 0 0 42px; height: 42px; border-radius: 13px; color: var(--studio-accent); background: color-mix(in srgb, var(--studio-accent) 12%, transparent); }
      .intro-icon ha-icon { --mdc-icon-size: 23px; }
      .intro > div { display: grid; gap: 4px; min-width: 0; }
      .intro strong { color: var(--primary-text-color); font-size: 14px; }
      .intro small { color: var(--secondary-text-color); font-size: 11px; line-height: 1.45; }
      .studio-panel { min-width: 0; padding: 15px; border: 1px solid var(--divider-color, rgba(128,128,128,.2)); border-radius: 14px; background: var(--card-background-color, var(--ha-card-background, transparent)); }
      .studio-panel-heading { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; padding-bottom: 13px; border-bottom: 1px solid var(--divider-color, rgba(128,128,128,.2)); }
      .studio-icon { display: grid; place-items: center; flex: 0 0 36px; height: 36px; border-radius: 11px; background: color-mix(in srgb, var(--studio-accent) 11%, var(--secondary-background-color)); color: var(--studio-accent); }
      .studio-icon ha-icon { --mdc-icon-size: 19px; }
      .studio-heading-copy { display: grid; gap: 3px; min-width: 0; }
      .studio-heading-copy strong { color: var(--primary-text-color); font-size: 13px; font-weight: 650; }
      .studio-heading-copy small { color: var(--secondary-text-color); font-size: 11px; line-height: 1.4; }
      crm-editor-form { display: block; min-width: 0; }
      .subsection { padding: 0 0 14px; margin-bottom: 14px; border-bottom: 1px solid var(--divider-color, rgba(128,128,128,.16)); }
      .subsection.last { padding-bottom: 0; margin-bottom: 0; border-bottom: 0; }
      .subsection-heading { display: flex; align-items: center; gap: 8px; margin-bottom: 9px; color: var(--secondary-text-color); }
      .subsection-heading ha-icon { --mdc-icon-size: 17px; color: var(--studio-accent); }
      .subsection-heading strong { font-size: 11px; font-weight: 650; }
      @media (max-width: 340px) { .studio-panel { padding: 11px; } }
    `;
  }

  protected onValueChanged(args: CustomEvent): void {
    if (args) {
      // The shared editor form handles configuration updates.
    }
  }
}

customElements.define('crm-artist-fav-browser-editor', ArtistFavBrowserEditor);
