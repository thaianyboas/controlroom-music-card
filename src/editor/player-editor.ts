
import { css, html, nothing, TemplateResult } from 'lit';
import { state } from 'lit/decorators.js';
import { choose } from 'lit/directives/choose.js';

import { BaseEditor } from './base-editor';
import { translate } from '../localization/i18n';
import './editor-form';
import './player-general-editor';
import './player-header-editor';
import './player-controls-editor';
import './player-volume-editor';

/** Configuration area editor sections enum. */
enum ConfigArea {
  GENERAL = 'general',
  HEADER = 'header',
  CONTROLS = 'controls',
  VOLUME = 'volume',
}

const { GENERAL, HEADER, CONTROLS, VOLUME } = ConfigArea;

class PlayerSettingsEditor extends BaseEditor {

  @state() private configArea = GENERAL;

  protected render(): TemplateResult {
    super.createStore();

    const t = (key: string): string =>
      translate(
        `editor.playerSettings.${key}`,
        this.config.language ?? 'auto',
        this.hass.language
      );

    return html`
      <div class="schema-title">
        ${t('description')}
      </div>

      <ha-control-button-group>
        ${[GENERAL, HEADER, CONTROLS, VOLUME].map(
          (configArea) => html`
            <ha-control-button
              selected=${this.configArea === configArea || nothing}
              @click=${() => this.onConfigPlayerSectionClick(configArea)}
            >
              ${t(configArea)}
            </ha-control-button>
          `,
        )}
      </ha-control-button-group>

      ${this.subEditor()}
    `;
  }

  private subEditor() {
    return choose(this.configArea, [
      [
        GENERAL,
        () => html`
          <crm-player-general-editor
            .config=${this.config}
            .hass=${this.hass}
          ></crm-player-general-editor>
        `,
      ],
      [
        HEADER,
        () => html`
          <crm-player-header-editor
            .config=${this.config}
            .hass=${this.hass}
          ></crm-player-header-editor>
        `,
      ],
      [
        CONTROLS,
        () => html`
          <crm-player-controls-editor
            .config=${this.config}
            .hass=${this.hass}
          ></crm-player-controls-editor>
        `,
      ],
      [
        VOLUME,
        () => html`
          <crm-player-volume-editor
            .config=${this.config}
            .hass=${this.hass}
          ></crm-player-volume-editor>
        `,
      ],
    ]);
  }

  private onConfigPlayerSectionClick(configArea: ConfigArea) {
    this.configArea = configArea;
  }

  static get styles() {
    return css`
      .schema-title {
        margin: 0.4rem 0;
        text-align: left;
        font-size: 1rem;
        color: var(--secondary-text-color);
      }

      ha-control-button[selected] {
        --control-button-background-color: var(--primary-color);
      }
    `;
  }
}

customElements.define('crm-player-editor', PlayerSettingsEditor);
