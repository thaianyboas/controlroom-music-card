import { css, html, nothing, TemplateResult } from 'lit';
import { state } from 'lit/decorators.js';

import {
  CARD_VERSION,
  DOMAIN_MEDIA_PLAYER,
  DOMAIN_SPOTIFYPLUS,
} from '../constants';

import { BaseEditor } from './base-editor';
import { translate } from '../localization/i18n';
import { Section } from '../types/section';

type Language = 'auto' | 'pt' | 'de' | 'en';

class GeneralEditor extends BaseEditor {
  @state() private showEssentials = true;

  private updateField(name: string, value: unknown): void {
    this.configChanged({ ...this.config, [name]: value });
  }

  private onLanguageChange(event: Event): void {
    const value = (event.currentTarget as HTMLSelectElement).value as Language;
    this.updateField('language', value);
  }

  private onTextChange(event: Event): void {
    const input = event.currentTarget as HTMLInputElement;
    this.updateField(input.name, input.value);
  }

  protected render(): TemplateResult {
    super.createStore();

    const language = (this.config.language ?? 'auto') as Language;
    const t = (key: string): string =>
      translate(key, language, this.hass.locale?.language || this.hass.language);
    const g = (key: string): string => t(`editor.generalSettings.${key}`);

    const lang = language === 'auto'
      ? (this.hass.locale?.language || this.hass.language || 'en').toLowerCase()
      : language;
    const pt = lang.startsWith('pt');
    const de = lang.startsWith('de');
    const ui = {
      settings: pt ? 'Configurações do cartão' : de ? 'Karteneinstellungen' : 'Card settings',
      essentials: pt ? 'Informações básicas' : de ? 'Grundlegende Angaben' : 'Basic information',
      dimensions: pt ? 'Dimensões' : de ? 'Abmessungen' : 'Dimensions',
      optional: pt ? 'Opcional' : de ? 'Optional' : 'Optional',
      sections: pt ? 'Seções visíveis' : de ? 'Sichtbare Bereiche' : 'Visible sections',
      sectionsHint: pt ? 'Escolha o que aparece no cartão' : de ? 'Wähle die Bereiche für die Karte' : 'Choose what appears on the card',
      advanced: pt ? 'Mais configurações' : de ? 'Weitere Einstellungen' : 'More settings',
      sectionDefault: g('sectionDefault'),
      touch: g('touchSupportDisabled'),
      width: g('width'),
      height: g('height'),
      title: g('title'),
      language: g('language'),
      entity: g('entity'),
      accountHint: pt ? 'Escolha a entidade SpotifyPlus vinculada à conta desejada.' : de ? 'Wähle die SpotifyPlus-Entität des gewünschten Kontos.' : 'Choose the SpotifyPlus entity linked to the account you want.',
    };

    const entitySchema = [{
      name: 'entity',
      label: ui.entity,
      required: true,
      selector: {
        entity: {
          multiple: false,
          filter: {
            domain: DOMAIN_MEDIA_PLAYER,
            integration: DOMAIN_SPOTIFYPLUS,
          },
        },
      },
    }];

    return html`
      <div class="studio">
        <div class="studio-top">
          <div>
            <div class="studio-eyebrow">CONTROLROOM STUDIO</div>
            <div class="studio-title">${ui.settings}</div>
          </div>
          <span class="studio-version">v${CARD_VERSION}</span>
        </div>

        <div class="studio-panel studio-fold">
          <button
            type="button"
            class="studio-fold-button"
            aria-expanded=${this.showEssentials ? 'true' : 'false'}
            @click=${() => { this.showEssentials = !this.showEssentials; }}
          >
            <ha-icon icon="mdi:tune-vertical"></ha-icon>
            <span class="studio-fold-text"><strong>${ui.essentials}</strong></span>
            <ha-icon icon=${this.showEssentials ? 'mdi:chevron-up' : 'mdi:chevron-down'}></ha-icon>
          </button>
          ${this.showEssentials ? html`
          <div class="studio-fold-body">
          <label class="studio-field">
            <span class="studio-label">${ui.language}</span>
            <span class="studio-select-container">
              <select
                class="studio-input studio-select"
                .value=${language}
                @change=${this.onLanguageChange}
              >
                <option value="auto">🌐 ${t('editor.automaticLanguage')}</option>
                <option value="pt">🇧🇷 Português</option>
                <option value="de">🇩🇪 Deutsch</option>
                <option value="en">🇺🇸 English</option>
              </select>
              <ha-icon icon="mdi:chevron-down"></ha-icon>
            </span>
          </label>

          <div class="studio-field studio-entity">
            <crm-editor-form
              .schema=${entitySchema}
              .section=${Section.PLAYER}
              .store=${this.store}
              .config=${this.config}
              .hass=${this.hass}
            ></crm-editor-form>
            <div class="studio-hint">${ui.accountHint}</div>
          </div>

          <label class="studio-field">
            <span class="studio-label">${ui.title}</span>
            <input
              class="studio-input"
              type="text"
              name="title"
              .value=${String(this.config.title ?? '')}
              placeholder=${ui.optional}
              @change=${this.onTextChange}
            />
          </label>

          </div>
          ` : nothing}
        </div>

      </div>
    `;
  }

