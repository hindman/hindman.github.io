#! /usr/bin/env python

####
#
# General:
#   inv [--dry] TASK [OPTIONS]
#   inv --list
#   inv --help TASK
#
# Tasks:
#   inv build
#   inv deploy [--push]
#
####

import json
import re

from datetime import datetime
from invoke import task, Exit
from pathlib import Path
from textwrap import dedent

from short_con import cons

LL2_DIR = 'loopllama/v2'

PATHS = cons(
    ll_root = LL2_DIR,
    ll_index = f'{LL2_DIR}/index.html',
    ll_asset_patt = rf'{LL2_DIR}/assets/index-\w+.(?:js|css)',
    ll_deployments = f'{LL2_DIR}/deployments.json',
    ll_version_file = f'{LL2_DIR}/src/version.js',
)

VERSION_FMT = dedent('''
    // version.js -- build number
    // DO NOT EDIT MANUALLY. Overwritten during `inv deploy` process.
    export const BUILD_NUM = {};
''')

@task
def build(c):
    '''
    Builds LoopLlama v2
    '''
    with c.cd(PATHS.ll_root):
        c.run('npm run build')

@task
def deploy(c, push = False):
    '''
    Deploys LoopLlama v2: build num, git add, commit, and optionally push
    '''
    # Get the assets paths from the LL index.html file.
    assets = re.findall(
        PATHS.ll_asset_patt,
        read_file(PATHS.ll_index),
    )

    # Halt if we did not find exactly one .css and .js asset.
    exts = sorted(Path(a).suffix for a in assets)
    if exts != ['.css', '.js']:
        msg = 'Build failed: did not find expected assets'
        raise Exit(msg, code = 1)

    # Read the deployments data file to compute the next build number.
    deployments = read_json(PATHS.ll_deployments)
    build_num = 1 + max(d['build_num'] for d in deployments)

    # Initialize a dict for the current deployment info.
    now = datetime.now().strftime('%Y-%m-%d--%H-%M')
    current = dict(
        time = now,
        build_num = build_num,
        js = None,
        css = None,
    )

    # Update that data with the current js and css assets.
    current.update(
        (Path(a).suffix[1:], a)
        for a in assets
    )

    # Write version.js with the build number.
    write_file(PATHS.ll_version_file, VERSION_FMT.format(build_num))

    # Write the deployments data file, including the current deployment.
    deployments.append(current)
    write_json(PATHS.ll_deployments, deployments)

    # Add several things to git: deployements data file, the JS version file,
    # the generated index.html file, and the assets files. The --force is used
    # because the assets directory is generally git-ignored.
    args = [
        'git', 'add', '--force',
        PATHS.ll_deployments,
        PATHS.ll_index,
        PATHS.ll_version_file,
        *assets
    ]
    c.run(' '.join(args))

    # Commit and optionally push.
    c.run(f"git commit -m 'v2 deploy {now}'")
    if push:
        c.run('git push origin master')

def read_file(path):
    with open(path) as fh:
        return fh.read()

def write_file(path, text):
    with open(path, 'w') as fh:
        return fh.write(text)

def read_json(path):
    return json.loads(read_file(path))

def write_json(path, d):
    with open(path, 'w') as fh:
        json.dump(d, fh, indent = 2)

