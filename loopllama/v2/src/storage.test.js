// storage.test.js -- unit tests for importData and migration in storage.js.
//
// load() and save() are thin wrappers around localStorage (not available in
// Node) and are not tested here. Migration logic in migrateAppState() is
// exercised indirectly through importData, which calls it via parseImport().

import { describe, it, expect, vi } from 'vitest';
vi.mock('./supabase.js', () => ({ supabase: {} }));
import { importData } from './storage.js';

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
