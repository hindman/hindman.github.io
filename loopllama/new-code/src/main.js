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
