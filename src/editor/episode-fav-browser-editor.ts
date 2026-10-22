import { css, html, TemplateResult } from 'lit';

import { BaseEditor } from './base-editor';
import { Section } from '../types/section';
import { EDITOR_DEFAULT_BROWSER_ITEMS_PER_ROW } from '../constants';
import { translate } from '../localization/i18n';

class EpisodeFavBrowserEditor extends BaseEditor {
  protected render(): TemplateResult {
    super.createStore();

    const language = this.config.language ?? 'auto';
    const hassLanguage = this.hass?.locale?.language || this.hass?.language || 'en';
    const resolvedLanguage = (language === 'auto' ? hassLanguage : language).toLowerCase();
    const pt = resolvedLanguage.startsWith('pt');
    const de = resolvedLanguage.startsWith('de');
    const tr = (ptText: string, deText: string, enText: string): string =>
      pt ? ptText : de ? deText : enText;
    const t = (key: string): string =>
      translate(`editor.episodeFavoritesSettings.${key}`, language, hassLanguage);

    const identitySchema = [
      {
        name: 'episodeFavBrowserTitle',
        label: t('title'),
        help: t('titleHelp'),
        required: false,
        type: 'string',
      },
      {
        name: 'episodeFavBrowserSubTitle',
        label: t('subtitle'),
        help: t('subtitleHelp'),
        required: false,
        type: 'string',
      },
    ];

    const layoutSchema = [
      {
        name: 'episodeFavBrowserItemsLimit',
        label: t('itemsLimit'),
        help: t('itemsLimitHelp'),
        required: false,
        type: 'integer',
        default: 200,
        valueMin: 1,
        valueMax: 1000,
      },
      {
        name: 'episodeFavBrowserItemsPerRow',
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
        name: 'episodeFavBrowserItemsHideTitle',
        label: t('hideTitle'),
        required: false,
        selector: { boolean: {} },
      },
      {
        name: 'episodeFavBrowserItemsHideSubTitle',
        label: t('hideSubtitle'),
        help: t('hideSubtitleHelp'),
        required: false,
        selector: { boolean: {} },
      },
    ];

    const sortingSchema = [
      {
        name: 'episodeFavBrowserItemsSortTitle',
        label: t('sortTitle'),
        required: false,
        selector: { boolean: {} },
      },
      {
        name: 'episodeFavBrowserItemsRefreshOnEntry',
        label: t('refreshOnEntry'),
        required: false,
        selector: { boolean: {} },
      },
    ];

    const title = String(this.config.episodeFavBrowserTitle ||
      tr('Episódios favoritos', 'Lieblingsepisoden', 'Favorite episodes'));
    const subtitle = String(this.config.episodeFavBrowserSubTitle ||
      tr('Sua biblioteca de episódios', 'Deine Episodenbibliothek', 'Your episode library'));

    return html`
      <div class="studio-episodes">
        <div class="studio-intro">
          <span class="intro-icon"><ha-icon icon="mdi:podcast"></ha-icon></span>
          <div>
            <strong>${tr('Episódios favoritos', 'Lieblingsepisoden', 'Favorite episodes')}</strong>
            <small>${t('description')}</small>
          </div>
        </div>

        <section class="studio-panel">
          <div class="studio-panel-heading">
            <span class="studio-icon"><ha-icon icon="mdi:form-textbox"></ha-icon></span>
            <div class="studio-heading-copy">
              <strong>${tr('Identificação', 'Bezeichnungen', 'Identification')}</strong>
              <small>${tr('Título e subtítulo da biblioteca', 'Titel und Untertitel der Bibliothek', 'Library title and subtitle')}</small>
            </div>
          </div>
          <crm-editor-form
            .schema=${identitySchema}
            .section=${Section.EPISODE_FAVORITES}
            .store=${this.store}
            .config=${this.config}
            .hass=${this.hass}
            @value-changed=${this.onValueChanged}
          ></crm-editor-form>
          <div class="preview-label">${tr('Prévia da identificação', 'Vorschau der Bezeichnungen', 'Identification preview')}</div>
          <div class="preview" aria-label=${tr('Prévia', 'Vorschau', 'Preview')}>
            <span class="preview-icon"><ha-icon icon="mdi:podcast"></ha-icon></span>
            <div class="preview-copy">
              <strong>${title}</strong>
              <small>${subtitle}</small>
            </div>
          </div>
        </section>

        <section class="studio-panel">
          <div class="studio-panel-heading">
            <span class="studio-icon"><ha-icon icon="mdi:view-grid-outline"></ha-icon></span>
            <div class="studio-heading-copy">
              <strong>${tr('Organização', 'Anordnung', 'Layout')}</strong>
              <small>${tr('Quantidade e disposição dos episódios', 'Anzahl und Anordnung der Episoden', 'Episode count and arrangement')}</small>
            </div>
          </div>
          <crm-editor-form
            .schema=${layoutSchema}
            .section=${Section.EPISODE_FAVORITES}
            .store=${this.store}
            .config=${this.config}
            .hass=${this.hass}
            @value-changed=${this.onValueChanged}
          ></crm-editor-form>
        </section>

        <section class="studio-panel">
          <div class="studio-panel-heading">
            <span class="studio-icon"><ha-icon icon="mdi:tune-variant"></ha-icon></span>
            <div class="studio-heading-copy">
              <strong>${tr('Exibição', 'Anzeige', 'Display')}</strong>
              <small>${tr('Visibilidade, ordenação e atualização', 'Sichtbarkeit, Sortierung und Aktualisierung', 'Visibility, sorting and refresh')}</small>
            </div>
          </div>
          <div class="subsection-heading">
            <ha-icon icon="mdi:eye-outline"></ha-icon>
            <span>${tr('Visibilidade', 'Sichtbarkeit', 'Visibility')}</span>
          </div>
          <crm-editor-form
            .schema=${visibilitySchema}
            .section=${Section.EPISODE_FAVORITES}
            .store=${this.store}
            .config=${this.config}
            .hass=${this.hass}
            @value-changed=${this.onValueChanged}
          ></crm-editor-form>
          <div class="subsection-divider"></div>
          <div class="subsection-heading">
            <ha-icon icon="mdi:sort-alphabetical-ascending"></ha-icon>
            <span>${tr('Ordenação e atualização', 'Sortierung und Aktualisierung', 'Sorting and refresh')}</span>
          </div>
          <crm-editor-form
            .schema=${sortingSchema}
            .section=${Section.EPISODE_FAVORITES}
            .store=${this.store}
            .config=${this.config}
            .hass=${this.hass}
            @value-changed=${this.onValueChanged}
          ></crm-editor-form>
        </section>
      </div>
    `;
  }

