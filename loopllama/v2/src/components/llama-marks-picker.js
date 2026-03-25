// llama-marks-picker.js -- modal to pick a mark.
//
// Props:
//   marks: Array of Mark objects
//   mode:  'jump' | 'edit' | 'delete'
//
// Events fired (composed, bubbling):
//   ll-jump-mark       { id, time }  -- mode='jump': jump to selected mark
//   ll-pick-mark-edit  { id }        -- mode='edit': open edit modal for mark
//   ll-delete-mark     { id }        -- mode='delete': delete the mark
//
// API:
//   show(mode?) / hide()

import { LitElement, html, css } from 'lit';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import './llama-modal.js';

const TITLES = {
  jump:   'Jump to Mark',
  edit:   'Edit Mark',
  delete: 'Delete Mark',
};

class LlamaMarksPicker extends LitElement {
  static styles = css`
    :host {
      --width: 44rem;
    }
    .filter-wrap {
      margin-bottom: 0.75rem;
    }
    .mark-list {
      max-height: 480px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    .mark-row {
      cursor: pointer;
      padding: 0.4rem 0.6rem;
      border-radius: var(--ll-radius, 3px);
      border: 1px solid var(--ll-border, #444);
    }
    .mark-row:hover {
      background: var(--ll-surface-raised, #2a2a2a);
      border-color: var(--ll-accent, #7ec8e3);
    }
    .mark-row.selected {
      background: var(--ll-surface-raised, #2a2a2a);
      border-color: var(--ll-accent, #7ec8e3);
      outline: none;
    }
    .mark-row.mode-delete:hover,
    .mark-row.mode-delete.selected {
      border-color: var(--sl-color-danger-600, #c0392b);
    }
    .mark-primary {
      font-size: var(--ll-text-base, 1.05rem);
    }
    .mark-sub {
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
    marks:   { type: Array },
    mode:    { type: String },
    _filter: { state: true },
    _selIdx: { state: true },
  };

  constructor() {
    super();
    this.marks   = [];
    this.mode    = 'jump';
    this._filter = '';
    this._selIdx = 0;
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

  _onFilterInput(e) {
    this._filter = e.target.value;
    this._selIdx = 0;
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

  _scrollSelectedIntoView() {
    this.updateComplete.then(() => {
      const list = this.renderRoot.querySelector('.mark-list');
      const row  = list?.querySelector('.mark-row.selected');
      row?.scrollIntoView({ block: 'nearest' });
    });
  }

  _select(mark) {
    const mode = this.mode;
    if (mode === 'jump') {
      this.dispatchEvent(new CustomEvent('ll-jump-mark', {
        detail: { id: mark.id, time: mark.time },
        bubbles: true, composed: true,
      }));
    } else if (mode === 'edit') {
      this.dispatchEvent(new CustomEvent('ll-pick-mark-edit', {
        detail: { id: mark.id },
        bubbles: true, composed: true,
      }));
    } else if (mode === 'delete') {
      this.dispatchEvent(new CustomEvent('ll-delete-mark', {
        detail: { id: mark.id },
        bubbles: true, composed: true,
      }));
    }
    this.hide();
  }

  _filtered() {
    const q = this._filter.trim().toLowerCase();
    if (!q) return this.marks;
    return this.marks.filter(m =>
      (m.name || '').toLowerCase().includes(q) ||
      _fmtTime(m.time).includes(q)
    );
  }

  render() {
    const filtered = this._filtered();
    const title    = TITLES[this.mode] ?? 'Select Mark';
    const isDelete = this.mode === 'delete';
    return html`
      <llama-modal label=${title} @ll-modal-initial-focus=${this._onInitialFocus}>
        <div class="filter-wrap">
          <sl-input autocomplete="off"
            placeholder="Filter by name or time…"
            .value=${this._filter}
            @sl-input=${this._onFilterInput}
            @keydown=${this._onFilterKeyDown}
            clearable
            autocomplete="off"
          ></sl-input>
        </div>
        <div class="mark-list">
          ${filtered.length
            ? filtered.map((m, i) => html`
                <div
                  class="mark-row ${isDelete ? 'mode-delete' : ''} ${i === this._selIdx ? 'selected' : ''}"
                  @click=${() => this._select(m)}
                >
                  <div class="mark-primary">${_fmtTime(m.time)}</div>
                  ${m.name
                    ? html`<div class="mark-sub">${m.name}</div>`
                    : ''}
                </div>
              `)
            : html`<div class="empty">No marks${this._filter ? ' match.' : ' set.'}</div>`}
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

customElements.define('llama-marks-picker', LlamaMarksPicker);
