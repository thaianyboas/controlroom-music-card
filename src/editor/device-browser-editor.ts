
import { css, html, TemplateResult } from 'lit';

import { BaseEditor } from './base-editor';
import { Section } from '../types/section';
import { EDITOR_DEFAULT_BROWSER_ITEMS_PER_ROW } from '../constants';
import { translate } from '../localization/i18n';

class SourceSettingsEditor extends BaseEditor {

  protected render(): TemplateResult {
    super.createStore();

    const t = (key: string): string =>
      translate(
        `editor.deviceBrowserSettings.${key}`,
        this.config.language ?? 'auto',
        this.hass.language
      );

    const configSettingsSchema = [
      {
        name: 'deviceBrowserTitle',
        label: t('title'),
        help: t('titleHelp'),
        required: false,
        type: 'string',
      },
      {
        name: 'deviceBrowserSubTitle',
        label: t('subtitle'),
        help: t('subtitleHelp'),
        required: false,
        type: 'string',
      },
      {
        name: 'deviceDefaultId',
        label: t('defaultDevice'),
        help: t('defaultDeviceHelp'),
        required: false,
        type: 'string',
      },
      {
        name: 'deviceBrowserItemsPerRow',
        label: t('itemsPerRow'),
        help: t('itemsPerRowHelp'),
        required: true,
        type: 'integer',
        default: EDITOR_DEFAULT_BROWSER_ITEMS_PER_ROW,
        valueMin: 1,
        valueMax: 12,
      },
      {
        name: 'deviceBrowserItemsHideTitle',
        label: t('hideTitle'),
        required: false,
        selector: { boolean: {} },
      },
      {
        name: 'deviceBrowserItemsHideSubTitle',
        label: t('hideSubtitle'),
        help: t('hideSubtitleHelp'),
        required: false,
        selector: { boolean: {} },
      },
      {
        name: 'deviceBrowserItemsShowHiddenDevices',
        label: t('showHiddenDevices'),
        required: false,
        selector: { boolean: {} },
      },
      {
        name: 'deviceControlByName',
        label: t('controlByName'),
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
        .section=${Section.DEVICES}
        .store=${this.store}
        .config=${this.config}
        .hass=${this.hass}
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
}

customElements.define(
  'crm-device-browser-editor',
  SourceSettingsEditor
);
