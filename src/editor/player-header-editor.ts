
import { css, html, TemplateResult } from 'lit';

import { PLAYER_CONTROLS_BACKGROUND_COLOR_DEFAULT } from '../constants';
import { BaseEditor } from './base-editor';
import { Section } from '../types/section';
import { translate } from '../localization/i18n';

class PlayerHeaderSettingsEditor extends BaseEditor {
  private setBackgroundColor(value: string): void {
    this.configChanged({
      ...this.config,
      playerHeaderBackgroundColor: value,
    });
  }

  private onColorChange(event: Event): void {
    const input = event.currentTarget as HTMLInputElement;
    this.setBackgroundColor(input.value);
  }

  private onTextChange(event: Event): void {
    const input = event.currentTarget as HTMLInputElement;
    this.setBackgroundColor(input.value.trim());
  }

  protected render(): TemplateResult {
    super.createStore();

    const t = (key: string): string =>
      translate(
        `editor.playerHeaderSettings.${key}`,
        this.config.language ?? 'auto',
        this.hass.language,
      );

    const lang = (
      this.config.language === 'auto' || !this.config.language
        ? this.hass.language || 'en'
        : this.config.language
    ).toLowerCase();

    const pt = lang.startsWith('pt');
    const de = lang.startsWith('de');

    const labels = {
      content: pt
        ? 'Textos do cabeçalho'
        : de
          ? 'Texte im Kopfbereich'
          : 'Header text',
      appearance: pt
        ? 'Cor do cabeçalho'
        : de
          ? 'Farbe des Kopfbereichs'
          : 'Header color',
      visibility: pt
        ? 'Visibilidade'
        : de
          ? 'Sichtbarkeit'
          : 'Visibility',
      appearanceHint: pt
        ? 'Escolha uma cor ou digite um valor CSS personalizado.'
        : de
          ? 'Farbe auswählen oder einen eigenen CSS-Wert eingeben.'
          : 'Choose a color or enter a custom CSS value.',
      reset: pt
        ? 'Restaurar'
        : de
          ? 'Zurücksetzen'
          : 'Reset',
      preview: pt
        ? 'Prévia da cor'
        : de
          ? 'Farbvorschau'
          : 'Color preview',
    };

    const backgroundColor =
      this.config.playerHeaderBackgroundColor ??
      PLAYER_CONTROLS_BACKGROUND_COLOR_DEFAULT;

    const isHex = /^#[0-9a-fA-F]{6}$/.test(backgroundColor);

    const pickerColor = isHex
      ? backgroundColor
      : /^#[0-9a-fA-F]{6}$/.test(
            PLAYER_CONTROLS_BACKGROUND_COLOR_DEFAULT,
          )
        ? PLAYER_CONTROLS_BACKGROUND_COLOR_DEFAULT
        : '#202020';

    const textSchema = [
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
    ];

    const visibilitySchema = [
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
      <div class="studio-header">
        <p class="studio-description">
          ${t('description')}
        </p>

        <section class="studio-panel">
          <div class="studio-panel-heading">
            <ha-icon icon="mdi:text-box-outline"></ha-icon>
            <span>${labels.content}</span>
          </div>

          <crm-editor-form
            .schema=${textSchema}
            .section=${Section.PLAYER}
            .store=${this.store}
            .config=${this.config}
            .hass=${this.hass}
          ></crm-editor-form>
        </section>

        <section class="studio-panel">
          <div class="studio-panel-heading">
            <ha-icon icon="mdi:palette-outline"></ha-icon>
            <span>${labels.appearance}</span>
          </div>

          <p class="studio-hint">
            ${labels.appearanceHint}
          </p>

          <div class="color-top">
            <span class="field-label">
              ${t('backgroundColor')}
            </span>

            <button
              class="reset"
              type="button"
              @click=${() =>
                this.setBackgroundColor(
                  PLAYER_CONTROLS_BACKGROUND_COLOR_DEFAULT,
                )}
            >
              ${labels.reset}
            </button>
          </div>

          <div class="color-controls">
            <label
              class="color-picker"
              title=${labels.appearance}
            >
              <input
                type="color"
                aria-label=${labels.appearance}
                .value=${pickerColor}
                @input=${this.onColorChange}
              />
            </label>

            <input
              class="studio-input"
              type="text"
              aria-label=${labels.appearance}
              spellcheck="false"
              .value=${backgroundColor}
              @change=${this.onTextChange}
            />
          </div>

          <div class="preview-heading">
            ${labels.preview}
          </div>

          <div
            class="color-preview"
            style=${`background: ${backgroundColor};`}
          ></div>
        </section>

        <section class="studio-panel">
          <div class="studio-panel-heading">
            <ha-icon icon="mdi:eye-outline"></ha-icon>
            <span>${labels.visibility}</span>
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
      :host {
        display: block;
        min-width: 0;
      }

      * {
        box-sizing: border-box;
      }

      .studio-header {
        display: grid;
        gap: 10px;
        min-width: 0;
      }

      .studio-description {
        margin: 0 0 3px;
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

      .studio-panel-heading {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 12px;
        color: var(--primary-text-color);
        font-size: 13px;
        font-weight: 650;
      }

      .studio-panel-heading ha-icon {
        color: var(--secondary-text-color);
        --mdc-icon-size: 18px;
      }

      .studio-hint {
        margin: -3px 0 12px;
        color: var(--secondary-text-color);
        font-size: 11px;
        line-height: 1.45;
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
        position: relative;
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

      crm-editor-form {
        display: block;
        min-width: 0;
      }

      @media (max-width: 340px) {
        .studio-panel {
          padding: 10px;
        }
      }
    `;
  }
}

customElements.define(
  'crm-player-header-editor',
  PlayerHeaderSettingsEditor,
);
