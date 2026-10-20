import { css, html, TemplateResult } from 'lit';

import { BaseEditor } from './base-editor';
import { translate } from '../localization/i18n';

type ColorField = 'crmBackground' | 'crmAccent' | 'crmText';
type ThemeMode = 'auto' | 'light' | 'dark' | 'custom';

class DesignEditor extends BaseEditor {
  private readonly defaults = {
    crmBackground: '#101b19',
    crmAccent: '#34d399',
    crmText: '#f0fdf4',
    crmBorderRadius: '20px',
  };

  private setField(name: string, value: string): void {
    this.configChanged({ ...this.config, [name]: value });
  }

  private setTheme(mode: ThemeMode): void {
    this.setField('crmTheme', mode);
  }

  private onTextChange(event: Event): void {
    const input = event.currentTarget as HTMLInputElement;
    this.setField(input.name, input.value);
  }

  private onColorChange(event: Event): void {
    const input = event.currentTarget as HTMLInputElement;
    this.setField(input.name, input.value);
  }

  private resetField(name: keyof DesignEditor['defaults']): void {
    this.setField(name, this.defaults[name]);
  }

  private getValue(name: keyof DesignEditor['defaults']): string {
    const value = this.config[name];
    return value == null ? this.defaults[name] : String(value);
  }

  private getTheme(): ThemeMode {
    const configured = (this.config as typeof this.config & { crmTheme?: string }).crmTheme;
    return configured === 'light' || configured === 'dark' ||
      configured === 'auto' || configured === 'custom'
      ? configured
      : 'dark';
  }

  private colorControl(name: ColorField, label: string, resetLabel: string): TemplateResult {
    const value = this.getValue(name);
    const isHex = /^#[0-9a-fA-F]{6}$/.test(value);
    return html`
      <div class="color-row">
        <div class="color-top">
          <span class="field-label">${label}</span>
          <button class="reset" type="button" @click=${() => this.resetField(name)}>${resetLabel}</button>
        </div>
        <div class="color-controls">
          <label class="color-picker" title=${label}>
            <input
              type="color"
              name=${name}
              aria-label=${label}
              .value=${isHex ? value : this.defaults[name]}
              @input=${this.onColorChange}
            />
          </label>
          <input
            class="studio-input color-text"
            type="text"
            name=${name}
            aria-label=${label}
            spellcheck="false"
            .value=${value}
            @change=${this.onTextChange}
          />
        </div>
      </div>
    `;
  }

  private themeChoice(mode: ThemeMode, title: string, description: string, selected: ThemeMode): TemplateResult {
    const active = selected === mode;
    return html`
      <button
        type="button"
        class="theme-option ${active ? 'selected' : ''}"
        aria-pressed=${String(active)}
        @click=${() => this.setTheme(mode)}
      >
        <span class="theme-thumbnail ${mode}" aria-hidden="true">
          <span class="thumbnail-paper"><span class="thumbnail-aa">Aa</span><span class="thumbnail-line"></span></span>
        </span>
        <span class="theme-copy"><strong>${title}</strong><small>${description}</small></span>
        <span class="theme-indicator" aria-hidden="true">${active ? html`<ha-icon icon="mdi:check"></ha-icon>` : ''}</span>
      </button>
    `;
  }

