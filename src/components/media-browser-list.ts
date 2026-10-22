// lovelace card imports.
import { css, html, TemplateResult } from 'lit';
import { when } from 'lit/directives/when.js';

// our imports.
import {
  listStyle,
  ITEM_SELECTED
} from '../constants';
import { MediaBrowserBase } from './media-browser-base';
import { IMediaBrowserItem } from '../types/media-browser-item';
import { customEvent, formatStringProperCase } from '../utils/utils';

export class MediaBrowserList extends MediaBrowserBase {

  constructor() {
    super();
  }

  protected render(): TemplateResult | void {
    super.render();

    return html`
      <mwc-list multi class="list" style=${this.styleMediaBrowser()}>
        ${this.buildMediaBrowserItems().map((item, index) => {
          return html`
            ${this.styleMediaBrowserItemBackgroundImage(item.mbi_item.image_url, index)}
            ${(() => {
              if (this.isTouchDevice) {
                return html`
                  <mwc-list-item
                    hasMeta
                    class="${this.listItemClass}"
                    @touchstart=${{handleEvent: () => this.onMediaBrowserItemTouchStart(customEvent(ITEM_SELECTED, item)), passive: true }}
                    @touchend=${() => this.onMediaBrowserItemTouchEnd(customEvent(ITEM_SELECTED, item))}
                  >
                    <div class="row">${this.renderMediaBrowserItem(item, !item.mbi_item.image_url || !this.hideTitle, !this.hideSubTitle)}</div>
                    ${when(
                      item.mbi_item.is_active && this.store.player.isPlaying(),
                      () => html`${this.nowPlayingBars}`,
                    )}
                  </mwc-list-item>
                `;
              } else {
                return html`
                  <mwc-list-item
                    hasMeta
                    class="${this.listItemClass}"
                    @click=${() => this.onMediaBrowserItemClick(customEvent(ITEM_SELECTED, item))}
                    @mousedown=${() => this.onMediaBrowserItemMouseDown()}
                    @mouseup=${() => this.onMediaBrowserItemMouseUp(customEvent(ITEM_SELECTED, item))}
                  >
                    <div class="row">${this.renderMediaBrowserItem(item, !item.mbi_item.image_url || !this.hideTitle, !this.hideSubTitle)}</div>
                    ${when(
                      item.mbi_item.is_active && this.store.player.isPlaying(),
                      () => html`${this.nowPlayingBars}`,
                    )}
                  </mwc-list-item>
                `;
              }
            })()}
          `;
        })}
      </mwc-list>
    `;
  }

  protected renderMediaBrowserItem(
    item: IMediaBrowserItem,
    showTitle: boolean = true,
    showSubTitle: boolean = true,
  ) {
    let clsActive = '';
    if (item.mbi_item.is_active) {
      clsActive = ' title-active';
    }

    return html`
      <div class="thumbnail"></div>
      <div class="title${clsActive}" ?hidden=${!showTitle}>
        ${item.mbi_item.title}
        <div class="subtitle" ?hidden=${!showSubTitle}>${formatStringProperCase(item.mbi_item.subtitle || '')}</div>
      </div>
    `;
  }

  static get styles() {
    return [
      css`
        :host {
          /* The card's resolved foreground is the safe default for all themes. */
          --crm-list-foreground: var(--crm-text, var(--primary-text-color, #f0fdf4));
          --crm-list-secondary: var(--crm-text-secondary, var(--secondary-text-color, var(--crm-list-foreground)));
          --crm-list-accent: var(--crm-accent, var(--primary-color, #34d399));
        }

        .button {
          --control-button-padding: 0px;
          --icon-width: 94px;
          height: var(--icon-width);
          margin: 0.4rem 0.0rem;
        }

        .button-device {
          --icon-width: 50px !important;
          margin: 0 !important;
        }

        .button-track {
          --icon-width: 80px !important;
          margin: 0 !important;
          padding: 0.25rem;
        }

        .row {
          display: flex;
          min-width: 0;
          color: var(--crm-list-foreground);
        }

        .thumbnail {
          width: var(--icon-width);
          height: var(--icon-width);
          background-size: contain;
          background-repeat: no-repeat;
          background-position: left;
          mask-repeat: no-repeat;
          mask-position: left;
          border-radius: 0.5rem;
        }

        .title {
          color: var(--crm-list-foreground);
          font-size: var(--crm-media-browser-items-title-font-size, 1.1rem);
          font-weight: normal;
          padding: 0 0.5rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          align-self: center;
          flex: 1;
          min-width: 0;
        }

        .title-active {
          color: var(--crm-list-foreground);
          font-weight: 600;
        }

        .subtitle {
          color: var(--crm-list-secondary);
          font-size: var(--crm-media-browser-items-subtitle-font-size, 0.8rem);
          font-weight: normal;
          line-height: 120%;
          padding-bottom: 0.25rem;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 100%;
        }

        .bars {
          height: 30px;
          left: 50%;
          margin: -30px 0 0 -20px;
          position: relative;
          top: 65%;
          width: 40px;
        }

        .bar {
          background: var(--crm-list-accent);
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
      listStyle,
    ];
  }
}

customElements.define('crm-media-browser-list', MediaBrowserList);
