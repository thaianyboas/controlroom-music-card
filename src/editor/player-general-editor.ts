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
        this.hass.language,
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
      <div class="studio-player-general">
        <div class="studio-description">${t('description')}</div>
        <div class="studio-settings">
          <crm-editor-form
            .schema=${configSettingsSchema}
            .section=${Section.PLAYER}
            .store=${this.store}
            .config=${this.config}
            .hass=${this.hass}
          ></crm-editor-form>
        </div>
      </div>
    `;
  }

  static get styles() {
    return css`
      :host { display: block; min-width: 0; }
      .studio-player-general { display: grid; gap: 12px; min-width: 0; }
      .studio-description {
        color: var(--secondary-text-color);
        font-size: 12px;
        line-height: 1.5;
      }
      .studio-settings {
        min-width: 0;
        padding: 12px;
        border: 1px solid var(--divider-color, rgba(128,128,128,.2));
        border-radius: 12px;
        background: var(--secondary-background-color, rgba(128,128,128,.05));
      }
      crm-editor-form { display: block; min-width: 0; }
    `;
  }
}

customElements.define('crm-player-general-editor', PlayerGeneralSettingsEditor);
