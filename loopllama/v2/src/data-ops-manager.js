// data-ops-manager.js -- cloud, import/export, and sharing operations.
//
// DataOpsManager holds the cloud/data-ops handler methods that were
// previously part of LlamaApp. It holds a reference to the app component
// and calls app state and methods directly.
//
// Module-level exports:
//   DataOpsManager  -- the class
//   parseVideoInput -- YouTube URL/ID parser (also used by llama-app._loadUrl)

import { exportAll as makeExportJson, parseImport,
         loadFromCloud, saveToCloud, deleteFromCloud,
         categorizeVideos } from './storage.js';
import { logVideoLoad } from './analytics.js';
import { signOut } from './auth.js';
import { createShare, shareUrl, fetchShare, shareIdFromUrl,
         buildVideoPayload, buildLoopPayload } from './sharing.js';
import { createVideo, addLoop } from './state.js';


export class DataOpsManager {
  constructor(app) {
    this._app                        = app;
    this._dataOpResolve              = null;
    this._sharedVideoConflictResolve = null;
  }

  // dc: compare local vs cloud, categorize each video, show status modal.
  async dataCompare() {
    const app    = this._app;
    const userId = app.currentUser?.id;
    if (!userId) {
      app._setWarning('Cannot compare local and cloud data: you must be signed in.');
      return;
    }

    const cloudState = await loadFromCloud(userId);
    if (cloudState === false) {
      app._setError('Cannot compare local and cloud data: cloud request failed.');
      return;
    }
    const cloudVideos = cloudState?.videos ?? [];
    const { srcOnly, srcNewer, destOnly, destNewer, same } = categorizeVideos(
      app._appState.videos, cloudVideos
    );
    const _name = v => v.name || v.id;
    app._cloudStatusModalEl?.show({
      localOnly:  srcOnly.map(_name),
      localNewer: srcNewer.map(_name),
      cloudOnly:  destOnly.map(_name),
      cloudNewer: destNewer.map(_name),
      same:       same.map(_name),
    });
  }

  // ds: save local state to cloud. Categorizes all videos into 5 buckets
  // (local = source, cloud = dest) and always prompts for review.
  async dataSave() {
    const app    = this._app;
    const userId = app.currentUser?.id;
    if (!userId) {
      app._setWarning('Cannot save data to cloud: you must be signed in.');
      return;
    }

    const cloudState = await loadFromCloud(userId);
    if (cloudState === false) {
      app._setError('Cannot save data to cloud: cloud request failed.');
      return;
    }
    const cloudVideos = cloudState?.videos ?? [];
    const cloudMap = new Map(cloudVideos.map(v => [v.id, v]));
    const localMap = new Map(app._appState.videos.map(v => [v.id, v]));

    const { srcOnly, srcNewer, destOnly, destNewer, same } = categorizeVideos(
      app._appState.videos, cloudVideos
    );

    const result = await this._showDataOp({
      operation: 'cloud save',
      srcLabel:  'Library',
      destLabel: 'Cloud',
      srcOnly:   srcOnly.map(v => v.name || v.id),
      srcNewer:  srcNewer.map(v => v.name || v.id),
      destOnly:  destOnly.map(v => v.name || v.id),
      destNewer: destNewer.map(v => v.name || v.id),
      same:      same.map(v => v.name || v.id),
    });
    if (result === null) return;

    // Build merged video list for cloud upload.
    const mergedVideos = [];

    for (const cv of cloudMap.values()) {
      const lv = localMap.get(cv.id);
      if (!lv) {
        // destOnly: cloud-only
        if (!result.deleteDestOnly) mergedVideos.push(cv);
      } else {
        const cvTs = cv.last_modified ?? 0;
        const lvTs = lv.last_modified ?? 0;
        if (cvTs > lvTs) {
          // destNewer: cloud newer than local
          if (result.replaceDestNewer) mergedVideos.push(lv);
          else mergedVideos.push(cv);
        } else if (lvTs > cvTs) {
          // srcNewer: local newer than cloud
          if (result.replaceSrcNewer) mergedVideos.push(lv);
          else mergedVideos.push(cv);
        } else {
          // same
          if (result.replaceSame) mergedVideos.push(lv);
          else mergedVideos.push(cv);
        }
      }
    }
    for (const lv of srcOnly) {
      if (result.addSrcOnly) mergedVideos.push(lv);
    }

    // stashes are local-only; exclude from cloud upload.
    const { stashes: _s, ...baseState } = app._appState;
    const stateToUpload = { ...baseState, videos: mergedVideos };
    const ok = await saveToCloud(stateToUpload, userId);
    if (ok) {
      app.statusMsg = 'Data: saved to cloud.';
    } else {
      app._setError('Cannot save data to cloud: cloud request failed.');
    }
  }

