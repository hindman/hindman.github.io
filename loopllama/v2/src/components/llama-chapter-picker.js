// llama-chapter-picker.js -- modal to pick a chapter.
//
// Props:
//   chapters: Array of Chapter objects ({ id, name, start, end })
//   mode:     'delete' | 'jump'
//
// Events fired (composed, bubbling):
//   ll-delete-chapter { id }        -- mode='delete': delete the chapter
//   ll-jump-chapter   { id, time }  -- mode='jump': seek to chapter start
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
  delete: 'Delete chapter',
  jump:   'Jump to chapter',
};

class LlamaChapterPicker extends FilterPickerMixin(LitElement) {
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
    .chapter-row.active {
      border-color: var(--ll-accent-warm, #e3a857);
    }
    .chapter-row.active.selected {
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
  };

  constructor() {
    super();
    this.chapters        = [];
    this.mode            = 'jump';
    this.activeChapterId = null;
  }

  get _listClass() { return 'chapter-list'; }
  get _rowClass()  { return 'chapter-row'; }

  _select(chapter) {
    if (this.mode === 'delete') {
      this.dispatchEvent(new CustomEvent('ll-delete-chapter', {
        detail: { id: chapter.id },
        bubbles: true, composed: true,
      }));
    } else {
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
      (!c.name && fmtTimePlain(c.start).includes(q))
    );
  }

  render() {
    const filtered = this._filtered();
    const title    = TITLES[this.mode] ?? 'Select Chapter';
    const isDelete = this.mode === 'delete';
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
        <div class="chapter-list">
          ${filtered.length
            ? filtered.map((c, i) => html`
                <div
                  class="chapter-row
                    ${isDelete ? 'mode-delete' : ''}
                    ${c.id === this.activeChapterId ? 'active' : ''}
                    ${i === this._selIdx ? 'selected' : ''}"
                  @click=${() => this._select(c)}
                >
                  <div class="chapter-primary">${c.name || fmtTimePlain(c.start)}</div>
                  ${c.name
                    ? html`<div class="chapter-sub">${fmtTimePlain(c.start)}</div>`
                    : ''}
                </div>
              `)
            : html`<div class="empty">No chapters${this._filter ? ' match.' : ' set.'}</div>`}
        </div>
      </llama-modal>
    `;
  }
}

customElements.define('llama-chapter-picker', LlamaChapterPicker);
