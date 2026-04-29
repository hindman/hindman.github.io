---
title: 'LoopLlama key bindings'
permalink: /loopllama/v2/keybindings/
layout: single
published: true
toc: true
toc_label: 'Contents'
toc_icon: 'guitar'
---

Return to LoopLlama [help](/loopllama/v2/help/).

## Playback

| Key         | Operation
| ----------- | ---------------------
| `Space`     | Play/pause
| `-`         | Speed: decrease (supports count)
| `=`         | Speed: increase (supports count)
| `⌫`         | Speed: reset to 100%

<div class="notice--primary" markdown="1">

  **Key binding counts**. Some bindings accept a Vim-style count, meaning that
  the binding can be prefixed by a number that will multiply the effect of the
  operation. For example, `5Right` will seek forward by an amount equal to `5`
  times the seek-delta. The operations that support counts are: speed
  decrease/increase; seek backward/forward; navigation to previous/next
  entity; scratch loop bound decrease/increase; and undo/redo.

</div>

## Navigation

| Key         | Operation
| ----------- | ---------------------
| `Right`     | Seek forward (supports count)
| `Left`      | Seek backward (supports count)
| `Down`      | Seek delta: decrease
| `Up`        | Seek delta: increase
| `,`         | Previous entity (supports count)
| `/`         | Entity-type dropdown
| `.`         | Next entity (supports count)

## Jump

| Key         | Operation
| ----------- | ---------------------
| `jj`        | By time
| `Enter`     | To start (contextual)
| `jh`        | Jump history...
| `jb`        | Backward
| `jf`        | Forward

## Video

| Key         | Operation
| ----------- | ---------------------
| `vl` · `y`  | Load URL
| `vo` · `vv` | Open...
| `ve`        | Edit
| `vx`        | Scratch
| `vz`        | Zoom
| `vd`        | Delete...
| `vu`        | Unstash...
| `vi`        | Info

## Chapter

| Key         | Operation
| ----------- | ---------------------
| `cc`        | Create
| `ce`        | Edit
| `cx`        | Scratch
| `cj`        | Jump...
| `cz`        | Zoom
| `cf`        | Fix end
| `cd`        | Delete...

## Section

| Key         | Operation
| ----------- | ---------------------
| `ss`        | Create
| `se`        | Edit
| `sx`        | Scratch
| `sj`        | Jump...
| `sz`        | Zoom
| `sf`        | Fix end
| `sd`        | Delete...

## Mark

| Key         | Operation
| ----------- | ---------------------
| `mm`        | Create
| `me`        | Edit
| `mj`        | Jump...
| `md`        | Delete...

## Loop

| Key         | Operation
| ----------- | ---------------------
| `ll`        | Create
| `le`        | Edit
| `lx`        | Scratch
| `lj`        | Jump...
| `lz`        | Zoom
| `ld`        | Delete...

## Scratch loop

| Key         | Operation
| ----------- | ---------------------
| `xx`        | Toggle looping
| `xe` · `\`  | Edit mode
| `xz`        | Zoom
| `xs`        | Save to source
| `xr`        | Reset to source
| `xu`        | Unlink source

## Scratch loop bounds

| Key         | Operation
| ----------- | ---------------------
| `[[`        | Start: set now
| `[⌫`        | Start: reset to video start
| `[\`        | Start: edit
| `[-`        | Start: decrease (supports count)
| `[=`        | Start: increase (supports count)
| `]]`        | End: set now
| `]⌫`        | End: reset to video end
| `]\`        | End: edit
| `]-`        | End: decrease (supports count)
| `]=`        | End: increase (supports count)
| `[]` · `][` | Delta dropdown

## Scratch loop edit mode

| Key         | Operation
| ----------- | ---------------------
| `Tab`       | Toggle focus: start/end
| `x`         | Toggle looping
| `Left`      | Decrease: start/end
| `Right`     | Increase: start/end
| `Down`      | Decrease: delta
| `Up`        | Increase: delta
| `Space`     | Play/pause near start/end
| `⌫`         | Reset: start/end
| `Enter`     | Exit mode
| `Esc`       | Exit mode

## Data

| Key         | Operation
| ----------- | ---------------------
| `dv`        | Share video
| `dx`        | Share scratch loop
| `de`        | Export
| `di`        | Import
| `dI`        | Inspect
| `ds` · `dd` | Save to cloud
| `dr`        | Read from cloud
| `dc`        | Compare
| `d⌫`        | Delete...

## App

| Key         | Operation
| ----------- | ---------------------
| `au` · `u`  | Undo (supports count)
| `ar` · `U`  | Redo (supports count)
| `a⌫`        | Clear history
| `am`        | Recall message
| `ac`        | Copy time
| `at` · `t`  | Toggle timeline
| `az` · `z`  | Zoom off
| `ao` · `o`  | Options

## Help

| Key         | Operation
| ----------- | ---------------------
| `hh`        | Help
| `hk`        | Key bindings
| `he`        | Load examples

## Menu activation

| Key         | Operation
| ----------- | ---------------------
| `` `v ``    | Video
| `` `c ``    | Chapter
| `` `s ``    | Section
| `` `l ``    | Loop
| `` `x ``    | Scratch
| `` `m ``    | Mark
| `` `d ``    | Data
| `` `a ``    | App