  // dr: read cloud state into local. Categorizes all videos into 5 buckets
  // (cloud = source, local = dest) and always prompts for review.
  async dataRead() {
    const app    = this._app;
    const userId = app.currentUser?.id;
    if (!userId) {
      app._setWarning('Cannot read data from cloud: you must be signed in.');
      return;
    }

    const cloudState = await loadFromCloud(userId);
    if (cloudState === false) {
      app._setError('Cannot read data from cloud: cloud request failed.');
      return;
    }
    if (!cloudState) {
      app._setWarning('Cannot read data from cloud: no cloud data found.');
      return;
    }

    const cloudVideos = cloudState.videos ?? [];

    const { srcOnly, srcNewer, destOnly, destNewer, same } = categorizeVideos(
      cloudVideos, app._appState.videos
    );

    const result = await this._showDataOp({
      operation: 'cloud read',
      srcLabel:  'Cloud',
      destLabel: 'Library',
      srcOnly:   srcOnly.map(v => v.name || v.id),
      srcNewer:  srcNewer.map(v => v.name || v.id),
      destOnly:  destOnly.map(v => v.name || v.id),
      destNewer: destNewer.map(v => v.name || v.id),
      same:      same.map(v => v.name || v.id),
    });
    if (result === null) return;

    this._mergeIncomingVideos({ srcOnly, srcNewer, destOnly, destNewer, same }, result, cloudVideos);

    // If the current video was replaced by a cloud version, re-sync UI.
    const currentVideo = app._appState.videos.find(v => v.id === app.currentVideoId);
    if (currentVideo) { app._undoMgr.clear(); app._syncFromVideo(currentVideo); }

    app._save();
    app.videos  = [...app._appState.videos];
    app.stashes = { ...app._appState.stashes };
    app.statusMsg = 'Data: read from cloud.';
  }

  // Export all app data as a downloadable JSON file.
  exportAll() {
    const app = this._app;
    app._saveCurrentState();
    const d = new Date();
    const date = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    _downloadJson(makeExportJson(app._appState), `loopllama-${date}.json`);
    app.statusMsg = 'Data: exported.';
  }

  // Create a Supabase-backed share for the current video and surface the URL.
  async createVideoShare() {
    const app = this._app;
    if (!app.currentVideoId) { app._setWarning('No current video.'); return; }
    app._saveCurrentState();
    const video   = app._appState.videos.find(v => v.id === app.currentVideoId);
    const payload = buildVideoPayload(video);
    try {
      const id  = await createShare('video', payload, video.url, video.name || null);
      const url = shareUrl(id);
      navigator.clipboard.writeText(url)
        .then(() => { app.statusMsg = 'Shared video: URL copied to clipboard.'; })
        .catch(() => { app._setError('Cannot provide shared video URL: clipboard blocked.'); });
    } catch (err) {
      app.errorMsg = `Cannot provide shared video URL: ${err.message}.`;
    }
  }

  // Create a Supabase-backed share for the current scratch loop and surface the URL.
  async createLoopShare() {
    const app = this._app;
    if (!app.currentVideoId) { app._setWarning('No current video.'); return; }
    if (!(app.loopStart < app.loopEnd)) {
      app._setWarning('Cannot provide shared scratch loop URL: invalid range.');
      return;
    }
    app._saveCurrentState();
    const video   = app._appState.videos.find(v => v.id === app.currentVideoId);
    const payload = buildLoopPayload(video, app.loopStart, app.loopEnd);
    try {
      const id  = await createShare('loop', payload, video.url, video.name || null);
      const url = shareUrl(id);
      navigator.clipboard.writeText(url)
        .then(() => { app.statusMsg = 'Shared scratch loop: URL copied to clipboard.'; })
        .catch(() => { app._setError('Cannot provide shared scratch loop URL: clipboard blocked.'); });
    } catch (err) {
      app.errorMsg = `Cannot provide shared scratch loop URL: ${err.message}.`;
    }
  }

  // Handle file-picker change: read JSON and hand off to async importer.
  onFileImport(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = '';   // reset so the same file can be re-imported
    const reader = new FileReader();
    reader.onload = async (evt) => { await this.importFromJson(evt.target.result); };
    reader.readAsText(file);
  }

