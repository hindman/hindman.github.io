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

class LlamaSharedVideoConflictModal extends LitElement {
  static styles = css`
    .video-name {
      font-weight: 500;
    }
    .dates {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
      font-size: var(--ll-text-sm, 0.85rem);
      color: var(--ll-text-muted, #888);
      margin-top: 0.25rem;
    }
    .stash-note {
      font-size: var(--ll-text-sm, 0.85rem);
      color: var(--ll-text-muted, #888);
    }
    .help-icon {
      font-size: var(--ll-text-xs, 0.75rem);
      color: var(--ll-text-dim, #aaa);
      cursor: default;
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
      >
        <p><span class="video-name">${this._videoName}</span> is already in your library.
        Replace your copy with the shared version?</p>

        ${showDates ? html`
          <div class="dates">
            ${this._localModified  ? html`<span>Your copy: ${this._fmtDate(this._localModified)}</span>`    : ''}
            ${this._sharedModified ? html`<span>Shared copy: ${this._fmtDate(this._sharedModified)}</span>` : ''}
          </div>
        ` : ''}

        <p class="stash-note">
          Replacing stashes the current version for recovery
          <sl-tooltip content="Open the video and press vu (Video > Unstash) to restore the prior version.">
            <span class="help-icon">ⓘ</span>
          </sl-tooltip>
        </p>

        <div slot="footer" style="display:flex; gap:0.5rem; justify-content:flex-end">
          <sl-button variant="primary" @click=${this._onReplace}>Replace</sl-button>
          <sl-button ${ref(this._skipRef)} @click=${this._onSkip}>Skip</sl-button>
        </div>
      </llama-modal>
    `;
  }
}

customElements.define('llama-shared-video-conflict-modal', LlamaSharedVideoConflictModal);
