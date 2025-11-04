
## Posts

Reading column margins/width.

about.md
    - Obfuscate email.

Two repo setup:

    - Details, if needed.

        https://chatgpt.com/g/g-p-69012377fdf08191894a49cb05e01da6-ghp-writing/c/6909abee-d9ac-8327-89b9-544602e510be

    - Create new repo: hindman-ghp-source
        - Make it private.
        - Make it empty [no README etc].

    - In the old repo: hindman.github.io

        # Add new repo as a remote.
        git remote add source git@github.com:hindman/hindman-ghp-source.git

        # Push v1.5 to master.
        git push --set-upstream source v1.5:master

        # Push v2 to v2.
        git push source v2:v2

    - In the new repo: hindman-ghp-source
        - Set its default branch to master [rather than main].
        - Make a fresh clone locally.
        - Check branches, files, history to verify success.

    - In the old repo: hindman.github.io

        # Drop the remote.
        git remote remove source

    - In hindman-ghp-source:

        - Build the static site

            bundle exec jekyll clean
            bundle exec jekyll build

        - Verify _site/ looks correct, both on file system and in a browser.

        - Ensure no _config.yml or Jekyll metadata is copied.

    - In hindman.github.io:

        - Delete all branches except master.

        - In master, delete all files/dirs except for the following. Preserve
          them somewhere outside the repo dir.

            .gitignore
            tmp/

        - Create one file:

            touch .gitignore

        - Commit the nearly-empty, master-only repo.

    - In hindman-ghp-source:

        - Sync: source to deployed site:

            rsync -a --delete _site/ ../hindman.github.io/

        - Later, I will encapsulate the sync process in a proper script.

    - In hindman.github.io:

        - Pull in the stuff tucked away above:

            .gitignore
            tmp/

        - Tell GHP not to use Jekyll:

            touch .nojekyll

        - Modify .gitignore to reflect the new role of the repo.

        - Commit, push.

        - Check https://hindman.github.io/

    - On github.com:

        - Confirm GHP settings for hindman.github.io.

Project notes [see CG].

Practicing right-hand rudiments: muting

LoopLlama v1
    - page, not post
    - add to navbar
    - maybe add notice [see CG]

RH rudiments #1: alternating bass

RH rudiments #2: Giuliani

Don't start too big:
    - musically viable tempo
    - Start by practicing smaller parts
    - add-a-beat practing strategy
    https://chatgpt.com/c/69056e95-7910-8326-bee6-dae0c53cc18b

## dev notes

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

TOC icons:

    leaf
    tree
    seedling
    sprout
    feather-alt
    sun
    water
    droplet

