import { css, html, TemplateResult } from 'lit';

import { BaseEditor } from './base-editor';
import { Section } from '../types/section';
import { EDITOR_DEFAULT_BROWSER_ITEMS_PER_ROW } from '../constants';
import { translate } from '../localization/i18n';

class AudiobookFavBrowserEditor extends BaseEditor {
  protected render(): TemplateResult {
    super.createStore();

    const t = (key: string): string =>
      translate(
        `editor.audiobookFavoritesSettings.${key}`,
        this.config.language ?? 'auto',
        this.hass?.locale?.language || this.hass?.language || 'en',
      );

    const language = this.config.language === 'auto' || !this.config.language
      ? this.hass?.locale?.language || this.hass?.language || 'en'
      : this.config.language;
    const pt = language.toLowerCase().startsWith('pt');
    const de = language.toLowerCase().startsWith('de');
    const tr = (p: string, d: string, e: string): string => pt ? p : de ? d : e;

    const identitySchema = [
      { name: 'audiobookFavBrowserTitle', label: t('title'), help: t('titleHelp'), required: false, type: 'string' },
      { name: 'audiobookFavBrowserSubTitle', label: t('subtitle'), help: t('subtitleHelp'), required: false, type: 'string' },
    ];
    const layoutSchema = [
      { name: 'audiobookFavBrowserItemsLimit', label: t('itemsLimit'), help: t('itemsLimitHelp'), required: false, type: 'integer', default: 200, valueMin: 1, valueMax: 1000 },
      { name: 'audiobookFavBrowserItemsPerRow', label: t('itemsPerRow'), help: t('itemsPerRowHelp'), required: true, type: 'integer', default: EDITOR_DEFAULT_BROWSER_ITEMS_PER_ROW, valueMin: 1, valueMax: 12 },
    ];
    const visibilitySchema = [
      { name: 'audiobookFavBrowserItemsHideTitle', label: t('hideTitle'), required: false, selector: { boolean: {} } },
      { name: 'audiobookFavBrowserItemsHideSubTitle', label: t('hideSubtitle'), help: t('hideSubtitleHelp'), required: false, selector: { boolean: {} } },
    ];
    const organizationSchema = [
      { name: 'audiobookFavBrowserItemsSortTitle', label: t('sortTitle'), required: false, selector: { boolean: {} } },
      { name: 'audiobookFavBrowserItemsRefreshOnEntry', label: t('refreshOnEntry'), required: false, selector: { boolean: {} } },
    ];

    const form = (schema: Array<Record<string, unknown>>): TemplateResult => html`
      <crm-editor-form
        .schema=${schema}
        .section=${Section.AUDIOBOOK_FAVORITES}
        .store=${this.store}
        .config=${this.config}
        .hass=${this.hass}
        @value-changed=${this.onValueChanged}
      ></crm-editor-form>
    `;

    const previewTitle = String(this.config.audiobookFavBrowserTitle || tr('Audiolivros favoritos', 'Lieblingshörbücher', 'Favorite audiobooks'));
    const previewSubtitle = String(this.config.audiobookFavBrowserSubTitle || tr('Sua biblioteca de audiolivros', 'Deine Hörbuchbibliothek', 'Your audiobook library'));

    return html`
      <div class="studio-audiobooks">
        <div class="intro">
          <span class="intro-icon"><ha-icon icon="mdi:book-music-outline"></ha-icon></span>
          <div>
            <strong>${tr('Audiolivros favoritos', 'Lieblingshörbücher', 'Favorite audiobooks')}</strong>
            <small>${t('description')}</small>
          </div>
        </div>

        <section class="studio-panel">
          <div class="studio-panel-heading">
            <span class="studio-icon"><ha-icon icon="mdi:form-textbox"></ha-icon></span>
            <div class="studio-heading-copy">
              <strong>${tr('Identificação', 'Bezeichnungen', 'Identification')}</strong>
              <small>${tr('Personalize o título e o subtítulo.', 'Titel und Untertitel anpassen.', 'Customize the title and subtitle.')}</small>
            </div>
          </div>
          ${form(identitySchema)}
          <div class="preview">
            <div class="eyebrow"><ha-icon icon="mdi:eye-outline"></ha-icon>${tr('Prévia da seção', 'Bereichsvorschau', 'Section preview')}</div>
            <div class="preview-content">
              <ha-icon icon="mdi:book-open-variant"></ha-icon>
              <div>
                <strong>${previewTitle}</strong>
                <small>${previewSubtitle}</small>
              </div>
            </div>
          </div>
        </section>

        <section class="studio-panel">
          <div class="studio-panel-heading">
            <span class="studio-icon"><ha-icon icon="mdi:view-grid-outline"></ha-icon></span>
            <div class="studio-heading-copy">
              <strong>${tr('Organização', 'Anordnung', 'Layout')}</strong>
              <small>${tr('Quantidade e disposição dos audiolivros.', 'Anzahl und Anordnung der Hörbücher.', 'Audiobook count and arrangement.')}</small>
            </div>
          </div>
          ${form(layoutSchema)}
        </section>

        <section class="studio-panel">
          <div class="studio-panel-heading">
            <span class="studio-icon"><ha-icon icon="mdi:tune-variant"></ha-icon></span>
            <div class="studio-heading-copy">
              <strong>${tr('Exibição', 'Anzeige', 'Display')}</strong>
              <small>${tr('Controle o que aparece e como a lista é atualizada.', 'Sichtbarkeit, Sortierung und Aktualisierung einstellen.', 'Control visibility, sorting and refresh.')}</small>
            </div>
          </div>
          <div class="subgroup">
            <div class="subgroup-title"><ha-icon icon="mdi:eye-outline"></ha-icon>${tr('Visibilidade', 'Sichtbarkeit', 'Visibility')}</div>
            ${form(visibilitySchema)}
          </div>
          <div class="subgroup">
            <div class="subgroup-title"><ha-icon icon="mdi:sort-alphabetical-ascending"></ha-icon>${tr('Ordenação e atualização', 'Sortierung und Aktualisierung', 'Sorting and refresh')}</div>
            ${form(organizationSchema)}
          </div>
        </section>
      </div>
    `;
  }

