import { css, html, TemplateResult } from 'lit';

import { BaseEditor } from './base-editor';
import { translate } from '../localization/i18n';

type ColorField = 'crmBackground' | 'crmAccent' | 'crmText';

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

  protected render(): TemplateResult {
    super.createStore();

    const language = this.config.language ?? 'auto';
    const t = (key: string): string =>
      translate(`editor.designSettings.${key}`, language, this.hass.language);

    const lang = (language === 'auto' ? this.hass.language : language).toLowerCase();
    const pt = lang.startsWith('pt');
    const de = lang.startsWith('de');
    const ui = {
      colors: pt ? 'Paleta de cores' : de ? 'Farbpalette' : 'Color palette',
      colorsHint: pt ? 'Personalize a identidade visual do cartão' : de ? 'Passe die Farben deiner Karte an' : 'Customize the card colors',
      shape: pt ? 'Formato' : de ? 'Form' : 'Shape',
      preview: pt ? 'Prévia das cores' : de ? 'Farbvorschau' : 'Color preview',
      previewTitle: pt ? 'Minha música' : de ? 'Meine Musik' : 'My music',
      previewSubtitle: pt ? 'Pronto para tocar' : de ? 'Bereit für Musik' : 'Ready to play',
      reset: pt ? 'Restaurar' : de ? 'Zurücksetzen' : 'Reset',
      radiusHint: pt ? 'Ex.: 12px, 20px ou 1rem' : de ? 'Z. B. 12px, 20px oder 1rem' : 'E.g. 12px, 20px or 1rem',
    };

    const background = this.getValue('crmBackground');
    const accent = this.getValue('crmAccent');
    const text = this.getValue('crmText');
    const radius = this.getValue('crmBorderRadius');

    return html`
      <div class="studio">
        <div class="studio-heading">
          <span class="studio-kicker">CONTROLROOM STUDIO</span>
          <h3>${t('description')}</h3>
        </div>

        <div class="studio-panel">
          <div class="panel-title">${ui.colors}</div>
          <div class="panel-hint">${ui.colorsHint}</div>
          ${this.colorControl('crmBackground', t('background'), ui.reset)}
          ${this.colorControl('crmAccent', t('accent'), ui.reset)}
          ${this.colorControl('crmText', t('text'), ui.reset)}
        </div>

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
          <div
            class="preview"
            style=${`background: ${background}; color: ${text}; border-radius: ${radius};`}
          >
            <div class="preview-cover" style=${`background: ${accent};`}>♫</div>
            <div class="preview-info">
              <strong>${ui.previewTitle}</strong>
              <span>${ui.previewSubtitle}</span>
            </div>
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
    `;
  }
}

customElements.define('crm-design-editor', DesignEditor);
