import { css, html, TemplateResult } from 'lit';

import {
  CARD_VERSION,
  DOMAIN_MEDIA_PLAYER,
  DOMAIN_SPOTIFYPLUS,
} from '../constants';

import { BaseEditor } from './base-editor';
import { translate } from '../localization/i18n';
import { Section } from '../types/section';

class GeneralEditor extends BaseEditor {

  private onLanguageChange(event: Event): void {
    const select = event.currentTarget as HTMLSelectElement;
    const language = select.value as 'auto' | 'pt' | 'de' | 'en';
    if (language === (this.config.language ?? 'auto')) return;
    this.configChanged({ ...this.config, language });
  }

  protected render(): TemplateResult {
    super.createStore();

    const t = (key: string): string =>
      translate(key, this.config.language ?? 'auto', this.hass.language);
    const g = (key: string): string => t(`editor.generalSettings.${key}`);

    const sectionOptions = {
      player: t('editor.player'),
      albumfavorites: g('albumFavorites'),
      artistfavorites: g('artistFavorites'),
      audiobookfavorites: g('audiobookFavorites'),
      categorys: t('editor.categorys'),
      devices: t('editor.devices'),
      episodefavorites: g('episodeFavorites'),
      playlistfavorites: g('playlistFavorites'),
      recents: t('editor.recents'),
      searchmedia: g('searchMedia'),
      showfavorites: g('showFavorites'),
      trackfavorites: g('trackFavorites'),
      userpresets: g('userPresets'),
    };

    const defaultSectionOptions = Object.entries(sectionOptions)
      .map(([value, label]) => [value, label]);

    // Language is rendered separately to avoid the large HA radio/select control.
    // All other fields retain their original config keys and schema types.
    const schema = [
      {
        name: 'sections',
        label: g('sections'),
        help: g('sectionsHelp'),
        required: false,
        type: 'multi_select',
        options: sectionOptions,
      },
      {
        name: 'entity',
        label: g('entity'),
        help: g('entityHelp'),
        required: true,
        selector: {
          entity: {
            multiple: false,
            filter: {
              domain: DOMAIN_MEDIA_PLAYER,
              integration: DOMAIN_SPOTIFYPLUS,
            },
          },
        },
      },
      {
        name: 'title',
        label: g('title'),
        help: g('titleHelp'),
        required: false,
        type: 'string',
      },
      {
        name: 'width',
        label: g('width'),
        help: g('widthHelp'),
        required: false,
        type: 'string',
        default: 35.15,
      },
      {
        name: 'height',
        label: g('height'),
        help: g('heightHelp'),
        required: false,
        type: 'string',
        default: 35.15,
      },
      {
        name: 'sectionDefault',
        label: g('sectionDefault'),
        required: false,
        type: 'select',
        options: defaultSectionOptions,
      },
      {
        name: 'touchSupportDisabled',
        label: g('touchSupportDisabled'),
        help: g('touchSupportDisabledHelp'),
        required: false,
        selector: { boolean: {} },
      },
    ];

    const language = this.config.language ?? 'auto';

    return html`
      <div class="studio-heading">
        <div class="studio-heading-title">${g('description')}</div>
        <span class="studio-version">v${CARD_VERSION}</span>
      </div>

      <div class="studio-language">
        <div class="studio-language-copy">
          <span class="studio-label">${g('language')}</span>
          <span class="studio-hint">${g('languageHelp')}</span>
        </div>
        <div class="studio-select-wrap">
          <select
            class="studio-select"
            aria-label=${g('language')}
            .value=${language}
            @change=${this.onLanguageChange}
          >
            <option value="auto" ?selected=${language === 'auto'}>🌐 ${t('editor.automaticLanguage')}</option>
            <option value="pt" ?selected=${language === 'pt'}>🇧🇷 Português</option>
            <option value="de" ?selected=${language === 'de'}>🇩🇪 Deutsch</option>
            <option value="en" ?selected=${language === 'en'}>🇺🇸 English</option>
          </select>
          <span class="studio-chevron" aria-hidden="true">⌄</span>
        </div>
      </div>

      <crm-editor-form
        class="crm-editor-form"
        .schema=${schema}
        .section=${Section.PLAYER}
        .store=${this.store}
        .config=${this.config}
        .hass=${this.hass}
      ></crm-editor-form>
    `;
  }

  static get styles() {
    return css`
      :host { display: block; min-width: 0; }
      .studio-heading {
        display: flex; align-items: center; justify-content: space-between;
        gap: 12px; margin: 4px 0 16px;
      }
      .studio-heading-title {
        color: var(--primary-text-color); font-size: 13px; font-weight: 600;
      }
      .studio-version {
        flex-shrink: 0; font-size: 11px; color: var(--secondary-text-color);
        background: var(--secondary-background-color, rgba(128,128,128,.1));
        border-radius: 999px; padding: 4px 8px;
      }
      .studio-language {
        display: flex; align-items: center; justify-content: space-between;
        gap: 12px; min-width: 0; padding: 12px 13px;
        margin-bottom: 14px;
        border: 1px solid var(--divider-color, rgba(128,128,128,.2));
        background: var(--card-background-color, var(--ha-card-background, transparent));
        border-radius: 12px;
      }
      .studio-language-copy { min-width: 0; flex: 1; display: flex; flex-direction: column; gap: 4px; }
      .studio-label { color: var(--primary-text-color); font-size: 13px; font-weight: 600; }
      .studio-hint { color: var(--secondary-text-color); font-size: 11px; line-height: 1.35; }
      .studio-select-wrap { position: relative; flex: 0 0 auto; max-width: 54%; }
      .studio-select {
        appearance: none; -webkit-appearance: none;
        width: 100%; min-width: 124px; max-width: 100%;
        padding: 9px 27px 9px 11px; border-radius: 9px;
        background: var(--secondary-background-color, rgba(128,128,128,.12));
        border: 1px solid var(--divider-color, rgba(128,128,128,.2));
        color: var(--primary-text-color); font: inherit; font-size: 12px;
        cursor: pointer; outline-offset: 2px;
      }
      .studio-select:focus-visible { outline: 2px solid var(--primary-color); }
      .studio-select option { background: var(--card-background-color, #1c1c26); color: var(--primary-text-color, white); }
      .studio-chevron { position: absolute; right: 10px; top: 50%; transform: translateY(-55%); pointer-events: none; color: var(--secondary-text-color); }
      .crm-editor-form { display: block; min-width: 0; }
      @media (max-width: 360px) {
        .studio-language { align-items: stretch; flex-direction: column; }
        .studio-select-wrap { max-width: 100%; }
        .studio-select { width: 100%; }
      }
    `;
  }
}

customElements.define('crm-general-editor', GeneralEditor);
