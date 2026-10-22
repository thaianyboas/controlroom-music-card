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
        : (this.hass.locale?.language || this.hass.language || 'en').toLowerCase();
    const pt = language.startsWith('pt');
    const de = language.startsWith('de');
    const label = (ptText: string, deText: string, enText: string): string =>
      pt ? ptText : de ? deText : enText;

    const labels = {
      appearance: label('Imagem de fundo', 'Hintergrundbild', 'Background image'),
      appearanceHint: label('Escolha como a imagem ocupa o espaço do player', 'Lege fest, wie das Bild den Player ausfüllt', 'Choose how the image fills the player'),
      cover: label('Cobrir', 'Abdecken', 'Cover'),
      contain: label('Conter', 'Einpassen', 'Contain'),
      stretch: label('Esticar', 'Strecken', 'Stretch'),
      custom: label('Personalizado', 'Benutzerdefiniert', 'Custom'),
      customHint: label('Tamanho CSS personalizado (ex.: 80% auto)', 'Eigene CSS-Größe (z. B. 80% auto)', 'Custom CSS size (e.g. 80% auto)'),
      idle: label('Sem reprodução', 'Ohne Wiedergabe', 'When idle'),
      idleHint: label('Defina o comportamento quando nada estiver tocando', 'Verhalten festlegen, wenn nichts abgespielt wird', 'Set the behavior when nothing is playing'),
      preview: label('Prévia de preenchimento', 'Vorschau der Bildanpassung', 'Image fit preview'),
      previewCaption: label('Prévia ilustrativa: não altera a reprodução', 'Illustrative Vorschau: keine Auswirkung auf die Wiedergabe', 'Illustrative preview: does not affect playback'),
    };

    const currentSize =
      this.config.playerBackgroundImageSize ??
      PLAYER_BACKGROUND_IMAGE_SIZE_DEFAULT;
    const presets = ['cover', 'contain', '100% 100%'];
    const selectedSize = presets.includes(currentSize) ? currentSize : 'custom';

    const options = [
      { value: 'cover', label: labels.cover, icon: 'mdi:image-size-select-large', art: 'cover' },
      { value: 'contain', label: labels.contain, icon: 'mdi:fit-to-screen-outline', art: 'contain' },
      { value: '100% 100%', label: labels.stretch, icon: 'mdi:arrow-expand-all', art: 'stretch' },
      { value: 'custom', label: labels.custom, icon: 'mdi:tune-variant', art: 'custom' },
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
        <p class="studio-description">${t('description')}</p>

        <section class="studio-panel">
          <div class="studio-panel-heading">
            <span class="studio-icon"><ha-icon icon="mdi:image-size-select-large"></ha-icon></span>
            <div class="studio-heading-copy">
              <strong>${labels.appearance}</strong>
              <small>${labels.appearanceHint}</small>
            </div>
          </div>

          <div class="image-size-options">
            ${options.map(option => html`
              <button
                type="button"
                class="image-size-option ${selectedSize === option.value ? 'selected' : ''}"
                aria-pressed=${String(selectedSize === option.value)}
                @click=${() => {
                  const value = option.value === 'custom'
                    ? (selectedSize === 'custom' ? currentSize : '80% auto')
                    : option.value;
                  this.configChanged({ ...this.config, playerBackgroundImageSize: value });
                }}
              >
                <span class="image-size-art ${option.art}" aria-hidden="true">
                  <span class="art-frame"><span class="art-image"><ha-icon icon="mdi:music-note"></ha-icon></span></span>
                </span>
                <span class="image-size-label">${option.label}</span>
                <ha-icon class="selection-check" icon=${selectedSize === option.value ? 'mdi:check-circle' : 'mdi:circle-outline'}></ha-icon>
              </button>
            `)}
          </div>

          ${selectedSize === 'custom' ? html`
            <label class="custom-size-label" for="crm-custom-image-size">${labels.customHint}</label>
            <input
              id="crm-custom-image-size"
              class="custom-size-input"
              type="text"
              .value=${currentSize}
              @change=${(event: Event) => {
                const input = event.currentTarget as HTMLInputElement;
                const value = input.value.trim();
                if (value) {
                  this.configChanged({ ...this.config, playerBackgroundImageSize: value });
                }
              }}
            />
          ` : ''}

          <div class="fit-preview">
            <span class="fit-preview-title">${labels.preview}</span>
            <div class="fit-preview-stage">
              <div class="fit-preview-image" style=${`background-size: ${currentSize};`}></div>
              <div class="fit-preview-overlay"><ha-icon icon="mdi:spotify"></ha-icon><span>ControlRoom Music</span></div>
            </div>
            <small>${labels.previewCaption}</small>
          </div>
        </section>

        <section class="studio-panel">
          <div class="studio-panel-heading">
            <span class="studio-icon"><ha-icon icon="mdi:power-sleep"></ha-icon></span>
            <div class="studio-heading-copy">
              <strong>${labels.idle}</strong>
              <small>${labels.idleHint}</small>
            </div>
          </div>
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
      :host { display: block; min-width: 0; }
      * { box-sizing: border-box; }
      .studio-player-general { display: grid; gap: 11px; min-width: 0; }
      .studio-description { margin: 0 2px 3px; color: var(--secondary-text-color); font-size: 12px; line-height: 1.5; }
      .studio-panel { min-width: 0; padding: 14px; border: 1px solid var(--divider-color, rgba(128,128,128,.2)); border-radius: 14px; background: var(--card-background-color, var(--ha-card-background, transparent)); }
      .studio-panel-heading { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; padding-bottom: 12px; border-bottom: 1px solid var(--divider-color, rgba(128,128,128,.2)); }
      .studio-icon { display: grid; place-items: center; flex: 0 0 35px; width: 35px; height: 35px; border-radius: 10px; background: color-mix(in srgb, var(--primary-color, #34d399) 12%, transparent); color: var(--primary-color, #34d399); }
      .studio-icon ha-icon { --mdc-icon-size: 19px; }
      .studio-heading-copy { display: grid; gap: 3px; min-width: 0; }
      .studio-heading-copy strong { color: var(--primary-text-color); font-size: 13px; font-weight: 650; }
      .studio-heading-copy small { color: var(--secondary-text-color); font-size: 11px; line-height: 1.4; }
      .image-size-options { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 9px; }
      .image-size-option { position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 9px; min-width: 0; min-height: 122px; padding: 12px 8px; border: 1px solid var(--divider-color, rgba(128,128,128,.25)); border-radius: 12px; background: var(--secondary-background-color, rgba(128,128,128,.06)); color: var(--primary-text-color); font: inherit; cursor: pointer; transition: border-color .15s, background .15s, transform .15s; }
      .image-size-option:hover { border-color: var(--primary-color, #34d399); transform: translateY(-1px); }
      .image-size-option.selected { border: 2px solid var(--primary-color, #34d399); background: color-mix(in srgb, var(--primary-color, #34d399) 8%, var(--card-background-color, transparent)); padding: 11px 7px; }
      .image-size-option:focus-visible { outline: 2px solid var(--primary-color, #34d399); outline-offset: 2px; }
      .image-size-art { display: grid; place-items: center; width: 100%; max-width: 128px; height: 72px; border-radius: 9px; background: color-mix(in srgb, var(--secondary-background-color, #808080) 70%, transparent); overflow: hidden; }
      .art-frame { position: relative; display: block; width: 92px; height: 55px; border: 1px solid var(--secondary-text-color); border-radius: 5px; overflow: hidden; opacity: .85; }
      .art-image { position: absolute; display: grid; place-items: center; inset: 0; background: linear-gradient(135deg, #064e3b, #10b981 55%, #022c22); color: #ecfdf5; }
      .art-image ha-icon { --mdc-icon-size: 22px; }
      .cover .art-image { inset: -12px; }
      .contain .art-image { inset: 8px 18px; }
      .stretch .art-image { inset: 0; border-radius: 0; }
      .custom .art-image { inset: 8px 12px 4px 4px; }
      .image-size-label { font-size: 12px; font-weight: 600; text-align: center; }
      .selection-check { position: absolute; top: 7px; right: 7px; --mdc-icon-size: 17px; color: var(--secondary-text-color); }
      .selected .selection-check { color: var(--primary-color, #34d399); }
      .custom-size-label { display: block; margin-top: 14px; font-size: 11px; line-height: 1.5; color: var(--secondary-text-color); }
      .custom-size-input { display: block; width: 100%; height: 39px; margin-top: 7px; padding: 0 11px; border: 1px solid var(--divider-color); border-radius: 9px; background: var(--secondary-background-color); color: var(--primary-text-color); font: inherit; font-size: 13px; }
      .custom-size-input:focus-visible { outline: 2px solid var(--primary-color, #34d399); outline-offset: 2px; }
      .fit-preview { display: grid; gap: 8px; margin-top: 15px; padding-top: 13px; border-top: 1px solid var(--divider-color, rgba(128,128,128,.2)); }
      .fit-preview-title { color: var(--primary-text-color); font-size: 11px; font-weight: 600; }
      .fit-preview-stage { position: relative; min-height: 95px; overflow: hidden; border-radius: 10px; background: #071b16; }
      .fit-preview-image { position: absolute; inset: 0; background-image: linear-gradient(135deg, #064e3b 0%, #34d399 50%, #065f46 100%); background-repeat: no-repeat; background-position: center; }
      .fit-preview-overlay { position: absolute; inset: 0; display: flex; align-items: end; gap: 7px; padding: 11px; color: #f0fdf4; background: linear-gradient(transparent, rgba(0,0,0,.55)); font-size: 11px; font-weight: 650; }
      .fit-preview-overlay ha-icon { --mdc-icon-size: 17px; }
      .fit-preview small { color: var(--secondary-text-color); font-size: 10px; line-height: 1.4; }
      crm-editor-form { display: block; min-width: 0; }
      @media (max-width: 340px) { .studio-panel { padding: 10px; } .image-size-options { gap: 6px; } .image-size-option { min-height: 112px; padding: 9px 5px; } }
    `;
  }
}

customElements.define('crm-player-general-editor', PlayerGeneralSettingsEditor);
