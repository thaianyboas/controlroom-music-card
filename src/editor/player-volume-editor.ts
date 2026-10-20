
import { css, html, TemplateResult } from 'lit';

import { PLAYER_CONTROLS_BACKGROUND_COLOR_DEFAULT } from '../constants';
import { BaseEditor } from './base-editor';
import { Section } from '../types/section';
import { translate } from '../localization/i18n';

class PlayerVolumeSettingsEditor extends BaseEditor {
  private setField(name: string, value: string | boolean): void {
    this.configChanged({ ...this.config, [name]: value });
  }

  private setBackgroundColor(value: string): void {
    this.setField('playerControlsBackgroundColor', value);
  }

  protected render(): TemplateResult {
    super.createStore();

    const t = (key: string): string =>
      translate(
        `editor.playerVolumeSettings.${key}`,
        this.config.language ?? 'auto',
        this.hass.language,
      );

    const language = (
      this.config.language && this.config.language !== 'auto'
        ? this.config.language
        : this.hass.language || 'en'
    ).toLowerCase();

    const pt = language.startsWith('pt');
    const de = language.startsWith('de');

    const tr = (ptText: string, deText: string, enText: string): string =>
      pt ? ptText : de ? deText : enText;

    const labels = {
      levels: tr('Níveis de volume', 'Lautstärkepegel', 'Volume levels'),
      appearance: tr('Aparência', 'Darstellung', 'Appearance'),
      visibility: tr('Botões e visibilidade', 'Tasten und Sichtbarkeit', 'Buttons and visibility'),
      levelsHelp: tr(
        'Defina o volume máximo e o tamanho de cada ajuste.',
        'Maximale Lautstärke und Schrittweite festlegen.',
        'Set the maximum volume and adjustment step.',
      ),
      visibilityHelp: tr(
        'Selecione quais controles devem aparecer no reprodutor.',
        'Wählen Sie, welche Bedienelemente angezeigt werden.',
        'Choose which controls appear in the player.',
      ),
      backgroundHelp: tr(
        'Escolha uma cor ou digite um valor CSS personalizado.',
        'Farbe auswählen oder einen eigenen CSS-Wert eingeben.',
        'Choose a color or enter a custom CSS value.',
      ),
      reset: tr('Restaurar', 'Zurücksetzen', 'Reset'),
      visible: tr('Visível', 'Sichtbar', 'Visible'),
      hidden: tr('Oculto', 'Ausgeblendet', 'Hidden'),
      preview: tr('Prévia da cor', 'Farbvorschau', 'Color preview'),
    };

    const backgroundColor = String(
      this.config.playerControlsBackgroundColor ??
      PLAYER_CONTROLS_BACKGROUND_COLOR_DEFAULT,
    );

    const isHex = /^#[0-9a-fA-F]{6}$/.test(backgroundColor);
    const defaultColor = PLAYER_CONTROLS_BACKGROUND_COLOR_DEFAULT;

    const pickerColor = isHex
      ? backgroundColor
      : /^#[0-9a-fA-F]{6}$/.test(defaultColor)
        ? defaultColor
        : '#202020';

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

    const controls = [
      {
        name: 'playerVolumeControlsHideMute',
        icon: 'mdi:volume-off',
        label: tr('Silenciar', 'Stummschalten', 'Mute'),
        inverted: true,
      },
      {
        name: 'playerVolumeControlsHidePower',
        icon: 'mdi:power',
        label: tr('Ligar / desligar', 'Ein / Aus', 'Power'),
        inverted: true,
      },
      {
        name: 'playerVolumeControlsHideSlider',
        icon: 'mdi:tune-vertical',
        label: tr('Controle deslizante', 'Schieberegler', 'Volume slider'),
        inverted: true,
      },
      {
        name: 'playerVolumeControlsShowPlusMinus',
        icon: 'mdi:plus-minus',
        label: tr('Mais / menos', 'Plus / Minus', 'Plus / minus'),
        inverted: false,
      },
      {
        name: 'playerVolumeControlsHideLevels',
        icon: 'mdi:volume-high',
        label: tr('Níveis', 'Lautstärkepegel', 'Volume levels'),
        inverted: true,
      },
    ] as const;

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

          <p class="studio-hint appearance-hint">
            ${labels.backgroundHelp}
          </p>

          <div class="color-top">
            <span class="field-label">${t('backgroundColor')}</span>

            <button
              class="reset"
              type="button"
              @click=${() => this.setBackgroundColor(defaultColor)}
            >
              ${labels.reset}
            </button>
          </div>

          <div class="color-controls">
            <label class="color-picker" title=${labels.appearance}>
              <input
                type="color"
                aria-label=${labels.appearance}
                .value=${pickerColor}
                @input=${(event: Event) =>
                  this.setBackgroundColor(
                    (event.currentTarget as HTMLInputElement).value,
                  )}
              />
            </label>

            <input
              class="studio-input"
              type="text"
              aria-label=${t('backgroundColor')}
              spellcheck="false"
              .value=${backgroundColor}
              @change=${(event: Event) =>
                this.setBackgroundColor(
                  (event.currentTarget as HTMLInputElement).value.trim(),
                )}
            />
          </div>

          <div class="preview-heading">${labels.preview}</div>
          <div
            class="color-preview"
            style=${`background: ${backgroundColor};`}
          ></div>
        </section>

        <section class="studio-panel">
          <div class="studio-heading">
            <ha-icon icon="mdi:eye-outline"></ha-icon>
            <div>
              <div class="studio-title">${labels.visibility}</div>
              <div class="studio-hint">${labels.visibilityHelp}</div>
            </div>
          </div>

          <div class="controls-grid">
            ${controls.map((control) => {
              const rawValue = Boolean(this.config[control.name]);
              const visible = control.inverted ? !rawValue : rawValue;

              return html`
                <button
                  type="button"
                  class="control-tile ${visible ? 'selected' : 'hidden'}"
                  aria-label=${control.label}
                  aria-pressed=${String(visible)}
                  @click=${() =>
                    this.setField(
                      control.name,
                      control.inverted ? visible : !visible,
                    )}
                >
                  <span class="control-art">
                    <ha-icon icon=${control.icon}></ha-icon>
                  </span>

                  <span class="control-label">${control.label}</span>

                  <span class="control-status">
                    <ha-icon
                      icon=${visible
                        ? 'mdi:check-circle'
                        : 'mdi:circle-outline'}
                    ></ha-icon>
                    ${visible ? labels.visible : labels.hidden}
                  </span>
                </button>
              `;
            })}
          </div>
        </section>
      </div>
    `;
  }

  static get styles() {
    return css`
      :host {
        display: block;
        min-width: 0;
      }

      * {
        box-sizing: border-box;
      }

      .studio-volume {
        display: grid;
        gap: 12px;
        min-width: 0;
      }

      .studio-description {
        margin: 0 0 2px;
        color: var(--secondary-text-color);
        font-size: 12px;
        line-height: 1.5;
      }

      .studio-panel {
        min-width: 0;
        padding: 14px;
        border: 1px solid
          var(--divider-color, rgba(128,128,128,.2));
        border-radius: 12px;
        background: var(
          --card-background-color,
          var(--ha-card-background, transparent)
        );
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

      .studio-title {
        font-size: 13px;
        font-weight: 600;
        color: var(--primary-text-color);
      }

      .studio-hint {
        margin-top: 3px;
        font-size: 11px;
        line-height: 1.4;
        color: var(--secondary-text-color);
      }

      .appearance-hint {
        margin: 0 0 14px;
      }

      .color-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
        margin-bottom: 8px;
      }

      .field-label {
        font-size: 12px;
        font-weight: 550;
        color: var(--secondary-text-color);
      }

      .reset {
        border: 0;
        padding: 2px 0;
        background: transparent;
        color: var(--primary-color, #34d399);
        font: inherit;
        font-size: 11px;
        cursor: pointer;
      }

      .reset:hover {
        text-decoration: underline;
      }

      .color-controls {
        display: flex;
        align-items: center;
        gap: 9px;
      }

      .color-picker {
        flex: 0 0 40px;
        width: 40px;
        height: 38px;
        border: 1px solid var(--divider-color);
        border-radius: 9px;
        overflow: hidden;
        cursor: pointer;
      }

      .color-picker input {
        display: block;
        width: 100%;
        height: 100%;
        padding: 0;
        border: 0;
        background: transparent;
        cursor: pointer;
      }

      .color-picker input::-webkit-color-swatch-wrapper {
        padding: 3px;
      }

      .color-picker input::-webkit-color-swatch {
        border: 0;
        border-radius: 5px;
      }

      .studio-input {
        display: block;
        flex: 1;
        min-width: 0;
        height: 38px;
        padding: 0 11px;
        border: 1px solid var(--divider-color);
        border-radius: 9px;
        background: var(--secondary-background-color);
        color: var(--primary-text-color);
        font: inherit;
        font-size: 13px;
      }

      .studio-input:focus-visible,
      .reset:focus-visible,
      .color-picker:focus-within {
        outline: 2px solid var(--primary-color);
        outline-offset: 2px;
      }

      .preview-heading {
        margin-top: 14px;
        margin-bottom: 7px;
        font-size: 11px;
        color: var(--secondary-text-color);
      }

      .color-preview {
        height: 48px;
        border: 1px solid var(--divider-color);
        border-radius: 9px;
        background: var(--secondary-background-color);
      }

      .controls-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 8px;
      }

      .control-tile {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 8px;
        min-width: 0;
        min-height: 115px;
        padding: 11px 5px;
        border: 2px solid
          var(--divider-color, rgba(128,128,128,.2));
        border-radius: 12px;
        background: transparent;
        color: var(--primary-text-color);
        font: inherit;
        cursor: pointer;
        transition:
          border-color .15s ease,
          background .15s ease;
      }

      .control-tile:hover {
        background: var(
          --secondary-background-color,
          rgba(128,128,128,.08)
        );
      }

      .control-tile.selected {
        border-color: #34d399;
      }

      .control-tile.hidden {
        opacity: .58;
      }

      .control-tile:focus-visible {
        outline: 2px solid var(--primary-color);
        outline-offset: 2px;
      }

      .control-art {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        max-width: 95px;
        height: 48px;
        border-radius: 9px;
        background: var(
          --secondary-background-color,
          rgba(128,128,128,.1)
        );
      }

      .control-art ha-icon {
        --mdc-icon-size: 29px;
      }

      .selected .control-art {
        color: #34d399;
      }

      .control-label {
        font-size: 11px;
        font-weight: 600;
        text-align: center;
        overflow-wrap: anywhere;
      }

      .control-status {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 3px;
        font-size: 10px;
        color: var(--secondary-text-color);
      }

      .control-status ha-icon {
        --mdc-icon-size: 13px;
      }

      .selected .control-status ha-icon {
        color: #34d399;
      }

      @media (max-width: 340px) {
        .studio-panel {
          padding: 10px;
        }

        .controls-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }
    `;
  }
}

customElements.define(
  'crm-player-volume-editor',
  PlayerVolumeSettingsEditor,
);
