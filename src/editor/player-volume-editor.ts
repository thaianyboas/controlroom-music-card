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
        this.hass.language,
      );

    const language = this.config.language === 'auto' || !this.config.language
      ? this.hass.language
      : this.config.language;
    const pt = language?.toLowerCase().startsWith('pt');
    const de = language?.toLowerCase().startsWith('de');

    const labels = {
      levels: pt ? 'Níveis de volume' : de ? 'Lautstärkepegel' : 'Volume levels',
      appearance: pt ? 'Aparência' : de ? 'Darstellung' : 'Appearance',
      visibility: pt ? 'Botões e visibilidade' : de ? 'Tasten und Sichtbarkeit' : 'Buttons and visibility',
      levelsHelp: pt ? 'Defina o volume máximo e o tamanho de cada ajuste.'
        : de ? 'Maximale Lautstärke und Schrittweite festlegen.'
        : 'Set the maximum volume and adjustment step.',
      visibilityHelp: pt ? 'Escolha quais controles devem aparecer.'
        : de ? 'Wähle, welche Bedienelemente angezeigt werden.'
        : 'Choose which controls are visible.',
    };

    const appearanceSchema = [
      {
        name: 'playerControlsBackgroundColor',
        label: t('backgroundColor'),
        help: t('backgroundColorHelp'),
        required: false,
        type: 'string',
        default: PLAYER_CONTROLS_BACKGROUND_COLOR_DEFAULT,
      },
    ];

    const levelsSchema = [
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
    ];

    const visibilitySchema = [
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
      <div class="studio-volume">
        <p class="studio-description">${t('description')}</p>

        <section class="studio-panel">
          <div class="studio-heading">
            <ha-icon icon="mdi:volume-high"></ha-icon>
            <div>
              <div class="studio-title">${labels.levels}</div>
              <div class="studio-hint">${labels.levelsHelp}</div>
            </div>
          </div>
          <crm-editor-form
            .schema=${levelsSchema}
            .section=${Section.PLAYER}
            .store=${this.store}
            .config=${this.config}
            .hass=${this.hass}
          ></crm-editor-form>
        </section>

        <section class="studio-panel">
          <div class="studio-heading">
            <ha-icon icon="mdi:palette-outline"></ha-icon>
            <div class="studio-title">${labels.appearance}</div>
          </div>
          <crm-editor-form
            .schema=${appearanceSchema}
            .section=${Section.PLAYER}
            .store=${this.store}
            .config=${this.config}
            .hass=${this.hass}
          ></crm-editor-form>
        </section>

        <section class="studio-panel">
          <div class="studio-heading">
            <ha-icon icon="mdi:eye-outline"></ha-icon>
            <div>
              <div class="studio-title">${labels.visibility}</div>
              <div class="studio-hint">${labels.visibilityHelp}</div>
            </div>
          </div>
          <crm-editor-form
            .schema=${visibilitySchema}
            .section=${Section.PLAYER}
            .store=${this.store}
            .config=${this.config}
            .hass=${this.hass}
          ></crm-editor-form>
        </section>
      </div>
    `;
  }

  static get styles() {
    return css`
      :host { display: block; min-width: 0; }
      * { box-sizing: border-box; }
      .studio-volume { display: grid; gap: 12px; min-width: 0; }
      .studio-description {
        margin: 0 0 2px;
        color: var(--secondary-text-color);
        font-size: 12px;
        line-height: 1.5;
      }
      .studio-panel {
        min-width: 0;
        padding: 14px;
        border: 1px solid var(--divider-color, rgba(128,128,128,.2));
        border-radius: 12px;
        background: var(--card-background-color, var(--ha-card-background, transparent));
      }
      .studio-heading {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 12px;
      }
      .studio-heading ha-icon {
        --mdc-icon-size: 19px;
        color: var(--secondary-text-color);
        flex-shrink: 0;
      }
      .studio-title { font-size: 13px; font-weight: 600; color: var(--primary-text-color); }
      .studio-hint {
        margin-top: 3px;
        font-size: 11px;
        line-height: 1.4;
        color: var(--secondary-text-color);
      }
      crm-editor-form { display: block; min-width: 0; }
      @media (max-width: 340px) { .studio-panel { padding: 10px; } }
    `;
  }
}

customElements.define('crm-player-volume-editor', PlayerVolumeSettingsEditor);
