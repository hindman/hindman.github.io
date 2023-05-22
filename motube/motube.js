"use strict";

/*

TODO:

  Share URL

    buildInitialVideoInfo() has most of this working. Currently it returns early.

    If someone gives you a MoTube URL for video X -- but you already have your
    preferred settings for that video -- do you want to accept the URL's
    settings? If yes, a downstream consequence is that the URL's settings will
    become your settings, eventually overwriting whatever preferences you had
    for the video before.

Keyboard shortcuts:

  Category    | Shortcut     | Operation
  ---------------------------------------------------------------------
  Play video  | .            | .
  .           | SPACE        | Play/pause
  .           | U            | Enter URL for YouTube video and switch to it
  .           | F            | Set or switch to a favorite video
  Navigation  | .            | .
  .           | LEFT         | Rew 5 sec (SHIFT for 1 sec)
  .           | RIGHT        | FF 5 sec (SHIFT for 1 sec)
  .           | 0 or UP      | Go to video start (or loop start, if looping)
  .           | J            | Enter a specific MM:SS and jump to it
  Speed       | .            | .
  .           | MINUS        | Slower by .05 (SHIFT for .20)
  .           | EQUAL        | Faster by .05 (SHIFT for .20)
  .           | BACKSPACE    | Reset speed to 1.0
  Looping     | .            | .
  .           | L            | Toggle looping on/off
  .           | [            | Set loop start to current time
  .           | ]            | Set loop end to current time
  .           | SHIFT-[      | Modify loop start by N seconds (prompted)
  .           | SHIFT-]      | Modify loop end by N seconds (prompted)
  Marks       | .            | .
  .           | 1            | Go to mark 1
  .           | SHIFT-1      | Set mark 1 to current time
  .           | CTRL-1       | Unset mark 1
  .           | ...          | Etc for marks 2 through 6
  .           | CTRL-SHIFT-M | Clear all marks
  Application | .            | .
  .           | SHIFT-I      | Display application information
  .           | SHIFT-S      | Save application information as JSON file
  .           | CTRL-SHIFT-S | Restore application information from JSON text
  .           | CTRL-SHIFT-C | Clear application information: all; favorites; or for one video (prompted).

Reference:

  - YouTube docs:

    https://developers.google.com/youtube/iframe_api_reference#Playback_status

  - Some videos to use when working on the code.

    Catfish:   https://www.youtube.com/watch?v=zP4lYpsfL8c
    Muddy:     https://www.youtube.com/watch?v=bnsw4sySaxw
    Hudson:    https://www.youtube.com/watch?v=HxTU8xylgMw
    Jack Ruch: https://www.youtube.com/watch?v=WUm3X_BBQw0
    Country:   https://www.youtube.com/watch?v=8HBvQ9hAr9Y

  - Conclusion about blocked YouTube videos:

    - YouTube won't show some videos if the URL is an IP address.
    - But switching to a hostname (even localhost) will resolve problem.

*/

//
// Constants.
//

const APP_NAME = 'motube';

// Keyboard code.
const BRACKET_CODES = ['BracketLeft', 'BracketRight'];
const SEEK_START_CODES = ['Digit0', 'Numpad0', 'ArrowUp'];
const DIGIT_CODES = [
  'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6',
  'Numpad1', 'Numpad2', 'Numpad3', 'Numpad4', 'Numpad5', 'Numpad6'
];

// Attributes of vi.
const MARK_KEYS = ['m1', 'm2', 'm3', 'm4', 'm5', 'm6'];
const VI_KEYS = ['vid', 'loop', 'start', 'end', 'speed', 'm1', 'm2', 'm3', 'm4', 'm5', 'm6'];

// Attributes of localStorage.
const FAVS_KEY = 'FAVORITES';
const VID_KEY = 'VID';
const NON_VIDEO_KEYS = [FAVS_KEY, VID_KEY];

// HTML.
const HTML_ITEM_SEP = ' | ';
const HTML_MISSING = '_'

//
// Program defaults.
//

