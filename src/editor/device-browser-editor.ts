import { css, html, nothing, TemplateResult } from 'lit';
import { state } from 'lit/decorators.js';

import { BaseEditor } from './base-editor';
import { Section } from '../types/section';
import { EDITOR_DEFAULT_BROWSER_ITEMS_PER_ROW } from '../constants';
import { translate } from '../localization/i18n';
import { ISpotifyConnectDevice } from '../types/spotifyplus/spotify-connect-device';

class SourceSettingsEditor extends BaseEditor {
  @state() private availableDevices: ISpotifyConnectDevice[] = [];
  @state() private devicesLoading = false;
  @state() private devicesLoaded = false;
  @state() private devicesError = '';

  private requestId = 0;
  private loadedEntityId = '';
  private loadedShowHiddenDevices?: boolean;

  protected override updated(
    changedProperties: Map<PropertyKey, unknown>,
  ): void {
    super.updated(changedProperties);

    const entityId = this.config?.entity || '';

    if (
      this.hass &&
      this.config &&
      entityId &&
      entityId !== this.loadedEntityId
    ) {
      this.loadedEntityId = entityId;
      this.loadedShowHiddenDevices = !!this.config.deviceBrowserItemsShowHiddenDevices;
      void this.loadDevices(false);
    } else if (
      this.hass &&
      this.config &&
      entityId &&
      this.loadedShowHiddenDevices !== !!this.config.deviceBrowserItemsShowHiddenDevices
    ) {
      this.loadedShowHiddenDevices = !!this.config.deviceBrowserItemsShowHiddenDevices;
      void this.loadDevices(false);
    }
  }

  private getLabels() {
    const language =
      this.config.language === 'auto' || !this.config.language
        ? this.hass.language
        : this.config.language;

    const pt = language?.toLowerCase().startsWith('pt');
    const de = language?.toLowerCase().startsWith('de');

    const label = (ptText: string, deText: string, enText: string) =>
      pt ? ptText : de ? deText : enText;

    return {
      layout: label('Organização', 'Anordnung', 'Layout'),
      layoutHint: label(
        'Defina o dispositivo padrão e a disposição',
        'Standardgerät und Anordnung festlegen',
        'Choose the default device and layout',
      ),
      behavior: label(
        'Visibilidade e comportamento',
        'Sichtbarkeit und Verhalten',
        'Visibility and behavior',
      ),
      behaviorHint: label(
        'Controle quais informações e dispositivos aparecem',
        'Sichtbare Informationen und Geräte festlegen',
        'Choose which information and devices appear',
      ),
      chooseDevice: label(
        'Escolher dispositivo padrão',
        'Standardgerät auswählen',
        'Choose default device',
      ),
      chooseDeviceHint: label(
        'Selecione um dispositivo Spotify Connect. A reprodução não será iniciada.',
        'Spotify-Connect-Gerät auswählen. Die Wiedergabe wird nicht gestartet.',
        'Select a Spotify Connect device. Playback will not start.',
      ),
      refresh: label('Atualizar lista', 'Liste aktualisieren', 'Refresh list'),
      loading: label(
        'Buscando dispositivos...',
        'Geräte werden geladen...',
        'Loading devices...',
      ),
      empty: label(
        'Nenhum dispositivo encontrado. Verifique o SpotifyPlus ou tente atualizar.',
        'Keine Geräte gefunden. SpotifyPlus prüfen oder Liste aktualisieren.',
        'No devices found. Check SpotifyPlus or refresh.',
      ),
      error: label(
        'Não foi possível carregar os dispositivos.',
        'Geräte konnten nicht geladen werden.',
        'Could not load devices.',
      ),
      selected: label('Selecionado', 'Ausgewählt', 'Selected'),
      active: label('Ativo', 'Aktiv', 'Active'),
      group: label('Grupo multiroom', 'Multiroom-Gruppe', 'Multiroom group'),
      device: label('Dispositivo', 'Gerät', 'Device'),
      manual: label(
        'ID ou nome manual',
        'ID oder Name manuell',
        'Manual ID or name',
      ),
      manualHint: label(
        'Alternativa para dispositivos que não aparecem na lista.',
        'Alternative für Geräte, die nicht in der Liste erscheinen.',
        'Alternative for devices missing from the list.',
      ),
      notInList: label(
        'O dispositivo configurado não aparece na lista atual.',
        'Das konfigurierte Gerät ist nicht in der aktuellen Liste.',
        'The configured device is not in the current list.',
      ),
      noDefault: label(
        'Nenhum dispositivo padrão definido',
        'Kein Standardgerät festgelegt',
        'No default device configured',
      ),
      byName: label(
        'O controle por nome está ativado. A seleção salvará o nome do dispositivo.',
        'Steuerung nach Namen ist aktiviert. Die Auswahl speichert den Gerätenamen.',
        'Control by name is enabled. Selection will save the device name.',
      ),
    };
  }

