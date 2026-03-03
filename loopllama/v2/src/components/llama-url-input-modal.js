// llama-url-input-modal.js -- modal for entering a YouTube URL or video ID.
//
// Events fired (composed, bubbling):
//   ll-load-url  { url: string }  -- user confirmed a URL
//
// API:
//   show()  -- open the modal (clears the input)
//   hide()  -- close the modal

import { LitElement, html, css } from 'lit';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import './llama-modal.js';

class LlamaUrlInputModal extends LitElement {
  static styles = css`
    .url-hint {
      margin-top: 0.4rem;
      font-size: 0.8rem;
      color: var(--sl-color-neutral-400);
    }
  `;

  static properties = {
    _value: { state: true },
  };

  constructor() {
    super();
    this._value = '';
  }

  show() {
    this._value = '';
    this.renderRoot.querySelector('llama-modal')?.show();
  }

  hide() {
    this.renderRoot.querySelector('llama-modal')?.hide();
  }

  _onInitialFocus() {
    this.renderRoot.querySelector('sl-input')?.focus();
  }

  _onInput(e) {
    this._value = e.target.value;
  }

  _onKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      this._submit();
    }
  }

  _submit() {
    const url = this._value.trim();
    if (!url) return;
    this.dispatchEvent(new CustomEvent('ll-load-url', {
      detail: { url },
      bubbles: true,
      composed: true,
    }));
    this.hide();
  }

  render() {
    return html`
      <llama-modal
        label="Load Video"
        @ll-modal-initial-focus=${this._onInitialFocus}
      >
        <sl-input
          placeholder="YouTube URL or video ID"
          .value=${this._value}
          @sl-input=${this._onInput}
          @keydown=${this._onKeyDown}
          clearable
        ></sl-input>
        <p class="url-hint">Paste a URL or bare video ID (e.g. dQw4w9WgXcQ)</p>

        <div slot="footer">
          <sl-button @click=${this.hide}>Cancel</sl-button>
          <sl-button variant="primary" @click=${this._submit}>Load</sl-button>
        </div>
      </llama-modal>
    `;
  }
}

customElements.define('llama-url-input-modal', LlamaUrlInputModal);