// Computations needed to fit the iFrame in the current browser window.
const WINDOW_WIDTH = (
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth
);
const IFRAME_SIZE_FACTOR = Math.floor(.98 * (WINDOW_WIDTH / 16));

const DEFAULTS = {
  // Version number used to ignore persisted video info having older format.
  vi_version: 7,
  // iFrame size.
  width: IFRAME_SIZE_FACTOR * 16,
  height: IFRAME_SIZE_FACTOR * 9,
  // Playback speed.
  speed: {
    def: 1.0,
    min: 0.25,
    max: 2.0,
    delta: 0.05
  }
};

//
// Functions to set up favorites and video-specific information.
//

function buildFavoritesInfo() {
  // Tries to get favs info from localStorage.
  // Returns it or an empty object.
  var s = localStorage.getItem(FAVS_KEY);
  return s ? JSON.parse(s) : {};
}

function buildInitialVideoInfo() {
  // Gets the video ID from the app's URL or localStorage.
  // Returns an object holding that ID and the current vi_version.

  // Partial progress toward getting URL params.
  var p, u, k, names, useUrl, d;

  // Get search params.
  // Determine if it has sufficient params to warrant using it.
  p = new URL(window.location.href).searchParams;
  names = Array.from(p.keys());
  useUrl = names.includes('vid') && names.length > 1;

  // Put all relevant params into an object.
  u = {};
  for (k of VI_KEYS) {
    u[k] = p.get(k);
  }

  // Convert its values to expected types.
  u.loop = !! u.loop;
  u.start = Number(u.start);
  u.end = Number(u.end) || null;
  u.speed = Number(u.speed) || DEFAULTS.speed.def;
  for (k of MARK_KEYS) {
    u[k] = Number(u[k]) || null;
  }

  // Initialize object that will become vi.
  d = {
    vi_version: DEFAULTS.vi_version,
    vid: u.vid || localStorage.getItem(VID_KEY)
  };

  return d;

  // Copy info from u into that object, if we are using the URL.
  if (useUrl) {
    for (k of VI_KEYS) {
      d[k] = u[k];
    }
    d.usedUrl = true;
  }

  // Done.
  return d;
}

function updateVideoInfo(vid) {
  // Takes a video ID. Updates the global vi either to
  // the stored video info or to default values.
  // Called after vi is defined and subsequently whenever the video changes.
  var d, k;

  // console.log('VI_LEN', Object.keys(vi).length);

  vi.duration = null;
  d = getStoredVideoInfo(vid);
  if (d) {
    vi.loop = d.loop;
    vi.start = d.start;
    vi.end = d.end;
    vi.speed = d.speed;
    for (k of MARK_KEYS) {
      vi[k] = d[k];
    }
  } else {
    vi.loop = false;
    vi.start = 0;
    vi.end = null;
    vi.speed = DEFAULTS.speed.def;
    for (k of MARK_KEYS) {
      vi[k] = null;
    }
  }
}

function getStoredVideoInfo(vid) {
  // Take a video ID. Tries to find video info JSON in
  // localStorage. If found and if its vi_version is high
  // enough, returns the stored data.
  var txt, d;
  txt = localStorage.getItem(vid);
  if (txt) {
    d = JSON.parse(txt);
    if (d && d.vi_version && d.vi_version >= DEFAULTS.vi_version) return d;
  }
  return null;
}

//
// Initialize the global shouldPersist, favs, and vi variables.
//
// Uses either the defaults or data from localStorage.
// We do this before creating the YT.player.
//
//  - shouldPersist: if true, will persist localStorage during
//                   updateStatus() monitoring.
//
//  - favs: object mapping each favorite ABBREV to its VIDEO_ID.
//
//  - vi: video information for the current video, having these keys:
//
//      vi_version: VIDEO_INFO_VERSION,
//      vid:        VIDEO_ID,
//      duration:   VIDEO_DURATION,
//      loop:       true|false,
//      start:      SECS,
//      end:        SECS,
//      speed:      PROPORTION,
//      m1 ... m6:  SECS,
//

var shouldPersist = false;

var favs = buildFavoritesInfo();

var vi = buildInitialVideoInfo();
updateVideoInfo(vi.vid);

