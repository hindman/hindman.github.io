// llama-jump-time-modal.js -- modal for jumping to a specific time.
//
// Events fired (composed, bubbling):
//   ll-jump-time  { time: number }  -- user confirmed a time (seconds)
//
// API:
//   show()  -- open the modal (clears the input)
//   hide()  -- close the modal

import { LitElement, html, css } from 'lit';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import './llama-modal.js';

class LlamaJumpTimeModal extends LitElement {
  static styles = css`
    .time-hint {
      margin-top: 0.4rem;
      font-size: 0.8rem;
      color: var(--sl-color-neutral-400);
    }
    .time-error {
      margin-top: 0.4rem;
      font-size: 0.8rem;
      color: var(--sl-color-danger-600);
    }
  `;

  static properties = {
    _value:    { state: true },
    _hasError: { state: true },
  };

  constructor() {
    super();
    this._value    = '';
    this._hasError = false;
  }

  show() {
    this._value    = '';
    this._hasError = false;
    this.renderRoot.querySelector('llama-modal')?.show();
  }

  hide() {
    this.renderRoot.querySelector('llama-modal')?.hide();
  }

  _onInitialFocus() {
    this.renderRoot.querySelector('sl-input')?.focus();
  }

  _onInput(e) {
    this._value    = e.target.value;
    this._hasError = false;
  }

  _onKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      this._submit();
    }
  }

  _submit() {
    const time = _parseTime(this._value);
    if (time === null) {
      this._hasError = true;
      return;
    }
    this.dispatchEvent(new CustomEvent('ll-jump-time', {
      detail: { time },
      bubbles: true,
      composed: true,
    }));
    this.hide();
  }

  render() {
    return html`
      <llama-modal
        label="Jump to Time"
        @ll-modal-initial-focus=${this._onInitialFocus}
      >
        <sl-input
          placeholder="e.g. 1:23 or 83"
          .value=${this._value}
          @sl-input=${this._onInput}
          @keydown=${this._onKeyDown}
          clearable
        ></sl-input>
        ${this._hasError
          ? html`<p class="time-error">Invalid time — use m:ss or raw seconds.</p>`
          : html`<p class="time-hint">Enter m:ss (e.g. 1:23) or raw seconds (e.g. 83).</p>`}

        <div slot="footer">
          <sl-button @click=${this.hide}>Cancel</sl-button>
          <sl-button variant="primary" @click=${this._submit}>Go</sl-button>
        </div>
      </llama-modal>
    `;
  }
}

// Parse time string to seconds. Returns null on failure.
// Supports: m:ss, h:mm:ss, raw seconds.
function _parseTime(str) {
  str = (str || '').trim().replace(/\//g, ':');
  if (!str) return null;
  const parts = str.split(':');
  if (parts.length === 2 || parts.length === 3) {
    const nums = parts.map(p => parseFloat(p));
    if (nums.some(isNaN)) return null;
    return parts.length === 2
      ? nums[0] * 60 + nums[1]
      : nums[0] * 3600 + nums[1] * 60 + nums[2];
  }
  const n = parseFloat(str);
  return !isNaN(n) && n >= 0 ? n : null;
}

customElements.define('llama-jump-time-modal', LlamaJumpTimeModal);
