import { css, html, TemplateResult } from 'lit';

import { PLAYER_CONTROLS_ICON_SIZE_DEFAULT } from '../constants';
import { BaseEditor } from './base-editor';
import { Section } from '../types/section';
import { translate } from '../localization/i18n';

class PlayerControlsSettingsEditor extends BaseEditor {
  protected render(): TemplateResult {
    super.createStore();

    const t = (key: string): string =>
      translate(
        `editor.playerControlsSettings.${key}`,
        this.config.language ?? 'auto',
        this.hass.language,
      );

    const language = this.config.language && this.config.language !== 'auto'
      ? this.config.language
      : this.hass.language || 'en';
    const isPt = language.toLowerCase().startsWith('pt');
    const isDe = language.toLowerCase().startsWith('de');

    const heading = (pt: string, de: string, en: string): string =>
      isPt ? pt : isDe ? de : en;

    const sizeSchema = [
      {
        name: 'playerControlsIconSize',
        label: t('iconSize'),
        help: `${t('iconSizeHelp')} "${PLAYER_CONTROLS_ICON_SIZE_DEFAULT}"`,
        required: false,
        type: 'string',
        default: PLAYER_CONTROLS_ICON_SIZE_DEFAULT,
      },
    ];

    const buttonsSchema = [
      {
        name: 'playerControlsHideFavorites',
        label: t('hideFavorites'),
        required: false,
        selector: { boolean: {} },
      },
      {
        name: 'playerControlsHideShuffle',
        label: t('hideShuffle'),
        required: false,
        selector: { boolean: {} },
      },
      {
        name: 'playerControlsHideTrackPrev',
        label: t('hidePrevious'),
        required: false,
        selector: { boolean: {} },
      },
      {
        name: 'playerControlsHidePlayPause',
        label: t('hidePlayPause'),
        required: false,
        selector: { boolean: {} },
      },
      {
        name: 'playerControlsHideTrackNext',
        label: t('hideNext'),
        required: false,
        selector: { boolean: {} },
      },
      {
        name: 'playerControlsHideRepeat',
        label: t('hideRepeat'),
        required: false,
        selector: { boolean: {} },
      },
      {
        name: 'playerControlsHidePlayQueue',
        label: t('hideQueue'),
        required: false,
        selector: { boolean: {} },
      },
    ];

    const visibilitySchema = [
      {
        name: 'playerControlsHide',
        label: t('hideControls'),
        required: false,
        selector: { boolean: {} },
      },
    ];

    return html`
      <div class="studio-controls">
        <p class="studio-description">${t('description')}</p>

        <section class="studio-panel">
          <div class="studio-heading">
            <span class="studio-icon"><ha-icon icon="mdi:resize"></ha-icon></span>
            <div class="studio-heading-copy">
              <span class="studio-title">${heading('Tamanho dos ícones', 'Symbolgröße', 'Icon size')}</span>
              <span class="studio-hint">${heading('Ajuste a dimensão dos botões', 'Größe der Tasten anpassen', 'Adjust the button dimensions')}</span>
            </div>
          </div>
          <crm-editor-form
            .schema=${sizeSchema}
            .section=${Section.PLAYER}
            .store=${this.store}
            .config=${this.config}
            .hass=${this.hass}
          ></crm-editor-form>
        </section>

        <section class="studio-panel">
          <div class="studio-heading">
            <span class="studio-icon"><ha-icon icon="mdi:gesture-tap-button"></ha-icon></span>
            <div class="studio-heading-copy">
              <span class="studio-title">${heading('Botões do reprodutor', 'Wiedergabetasten', 'Player buttons')}</span>
              <span class="studio-hint">${heading('Escolha quais botões ocultar', 'Auszublendende Tasten auswählen', 'Choose which buttons to hide')}</span>
            </div>
          </div>
          <crm-editor-form
            .schema=${buttonsSchema}
            .section=${Section.PLAYER}
            .store=${this.store}
            .config=${this.config}
            .hass=${this.hass}
          ></crm-editor-form>
        </section>

        <section class="studio-panel">
          <div class="studio-heading">
            <span class="studio-icon"><ha-icon icon="mdi:eye-off-outline"></ha-icon></span>
            <div class="studio-heading-copy">
              <span class="studio-title">${heading('Visibilidade geral', 'Allgemeine Sichtbarkeit', 'General visibility')}</span>
              <span class="studio-hint">${heading('Ocultar todos os controles', 'Alle Bedienelemente ausblenden', 'Hide all playback controls')}</span>
            </div>
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
      .studio-controls { display: grid; gap: 11px; min-width: 0; }
      .studio-description {
        margin: 0 2px 2px;
        font-size: 12px;
        line-height: 1.5;
        color: var(--secondary-text-color);
      }
      .studio-panel {
        min-width: 0;
        padding: 14px;
        border: 1px solid var(--divider-color, rgba(128,128,128,.2));
        border-radius: 12px;
        background: var(--card-background-color, var(--ha-card-background, transparent));
      }
      .studio-heading {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 12px;
      }
      .studio-icon {
        display: flex;
        flex: 0 0 34px;
        align-items: center;
        justify-content: center;
        height: 34px;
        border-radius: 9px;
        color: var(--primary-color);
        background: var(--secondary-background-color, rgba(128,128,128,.12));
      }
      .studio-icon ha-icon { --mdc-icon-size: 18px; }
      .studio-heading-copy { display: grid; gap: 3px; min-width: 0; }
      .studio-title { font-size: 13px; font-weight: 600; color: var(--primary-text-color); }
      .studio-hint { font-size: 11px; line-height: 1.4; color: var(--secondary-text-color); }
      crm-editor-form { display: block; min-width: 0; }
    `;
  }
}

customElements.define('crm-player-controls-editor', PlayerControlsSettingsEditor);
