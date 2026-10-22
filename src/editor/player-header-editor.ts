import { css, html, TemplateResult } from 'lit';

import { BaseEditor } from './base-editor';
import { Section } from '../types/section';
import { translate } from '../localization/i18n';

class PlayerHeaderSettingsEditor extends BaseEditor {
  private updateText(name: 'playerHeaderTitle' | 'playerHeaderNoMediaPlayingText', event: Event): void {
    const value = (event.currentTarget as HTMLInputElement).value;
    this.configChanged({ ...this.config, [name]: value });
  }

  protected render(): TemplateResult {
    super.createStore();

    const language = this.config.language ?? 'auto';
    const hassLanguage = this.hass.locale?.language || this.hass.language || 'en';
    const t = (key: string): string =>
      translate(`editor.playerHeaderSettings.${key}`, language, hassLanguage);
    const lang = (language === 'auto' ? hassLanguage : language).toLowerCase();
    const pt = lang.startsWith('pt');
    const de = lang.startsWith('de');

    const ui = {
      intro: pt ? 'Personalize apenas o essencial. O visual acompanha o tema do ControlRoom.'
        : de ? 'Passe nur das Wesentliche an. Das Design folgt dem ControlRoom-Theme.'
        : 'Customize only the essentials. The appearance follows your ControlRoom theme.',
      preview: pt ? 'Prévia do cabeçalho' : de ? 'Kopfbereich-Vorschau' : 'Header preview',
      playing: pt ? 'Reproduzindo agora' : de ? 'Wird gerade abgespielt' : 'Now playing',
      sampleTrack: pt ? 'Sua música favorita' : de ? 'Dein Lieblingssong' : 'Your favorite song',
      sampleArtist: pt ? 'Artista · Álbum' : de ? 'Künstler · Album' : 'Artist · Album',
      content: pt ? 'Personalização' : de ? 'Personalisierung' : 'Personalization',
      titleHint: pt ? 'Opcional — deixe vazio para usar o título automático.'
        : de ? 'Optional – leer lassen für den automatischen Titel.'
        : 'Optional — leave empty for the automatic title.',
      emptyHint: pt ? 'Mensagem mostrada quando não há música tocando.'
        : de ? 'Text, wenn keine Musik abgespielt wird.'
        : 'Message displayed when no music is playing.',
      visibility: pt ? 'Visibilidade' : de ? 'Sichtbarkeit' : 'Visibility',
      visibilityHint: pt ? 'Escolha quais elementos aparecem no reprodutor.'
        : de ? 'Wähle die sichtbaren Elemente des Players.'
        : 'Choose which elements appear in the player.',
      automatic: pt ? 'Automático' : de ? 'Automatisch' : 'Automatic',
    };

    const title = String(this.config.playerHeaderTitle ?? '');
    const noMediaText = String(this.config.playerHeaderNoMediaPlayingText ?? '');
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
        <p class="studio-description">${ui.intro}</p>

        <section class="studio-preview-panel" aria-label=${ui.preview}>
          <div class="preview-top">
            <span class="preview-eyebrow">${ui.preview}</span>
            <ha-icon icon="mdi:music-note"></ha-icon>
          </div>
          <div class="preview-content">
            <div class="preview-art"><ha-icon icon="mdi:music"></ha-icon></div>
            <div class="preview-details">
              <span class="preview-status">${ui.playing}</span>
              <strong>${title.trim() || ui.sampleTrack}</strong>
              <small>${ui.sampleArtist}</small>
            </div>
          </div>
          <div class="preview-progress"><span></span></div>
        </section>

        <section class="studio-panel">
          <div class="studio-panel-heading">
            <span class="heading-icon"><ha-icon icon="mdi:text-box-edit-outline"></ha-icon></span>
            <div class="heading-copy"><strong>${ui.content}</strong><small>${ui.titleHint}</small></div>
          </div>

          <label class="studio-field">
            <span class="studio-label">${t('title')}</span>
            <input
              class="studio-input"
              type="text"
              .value=${title}
              placeholder=${ui.automatic}
              @change=${(event: Event) => this.updateText('playerHeaderTitle', event)}
            />
          </label>
          <label class="studio-field">
            <span class="studio-label">${t('noMediaPlayingText')}</span>
            <input
              class="studio-input"
              type="text"
              .value=${noMediaText}
              placeholder=${ui.automatic}
              @change=${(event: Event) => this.updateText('playerHeaderNoMediaPlayingText', event)}
            />
            <span class="field-hint">${ui.emptyHint}</span>
          </label>
        </section>

        <section class="studio-panel">
          <div class="studio-panel-heading">
            <span class="heading-icon"><ha-icon icon="mdi:eye-outline"></ha-icon></span>
            <div class="heading-copy"><strong>${ui.visibility}</strong><small>${ui.visibilityHint}</small></div>
          </div>
          <div class="visibility-body">
            <crm-editor-form
              .schema=${visibilitySchema}
              .section=${Section.PLAYER}
              .store=${this.store}
              .config=${this.config}
              .hass=${this.hass}
            ></crm-editor-form>
          </div>
        </section>
      </div>
    `;
  }

  static get styles() {
    return css`
      :host { display: block; min-width: 0; }
      * { box-sizing: border-box; }
      .studio-header { display: grid; gap: 12px; min-width: 0; color: var(--primary-text-color); }
      .studio-description { margin: 0 2px 2px; font-size: 12px; line-height: 1.55; color: var(--secondary-text-color); }
      .studio-panel, .studio-preview-panel {
        min-width: 0; padding: 15px; border: 1px solid var(--divider-color, rgba(128,128,128,.22));
        border-radius: 15px; background: var(--card-background-color, var(--ha-card-background, transparent));
      }
      .studio-preview-panel {
        padding: 16px; overflow: hidden; position: relative;
        background: linear-gradient(135deg, var(--secondary-background-color, #1c2824), var(--card-background-color, #101b19));
      }
      .preview-top { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 18px; }
      .preview-eyebrow { font-size: 10px; letter-spacing: .09em; font-weight: 750; text-transform: uppercase; color: var(--secondary-text-color); }
      .preview-top ha-icon { --mdc-icon-size: 18px; color: var(--primary-color, #34d399); }
      .preview-content { display: flex; align-items: center; gap: 12px; min-width: 0; }
      .preview-art { display: grid; place-items: center; width: 54px; height: 54px; flex: 0 0 54px; border-radius: 12px; background: var(--primary-color, #34d399); color: var(--card-background-color, #101b19); }
      .preview-art ha-icon { --mdc-icon-size: 27px; }
      .preview-details { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
      .preview-status { color: var(--primary-color, #34d399); font-size: 10px; font-weight: 650; }
      .preview-details strong { font-size: 15px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .preview-details small { color: var(--secondary-text-color); font-size: 11px; }
      .preview-progress { height: 3px; margin-top: 20px; background: var(--divider-color, rgba(128,128,128,.25)); border-radius: 99px; overflow: hidden; }
      .preview-progress span { display: block; width: 42%; height: 100%; border-radius: inherit; background: var(--primary-color, #34d399); }
      .studio-panel-heading { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; }
      .heading-icon { display: grid; place-items: center; flex: 0 0 35px; width: 35px; height: 35px; border-radius: 10px; background: var(--secondary-background-color, rgba(128,128,128,.1)); color: var(--primary-color, #34d399); }
      .heading-icon ha-icon { --mdc-icon-size: 19px; }
      .heading-copy { display: flex; flex-direction: column; gap: 3px; min-width: 0; }
      .heading-copy strong { font-size: 13px; font-weight: 650; }
      .heading-copy small { font-size: 11px; line-height: 1.4; color: var(--secondary-text-color); }
      .studio-field { display: flex; flex-direction: column; gap: 7px; margin-bottom: 15px; }
      .studio-field:last-child { margin-bottom: 0; }
      .studio-label { font-size: 12px; font-weight: 600; }
      .studio-input { display: block; width: 100%; min-width: 0; height: 43px; padding: 0 12px; border: 1px solid var(--divider-color); border-radius: 10px; background: var(--secondary-background-color); color: var(--primary-text-color); font: inherit; font-size: 13px; transition: border-color .15s ease; }
      .studio-input:focus-visible { outline: 2px solid var(--primary-color, #34d399); outline-offset: 1px; }
      .studio-input::placeholder { color: var(--secondary-text-color); opacity: .8; }
      .field-hint { font-size: 11px; line-height: 1.45; color: var(--secondary-text-color); }
      .visibility-body { min-width: 0; }
      crm-editor-form { display: block; min-width: 0; }
      @media (max-width: 340px) { .studio-panel, .studio-preview-panel { padding: 11px; } }
    `;
  }
}

customElements.define('crm-player-header-editor', PlayerHeaderSettingsEditor);
