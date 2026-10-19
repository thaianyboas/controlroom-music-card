
import { css, html, TemplateResult } from 'lit';

import { EDITOR_DEFAULT_BROWSER_ITEMS_PER_ROW } from '../constants';
import { BaseEditor } from './base-editor';
import { Section } from '../types/section';
import { translate } from '../localization/i18n';

class UserPresetSettingsEditor extends BaseEditor {

  protected render(): TemplateResult {
    super.createStore();

    const t = (key: string): string =>
      translate(
        `editor.userPresetSettings.${key}`,
        this.config.language ?? 'auto',
        this.hass.language
      );

    const configSettingsSchema = [
      {
        name: 'userPresetBrowserTitle',
        label: t('title'),
        help: t('titleHelp'),
        required: false,
        type: 'string',
      },
      {
        name: 'userPresetBrowserSubTitle',
        label: t('subtitle'),
        help: t('subtitleHelp'),
        required: false,
        type: 'string',
      },
      {
        name: 'userPresetsFile',
        label: t('presetsFile'),
        help: t('presetsFileHelp'),
        required: false,
        type: 'string',
      },
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
      <div class="schema-title">
        ${t('description')}
      </div>

      <crm-editor-form
        class="crm-editor-form"
        .schema=${configSettingsSchema}
        .section=${Section.USERPRESETS}
        .store=${this.store}
        .config=${this.config}
        .hass=${this.hass}
      ></crm-editor-form>

      <div class="schema-title">
        ${t('documentationNotice')}
        <a
          href="https://github.com/thlucas1/spotifyplus_card/wiki/Configuration-Options#userpresets-user-preset-content-items"
          target="_blank"
          rel="noopener noreferrer"
        >
          ${t('documentationLink')}
        </a>
        ${t('documentationSuffix')}
      </div>
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
}

customElements.define(
  'crm-userpreset-browser-editor',
  UserPresetSettingsEditor
);
