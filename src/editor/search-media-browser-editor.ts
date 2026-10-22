import { css, html, TemplateResult } from 'lit';

import { BaseEditor } from './base-editor';
import { Section } from '../types/section';
import { EDITOR_DEFAULT_BROWSER_ITEMS_PER_ROW } from '../constants';
import { translate } from '../localization/i18n';

class SearchMediaBrowserEditor extends BaseEditor {
  private setField(name: string, value: string | number | boolean | string[]): void {
    this.configChanged({ ...this.config, [name]: value });
  }

  protected render(): TemplateResult {
    super.createStore();

    const t = (key: string): string =>
      translate(
        `editor.searchMediaSettings.${key}`,
        this.config.language ?? 'auto',
        this.hass.language,
      );

    const language = this.config.language === 'auto' || !this.config.language
      ? this.hass.locale?.language || this.hass.language || 'en'
      : this.config.language;
    const pt = language.toLowerCase().startsWith('pt');
    const de = language.toLowerCase().startsWith('de');
    const tr = (p: string, d: string, e: string): string => pt ? p : de ? d : e;

    const types = [
      { value: 'Albums', icon: 'mdi:album', label: t('albums') },
      { value: 'Artists', icon: 'mdi:account-music', label: t('artists') },
      { value: 'AudioBooks', icon: 'mdi:book-open-variant', label: t('audiobooks') },
      { value: 'Episodes', icon: 'mdi:podcast', label: t('episodes') },
      { value: 'Playlists', icon: 'mdi:playlist-music', label: t('playlists') },
      { value: 'Shows', icon: 'mdi:radio-tower', label: t('shows') },
      { value: 'Tracks', icon: 'mdi:music-note', label: t('tracks') },
    ];

    // The form retains the original schema so its existing defaults and
    // SpotifyPlus multi-select serialization remain unchanged.
    const searchTypesSchema = [{
      name: 'searchMediaBrowserSearchTypes',
      label: t('searchTypes'),
      help: t('searchTypesHelp'),
      required: false,
      type: 'multi_select',
      options: Object.fromEntries(types.map(type => [type.value, type.label])),
    }];

    const useGlobalSchema = [{
      name: 'searchMediaBrowserUseDisplaySettings',
      label: t('useDisplaySettings'),
      required: false,
      selector: { boolean: {} },
    }];

    const behaviorSchema = [
      {
        name: 'searchMediaBrowserItemsHideTitle',
        label: t('hideTitle'),
        required: false,
        selector: { boolean: {} },
      },
      {
        name: 'searchMediaBrowserItemsHideSubTitle',
        label: t('hideSubtitle'),
        help: t('hideSubtitleHelp'),
        required: false,
        selector: { boolean: {} },
      },
      {
        name: 'searchMediaBrowserQueueSelection',
        label: t('queueSelection'),
        help: t('queueSelectionHelp'),
        required: false,
        selector: { boolean: {} },
      },
    ];

    const limitRaw = Number(this.config.searchMediaBrowserSearchLimit ?? 50);
    const limit = Number.isFinite(limitRaw) ? Math.min(500, Math.max(25, limitRaw)) : 50;
    const columnsRaw = Number(this.config.searchMediaBrowserItemsPerRow ?? EDITOR_DEFAULT_BROWSER_ITEMS_PER_ROW);
    const columns = Number.isFinite(columnsRaw) ? Math.min(12, Math.max(1, columnsRaw)) : EDITOR_DEFAULT_BROWSER_ITEMS_PER_ROW;

    return html`
      <div class="studio-search">
        <p class="studio-description">${t('description')}</p>

        <section class="studio-panel">
          <div class="studio-panel-heading">
            <span class="studio-icon"><ha-icon icon="mdi:magnify"></ha-icon></span>
            <div class="studio-heading-copy">
              <strong>${tr('Pesquisa', 'Suche', 'Search')}</strong>
              <small>${tr('Escolha os tipos de mídia e a quantidade de resultados.', 'Medientypen und Anzahl der Ergebnisse auswählen.', 'Choose media types and the number of results.')}</small>
            </div>
          </div>
          <div class="field-heading">${t('searchTypes')}</div>
          <div class="media-types-preview" aria-hidden="true">
            ${types.map(type => html`
              <span class="media-type"><ha-icon icon=${type.icon}></ha-icon>${type.label}</span>
            `)}
          </div>
          <crm-editor-form
            .schema=${searchTypesSchema}
            .section=${Section.SEARCH_MEDIA}
            .store=${this.store}
            .config=${this.config}
            .hass=${this.hass}
          ></crm-editor-form>
          <div class="subsection">
            <div class="slider-heading">
              <div>
                <div class="field-heading">${t('searchLimit')}</div>
                <div class="field-help">${tr('Resultados por pesquisa', 'Ergebnisse pro Suche', 'Results per search')}</div>
              </div>
              <span class="value-pill">${limit}</span>
            </div>
            <input class="range" type="range" min="25" max="500" step="25"
              .value=${String(limit)}
              aria-label=${t('searchLimit')}
              @change=${(event: Event) => this.setField('searchMediaBrowserSearchLimit', Number((event.currentTarget as HTMLInputElement).value))}
            />
            <div class="range-labels"><span>25</span><span>500</span></div>
            <label class="number-field">
              <span>${tr('Valor exato', 'Genauer Wert', 'Exact value')}</span>
              <input type="number" min="25" max="500" step="1" .value=${String(limit)}
                @change=${(event: Event) => {
                  const input = event.currentTarget as HTMLInputElement;
                  const value = Number(input.value);
                  if (Number.isFinite(value)) this.setField('searchMediaBrowserSearchLimit', Math.max(25, Math.min(500, Math.round(value))));
                }}
              />
            </label>
          </div>
        </section>

        <section class="studio-panel">
          <div class="studio-panel-heading">
            <span class="studio-icon"><ha-icon icon="mdi:view-grid-outline"></ha-icon></span>
            <div class="studio-heading-copy">
              <strong>${tr('Organização', 'Anordnung', 'Layout')}</strong>
              <small>${tr('Defina como os resultados aparecem na grade.', 'Darstellung der Suchergebnisse festlegen.', 'Control how search results appear in the grid.')}</small>
            </div>
          </div>
          <crm-editor-form
            .schema=${useGlobalSchema}
            .section=${Section.SEARCH_MEDIA}
            .store=${this.store}
            .config=${this.config}
            .hass=${this.hass}
          ></crm-editor-form>
          <div class="subsection">
            <div class="slider-heading">
              <div>
                <div class="field-heading">${t('itemsPerRow')}</div>
                <div class="field-help">${t('itemsPerRowHelp')}</div>
              </div>
              <span class="value-pill">${columns}</span>
            </div>
            <div class="column-choices">
              ${[2, 3, 4, 5].map(value => html`
                <button type="button" class="column-choice ${columns === value ? 'active' : ''}"
                  aria-pressed=${String(columns === value)}
                  @click=${() => this.setField('searchMediaBrowserItemsPerRow', value)}
                >
                  <span class="mini-grid" style=${`grid-template-columns:repeat(${value},1fr)`}>
                    ${Array.from({ length: value * 2 }, () => html`<i></i>`)}
                  </span>
                  <span>${value}</span>
                </button>
              `)}
            </div>
            <label class="number-field">
              <span>${tr('Outro valor (1–12)', 'Anderer Wert (1–12)', 'Other value (1–12)')}</span>
              <input type="number" min="1" max="12" step="1" .value=${String(columns)}
                @change=${(event: Event) => {
                  const value = Number((event.currentTarget as HTMLInputElement).value);
                  if (Number.isFinite(value)) this.setField('searchMediaBrowserItemsPerRow', Math.max(1, Math.min(12, Math.round(value))));
                }}
              />
            </label>
          </div>
        </section>

        <section class="studio-panel">
          <div class="studio-panel-heading">
            <span class="studio-icon"><ha-icon icon="mdi:eye-outline"></ha-icon></span>
            <div class="studio-heading-copy">
              <strong>${tr('Exibição', 'Anzeige', 'Display')}</strong>
              <small>${tr('Visibilidade dos textos e comportamento da fila.', 'Textanzeige und Verhalten der Warteschlange.', 'Text visibility and queue behavior.')}</small>
            </div>
          </div>
          <crm-editor-form
            .schema=${behaviorSchema}
            .section=${Section.SEARCH_MEDIA}
            .store=${this.store}
            .config=${this.config}
            .hass=${this.hass}
          ></crm-editor-form>
        </section>
      </div>
    `;
  }