  static get styles() {
    return css`
      :host { display: block; min-width: 0; }
      * { box-sizing: border-box; }
      .studio { display: grid; gap: 10px; min-width: 0; color: var(--primary-text-color); }
      .studio-top { display: flex; justify-content: space-between; align-items: center; gap: 10px; padding: 2px 2px 8px; }
      .studio-eyebrow { font-size: 10px; font-weight: 700; letter-spacing: .12em; color: var(--secondary-text-color); }
      .studio-title { margin-top: 4px; font-size: 16px; font-weight: 650; }
      .studio-version { font-size: 11px; color: var(--secondary-text-color); }
      .studio-panel { min-width: 0; border: 1px solid var(--divider-color); border-radius: 14px; padding: 15px; background: var(--card-background-color, var(--ha-card-background)); }
      .studio-section-title { font-size: 12px; font-weight: 700; margin: 0 0 13px; }
      .studio-dimensions { margin-top: 17px; }
      .studio-field { display: flex; flex-direction: column; gap: 7px; min-width: 0; margin-bottom: 13px; }
      .studio-field:last-child { margin-bottom: 0; }
      .studio-label { font-size: 12px; font-weight: 550; color: var(--secondary-text-color); }
      .studio-input { display: block; width: 100%; min-width: 0; height: 38px; padding: 0 11px; border-radius: 9px; border: 1px solid var(--divider-color); background: var(--secondary-background-color); color: var(--primary-text-color); font: inherit; font-size: 13px; }
      .studio-input:focus-visible { outline: 2px solid var(--primary-color); outline-offset: 1px; }
      .studio-select-container { display: block; position: relative; }
      .studio-select { appearance: none; -webkit-appearance: none; padding-right: 36px; cursor: pointer; }
      .studio-select-container > ha-icon { position: absolute; right: 10px; top: 9px; --mdc-icon-size: 19px; pointer-events: none; color: var(--secondary-text-color); }
      .studio-select option { background: var(--card-background-color, #202029); color: var(--primary-text-color); }
      .studio-entity { margin: 1px 0 13px; }
      .studio-entity crm-editor-form { display: block; min-width: 0; }
      .studio-hint { font-size: 11px; color: var(--secondary-text-color); line-height: 1.4; margin: -7px 0 12px; }
      .studio-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
      .studio-grid .studio-field { margin-bottom: 0; }
      .studio-fold { padding: 0; overflow: hidden; }
      .studio-fold-button { width: 100%; min-height: 57px; padding: 12px 14px; display: flex; align-items: center; gap: 11px; border: 0; background: transparent; color: var(--primary-text-color); font: inherit; text-align: left; cursor: pointer; }
      .studio-fold-button > ha-icon { --mdc-icon-size: 19px; color: var(--secondary-text-color); }
      .studio-fold-button > ha-icon:last-child { --mdc-icon-size: 18px; }
      .studio-fold-button:hover { background: var(--secondary-background-color); }
      .studio-fold-button:focus-visible { outline: 2px solid var(--primary-color); outline-offset: -2px; }
      .studio-fold-text { display: flex; flex: 1; flex-direction: column; gap: 3px; min-width: 0; }
      .studio-fold-text strong { font-size: 13px; font-weight: 600; }
      .studio-fold-text small { font-size: 11px; color: var(--secondary-text-color); }
      .studio-fold-body { padding: 0 14px 14px; }
      .studio-check-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 7px; }
      .studio-check { display: flex; align-items: center; gap: 7px; min-width: 0; padding: 9px; border-radius: 8px; background: var(--secondary-background-color); font-size: 12px; cursor: pointer; overflow-wrap: anywhere; }
      .studio-check input, .studio-switch-row input { accent-color: var(--primary-color); flex-shrink: 0; }
      .studio-switch-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; font-size: 12px; cursor: pointer; padding: 5px 0; }
      @media (max-width: 340px) { .studio-check-grid { grid-template-columns: 1fr; } }
    `;
  }
}

customElements.define('crm-general-editor', GeneralEditor);
