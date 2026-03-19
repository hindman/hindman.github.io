
## dev notes

Resources:
    - https://github.com/mmistakes/minimal-mistakes

Initial Ruby setup:
    - Intalled Ruby via Homebrew (see computer-setup).

Initial project setup:
    - Declare dependencies: via Gemfile.
    - Install gems in the Homebrew ruby:
        gem install bundler
        gem install jekyll
    - Install dependencies for project.
        bundle install

Serving the website locally:

    bundle exec jekyll serve
    open http://127.0.0.1:4000/

    # To see draft post and/or unpublished pages.
    bundle exec jekyll serve --drafts --unpublished

TOC icons:

    leaf
    tree
    seedling
    sprout
    feather-alt
    sun
    water
    droplet

LoopLlama: running tests:

    cd loopllama/v2

    # Basic.
    npm tests

    # Detailed output.
    npm test -- --reporter=verbose

    # Output in browser with lots of details.
    npx vitest --ui

LoopLlama: building the site:

    inv build [--add]

Testing scenario for user data persistence:

    - Brave and Safari: synced in known-good-state:
        - Brave:
            - de: export
            - Add a couple of videos you don't care about.
            - Make a couple of inconsequential edits.
            - di:
                - check modal to confirm correctness
                - do brute-force replacement
            - ds
                - check modal to confirm correctness
                - do brute-force replacement
        - Safari:
            - dr
                - check modal to confirm correctness
                - do brute-force replacement

    - Safari:
        - Add two new vids:
            - https://www.youtube.com/watch?v=AEP7xP4ClTE
            - https://www.youtube.com/watch?v=PaEXjpIzMhs
        - Edit 3 existing vids:
            - dune
            - hit the road jack
            - catfish blues dsp
        - Delete 1 vid:
            - ??

    - Brave:
        - Add two new vids:
            - https://www.youtube.com/watch?v=iZMZ_xk2big
            - https://www.youtube.com/watch?v=nfGmcUCJ9uI
        - Edit 2 existing vids:
            - long cool woman
            - hairy the dog
        - Delete 1 vid:
            - ??
        - dc: ok
        - dr: message accurate; chose No
        - ds: ditto
        - dr: chose yes-but-skip
        - ds: ok
        - dc: Brave and DB now in sync

    - Safari:
        - Similar process:
            - First check messages/prompts for dc, dr, ds: chosing No
            - Then did dr and ds for real.
            - dc: Safari and DB now in sync

LoopLlama: where the built site lives:

    Dev:

        $ npm run dev

        Vite runs a local HTTP server. When your browser requests a file, Vite
        reads the source, transforms it on the fly (bundling imports, compiling
        etc.), and serves it. Nothing is written to disk. The `outDir` setting is
        irrelevant. The `dist/` value in the config is just a placeholder to
        suppress the warning.

    Deployed:

        $ npm run build     # Then git commit/push

        Vite reads the source, bundles everything into a small set of files,
        and writes them to disk at loopllama/v2/.

        loopllama/v2/index.html            | Entry point, with corrected asset paths
        loopllama/v2/assets/index-XYZ.js   | JS bundled and minified
        loopllama/v2/assets/index-XYZ.css  | CSS bundled
        loopllama/v2/llama-mascot.png etc. | Copied from public/

        Those files get committed to git and GitHub Pages serves them as
        static files. No Node, no Vite, no build step happens on GitHub's end
        — it just serves what's in the repo.

        The hash in the asset filenames (`index-D8aSR4kO.js`) is a
        cache-buster: it changes whenever the file contents change, so
        browsers always fetch the latest version.

Testing Supabase down:

    Dev Tools =>
    The "..." menu =>
    More Tools =>
    Request conditions =>
    Block =>
    Pattern =>  *://*.supabase.co/*

## How The Fifth Fret and LoopLlama v2 are served

Jekyll (`bundle exec jekyll serve`) builds the whole site: it processes
Markdown, Liquid templates, and the Minimal Mistakes theme into static HTML
files, then serves them locally. LoopLlama v1 is just a static HTML+JS file
sitting in `loopllama/v1/` — Jekyll serves it as-is, no processing needed.

Vite (`npm run dev`) is a completely separate dev server, purpose-built for
modern JS development. It serves only the `loopllama/v2/` subtree, handles ES
module imports on the fly, and provides HMR. It has no knowledge of Jekyll or
the rest of the site.

So the two are independent. Two separate servers, two separate ports (Jekyll
on 4000, Vite on 5173). During v2 development we only need Vite running.

Where they eventually converge: the build step. When v2 is ready to ship, we
will run `npm run build`. Vite compiles and bundles everything into a `dist/`
folder — static HTML, JS, and CSS with hashed filenames, ready to deploy
anywhere. We then commit those built files under `loopllama/v2/` and GitHub
Pages serves them as plain static files — no Node, no Vite, no npm at
runtime. Jekyll continues to handle the rest of the site exactly as before.

So the dependency on Node/Vite is purely a development-time thing. The
deployed artifact is just files.

Edits requiring an `npm run dev` restart:
    - vite.config.js
    - package.json


## Supabase: identity providers

### GitHub ID provider

Supabase:

  - Select DB: dev or prod.
  - Authentication => Sign in / Providers:
    - GitHub.
      - Enable.
      - Copy the callback URL.

            dev  | https://zatiaqhwoxnukhlowyys.supabase.co/auth/v1/callback
            prod | https://wasdctencljkzoefqznp.supabase.co/auth/v1/callback

      - Leave the panel open for now.

GitHub:

  - Settings => Developer settings => OAuth Apps:
    - New OAuth App

          Application name        | LoopLlama Dev/Prod
          Homepage URL dev        | http://localhost:5173/loopllama/v2/
          "        "   prod       | https://hindman.github.io/loopllama/v2/
          Application description | LoopLlama: dev/prod environment
          Callback URL            | <copied from Supabase panel>
          Enable device flow      | No

    - Sumit the form.

    - Copy the Client ID:
      - Paste into my pws-file.

    - Generate new client secret:
      - GitHub asks for a totp: supply it.
      - Copy the secret.
      - Paste into my pws-file.

Supabase panel:
  - Use the client ID and secret to fill out the form.
  - Save.

Supabase: URL setup:
  - Authentication => URL Configuration:
  - Set both of these to the same value:

        dev  | http://localhost:5173
        prod | https://hindman.github.io/loopllama/v2/

### Google ID provider

Supabase:
  - Same process (leave nonce and no-email toggles off).
  - Same callback URLs.
  - As before, leave the panel open for now.

Google Cloud Console
  - APIs & Services
    - Create Project => LoopLlama Dev|Prod => Create
    - Configure project:

          App Name      | LoopLlama Dev|Prod
          Support email | montyhindman@gmail.com
          Audience      | external
          Contact email | montyhindman@gmail.com

  - APIs & Services
    - Credentials =>
    - Create Credentials =>
    - OAuth client ID =>
    - Web application:

          Name                          | LoopLlama Dev | Prod
          Authorized JavaScript origins | http://localhost:5173
          "          "          "       | https://hindman.github.io
          Authorized redirect URIs      | <supabase callback URL: see above>

    - Create.
    - Copy the Client ID and secret:
      - Paste into my pws-file.
      - Also download the JSON file.

Supabase panel:
  - Use the client ID and secret to fill out the form.
  - Save.

Supabase: URL setup:
  - Same process as above.

