import { css, html, TemplateResult } from 'lit';
import { BaseEditor } from './base-editor';
import { Section } from '../types/section';
import { translate } from '../localization/i18n';

class NavigationSettingsEditor extends BaseEditor {
  private getOptions(): Array<{ value: Section; label: string }> {
    const language = this.config.language || 'auto';
    const t = (key: string) => translate(
      key,
      language,
      this.hass?.locale?.language || this.hass?.language,
    );

    return [
      { value: Section.PLAYER, label: t('editor.player') },
      { value: Section.ALBUM_FAVORITES, label: t('editor.generalSettings.albumFavorites') },
      { value: Section.ARTIST_FAVORITES, label: t('editor.generalSettings.artistFavorites') },
      { value: Section.AUDIOBOOK_FAVORITES, label: t('editor.generalSettings.audiobookFavorites') },
      { value: Section.CATEGORYS, label: t('editor.categorys') },
      { value: Section.DEVICES, label: t('editor.devices') },
      { value: Section.EPISODE_FAVORITES, label: t('editor.generalSettings.episodeFavorites') },
      { value: Section.PLAYLIST_FAVORITES, label: t('editor.generalSettings.playlistFavorites') },
      { value: Section.RECENTS, label: t('editor.recents') },
      { value: Section.SEARCH_MEDIA, label: t('editor.generalSettings.searchMedia') },
      { value: Section.SHOW_FAVORITES, label: t('editor.generalSettings.showFavorites') },
      { value: Section.TRACK_FAVORITES, label: t('editor.generalSettings.trackFavorites') },
      { value: Section.USERPRESETS, label: t('editor.generalSettings.userPresets') },
    ];
  }

  private updateVisibleSection(section: Section, checked: boolean): void {
    const current = Array.isArray(this.config.sections)
      ? this.config.sections
      : [];

    const next = checked
      ? [...new Set([...current, section])]
      : current.filter(item => item !== section);

    // Keep at least one section enabled.
    if (next.length === 0) return;

    const currentDefault = this.config.sectionDefault;
    const nextDefault = currentDefault && next.includes(currentDefault)
      ? currentDefault
      : next[0];

    this.configChanged({
      ...this.config,
      sections: next,
      sectionDefault: nextDefault,
    });
  }

  protected render(): TemplateResult {
    const language = this.config.language || 'auto';
    const currentLanguage = language === 'auto'
      ? this.hass?.locale?.language || this.hass?.language || 'en'
      : language;
    const pt = currentLanguage.toLowerCase().startsWith('pt');
    const de = currentLanguage.toLowerCase().startsWith('de');
    const label = (ptText: string, deText: string, enText: string) =>
      pt ? ptText : de ? deText : enText;

    const title = label('Organização do cartão', 'Kartenorganisation', 'Card organization');
    const visible = label('Seções visíveis', 'Sichtbare Bereiche', 'Visible sections');
    const initial = label('Seção inicial', 'Startbereich', 'Default section');
    const hint = label(
      'Escolha quais seções aparecem e qual será aberta primeiro.',
      'Wähle die sichtbaren Bereiche und den Startbereich.',
      'Choose visible sections and which one opens first.',
    );
    const minimumHint = label(
      'Pelo menos uma seção deve permanecer ativada.',
      'Mindestens ein Bereich muss aktiviert bleiben.',
      'At least one section must remain enabled.',
    );
    const initialHint = label(
      'Esta seção será exibida quando o cartão for aberto.',
      'Dieser Bereich wird beim Öffnen der Karte angezeigt.',
      'This section opens when the card is displayed.',
    );
    const activeLabel = label('ativas', 'aktiv', 'active');

    const options = this.getOptions();
    const selected = Array.isArray(this.config.sections)
      ? this.config.sections
      : [];
    const visibleOptions = options.filter(option => selected.includes(option.value));
    const configuredDefault = this.config.sectionDefault;
    const effectiveDefault = configuredDefault && selected.includes(configuredDefault)
      ? configuredDefault
      : selected[0] || Section.PLAYER;

    return html`
      <div class="panel">
        <div class="heading">
          <span class="heading-icon"><ha-icon icon="mdi:view-dashboard-outline"></ha-icon></span>
          <div class="heading-copy">
            <strong>${title}</strong>
            <small>${hint}</small>
          </div>
        </div>

        <div class="field-heading">
          <span class="field-title">${visible}</span>
          <span class="section-count">${selected.length} ${activeLabel}</span>
        </div>

        <div class="check-grid">
          ${options.map(option => {
            const checked = selected.includes(option.value);
            const isLast = checked && selected.length === 1;
            return html`
              <label class="check ${checked ? 'checked' : ''} ${isLast ? 'locked' : ''}">
                <input
                  type="checkbox"
                  .checked=${checked}
                  .disabled=${isLast}
                  @change=${(event: Event) => {
                    const input = event.currentTarget as HTMLInputElement;
                    this.updateVisibleSection(option.value, input.checked);
                  }}
                />
                <span>${option.label}</span>
                ${checked
                  ? html`<ha-icon class="check-icon" icon="mdi:check-circle"></ha-icon>`
                  : ''}
              </label>
            `;
          })}
        </div>

        <p class="minimum-hint">
          <ha-icon icon="mdi:information-outline"></ha-icon>
          ${minimumHint}
        </p>

        <div class="divider"></div>

        <label class="field">
          <span class="field-title">${initial}</span>
          <span class="field-hint">${initialHint}</span>
          <span class="select-wrap">
            <ha-icon icon="mdi:home-outline"></ha-icon>
            <select
              .value=${String(effectiveDefault)}
              @change=${(event: Event) => {
                const value = (event.currentTarget as HTMLSelectElement).value as Section;
                if (!selected.includes(value)) return;
                this.configChanged({ ...this.config, sectionDefault: value });
              }}
            >
              ${visibleOptions.map(option => html`
                <option value=${option.value}>${option.label}</option>
              `)}
            </select>
          </span>
        </label>
      </div>
    `;
  }

