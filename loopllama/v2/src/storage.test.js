// storage.test.js -- unit tests for importData, migration, and
// categorizeVideos in storage.js.
//
// load() and save() are thin wrappers around localStorage (not available in
// Node) and are not tested here. Migration logic in migrateAppState() is
// exercised indirectly through importData, which calls it via parseImport().

import { describe, it, expect, vi } from 'vitest';
vi.mock('./supabase.js', () => ({ supabase: {} }));
import { importData, categorizeVideos } from './storage.js';

// Minimal valid app state to merge into.
function makeState(videos = []) {
  return { schema_version: 5, options: {}, videos, currentVideoId: null };
}

describe('importData', () => {
  it('imports videos from full app state format ({ schema_version, videos: [...] })', () => {
    const state = makeState();
    const json = JSON.stringify({ schema_version: 5, videos: [{ id: 'abc', name: 'Test' }] });
    const result = importData(json, state);
    expect(result).toEqual({ added: 1, updated: 0 });
    expect(state.videos).toHaveLength(1);
    expect(state.videos[0].id).toBe('abc');
  });

  it('imports a single video from bare video object format ({ id, name, ... })', () => {
    const state = makeState();
    const json = JSON.stringify({ id: 'xyz', name: 'Solo' });
    const result = importData(json, state);
    expect(result).toEqual({ added: 1, updated: 0 });
    expect(state.videos[0].id).toBe('xyz');
  });

  it('overwrites an existing video when ids match', () => {
    const state = makeState([{ id: 'abc', name: 'Old' }]);
    const json = JSON.stringify({ schema_version: 5, videos: [{ id: 'abc', name: 'New' }] });
    const result = importData(json, state);
    expect(result).toEqual({ added: 0, updated: 1 });
    expect(state.videos).toHaveLength(1);
    expect(state.videos[0].name).toBe('New');
  });

  it('handles a mix of new and existing videos', () => {
    const state = makeState([{ id: 'existing', name: 'Old' }]);
    const json = JSON.stringify({
      schema_version: 5,
      videos: [
        { id: 'existing', name: 'Updated' },
        { id: 'brandnew', name: 'New' },
      ],
    });
    const result = importData(json, state);
    expect(result).toEqual({ added: 1, updated: 1 });
    expect(state.videos).toHaveLength(2);
  });

  it('skips videos with no id field', () => {
    const state = makeState();
    const json = JSON.stringify({ schema_version: 5, videos: [{ name: 'No ID here' }] });
    const result = importData(json, state);
    expect(result).toEqual({ added: 0, updated: 0 });
    expect(state.videos).toHaveLength(0);
  });

  it('throws on invalid JSON', () => {
    expect(() => importData('not json', makeState())).toThrow();
  });

  it('throws on unrecognized format (no videos array, no id field)', () => {
    expect(() => importData(JSON.stringify({ foo: 'bar' }), makeState()))
      .toThrow('Unrecognized format');
  });

  it('migrates a v1 video (title → name) on import', () => {
    const state = makeState();
    const json = JSON.stringify({
      schema_version: 5,
      videos: [{ id: 'v1vid', title: 'Old Title', version: 1 }],
    });
    importData(json, state);
    expect(state.videos[0].name).toBe('Old Title');
    expect(state.videos[0].title).toBeUndefined();
  });

  it('leaves already-migrated videos (schema_version >= 2) unchanged on title field', () => {
    const state = makeState();
    const json = JSON.stringify({
      schema_version: 5,
      videos: [{ id: 'v2vid', name: 'Current Name', version: 2 }],
    });
    importData(json, state);
    expect(state.videos[0].name).toBe('Current Name');
  });
});

