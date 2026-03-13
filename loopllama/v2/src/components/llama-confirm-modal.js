// llama-confirm-modal.js -- simple two-button confirm/cancel dialog.
//
// Methods:
//   show({ lines, confirmLabel?, cancelLabel?, defaultButton? })
//     lines:         Array of strings, each rendered as a <p>.
//     confirmLabel:  Label for the confirm button (default: "Yes").
//     cancelLabel:   Label for the cancel button (default: "No").
//     defaultButton: Which button gets focus / responds to Enter:
//                    'confirm' | 'cancel' (default: 'cancel').
//
// Events fired (bubbles + composed) after dialog closes:
//   ll-confirm-yes  -- user clicked the confirm button
//   ll-confirm-no   -- user clicked cancel, dismissed via Escape, or clicked backdrop

import { LitElement, html } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import './llama-modal.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';

class LlamaConfirmModal extends LitElement {
  static properties = {
    lines:         { type: Array },
    confirmLabel:  { type: String },
    cancelLabel:   { type: String },
    defaultButton: { type: String },
  };

  constructor() {
    super();
    this.lines         = [];
    this.confirmLabel  = 'Yes';
    this.cancelLabel   = 'No';
    this.defaultButton = 'cancel';
    this._answer       = false;
    this._confirmRef   = createRef();
    this._cancelRef    = createRef();
  }

  show({ lines, confirmLabel = 'Yes', cancelLabel = 'No', defaultButton = 'cancel' }) {
    this.lines         = lines;
    this.confirmLabel  = confirmLabel;
    this.cancelLabel   = cancelLabel;
    this.defaultButton = defaultButton;
    this._answer       = false;
    this.renderRoot.querySelector('llama-modal')?.show();
  }

  hide() {
    this.renderRoot.querySelector('llama-modal')?.hide();
  }

  _onYes() { this._answer = true;  this.hide(); }
  _onNo()  { this._answer = false; this.hide(); }

  _onInitialFocus() {
    const target = this.defaultButton === 'confirm'
      ? this._confirmRef.value
      : this._cancelRef.value;
    target?.focus();
  }

  // Fires after the closing animation completes -- exactly once per show().
  _onAfterHide() {
    this.dispatchEvent(new CustomEvent(
      this._answer ? 'll-confirm-yes' : 'll-confirm-no',
      { bubbles: true, composed: true },
    ));
    this._answer = false;
  }

  render() {
    return html`
      <llama-modal label="Confirm"
        @ll-modal-close=${this._onAfterHide}
        @ll-modal-initial-focus=${this._onInitialFocus}
      >
        ${this.lines.map(line => html`<p>${line}</p>`)}
        <div slot="footer" style="display:flex; gap:0.5rem; justify-content:flex-end">
          <sl-button ${ref(this._confirmRef)} @click=${this._onYes}>${this.confirmLabel}</sl-button>
          <sl-button ${ref(this._cancelRef)}  @click=${this._onNo}>${this.cancelLabel}</sl-button>
        </div>
      </llama-modal>
    `;
  }
}

customElements.define('llama-confirm-modal', LlamaConfirmModal);