  static get styles() {
    return css`
      :host { display: block; min-width: 0; color: var(--primary-text-color); }
      * { box-sizing: border-box; }
      .studio-audiobooks { display: grid; gap: 12px; min-width: 0; }
      .intro { display: flex; align-items: center; gap: 12px; padding: 3px 2px 5px; }
      .intro-icon { width: 40px; height: 40px; flex: 0 0 40px; display: grid; place-items: center; border-radius: 12px; background: color-mix(in srgb, var(--success-color, #27b881) 12%, transparent); color: var(--success-color, #27b881); }
      .intro-icon ha-icon { --mdc-icon-size: 23px; }
      .intro > div { display: grid; gap: 4px; min-width: 0; }
      .intro strong { font-size: 14px; }
      .intro small { font-size: 11px; line-height: 1.5; color: var(--secondary-text-color); }
      .studio-panel { min-width: 0; padding: 15px; border: 1px solid var(--divider-color, rgba(128,128,128,.2)); border-radius: 15px; background: var(--card-background-color, var(--ha-card-background, transparent)); }
      .studio-panel-heading { display: flex; align-items: center; gap: 11px; margin-bottom: 15px; padding-bottom: 13px; border-bottom: 1px solid var(--divider-color, rgba(128,128,128,.2)); }
      .studio-icon { display: grid; place-items: center; flex: 0 0 36px; width: 36px; height: 36px; border-radius: 11px; background: color-mix(in srgb, var(--success-color, #27b881) 10%, var(--secondary-background-color, transparent)); color: var(--success-color, #27b881); }
      .studio-icon ha-icon { --mdc-icon-size: 19px; }
      .studio-heading-copy { display: grid; gap: 4px; min-width: 0; }
      .studio-heading-copy strong { font-size: 13px; font-weight: 650; }
      .studio-heading-copy small { font-size: 11px; line-height: 1.45; color: var(--secondary-text-color); }
      crm-editor-form { display: block; min-width: 0; }
      .preview { margin-top: 15px; padding: 12px; border: 1px solid var(--divider-color, rgba(128,128,128,.18)); border-radius: 11px; background: var(--secondary-background-color, rgba(128,128,128,.07)); }
      .eyebrow { display: flex; align-items: center; gap: 6px; margin-bottom: 11px; color: var(--secondary-text-color); font-size: 10px; font-weight: 600; }
      .eyebrow ha-icon { --mdc-icon-size: 15px; }
      .preview-content { display: flex; align-items: center; gap: 11px; min-width: 0; }
      .preview-content > ha-icon { --mdc-icon-size: 22px; color: var(--success-color, #27b881); }
      .preview-content > div { display: grid; gap: 4px; min-width: 0; }
      .preview-content strong { font-size: 12px; overflow-wrap: anywhere; }
      .preview-content small { font-size: 11px; color: var(--secondary-text-color); overflow-wrap: anywhere; }
      .subgroup + .subgroup { margin-top: 15px; padding-top: 14px; border-top: 1px solid var(--divider-color, rgba(128,128,128,.16)); }
      .subgroup-title { display: flex; align-items: center; gap: 7px; margin-bottom: 11px; font-size: 11px; font-weight: 650; color: var(--secondary-text-color); }
      .subgroup-title ha-icon { --mdc-icon-size: 16px; color: var(--success-color, #27b881); }
      @media (max-width: 340px) { .studio-panel { padding: 11px; } }
    `;
  }

  protected onValueChanged(args: CustomEvent): void {
    if (args) {
      // crm-editor-form already manages the configuration update.
    }
  }
}

customElements.define('crm-audiobook-fav-browser-editor', AudiobookFavBrowserEditor);
