/* eslint-disable @typescript-eslint/no-explicit-any */
// debug logging.
import Debug from 'debug/src/browser.js';
import { DEBUG_APP_NAME } from '../constants';
const debuglog = Debug(DEBUG_APP_NAME + ":player-controls");

// lovelace card imports.
import { css, html, PropertyValues, TemplateResult, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import { styleMap, StyleInfo } from 'lit-html/directives/style-map.js';
import {
  mdiHeart,
  mdiHeartOutline,
  mdiPause,
  mdiPlay,
  mdiPlaylistMusic,
  mdiPower,
  mdiRepeat,
  mdiRepeatOff,
  mdiRepeatOnce,
  mdiShuffle,
  mdiShuffleDisabled,
  mdiSkipNext,
  mdiSkipPrevious,
  mdiSpeaker,
} from '@mdi/js';

// our imports.
import {
  PLAYER_CONTROLS_ICON_TOGGLE_COLOR_DEFAULT
} from '../constants';
import { CardConfig } from '../types/card-config';
import { MediaPlayer } from '../model/media-player';
import { MediaPlayerEntityFeature, MediaPlayerState, RepeatMode } from '../services/media-control-service';
import { MediaControlService } from '../services/media-control-service';
import { SpotifyPlusService } from '../services/spotifyplus-service';
import { closestElement, getHomeAssistantErrorMessage } from '../utils/utils';
import { Player } from '../sections/player';
import { PlayerBodyQueue } from './player-body-queue';
import { AlertUpdatesBase } from '../sections/alert-updates-base';
import { Section } from '../types/section';

const { NEXT_TRACK, PAUSE, PLAY, PREVIOUS_TRACK, REPEAT_SET, SHUFFLE_SET, TURN_ON, TURN_OFF } = MediaPlayerEntityFeature;
const ACTION_FAVES = 900000000000;
const PLAY_QUEUE = 990000000000;
const DEVICES = 999000000000;

class PlayerControls extends AlertUpdatesBase {

  // public state properties.
  @property({ attribute: false }) mediaContentId!: string;

  // private state properties.
  @state() private isActionFavoritesVisible?: boolean;
  @state() private isQueueItemsVisible?: boolean;

  /** Card configuration data. */
  private config!: CardConfig;

  /** MediaPlayer instance created from the configuration entity id. */
  private player!: MediaPlayer;

  /** MediaPlayer control service instance. */
  private mediaControlService!: MediaControlService;

  /** SpotifyPlus services instance. */
  protected spotifyPlusService!: SpotifyPlusService;


  /** Resolve the card language, following Home Assistant when set to auto. */
  private getControlLanguage(): 'de' | 'pt' | 'en' {
    const selected = String(this.config?.language || 'auto').toLowerCase();
    const language = selected === 'auto'
      ? String(this.store.hass?.locale?.language || this.store.hass?.language || 'en').toLowerCase()
      : selected;
    return language.startsWith('de') ? 'de' : language.startsWith('pt') ? 'pt' : 'en';
  }

  /** Labels used by Home Assistant icon-button tooltips and accessibility. */
  private controlLabel(key: string): string {
    const labels: Record<string, Record<'de' | 'pt' | 'en', string>> = {
      favorites: { de: 'Favoriten', pt: 'Favoritos', en: 'Favorites' },
      shuffle: { de: 'Zufallswiedergabe', pt: 'Reprodução aleatória', en: 'Shuffle' },
      previous: { de: 'Vorheriger Titel', pt: 'Faixa anterior', en: 'Previous Track' },
      play: { de: 'Wiedergabe starten', pt: 'Reproduzir', en: 'Play' },
      pause: { de: 'Pausieren', pt: 'Pausar', en: 'Pause' },
      next: { de: 'Nächster Titel', pt: 'Próxima faixa', en: 'Next Track' },
      repeat: { de: 'Wiederholen', pt: 'Repetir', en: 'Repeat' },
      queue: { de: 'Wiedergabewarteschlange', pt: 'Fila de reprodução', en: 'Play Queue' },
      turnOn: { de: 'Einschalten', pt: 'Ligar', en: 'Turn On' },
      turnOff: { de: 'Ausschalten', pt: 'Desligar', en: 'Turn Off' },
      devices: { de: 'Geräte', pt: 'Dispositivos', en: 'Devices' },
      queuePreview: {
        de: 'Die Wiedergabewarteschlange ist während der Kartenbearbeitung nicht verfügbar.',
        pt: 'A fila de reprodução não está disponível durante a edição do cartão.',
        en: 'The play queue is unavailable while editing the card.'
      }
    };
    return labels[key]?.[this.getControlLanguage()] || labels[key]?.en || key;
  }

  /**
   * Invoked on each update to perform rendering tasks. 
   * This method may return any value renderable by lit-html's `ChildPart` (typically a `TemplateResult`). 
   * Setting properties inside this method will *not* trigger the element to update.
  */
  protected render(): TemplateResult | void {

    // set common references from application common storage area.
    this.config = this.store.config;
    this.player = this.store.player;
    this.mediaControlService = this.store.mediaControlService;
    this.spotifyPlusService = this.store.spotifyPlusService;

    const stopped = [MediaPlayerState.ON, MediaPlayerState.PLAYING, MediaPlayerState.PAUSED, MediaPlayerState.BUFFERING].includes(this.player.state) && nothing;
    const idle = [MediaPlayerState.IDLE].includes(this.player.state) && nothing;
    const isOff = [MediaPlayerState.OFF].includes(this.player.state) && nothing;

    // set button color based on selected option.
    const colorRepeat = [RepeatMode.ONE, RepeatMode.ALL].includes(this.player.attributes.repeat || RepeatMode.OFF);
    const colorShuffle = (this.player.attributes.shuffle);
    const colorPlay = (this.player.state == MediaPlayerState.PAUSED);
    const colorPower = (this.player.state == MediaPlayerState.OFF);
    const colorActionFavorites = (this.isActionFavoritesVisible);
    const colorQueueItems = (this.isQueueItemsVisible);

    // render html.
    // hide / display controls based on player state:
    // - if powered off, enable TURN_ON button, and hide volume controls;
    // - if idle, enable TURN_OFF and PLAY buttons, and hide volume controls;
    // - for everything else, enable all deck controls and volume controls.
    return html`
      <div class="player-controls-container" style=${this.styleContainer(idle, isOff)}>
          <div class="icons" hide=${stopped}>
              <ha-icon-button @click=${() => this.onClickAction(ACTION_FAVES)}   hide=${this.hideFeature(ACTION_FAVES)}   .path=${colorActionFavorites ? mdiHeart : mdiHeartOutline} label=${this.controlLabel('favorites')} style=${this.styleIcon(colorActionFavorites)}></ha-icon-button>
              <ha-icon-button @click=${() => this.onClickAction(SHUFFLE_SET)}    hide=${this.hideFeature(SHUFFLE_SET)}    .path=${this.getShuffleIcon()} label=${this.controlLabel('shuffle')} style=${this.styleIcon(colorShuffle)}></ha-icon-button>
              <ha-icon-button @click=${() => this.onClickAction(PREVIOUS_TRACK)} hide=${this.hideFeature(PREVIOUS_TRACK)} .path=${mdiSkipPrevious} label=${this.controlLabel('previous')} style=${this.styleIcon()}></ha-icon-button>
              <ha-icon-button @click=${() => this.onClickAction(PLAY)}           hide=${this.hideFeature(PLAY)}           .path=${mdiPlay} label=${this.controlLabel('play')} class="play-pause" style=${this.styleIcon(colorPlay, true)}></ha-icon-button>
              <ha-icon-button @click=${() => this.onClickAction(PAUSE)}          hide=${this.hideFeature(PAUSE)}          .path=${mdiPause} label=${this.controlLabel('pause')} class="play-pause" style=${this.styleIcon(false, true)}></ha-icon-button>
              <ha-icon-button @click=${() => this.onClickAction(NEXT_TRACK)}     hide=${this.hideFeature(NEXT_TRACK)}     .path=${mdiSkipNext} label=${this.controlLabel('next')} style=${this.styleIcon()}></ha-icon-button>
              <ha-icon-button @click=${() => this.onClickAction(REPEAT_SET)}     hide=${this.hideFeature(REPEAT_SET)}     .path=${this.getRepeatIcon()} label=${this.controlLabel('repeat')} style=${this.styleIcon(colorRepeat)} ></ha-icon-button>
              <ha-icon-button @click=${() => this.onClickAction(PLAY_QUEUE)}     hide=${this.hideFeature(PLAY_QUEUE)}     .path=${mdiPlaylistMusic} label=${this.controlLabel('queue')} style=${this.styleIcon(colorQueueItems)} ></ha-icon-button>
          </div>
          <div class="iconsPower" hide=${isOff}>
              <ha-icon-button @click=${() => this.onClickAction(TURN_ON)}        hide=${this.hideFeature(TURN_ON)}        .path=${mdiPower} label=${this.controlLabel('turnOn')} style=${this.styleIcon(colorPower)}></ha-icon-button>
              <ha-icon-button @click=${() => this.onClickAction(DEVICES)}        hide=${this.hideFeature(DEVICES)}        .path=${mdiSpeaker} label=${this.controlLabel('devices')} style=${this.styleIcon()}></ha-icon-button>
          </div>
          <div class="iconsPower" hide=${idle}>
              <ha-icon-button @click=${() => this.onClickAction(TURN_OFF)}       hide=${this.hideFeature(TURN_OFF)}       .path=${mdiPower} label=${this.controlLabel('turnOff')} style=${this.styleIcon()}></ha-icon-button>
              <ha-icon-button @click=${() => this.onClickAction(PLAY)}           hide=${this.hideFeature(PLAY)}           .path=${mdiPlay} label=${this.controlLabel('play')} class="play-pause" style=${this.styleIcon(true, true)}></ha-icon-button>
              <ha-icon-button @click=${() => this.onClickAction(DEVICES)}        hide=${this.hideFeature(DEVICES)}        .path=${mdiSpeaker} label=${this.controlLabel('devices')} style=${this.styleIcon()}></ha-icon-button>
          </div>
      </div>
      <div class="player-volume-container" style=${this.styleContainer(idle, isOff)}>
          <div class="iconsVolume" hide=${stopped}>
              <crm-player-volume hide=${stopped} .store=${this.store} .player=${this.player}></crm-player-volume>
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
        min-width: 0;
        width: 100%;
        box-sizing: border-box;
      }

      .player-controls-container,
      .player-volume-container {
        width: 100%;
        max-width: var(--crm-player-controls-max-width, 40rem);
        min-width: 0;
        box-sizing: border-box;
        text-align: center;
      }

      .player-controls-container {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .icons,
      .iconsPower {
        display: inline-flex;
        align-items: center;
        justify-content: var(--crm-player-controls-icon-justify-content, center);
        gap: 2px;
        min-width: 0;
        max-width: 100%;
        color: var(--crm-player-controls-icon-color, #edf7f0);
        --ha-icon-button-size: 32px;
        --mdc-icon-size: 20px;
        mix-blend-mode: normal;
      }

      .icons > ha-icon-button,
      .iconsPower > ha-icon-button {
        flex: 0 0 auto;
        border-radius: 999px;
        transition: background-color 160ms ease, transform 160ms ease;
      }

      .icons > ha-icon-button:hover,
      .iconsPower > ha-icon-button:hover {
        background-color: color-mix(in srgb, var(--crm-accent, #40d99a) 12%, transparent);
      }

      .icons > ha-icon-button:active,
      .iconsPower > ha-icon-button:active {
        transform: scale(0.94);
      }

      .icons > ha-icon-button.play-pause,
      .iconsPower > ha-icon-button.play-pause {
        background-color: var(--crm-accent, #40d99a);
        color: var(--crm-play-icon-contrast, #102019) !important;
        --mdc-icon-button-icon-color: var(--crm-play-icon-contrast, #102019);
        --mdc-icon-button-ink-color: var(--crm-play-icon-contrast, #102019);
        --ha-icon-button-size: 36px;
        --mdc-icon-size: 22px;
        margin: 0 3px;
      }

      .icons > ha-icon-button.play-pause:hover,
      .iconsPower > ha-icon-button.play-pause:hover {
        filter: brightness(1.08);
      }

      .iconsVolume {
        display: block;
        min-width: 0;
        width: 100%;
        color: var(--crm-player-controls-icon-color, #edf7f0);
        --ha-icon-button-size: 32px;
        --mdc-icon-size: 20px;
      }

      @media (max-width: 520px) {
        .icons, .iconsPower {
          gap: 0;
          --ha-icon-button-size: 28px;
          --mdc-icon-size: 18px;
        }
        .icons > ha-icon-button.play-pause,
        .iconsPower > ha-icon-button.play-pause {
          --ha-icon-button-size: 34px;
          margin: 0 1px;
        }
      }

      *[hide] {
        display: none;
      }

      .flex-1 {
        flex: 1;
      }
    `;
  }

  // bound event listeners for event handlers that need access to "this" object.
  private onKeyDown_EventListenerBound;

  /**
   * Initializes a new instance of the class.
   */
  constructor() {

    // invoke base class method.
    super();

    // create bound event listeners for event handlers that need access to "this" object.
    this.onKeyDown_EventListenerBound = this.onKeyDown.bind(this);
  }


  /**
   * Invoked when the component is added to the document's DOM.
   *
   * In `connectedCallback()` you should setup tasks that should only occur when
   * the element is connected to the document. The most common of these is
   * adding event listeners to nodes external to the element, like a keydown
   * event handler added to the window.
   */
  public connectedCallback() {

    // invoke base class method.
    super.connectedCallback();

    // add document level event listeners.
    document.addEventListener("keydown", this.onKeyDown_EventListenerBound);

  }


  /**
   * Invoked when the component is removed from the document's DOM.
   *
   * This callback is the main signal to the element that it may no longer be
   * used. `disconnectedCallback()` should ensure that nothing is holding a
   * reference to the element (such as event listeners added to nodes external
   * to the element), so that it is free to be garbage collected.
   *
   * An element may be re-connected after being disconnected.
   */
  public disconnectedCallback() {

    // remove document level event listeners.
    document.removeEventListener("keydown", this.onKeyDown_EventListenerBound);

    // invoke base class method.
    super.disconnectedCallback();
  }


  /**
   * Updates the element. This method reflects property values to attributes.
   * It can be overridden to render and keep updated element DOM.
   * Setting properties inside this method will *not* trigger
   * another update.
   *
   * @param changedProperties Map of changed properties with old values
   */
  protected override update(changedProperties: PropertyValues): void {

    // invoke base class method.
    super.update(changedProperties);

    // get list of changed property keys.
    const changedPropKeys = Array.from(changedProperties.keys())

    //if (debuglog.enabled) {
    //  debuglog("%cupdate - changed properties: %s",
    //    "color: gold;",
    //    JSON.stringify(changedPropKeys),
    //  );
    //}

    // if media content id changed, then refresh queue items body (if visible).
    if (changedPropKeys.includes('mediaContentId')) {

      // refresh all body actions.
      setTimeout(() => {
        this.toggleDisplayPlayerBodyQueue();
      }, 50);

    }

  }


  /**
   * Toggle action visibility - action favorites body.
   */
  private toggleDisplayActionFavorites(): void {

    // toggle action visibility - action favorites.
    const elmBody = this.parentElement?.querySelector(".player-section-body-content") as HTMLElement;
    if (elmBody) {
      elmBody.style.display = (this.isActionFavoritesVisible) ? "block" : "none";
      elmBody.style.opacity = (this.isActionFavoritesVisible) ? "1" : "0";
    }

  }


  /**
   * Toggle action visibility - queue items body.
   */
  private toggleDisplayPlayerBodyQueue(): void {

    // toggle action visibility - queue items.
    const elmBody = this.parentElement?.querySelector("#elmPlayerBodyQueue") as PlayerBodyQueue;
    if (elmBody) {
      elmBody.style.display = (this.isQueueItemsVisible) ? "block" : "none";
      elmBody.style.opacity = (this.isQueueItemsVisible) ? "1" : "0";

      // if body is displayed, then request a queue items refresh.
      if (this.isQueueItemsVisible) {
        debuglog("toggleDisplayPlayerBodyQueue - calling for refresh of queue items");
        elmBody.refreshQueueItems();
      } else {
        debuglog("toggleDisplayPlayerBodyQueue - queue items not visible; isQueueItemsVisible = %s",
          JSON.stringify(this.isQueueItemsVisible),
        );
      }
    } else {
      debuglog("toggleDisplayPlayerBodyQueue - could not find queue items #elmPlayerBodyQueue selector!");
    }

  }


  /**
   * KeyDown event handler.
   * 
   * @ev Event arguments.
   */
  private onKeyDown(ev: KeyboardEvent) {

    // if ESC pressed, then hide the actions section if it's visible.
    if (ev.key === "Escape") {
      if (this.isActionFavoritesVisible) {
        this.onClickAction(ACTION_FAVES);
      } else if (this.isQueueItemsVisible) {
        this.onClickAction(PLAY_QUEUE);
      }
    }

  }


  /**
   * Handles the `click` event fired when a control icon is clicked.
   * 
   * @param action Action to execute.
   */
  private async onClickAction(action: any): Promise<boolean> {

    try {

      // handle action(s) that don't require a progress indicator.
      if (action == ACTION_FAVES) {

        // if we are editing the card configuration, then we don't want to allow this.
        // this is because the `firstUpdated` method will fire every time the configuration 
        // changes (e.g. every keypress) and action status is lost.
        if (this.isCardInEditPreview) {
          const language = this.getControlLanguage();
          this.alertInfoSet(language.startsWith('pt')
            ? 'Os favoritos não estão disponíveis durante a edição do cartão.'
            : language.startsWith('de')
              ? 'Favoriten sind während der Kartenbearbeitung nicht verfügbar.'
              : 'Favorites are unavailable while editing the card.');
          return true;
        }

        // toggle action favorites visibility.
        this.isActionFavoritesVisible = !this.isActionFavoritesVisible;
        if (debuglog.enabled) {
          debuglog("update - action favorites toggled - isActionFavoritesVisible = %s",
            JSON.stringify(this.isActionFavoritesVisible),
          );
        }

        if (this.isQueueItemsVisible) {
          debuglog("update - queue items visible; imediately closing queue items, and delay opening action favorites");
          // close the queue items body.
          this.isQueueItemsVisible = false;
          this.toggleDisplayPlayerBodyQueue();
          // give the queue items body time to close, then show the action favorites body.
          setTimeout(() => {
            this.toggleDisplayActionFavorites();
          }, 250);
        } else {
          debuglog("update - queue items not visible; immediately toggling action favorites");
          // show the action favorites body, since the queue items is closed.
          this.toggleDisplayActionFavorites();
        }
        return true;

      } else if (action == DEVICES) {

        // show devices section.
        this.store.card.SetSection(Section.DEVICES);

      } else if (action == PLAY_QUEUE) {

        // if we are editing the card configuration, then we don't want to allow this.
        // this is because the `firstUpdated` method will fire every time the configuration 
        // changes (e.g. every keypress) and action status is lost.
        if (this.isCardInEditPreview) {
          this.alertInfoSet(this.controlLabel('queuePreview'));
          return true;
        }

        // toggle queue items visibility.
        this.isQueueItemsVisible = !this.isQueueItemsVisible;
        if (debuglog.enabled) {
          debuglog("update - queue items toggled - isQueueItemsVisible = %s",
            JSON.stringify(this.isQueueItemsVisible),
          );
        }

        if (this.isActionFavoritesVisible) {
          debuglog("update - action favorites visible; imeediately closing action favorites, and delay opening queue items");
          // close the action favorites body.
          this.isActionFavoritesVisible = false;
          this.toggleDisplayActionFavorites();
          // give the action favorites body time to close, then show the queue items body.
          setTimeout(() => {
            this.toggleDisplayPlayerBodyQueue();
          }, 250);
        } else {
          debuglog("update - action favorites not visible; immediately opening queue items");
          // show the queue items, since the action favorites body is closed.
          this.toggleDisplayPlayerBodyQueue();
        }
        return true;
      }

      // show progress indicator.
      this.progressShow();

      // call async service based on requested action.
      if (action == PAUSE) {

        await this.spotifyPlusService.PlayerMediaPause(this.player, null);

      } else if (action == PLAY) {

        await this.spotifyPlusService.PlayerMediaResume(this.player, null);

      } else if (action == NEXT_TRACK) {

        await this.spotifyPlusService.PlayerMediaSkipNext(this.player, null);

      } else if (action == PREVIOUS_TRACK) {

        // the following is the same formula used in Progress class (trackProgress method).
        // get current track positioning from media player attributes.
        const position = this.player?.attributes.media_position || 0;
        const playing = this.player?.isPlaying();
        const updatedAt = this.player?.attributes.media_position_updated_at || 0;
        let playingProgress = position;

        // calculate progress.
        if (playing) {
          playingProgress = position + (Date.now() - new Date(updatedAt).getTime()) / 1000.0;
        }

        // if more than 8 seconds have passed then just restart the track;
        // otherwise, select the previous track.
        if (playingProgress > 8) {
          await this.spotifyPlusService.PlayerMediaSeek(this.player, null, 0, 0);
        } else {
          await this.spotifyPlusService.PlayerMediaSkipPrevious(this.player, null);
        }

      } else if (action == REPEAT_SET) {

        let repeat_mode = RepeatMode.OFF;
        if (this.player.attributes.repeat == RepeatMode.OFF) {
          repeat_mode = RepeatMode.ONE;
        } else if (this.player.attributes.repeat == RepeatMode.ONE) {
          repeat_mode = RepeatMode.ALL;
        } else if (this.player.attributes.repeat == RepeatMode.ALL) {
          repeat_mode = RepeatMode.OFF;
        }
        await this.mediaControlService.repeat_set(this.player, repeat_mode);

      } else if (action == SHUFFLE_SET) {

        await this.mediaControlService.shuffle_set(this.player, !this.player.attributes.shuffle);

      } else if (action == TURN_OFF) {

        await this.spotifyPlusService.turn_off(this.player);

      } else if (action == TURN_ON) {

        await this.spotifyPlusService.turn_on(this.player);

      }

      this.progressHide();
      return true;

    }
    catch (error) {

      // set alert error message.
      this.alertErrorSet("Control action failed: " + getHomeAssistantErrorMessage(error));
      this.progressHide();
      return true;

    }
    finally {
    }

  }


  /**
   * Returns `nothing` if the specified feature is to be SHOWN; otherwise, any
   * other value will cause the feature icon to be hidden (weird logic, I know).
   * 
   * The feature will be hidden from view if the media player does not support it,
   * or if the configuration settings "playerControlsHideX" is true.
   * 
   * @param feature Feature identifier to check.
   */
  private hideFeature(feature: any) {

    if (feature == PAUSE) {

      if (this.player.supportsFeature(PAUSE)) {
        // if already paused, then hide it!
        if (this.player.state == MediaPlayerState.PAUSED) {
          return;
        }
        return this.config.playerControlsHidePlayPause || nothing;
      }

    } else if (feature == PLAY) {

      if (this.player.supportsFeature(PLAY)) {
        // if already playing, then hide it!
        if (this.player.state == MediaPlayerState.PLAYING) {
          return;
        }
        return this.config.playerControlsHidePlayPause || nothing;
      }

    } else if (feature == NEXT_TRACK) {

      if (this.player.supportsFeature(NEXT_TRACK))
        return this.config.playerControlsHideTrackNext || nothing;

    } else if (feature == PREVIOUS_TRACK) {

      if (this.player.supportsFeature(PREVIOUS_TRACK))
        return this.config.playerControlsHideTrackPrev || nothing;

    } else if (feature == REPEAT_SET) {

      if (this.player.supportsFeature(REPEAT_SET))
        return this.config.playerControlsHideRepeat || nothing;

    } else if (feature == SHUFFLE_SET) {

      if (this.player.supportsFeature(SHUFFLE_SET))
        return this.config.playerControlsHideShuffle || nothing;

    } else if (feature == ACTION_FAVES) {

      return this.config.playerControlsHideFavorites || nothing;

    } else if (feature == PLAY_QUEUE) {

      return this.config.playerControlsHidePlayQueue || nothing;

    } else if (feature == TURN_ON) {

      if (this.player.supportsFeature(TURN_ON)) {
        if ([MediaPlayerState.OFF, MediaPlayerState.STANDBY].includes(this.player.state)) {
          return (this.config.playerVolumeControlsHidePower) ? true : nothing;
        }
        return true; // hide icon
      }

    } else if (feature == TURN_OFF) {

      // this should only be allowed if the player state is IDLE.
      if (this.player.supportsFeature(TURN_OFF)) {
        if ([MediaPlayerState.IDLE].includes(this.player.state)) {
          return (this.config.playerVolumeControlsHidePower) ? true : nothing;
        }
        return true; // hide icon
      }

    } else if (feature == DEVICES) {

      // show button if player is minimized and devices section enabled.
      if (this.config.playerMinimizeOnIdle) {
        if (this.config.sections?.includes(Section.DEVICES)) {
          return nothing;
        }
      }

    }

    // default is to hide the feature.
    return true;

  }


  /**
   * Sets the alert info message in the parent player.
   */
  public override alertInfoSet(message: string): void {

    // find the parent player reference, and update the message.
    // we have to do it this way due to the shadowDOM between this 
    // element and the player element.
    const spcPlayer = closestElement('#spcPlayer', this) as Player;
    if (spcPlayer) {
      spcPlayer.alertInfoSet(message);
    }

  }


  /**
   * Sets the alert error message in the parent player.
   */
  public override alertErrorSet(message: string): void {

    // find the parent player reference, and update the message.
    // we have to do it this way due to the shadowDOM between this 
    // element and the player element.
    const spcPlayer = closestElement('#spcPlayer', this) as Player;
    if (spcPlayer) {
      spcPlayer.alertErrorSet(message);
    }

  }


  /**
   * Returns the icon to display for the repeat button.
   */
  private getRepeatIcon() {

    if (this.player.attributes.repeat == RepeatMode.ALL) {
      return mdiRepeat;
    } else if (this.player.attributes.repeat == RepeatMode.ONE) {
      return mdiRepeatOnce;
    } else {
      return mdiRepeatOff;
    }

  }


  /**
   * Returns the icon to display for the shuffle button.
   */
  private getShuffleIcon() {

    if (this.player.attributes.shuffle) {
      return mdiShuffle;
    } else {
      return mdiShuffleDisabled;
    }

  }


  /**
   * Returns an element style for the progress bar portion of the control.
   */
  private styleContainer(idle: boolean | typeof nothing, isOff: boolean | typeof nothing) {

    const styleInfo: StyleInfo = <StyleInfo>{};
    styleInfo['margin-bottom'] = `0px`; // cannot place this in class (player-controls-container), must be placed here!

    // for minimized height, only bunch the icons if player state is IDLE or OFF.
    if ((this.config.playerMinimizeOnIdle) && (idle || isOff)) {
      styleInfo['margin'] = `0px`;
      styleInfo['padding'] = `2px`;
    }

    return styleMap(styleInfo);
  }


  /**
   * Returns an element style for control icon coloring.
   * 
   * @param isToggled True if the icon is in a toggle state; otherwise false if icon is in a non-toggled state.
   */
  private styleIcon(isToggled: boolean | undefined | null = null, isPlayPause = false) {

    const styleInfo: StyleInfo = <StyleInfo>{};

    const playerControlsIconMargin = this.config.playerControlsIconMargin;
    if (playerControlsIconMargin) {
      styleInfo['margin'] = `${playerControlsIconMargin}`;
    }

    // if button is toggled, then use the icon toggle color;
    // otherwise, default to regular icon color.
    if (isToggled && !isPlayPause) {
      styleInfo['color'] = `var(--crm-player-controls-icon-toggle-color, ${PLAYER_CONTROLS_ICON_TOGGLE_COLOR_DEFAULT})`;
    }

    if (isPlayPause) {
      // Use the card's contrast-aware color, derived from the actual accent.
      // Keep this as a CSS variable so it follows theme changes automatically.
      const foreground = 'var(--crm-play-icon-contrast, #102019)';
      styleInfo['color'] = foreground;
      styleInfo['--mdc-icon-button-icon-color'] = foreground;
      styleInfo['--mdc-icon-button-ink-color'] = foreground;
    }

    return styleMap(styleInfo);
  }

}

customElements.define('crm-player-controls', PlayerControls);
