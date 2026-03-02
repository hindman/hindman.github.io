// llama-whichkey.js -- which-key overlay bar.
//
// Renders a fixed bar at the bottom of the viewport listing available
// key completions when the user has pressed a prefix key and is waiting
// to press a second key.
//
// Receives:
//   prefix:      the pending prefix key string (e.g. 'l'), or null
//   completions: { key: { handler, desc }, ... }, or null
//
// Hidden when prefix is null. The keyboard controller manages the delay
// before calling onPendingKey, so this component just shows or hides.

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
      gap: 1.5rem;
      flex-wrap: wrap;
      z-index: 100;
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
    .warning {
      color: #c8a97e;
      font-style: italic;
    }
  `;

  static properties = {
    prefix:        { type: String },
    completions:   { type: Object },
    windowFocused: { type: Boolean },
  };

  constructor() {
    super();
    this.prefix        = null;
    this.completions   = null;
    this.windowFocused = true;
  }

  render() {
    if (!this.windowFocused) {
      return html`
        <div class="bar">
          <span class="warning">
            Keyboard control inactive — click anywhere in the app to restore
          </span>
        </div>
      `;
    }
    if (!this.prefix || !this.completions) return html``;
    const items = Object.entries(this.completions).map(([key, { desc }]) => html`
      <span class="item">
        <span class="key">${this.prefix}${key}</span>
        <span class="desc">${desc}</span>
      </span>
    `);
    return html`<div class="bar">${items}</div>`;
  }
}

customElements.define('llama-whichkey', LlamaWhichkey);
