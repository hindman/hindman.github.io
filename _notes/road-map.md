
## TODO: LoopLlama v2

Claude usage:
  - https://anthropic.skilljar.com/claude-code-in-action
  - https://claude.com/resources/tutorials/using-claude-code-remote-control

Sign-in process:
  - see TODOs in dev-notes
  - see recent CC chat

Menus:
  - Drop "Actions" label.

Prev/next entity picker:
  - Video is confusing and not very useful.
  - Drop it.

Marks:
  - The app's current model to operate on entities:
    - delete: picker
    - create: immediate, here
    - edit: current
  - Edit-mark is the outlier in using a picker.
    - Use current, meaning nearest to left.
    - There's some mystery for a user about current.
    - But using current aligns with the most common workflow:
      - `mm` create mark here.
      - `me` to add metadata:
        - Literally here, if video was paused.
        - Nearest to left also captures the case where `mm` was done while
          playing the video.
        - Nearest also embraces the concept of creation-time, so it's
          conceptually sensible even if that's not the literal implementation.

Timeline hovers:
  - Include entity type as we do with loops.
  - Format: "TYPE LABEL TIME"
  - Where:
    - TYPE: Chater, Section, Loop, Mark.
    - LABEL: might not exist.
    - TIME: "START" for Marks, else "START-END"
  - No punctuation separating TYPE, LABEL, TIME.
  - Instead, using character formatting:
    - Maybe bold for TYPE and gray for TIME?

Key bindings: assess, edit, reorg.
  - Add a menu-activate prefix: forward slash?

Menu items: assess, edit, reorg.

Notes files (_notes): editing/organizing pass.

Help text: draft
Banner write up.

Lines of code:
  - loopllama/
  - loopllama/v1/
  - loopllama/v2/
  - loopllama/v2/src/
  - loopllama/v2/src/components/
  - loopllama/v2/styles/
  - file extensions: .js, .css, .html, maybe .json

Text elements: messages: info, warning, error, which-key.

Text elements: Modals: titles, labels, headings, placeholders, hovers.

Text elements: Pickers: titles

Text elements: Timeline: hovers

Text elements: Current panel

Code review and refactor.

Real-world usage and testing.

Launch: Make v2 the offial version.

## TODO: The Fifth Fret

Posts:
  - RH rudiments #2: Giuliani
  - Practicing right-hand rudiments: muting
  - Blues turnarounds: a systematic approach
  - Add-a-beat. https://chatgpt.com/c/69056e95-7910-8326-bee6-dae0c53cc18b
  - Triads: lots to say.
  - 76 reasons why the filibuster is a bad idea
  - MTG and Linda Litzke: https://chatgpt.com/c/691bca59-15ac-832b-b9de-8d1f38ddd596
  - Skepticism of the science of music practice: https://chatgpt.com/c/692dd380-d5d0-832c-ad74-a768b049c47b
  - Tommy Emmanuel vs Music Practice Inc [see writing-notes]

## CC: Editing area

