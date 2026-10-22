import { css, html, TemplateResult } from 'lit';

import { BaseEditor } from './base-editor';
import { Section } from '../types/section';
import { EDITOR_DEFAULT_BROWSER_ITEMS_PER_ROW } from '../constants';
import { translate } from '../localization/i18n';

class AlbumFavBrowserEditor extends BaseEditor {
  protected render(): TemplateResult {
    super.createStore();

    const t = (key: string): string =>
      translate(
        `editor.albumFavoritesSettings.${key}`,
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
      {
        name: 'albumFavBrowserItemsLimit', label: t('itemsLimit'), help: t('itemsLimitHelp'),
        required: false, type: 'integer', default: 200, valueMin: 1, valueMax: 1000,
      },
      {
        name: 'albumFavBrowserItemsPerRow', label: t('itemsPerRow'), help: t('itemsPerRowHelp'),
        required: true, type: 'integer', default: EDITOR_DEFAULT_BROWSER_ITEMS_PER_ROW,
        valueMin: 1, valueMax: 12,
      },
    ];

    const behaviorSchema = [
      { name: 'albumFavBrowserItemsHideTitle', label: t('hideTitle'), required: false, selector: { boolean: {} } },
      { name: 'albumFavBrowserItemsHideSubTitle', label: t('hideSubtitle'), help: t('hideSubtitleHelp'), required: false, selector: { boolean: {} } },
      { name: 'albumFavBrowserItemsSortTitle', label: t('sortTitle'), required: false, selector: { boolean: {} } },
      { name: 'albumFavBrowserShuffleOnPlay', label: t('shuffleOnPlay'), required: false, selector: { boolean: {} } },
      { name: 'albumFavBrowserItemsRefreshOnEntry', label: t('refreshOnEntry'), required: false, selector: { boolean: {} } },
    ];

    return html`
      <div class="studio-albums">
        <p class="studio-description">${t('description')}</p>

        <section class="studio-panel">
          <div class="studio-panel-heading">
            <span class="studio-icon"><ha-icon icon="mdi:view-grid-outline"></ha-icon></span>
            <div class="studio-heading-copy">
              <strong>${tr('Organização', 'Anordnung', 'Layout')}</strong>
              <small>${tr('Quantidade e disposição dos álbuns.', 'Anzahl und Anordnung der Alben.', 'Album count and arrangement.')}</small>
            </div>
          </div>
          <crm-editor-form
            .schema=${layoutSchema}
            .section=${Section.ALBUM_FAVORITES}
            .store=${this.store}
            .config=${this.config}
            .hass=${this.hass}
            @value-changed=${this.onValueChanged}
          ></crm-editor-form>
        </section>

        <section class="studio-panel">
          <div class="studio-panel-heading">
            <span class="studio-icon"><ha-icon icon="mdi:album"></ha-icon></span>
            <div class="studio-heading-copy">
              <strong>${tr('Exibição e reprodução', 'Anzeige und Wiedergabe', 'Display and playback')}</strong>
              <small>${tr('Controle o que aparece e como os álbuns são reproduzidos.', 'Anzeige und Wiedergabe der Alben steuern.', 'Control how albums are displayed and played.')}</small>
            </div>
          </div>
          <div class="group-label"><ha-icon icon="mdi:eye-outline"></ha-icon>${tr('Visibilidade', 'Sichtbarkeit', 'Visibility')}</div>
          <crm-editor-form
            .schema=${behaviorSchema.slice(0, 2)}
            .section=${Section.ALBUM_FAVORITES}
            .store=${this.store}
            .config=${this.config}
            .hass=${this.hass}
            @value-changed=${this.onValueChanged}
          ></crm-editor-form>
          <div class="group-divider"></div>
          <div class="group-label"><ha-icon icon="mdi:sort-alphabetical-ascending"></ha-icon>${tr('Ordenação e reprodução', 'Sortierung und Wiedergabe', 'Sorting and playback')}</div>
          <crm-editor-form
            .schema=${behaviorSchema.slice(2, 4)}
            .section=${Section.ALBUM_FAVORITES}
            .store=${this.store}
            .config=${this.config}
            .hass=${this.hass}
            @value-changed=${this.onValueChanged}
          ></crm-editor-form>
          <div class="group-divider"></div>
          <div class="group-label"><ha-icon icon="mdi:refresh"></ha-icon>${tr('Atualização', 'Aktualisierung', 'Refresh')}</div>
          <crm-editor-form
            .schema=${behaviorSchema.slice(4)}
            .section=${Section.ALBUM_FAVORITES}
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
      :host { display: block; min-width: 0; --studio-accent: var(--success-color, #38c997); }
      * { box-sizing: border-box; }
      .studio-albums { display: grid; gap: 12px; min-width: 0; }
      .studio-description { margin: 0 2px 3px; color: var(--secondary-text-color); font-size: 12px; line-height: 1.5; }
      .studio-panel {
        min-width: 0; padding: 16px;
        border: 1px solid var(--divider-color, rgba(128,128,128,.2));
        border-radius: 15px;
        background: var(--card-background-color, var(--ha-card-background, transparent));
      }
      .studio-panel-heading {
        display: flex; align-items: center; gap: 11px;
        margin-bottom: 15px; padding-bottom: 13px;
        border-bottom: 1px solid var(--divider-color, rgba(128,128,128,.2));
      }
      .studio-icon {
        display: flex; justify-content: center; align-items: center;
        flex: 0 0 38px; width: 38px; height: 38px; border-radius: 11px;
        background: color-mix(in srgb, var(--studio-accent) 12%, transparent);
        color: var(--studio-accent);
      }
      .studio-icon ha-icon { --mdc-icon-size: 20px; }
      .studio-heading-copy { display: grid; gap: 4px; min-width: 0; }
      .studio-heading-copy strong { color: var(--primary-text-color); font-size: 13px; font-weight: 650; }
      .studio-heading-copy small { color: var(--secondary-text-color); font-size: 11px; line-height: 1.4; }
      crm-editor-form { display: block; min-width: 0; }
      .group-label {
        display: flex; align-items: center; gap: 7px;
        margin: 3px 0 10px; font-size: 11px; font-weight: 650;
        color: var(--primary-text-color);
      }
      .group-label ha-icon { --mdc-icon-size: 17px; color: var(--studio-accent); }
      .group-divider { height: 1px; background: var(--divider-color, rgba(128,128,128,.2)); margin: 15px 0; }
      @media (max-width: 340px) { .studio-panel { padding: 11px; } }
    `;
  }

  protected onValueChanged(args: CustomEvent): void {
    if (args) {
      // crm-editor-form persists its values through the shared editor store.
    }
  }
}

customElements.define('crm-album-fav-browser-editor', AlbumFavBrowserEditor);