  static get styles() {
    return css`
      :host {
        display: block;
        min-width: 0;
        --studio-accent: var(--success-color, #35c98c);
      }
      * { box-sizing: border-box; }
      .studio-episodes { display: grid; gap: 12px; min-width: 0; }
      .studio-intro { display: flex; align-items: center; gap: 11px; padding: 3px 2px 5px; }
      .intro-icon {
        display: grid; place-items: center; flex: 0 0 42px; height: 42px;
        border-radius: 13px; color: var(--studio-accent);
        background: color-mix(in srgb, var(--studio-accent) 12%, transparent);
      }
      .intro-icon ha-icon { --mdc-icon-size: 23px; }
      .studio-intro > div { display: grid; gap: 4px; min-width: 0; }
      .studio-intro strong { color: var(--primary-text-color); font-size: 14px; }
      .studio-intro small { color: var(--secondary-text-color); font-size: 11px; line-height: 1.45; }
      .studio-panel {
        min-width: 0; padding: 16px;
        border: 1px solid var(--divider-color, rgba(128,128,128,.2));
        border-radius: 15px;
        background: var(--card-background-color, var(--ha-card-background, transparent));
      }
      .studio-panel-heading {
        display: flex; align-items: center; gap: 11px; margin-bottom: 15px;
        padding-bottom: 13px; border-bottom: 1px solid var(--divider-color, rgba(128,128,128,.2));
      }
      .studio-icon {
        display: grid; place-items: center; flex: 0 0 37px; height: 37px;
        border-radius: 11px;
        background: color-mix(in srgb, var(--studio-accent) 11%, var(--secondary-background-color, transparent));
        color: var(--studio-accent);
      }
      .studio-icon ha-icon { --mdc-icon-size: 20px; }
      .studio-heading-copy { display: grid; gap: 4px; min-width: 0; }
      .studio-heading-copy strong { color: var(--primary-text-color); font-size: 13px; font-weight: 650; }
      .studio-heading-copy small { color: var(--secondary-text-color); font-size: 11px; line-height: 1.4; }
      crm-editor-form { display: block; min-width: 0; }
      .preview-label {
        margin: 17px 0 8px; color: var(--secondary-text-color);
        font-size: 10px; font-weight: 650; letter-spacing: .035em;
      }
      .preview {
        display: flex; align-items: center; gap: 11px; padding: 12px;
        border: 1px solid var(--divider-color, rgba(128,128,128,.2));
        border-radius: 11px; background: var(--secondary-background-color, rgba(128,128,128,.08));
      }
      .preview-icon {
        display: grid; place-items: center; flex: 0 0 38px; height: 38px;
        border-radius: 10px; background: var(--card-background-color, transparent);
        color: var(--studio-accent);
      }
      .preview-icon ha-icon { --mdc-icon-size: 21px; }
      .preview-copy { display: grid; gap: 4px; min-width: 0; }
      .preview-copy strong, .preview-copy small { overflow-wrap: anywhere; }
      .preview-copy strong { color: var(--primary-text-color); font-size: 12px; }
      .preview-copy small { color: var(--secondary-text-color); font-size: 11px; }
      .subsection-heading {
        display: flex; align-items: center; gap: 8px; margin: 2px 0 11px;
        color: var(--primary-text-color); font-size: 12px; font-weight: 650;
      }
      .subsection-heading ha-icon { color: var(--studio-accent); --mdc-icon-size: 17px; }
      .subsection-divider {
        height: 1px; margin: 15px 0;
        background: var(--divider-color, rgba(128,128,128,.2));
      }
      @media (max-width: 340px) {
        .studio-panel { padding: 11px; }
        .studio-panel-heading { gap: 8px; }
      }
    `;
  }

  protected onValueChanged(args: CustomEvent): void {
    // Keep the original event hook available for future episode-specific changes.
    if (args) {
      // crm-editor-form handles the configuration update.
    }
  }
}

customElements.define('crm-episode-fav-browser-editor', EpisodeFavBrowserEditor);