  // JSON import: categorizes all videos into 5 buckets
  // (import = source, local = dest) and always prompts for review.
  async importFromJson(jsonStr) {
    const app = this._app;
    let incoming;
    try {
      incoming = parseImport(jsonStr);
    } catch (err) {
      app.errorMsg = `Cannot import data: ${err.message}.`;
      return;
    }

    // Categorize all videos into 5 buckets (import = source, local = dest).
    const importedVideos = incoming.filter(v => v.id);
    const { srcOnly, srcNewer, destOnly, destNewer, same } = categorizeVideos(
      importedVideos, app._appState.videos
    );

    const result = await this._showDataOp({
      operation: 'import data',
      srcLabel:  'File',
      destLabel: 'Library',
      srcOnly:   srcOnly.map(v => v.name || v.id),
      srcNewer:  srcNewer.map(v => v.name || v.id),
      destOnly:  destOnly.map(v => v.name || v.id),
      destNewer: destNewer.map(v => v.name || v.id),
      same:      same.map(v => v.name || v.id),
    });
    if (result === null) return;

    this._mergeIncomingVideos({ srcOnly, srcNewer, destOnly, destNewer, same }, result, importedVideos);

    app.videos  = [...app._appState.videos];
    app.stashes = { ...app._appState.stashes };
    // If the current video was replaced, re-sync reactive props so stale
    // state isn't flushed back over the imported data on the next video switch.
    const currentVideo = app._appState.videos.find(v => v.id === app.currentVideoId);
    if (currentVideo) { app._undoMgr.clear(); app._syncFromVideo(currentVideo); }
    app._save();
    app.statusMsg = 'Data: imported.';
  }

  // Applies the user's merge choices from the data-op modal to app._appState.
  // categories: { srcOnly, srcNewer, destOnly, destNewer, same } from categorizeVideos.
  // result: resolved data-op modal result object.
  // srcVideos: the source video array (cloud or import); needed to look up the
  // src version for destNewer replacements (destNewer buckets hold dest/local videos).
  // Mutates app._appState.videos and app._appState.stashes in place.
  _mergeIncomingVideos(categories, result, srcVideos = []) {
    const app = this._app;
    const { srcOnly, srcNewer, destOnly, destNewer, same } = categories;
    const srcMap = new Map(srcVideos.map(v => [v.id, v]));

    // Remove dest-only (local-only) videos if user chose to delete.
    if (result.deleteDestOnly) {
      const destOnlyIds = new Set(destOnly.map(v => v.id));
      app._appState.videos = app._appState.videos.filter(v => !destOnlyIds.has(v.id));
    }

    // Build index map after potential deleteDestOnly filter.
    const localMap = new Map(app._appState.videos.map((v, i) => [v.id, { v, i }]));

    // Add src-only videos.
    if (result.addSrcOnly) {
      for (const sv of srcOnly) app._appState.videos.push(sv);
    }

    // Replace dest with src for each opted-in conflict bucket (stash displaced local).
    // destNewer buckets hold the dest (local) video; use srcMap to get the src version.
    const replacements = [
      { bucket: srcNewer,  flag: result.replaceSrcNewer  },
      { bucket: destNewer, flag: result.replaceDestNewer },
      { bucket: same,      flag: result.replaceSame      },
    ];
    for (const { bucket, flag } of replacements) {
      if (!flag) continue;
      for (const bv of bucket) {
        const incoming = srcMap.get(bv.id) ?? bv;
        const entry = localMap.get(bv.id);
        if (!entry) continue;
        app._appState.stashes[entry.v.id] = JSON.parse(JSON.stringify(entry.v));
        app._appState.videos[entry.i] = incoming;
      }
    }
  }

  // Show the shared-video conflict modal; resolves to true (replace) or false (skip).
  _showSharedVideoConflict(info) {
    return new Promise(resolve => {
      this._sharedVideoConflictResolve = resolve;
      this._app._sharedVideoConflictModalEl?.show(info);
    });
  }

  // Event handlers for ll-share-conflict-replace / ll-share-conflict-skip.
  // Thin wrappers in llama-app.js delegate here.
  onShareConflictReplace() { this._sharedVideoConflictResolve?.(true);  this._sharedVideoConflictResolve = null; }
  onShareConflictSkip()    { this._sharedVideoConflictResolve?.(false); this._sharedVideoConflictResolve = null; }

  // Data-op modal: resolves to the result object or null (dismissed).
  _showDataOp(params) {
    return new Promise(resolve => {
      this._dataOpResolve = resolve;
      this._app._dataOpModalEl?.show(params);
    });
  }

  // Event handler for ll-data-op-result. Thin wrapper in llama-app.js delegates here.
  onDataOpResult(e) {
    this._dataOpResolve?.(e.detail);
    this._dataOpResolve = null;
  }

