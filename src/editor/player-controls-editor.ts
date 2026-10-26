import { css, html, TemplateResult } from 'lit';
import { PLAYER_CONTROLS_ICON_SIZE_DEFAULT } from '../constants';
import { BaseEditor } from './base-editor';
import { Section } from '../types/section';
import { translate } from '../localization/i18n';

class PlayerControlsSettingsEditor extends BaseEditor {
  private setIconSize(value: string): void {
    this.configChanged({ ...this.config, playerControlsIconSize: value });
  }

  private onCustomSizeChange(event: Event): void {
    const value = (event.currentTarget as HTMLInputElement).value.trim();
    if (value) this.setIconSize(value);
  }
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

    // Keep existing CSS sizes intact, including user-defined px/rem values.
    const configuredSize = String(this.config.playerControlsIconSize ?? PLAYER_CONTROLS_ICON_SIZE_DEFAULT);
    const sizes = [
      { id: 'small', value: '24px', icon: 19, label: heading('Pequeno', 'Klein', 'Small') },
      { id: 'medium', value: '32px', icon: 25, label: heading('Médio', 'Mittel', 'Medium') },
      { id: 'large', value: '40px', icon: 32, label: heading('Grande', 'Groß', 'Large') },
    ] as const;
    const isPreset = sizes.some((size) => size.value === configuredSize);

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

          <div class="size-choices" role="group" aria-label=${t('iconSize')}>
            ${sizes.map((size) => html`
              <button
                type="button"
                class="size-choice ${configuredSize === size.value ? 'active' : ''}"
                aria-pressed=${String(configuredSize === size.value)}
                @click=${() => this.setIconSize(size.value)}
              >
                <span class="size-art" aria-hidden="true">
                  <ha-icon icon="mdi:skip-previous" style=${`--mdc-icon-size:${Math.round(size.icon * .72)}px`}></ha-icon>
                  <span class="size-play">
                    <ha-icon icon="mdi:play" style=${`--mdc-icon-size:${size.icon}px`}></ha-icon>
                  </span>
                  <ha-icon icon="mdi:skip-next" style=${`--mdc-icon-size:${Math.round(size.icon * .72)}px`}></ha-icon>
                </span>
                <span class="size-name">${size.label}</span>
                <span class="size-value">${size.value}</span>
                <ha-icon class="size-check" icon="mdi:check-circle"></ha-icon>
              </button>
            `)}
          </div>
          <details class="size-custom" ?open=${!isPreset}>
            <summary>
              <ha-icon icon="mdi:tune-variant"></ha-icon>
              ${heading('Tamanho personalizado', 'Benutzerdefinierte Größe', 'Custom size')}
              ${!isPreset ? html`<span class="custom-value">${configuredSize}</span>` : ''}
            </summary>
            <label class="custom-field">
              <span>${heading('Valor CSS (ex.: 28px ou 1.75rem)', 'CSS-Wert (z. B. 28px oder 1.75rem)', 'CSS value (e.g. 28px or 1.75rem)')}</span>
              <input
                type="text"
                .value=${configuredSize}
                @change=${this.onCustomSizeChange}
                @keydown=${(event: KeyboardEvent) => { if (event.key === 'Enter') this.onCustomSizeChange(event); }}
              />
            </label>
          </details>
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

      .size-choices { display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); gap: 8px; }
      .size-choice { position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 7px; min-width: 0; min-height: 112px; padding: 12px 4px 10px; border: 1px solid var(--divider-color,rgba(128,128,128,.25)); border-radius: 13px; background: var(--secondary-background-color,rgba(128,128,128,.06)); color: var(--primary-text-color); font: inherit; cursor: pointer; transition: border-color .15s, background-color .15s; }
      .size-choice:hover { background: var(--divider-color,rgba(128,128,128,.13)); }
      .size-choice.active { border: 2px solid var(--primary-color,#34d399); padding: 11px 3px 9px; }
      .size-choice:focus-visible { outline: 2px solid var(--primary-color,#34d399); outline-offset: 2px; }
      .size-art { display: flex; align-items: center; justify-content: center; gap: 2px; height: 43px; max-width: 100%; color: var(--secondary-text-color); }
      .size-art > ha-icon { flex-shrink: 1; }
      .size-play { display: grid; place-items: center; width: 38px; height: 38px; flex-shrink: 0; border-radius: 50%; background: var(--primary-color,#34d399); color: var(--card-background-color,#102019); }
      .size-name { font-size: 12px; font-weight: 650; }
      .size-value { font-size: 10px; color: var(--secondary-text-color); }
      .size-check { position: absolute; top: 5px; right: 5px; --mdc-icon-size: 14px; color: var(--primary-color,#34d399); opacity: 0; }
      .size-choice.active .size-check { opacity: 1; }
      .size-custom { margin-top: 12px; border-top: 1px solid var(--divider-color,rgba(128,128,128,.2)); padding-top: 10px; }
      .size-custom summary { display: flex; align-items: center; gap: 7px; font-size: 11px; color: var(--secondary-text-color); cursor: pointer; list-style: none; }
      .size-custom summary::-webkit-details-marker { display: none; }
      .size-custom summary > ha-icon { --mdc-icon-size: 17px; }
      .custom-value { margin-left: auto; font-weight: 650; color: var(--primary-text-color); }
      .custom-field { display: grid; gap: 7px; margin-top: 12px; font-size: 11px; color: var(--secondary-text-color); }
      .custom-field input { width: 100%; height: 38px; border: 1px solid var(--divider-color); border-radius: 9px; background: var(--secondary-background-color); color: var(--primary-text-color); padding: 0 11px; font: inherit; font-size: 13px; }
      .custom-field input:focus-visible { outline: 2px solid var(--primary-color); outline-offset: 2px; }

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
