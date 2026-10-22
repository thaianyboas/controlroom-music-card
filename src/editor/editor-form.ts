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

        /* Inherit the ControlRoom palette rather than HA's global theme. */
        --crm-form-accent: var(--crm-editor-accent, var(--primary-color, #159568));
        --crm-form-text: var(--primary-text-color, #17221e);
        --crm-form-muted: var(--secondary-text-color, #52635b);
        --crm-form-surface: var(--secondary-background-color, transparent);
      }

      ha-form {
        display: block;
        width: 100%;
        min-width: 0;
        color: var(--primary-text-color);

        --mdc-menu-item-height: 36px;
        --mdc-text-field-fill-color:
          var(--secondary-background-color, rgba(127,127,127,.06));
        --mdc-text-field-ink-color: var(--primary-text-color);
        --mdc-text-field-label-ink-color: var(--secondary-text-color);
        --mdc-text-field-outlined-idle-border-color: transparent;
        --mdc-text-field-outlined-hover-border-color: var(--divider-color);
        --ha-textfield-border-width: 1px;

        /* MDC (older HA controls) */
        --mdc-theme-primary: var(--crm-form-accent);
        --mdc-theme-on-surface: var(--crm-form-text);
        --mdc-theme-text-primary-on-background: var(--crm-form-text);
        --mdc-theme-text-secondary-on-background: var(--crm-form-muted);
        --mdc-text-field-ink-color: var(--crm-form-text);
        --mdc-text-field-label-ink-color: var(--crm-form-muted);
        --mdc-text-field-fill-color: var(--crm-form-surface);
        --mdc-select-ink-color: var(--crm-form-text);
        --mdc-select-label-ink-color: var(--crm-form-muted);
        --mdc-select-fill-color: var(--crm-form-surface);
        --mdc-checkbox-checked-color: var(--crm-form-accent);
        --mdc-switch-selected-track-color: var(--crm-form-accent);
        --mdc-switch-selected-handle-color: var(--crm-form-accent);
        --mdc-radio-checked-color: var(--crm-form-accent);

        /* Home Assistant selectors and switches */
        --ha-selector-text-color: var(--crm-form-text);
        --ha-selector-label-color: var(--crm-form-muted);
        --switch-checked-color: var(--crm-form-accent);
        --switch-checked-track-color: var(--crm-form-accent);
        --switch-checked-button-color: var(--crm-form-accent);
        --ha-switch-checked-color: var(--crm-form-accent);
        --ha-switch-checked-track-color: var(--crm-form-accent);
        --ha-switch-checked-button-color: var(--crm-form-accent);
        --ha-control-color: var(--crm-form-accent);
        --ha-control-checked-color: var(--crm-form-accent);
        --ha-textfield-ink-color: var(--crm-form-text);
        --ha-textfield-label-color: var(--crm-form-muted);
        --ha-textfield-focus-color: var(--crm-form-accent);
        --ha-select-ink-color: var(--crm-form-text);
        --ha-select-label-color: var(--crm-form-muted);
        --ha-select-focus-color: var(--crm-form-accent);

        /* Material Web (newer HA controls) */
        --md-sys-color-primary: var(--crm-form-accent);
        --md-sys-color-on-surface: var(--crm-form-text);
        --md-sys-color-on-surface-variant: var(--crm-form-muted);
        --md-sys-color-surface-container-highest: var(--crm-form-surface);
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
          color: var(--crm-form-text, var(--primary-text-color));
          --primary-color: var(--crm-form-accent, #159568);
          --success-color: var(--crm-form-accent, #159568);
          --mdc-theme-primary: var(--crm-form-accent, #159568);
          --mdc-theme-on-surface: var(--crm-form-text, var(--primary-text-color));
          --mdc-theme-text-primary-on-background: var(--crm-form-text, var(--primary-text-color));
          --mdc-theme-text-secondary-on-background: var(--crm-form-muted, var(--secondary-text-color));
          --mdc-menu-item-height: 36px;
          --mdc-text-field-fill-color:
            var(--secondary-background-color, rgba(127,127,127,.06));
          --mdc-text-field-ink-color: var(--primary-text-color);
          --mdc-text-field-label-ink-color: var(--secondary-text-color);
          --mdc-text-field-outlined-idle-border-color: transparent;
          --mdc-text-field-outlined-hover-border-color: var(--divider-color);
          --ha-textfield-border-width: 1px;
          --mdc-select-ink-color: var(--crm-form-text, var(--primary-text-color));
          --mdc-select-label-ink-color: var(--crm-form-muted, var(--secondary-text-color));
          --mdc-checkbox-checked-color: var(--crm-form-accent, #159568);
          --switch-checked-color: var(--crm-form-accent, #159568);
          --switch-checked-track-color: var(--crm-form-accent, #159568);
          --ha-switch-checked-color: var(--crm-form-accent, #159568);
          --ha-switch-checked-track-color: var(--crm-form-accent, #159568);
          --ha-control-color: var(--crm-form-accent, #159568);
          --ha-control-checked-color: var(--crm-form-accent, #159568);
          --md-sys-color-primary: var(--crm-form-accent, #159568);
          --md-sys-color-on-surface: var(--crm-form-text, var(--primary-text-color));
          --md-sys-color-on-surface-variant: var(--crm-form-muted, var(--secondary-text-color));
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
