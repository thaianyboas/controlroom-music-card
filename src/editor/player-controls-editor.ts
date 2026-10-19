
import { css, html, TemplateResult } from 'lit';

import { PLAYER_CONTROLS_ICON_SIZE_DEFAULT } from '../constants';
import { BaseEditor } from './base-editor';
import { Section } from '../types/section';
import { translate } from '../localization/i18n';

class PlayerControlsSettingsEditor extends BaseEditor {

  protected render(): TemplateResult {
    super.createStore();

    const t = (key: string): string =>
      translate(
        `editor.playerControlsSettings.${key}`,
        this.config.language ?? 'auto',
        this.hass.language
      );

    const configSettingsSchema = [
      {
        name: 'playerControlsIconSize',
        label: t('iconSize'),
        help: `${t('iconSizeHelp')} "${PLAYER_CONTROLS_ICON_SIZE_DEFAULT}"`,
        required: false,
        type: 'string',
        default: PLAYER_CONTROLS_ICON_SIZE_DEFAULT,
      },
      {
        name: 'playerControlsHideFavorites',
        label: t('hideFavorites'),
        required: false,
        selector: { boolean: {} },
      },
      {
        name: 'playerControlsHideShuffle',
        label: t('hideShuffle'),
        required: false,
        selector: { boolean: {} },
      },
      {
        name: 'playerControlsHideTrackPrev',
        label: t('hidePrevious'),
        required: false,
        selector: { boolean: {} },
      },
      {
        name: 'playerControlsHidePlayPause',
        label: t('hidePlayPause'),
        required: false,
        selector: { boolean: {} },
      },
      {
        name: 'playerControlsHideTrackNext',
        label: t('hideNext'),
        required: false,
        selector: { boolean: {} },
      },
      {
        name: 'playerControlsHideRepeat',
        label: t('hideRepeat'),
        required: false,
        selector: { boolean: {} },
      },
      {
        name: 'playerControlsHidePlayQueue',
        label: t('hideQueue'),
        required: false,
        selector: { boolean: {} },
      },
      {
        name: 'playerControlsHide',
        label: t('hideControls'),
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
  'crm-player-controls-editor',
  PlayerControlsSettingsEditor
);
