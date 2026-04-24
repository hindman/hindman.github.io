import '@shoelace-style/shoelace/dist/themes/dark.css';
import '../styles/app.css';
import './components/llama-app.js';
import {
  createAppState, createVideo, createSection,
  createLoop, createMark,
} from './state.js';
import { load, save, exportAll, exportVideo } from './storage.js';

// In dev mode, expose the state/storage API on window._ll for console testing.
if (import.meta.env.DEV) {
  window._ll = {
    createAppState, createVideo, createSection,
    createLoop, createMark,
    load, save, exportAll, exportVideo,
  };
  console.log('LoopLlama dev: window._ll is available');
}
