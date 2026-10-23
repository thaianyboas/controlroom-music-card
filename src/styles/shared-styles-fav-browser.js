
import { css } from 'lit';

/**
 * ControlRoom Music — Emerald Edition
 * Premium Favorites Browser
 *
 * Adaptive styling for Dark, Light and Custom themes.
 * Original browser dimensions and scrolling preserved.
 */
export const sharedStylesFavBrowser = css`

  .media-browser-section {
    color: var(--crm-text, var(--primary-text-color));
    overflow: hidden;
    display: flex;
    flex-direction: column;
    height: auto;
    min-height: 0;
  }

  .media-browser-section-title {
    padding: 0.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-weight: 700;
    font-size: var(--spc-media-browser-section-title-font-size, 1rem);
    line-height: var(--spc-media-browser-section-title-font-size, 1rem);
    color: var(
      --spc-media-browser-section-title-color,
      var(--crm-text, var(--primary-text-color))
    );
  }

  .media-browser-section-subtitle {
    padding: 0.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-weight: 400;
    font-size: var(--spc-media-browser-section-subtitle-font-size, 0.85rem);
    line-height: var(--spc-media-browser-section-subtitle-font-size, 0.85rem);
    color: var(
      --spc-media-browser-section-subtitle-color,
      var(--crm-text, var(--primary-text-color))
    );
    opacity: 0.78;
  }

  /*
   * Premium controls
   * Preserve the existing layout and control dimensions.
   */

  .media-browser-controls {
    padding: 0.2rem 0.4rem 0.2rem;
    white-space: nowrap;

    --ha-select-height: 2.5rem;
    --mdc-menu-item-height: 2.5rem;
    --ha-icon-button-size: 2.5rem;
    --md-menu-item-top-space: 0.5rem;
    --md-menu-item-bottom-space: 0.5rem;
    --md-menu-item-one-line-container-height: 2rem;

    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    flex-shrink: 0;
    min-width: 0;

    gap: 2px;
  }

  /*
   * Search field
   * Theme-aware surface, focus and border.
   */

  .media-browser-control-filter {
    padding-right: 0.5rem;
    padding-left: 0.5rem;
    width: 100%;
    min-width: 0;
    box-sizing: border-box;

    --primary-color: var(--crm-accent, #34d399);
    --mdc-theme-primary: var(--crm-accent, #34d399);
    --mdc-theme-on-surface:
      var(--crm-text, var(--primary-text-color));

    --mdc-text-field-ink-color:
      var(--crm-text, var(--primary-text-color));

    --mdc-text-field-label-ink-color:
      var(--crm-text-secondary, var(--secondary-text-color));

    --mdc-text-field-fill-color:
      var(--crm-background-secondary, transparent);
  }

  .media-browser-control-filter ha-textfield,
  .media-browser-control-filter ha-textfield *,
  .media-browser-control-filter ha-select {
    --primary-color: var(--crm-accent, #34d399);
    --mdc-theme-primary: var(--crm-accent, #34d399);
  }

  .media-browser-control-filter ha-textfield,
  .media-browser-control-filter ha-select {
    width: 100%;
    min-width: 0;
    box-sizing: border-box;

    color: var(--crm-text, var(--primary-text-color));
    border-radius: 10px;

    transition:
      box-shadow 180ms ease,
      border-color 180ms ease;
  }

  .media-browser-control-filter ha-textfield:focus-within,
  .media-browser-control-filter ha-select:focus-within {
    box-shadow:
      0 0 0 1px var(--crm-accent, #34d399);
  }

  .media-browser-control-filter-disabled {
    padding-right: 0.5rem;
    padding-left: 0.5rem;
    width: 100%;
    min-width: 0;
    align-self: center;

    color: var(--crm-text, var(--primary-text-color));
    opacity: 0.65;

    overflow: hidden;
    text-overflow: ellipsis;
  }

  /*
   * Filter and action buttons
   */

  .media-browser-controls ha-icon-button {
    --primary-color: var(--crm-accent, #34d399);
    --mdc-theme-primary: var(--crm-accent, #34d399);
    color: var(--crm-text, var(--primary-text-color));
    border-radius: 10px;
    transition:
      background-color 180ms ease,
      color 180ms ease;
  }

  @media (hover: hover) and (pointer: fine) {
    .media-browser-controls ha-icon-button:hover {
      background-color: color-mix(
        in srgb,
        var(--crm-accent, #34d399) 10%,
        transparent
      );
    }
  }

  .media-browser-controls ha-icon-button:focus-visible {
    outline: 2px solid var(--crm-accent, #34d399);
    outline-offset: 1px;
  }

  /*
   * Browser content
   * Preserve original maximum height and scrolling.
   */

  .media-browser-content {
    margin: 0.5rem;
    flex: 0 1 auto;
    height: auto;
    max-height: var(--crm-browser-list-height, 230px);
    min-height: 0;

    overflow-y: auto;
    overflow-x: hidden;

    scrollbar-color:
      color-mix(
        in srgb,
        var(--crm-accent, #34d399) 55%,
        transparent
      )
      var(
        --crm-background-secondary,
        var(--secondary-background-color)
      );

    scrollbar-width: thin;
  }

  .media-browser-list {
    height: auto;
    min-height: 0;
  }

  .media-browser-actions {
    min-height: 100%;
  }

  /*
   * Alerts
   */

  ha-alert {
    display: block;
    margin-bottom: 0.25rem;
    color: var(--crm-text, var(--primary-text-color));
  }

  *[hide] {
    display: none;
  }

  @media (prefers-reduced-motion: reduce) {
    .media-browser-control-filter ha-textfield,
    .media-browser-control-filter ha-select,
    .media-browser-controls ha-icon-button {
      transition: none;
    }
  }

`;
