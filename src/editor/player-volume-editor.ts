
import { css, html, TemplateResult } from 'lit';

import { PLAYER_CONTROLS_BACKGROUND_COLOR_DEFAULT } from '../constants';
import { BaseEditor } from './base-editor';
import { translate } from '../localization/i18n';

class PlayerVolumeSettingsEditor extends BaseEditor {
  private setField(name: string, value: string | boolean): void {
    this.configChanged({ ...this.config, [name]: value });
  }

  private setBackgroundColor(value: string): void {
    this.setField('playerControlsBackgroundColor', value);
  }

  private setVolumeNumber(name: string, value: string, min: number, max: number): void {
    if (value.trim() === '') return;
    const parsed = Number(value);
    if (!Number.isFinite(parsed)) return;
    this.configChanged({
      ...this.config,
      [name]: Math.max(min, Math.min(max, Math.round(parsed))),
    });
  }

  private restoreBackground(): void {
    const next = { ...this.config };
    delete next.playerControlsBackgroundColor;
    this.configChanged(next);
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
      preview: tr('Prévia dos controles', 'Vorschau der Bedienelemente', 'Controls preview'),
      max: tr('Volume máximo', 'Maximale Lautstärke', 'Maximum volume'),
      step: tr('Ajuste por toque', 'Schrittweite', 'Volume step'),
      customColor: tr('Cor personalizada (CSS)', 'Eigene Farbe (CSS)', 'Custom CSS color'),
      palette: tr('Cores rápidas', 'Schnellfarben', 'Quick colors'),
      defaultColor: tr('Cor padrão', 'Standardfarbe', 'Default color'),
      percent: tr('Limite de saída', 'Ausgabelimit', 'Output limit'),
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

    const maxValue = Math.max(10, Math.min(100, Number(this.config.playerVolumeMaxValue ?? 100) || 100));
    const stepValue = Math.max(1, Math.min(30, Number(this.config.playerVolumeStepValue ?? 10) || 10));
    const quickColors = ['#101b19', '#1c2430', '#28324a', '#173d35', '#2d253b'];
    const isDefaultBackground = this.config.playerControlsBackgroundColor == null;

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

          <div class="volume-setting">
            <div class="setting-top">
              <span class="setting-name">${labels.max}</span>
              <span class="setting-reading">${maxValue}<small>%</small></span>
            </div>
            <div class="slider-row">
              <ha-icon icon="mdi:volume-medium"></ha-icon>
              <input class="studio-range" type="range" min="10" max="100" step="1"
                aria-label=${labels.max} .value=${String(maxValue)}
                @input=${(event: Event) => this.setVolumeNumber('playerVolumeMaxValue', (event.currentTarget as HTMLInputElement).value, 10, 100)} />
              <ha-icon icon="mdi:volume-high"></ha-icon>
            </div>
            <div class="range-caption"><span>10%</span><span>100%</span></div>
          </div>

          <div class="volume-setting">
            <div class="setting-top">
              <span class="setting-name">${labels.step}</span>
              <span class="setting-reading">${stepValue}<small>%</small></span>
            </div>
            <div class="slider-row">
              <ha-icon icon="mdi:minus-circle-outline"></ha-icon>
              <input class="studio-range" type="range" min="1" max="30" step="1"
                aria-label=${labels.step} .value=${String(stepValue)}
                @input=${(event: Event) => this.setVolumeNumber('playerVolumeStepValue', (event.currentTarget as HTMLInputElement).value, 1, 30)} />
              <ha-icon icon="mdi:plus-circle-outline"></ha-icon>
            </div>
            <div class="range-caption"><span>1%</span><span>30%</span></div>
          </div>
        </section>

        <section class="studio-panel">
          <div class="studio-heading">
            <ha-icon icon="mdi:palette-outline"></ha-icon>
            <div>
              <div class="studio-title">${labels.appearance}</div>
              <div class="studio-hint">${labels.backgroundHelp}</div>
            </div>
          </div>

          <div class="color-top">
            <span class="field-label">${labels.palette}</span>
            <button class="reset" type="button" @click=${() => this.restoreBackground()}>${labels.reset}</button>
          </div>
          <div class="palette-row" role="group" aria-label=${labels.palette}>
            <button type="button" class="palette-default ${isDefaultBackground ? 'active' : ''}"
              aria-label=${labels.defaultColor} aria-pressed=${String(isDefaultBackground)}
              @click=${() => this.restoreBackground()}>
              <ha-icon icon="mdi:theme-light-dark"></ha-icon>
            </button>
            ${quickColors.map((color) => html`
              <button type="button" class="palette-swatch ${!isDefaultBackground && backgroundColor.toLowerCase() === color ? 'active' : ''}"
                style=${`--swatch:${color}`} aria-label=${color}
                aria-pressed=${String(!isDefaultBackground && backgroundColor.toLowerCase() === color)}
                @click=${() => this.setBackgroundColor(color)}>
                <ha-icon icon="mdi:check"></ha-icon>
              </button>
            `)}
          </div>

          <div class="preview-heading">${labels.preview}</div>
          <div class="volume-preview" style=${`background: ${backgroundColor};`}>
            <ha-icon icon="mdi:volume-medium"></ha-icon>
            <span class="preview-track"><span style=${`width:${Math.min(maxValue, 100)}%`}></span></span>
            <strong>${maxValue}%</strong>
          </div>

          <details class="advanced-color">
            <summary><ha-icon icon="mdi:tune-variant"></ha-icon>${labels.customColor}</summary>
            <div class="color-controls">
              <label class="color-picker" title=${labels.appearance}>
                <input type="color" aria-label=${labels.appearance} .value=${pickerColor}
                  @input=${(event: Event) => this.setBackgroundColor((event.currentTarget as HTMLInputElement).value)} />
              </label>
              <input class="studio-input" type="text" aria-label=${t('backgroundColor')}
                spellcheck="false" .value=${backgroundColor}
                @change=${(event: Event) => this.setBackgroundColor((event.currentTarget as HTMLInputElement).value.trim())} />
            </div>
          </details>
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


      /* Premium volume settings — leaves the existing visibility tiles untouched. */
      .volume-setting { padding: 13px; border: 1px solid var(--divider-color, rgba(128,128,128,.2)); border-radius: 12px; background: var(--secondary-background-color, rgba(128,128,128,.06)); }
      .volume-setting + .volume-setting { margin-top: 10px; }
      .setting-top { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 13px; }
      .setting-name { color: var(--primary-text-color); font-size: 12px; font-weight: 600; }
      .setting-reading { color: var(--primary-color, #34d399); font-size: 22px; font-weight: 750; font-variant-numeric: tabular-nums; }
      .setting-reading small { font-size: 12px; margin-left: 2px; }
      .slider-row { display: flex; align-items: center; gap: 10px; }
      .slider-row ha-icon { flex: 0 0 auto; color: var(--secondary-text-color); --mdc-icon-size: 18px; }
      .studio-range { flex: 1; min-width: 0; width: 100%; height: 5px; accent-color: var(--primary-color, #34d399); cursor: pointer; }
      .studio-range:focus-visible { outline: 2px solid var(--primary-color, #34d399); outline-offset: 5px; }
      .range-caption { display: flex; justify-content: space-between; margin: 8px 27px 0; color: var(--secondary-text-color); font-size: 10px; }
      .palette-row { display: flex; flex-wrap: wrap; gap: 9px; margin: 12px 0 17px; }
      .palette-swatch, .palette-default { display: grid; place-items: center; width: 39px; height: 39px; border: 2px solid var(--divider-color, rgba(128,128,128,.3)); border-radius: 12px; cursor: pointer; color: white; }
      .palette-swatch { background: var(--swatch); }
      .palette-default { background: var(--secondary-background-color, rgba(128,128,128,.1)); color: var(--primary-text-color); }
      .palette-swatch.active, .palette-default.active { border-color: var(--primary-color, #34d399); box-shadow: 0 0 0 1px var(--primary-color, #34d399); }
      .palette-swatch ha-icon { --mdc-icon-size: 17px; opacity: 0; }
      .palette-swatch.active ha-icon { opacity: 1; }
      .palette-default ha-icon { --mdc-icon-size: 20px; }
      .palette-swatch:focus-visible, .palette-default:focus-visible { outline: 2px solid var(--primary-color, #34d399); outline-offset: 3px; }
      .volume-preview { display: flex; align-items: center; gap: 11px; min-height: 60px; padding: 13px; border: 1px solid var(--divider-color, rgba(128,128,128,.2)); border-radius: 12px; color: #f0fdf4; }
      .volume-preview > ha-icon { --mdc-icon-size: 23px; flex: 0 0 auto; }
      .volume-preview strong { min-width: 36px; font-size: 12px; text-align: right; font-variant-numeric: tabular-nums; }
      .preview-track { display: block; flex: 1; min-width: 0; height: 5px; border-radius: 9px; background: rgba(255,255,255,.25); overflow: hidden; }
      .preview-track > span { display: block; height: 100%; border-radius: inherit; background: var(--primary-color, #34d399); }
      .advanced-color { margin-top: 15px; border-top: 1px solid var(--divider-color, rgba(128,128,128,.2)); padding-top: 12px; }
      .advanced-color summary { display: flex; align-items: center; gap: 7px; cursor: pointer; color: var(--secondary-text-color); font-size: 11px; list-style: none; }
      .advanced-color summary::-webkit-details-marker { display: none; }
      .advanced-color summary ha-icon { --mdc-icon-size: 17px; }
      .advanced-color .color-controls { margin-top: 12px; }

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
        border-color: var(--crm-editor-accent, var(--primary-color, #34d399));
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
        color: var(--crm-editor-accent, var(--primary-color, #34d399));
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
        color: var(--crm-editor-accent, var(--primary-color, #34d399));
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
