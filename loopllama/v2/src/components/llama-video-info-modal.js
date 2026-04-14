// llama-video-info-modal.js -- read-only display of video and all child entities.
//
// Props:
//   video:      Video object | null
//   chapters:   Array of Chapter objects
//   sections:   Array of Section objects
//   namedLoops: Array of Loop objects (is_scratch=false)
//   marks:      Array of Mark objects
//   duration:   Number | null  -- current video duration (seconds)
//
// Key bindings (active while modal is open):
//   Up / Down       -- scroll the content area
//   Page Up / Down  -- scroll by larger increment
//   Enter           -- close
//
// API:
//   show() / hide()

import { LitElement, html, css } from 'lit';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import './llama-modal.js';

class LlamaVideoInfoModal extends LitElement {
  static styles = css`
    :host {
      --width: 60rem;
    }

    .content {
      max-height: 70vh;
      overflow-y: auto;
    }

    .section-heading {
      font-size: var(--ll-text-sm, 0.85rem);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--ll-text-muted, #666);
      margin: 1.25rem 0 0.4rem;
      padding-bottom: 0.25rem;
      border-bottom: 1px solid var(--ll-border, #444);
    }

    .section-heading:first-child {
      margin-top: 0;
    }

    /* Two-column key/value grid for video details. */
    .info-grid {
      display: grid;
      grid-template-columns: max-content 1fr;
      gap: 0.2rem 0.75rem;
    }

    .info-label {
      color: var(--ll-text-dim, #aaa);
      font-size: var(--ll-text-sm, 0.85rem);
      white-space: nowrap;
    }

    .info-value {
      font-size: var(--ll-text-sm, 0.85rem);
      word-break: break-all;
    }

    /* Entity rows: name on left, time on right. */
    .entity-list {
      display: flex;
      flex-direction: column;
      gap: 0.1rem;
    }

    .entity-row {
      display: grid;
      grid-template-columns: 1fr max-content;
      gap: 0.75rem;
      align-items: baseline;
      padding: 0.25rem 0.4rem;
      border-radius: var(--ll-radius, 3px);
    }

    .entity-row:nth-child(odd) {
      background: var(--ll-surface-raised, #2a2a2a);
    }

    .entity-name {
      font-size: var(--ll-text-sm, 0.85rem);
    }

    .entity-name.dim {
      color: var(--ll-text-dim, #aaa);
    }

    .entity-time {
      font-family: var(--ll-font-mono, monospace);
      font-size: var(--ll-text-sm, 0.85rem);
      color: var(--ll-text-dim, #aaa);
      white-space: nowrap;
    }

    .empty {
      font-size: var(--ll-text-sm, 0.85rem);
      color: var(--ll-text-muted, #666);
      font-style: italic;
      padding: 0.25rem 0.4rem;
    }
  `;

  static properties = {
    video:      { type: Object },
    chapters:   { type: Array },
    sections:   { type: Array },
    namedLoops: { type: Array },
    marks:      { type: Array },
    duration:   { type: Number },
  };

  constructor() {
    super();
    this.video      = null;
    this.chapters   = [];
    this.sections   = [];
    this.namedLoops = [];
    this.marks      = [];
    this.duration   = null;
    this._keyHandler = null;
  }

  show() {
    this.renderRoot.querySelector('llama-modal')?.show();
    this._addKeyHandler();
  }

  hide() {
    this.renderRoot.querySelector('llama-modal')?.hide();
  }

  _addKeyHandler() {
    if (this._keyHandler) return;
    this._keyHandler = (e) => this._onKeyDown(e);
    document.addEventListener('keydown', this._keyHandler);
  }

  _removeKeyHandler() {
    if (!this._keyHandler) return;
    document.removeEventListener('keydown', this._keyHandler);
    this._keyHandler = null;
  }

