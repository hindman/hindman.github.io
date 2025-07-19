function getStoredVideoInfo(vid) {
  // Take a video ID. Tries to find video info JSON in
  // localStorage. If found and if its version is high
  // enough, returns the stored data.
  var txt, d;
  txt = localStorage.getItem(vid);
  if (txt) {
    d = JSON.parse(txt);
    if (d && d.version && d.version >= DEFAULTS.vi.version) return d;
  }
  return null;
}

//
// Initialize globals before creating YT.player:
//

// If true, will persist localStorage during updateStatus() monitoring.
var shouldPersist = false;

// If true, the behavior of SHIFT as it relates to FF/Rew has been flipped.
var seekFlipped = false;

// Maps each favorite ABBREV to its VIDEO_ID.
var favs = buildInitialFavs();

// Object holding the LoopLlama URL search params.
var initial_url = buildIntialParams();

// Video information for the current video. See DEFAULTS.
var vi = buildVideoInfo();

// YouTube player.
var player;

//
// Function to handle Youtube iFrame when it's ready.
//


function appInfoJson() {
  // Returns localStorage as prety-printed JSON.
  var d = {};
  for (const [k, v] of Object.entries(localStorage)) {
    try {
      d[k] = JSON.parse(v);
    }
    catch (err) {
      d[k] = v;
    }
  }
  d.vi = vi;
  return JSON.stringify(d, null, 2);
}


function clearStorage() {
  // After confirmation clears localStorage of everything or just favorites.
  var prefix, msg, reply, k;
  prefix = '';
  msg = [
    'Enter what to clear:',
    '- Favorites: favs',
    '- Marks: marks',
    '- Saved loops: loops',
    '- Settings for a video: VIDEO_ID',
    '- Settings for all videos: VIDS',
    '- All: ALL',
  ].join('\n');
  reply = getReply(prefix + msg);
  if (reply == 'favs') {
    // Favorites.
    favs = {};
    localStorage.setItem(FAVS_KEY, JSON.stringify(favs));
  } else if (reply == 'marks') {
    // Marks.
    for (k of MARK_KEYS) {
      vi[k] = null;
    }
  } else if (reply == 'loops') {
    // Loops.
    for (k of LOOP_KEYS) {
      vi[k] = null;
    }
  } else if (reply == 'VIDS') {
    // All video info.
    for (k of Object.keys(localStorage)) {
      if (! NON_VIDEO_KEYS.includes(k)) {
        localStorage.removeItem(k);
      }
    }
  } else if (reply == 'ALL') {
    // Everything.
    localStorage.clear();
  } else if (! NON_VIDEO_KEYS.includes(reply)) {
    // Info for one video.
    localStorage.removeItem(reply);
  }
  updateAllHtml();
}


function saveAppInfo() {
  // Download localStorage as JSON file.
  const file = new Blob([appInfoJson()], {type: 'text/plain'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(file);
  a.download = APP_NAME.toLowerCase() + '.json';
  document.body.appendChild(a);
  a.click();
  a.remove();
}


function restoreAppInfo() {
  // Prompt user for JSON text. Uses it to restore localStorage.
  var prefix, msg, reply, d, k, v;

  // Get JSON from user.
  prefix = '';
  msg = 'Enter application information as JSON';
  while (true) {
    reply = getReply(msg + prefix);
    if (! reply) return;
    try {
      d = JSON.parse(reply);
      break;
    }
    catch (err) {
      prefix = 'Invalid JSON.\n\n';
    }
  }

  // Clear localStorage.
  localStorage.clear();

  // Store favorites.
  k = FAVS_KEY;
  favs = d[k] || {};
  localStorage.setItem(k, JSON.stringify(favs));

  // Store video-specific information.
  for ([k, v] of Object.entries(d)) {
    if (! NON_VIDEO_KEYS.includes(k)) {
      localStorage.setItem(k, JSON.stringify(v));
    }
  }

  // HTML.
  updateAllHtml();
}

//
// Helpers.
//
