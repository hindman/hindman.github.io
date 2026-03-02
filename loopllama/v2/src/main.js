import './components/llama-app.js';
import {
  createAppState, createVideo, createSection,
  createLoop, createScratchLoop, createMark,
} from './state.js';
import { load, save, exportAll, exportVideo } from './storage.js';

// In dev mode, expose the state/storage API on window._ll for console testing.
if (import.meta.env.DEV) {
  window._ll = {
    createAppState, createVideo, createSection,
    createLoop, createScratchLoop, createMark,
    load, save, exportAll, exportVideo,
  };
  console.log('LoopLlama dev: window._ll is available');
}