  private async loadDevices(refresh: boolean): Promise<void> {
    const requestId = ++this.requestId;

    this.devicesLoading = true;
    this.devicesError = '';

    try {
      this.createStore();

      const service = this.store.spotifyPlusService;
      const player = this.store.player;

      const hiddenSources = this.config.deviceBrowserItemsShowHiddenDevices
        ? []
        : player.attributes.sp_source_list_hide || [];

      const result = await service.GetSpotifyConnectDevices(
        player,
        refresh,
        true,
        hiddenSources,
      );

      if (requestId !== this.requestId) return;

      // Collapse repeated discovery entries with the same visible name and group
      // status. Prefer an active entry, without changing the SpotifyPlus service.
      const discovered = result?.Items || [];
      const unique = new Map<string, ISpotifyConnectDevice>();
      for (const device of discovered) {
        const name = (device.Name || device.Id || '').trim().toLocaleLowerCase();
        const group = device.DeviceInfo?.GroupStatus?.toLowerCase() === 'group';
        const key = `${group ? 'group' : 'device'}:${name}`;
        const existing = unique.get(key);
        const configured = this.config.deviceDefaultId || '';
        const matchesConfigured = device.Id === configured || device.Name === configured;
        const existingMatches = existing && (existing.Id === configured || existing.Name === configured);
        if (!existing || (matchesConfigured && !existingMatches) ||
            (!existingMatches && !existing.IsActiveDevice && device.IsActiveDevice)) {
          unique.set(key, device);
        }
      }
      this.availableDevices = Array.from(unique.values());
      this.devicesLoaded = true;
    } catch (error) {
      if (requestId !== this.requestId) return;

      this.availableDevices = [];
      this.devicesLoaded = true;
      this.devicesError =
        error instanceof Error ? error.message : String(error);
    } finally {
      if (requestId === this.requestId) {
        this.devicesLoading = false;
      }
    }
  }

  private getDeviceValue(device: ISpotifyConnectDevice): string {
    if (device.IsSonos || this.config.deviceControlByName) {
      return device.Name || device.Id || '';
    }

    return device.Id || device.Name || '';
  }

  private selectDevice(device: ISpotifyConnectDevice): void {
    const value = this.getDeviceValue(device);

    if (!value) return;

    this.configChanged({
      ...this.config,
      deviceDefaultId: value,
    });
  }

  private getDeviceIcon(device: ISpotifyConnectDevice): string {
    const groupStatus =
      device.DeviceInfo?.GroupStatus?.toLowerCase() || '';

    if (groupStatus === 'group') return 'mdi:speaker-multiple';
    if (device.IsChromeCast) return 'mdi:cast-audio';
    if (device.IsSonos) return 'mdi:speaker-wireless';

    return 'mdi:speaker';
  }

