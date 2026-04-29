// llama-data-op-modal.js -- unified data-operation review for ds/dr/di.
//
// API:
//   show({ operation, srcLabel, destLabel,
//          srcOnly, srcNewer, destOnly, destNewer, same })
//     operation:  Label for modal title (e.g. 'import data').
//     srcLabel:   Source label for headings (e.g. 'Import').
//     destLabel:  Destination label for headings (e.g. 'Local').
//     srcOnly:    Array of video name strings present only in source.
//     srcNewer:   Array of video name strings where source is newer.
//     destOnly:   Array of video name strings present only in destination.
//     destNewer:  Array of video name strings where destination is newer.
//     same:       Array of video name strings with equal last-modified.
//
//   hide()
//
// Event fired (bubbles + composed) after dialog closes:
//   ll-data-op-result
//     detail: { addSrcOnly, replaceSrcNewer, deleteDestOnly,
//               replaceDestNewer, replaceSame } (all booleans)
//             or null if user cancelled.
//
//   Default choices:
//     addSrcOnly: true, replaceSrcNewer: true, deleteDestOnly: false,
//     replaceDestNewer: false, replaceSame: false.

import { LitElement, html, css } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import './llama-modal.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/switch/switch.js';

class LlamaDataOpModal extends LitElement {
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
    _operation:        { state: true },
    _srcLabel:         { state: true },
    _destLabel:        { state: true },
    _srcOnly:          { state: true },
    _srcNewer:         { state: true },
    _destOnly:         { state: true },
    _destNewer:        { state: true },
    _same:             { state: true },
    _addSrcOnly:       { state: true },
    _replaceSrcNewer:  { state: true },
    _deleteDestOnly:   { state: true },
    _replaceDestNewer: { state: true },
    _replaceSame:      { state: true },
  };

  constructor() {
    super();
    this._operation        = '';
    this._srcLabel         = 'Source';
    this._destLabel        = 'Destination';
    this._srcOnly          = [];
    this._srcNewer         = [];
    this._destOnly         = [];
    this._destNewer        = [];
    this._same             = [];
    this._addSrcOnly       = true;
    this._replaceSrcNewer  = true;
    this._deleteDestOnly   = false;
    this._replaceDestNewer = false;
    this._replaceSame      = false;
    this._answer           = null;
    this._applyRef         = createRef();
    this._cancelRef        = createRef();
  }

  show({
    operation  = '',
    srcLabel   = 'Source',
    destLabel  = 'Destination',
    srcOnly    = [],
    srcNewer   = [],
    destOnly   = [],
    destNewer  = [],
    same       = [],
  }) {
    this._operation        = operation;
    this._srcLabel         = srcLabel;
    this._destLabel        = destLabel;
    this._srcOnly          = srcOnly;
    this._srcNewer         = srcNewer;
    this._destOnly         = destOnly;
    this._destNewer        = destNewer;
    this._same             = same;
    this._addSrcOnly       = true;
    this._replaceSrcNewer  = true;
    this._deleteDestOnly   = false;
    this._replaceDestNewer = false;
    this._replaceSame      = false;
    this._answer           = null;
    this.renderRoot.querySelector('llama-modal')?.show();
  }

  hide() {
    this.renderRoot.querySelector('llama-modal')?.hide();
  }

  get _affectedCount() {
    let n = 0;
    if (this._addSrcOnly)       n += this._srcOnly.length;
    if (this._replaceSrcNewer)  n += this._srcNewer.length;
    if (this._deleteDestOnly)   n += this._destOnly.length;
    if (this._replaceDestNewer) n += this._destNewer.length;
    if (this._replaceSame)      n += this._same.length;
    return n;
  }

  _onApply() {
    this._answer = {
      addSrcOnly:       this._addSrcOnly,
      replaceSrcNewer:  this._replaceSrcNewer,
      deleteDestOnly:   this._deleteDestOnly,
      replaceDestNewer: this._replaceDestNewer,
      replaceSame:      this._replaceSame,
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
    this.dispatchEvent(new CustomEvent('ll-data-op-result', {
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
            @sl-change=${e => { onChange(e.target.checked); setTimeout(() => this._applyRef.value?.focus(), 0); }}
          >${actionLabel}</sl-switch>
          <ul class="name-list">
            ${names.map(n => html`<li>${n}</li>`)}
          </ul>
        ` : html`<div class="section-empty">None</div>`}
      </div>
    `;
  }

  render() {
    const s = this._srcLabel;
    const d = this._destLabel;
    const count = this._affectedCount;
    return html`
      <llama-modal
        label="Review: ${this._operation}"
        width="47.5rem"
        @ll-modal-close=${this._onAfterHide}
        @ll-modal-initial-focus=${this._onInitialFocus}
      >
        <div class="body">
          ${this._renderGroup(
            `${s} only`, this._srcOnly,
            this._addSrcOnly,
            v => { this._addSrcOnly = v; },
            'Add'
          )}
          ${this._renderGroup(
            `${s} newer`, this._srcNewer,
            this._replaceSrcNewer,
            v => { this._replaceSrcNewer = v; },
            'Replace'
          )}
          ${this._renderGroup(
            `${d} only`, this._destOnly,
            this._deleteDestOnly,
            v => { this._deleteDestOnly = v; },
            'Delete'
          )}
          ${this._renderGroup(
            `${d} newer`, this._destNewer,
            this._replaceDestNewer,
            v => { this._replaceDestNewer = v; },
            'Replace'
          )}
          ${this._renderGroup(
            'Same last-modified', this._same,
            this._replaceSame,
            v => { this._replaceSame = v; },
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

customElements.define('llama-data-op-modal', LlamaDataOpModal);
