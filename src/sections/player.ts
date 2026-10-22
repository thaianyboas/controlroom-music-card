// lovelace card imports.
import { css, html, TemplateResult } from 'lit';
import { customElement, property, state } from "lit/decorators.js";
import { styleMap, StyleInfo } from 'lit-html/directives/style-map.js';

// our imports - card components.
import '../components/player-header';
import '../components/player-progress';
import '../components/player-body-audiobook';
import '../components/player-body-idle';
import '../components/player-body-queue';
import '../components/player-body-show';
import '../components/player-body-track';
import '../components/player-controls';
import '../components/player-volume';

// our imports.
import {
  BRAND_LOGO_IMAGE_BASE64,
  BRAND_LOGO_IMAGE_SIZE
} from '../constants';
import { CardConfig } from '../types/card-config';
import { MediaPlayer } from '../model/media-player';
import { AlertUpdatesBase } from './alert-updates-base';


@customElement("crm-player")
export class Player extends AlertUpdatesBase {

  // public state properties.
  @property({ attribute: false }) mediaContentId!: string;

  // private storage.
  @state() private config!: CardConfig;

  /** MediaPlayer instance created from the configuration entity id. */
  private player!: MediaPlayer;

  /** Text shown when no music is playing, following the card language. */
  private idleLabels(): { title: string; subtitle: string } {
    const selected = (this.config.language || 'auto').toLowerCase();
    const language = selected === 'auto'
      ? (this.store.hass?.locale?.language || this.store.hass?.language || 'en').toLowerCase()
      : selected;

    if (language.startsWith('pt')) {
      return { title: 'Pronto para ouvir música', subtitle: 'Escolha suas músicas favoritas' };
    }
    if (language.startsWith('de')) {
      return { title: 'Bereit für Musik', subtitle: 'Wähle deine Lieblingsmusik' };
    }
    return { title: 'Ready for music', subtitle: 'Choose your favorite music' };
  }



  /**
   * Invoked on each update to perform rendering tasks. 
   * This method may return any value renderable by lit-html's `ChildPart` (typically a `TemplateResult`). 
   * Setting properties inside this method will *not* trigger the element to update.
  */
  protected render(): TemplateResult | void {
    this.config = this.store.config;
    this.player = this.store.player;

    const isOffIdle = this.player.isPoweredOffOrIdle();
    const artwork = this.player.attributes.entity_picture || this.player.attributes.entity_picture_local;
    const artworkUrl = !isOffIdle && artwork
      ? this.store.hass.hassUrl(artwork)
      : '/local/Bild%20f%C3%BCr%20Spotify.jpg';

    const idleLabels = this.idleLabels();
    const title = !isOffIdle && this.player.attributes.media_title
      ? this.player.attributes.media_title
      : idleLabels.title;
    const artist = !isOffIdle && this.player.attributes.media_artist
      ? this.player.attributes.media_artist
      : idleLabels.subtitle;
    const source = this.player.attributes.source || 'Wohnung Musik';

    return html`
      <div class="player-section-container ${isOffIdle ? 'is-idle' : 'is-active'}"
           style=${this.stylePlayerSection()}>
        <div class="player-artwork" style=${styleMap({ 'background-image': `url("${artworkUrl}")` })}></div>
        <div class="player-artwork-overlay"></div>

        <div class="player-content">
          <div class="player-source">
            <ha-icon icon="mdi:speaker-wireless"></ha-icon>
            <span>${source}</span>
            <span class="source-indicator ${isOffIdle ? 'offline' : ''}"></span>
          </div>

          <div class="player-info">
            <div class="player-title">${title}</div>
            <div class="player-artist">${artist}</div>
          </div>

          <div class="player-alert-bgcolor">
            ${this.alertError ? html`<ha-alert alert-type="error" dismissable @alert-dismissed-clicked=${this.alertErrorClear}>${this.alertError}</ha-alert>` : ''}
            ${this.alertInfo ? html`<ha-alert alert-type="info" dismissable @alert-dismissed-clicked=${this.alertInfoClear}>${this.alertInfo}</ha-alert>` : ''}
          </div>

          <div class="player-bottom">
            <crm-player-controls
              class="player-section-controls"
              style=${this.stylePlayerControls()}
              .store=${this.store}
              .mediaContentId=${this.mediaContentId}
            ></crm-player-controls>
            <div class="player-progress-wrap">
              ${isOffIdle ? html`<div class="idle-progress"></div>` : html`
                <crm-player-progress .store=${this.store}></crm-player-progress>
              `}
            </div>
          </div>
        </div>
      </div>
    `;
  }


