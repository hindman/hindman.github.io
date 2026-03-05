// llama-timeline.js -- horizontal timeline, 3-zone design.
//
// Zones (top to bottom, equal height):
//   Play zone      -- thick track + dot playhead; click to seek.
//   Section zone   -- placeholder (Stage 18b).
//   Loop-mark zone -- placeholder (Stage 18c).
//
// Receives:
//   videoId:     String   -- current video ID, or null if none loaded
//   currentTime: Number   -- current playback position (seconds)
//   duration:    Number   -- total video duration (seconds), or null
//   sections:    Array    -- Section objects { id, time, name, end? }
//   marks:       Array    -- Mark objects { id, time, name }
//   loopStart:   Number   -- scratch-loop start (seconds)
//   loopEnd:     Number   -- scratch-loop end (seconds)
//   scopeStart:  Number   -- visible range start (seconds); null = 0
//   scopeEnd:    Number   -- visible range end (seconds); null = duration
//
// Fires (bubbles + composed):
//   ll-seek-to  -- user clicked the Play zone; detail.time = seconds

import { LitElement, html, css } from 'lit';

class LlamaTimeline extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .timeline-wrap {
      background: var(--ll-bg, #1a1a1a);
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

    /* === Zones === */

    .zone {
      height: 24px;
    }

    /* Play zone: thick track + dot playhead */

    .zone--play {
      position: relative;
      background: #1a1a1a;
      cursor: pointer;
    }

    .zone--play:hover .play-dot {
      transform: translate(-50%, -50%) scale(1.4);
    }

    /* Track: a thick horizontal line centered in the zone */
    .play-track {
      position: absolute;
      left: 0;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      height: 5px;
      background: var(--ll-text-muted, #555);
      pointer-events: none;
    }

    /* Elapsed fill (left of playhead) */
    .play-fill {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      background: var(--ll-accent, #7ec8e3);
      pointer-events: none;
    }

    /* Playhead dot */
    .play-dot {
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: var(--ll-accent, #7ec8e3);
      pointer-events: none;
      z-index: 10;
      transition: transform 0.1s ease;
    }

    /* Section zone -- placeholder */
    .zone--section {
      background: var(--ll-surface, #252525);
    }

    /* Loop-mark zone -- placeholder */
    .zone--loop {
      background: var(--ll-surface-raised, #2a2a2a);
    }
  `;

  static properties = {
    videoId:     { type: String },
    currentTime: { type: Number },
    duration:    { type: Number },
    sections:    { type: Array },
    marks:       { type: Array },
    loopStart:   { type: Number },
    loopEnd:     { type: Number },
    scopeStart:  { type: Number },
    scopeEnd:    { type: Number },
  };

  constructor() {
    super();
    this.videoId     = null;
    this.currentTime = 0;
    this.duration    = null;
    this.sections    = [];
    this.marks       = [];
    this.loopStart   = 0;
    this.loopEnd     = 0;
    this.scopeStart  = null;
    this.scopeEnd    = null;
  }

  // Convert a time value (seconds) to a percentage of the visible range.
  _pct(t) {
    const start = this.scopeStart ?? 0;
    const end   = this.scopeEnd   ?? this.duration;
    if (!end || end <= start) return 0;
    return Math.max(0, Math.min(100, ((t - start) / (end - start)) * 100));
  }

  // Format seconds as m:ss.
  _fmt(secs) {
    if (secs == null) return '?';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  // Build displayable region objects from the sorted sections array.
  // Used in Stage 18b; kept here to avoid churn.
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

  _onPlayZoneClick(e) {
    if (!this.duration) return;
    const start = this.scopeStart ?? 0;
    const end   = this.scopeEnd   ?? this.duration;
    const rect  = e.currentTarget.getBoundingClientRect();
    const pct   = (e.clientX - rect.left) / rect.width;
    const time  = Math.max(start, Math.min(end, start + pct * (end - start)));
    this.dispatchEvent(new CustomEvent('ll-seek-to', {
      bubbles: true, composed: true, detail: { time },
    }));
  }

  render() {
    if (!this.duration) {
      const msg = this.videoId ? 'Loading...' : 'No video loaded';
      return html`
        <div class="timeline-wrap">
          <div class="no-video">${msg}</div>
        </div>
      `;
    }

    const phPct = this._pct(this.currentTime);

    return html`
      <div class="timeline-wrap">

        <div class="zone zone--play" @click=${this._onPlayZoneClick}>
          <div class="play-track">
            <div class="play-fill" style="width: ${phPct}%"></div>
          </div>
          <div class="play-dot" style="left: ${phPct}%"></div>
        </div>

        <div class="zone zone--section"></div>

        <div class="zone zone--loop"></div>

      </div>
    `;
  }
}

customElements.define('llama-timeline', LlamaTimeline);
