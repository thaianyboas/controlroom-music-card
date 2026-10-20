
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

    const language =
      this.config.language && this.config.language !== 'auto'
        ? this.config.language.toLowerCase()
        : (this.hass.language || 'en').toLowerCase();

    const pt = language.startsWith('pt');
    const de = language.startsWith('de');

    const labels = {
      title: pt
        ? 'Tamanho da imagem de fundo'
        : de
          ? 'Größe des Hintergrundbildes'
          : 'Background image size',
      cover: pt ? 'Cobrir' : de ? 'Abdecken' : 'Cover',
      contain: pt ? 'Conter' : de ? 'Einpassen' : 'Contain',
      stretch: pt ? 'Esticar' : de ? 'Strecken' : 'Stretch',
      custom: pt
        ? 'Personalizado'
        : de
          ? 'Benutzerdefiniert'
          : 'Custom',
      customHint: pt
        ? 'Digite um valor CSS, por exemplo: 80% auto'
        : de
          ? 'CSS-Wert eingeben, zum Beispiel: 80% auto'
          : 'Enter a CSS value, for example: 80% auto',
      idle: pt
        ? 'Comportamento sem reprodução'
        : de
          ? 'Verhalten ohne Wiedergabe'
          : 'Idle behavior',
    };

    const currentSize =
      this.config.playerBackgroundImageSize ??
      PLAYER_BACKGROUND_IMAGE_SIZE_DEFAULT;

    const presets = ['cover', 'contain', '100% 100%'];

    const selectedSize = presets.includes(currentSize)
      ? currentSize
      : 'custom';

    const options = [
      {
        value: 'cover',
        label: labels.cover,
        icon: 'mdi:image-size-select-large',
      },
      {
        value: 'contain',
        label: labels.contain,
        icon: 'mdi:fit-to-screen-outline',
      },
      {
        value: '100% 100%',
        label: labels.stretch,
        icon: 'mdi:arrow-expand-all',
      },
      {
        value: 'custom',
        label: labels.custom,
        icon: 'mdi:tune-variant',
      },
    ];

    const configSettingsSchema = [
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
        <div class="studio-description">
          ${t('description')}
        </div>

        <section class="image-size-panel">
          <div class="panel-title">${labels.title}</div>

          <div class="image-size-options">
            ${options.map(
              (option) => html`
                <button
                  type="button"
                  class="image-size-option ${
                    selectedSize === option.value ? 'selected' : ''
                  }"
                  aria-pressed=${String(selectedSize === option.value)}
                  @click=${() => {
                    const value =
                      option.value === 'custom'
                        ? selectedSize === 'custom'
                          ? currentSize
                          : '80% auto'
                        : option.value;

                    this.configChanged({
                      ...this.config,
                      playerBackgroundImageSize: value,
                    });
                  }}
                >
                  <span class="image-size-art">
                    <ha-icon icon=${option.icon}></ha-icon>
                  </span>

                  <span class="image-size-label">
                    ${option.label}
                  </span>
                </button>
              `,
            )}
          </div>

          ${selectedSize === 'custom'
            ? html`
                <label
                  class="custom-size-label"
                  for="crm-custom-image-size"
                >
                  ${labels.customHint}
                </label>

                <input
                  id="crm-custom-image-size"
                  class="custom-size-input"
                  type="text"
                  .value=${currentSize}
                  @change=${(event: Event) => {
                    const input =
                      event.currentTarget as HTMLInputElement;

                    this.configChanged({
                      ...this.config,
                      playerBackgroundImageSize: input.value.trim(),
                    });
                  }}
                />
              `
            : ''}
        </section>

        <section class="studio-settings">
          <div class="panel-title">${labels.idle}</div>

          <crm-editor-form
            .schema=${configSettingsSchema}
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

      .studio-player-general {
        display: grid;
        gap: 12px;
        min-width: 0;
      }

      .studio-description {
        color: var(--secondary-text-color);
        font-size: 12px;
        line-height: 1.5;
      }

      .image-size-panel,
      .studio-settings {
        min-width: 0;
        padding: 14px;
        border: 1px solid
          var(--divider-color, rgba(128, 128, 128, 0.2));
        border-radius: 12px;
        background: var(
          --card-background-color,
          var(--ha-card-background, transparent)
        );
      }

      .panel-title {
        margin-bottom: 12px;
        font-size: 13px;
        font-weight: 650;
        color: var(--primary-text-color);
      }

      .image-size-options {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 9px;
      }

      .image-size-option {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 10px;
        min-width: 0;
        min-height: 110px;
        padding: 12px 7px;
        border: 2px solid
          var(--divider-color, rgba(128, 128, 128, 0.2));
        border-radius: 12px;
        background: transparent;
        color: var(--primary-text-color);
        font: inherit;
        cursor: pointer;
        transition:
          border-color 0.15s ease,
          background 0.15s ease;
      }

      .image-size-option:hover {
        background: var(
          --secondary-background-color,
          rgba(128, 128, 128, 0.08)
        );
      }

      .image-size-option.selected {
        border-color: #34d399;
      }

      .image-size-option:focus-visible {
        outline: 2px solid #34d399;
        outline-offset: 2px;
      }

      .image-size-art {
        display: grid;
        place-items: center;
        width: 100%;
        max-width: 115px;
        height: 65px;
        border-radius: 9px;
        background: var(
          --secondary-background-color,
          rgba(128, 128, 128, 0.1)
        );
        color: var(--secondary-text-color);
      }

      .selected .image-size-art {
        color: #34d399;
      }

      .image-size-art ha-icon {
        --mdc-icon-size: 35px;
      }

      .image-size-label {
        font-size: 12px;
        font-weight: 550;
        text-align: center;
      }

      .custom-size-label {
        display: block;
        margin-top: 13px;
        font-size: 11px;
        line-height: 1.5;
        color: var(--secondary-text-color);
      }

      .custom-size-input {
        display: block;
        width: 100%;
        height: 39px;
        margin-top: 7px;
        padding: 0 11px;
        border: 1px solid var(--divider-color);
        border-radius: 9px;
        background: var(--secondary-background-color);
        color: var(--primary-text-color);
        font: inherit;
        font-size: 13px;
      }

      .custom-size-input:focus-visible {
        outline: 2px solid var(--primary-color);
        outline-offset: 2px;
      }

      crm-editor-form {
        display: block;
        min-width: 0;
      }

      @media (max-width: 340px) {
        .image-size-panel,
        .studio-settings {
          padding: 10px;
        }

        .image-size-options {
          gap: 6px;
        }

        .image-size-option {
          padding: 9px 5px;
        }
      }
    `;
  }
}

customElements.define(
  'crm-player-general-editor',
  PlayerGeneralSettingsEditor,
);