  static get styles() {
    return css`
      :host { display: block; min-width: 0; }
      * { box-sizing: border-box; }
      .panel {
        padding: 16px;
        border: 1px solid var(--divider-color, rgba(128,128,128,.2));
        border-radius: 14px;
        background: var(--card-background-color, var(--ha-card-background, transparent));
      }
      .heading { display: flex; align-items: center; gap: 11px; margin-bottom: 20px; }
      .heading-icon {
        display: grid; place-items: center; flex: 0 0 36px; height: 36px;
        border-radius: 10px; background: var(--secondary-background-color, rgba(128,128,128,.12));
        color: var(--primary-color, #34d399);
      }
      .heading-icon ha-icon { --mdc-icon-size: 20px; }
      .heading-copy { display: grid; gap: 4px; min-width: 0; }
      .heading-copy strong { font-size: 14px; color: var(--primary-text-color); }
      .heading-copy small { color: var(--secondary-text-color); font-size: 11px; line-height: 1.4; }
      .field-heading { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 10px; }
      .field-title { display: block; font-size: 12px; font-weight: 600; color: var(--primary-text-color); }
      .section-count {
        padding: 4px 8px; border-radius: 999px;
        background: var(--secondary-background-color, rgba(128,128,128,.12));
        color: var(--secondary-text-color); font-size: 10px; white-space: nowrap;
      }
      .check-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; }
      .check {
        display: flex; align-items: center; gap: 8px; min-width: 0;
        min-height: 43px; padding: 10px;
        border: 1px solid var(--divider-color, rgba(128,128,128,.18));
        border-radius: 10px;
        background: var(--secondary-background-color, rgba(128,128,128,.08));
        color: var(--primary-text-color); font-size: 12px;
        cursor: pointer; overflow-wrap: anywhere;
        transition: border-color .15s ease, background-color .15s ease;
      }
      .check:hover { background: var(--divider-color, rgba(128,128,128,.12)); }
      .check.checked { border-color: var(--primary-color, #34d399); }
      .check.locked { cursor: default; }
      .check:focus-within { outline: 2px solid var(--primary-color, #34d399); outline-offset: 2px; }
      .check input { flex-shrink: 0; accent-color: var(--primary-color, #34d399); }
      .check span { flex: 1; min-width: 0; }
      .check-icon { --mdc-icon-size: 16px; color: var(--primary-color, #34d399); flex-shrink: 0; }
      .minimum-hint {
        display: flex; align-items: center; gap: 6px;
        margin: 12px 0 16px; color: var(--secondary-text-color);
        font-size: 11px; line-height: 1.4;
      }
      .minimum-hint ha-icon { --mdc-icon-size: 16px; flex-shrink: 0; }
      .divider { height: 1px; background: var(--divider-color, rgba(128,128,128,.2)); margin-bottom: 16px; }
      .field { display: flex; flex-direction: column; gap: 7px; }
      .field-hint { font-size: 11px; line-height: 1.4; color: var(--secondary-text-color); }
      .select-wrap { position: relative; display: flex; align-items: center; }
      .select-wrap > ha-icon {
        position: absolute; left: 11px; pointer-events: none;
        --mdc-icon-size: 18px; color: var(--primary-color, #34d399);
      }
      select {
        width: 100%; height: 42px; padding: 0 12px 0 39px;
        border: 1px solid var(--divider-color, rgba(128,128,128,.2));
        border-radius: 10px; background: var(--secondary-background-color, rgba(128,128,128,.08));
        color: var(--primary-text-color); font: inherit; font-size: 12px;
      }
      select:focus-visible { outline: 2px solid var(--primary-color, #34d399); outline-offset: 2px; }
      @media (max-width: 340px) {
        .panel { padding: 11px; }
        .check-grid { grid-template-columns: 1fr; }
      }
    `;
  }
}

customElements.define('crm-navigation-settings-editor', NavigationSettingsEditor);