//
// Set up Youtube player.
//

var player;

function onYouTubeIframeAPIReady() {
  player = new YT.Player(
    'player',
    {
      width: DEFAULTS.width,
      height: DEFAULTS.height,
      events: {'onReady': initializeVideo}
    }
  );
}

//
// Register keyboard listener to handle keyboard events.
//

document.addEventListener('keydown', handleKeyDown);

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

  // None of the MoTube shortcuts use metaKey (CMD on MacOS).
  if (e.metaKey) return;

  // Play/pause or change video URL.
  if (e.code == 'Space') {
    doPlayPause();
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

  // Speed.
  } else if (e.code == 'Minus') {
    adjustSpeed(-1, e.shiftKey, false);
  } else if (e.code == 'Equal') {
    adjustSpeed(1, e.shiftKey, false);
  } else if (e.code == 'Backspace') {
    adjustSpeed(0, false, true);

  // Loop: toggle, start, end.
  } else if (e.code == 'KeyL') {
    toggleLooping();
  } else if (BRACKET_CODES.includes(e.code)) {
    setLoopPoint(
      e.code == 'BracketLeft' ? 'start' : 'end',
      e.shiftKey
    );

  // Marks.
  } else if (DIGIT_CODES.includes(e.code)) {
    handleMark(
      'm' + e.code.slice(-1),
      e.shiftKey,
      e.ctrlKey
    );
  } else if (e.code == 'KeyM' && e.shiftKey && e.ctrlKey) {
    clearMarks();
  } else if (e.code == 'KeyI' && e.shiftKey) {
    doLog('APP-INFO', e.ctrlKey ? '' : appInfoJson());

  // Favorites.
  } else if (e.code == 'KeyF') {
    handleFavorite();

  // Retore, save, or clear localStorage.
  } else if (e.code == 'KeyS' && e.shiftKey && e.ctrlKey) {
    restoreAppInfo();

  } else if (e.code == 'KeyS' && e.shiftKey) {
    saveAppInfo();

  } else if (e.code == 'KeyC' && e.shiftKey && e.ctrlKey) {
    clearStorage();

  }
}

//
// Start a new video.
//

function setUrl() {
  var msg, reply, vid;
  msg = 'Enter YouTube URL';
  while (true) {
    try {
      reply = getReply(msg);
      if (! reply) break;
      vid = urlToVideoId(reply);
      if (vid) {
        vi.vid = vid;
        initializeVideo(null);
        break;
      } else {
        msg = 'Failed to load YouTube video. Try again';
      }
    }
    catch (err) {
      msg = 'Invalid URL. Try again';
    }
  }
}

function initializeVideo(event) {
  // Loads a new video and goes to video/loop start.
  // Called when app loads first video or when users changes
  // to a new video, either via favorites or URL.
  var vid, dur;
  vid = vi.vid;
  if (vid) {
    updateVideoInfo(vid);
    player.loadVideoById(vid);
    player.seekTo(vi.start);
    updateAllHtml();
  }
}

//
// Play, pause.
//

function doPlayPause() {
  if (player.getPlayerState() == YT.PlayerState.PLAYING) {
    player.pauseVideo();
  } else {
    player.playVideo();
  }
}

//
// Seek.
//

function doSeek(direction, small, toStart, toJump) {
  // FF or Rew either 1 or 5 seconds.
  // Or just jump to the video/loop start.
  var secs, curr, loc, msg, reply;
  if (toStart) {
    loc = vi.loop ? vi.start : 0;
  } else if (toJump) {
    msg = 'Enter M:SS location';
    while (true) {
      reply = getReply(msg);
      if (! reply) return;
      secs = fromMinSec(reply);
      if (secs) break;
      msg = 'Invalid reply. Try again';
    }
    loc = bounded(secs, 0, vi.duration);
  } else {
    secs = direction * (small ? 1 : 5);
    curr = player.getCurrentTime();
    loc = bounded(curr + secs, 0, vi.duration);
  }
  player.seekTo(loc);
}

//
// Adjust playback speed.
//

