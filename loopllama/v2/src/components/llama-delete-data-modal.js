// llama-delete-data-modal.js -- modal for selectively deleting video data.
//
// API:
//   show({ videos, currentVideoId, currentVideoName,
//          sections, namedLoops, marks, chapters })
//   hide()
//
// Events fired (composed, bubbling):
//   ll-delete-data  (mode='current')  { mode, sections, loops, marks, chapters }
//                                       -- arrays of entity IDs to delete
//   ll-delete-data  (mode='videos')   { mode, videoIds }
//                                       -- array of video IDs to delete

import { LitElement, html, css } from 'lit';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import './llama-modal.js';

class LlamaDeleteDataModal extends LitElement {
  static styles = css`
    .mode-toggle {
      display: flex;
      margin-bottom: 1rem;
      border: 1px solid var(--ll-border, #444);
      border-radius: var(--ll-radius, 3px);
      overflow: hidden;
    }
    .mode-btn {
      flex: 1;
      padding: 0.35rem 0.5rem;
      background: none;
      border: none;
      color: var(--ll-text-dim, #aaa);
      cursor: pointer;
      font-size: var(--ll-text-sm, 0.85rem);
    }
    .mode-btn:not(:last-child) {
      border-right: 1px solid var(--ll-border, #444);
    }
    .mode-btn.active {
      background: var(--ll-accent, #7ec8e3);
      color: #000;
    }
    .mode-btn:not(.active):hover {
      background: var(--ll-surface-raised, #2a2a2a);
      color: var(--ll-text, #e0e0e0);
    }
    .no-video-msg,
    .empty-msg {
      color: var(--ll-text-muted, #666);
      font-size: var(--ll-text-sm, 0.85rem);
      padding: 0.5rem 0;
    }
    .current-video-label {
      font-size: var(--ll-text-sm, 0.85rem);
      color: var(--ll-text-dim, #aaa);
      margin-bottom: 0.75rem;
    }
    .group {
      margin-bottom: 0.85rem;
    }
    .group-header {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.25rem;
      font-size: var(--ll-text-sm, 0.85rem);
      font-weight: bold;
      color: var(--ll-accent, #7ec8e3);
    }
    .group-items {
      display: flex;
      flex-direction: column;
      gap: 0.15rem;
      padding-left: 1.5rem;
    }
    .item-row {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: var(--ll-text-sm, 0.85rem);
    }
    .item-label {
      color: var(--ll-text, #e0e0e0);
    }
    .item-sub {
      color: var(--ll-text-dim, #aaa);
    }
    input[type="checkbox"] {
      cursor: pointer;
      accent-color: var(--ll-accent, #7ec8e3);
      width: 1rem;
      height: 1rem;
      flex-shrink: 0;
    }
  `;

  static properties = {
    _mode:             { state: true },
    _checked:          { state: true },
    _sections:         { state: true },
    _loops:            { state: true },
    _marks:            { state: true },
    _chapters:         { state: true },
    _videos:           { state: true },
    _currentVideoId:   { state: true },
    _currentVideoName: { state: true },
  };

  constructor() {
    super();
    this._mode             = 'current';
    this._checked          = {};
    this._sections         = [];
    this._loops            = [];
    this._marks            = [];
    this._chapters         = [];
    this._videos           = [];
    this._currentVideoId   = null;
    this._currentVideoName = null;
    this._keyHandler       = null;
  }

  // initialMode: 'current' (default) or 'videos'.
  // preCheckedVideoId: if set, that video is pre-checked when opening in 'videos' mode.
  show({ videos, currentVideoId, currentVideoName, sections, namedLoops, marks, chapters,
         initialMode = 'current', preCheckedVideoId = null }) {
    this._mode             = initialMode;
    this._sections         = sections   ?? [];
    this._loops            = namedLoops ?? [];
    this._marks            = marks      ?? [];
    this._chapters         = chapters   ?? [];
    this._videos           = videos     ?? [];
    this._currentVideoId   = currentVideoId   ?? null;
    this._currentVideoName = currentVideoName ?? null;
    this._checked          = preCheckedVideoId ? { [preCheckedVideoId]: true } : {};
    this.renderRoot.querySelector('llama-modal')?.show();
    this._addKeyHandler();
  }

  hide() {
    this.renderRoot.querySelector('llama-modal')?.hide();
  }