  // Apply a 'loop' share payload: add the loop to the video's namedLoops and
  // load it as the active scratch loop.
  applyLoopShare(payload) {
    const app = this._app;
    const { videoUrl, videoTitle, loop, speed } = payload;
    const parsed = parseVideoInput(videoUrl);
    if (!parsed) { app.errorMsg = 'Invalid URL: shared loop.'; return; }

    let video = app._appState.videos.find(v => v.id === parsed.id);
    if (!video) {
      video = createVideo(videoUrl, parsed.id);
      if (videoTitle) video.name = videoTitle;
      app._appState.videos.push(video);
      app.videos = [...app._appState.videos];
    }

    const safeName = _uniqueLoopName(video.loops, loop.name || '');
    const newLoop  = addLoop(video.loops, loop.start, loop.end, safeName);

    app._appState.currentVideoId = video.id;
    app.currentVideoId = video.id;
    app._undoMgr.clear();
    app._syncFromVideo(video);
    app.loopStart = loop.start;
    app.loopEnd   = loop.end;
    app.loopSrc   = { id: newLoop.id, label: safeName || null, type: 'loop', start: loop.start, end: loop.end };
    app.looping   = true;
    if (speed) app._vc.setPlaybackRate(speed);
    app._vc.cueVideo(video.id, loop.start);
    app._save();
    app.statusMsg = 'Shared loop: loaded.';
  }

  // Apply a 'video' share payload: add to registry (or replace after confirm),
  // then switch to it.
  async applyVideoShare(payload) {
    const app = this._app;
    const { videoUrl, videoTitle, sections, namedLoops, marks, chapters,
            speed, start, end } = payload;
    const parsed = parseVideoInput(videoUrl);
    if (!parsed) { app.errorMsg = 'Invalid URL: shared video.'; return; }

    const displayName = videoTitle || parsed.id;
    let video = app._appState.videos.find(v => v.id === parsed.id);

    if (video) {
      const replace = await this._showSharedVideoConflict({
        videoName:      displayName,
        localModified:  video.last_modified ?? null,
        sharedModified: payload.last_modified ?? null,
      });
      if (!replace) {
        return false;
      }
      // Stash the current version before replacing.
      app._appState.stashes[video.id] = JSON.parse(JSON.stringify(video));
      app.stashes = { ...app._appState.stashes };
    } else {
      video = createVideo(videoUrl, parsed.id);
      app._appState.videos.push(video);
    }

    if (videoTitle) video.name = videoTitle;
    video.sections  = sections  ?? [];
    video.marks     = marks     ?? [];
    video.chapters  = chapters  ?? [];
    video.speed     = speed     ?? 1.0;
    video.start     = start     ?? 0;
    video.end       = end       ?? null;
    const sl = payload.scratchLoop ?? {};
    const scratchStart = sl.start ?? 0;
    const scratchEnd   = sl.end   ?? 0;
    video.scratchLoop = {
      start:      scratchStart,
      end:        scratchEnd,
      looping:    (payload.looping && scratchStart < scratchEnd) ? true : false,
      sourceId:   null,
      sourceType: null,
    };
    video.loops = [...(namedLoops ?? [])];
    app.videos = [...app._appState.videos];
    // Don't use _loadVideoObject here: it calls _saveCurrentState() first, which
    // would overwrite the payload data we just set with empty reactive props.
    video.last_opened = Date.now();
    app._appState.currentVideoId = video.id;
    app.currentVideoId = video.id;
    app._undoMgr.clear();
    app._syncFromVideo(video);
    const _startAt = app.looping && app.loopStart < app.loopEnd ? app.loopStart : 0;
    app._vc.cueVideo(video.id, _startAt);
    app.duration = null;
    app._save();
    logVideoLoad(video.id);
    app.statusMsg = 'Shared video: loaded.';
    return true;
  }

  // Check for a Supabase share (?share=id) or legacy loop URL (?v=id&s=start&e=end).
  // Returns true if a share was applied, false otherwise.
  async handleStartupShare() {
    const app     = this._app;
    const shareId = shareIdFromUrl();
    if (shareId) {
      let applied = false;
      try {
        const share = await fetchShare(shareId);
        if (share.share_type === 'loop')  { this.applyLoopShare(share.payload); applied = true; }
        if (share.share_type === 'video') applied = await this.applyVideoShare(share.payload) ?? false;
      } catch (err) {
        app.errorMsg = `Could not load share URL: ${err.message}.`;
      }
      const clean = new URL(window.location.href);
      clean.searchParams.delete('share');
      history.replaceState(null, '', clean.toString());
      return applied;
    }

    // Legacy: ?v=id&s=start&e=end
    return this.handleStartupUrlParams();
  }

