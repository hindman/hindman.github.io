// llama-options-modal.js -- modal for editing app-wide options.
//
// API:
//   show(options)  -- open the modal pre-populated with the given options object
//   hide()
//
// Events fired (composed, bubbling):
//   ll-options-saved  { options }  -- full validated options object on save

import { LitElement, html, css } from 'lit';
import { DEFAULT_OPTIONS } from '../state.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip.js';
import './llama-modal.js';

class LlamaOptionsModal extends LitElement {
  static styles = css`
    .field-row {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
      margin-bottom: 0.8rem;
    }
    .field-label {
      font-size: var(--ll-text-sm, 0.85rem);
      color: var(--ll-text-dim, #aaa);
    }
    .section-heading {
      display: flex;
      align-items: center;
      gap: 0.35rem;
      font-size: var(--ll-text-sm, 0.85rem);
      font-weight: bold;
      color: var(--ll-accent, #7eb8f7);
      margin: 0.8rem 0 0.4rem;
      border-bottom: 1px solid var(--ll-border, #444);
      padding-bottom: 0.2rem;
    }
    .help-icon {
      font-size: var(--ll-text-xs, 0.75rem);
      color: var(--ll-text-dim, #aaa);
      cursor: default;
      user-select: none;
    }
    .error-msg {
      color: var(--ll-error, #f87171);
      font-size: var(--ll-text-sm, 0.85rem);
      margin-top: 0.4rem;
      min-height: 1.2em;
    }
  `;

  static properties = {
    _seekDefault:        { state: true },
    _seekChoices:        { state: true },
    _nudgeDefault:       { state: true },
    _nudgeChoices:       { state: true },
    _speedDelta:         { state: true },
    _padStart:           { state: true },
    _padEnd:             { state: true },
    _error:              { state: true },
  };

  constructor() {
    super();
    this._seekDefault  = '';
    this._seekChoices  = '';
    this._nudgeDefault = '';
    this._nudgeChoices = '';
    this._speedDelta   = '';
    this._padStart     = '';
    this._padEnd       = '';
    this._error        = '';
  }

  show(options) {
    const o = options ?? DEFAULT_OPTIONS;
    this._seekDefault  = String(o.seek_delta_default);
    this._seekChoices  = o.seek_delta_choices.join(' ');
    this._nudgeDefault = String(o.loop_nudge_delta_default);
    this._nudgeChoices = o.loop_nudge_delta_choices.join(' ');
    this._speedDelta   = String(Math.round(o.speed_delta * 100));
    this._padStart     = String(o.loop_pad_start);
    this._padEnd       = String(o.loop_pad_end);
    this._error        = '';
    this.renderRoot.querySelector('llama-modal')?.show();
  }

  hide() {
    this.renderRoot.querySelector('llama-modal')?.hide();
  }

  _onInitialFocus() {
    this.renderRoot.querySelector('sl-input[data-field="seek-default"]')?.focus();
  }

  _onKeyDown(e) {
    if (e.key === 'Enter') { e.preventDefault(); this._save(); }
  }

  // Parse a space-delimited string of numbers. Returns sorted array of
  // positive finite numbers, or null if any token is invalid.
  _parseChoices(str) {
    const tokens = str.trim().split(/\s+/).filter(Boolean);
    if (!tokens.length) return null;
    const nums = tokens.map(Number);
    if (nums.some(n => isNaN(n) || !isFinite(n) || n <= 0)) return null;
    return [...new Set(nums)].sort((a, b) => a - b);
  }

  // Parse a single positive finite number string. Returns the number or null.
  _parsePositive(str) {
    const n = Number(str.trim());
    return isNaN(n) || !isFinite(n) || n <= 0 ? null : n;
  }

  // Parse a non-negative finite number string. Returns the number or null.
  _parseNonNeg(str) {
    const n = Number(str.trim());
    return isNaN(n) || !isFinite(n) || n < 0 ? null : n;
  }

