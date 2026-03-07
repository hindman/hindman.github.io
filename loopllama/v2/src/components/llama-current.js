// llama-current.js -- "Current" panel showing active entity info.
//
// Displays top-level state: video name, active chapter, current
// section, active loop name, and loop source.

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

  `;

  static properties = {
    videoName:         { type: String },
    chapterName:       { type: String },
    sectionName:       { type: String },
    loopName:          { type: String },
    loopSourceLabel:   { type: String },
    loopSourceType:    { type: String },
    duration:          { type: Number },
    zoomLabel:         { type: String },
  };

  constructor() {
    super();
    this.videoName         = '';
    this.chapterName       = null;
    this.sectionName       = null;
    this.loopName          = null;
    this.loopSourceLabel   = null;
    this.loopSourceType    = null;
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

  render() {
    const sourceTypeDisplay = this.loopSourceType
      ? this.loopSourceType[0].toUpperCase() + this.loopSourceType.slice(1)
      : null;

    return html`
      <div class="current-panel">
        <div class="panel-title">Current</div>
        <div class="current-rows">
          ${this._row('Name',        this.videoName)}
          ${this._row('Chapter',     this.chapterName)}
          ${this._row('Section',     this.sectionName)}
          ${this._row('Loop',        this.loopName)}
          ${this._row('Source',      this.loopSourceLabel)}
          ${this._row('Source type', sourceTypeDisplay)}
          ${this._row('Duration',    this.duration != null ? this._fmtDuration(this.duration) : null)}
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
