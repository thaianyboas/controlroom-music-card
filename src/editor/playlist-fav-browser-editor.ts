
import { css, html, TemplateResult } from 'lit';

import { BaseEditor } from './base-editor';
import { CardConfig } from '../types/card-config';
import { EDITOR_DEFAULT_BROWSER_ITEMS_PER_ROW } from '../constants';

class PlaylistFavBrowserEditor extends BaseEditor {
  private get language(): string {
    const selected = this.config?.language;
    return (
      !selected || selected === 'auto'
        ? this.hass?.language || 'en'
        : selected
    ).toLowerCase();
  }

  private tr(pt: string, de: string, en: string): string {
    if (this.language.startsWith('pt')) return pt;
    if (this.language.startsWith('de')) return de;
    return en;
  }

  private value(name: keyof CardConfig, fallback: unknown): any {
    const current = this.config[name];
    return current === undefined || current === null
      ? fallback
      : current;
  }

  private updateField(name: keyof CardConfig, value: unknown): void {
    const updated = {
      ...this.config,
      [name]: value,
    } as CardConfig;

    this.configChanged(updated);
  }

  private textField(
    name: keyof CardConfig,
    label: string,
    placeholder: string,
  ): TemplateResult {
    return html`
      <label class="field">
        <span class="field-label">${label}</span>
        <input
          class="text-input"
          type="text"
          .value=${String(this.value(name, ''))}
          placeholder=${placeholder}
          @change=${(event: Event) => {
            this.updateField(
              name,
              (event.currentTarget as HTMLInputElement).value,
            );
          }}
        />
      </label>
    `;
  }

  private numberField(
    name: keyof CardConfig,
    label: string,
    fallback: number,
    min: number,
    max: number,
  ): TemplateResult {
    return html`
      <label class="number-row">
        <span class="setting-label">${label}</span>
        <input
          class="number-input"
          type="number"
          min=${min}
          max=${max}
          .value=${String(this.value(name, fallback))}
          @change=${(event: Event) => {
            const input = event.currentTarget as HTMLInputElement;
            const raw = Number(input.value);

            if (!Number.isFinite(raw)) {
              input.value = String(this.value(name, fallback));
              return;
            }

            const next = Math.min(
              max,
              Math.max(min, Math.round(raw)),
            );

            input.value = String(next);
            this.updateField(name, next);
          }}
        />
      </label>
    `;
  }

  private sliderField(
    name: keyof CardConfig,
    label: string,
    fallback: number,
    min: number,
    max: number,
  ): TemplateResult {
    const current = Number(this.value(name, fallback));
    const safeValue = Number.isFinite(current)
      ? Math.min(max, Math.max(min, current))
      : fallback;

    return html`
      <div class="slider-field">
        <div class="slider-heading">
          <span class="setting-label">${label}</span>
          <span class="value-badge">${safeValue}</span>
        </div>

        <input
          class="range-input"
          type="range"
          min=${min}
          max=${max}
          step="1"
          .value=${String(safeValue)}
          @input=${(event: Event) => {
            const input = event.currentTarget as HTMLInputElement;
            const badge = input.parentElement?.querySelector('.value-badge');
            if (badge) badge.textContent = input.value;
          }}
          @change=${(event: Event) => {
            const input = event.currentTarget as HTMLInputElement;
            this.updateField(name, Number(input.value));
          }}
        />

        <div class="range-labels">
          <span>${min}</span>
          <span>${max}</span>
        </div>
      </div>
    `;
  }

  private toggleField(
    name: keyof CardConfig,
    label: string,
    fallback = false,
  ): TemplateResult {
    const checked = Boolean(this.value(name, fallback));

    return html`
      <label class="toggle-row">
        <span class="setting-label">${label}</span>
        <input
          class="toggle-input"
          type="checkbox"
          .checked=${checked}
          @change=${(event: Event) => {
            this.updateField(
              name,
              (event.currentTarget as HTMLInputElement).checked,
            );
          }}
        />
        <span class="toggle-track" aria-hidden="true">
          <span class="toggle-thumb"></span>
        </span>
      </label>
    `;
  }

