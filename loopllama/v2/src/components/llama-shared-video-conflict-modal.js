// llama-shared-video-conflict-modal.js -- conflict prompt for shared video import.
//
// Shown when a shared video already exists in the user's library.
//
// Methods:
//   show({ videoName, localModified?, sharedModified? })
//     videoName:      Display name of the conflicting video.
//     localModified:  ms epoch of the local video's last_modified (or null).
//     sharedModified: ms epoch of the shared video's last_modified (or null).
//
// Events fired (bubbles + composed) after dialog closes:
//   ll-share-conflict-replace  -- user chose to replace local with shared version
//   ll-share-conflict-skip     -- user chose to skip, or dismissed via Escape/backdrop

import { LitElement, html, css } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import './llama-modal.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip.js';

const TOOLTIP = 'Skip does nothing, leaving your local copy in place. '
  + 'Replace first stashes a copy of your local video before loading the '
  + 'shared copy into your library. Later, you can restore the prior local '
  + 'copy using vu (Video \u203a Unstash).';

class LlamaSharedVideoConflictModal extends LitElement {
  static styles = css`
    .top-info {
      margin: -1.25rem 0 1rem;
    }
    .help-icon {
      font-size: var(--ll-text-xs, 0.75rem);
      color: var(--ll-text-dim, #aaa);
      cursor: default;
      user-select: none;
    }
    .section-heading {
      font-size: var(--ll-text-sm, 0.85rem);
      font-weight: bold;
      color: var(--ll-accent, #7ec8e3);
      margin-bottom: 0.25rem;
    }
    .video-name {
      font-weight: 500;
      padding-left: 1rem;
      margin-bottom: 0.75rem;
    }
    .dates {
      display: grid;
      grid-template-columns: max-content 1fr;
      gap: 0.15rem 0.6rem;
      font-size: var(--ll-text-sm, 0.85rem);
      padding-left: 1rem;
      margin-bottom: 0.75rem;
    }
  `;

  static properties = {
    _videoName:      { state: true },
    _localModified:  { state: true },
    _sharedModified: { state: true },
  };

  constructor() {
    super();
    this._videoName      = '';
    this._localModified  = null;
    this._sharedModified = null;
    this._answer         = 'skip';
    this._skipRef        = createRef();
  }

  show({ videoName, localModified = null, sharedModified = null }) {
    this._videoName      = videoName;
    this._localModified  = localModified;
    this._sharedModified = sharedModified;
    this._answer         = 'skip';
    this.renderRoot.querySelector('llama-modal')?.show();
  }

  hide() {
    this.renderRoot.querySelector('llama-modal')?.hide();
  }

  _onReplace() { this._answer = 'replace'; this.hide(); }
  _onSkip()    { this._answer = 'skip';    this.hide(); }

  _onInitialFocus() {
    this._skipRef.value?.focus();
  }

  _onKeyDown(e) {
    if (e.key === 'Enter') { e.preventDefault(); e.stopPropagation(); this._onSkip(); }
  }

  _onAfterHide() {
    const event = this._answer === 'replace'
      ? 'll-share-conflict-replace'
      : 'll-share-conflict-skip';
    this.dispatchEvent(new CustomEvent(event, { bubbles: true, composed: true }));
    this._answer = 'skip';
  }

  _fmtDate(ms) {
    return new Date(ms).toLocaleString();
  }

  render() {
    const showDates = this._localModified || this._sharedModified;
    return html`
      <llama-modal label="Review conflict: shared video"
        @ll-modal-close=${this._onAfterHide}
        @ll-modal-initial-focus=${this._onInitialFocus}
        @keydown=${this._onKeyDown}
      >
        <div class="top-info">
          <sl-tooltip content=${TOOLTIP}>
            <span class="help-icon">ⓘ</span>
          </sl-tooltip>
        </div>

        <div class="section-heading">Video</div>
        <div class="video-name">${this._videoName}</div>

        ${showDates ? html`
          <div class="section-heading">Last modified</div>
          <div class="dates">
            ${this._localModified  ? html`<span>Local</span><span>${this._fmtDate(this._localModified)}</span>`   : ''}
            ${this._sharedModified ? html`<span>Shared</span><span>${this._fmtDate(this._sharedModified)}</span>` : ''}
          </div>
        ` : ''}

        <div slot="footer" style="display:flex; gap:0.5rem; justify-content:flex-end">
          <sl-button variant="primary" ${ref(this._skipRef)} @click=${this._onSkip}>Skip</sl-button>
          <sl-button @click=${this._onReplace}>Replace</sl-button>
        </div>
      </llama-modal>
    `;
  }
}

customElements.define('llama-shared-video-conflict-modal', LlamaSharedVideoConflictModal);
