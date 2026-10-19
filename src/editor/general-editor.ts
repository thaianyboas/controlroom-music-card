
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

  protected render(): TemplateResult {
    super.createStore();

    const t = (key: string): string =>
      translate(
        key,
        this.config.language ?? 'auto',
        this.hass.language
      );

    const g = (key: string): string =>
      t(`editor.generalSettings.${key}`);

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

    const defaultSectionOptions = Object.entries(
      sectionOptions
    ).map(([value, label]) => [value, label]);

    const schema = [
      {
        name: 'language',
        label: `🌍 ${g('language')}`,
        help: g('languageHelp'),
        required: false,
        type: 'select',
        options: [
          ['auto', `🌍 ${g('automaticLanguage')}`],
          ['pt', '🇧🇷 Português (Brasil)'],
          ['de', '🇩🇪 Deutsch (Deutschland)'],
          ['en', '🇺🇸 English (United States)'],
        ],
      },
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
        selector: {
          boolean: {},
        },
      },
    ];

    return html`
      <div class="schema-title">
        ${g('description')} ${CARD_VERSION}
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
      .schema-title {
        margin: 0.4rem 0;
        text-align: left;
        font-size: 1rem;
        color: var(--secondary-text-color);
      }

      .crm-editor-form {
      }
    `;
  }
}

customElements.define('crm-general-editor', GeneralEditor);
