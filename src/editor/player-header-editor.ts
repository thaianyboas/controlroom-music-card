
import { css, html, TemplateResult } from 'lit';

import { PLAYER_CONTROLS_BACKGROUND_COLOR_DEFAULT } from '../constants';
import { BaseEditor } from './base-editor';
import { Section } from '../types/section';
import { translate } from '../localization/i18n';

class PlayerHeaderSettingsEditor extends BaseEditor {

  protected render(): TemplateResult {
    super.createStore();

    const t = (key: string): string =>
      translate(
        `editor.playerHeaderSettings.${key}`,
        this.config.language ?? 'auto',
        this.hass.language
      );

    const configSettingsSchema = [
      {
        name: 'playerHeaderTitle',
        label: t('title'),
        required: false,
        type: 'string',
      },
      {
        name: 'playerHeaderArtistTrack',
        label: t('artistTrack'),
        required: false,
        type: 'string',
      },
      {
        name: 'playerHeaderAlbum',
        label: t('album'),
        required: false,
        type: 'string',
      },
      {
        name: 'playerHeaderNoMediaPlayingText',
        label: t('noMediaPlayingText'),
        required: false,
        type: 'string',
      },
      {
        name: 'playerHeaderBackgroundColor',
        label: t('backgroundColor'),
        help: t('backgroundColorHelp'),
        required: false,
        type: 'string',
        default: PLAYER_CONTROLS_BACKGROUND_COLOR_DEFAULT,
      },
      {
        name: 'playerHeaderHideProgressBar',
        label: t('hideProgressBar'),
        required: false,
        selector: { boolean: {} },
      },
      {
        name: 'playerHeaderHide',
        label: t('hideHeader'),
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
  'crm-player-header-editor',
  PlayerHeaderSettingsEditor
);
