
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
        this.hass.language
      );

    const configSettingsSchema = [
      {
        name: 'trackFavBrowserTitle',
        label: t('title'),
        help: t('titleHelp'),
        required: false,
        type: 'string',
      },
      {
        name: 'trackFavBrowserSubTitle',
        label: t('subtitle'),
        help: t('subtitleHelp'),
        required: false,
        type: 'string',
      },
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
      {
        name: 'trackFavBrowserItemsRefreshOnEntry',
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
        .section=${Section.TRACK_FAVORITES}
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
    // Mantido para futuras alterações.
    if (args) {
    }
  }
}

customElements.define(
  'crm-track-fav-browser-editor',
  TrackFavBrowserEditor
);
