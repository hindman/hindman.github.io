// llama-video-picker.js -- modal to pick a known video, with name/title filter.
//
// Props:
//   videos:         Array of Video objects
//   currentVideoId: string | null  -- highlights the active video
//
// Events fired (composed, bubbling):
//   ll-pick-video  { videoId: string }  -- user selected a video
//
// API:
//   show() / hide()

import { LitElement, html, css } from 'lit';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import './llama-modal.js';

class LlamaVideoPicker extends LitElement {
  static styles = css`
    .filter-wrap {
      margin-bottom: 0.75rem;
    }
    .video-list {
      max-height: 320px;
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
      border-color: var(--ll-accent, #7ec8e3);
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
    _filter:        { state: true },
  };

  constructor() {
    super();
    this.videos         = [];
    this.currentVideoId = null;
    this._filter        = '';
  }

  show() {
    this._filter = '';
    this.renderRoot.querySelector('llama-modal')?.show();
  }

  hide() {
    this.renderRoot.querySelector('llama-modal')?.hide();
  }

  _onInitialFocus() {
    this.renderRoot.querySelector('sl-input')?.focus();
  }

  _onFilterKeyDown(e) {
    if (e.key === 'Enter') {
      const filtered = this._filtered();
      if (filtered.length > 0) this._select(filtered[0]);
    }
  }

  _select(video) {
    this.dispatchEvent(new CustomEvent('ll-pick-video', {
      detail: { videoId: video.id },
      bubbles: true,
      composed: true,
    }));
    this.hide();
  }

  _filtered() {
    const q = this._filter.trim().toLowerCase();
    if (!q) return this.videos;
    return this.videos.filter(v =>
      (v.name  || '').toLowerCase().includes(q) ||
      (v.title || '').toLowerCase().includes(q) ||
      v.id.toLowerCase().includes(q)
    );
  }

  // Preferred display label: name > title > id.
  _primaryLabel(v) {
    return v.name || v.title || v.id;
  }

  // Secondary label: show title if name is already shown, otherwise the id.
  _subLabel(v) {
    if (v.name && v.title) return v.title;
    return v.id;
  }

  render() {
    const filtered = this._filtered();
    return html`
      <llama-modal label="Switch Video" @ll-modal-initial-focus=${this._onInitialFocus}>
        <div class="filter-wrap">
          <sl-input
            placeholder="Filter by name or title…"
            .value=${this._filter}
            @sl-input=${e => { this._filter = e.target.value; }}
            @keydown=${this._onFilterKeyDown}
            clearable
          ></sl-input>
        </div>
        <div class="video-list">
          ${filtered.length
            ? filtered.map(v => html`
                <div
                  class="video-row ${v.id === this.currentVideoId ? 'current' : ''}"
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
