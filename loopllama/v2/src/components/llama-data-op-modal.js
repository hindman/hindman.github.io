// llama-data-op-modal.js -- unified data-operation prompt for ds/dr/di.
//
// API:
//   show({ conflicts, orphans, conflictsHeader?, orphansHeader? })
//     conflicts:       Array of video name strings with version conflicts.
//     orphans:         Array of video name strings present only at destination.
//     conflictsHeader: Optional section heading.
//                      Default: 'Version conflicts'
//     orphansHeader:   Optional section heading.
//                      Default: 'Destination-only videos'
//
//   Each section is only rendered when its array is non-empty. Caller
//   should ensure at least one array is non-empty before calling show().
//
//   hide()
//
// Event fired (bubbles + composed) after dialog closes:
//   ll-data-op-result
//     detail: { conflictChoice: 'replace'|'skip', orphanChoice: 'delete'|'keep' }
//             or null if user cancelled.
//
//   conflictChoice defaults to 'skip'; orphanChoice defaults to 'keep'.
//   If a section is not shown its choice still carries the default value.

import { LitElement, html, css } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import './llama-modal.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/radio-group/radio-group.js';
import '@shoelace-style/shoelace/dist/components/radio/radio.js';

class LlamaDataOpModal extends LitElement {
  static styles = css`
    .body {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
      max-height: 65vh;
      overflow-y: auto;
    }
    .section {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .section-heading {
      font-size: var(--ll-text-sm, 0.85rem);
      color: var(--ll-text-muted, #888);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .name-list {
      list-style: none;
      margin: 0;
      padding: 0 0 0 0.75rem;
      display: flex;
      flex-direction: column;
      gap: 0.1rem;
      max-height: 9rem;
      overflow-y: auto;
    }
    .name-list li {
      color: var(--ll-text, #e0e0e0);
      font-size: 0.9rem;
    }
  `;

  static properties = {
    _conflicts:       { state: true },
    _orphans:         { state: true },
    _conflictsHeader: { state: true },
    _orphansHeader:   { state: true },
    _conflictChoice:  { state: true },
    _orphanChoice:    { state: true },
  };

  constructor() {
    super();
    this._conflicts       = [];
    this._orphans         = [];
    this._conflictsHeader = 'Version conflicts';
    this._orphansHeader   = 'Destination-only videos';
    this._conflictChoice  = 'skip';
    this._orphanChoice    = 'keep';
    this._answer          = null;
    this._cancelRef       = createRef();
  }

  show({
    conflicts       = [],
    orphans         = [],
    conflictsHeader = 'Version conflicts',
    orphansHeader   = 'Destination-only videos',
  }) {
    this._conflicts       = conflicts;
    this._orphans         = orphans;
    this._conflictsHeader = conflictsHeader;
    this._orphansHeader   = orphansHeader;
    this._conflictChoice  = 'skip';
    this._orphanChoice    = 'keep';
    this._answer          = null;
    this.renderRoot.querySelector('llama-modal')?.show();
  }

  hide() {
    this.renderRoot.querySelector('llama-modal')?.hide();
  }

  _onDoIt() {
    this._answer = {
      conflictChoice: this._conflictChoice,
      orphanChoice:   this._orphanChoice,
    };
    this.hide();
  }

  _onCancel() {
    this._answer = null;
    this.hide();
  }

  _onInitialFocus() {
    this._cancelRef.value?.focus();
  }

  _onAfterHide() {
    this.dispatchEvent(new CustomEvent('ll-data-op-result', {
      detail: this._answer,
      bubbles: true,
      composed: true,
    }));
    this._answer = null;
  }

  _renderConflictsSection() {
    if (this._conflicts.length === 0) return '';
    return html`
      <div class="section">
        <div class="section-heading">${this._conflictsHeader}</div>
        <ul class="name-list">
          ${this._conflicts.map(n => html`<li>${n}</li>`)}
        </ul>
        <sl-radio-group
          value=${this._conflictChoice}
          @sl-change=${e => { this._conflictChoice = e.target.value; }}
        >
          <sl-radio value="replace">Replace all — overwrite with source version</sl-radio>
          <sl-radio value="skip">Skip conflicts — keep destination version</sl-radio>
        </sl-radio-group>
      </div>
    `;
  }

  _renderOrphansSection() {
    if (this._orphans.length === 0) return '';
    return html`
      <div class="section">
        <div class="section-heading">${this._orphansHeader}</div>
        <ul class="name-list">
          ${this._orphans.map(n => html`<li>${n}</li>`)}
        </ul>
        <sl-radio-group
          value=${this._orphanChoice}
          @sl-change=${e => { this._orphanChoice = e.target.value; }}
        >
          <sl-radio value="delete">Delete — remove from destination</sl-radio>
          <sl-radio value="keep">Keep — leave in destination</sl-radio>
        </sl-radio-group>
      </div>
    `;
  }

  render() {
    return html`
      <llama-modal
        label="Review changes"
        width="38rem"
        @ll-modal-close=${this._onAfterHide}
        @ll-modal-initial-focus=${this._onInitialFocus}
      >
        <div class="body">
          ${this._renderConflictsSection()}
          ${this._renderOrphansSection()}
        </div>
        <div slot="footer" style="display:flex; gap:0.5rem; justify-content:flex-end">
          <sl-button variant="primary" @click=${this._onDoIt}>Do it</sl-button>
          <sl-button ${ref(this._cancelRef)} @click=${this._onCancel}>Cancel</sl-button>
        </div>
      </llama-modal>
    `;
  }
}

customElements.define('llama-data-op-modal', LlamaDataOpModal);
