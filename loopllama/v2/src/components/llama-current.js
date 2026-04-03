// llama-current.js -- "Current" panel showing active entity info.
//
// Displays top-level state: video name, active chapter, current
// section, and loop source.
//
// Props:
//   videoName, videoId, chapterName, sectionName  -- strings
//   loopSourceLabel   -- e.g. "Verse A"
//   loopSourceType    -- 'loop' | 'section' | 'chapter' | null
//   loopSourceStart   -- unpadded start of source entity (seconds) | null
//   loopSourceEnd     -- unpadded end of source entity (seconds) | null
//   loopDirty         -- true when scratch-loop bounds differ from source
//   duration, zoomLabel

import { LitElement, html, css } from 'lit';

class LlamaCurrent extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .current-panel {
      background: var(--ll-surface, #252525);
      border: 1px solid var(--ll-border, #444);
      border-radius: var(--ll-radius, 3px);
      padding: var(--ll-pad, 0.5rem);
      height: 100%;
      box-sizing: border-box;
    }

    .panel-title {
      font-size: 0.72rem;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: var(--ll-text-muted, #666);
      margin-bottom: 0.5rem;
      padding-bottom: 0.25rem;
      border-bottom: 1px solid var(--ll-border, #444);
    }

    .current-rows {
      display: flex;
      flex-direction: column;
      gap: 0.55rem;
    }

    .row-label {
      font-size: 0.67rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--ll-text-muted, #666);
      margin-bottom: 0.1rem;
    }

    .row-value {
      font-size: var(--ll-text-sm, 0.85rem);
      color: var(--ll-text, #e0e0e0);
      line-height: 1.4;
      overflow-wrap: break-word;
    }

    .row-value.dim {
      color: var(--ll-text-muted, #666);
    }

    .row-label.zoom-label {
      color: var(--ll-warn, #f0c040);
    }

    .dirty-range {
      color: var(--ll-warn, #f0c040);
    }

  `;

  static properties = {
    videoName:         { type: String },
    videoId:           { type: String },
    chapterName:       { type: String },
    sectionName:       { type: String },
    loopSourceLabel:   { type: String },
    loopSourceType:    { type: String },
    loopSourceStart:   { type: Number },
    loopSourceEnd:     { type: Number },
    loopDirty:         { type: Boolean },
    duration:          { type: Number },
    zoomLabel:         { type: String },
  };

  constructor() {
    super();
    this.videoName         = '';
    this.videoId           = null;
    this.chapterName       = null;
    this.sectionName       = null;
    this.loopSourceLabel   = null;
    this.loopSourceType    = null;
    this.loopSourceStart   = null;
    this.loopSourceEnd     = null;
    this.loopDirty         = false;
    this.duration          = null;
    this.zoomLabel         = null;
  }

  _fmtDuration(secs) {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  _row(label, value) {
    const isEmpty = !value;
    return html`
      <div class="current-row">
        <div class="row-label">${label}</div>
        <div class="row-value ${isEmpty ? 'dim' : ''}">${value || '—'}</div>
      </div>
    `;
  }

  _loopSourceValue() {
    if (!this.loopSourceType) return null;
    const typeLabel = this.loopSourceType[0].toUpperCase() + this.loopSourceType.slice(1);
    const nameStr   = this.loopSourceLabel ? `: ${this.loopSourceLabel}` : '';
    if (this.loopSourceStart == null || this.loopSourceEnd == null) {
      return html`${typeLabel}${nameStr}`;
    }
    const range = ` [${this._fmtDuration(this.loopSourceStart)} \u2013 ${this._fmtDuration(this.loopSourceEnd)}]`;
    return html`${typeLabel}${nameStr}<span class="${this.loopDirty ? 'dirty-range' : ''}">${range}</span>`;
  }

  render() {
    return html`
      <div class="current-panel">
        <div class="panel-title">Current</div>
        <div class="current-rows">
          ${this._row('Name',        this.videoName)}
          ${this._row('Video ID',    this.videoId)}
          ${this._row('Duration',    this.duration != null ? this._fmtDuration(this.duration) : null)}
          ${this._row('Chapter',     this.chapterName)}
          ${this._row('Section',     this.sectionName)}
          <div class="current-row">
            <div class="row-label">Scratch loop source</div>
            <div class="row-value ${!this.loopSourceType ? 'dim' : ''}">${this._loopSourceValue() ?? '—'}</div>
          </div>
          ${this.zoomLabel ? html`
            <div class="current-row">
              <div class="row-label zoom-label">Zoom</div>
              <div class="row-value">${this.zoomLabel}</div>
            </div>` : ''}
        </div>
      </div>
    `;
  }
}

customElements.define('llama-current', LlamaCurrent);
