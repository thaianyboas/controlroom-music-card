
import { css, html, LitElement, PropertyValues, TemplateResult } from 'lit';
import { property, query } from 'lit/decorators.js';

import { BaseEditor } from './base-editor';
import { CardConfig } from '../types/card-config';

/**
 * ControlRoom Studio Form
 * Keeps Home Assistant's native ha-form behavior while
 * applying a compact, consistent visual presentation.
 */
class Form extends BaseEditor {
  @property({ attribute: false }) schema!: unknown;
  @property({ attribute: false }) data!: unknown;
  @property({ attribute: false }) changed!: (ev: CustomEvent) => void;

  @query('#elmHaForm') private _elmHaForm?: LitElement;

  protected render(): TemplateResult {
    return html`
      <ha-form
        id="elmHaForm"
        .data=${this.data || this.config}
        .schema=${this.schema}
        .computeLabel=${formatLabel}
        .hass=${this.hass}
        @value-changed=${this.changed || this.onValueChanged}
      ></ha-form>
    `;
  }

  static get styles() {
    return css`
      :host {
        display: block;
        width: 100%;
        min-width: 0;
        box-sizing: border-box;

        --ha-form-style-integer-margin-bottom: 4px;
        --ha-form-style-multiselect-margin-bottom: 4px;
        --ha-form-style-selector-margin-bottom: 4px;
        --ha-form-style-selector-boolean-min-height: 32px;
        --ha-form-style-string-margin-bottom: 4px;
      }

      ha-form {
        display: block;
        width: 100%;
        min-width: 0;

        --mdc-menu-item-height: 36px;
        --mdc-text-field-fill-color:
          var(--secondary-background-color, rgba(127,127,127,.06));
        --mdc-text-field-outlined-idle-border-color: transparent;
        --mdc-text-field-outlined-hover-border-color:
          var(--divider-color);
        --ha-textfield-border-width: 1px;
      }
    `;
  }

  protected firstUpdated(changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);
    void this._applyStudioStyles();
  }

  protected updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);
    void this._applyStudioStyles();
  }

  protected onValueChanged(args: CustomEvent): void {
    args.stopPropagation();

    const changedConfig = args.detail?.value as CardConfig | undefined;
    if (!changedConfig) return;

    this.configChanged(changedConfig);
  }

  private async _applyStudioStyles(): Promise<void> {
    const form = this._elmHaForm;
    if (!form) return;

    await form.updateComplete;

    if (!this.isConnected || form !== this._elmHaForm) return;

    const root = form.shadowRoot;
    if (!root) return;

    if (!root.querySelector('#crm-studio-form-styles')) {
      const style = document.createElement('style');
      style.id = 'crm-studio-form-styles';

      style.textContent = `
        :host {
          display: block;
          min-width: 0;

          --ha-form-style-integer-margin-bottom: 4px;
          --ha-form-style-multiselect-margin-bottom: 4px;
          --ha-form-style-selector-margin-bottom: 4px;
          --ha-form-style-selector-boolean-min-height: 32px;
          --ha-form-style-string-margin-bottom: 4px;
        }

        .root {
          display: flex;
          flex-direction: column;
          gap: 7px;
          min-width: 0;
        }

        .root > * {
          display: block;
          min-width: 0;
          margin: 0 !important;
          box-sizing: border-box;
        }

        ha-form-string,
        ha-form-integer,
        ha-form-select,
        ha-form-multi_select,
        ha-selector {
          --mdc-menu-item-height: 36px;
          --mdc-text-field-fill-color:
            var(--secondary-background-color, rgba(127,127,127,.06));
          --mdc-text-field-outlined-idle-border-color: transparent;
          --ha-textfield-border-width: 1px;
        }
      `;

      root.appendChild(style);
    }

    // Cosmetic adjustments only. Native controls retain
    // their original events, values and accessibility.
    for (const selector of Array.from(root.querySelectorAll('ha-selector'))) {
      const inner = selector.shadowRoot?.querySelector('ha-selector-boolean');
      const field = inner?.shadowRoot?.querySelector('ha-formfield');

      if (field instanceof HTMLElement) {
        field.style.minHeight = '32px';
        field.style.margin = '0';
      }
    }
  }
}

export function formatLabel({
  label,
  name,
}: {
  name: string;
  help?: string;
  label?: string;
}): string {
  if (label) return label;

  const unCamelCased = name.replace(/([A-Z])/g, ' $1');
  return unCamelCased.charAt(0).toUpperCase() + unCamelCased.slice(1);
}

customElements.define('crm-editor-form', Form);