  protected render(): TemplateResult {
    return html`
      <div class="studio">

        <div class="intro">
          <ha-icon icon="mdi:playlist-music"></ha-icon>
          <div>
            <strong>
              ${this.tr(
                'Playlists favoritas',
                'Lieblingsplaylists',
                'Favorite playlists',
              )}
            </strong>
            <span>
              ${this.tr(
                'Personalize a aparência e a reprodução.',
                'Darstellung und Wiedergabe anpassen.',
                'Customize appearance and playback.',
              )}
            </span>
          </div>
        </div>

        <section class="settings-section">
          <div class="section-heading">
            <ha-icon icon="mdi:format-text"></ha-icon>
            <strong>
              ${this.tr('Identificação', 'Bezeichnungen', 'Labels')}
            </strong>
          </div>

          <div class="fields">
            ${this.textField(
              'playlistFavBrowserTitle',
              this.tr('Título da seção', 'Bereichstitel', 'Section title'),
              this.tr('Playlists favoritas', 'Lieblingsplaylists', 'Favorite playlists'),
            )}

            ${this.textField(
              'playlistFavBrowserSubTitle',
              this.tr('Subtítulo', 'Untertitel', 'Subtitle'),
              this.tr('Opcional', 'Optional', 'Optional'),
            )}
          </div>
        </section>

        <section class="settings-section">
          <div class="section-heading">
            <ha-icon icon="mdi:view-grid-outline"></ha-icon>
            <strong>
              ${this.tr('Organização', 'Anordnung', 'Layout')}
            </strong>
          </div>

          <div class="fields">
            ${this.numberField(
              'playlistFavBrowserItemsLimit',
              this.tr(
                'Máximo de playlists',
                'Maximale Playlists',
                'Maximum playlists',
              ),
              200,
              1,
              1000,
            )}

            ${this.sliderField(
              'playlistFavBrowserItemsPerRow',
              this.tr(
                'Playlists por linha',
                'Playlists pro Zeile',
                'Playlists per row',
              ),
              EDITOR_DEFAULT_BROWSER_ITEMS_PER_ROW,
              1,
              12,
            )}
          </div>
        </section>

        <section class="settings-section">
          <div class="section-heading">
            <ha-icon icon="mdi:tune-variant"></ha-icon>
            <strong>
              ${this.tr(
                'Exibição e reprodução',
                'Anzeige & Wiedergabe',
                'Display & playback',
              )}
            </strong>
          </div>

          <div class="toggle-list">
            ${this.toggleField(
              'playlistFavBrowserItemsHideTitle',
              this.tr('Ocultar títulos', 'Titel ausblenden', 'Hide titles'),
            )}

            ${this.toggleField(
              'playlistFavBrowserItemsHideSubTitle',
              this.tr('Ocultar subtítulos', 'Untertitel ausblenden', 'Hide subtitles'),
            )}

            ${this.toggleField(
              'playlistFavBrowserItemsSortTitle',
              this.tr('Ordenar por título', 'Nach Titel sortieren', 'Sort by title'),
            )}

            ${this.toggleField(
              'playlistFavBrowserShuffleOnPlay',
              this.tr(
                'Ativar reprodução aleatória',
                'Zufallswiedergabe aktivieren',
                'Enable shuffle on play',
              ),
            )}

            ${this.toggleField(
              'playlistFavBrowserItemsRefreshOnEntry',
              this.tr(
                'Atualizar ao abrir',
                'Beim Öffnen aktualisieren',
                'Refresh on entry',
              ),
            )}
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
        color: var(--primary-text-color);
        --studio-accent: var(--success-color, #38c997);
      }

      * {
        box-sizing: border-box;
      }

      .studio {
        display: flex;
        flex-direction: column;
        gap: 6px;
        min-width: 0;
      }

      .intro {
        display: flex;
        align-items: center;
        gap: 11px;
        padding: 10px 2px 16px;
      }

      .intro ha-icon {
        color: var(--studio-accent);
        --mdc-icon-size: 23px;
      }

      .intro div {
        display: flex;
        flex-direction: column;
        gap: 3px;
        min-width: 0;
      }

      .intro strong {
        font-size: 14px;
      }

      .intro span {
        color: var(--secondary-text-color);
        font-size: 11px;
        line-height: 1.4;
      }

      .settings-section {
        min-width: 0;
        padding: 15px 2px 18px;
        border-top: 1px solid var(
          --divider-color,
          rgba(128, 128, 128, .18)
        );
      }

      .section-heading {
        display: flex;
        align-items: center;
        gap: 9px;
        margin-bottom: 15px;
      }

      .section-heading ha-icon {
        color: var(--studio-accent);
        --mdc-icon-size: 19px;
      }

      .section-heading strong {
        font-size: 13px;
        font-weight: 650;
      }

      .fields {
        display: flex;
        flex-direction: column;
        gap: 13px;
      }

      .field {
        display: flex;
        flex-direction: column;
        gap: 7px;
        min-width: 0;
      }

      .field-label {
        color: var(--secondary-text-color);
        font-size: 11px;
        font-weight: 550;
      }

      .text-input,
      .number-input {
        width: 100%;
        min-width: 0;
        height: 38px;
        padding: 0 12px;
        border: 1px solid var(
          --divider-color,
          rgba(128,128,128,.22)
        );
        border-radius: 9px;
        outline: none;
        background: var(
          --secondary-background-color,
          rgba(127,127,127,.08)
        );
        color: var(--primary-text-color);
        font: inherit;
        font-size: 12px;
        transition: border-color .15s, background .15s;
      }

      .text-input::placeholder {
        color: var(--secondary-text-color);
        opacity: .7;
      }

      .text-input:focus,
      .number-input:focus {
        border-color: var(--studio-accent);
        background: var(--card-background-color, transparent);
      }

      .number-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
      }

      .setting-label {
        min-width: 0;
        font-size: 12px;
        line-height: 1.45;
      }

      .number-input {
        flex: 0 0 88px;
        width: 88px;
        text-align: center;
        font-weight: 600;
      }

      .slider-field {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding-top: 5px;
      }

      .slider-heading {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
      }

      .value-badge {
        flex-shrink: 0;
        min-width: 35px;
        padding: 5px 9px;
        border-radius: 7px;
        background: color-mix(
          in srgb,
          var(--studio-accent) 14%,
          transparent
        );
        color: var(--studio-accent);
        font-size: 12px;
        font-weight: 700;
        text-align: center;
      }

      .range-input {
        width: 100%;
        margin: 0;
        accent-color: var(--studio-accent);
        cursor: pointer;
      }

      .range-labels {
        display: flex;
        justify-content: space-between;
        color: var(--secondary-text-color);
        font-size: 10px;
      }

      .toggle-list {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }

      .toggle-row {
        display: flex;
        align-items: center;
        gap: 12px;
        min-height: 43px;
        cursor: pointer;
      }

      .toggle-row .setting-label {
        flex: 1;
      }

      .toggle-input {
        position: absolute;
        width: 1px;
        height: 1px;
        opacity: 0;
      }

      .toggle-track {
        display: flex;
        align-items: center;
        flex: 0 0 39px;
        width: 39px;
        height: 23px;
        padding: 3px;
        border: 1px solid var(
          --divider-color,
          rgba(128,128,128,.3)
        );
        border-radius: 20px;
        background: var(
          --secondary-background-color,
          rgba(127,127,127,.18)
        );
        transition: background .18s;
      }

      .toggle-thumb {
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background: var(--secondary-text-color);
        transition: transform .18s, background .18s;
      }

      .toggle-input:checked + .toggle-track {
        background: var(--studio-accent);
        border-color: var(--studio-accent);
      }

      .toggle-input:checked + .toggle-track .toggle-thumb {
        transform: translateX(16px);
        background: #fff;
      }

      .toggle-input:focus-visible + .toggle-track {
        outline: 2px solid var(--primary-color);
        outline-offset: 3px;
      }

      @media (max-width: 350px) {
        .settings-section {
          padding-right: 0;
          padding-left: 0;
        }

        .setting-label {
          font-size: 11px;
        }
      }
    `;
  }
}

customElements.define(
  'crm-playlist-fav-browser-editor',
  PlaylistFavBrowserEditor,
);
