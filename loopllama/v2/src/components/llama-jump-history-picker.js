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
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import './llama-modal.js';

class LlamaJumpHistoryPicker extends LitElement {
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
    .jump-idx {
      font-size: var(--ll-text-sm, 0.85rem);
      color: var(--ll-text-dim, #aaa);
    }
    .empty {
      color: var(--ll-text-muted, #666);
      font-size: var(--ll-text-sm, 0.85rem);
      padding: 0.5rem;
    }
  `;

  static properties = {
    jumps:   { type: Array },
    _filter: { state: true },
    _selIdx: { state: true },
  };

  constructor() {
    super();
    this.jumps   = [];
    this._filter = '';
    this._selIdx = 0;
  }

  show() {
    this._filter = '';
    this._selIdx = 0;
    this.renderRoot.querySelector('llama-modal')?.show();
  }

  hide() {
    this.renderRoot.querySelector('llama-modal')?.hide();
  }

  _onInitialFocus() {
    this.renderRoot.querySelector('sl-input')?.focus();
  }

  _onFilterInput(e) {
    this._filter = e.target.value;
    this._selIdx = 0;
  }

  _onFilterKeyDown(e) {
    const items = this._filtered();
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      this._selIdx = Math.min(this._selIdx + 1, items.length - 1);
      this._scrollSelectedIntoView();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      this._selIdx = Math.max(this._selIdx - 1, 0);
      this._scrollSelectedIntoView();
    } else if (e.key === 'Enter') {
      const target = items[this._selIdx] ?? items[0];
      if (target) this._select(target);
    }
  }

  _scrollSelectedIntoView() {
    this.updateComplete.then(() => {
      const list = this.renderRoot.querySelector('.jump-list');
      const row  = list?.querySelector('.jump-row.selected');
      row?.scrollIntoView({ block: 'nearest' });
    });
  }

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
      .map((time, idx) => ({ time, idx }))
      .reverse();
    const q = this._filter.trim().toLowerCase();
    if (!q) return reversed;
    return reversed.filter(e => _fmtTime(e.time).includes(q));
  }

  render() {
    const items = this._filtered();
    return html`
      <llama-modal label="Jump History" @ll-modal-initial-focus=${this._onInitialFocus}>
        <div class="filter-wrap">
          <sl-input
            placeholder="Filter by time…"
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
                  <span class="jump-time">${_fmtTime(entry.time)}</span>
                  <span class="jump-idx">#${entry.idx + 1}</span>
                </div>
              `)
            : html`<div class="empty">No jump history${this._filter ? ' matches.' : '.'}</div>`}
        </div>
        <div slot="footer">
          <sl-button @click=${this.hide}>Cancel</sl-button>
        </div>
      </llama-modal>
    `;
  }
}

// Format seconds as m:ss.
function _fmtTime(secs) {
  if (secs == null || isNaN(secs)) return '?';
  const s = Math.floor(secs);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

customElements.define('llama-jump-history-picker', LlamaJumpHistoryPicker);
