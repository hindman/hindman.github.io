// llama-modal.js -- reusable base modal wrapping sl-dialog.
//
// Usage:
//   <llama-modal label="Title">
//     body content
//     <div slot="footer">...buttons...</div>
//   </llama-modal>
//
// Props:
//   label: String  -- dialog title
//   width: String  -- optional CSS width for the panel (e.g. "60vw", "40rem");
//                     overrides Shoelace's default of 31rem
//
// Events fired (composed, bubbling):
//   ll-modal-open          -- when dialog begins to open (sl-show)
//   ll-modal-close         -- when dialog finishes closing (sl-after-hide)
//   ll-modal-initial-focus -- when dialog is ready to receive focus;
//                            sl-dialog's default focus has been suppressed,
//                            so the listener must set focus explicitly.
// Methods:
//   show() / hide()

import { LitElement, html } from 'lit';
import '@shoelace-style/shoelace/dist/components/dialog/dialog.js';

class LlamaModal extends LitElement {
  static properties = {
    label: { type: String },
    width: { type: String },
  };

  _emit(name) {
    this.dispatchEvent(new CustomEvent(name, { bubbles: true, composed: true }));
  }

  _onShow()      { this._emit('ll-modal-open'); }
  _onAfterHide() {
    // Defer both the blur and the ll-modal-close event by one tick.
    // Shoelace restores focus to the trigger element after sl-after-hide, so
    // we need to blur after that restore. Deferring ll-modal-close also ensures
    // that re-enabling the keyboard controller happens after the current event
    // loop tick, preventing any in-flight keydown event (e.g. the Enter that
    // closed the modal) from being processed by the keyboard controller.
    setTimeout(() => {
      document.activeElement?.blur();
      this._emit('ll-modal-close');
    }, 0);
  }

  _onInitialFocus(e) {
    e.preventDefault();
    this._emit('ll-modal-initial-focus');
  }

  render() {
    return html`
      <sl-dialog
        label=${this.label ?? ''}
        style=${this.width ? `--width: ${this.width}` : ''}
        @sl-show=${this._onShow}
        @sl-after-hide=${this._onAfterHide}
        @sl-initial-focus=${this._onInitialFocus}
      >
        <slot></slot>
        <slot name="footer" slot="footer"></slot>
      </sl-dialog>
    `;
  }

  show() { this.renderRoot.querySelector('sl-dialog')?.show(); }
  hide() { this.renderRoot.querySelector('sl-dialog')?.hide(); }
}

customElements.define('llama-modal', LlamaModal);
