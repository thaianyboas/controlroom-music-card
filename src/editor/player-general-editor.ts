
import { css, html, TemplateResult } from 'lit';

import { PLAYER_BACKGROUND_IMAGE_SIZE_DEFAULT } from '../constants';
import { BaseEditor } from './base-editor';
import { Section } from '../types/section';
import { translate } from '../localization/i18n';

class PlayerGeneralSettingsEditor extends BaseEditor {

  protected render(): TemplateResult {
    super.createStore();

    const t = (key: string): string =>
      translate(
        `editor.playerGeneralSettings.${key}`,
        this.config.language ?? 'auto',
        this.hass.language
      );

    const configSettingsSchema = [
      {
        name: 'playerBackgroundImageSize',
        label: t('backgroundImageSize'),
        help: `${t('defaultIs')} "${PLAYER_BACKGROUND_IMAGE_SIZE_DEFAULT}"`,
        required: false,
        type: 'string',
      },
      {
        name: 'playerMinimizeOnIdle',
        label: t('minimizeOnIdle'),
        help: t('minimizeOnIdleHelp'),
        required: false,
        selector: { boolean: {} },
      },
    ];

    return html`
      <div class="schema-title">
        ${t('description')}
      </div>

      <crm-editor-form
        .schema=${configSettingsSchema}
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
        text-align: left;
        font-size: 1rem;
        color: var(--secondary-text-color);
      }
    `;
  }
}

customElements.define(
  'crm-player-general-editor',
  PlayerGeneralSettingsEditor
);
