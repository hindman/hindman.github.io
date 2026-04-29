// state.test.js -- unit tests for pure functions in state.js.

import { describe, it, expect } from 'vitest';
import {
  nudgeLoopStart,
  nudgeLoopEnd,
  getSectionBounds,
  getChapterBounds,
  nearestMarkLeft,
  nearestSectionLeft,
  addMark,
  deleteMarkById,
  addSection,
  addChapterDivider,
  validateEntityChange,
  propagateEntityChange,
} from './state.js';

// ---------------------------------------------------------------------------
// nudgeLoopStart
// ---------------------------------------------------------------------------

describe('nudgeLoopStart', () => {
  it('forward nudge within bounds returns adjusted start', () => {
    expect(nudgeLoopStart(5, { loopStart: 10, loopEnd: 20, duration: 100 })).toBe(15);
  });

  it('backward nudge within bounds returns adjusted start', () => {
    expect(nudgeLoopStart(-3, { loopStart: 10, loopEnd: 20, duration: 100 })).toBe(7);
  });

  it('clamps to 0 on large negative delta', () => {
    expect(nudgeLoopStart(-20, { loopStart: 5, loopEnd: 20, duration: 100 })).toBe(0);
  });

  it('large positive delta clamps to duration', () => {
    expect(nudgeLoopStart(20, { loopStart: 10, loopEnd: 20, duration: 100 })).toBe(30);
  });

  it('result is clamped to duration', () => {
    expect(nudgeLoopStart(5, { loopStart: 97, loopEnd: 200, duration: 100 })).toBe(100);
  });

  it('null duration imposes no upper clamp', () => {
    expect(nudgeLoopStart(50, { loopStart: 10, loopEnd: 200, duration: null })).toBe(60);
  });

});

// ---------------------------------------------------------------------------
// nudgeLoopEnd
// ---------------------------------------------------------------------------

describe('nudgeLoopEnd', () => {
  it('forward nudge within bounds returns adjusted end', () => {
    expect(nudgeLoopEnd(5, { loopStart: 10, loopEnd: 20, duration: 100 })).toBe(25);
  });

  it('backward nudge within bounds returns adjusted end', () => {
    expect(nudgeLoopEnd(-3, { loopStart: 10, loopEnd: 20, duration: 100 })).toBe(17);
  });

  it('result is clamped to duration on large positive delta', () => {
    expect(nudgeLoopEnd(20, { loopStart: 10, loopEnd: 95, duration: 100 })).toBe(100);
  });

  it('large negative delta clamps to 0', () => {
    expect(nudgeLoopEnd(-20, { loopStart: 10, loopEnd: 15, duration: 100 })).toBe(0);
  });

  it('null duration imposes no upper clamp', () => {
    expect(nudgeLoopEnd(50, { loopStart: 10, loopEnd: 100, duration: null })).toBe(150);
  });

});

// ---------------------------------------------------------------------------
// getSectionBounds
// ---------------------------------------------------------------------------

describe('getSectionBounds', () => {
  it('returns null for empty sections', () => {
    expect(getSectionBounds([], 30, 100)).toBeNull();
  });

  it('returns null when time is before the first divider', () => {
    const sections = [{ id: 'a', start: 10, end: null, name: '' }];
    expect(getSectionBounds(sections, 5, 100)).toBeNull();
  });

  it('returns bounds when time is exactly at the first divider', () => {
    const sections = [{ id: 'a', start: 10, end: null, name: '' }];
    expect(getSectionBounds(sections, 10, 100)).toEqual({ start: 10, end: 100 });
  });

  it('uses next divider start as end for open-ended section', () => {
    const sections = [
      { id: 'a', start: 10, end: null, name: '' },
      { id: 'b', start: 40, end: null, name: '' },
    ];
    expect(getSectionBounds(sections, 20, 100)).toEqual({ start: 10, end: 40 });
  });

  it('uses videoDuration as end for the last open-ended section', () => {
    const sections = [{ id: 'a', start: 10, end: null, name: '' }];
    expect(getSectionBounds(sections, 50, 200)).toEqual({ start: 10, end: 200 });
  });

  it('end is null when last section is open-ended and videoDuration is null', () => {
    const sections = [{ id: 'a', start: 10, end: null, name: '' }];
    expect(getSectionBounds(sections, 20, null)).toEqual({ start: 10, end: null });
  });

  it('uses explicit section end when set', () => {
    const sections = [{ id: 'a', start: 10, end: 30, name: '' }];
    expect(getSectionBounds(sections, 20, 100)).toEqual({ start: 10, end: 30 });
  });

  it('time exactly at explicit end is within the section (not in gap zone)', () => {
    const sections = [{ id: 'a', start: 10, end: 30, name: '' }];
    expect(getSectionBounds(sections, 30, 100)).toEqual({ start: 10, end: 30 });
  });

  it('returns null when time is past the explicit end (gap zone)', () => {
    const sections = [{ id: 'a', start: 10, end: 30, name: '' }];
    expect(getSectionBounds(sections, 35, 100)).toBeNull();
  });

  it('correctly identifies the second section in a multi-divider list', () => {
    const sections = [
      { id: 'a', start:  0, end: null, name: '' },
      { id: 'b', start: 30, end: null, name: '' },
      { id: 'c', start: 60, end: null, name: '' },
    ];
    expect(getSectionBounds(sections, 45, 100)).toEqual({ start: 30, end: 60 });
  });

  it('explicit section end takes priority over derived end from next divider', () => {
    // Section a has explicit end=30; next divider b starts at 40.
    // derivedEnd would be 40, but explicit end=30 wins.
    const sections = [
      { id: 'a', start:  0, end: 30, name: '' },
      { id: 'b', start: 40, end: null, name: '' },
    ];
    expect(getSectionBounds(sections, 20, 100)).toEqual({ start: 0, end: 30 });
  });
});

