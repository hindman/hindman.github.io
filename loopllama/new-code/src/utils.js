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
  // Takes a URL string and tries to get video ID via:
  //   'v' query parameter;     # https://www.youtube.com/watch?v=F6va6tg62qg
  //   'vid' query parameter;
  //   URL path.                # https://youtu.be/F6va6tg62qg
  // Returns video ID or null.
  var url, p;
  try {
    url = new URL(txt);
    p = url.searchParams;
    return p.get('v') || p.get('vid') || url.pathname.substring(1) || null
  }
  catch (err) {
    return null;
  }
}
