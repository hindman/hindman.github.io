#! /usr/bin/env python

####
#
# General:
#   inv [--dry] TASK [OPTIONS]
#   inv --list
#   inv --help TASK
#
# Tasks:
#   inv serve [--f5] [--ll]
#   inv kill [--f5] [--ll] [--keep]
#   inv follow [--f5] [--ll]
#   inv status [--f5] [--ll]
#   inv clear [--f5] [--ll]
#   inv deploy
#   inv builds [--limit N]
#   inv loc
#   inv test
#
####

import json
import os
import re
import requests
import time

from collections import deque
from contextlib import contextmanager
from datetime import datetime
from dotenv import dotenv_values
from invoke import task, Exit
from pathlib import Path
from textwrap import dedent

from short_con import cons
from mhutils import delimited_rows_text

####
# Constants.
####

LL2_DIR = 'loopllama/v2'

PATHS = cons(
    ll_root = LL2_DIR,
    ll_index = f'{LL2_DIR}/index.html',
    ll_asset_patt = rf'{LL2_DIR}/assets/index-[\w\-]+\.(?:js|css)',
    ll_deployments = f'{LL2_DIR}/deployments.json',
    ll_version_file = f'{LL2_DIR}/src/version.js',
    ll_ldiff = f'{LL2_DIR}/ldiff',
)

VERSION_FMT = dedent('''
    // version.js -- build number
    // DO NOT EDIT MANUALLY. Overwritten during `inv deploy` process.
    export const BUILD_NUM = {};
''')

def ansi(code):
    return '\033' + chr(91) + str(code) + 'm'

COLORS = cons(
    red     = ansi(31),
    green   = ansi(32),
    yellow  = ansi(33),
    blue    = ansi(34),
    magenta = ansi(35),
    cyan    = ansi(36),
    reset   = ansi(0),
)

APPS = cons(
    f5 = cons(
        name      = 'fifthfret',
        cmd       = 'bundle exec jekyll serve --drafts --unpublished',
        cd        = '.',
        log_file  = 'loopllama/v2/logs/f5.log.txt',
        pid_file  = 'loopllama/v2/logs/f5.pid.txt',
        log_color = COLORS.yellow,
        ps_patt   = '[j]ekyll',
    ),
    ll = cons(
        name      = 'loopllama',
        cmd       = 'npm run dev',
        test_cmd  = 'npm test',
        cd        = 'loopllama/v2',
        log_file  = 'loopllama/v2/logs/ll.log.txt',
        pid_file  = 'loopllama/v2/logs/ll.pid.txt',
        log_color = COLORS.red,
        ps_patt   = '[v]ite',
    ),
)

NOHUP_FMT = "nohup {cmd} > {log_file} 2>&1 & echo $! >| {pid_file}"

KILL_SENTINEL = '0'

####
# Tasks.
####

@task
def serve(c, f5 = False, ll = False):
    '''
    Serves local apps: [--f5] [--ll]
    '''
    # Setup.
    dry = c.config.run.dry
    apps = get_apps(f5 = f5, ll = ll)

    # Serve each app: (1) start the app, sending output
    # to a log file; (2) write a PID file.
    for a in apps:
        # Get full paths to log and PID files -- because the run() happens with cd().
        log_file = Path(a.log_file).resolve()
        pid_file = Path(a.pid_file).resolve()

        # Skip if PID file for app already exists.
        if exists(a.pid_file):
            pid = read_pid(a.pid_file)
            msg = f'# PID file exists: {a.name} {pid}'
            print(color_msg(msg, COLORS.red))
            continue

        # Assemble the full nohup command.
        cmd = NOHUP_FMT.format(
            cmd = a.cmd,
            log_file = log_file,
            pid_file = pid_file,
        )

        # Run with our own cd() rather than c.cd() to avoid a bash subshell
        # that would give us the wrong PID.
        with cd(a.cd):
            c.run(cmd)

        # Get the PID.
        if dry:
            pid = KILL_SENTINEL
            Path(a.pid_file).write_text(pid + '\n')
        else:
            pid = Path(a.pid_file).read_text().strip()

        # Notify.
        msg = f'# App started with PID: {a.name} {pid}'
        print(msg)

@task
def kill(c, f5 = False, ll = False, keep = False):
    '''
    Kills running apps: [--f5] [--ll] [--keep]
    '''
    # Setup.
    dry = c.config.run.dry
    apps = get_apps(f5 = f5, ll = ll)

    # Kill each app.
    for a in apps:
        # Get PID file.
        pid_file = Path(a.pid_file)

        # No PID file: nothing to kill.
        if not pid_file.exists():
            print(f'# No PID file found: {a.name}')
            continue

        # Get the PID.
        pid = pid_file.read_text().strip()

        # Kill the process.
        if pid == KILL_SENTINEL:
            cmd = f"echo '# kill {pid}'"
        else:
            cmd = f'kill {pid}'
            print( f'# killing {pid}')
        c.run(cmd, warn = True)

        # Delete PID file.
        if not (dry or keep):
            pid_file.unlink()

