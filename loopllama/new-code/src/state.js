function buildInitialFavs() {
  // Tries to get favs info from localStorage.
  // Returns it or an empty object.
  var s = localStorage.getItem(FAVS_KEY);
  return s ? JSON.parse(s) : {};
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
