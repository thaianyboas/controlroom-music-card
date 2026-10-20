import { css, html, TemplateResult } from 'lit';

import { PLAYER_CONTROLS_BACKGROUND_COLOR_DEFAULT } from '../constants';
import { BaseEditor } from './base-editor';
import { Section } from '../types/section';
import { translate } from '../localization/i18n';

class PlayerHeaderSettingsEditor extends BaseEditor {
  protected render(): TemplateResult {
    super.createStore();

    const t = (key: string): string =>
      translate(
        `editor.playerHeaderSettings.${key}`,
        this.config.language ?? 'auto',
        this.hass.language,
      );

    const lang = (this.config.language === 'auto' || !this.config.language
      ? this.hass.language
      : this.config.language).toLowerCase();
    const pt = lang.startsWith('pt');
    const de = lang.startsWith('de');

    const labels = {
      content: pt ? 'Textos do cabeçalho' : de ? 'Kopfbereich-Texte' : 'Header text',
      appearance: pt ? 'Cor do cabeçalho' : de ? 'Kopfbereich-Farbe' : 'Header color',
      visibility: pt ? 'Visibilidade' : de ? 'Sichtbarkeit' : 'Visibility',
      appearanceHint: pt
        ? 'Defina a cor de fundo do cabeçalho.'
        : de
          ? 'Hintergrundfarbe des Kopfbereichs festlegen.'
          : 'Set the header background color.',
    };

    const textSchema = [
      {
        name: 'playerHeaderTitle',
        label: t('title'),
        required: false,
        type: 'string',
      },
      {
        name: 'playerHeaderArtistTrack',
        label: t('artistTrack'),
        required: false,
        type: 'string',
      },
      {
        name: 'playerHeaderAlbum',
        label: t('album'),
        required: false,
        type: 'string',
      },
      {
        name: 'playerHeaderNoMediaPlayingText',
        label: t('noMediaPlayingText'),
        required: false,
        type: 'string',
      },
    ];

    const colorSchema = [
      {
        name: 'playerHeaderBackgroundColor',
        label: t('backgroundColor'),
        help: t('backgroundColorHelp'),
        required: false,
        type: 'string',
        default: PLAYER_CONTROLS_BACKGROUND_COLOR_DEFAULT,
      },
    ];

    const visibilitySchema = [
      {
        name: 'playerHeaderHideProgressBar',
        label: t('hideProgressBar'),
        required: false,
        selector: { boolean: {} },
      },
      {
        name: 'playerHeaderHide',
        label: t('hideHeader'),
        required: false,
        selector: { boolean: {} },
      },
    ];

    return html`
      <div class="studio-header">
        <p class="studio-description">${t('description')}</p>

        <section class="studio-panel">
          <div class="studio-panel-heading">
            <ha-icon icon="mdi:text-box-outline"></ha-icon>
            <span>${labels.content}</span>
          </div>
          <crm-editor-form
            .schema=${textSchema}
            .section=${Section.PLAYER}
            .store=${this.store}
            .config=${this.config}
            .hass=${this.hass}
          ></crm-editor-form>
        </section>

        <section class="studio-panel">
          <div class="studio-panel-heading">
            <ha-icon icon="mdi:palette-outline"></ha-icon>
            <span>${labels.appearance}</span>
          </div>
          <p class="studio-hint">${labels.appearanceHint}</p>
          <crm-editor-form
            .schema=${colorSchema}
            .section=${Section.PLAYER}
            .store=${this.store}
            .config=${this.config}
            .hass=${this.hass}
          ></crm-editor-form>
        </section>

        <section class="studio-panel">
          <div class="studio-panel-heading">
            <ha-icon icon="mdi:eye-outline"></ha-icon>
            <span>${labels.visibility}</span>
          </div>
          <crm-editor-form
            .schema=${visibilitySchema}
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
      .studio-header { display: grid; gap: 10px; min-width: 0; }
      .studio-description {
        margin: 0 0 3px;
        color: var(--secondary-text-color);
        font-size: 12px;
        line-height: 1.5;
      }
      .studio-panel {
        min-width: 0;
        padding: 14px;
        border: 1px solid var(--divider-color, rgba(128,128,128,.2));
        border-radius: 12px;
        background: var(--card-background-color, var(--ha-card-background, transparent));
      }
      .studio-panel-heading {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 12px;
        color: var(--primary-text-color);
        font-size: 13px;
        font-weight: 650;
      }
      .studio-panel-heading ha-icon {
        color: var(--secondary-text-color);
        --mdc-icon-size: 18px;
      }
      .studio-hint {
        margin: -3px 0 10px;
        color: var(--secondary-text-color);
        font-size: 11px;
        line-height: 1.45;
      }
      crm-editor-form { display: block; min-width: 0; }
      @media (max-width: 340px) {
        .studio-panel { padding: 10px; }
      }
    `;
  }
}

customElements.define('crm-player-header-editor', PlayerHeaderSettingsEditor);
