// llama-timeline.js -- horizontal timeline showing sections, loop range,
// marks, and playhead.
//
// Receives:
//   currentTime: Number   -- current playback position (seconds)
//   duration:    Number   -- total video duration (seconds), or null
//   sections:    Array    -- Section objects sorted by time { id, time, name, end? }
//   marks:       Array    -- Mark objects sorted by time { id, time, name }
//   loopStart:   Number   -- scratch-loop start (seconds)
//   loopEnd:     Number   -- scratch-loop end (seconds)
//
// Fires (bubbles + composed):
//   ll-seek-to  -- user clicked the video zone; detail.time = seconds

import { LitElement, html, css } from 'lit';

class LlamaTimeline extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .timeline-wrap {
      background: var(--ll-surface, #252525);
      border: 1px solid var(--ll-border, #444);
      border-radius: var(--ll-radius, 3px);
      overflow: hidden;
      user-select: none;
    }

    .no-video {
      height: 40px;
      display: flex;
      align-items: center;
      padding: 0 var(--ll-pad-lg, 1rem);
      font-size: var(--ll-text-sm, 0.85rem);
      color: var(--ll-text-muted, #555);
    }

    /* --- Video zone: progress bar + playhead, click to jump --- */

    .video-zone {
      position: relative;
      height: 10px;
      background: var(--ll-surface-raised, #333);
      cursor: pointer;
      border-bottom: 1px solid var(--ll-border, #444);
    }

    .video-zone:hover {
      filter: brightness(1.3);
    }

    .progress-fill {
      position: absolute;
      top: 0; left: 0; bottom: 0;
      background: var(--ll-accent, #7ec8e3);
      opacity: 0.25;
      pointer-events: none;
    }

    .playhead {
      position: absolute;
      top: -2px; bottom: -2px;
      width: 2px;
      margin-left: -1px;
      background: var(--ll-accent, #7ec8e3);
      pointer-events: none;
      z-index: 10;
    }

    /* --- Entity zone: sections, loop range, marks --- */

    .entity-zone {
      position: relative;
      height: 30px;
      background: var(--ll-surface-raised, #2a2a2a);
      overflow: hidden;
    }

    .section-region {
      position: absolute;
      top: 0; bottom: 0;
      background: #2d4a5a;
      border-right: 1px solid var(--ll-border, #444);
      overflow: hidden;
      display: flex;
      align-items: center;
      padding: 0 3px;
      box-sizing: border-box;
      z-index: 1;
    }

    .section-region.current {
      background: #3a6a80;
    }

    .section-label {
      font-size: 0.7rem;
      color: var(--ll-text-dim, #aaa);
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      pointer-events: none;
      line-height: 1;
    }

    .section-region.current .section-label {
      color: var(--ll-accent, #7ec8e3);
    }

    /* Scratch-loop range: a translucent band inset from top/bottom */
    .loop-range {
      position: absolute;
      top: 25%; bottom: 25%;
      background: var(--ll-accent-warm, #e3a857);
      opacity: 0.55;
      border-radius: 2px;
      pointer-events: none;
      z-index: 2;
    }

    /* Section dividers: full-height lines at each divider point */
    .section-divider {
      position: absolute;
      top: 0; bottom: 0;
      width: 2px;
      margin-left: -1px;
      background: rgba(255, 255, 255, 0.45);
      pointer-events: none;
      z-index: 4;
    }

    /* Mark ticks: short lines (top half only) to distinguish from dividers */
    .mark-tick {
      position: absolute;
      top: 0;
      height: 50%;
      width: 2px;
      margin-left: -1px;
      background: #90ee90;
      pointer-events: none;
      z-index: 3;
    }
  `;

  static properties = {
    currentTime: { type: Number },
    duration:    { type: Number },
    sections:    { type: Array },
    marks:       { type: Array },
    loopStart:   { type: Number },
    loopEnd:     { type: Number },
  };

  constructor() {
    super();
    this.currentTime = 0;
    this.duration    = null;
    this.sections    = [];
    this.marks       = [];
    this.loopStart   = 0;
    this.loopEnd     = 0;
  }

  // Convert a time value (seconds) to a percentage of the timeline width.
  _pct(t) {
    return Math.max(0, Math.min(100, (t / this.duration) * 100));
  }

  // Format seconds as m:ss for tooltip display.
  _fmt(secs) {
    if (secs == null) return '?';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  // Build displayable region objects from the sorted sections array.
  // Each region has: { start, end, name, isCurrent }.
  // End is either the section's explicit end, the next divider's time, or duration.
  _computeRegions() {
    return this.sections.map((s, i) => {
      const next = this.sections[i + 1];
      const end  = s.end != null ? s.end : (next ? next.time : this.duration);
      return {
        start:     s.time,
        end,
        name:      s.name,
        isCurrent: this.currentTime >= s.time && this.currentTime < end,
      };
    });
  }

  _onVideoZoneClick(e) {
    if (!this.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct  = (e.clientX - rect.left) / rect.width;
    const time = Math.max(0, Math.min(this.duration, pct * this.duration));
    this.dispatchEvent(new CustomEvent('ll-seek-to', {
      bubbles: true, composed: true, detail: { time },
    }));
  }

  render() {
    if (!this.duration) {
      return html`
        <div class="timeline-wrap">
          <div class="no-video">No video loaded</div>
        </div>
      `;
    }

    const regions  = this._computeRegions();
    const phPct    = this._pct(this.currentTime);
    const lsPct    = this._pct(this.loopStart);
    const leWidth  = this._pct(this.loopEnd) - this._pct(this.loopStart);
    const hasLoop  = this.loopStart < this.loopEnd;

    return html`
      <div class="timeline-wrap">

        <div class="video-zone" @click=${this._onVideoZoneClick}>
          <div class="progress-fill" style="width: ${phPct}%"></div>
          <div class="playhead"      style="left: ${phPct}%"></div>
        </div>

        <div class="entity-zone">

          ${regions.map((r, i) => html`
            <div
              class="section-region ${r.isCurrent ? 'current' : ''}"
              style="left: ${this._pct(r.start)}%; width: ${this._pct(r.end) - this._pct(r.start)}%"
              title="${r.name || `#${i + 1}`}  ${this._fmt(r.start)}–${this._fmt(r.end)}"
            ><span class="section-label">${r.name || ''}</span></div>
            <div
              class="section-divider"
              style="left: ${this._pct(r.start)}%"
              title="${r.name || `#${i + 1}`}  ${this._fmt(r.start)}"
            ></div>
          `)}

          ${hasLoop ? html`
            <div
              class="loop-range"
              style="left: ${lsPct}%; width: ${leWidth}%"
              title="Loop: ${this._fmt(this.loopStart)}–${this._fmt(this.loopEnd)}"
            ></div>
          ` : ''}

          ${this.marks.map((m, i) => html`
            <div
              class="mark-tick"
              style="left: ${this._pct(m.time)}%"
              title="${m.name || `#${i + 1}`}  ${this._fmt(m.time)}"
            ></div>
          `)}

        </div>

      </div>
    `;
  }
}

customElements.define('llama-timeline', LlamaTimeline);