@task
def follow(c, f5 = False, ll = False):
    '''
    Follows log files: [--f5] [--ll]
    '''
    # Get the apps and open their log files.
    apps = get_apps(f5 = f5, ll = ll)
    app_handles = []
    for a in apps:
        p = Path(a.log_file)
        if p.exists():
            app_handles.append([a, open(p)])

    # Follow the log files. On the first pass through the apps,
    # we grab the last 20 lines. After that, we grab new lines.
    try:
        n = 20
        while True:
            for a, fh in app_handles:
                lines = tail(fh, n)
                if lines:
                    print_app_heading(a)
                    for line in lines:
                        print(line, end = '')
            n = None
            time.sleep(0.2)
    except KeyboardInterrupt:
        for a, fh in app_handles:
            fh.close()

@task
def status(c, f5 = False, ll = False):
    '''
    Shows app status: PID + ps: [--f5] [--ll]
    '''
    apps = get_apps(f5 = f5, ll = ll)
    for a in apps:
        print_app_heading(a)
        c.run(f'cat {a.pid_file} 2>&1 | ack -v "No such file"', warn = True)
        c.run(f'ps -ef | ack {a.ps_patt}', warn = True)

@task
def clear(c, f5 = False, ll = False):
    '''
    Deletes log and PID files: [--f5] [--ll]
    '''
    apps = get_apps(f5 = f5, ll = ll)
    for a in apps:
        for path in (a.log_file, a.pid_file):
            c.run(f'rm -f {path}')

@task
def deploy(c):
    '''
    Builds/deploys LoopLlama, with git commit
    '''
    # Read the deployments data file to compute the next build number.
    deployments = read_json(PATHS.ll_deployments)
    build_num = 1 + max(d['build_num'] for d in deployments)

    # Write version.js with the build number.
    write_file(c, PATHS.ll_version_file, VERSION_FMT.format(build_num))

    # Build.
    with c.cd(PATHS.ll_root):
        c.run('npm run build')

    # Get the assets paths from the generated LL index.html file.
    assets = re.findall(
        PATHS.ll_asset_patt,
        read_file(PATHS.ll_index),
    )

    # Halt if we did not find exactly one .css and .js asset.
    exts = sorted(Path(a).suffix for a in assets)
    if exts != ['.css', '.js']:
        msg = 'Build failed: did not find expected assets'
        raise Exit(msg, code = 1)

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

    # Write the deployments data file, including the current deployment.
    deployments.append(current)
    write_json(c, PATHS.ll_deployments, deployments)

    # Add several things to git: deployments data file, the JS version file,
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

    # Commit, list added/changed files, print build number.
    c.run(f"git commit -m 'v2 deploy {now}'")
    c.run('git show --stat HEAD')
    print(f'# Build number: {build_num}')

@task
def builds(c, limit = 10):
    '''
    Lists LoopLlama builds as a table
    '''
    # Convert deployments JSON file into rows.
    rows = [
        dict(
            build = d['build_num'],
            time = d['time'],
            js = Path(d['js']).name,
            css = Path(d['css']).name,
        )
        for d in read_json(PATHS.ll_deployments)
    ]

    # Reverse the rows and limit to recent deployments.
    rows = list(reversed(rows))[0 : limit]

    # Print table.
    table = delimited_rows_text(
        rows,
        delimiter = '|',
        want_header = True,
        align = True,
    )
    print(table)

@task
def loc(c):
    '''
    Reports lines of code for LoopLlama v2
    '''
    root = PATHS.ll_root
    exclude = '\/(node_modules|assets)\/'
    exts = '\.(js|css|html)$'
    cmd = f"wc -l $(find {root} | ack -v '{exclude}' | ack '{exts}')"
    c.run(cmd)

@task
def ldiff(c, base, other):
    '''
    Diffs two LoopLlama data exports: BASE OTHER
    '''
    cmd = f'{PATHS.ll_ldiff} {base} {other}'
    c.run(cmd)

@task
def test(c):
    '''
    Tests LoopLlama
    '''
    a = get_apps(ll = True)[0]
    with cd(a.cd):
        c.run(a.test_cmd)

