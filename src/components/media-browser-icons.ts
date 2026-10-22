// lovelace card imports.
import { css, html, TemplateResult } from 'lit';

// our imports.
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
          ${this.styleMediaBrowserItemBackgroundImage(item.mbi_item.image_url, index)}
          ${(() => {
            if (this.isTouchDevice) {
              return html`
                <ha-control-button
                  class="button"
                  isTouchDevice="${this.isTouchDevice}"
                  @touchstart=${{ handleEvent: () => this.onMediaBrowserItemTouchStart(customEvent(ITEM_SELECTED, item)), passive: true }}
                  @touchend=${() => this.onMediaBrowserItemTouchEnd(customEvent(ITEM_SELECTED, item))}
                >
                  ${this.renderMediaBrowserItem(item, !item.mbi_item.image_url || !this.hideTitle, !this.hideSubTitle)}
                </ha-control-button>
              `;
            }

            return html`
              <ha-control-button
                class="button"
                isTouchDevice="${this.isTouchDevice}"
                @click=${() => this.onMediaBrowserItemClick(customEvent(ITEM_SELECTED, item))}
                @mousedown=${() => this.onMediaBrowserItemMouseDown()}
                @mouseup=${() => this.onMediaBrowserItemMouseUp(customEvent(ITEM_SELECTED, item))}
              >
                ${this.renderMediaBrowserItem(item, !item.mbi_item.image_url || !this.hideTitle, !this.hideSubTitle)}
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
    const clsActive = item.mbi_item.is_active ? ' title-active' : '';
    const hasImage = Boolean(item.mbi_item.image_url);
    const divNowPlayingBars = item.mbi_item.is_active ? this.nowPlayingBars : html``;

    return html`
      <div class="thumbnail">
        ${divNowPlayingBars}
      </div>
      <div class="title${clsActive}${hasImage ? ' title-on-image' : ''}" ?hidden=${!showTitle}>
        ${item.mbi_item.title}
        <div class="subtitle" ?hidden=${!showSubTitle}>${formatStringProperCase(item.mbi_item.subtitle || '')}</div>
      </div>
    `;
  }

  static get styles() {
    return [
      css`
        :host {
          --crm-grid-title-color: var(--crm-text, var(--primary-text-color, #f0fdf4));
          --crm-grid-subtitle-color: var(--crm-text-secondary, var(--secondary-text-color, var(--crm-grid-title-color)));
        }

        .icons {
          display: flex;
          flex-wrap: wrap;
        }

        .button {
          --control-button-padding: 0px;
          --margin: 0.6%;
          --width: calc(100% / var(--items-per-row) - (var(--margin) * 2));
          width: var(--width);
          height: var(--width);
          margin: var(--margin);
          color: var(--crm-grid-title-color);
        }

        .thumbnail {
          width: 100%;
          padding-bottom: 100%;
          background-size: 100%;
          background-repeat: no-repeat;
          background-position: center;
          mask-repeat: no-repeat;
          mask-position: center;
        }

        .title {
          color: var(--crm-grid-title-color);
          font-size: var(--crm-media-browser-items-title-font-size, 0.8rem);
          font-weight: normal;
          line-height: 160%;
          padding: 0.75rem 0.5rem 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          position: absolute;
          width: 100%;
          bottom: 0;
          box-sizing: border-box;
          background: transparent;
        }

        /* Image thumbnails require a dark overlay and light text regardless
           of the surrounding light/dark/custom card theme. */
        .title-on-image {
          color: #ffffff;
          background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75));
        }

        .title-active:not(.title-on-image) {
          color: var(--crm-grid-title-color);
        }

        .subtitle {
          color: var(--crm-grid-subtitle-color);
          font-size: var(--crm-media-browser-items-subtitle-font-size, 0.8rem);
          line-height: 120%;
          width: 100%;
          padding-bottom: 0.25rem;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .title-on-image .subtitle {
          color: rgba(255, 255, 255, 0.88);
        }

        .bars {
          position: absolute;
          width: 20px;
          height: 10px;
          margin-top: 20px;
          margin-left: 10px;
        }

        .bar {
          background: var(--crm-accent, var(--primary-color, #34d399));
          bottom: 1px;
          height: 3px;
          position: absolute;
          width: 3px;
          animation: sound 0ms -800ms linear infinite alternate;
          display: block;
        }

        @keyframes sound {
          0% { opacity: .35; height: 3px; }
          100% { opacity: 1; height: 1rem; }
        }

        .bar:nth-child(1) { left: 1px; animation-duration: 474ms; }
        .bar:nth-child(2) { left: 5px; animation-duration: 433ms; }
        .bar:nth-child(3) { left: 9px; animation-duration: 407ms; }
        .bar:nth-child(4) { left: 13px; animation-duration: 458ms; }
      `,
    ];
  }
}

customElements.define('crm-media-browser-icons', MediaBrowserIcons);
