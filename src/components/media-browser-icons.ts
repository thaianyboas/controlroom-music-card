
import { css, html, TemplateResult } from 'lit';

import { ITEM_SELECTED } from '../constants';
import { MediaBrowserBase } from './media-browser-base';
import { IMediaBrowserItem } from '../types/media-browser-item';
import { customEvent, formatStringProperCase } from '../utils/utils';

export class MediaBrowserIcons extends MediaBrowserBase {
  constructor() {
    super();
  }

  protected render(): TemplateResult | void {
    super.render();

    return html`
      <div class="icons" style=${this.styleMediaBrowser()}>
        ${this.buildMediaBrowserItems().map((item, index) => html`
          ${this.styleMediaBrowserItemBackgroundImage(
            item.mbi_item.image_url,
            index
          )}

          ${(() => {
            if (this.isTouchDevice) {
              return html`
                <ha-control-button
                  class="button ${item.mbi_item.is_active ? 'is-active' : ''}"
                  isTouchDevice="${this.isTouchDevice}"
                  @touchstart=${{
                    handleEvent: () =>
                      this.onMediaBrowserItemTouchStart(
                        customEvent(ITEM_SELECTED, item)
                      ),
                    passive: true
                  }}
                  @touchend=${() =>
                    this.onMediaBrowserItemTouchEnd(
                      customEvent(ITEM_SELECTED, item)
                    )}
                >
                  ${this.renderMediaBrowserItem(
                    item,
                    !item.mbi_item.image_url || !this.hideTitle,
                    !this.hideSubTitle
                  )}
                </ha-control-button>
              `;
            }

            return html`
              <ha-control-button
                class="button ${item.mbi_item.is_active ? 'is-active' : ''}"
                isTouchDevice="${this.isTouchDevice}"
                @click=${() =>
                  this.onMediaBrowserItemClick(
                    customEvent(ITEM_SELECTED, item)
                  )}
                @mousedown=${() =>
                  this.onMediaBrowserItemMouseDown()}
                @mouseup=${() =>
                  this.onMediaBrowserItemMouseUp(
                    customEvent(ITEM_SELECTED, item)
                  )}
              >
                ${this.renderMediaBrowserItem(
                  item,
                  !item.mbi_item.image_url || !this.hideTitle,
                  !this.hideSubTitle
                )}
              </ha-control-button>
            `;
          })()}
        `)}
      </div>
    `;
  }

  protected renderMediaBrowserItem(
    item: IMediaBrowserItem,
    showTitle: boolean = true,
    showSubTitle: boolean = true,
  ) {
    const clsActive = item.mbi_item.is_active
      ? ' title-active'
      : '';

    const hasImage = Boolean(item.mbi_item.image_url);

    const divNowPlayingBars = item.mbi_item.is_active
      ? this.nowPlayingBars
      : html``;

    return html`
      <div class="thumbnail">
        <span class="play-indicator" aria-hidden="true">
          <ha-icon icon="mdi:play"></ha-icon>
        </span>

        ${divNowPlayingBars}
      </div>

      <div
        class="title${clsActive}${hasImage ? ' title-on-image' : ''}"
        ?hidden=${!showTitle}
      >
        <span class="title-text">
          ${item.mbi_item.title}
        </span>

        <div
          class="subtitle"
          ?hidden=${!showSubTitle}
        >
          ${formatStringProperCase(
            item.mbi_item.subtitle || ''
          )}
        </div>
      </div>
    `;
  }

