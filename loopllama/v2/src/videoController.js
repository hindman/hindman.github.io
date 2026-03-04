// videoController.js -- wraps the YouTube IFrame API.
//
// Usage:
//   const vc = createVideoController({ onReady, onStateChange });
//   await vc.initialize(containerElement);
//   vc.loadVideo('zP4lYpsfL8c');

export function createVideoController({ onReady, onStateChange } = {}) {
  let player = null;
  let durationReady = false;

  // Load the YouTube IFrame API script and resolve when the global
  // onYouTubeIframeAPIReady callback fires. Safe to call if the API
  // is already loaded -- resolves immediately in that case.
  function loadAPI() {
    return new Promise((resolve) => {
      if (window.YT?.Player) {
        resolve();
        return;
      }
      window.onYouTubeIframeAPIReady = resolve;
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(tag);
    });
  }

  // Initialize the player. containerEl must be a DOM element already in
  // the document. Returns a promise that resolves when the player is ready
  // to accept commands.
  async function initialize(containerEl) {
    await loadAPI();
    return new Promise((resolve) => {
      player = new YT.Player(containerEl, {
        width: '100%',
        height: '100%',
        events: {
          onReady: () => {
            onReady?.();
            resolve();
          },
          onStateChange: (event) => {
            // Duration bug fix: getDuration() returns unreliable values
            // before the player has actually started playing (especially
            // for long videos). Set durationReady on the first PLAYING
            // event; only then does getDuration() return a trusted value.
            if (!durationReady && event.data === YT.PlayerState.PLAYING) {
              durationReady = true;
            }
            onStateChange?.(event.data);
          },
        },
      });
    });
  }

  // Load a video by YouTube ID and start playing. Optionally seek to startSeconds.
  function loadVideo(videoId, startSeconds = 0) {
    durationReady = false;
    player.loadVideoById({ videoId, startSeconds });
  }

  // Cue a video by YouTube ID without auto-playing.
  function cueVideo(videoId, startSeconds = 0) {
    durationReady = false;
    player.cueVideoById({ videoId, startSeconds });
  }

  function play()  { player.playVideo(); }
  function pause() { player.pauseVideo(); }

  // allowSeekAhead=true lets the player seek into un-buffered regions.
  function seekTo(seconds) { player.seekTo(seconds, true); }

  function getCurrentTime() { return player.getCurrentTime() ?? 0; }

  // Returns null until the player has entered PLAYING state at least once.
  function getDuration() {
    return durationReady ? player.getDuration() : null;
  }

  function isPlaying() {
    return player?.getPlayerState() === YT.PlayerState.PLAYING;
  }

  function setPlaybackRate(rate) { player.setPlaybackRate(rate); }
  function getPlaybackRate()     { return player.getPlaybackRate(); }

  return {
    initialize,
    loadVideo,
    cueVideo,
    play,
    pause,
    seekTo,
    getCurrentTime,
    getDuration,
    isPlaying,
    setPlaybackRate,
    getPlaybackRate,
  };
}