@task
def stats(c):
    '''
    Reports LoopLlama usage stats for dev and prod
    '''
    # Setup.
    secrets = read_json('loopllama/v2/secrets.json')
    envs = [
        ('dev',  'loopllama/v2/.env.development'),
        ('prod', 'loopllama/v2/.env.production'),
    ]

    # Collect data from Supabase.
    results = {}
    for env, path in envs:
        url = dotenv_values(path)['VITE_SUPABASE_URL']
        key = secrets[env]
        results[env] = dict(
            sessions      = sb_count(url, key, 'events', {'event_type': 'eq.session_start'}),
            clients       = sb_distinct(url, key, 'events', 'client_id', {'event_type': 'eq.session_start'}),
            users         = sb_count(url, key, 'users'),
            videos        = sb_count(url, key, 'events', {'event_type': 'eq.video_load'}),
            shared_videos = sb_count(url, key, 'shares', {'share_type': 'eq.video'}),
            shared_loops  = sb_count(url, key, 'shares', {'share_type': 'eq.loop'}),
        )

    # Organize the data into table form.
    rd = results['dev']
    rp = results['prod']
    counts = [
        {'dev': rd['sessions'],       'prod': rp['sessions']},
        {'dev': rd['clients'],        'prod': rp['clients']},
        {'dev': rd['users'],          'prod': rp['users']},
        {'dev': rd['videos'],         'prod': rp['videos']},
        {'dev': rd['shared_videos'],  'prod': rp['shared_videos']},
        {'dev': rd['shared_loops'],   'prod': rp['shared_loops']},
    ]

    # Create the labels for the table.
    labels = [
        {'metric': 'Sessions',      'note': 'New tab or page load'},
        {'metric': 'Clients',       'note': 'Unique devices, browsers, etc'},
        {'metric': 'Users',         'note': 'Authenticated users'},
        {'metric': 'Videos loaded', 'note': 'Newly loaded or opened from library'},
        {'metric': 'Shared videos', 'note': '.'},
        {'metric': 'Shared loops',  'note': '.'},
    ]

    # Merge labels and counts into rows.
    rows = [
        lab | cnt
        for cnt, lab in zip(counts, labels)
    ]

    # Print the delimited table.
    table = delimited_rows_text(
        rows,
        header = ['metric', 'prod', 'dev', 'note'],
        delimiter = '|',
        want_header = True,
        align = True,
    )
    print(table)

####
# Helpers.
####

def read_file(path):
    with open(path) as fh:
        return fh.read()

def clsname(x):
    return type(x).__name__

def write_file(c, path, text):
    if c.config.run.dry:
        print(f'# write_file({path}): {clsname(text)}')
    else:
        with open(path, 'w') as fh:
            return fh.write(text)

def read_json(path):
    return json.loads(read_file(path))

def write_json(c, path, d):
    if c.config.run.dry:
        print(f'# write_json({path}): {clsname(d)}')
    else:
        with open(path, 'w') as fh:
            json.dump(d, fh, indent = 2)

def get_apps(f5 = False, ll = False):
    # Returns a list of APPS values: both apps for
    # True/True or False/False; otherwise, just one.
    return (
        APPS.values() if ll == f5 else
        [APPS.ll] if ll else
        [APPS.f5]
    )

def read_pid(path):
    return Path(path).read_text().strip()

def exists(path):
    return Path(path).exists()

@contextmanager
def cd(path):
    original = Path.cwd()
    os.chdir(path)
    try:
        yield
    finally:
        os.chdir(original)

def tail(fh, n = None):
    # Takes a file handle opened for reading.
    # Returns either the last N lines or whatever new lines are
    # available, given the file handle's current position.
    lines = deque(maxlen = n) if n else []
    while True:
        line = fh.readline()
        if line:
            lines.append(line)
        else:
            break
    return lines

def print_app_heading(a):
    # Takes an app from APPS.
    # Prints its colored heading.
    print(color_msg(f'\n# {a.name}', a.log_color))

def color_msg(msg, color):
    return color + msg + COLORS.reset

def sb_count(base_url, key, table, filters = None):
    # Takes a Supabase base URL, secret key, table name, and optional filters.
    # Returns the N of rows.
    # We can limit the returned payload to 1 since the count is available
    # in the returned HTTP headers.

    # Make HTTP request.
    headers = {
        'Prefer': 'count=exact',
        **sb_auth_headers(key)
    }
    filters = filters or {}
    params = {'limit': 1, **filters}
    r = sb_request(base_url, table, params, headers)

    # Parse HTTP header to get the count.
    # The text has this format: START-END/TOTAL
    content_range = r.headers.get('Content-Range', '*/0')
    total = content_range.split('/')[-1]
    return int(total)

def sb_distinct(base_url, key, table, col, filters = None):
    # Takes a Supabase base URL, secret key, table name, column name, and
    # optional filters. Returns the N of distinct values in the column.

    # Make HTTP request.
    headers = sb_auth_headers(key)
    filters = filters or {}
    params = {'select': col, **filters}
    r = sb_request(base_url, table, params, headers)

    # Return N distinct values in the column.
    uniq = set(row[col] for row in r.json() if row.get(col))
    return len(uniq)

def sb_auth_headers(key):
    # Takes a Supabase secret key.
    # Returns the auth-related headers for an HTTP request.
    return {
        'apikey': key,
        'Authorization': f'Bearer {key}',
    }

def sb_request(base_url, table, params, headers):
    # Takes a Supabase base URL, table name, HTTP params and headers.
    # Makes HTTP request and returns the result object.
    # Raises on failed request.
    url = f'{base_url}/rest/v1/{table}'
    r = requests.get(url, params = params, headers = headers)
    r.raise_for_status()
    return r