  protected render(): TemplateResult {
    super.createStore();

    const language = this.config.language ?? 'auto';
    const t = (key: string): string =>
      translate(`editor.designSettings.${key}`, language, this.hass.language);

    const lang = (language === 'auto' ? this.hass.language : language).toLowerCase();
    const pt = lang.startsWith('pt');
    const de = lang.startsWith('de');
    const ui = {
      appearance: pt ? 'Aparência' : de ? 'Erscheinungsbild' : 'Appearance',
      appearanceHint: pt ? 'Escolha como o cartão deve aparecer' : de ? 'Wähle das Design der Karte' : 'Choose how the card looks',
      light: pt ? 'Claro' : de ? 'Hell' : 'Light',
      lightHint: pt ? 'Sempre no modo claro' : de ? 'Immer im hellen Design' : 'Always use light mode',
      dark: pt ? 'Escuro' : de ? 'Dunkel' : 'Dark',
      darkHint: pt ? 'Sempre no modo escuro' : de ? 'Immer im dunklen Design' : 'Always use dark mode',
      auto: pt ? 'Automático' : de ? 'Automatisch' : 'Automatic',
      autoHint: pt ? 'Segue o tema do Home Assistant' : de ? 'Folgt dem Home Assistant-Design' : 'Follow the Home Assistant theme',
      custom: pt ? 'Personalizado' : de ? 'Benutzerdefiniert' : 'Custom',
      customHint: pt ? 'Escolha suas próprias cores' : de ? 'Eigene Farben auswählen' : 'Choose your own colors',
      colors: pt ? 'Paleta de cores' : de ? 'Farbpalette' : 'Color palette',
      colorsHint: pt ? 'Personalize a identidade visual do cartão' : de ? 'Passe die Farben deiner Karte an' : 'Customize the card colors',
      shape: pt ? 'Formato' : de ? 'Form' : 'Shape',
      preview: pt ? 'Prévia das cores' : de ? 'Farbvorschau' : 'Color preview',
      previewTitle: pt ? 'Minha música' : de ? 'Meine Musik' : 'My music',
      previewSubtitle: pt ? 'Pronto para tocar' : de ? 'Bereit für Musik' : 'Ready to play',
      reset: pt ? 'Restaurar' : de ? 'Zurücksetzen' : 'Reset',
      radiusHint: pt ? 'Ex.: 12px, 20px ou 1rem' : de ? 'Z. B. 12px, 20px oder 1rem' : 'E.g. 12px, 20px or 1rem',
    };

    const radius = this.getValue('crmBorderRadius');
    const selected = this.getTheme();

    const haDark = this.hass?.themes?.darkMode !== false;
    const useDark = selected === 'dark' ||
      (selected === 'auto' && haDark);

    const palette = useDark
      ? {
          background: '#101b19',
          accent: '#34d399',
          text: '#f0fdf4',
        }
      : {
          background: '#f7faf8',
          accent: '#16875c',
          text: '#183329',
        };

    const background = selected === 'custom'
      ? this.getValue('crmBackground')
      : palette.background;

    const accent = selected === 'custom'
      ? this.getValue('crmAccent')
      : palette.accent;

    const text = selected === 'custom'
      ? this.getValue('crmText')
      : palette.text;

    return html`
      <div class="studio">
        <div class="studio-heading">
          <span class="studio-kicker">CONTROLROOM STUDIO</span>
          <h3>${t('description')}</h3>
        </div>

        <div class="studio-panel">
          <div class="panel-title">${ui.appearance}</div>
          <div class="panel-hint">${ui.appearanceHint}</div>
          <div class="theme-list" role="group" aria-label=${ui.appearance}>
            ${this.themeChoice('light', ui.light, ui.lightHint, selected)}
            ${this.themeChoice('dark', ui.dark, ui.darkHint, selected)}
            ${this.themeChoice('auto', ui.auto, ui.autoHint, selected)}
            ${this.themeChoice('custom', ui.custom, ui.customHint, selected)}
          </div>
        </div>

        ${selected === 'custom' ? html`
          <div class="studio-panel">
            <div class="panel-title">${ui.colors}</div>
            <div class="panel-hint">${ui.colorsHint}</div>
            ${this.colorControl('crmBackground', t('background'), ui.reset)}
            ${this.colorControl('crmAccent', t('accent'), ui.reset)}
            ${this.colorControl('crmText', t('text'), ui.reset)}
          </div>
        ` : ''}

        <div class="studio-panel">
          <div class="panel-title">${ui.shape}</div>
          <div class="color-top">
            <label class="field-label" for="radius">${t('borderRadius')}</label>
            <button class="reset" type="button" @click=${() => this.resetField('crmBorderRadius')}>${ui.reset}</button>
          </div>
          <input
            id="radius"
            class="studio-input"
            type="text"
            name="crmBorderRadius"
            .value=${radius}
            @change=${this.onTextChange}
          />
          <div class="field-hint">${ui.radiusHint}</div>
        </div>

        <div class="studio-panel">
          <div class="panel-title">${ui.preview}</div>
          <div class="preview" style=${`background: ${background}; color: ${text}; border-radius: ${radius};`}>
            <div class="preview-cover" style=${`background: ${accent};`}>♫</div>
            <div class="preview-info"><strong>${ui.previewTitle}</strong><span>${ui.previewSubtitle}</span></div>
            <span class="preview-play" style=${`background: ${accent}; color: ${background};`}>▶</span>
          </div>
        </div>
      </div>
    `;
  }

