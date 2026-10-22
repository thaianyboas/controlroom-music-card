import { css, html, TemplateResult } from 'lit';

import { BaseEditor } from './base-editor';
import { Section } from '../types/section';
import { EDITOR_DEFAULT_BROWSER_ITEMS_PER_ROW } from '../constants';
import { translate } from '../localization/i18n';

class RecentSettingsEditor extends BaseEditor {
  protected render(): TemplateResult {
    super.createStore();

    const t = (key: string): string =>
      translate(
        `editor.recentBrowserSettings.${key}`,
        this.config.language ?? 'auto',
        this.hass.language,
      );

    const language = this.config.language === 'auto' || !this.config.language
      ? this.hass.language
      : this.config.language;
    const pt = language?.toLowerCase().startsWith('pt');
    const de = language?.toLowerCase().startsWith('de');
    const tr = (ptText: string, deText: string, enText: string) =>
      pt ? ptText : de ? deText : enText;

    const labels = {
      identity: tr('Identificação', 'Bezeichnungen', 'Identification'),
      identityHint: tr('Personalize o título e o subtítulo desta seção', 'Titel und Untertitel dieses Bereichs anpassen', 'Customize the section title and subtitle'),
      preview: tr('Prévia da seção', 'Bereichsvorschau', 'Section preview'),
      defaultTitle: tr('Reproduzidos recentemente', 'Zuletzt wiedergegeben', 'Recently played'),
      defaultSubtitle: tr('Seu histórico recente do Spotify', 'Dein letzter Spotify-Verlauf', 'Your recent Spotify history'),
      layout: tr('Organização', 'Anordnung', 'Layout'),
      layoutHint: tr('Defina a quantidade de itens exibidos por linha', 'Anzahl der Elemente pro Zeile festlegen', 'Set the number of items per row'),
      display: tr('Exibição', 'Anzeige', 'Display'),
      displayHint: tr('Escolha quais textos aparecem nos itens', 'Sichtbare Texte der Elemente auswählen', 'Choose which item labels are visible'),
      refresh: tr('Atualização', 'Aktualisierung', 'Refresh'),
      refreshHint: tr('Controle a atualização ao abrir esta seção', 'Aktualisierung beim Öffnen dieses Bereichs steuern', 'Control refreshing when this section opens'),
      visibility: tr('Visibilidade', 'Sichtbarkeit', 'Visibility'),
      refreshGroup: tr('Carregamento', 'Ladeverhalten', 'Loading behavior'),
    };

    const identitySchema = [
      {
        name: 'recentBrowserTitle',
        label: t('title'),
        help: t('titleHelp'),
        required: false,
        type: 'string',
      },
      {
        name: 'recentBrowserSubTitle',
        label: t('subtitle'),
        help: t('subtitleHelp'),
        required: false,
        type: 'string',
      },
    ];

    const layoutSchema = [
      {
        name: 'recentBrowserItemsPerRow',
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
        name: 'recentBrowserItemsHideTitle',
        label: t('hideTitle'),
        required: false,
        selector: { boolean: {} },
      },
      {
        name: 'recentBrowserItemsHideSubTitle',
        label: t('hideSubtitle'),
        help: t('hideSubtitleHelp'),
        required: false,
        selector: { boolean: {} },
      },
    ];

    const refreshSchema = [
      {
        name: 'recentBrowserItemsRefreshOnEntry',
        label: t('refreshOnEntry'),
        required: false,
        selector: { boolean: {} },
      },
    ];

    const previewTitle = this.config.recentBrowserTitle || labels.defaultTitle;
    const previewSubtitle = this.config.recentBrowserSubTitle || labels.defaultSubtitle;

    return html`
      <div class="studio-recents">
        <p class="studio-description">${t('description')}</p>

        <section class="studio-panel">
          <div class="studio-panel-heading">
            <span class="studio-icon"><ha-icon icon="mdi:form-textbox"></ha-icon></span>
            <div class="studio-heading-copy">
              <strong>${labels.identity}</strong>
              <small>${labels.identityHint}</small>
            </div>
          </div>
          <div class="section-preview" aria-label=${labels.preview}>
            <span class="preview-icon"><ha-icon icon="mdi:history"></ha-icon></span>
            <div class="preview-copy">
              <span class="preview-eyebrow">${labels.preview}</span>
              <strong>${previewTitle}</strong>
              <small>${previewSubtitle}</small>
            </div>
          </div>
          <crm-editor-form
            .schema=${identitySchema}
            .section=${Section.RECENTS}
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
            .section=${Section.RECENTS}
            .store=${this.store}
            .config=${this.config}
            .hass=${this.hass}
          ></crm-editor-form>
        </section>

        <section class="studio-panel">
          <div class="studio-panel-heading">
            <span class="studio-icon"><ha-icon icon="mdi:eye-outline"></ha-icon></span>
            <div class="studio-heading-copy">
              <strong>${labels.display}</strong>
              <small>${labels.displayHint}</small>
            </div>
          </div>
          <div class="studio-subheading">
            <ha-icon icon="mdi:format-text"></ha-icon>
            <span>${labels.visibility}</span>
          </div>
          <crm-editor-form
            .schema=${visibilitySchema}
            .section=${Section.RECENTS}
            .store=${this.store}
            .config=${this.config}
            .hass=${this.hass}
          ></crm-editor-form>
        </section>

        <section class="studio-panel">
          <div class="studio-panel-heading">
            <span class="studio-icon"><ha-icon icon="mdi:refresh"></ha-icon></span>
            <div class="studio-heading-copy">
              <strong>${labels.refresh}</strong>
              <small>${labels.refreshHint}</small>
            </div>
          </div>
          <div class="studio-subheading">
            <ha-icon icon="mdi:cloud-sync-outline"></ha-icon>
            <span>${labels.refreshGroup}</span>
          </div>
          <crm-editor-form
            .schema=${refreshSchema}
            .section=${Section.RECENTS}
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
      .studio-recents { display: grid; gap: 12px; min-width: 0; }
      .studio-description {
        margin: 0 2px 3px;
        color: var(--secondary-text-color);
        font-size: 12px;
        line-height: 1.5;
      }
      .studio-panel {
        min-width: 0;
        padding: 15px;
        border: 1px solid var(--divider-color, rgba(128,128,128,.2));
        border-radius: 15px;
        background: var(--card-background-color, var(--ha-card-background, transparent));
      }
      .studio-panel-heading {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 14px;
        padding-bottom: 12px;
        border-bottom: 1px solid var(--divider-color, rgba(128,128,128,.2));
      }
      .studio-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 0 0 36px;
        width: 36px;
        height: 36px;
        border-radius: 11px;
        background: color-mix(in srgb, var(--primary-color, #1db954) 12%, transparent);
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
        line-height: 1.4;
      }
      .section-preview {
        display: flex;
        align-items: center;
        gap: 12px;
        min-width: 0;
        margin-bottom: 14px;
        padding: 13px;
        border: 1px solid color-mix(in srgb, var(--primary-color, #1db954) 24%, var(--divider-color, transparent));
        border-radius: 12px;
        background: color-mix(in srgb, var(--primary-color, #1db954) 6%, var(--card-background-color, transparent));
      }
      .preview-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 0 0 43px;
        width: 43px;
        height: 43px;
        border-radius: 12px;
        background: color-mix(in srgb, var(--primary-color, #1db954) 15%, transparent);
        color: var(--primary-color, #1db954);
      }
      .preview-icon ha-icon { --mdc-icon-size: 23px; }
      .preview-copy { display: grid; gap: 3px; min-width: 0; }
      .preview-eyebrow {
        color: var(--primary-color, #1db954);
        font-size: 10px;
        font-weight: 650;
        letter-spacing: .035em;
      }
      .preview-copy strong {
        color: var(--primary-text-color);
        font-size: 13px;
        overflow-wrap: anywhere;
      }
      .preview-copy small {
        color: var(--secondary-text-color);
        font-size: 11px;
        overflow-wrap: anywhere;
      }
      .studio-subheading {
        display: flex;
        align-items: center;
        gap: 7px;
        margin: 0 0 10px;
        color: var(--secondary-text-color);
        font-size: 11px;
        font-weight: 600;
      }
      .studio-subheading ha-icon {
        --mdc-icon-size: 16px;
        color: var(--primary-color, #1db954);
      }
      crm-editor-form { display: block; min-width: 0; }
      @media (max-width: 340px) { .studio-panel { padding: 10px; } }
    `;
  }
}

customElements.define('crm-recent-browser-editor', RecentSettingsEditor);
