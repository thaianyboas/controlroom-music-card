
import { css, html, TemplateResult } from 'lit';

import { PLAYER_CONTROLS_BACKGROUND_COLOR_DEFAULT } from '../constants';
import { BaseEditor } from './base-editor';
import { Section } from '../types/section';
import { translate } from '../localization/i18n';

class PlayerVolumeSettingsEditor extends BaseEditor {

  protected render(): TemplateResult {
    super.createStore();

    const t = (key: string): string =>
      translate(
        `editor.playerVolumeSettings.${key}`,
        this.config.language ?? 'auto',
        this.hass.language
      );

    const configSettingsSchema = [
      {
        name: 'playerControlsBackgroundColor',
        label: t('backgroundColor'),
        help: t('backgroundColorHelp'),
        required: false,
        type: 'string',
        default: PLAYER_CONTROLS_BACKGROUND_COLOR_DEFAULT,
      },
      {
        name: 'playerVolumeMaxValue',
        label: t('maxVolume'),
        help: t('maxVolumeHelp'),
        required: true,
        type: 'integer',
        default: 100,
        valueMin: 10,
        valueMax: 100,
      },
      {
        name: 'playerVolumeStepValue',
        label: t('volumeStep'),
        help: t('volumeStepHelp'),
        required: true,
        type: 'integer',
        default: 10,
        valueMin: 1,
        valueMax: 30,
      },
      {
        name: 'playerVolumeControlsHideMute',
        label: t('hideMute'),
        required: false,
        selector: { boolean: {} },
      },
      {
        name: 'playerVolumeControlsHidePower',
        label: t('hidePower'),
        required: false,
        selector: { boolean: {} },
      },
      {
        name: 'playerVolumeControlsHideSlider',
        label: t('hideSlider'),
        required: false,
        selector: { boolean: {} },
      },
      {
        name: 'playerVolumeControlsShowPlusMinus',
        label: t('showPlusMinus'),
        required: false,
        selector: { boolean: {} },
      },
      {
        name: 'playerVolumeControlsHideLevels',
        label: t('hideLevels'),
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
  'crm-player-volume-editor',
  PlayerVolumeSettingsEditor
);
