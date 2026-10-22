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
    const label = (ptText: string, deText: string, enText: string) =>
      pt ? ptText : de ? deText : enText;

    const ui = {
      settings: label('Configurações do cartão', 'Karteneinstellungen', 'Card settings'),
      essentials: label('Informações básicas', 'Grundlegende Angaben', 'Basic information'),
      essentialsHint: label('Idioma, conta e identificação', 'Sprache, Konto und Bezeichnung', 'Language, account and identity'),
      preview: label('Prévia do cartão', 'Kartenvorschau', 'Card preview'),
      previewHint: label('As informações abaixo são apenas uma prévia da configuração.', 'Die Angaben unten zeigen nur eine Vorschau der Einstellungen.', 'The details below are only a configuration preview.'),
      language: g('language'),
      entity: g('entity'),
      accountHint: label('Escolha a entidade SpotifyPlus vinculada à conta desejada.', 'Wähle die SpotifyPlus-Entität des gewünschten Kontos.', 'Choose the SpotifyPlus entity linked to the account you want.'),
      noEntity: label('Nenhuma conta selecionada', 'Kein Konto ausgewählt', 'No account selected'),
      defaultTitle: 'ControlRoom Music',
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

    const currentEntity = String(this.config.entity ?? '');

    return html`
      <div class="studio">
        <div class="studio-top">
          <div>
            <div class="studio-eyebrow">CONTROLROOM STUDIO</div>
            <div class="studio-title">${ui.settings}</div>
          </div>
          <span class="studio-version">v${CARD_VERSION}</span>
        </div>

        <section class="studio-panel studio-fold">
          <button
            type="button"
            class="studio-fold-button"
            aria-expanded=${this.showEssentials ? 'true' : 'false'}
            @click=${() => { this.showEssentials = !this.showEssentials; }}
          >
            <span class="studio-icon"><ha-icon icon="mdi:tune-vertical"></ha-icon></span>
            <span class="studio-fold-text">
              <strong>${ui.essentials}</strong>
              <small>${ui.essentialsHint}</small>
            </span>
            <ha-icon class="fold-chevron" icon=${this.showEssentials ? 'mdi:chevron-up' : 'mdi:chevron-down'}></ha-icon>
          </button>

          ${this.showEssentials ? html`
            <div class="studio-fold-body">
              <label class="studio-field">
                <span class="studio-label"><ha-icon icon="mdi:translate"></ha-icon>${ui.language}</span>
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

            </div>
          ` : nothing}
        </section>

        <section class="studio-panel preview-panel">
          <div class="preview-heading">
            <span class="studio-icon"><ha-icon icon="mdi:card-text-outline"></ha-icon></span>
            <div class="preview-heading-copy">
              <strong>${ui.preview}</strong>
              <small>${ui.previewHint}</small>
            </div>
          </div>
          <div class="preview-card">
            <span class="preview-mark"><ha-icon icon="mdi:spotify"></ha-icon></span>
            <span class="preview-copy">
              <strong>${ui.defaultTitle}</strong>
              <small>${currentEntity || ui.noEntity}</small>
            </span>
            <ha-icon class="preview-music" icon="mdi:music-note"></ha-icon>
          </div>
        </section>
      </div>
    `;
  }

  static get styles() {
    return css`
      :host { display: block; min-width: 0; }
      * { box-sizing: border-box; }
      .studio { display: grid; gap: 12px; min-width: 0; color: var(--primary-text-color); }
      .studio-top { display: flex; justify-content: space-between; align-items: center; gap: 10px; padding: 3px 2px 7px; }
      .studio-eyebrow { font-size: 10px; font-weight: 750; letter-spacing: .14em; color: var(--secondary-text-color); }
      .studio-title { margin-top: 5px; font-size: 17px; font-weight: 700; }
      .studio-version { flex-shrink: 0; padding: 5px 9px; border-radius: 999px; border: 1px solid var(--divider-color, rgba(128,128,128,.2)); background: var(--secondary-background-color, transparent); font-size: 11px; color: var(--secondary-text-color); }
      .studio-panel { min-width: 0; border: 1px solid var(--divider-color, rgba(128,128,128,.2)); border-radius: 15px; background: var(--card-background-color, var(--ha-card-background, transparent)); }
      .studio-fold { overflow: hidden; }
      .studio-fold-button { width: 100%; min-height: 67px; padding: 13px 14px; display: flex; align-items: center; gap: 11px; border: 0; background: transparent; color: var(--primary-text-color); font: inherit; text-align: left; cursor: pointer; }
      .studio-fold-button:hover { background: var(--secondary-background-color, transparent); }
      .studio-fold-button:focus-visible { outline: 2px solid var(--primary-color); outline-offset: -2px; }
      .studio-icon { display: flex; justify-content: center; align-items: center; flex: 0 0 37px; width: 37px; height: 37px; border-radius: 11px; background: color-mix(in srgb, var(--primary-color, #1db954) 12%, var(--secondary-background-color, transparent)); color: var(--primary-color, #1db954); }
      .studio-icon ha-icon { --mdc-icon-size: 20px; }
      .studio-fold-text { display: grid; flex: 1; gap: 4px; min-width: 0; }
      .studio-fold-text strong, .preview-heading-copy strong { font-size: 13px; font-weight: 650; }
      .studio-fold-text small, .preview-heading-copy small { font-size: 11px; line-height: 1.45; color: var(--secondary-text-color); }
      .fold-chevron { --mdc-icon-size: 19px; color: var(--secondary-text-color); }
      .studio-fold-body { padding: 1px 14px 16px; }
      .studio-field { display: flex; flex-direction: column; gap: 8px; min-width: 0; margin-bottom: 16px; }
      .studio-field:last-child { margin-bottom: 0; }
      .studio-label { display: flex; align-items: center; gap: 7px; font-size: 12px; font-weight: 600; color: var(--primary-text-color); }
      .studio-label ha-icon { --mdc-icon-size: 16px; color: var(--secondary-text-color); }
      .studio-input { display: block; width: 100%; min-width: 0; height: 41px; padding: 0 12px; border-radius: 10px; border: 1px solid var(--divider-color, rgba(128,128,128,.25)); background: var(--secondary-background-color, transparent); color: var(--primary-text-color); font: inherit; font-size: 13px; }
      .studio-input:focus-visible { outline: 2px solid var(--primary-color); outline-offset: 1px; }
      .studio-select-container { display: block; position: relative; }
      .studio-select { appearance: none; -webkit-appearance: none; padding-right: 36px; cursor: pointer; }
      .studio-select-container > ha-icon { position: absolute; right: 11px; top: 11px; --mdc-icon-size: 19px; pointer-events: none; color: var(--secondary-text-color); }
      .studio-select option { background: var(--card-background-color, #202029); color: var(--primary-text-color); }
      .studio-entity { margin: 1px 0 0; }
      .studio-entity crm-editor-form {
        display: block;
        min-width: 0;
        color: var(--primary-text-color);
        --mdc-theme-primary: var(--crm-editor-accent, var(--primary-color));
        --mdc-theme-on-surface: var(--primary-text-color);
        --mdc-text-field-ink-color: var(--primary-text-color);
        --mdc-text-field-label-ink-color: var(--secondary-text-color);
        --mdc-text-field-fill-color: var(--secondary-background-color);
        --mdc-text-field-outlined-idle-border-color: var(--divider-color);
        --mdc-text-field-outlined-hover-border-color: var(--primary-color);
        --ha-textfield-input-color: var(--primary-text-color);
        --ha-textfield-label-color: var(--secondary-text-color);
        --input-text-color: var(--primary-text-color);
        --primary-background-color: var(--card-background-color);
        --secondary-background-color: var(--secondary-background-color);
      }
      .studio-hint { font-size: 11px; color: var(--secondary-text-color); line-height: 1.5; margin: -4px 0 0; }
      .preview-panel { padding: 14px; }
      .preview-heading { display: flex; align-items: center; gap: 11px; margin-bottom: 13px; }
      .preview-heading-copy { display: grid; gap: 3px; min-width: 0; }
      .preview-card { display: flex; align-items: center; gap: 12px; min-width: 0; padding: 13px; border: 1px solid color-mix(in srgb, var(--primary-color, #1db954) 24%, var(--divider-color, rgba(128,128,128,.2))); border-radius: 13px; background: linear-gradient(135deg, color-mix(in srgb, var(--primary-color, #1db954) 12%, var(--card-background-color, #171d1a)), var(--card-background-color, #171d1a)); }
      .preview-mark { display: flex; align-items: center; justify-content: center; flex: 0 0 42px; width: 42px; height: 42px; border-radius: 12px; background: var(--primary-color, #1db954); color: #fff; }
      .preview-mark ha-icon { --mdc-icon-size: 25px; }
      .preview-copy { display: grid; gap: 4px; flex: 1; min-width: 0; }
      .preview-copy strong { font-size: 13px; overflow-wrap: anywhere; }
      .preview-copy small { font-size: 10px; color: var(--secondary-text-color); overflow-wrap: anywhere; }
      .preview-music { --mdc-icon-size: 20px; color: var(--primary-color, #1db954); }
      @media (max-width: 340px) { .studio-fold-button { padding: 11px; } .studio-fold-body { padding: 0 11px 12px; } .preview-panel { padding: 11px; } }
    `;
  }
}

customElements.define('crm-general-editor', GeneralEditor);
