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