describe('migrateAppState v10 → v11 (scratch loop separation)', () => {
  it('extracts is_scratch loop into scratchLoop and removes it from loops', () => {
    const state = makeState();
    const json = JSON.stringify({
      schema_version: 10,
      videos: [{
        id: 'vid1',
        name: 'Test',
        looping: true,
        loops: [
          { id: 'scratch1', name: '', start: 5, end: 10, is_scratch: true },
          { id: 'named1',   name: 'Riff', start: 20, end: 30 },
        ],
      }],
    });
    importData(json, state);
    const v = state.videos[0];
    expect(v.scratchLoop).toEqual({ start: 5, end: 10, looping: true, sourceId: null, sourceType: null });
    expect(v.loops).toHaveLength(1);
    expect(v.loops[0].id).toBe('named1');
    expect(v.loops[0].is_scratch).toBeUndefined();
    expect(v.looping).toBeUndefined();
  });

  it('creates an empty scratchLoop when no is_scratch entry exists', () => {
    const state = makeState();
    const json = JSON.stringify({
      schema_version: 10,
      videos: [{
        id: 'vid2',
        name: 'Test2',
        looping: false,
        loops: [{ id: 'named2', name: 'Solo', start: 15, end: 25 }],
      }],
    });
    importData(json, state);
    const v = state.videos[0];
    expect(v.scratchLoop).toEqual({ start: 0, end: 0, looping: false, sourceId: null, sourceType: null });
    expect(v.loops).toHaveLength(1);
    expect(v.loops[0].id).toBe('named2');
  });

  it('preserves scratchLoop on already-v11 data', () => {
    const state = makeState();
    const json = JSON.stringify({
      schema_version: 11,
      videos: [{
        id: 'vid3',
        name: 'Test3',
        scratchLoop: { start: 2, end: 8, looping: true, sourceId: 'abc', sourceType: 'loop' },
        loops: [{ id: 'named3', name: 'Tag', start: 2, end: 8 }],
      }],
    });
    importData(json, state);
    const v = state.videos[0];
    expect(v.scratchLoop.start).toBe(2);
    expect(v.scratchLoop.sourceId).toBe('abc');
    expect(v.loops).toHaveLength(1);
  });
});

describe('categorizeVideos', () => {
  const v = (id, last_modified) => ({ id, last_modified });

  it('puts a video in srcOnly when id is absent from dest', () => {
    const { srcOnly, srcNewer, destOnly, destNewer, same } =
      categorizeVideos([v('a', 1)], []);
    expect(srcOnly.map(x => x.id)).toEqual(['a']);
    expect(srcNewer).toHaveLength(0);
    expect(destOnly).toHaveLength(0);
    expect(destNewer).toHaveLength(0);
    expect(same).toHaveLength(0);
  });

  it('puts a video in destOnly when id is absent from src', () => {
    const { destOnly } = categorizeVideos([], [v('b', 1)]);
    expect(destOnly.map(x => x.id)).toEqual(['b']);
  });

  it('puts matching video in srcNewer when src.last_modified is greater', () => {
    const { srcNewer } = categorizeVideos([v('a', 200)], [v('a', 100)]);
    expect(srcNewer.map(x => x.id)).toEqual(['a']);
  });

  it('puts matching video in destNewer when dest.last_modified is greater', () => {
    const { destNewer } = categorizeVideos([v('a', 100)], [v('a', 200)]);
    expect(destNewer.map(x => x.id)).toEqual(['a']);
  });

  it('puts matching video in same when last_modified is equal', () => {
    const { same } = categorizeVideos([v('a', 100)], [v('a', 100)]);
    expect(same.map(x => x.id)).toEqual(['a']);
  });

  it('treats missing last_modified as 0', () => {
    // src has no last_modified, dest has 0: equal → same
    const { same } = categorizeVideos([{ id: 'a' }], [v('a', 0)]);
    expect(same).toHaveLength(1);
    // src has no last_modified, dest has 50: destNewer
    const { destNewer } = categorizeVideos([{ id: 'b' }], [v('b', 50)]);
    expect(destNewer).toHaveLength(1);
  });

  it('handles a mix of all five buckets', () => {
    const src  = [v('srcOnly', 1), v('srcNewer', 200), v('destNewer', 100), v('same', 100)];
    const dest = [                  v('srcNewer', 100), v('destNewer', 200), v('same', 100), v('destOnly', 1)];
    const result = categorizeVideos(src, dest);
    expect(result.srcOnly.map(x => x.id)).toEqual(['srcOnly']);
    expect(result.srcNewer.map(x => x.id)).toEqual(['srcNewer']);
    expect(result.destNewer.map(x => x.id)).toEqual(['destNewer']);
    expect(result.same.map(x => x.id)).toEqual(['same']);
    expect(result.destOnly.map(x => x.id)).toEqual(['destOnly']);
  });
});
