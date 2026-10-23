// debug logging.
import Debug from 'debug/src/browser.js';
import { DEBUG_APP_NAME } from '../constants';
const debuglog = Debug(DEBUG_APP_NAME + ":device-browser");

// lovelace card imports.
import { css, html, PropertyValues, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { mdiCogOutline, mdiSpeaker, mdiCellphone, mdiTelevision } from '@mdi/js';

// our imports.
import '../components/media-browser-list';
import '../components/media-browser-icons';
import '../components/device-actions';
import { FavBrowserBase } from './fav-browser-base';
import { Section } from '../types/section';
import { MediaPlayer } from '../model/media-player';
import { formatTitleInfo } from '../utils/media-browser-utils';
import { getHomeAssistantErrorMessage, getUtcNowTimestamp } from '../utils/utils';
import { ISpotifyConnectDevice } from '../types/spotifyplus/spotify-connect-device';
import { resolveLanguage } from '../localization/i18n';
import {
  EDITOR_DEFAULT_BROWSER_ITEMS_PER_ROW,
} from '../constants';


type DeviceTextKey = 'defaultDevice' | 'setDefault' | 'defaultSaved' | 'defaultError' | 'noDevices' | 'filter' | 'settingsTitle' | 'settingsHint' | 'done' | 'selectDevices' | 'saveError' | 'transferring' | 'selectError' | 'fetchError' | 'refreshError' | 'multiroom' | 'active';

const deviceTexts: Record<'de' | 'pt' | 'en', Record<DeviceTextKey, string>> = {
  de: {
    defaultDevice: 'Standard',
    setDefault: 'Als Standard festlegen',
    defaultSaved: 'Standardgerät gespeichert.',
    defaultError: 'Standardgerät konnte nicht gespeichert werden.',
    noDevices: 'Keine Spotify-Connect-Geräte gefunden. Bitte Liste aktualisieren.',
    filter: 'Nach Gerätename filtern',
    settingsTitle: 'Sichtbare Geräte auswählen',
    settingsHint: 'Spotify Connect-Geräte können die Wiedergabe übernehmen. Andere Home Assistant-Mediaplayer öffnen ihre eigene Steuerung.',
    done: 'Fertig',
    selectDevices: 'Geräte auswählen',
    saveError: 'Geräteeinstellungen konnten in diesem Browser nicht gespeichert werden.',
    transferring: 'Wiedergabe wird auf Gerät übertragen',
    selectError: 'Wiedergabegerät konnte nicht ausgewählt werden.',
    fetchError: 'Spotify Connect-Geräte konnten nicht geladen werden:',
    refreshError: 'Spotify Connect-Geräte konnten nicht aktualisiert werden:',
    multiroom: 'Multiroom-Gruppe',
    active: 'Aktiv',
  },
  pt: {
    defaultDevice: 'Padrão',
    setDefault: 'Definir como padrão',
    defaultSaved: 'Dispositivo padrão salvo.',
    defaultError: 'Não foi possível salvar o dispositivo padrão.',
    noDevices: 'Nenhum dispositivo Spotify Connect encontrado. Atualize a lista.',
    filter: 'Filtrar por nome do dispositivo',
    settingsTitle: 'Selecionar dispositivos visíveis',
    settingsHint: 'Dispositivos Spotify Connect podem receber a reprodução. Outros reprodutores de mídia do Home Assistant abrem seus próprios controles.',
    done: 'Concluído',
    selectDevices: 'Selecionar dispositivos',
    saveError: 'Não foi possível salvar as preferências dos dispositivos neste navegador.',
    transferring: 'Transferindo a reprodução para o dispositivo',
    selectError: 'Não foi possível selecionar o dispositivo.',
    fetchError: 'Falha ao carregar dispositivos Spotify Connect:',
    refreshError: 'Falha ao atualizar dispositivos Spotify Connect:',
    multiroom: 'Grupo multiroom',
    active: 'Ativo',
  },
  en: {
    defaultDevice: 'Default',
    setDefault: 'Set as default',
    defaultSaved: 'Default device saved.',
    defaultError: 'Could not save the default device.',
    noDevices: 'No Spotify Connect devices found. Refresh the list.',
    filter: 'Filter by device name',
    settingsTitle: 'Select visible devices',
    settingsHint: 'Spotify Connect devices can take over playback. Other Home Assistant media players open their own controls.',
    done: 'Done',
    selectDevices: 'Select devices',
    saveError: 'Could not save device preferences in this browser.',
    transferring: 'Transferring playback to device',
    selectError: 'Could not select source.',
    fetchError: 'Get Spotify Connect Devices failed:',
    refreshError: 'Spotify Connect Device refresh failed:',
    multiroom: 'Multiroom group',
    active: 'Active',
  },
};

@customElement("crm-device-browser")
export class DeviceBrowser extends FavBrowserBase {

  /** Array of items to display in the media list. */
  protected override mediaList!: Array<ISpotifyConnectDevice> | undefined;

  /** True to refresh device list from real-time data; False to refresh from internal cache. */
  private refreshDeviceList?: boolean;

  private friendlyState(state: string): string {
    const language = resolveLanguage(
      this.config?.language ?? 'auto',
      this.store?.hass?.locale?.language || this.store?.hass?.language
    );

    const labels: Record<string, Record<'de' | 'pt' | 'en', string>> = {
      idle: { de: 'Bereit', pt: 'Disponível', en: 'Ready' },
      playing: { de: 'Wiedergabe läuft', pt: 'Reproduzindo', en: 'Playing' },
      paused: { de: 'Pausiert', pt: 'Pausado', en: 'Paused' },
      off: { de: 'Ausgeschaltet', pt: 'Desligado', en: 'Off' },
      standby: { de: 'Bereitschaft', pt: 'Em espera', en: 'Standby' },
      unavailable: { de: 'Nicht verfügbar', pt: 'Indisponível', en: 'Unavailable' },
      unknown: { de: 'Unbekannt', pt: 'Desconhecido', en: 'Unknown' },
      on: { de: 'Eingeschaltet', pt: 'Ligado', en: 'On' }
    };

    return labels[state]?.[language] || state;
  }

  private deviceText(key: DeviceTextKey): string {
    const language = resolveLanguage(this.config?.language ?? 'auto', this.store?.hass?.locale?.language || this.store?.hass?.language);
    return deviceTexts[language][key];
  }

  @state() private showDeviceSettings = false;
  @state() private deviceVisibility: Record<string, boolean> = {};
  private preferencesLoaded = false;
  @state() private savingDefault = false;
  @state() private savedDefaultValue = '';
  @state() private selectedDeviceValue = '';

  private get defaultDeviceValue(): string {
    const state = this.store.hass?.states?.['input_text.controlroom_default_spotify_device']?.state;
    if (state && state !== 'unknown' && state !== 'unavailable') return state;
    return this.savedDefaultValue || this.config.deviceDefaultId || '';
  }

  private deviceValue(item: ISpotifyConnectDevice): string {
    return item.IsSonos || this.config.deviceControlByName
      ? (item.Name || item.Id || '')
      : (item.Id || item.Name || '');
  }

  private isDefaultDevice(item: ISpotifyConnectDevice): boolean {
    const value = this.defaultDeviceValue;
    return !!value && (value === item.Id || value === item.Name || value === this.deviceValue(item));
  }

  private async saveDefaultDevice(item: ISpotifyConnectDevice): Promise<void> {
    const value = this.deviceValue(item);
    if (!value || this.savingDefault) return;
    this.savingDefault = true;
    try {
      await this.store.hass.callService('input_text', 'set_value', {
        entity_id: 'input_text.controlroom_default_spotify_device',
        value,
      });
      this.savedDefaultValue = value;
      this.alertInfo = this.deviceText('defaultSaved');
    } catch (error) {
      this.alertErrorSet(this.deviceText('defaultError') + ' ' + getHomeAssistantErrorMessage(error));
    } finally {
      this.savingDefault = false;
    }
  }

  private uniqueDevices(items: ISpotifyConnectDevice[]): ISpotifyConnectDevice[] {
    const unique = new Map<string, ISpotifyConnectDevice>();
    for (const device of items) {
      const name = (device.Name || device.Id || '').trim().toLocaleLowerCase();
      if (!name) continue;
      const group = device.DeviceInfo?.GroupStatus?.toLowerCase() === 'group';
      const key = `${group ? 'group' : 'device'}:${name}`;
      const old = unique.get(key);
      if (!old || (this.isDefaultDevice(device) && !this.isDefaultDevice(old)) ||
          (!this.isDefaultDevice(old) && !old.IsActiveDevice && device.IsActiveDevice)) {
        unique.set(key, device);
      }
    }
    return [...unique.values()];
  }

  private isSelectedDevice(item: ISpotifyConnectDevice): boolean {
    const selected = this.selectedDeviceValue || this.player?.attributes?.sp_device_id || this.player?.attributes?.source || '';
    return !!selected && (selected === item.Id || selected === item.Name || selected === this.deviceValue(item));
  }

  private renderSpotifyDevices(items: ISpotifyConnectDevice[]) {
    if (!items.length) {
      return html`<div class="crm-empty-devices">${this.deviceText('noDevices')}</div>`;
    }

    return html`<div class="crm-spotify-devices">
      ${items.map(item => {
        const isDefault = this.isDefaultDevice(item);
        const isSelected = this.isSelectedDevice(item);
        const isGroup = item.DeviceInfo?.GroupStatus?.toLowerCase() === 'group';
        const name = item.Name || item.Id || '';

        return html`
          <div class="crm-spotify-device ${isSelected ? 'crm-spotify-device-selected' : ''}">
            <span class="crm-device-icon" aria-hidden="true">
              <ha-icon icon=${isGroup ? 'mdi:speaker-multiple' : 'mdi:speaker-wireless'}></ha-icon>
            </span>

            <button class="crm-spotify-select" type="button"
              aria-label=${`${this.deviceText('transferring')}: ${name}`}
              aria-pressed=${isSelected ? 'true' : 'false'}
              @click=${() => void this.SelectSource(item)}>
              <span class="crm-spotify-device-name">
                <strong>${name}</strong>
                <small>${isGroup ? this.deviceText('multiroom') : 'Spotify Connect'}${item.IsActiveDevice ? ` · ${this.deviceText('active')}` : ''}</small>
              </span>
              <span class="crm-device-radio ${isSelected ? 'crm-device-radio-checked' : ''}" aria-hidden="true">
                ${isSelected ? html`<ha-icon icon="mdi:check"></ha-icon>` : ''}
              </span>
            </button>

            <button class="crm-default-star ${isDefault ? 'crm-default-star-active' : ''}"
              type="button"
              ?disabled=${this.savingDefault || isDefault}
              title=${isDefault ? this.deviceText('defaultDevice') : this.deviceText('setDefault')}
              aria-label=${`${isDefault ? this.deviceText('defaultDevice') : this.deviceText('setDefault')}: ${name}`}
              aria-pressed=${isDefault ? 'true' : 'false'}
              @click=${() => void this.saveDefaultDevice(item)}>
              <ha-icon icon=${isDefault ? 'mdi:star' : 'mdi:star-outline'}></ha-icon>
            </button>
          </div>`;
      })}
    </div>`;
  }

  // Spotify Connect devices and HA media_player entities have different actions.
  private spotifyKey(item: ISpotifyConnectDevice): string {
    return `spotify:${item.Id || item.Name}`;
  }

  private haKey(entityId: string): string {
    return `ha:${entityId}`;
  }

  private get visibilityStorageKey(): string {
    const account = this.player?.attributes?.sp_user_id || 'default';
    return `controlroom_devices_visibility_${account}`;
  }

  private loadVisibility(): void {
    if (this.preferencesLoaded) return;
    this.preferencesLoaded = true;
    try {
      const stored = localStorage.getItem(this.visibilityStorageKey);
      this.deviceVisibility = stored ? JSON.parse(stored) : {};
    } catch {
      this.deviceVisibility = {};
    }
  }

  private isVisible(key: string, defaultValue: boolean): boolean {
    return this.deviceVisibility[key] ?? defaultValue;
  }

  private toggleVisibility(key: string, checked: boolean): void {
    this.deviceVisibility = { ...this.deviceVisibility, [key]: checked };
    try {
      localStorage.setItem(this.visibilityStorageKey, JSON.stringify(this.deviceVisibility));
    } catch {
      this.alertErrorSet(this.deviceText('saveError'));
    }
  }

  private getHaPlayers(): Array<{ id: string; name: string; state: string }> {
    const states = this.hass?.states || {};
    return Object.keys(states)
      .filter(id => id.startsWith('media_player.'))
      .map(id => ({
        id,
        name: String(states[id]?.attributes?.friendly_name || id),
        state: String(states[id]?.state || 'unknown'),
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  private showHaMoreInfo(entityId: string): void {
    this.dispatchEvent(new CustomEvent('hass-more-info', {
      bubbles: true,
      composed: true,
      detail: { entityId },
    }));
  }

  private renderHaPlayers(filterName: string) {
    return this.getHaPlayers()
      .filter(item => this.isVisible(this.haKey(item.id), false))
      .filter(item => item.name.toLocaleLowerCase().includes(filterName))
      .map(item => html`
        <button class="crm-ha-device" @click=${() => this.showHaMoreInfo(item.id)}>
          <ha-svg-icon .path=${item.id.includes('tv') ? mdiTelevision : item.id.includes('phone') || item.id.includes('iphone') || item.id.includes('handy') ? mdiCellphone : mdiSpeaker}></ha-svg-icon>
          <span class="crm-ha-device-text">
            <strong>${item.name}</strong>
            <small>Home Assistant · ${this.friendlyState(item.state)}</small>
          </span>
        </button>
      `);
  }

  private renderDeviceSettings() {
    return html`
      <div class="crm-device-settings">
        <div class="crm-settings-title">${this.deviceText('settingsTitle')}</div>
        <div class="crm-settings-hint">${this.deviceText('settingsHint')}</div>
        <div class="crm-settings-subtitle">Spotify Connect</div>
        ${(this.mediaList || []).map(item => html`
          <label class="crm-device-option">
            <input type="checkbox"
              .checked=${this.isVisible(this.spotifyKey(item), true)}
              @change=${(ev: Event) => this.toggleVisibility(this.spotifyKey(item), (ev.target as HTMLInputElement).checked)}>
            <span><strong>${item.Name}</strong><small>Spotify Connect</small></span>
          </label>
        `)}
        <div class="crm-settings-subtitle">Home Assistant · media_player</div>
        ${this.getHaPlayers().map(item => html`
          <label class="crm-device-option">
            <input type="checkbox"
              .checked=${this.isVisible(this.haKey(item.id), false)}
              @change=${(ev: Event) => this.toggleVisibility(this.haKey(item.id), (ev.target as HTMLInputElement).checked)}>
            <span><strong>${item.name}</strong><small>${this.friendlyState(item.state)}</small></span>
          </label>
        `)}
        <button class="crm-settings-done" @click=${() => this.showDeviceSettings = false}>${this.deviceText('done')}</button>
      </div>
    `;
  }

  static override get styles() {
    return [
      ...super.styles,
      css`
        /* Premium Compact: device rows only. No changes to card dimensions. */
        .crm-spotify-devices {
          display: grid;
          gap: 7px;
          padding: 8px 2px;
          min-width: 0;
        }
        .crm-spotify-device {
          display: flex;
          align-items: center;
          gap: 9px;
          min-width: 0;
          box-sizing: border-box;
          padding: 8px 9px;
          border: 1px solid rgba(115, 151, 131, .23);
          border-radius: 12px;
          background: rgba(25, 53, 40, .22);
          color: var(--crm-text, var(--primary-text-color));
          transition: background .15s ease, border-color .15s ease;
        }
        .crm-spotify-device-selected {
          border-color: var(--crm-accent, #34d399);
          background: rgba(52, 211, 153, .085);
        }
        .crm-device-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 0 0 34px;
          width: 34px;
          height: 34px;
          border-radius: 9px;
          background: rgba(52, 211, 153, .12);
          color: var(--crm-accent, #34d399);
        }
        .crm-device-icon ha-icon { --mdc-icon-size: 20px; }
        .crm-spotify-select {
          display: flex;
          align-items: center;
          gap: 8px;
          flex: 1 1 auto;
          min-width: 0;
          padding: 3px 0;
          border: 0;
          background: transparent;
          color: inherit;
          text-align: left;
          font: inherit;
          cursor: pointer;
        }
        .crm-spotify-device-name {
          display: grid;
          gap: 3px;
          flex: 1 1 auto;
          min-width: 0;
        }
        .crm-spotify-device-name strong {
          font-size: 12px;
          font-weight: 600;
          line-height: 1.25;
          overflow-wrap: anywhere;
        }
        .crm-spotify-device-name small {
          font-size: 10px;
          opacity: .7;
          line-height: 1.25;
        }
        .crm-device-radio {
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 0 0 19px;
          width: 19px;
          height: 19px;
          border: 1.7px solid rgba(190, 214, 200, .65);
          border-radius: 50%;
          box-sizing: border-box;
        }
        .crm-device-radio-checked {
          background: var(--crm-accent, #34d399);
          border-color: var(--crm-accent, #34d399);
          color: #102019;
        }
        .crm-device-radio ha-icon { --mdc-icon-size: 14px; }
        .crm-default-star {
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 0 0 30px;
          width: 30px;
          height: 30px;
          padding: 0;
          border: 0;
          border-radius: 8px;
          background: transparent;
          color: rgba(168, 192, 177, .72);
          cursor: pointer;
        }
        .crm-default-star ha-icon { --mdc-icon-size: 20px; }
        .crm-default-star:hover:not(:disabled) {
          background: rgba(52, 211, 153, .12);
          color: var(--crm-accent, #34d399);
        }
        .crm-default-star-active { color: var(--crm-accent, #34d399); }
        .crm-default-star:disabled { cursor: default; }
        .crm-default-star:disabled:not(.crm-default-star-active) { opacity: .5; }
        .crm-spotify-select:focus-visible,
        .crm-default-star:focus-visible {
          outline: 2px solid var(--crm-accent, #34d399);
          outline-offset: 2px;
        }
        .crm-empty-devices { padding:16px; opacity:.75; font-size:12px; }
        .crm-settings-button { display:flex; align-items:center; justify-content:center; flex:0 0 38px; width:38px; height:38px; border:0; background:transparent; color:var(--crm-accent, var(--primary-color, #34d399)); cursor:pointer; }
        .crm-settings-button ha-svg-icon { width:23px; height:23px; }
        .crm-device-settings { padding: 12px; color:var(--crm-text, var(--primary-text-color, #f0fdf4)); max-width:100%; box-sizing:border-box; overflow:auto; }
        .crm-settings-title { font-weight:700; margin-bottom:6px; }
        .crm-settings-hint { font-size:12px; color:var(--crm-text-secondary, var(--secondary-text-color, var(--crm-text, #f0fdf4))); opacity:.75; margin-bottom:14px; }
        .crm-settings-subtitle { color:var(--crm-accent, var(--primary-color, #34d399)); font-weight:600; margin:14px 0 8px; }
        .crm-device-option { display:flex; align-items:center; gap:12px; padding:9px 4px; cursor:pointer; border-bottom:1px solid color-mix(in srgb, currentColor 18%, transparent); min-width:0; }
        .crm-device-option input { accent-color:var(--crm-accent, var(--primary-color, #34d399)); width:18px; height:18px; flex-shrink:0; }
        .crm-device-option span { min-width:0; display:flex; flex-direction:column; gap:3px; }
        .crm-device-option strong { color:inherit; font-size:13px; font-weight:500; overflow-wrap:anywhere; }
        .crm-device-option small { font-size:11px; color:var(--crm-text-secondary, var(--secondary-text-color, var(--crm-text, #f0fdf4))); opacity:.75; overflow-wrap:anywhere; }
        .crm-settings-done { margin-top:16px; padding:10px 18px; border:0; border-radius:8px; background:var(--crm-accent, var(--primary-color, #34d399)); color:var(--crm-accent-contrast, #102019); font-weight:700; cursor:pointer; }
        .crm-ha-device { width:100%; display:flex; align-items:center; gap:20px; padding:10px 14px; background:transparent; color:var(--crm-text, var(--primary-text-color, #f0fdf4)); border:0; text-align:left; cursor:pointer; }
        .crm-ha-device ha-svg-icon { color:var(--crm-accent, var(--primary-color, #34d399)); width:22px; height:22px; flex-shrink:0; }
        .crm-ha-device-text { min-width:0; display:flex; flex-direction:column; gap:3px; }
        .crm-ha-device-text strong { color:inherit; font-size:14px; font-weight:500; }
        .crm-ha-device-text small { font-size:11px; color:var(--crm-text-secondary, var(--secondary-text-color, inherit)); }
      `
    ];
  }



  /**
   * Initializes a new instance of the class.
   */
  constructor() {

    // invoke base class method.
    super(Section.DEVICES);
    this.filterCriteriaPlaceholder = this.deviceText('filter');

  }


  /**
   * Invoked on each update to perform rendering tasks. 
   * This method may return any value renderable by lit-html's `ChildPart` (typically a `TemplateResult`). 
   * Setting properties inside this method will *not* trigger the element to update.
  */
  protected render(): TemplateResult | void {

    // Update the placeholder before FavBrowserBase builds the search field.
    this.filterCriteriaPlaceholder = this.deviceText('filter');

    // invoke base class method.
    super.render();

    // filter items (if actions are not visible).
    let filteredItems: Array<ISpotifyConnectDevice> | undefined;
    if (!this.isActionsVisible) {
      const filterName = (this.filterCriteria || "").toLocaleLowerCase();
      filteredItems = (this.mediaList || [])
        .filter(item => this.isVisible(this.spotifyKey(item), true))
        .filter(item => (item.Name || '').toLocaleLowerCase().includes(filterName));
      this.filterItemCount = filteredItems.length;
    }

    // format title and sub-title details.
    const title = formatTitleInfo(this.config.deviceBrowserTitle, this.config, this.player, this.mediaListLastUpdatedOn, this.mediaList, filteredItems);
    const subtitle = formatTitleInfo(this.config.deviceBrowserSubTitle, this.config, this.player, this.mediaListLastUpdatedOn, this.mediaList, filteredItems);

    // load default # of items per row to display.
    if (!this.favBrowserItemsPerRow) {
      this.favBrowserItemsPerRow = this.config.deviceBrowserItemsPerRow || EDITOR_DEFAULT_BROWSER_ITEMS_PER_ROW;
    }

    // render html.
    return html`
      <div class="media-browser-section" style=${this.styleMediaBrowser()}>
        ${title ? html`<div class="media-browser-section-title">${title}</div>` : html``}
        ${subtitle ? html`<div class="media-browser-section-subtitle">${subtitle}</div>` : html``}
        <div class="media-browser-controls">
          ${!(this.isActionsVisible || false) ? html`` : html`${this.btnHideActionsHtml}`}
          ${this.filterCriteriaHtml}${this.formatMediaListHtml}${this.refreshMediaListHtml}
          <button class="crm-settings-button" title=${this.deviceText('selectDevices')} aria-label=${this.deviceText('selectDevices')} @click=${() => this.showDeviceSettings = !this.showDeviceSettings}>
            <ha-svg-icon .path=${mdiCogOutline}></ha-svg-icon>
          </button>
        </div>
        <div id="mediaBrowserContentElement" class="media-browser-content">
          ${this.alertError ? html`<ha-alert alert-type="error" dismissable @alert-dismissed-clicked=${this.alertErrorClear}>${this.alertError}</ha-alert>` : ""}
          ${this.alertInfo ? html`<ha-alert alert-type="info" dismissable @alert-dismissed-clicked=${this.alertInfoClear}>${this.alertInfo}</ha-alert>` : ""}
          ${this.showDeviceSettings ? this.renderDeviceSettings() : html`
          ${(() => {
            // if actions are not visbile, then render the media list.
            if (!this.isActionsVisible) {
              return this.renderSpotifyDevices(filteredItems || []);
             } else {
               return html`<crm-device-actions class="media-browser-actions" .store=${this.store} .mediaItem=${this.mediaItem}></crm-device-actions>`;
            }
          })()}  
          ${!this.isActionsVisible ? this.renderHaPlayers((this.filterCriteria || '').toLocaleLowerCase()) : ''}
          `}
        </div>
      </div>
    `;
  }


  /**
   * Called when the element has rendered for the first time. Called once in the
   * lifetime of an element. Useful for one-time setup work that requires access to
   * the DOM.
   */
  protected firstUpdated(changedProperties: PropertyValues): void {

    // ensure we are NOT editing the card configuration!
    // this is because the `firstUpdated` method will fire every time the configuration changes!
    // if we already updated the media list, then don't do it again.
    if (!this.isCardInEditPreview) {

      // set auto-refresh media list flag prior to calling base-class method (always refresh devices).
      this.isMediaListRefreshedOnSectionEntry = true;
    }

    // invoke base class method.
    super.firstUpdated(changedProperties);
    this.loadVisibility();
  }


  protected override onFilterActionsClick(ev: MouseEvent) {

    // get action to perform.
    const action = (ev.currentTarget! as HTMLElement).getAttribute("action")!;

    if (action === "refresh") {

      // indicate we want a real-time list of devices.
      this.refreshDeviceList = true;

    }

    // invoke base class method.
    super.onFilterActionsClick(ev);

  }


  /**
   * Handles the `item-selected` event fired when a media browser item is clicked.
   * 
   * @param args Event arguments that contain the media item that was clicked on.
   */
  protected override onItemSelected(args: CustomEvent) {

    if (debuglog.enabled) {
      debuglog("onItemSelected - device item selected:\n%s",
        JSON.stringify(args.detail, null, 2),
      );
    }

    const mediaItem = args.detail;
    this.SelectSource(mediaItem);

  }


  /**
   * Calls the mediaplayer select_source service to select a source.
   * 
   * @param mediaItem The medialist item that was selected.
   */
  private async SelectSource(mediaItem: ISpotifyConnectDevice): Promise<void> {


    try {

      // show progress indicator.
      this.progressShow();

      // update status.
      this.alertInfo = this.deviceText('transferring') + ' "' + mediaItem.Name + '" ...';

      // transfer by device id by default; for Sonos, always use device name (restricted device).
      let deviceId = '';
      if (mediaItem.IsSonos) {
        deviceId = mediaItem.Name;
      } else if (this.config.deviceControlByName) {
        deviceId = mediaItem.Name || mediaItem.Id || '';
      } else {
        deviceId = mediaItem.Id || mediaItem.Name || '';
      }

      // select the source.
      await this.store.mediaControlService.select_source(this.player, deviceId);
      this.selectedDeviceValue = deviceId;

      // show player section.
      this.store.card.SetSection(Section.PLAYER);

    }
    catch (error) {

      // set error message and reset scroll position to zero so the message is displayed.
      this.alertErrorSet(this.deviceText('selectError') + ' ' + getHomeAssistantErrorMessage(error));
      if (this.mediaBrowserContentElement) this.mediaBrowserContentElement.scrollTop = 0;

    }
    finally {

      // hide progress indicator.
      this.progressHide();

    }

  }


  /**
   * Updates the mediaList display.
   */
  protected override updateMediaList(player: MediaPlayer): boolean {

    // invoke base class method; if it returns false, then we should not update the media list.
    if (!super.updateMediaList(player)) {
      return false;
    }

    try {

      // we use the `Promise.allSettled` approach here like we do with actions, so
      // that we can easily add promises if more data gathering is needed in the future.
      const promiseRequests = new Array<Promise<unknown>>();

      // create promise - get media list.
      const promiseUpdateMediaList = new Promise((resolve, reject) => {

        // set service parameters.
        const refresh = this.refreshDeviceList || false;  // refresh device list (defaults to cached list).
        const sortResult = true;  // true to sort returned items; otherwise, false

        // get source items to omit; show / hide based on config setting (hidden by default).
        let sourceListHide = player.attributes.sp_source_list_hide || [];
        if ((this.config.deviceBrowserItemsShowHiddenDevices && true) == true) {
          sourceListHide = [];
        }

        // call the service to retrieve the media list.
        this.spotifyPlusService.GetSpotifyConnectDevices(player, refresh, sortResult, sourceListHide)
          .then(result => {

            // load media list results.
            this.mediaList = this.uniqueDevices(result.Items || []);
            this.mediaListLastUpdatedOn = result.DateLastRefreshed || getUtcNowTimestamp();

            // call base class method, indicating media list update succeeded.
            super.updatedMediaListOk();

            // Ensure the device list is rendered after the async response.
            this.requestUpdate();

            // resolve the promise.
            resolve(true);

          })
          .catch(error => {

            // clear results, and reject the promise.
            this.mediaList = undefined;
            this.mediaListLastUpdatedOn = 0;

            // call base class method, indicating media list update failed.
            super.updatedMediaListError(this.deviceText('fetchError') + ' ' + getHomeAssistantErrorMessage(error));

            // reject the promise.
            reject(error);

          })
      });

      promiseRequests.push(promiseUpdateMediaList);

      // show visual progress indicator.
      this.progressShow();

      // execute all promises, and wait for all of them to settle.
      // we use `finally` logic so we can clear the progress indicator.
      // any exceptions raised should have already been handled in the 
      // individual promise definitions; nothing else to do at this point.
      Promise.allSettled(promiseRequests).finally(() => {

        // clear the progress indicator.
        this.progressHide();

      });

      return true;

    }
    catch (error) {

      // clear the progress indicator.
      this.progressHide();

      // set alert error message.
      super.updatedMediaListError(this.deviceText('refreshError') + ' ' + getHomeAssistantErrorMessage(error));
      return true;

    }
    finally {
    }
  }

}
