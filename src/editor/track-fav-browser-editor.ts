import { css, html, TemplateResult } from 'lit';

import { BaseEditor } from './base-editor';
import { Section } from '../types/section';
import { EDITOR_DEFAULT_BROWSER_ITEMS_PER_ROW } from '../constants';
import { translate } from '../localization/i18n';

class TrackFavBrowserEditor extends BaseEditor {
  protected render(): TemplateResult {
    super.createStore();

    const t = (key: string): string =>
      translate(
        `editor.trackFavoritesSettings.${key}`,
        this.config.language ?? 'auto',
        this.hass?.locale?.language || this.hass?.language || 'en',
      );

    const language = this.config.language === 'auto' || !this.config.language
      ? this.hass?.locale?.language || this.hass?.language || 'en'
      : this.config.language;
    const pt = language.toLowerCase().startsWith('pt');
    const de = language.toLowerCase().startsWith('de');
    const tr = (ptText: string, deText: string, enText: string): string =>
      pt ? ptText : de ? deText : enText;

    const layoutSchema = [
      {
        name: 'trackFavBrowserItemsLimit',
        label: t('itemsLimit'),
        help: t('itemsLimitHelp'),
        required: false,
        type: 'integer',
        default: 200,
        valueMin: 1,
        valueMax: 1000,
      },
      {
        name: 'trackFavBrowserItemsPerRow',
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
        name: 'trackFavBrowserItemsHideTitle',
        label: t('hideTitle'),
        required: false,
        selector: { boolean: {} },
      },
      {
        name: 'trackFavBrowserItemsHideSubTitle',
        label: t('hideSubtitle'),
        help: t('hideSubtitleHelp'),
        required: false,
        selector: { boolean: {} },
      },
    ];

    const playbackSchema = [
      {
        name: 'trackFavBrowserItemsSortTitle',
        label: t('sortTitle'),
        required: false,
        selector: { boolean: {} },
      },
      {
        name: 'trackFavBrowserShuffleOnPlay',
        label: t('shuffleOnPlay'),
        required: false,
        selector: { boolean: {} },
      },
    ];

    const refreshSchema = [
      {
        name: 'trackFavBrowserItemsRefreshOnEntry',
        label: t('refreshOnEntry'),
        required: false,
        selector: { boolean: {} },
      },
    ];

    return html`
      <div class="studio-tracks">
        <p class="studio-description">${t('description')}</p>

        <section class="studio-panel">
          <div class="studio-panel-heading">
            <span class="studio-icon"><ha-icon icon="mdi:view-grid-outline"></ha-icon></span>
            <div class="studio-heading-copy">
              <strong>${tr('Organização', 'Anordnung', 'Layout')}</strong>
              <small>${tr('Quantidade e disposição das músicas', 'Anzahl und Anordnung der Songs', 'Track count and arrangement')}</small>
            </div>
          </div>
          <crm-editor-form
            .schema=${layoutSchema}
            .section=${Section.TRACK_FAVORITES}
            .store=${this.store}
            .config=${this.config}
            .hass=${this.hass}
            @value-changed=${this.onValueChanged}
          ></crm-editor-form>
        </section>

        <section class="studio-panel">
          <div class="studio-panel-heading">
            <span class="studio-icon"><ha-icon icon="mdi:music-note"></ha-icon></span>
            <div class="studio-heading-copy">
              <strong>${tr('Exibição e reprodução', 'Anzeige und Wiedergabe', 'Display and playback')}</strong>
              <small>${tr('Visibilidade, ordenação e atualização', 'Sichtbarkeit, Sortierung und Aktualisierung', 'Visibility, sorting and refresh')}</small>
            </div>
          </div>

          <div class="setting-group">
            <div class="group-heading">
              <ha-icon icon="mdi:eye-outline"></ha-icon>
              <span>${tr('Visibilidade', 'Sichtbarkeit', 'Visibility')}</span>
            </div>
            <p class="group-description">${tr('Escolha quais informações aparecem nos cartões das músicas.', 'Wähle aus, welche Informationen auf den Song-Karten erscheinen.', 'Choose which details appear on track cards.')}</p>
            <crm-editor-form
              .schema=${visibilitySchema}
              .section=${Section.TRACK_FAVORITES}
              .store=${this.store}
              .config=${this.config}
              .hass=${this.hass}
              @value-changed=${this.onValueChanged}
            ></crm-editor-form>
          </div>

          <div class="setting-group">
            <div class="group-heading">
              <ha-icon icon="mdi:shuffle-variant"></ha-icon>
              <span>${tr('Ordenação e reprodução', 'Sortierung und Wiedergabe', 'Sorting and playback')}</span>
            </div>
            <p class="group-description">${tr('Defina a ordem dos resultados e o comportamento ao reproduzir.', 'Lege die Reihenfolge und das Wiedergabeverhalten fest.', 'Set the display order and playback behavior.')}</p>
            <crm-editor-form
              .schema=${playbackSchema}
              .section=${Section.TRACK_FAVORITES}
              .store=${this.store}
              .config=${this.config}
              .hass=${this.hass}
              @value-changed=${this.onValueChanged}
            ></crm-editor-form>
          </div>

          <div class="setting-group last-group">
            <div class="group-heading">
              <ha-icon icon="mdi:refresh"></ha-icon>
              <span>${tr('Atualização', 'Aktualisierung', 'Refresh')}</span>
            </div>
            <p class="group-description">${tr('Atualize a lista ao entrar nesta seção.', 'Aktualisiere die Liste beim Öffnen dieses Bereichs.', 'Refresh the list when opening this section.')}</p>
            <crm-editor-form
              .schema=${refreshSchema}
              .section=${Section.TRACK_FAVORITES}
              .store=${this.store}
              .config=${this.config}
              .hass=${this.hass}
              @value-changed=${this.onValueChanged}
            ></crm-editor-form>
          </div>
        </section>
      </div>
    `;
  }

