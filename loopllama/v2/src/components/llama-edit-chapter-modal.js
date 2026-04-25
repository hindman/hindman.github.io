// llama-edit-chapter-modal.js -- modal to edit an existing chapter.
//
// API:
//   show(chapter, derivedEnd?, validator?) / hide()
//
// Events fired (composed, bubbling):
//   ll-update-chapter  { id, name, start, end }

import { LitElement } from 'lit';
import { modalFieldStyles } from './modal-styles.js';
import { DividerEditMixin } from './divider-edit-mixin.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import './llama-modal.js';

class LlamaEditChapterModal extends DividerEditMixin(LitElement) {
  static styles = modalFieldStyles;
  get _eventName()   { return 'll-update-chapter'; }
  get _entityLabel() { return 'chapter'; }
  get _modalLabel()  { return 'Edit chapter'; }
}

customElements.define('llama-edit-chapter-modal', LlamaEditChapterModal);
