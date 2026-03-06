// llama-timeline.js -- horizontal timeline, 4-zone design.
//
// Zones (top to bottom):
//   Play zone    (24px) -- thick track + dot playhead; click to seek.
//   Section zone (18px) -- section regions; click = seek to section start.
//   Mark zone    (12px) -- mark dots (yellow circles); click = seek to mark time.
//   Loop zone    (18px) -- loop bars; named: click = activate + seek; scratch: seek.
//
// Receives:
//   videoId:     String   -- current video ID, or null if none loaded
//   currentTime: Number   -- current playback position (seconds)
//   duration:    Number   -- total video duration (seconds), or null
//   sections:    Array    -- Section objects { id, time, name, end? }
//   marks:       Array    -- Mark objects { id, time, name }
//   namedLoops:  Array    -- Loop objects { id, start, end, name }
//   loopStart:   Number   -- scratch-loop start (seconds)
//   loopEnd:     Number   -- scratch-loop end (seconds)
//   scopeStart:  Number   -- visible range start (seconds); null = 0
//   scopeEnd:    Number   -- visible range end (seconds); null = duration
//
// Fires (bubbles + composed):
//   ll-seek-to       -- play zone, section, mark, or scratch-loop click; detail.time
//   ll-activate-loop -- named loop bar click; detail.id = loop id

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

    /* Play zone: thick track + dot playhead */

    .zone--play {
      height: 24px;
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

    /* Section zone */
    .zone--section {
      height: 18px;
      background: var(--ll-surface, #252525);
      position: relative;
      overflow: hidden;
    }

    .section-region {
      position: absolute;
      top: 0;
      bottom: 0;
      box-sizing: border-box;
      border-left: 2px solid #666;
      display: flex;
      align-items: center;
      overflow: hidden;
      padding: 0 4px;
      cursor: pointer;
    }

    .section-region:first-child {
      border-left: none;
    }

    /* Alternating background tints so adjacent sections are distinguishable */
    .section-region--even {
      background: rgba(255, 255, 255, 0.04);
    }

    .section-region--odd {
      background: rgba(255, 255, 255, 0.09);
    }

    .section-region--current {
      background: rgba(126, 200, 227, 0.28);
    }

    .section-label {
      font-size: var(--ll-text-xs, 0.75rem);
      color: #aaa;
      white-space: nowrap;
      overflow: hidden;
      pointer-events: none;
    }

    .section-region--current .section-label {
      color: var(--ll-accent, #7ec8e3);
    }

    /* Mark zone */
    .zone--mark {
      height: 12px;
      background: var(--ll-bg, #1a1a1a);
      position: relative;
      overflow: hidden;
    }

    /* Mark dot: small yellow circle, centered vertically in the mark zone */
    .mark-dot {
      position: absolute;
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #f0c040;
      top: 6px;
      transform: translate(-50%, -50%);
      cursor: pointer;
    }

    /* Loop zone */
    .zone--loop {
      height: 18px;
      background: var(--ll-surface-raised, #2a2a2a);
      position: relative;
      overflow: hidden;
    }

    /* Horizontal loop bar: full lane height as hit area, 2px visual line via ::after */
    .loop-bar {
      position: absolute;
      height: 9px;
      background: transparent;
      cursor: pointer;
    }

    .loop-bar::after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      top: 50%;
      height: 2px;
      transform: translateY(-50%);
      background: #c87820;
    }

    .loop-bar--scratch::after {
      background: var(--ll-accent, #7ec8e3);
    }
  `;

  static properties = {
    videoId:     { type: String },
    currentTime: { type: Number },
    duration:    { type: Number },
    sections:    { type: Array },
    marks:       { type: Array },
    namedLoops:  { type: Array },
    loopStart:   { type: Number },
    loopEnd:     { type: Number },
    scopeStart:  { type: Number },
    scopeEnd:    { type: Number },
    _zoneWidth:  { type: Number, state: true },
  };

  constructor() {
    super();
    this.videoId     = null;
    this.currentTime = 0;
    this.duration    = null;
    this.sections    = [];
    this.marks       = [];
    this.namedLoops  = [];
    this.loopStart   = 0;
    this.loopEnd     = 0;
    this.scopeStart  = null;
    this.scopeEnd    = null;
    this._zoneWidth  = 0;
    this._ro         = null;
  }

  firstUpdated() {
    // Observe the host element (always present) rather than .zone--section
    // (which may not exist yet if no video is loaded on first render).
    this._ro = new ResizeObserver(entries => {
      this._zoneWidth = entries[0].contentRect.width;
    });
    this._ro.observe(this);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._ro?.disconnect();
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

  // Returns Lit template for section region divs.
  // Hides the label entirely if the section is too narrow to fit it
  // (avoids truncation/ellipsis). Heuristic: ~7px per character + 8px padding.
  _renderSections() {
    if (!this.sections?.length) return '';
    const regions = this._computeRegions();
    return regions.map((r, i) => {
      const leftPct  = this._pct(r.start);
      const endPct   = r.end != null ? this._pct(r.end) : 100;
      const widthPct = endPct - leftPct;
      const widthPx  = (widthPct / 100) * this._zoneWidth;
      const showLabel  = widthPx >= r.name.length * 7 + 8;
      const tooltip    = `${r.name} (${this._fmt(r.start)})`;
      const parityClass = i % 2 === 0 ? 'section-region--even' : 'section-region--odd';
      const currentClass = r.isCurrent ? 'section-region--current' : parityClass;
      return html`
        <div
          class="section-region ${currentClass}"
          style="left: ${leftPct}%; width: ${widthPct}%"
          title="${tooltip}"
          @click=${() => this._onSectionClick(r)}
        >${showLabel ? html`<span class="section-label">${r.name}</span>` : ''}</div>
      `;
    });
  }

  // Returns true if time t falls within the visible scope.
  _inScope(t) {
    const start = this.scopeStart ?? 0;
    const end   = this.scopeEnd   ?? this.duration;
    return t >= start && t <= end;
  }

  // Returns true if any part of loop overlaps the visible scope.
  _loopInScope(loop) {
    const start = this.scopeStart ?? 0;
    const end   = this.scopeEnd   ?? this.duration;
    return loop.end > start && loop.start < end;
  }

  // Greedy lane packing into 2 loop lanes (indices 0-1).
  // Overflow (3+ overlapping) piles into lane 1.
  _packLoops(loops) {
    const lanes = [[], []];
    for (const loop of [...loops].sort((a, b) => a.start - b.start)) {
      let placed = false;
      for (const lane of lanes) {
        if (!lane.some(l => loop.start < l.end && loop.end > l.start)) {
          lane.push(loop);
          placed = true;
          break;
        }
      }
      if (!placed) lanes[1].push(loop);
    }
    return lanes;
  }

  // Render mark dots for the mark zone (12px, dot center at y=6px).
  _renderMarks() {
    return (this.marks ?? [])
      .filter(m => this._inScope(m.time))
      .map(m => html`
        <div
          class="mark-dot"
          style="left: ${this._pct(m.time)}%"
          title="${m.name}: ${this._fmt(m.time)}"
          @click=${() => this._onMarkClick(m)}
        ></div>
      `);
  }

  // Render loop bars for the loop zone (18px, two 9px lanes).
  // Scratch loop (if valid) is included in packing; rendered in teal.
  _renderLoops() {
    const allLoops = [...(this.namedLoops ?? [])];
    if (this.loopEnd > this.loopStart) {
      allLoops.push({ _scratch: true, start: this.loopStart, end: this.loopEnd });
    }

    const els = [];
    const lanes = this._packLoops(allLoops);
    lanes.forEach((lane, laneIdx) => {
      const barTop = laneIdx * 9 + 4;  // center 2px bar in 9px lane (9/2 - 1 = 3.5 → 4)
      for (const loop of lane) {
        if (!this._loopInScope(loop)) continue;
        const leftPct  = this._pct(loop.start);
        const widthPct = this._pct(loop.end) - leftPct;
        const cls      = loop._scratch ? 'loop-bar loop-bar--scratch' : 'loop-bar';
        const tooltip  = loop._scratch
          ? `Loop: ${this._fmt(loop.start)} – ${this._fmt(loop.end)}`
          : `${loop.name}: ${this._fmt(loop.start)} – ${this._fmt(loop.end)}`;
        els.push(html`
          <div
            class="${cls}"
            style="left: ${leftPct}%; width: ${widthPct}%; top: ${barTop}px"
            title="${tooltip}"
            @click=${() => this._onLoopBarClick(loop)}
          ></div>
        `);
      }
    });
    return els;
  }

  _fireSeekTo(time) {
    this.dispatchEvent(new CustomEvent('ll-seek-to', {
      bubbles: true, composed: true, detail: { time },
    }));
  }

  _onSectionClick(region) {
    this._fireSeekTo(region.start);
  }

  _onMarkClick(mark) {
    this._fireSeekTo(mark.time);
  }

  _onLoopBarClick(loop) {
    if (loop._scratch) {
      this._fireSeekTo(loop.start);
    } else {
      this.dispatchEvent(new CustomEvent('ll-activate-loop', {
        bubbles: true, composed: true, detail: { id: loop.id },
      }));
    }
  }

  _onPlayZoneClick(e) {
    if (!this.duration) return;
    const start = this.scopeStart ?? 0;
    const end   = this.scopeEnd   ?? this.duration;
    const rect  = e.currentTarget.getBoundingClientRect();
    const pct   = (e.clientX - rect.left) / rect.width;
    const time  = Math.max(start, Math.min(end, start + pct * (end - start)));
    this._fireSeekTo(time);
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

        <div class="zone--play" @click=${this._onPlayZoneClick}>
          <div class="play-track">
            <div class="play-fill" style="width: ${phPct}%"></div>
          </div>
          <div class="play-dot" style="left: ${phPct}%"></div>
        </div>

        <div class="zone--section">${this._renderSections()}</div>

        <div class="zone--mark">${this._renderMarks()}</div>

        <div class="zone--loop">${this._renderLoops()}</div>

      </div>
    `;
  }
}

customElements.define('llama-timeline', LlamaTimeline);