  static get styles() {
    return css`
      :host {
        display: block;
        min-width: 0;
        color: var(--primary-text-color);
        --studio-accent: var(--success-color, #38c997);
      }
      * { box-sizing: border-box; }
      .studio-tracks { display: grid; gap: 12px; min-width: 0; }
      .studio-description {
        margin: 0 2px 3px;
        color: var(--secondary-text-color);
        font-size: 12px;
        line-height: 1.5;
      }
      .studio-panel {
        min-width: 0;
        padding: 16px;
        border: 1px solid var(--divider-color, rgba(128,128,128,.2));
        border-radius: 15px;
        background: var(--card-background-color, var(--ha-card-background, transparent));
      }
      .studio-panel-heading {
        display: flex;
        align-items: center;
        gap: 11px;
        margin-bottom: 15px;
        padding-bottom: 13px;
        border-bottom: 1px solid var(--divider-color, rgba(128,128,128,.2));
      }
      .studio-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 0 0 38px;
        width: 38px;
        height: 38px;
        border-radius: 11px;
        background: color-mix(in srgb, var(--studio-accent) 12%, var(--card-background-color, transparent));
        color: var(--studio-accent);
      }
      .studio-icon ha-icon { --mdc-icon-size: 20px; }
      .studio-heading-copy { display: grid; gap: 4px; min-width: 0; }
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
      crm-editor-form { display: block; min-width: 0; }
      .setting-group { padding: 4px 0 17px; margin-bottom: 16px; border-bottom: 1px solid var(--divider-color, rgba(128,128,128,.2)); }
      .setting-group.last-group { margin-bottom: 0; padding-bottom: 0; border-bottom: 0; }
      .group-heading { display: flex; align-items: center; gap: 8px; margin-bottom: 5px; font-size: 12px; font-weight: 650; }
      .group-heading ha-icon { --mdc-icon-size: 17px; color: var(--studio-accent); }
      .group-description { margin: 0 0 12px 25px; color: var(--secondary-text-color); font-size: 11px; line-height: 1.45; }
      @media (max-width: 340px) {
        .studio-panel { padding: 11px; }
      }
    `;
  }

  protected onValueChanged(args: CustomEvent): void {
    if (args) {
      // The shared editor form handles the configuration updates.
    }
  }
}

customElements.define('crm-track-fav-browser-editor', TrackFavBrowserEditor);
