import { css, html, TemplateResult } from 'lit';
import { BaseEditor } from './base-editor';

class AdvancedEditor extends BaseEditor {
  protected render(): TemplateResult {
    const language = (
      this.config.language && this.config.language !== 'auto'
        ? this.config.language
        : this.hass?.locale?.language || this.hass?.language || 'en'
    ).toLowerCase();

    const pt = language.startsWith('pt');
    const de = language.startsWith('de');

    const title = pt ? 'Interação e compatibilidade'
      : de ? 'Interaktion und Kompatibilität'
      : 'Interaction and compatibility';

    const label = pt ? 'Desativar suporte ao toque'
      : de ? 'Touch-Unterstützung deaktivieren'
      : 'Disable touch support';

    const hint = pt ? 'Desativa os gestos de toque do cartão.'
      : de ? 'Deaktiviert die Touch-Gesten der Karte.'
      : 'Disables touch gestures on the card.';

    return html`
      <div class="panel">
        <div class="heading">
          <ha-icon icon="mdi:gesture-tap"></ha-icon>
          <strong>${title}</strong>
        </div>
        <label class="setting">
          <span class="description">
            <strong>${label}</strong>
            <small>${hint}</small>
          </span>
          <input
            type="checkbox"
            .checked=${Boolean(this.config.touchSupportDisabled)}
            @change=${(event: Event) => {
              this.configChanged({
                ...this.config,
                touchSupportDisabled:
                  (event.currentTarget as HTMLInputElement).checked,
              });
            }}
          />
        </label>
      </div>
    `;
  }

  static get styles() {
    return css`
      :host { display: block; }
      .panel {
        padding: 16px;
        border: 1px solid var(--divider-color);
        border-radius: 14px;
        background: var(--card-background-color, var(--ha-card-background));
      }
      .heading, .setting {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .heading {
        margin-bottom: 18px;
        font-size: 14px;
      }
      .heading ha-icon {
        color: #34d399;
      }
      .setting {
        justify-content: space-between;
        cursor: pointer;
      }
      .description {
        display: flex;
        flex-direction: column;
        gap: 5px;
      }
      .description strong { font-size: 13px; }
      .description small {
        font-size: 11px;
        color: var(--secondary-text-color);
      }
      input {
        width: 18px;
        height: 18px;
        accent-color: #34d399;
      }
    `;
  }
}

customElements.define('crm-advanced-editor', AdvancedEditor);