  /**
   * style definitions used by this component.
   * */
  static get styles() {
    return css`
      :host {
        display: block;
        width: 100%;
        min-width: 0;
        height: auto;
      }

      .player-section-container {
        position: relative;
        isolation: isolate;
        box-sizing: border-box;
        overflow: hidden;
        width: 100%;
        min-width: 0;
        min-height: 235px;
        padding: 20px 22px;
        border-radius: 20px;
        border: 1px solid rgba(64, 217, 154, 0.13);
        background: var(--crm-background, #101b19) !important;
        color: var(--crm-text, #f0fdf4);
        text-align: left;
      }

      .player-artwork {
        position: absolute;
        z-index: -2;
        inset: 0 0 0 36%;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
      }

      .player-artwork-overlay {
        position: absolute;
        z-index: -1;
        inset: 0;
        background: linear-gradient(90deg,
          var(--crm-background, #101b19) 0%,
          var(--crm-background-overlay-99, rgba(16,27,25,.99)) 28%,
          var(--crm-background-overlay-89, rgba(16,27,25,.89)) 48%,
          var(--crm-background-overlay-35, rgba(16,27,25,.35)) 76%,
          var(--crm-background-overlay-06, rgba(16,27,25,.06)) 100%);
      }

      .player-content {
        position: relative;
        display: flex;
        flex-direction: column;
        min-height: 193px;
        width: 100%;
        gap: 14px;
      }

      .player-source {
        display: flex;
        align-items: center;
        gap: 9px;
        color: var(--crm-player-secondary-text, var(--crm-text, #d7e9df));
        font-size: 13px;
        font-weight: 500;
        min-width: 0;
      }
      .player-source ha-icon {
        --mdc-icon-size: 19px;
        color: var(--crm-accent, #40d99a);
      }
      .player-source span:nth-child(2) {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .source-indicator {
        flex: 0 0 7px;
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: var(--crm-accent, #40d99a);
      }
      .source-indicator.offline { background: #778c82; }

      .player-info {
        min-width: 0;
        max-width: 67%;
      }
      .player-title {
        color: var(--crm-text, #f7fff9);
        font-size: clamp(19px, 2.6vw, 26px);
        font-weight: 650;
        line-height: 1.2;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .player-artist {
        margin-top: 5px;
        color: var(--crm-player-secondary-text, var(--crm-text, #b5c9bd));
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .player-alert-bgcolor { background: transparent; }

      .player-bottom {
        margin-top: auto;
        display: flex;
        align-items: flex-end;
        gap: 10px;
        width: 100%;
        min-width: 0;
      }
      .player-section-controls {
        display: block;
        flex: 0 1 auto;
        min-width: 0;
        max-width: 100%;
        background: transparent;
        --crm-player-controls-icon-color: var(--crm-text, #f0fdf4);
        --crm-player-controls-icon-toggle-color: var(--crm-accent, #40d99a);
      }
      .player-progress-wrap {
        flex: 1 1 110px;
        min-width: 80px;
        max-width: 260px;
        align-self: flex-end;
        padding-bottom: 1px;
      }
      .player-progress-wrap crm-player-progress {
        display: block;
        width: 100%;
        --crm-player-progress-slider-color: var(--crm-accent, #40d99a);
      }
      .idle-progress {
        height: 4px;
        border-radius: 99px;
        background: rgba(185, 218, 200, .25);
      }

      /* Mobile: controls and timeline use separate rows instead of widening the dashboard. */
      @media (max-width: 600px) {
        :host {
          width: 100%;
          max-width: 100%;
          min-width: 0;
          box-sizing: border-box;
        }
        .player-section-container {
          width: 100%;
          max-width: 100%;
          min-width: 0;
          min-height: 225px;
          padding: 15px 14px;
          border-radius: 17px;
        }
        .player-content {
          width: 100%;
          min-width: 0;
          min-height: 193px;
          gap: 12px;
        }
        .player-artwork { inset: 0 0 0 26%; }
        .player-artwork-overlay {
          background: linear-gradient(90deg,
            var(--crm-background, #101b19) 0%,
            var(--crm-background-overlay-98, rgba(16,27,25,.98)) 35%,
            var(--crm-background-overlay-78, rgba(16,27,25,.78)) 68%,
            var(--crm-background-overlay-28, rgba(16,27,25,.28)) 100%);
        }
        .player-info { max-width: 88%; }
        .player-title { font-size: 19px; }
        .player-artist { font-size: 12px; }
        .player-bottom {
          display: flex;
          flex-direction: column;
          align-items: stretch;
          gap: 7px;
          min-width: 0;
          width: 100%;
        }
        .player-section-controls {
          display: block;
          flex: 0 0 auto;
          width: 100%;
          max-width: 100%;
          min-width: 0;
          box-sizing: border-box;
          overflow-x: auto;
          overflow-y: hidden;
          scrollbar-width: none;
          -webkit-overflow-scrolling: touch;
          --crm-player-controls-icon-size: 21px;
          --crm-player-controls-icon-button-size: 31px;
        }
        .player-section-controls::-webkit-scrollbar { display: none; }
        .player-progress-wrap {
          display: block;
          flex: 0 0 auto;
          width: 100%;
          min-width: 0;
          max-width: 100%;
          box-sizing: border-box;
          align-self: stretch;
          padding-bottom: 0;
        }
        .player-progress-wrap crm-player-progress {
          width: 100%;
          max-width: 100%;
          min-width: 0;
        }
      }
    `;
  }