  static get styles() {
    return css`
      :host { display: block; min-width: 0; }
      * { box-sizing: border-box; }
      .studio-search { display: grid; gap: 11px; min-width: 0; }
      .studio-description { margin: 0 2px 3px; color: var(--secondary-text-color); font-size: 12px; line-height: 1.5; }
      .studio-panel { min-width: 0; padding: 14px; border: 1px solid var(--divider-color, rgba(128,128,128,.2)); border-radius: 14px; background: var(--card-background-color, var(--ha-card-background, transparent)); }
      .studio-panel-heading { display: flex; align-items: center; gap: 10px; margin-bottom: 13px; padding-bottom: 12px; border-bottom: 1px solid var(--divider-color, rgba(128,128,128,.2)); }
      .studio-icon { display: flex; justify-content: center; align-items: center; flex: 0 0 35px; width: 35px; height: 35px; border-radius: 10px; background: var(--secondary-background-color, rgba(128,128,128,.12)); color: var(--primary-color, #34d399); }
      .studio-icon ha-icon { --mdc-icon-size: 19px; }
      .studio-heading-copy { display: grid; gap: 3px; min-width: 0; }
      .studio-heading-copy strong { color: var(--primary-text-color); font-size: 13px; font-weight: 650; }
      .studio-heading-copy small { color: var(--secondary-text-color); font-size: 11px; line-height: 1.35; }
      .field-heading { font-size: 12px; font-weight: 650; color: var(--primary-text-color); }
      .field-help { margin-top: 3px; font-size: 11px; line-height: 1.4; color: var(--secondary-text-color); }
      .media-types-preview { display: flex; flex-wrap: wrap; gap: 6px; margin: 10px 0; }
      .media-type { display: inline-flex; align-items: center; gap: 5px; padding: 6px 8px; border-radius: 8px; background: var(--secondary-background-color, rgba(128,128,128,.1)); color: var(--secondary-text-color); font-size: 10px; }
      .media-type ha-icon { --mdc-icon-size: 14px; }
      .subsection { margin-top: 16px; padding-top: 14px; border-top: 1px solid var(--divider-color, rgba(128,128,128,.2)); }
      .slider-heading { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; margin-bottom: 12px; }
      .value-pill { display: inline-flex; align-items: center; justify-content: center; min-width: 45px; padding: 6px 10px; border: 1px solid var(--primary-color, #34d399); border-radius: 9px; color: var(--primary-color, #34d399); font-size: 13px; font-weight: 700; font-variant-numeric: tabular-nums; }
      .range { display: block; width: 100%; accent-color: var(--primary-color, #34d399); cursor: pointer; }
      .range-labels { display: flex; justify-content: space-between; margin: 4px 0 12px; color: var(--secondary-text-color); font-size: 10px; }
      .column-choices { display: grid; grid-template-columns: repeat(4, minmax(0,1fr)); gap: 8px; margin-top: 12px; }
      .column-choice { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 7px; min-width: 0; min-height: 65px; border: 1px solid var(--divider-color, rgba(128,128,128,.2)); border-radius: 10px; background: var(--secondary-background-color, rgba(128,128,128,.08)); color: var(--primary-text-color); font: inherit; font-size: 11px; cursor: pointer; }
      .column-choice.active { border: 2px solid var(--primary-color, #34d399); }
      .mini-grid { display: grid; gap: 2px; width: 38px; }
      .mini-grid i { display: block; height: 9px; border-radius: 2px; background: var(--secondary-text-color); opacity: .55; }
      .column-choice.active .mini-grid i { background: var(--primary-color, #34d399); opacity: 1; }
      .number-field { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-top: 12px; color: var(--secondary-text-color); font-size: 11px; }
      .number-field input { width: 82px; height: 36px; padding: 0 8px; border: 1px solid var(--divider-color, rgba(128,128,128,.2)); border-radius: 8px; background: var(--secondary-background-color, rgba(128,128,128,.08)); color: var(--primary-text-color); font: inherit; font-size: 12px; text-align: center; }
      button:focus-visible, input:focus-visible { outline: 2px solid var(--primary-color, #34d399); outline-offset: 2px; }
      crm-editor-form { display: block; min-width: 0; }
      @media (max-width: 340px) { .studio-panel { padding: 10px; } .column-choices { gap: 5px; } }
    `;
  }
}

customElements.define('crm-search-media-browser-editor', SearchMediaBrowserEditor);
