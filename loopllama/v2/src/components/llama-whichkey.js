// llama-whichkey.js -- footer bar handling all message types.
//
// Renders a fixed bar at the bottom of the viewport. Handles (in priority order):
//   1. Keyboard inactive warning (windowFocused = false) -- overrides all
//   2. Edit-scratch cheatsheet (editScratchActive = true) -- top row
//      + optional warningMsg on a second row
//   3. Which-key completions (prefix + completions pending)
//   4. Warning message (warningMsg, amber)
//   5. Error message (errorMsg, red -- serious problems only)
//
// Hidden when none of the above apply.

import { LitElement, html, css } from 'lit';

class LlamaWhichkey extends LitElement {
  static styles = css`
    .bar {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: #2a2a2a;
      border-top: 1px solid #444;
      padding: 0.35rem 1rem;
      font-family: monospace;
      font-size: 0.85rem;
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
      z-index: 100;
    }
    .row {
      display: flex;
      gap: 1.5rem;
      flex-wrap: wrap;
      align-items: baseline;
    }
    .item {
      display: flex;
      gap: 0.4rem;
      align-items: baseline;
    }
    .key {
      color: #7ec8e3;
      font-weight: bold;
    }
    .desc {
      color: #999;
    }
    .state-val {
      color: #e0e0e0;
    }
    .warning {
      color: #c8a97e;
      font-style: italic;
    }
    .error {
      color: #e37e7e;
      font-style: italic;
    }
    .cheat-label {
      color: #e3a857;
      font-weight: bold;
    }
    .status {
      color: var(--ll-text-dim, #aaa);
    }
  `;

  static properties = {
    prefix:            { type: String },
    completions:       { type: Object },
    windowFocused:     { type: Boolean },
    editScratchActive: { type: Boolean },
    editScratchFocus:  { type: String },
    editScratchDelta:  { type: Number },
    warningMsg:        { type: String },
    errorMsg:          { type: String },
    statusMsg:         { type: String },
  };

  constructor() {
    super();
    this.prefix            = null;
    this.completions       = null;
    this.windowFocused     = true;
    this.editScratchActive = false;
    this.editScratchFocus  = 'start';
    this.editScratchDelta  = 5;
    this.warningMsg        = null;
    this.errorMsg          = null;
    this.statusMsg         = null;
  }

  _kbItem(key, desc) {
    return html`
      <span class="item">
        <span class="key">${key}</span>
        <span class="desc">${desc}</span>
      </span>
    `;
  }

  render() {
    // Priority 1: error (overrides everything).
    if (this.errorMsg) {
      return html`
        <div class="bar">
          <div class="row"><span class="error">${this.errorMsg}</span></div>
        </div>
      `;
    }

    // Priority 2: keyboard inactive.
    if (!this.windowFocused) {
      return html`
        <div class="bar">
          <div class="row">
            <span class="warning">
              Keyboard control inactive — click anywhere in the app to restore
            </span>
          </div>
        </div>
      `;
    }

    // Priority 3+4: warning, and/or edit-scratch cheatsheet.
    // When edit-scratch is active, always show the cheatsheet; a simultaneous
    // warning appears above it on a second row.
    if (this.editScratchActive) {
      const focusLabel = this.editScratchFocus === 'start' ? 'Start' : 'End';
      const cheatRow = html`
        <div class="row">
          <span class="cheat-label">Edit Loop</span>
          ${this._kbItem('Tab', 'toggle focus')}
          ${this._kbItem('←/→', 'nudge')}
          ${this._kbItem('↑/↓', 'delta')}
          ${this._kbItem('Space', 'play/pause')}
          ${this._kbItem('Bsp', 'reset')}
          ${this._kbItem('0-9/:', 'type time')}
          ${this._kbItem('Enter/Esc', 'done')}
          <span class="item">
            <span class="desc">Focus:</span>
            <span class="state-val">${focusLabel}</span>
          </span>
          <span class="item">
            <span class="desc">Delta:</span>
            <span class="state-val">${this.editScratchDelta}s</span>
          </span>
        </div>
      `;
      if (this.warningMsg) {
        return html`
          <div class="bar">
            <div class="row"><span class="warning">${this.warningMsg}</span></div>
            ${cheatRow}
          </div>
        `;
      }
      return html`<div class="bar">${cheatRow}</div>`;
    }

    if (this.warningMsg) {
      return html`
        <div class="bar">
          <div class="row"><span class="warning">${this.warningMsg}</span></div>
        </div>
      `;
    }

    // Priority 5: which-key completions.
    if (this.prefix && this.completions) {
      const items = Object.entries(this.completions).map(([key, { desc }]) => html`
        <span class="item">
          <span class="key">${this.prefix}${key}</span>
          <span class="desc">${desc}</span>
        </span>
      `);
      return html`<div class="bar"><div class="row">${items}</div></div>`;
    }

    // Priority 6: status.
    if (this.statusMsg) {
      return html`
        <div class="bar">
          <div class="row"><span class="status">${this.statusMsg}</span></div>
        </div>
      `;
    }

    return html``;
  }
}

customElements.define('llama-whichkey', LlamaWhichkey);
