// storage.test.js -- unit tests for importData and migration in storage.js.
//
// load() and save() are thin wrappers around localStorage (not available in
// Node) and are not tested here. The migration logic for _migrateVideo is
// exercised indirectly through importData, which calls it on all incoming
// videos.

import { describe, it, expect } from 'vitest';
import { importData } from './storage.js';

// Minimal valid app state to merge into.
function makeState(videos = []) {
  return { version: 4, options: {}, videos, currentVideoId: null };
}

describe('importData', () => {
  it('imports videos from full app state format ({ version, videos: [...] })', () => {
    const state = makeState();
    const json = JSON.stringify({ version: 4, videos: [{ id: 'abc', name: 'Test' }] });
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
    const json = JSON.stringify({ version: 4, videos: [{ id: 'abc', name: 'New' }] });
    const result = importData(json, state);
    expect(result).toEqual({ added: 0, updated: 1 });
    expect(state.videos).toHaveLength(1);
    expect(state.videos[0].name).toBe('New');
  });

  it('handles a mix of new and existing videos', () => {
    const state = makeState([{ id: 'existing', name: 'Old' }]);
    const json = JSON.stringify({
      version: 4,
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
    const json = JSON.stringify({ version: 4, videos: [{ name: 'No ID here' }] });
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
      version: 4,
      videos: [{ id: 'v1vid', title: 'Old Title', version: 1 }],
    });
    importData(json, state);
    expect(state.videos[0].name).toBe('Old Title');
    expect(state.videos[0].title).toBeUndefined();
  });

  it('leaves already-migrated videos (version >= 2) unchanged on title field', () => {
    const state = makeState();
    const json = JSON.stringify({
      version: 4,
      videos: [{ id: 'v2vid', name: 'Current Name', version: 2 }],
    });
    importData(json, state);
    expect(state.videos[0].name).toBe('Current Name');
  });
});