function adjustSpeed(direction, big, reset) {
  var speed, delta;
  if (reset) {
    speed = DEFAULTS.speed.def;
  } else {
    delta = (big ? 4 : 1) * DEFAULTS.speed.delta * direction;
    speed = bounded(
      player.getPlaybackRate() + delta,
      DEFAULTS.speed.min,
      DEFAULTS.speed.max
    );
  }
  vi.speed = speed;
  player.setPlaybackRate(speed);
  updateSpeedHtml();
}

//
// Set or adjust loop start/end points.
//

function toggleLooping() {
  vi.loop = ! vi.loop;
  updateLoopHtml();
}

function setLoopPoint(k, nudge) {
  // Sets or nudges the loop start or end.
  // A nudge moves the loop point by positive or negative N seconds.
  var msg, reply, delta, lp, ok;

  // Compute the new loop point.
  if (nudge) {
    NUDGE_REPLY: while (true) {
      msg = 'Enter amount to adjust loop ' + k
      while (true) {
        reply = getReply(msg);
        if (! reply) return;
        delta = parseFloat(reply);
        if (! isNaN(delta)) break NUDGE_REPLY;
        msg = 'Invalid reply. Try again';
      }
    }
    lp = bounded(vi[k] + delta, 0, vi.duration);
  } else {
    lp = player.getCurrentTime();
  }

  // Set the new loop point only if it would preverse START < END.
  ok = (k == 'start' && lp < vi.end) || (k == 'end' && vi.start < lp);
  if (ok) {
    vi[k] = lp;
    updateLoopHtml();
  }
}

//
// Set or delete marks.
//

function handleMark(m, shouldSet, shouldDelete) {
  if (shouldDelete) {
    vi[m] = null;
    updateMarksHtml();
  } else if (shouldSet) {
    vi[m] = player.getCurrentTime();
    updateMarksHtml();
  } else if (vi[m] !== null) {
    player.seekTo(vi[m]);
  }
}

function clearMarks() {
  for (k of MARK_KEYS) {
    vi[k] = null;
  }
  updateMarksHtml();
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
  var msg = 'Enter favorite: KEY | KEY URL | KEY . | KEY -';
  var reply, xs, vid, k, v;
  var save = false;
  while (true) {
    reply = getReply(msg);
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
        msg = 'KEY does not exist. Try again';
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
        msg = 'Invalid URL. Try again';
      }
    } else {
      msg = 'Invalid reply. Try again';
    }
  }
  // Persist if changes were made.
  if (save) {
    localStorage.setItem(FAVS_KEY, JSON.stringify(favs));
    updateFavsHtml();
  }
}

//
// Functions to clear, restore, save, or display application info.
//

function appInfoJson() {
  // Returns localStorage as prety-printed JSON.
  var d = {vi: vi};
  for (const [k, v] of Object.entries(localStorage)) {
    try {
      d[k] = JSON.parse(v);
    }
    catch (err) {
      d[k] = v;
    }
  }
  return JSON.stringify(d, null, 2);
}

function clearStorage() {
  // After confirmation clears localStorage of everything or just favorites.
  var msg, reply;
  msg = 'Enter what to clear: favs | ALL | VIDEO_ID';
  reply = getReply(msg);
  if (reply == 'favs') {
    favs = {};
    localStorage.setItem(FAVS_KEY, JSON.stringify(favs));
    updateAllHtml();
  } else if (reply == 'ALL') {
    localStorage.clear();
    updateAllHtml();
  } else if (! NON_VIDEO_KEYS.includes(reply)) {
    localStorage.removeItem(reply);
  }
}

