// llama-loop-picker.js -- modal to pick a saved loop.
//
// Props:
//   namedLoops:     Array of named Loop objects
//   loopSource:     string | null  -- id of the currently loaded loop
//   candidateLoops: Array | null   -- when set, overrides namedLoops for select modes
//   mode:           'jump' | 'delete' | 'select-edit' | 'select-scratch' | 'select-zoom'
//
// Events fired (composed, bubbling):
//   ll-jump-loop   { id, start }  -- mode='jump': seek to loop's start
//   ll-delete-loop { id }         -- mode='delete': delete the loop
//   ll-select-loop { loop }       -- mode='select-*': loop chosen for disambiguation
//
// API:
//   show(mode?) / hide()

import { LitElement, html, css } from 'lit';
import { FilterPickerMixin } from './filter-picker-mixin.js';
import { fmtTimePlain } from '../format.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import './llama-modal.js';

const TITLES = {
  jump:            'Jump to loop',
  delete:          'Delete loop',
  'select-edit':   'Select loop to edit',
  'select-scratch': 'Select loop to scratch',
  'select-zoom':   'Select loop to zoom',
};

class LlamaLoopPicker extends FilterPickerMixin(LitElement) {
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
    .loop-row.selected {
      background: var(--ll-surface-raised, #2a2a2a);
      border-color: var(--ll-accent, #7ec8e3);
      outline: none;
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
    .loop-suffix {
      color: var(--ll-accent-warm, #e3a857);
    }
    .empty {
      color: var(--ll-text-muted, #666);
      font-size: var(--ll-text-sm, 0.85rem);
      padding: 0.5rem;
    }
  `;

  static properties = {
    namedLoops:     { type: Array },
    loopSource:     { type: String },
    candidateLoops: { type: Array },
    mode:           { type: String },
  };

  constructor() {
    super();
    this.namedLoops     = [];
    this.loopSource     = null;
    this.candidateLoops = null;
    this.mode           = 'load';
  }

  get _listClass() { return 'loop-list'; }
  get _rowClass()  { return 'loop-row'; }

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
    } else if (mode.startsWith('select-')) {
      this.dispatchEvent(new CustomEvent('ll-select-loop', {
        detail: { loop },
        bubbles: true, composed: true,
      }));
    }
    this.hide();
  }

  _filtered() {
    const list = this.mode.startsWith('select-') && this.candidateLoops
      ? this.candidateLoops
      : this.namedLoops;
    const q = this._filter.trim().toLowerCase();
    if (!q) return list;
    return list.filter(l =>
      (l.name || '').toLowerCase().includes(q) ||
      (!l.name && _fmtRange(l.start, l.end).includes(q))
    );
  }

  // Range as m:ss – m:ss.
  _range(loop) {
    return _fmtRange(loop.start, loop.end);
  }

  render() {
    const filtered  = this._filtered();
    const title     = TITLES[this.mode] ?? 'Select Loop';
    const isDelete  = this.mode === 'delete';
    const isSelect  = this.mode.startsWith('select-');
    return html`
      <llama-modal label=${title} @ll-modal-initial-focus=${this._onInitialFocus}>
        <div class="filter-wrap">
          <sl-input autocomplete="off"
            placeholder="Filter by name or time"
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
                    ${i === this._selIdx ? 'selected' : ''}"
                  @click=${() => this._select(l)}
                >
                  <div class="loop-primary">${l.name || '—'}</div>
                  <div class="loop-sub">${this._range(l)}${isSelect || l.id === this.loopSource
                    ? html`<span class="loop-suffix"> [current]</span>`
                    : ''}</div>
                </div>
              `)
            : html`<div class="empty">No loops${this._filter ? ' match.' : ' saved.'}</div>`}
        </div>
      </llama-modal>
    `;
  }
}

function _fmtRange(start, end) {
  return `${fmtTimePlain(start)} – ${fmtTimePlain(end)}`;
}

customElements.define('llama-loop-picker', LlamaLoopPicker);
