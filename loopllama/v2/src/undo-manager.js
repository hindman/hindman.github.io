// undo-manager.js -- manages the undo/redo stacks for llama-app.
//
// Snapshot shape: { video, currentVideoId, desc }
// The snapshot data and desc are supplied by the caller. UndoManager handles
// only the stack mechanics: push, pop, size limit, and undo/redo sequencing.
//
// Callbacks:
//   getSnapshot()        -- flush app state and return a plain snapshot object
//                           (without desc; UndoManager adds it).
//   applySnapshot(snap)  -- restore app state from a snapshot.
//   onUndo(desc)         -- called after applying an undo; set status message.
//   onRedo(desc)         -- called after applying a redo; set status message.
//   onEmpty(direction)   -- called when the stack is empty ('undo' | 'redo').

export class UndoManager {
  static MAX_STACK_SIZE = 20;

  constructor({ getSnapshot, applySnapshot, onUndo, onRedo, onEmpty }) {
    this._undoStack    = [];
    this._redoStack    = [];
    this._getSnapshot  = getSnapshot;
    this._applySnap    = applySnapshot;
    this._onUndo       = onUndo;
    this._onRedo       = onRedo;
    this._onEmpty      = onEmpty;
  }

  // Push a snapshot onto the undo stack and clear the redo stack.
  // snapData: { videos, currentVideoId, desc }
  // Call after setting the status message, before the mutation.
  push(snapData) {
    this._undoStack.push(snapData);
    if (this._undoStack.length > UndoManager.MAX_STACK_SIZE) {
      this._undoStack.shift();
    }
    this._redoStack = [];
  }

  undo(count = 1) {
    if (!this._undoStack.length) {
      this._onEmpty('undo');
      return;
    }
    let n = 0, lastDesc = '';
    while (n < count && this._undoStack.length) {
      const snap = this._undoStack.pop();
      this._redoStack.push({ ...this._getSnapshot(), desc: snap.desc });
      this._applySnap(snap);
      lastDesc = snap.desc;
      n++;
    }
    this._onUndo(n, lastDesc);
  }

  redo(count = 1) {
    if (!this._redoStack.length) {
      this._onEmpty('redo');
      return;
    }
    let n = 0, lastDesc = '';
    while (n < count && this._redoStack.length) {
      const snap = this._redoStack.pop();
      this._undoStack.push({ ...this._getSnapshot(), desc: snap.desc });
      this._applySnap(snap);
      lastDesc = snap.desc;
      n++;
    }
    this._onRedo(n, lastDesc);
  }

  clear() {
    this._undoStack = [];
    this._redoStack = [];
  }
}