  /**
   * Returns an element style for the player section.
   */
  private stylePlayerSection() {

    // build style info object.
    const styleInfo: StyleInfo = <StyleInfo>{};

    // get player states.
    const isOff = this.player.isPoweredOffOrUnknown();
    const isIdle = this.player.isIdle();

    // initialize default player background image and colors.
    let backgroundImageUrl: string | undefined;
    let isBackgroundImageBrandLogo: boolean = false;

    // get various image source settings.
    const configImageDefault = this.config.customImageUrls?.['default'];
    const configImagePlayerBg = this.config.customImageUrls?.['playerBackground'];
    const configImagePlayerBgIdle = this.config.customImageUrls?.['playerIdleBackground'];
    const configImagePlayerBgOff = this.config.customImageUrls?.['playerOffBackground'];

    // get current media player image and media content id values.
    let playerMediaContentId:string | undefined = undefined;
    let playerImage:string | undefined = undefined;
    if (this.store.player) {
      playerMediaContentId = this.store.player.attributes.media_content_id;
      playerImage = (this.store.player.attributes.entity_picture || this.store.player.attributes.entity_picture_local);
      if (playerImage) {
        // get fully-qualified url of the player image since we are using entity_picture attribute.
        playerImage = this.store.hass.hassUrl(playerImage);
      }
    }

    //console.log("%cstylePlayerSection - styling player section:\n- isOff = %s\n- isIdle = %s\n- playerImage = %s\n- playerMinimizeOnIdle = %s\n- configImageDefault = %s\n- configImagePlayerBg = %s",
    //  "color:red",
    //  JSON.stringify(isOff),
    //  JSON.stringify(isIdle),
    //  JSON.stringify(playerImage),
    //  JSON.stringify(this.config.playerMinimizeOnIdle),
    //  JSON.stringify(configImageDefault),
    //  JSON.stringify(configImagePlayerBg),
    //);

    // is specific background size specified in config? if so, then use it.
    // otherwise, do not stretch the background image if in fill mode.
    if (this.config.playerBackgroundImageSize) {
      styleInfo['--crm-player-background-size'] = `${this.config.playerBackgroundImageSize}`;
    } else if (this.config.width == 'fill') {
      styleInfo['--crm-player-background-size-default'] = 'contain';
    }

    // set various player control icon specifications.
    const playerControlsMaxWidth = this.config.playerControlsMaxWidth;
    if (playerControlsMaxWidth) {
      styleInfo['--crm-player-controls-max-width'] = `${playerControlsMaxWidth}`;
    }
    const playerControlsIconJustifyContent = this.config.playerControlsIconJustifyContent;
    if (playerControlsIconJustifyContent) {
      styleInfo['--crm-player-controls-icon-justify-content'] = `${playerControlsIconJustifyContent}`;
    }

    // set player background image to display.
    if (isOff) {

      // set image to display for OFF state.
      this.store.card.playerMediaContentId = "configImagePlayerBgOff"
      if ((configImagePlayerBgOff || "").toLowerCase() == "none") {
        // force no image.
        styleInfo['background-image'] = undefined;
      } else if (configImagePlayerBgOff) {
        // image specified in card config.
        styleInfo['background-image'] = `url(${configImagePlayerBgOff})`;
        backgroundImageUrl = configImagePlayerBgOff;
      } else if (this.config.playerMinimizeOnIdle) {
        // player is minimized, so use theme file image if defined (do not display brand logo).
        styleInfo['background-image'] = `var(--crm-player-background-image-off)`;
      } else {
        // player is not minimized, so use theme file image if defined; otherwise, use brand logo.
        styleInfo['background-image'] = `var(--crm-player-background-image-off, url(${BRAND_LOGO_IMAGE_BASE64}))`;
        styleInfo['--crm-player-background-size-default'] = `${BRAND_LOGO_IMAGE_SIZE}`;
        isBackgroundImageBrandLogo = true;
      }

      // set image size.
      if (this.config.playerBackgroundImageSize) {
        styleInfo['--crm-player-background-size'] = `${this.config.playerBackgroundImageSize}`;
      }

    } else if (isIdle) {

      // set image to display for IDLE state.
      this.store.card.playerMediaContentId = "configImagePlayerBgIdle"
      if ((configImagePlayerBgIdle || "").toLowerCase() == "none") {
        // force no image.
        styleInfo['background-image'] = undefined;
      } else if (configImagePlayerBgIdle) {
        // image specified in card config.
        styleInfo['background-image'] = `url(${configImagePlayerBgIdle})`;
        backgroundImageUrl = configImagePlayerBgIdle;
      } else if (this.config.playerMinimizeOnIdle) {
        // player is minimized, so use theme file image if defined (do not display brand logo).
        styleInfo['background-image'] = `var(--crm-player-background-image-off)`;
      } else {
        // player is not minimized, so use theme file image if defined; otherwise, use brand logo.
        styleInfo['background-image'] = `var(--crm-player-background-image-off, url(${BRAND_LOGO_IMAGE_BASE64}))`;
        styleInfo['--crm-player-background-size-default'] = `${BRAND_LOGO_IMAGE_SIZE}`;
        isBackgroundImageBrandLogo = true;
      }

      // set image size.
      if (this.config.playerBackgroundImageSize) {
        styleInfo['--crm-player-background-size'] = `${this.config.playerBackgroundImageSize}`;
      }

    } else if (configImagePlayerBg) {

      // use configured player background image (static image, does not change).
      this.store.card.playerMediaContentId = "configImagePlayerBg"
      if ((configImagePlayerBg || "").toLowerCase() == "none") {
        // force no image.
        styleInfo['background-image'] = undefined;
      } else if (configImagePlayerBg) {
        // image specified in card config.
        styleInfo['background-image'] = `url(${configImagePlayerBg})`;
        backgroundImageUrl = configImagePlayerBg;
      }

    } else if (playerImage) {

      // use currently playing artwork background image; image changes with the track.
      // note that theming variable will override this value if specified.
      this.store.card.playerMediaContentId = playerMediaContentId;
      backgroundImageUrl = playerImage;
      styleInfo['background-image'] = `var(--crm-player-background-image, url(${playerImage}))`;

    } else if (configImageDefault) {

      // use configured default background image.
      this.store.card.playerMediaContentId = "configImageDefault"
      backgroundImageUrl = configImageDefault;
      styleInfo['background-image'] = `url(${configImageDefault}`;

    } else {

      // set image to display for all other possibilities.
      this.store.card.playerMediaContentId = "BRAND_LOGO_IMAGE_BASE64"
      if (this.config.playerMinimizeOnIdle) {
        // player is minimized, so use theme file image if defined (do not display brand logo).
        styleInfo['background-image'] = `var(--crm-player-background-image-off)`;
      } else {
        // player is not minimized, so use theme file image if defined; otherwise, use brand logo.
        styleInfo['background-image'] = `var(--crm-player-background-image-off, url(${BRAND_LOGO_IMAGE_BASE64}))`;
        styleInfo['--crm-player-background-size-default'] = `${BRAND_LOGO_IMAGE_SIZE}`;
        isBackgroundImageBrandLogo = true;
      }

      // set image size.
      if (this.config.playerBackgroundImageSize) {
        styleInfo['--crm-player-background-size'] = `${this.config.playerBackgroundImageSize}`;
      }

    }

    // set player controls and volume controls icon size.
    let playerControlsBackgroundColor = this.config.playerControlsBackgroundColor;
    const playerControlsColor = this.config.playerControlsColor;
    const playerControlsIconSize = this.config.playerControlsIconSize;
    let playerControlsIconColor = this.config.playerControlsIconColor;
    const playerControlsIconToggleColor = this.config.playerControlsIconToggleColor;
    let playerHeaderBackgroundColor = this.config.playerHeaderBackgroundColor;
    let playerHeaderTitle1Color = this.config.playerHeaderTitle1Color;
    const playerHeaderTitle1FontSize = this.config.playerHeaderTitle1FontSize;
    let playerHeaderTitle2Color = this.config.playerHeaderTitle2Color;
    const playerHeaderTitle2FontSize = this.config.playerHeaderTitle2FontSize;
    let playerHeaderTitle3Color = this.config.playerHeaderTitle3Color;
    const playerHeaderTitle3FontSize = this.config.playerHeaderTitle3FontSize;
    const playerMinimizedTitleColor = this.config.playerMinimizedTitleColor;
    const playerMinimizedTitleFontSize = this.config.playerMinimizedTitleFontSize;
    const playerProgressSliderColor = this.config.playerProgressSliderColor;
    const playerProgressLabelColor = this.config.playerProgressLabelColor;
    const playerProgressLabelFontSize = this.config.playerProgressLabelFontSize;
    const playerProgressLabelPaddingLR = this.config.playerProgressLabelPaddingLR;
    const playerVolumeSliderColor = this.config.playerVolumeSliderColor;
    const playerVolumeSliderThickness = this.config.playerVolumeSliderThickness;
    let playerVolumeLabelColor = this.config.playerVolumeLabelColor;
    const playerVolumeLabelFontSize = this.config.playerVolumeLabelFontSize;

    // if brand logo image is in use, then default the header and controls area
    // background to transparent, and all labels to the primary text color (since the 
    // brand logo image is transparent).
    // this will cause labels and controls to render on a white (logo) background.
    if (isBackgroundImageBrandLogo) {
      playerControlsBackgroundColor = playerControlsBackgroundColor || `transparent`;
      playerControlsIconColor = playerControlsIconColor || 'var(--primary-text-color, PLAYER_CONTROLS_BACKGROUND_COLOR_DEFAULT)'
      playerHeaderBackgroundColor = playerHeaderBackgroundColor || `transparent`;
      playerHeaderTitle1Color = playerHeaderTitle1Color || 'var(--primary-text-color, PLAYER_CONTROLS_BACKGROUND_COLOR_DEFAULT)'
      playerHeaderTitle2Color = playerHeaderTitle2Color || 'var(--primary-text-color, PLAYER_CONTROLS_BACKGROUND_COLOR_DEFAULT)'
      playerHeaderTitle3Color = playerHeaderTitle3Color || 'var(--primary-text-color, PLAYER_CONTROLS_BACKGROUND_COLOR_DEFAULT)'
      playerVolumeLabelColor = playerVolumeLabelColor || 'var(--primary-text-color, PLAYER_CONTROLS_BACKGROUND_COLOR_DEFAULT)'
    }

    // build style info object.
    this.store.card.playerImage = backgroundImageUrl;
    if (playerControlsBackgroundColor)
      styleInfo['--crm-player-controls-bg-color'] = `${playerControlsBackgroundColor} `;
    if (playerControlsColor)
      styleInfo['--crm-player-controls-color'] = `${playerControlsColor}`;
    if (playerControlsIconToggleColor)
      styleInfo['--crm-player-controls-icon-toggle-color'] = `${playerControlsIconToggleColor}`;
    if (playerControlsIconColor)
      styleInfo['--crm-player-controls-icon-color'] = `${playerControlsIconColor}`;
    if (playerControlsIconSize) {
      styleInfo['--crm-player-controls-icon-size'] = `${playerControlsIconSize}`;
      styleInfo['--crm-player-controls-icon-button-size'] = `var(--crm-player-controls-icon-size, ${playerControlsIconSize})`;
    }
    if (playerHeaderBackgroundColor)
      styleInfo['--crm-player-header-bg-color'] = `${playerHeaderBackgroundColor}`;
    if (playerHeaderTitle1Color)
      styleInfo['--crm-player-header-title1-color'] = `${playerHeaderTitle1Color}`;
    if (playerHeaderTitle1FontSize)
      styleInfo['--crm-player-header-title1-font-size'] = `${playerHeaderTitle1FontSize}`;
    if (playerHeaderTitle2Color)
      styleInfo['--crm-player-header-title2-color'] = `${playerHeaderTitle2Color}`;
    if (playerHeaderTitle2FontSize)
      styleInfo['--crm-player-header-title2-font-size'] = `${playerHeaderTitle2FontSize}`;
    if (playerHeaderTitle3Color)
      styleInfo['--crm-player-header-title3-color'] = `${playerHeaderTitle3Color}`;
    if (playerHeaderTitle3FontSize)
      styleInfo['--crm-player-header-title3-font-size'] = `${playerHeaderTitle3FontSize}`;
    if (playerMinimizedTitleColor)
      styleInfo['--crm-player-minimized-title-color'] = `${playerMinimizedTitleColor}`;
    if (playerMinimizedTitleFontSize)
      styleInfo['--crm-player-minimized-title-font-size'] = `${playerMinimizedTitleFontSize}`;
    if (playerProgressLabelColor)
      styleInfo['--crm-player-progress-label-color'] = `${playerProgressLabelColor}`;
    if (playerProgressLabelFontSize)
      styleInfo['--crm-player-progress-label-font-size'] = `${playerProgressLabelFontSize}`;
    if (playerProgressLabelPaddingLR)
      styleInfo['--crm-player-progress-label-padding-lr'] = `${playerProgressLabelPaddingLR}`;
    if (playerProgressSliderColor)
      styleInfo['--crm-player-progress-slider-color'] = `${playerProgressSliderColor}`;
    if (playerVolumeLabelColor)
      styleInfo['--crm-player-volume-label-color'] = `${playerVolumeLabelColor}`;
    if (playerVolumeLabelFontSize)
      styleInfo['--crm-player-volume-label-font-size'] = `${playerVolumeLabelFontSize}`;
    if (playerVolumeSliderColor)
      styleInfo['--crm-player-volume-slider-color'] = `${playerVolumeSliderColor}`;
    if (playerVolumeSliderThickness)
      styleInfo['--crm-player-volume-slider-thickness'] = `${playerVolumeSliderThickness}`;

    // Identidade visual ControlRoom: impede que as cores do tema do HA
    // ou da configuracao antiga deixem os controles azuis.
    const theme = this.store.config.crmTheme ?? 'dark';
    const dark = theme === 'dark' ||
      (theme === 'auto' && this.store.hass?.themes?.darkMode !== false);
    const custom = theme === 'custom';

    const themeText = custom
      ? (this.store.config.crmText || '#f0fdf4')
      : dark ? '#f0fdf4' : '#183329';

    const themeAccent = custom
      ? (this.store.config.crmAccent || '#34d399')
      : dark ? '#40d99a' : '#16875c';

    const muted = dark ? '#a6b7af' : '#657a70';
    styleInfo['--crm-player-secondary-text'] = custom
      ? 'color-mix(in srgb, var(--crm-text, #f0fdf4) 80%, var(--crm-background, #101b19))'
      : dark ? '#b5c9bd' : '#657a70';


    styleInfo['--crm-player-controls-color'] = 'var(--crm-text, ' + themeText + ')';
    styleInfo['--crm-player-controls-icon-color'] = 'var(--crm-text, ' + themeText + ')';
    styleInfo['--crm-player-controls-icon-toggle-color'] = 'var(--crm-accent, ' + themeAccent + ')';
    styleInfo['--crm-player-progress-slider-color'] = 'var(--crm-accent, ' + themeAccent + ')';
    styleInfo['--crm-player-progress-label-color'] = muted;
    styleInfo['--crm-player-volume-slider-color'] = 'var(--crm-accent, ' + themeAccent + ')';
    styleInfo['--crm-player-volume-label-color'] = muted;
    styleInfo['--crm-player-header-title1-color'] = 'var(--crm-text, ' + themeText + ')';
    styleInfo['--crm-player-header-title2-color'] = 'var(--crm-text, ' + themeText + ')';
    styleInfo['--crm-player-header-title3-color'] = muted;
    styleInfo['--crm-player-header-bg-color'] = 'transparent';
    styleInfo['--crm-player-controls-bg-color'] = 'transparent';
    return styleMap(styleInfo);

  }

  /**
   * Returns an element style for the player controls portion of the form.
   */
  private stylePlayerControls() {

    // build style info object.
    const styleInfo: StyleInfo = <StyleInfo>{};

    // show / hide the media controls.
    if (this.config.playerControlsHide || false)
      styleInfo['display'] = `none`;

    // adjust css styling for minimized player format.
    if (this.config.playerMinimizeOnIdle && this.store.player.isPoweredOffOrIdle()) {
      if (this.config.height != 'fill') {
        styleInfo['justify-items'] = `flex-start`;
        styleInfo['padding-left'] = `0px`;
      }
    }

    return styleMap(styleInfo);
  }

}