// ---------------------------------------------------------------------------
// getChapterBounds -- same divider logic as getSectionBounds; spot-checks only
// ---------------------------------------------------------------------------

describe('getChapterBounds', () => {
  it('returns null for empty chapters', () => {
    expect(getChapterBounds([], 10, 100)).toBeNull();
  });

  it('returns correct bounds for time within an open-ended chapter', () => {
    const chapters = [
      { id: 'a', start:  0, end: null, name: '' },
      { id: 'b', start: 60, end: null, name: '' },
    ];
    expect(getChapterBounds(chapters, 30, 120)).toEqual({ start: 0, end: 60 });
  });

  it('returns null when time is in gap zone past explicit end', () => {
    const chapters = [{ id: 'a', start: 0, end: 20, name: '' }];
    expect(getChapterBounds(chapters, 25, 100)).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// nearestMarkLeft
// ---------------------------------------------------------------------------

describe('nearestMarkLeft', () => {
  const marks = [
    { id: 'a', time: 10, name: '' },
    { id: 'b', time: 25, name: '' },
    { id: 'c', time: 50, name: '' },
  ];

  it('returns null for empty marks array', () => {
    expect(nearestMarkLeft([], 30)).toBeNull();
  });

  it('returns null when time is before all marks', () => {
    expect(nearestMarkLeft(marks, 5)).toBeNull();
  });

  it('returns exact match when time equals a mark time', () => {
    expect(nearestMarkLeft(marks, 25)).toBe(marks[1]);
  });

  it('returns left neighbor when time is between marks', () => {
    expect(nearestMarkLeft(marks, 30)).toBe(marks[1]);
  });

  it('returns last mark when time is after all marks', () => {
    expect(nearestMarkLeft(marks, 100)).toBe(marks[2]);
  });
});

// ---------------------------------------------------------------------------
// nearestSectionLeft -- same traversal; minimal smoke test
// ---------------------------------------------------------------------------

describe('nearestSectionLeft', () => {
  it('returns the correct left neighbor', () => {
    const sections = [
      { id: 'a', start:  0, end: null, name: '' },
      { id: 'b', start: 30, end: null, name: '' },
    ];
    expect(nearestSectionLeft(sections, 15)).toBe(sections[0]);
    expect(nearestSectionLeft(sections, 30)).toBe(sections[1]);
  });

  it('returns null when time is before all sections', () => {
    const sections = [{ id: 'a', start: 10, end: null, name: '' }];
    expect(nearestSectionLeft(sections, 5)).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// addMark
// ---------------------------------------------------------------------------

describe('addMark', () => {
  it('adds a mark to an empty array and returns it', () => {
    const marks = [];
    const m = addMark(marks, 30, 'test');
    expect(m).not.toBeNull();
    expect(m.time).toBe(30);
    expect(m.name).toBe('test');
    expect(marks).toHaveLength(1);
  });

  it('inserts marks in sorted order by time', () => {
    const marks = [];
    addMark(marks, 50);
    addMark(marks, 10);
    addMark(marks, 30);
    expect(marks.map(m => m.time)).toEqual([10, 30, 50]);
  });

  it('rejects a duplicate at the exact same second', () => {
    const marks = [];
    addMark(marks, 30);
    expect(addMark(marks, 30)).toBeNull();
    expect(marks).toHaveLength(1);
  });

  it('rejects a mark within 1 second of an existing mark', () => {
    const marks = [];
    addMark(marks, 30.0);
    expect(addMark(marks, 30.4)).toBeNull();
    expect(addMark(marks, 29.7)).toBeNull();
  });

  it('accepts a mark 1 second away from an existing mark', () => {
    const marks = [];
    addMark(marks, 30);
    expect(addMark(marks, 31)).not.toBeNull();
    expect(marks).toHaveLength(2);
  });
});

// ---------------------------------------------------------------------------
// deleteMarkById
// ---------------------------------------------------------------------------

describe('deleteMarkById', () => {
  it('removes the mark with the given id', () => {
    const marks = [];
    const m = addMark(marks, 20);
    deleteMarkById(marks, m.id);
    expect(marks).toHaveLength(0);
  });

  it('does nothing if the id is not found', () => {
    const marks = [];
    addMark(marks, 20);
    deleteMarkById(marks, 'nonexistent');
    expect(marks).toHaveLength(1);
  });
});

// ---------------------------------------------------------------------------
// addSection
// ---------------------------------------------------------------------------

describe('addSection', () => {
  it('adds a section to an empty array', () => {
    const sections = [];
    const s = addSection(sections, 10, 'Intro');
    expect(s).not.toBeNull();
    expect(s.start).toBe(10);
    expect(s.name).toBe('Intro');
    expect(sections).toHaveLength(1);
  });

  it('inserts sections in sorted order by start', () => {
    const sections = [];
    addSection(sections, 30);
    addSection(sections, 10);
    addSection(sections, 50);
    expect(sections.map(s => s.start)).toEqual([10, 30, 50]);
  });

  it('splits a section with explicit end: child inherits end, parent end cleared', () => {
    const sections = [{ id: 'a', start: 0, end: 10, name: '' }];
    const child = addSection(sections, 7);
    expect(child).not.toBeNull();
    expect(child.start).toBe(7);
    expect(child.end).toBe(10);       // inherits parent's explicit end
    expect(sections[0].end).toBeNull(); // parent end cleared
    expect(sections).toHaveLength(2);
  });

  it('rejects a split too close to the explicit end of the containing section', () => {
    const sections = [{ id: 'a', start: 0, end: 10, name: '' }];
    expect(addSection(sections, 9.5)).toBeNull();  // 0.5s from explicit end
  });

  it('accepts a section at the explicit end (gap zone boundary)', () => {
    const sections = [{ id: 'a', start: 10, end: 40, name: '' }];
    const s = addSection(sections, 40);
    expect(s).not.toBeNull();
    expect(s.end).toBeNull();          // not a split; no end inherited
    expect(sections[0].end).toBe(40); // containing end unchanged
  });

  it('accepts a section in a gap zone past a fixed section end', () => {
    const sections = [{ id: 'a', start: 10, end: 30, name: '' }];
    expect(addSection(sections, 40)).not.toBeNull();
  });

  it('accepts a section in an open-ended container', () => {
    const sections = [{ id: 'a', start: 10, end: null, name: '' }];
    expect(addSection(sections, 30)).not.toBeNull();
  });

  it('rejects a section within 1 second of an existing divider start', () => {
    const sections = [{ id: 'a', start: 30, end: null, name: '' }];
    expect(addSection(sections, 30)).toBeNull();    // distance=0
    expect(addSection(sections, 30.5)).toBeNull();  // distance=0.5
    expect(addSection(sections, 29.5)).toBeNull();  // distance=0.5
  });

  it('accepts a section exactly 1 second away from an existing divider', () => {
    const sections = [{ id: 'a', start: 30, end: null, name: '' }];
    expect(addSection(sections, 31)).not.toBeNull();  // distance=1
    expect(addSection(sections, 29)).not.toBeNull();  // distance=1
  });
});

// ---------------------------------------------------------------------------
// addChapterDivider -- same rejection logic; spot-checks only
// ---------------------------------------------------------------------------

describe('addChapterDivider', () => {
  it('splits a chapter with explicit end: child inherits end, parent end cleared', () => {
    const chapters = [{ id: 'a', start: 0, end: 60, name: '' }];
    const child = addChapterDivider(chapters, 30);
    expect(child).not.toBeNull();
    expect(child.end).toBe(60);
    expect(chapters[0].end).toBeNull();
  });

  it('accepts a divider in an open-ended chapter', () => {
    const chapters = [{ id: 'a', start: 0, end: null, name: '' }];
    expect(addChapterDivider(chapters, 30)).not.toBeNull();
  });

  it('accepts a divider before any chapters exist', () => {
    expect(addChapterDivider([], 10)).not.toBeNull();
  });

  it('rejects a divider within 1 second of an existing divider start', () => {
    const chapters = [{ id: 'a', start: 60, end: null, name: '' }];
    expect(addChapterDivider(chapters, 60)).toBeNull();    // distance=0
    expect(addChapterDivider(chapters, 60.5)).toBeNull();  // distance=0.5
    expect(addChapterDivider(chapters, 59.5)).toBeNull();  // distance=0.5
  });

  it('accepts a divider exactly 1 second away from an existing divider', () => {
    const chapters = [{ id: 'a', start: 60, end: null, name: '' }];
    expect(addChapterDivider(chapters, 61)).not.toBeNull();  // distance=1
    expect(addChapterDivider(chapters, 59)).not.toBeNull();  // distance=1
  });
});

// ---------------------------------------------------------------------------
// validateEntityChange
// ---------------------------------------------------------------------------

describe('validateEntityChange', () => {
  // Three open-ended entities: a@0, b@30, c@60
  const makeEntities = () => [
    { id: 'a', start:  0, end: null },
    { id: 'b', start: 30, end: null },
    { id: 'c', start: 60, end: null },
  ];

  it('returns true when there are no neighbors', () => {
    const e = [{ id: 'a', start: 0, end: null }];
    expect(validateEntityChange(e, 0, 10, null, 100)).toBe(true);
  });

  it('returns false when newStart would collapse into prev', () => {
    const e = makeEntities();
    // newStart=0 <= prev.start=0
    expect(validateEntityChange(e, 1, 0, null, 100)).toBe(false);
  });

  it('returns true when newStart moves to the right of prev.start', () => {
    const e = makeEntities();
    expect(validateEntityChange(e, 1, 20, null, 100)).toBe(true);
  });

  it('skips start validation when newStart is unchanged', () => {
    const e = makeEntities();
    // entity[1].start is 30; passing the same value bypasses the check
    expect(validateEntityChange(e, 1, 30, null, 100)).toBe(true);
  });

  it('returns false when newEnd would collapse the next entity', () => {
    // entity[1] spans 30→60; next is c@60 with no explicit end.
    // nextDerivedEnd = entities[3]?.start ?? duration = 100.
    // newEnd=100 >= 100 → false.
    const e = makeEntities();
    expect(validateEntityChange(e, 1, 30, 100, 100)).toBe(false);
  });

  it('returns true when newEnd stays within the next entity range', () => {
    const e = makeEntities();
    expect(validateEntityChange(e, 1, 30, 70, 100)).toBe(true);
  });

  it('skips end validation when newEnd is null', () => {
    const e = makeEntities();
    expect(validateEntityChange(e, 1, 30, null, 100)).toBe(true);
  });

  it('skips end validation when there is no next entity', () => {
    const e = makeEntities();
    expect(validateEntityChange(e, 2, 60, 90, 100)).toBe(true);
  });

  it('uses next explicit end as nextDerivedEnd when next.end is set', () => {
    // entities: a@0(end=null), b@30(end=null), c@60(end=80)
    // Editing b (idx=1): next=c has explicit end=80.
    // nextDerivedEnd = c.end = 80.
    // newEnd=80 >= 80 → false; newEnd=79 → true.
    const e = [
      { id: 'a', start:  0, end: null },
      { id: 'b', start: 30, end: null },
      { id: 'c', start: 60, end: 80   },
    ];
    expect(validateEntityChange(e, 1, 30, 80, 200)).toBe(false);
    expect(validateEntityChange(e, 1, 30, 79, 200)).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// propagateEntityChange
// ---------------------------------------------------------------------------

describe('propagateEntityChange', () => {
  it('updates start when moved, with no prev neighbor', () => {
    const e = [
      { id: 'a', start: 10, end: null },
      { id: 'b', start: 40, end: null },
    ];
    propagateEntityChange(e, 0, 5, null);
    expect(e[0].start).toBe(5);
  });

  it('updates prev explicit end when start moves left past it', () => {
    const e = [
      { id: 'a', start:  0, end: 30 },
      { id: 'b', start: 30, end: null },
    ];
    propagateEntityChange(e, 1, 20, null);
    expect(e[1].start).toBe(20);
    expect(e[0].end).toBe(20);  // prev shrinks to meet new start
  });

  it('does not alter prev end when prev has no explicit end', () => {
    const e = [
      { id: 'a', start:  0, end: null },
      { id: 'b', start: 30, end: null },
    ];
    propagateEntityChange(e, 1, 20, null);
    expect(e[1].start).toBe(20);
    expect(e[0].end).toBeNull();
  });

  it('pushes next start right when end moves past it', () => {
    const e = [
      { id: 'a', start:  0, end: null },
      { id: 'b', start: 40, end: null },
    ];
    propagateEntityChange(e, 0, 0, 50);
    expect(e[0].end).toBe(50);
    expect(e[1].start).toBe(50);
  });

  it('updates end without affecting next when end stays before next start', () => {
    const e = [
      { id: 'a', start:  0, end: null },
      { id: 'b', start: 40, end: null },
    ];
    propagateEntityChange(e, 0, 0, 30);
    expect(e[0].end).toBe(30);
    expect(e[1].start).toBe(40);
  });
});

