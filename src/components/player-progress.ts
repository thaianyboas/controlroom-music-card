// lovelace card imports.
import { css, html, TemplateResult, unsafeCSS } from 'lit';
import { query, state } from 'lit/decorators.js';
import { styleMap } from 'lit-html/directives/style-map.js';

// our imports.
import { PLAYER_CONTROLS_ICON_TOGGLE_COLOR_DEFAULT } from '../constants';
import { MediaPlayer } from '../model/media-player';
import { closestElement, getHomeAssistantErrorMessage } from '../utils/utils';
import { Player } from '../sections/player';
import { AlertUpdatesBase } from '../sections/alert-updates-base';

class Progress extends AlertUpdatesBase {
  @state() private playingProgress = 0;
  private player!: MediaPlayer;
  private tracker?: ReturnType<typeof setInterval>;
  private mediaDuration = 0;
  @query('.bar') private progressBar?: HTMLElement;

  protected render(): TemplateResult | void {
    this.player = this.store.player;
    this.mediaDuration = this.player?.attributes.media_duration || 0;

    if (this.mediaDuration <= 0) {
      this.stopTracking();
      return html``;
    }

    this.trackProgress();
    const progress = Math.max(0, Math.min(this.playingProgress || 0, this.mediaDuration));

    return html`
      <div class="progress">
        <div
          class="bar"
          role="slider"
          tabindex="0"
          aria-label="Playback position"
          aria-valuemin="0"
          aria-valuemax=${Math.round(this.mediaDuration)}
          aria-valuenow=${Math.round(progress)}
          @click=${this.onSeekBarClick}
          @keydown=${this.onSeekBarKeyDown}
        >
          <div class="progress-bar" style=${this.styleProgressBar(this.mediaDuration)}></div>
        </div>
        <div class="progress-times">
          <span class="progress-time">${convertProgress(progress)}</span>
          <span class="progress-time">${convertProgress(this.mediaDuration)}</span>
        </div>
      </div>
    `;
  }

  public disconnectedCallback() {
    this.stopTracking();
    super.disconnectedCallback();
  }

  private stopTracking() {
    if (this.tracker !== undefined) {
      clearInterval(this.tracker);
      this.tracker = undefined;
    }
  }

  private async onSeekBarClick(args: MouseEvent) {
    const bar = this.progressBar;
    if (!bar) return;
    const rect = bar.getBoundingClientRect();
    if (rect.width <= 0) return;
    const percent = Math.max(0, Math.min(1, (args.clientX - rect.left) / rect.width));
    await this.seekTo(this.mediaDuration * percent);
  }

  private async onSeekBarKeyDown(args: KeyboardEvent) {
    if (args.key !== 'ArrowLeft' && args.key !== 'ArrowRight' && args.key !== 'Home' && args.key !== 'End') return;
    args.preventDefault();
    const current = Math.max(0, Math.min(this.playingProgress || 0, this.mediaDuration));
    const target = args.key === 'Home' ? 0 : args.key === 'End' ? this.mediaDuration : current + (args.key === 'ArrowRight' ? 5 : -5);
    await this.seekTo(Math.max(0, Math.min(target, this.mediaDuration)));
  }

  private async seekTo(seconds: number) {
    try {
      this.progressShow();
      // SpotifyPlus PlayerMediaSeek expects milliseconds here.
      await this.store.spotifyPlusService.PlayerMediaSeek(this.player, null, seconds * 1000, 0);
    } catch (error) {
      this.alertErrorSet('Seek position failed: ' + getHomeAssistantErrorMessage(error));
    } finally {
      this.progressHide();
    }
  }

  public override alertErrorSet(message: string): void {
    const parent = closestElement('#spcPlayer', this) as Player;
    if (parent) parent.alertErrorSet(message);
  }

  private styleProgressBar(duration: number) {
    const percent = duration > 0 ? Math.max(0, Math.min(100, (this.playingProgress || 0) / duration * 100)) : 0;
    return styleMap({ width: `${percent}%` });
  }

  private trackProgress() {
    const position = this.player?.attributes.media_position || 0;
    const playing = this.player?.isPlaying();
    const updatedAt = this.player?.attributes.media_position_updated_at;
    const updatedAtMs = updatedAt ? new Date(updatedAt).getTime() : NaN;
    const elapsed = playing && Number.isFinite(updatedAtMs) ? Math.max(0, (Date.now() - updatedAtMs) / 1000) : 0;
    const progress = Math.max(0, Math.min(position + elapsed, this.mediaDuration));
    if (this.playingProgress !== progress) this.playingProgress = progress;

    if (playing && this.tracker === undefined) {
      this.tracker = setInterval(() => this.trackProgress(), 1000);
    } else if (!playing) {
      this.stopTracking();
    }
  }

  static get styles() {
    return css`
      :host { display: block; width: 100%; min-width: 0; }
      .progress { width: 100%; display: flex; flex-direction: column; gap: 7px; box-sizing: border-box; padding: 7px 0 5px; }
      .bar { display: block; width: 100%; height: 5px; background: rgba(255,255,255,0.18); border: 0; border-radius: 999px; overflow: hidden; cursor: pointer; box-sizing: border-box; touch-action: manipulation; }
      .bar:focus-visible { outline: 2px solid var(--crm-player-progress-slider-color, var(--crm-accent, #4adea4)); outline-offset: 4px; }
      .progress-bar { height: 100%; background: var(--crm-player-progress-slider-color, ${unsafeCSS(PLAYER_CONTROLS_ICON_TOGGLE_COLOR_DEFAULT)}); border-radius: inherit; transition: width 0.25s linear; }
      .progress-times { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
      .progress-time { color: var(--crm-player-progress-label-color, rgba(255,255,255,0.65)); font-size: var(--crm-player-progress-label-font-size, 0.75rem); font-variant-numeric: tabular-nums; line-height: 1.2; }
    `;
  }
}

const convertProgress = (duration: number): string => {
  const total = Math.max(0, Math.floor(Number.isFinite(duration) ? duration : 0));
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;
  return hours > 0
    ? `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    : `${minutes}:${String(seconds).padStart(2, '0')}`;
};

customElements.define('crm-player-progress', Progress);
