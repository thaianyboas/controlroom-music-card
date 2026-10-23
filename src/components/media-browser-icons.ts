
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
        ${divNowPlayingBars}
      </div>

      <div
        class="title${clsActive}${hasImage ? ' title-on-image' : ''}"
        ?hidden=${!showTitle}
      >
        ${item.mbi_item.title}

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
         * ControlRoom Music
         * Emerald Edition — Premium Library
         *
         * Shared artwork presentation.
         * Existing grid dimensions and events preserved.
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

        /* Grid: original geometry */

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

        /* Desktop hover */

        @media (hover: hover) and (pointer: fine) {
          .button:hover {
            box-shadow:
              0 4px 14px rgba(0, 0, 0, 0.24),
              inset 0 0 0 1px var(--crm-library-accent);

            filter: brightness(1.07);
          }
        }

        /* Active media */

        .button.is-active {
          box-shadow:
            0 0 0 1px var(--crm-library-accent),
            0 3px 12px rgba(0, 0, 0, 0.20);
        }

        /* Artwork */

        .thumbnail {
          width: 100%;
          padding-bottom: 100%;

          background-size: 100%;
          background-repeat: no-repeat;
          background-position: center;

          mask-repeat: no-repeat;
          mask-position: center;
        }

        /* Titles */

        .title {
          color: var(--crm-library-text);

          font-size:
            var(--crm-media-browser-items-title-font-size, 0.8rem);

          font-weight: 600;
          line-height: 160%;
          letter-spacing: -0.01em;

          padding: 0.75rem 0.5rem 0;

          position: absolute;
          width: 100%;
          bottom: 0;

          box-sizing: border-box;

          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;

          background: transparent;
        }

        /* Readable overlay across all themes */

        .title-on-image {
          color: #ffffff;

          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 0.28) 25%,
            rgba(0, 0, 0, 0.68) 70%,
            rgba(0, 0, 0, 0.86) 100%
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
          line-height: 120%;

          width: 100%;
          padding-bottom: 0.25rem;

          overflow: hidden;
          text-overflow: ellipsis;
        }

        .title-on-image .subtitle {
          color: rgba(255, 255, 255, 0.88);
        }

        /* Existing now-playing indicator */

        .bars {
          position: absolute;
          width: 20px;
          height: 10px;
          margin-top: 20px;
          margin-left: 10px;
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
            opacity: .35;
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

        /* Accessibility */

        @media (prefers-reduced-motion: reduce) {
          .button {
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
