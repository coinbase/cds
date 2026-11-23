import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import {
  changedBetween,
  type FileExplanation,
  snapshotFiles,
  unexplainedFiles,
} from '../changedFiles';
import { emptyChanges, type SyncChanges } from '../syncReport';

const explain = (file: string): FileExplanation | undefined => {
  const svg = /^svgs\/(.+)-24\.svg$/.exec(file);
  if (svg) return { item: svg[1] };
  if (file === 'manifest.json') return { derived: 'records' };
  if (file === 'font.ttf') return { derived: 'changes' };
  if (file === 'batch.json') return { derived: 'listing' };
  return undefined;
};

const changes = (overrides: Partial<SyncChanges> = {}): SyncChanges => ({
  ...emptyChanges(),
  ...overrides,
});

describe('unexplainedFiles', () => {
  it('lists a file of an item the report has no change for', () => {
    expect(
      unexplainedFiles({
        changed: ['svgs/add-24.svg', 'svgs/send-24.svg'],
        changes: changes({ updated: [{ name: 'add' }] }),
        explain,
      }),
    ).toEqual(['svgs/send-24.svg']);
  });

  it('explains the files of a renamed item by its new and its old name', () => {
    expect(
      unexplainedFiles({
        changed: ['svgs/minus-24.svg', 'svgs/remove-24.svg'],
        changes: changes({ renamed: [{ name: 'minus', oldName: 'remove' }] }),
        explain,
      }),
    ).toEqual([]);
  });

  it('tells apart assets of the same name in different groups', () => {
    const groupExplain = (): FileExplanation => ({ item: 'buy', group: 'pictogram' });
    expect(
      unexplainedFiles({
        changed: ['a'],
        changes: changes({ added: [{ name: 'buy', group: 'heroSquare' }] }),
        explain: groupExplain,
      }),
    ).toEqual(['a']);
    expect(
      unexplainedFiles({
        changed: ['a'],
        changes: changes({ added: [{ name: 'buy', group: 'pictogram' }] }),
        explain: groupExplain,
      }),
    ).toEqual([]);
  });

  it('explains files made from all items only when an item changed', () => {
    const changed = ['font.ttf', 'batch.json'];
    expect(unexplainedFiles({ changed, changes: changes(), explain })).toEqual(changed);
    expect(
      unexplainedFiles({ changed, changes: changes({ added: [{ name: 'send' }] }), explain }),
    ).toEqual([]);
  });

  it('explains the manifest by an item that was only recorded again', () => {
    expect(
      unexplainedFiles({
        changed: ['manifest.json'],
        changes: changes(),
        refreshed: true,
        explain,
      }),
    ).toEqual([]);
    expect(
      unexplainedFiles({ changed: ['batch.json'], changes: changes(), refreshed: true, explain }),
    ).toEqual(['batch.json']);
  });

  it('lists a file the sync does not know', () => {
    expect(
      unexplainedFiles({
        changed: ['README.md'],
        changes: changes({ added: [{ name: 'send' }] }),
        explain,
      }),
    ).toEqual(['README.md']);
  });
});

describe('snapshotFiles', () => {
  const createRoot = () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'snapshot-files-'));
    fs.mkdirSync(path.join(root, 'src/svgs'), { recursive: true });
    fs.writeFileSync(path.join(root, 'src/svgs/add-24.svg'), '<svg>1</svg>');
    fs.writeFileSync(path.join(root, 'src/svgs/send-24.svg'), '<svg>2</svg>');
    fs.writeFileSync(path.join(root, 'manifest.json'), '{}');
    fs.writeFileSync(path.join(root, 'other.txt'), 'not listed');
    return root;
  };

  it('hashes every file under the given folders and files, by path relative to the root', () => {
    const snapshot = snapshotFiles(createRoot(), ['src', 'manifest.json', 'missing']);
    expect([...snapshot.keys()]).toEqual([
      'src/svgs/add-24.svg',
      'src/svgs/send-24.svg',
      'manifest.json',
    ]);
  });

  it('finds the files a run changed, added and removed, and not one it wrote the same again', () => {
    const root = createRoot();
    const before = snapshotFiles(root, ['src', 'manifest.json']);

    fs.writeFileSync(path.join(root, 'src/svgs/add-24.svg'), '<svg>changed</svg>');
    fs.writeFileSync(path.join(root, 'src/svgs/new-24.svg'), '<svg>new</svg>');
    fs.rmSync(path.join(root, 'src/svgs/send-24.svg'));
    fs.writeFileSync(path.join(root, 'manifest.json'), '{}');

    expect(changedBetween(before, snapshotFiles(root, ['src', 'manifest.json']))).toEqual([
      'src/svgs/add-24.svg',
      'src/svgs/new-24.svg',
      'src/svgs/send-24.svg',
    ]);
  });

  it('finds nothing when the run changed nothing', () => {
    const root = createRoot();
    expect(changedBetween(snapshotFiles(root, ['src']), snapshotFiles(root, ['src']))).toEqual([]);
  });
});