function saveAppInfo() {
  // Download localStorage as JSON file.
  const file = new Blob([appInfoJson()], {type: 'text/plain'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(file);
  a.download = APP_NAME + '.json';
  document.body.appendChild(a);
  a.click();
  a.remove();
}

function restoreAppInfo() {
  // Prompt user for JSON text. Uses it to restore localStorage.
  var msg, reply, d, k, v;

  // Get JSON from user.
  msg = 'Enter application information as JSON';
  while (true) {
    reply = getReply(msg);
    if (! reply) return;
    try {
      d = JSON.parse(reply);
      break;
    }
    catch (err) {
      msg = 'Invalid JSON. Try again';
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

function bounded(n, lower, upper) {
  // Takes a number. Returns either it or an upper/lower bound.
  return Math.min(upper, Math.max(lower, n));
}

function toMinSec(n) {
  // Takes a number of seconds. Returns a 'M:SS' string.
  if (n == null) {
    return HTML_MISSING;
  }
  n = Math.round(n);
  var mins = Math.floor(n / 60);
  var secs = n - mins * 60;
  secs = secs.toString().padStart(2, '0');
  return `${mins}:${secs}`;
}

function fromMinSec(txt) {
  // Takes a MM:SS string. Returns N of seconds.
  var m, s;
  try {
    [m, s] = txt.split(':');
    return 60 * parseInt(m) + parseInt(s);
  }
  catch (err) {
    return null;
  }
}

function getReply(msg) {
  // Prompts user. Returns reply string or ''.
  var reply = prompt(msg) || '';
  return reply.trim();
}

function urlToVideoId(txt) {
  // Takes a URL string. Returns the 'v' or 'vid' query parameter or null.
  var url, p;
  try {
    url = new URL(txt);
    p = url.searchParams;
    return p.get('v') || p.get('vid');
  }
  catch (err) {
    return null;
  }
}

function doLog(label, txt) {
  // Takes a label and some text. Displays both at bottom of HTML.
  const now = new Date().getTime();
  const secs = now.toString().slice(-3);
  const h = secs + ' => ' + label + ' => ' + txt;
  document.getElementById('logId').textContent = h;
}

//
// Functions to update most of the dynamic parts of the HTML.
//

function updateAllHtml() {
  updateSpeedHtml();
  updateLoopHtml();
  updateMarksHtml();
  updateFavsHtml();
}

function updateSpeedHtml() {
  // Speed HTML.
  var div;
  shouldPersist = true;
  div = document.getElementById('speedId');
  if (div && vi.speed) {
    div.innerHTML = vi.speed.toFixed(2);
  }
}

function updateLoopHtml() {
  // Loop HTML.
  var div, txt;
  shouldPersist = true;
  div = document.getElementById('loopId');
  if (div && vi.end && vi.start != null) {
    txt = toMinSec(vi.start) + ' - ' + toMinSec(vi.end);
    if (! vi.loop) {
      txt += ' [off]';
    }
    div.innerHTML = txt;
  }
}

function updateMarksHtml() {
  // Marks HTML.
  var div, txt;
  shouldPersist = true;
  div = document.getElementById('marksId');
  if (div) {
    txt = MARK_KEYS.map(k => toMinSec(vi[k])).join(HTML_ITEM_SEP);
    div.innerHTML = txt;
  }
}

function updateFavsHtml() {
  // Favorites HTML.
  var div, txt;
  shouldPersist = true;
  div = document.getElementById('favoritesId');
  if (div) {
    txt = Object.keys(favs).join(HTML_ITEM_SEP) || HTML_MISSING
    div.innerHTML = txt;
  }
}

//
// Start the updateStatus() monitoring function, which runs every second.
//

function updateStatus() {
  var div, loc, dur, curr;

  if (player) {

    // Set vi attributes: duration and end.
    if (vi.duration === null) {
      dur = player.getDuration();
      if (dur) {
        vi.duration = dur;
        if (vi.end === null) vi.end = dur;
      }
    }

    // Looping.
    if (vi.loop) {
      curr = player.getCurrentTime();
      if (vi.end - curr <= 0 || curr < vi.start) player.seekTo(vi.start);
    }

    // Location HTML.
    loc = player.getCurrentTime();
    if (loc) {
      div = document.getElementById('locationId');
      div.innerHTML = toMinSec(loc);
    }
  }

  // Save video settings.
  if (shouldPersist) {
    localStorage.setItem(VID_KEY, vi.vid);
    localStorage.setItem(vi.vid, JSON.stringify(vi));
    shouldPersist = false;
  }

  // Recur.
  setTimeout(updateStatus, 1000);
}

updateStatus();

