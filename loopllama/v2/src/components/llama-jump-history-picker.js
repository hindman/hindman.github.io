// llama-jump-history-picker.js -- modal to navigate jump history.
//
// Props:
//   jumps: Array of time values (seconds), oldest-first
//
// Events fired (composed, bubbling):
//   ll-jump-history  { time }  -- user selected a history entry
//
// API:
//   show() / hide()

import { LitElement, html, css } from 'lit';
import { FilterPickerMixin } from './filter-picker-mixin.js';
import { fmtTimePlain } from '../format.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import './llama-modal.js';

class LlamaJumpHistoryPicker extends FilterPickerMixin(LitElement) {
  static styles = css`
    :host {
      --width: 32rem;
    }
    .filter-wrap {
      margin-bottom: 0.75rem;
    }
    .jump-list {
      max-height: 480px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    .jump-row {
      cursor: pointer;
      padding: 0.4rem 0.6rem;
      border-radius: var(--ll-radius, 3px);
      border: 1px solid var(--ll-border, #444);
      display: flex;
      align-items: baseline;
      gap: 0.75rem;
    }
    .jump-row:hover {
      background: var(--ll-surface-raised, #2a2a2a);
      border-color: var(--ll-accent, #7ec8e3);
    }
    .jump-row.selected {
      background: var(--ll-surface-raised, #2a2a2a);
      border-color: var(--ll-accent, #7ec8e3);
      outline: none;
    }
    .jump-time {
      font-size: var(--ll-text-base, 1.05rem);
      font-variant-numeric: tabular-nums;
    }
    .empty {
      color: var(--ll-text-muted, #666);
      font-size: var(--ll-text-sm, 0.85rem);
      padding: 0.5rem;
    }
  `;

  static properties = {
    jumps:   { type: Array },
  };

  constructor() {
    super();
    this.jumps   = [];
  }

  get _listClass() { return 'jump-list'; }
  get _rowClass()  { return 'jump-row'; }

  _select(entry) {
    this.dispatchEvent(new CustomEvent('ll-jump-history', {
      detail: { time: entry.time },
      bubbles: true, composed: true,
    }));
    this.hide();
  }

  // Return entries newest-first, filtered by time string if a query is set.
  _filtered() {
    // Reverse so newest is at top; include original index for display.
    const reversed = [...this.jumps]
      .map(time => ({ time }))
      .reverse();
    const q = this._filter.trim().toLowerCase();
    if (!q) return reversed;
    return reversed.filter(e => fmtTimePlain(e.time).includes(q));
  }

  render() {
    const items = this._filtered();
    return html`
      <llama-modal label="Jump history" @ll-modal-initial-focus=${this._onInitialFocus}>
        <div class="filter-wrap">
          <sl-input autocomplete="off"
            placeholder="Filter by time"
            .value=${this._filter}
            @sl-input=${this._onFilterInput}
            @keydown=${this._onFilterKeyDown}
            clearable
            autocomplete="off"
          ></sl-input>
        </div>
        <div class="jump-list">
          ${items.length
            ? items.map((entry, i) => html`
                <div
                  class="jump-row ${i === this._selIdx ? 'selected' : ''}"
                  @click=${() => this._select(entry)}
                >
                  <span class="jump-time">${fmtTimePlain(entry.time)}</span>
                </div>
              `)
            : html`<div class="empty">No jump history${this._filter ? ' matches.' : '.'}</div>`}
        </div>
      </llama-modal>
    `;
  }
}


customElements.define('llama-jump-history-picker', LlamaJumpHistoryPicker);