  // Parse ?v=id&s=start&e=end startup URL params for loop sharing.
  // Returns true if a shared loop was applied, false otherwise.
  handleStartupUrlParams() {
    const app    = this._app;
    const params = new URLSearchParams(window.location.search);
    const videoId = params.get('v');
    const start   = parseFloat(params.get('s'));
    const end     = parseFloat(params.get('e'));
    if (!videoId || isNaN(start) || isNaN(end) || start >= end) return false;

    // Find or create the video entry.
    let video = app._appState.videos.find(v => v.id === videoId);
    if (!video) {
      video = createVideo(videoId, videoId);
      app._appState.videos.push(video);
      app.videos = [...app._appState.videos];
    }

    app._appState.currentVideoId = video.id;
    app.currentVideoId = video.id;
    app._syncFromVideo(video);
    app.loopStart = start;
    app.loopEnd   = end;
    app._vc.cueVideo(video.id, start);
    app.statusMsg = 'Shared loop: loaded.';
    app._save();

    // Remove the params from the URL bar without reloading the page.
    const clean = new URL(window.location.href);
    clean.searchParams.delete('v');
    clean.searchParams.delete('s');
    clean.searchParams.delete('e');
    history.replaceState(null, '', clean.toString());

    return true;
  }

  // Called when a user signs in (either on page load or after OAuth redirect).
  // Auth only: enables cloud_backup and saves to localStorage.
  async handleSignIn(user) {
    const app = this._app;
    app._appState.options.cloud_backup = true;
    app._save();
    app.statusMsg = 'Signed in.';
  }

  // Sign out and remove the user's cloud data.
  // Disables cloud_backup so the user is not nudged to sign in again.
  async signOutAndRemoveCloudData() {
    const app    = this._app;
    const userId = app.currentUser?.id;
    app._skipSignOutMsg = true;
    if (userId) {
      try {
        await deleteFromCloud(userId);
        app.statusMsg = 'Cloud data: deleted.';
      } catch (err) {
        app._setError(`Cannot delete cloud data: ${err.message}.`);
      }
    }
    app._appState.options.cloud_backup = false;
    app._save();
    await signOut();
  }
}


// --- Module-level helpers ---

// Parse a YouTube URL or bare video ID.
// Returns { id, startTime } or null if the input is not recognizable.
// Exported because llama-app._loadUrl also uses it.
export function parseVideoInput(str) {
  str = str.trim();
  if (!str) return null;

  // Check for bare video ID first (11 YouTube-valid chars). Must come
  // before URL parsing: new URL('https://' + bareId) succeeds because
  // the browser treats the ID as a valid hostname.
  if (/^[A-Za-z0-9_-]{11}$/.test(str)) {
    return { id: str, startTime: 0 };
  }

  let url;
  try {
    url = new URL(str.startsWith('http') ? str : 'https://' + str);
  } catch (_) {
    return null;
  }

  const params    = url.searchParams;
  const startTime = _parseTimeParam(params.get('t') ?? '');

  // watch?v=ID  (standard watch URL)
  let id = params.get('v') ?? null;

  if (!id) {
    // youtu.be/ID  |  youtube.com/shorts/ID  |  youtube.com/embed/ID
    const parts = url.pathname.split('/').filter(Boolean);
    id = parts[parts.length - 1] ?? null;
  }

  return id ? { id, startTime } : null;
}

// Parse a YouTube `t` parameter to seconds.
// Handles plain numbers ("354") and hms notation ("1h23m45s").
function _parseTimeParam(t) {
  if (!t) return 0;
  const n = Number(t);
  if (!isNaN(n)) return n;
  let total = 0;
  const h = t.match(/(\d+)h/);
  const m = t.match(/(\d+)m/);
  const s = t.match(/(\d+(?:\.\d+)?)s/);
  if (h) total += parseInt(h[1]) * 3600;
  if (m) total += parseInt(m[1]) * 60;
  if (s) total += parseFloat(s[1]);
  return total;
}

// Return a loop name that doesn't collide with any existing named loop.
// If the candidate name is taken, appends " (shared)", then " (shared #2)", etc.
function _uniqueLoopName(loops, name) {
  const taken = loops.map(l => l.name);
  if (!taken.includes(name)) return name;
  const base = name ? `${name} (shared)` : '(shared)';
  if (!taken.includes(base)) return base;
  for (let n = 2; n <= 99; n++) {
    const c = name ? `${name} (shared #${n})` : `(shared #${n})`;
    if (!taken.includes(c)) return c;
  }
  return base;
}

// Trigger a JSON file download in the browser.
function _downloadJson(jsonStr, filename) {
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
