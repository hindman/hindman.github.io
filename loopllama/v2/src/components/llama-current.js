// llama-current.js -- "Current" panel showing active entity info.
//
// Displays top-level state: video name, active chapter, current
// section, and loop source.
//
// Props:
//   videoName, videoId, chapterName, sectionName  -- strings
//   loopSrc           -- { id, label, type, start, end } | null
//   loopDirty         -- true when scratch-loop bounds differ from source
//   duration, zoomLabel, zone2Mode

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
    loopSrc:           { type: Object },
    loopDirty:         { type: Boolean },
    duration:          { type: Number },
    zoomLabel:         { type: String },
    zone2Mode:         { type: String },
  };

  constructor() {
    super();
    this.videoName         = '';
    this.videoId           = null;
    this.chapterName       = null;
    this.sectionName       = null;
    this.loopSrc           = null;
    this.loopDirty         = false;
    this.duration          = null;
    this.zoomLabel         = null;
    this.zone2Mode         = 'sections';
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
    if (!this.loopSrc) return null;
    const typeLabel = this.loopSrc.type[0].toUpperCase() + this.loopSrc.type.slice(1);
    const nameStr   = this.loopSrc.label ? `: ${this.loopSrc.label}` : '';
    if (this.loopSrc.start == null || this.loopSrc.end == null) {
      return html`${typeLabel}${nameStr}`;
    }
    const range = ` [${this._fmtDuration(this.loopSrc.start)} \u2013 ${this._fmtDuration(this.loopSrc.end)}]`;
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
          ${this._row('Timeline display', this.zone2Mode === 'sections' ? 'Sections' : 'Chapters')}
          ${this._row('Chapter',     this.chapterName)}
          ${this._row('Section',     this.sectionName)}
          <div class="current-row">
            <div class="row-label">Scratch loop source</div>
            <div class="row-value ${!this.loopSrc ? 'dim' : ''}">${this._loopSourceValue() ?? '—'}</div>
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
