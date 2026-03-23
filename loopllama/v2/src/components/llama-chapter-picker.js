// llama-chapter-picker.js -- modal to pick a chapter.
//
// Props:
//   chapters:        Array of Chapter objects ({ id, name, start, end })
//   mode:            'open' | 'delete' | 'jump'
//   activeChapterId: String | null (highlights the current active chapter)
//
// Events fired (composed, bubbling):
//   ll-open-chapter   { id }        -- mode='open': set as active chapter
//   ll-delete-chapter { id }        -- mode='delete': delete the chapter
//   ll-jump-chapter   { id, time }  -- mode='jump': seek to chapter start
//
// API:
//   show(mode?) / hide()

import { LitElement, html, css } from 'lit';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import './llama-modal.js';

const TITLES = {
  open:   'Open Chapter',
  delete: 'Delete Chapter',
  jump:   'Jump to Chapter',
};

class LlamaChapterPicker extends LitElement {
  static styles = css`
    :host {
      --width: 44rem;
    }
    .filter-wrap {
      margin-bottom: 0.75rem;
    }
    .chapter-list {
      max-height: 480px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    .chapter-row {
      cursor: pointer;
      padding: 0.4rem 0.6rem;
      border-radius: var(--ll-radius, 3px);
      border: 1px solid var(--ll-border, #444);
    }
    .chapter-row:hover {
      background: var(--ll-surface-raised, #2a2a2a);
      border-color: var(--ll-accent, #7ec8e3);
    }
    .chapter-row.selected {
      background: var(--ll-surface-raised, #2a2a2a);
      border-color: var(--ll-accent, #7ec8e3);
      outline: none;
    }
    .chapter-row.active-chapter {
      border-color: var(--ll-accent-warm, #e3a857);
    }
    .chapter-row.active-chapter.selected {
      border-color: var(--ll-accent-warm, #e3a857);
      box-shadow: 0 0 0 1px var(--ll-accent, #7ec8e3);
    }
    .chapter-row.mode-delete:hover,
    .chapter-row.mode-delete.selected {
      border-color: var(--sl-color-danger-600, #c0392b);
    }
    .chapter-primary {
      font-size: var(--ll-text-base, 1.05rem);
    }
    .chapter-sub {
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
    chapters:        { type: Array },
    mode:            { type: String },
    activeChapterId: { type: String },
    _filter:         { state: true },
    _selIdx:         { state: true },
  };

  constructor() {
    super();
    this.chapters        = [];
    this.mode            = 'open';
    this.activeChapterId = null;
    this._filter         = '';
    this._selIdx         = 0;
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
      const list = this.renderRoot.querySelector('.chapter-list');
      const row  = list?.querySelector('.chapter-row.selected');
      row?.scrollIntoView({ block: 'nearest' });
    });
  }

  _select(chapter) {
    const mode = this.mode;
    if (mode === 'open') {
      this.dispatchEvent(new CustomEvent('ll-open-chapter', {
        detail: { id: chapter.id },
        bubbles: true, composed: true,
      }));
    } else if (mode === 'delete') {
      this.dispatchEvent(new CustomEvent('ll-delete-chapter', {
        detail: { id: chapter.id },
        bubbles: true, composed: true,
      }));
    } else if (mode === 'jump') {
      this.dispatchEvent(new CustomEvent('ll-jump-chapter', {
        detail: { id: chapter.id, time: chapter.start },
        bubbles: true, composed: true,
      }));
    }
    this.hide();
  }

  _filtered() {
    const q = this._filter.trim().toLowerCase();
    if (!q) return this.chapters;
    return this.chapters.filter(c =>
      (c.name || '').toLowerCase().includes(q) ||
      _fmtRange(c.start, c.end).includes(q)
    );
  }

  render() {
    const filtered = this._filtered();
    const title    = TITLES[this.mode] ?? 'Select Chapter';
    const isDelete = this.mode === 'delete';
    return html`
      <llama-modal label=${title} @ll-modal-initial-focus=${this._onInitialFocus}>
        <div class="filter-wrap">
          <sl-input
            placeholder="Filter by name or time…"
            .value=${this._filter}
            @sl-input=${this._onFilterInput}
            @keydown=${this._onFilterKeyDown}
            clearable
            autocomplete="off"
          ></sl-input>
        </div>
        <div class="chapter-list">
          ${filtered.length
            ? filtered.map((c, i) => html`
                <div
                  class="chapter-row
                    ${isDelete ? 'mode-delete' : ''}
                    ${i === this._selIdx ? 'selected' : ''}
                    ${c.id === this.activeChapterId ? 'active-chapter' : ''}"
                  @click=${() => this._select(c)}
                >
                  <div class="chapter-primary">${c.name || _fmtRange(c.start, c.end)}</div>
                  ${c.name
                    ? html`<div class="chapter-sub">${_fmtRange(c.start, c.end)}</div>`
                    : ''}
                </div>
              `)
            : html`<div class="empty">No chapters${this._filter ? ' match.' : ' set.'}</div>`}
        </div>
        <div slot="footer">
          <sl-button @click=${this.hide}>Cancel</sl-button>
        </div>
      </llama-modal>
    `;
  }
}

function _fmtTime(secs) {
  if (secs == null || isNaN(secs)) return '?';
  const s = Math.floor(secs);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

function _fmtRange(start, end) {
  return `${_fmtTime(start)} → ${_fmtTime(end)}`;
}

customElements.define('llama-chapter-picker', LlamaChapterPicker);
