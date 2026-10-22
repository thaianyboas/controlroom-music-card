import { css, html, TemplateResult } from 'lit';

import { BaseEditor } from './base-editor';
import { Section } from '../types/section';
import { EDITOR_DEFAULT_BROWSER_ITEMS_PER_ROW } from '../constants';
import { translate } from '../localization/i18n';

class UserPresetSettingsEditor extends BaseEditor {
  protected render(): TemplateResult {
    super.createStore();

    const t = (key: string): string =>
      translate(
        `editor.userPresetSettings.${key}`,
        this.config.language ?? 'auto',
        this.hass.language,
      );

    const language = this.config.language === 'auto' || !this.config.language
      ? this.hass.language
      : this.config.language;
    const pt = language?.toLowerCase().startsWith('pt');
    const de = language?.toLowerCase().startsWith('de');
    const tr = (ptText: string, deText: string, enText: string): string =>
      pt ? ptText : de ? deText : enText;

    const labels = {
      source: tr('Fonte dos presets', 'Preset-Quelle', 'Preset source'),
      sourceHint: tr('Informe o arquivo que contém seus presets personalizados', 'Datei mit deinen benutzerdefinierten Presets angeben', 'Specify the file containing your custom presets'),
      layout: tr('Organização', 'Anordnung', 'Layout'),
      layoutHint: tr('Defina quantos presets aparecem em cada linha', 'Anzahl der Presets pro Zeile festlegen', 'Choose how many presets appear per row'),
      visibility: tr('Exibição', 'Anzeige', 'Display'),
      visibilityHint: tr('Escolha quais informações aparecem nos itens', 'Sichtbare Informationen der Elemente auswählen', 'Choose which item details are visible'),
      documentation: tr('Ajuda e documentação', 'Hilfe und Dokumentation', 'Help and documentation'),
    };

    const sourceSchema = [
      {
        name: 'userPresetsFile',
        label: t('presetsFile'),
        help: t('presetsFileHelp'),
        required: false,
        type: 'string',
      },
    ];

    const layoutSchema = [
      {
        name: 'userPresetBrowserItemsPerRow',
        label: t('itemsPerRow'),
        help: t('itemsPerRowHelp'),
        required: true,
        type: 'integer',
        default: EDITOR_DEFAULT_BROWSER_ITEMS_PER_ROW,
        valueMin: 1,
        valueMax: 12,
      },
    ];

    const visibilitySchema = [
      {
        name: 'userPresetBrowserItemsHideTitle',
        label: t('hideTitle'),
        required: false,
        selector: { boolean: {} },
      },
      {
        name: 'userPresetBrowserItemsHideSubTitle',
        label: t('hideSubtitle'),
        help: t('hideSubtitleHelp'),
        required: false,
        selector: { boolean: {} },
      },
    ];

    return html`
      <div class="studio-presets">
        <p class="studio-description">${t('description')}</p>

        <section class="studio-panel">
          <div class="studio-panel-heading">
            <span class="studio-icon"><ha-icon icon="mdi:file-document-outline"></ha-icon></span>
            <div class="studio-heading-copy">
              <strong>${labels.source}</strong>
              <small>${labels.sourceHint}</small>
            </div>
          </div>
          <crm-editor-form
            .schema=${sourceSchema}
            .section=${Section.USERPRESETS}
            .store=${this.store}
            .config=${this.config}
            .hass=${this.hass}
          ></crm-editor-form>
        </section>

        <section class="studio-panel">
          <div class="studio-panel-heading">
            <span class="studio-icon"><ha-icon icon="mdi:view-grid-outline"></ha-icon></span>
            <div class="studio-heading-copy">
              <strong>${labels.layout}</strong>
              <small>${labels.layoutHint}</small>
            </div>
          </div>
          <crm-editor-form
            .schema=${layoutSchema}
            .section=${Section.USERPRESETS}
            .store=${this.store}
            .config=${this.config}
            .hass=${this.hass}
          ></crm-editor-form>
        </section>

        <section class="studio-panel">
          <div class="studio-panel-heading">
            <span class="studio-icon"><ha-icon icon="mdi:eye-outline"></ha-icon></span>
            <div class="studio-heading-copy">
              <strong>${labels.visibility}</strong>
              <small>${labels.visibilityHint}</small>
            </div>
          </div>
          <crm-editor-form
            .schema=${visibilitySchema}
            .section=${Section.USERPRESETS}
            .store=${this.store}
            .config=${this.config}
            .hass=${this.hass}
          ></crm-editor-form>
        </section>

        <div class="documentation-panel">
          <div class="documentation-heading">
            <ha-icon icon="mdi:book-open-page-variant-outline"></ha-icon>
            <strong>${labels.documentation}</strong>
          </div>
          <p class="studio-documentation">
            ${t('documentationNotice')}
            <a
              href="https://github.com/thlucas1/spotifyplus_card/wiki/Configuration-Options#userpresets-user-preset-content-items"
              target="_blank"
              rel="noopener noreferrer"
            >${t('documentationLink')}</a>
            ${t('documentationSuffix')}
          </p>
        </div>
      </div>
    `;
  }

  static get styles() {
    return css`
      :host { display: block; min-width: 0; }
      * { box-sizing: border-box; }
      .studio-presets { display: grid; gap: 11px; min-width: 0; }
      .studio-description {
        margin: 0 2px 3px;
        color: var(--secondary-text-color);
        font-size: 12px;
        line-height: 1.5;
      }
      .studio-panel {
        min-width: 0;
        padding: 14px;
        border: 1px solid var(--divider-color, rgba(128,128,128,.2));
        border-radius: 14px;
        background: var(--card-background-color, var(--ha-card-background, transparent));
      }
      .studio-panel-heading {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 13px;
        padding-bottom: 12px;
        border-bottom: 1px solid var(--divider-color, rgba(128,128,128,.2));
      }
      .studio-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 0 0 35px;
        width: 35px;
        height: 35px;
        border-radius: 10px;
        background: color-mix(in srgb, var(--primary-color, #1db954) 10%, transparent);
        color: var(--primary-color, #1db954);
      }
      .studio-icon ha-icon { --mdc-icon-size: 19px; }
      .studio-heading-copy { display: grid; gap: 3px; min-width: 0; }
      .studio-heading-copy strong {
        color: var(--primary-text-color);
        font-size: 13px;
        font-weight: 650;
      }
      .studio-heading-copy small {
        color: var(--secondary-text-color);
        font-size: 11px;
        line-height: 1.35;
      }
      .documentation-panel {
        padding: 13px 14px;
        border: 1px solid var(--divider-color, rgba(128,128,128,.2));
        border-radius: 14px;
        background: var(--secondary-background-color, rgba(128,128,128,.06));
      }
      .documentation-heading {
        display: flex;
        align-items: center;
        gap: 8px;
        color: var(--primary-text-color);
        font-size: 12px;
      }
      .documentation-heading ha-icon {
        --mdc-icon-size: 18px;
        color: var(--primary-color, #1db954);
      }
      .studio-documentation {
        margin: 8px 0 0;
        color: var(--secondary-text-color);
        font-size: 12px;
        line-height: 1.6;
      }
      .studio-documentation a {
        color: var(--primary-color, #1db954);
        text-decoration: underline;
        text-underline-offset: 2px;
      }
      crm-editor-form { display: block; min-width: 0; }
      @media (max-width: 340px) {
        .studio-panel { padding: 10px; }
      }
    `;
  }
}

customElements.define(
  'crm-userpreset-browser-editor',
  UserPresetSettingsEditor,
);
