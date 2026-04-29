// llama-cloud-status-modal.js -- read-only modal comparing local vs cloud state.
//
// API:
//   show({ localOnly, localNewer, cloudOnly, cloudNewer, same })
//     Each array contains { name, id } objects.
//   hide()

import { LitElement, html, css } from 'lit';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import './llama-modal.js';

class LlamaCloudStatusModal extends LitElement {
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
    .vid-id {
      color: var(--ll-text-dim, #aaa);
      margin-left: 0.3em;
    }
    .section-empty {
      color: var(--ll-text-muted, #888);
      font-style: italic;
      padding-left: 0.75rem;
      font-size: var(--ll-text-sm, 0.85rem);
    }
  `;

  static properties = {
    _data: { state: true },
  };

  constructor() {
    super();
    this._data = null;
  }

  show(data) {
    this._data = data;
    this.renderRoot.querySelector('llama-modal')?.show();
  }

  hide() {
    this.renderRoot.querySelector('llama-modal')?.hide();
  }

  _onInitialFocus() {
    this.renderRoot.querySelector('sl-button')?.focus();
  }

  _renderGroup(label, names) {
    return html`
      <div class="group">
        <div class="group-header">${label} (${names.length})</div>
        ${names.length > 0
          ? html`<ul class="name-list">${names.map(v => html`<li>${v.name}<span class="vid-id">${v.id}</span></li>`)}</ul>`
          : html`<div class="section-empty">None</div>`}
      </div>
    `;
  }

  render() {
    const d = this._data;
    return html`
      <llama-modal
        label="Compare: library and cloud"
        width="44rem"
        @ll-modal-initial-focus=${this._onInitialFocus}
      >
        ${d ? html`
          <div class="body">
            ${this._renderGroup('Library only', d.localOnly)}
            ${this._renderGroup('Library newer', d.localNewer)}
            ${this._renderGroup('Cloud only', d.cloudOnly)}
            ${this._renderGroup('Cloud newer', d.cloudNewer)}
            ${this._renderGroup('Same last-modified', d.same)}
          </div>
        ` : ''}
        <div slot="footer">
          <sl-button variant="primary" @click=${() => this.hide()}>Close</sl-button>
        </div>
      </llama-modal>
    `;
  }
}

customElements.define('llama-cloud-status-modal', LlamaCloudStatusModal);
