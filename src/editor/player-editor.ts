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
        return html`
          <crm-player-general-editor
            .config=${this.config}
            .hass=${this.hass}
          ></crm-player-general-editor>
        `;
      case HEADER:
        return html`
          <crm-player-header-editor
            .config=${this.config}
            .hass=${this.hass}
          ></crm-player-header-editor>
        `;
      case CONTROLS:
        return html`
          <crm-player-controls-editor
            .config=${this.config}
            .hass=${this.hass}
          ></crm-player-controls-editor>
        `;
      case VOLUME:
        return html`
          <crm-player-volume-editor
            .config=${this.config}
            .hass=${this.hass}
          ></crm-player-volume-editor>
        `;
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
      ? this.hass.language
      : this.config.language;
    const pt = lang?.toLowerCase().startsWith('pt');
    const de = lang?.toLowerCase().startsWith('de');

    const labels: Record<ConfigArea, { icon: string; subtitle: string }> = {
      [GENERAL]: {
        icon: 'mdi:tune-variant',
        subtitle: pt ? 'Opções gerais de reprodução' : de ? 'Allgemeine Wiedergabeoptionen' : 'General playback options',
      },
      [HEADER]: {
        icon: 'mdi:card-text-outline',
        subtitle: pt ? 'Informações e cabeçalho' : de ? 'Informationen und Kopfbereich' : 'Information and header',
      },
      [CONTROLS]: {
        icon: 'mdi:play-circle-outline',
        subtitle: pt ? 'Botões e comandos' : de ? 'Tasten und Steuerung' : 'Buttons and controls',
      },
      [VOLUME]: {
        icon: 'mdi:volume-high',
        subtitle: pt ? 'Ajustes de volume' : de ? 'Lautstärkeeinstellungen' : 'Volume settings',
      },
    };

    const areas = [GENERAL, HEADER, CONTROLS, VOLUME];

    return html`
      <div class="studio-player">
        <div class="studio-intro">${t('description')}</div>

        <div class="studio-accordion">
          ${areas.map((area) => {
            const expanded = this.configArea === area;
            return html`
              <section class="studio-group ${expanded ? 'is-open' : ''}">
                <button
                  type="button"
                  class="studio-trigger"
                  aria-expanded=${expanded ? 'true' : 'false'}
                  @click=${() => this.toggleArea(area)}
                >
                  <span class="studio-icon">
                    <ha-icon icon=${labels[area].icon}></ha-icon>
                  </span>
                  <span class="studio-copy">
                    <span class="studio-name">${t(area)}</span>
                    <span class="studio-subtitle">${labels[area].subtitle}</span>
                  </span>
                  <ha-icon
                    class="studio-chevron"
                    icon=${expanded ? 'mdi:chevron-up' : 'mdi:chevron-down'}
                  ></ha-icon>
                </button>
                ${expanded
                  ? html`<div class="studio-content">${this.subEditor(area)}</div>`
                  : ''}
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
      .studio-intro {
        padding: 2px 2px 4px;
        color: var(--secondary-text-color);
        font-size: 12px;
        line-height: 1.5;
      }
      .studio-accordion { display: grid; gap: 9px; min-width: 0; }
      .studio-group {
        min-width: 0;
        border: 1px solid var(--divider-color, rgba(128,128,128,.2));
        border-radius: 14px;
        overflow: hidden;
        background: var(--card-background-color, var(--ha-card-background, transparent));
        transition: border-color .15s ease;
      }
      .studio-group.is-open {
        border-color: var(--primary-color, var(--divider-color));
      }
      .studio-trigger {
        width: 100%;
        display: flex;
        align-items: center;
        gap: 11px;
        min-height: 64px;
        padding: 12px 13px;
        background: transparent;
        border: 0;
        color: var(--primary-text-color);
        text-align: left;
        font: inherit;
        cursor: pointer;
      }
      .studio-trigger:hover { background: var(--secondary-background-color); }
      .studio-trigger:focus-visible {
        outline: 2px solid var(--primary-color);
        outline-offset: -3px;
      }
      .studio-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 0 0 36px;
        width: 36px;
        height: 36px;
        border-radius: 10px;
        background: var(--secondary-background-color, rgba(128,128,128,.12));
        color: var(--secondary-text-color);
      }
      .studio-icon ha-icon { --mdc-icon-size: 19px; }
      .is-open .studio-icon {
        color: var(--primary-color);
        background: color-mix(in srgb, var(--primary-color) 12%, transparent);
      }
      .studio-copy { display: grid; flex: 1; gap: 3px; min-width: 0; }
      .studio-name { font-size: 13px; font-weight: 650; }
      .studio-subtitle {
        font-size: 11px;
        line-height: 1.35;
        color: var(--secondary-text-color);
      }
      .studio-chevron {
        flex-shrink: 0;
        color: var(--secondary-text-color);
        --mdc-icon-size: 19px;
      }
      .studio-content {
        padding: 14px;
        border-top: 1px solid var(--divider-color, rgba(128,128,128,.2));
        min-width: 0;
      }
      .studio-content > * { display: block; min-width: 0; }
      @media (max-width: 340px) {
        .studio-trigger { padding: 10px; gap: 8px; }
        .studio-content { padding: 10px; }
      }
    `;
  }
}

customElements.define('crm-player-editor', PlayerSettingsEditor);
