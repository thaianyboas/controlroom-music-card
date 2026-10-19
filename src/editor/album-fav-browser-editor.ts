
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
        this.hass.language
      );

    const configSettingsSchema = [
      {
        name: 'albumFavBrowserTitle',
        label: t('title'),
        help: t('titleHelp'),
        required: false,
        type: 'string',
      },
      {
        name: 'albumFavBrowserSubTitle',
        label: t('subtitle'),
        help: t('subtitleHelp'),
        required: false,
        type: 'string',
      },
      {
        name: 'albumFavBrowserItemsLimit',
        label: t('itemsLimit'),
        help: t('itemsLimitHelp'),
        required: false,
        type: 'integer',
        default: 200,
        valueMin: 1,
        valueMax: 1000,
      },
      {
        name: 'albumFavBrowserItemsPerRow',
        label: t('itemsPerRow'),
        help: t('itemsPerRowHelp'),
        required: true,
        type: 'integer',
        default: EDITOR_DEFAULT_BROWSER_ITEMS_PER_ROW,
        valueMin: 1,
        valueMax: 12,
      },
      {
        name: 'albumFavBrowserItemsHideTitle',
        label: t('hideTitle'),
        required: false,
        selector: { boolean: {} },
      },
      {
        name: 'albumFavBrowserItemsHideSubTitle',
        label: t('hideSubtitle'),
        help: t('hideSubtitleHelp'),
        required: false,
        selector: { boolean: {} },
      },
      {
        name: 'albumFavBrowserItemsSortTitle',
        label: t('sortTitle'),
        required: false,
        selector: { boolean: {} },
      },
      {
        name: 'albumFavBrowserShuffleOnPlay',
        label: t('shuffleOnPlay'),
        required: false,
        selector: { boolean: {} },
      },
      {
        name: 'albumFavBrowserItemsRefreshOnEntry',
        label: t('refreshOnEntry'),
        required: false,
        selector: { boolean: {} },
      },
    ];

    return html`
      <div class="schema-title">
        ${t('description')}
      </div>

      <crm-editor-form
        class="crm-editor-form"
        .schema=${configSettingsSchema}
        .section=${Section.ALBUM_FAVORITES}
        .store=${this.store}
        .config=${this.config}
        .hass=${this.hass}
        @value-changed=${this.onValueChanged}
      ></crm-editor-form>
    `;
  }

  static get styles() {
    return css`
      .schema-title {
        margin: 0.4rem 0;
        text-align: left;
        font-size: 1rem;
        color: var(--secondary-text-color);
      }

      .crm-editor-form {
      }
    `;
  }

  protected onValueChanged(args: CustomEvent): void {
    if (args) {
      // Preservado para futuras alterações.
    }
  }
}

customElements.define(
  'crm-album-fav-browser-editor',
  AlbumFavBrowserEditor
);
