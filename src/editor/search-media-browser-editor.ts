
import { css, html, TemplateResult } from 'lit';

import { BaseEditor } from './base-editor';
import { Section } from '../types/section';
import { EDITOR_DEFAULT_BROWSER_ITEMS_PER_ROW } from '../constants';
import { translate } from '../localization/i18n';

class SearchMediaBrowserEditor extends BaseEditor {

  protected render(): TemplateResult {
    super.createStore();

    const t = (key: string): string =>
      translate(
        `editor.searchMediaSettings.${key}`,
        this.config.language ?? 'auto',
        this.hass.language
      );

    const configSettingsSchema = [
      {
        name: 'searchMediaBrowserTitle',
        label: t('title'),
        help: t('titleHelp'),
        required: false,
        type: 'string',
      },
      {
        name: 'searchMediaBrowserSubTitle',
        label: t('subtitle'),
        help: t('subtitleHelp'),
        required: false,
        type: 'string',
      },
      {
        name: 'searchMediaBrowserSearchTypes',
        label: t('searchTypes'),
        help: t('searchTypesHelp'),
        required: false,
        type: 'multi_select',
        options: {
          // Preserve these internal values for SpotifyPlus.
          Albums: t('albums'),
          Artists: t('artists'),
          AudioBooks: t('audiobooks'),
          Episodes: t('episodes'),
          Playlists: t('playlists'),
          Shows: t('shows'),
          Tracks: t('tracks'),
        },
      },
      {
        name: 'searchMediaBrowserSearchLimit',
        label: t('searchLimit'),
        required: false,
        type: 'integer',
        default: 50,
        valueMin: 25,
        valueMax: 500,
      },
      {
        name: 'searchMediaBrowserUseDisplaySettings',
        label: t('useDisplaySettings'),
        required: false,
        selector: { boolean: {} },
      },
      {
        name: 'searchMediaBrowserItemsPerRow',
        label: t('itemsPerRow'),
        help: t('itemsPerRowHelp'),
        required: true,
        type: 'integer',
        default: EDITOR_DEFAULT_BROWSER_ITEMS_PER_ROW,
        valueMin: 1,
        valueMax: 12,
      },
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

    return html`
      <div class="schema-title">
        ${t('description')}
      </div>

      <crm-editor-form
        class="crm-editor-form"
        .schema=${configSettingsSchema}
        .section=${Section.SEARCH_MEDIA}
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
    // Preserved for future media-specific changes.
    if (args) {
    }
  }
}

customElements.define(
  'crm-search-media-browser-editor',
  SearchMediaBrowserEditor
);
