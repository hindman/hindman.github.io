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

import re
import json

from invoke import task, Exit
from pathlib import Path
from datetime import datetime

from short_con import cons

LL2_DIR = 'loopllama/v2'

PATHS = cons(
    ll_root = LL2_DIR,
    ll_index = f'{LL2_DIR}/index.html',
    ll_asset_patt = rf'{LL2_DIR}/assets/index-\w+.(?:js|css)',
    ll_deployments = f'{LL2_DIR}/deployments.json',
)

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
    Deploys LoopLlama v2: git add, commit, and optionally push
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

    # Add the assets to our deployments record, a simple JSON
    # file containing triples: [DATETIME, ASSET1, ASSET2].
    now = datetime.now().strftime('%Y-%m-%d--%H-%M')
    ds = read_json(PATHS.ll_deployments)
    ds.append([now, *assets])
    write_json(PATHS.ll_deployments, ds)

    # Add the deployments record, the generated index.html, and assets to git.
    args = ['git', 'add', PATHS.ll_deployments, PATHS.ll_index, *assets]
    c.run(' '.join(args))

    # Commit and optionally push.
    c.run(f"git commit -m 'v2 deploy {now}'")
    if push:
        c.run('git push origin master')

def read_file(path):
    with open(path) as fh:
        return fh.read()

def read_json(path):
    return json.loads(read_file(path))

def write_json(path, d):
    with open(path, 'w') as fh:
        json.dump(d, fh, indent = 2)

