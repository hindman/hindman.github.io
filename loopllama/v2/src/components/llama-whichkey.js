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

// Map event.key values to user-facing display strings.
const KEY_DISPLAY = { 'Backspace': '⌫' };
function displayKey(key) { return KEY_DISPLAY[key] ?? key; }

// Context labels shown at the left of which-key completions rows.
const PREFIX_LABELS = {
  v: 'Video',
  c: 'Chapter',
  s: 'Section',
  l: 'Loop',
  x: 'Scratch',
  m: 'Mark',
  d: 'Data',
  j: 'Jump',
  a: 'App',
  '`': 'Menus',
  '[': 'Scratch start',
  ']': 'Scratch end',
};

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
      column-gap: 1.5rem;
      row-gap: 0.15rem;
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
    .prefix-label {
      color: #e3a857;
      font-weight: bold;
      margin-right: 0.25rem;
    }
    .status {
      color: var(--ll-text-dim, #aaa);
    }
  `;

  static properties = {
    prefix:            { type: String },
    completions:       { type: Object },
    count:             { type: Number },
    windowFocused:     { type: Boolean },
    editScratchActive: { type: Boolean },
    warningMsg:        { type: String },
    errorMsg:          { type: String },
    statusMsg:         { type: String },
  };

  constructor() {
    super();
    this.prefix            = null;
    this.completions       = null;
    this.count             = null;
    this.windowFocused     = true;
    this.editScratchActive = false;
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
              Key bindings inactive.
            </span>
          </div>
        </div>
      `;
    }

    // Priority 3+4: warning, and/or edit-scratch cheatsheet.
    // When edit-scratch is active, always show the cheatsheet; a simultaneous
    // warning appears above it on a second row.
    if (this.editScratchActive) {
      const cheatRow = html`
        <div class="row">
          <span class="cheat-label">Scratch edit</span>
          ${this._kbItem('Tab', 'Toggle focus')}
          ${this._kbItem('x', 'Toggle looping')}
          ${this._kbItem('Left', 'Decrease')}
          ${this._kbItem('Right', 'Increase')}
          ${this._kbItem('Down', 'Delta decrease')}
          ${this._kbItem('Up', 'Delta increase')}
          ${this._kbItem('⌫', 'Reset')}
          ${this._kbItem('Space', 'Play/pause')}
          ${this._kbItem('0-9', 'Time')}
          ${this._kbItem('Enter/Esc', 'Exit')}
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

    // Priority 5: which-key completions (with optional count prefix).
    if (this.prefix && this.completions) {
      const label = PREFIX_LABELS[this.prefix];
      const labelItem = label
        ? html`<span class="prefix-label">${label}</span>`
        : null;
      const countItem = this.count != null
        ? html`<span class="item"><span class="key">Count:</span><span class="state-val">${this.count}</span></span>`
        : null;
      const items = Object.entries(this.completions).map(([key, { desc }]) => html`
        <span class="item">
          <span class="key">${this.prefix}${displayKey(key)}</span>
          <span class="desc">${desc}</span>
        </span>
      `);
      return html`<div class="bar"><div class="row">${labelItem}${countItem}${items}</div></div>`;
    }

    // Priority 6: count only (digits typed, awaiting command key).
    if (this.count != null) {
      return html`
        <div class="bar">
          <div class="row">
            <span class="item">
              <span class="key">Count:</span>
              <span class="state-val">${this.count}</span>
            </span>
          </div>
        </div>
      `;
    }

    // Priority 7: status.
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
