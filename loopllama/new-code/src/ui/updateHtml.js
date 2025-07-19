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