  private renderDeviceSelector(): TemplateResult {
    const labels = this.getLabels();
    const selectedId = this.config.deviceDefaultId || '';

    const selectedDevice = this.availableDevices.find(
      device =>
        device.Id === selectedId ||
        device.Name === selectedId ||
        this.getDeviceValue(device) === selectedId,
    );

    return html`
      <div class="device-selector">
        <div class="device-selector-heading">
          <div class="device-selector-copy">
            <strong>${labels.chooseDevice}</strong>
            <small>${labels.chooseDeviceHint}</small>
          </div>

          <button
            class="refresh-button"
            type="button"
            ?disabled=${this.devicesLoading}
            @click=${() => void this.loadDevices(true)}
          >
            <ha-icon icon="mdi:refresh"></ha-icon>
            <span>${labels.refresh}</span>
          </button>
        </div>

        ${this.config.deviceControlByName
          ? html`<p class="device-note">${labels.byName}</p>`
          : nothing}

        ${this.devicesLoading
          ? html`
              <div class="device-status">
                <ha-icon icon="mdi:loading"></ha-icon>
                ${labels.loading}
              </div>
            `
          : nothing}

        ${this.devicesError
          ? html`
              <div class="device-status device-error">
                <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
                <span>${labels.error} ${this.devicesError}</span>
              </div>
            `
          : nothing}

        ${!this.devicesLoading &&
        this.devicesLoaded &&
        !this.devicesError &&
        this.availableDevices.length === 0
          ? html`
              <div class="device-status">
                <ha-icon icon="mdi:speaker-off"></ha-icon>
                ${labels.empty}
              </div>
            `
          : nothing}

        ${this.availableDevices.length > 0
          ? html`
              <div class="device-grid">
                ${this.availableDevices.map(device => {
                  const value = this.getDeviceValue(device);
                  const selected =
                    !!selectedId &&
                    (selectedId === value ||
                      selectedId === device.Id ||
                      selectedId === device.Name);

                  const isGroup =
                    device.DeviceInfo?.GroupStatus?.toLowerCase() === 'group';

                  return html`
                    <button
                      class="device-option ${selected ? 'is-selected' : ''}"
                      type="button"
                      ?disabled=${!value}
                      aria-pressed=${selected ? 'true' : 'false'}
                      @click=${() => this.selectDevice(device)}
                    >
                      <span class="device-icon">
                        <ha-icon
                          icon=${this.getDeviceIcon(device)}
                        ></ha-icon>
                      </span>

                      <span class="device-copy">
                        <strong>${device.Name || device.Id}</strong>
                        <small>
                          ${isGroup ? labels.group : labels.device}
                          ${device.IsActiveDevice
                            ? html` · ${labels.active}`
                            : nothing}
                        </small>
                      </span>

                      <ha-icon
                        class="device-check"
                        icon=${selected
                          ? 'mdi:check-circle'
                          : 'mdi:circle-outline'}
                      ></ha-icon>
                    </button>
                  `;
                })}
              </div>
            `
          : nothing}

        <div class="device-selection-summary">
          <ha-icon
            icon=${selectedId
              ? 'mdi:check-circle-outline'
              : 'mdi:information-outline'}
          ></ha-icon>
          <span>
            ${selectedId
              ? html`
                  <strong>${labels.selected}:</strong>
                  ${selectedDevice?.Name || selectedId}
                `
              : labels.noDefault}
          </span>
        </div>

        ${selectedId &&
        this.devicesLoaded &&
        !this.devicesLoading &&
        !this.devicesError &&
        this.availableDevices.length > 0 &&
        !selectedDevice
          ? html`<p class="device-note">${labels.notInList}</p>`
          : nothing}
      </div>
    `;
  }

