# Project: hindman.github.io (The Fifth Fret)

## The Website

The Fifth Fret is a personal Jekyll/GitHub Pages site at hindman.github.io.
Topics: guitar technique, music theory, fingerstyle, blues, US politics,
economics, and occasional other interests. Built with Minimal Mistakes theme.
Audience: personal use plus a small guitar-learning community.

Local dev: `bundle exec jekyll serve` then open http://127.0.0.1:4000/

## LoopLlama

A browser-based YouTube controller for close study of video content: looping
passages, adjusting speed, marking moments, annotating structure, and storing
per-video setups. Keyboard-first (Vim-inspired bindings), with full mouse
support. Not domain-specific, though learning from instructional video is
the primary use case.

Hosted at hindman.github.io/loopllama/.

- v1: single vanilla JS file (`loopllama/v1/loopllama.js`) + YouTube IFrame
  API. Flat, procedural, global-variable codebase. Uses browser `prompt()`
  dialogs for all user input. Superseded by v2.
- v2: complete rewrite at `loopllama/v2/` using Lit + Vite + Shoelace.
  Deployed and in production. Development is in final cleanup and
  documentation phase.

## LoopLlama v2

Live site: https://hindman.github.io/loopllama/v2/
Local dev:  http://localhost:5173/ (run `inv serve` from project root)

Key design decisions:
- Three first-class entities: Chapters and Sections (structural dividers,
  divider-based model), Loops (named reusable ranges), Marks (time points).
- Active loop is always a scratch loop; named entities are untouched until
  explicitly saved back.
- Keyboard-first (Vim-style multi-key bindings) plus full mouse support.
- No browser prompt() dialogs; Shoelace components for UI primitives.
- Storage: localStorage as working copy; optional Supabase cloud backup
  via explicit ds/dr operations. Auth via Google and GitHub OAuth.

## Dev docs

All in `_notes/` (not published):

    architecture-notes.md  | Architecture, components, data model, auth, storage
    dev-notes.md           | Common tasks, deploy workflow, markdown notes, v3 ideas
    text-elements.md       | All app messages, pickers, modals, menus -- the
                           | canonical reference for UI text

User-facing docs (published pages):

    _pages/loopllama-v2-help.md        | Help docs
    _pages/loopllama-v2-keybindings.md | Key bindings reference

## Notes

- Git is read-only per global CLAUDE.md: do not commit, push, or stage.
- `_notes/road-map.md` has TODOs for LoopLlama and The Fifth Fret.
