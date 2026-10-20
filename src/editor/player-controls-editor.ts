
import { css, html, TemplateResult } from 'lit';

import { PLAYER_CONTROLS_ICON_SIZE_DEFAULT } from '../constants';
import { BaseEditor } from './base-editor';
import { Section } from '../types/section';
import { translate } from '../localization/i18n';

class PlayerControlsSettingsEditor extends BaseEditor {
  private setVisibility(name: string, visible: boolean): void {
    this.configChanged({
      ...this.config,
      [name]: !visible,
    });
  }

  protected render(): TemplateResult {
    super.createStore();

    const t = (key: string): string =>
      translate(
        `editor.playerControlsSettings.${key}`,
        this.config.language ?? 'auto',
        this.hass.language,
      );

    const language =
      this.config.language && this.config.language !== 'auto'
        ? this.config.language.toLowerCase()
        : (this.hass.language || 'en').toLowerCase();

    const isPt = language.startsWith('pt');
    const isDe = language.startsWith('de');

    const heading = (pt: string, de: string, en: string): string =>
      isPt ? pt : isDe ? de : en;

    const controls = [
      {
        name: 'playerControlsHideTrackPrev',
        icon: 'mdi:skip-previous',
        label: heading('Anterior', 'Zurück', 'Previous'),
      },
      {
        name: 'playerControlsHidePlayPause',
        icon: 'mdi:play-circle-outline',
        label: heading('Reproduzir', 'Wiedergabe', 'Play / Pause'),
      },
      {
        name: 'playerControlsHideTrackNext',
        icon: 'mdi:skip-next',
        label: heading('Próxima', 'Weiter', 'Next'),
      },
      {
        name: 'playerControlsHideShuffle',
        icon: 'mdi:shuffle',
        label: heading('Aleatório', 'Zufall', 'Shuffle'),
      },
      {
        name: 'playerControlsHideRepeat',
        icon: 'mdi:repeat',
        label: heading('Repetir', 'Wiederholen', 'Repeat'),
      },
      {
        name: 'playerControlsHideFavorites',
        icon: 'mdi:heart-outline',
        label: heading('Favoritos', 'Favoriten', 'Favorites'),
      },
      {
        name: 'playerControlsHidePlayQueue',
        icon: 'mdi:playlist-music',
        label: heading('Fila', 'Warteschlange', 'Queue'),
      },
    ] as const;

    const sizeSchema = [
      {
        name: 'playerControlsIconSize',
        label: t('iconSize'),
        help: `${t('iconSizeHelp')} "${PLAYER_CONTROLS_ICON_SIZE_DEFAULT}"`,
        required: false,
        type: 'string',
        default: PLAYER_CONTROLS_ICON_SIZE_DEFAULT,
      },
    ];

    const visibilitySchema = [
      {
        name: 'playerControlsHide',
        label: t('hideControls'),
        required: false,
        selector: { boolean: {} },
      },
    ];

    const allHidden = Boolean(this.config.playerControlsHide);

    return html`
      <div class="studio-controls">
        <p class="studio-description">
          ${t('description')}
        </p>

        <section class="studio-panel">
          <div class="studio-heading">
            <span class="studio-icon">
              <ha-icon icon="mdi:resize"></ha-icon>
            </span>
            <div class="studio-heading-copy">
              <span class="studio-title">
                ${heading('Tamanho dos ícones', 'Symbolgröße', 'Icon size')}
              </span>
              <span class="studio-hint">
                ${heading(
                  'Ajuste a dimensão dos botões',
                  'Größe der Tasten anpassen',
                  'Adjust the button dimensions',
                )}
              </span>
            </div>
          </div>

          <crm-editor-form
            .schema=${sizeSchema}
            .section=${Section.PLAYER}
            .store=${this.store}
            .config=${this.config}
            .hass=${this.hass}
          ></crm-editor-form>
        </section>

        <section class="studio-panel">
          <div class="studio-heading">
            <span class="studio-icon">
              <ha-icon icon="mdi:gesture-tap-button"></ha-icon>
            </span>
            <div class="studio-heading-copy">
              <span class="studio-title">
                ${heading(
                  'Botões do reprodutor',
                  'Wiedergabetasten',
                  'Player buttons',
                )}
              </span>
              <span class="studio-hint">
                ${heading(
                  'Toque em cada botão para mostrar ou ocultar',
                  'Tippen, um Tasten ein- oder auszublenden',
                  'Tap each button to show or hide it',
                )}
              </span>
            </div>
          </div>

          <div class="controls-grid">
            ${controls.map((control) => {
              const hidden = Boolean(this.config[control.name]);
              const visible = !hidden;

              return html`
                <button
                  type="button"
                  class="control-tile ${visible ? 'selected' : 'hidden'}"
                  aria-label=${control.label}
                  aria-pressed=${String(visible)}
                  @click=${() =>
                    this.setVisibility(control.name, !visible)}
                >
                  <span class="control-art">
                    <ha-icon icon=${control.icon}></ha-icon>
                  </span>

                  <span class="control-label">
                    ${control.label}
                  </span>

                  <span class="control-status">
                    <ha-icon
                      icon=${visible
                        ? 'mdi:check-circle'
                        : 'mdi:circle-outline'}
                    ></ha-icon>
                    ${visible
                      ? heading('Visível', 'Sichtbar', 'Visible')
                      : heading('Oculto', 'Ausgeblendet', 'Hidden')}
                  </span>
                </button>
              `;
            })}
          </div>

          ${allHidden
            ? html`
                <p class="studio-notice">
                  <ha-icon icon="mdi:information-outline"></ha-icon>
                  ${heading(
                    'Todos os controles estão ocultos pela configuração geral.',
                    'Alle Tasten sind durch die allgemeine Einstellung ausgeblendet.',
                    'All controls are hidden by the general visibility setting.',
                  )}
                </p>
              `
            : ''}
        </section>

        <section class="studio-panel">
          <div class="studio-heading">
            <span class="studio-icon">
              <ha-icon icon="mdi:eye-off-outline"></ha-icon>
            </span>
            <div class="studio-heading-copy">
              <span class="studio-title">
                ${heading(
                  'Visibilidade geral',
                  'Allgemeine Sichtbarkeit',
                  'General visibility',
                )}
              </span>
              <span class="studio-hint">
                ${heading(
                  'Ocultar todos os controles de uma vez',
                  'Alle Bedienelemente ausblenden',
                  'Hide all playback controls',
                )}
              </span>
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
      :host {
        display: block;
        min-width: 0;
      }

      * {
        box-sizing: border-box;
      }

      .studio-controls {
        display: grid;
        gap: 11px;
        min-width: 0;
      }

      .studio-description {
        margin: 0 2px 2px;
        font-size: 12px;
        line-height: 1.5;
        color: var(--secondary-text-color);
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

      .studio-icon {
        display: flex;
        flex: 0 0 34px;
        align-items: center;
        justify-content: center;
        height: 34px;
        border-radius: 9px;
        color: var(--primary-color);
        background: var(
          --secondary-background-color,
          rgba(128,128,128,.12)
        );
      }

      .studio-icon ha-icon {
        --mdc-icon-size: 18px;
      }

      .studio-heading-copy {
        display: grid;
        gap: 3px;
        min-width: 0;
      }

      .studio-title {
        font-size: 13px;
        font-weight: 600;
        color: var(--primary-text-color);
      }

      .studio-hint {
        font-size: 11px;
        line-height: 1.4;
        color: var(--secondary-text-color);
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

      .studio-notice {
        display: flex;
        align-items: flex-start;
        gap: 7px;
        margin: 12px 0 0;
        font-size: 11px;
        line-height: 1.5;
        color: var(--secondary-text-color);
      }

      .studio-notice ha-icon {
        flex-shrink: 0;
        --mdc-icon-size: 17px;
      }

      crm-editor-form {
        display: block;
        min-width: 0;
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
  'crm-player-controls-editor',
  PlayerControlsSettingsEditor,
);