  _addKeyHandler() {
    if (this._keyHandler) return;
    this._keyHandler = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this._confirm();
      }
    };
    document.addEventListener('keydown', this._keyHandler);
  }

  _removeKeyHandler() {
    if (!this._keyHandler) return;
    document.removeEventListener('keydown', this._keyHandler);
    this._keyHandler = null;
  }

  _onModalClose() {
    this._removeKeyHandler();
  }

  _isChecked(id) {
    return this._checked[id] ?? false;
  }

  _toggle(id) {
    this._checked = { ...this._checked, [id]: !this._isChecked(id) };
  }

  // Returns 'all' | 'some' | 'none' for a list of items.
  _groupState(items) {
    const n = items.filter(i => this._isChecked(i.id)).length;
    if (n === 0) return 'none';
    if (n === items.length) return 'all';
    return 'some';
  }

  _setGroup(items, checked) {
    const updates = {};
    for (const item of items) updates[item.id] = checked;
    this._checked = { ...this._checked, ...updates };
  }

  _onGroupChange(items) {
    // If all are checked, uncheck all; otherwise check all.
    this._setGroup(items, this._groupState(items) !== 'all');
  }

  _renderGroup(label, items, labelFn) {
    if (!items.length) return '';
    const state = this._groupState(items);
    return html`
      <div class="group">
        <div class="group-header">
          <input
            type="checkbox"
            .checked=${state === 'all'}
            .indeterminate=${state === 'some'}
            @change=${() => this._onGroupChange(items)}
          >
          <span>${label} (${items.length})</span>
        </div>
        <div class="group-items">
          ${items.map(item => html`
            <div class="item-row">
              <input
                type="checkbox"
                .checked=${this._isChecked(item.id)}
                @change=${() => this._toggle(item.id)}
              >
              ${labelFn(item)}
            </div>
          `)}
        </div>
      </div>
    `;
  }

  _renderCurrentVideoContent() {
    if (!this._currentVideoId) {
      return html`<div class="no-video-msg">No video loaded.</div>`;
    }
    const hasAny = this._sections.length || this._loops.length
                || this._marks.length   || this._chapters.length;
    if (!hasAny) {
      return html`<div class="empty-msg">Current video has no entities to delete.</div>`;
    }
    return html`
      <div class="current-video-label">
        Video: ${this._currentVideoName || this._currentVideoId}
      </div>
      ${this._renderGroup('Sections', this._sections,
          s => html`<span class="item-label">${s.name || ''}</span>
                    <span class="item-sub">@${_fmtTime(s.start)}</span>`)}
      ${this._renderGroup('Loops', this._loops,
          l => html`<span class="item-label">${l.name || ''}</span>
                    <span class="item-sub">${_fmtTime(l.start)} – ${_fmtTime(l.end)}</span>`)}
      ${this._renderGroup('Marks', this._marks,
          m => html`<span class="item-label">${m.name || ''}</span>
                    <span class="item-sub">@${_fmtTime(m.time)}</span>`)}
      ${this._renderGroup('Chapters', this._chapters,
          c => html`<span class="item-label">${c.name || ''}</span>
                    <span class="item-sub">${_fmtTime(c.start)} – ${_fmtTime(c.end)}</span>`)}
    `;
  }

  _renderVideosContent() {
    if (!this._videos.length) {
      return html`<div class="empty-msg">No videos saved.</div>`;
    }
    const state = this._groupState(this._videos);
    return html`
      <div class="group">
        <div class="group-header">
          <input
            type="checkbox"
            .checked=${state === 'all'}
            .indeterminate=${state === 'some'}
            @change=${() => this._onGroupChange(this._videos)}
          >
          <span>All videos (${this._videos.length})</span>
        </div>
        <div class="group-items">
          ${this._videos.map(v => html`
            <div class="item-row">
              <input
                type="checkbox"
                .checked=${this._isChecked(v.id)}
                @change=${() => this._toggle(v.id)}
              >
              <span class="item-label">${v.name || v.id}</span>
              ${v.name ? html`<span class="item-sub">${v.id}</span>` : ''}
            </div>
          `)}
        </div>
      </div>
    `;
  }

  _getSelectedCount() {
    if (this._mode === 'videos') {
      return this._videos.filter(v => this._isChecked(v.id)).length;
    }
    return [
      ...this._sections, ...this._loops, ...this._marks, ...this._chapters,
    ].filter(i => this._isChecked(i.id)).length;
  }

  _confirm() {
    if (this._mode === 'videos') {
      const videoIds = this._videos.filter(v => this._isChecked(v.id)).map(v => v.id);
      if (!videoIds.length) return;
      this.dispatchEvent(new CustomEvent('ll-delete-data', {
        detail: { mode: 'videos', videoIds },
        bubbles: true, composed: true,
      }));
    } else {
      const sections = this._sections.filter(s => this._isChecked(s.id)).map(s => s.id);
      const loops    = this._loops.filter(l => this._isChecked(l.id)).map(l => l.id);
      const marks    = this._marks.filter(m => this._isChecked(m.id)).map(m => m.id);
      const chapters = this._chapters.filter(c => this._isChecked(c.id)).map(c => c.id);
      if (!sections.length && !loops.length && !marks.length && !chapters.length) return;
      this.dispatchEvent(new CustomEvent('ll-delete-data', {
        detail: { mode: 'current', sections, loops, marks, chapters },
        bubbles: true, composed: true,
      }));
    }
    this.hide();
  }

  render() {
    const count = this._getSelectedCount();
    return html`
      <llama-modal label="Delete Video Data" @ll-modal-close=${this._onModalClose}>
        <div class="mode-toggle">
          <button
            class="mode-btn ${this._mode === 'current' ? 'active' : ''}"
            @click=${() => { this._mode = 'current'; this._checked = {}; }}
          >Current video</button>
          <button
            class="mode-btn ${this._mode === 'videos' ? 'active' : ''}"
            @click=${() => { this._mode = 'videos'; this._checked = {}; }}
          >Entire videos</button>
        </div>
        ${this._mode === 'current'
          ? this._renderCurrentVideoContent()
          : this._renderVideosContent()}
        <div slot="footer">
          <sl-button @click=${this.hide}>Cancel</sl-button>
          <sl-button
            variant="danger"
            ?disabled=${count === 0}
            @click=${this._confirm}
          >Delete${count > 0 ? ` (${count})` : ''}</sl-button>
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

customElements.define('llama-delete-data-modal', LlamaDeleteDataModal);
