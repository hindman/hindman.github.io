// llama-video-picker.js -- modal to pick a known video, with name filter.
//
// Props:
//   videos:         Array of Video objects
//   currentVideoId: string | null  -- highlights the active video
//   mode:           'switch' | 'delete'  (default: 'switch')
//
// Events fired (composed, bubbling):
//   ll-pick-video    { videoId: string }  -- mode='switch': user selected a video
//   ll-delete-video  { id: string }       -- mode='delete': user selected a video to delete
//
// API:
//   show(mode?) / hide()

import { LitElement, html, css } from 'lit';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import './llama-modal.js';

class LlamaVideoPicker extends LitElement {
  static styles = css`
    :host {
      --width: 52rem;
    }
    .filter-wrap {
      margin-bottom: 0.75rem;
    }
    .video-list {
      max-height: 520px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    .video-row {
      cursor: pointer;
      padding: 0.4rem 0.6rem;
      border-radius: var(--ll-radius, 3px);
      border: 1px solid var(--ll-border, #444);
    }
    .video-row:hover {
      background: var(--ll-surface-raised, #2a2a2a);
      border-color: var(--ll-accent, #7ec8e3);
    }
    .video-row.current {
      border-color: var(--ll-accent-warm, #e3a857);
    }
    .video-row.current.selected {
      border-color: var(--ll-accent-warm, #e3a857);
      box-shadow: 0 0 0 1px var(--ll-accent, #7ec8e3);
    }
    .video-row.selected {
      background: var(--ll-surface-raised, #2a2a2a);
      border-color: var(--ll-accent, #7ec8e3);
      outline: none;
    }
    .video-row.mode-delete:hover,
    .video-row.mode-delete.selected {
      border-color: var(--sl-color-danger-600, #c0392b);
    }
    .video-primary {
      font-size: var(--ll-text-base, 1.05rem);
    }
    .video-sub {
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
    videos:         { type: Array },
    currentVideoId: { type: String },
    mode:           { type: String },
    _filter:        { state: true },
    _selIdx:        { state: true },
  };

  constructor() {
    super();
    this.videos         = [];
    this.currentVideoId = null;
    this.mode           = 'switch';
    this._filter        = '';
    this._selIdx        = 0;
  }

  show(mode) {
    this.mode = mode || 'switch';
    this._filter = '';
    this._selIdx = 0;
    this.renderRoot.querySelector('llama-modal')?.show();
  }

  hide() {
    this.renderRoot.querySelector('llama-modal')?.hide();
  }

  _onInitialFocus() {
    this.renderRoot.querySelector('.video-list')?.scrollTo(0, 0);
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

  // Reset selection to 0 whenever the filter changes so the highlighted
  // item stays within the visible results.
  _onFilterInput(e) {
    this._filter = e.target.value;
    this._selIdx = 0;
  }

  _scrollSelectedIntoView() {
    // Run after Lit has re-rendered the updated selection.
    this.updateComplete.then(() => {
      const list = this.renderRoot.querySelector('.video-list');
      const row  = list?.querySelector('.video-row.selected');
      row?.scrollIntoView({ block: 'nearest' });
    });
  }

  _select(video) {
    if (this.mode === 'delete') {
      this.dispatchEvent(new CustomEvent('ll-delete-video', {
        detail: { id: video.id },
        bubbles: true,
        composed: true,
      }));
    } else {
      this.dispatchEvent(new CustomEvent('ll-pick-video', {
        detail: { videoId: video.id },
        bubbles: true,
        composed: true,
      }));
    }
    this.hide();
  }

  // Sort order: current video first, then named videos alphabetically,
  // then unnamed videos in original arrival order.
  _sorted() {
    const currentId = this.currentVideoId;
    return [...this.videos].sort((a, b) => {
      if (a.id === currentId) return -1;
      if (b.id === currentId) return 1;
      const aName = a.name;
      const bName = b.name;
      if (aName && !bName) return -1;
      if (!aName && bName) return 1;
      if (aName && bName) return aName.toLowerCase().localeCompare(bName.toLowerCase());
      return 0; // both unnamed: preserve arrival order (stable sort)
    });
  }

  _filtered() {
    const q = this._filter.trim().toLowerCase();
    const sorted = this._sorted();
    if (!q) return sorted;
    return sorted.filter(v =>
      (v.name || '').toLowerCase().includes(q) ||
      v.id.toLowerCase().includes(q)
    );
  }

  // Preferred display label: name > id.
  _primaryLabel(v) {
    return v.name || v.id;
  }

  // Secondary label: always the video ID.
  _subLabel(v) {
    return v.id;
  }

  render() {
    const filtered  = this._filtered();
    const isDelete  = this.mode === 'delete';
    const title     = isDelete ? 'Delete Video' : 'Open Video';
    return html`
      <llama-modal label=${title} @ll-modal-initial-focus=${this._onInitialFocus}>
        <div class="filter-wrap">
          <sl-input
            placeholder="Filter by name…"
            .value=${this._filter}
            @sl-input=${this._onFilterInput}
            @keydown=${this._onFilterKeyDown}
            clearable
          ></sl-input>
        </div>
        <div class="video-list">
          ${filtered.length
            ? filtered.map((v, i) => html`
                <div
                  class="video-row
                    ${isDelete ? 'mode-delete' : ''}
                    ${v.id === this.currentVideoId ? 'current' : ''}
                    ${i === this._selIdx ? 'selected' : ''}"
                  @click=${() => this._select(v)}
                >
                  <div class="video-primary">${this._primaryLabel(v)}</div>
                  <div class="video-sub">${this._subLabel(v)}</div>
                </div>
              `)
            : html`<div class="empty">No videos match.</div>`}
        </div>
        <div slot="footer">
          <sl-button @click=${this.hide}>Cancel</sl-button>
        </div>
      </llama-modal>
    `;
  }
}

customElements.define('llama-video-picker', LlamaVideoPicker);
