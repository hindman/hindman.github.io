// llama-edit-section-modal.js -- modal to edit a section's name, start, and end.
//
// API:
//   show(section, derivedEnd?, validator?) / hide()
//
// Events fired (composed, bubbling):
//   ll-update-section  { id, name, start, end }
//     end is null when left blank (open-ended / derive from next divider)

import { LitElement } from 'lit';
import { modalFieldStyles } from './modal-styles.js';
import { DividerEditMixin } from './divider-edit-mixin.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import './llama-modal.js';

class LlamaEditSectionModal extends DividerEditMixin(LitElement) {
  static styles = modalFieldStyles;
  get _eventName()   { return 'll-update-section'; }
  get _entityLabel() { return 'section'; }
  get _modalLabel()  { return 'Edit section'; }
}

customElements.define('llama-edit-section-modal', LlamaEditSectionModal);
