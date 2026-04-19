// llama-load-examples-modal.js -- review modal for ae (App > Load examples).
//
// API:
//   show({ newVideos, existingVideos })
//     newVideos:      Array of video name strings not in the library.
//     existingVideos: Array of video name strings already in the library.
//
//   hide()
//
// Event fired (bubbles + composed) after dialog closes:
//   ll-load-examples-result
//     detail: { addNew, replaceExisting } (booleans)
//             or null if user cancelled.
//
//   Default choices:
//     addNew: true, replaceExisting: false.

import { LitElement, html, css } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import './llama-modal.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/switch/switch.js';

class LlamaLoadExamplesModal extends LitElement {
  static styles = css`
    .body {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }
    .group {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }
    .group-header {
      font-size: var(--ll-text-sm, 0.85rem);
      font-weight: bold;
      color: var(--ll-accent, #7ec8e3);
    }
    .name-list {
      list-style: disc;
      margin: 0;
      padding: 0 0 0 1.4rem;
      display: flex;
      flex-direction: column;
      gap: 0.1rem;
    }
    .name-list li {
      color: var(--ll-text, #e0e0e0);
      font-size: 0.9rem;
    }
    .section-empty {
      color: var(--ll-text-muted, #888);
      font-style: italic;
      padding-left: 0.75rem;
      font-size: var(--ll-text-sm, 0.85rem);
    }
  `;

  static properties = {
    _newVideos:      { state: true },
    _existingVideos: { state: true },
    _addNew:         { state: true },
    _replaceExisting:{ state: true },
  };

  constructor() {
    super();
    this._newVideos       = [];
    this._existingVideos  = [];
    this._addNew          = true;
    this._replaceExisting = false;
    this._answer          = null;
    this._applyRef        = createRef();
    this._cancelRef       = createRef();
  }

  show({ newVideos = [], existingVideos = [] }) {
    this._newVideos       = newVideos;
    this._existingVideos  = existingVideos;
    this._addNew          = true;
    this._replaceExisting = false;
    this._answer          = null;
    this.renderRoot.querySelector('llama-modal')?.show();
  }

  hide() {
    this.renderRoot.querySelector('llama-modal')?.hide();
  }

  get _affectedCount() {
    let n = 0;
    if (this._addNew)          n += this._newVideos.length;
    if (this._replaceExisting) n += this._existingVideos.length;
    return n;
  }

  _onApply() {
    this._answer = {
      addNew:          this._addNew,
      replaceExisting: this._replaceExisting,
    };
    this.hide();
  }

  _onCancel() {
    this._answer = null;
    this.hide();
  }

  _onInitialFocus() {
    this._applyRef.value?.focus();
  }

  _onAfterHide() {
    this.dispatchEvent(new CustomEvent('ll-load-examples-result', {
      detail: this._answer,
      bubbles: true,
      composed: true,
    }));
    this._answer = null;
  }

  _renderGroup(label, names, checked, onChange, actionLabel) {
    return html`
      <div class="group">
        <div class="group-header">${label} (${names.length})</div>
        ${names.length > 0 ? html`
          <sl-switch
            ?checked=${checked}
            @sl-change=${e => onChange(e.target.checked)}
          >${actionLabel}</sl-switch>
          <ul class="name-list">
            ${names.map(n => html`<li>${n}</li>`)}
          </ul>
        ` : html`<div class="section-empty">None</div>`}
      </div>
    `;
  }

  render() {
    const count = this._affectedCount;
    return html`
      <llama-modal
        label="Load examples"
        width="47.5rem"
        @ll-modal-close=${this._onAfterHide}
        @ll-modal-initial-focus=${this._onInitialFocus}
      >
        <div class="body">
          ${this._renderGroup(
            'Not in library', this._newVideos,
            this._addNew,
            v => { this._addNew = v; },
            'Add'
          )}
          ${this._renderGroup(
            'Already in library', this._existingVideos,
            this._replaceExisting,
            v => { this._replaceExisting = v; },
            'Replace'
          )}
        </div>
        <div slot="footer" style="display:flex; gap:0.5rem; justify-content:flex-end">
          <sl-button ${ref(this._applyRef)} variant="primary" ?disabled=${count === 0} @click=${this._onApply}>
            Apply${count > 0 ? ` (${count})` : ''}
          </sl-button>
          <sl-button ${ref(this._cancelRef)} @click=${this._onCancel}>Cancel</sl-button>
        </div>
      </llama-modal>
    `;
  }
}

customElements.define('llama-load-examples-modal', LlamaLoadExamplesModal);
