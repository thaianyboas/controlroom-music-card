import { css, html, TemplateResult } from 'lit';

import { BaseEditor } from './base-editor';
import { Section } from '../types/section';
import { EDITOR_DEFAULT_BROWSER_ITEMS_PER_ROW } from '../constants';
import { translate } from '../localization/i18n';

class ShowFavBrowserEditor extends BaseEditor {
  protected render(): TemplateResult {
    super.createStore();

    const t = (key: string): string =>
      translate(
        `editor.showFavoritesSettings.${key}`,
        this.config.language ?? 'auto',
        this.hass.language,
      );

    const language = this.config.language === 'auto' || !this.config.language
      ? this.hass.language
      : this.config.language;
    const pt = language?.toLowerCase().startsWith('pt');
    const de = language?.toLowerCase().startsWith('de');

    const labels = {
      identity: pt ? 'Identificação' : de ? 'Bezeichnungen' : 'Identification',
      identityHint: pt ? 'Título e subtítulo dos podcasts' : de ? 'Titel und Untertitel der Podcasts' : 'Podcast title and subtitle',
      layout: pt ? 'Organização' : de ? 'Anordnung' : 'Layout',
      layoutHint: pt ? 'Quantidade e disposição dos podcasts' : de ? 'Anzahl und Anordnung der Podcasts' : 'Podcast count and arrangement',
      behavior: pt ? 'Exibição e reprodução' : de ? 'Anzeige und Wiedergabe' : 'Display and playback',
      behaviorHint: pt ? 'Visibilidade, ordenação e atualização' : de ? 'Sichtbarkeit, Sortierung und Aktualisierung' : 'Visibility, sorting and refresh',
    };

    const identitySchema = [
      {
        name: 'showFavBrowserTitle',
        label: t('title'),
        help: t('titleHelp'),
        required: false,
        type: 'string',
      },
      {
        name: 'showFavBrowserSubTitle',
        label: t('subtitle'),
        help: t('subtitleHelp'),
        required: false,
        type: 'string',
      },
    ];

    const layoutSchema = [
      {
        name: 'showFavBrowserItemsLimit',
        label: t('itemsLimit'),
        help: t('itemsLimitHelp'),
        required: false,
        type: 'integer',
        default: 200,
        valueMin: 1,
        valueMax: 1000,
      },
      {
        name: 'showFavBrowserItemsPerRow',
        label: t('itemsPerRow'),
        help: t('itemsPerRowHelp'),
        required: true,
        type: 'integer',
        default: EDITOR_DEFAULT_BROWSER_ITEMS_PER_ROW,
        valueMin: 1,
        valueMax: 12,
      },
    ];

    const behaviorSchema = [
      {
        name: 'showFavBrowserItemsHideTitle',
        label: t('hideTitle'),
        required: false,
        selector: { boolean: {} },
      },
      {
        name: 'showFavBrowserItemsHideSubTitle',
        label: t('hideSubtitle'),
        help: t('hideSubtitleHelp'),
        required: false,
        selector: { boolean: {} },
      },
      {
        name: 'showFavBrowserItemsSortTitle',
        label: t('sortTitle'),
        required: false,
        selector: { boolean: {} },
      },
      {
        name: 'showFavBrowserItemsRefreshOnEntry',
        label: t('refreshOnEntry'),
        required: false,
        selector: { boolean: {} },
      },
    ];

    return html`
      <div class="studio-shows">
        <p class="studio-description">${t('description')}</p>

        <section class="studio-panel">
          <div class="studio-panel-heading">
            <span class="studio-icon">
              <ha-icon icon="mdi:form-textbox"></ha-icon>
            </span>
            <div class="studio-heading-copy">
              <strong>${labels.identity}</strong>
              <small>${labels.identityHint}</small>
            </div>
          </div>
          <crm-editor-form
            .schema=${identitySchema}
            .section=${Section.SHOW_FAVORITES}
            .store=${this.store}
            .config=${this.config}
            .hass=${this.hass}
            @value-changed=${this.onValueChanged}
          ></crm-editor-form>
        </section>

        <section class="studio-panel">
          <div class="studio-panel-heading">
            <span class="studio-icon">
              <ha-icon icon="mdi:view-grid-outline"></ha-icon>
            </span>
            <div class="studio-heading-copy">
              <strong>${labels.layout}</strong>
              <small>${labels.layoutHint}</small>
            </div>
          </div>
          <crm-editor-form
            .schema=${layoutSchema}
            .section=${Section.SHOW_FAVORITES}
            .store=${this.store}
            .config=${this.config}
            .hass=${this.hass}
            @value-changed=${this.onValueChanged}
          ></crm-editor-form>
        </section>

        <section class="studio-panel">
          <div class="studio-panel-heading">
            <span class="studio-icon">
              <ha-icon icon="mdi:audiobook-play"></ha-icon>
            </span>
            <div class="studio-heading-copy">
              <strong>${labels.behavior}</strong>
              <small>${labels.behaviorHint}</small>
            </div>
          </div>
          <crm-editor-form
            .schema=${behaviorSchema}
            .section=${Section.SHOW_FAVORITES}
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
      :host { display: block; min-width: 0; }
      * { box-sizing: border-box; }
      .studio-shows { display: grid; gap: 11px; min-width: 0; }
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
        background: var(--secondary-background-color, rgba(128,128,128,.12));
        color: var(--secondary-text-color);
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
      crm-editor-form { display: block; min-width: 0; }
      @media (max-width: 340px) {
        .studio-panel { padding: 10px; }
      }
    `;
  }

  protected onValueChanged(args: CustomEvent): void {
    // Mantido como no código original para futuras alterações.
    if (args) {
    }
  }
}

customElements.define(
  'crm-show-fav-browser-editor',
  ShowFavBrowserEditor,
);
