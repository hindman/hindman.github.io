function handleKeyDown(event) {
  // Setup.
  var e, k, msg;
  e = {
    code: event.code,
    shiftKey: event.shiftKey,
    ctrlKey: event.ctrlKey,
    altKey: event.altKey,
    metaKey: event.metaKey,
    keyCode: event.keyCode,
    key: event.key,
    location: event.location
  };

  // The only modifier used by LoopLlama is SHIFT.
  if (e.ctrlKey || e.altKey || e.metaKey) return;

  // Play/pause or change video URL.
  if (e.code == 'Space') {
    doPlayPause();
  } else if (e.code == 'KeyU' && e.shiftKey) {
    shareUrl();
  } else if (e.code == 'KeyU') {
    setUrl();

  // FF, Rew, go to start.
  } else if (e.code == 'ArrowLeft') {
    doSeek(-1, e.shiftKey, false, false);
  } else if (e.code == 'ArrowRight') {
    doSeek(1, e.shiftKey, false, false);
  } else if (SEEK_START_CODES.includes(e.code)) {
    doSeek(0, false, true, false);
  } else if (e.code == 'KeyJ') {
    doSeek(0, false, false, true);
  } else if (e.code == 'ArrowDown') {
    flipSeekAmount();

  // Speed.
  } else if (e.code == 'Minus') {
    adjustSpeed(-1, e.shiftKey, false);
  } else if (e.code == 'Equal') {
    adjustSpeed(1, e.shiftKey, false);
  } else if (e.code == 'Backspace') {
    adjustSpeed(0, false, true);

  // Loop: handle-saved, toggle, or set start/end.
  } else if (e.code == 'KeyL' && e.shiftKey) {
    handleSavedLoop();
  } else if (e.code == 'KeyL') {
    toggleLooping();
  } else if (BRACKET_CODES.includes(e.code)) {
    setLoopPoint(e.code == 'BracketLeft', e.shiftKey);

  // Marks.
  } else if (DIGIT_CODES.includes(e.code)) {
    handleMark('m' + e.code.slice(-1), e.shiftKey);

  // Help text and app info.
  } else if (e.code == 'KeyH') {
    displayInfo(null, HELP_TEXT);
  } else if (e.code == 'KeyI') {
    displayInfo('APP-INFO', appInfoJson());

  // Favorites.
  } else if (e.code == 'KeyF') {
    handleFavorite();

  // Retore, save, or clear localStorage.
  } else if (e.code == 'KeyS' && e.shiftKey) {
    restoreAppInfo();

  } else if (e.code == 'KeyS') {
    saveAppInfo();

  } else if (e.code == 'KeyC' && e.shiftKey) {
    clearStorage();

  }
}

//
// Start a new video.
//


function handleSavedLoop() {
  // Manages saved loops:
  //
  //   N   Load save loop N.
  //   sN  Save current loop to loop N.
  //   -N  Reset loop N.
  //
  var msg, reply, m, k;

  // Prompt user and return on empty reply.
  msg = [
    'Saved loops:',
    '- Load a saved loop: N',
    '- Save current loop: sN',
    '- Delete a saved loop: -N'
  ].join('\n');
  m = getReplyRgx(msg, /^[s\-]?[1-9]$/);
  if (! m) return;

  // Save, reset, or load.
  reply = m[0];
  k = 'L' + reply.slice(-1);
  if (reply.includes('-')) {
    // Reset.
    vi[k] = null;
    updateSavedLoopsHtml();
  } else if (reply.includes('s')) {
    // Save.
    if (loopIsDefined(vi)) {
      vi[k] = {start: vi.start, end: vi.end};
      updateSavedLoopsHtml();
    }
  } else {
    // Load.
    if (loopIsDefined(vi[k])) {
      vi.start = vi[k].start;
      vi.end = vi[k].end;
      updateLoopHtml();
    }
  }
}

//
// Set or delete marks.
//


function handleMark(m, manage) {
  var curr, msg, d;
  curr = player.getCurrentTime();
  if (manage) {
    // Bail if empty reply.
    msg = [
      `Mark ${m}:`,
      '- Set: M:SS',
      '- Nudge: SS or -SS',
      '- Reset: .'
    ].join('\n');
    d = getReplySetNudge(msg, toMinSec(curr, 0));
    if (! d) return;
    // Otherwise, set the mark based on the kind of reply we got.
    if (d.set !== null) {
      vi[m] = bounded(d.set, 0, vi.duration);
    } else if (d.nudge !== null) {
      vi[m] = bounded(vi[m] + d.nudge, 0, vi.duration);
    } else if (d.reset) {
      vi[m] = null;
    }
    updateMarksHtml();
  } else {
    player.seekTo(vi[m]);
  }
}

//
// Set or switch to favorite videos.
//


function handleFavorite() {
  // User reply syntax:
  //   KEY          # Open a favorite.
  //   KEY URL      # Define a favorite.
  //   KEY .        # Same, using current URL.
  //   KEY -        # Delete a favorite.
  var prefix, msg, save, reply, xs, vid, k, v;
  prefix = '';
  msg = [
    'Favorites:',
    '- Open: KEY',
    '- Define: KEY URL',
    '- Define using current video: KEY .',
    '- Delete: KEY -',
  ].join('\n');
  save = false;
  while (true) {
    reply = getReply(prefix + msg);
    if (reply == '') return;
    xs = reply.split(' ');
    if (xs.length == 1) {
      // Switch to an existing favorite.
      k = xs[0];
      vid = favs[k];
      if (vid) {
        vi.vid = vid;
        save = true;
        initializeVideo(null);
        break;
      } else {
        prefix = 'KEY does not exist.\n\n';
      }
    } else if (xs.length == 2 && xs[1] == '-') {
      // Delete a favorite.
      k = xs[0];
      delete favs[k];
      save = true;
      break;
    } else if (xs.length == 2) {
      // Create a favorite using supplied URL or current video.
      k = xs[0];
      v = xs[1];
      vid = v == '.' ? vi.vid : urlToVideoId(v);
      if (vid) {
        favs[k] = vid;
        save = true;
        break;
      } else {
        prefix = 'Invalid URL.\n\n';
      }
    } else {
      prefix = 'Invalid reply.\n\n';
    }
  }
  // Persist if changes were made.
  if (save) {
    localStorage.setItem(FAVS_KEY, JSON.stringify(favs));
    updateFavsHtml();
  }
}

//
// Sharing a LoopLlama URL.
//
