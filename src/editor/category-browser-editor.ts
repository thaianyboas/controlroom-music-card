
import { css, html, TemplateResult } from 'lit';

import { BaseEditor } from './base-editor';
import { Section } from '../types/section';
import { EDITOR_DEFAULT_BROWSER_ITEMS_PER_ROW } from '../constants';
import { translate } from '../localization/i18n';

class CategoryBrowserEditor extends BaseEditor {

  protected render(): TemplateResult {
    super.createStore();

    const t = (key: string): string =>
      translate(
        `editor.categoryBrowserSettings.${key}`,
        this.config.language ?? 'auto',
        this.hass.language
      );

    const configSettingsSchema = [
      {
        name: 'categoryBrowserTitle',
        label: t('title'),
        help: t('titleHelp'),
        required: false,
        type: 'string',
      },
      {
        name: 'categoryBrowserSubTitle',
        label: t('subtitle'),
        help: t('subtitleHelp'),
        required: false,
        type: 'string',
      },
      {
        name: 'categoryBrowserItemsPerRow',
        label: t('itemsPerRow'),
        help: t('itemsPerRowHelp'),
        required: true,
        type: 'integer',
        default: EDITOR_DEFAULT_BROWSER_ITEMS_PER_ROW,
        valueMin: 1,
        valueMax: 12,
      },
      {
        name: 'categoryBrowserItemsHideTitle',
        label: t('hideTitle'),
        required: false,
        selector: { boolean: {} },
      },
      {
        name: 'categoryBrowserItemsHideSubTitle',
        label: t('hideSubtitle'),
        help: t('hideSubtitleHelp'),
        required: false,
        selector: { boolean: {} },
      },
      {
        name: 'categoryBrowserItemsSortTitle',
        label: t('sortTitle'),
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
        .section=${Section.CATEGORYS}
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
      // Mantido para futuras alterações.
    }
  }
}

customElements.define(
  'crm-category-browser-editor',
  CategoryBrowserEditor
);
