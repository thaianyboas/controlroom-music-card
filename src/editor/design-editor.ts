import { css, html, TemplateResult } from 'lit';
import { BaseEditor } from './base-editor';
import { Section } from '../types/section';

const DESIGN_SETTINGS_SCHEMA = [
  {
    name: 'crmBackground',
    label: 'Cor de fundo',
    required: false,
    type: 'string',
    default: '#101b19',
  },
  {
    name: 'crmAccent',
    label: 'Cor principal',
    required: false,
    type: 'string',
    default: '#34d399',
  },
  {
    name: 'crmText',
    label: 'Cor do texto',
    required: false,
    type: 'string',
    default: '#f0fdf4',
  },
  {
    name: 'crmBorderRadius',
    label: 'Arredondamento das bordas',
    required: false,
    type: 'string',
    default: '20px',
  },
];

class DesignEditor extends BaseEditor {

  protected render(): TemplateResult {
    super.createStore();

    return html`
      <div class="schema-title">
        🎨 ControlRoom Music — Design
      </div>

      <crm-editor-form
        .schema=${DESIGN_SETTINGS_SCHEMA}
        .section=${Section.PLAYER}
        .store=${this.store}
        .config=${this.config}
        .hass=${this.hass}
      ></crm-editor-form>
    `;
  }

  static get styles() {
    return css`
      .schema-title {
        margin: 0.4rem 0;
        font-size: 1rem;
        font-weight: 600;
        color: var(--secondary-text-color);
      }
    `;
  }
}

customElements.define('crm-design-editor', DesignEditor);