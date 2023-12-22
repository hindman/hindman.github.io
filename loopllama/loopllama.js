"use strict";

/*

TODO:

  Interface using multi-key shortcuts [probably not]

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

const APP_NAME = 'LoopLlama';

// Keyboard codes.
const BRACKET_CODES = ['BracketLeft', 'BracketRight'];
const SEEK_START_CODES = ['Digit0', 'Numpad0', 'ArrowUp'];
const DIGIT_CODES = [
  'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5',
  'Digit6', 'Digit7', 'Digit8', 'Digit9',
  'Numpad1', 'Numpad2', 'Numpad3', 'Numpad4', 'Numpad5',
  'Numpad6', 'Numpad7', 'Numpad8', 'Numpad9'
];

// Attributes of vi.
const MARK_KEYS = ['m1', 'm2', 'm3', 'm4', 'm5', 'm6', 'm7', 'm8', 'm9'];
const LOOP_KEYS = ['L1', 'L2', 'L3', 'L4', 'L5', 'L6', 'L7', 'L8', 'L9'];

// Attributes of localStorage.
const FAVS_KEY = 'FAVORITES';
const VID_KEY = 'VID';
const NON_VIDEO_KEYS = [FAVS_KEY, VID_KEY];

// HTML.
const HTML_ITEM_SEP = ' | ';
const HTML_MISSING = '_'

// Other.
const NON_VALUES = [null, undefined, NaN];

// Help text.

const HELP_TEXT = `
Keyboard shortcuts
------------------

Category    | Shortcut  | Operation
---------------------------------------------------------------------
Play video  | .         | .
.           | SPACE     | Play/pause
.           | U         | Enter URL for YouTube video and switch to it
.           | F         | Set or switch to a favorite video
.           | SHIFT-U   | Create ${APP_NAME} URL for sharing
Navigation  | .         | .
.           | RIGHT     | FF 5 sec (SHIFT for 1 sec)
.           | LEFT      | Rew 5 sec (SHIFT for 1 sec)
.           | DOWN      | Toggle behavior of SHIFT as it relates to FF/Rew.
.           | 0 or UP   | Go to video start (or loop start, if looping)
.           | J         | Enter a specific MM:SS and jump to it
Speed       | .         | .
.           | MINUS     | Slower by .05 (SHIFT for .20)
.           | EQUAL     | Faster by .05 (SHIFT for .20)
.           | BACKSPACE | Reset speed to 1.0
Looping     | .         | .
.           | L         | Toggle looping on/off
.           | [         | Set loop start to current time
.           | SHIFT-[   | Set, nudge, or reset loop start (prompted)
.           | ]         | Set loop end to current time
.           | SHIFT-]   | Set, nudge, or reset loop end (prompted)
.           | SHIFT-L   | Saved loops: load, save, or reset (prompted)
Marks       | .         | .
.           | 1         | Go to mark 1
.           | SHIFT-1   | Set, nudge, or reset mark 1
.           | ...       | Etc for marks 2 through 9
Application | .         | .
.           | H         | Display/hide help text
.           | I         | Display/hide application info
.           | S         | Save app info as JSON file
.           | SHIFT-S   | Restore app info from JSON text
.           | SHIFT-C   | Clear app info: favorites; marks; info for one
.           | "         | video; info for all videos; or everything.
`.trim();

//
// Program defaults.
//

// Computations needed to fit the iFrame in the current browser window.
const WINDOW_WIDTH = (
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth
);
const IFRAME_SIZE_FACTOR = Math.floor(.75 * (WINDOW_WIDTH / 16));

const DEFAULTS = {
  // iFrame size.
  width: IFRAME_SIZE_FACTOR * 16,
  height: IFRAME_SIZE_FACTOR * 9,
  // Playback speed.
  speed: {
    def: 1.0,
    min: 0.25,
    max: 2.0,
    delta: 0.05
  },
  // Amounts for small and regular seeks (FF or Rew).
  seeks: {
    small: 1,
    regular: 5,
  },
  // Video-specific info.
  vi: {
    version: 9,      // Version number of persisted video info (use to expire outdated info).
    vid: null,       // Current video ID.
    duration: null,  // Duration of current video (seconds).
    loop: false,     // Whether to loop.
    start: 0,        // Loop start (seconds).
    end: null,       // Loop end (seconds).
    speed: 1.0,      // Playback speed (proportion).
    m1: null,        // Marks (seconds).
    m2: null,        //
    m3: null,        //
    m4: null,        //
    m5: null,        //
    m6: null,        //
    m7: null,        //
    m8: null,        //
    m9: null,        //
    L1: null,        // Saved loops: {start: N, end: N} when set.
    L2: null,        //
    L3: null,        //
    L4: null,        //
    L5: null         //
  }
};

//
// Functions to set up favorites and video-specific information.
//

function buildInitialFavs() {
  // Tries to get favs info from localStorage.
  // Returns it or an empty object.
  var s = localStorage.getItem(FAVS_KEY);
  return s ? JSON.parse(s) : {};
}

function buildIntialParams() {
  var params, vid, ks, u, k;

  // Get search params.
  // Determine if they are sufficient to populate vi.
  params = new URL(window.location.href).searchParams;
  vid = params.get('vid');
  ks = Array.from(params.keys());
  if (! vid || ks.length < 2) return null;

  // Put relevant params into an object.
  u = {};
  for (k of Object.keys(DEFAULTS.vi)) {
    u[k] = params.get(k);
  }

  // Convert its values to expected types and return.
  u.version = DEFAULTS.vi.version;
  u.vid = vid;
  u.duration = DEFAULTS.vi.duration;
  u.loop = !! u.loop;
  u.start = Number(u.start) || 0;
  u.end = Number(u.end) || DEFAULTS.vi.end;
  u.speed = Number(u.speed) || DEFAULTS.vi.speed;
  for (k of MARK_KEYS) {
    u[k] = Number(u[k]) || DEFAULTS.vi[k];
  }
  for (k of LOOP_KEYS) {
    u[k] = parseSavedLoopParam(u[k]) || DEFAULTS.vi[k];
  }
  return u;
}

function parseSavedLoopParam(s) {
  // Expects a saved-loop URL param: eg '12.3-33.6'.
  // Returns null or an object holding loop start/end points.
  var xs, ns;
  if (! s) return null;
  xs = s.split('-');
  if (xs.length != 2) return null;
  ns = xs.map(x => parseFloat(x));
  if (xs.includes(NaN)) return null;
  return {start: ns[0], end: ns[1]};
}

function buildVideoInfo() {
  // Returns the initial vi data using the defaults and
  // the video ID either from the LoopLlama URL or from localStorage.
  var d, k, v;
  d = {};
  for ([k, v] of Object.entries(DEFAULTS.vi)) {
    d[k] = v;
  }
  if (initial_url) {
    d.vid = initial_url.vid;
  } else {
    d.vid = localStorage.getItem(VID_KEY) || DEFAULTS.vi.vid;
  }
  return d;
}

function updateVideoInfo(vid) {
  // Takes a video ID (or null).
  // Updates the global vi using (a) initial LoopLlama URL params,
  // (b) stored video-info, or (c) defaults.
  // Called during app start and then whenever the video changes.
  // The LoopLlama URL params should be considered only on the first call.
  var d, k;
  d = initial_url || getStoredVideoInfo(vid) || DEFAULTS.vi;
  for (k of Object.keys(DEFAULTS.vi)) {
    vi[k] = d[k];
  }
  vi.vid = vid;
  initial_url = null;
  shouldPersist = true;
}

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
    player.setPlaybackRate(vi.speed);
    updateAllHtml();
  }
}

function setUrl() {
  var prefix, msg, reply, vid;
  prefix = '';
  msg = 'Enter YouTube URL';
  while (true) {
    try {
      reply = getReply(prefix + msg);
      if (! reply) break;
      vid = urlToVideoId(reply);
      if (vid) {
        vi.vid = vid;
        initializeVideo(null);
        break;
      } else {
        prefix = 'Failed to load YouTube video.\n\n';
      }
    }
    catch (err) {
      prefix = 'Invalid URL.\n\n';
    }
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

function doSeek(direction, shifted, toStart, toJump) {
  // FF or Rew either 1 or 5 seconds.
  // Or just jump to the video/loop start.
  var loc, secs, seeks, i, curr, prefix, msg, reply;
  if (toStart) {
    loc = vi.loop ? vi.start : 0;
  } else if (toJump) {
    prefix = '';
    msg = 'Enter M:SS location';
    while (true) {
      reply = getReply(prefix + msg);
      if (! reply) return;
      secs = fromMinSec(reply);
      if (secs) break;
      prefix = 'Invalid reply.\n\n';
    }
    loc = bounded(secs, 0, vi.duration);
  } else {
    seeks = [DEFAULTS.seeks.regular, DEFAULTS.seeks.small];
    i = (0 + shifted + seekFlipped) % 2;
    secs = direction * seeks[i];
    curr = player.getCurrentTime();
    loc = bounded(curr + secs, 0, vi.duration);
  }
  player.seekTo(loc);
}

function flipSeekAmount() {
  seekFlipped = ! seekFlipped;
}

//
// Adjust playback speed.
//

function adjustSpeed(direction, big, reset) {
  var speed, delta;
  if (reset) {
    speed = DEFAULTS.vi.speed;
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
// Manage loops.
//

function toggleLooping() {
  // Turn looping off or on (the latter if valid).
  if (vi.loop) {
    vi.loop = false;
    updateLoopHtml();
  } else if (vi.start < vi.end) {
    vi.loop = true;
    updateLoopHtml();
  }
}

function setLoopPoint(isStart, manage) {
  // Sets, nudges, or resets the loop start or end.
  var k, curr, msg, d, lp, ok;

  // Setup: current time and the vi key we are using.
  k =  isStart ? 'start' : 'end'
  curr = player.getCurrentTime();

  // Compute the new loop point (lp). By default, it's the current time.
  lp = curr;
  if (manage) {
    // Bail if empty reply.
    msg = [
      `Loop ${k}:`,
      '- Set: M:SS',
      '- Nudge: SS or -SS',
      '- Reset: .'
    ].join('\n');
    d = getReplySetNudge(msg, toMinSec(curr, 0));
    if (! d) return;

    // Otherwise, set lp based on the kind of reply we got.
    if (d.set !== null) {
      lp = bounded(d.set, 0, vi.duration);
    } else if (d.nudge !== null) {
      lp = bounded(vi[k] + d.nudge, 0, vi.duration);
    } else {
      lp = isStart ? 0 : vi.duration;
    }
  }

  // Set the new loop point.
  // We do not enforce START < END here.
  vi[k] = lp;
  updateLoopHtml();
}

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
  m = getReplyRgx(msg, /^[s\-]?[1-5]$/);
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

function shareUrl() {
  var curr, u, p, k, v, v, msg;

  // Initialize a URL based on the current URL.
  curr = new URL(window.location.href);
  u = new URL(curr.origin + curr.pathname)

  // Copy non-null vi info into the URL's search params.
  p = u.searchParams;
  for ([k, v] of Object.entries(vi)) {
    if (LOOP_KEYS.includes(k) && loopIsDefined(v)) {
      v = v.start.toFixed(2) + '-' + v.end.toFixed(2);
      p.set(k, v);
    } else if (v !== null) {
      v = typeof v == 'number' ? v.toFixed(2) : v.toString();
      p.set(k, v);
    }
  }

  // Adjust a couple of params.
  p.delete('version');
  if (! vi.loop) p.delete('loop');

  // Provide URL to user.
  msg = `Copy this ${APP_NAME} URL and share with your friends`;
  prompt(msg, u.toString());
}

//
// Functions to clear, restore, save, or display application info.
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

function bounded(n, lower, upper) {
  // Takes a number. Returns either it or an upper/lower bound.
  return Math.min(upper, Math.max(lower, n));
}

function toMinSec(n, digits = 0) {
  // Takes a number of seconds. Returns a 'M:SS' string.
  if (n == null) {
    return HTML_MISSING;
  }
  var mins = Math.floor(n / 60);
  var secs = n - mins * 60;
  secs = secs.toFixed(digits).padStart(2, '0');
  return `${mins}:${secs}`;
}

function fromMinSec(txt) {
  // Takes a MM:SS string. Returns N of seconds.
  var m, s;
  try {
    [m, s] = txt.split(':');
    return 60 * parseInt(m) + parseFloat(s);
  }
  catch (err) {
    return null;
  }
}

function toLoopMmSS(d) {
  // Takes an object holding start/end points.
  // Returns a 'M:SS - M:SS' string.
  return (
    loopIsDefined(d) ?
    toMinSec(d.start) + ' - ' + toMinSec(d.end) :
    HTML_MISSING
  );
}

function loopIsDefined(d) {
  // Takes an object holding start/end points.
  // Returns true if the attributes hold numbers.
  return (
    d &&
    typeof d.start == 'number' &&
    typeof d.end == 'number'
  );
}

function getReply(msg, defReply = '') {
  // Prompts user. Returns reply string or ''.
  var reply = prompt(msg, defReply) || '';
  return reply.trim();
}

function getReplyRgx(msg, rgx, defReply = '') {
  // Prompts user. Returns match object if reply
  // string matches regex, or null on empty reply.
  var prefix, reply, m;
  prefix = '';
  while (true) {
    // Return null if empty reply.
    reply = getReply(prefix + msg, defReply);
    if (! reply) return null;

    // Return if valid.
    m = reply.match(rgx);
    if (m) return m;
    prefix = 'Invalid reply.\n\n';
  }
}

function getReplySetNudge(msg, defReply) {
  // Takes a prompt message for a situation supporting these replies:
  //   M:SS   Set
  //   SS     Nudge
  //   .      Reset
  //
  //   Where M is an int
  //         SS is int or float
  //
  // Prompts until reply is empty or value.
  // Returns null or an object (d) indicating the choice made.
  var prefix, rgx, d, reply, m;

  // Setup the validation regex and the reply object.
  // The two regexes are the same except the last alternative.
  prefix = '';
  rgx = /^(?:(\d+:\d+(?:\.\d+)?)|(-?\d+(?:\.\d+)?)|(\.))$/;
  d = {set: null, nudge: null, reset: false}

  // Prompt loop.
  while (true) {
    // Return null if empty reply.
    reply = getReply(prefix + msg, defReply);
    if (! reply) return null;

    // Try again if invalid reply.
    m = reply.match(rgx);
    if (! m) {
      prefix = 'Invalid reply.\n\n';
      continue;
    }

    // Use reply to set the appropriate attribute in the return object.
    reply = m[0];
    if (reply.includes(':')) {
      d.set = fromMinSec(reply);
    } else if (reply == '.') {
      d.reset = true;
    } else {
      d.nudge = parseFloat(reply);
    }
    return d;
  }
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

function displayInfo(label, txt) {
  // Takes a label (or null) and some text.
  // Displays label with text or just text at bottom of HTML.
  // If the HTML already had content, it is cleared.
  var div, h, now, secs;
  div = document.getElementById('logId');
  if (div.textContent.length) {
    h = '';
  } else if (label) {
    now = new Date().getTime();
    secs = now.toString().slice(-3);
    h = secs + ' => ' + label + ' => ' + txt;
  } else {
    h = txt;
  }
  div.textContent = h;
}

//
// Functions to update most of the dynamic parts of the HTML.
//

function updateAllHtml() {
  updateSpeedHtml();
  updateLoopHtml();
  updateMarksHtml();
  updateSavedLoopsHtml();
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
  var div, suffix;
  shouldPersist = true;
  div = document.getElementById('loopId');
  if (div && vi.end && vi.start != null) {
    suffix = (
      vi.start >= vi.end ? ' [invalid]' :
      ! vi.loop ? ' [off]' : ''
    );
    div.innerHTML = toLoopMmSS(vi) + suffix;
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

function updateSavedLoopsHtml() {
  // Saved loops HTML.
  var div, txt;
  shouldPersist = true;
  div = document.getElementById('loopsId');
  if (div) {
    txt = LOOP_KEYS.map(k => toLoopMmSS(vi[k])).join(HTML_ITEM_SEP);
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
    if (! vi.duration) {
      dur = player.getDuration();
      if (dur) {
        vi.duration = dur;
        if (vi.end == null) {
          vi.end = dur;
          updateLoopHtml();
        }
      }
    }

    // Looping.
    if (vi.loop && loopIsDefined(vi)) {
      if (vi.start < vi.end) {
        curr = player.getCurrentTime();
        if (vi.end - curr <= 0 || curr < vi.start) player.seekTo(vi.start);
      } else {
        vi.loop = false;
      }
    }

    // Location HTML.
    loc = player.getCurrentTime();
    if (loc) {
      div = document.getElementById('locationId');
      div.innerHTML = toMinSec(loc) + (seekFlipped ? ' [small-seeks]' : '');
    }
  }

  // Save video settings.
  if (shouldPersist) {
    if (vi.vid) {
      localStorage.setItem(VID_KEY, vi.vid);
      localStorage.setItem(vi.vid, JSON.stringify(vi));
      shouldPersist = false;
    }
  }

  // Recur.
  setTimeout(updateStatus, 1000);
}

updateStatus();