  _onKeyDown(e) {
    const content = this.renderRoot.querySelector('.content');
    if (!content) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      content.scrollBy({ top: 60, behavior: 'smooth' });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      content.scrollBy({ top: -60, behavior: 'smooth' });
    } else if (e.key === 'PageDown') {
      e.preventDefault();
      content.scrollBy({ top: content.clientHeight * 0.9, behavior: 'smooth' });
    } else if (e.key === 'PageUp') {
      e.preventDefault();
      content.scrollBy({ top: -content.clientHeight * 0.9, behavior: 'smooth' });
    } else if (e.key === 'Enter') {
      e.preventDefault();
      this.hide();
    }
  }

  _onModalClose() {
    this._removeKeyHandler();
  }

  _fmt(secs) {
    if (secs == null || isNaN(secs)) return '?';
    const s = Math.floor(secs);
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
  }

  _renderVideo() {
    const v = this.video;
    if (!v) return html`<div class="empty">No video loaded.</div>`;
    const dur = this.duration ?? v.duration;
    return html`
      <div class="info-grid">
        <span class="info-label">ID</span>
        <span class="info-value">${v.id}</span>
        ${v.name ? html`
          <span class="info-label">Name</span>
          <span class="info-value">${v.name}</span>
        ` : ''}
        <span class="info-label">URL</span>
        <span class="info-value">${v.url || '—'}</span>
        <span class="info-label">Duration</span>
        <span class="info-value">${dur != null ? this._fmt(dur) : '—'}</span>
      </div>
    `;
  }

  _renderChapters() {
    if (!this.chapters.length) return html`<div class="empty">None.</div>`;
    return html`
      <div class="entity-list">
        ${this.chapters.map(c => html`
          <div class="entity-row">
            <span class="entity-name ${c.name ? '' : 'dim'}">${c.name || '—'}</span>
            <span class="entity-time">${this._fmt(c.start)}</span>
          </div>
        `)}
      </div>
    `;
  }

  _renderSections() {
    if (!this.sections.length) return html`<div class="empty">None.</div>`;
    return html`
      <div class="entity-list">
        ${this.sections.map(s => html`
          <div class="entity-row">
            <span class="entity-name ${s.name ? '' : 'dim'}">${s.name || '—'}</span>
            <span class="entity-time">${this._fmt(s.start)}</span>
          </div>
        `)}
      </div>
    `;
  }

  _renderLoops() {
    if (!this.namedLoops.length) return html`<div class="empty">None.</div>`;
    return html`
      <div class="entity-list">
        ${this.namedLoops.map(l => html`
          <div class="entity-row">
            <span class="entity-name ${l.name ? '' : 'dim'}">${l.name || '—'}</span>
            <span class="entity-time">${this._fmt(l.start)} – ${this._fmt(l.end)}</span>
          </div>
        `)}
      </div>
    `;
  }

  _renderMarks() {
    if (!this.marks.length) return html`<div class="empty">None.</div>`;
    return html`
      <div class="entity-list">
        ${this.marks.map(m => html`
          <div class="entity-row">
            <span class="entity-name ${m.name ? '' : 'dim'}">${m.name || '—'}</span>
            <span class="entity-time">${this._fmt(m.time)}</span>
          </div>
        `)}
      </div>
    `;
  }

  render() {
    return html`
      <llama-modal label="Video info" @ll-modal-close=${this._onModalClose}>
        <div class="content">
          <div class="section-heading">Video</div>
          ${this._renderVideo()}
          <div class="section-heading">Chapters (${this.chapters.length})</div>
          ${this._renderChapters()}
          <div class="section-heading">Sections (${this.sections.length})</div>
          ${this._renderSections()}
          <div class="section-heading">Named Loops (${this.namedLoops.length})</div>
          ${this._renderLoops()}
          <div class="section-heading">Marks (${this.marks.length})</div>
          ${this._renderMarks()}
        </div>
        <div slot="footer">
          <sl-button variant="primary" @click=${this.hide}>Close</sl-button>
        </div>
      </llama-modal>
    `;
  }
}

customElements.define('llama-video-info-modal', LlamaVideoInfoModal);
