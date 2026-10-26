import { css, html, TemplateResult } from 'lit';

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
      idle: label('Sem reprodução', 'Ohne Wiedergabe', 'When idle'),
      idleHint: label(
        'Defina o comportamento quando nada estiver tocando',
        'Verhalten festlegen, wenn nichts abgespielt wird',
        'Set the behavior when nothing is playing',
      ),
      appearanceNote: label(
        'Imagem de fundo e enquadramento agora são configurados em Aparência.',
        'Hintergrundbild und Bildanpassung werden jetzt unter Erscheinungsbild eingestellt.',
        'Background image and image fitting are now configured under Appearance.',
      ),
    };

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
        <div class="appearance-note">
          <ha-icon icon="mdi:palette-outline"></ha-icon>
          <span>${labels.appearanceNote}</span>
        </div>
      </div>
    `;
  }

  static get styles() {
    return css`
      :host { display: block; min-width: 0; }
      * { box-sizing: border-box; }
      .studio-player-general { display: grid; gap: 11px; min-width: 0; }
      .studio-description {
        margin: 0 2px 3px;
        color: var(--secondary-text-color);
        font-size: 12px;
        line-height: 1.5;
      }
      .studio-panel {
        min-width: 0;
        padding: 14px;
        border: 1px solid var(--divider-color, rgba(128,128,128,.2));
        border-radius: 14px;
        background: var(--card-background-color, var(--ha-card-background, transparent));
      }
      .studio-panel-heading {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 14px;
        padding-bottom: 12px;
        border-bottom: 1px solid var(--divider-color, rgba(128,128,128,.2));
      }
      .studio-icon {
        display: grid;
        place-items: center;
        flex: 0 0 35px;
        width: 35px;
        height: 35px;
        border-radius: 10px;
        background: color-mix(in srgb, var(--crm-editor-accent, var(--primary-color)) 12%, transparent);
        color: var(--crm-editor-accent, var(--primary-color));
      }
      .studio-icon ha-icon { --mdc-icon-size: 19px; }
      .studio-heading-copy { display: grid; gap: 3px; min-width: 0; }
      .studio-heading-copy strong {
        color: var(--primary-text-color);
        font-size: 13px;
        font-weight: 650;
      }
      .studio-heading-copy small {
        color: var(--secondary-text-color);
        font-size: 11px;
        line-height: 1.4;
      }
      crm-editor-form { display: block; min-width: 0; }
      .appearance-note {
        display: flex;
        align-items: flex-start;
        gap: 9px;
        padding: 11px 12px;
        border: 1px solid var(--divider-color, rgba(128,128,128,.2));
        border-radius: 11px;
        background: var(--secondary-background-color, rgba(128,128,128,.06));
        color: var(--secondary-text-color);
        font-size: 11px;
        line-height: 1.5;
      }
      .appearance-note ha-icon {
        flex-shrink: 0;
        --mdc-icon-size: 18px;
        color: var(--crm-editor-accent, var(--primary-color));
      }
      @media (max-width: 340px) { .studio-panel { padding: 10px; } }
    `;
  }
}

customElements.define('crm-player-general-editor', PlayerGeneralSettingsEditor);
