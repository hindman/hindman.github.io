// llama-confirm-modal.js -- two- or three-button confirm dialog.
//
// Methods:
//   show({ lines, confirmLabel?, altLabel?, cancelLabel?, defaultButton? })
//     lines:         Array of strings, each rendered as a <p>.
//     confirmLabel:  Label for the primary button (default: "Yes").
//     altLabel:      Label for the optional middle button (default: null = hidden).
//     cancelLabel:   Label for the cancel button (default: "No").
//     defaultButton: Which button gets focus / responds to Enter:
//                    'confirm' | 'cancel' (default: 'cancel').
//
// Events fired (bubbles + composed) after dialog closes:
//   ll-confirm-yes  -- user clicked the primary confirm button
//   ll-confirm-alt  -- user clicked the middle alt button
//   ll-confirm-no   -- user clicked cancel, dismissed via Escape, or clicked backdrop

import { LitElement, html } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import './llama-modal.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';

class LlamaConfirmModal extends LitElement {
  static properties = {
    lines:         { type: Array },
    confirmLabel:  { type: String },
    altLabel:      { type: String },
    cancelLabel:   { type: String },
    defaultButton: { type: String },
  };

  constructor() {
    super();
    this.lines         = [];
    this.confirmLabel  = 'Yes';
    this.altLabel      = null;
    this.cancelLabel   = 'No';
    this.defaultButton = 'cancel';
    this._answer       = 'no';
    this._confirmRef   = createRef();
    this._altRef       = createRef();
    this._cancelRef    = createRef();
  }

  show({ lines, confirmLabel = 'Yes', altLabel = null, cancelLabel = 'No', defaultButton = 'cancel' }) {
    this.lines         = lines;
    this.confirmLabel  = confirmLabel;
    this.altLabel      = altLabel;
    this.cancelLabel   = cancelLabel;
    this.defaultButton = defaultButton;
    this._answer       = 'no';
    this.renderRoot.querySelector('llama-modal')?.show();
  }

  hide() {
    this.renderRoot.querySelector('llama-modal')?.hide();
  }

  _onYes() { this._answer = 'yes'; this.hide(); }
  _onAlt() { this._answer = 'alt'; this.hide(); }
  _onNo()  { this._answer = 'no';  this.hide(); }

  _onInitialFocus() {
    const target = this.defaultButton === 'confirm'
      ? this._confirmRef.value
      : this._cancelRef.value;
    target?.focus();
  }

  // Fires after the closing animation completes -- exactly once per show().
  _onAfterHide() {
    const event = this._answer === 'yes' ? 'll-confirm-yes'
                : this._answer === 'alt' ? 'll-confirm-alt'
                : 'll-confirm-no';
    this.dispatchEvent(new CustomEvent(event, { bubbles: true, composed: true }));
    this._answer = 'no';
  }

  render() {
    return html`
      <llama-modal label="Confirm"
        @ll-modal-close=${this._onAfterHide}
        @ll-modal-initial-focus=${this._onInitialFocus}
      >
        ${this.lines.map(line => html`<p>${line}</p>`)}
        <div slot="footer" style="display:flex; gap:0.5rem; justify-content:flex-end">
          <sl-button variant="primary" ${ref(this._confirmRef)} @click=${this._onYes}>${this.confirmLabel}</sl-button>
          ${this.altLabel ? html`
            <sl-button ${ref(this._altRef)} @click=${this._onAlt}>${this.altLabel}</sl-button>
          ` : ''}
          <sl-button ${ref(this._cancelRef)} @click=${this._onNo}>${this.cancelLabel}</sl-button>
        </div>
      </llama-modal>
    `;
  }
}

customElements.define('llama-confirm-modal', LlamaConfirmModal);
