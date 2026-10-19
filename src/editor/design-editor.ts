
import { css, html, TemplateResult } from 'lit';

import { BaseEditor } from './base-editor';
import { Section } from '../types/section';
import { translate } from '../localization/i18n';

class DesignEditor extends BaseEditor {

  protected render(): TemplateResult {
    super.createStore();

    const t = (key: string): string =>
      translate(
        `editor.designSettings.${key}`,
        this.config.language ?? 'auto',
        this.hass.language
      );

    const designSettingsSchema = [
      {
        name: 'crmBackground',
        label: t('background'),
        required: false,
        type: 'string',
        default: '#101b19',
      },
      {
        name: 'crmAccent',
        label: t('accent'),
        required: false,
        type: 'string',
        default: '#34d399',
      },
      {
        name: 'crmText',
        label: t('text'),
        required: false,
        type: 'string',
        default: '#f0fdf4',
      },
      {
        name: 'crmBorderRadius',
        label: t('borderRadius'),
        required: false,
        type: 'string',
        default: '20px',
      },
    ];

    return html`
      <div class="schema-title">
        🎨 ${t('description')}
      </div>

      <crm-editor-form
        .schema=${designSettingsSchema}
        .section=${Section.PLAYER}
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
        font-size: 1rem;
        font-weight: 600;
        color: var(--secondary-text-color);
      }
    `;
  }
}

customElements.define('crm-design-editor', DesignEditor);
