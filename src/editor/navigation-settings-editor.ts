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

  private getOrderedSections(options: Array<{ value: Section }>): Section[] {
    const known = new Set(options.map(option => option.value));
    const current = Array.isArray(this.config.sections) ? this.config.sections : [];
    return [...new Set(current.filter(section => known.has(section)))];
  }

  private updateVisibleSection(section: Section, checked: boolean): void {
    const current = this.getOrderedSections(this.getOptions());
    const next = checked
      ? [...current.filter(item => item !== section), section]
      : current.filter(item => item !== section);
    if (!next.length) return;
    const currentDefault = this.config.sectionDefault;
    const nextDefault = currentDefault && next.includes(currentDefault)
      ? currentDefault
      : next[0];
    this.configChanged({ ...this.config, sections: next, sectionDefault: nextDefault });
  }

  private moveSection(section: Section, direction: -1 | 1): void {
    const current = this.getOrderedSections(this.getOptions());
    const index = current.indexOf(section);
    const target = index + direction;
    if (index < 0 || target < 0 || target >= current.length) return;
    const next = [...current];
    [next[index], next[target]] = [next[target], next[index]];
    this.configChanged({ ...this.config, sections: next });
  }

  protected render(): TemplateResult {
    const language = this.config.language || 'auto';
    const currentLanguage = language === 'auto'
      ? this.hass?.locale?.language || this.hass?.language || 'en'
      : language;
    const pt = currentLanguage.toLowerCase().startsWith('pt');
    const de = currentLanguage.toLowerCase().startsWith('de');
    const label = (p: string, d: string, e: string): string => pt ? p : de ? d : e;

    const options = this.getOptions();
    const selected = this.getOrderedSections(options);
    const orderedOptions = selected
      .map(section => options.find(option => option.value === section))
      .filter((option): option is { value: Section; label: string } => option !== undefined);
    const disabledOptions = options.filter(option => !selected.includes(option.value));
    const effectiveDefault = this.config.sectionDefault && selected.includes(this.config.sectionDefault)
      ? this.config.sectionDefault
      : selected[0] || Section.PLAYER;

    const title = label('Organização do cartão', 'Kartenorganisation', 'Card organization');
    const hint = label('Escolha a ordem, a visibilidade e a seção inicial.', 'Reihenfolge, Sichtbarkeit und Startbereich festlegen.', 'Choose section order, visibility and the starting section.');
    const enabledTitle = label('Seções ativas · ordem de exibição', 'Aktive Bereiche · Anzeigereihenfolge', 'Enabled sections · display order');
    const disabledTitle = label('Seções desativadas', 'Deaktivierte Bereiche', 'Disabled sections');
    const activeLabel = label('ativas', 'aktiv', 'active');
    const moveUp = label('Mover para cima', 'Nach oben verschieben', 'Move up');
    const moveDown = label('Mover para baixo', 'Nach unten verschieben', 'Move down');
    const disable = label('Desativar seção', 'Bereich deaktivieren', 'Disable section');
    const enable = label('Ativar seção', 'Bereich aktivieren', 'Enable section');
    const initial = label('Seção inicial', 'Startbereich', 'Default section');
    const initialHint = label('A seção que será aberta primeiro.', 'Der Bereich, der zuerst geöffnet wird.', 'The section that opens first.');
    const minimumHint = label('Mantenha pelo menos uma seção ativa. Use as setas para definir a ordem.', 'Mindestens ein Bereich muss aktiv bleiben. Mit den Pfeilen die Reihenfolge ändern.', 'Keep at least one section enabled. Use the arrows to change the order.');
    const emptyHint = label('Todas as seções estão ativas.', 'Alle Bereiche sind aktiv.', 'All sections are enabled.');

    return html`
      <div class="panel">
        <div class="heading">
          <span class="heading-icon"><ha-icon icon="mdi:view-dashboard-outline"></ha-icon></span>
          <div class="heading-copy"><strong>${title}</strong><small>${hint}</small></div>
        </div>

        <div class="field-heading">
          <span class="field-title">${enabledTitle}</span>
          <span class="section-count">${selected.length} ${activeLabel}</span>
        </div>
        <div class="section-list">
          ${orderedOptions.map((option, index) => html`
            <div class="section-row" aria-label=${option.label}>
              <span class="position">${String(index + 1).padStart(2, '0')}</span>
              <span class="section-name">${option.label}</span>
              ${effectiveDefault === option.value ? html`
                <ha-icon class="home-indicator" icon="mdi:home-outline" title=${initial}></ha-icon>
              ` : ''}
              <span class="row-actions">
                <button type="button" class="icon-button" title=${moveUp} aria-label=${`${moveUp}: ${option.label}`}
                  ?disabled=${index === 0} @click=${() => this.moveSection(option.value, -1)}>
                  <ha-icon icon="mdi:chevron-up"></ha-icon>
                </button>
                <button type="button" class="icon-button" title=${moveDown} aria-label=${`${moveDown}: ${option.label}`}
                  ?disabled=${index === orderedOptions.length - 1} @click=${() => this.moveSection(option.value, 1)}>
                  <ha-icon icon="mdi:chevron-down"></ha-icon>
                </button>
                <button type="button" class="icon-button remove" title=${disable} aria-label=${`${disable}: ${option.label}`}
                  ?disabled=${selected.length === 1} @click=${() => this.updateVisibleSection(option.value, false)}>
                  <ha-icon icon="mdi:eye-off-outline"></ha-icon>
                </button>
              </span>
            </div>
          `)}
        </div>
        <p class="minimum-hint"><ha-icon icon="mdi:information-outline"></ha-icon>${minimumHint}</p>

        <div class="divider"></div>
        <div class="field-heading"><span class="field-title">${disabledTitle}</span></div>
        ${disabledOptions.length ? html`
          <div class="disabled-grid">
            ${disabledOptions.map(option => html`
              <button type="button" class="enable-button" title=${enable}
                aria-label=${`${enable}: ${option.label}`}
                @click=${() => this.updateVisibleSection(option.value, true)}>
                <ha-icon icon="mdi:plus-circle-outline"></ha-icon><span>${option.label}</span>
              </button>
            `)}
          </div>
        ` : html`<p class="empty-hint">${emptyHint}</p>`}

        <div class="divider"></div>
        <label class="field">
          <span class="field-title">${initial}</span>
          <span class="field-hint">${initialHint}</span>
          <span class="select-wrap">
            <ha-icon icon="mdi:home-outline"></ha-icon>
            <select .value=${String(effectiveDefault)}
              @change=${(event: Event) => {
                const value = (event.currentTarget as HTMLSelectElement).value as Section;
                if (selected.includes(value)) this.configChanged({ ...this.config, sectionDefault: value });
              }}>
              ${orderedOptions.map(option => html`<option value=${option.value}>${option.label}</option>`)}
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
      .panel { padding: 16px; border: 1px solid var(--divider-color, rgba(128,128,128,.2)); border-radius: 14px; background: var(--card-background-color, var(--ha-card-background, transparent)); }
      .heading { display: flex; align-items: center; gap: 11px; margin-bottom: 20px; }
      .heading-icon { display: grid; place-items: center; flex: 0 0 36px; height: 36px; border-radius: 10px; background: color-mix(in srgb, var(--crm-editor-accent, var(--primary-color, #34d399)) 12%, transparent); color: var(--crm-editor-accent, var(--primary-color, #34d399)); }
      .heading-icon ha-icon { --mdc-icon-size: 20px; }
      .heading-copy { display: grid; gap: 4px; min-width: 0; }
      .heading-copy strong { font-size: 14px; color: var(--primary-text-color); }
      .heading-copy small { color: var(--secondary-text-color); font-size: 11px; line-height: 1.4; }
      .field-heading { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 10px; }
      .field-title { font-size: 12px; font-weight: 650; color: var(--primary-text-color); }
      .section-count { padding: 4px 8px; border-radius: 999px; background: var(--secondary-background-color, rgba(128,128,128,.12)); color: var(--secondary-text-color); font-size: 10px; white-space: nowrap; }
      .section-list { display: grid; gap: 8px; }
      .section-row { display: flex; align-items: center; gap: 9px; min-width: 0; min-height: 52px; padding: 7px 9px; border: 1px solid var(--divider-color, rgba(128,128,128,.2)); border-radius: 11px; background: var(--secondary-background-color, rgba(128,128,128,.06)); }
      .position { flex: 0 0 24px; font-size: 11px; font-weight: 750; font-variant-numeric: tabular-nums; color: var(--crm-editor-accent, var(--primary-color, #34d399)); }
      .section-name { flex: 1; min-width: 0; overflow-wrap: anywhere; font-size: 12px; font-weight: 550; color: var(--primary-text-color); }
      .home-indicator { flex: 0 0 auto; color: var(--crm-editor-accent, var(--primary-color, #34d399)); --mdc-icon-size: 17px; }
      .row-actions { display: flex; align-items: center; gap: 3px; flex-shrink: 0; }
      .icon-button { display: grid; place-items: center; width: 29px; height: 31px; padding: 0; border: 1px solid transparent; border-radius: 8px; background: transparent; color: var(--primary-text-color); cursor: pointer; }
      .icon-button ha-icon { --mdc-icon-size: 19px; }
      .icon-button:hover:not(:disabled) { color: var(--crm-editor-accent, var(--primary-color, #34d399)); background: color-mix(in srgb, var(--crm-editor-accent, var(--primary-color, #34d399)) 12%, transparent); }
      .icon-button:disabled { opacity: .28; cursor: default; }
      .icon-button:focus-visible, .enable-button:focus-visible, select:focus-visible { outline: 2px solid var(--crm-editor-accent, var(--primary-color, #34d399)); outline-offset: 2px; }
      .remove:hover:not(:disabled) { color: var(--error-color, #dc6464); background: color-mix(in srgb, var(--error-color, #dc6464) 10%, transparent); }
      .minimum-hint { display: flex; align-items: flex-start; gap: 7px; margin: 12px 0 16px; color: var(--secondary-text-color); font-size: 11px; line-height: 1.5; }
      .minimum-hint ha-icon { --mdc-icon-size: 16px; flex-shrink: 0; }
      .divider { height: 1px; background: var(--divider-color, rgba(128,128,128,.2)); margin: 17px 0; }
      .disabled-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; }
      .enable-button { display: flex; align-items: center; gap: 8px; min-width: 0; min-height: 40px; padding: 9px; border: 1px dashed var(--divider-color, rgba(128,128,128,.3)); border-radius: 9px; background: transparent; color: var(--secondary-text-color); font: inherit; font-size: 11px; text-align: left; cursor: pointer; }
      .enable-button span { min-width: 0; overflow-wrap: anywhere; }
      .enable-button ha-icon { --mdc-icon-size: 18px; flex-shrink: 0; color: var(--crm-editor-accent, var(--primary-color, #34d399)); }
      .enable-button:hover { border-color: var(--crm-editor-accent, var(--primary-color, #34d399)); color: var(--primary-text-color); }
      .empty-hint { margin: 0; font-size: 11px; color: var(--secondary-text-color); }
      .field { display: flex; flex-direction: column; gap: 7px; }
      .field-hint { font-size: 11px; line-height: 1.4; color: var(--secondary-text-color); }
      .select-wrap { position: relative; display: flex; align-items: center; }
      .select-wrap > ha-icon { position: absolute; left: 11px; pointer-events: none; --mdc-icon-size: 18px; color: var(--crm-editor-accent, var(--primary-color, #34d399)); }
      select { width: 100%; height: 42px; padding: 0 12px 0 39px; border: 1px solid var(--divider-color, rgba(128,128,128,.2)); border-radius: 10px; background: var(--secondary-background-color, rgba(128,128,128,.08)); color: var(--primary-text-color); font: inherit; font-size: 12px; }
      @media (max-width: 340px) { .panel { padding: 11px; } .disabled-grid { grid-template-columns: 1fr; } .section-row { gap: 5px; padding: 6px; } .icon-button { width: 25px; } }
    `;
  }
}

customElements.define('crm-navigation-settings-editor', NavigationSettingsEditor);