  static get styles() {
    return [
      css`
        /*
         * ControlRoom Music — Emerald Edition
         * Premium Library Refinement
         *
         * Visual changes only.
         * Original click, hold and touch events preserved.
         */

        :host {
          --crm-library-accent:
            var(--crm-accent, var(--primary-color, #34d399));

          --crm-library-text:
            var(--crm-text, var(--primary-text-color, #f0fdf4));

          --crm-library-subtitle:
            var(
              --crm-text-secondary,
              var(--secondary-text-color, var(--crm-library-text))
            );

          --crm-library-radius: 12px;
        }

        /* Preserve original grid geometry */

        .icons {
          display: flex;
          flex-wrap: wrap;
        }

        .button {
          --control-button-padding: 0px;
          --margin: 0.6%;
          --width: calc(
            100% / var(--items-per-row) - (var(--margin) * 2)
          );

          width: var(--width);
          height: var(--width);
          margin: var(--margin);

          position: relative;
          box-sizing: border-box;
          overflow: hidden;
          isolation: isolate;

          border-radius: var(--crm-library-radius);

          color: var(--crm-library-text);
          background-color:
            var(--crm-background-secondary, transparent);

          box-shadow:
            0 2px 7px rgba(0, 0, 0, 0.14);

          transition:
            box-shadow 200ms ease,
            filter 200ms ease;

          -webkit-tap-highlight-color: transparent;
        }

        /*
         * Inner accent ring:
         * More visible regardless of artwork colors.
         */

        .button::after {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 5;

          border: 2px solid transparent;
          border-radius: inherit;

          box-sizing: border-box;
          pointer-events: none;

          transition:
            border-color 180ms ease,
            box-shadow 180ms ease;
        }

        /* Desktop hover */

        @media (hover: hover) and (pointer: fine) {
          .button:hover {
            box-shadow:
              0 5px 16px rgba(0, 0, 0, 0.25);

            filter: brightness(1.06);
          }

          .button:hover::after {
            border-color: var(--crm-library-accent);

            box-shadow:
              inset 0 0 0 1px rgba(0, 0, 0, 0.30);
          }

          .button:hover .play-indicator {
            opacity: 1;
            transform:
              translate(-50%, -50%) scale(1);
          }

          .button:hover .thumbnail {
            filter: brightness(0.85);
          }
        }

        /* Active media */

        .button.is-active {
          box-shadow:
            0 0 0 1px var(--crm-library-accent),
            0 3px 12px rgba(0, 0, 0, 0.20);
        }

        .button.is-active::after {
          border-color: var(--crm-library-accent);
        }

        /* Keyboard accessibility */

        .button:focus-visible::after {
          border-color: var(--crm-library-accent);
        }

        /* Artwork */

        .thumbnail {
          width: 100%;
          padding-bottom: 100%;

          position: relative;

          background-size: 100%;
          background-repeat: no-repeat;
          background-position: center;

          mask-repeat: no-repeat;
          mask-position: center;

          transition: filter 200ms ease;
        }

        /*
         * Centered Play indicator.
         * Decorative only — no independent click event.
         */

        .play-indicator {
          position: absolute;
          top: 50%;
          left: 50%;
          z-index: 3;

          display: flex;
          align-items: center;
          justify-content: center;

          width: clamp(26px, 38%, 46px);
          aspect-ratio: 1;

          border-radius: 50%;

          background: var(--crm-library-accent);
          color: var(--crm-play-icon-contrast, #102019);

          box-shadow:
            0 4px 16px rgba(0, 0, 0, 0.35);

          opacity: 0;

          transform:
            translate(-50%, -50%) scale(0.85);

          transition:
            opacity 180ms ease,
            transform 180ms ease;

          pointer-events: none;
        }

        .play-indicator ha-icon {
          --mdc-icon-size: 23px;
          color: inherit;
        }

        /* Titles overlay */

        .title {
          position: absolute;
          bottom: 0;
          z-index: 4;

          width: 100%;
          box-sizing: border-box;

          padding: 1rem 0.5rem 0.45rem;

          color: var(--crm-library-text);

          font-size:
            var(--crm-media-browser-items-title-font-size, 0.8rem);

          font-weight: 600;
          line-height: 1.25;
          letter-spacing: -0.01em;

          overflow: hidden;

          background: transparent;

          pointer-events: none;
        }

        .title[hidden],
        .subtitle[hidden] {
          display: none;
        }

        .title-text {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;

          overflow: hidden;
          overflow-wrap: anywhere;

          line-clamp: 2;
        }

        /* Readable overlay for any artwork */

        .title-on-image {
          color: #ffffff;

          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 0.30) 25%,
            rgba(0, 0, 0, 0.72) 68%,
            rgba(0, 0, 0, 0.88) 100%
          );
        }

        .title-active:not(.title-on-image) {
          color: var(--crm-library-accent);
        }

        .title-active.title-on-image {
          color: #ffffff;
        }

        /* Subtitles */

        .subtitle {
          color: var(--crm-library-subtitle);

          font-size:
            var(--crm-media-browser-items-subtitle-font-size, 0.8rem);

          font-weight: 400;
          line-height: 1.2;

          width: 100%;
          margin-top: 3px;

          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .title-on-image .subtitle {
          color: rgba(255, 255, 255, 0.88);
        }

        /* Now-playing indicator */

        .bars {
          position: absolute;
          z-index: 4;

          width: 20px;
          height: 10px;

          margin-top: 20px;
          margin-left: 10px;

          pointer-events: none;
        }

        .bar {
          background: var(--crm-library-accent);

          bottom: 1px;
          height: 3px;

          position: absolute;
          width: 3px;

          animation:
            sound 0ms -800ms linear infinite alternate;

          display: block;
        }

        @keyframes sound {
          0% {
            opacity: 0.35;
            height: 3px;
          }

          100% {
            opacity: 1;
            height: 1rem;
          }
        }

        .bar:nth-child(1) {
          left: 1px;
          animation-duration: 474ms;
        }

        .bar:nth-child(2) {
          left: 5px;
          animation-duration: 433ms;
        }

        .bar:nth-child(3) {
          left: 9px;
          animation-duration: 407ms;
        }

        .bar:nth-child(4) {
          left: 13px;
          animation-duration: 458ms;
        }

        /* Touch: keep normal tap and long-press behavior */

        @media (hover: none) {
          .play-indicator {
            display: none;
          }
        }

        /* Accessibility */

        @media (prefers-reduced-motion: reduce) {
          .button,
          .button::after,
          .thumbnail,
          .play-indicator {
            transition: none;
          }

          .bar {
            animation: none;
          }
        }
      `,
    ];
  }
}

customElements.define(
  'crm-media-browser-icons',
  MediaBrowserIcons
);
