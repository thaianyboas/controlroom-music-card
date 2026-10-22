import { css, html, TemplateResult } from 'lit';
import { state } from 'lit/decorators.js';

import { BaseEditor } from './base-editor';
import { translate } from '../localization/i18n';
import './editor-form';
import './player-general-editor';
import './player-header-editor';
import './player-controls-editor';
import './player-volume-editor';

enum ConfigArea {
  GENERAL = 'general',
  HEADER = 'header',
  CONTROLS = 'controls',
  VOLUME = 'volume',
}

const { GENERAL, HEADER, CONTROLS, VOLUME } = ConfigArea;

class PlayerSettingsEditor extends BaseEditor {
  @state() private configArea: ConfigArea | null = GENERAL;

  private toggleArea(area: ConfigArea): void {
    this.configArea = this.configArea === area ? null : area;
  }

  private subEditor(area: ConfigArea): TemplateResult {
    switch (area) {
      case GENERAL:
        return html`<crm-player-general-editor .config=${this.config} .hass=${this.hass}></crm-player-general-editor>`;
      case HEADER:
        return html`<crm-player-header-editor .config=${this.config} .hass=${this.hass}></crm-player-header-editor>`;
      case CONTROLS:
        return html`<crm-player-controls-editor .config=${this.config} .hass=${this.hass}></crm-player-controls-editor>`;
      case VOLUME:
        return html`<crm-player-volume-editor .config=${this.config} .hass=${this.hass}></crm-player-volume-editor>`;
    }
  }

  protected render(): TemplateResult {
    super.createStore();

    const t = (key: string): string =>
      translate(
        `editor.playerSettings.${key}`,
        this.config.language ?? 'auto',
        this.hass.language,
      );

    const lang = this.config.language === 'auto' || !this.config.language
      ? (this.hass.locale?.language || this.hass.language || 'en')
      : this.config.language;
    const pt = lang.toLowerCase().startsWith('pt');
    const de = lang.toLowerCase().startsWith('de');
    const label = (p: string, d: string, e: string): string => pt ? p : de ? d : e;

    const labels: Record<ConfigArea, { icon: string; subtitle: string; detail: string }> = {
      [GENERAL]: {
        icon: 'mdi:tune-variant',
        subtitle: label('Fundo e modo inativo', 'Hintergrund und Ruhezustand', 'Background and idle mode'),
        detail: label('Imagem e comportamento', 'Bild und Verhalten', 'Image and behavior'),
      },
      [HEADER]: {
        icon: 'mdi:card-text-outline',
        subtitle: label('Informações da faixa e cabeçalho', 'Titelinformationen und Kopfbereich', 'Track information and header'),
        detail: label('Identidade do player', 'Player-Darstellung', 'Player appearance'),
      },
      [CONTROLS]: {
        icon: 'mdi:play-circle-outline',
        subtitle: label('Botões e comandos de reprodução', 'Wiedergabetasten und Steuerung', 'Playback buttons and controls'),
        detail: label('Controles de mídia', 'Mediensteuerung', 'Media controls'),
      },
      [VOLUME]: {
        icon: 'mdi:volume-high',
        subtitle: label('Volume e apresentação dos controles', 'Lautstärke und Darstellung', 'Volume and control appearance'),
        detail: label('Controle de volume', 'Lautstärkeregelung', 'Volume control'),
      },
    };

    const areas = [GENERAL, HEADER, CONTROLS, VOLUME];

    return html`
      <div class="studio-player">
        <div class="studio-intro">${t('description')}</div>
        <div class="studio-overview" aria-label=${label('Áreas do player', 'Player-Bereiche', 'Player sections')}>
          <div class="overview-symbol"><ha-icon icon="mdi:music-circle-outline"></ha-icon></div>
          <div class="overview-copy">
            <strong>${label('Personalização do player', 'Player anpassen', 'Customize your player')}</strong>
            <small>${label('Quatro áreas para ajustar a experiência de reprodução', 'Vier Bereiche für dein Wiedergabeerlebnis', 'Four areas to tailor playback')}</small>
          </div>
          <span class="overview-count">04</span>
        </div>
        <div class="studio-accordion">
          ${areas.map((area, index) => {
            const expanded = this.configArea === area;
            return html`
              <section class="studio-group ${expanded ? 'is-open' : ''}">
                <button
                  type="button"
                  class="studio-trigger"
                  aria-expanded=${expanded ? 'true' : 'false'}
                  @click=${() => this.toggleArea(area)}
                >
                  <span class="studio-icon"><ha-icon icon=${labels[area].icon}></ha-icon></span>
                  <span class="studio-copy">
                    <span class="studio-name">${t(area)}</span>
                    <span class="studio-subtitle">${labels[area].subtitle}</span>
                  </span>
                  <span class="studio-index">0${index + 1}</span>
                  <ha-icon class="studio-chevron" icon=${expanded ? 'mdi:chevron-up' : 'mdi:chevron-down'}></ha-icon>
                </button>
                ${expanded ? html`
                  <div class="studio-content">
                    <div class="content-caption"><ha-icon icon="mdi:circle-small"></ha-icon>${labels[area].detail}</div>
                    ${this.subEditor(area)}
                  </div>
                ` : ''}
              </section>
            `;
          })}
        </div>
      </div>
    `;
  }

