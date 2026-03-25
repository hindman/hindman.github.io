// llama-loop-picker.js -- modal to pick a saved loop.
//
// Props:
//   namedLoops: Array of Loop objects (is_scratch=false)
//   loopSource: string | null  -- id of the currently loaded loop
//   mode:       'jump' | 'load' | 'delete'
//
// Events fired (composed, bubbling):
//   ll-jump-loop    { id, start }   -- mode='jump': seek to loop's start
//   ll-load-loop    { id: string }  -- mode='load': user selected a loop
//   ll-delete-loop  { id: string }  -- mode='delete': delete the loop
//
// API:
//   show(mode?) / hide()

import { LitElement, html, css } from 'lit';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import './llama-modal.js';

const TITLES = {
  jump:   'Jump to Loop',
  load:   'Load Loop',
  delete: 'Delete Loop',
};

class LlamaLoopPicker extends LitElement {
  static styles = css`
    :host {
      --width: 52rem;
    }
    .filter-wrap {
      margin-bottom: 0.75rem;
    }
    .loop-list {
      max-height: 520px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    .loop-row {
      cursor: pointer;
      padding: 0.4rem 0.6rem;
      border-radius: var(--ll-radius, 3px);
      border: 1px solid var(--ll-border, #444);
    }
    .loop-row:hover {
      background: var(--ll-surface-raised, #2a2a2a);
      border-color: var(--ll-accent, #7ec8e3);
    }
    .loop-row.active {
      border-color: var(--ll-accent-warm, #e3a857);
    }
    .loop-row.selected {
      background: var(--ll-surface-raised, #2a2a2a);
      border-color: var(--ll-accent, #7ec8e3);
      outline: none;
    }
    .loop-row.active.selected {
      border-color: var(--ll-accent-warm, #e3a857);
      box-shadow: 0 0 0 1px var(--ll-accent, #7ec8e3);
    }
    .loop-row.mode-delete:hover,
    .loop-row.mode-delete.selected {
      border-color: var(--sl-color-danger-600, #c0392b);
    }
    .loop-primary {
      font-size: var(--ll-text-base, 1.05rem);
    }
    .loop-sub {
      font-size: var(--ll-text-sm, 0.85rem);
      color: var(--ll-text-dim, #aaa);
      margin-top: 0.1rem;
    }
    .empty {
      color: var(--ll-text-muted, #666);
      font-size: var(--ll-text-sm, 0.85rem);
      padding: 0.5rem;
    }
  `;

  static properties = {
    namedLoops: { type: Array },
    loopSource: { type: String },
    mode:       { type: String },
    _filter:    { state: true },
    _selIdx:    { state: true },
  };

  constructor() {
    super();
    this.namedLoops = [];
    this.loopSource = null;
    this.mode       = 'load';
    this._filter    = '';
    this._selIdx    = 0;
  }

  show(mode) {
    if (mode) this.mode = mode;
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

  _onFilterKeyDown(e) {
    const filtered = this._filtered();
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      this._selIdx = Math.min(this._selIdx + 1, filtered.length - 1);
      this._scrollSelectedIntoView();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      this._selIdx = Math.max(this._selIdx - 1, 0);
      this._scrollSelectedIntoView();
    } else if (e.key === 'Enter') {
      const target = filtered[this._selIdx] ?? filtered[0];
      if (target) this._select(target);
    }
  }

  _onFilterInput(e) {
    this._filter = e.target.value;
    this._selIdx = 0;
  }

  _scrollSelectedIntoView() {
    this.updateComplete.then(() => {
      const list = this.renderRoot.querySelector('.loop-list');
      const row  = list?.querySelector('.loop-row.selected');
      row?.scrollIntoView({ block: 'nearest' });
    });
  }

  _select(loop) {
    const mode = this.mode;
    if (mode === 'jump') {
      this.dispatchEvent(new CustomEvent('ll-jump-loop', {
        detail: { id: loop.id, start: loop.start },
        bubbles: true, composed: true,
      }));
    } else if (mode === 'delete') {
      this.dispatchEvent(new CustomEvent('ll-delete-loop', {
        detail: { id: loop.id },
        bubbles: true, composed: true,
      }));
    } else {
      this.dispatchEvent(new CustomEvent('ll-load-loop', {
        detail: { id: loop.id },
        bubbles: true, composed: true,
      }));
    }
    this.hide();
  }

  _filtered() {
    const q = this._filter.trim().toLowerCase();
    if (!q) return this.namedLoops;
    return this.namedLoops.filter(l =>
      (l.name || '').toLowerCase().includes(q)
    );
  }

  // Display label: name if present, otherwise positional rank "#N" by start.
  _displayLabel(loop) {
    if (loop.name) return loop.name;
    const rank = this.namedLoops.indexOf(loop) + 1;
    return `#${rank}`;
  }

  // Sub-label: start–end range as m:ss–m:ss.
  _subLabel(loop) {
    return `${_fmtTime(loop.start)} – ${_fmtTime(loop.end)}`;
  }

  render() {
    const filtered  = this._filtered();
    const title     = TITLES[this.mode] ?? 'Select Loop';
    const isDelete  = this.mode === 'delete';
    return html`
      <llama-modal label=${title} @ll-modal-initial-focus=${this._onInitialFocus}>
        <div class="filter-wrap">
          <sl-input autocomplete="off"
            placeholder="Filter by name…"
            .value=${this._filter}
            @sl-input=${this._onFilterInput}
            @keydown=${this._onFilterKeyDown}
            clearable
            autocomplete="off"
          ></sl-input>
        </div>
        <div class="loop-list">
          ${filtered.length
            ? filtered.map((l, i) => html`
                <div
                  class="loop-row
                    ${isDelete ? 'mode-delete' : ''}
                    ${l.id === this.loopSource ? 'active' : ''}
                    ${i === this._selIdx ? 'selected' : ''}"
                  @click=${() => this._select(l)}
                >
                  <div class="loop-primary">${this._displayLabel(l)}</div>
                  <div class="loop-sub">${this._subLabel(l)}</div>
                </div>
              `)
            : html`<div class="empty">No loops${this._filter ? ' match.' : ' saved.'}</div>`}
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

customElements.define('llama-loop-picker', LlamaLoopPicker);
