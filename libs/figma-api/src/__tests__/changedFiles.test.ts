import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import {
  changedBetween,
  type FileExplanation,
  snapshotChanges,
  trySnapshotChanges,
  unexplainedFiles,
} from '../changedFiles';
import { Ledger } from '../syncLedger';

const explain = (file: string): FileExplanation | undefined => {
  const svg = /^svgs\/(.+)-24\.svg$/.exec(file);
  if (svg) return { item: svg[1] };
  if (file === 'manifest.json') return { derived: 'records' };
  if (file === 'font.ttf') return { derived: 'changes' };
  if (file === 'batch.json') return { derived: 'listing' };
  return undefined;
};

describe('unexplainedFiles', () => {
  it('lists a file of an item the ledger has no change for', () => {
    const ledger = new Ledger();
    ledger.updated({ name: 'add' });
    expect(
      unexplainedFiles({ changed: ['svgs/add-24.svg', 'svgs/send-24.svg'], ledger, explain }),
    ).toEqual(['svgs/send-24.svg']);
  });

  it('explains files made from all items only when an item changed', () => {
    const empty = new Ledger();
    const changed = ['font.ttf', 'batch.json'];
    expect(unexplainedFiles({ changed, ledger: empty, explain })).toEqual(changed);

    const ledger = new Ledger();
    ledger.added({ name: 'send' });
    expect(unexplainedFiles({ changed, ledger, explain })).toEqual([]);
  });

  it('explains the manifest by an item that was only recorded again', () => {
    const ledger = new Ledger();
    ledger.refreshed({ name: 'add' });
    expect(unexplainedFiles({ changed: ['manifest.json'], ledger, explain })).toEqual([]);
    expect(unexplainedFiles({ changed: ['batch.json'], ledger, explain })).toEqual(['batch.json']);
  });

  it('lists a file the sync does not know', () => {
    const ledger = new Ledger();
    ledger.added({ name: 'send' });
    expect(unexplainedFiles({ changed: ['README.md'], ledger, explain })).toEqual(['README.md']);
  });
});

describe('snapshotChanges', () => {
  const git = (cwd: string, ...args: string[]) =>
    execFileSync('git', args, { cwd, encoding: 'utf-8' });

  const createRepo = () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'changed-files-'));
    git(root, 'init', '-q');
    fs.writeFileSync(path.join(root, 'kept.txt'), 'one');
    fs.writeFileSync(path.join(root, 'removed.txt'), 'one');
    fs.writeFileSync(path.join(root, 'dirty.txt'), 'one');
    git(root, 'add', '.');
    git(
      root,
      '-c',
      'user.name=t',
      '-c',
      'user.email=t@example.test',
      '-c',
      'commit.gpgsign=false',
      'commit',
      '-qm',
      'first',
    );
    return root;
  };

  it('finds the files a run changed, including one that was already dirty and one that was removed', () => {
    const root = createRepo();
    fs.writeFileSync(path.join(root, 'dirty.txt'), 'two');
    const before = snapshotChanges(root);
    expect([...before.keys()]).toEqual(['dirty.txt']);

    fs.writeFileSync(path.join(root, 'dirty.txt'), 'three');
    fs.writeFileSync(path.join(root, 'new.txt'), 'new');
    fs.rmSync(path.join(root, 'removed.txt'));
    const after = snapshotChanges(root);

    expect(changedBetween(before, after)).toEqual(['dirty.txt', 'new.txt', 'removed.txt']);
  });

  it('finds nothing when the run changed nothing, even with a dirty tree', () => {
    const root = createRepo();
    fs.writeFileSync(path.join(root, 'dirty.txt'), 'two');
    expect(changedBetween(snapshotChanges(root), snapshotChanges(root))).toEqual([]);
  });

  it('finds a new file inside a new directory', () => {
    const root = createRepo();
    const before = snapshotChanges(root);
    fs.mkdirSync(path.join(root, 'src/svgs'), { recursive: true });
    fs.writeFileSync(path.join(root, 'src/svgs/add-24.svg'), '<svg/>');
    expect(changedBetween(before, snapshotChanges(root))).toEqual(['src/svgs/add-24.svg']);
  });
});

describe('trySnapshotChanges', () => {
  it('warns, once, and gives undefined when the check cannot run', () => {
    const notARepository = fs.mkdtempSync(path.join(os.tmpdir(), 'not-a-repository-'));
    const warn = jest.fn();

    expect(trySnapshotChanges(notARepository, ['.'], warn)).toBeUndefined();
    expect(warn).toHaveBeenCalledTimes(1);
    expect(warn.mock.calls[0][0]).toContain('The check for changed files');
  });

  it('gives the snapshot, without a warning, in a git checkout', () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'try-snapshot-'));
    execFileSync('git', ['init', '-q'], { cwd: root });
    fs.writeFileSync(path.join(root, 'new.txt'), 'new');
    const warn = jest.fn();

    expect([...(trySnapshotChanges(root, ['.'], warn) ?? new Map()).keys()]).toEqual(['new.txt']);
    expect(warn).not.toHaveBeenCalled();
  });
});