  protected render(): TemplateResult {
    super.createStore();

    const t = (key: string): string =>
      translate(
        `editor.deviceBrowserSettings.${key}`,
        this.config.language ?? 'auto',
        this.hass.language,
      );

    const labels = this.getLabels();

    const layoutSchema = [
      {
        name: 'deviceDefaultId',
        label: labels.manual,
        help: labels.manualHint,
        required: false,
        type: 'string',
      },
      {
        name: 'deviceBrowserItemsPerRow',
        label: t('itemsPerRow'),
        help: t('itemsPerRowHelp'),
        required: true,
        type: 'integer',
        default: EDITOR_DEFAULT_BROWSER_ITEMS_PER_ROW,
        valueMin: 1,
        valueMax: 12,
      },
    ];

    const behaviorSchema = [
      {
        name: 'deviceBrowserItemsHideTitle',
        label: t('hideTitle'),
        required: false,
        selector: { boolean: {} },
      },
      {
        name: 'deviceBrowserItemsHideSubTitle',
        label: t('hideSubtitle'),
        help: t('hideSubtitleHelp'),
        required: false,
        selector: { boolean: {} },
      },
      {
        name: 'deviceBrowserItemsShowHiddenDevices',
        label: t('showHiddenDevices'),
        required: false,
        selector: { boolean: {} },
      },
      {
        name: 'deviceControlByName',
        label: t('controlByName'),
        required: false,
        selector: { boolean: {} },
      },
    ];

    return html`
      <div class="studio-devices">
        <p class="studio-description">${t('description')}</p>

        <section class="studio-panel">
          <div class="studio-panel-heading">
            <span class="studio-icon">
              <ha-icon icon="mdi:speaker-multiple"></ha-icon>
            </span>
            <div class="studio-heading-copy">
              <strong>${labels.layout}</strong>
              <small>${labels.layoutHint}</small>
            </div>
          </div>

          ${this.renderDeviceSelector()}

          <div class="manual-settings">
            <crm-editor-form
              .schema=${layoutSchema}
              .section=${Section.DEVICES}
              .store=${this.store}
              .config=${this.config}
              .hass=${this.hass}
            ></crm-editor-form>
          </div>
        </section>

        <section class="studio-panel">
          <div class="studio-panel-heading">
            <span class="studio-icon">
              <ha-icon icon="mdi:eye-outline"></ha-icon>
            </span>
            <div class="studio-heading-copy">
              <strong>${labels.behavior}</strong>
              <small>${labels.behaviorHint}</small>
            </div>
          </div>

          <crm-editor-form
            .schema=${behaviorSchema}
            .section=${Section.DEVICES}
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
      :host {
        display: block;
        min-width: 0;
      }

      * {
        box-sizing: border-box;
      }

      .studio-devices {
        display: grid;
        gap: 11px;
        min-width: 0;
      }

      .studio-description {
        margin: 0 2px 3px;
        color: var(--secondary-text-color);
        font-size: 12px;
        line-height: 1.5;
      }

      .studio-panel {
        min-width: 0;
        padding: 14px;
        border: 1px solid var(--divider-color, rgba(128,128,128,.2));
        border-radius: 14px;
        background: var(
          --card-background-color,
          var(--ha-card-background, transparent)
        );
      }

      .studio-panel-heading {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 13px;
        padding-bottom: 12px;
        border-bottom: 1px solid var(--divider-color, rgba(128,128,128,.2));
      }

      .studio-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 35px;
        height: 35px;
        flex: 0 0 35px;
        border-radius: 10px;
        background: var(
          --secondary-background-color,
          rgba(128,128,128,.12)
        );
        color: var(--secondary-text-color);
      }

      .studio-icon ha-icon {
        --mdc-icon-size: 19px;
      }

      .studio-heading-copy {
        display: grid;
        gap: 3px;
        min-width: 0;
      }

      .studio-heading-copy strong {
        color: var(--primary-text-color);
        font-size: 13px;
        font-weight: 650;
      }

      .studio-heading-copy small {
        color: var(--secondary-text-color);
        font-size: 11px;
        line-height: 1.35;
      }
      .device-selector {
        display: grid;
        gap: 12px;
        min-width: 0;
      }

      .device-selector-heading {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 10px;
      }

      .device-selector-copy {
        display: grid;
        gap: 4px;
        min-width: 0;
        flex: 1;
      }

      .device-selector-copy strong {
        color: var(--primary-text-color);
        font-size: 12px;
      }

      .device-selector-copy small {
        color: var(--secondary-text-color);
        font-size: 11px;
        line-height: 1.4;
      }

      .refresh-button {
        display: flex;
        align-items: center;
        gap: 5px;
        padding: 7px 10px;
        border: 1px solid var(--divider-color, rgba(128,128,128,.25));
        border-radius: 9px;
        background: var(--secondary-background-color, transparent);
        color: var(--primary-text-color);
        font: inherit;
        font-size: 11px;
        cursor: pointer;
      }

      .refresh-button ha-icon {
        --mdc-icon-size: 16px;
      }

      .refresh-button:disabled {
        opacity: .5;
        cursor: wait;
      }

      .device-grid {
        display: grid;
        gap: 8px;
      }

      .device-option {
        display: flex;
        align-items: center;
        width: 100%;
        gap: 10px;
        padding: 11px;
        border: 1px solid var(--divider-color, rgba(128,128,128,.2));
        border-radius: 11px;
        background: var(--secondary-background-color, transparent);
        color: var(--primary-text-color);
        text-align: left;
        font: inherit;
        cursor: pointer;
        transition: border-color .15s, background .15s;
      }

      .device-option:hover {
        border-color: var(--primary-color);
      }

      .device-option.is-selected {
        border-color: var(--primary-color);
        background: color-mix(
          in srgb,
          var(--primary-color) 9%,
          transparent
        );
      }

      .device-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        flex: 0 0 36px;
        border-radius: 10px;
        background: var(--card-background-color, rgba(128,128,128,.12));
      }

      .device-icon ha-icon {
        --mdc-icon-size: 21px;
      }

      .device-copy {
        display: grid;
        gap: 3px;
        min-width: 0;
        flex: 1;
      }

      .device-copy strong {
        overflow-wrap: anywhere;
        font-size: 12px;
        font-weight: 600;
      }

      .device-copy small {
        color: var(--secondary-text-color);
        font-size: 10px;
      }

      .device-check {
        --mdc-icon-size: 21px;
        color: var(--secondary-text-color);
      }

      .is-selected .device-check {
        color: var(--primary-color);
      }

      .device-selection-summary {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px;
        border-radius: 9px;
        background: var(--secondary-background-color, rgba(128,128,128,.08));
        color: var(--primary-text-color);
        font-size: 11px;
        overflow-wrap: anywhere;
      }

      .device-selection-summary ha-icon {
        --mdc-icon-size: 18px;
        color: var(--primary-color);
      }

      .device-status {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 12px;
        border: 1px dashed var(--divider-color, rgba(128,128,128,.3));
        border-radius: 10px;
        color: var(--secondary-text-color);
        font-size: 11px;
        line-height: 1.4;
      }

      .device-status ha-icon {
        --mdc-icon-size: 19px;
        flex-shrink: 0;
      }

      .device-error {
        color: var(--error-color, #db4437);
      }

      .device-note {
        margin: 0;
        color: var(--secondary-text-color);
        font-size: 11px;
        line-height: 1.5;
      }

      .manual-settings {
        margin-top: 6px;
        padding-top: 12px;
        border-top: 1px solid var(--divider-color, rgba(128,128,128,.2));
      }

      crm-editor-form {
        display: block;
        min-width: 0;
      }

      @media (max-width: 340px) {
        .studio-panel {
          padding: 10px;
        }

        .device-option {
          padding: 9px;
        }
      }
    `;
  }
}

customElements.define('crm-device-browser-editor', SourceSettingsEditor);