  _save() {
    const seekChoices = this._parseChoices(this._seekChoices);
    if (!seekChoices) {
      this._error = 'Seek delta choices: enter space-separated positive numbers.';
      return;
    }
    const seekDefault = this._parsePositive(this._seekDefault);
    if (seekDefault === null) {
      this._error = 'Seek delta default: must be a positive number.';
      return;
    }
    if (!seekChoices.includes(seekDefault)) {
      this._error = 'Seek delta default must be one of the seek delta choices.';
      return;
    }

    const nudgeChoices = this._parseChoices(this._nudgeChoices);
    if (!nudgeChoices) {
      this._error = 'Loop nudge delta choices: enter space-separated positive numbers.';
      return;
    }
    const nudgeDefault = this._parsePositive(this._nudgeDefault);
    if (nudgeDefault === null) {
      this._error = 'Loop nudge delta default: must be a positive number.';
      return;
    }
    if (!nudgeChoices.includes(nudgeDefault)) {
      this._error = 'Loop nudge delta default must be one of the loop nudge delta choices.';
      return;
    }

    const speedPct = this._parsePositive(this._speedDelta);
    if (speedPct === null) {
      this._error = 'Speed delta: must be a positive number.';
      return;
    }
    const speedDelta = speedPct / 100;

    const padStart = this._parseNonNeg(this._padStart);
    if (padStart === null) {
      this._error = 'Pad start: must be a non-negative number.';
      return;
    }
    const padEnd = this._parseNonNeg(this._padEnd);
    if (padEnd === null) {
      this._error = 'Pad end: must be a non-negative number.';
      return;
    }

    const options = {
      seek_delta_default:       seekDefault,
      seek_delta_choices:       seekChoices,
      loop_nudge_delta_default: nudgeDefault,
      loop_nudge_delta_choices: nudgeChoices,
      speed_delta:              speedDelta,
      loop_pad_start:           padStart,
      loop_pad_end:             padEnd,
    };
    this.dispatchEvent(new CustomEvent('ll-options-saved', {
      detail: { options },
      bubbles: true, composed: true,
    }));
    this.hide();
  }

  render() {
    return html`
      <llama-modal label="Options" @ll-modal-initial-focus=${this._onInitialFocus}>

        <div class="section-heading">
          Seek delta
          <sl-tooltip content="How far the seek keys jump (seconds). Default is the starting value; choices are the steps available in the dropdown.">
            <span class="help-icon">ⓘ</span>
          </sl-tooltip>
        </div>

        <div class="field-row">
          <span class="field-label">Default</span>
          <sl-input
            data-field="seek-default"
            .value=${this._seekDefault}
            @sl-input=${e => { this._seekDefault = e.target.value; this._error = ''; }}
            @keydown=${this._onKeyDown}
          ></sl-input>
        </div>
        <div class="field-row">
          <span class="field-label">Choices</span>
          <sl-input
            .value=${this._seekChoices}
            @sl-input=${e => { this._seekChoices = e.target.value; this._error = ''; }}
            @keydown=${this._onKeyDown}
          ></sl-input>
        </div>

        <div class="section-heading">
          Loop nudge delta
          <sl-tooltip content="How far the loop start/end points move when nudged (seconds). Default is the starting value; choices are the steps available in the dropdown.">
            <span class="help-icon">ⓘ</span>
          </sl-tooltip>
        </div>

        <div class="field-row">
          <span class="field-label">Default</span>
          <sl-input
            .value=${this._nudgeDefault}
            @sl-input=${e => { this._nudgeDefault = e.target.value; this._error = ''; }}
            @keydown=${this._onKeyDown}
          ></sl-input>
        </div>
        <div class="field-row">
          <span class="field-label">Choices</span>
          <sl-input
            .value=${this._nudgeChoices}
            @sl-input=${e => { this._nudgeChoices = e.target.value; this._error = ''; }}
            @keydown=${this._onKeyDown}
          ></sl-input>
        </div>

        <div class="section-heading">
          Speed
          <sl-tooltip content="Percentage point change applied each time you speed up or slow down.">
            <span class="help-icon">ⓘ</span>
          </sl-tooltip>
        </div>

        <div class="field-row">
          <span class="field-label">Delta</span>
          <sl-input
            .value=${this._speedDelta}
            @sl-input=${e => { this._speedDelta = e.target.value; this._error = ''; }}
            @keydown=${this._onKeyDown}
          ></sl-input>
        </div>

        <div class="section-heading">
          Loop pad
          <sl-tooltip content="Extra seconds added before and after a section or chapter when you loop it.">
            <span class="help-icon">ⓘ</span>
          </sl-tooltip>
        </div>

        <div class="field-row">
          <span class="field-label">Start</span>
          <sl-input
            .value=${this._padStart}
            @sl-input=${e => { this._padStart = e.target.value; this._error = ''; }}
            @keydown=${this._onKeyDown}
          ></sl-input>
        </div>
        <div class="field-row">
          <span class="field-label">End</span>
          <sl-input
            .value=${this._padEnd}
            @sl-input=${e => { this._padEnd = e.target.value; this._error = ''; }}
            @keydown=${this._onKeyDown}
          ></sl-input>
        </div>

        <div class="error-msg">${this._error}</div>

        <div slot="footer">
          <sl-button @click=${() => this.hide()}>Cancel</sl-button>
          <sl-button variant="primary" @click=${this._save}>Save</sl-button>
        </div>
      </llama-modal>
    `;
  }
}

customElements.define('llama-options-modal', LlamaOptionsModal);