  static get styles() {
    return css`
      :host { display: block; min-width: 0; }
      * { box-sizing: border-box; }
      .studio-player { display: grid; gap: 12px; min-width: 0; }
      .studio-intro { padding: 2px 2px 4px; color: var(--secondary-text-color); font-size: 12px; line-height: 1.5; }
      .studio-overview {
        display: flex; align-items: center; gap: 12px; min-width: 0; padding: 13px;
        border-radius: 15px; border: 1px solid color-mix(in srgb, var(--primary-color, #34d399) 26%, var(--divider-color, #555));
        background: color-mix(in srgb, var(--primary-color, #34d399) 6%, var(--card-background-color, transparent));
      }
      .overview-symbol {
        display: grid; place-items: center; width: 42px; height: 42px; flex: 0 0 42px;
        border-radius: 12px; background: color-mix(in srgb, var(--primary-color, #34d399) 15%, transparent);
        color: var(--primary-color, #34d399);
      }
      .overview-symbol ha-icon { --mdc-icon-size: 25px; }
      .overview-copy { display: grid; gap: 4px; min-width: 0; flex: 1; }
      .overview-copy strong { color: var(--primary-text-color); font-size: 13px; font-weight: 650; }
      .overview-copy small { color: var(--secondary-text-color); font-size: 11px; line-height: 1.4; }
      .overview-count { font-size: 19px; font-weight: 750; color: var(--primary-color, #34d399); opacity: .75; }
      .studio-accordion { display: grid; gap: 9px; min-width: 0; }
      .studio-group {
        min-width: 0; overflow: hidden; border-radius: 14px;
        border: 1px solid var(--divider-color, rgba(128,128,128,.2));
        background: var(--card-background-color, var(--ha-card-background, transparent));
        transition: border-color .15s ease, box-shadow .15s ease;
      }
      .studio-group.is-open {
        border-color: color-mix(in srgb, var(--primary-color, #34d399) 60%, var(--divider-color, #555));
        box-shadow: 0 2px 12px rgba(0,0,0,.04);
      }
      .studio-trigger {
        display: flex; align-items: center; gap: 11px; width: 100%; min-height: 69px;
        padding: 12px 13px; border: 0; background: transparent;
        color: var(--primary-text-color); text-align: left; font: inherit; cursor: pointer;
      }
      .studio-trigger:hover { background: var(--secondary-background-color, rgba(128,128,128,.08)); }
      .studio-trigger:focus-visible { outline: 2px solid var(--primary-color, #34d399); outline-offset: -3px; }
      .studio-icon {
        display: grid; place-items: center; flex: 0 0 38px; width: 38px; height: 38px;
        border-radius: 11px; background: var(--secondary-background-color, rgba(128,128,128,.12));
        color: var(--secondary-text-color);
      }
      .studio-icon ha-icon { --mdc-icon-size: 21px; }
      .is-open .studio-icon {
        color: var(--primary-color, #34d399);
        background: color-mix(in srgb, var(--primary-color, #34d399) 13%, transparent);
      }
      .studio-copy { display: grid; flex: 1; gap: 4px; min-width: 0; }
      .studio-name { font-size: 13px; font-weight: 650; }
      .studio-subtitle { font-size: 11px; line-height: 1.35; color: var(--secondary-text-color); }
      .studio-index { font-size: 10px; font-weight: 700; color: var(--secondary-text-color); opacity: .65; }
      .studio-chevron { flex-shrink: 0; color: var(--secondary-text-color); --mdc-icon-size: 19px; }
      .studio-content { min-width: 0; padding: 13px 14px 15px; border-top: 1px solid var(--divider-color, rgba(128,128,128,.2)); }
      .studio-content > * { display: block; min-width: 0; }
      .content-caption { display: flex !important; align-items: center; gap: 2px; margin: 0 0 11px; color: var(--secondary-text-color); font-size: 10px; letter-spacing: .02em; }
      .content-caption ha-icon { --mdc-icon-size: 18px; color: var(--primary-color, #34d399); }
      @media (max-width: 340px) {
        .studio-trigger { padding: 10px; gap: 8px; }
        .studio-content { padding: 10px; }
        .studio-index { display: none; }
        .studio-overview { padding: 10px; gap: 9px; }
      }
    `;
  }
}

customElements.define('crm-player-editor', PlayerSettingsEditor);