  static get styles() {
    return css`
      :host { display: block; min-width: 0; }
      * { box-sizing: border-box; }
      .studio { display: grid; gap: 11px; min-width: 0; color: var(--primary-text-color); }
      .studio-heading { padding: 3px 2px 5px; }
      .studio-kicker { font-size: 10px; font-weight: 700; letter-spacing: .12em; color: var(--secondary-text-color); }
      h3 { margin: 6px 0 0; font-size: 16px; font-weight: 650; color: var(--primary-text-color); }
      .studio-panel { min-width: 0; padding: 15px; border: 1px solid var(--divider-color); border-radius: 14px; background: var(--card-background-color, var(--ha-card-background)); }
      .panel-title { font-size: 13px; font-weight: 650; }
      .panel-hint, .field-hint { font-size: 11px; line-height: 1.5; color: var(--secondary-text-color); }
      .panel-hint { margin: 4px 0 15px; }
      .field-hint { margin-top: 7px; }
      .theme-list { display: grid; gap: 9px; }
      .theme-option { display: flex; align-items: center; width: 100%; min-width: 0; gap: 12px; padding: 12px; border: 2px solid transparent; border-radius: 14px; background: var(--secondary-background-color, rgba(128,128,128,.1)); color: var(--primary-text-color); text-align: left; font: inherit; cursor: pointer; transition: border-color .15s ease, background .15s ease; }
      .theme-option:hover { background: var(--divider-color, rgba(128,128,128,.16)); }
      .theme-option.selected { border-color: var(--primary-color, #34d399); }
      .theme-option:focus-visible { outline: 2px solid var(--primary-color, #34d399); outline-offset: 2px; }
      .theme-thumbnail { display: block; flex: 0 0 62px; width: 62px; height: 64px; padding: 7px; border: 1px solid rgba(128,128,128,.4); border-radius: 11px; overflow: hidden; }
      .theme-thumbnail.light { background: #f5f6f7; }
      .theme-thumbnail.dark { background: #141719; }
      .theme-thumbnail.auto { background: linear-gradient(90deg, #f5f6f7 50%, #141719 50%); }
      .theme-thumbnail.custom { background: linear-gradient(135deg, #ac83f7, #f9b86a, #58c6b2); }
      .thumbnail-paper { display: block; width: 100%; height: 100%; padding: 5px; border-radius: 5px; }
      .light .thumbnail-paper { background: #fff; color: #17191a; }
      .dark .thumbnail-paper { background: #24282b; color: #f7f7f7; }
      .auto .thumbnail-paper { background: linear-gradient(90deg, #fff 50%, #24282b 50%); color: #17191a; }
      .custom .thumbnail-paper { background: rgba(255,255,255,.72); color: #35244b; }
      .thumbnail-aa { display: block; font-size: 12px; font-weight: 700; }
      .thumbnail-line { display: block; width: 75%; height: 3px; margin-top: 8px; border-radius: 3px; background: currentColor; opacity: .3; }
      .theme-copy { display: grid; flex: 1; min-width: 0; gap: 5px; }
      .theme-copy strong { font-size: 13px; font-weight: 650; }
      .theme-copy small { font-size: 11px; line-height: 1.4; color: var(--secondary-text-color); }
      .theme-indicator { display: grid; place-items: center; flex: 0 0 21px; width: 21px; height: 21px; border-radius: 50%; border: 2px solid var(--secondary-text-color); opacity: .7; }
      .selected .theme-indicator { border-color: var(--primary-color, #34d399); background: var(--primary-color, #34d399); color: #101b19; opacity: 1; }
      .theme-indicator ha-icon { --mdc-icon-size: 15px; }
      .color-row + .color-row { margin-top: 14px; }
      .color-top { display: flex; justify-content: space-between; align-items: center; gap: 10px; margin-bottom: 7px; }
      .field-label { font-size: 12px; font-weight: 550; color: var(--secondary-text-color); }
      .reset { border: 0; padding: 2px 0; background: transparent; color: var(--primary-color); font: inherit; font-size: 11px; cursor: pointer; }
      .reset:hover { text-decoration: underline; }
      .color-controls { display: flex; align-items: center; gap: 9px; }
      .color-picker { position: relative; flex: 0 0 40px; width: 40px; height: 38px; border: 1px solid var(--divider-color); border-radius: 9px; overflow: hidden; cursor: pointer; }
      .color-picker input { display: block; width: 100%; height: 100%; padding: 0; border: 0; background: transparent; cursor: pointer; }
      .color-picker input::-webkit-color-swatch-wrapper { padding: 3px; }
      .color-picker input::-webkit-color-swatch { border: 0; border-radius: 5px; }
      .studio-input { display: block; width: 100%; min-width: 0; height: 38px; padding: 0 11px; border: 1px solid var(--divider-color); border-radius: 9px; background: var(--secondary-background-color); color: var(--primary-text-color); font: inherit; font-size: 13px; }
      .studio-input:focus-visible, .reset:focus-visible, .color-picker:focus-within { outline: 2px solid var(--primary-color); outline-offset: 2px; }
      .preview { display: flex; align-items: center; gap: 11px; min-height: 79px; margin-top: 12px; padding: 12px; overflow: hidden; }
      .preview-cover { display: grid; place-items: center; width: 49px; height: 49px; flex-shrink: 0; border-radius: 9px; color: #101b19; font-size: 24px; font-weight: 700; }
      .preview-info { display: flex; flex: 1; flex-direction: column; gap: 4px; min-width: 0; }
      .preview-info strong { font-size: 12px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .preview-info span { font-size: 11px; opacity: .7; }
      .preview-play { display: grid; place-items: center; flex-shrink: 0; width: 32px; height: 32px; border-radius: 50%; font-size: 12px; }
      @media (max-width: 340px) { .studio-panel { padding: 11px; } .theme-option { gap: 9px; padding: 9px; } .theme-thumbnail { flex-basis: 52px; width: 52px; height: 56px; } }
    `;
  }
}

customElements.define('crm-design-editor', DesignEditor);
