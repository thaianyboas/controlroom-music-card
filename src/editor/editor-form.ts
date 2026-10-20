// Lovelace card imports.
import { css, html, LitElement, PropertyValues, TemplateResult } from 'lit';
import { property, query } from 'lit/decorators.js';

// Our imports.
import { BaseEditor } from './base-editor';
import { CardConfig } from '../types/card-config';

/**
 * Compact, theme-aware wrapper for Home Assistant's native ha-form.
 * All values and value-changed events remain managed by ha-form.
 */
class Form extends BaseEditor {
  @property({ attribute: false }) schema!: unknown;
  @property({ attribute: false }) data!: unknown;
  @property({ attribute: false }) changed!: (ev: CustomEvent) => void;
  private isRenderRootStylesUpdated = false;

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
        --ha-form-style-integer-margin-bottom: 10px;
        --ha-form-style-multiselect-margin-bottom: 10px;
        --ha-form-style-selector-margin-bottom: 10px;
        --ha-form-style-selector-boolean-min-height: 36px;
        --ha-form-style-string-margin-bottom: 10px;
      }

      ha-form {
        display: block;
        width: 100%;
        min-width: 0;
        --mdc-menu-item-height: 40px;
        --mdc-text-field-fill-color: var(--secondary-background-color, rgba(127, 127, 127, 0.08));
        --mdc-text-field-outlined-idle-border-color: transparent;
        --mdc-text-field-outlined-hover-border-color: var(--divider-color);
        --ha-textfield-border-width: 1px;
      }
    `;
  }

  protected firstUpdated(changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);
    void this._applyCompactStyles();
  }

  protected updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);
    void this._applyCompactStyles();
  }

  protected onValueChanged(args: CustomEvent): void {
    // The ha-form event is handled here, not by outer studio panels.
    // Avoid duplicate handlers when the event crosses shadow boundaries.
    args.stopPropagation();
    const changedConfig = args.detail?.value as CardConfig | undefined;
    if (!changedConfig) return;
    this.configChanged(changedConfig);
  }

  /**
   * Apply one stylesheet to ha-form's shadow root. No polling, timeouts,
   * or repeated requestUpdate calls are needed.
   */
  private async _applyCompactStyles(): Promise<void> {
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
          --ha-form-style-integer-margin-bottom: 10px;
          --ha-form-style-multiselect-margin-bottom: 10px;
          --ha-form-style-selector-margin-bottom: 10px;
          --ha-form-style-selector-boolean-min-height: 36px;
          --ha-form-style-string-margin-bottom: 10px;
        }

        .root {
          display: flex;
          flex-direction: column;
          gap: 10px;
          min-width: 0;
        }

        .root > * {
          display: block;
          box-sizing: border-box;
          min-width: 0;
          margin: 0 !important;
        }

        ha-form-string,
        ha-form-integer,
        ha-form-select,
        ha-form-multi_select,
        ha-selector {
          --mdc-menu-item-height: 40px;
          --mdc-text-field-fill-color: var(--secondary-background-color, rgba(127,127,127,.08));
          --mdc-text-field-outlined-idle-border-color: transparent;
          --ha-textfield-border-width: 1px;
        }

        ha-form-string::part(base),
        ha-form-integer::part(base) {
          border-radius: 10px;
        }
      `;
      root.appendChild(style);
    }

    // Style the boolean formfield inside HA's nested shadow roots where possible.
    // This is purely visual; never replace or intercept the native control.
    for (const selector of Array.from(root.querySelectorAll('ha-selector'))) {
      const inner = selector.shadowRoot?.querySelector('ha-selector-boolean');
      const field = inner?.shadowRoot?.querySelector('ha-formfield');
      if (field instanceof HTMLElement) {
        field.style.minHeight = '36px';
        field.style.margin = '0';
      }
    }

    if (!this.isRenderRootStylesUpdated) {
      this.isRenderRootStylesUpdated = true;
    }
  }
}

/**
 * Use short field titles. The original schema is not modified.
 * Long help text is intentionally omitted from the label; a separate
 * help/tooltip treatment can be added at the schema level later.
 */
export function formatLabel({ label, name }: { name: string; help?: string; label?: string }): string {
  if (label) return label;
  const unCamelCased = name.replace(/([A-Z])/g, ' $1');
  return unCamelCased.charAt(0).toUpperCase() + unCamelCased.slice(1);
}

customElements.define('crm-editor-form', Form);
