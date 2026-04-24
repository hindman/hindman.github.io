// llama-sections-picker.js -- modal to pick a section.
//
// Props:
//   sections: Array of Section objects
//   mode:     'jump' | 'delete'
//
// Events fired (composed, bubbling):
//   ll-jump-section   { id, time }  -- mode='jump': seek to section start
//   ll-delete-section { id }        -- mode='delete': delete the section
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
  jump:   'Jump to section',
  delete: 'Delete section',
};

class LlamaSectionsPicker extends FilterPickerMixin(LitElement) {
  static styles = css`
    :host {
      --width: 44rem;
    }
    .filter-wrap {
      margin-bottom: 0.75rem;
    }
    .section-list {
      max-height: 480px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    .section-row {
      cursor: pointer;
      padding: 0.4rem 0.6rem;
      border-radius: var(--ll-radius, 3px);
      border: 1px solid var(--ll-border, #444);
    }
    .section-row:hover {
      background: var(--ll-surface-raised, #2a2a2a);
      border-color: var(--ll-accent, #7ec8e3);
    }
    .section-row.selected {
      background: var(--ll-surface-raised, #2a2a2a);
      border-color: var(--ll-accent, #7ec8e3);
      outline: none;
    }
    .section-row.active {
      border-color: var(--ll-accent-warm, #e3a857);
    }
    .section-row.active.selected {
      border-color: var(--ll-accent-warm, #e3a857);
      box-shadow: 0 0 0 1px var(--ll-accent, #7ec8e3);
    }
    .section-row.mode-delete:hover,
    .section-row.mode-delete.selected {
      border-color: var(--sl-color-danger-600, #c0392b);
    }
    .section-primary {
      font-size: var(--ll-text-base, 1.05rem);
    }
    .section-sub {
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
    sections:        { type: Array },
    mode:            { type: String },
    activeSectionId: { type: String },
  };

  constructor() {
    super();
    this.sections        = [];
    this.mode            = 'jump';
    this.activeSectionId = null;
  }

  get _listClass() { return 'section-list'; }
  get _rowClass()  { return 'section-row'; }

  _select(section) {
    const mode = this.mode;
    if (mode === 'jump') {
      this.dispatchEvent(new CustomEvent('ll-jump-section', {
        detail: { id: section.id, start: section.start },
        bubbles: true, composed: true,
      }));
    } else if (mode === 'delete') {
      this.dispatchEvent(new CustomEvent('ll-delete-section', {
        detail: { id: section.id },
        bubbles: true, composed: true,
      }));
    }
    this.hide();
  }

  _filtered() {
    const q = this._filter.trim().toLowerCase();
    if (!q) return this.sections;
    return this.sections.filter(s =>
      (s.name || '').toLowerCase().includes(q) ||
      (!s.name && fmtTimePlain(s.start).includes(q))
    );
  }

  render() {
    const filtered  = this._filtered();
    const title     = TITLES[this.mode] ?? 'Select Section';
    const isDelete  = this.mode === 'delete';
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
        <div class="section-list">
          ${filtered.length
            ? filtered.map((s, i) => html`
                <div
                  class="section-row
                    ${isDelete ? 'mode-delete' : ''}
                    ${s.id === this.activeSectionId ? 'active' : ''}
                    ${i === this._selIdx ? 'selected' : ''}"
                  @click=${() => this._select(s)}
                >
                  <div class="section-primary">${s.name || fmtTimePlain(s.start)}</div>
                  ${s.name
                    ? html`<div class="section-sub">${fmtTimePlain(s.start)}</div>`
                    : ''}
                </div>
              `)
            : html`<div class="empty">No sections${this._filter ? ' match.' : ' set.'}</div>`}
        </div>
      </llama-modal>
    `;
  }
}


customElements.define('llama-sections-picker', LlamaSectionsPicker);
