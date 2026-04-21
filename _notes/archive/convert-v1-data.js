#!/usr/bin/env node
// convert-v1-data.js
// One-off script: convert v1 localStorage export to v2 import format.
// Usage: node convert-v1-data.js <input.json> [output.json]
//   input.json  -- v1 export (object keyed by YouTube ID)
//   output.json -- defaults to stdout if omitted

import { readFileSync, writeFileSync } from 'fs';

const SCHEMA_VERSION = 3;
const DEFAULT_OPTIONS = {
  seek_delta_default:       5,
  seek_delta_choices:       [0.1, 1, 5, 10, 30, 60, 300, 1800],
  loop_nudge_delta_default: 5,
  loop_nudge_delta_choices: [0.1, 1, 5, 10, 30, 60, 300, 1800],
  speed_delta:              0.05,
  loop_pad_start:           2,
  loop_pad_end:             2,
};

function makeId() {
  return Math.random().toString(36).slice(2, 9);
}

function convertVideo(v1) {
  const id = v1.vid;

  // Scratch loop from v1's active loop state.
  const scratchLoop = {
    id:         makeId(),
    name:       '',
    start:      v1.start ?? 0,
    end:        v1.end   ?? 0,
    source:     null,
    is_scratch: true,
  };

  // Named loops from L1–L9 (skip nulls).
  const namedLoops = [];
  for (let i = 1; i <= 9; i++) {
    const key = `L${i}`;
    const entry = v1[key];
    if (entry && entry.start != null && entry.end != null) {
      namedLoops.push({
        id:         makeId(),
        chapterId:  null,
        name:       key,
        start:      entry.start,
        end:        entry.end,
        source:     null,
        is_scratch: false,
      });
    }
  }

  // Marks from m1–m9 (skip nulls).
  const marks = [];
  for (let i = 1; i <= 9; i++) {
    const key = `m${i}`;
    const time = v1[key];
    if (time != null) {
      marks.push({
        id:        makeId(),
        chapterId: null,
        time:      Number(time),
        name:      key,
      });
    }
  }

  return {
    id,
    url:         `https://www.youtube.com/watch?v=${id}`,
    duration:    v1.duration ?? null,
    time:        0,
    start:       0,
    end:         null,
    name:        '',
    looping:     v1.loop ?? false,
    speed:       v1.speed ?? 1.0,
    seek_delta:  DEFAULT_OPTIONS.seek_delta_default,
    speed_delta: DEFAULT_OPTIONS.speed_delta,
    chapters:    [],
    sections:    [],
    loops:       [scratchLoop, ...namedLoops],
    marks,
    jumps:       [],
    version:     SCHEMA_VERSION,
  };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const [,, inputPath, outputPath] = process.argv;
if (!inputPath) {
  console.error('Usage: node convert-v1-data.js <input.json> [output.json]');
  process.exit(1);
}

const v1Data = JSON.parse(readFileSync(inputPath, 'utf8'));
const favIds = new Set(Object.values(v1Data.FAVORITES ?? {}));
const seen = new Set();
const videos = Object.values(v1Data)
  .filter(entry => {
    if (!entry?.vid || !favIds.has(entry.vid)) return false;
    if (seen.has(entry.vid)) return false;
    seen.add(entry.vid);
    return true;
  })
  .map(convertVideo);

// Sort by YouTube ID for stable output.
videos.sort((a, b) => a.id.localeCompare(b.id));

const v2State = {
  version:        SCHEMA_VERSION,
  options:        { ...DEFAULT_OPTIONS },
  currentVideoId: null,
  videos,
};

const json = JSON.stringify(v2State, null, 2);
if (outputPath) {
  writeFileSync(outputPath, json, 'utf8');
  console.error(`Wrote ${videos.length} videos to ${outputPath}`);
} else {
  process.stdout.write(json + '\n');
}
