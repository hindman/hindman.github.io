// llama-inspect-modal.js -- dev tool: display full app state as pretty JSON.
//
// API:
//   show(data)  -- open with a snapshot of the given object serialized as JSON
//   hide()
//
// The <pre> is focused on open so Up/Down/PageUp/PageDown scroll natively.
// Enter or Escape dismisses the modal.

import { LitElement, html, css } from 'lit';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import './llama-modal.js';

class LlamaInspectModal extends LitElement {
  static styles = css`
    .json-pre {
      margin: 0;
      padding: 0.5rem;
      font-family: monospace;
      font-size: var(--ll-text-sm, 0.85rem);
      color: var(--ll-text, #e0e0e0);
      background: var(--ll-surface, #1a1a1a);
      border: 1px solid var(--ll-border, #444);
      border-radius: 4px;
      white-space: pre;
      overflow-y: auto;
      max-height: 72vh;
      outline: none;
      cursor: default;
    }
  `;

  static properties = {
    _json: { state: true },
  };

  constructor() {
    super();
    this._json = '';
  }

  show(data) {
    try {
      this._json = JSON.stringify(data, null, 2);
    } catch (e) {
      this._json = `(serialization error: ${e.message})`;
    }
    this.renderRoot.querySelector('llama-modal')?.show();
  }

  hide() {
    this.renderRoot.querySelector('llama-modal')?.hide();
  }

  _onInitialFocus() {
    this.renderRoot.querySelector('.json-pre')?.focus();
  }

  _onKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.hide();
    }
  }

  render() {
    return html`
      <llama-modal
        label="Inspect App Data"
        width="60vw"
        @ll-modal-initial-focus=${this._onInitialFocus}
      >
        <pre class="json-pre" tabindex="0" @keydown=${this._onKeyDown}>${this._json}</pre>
        <div slot="footer">
          <sl-button @click=${this.hide}>Close</sl-button>
        </div>
      </llama-modal>
    `;
  }
}

customElements.define('llama-inspect-modal', LlamaInspectModal);
