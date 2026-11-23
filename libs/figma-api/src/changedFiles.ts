import { execFileSync } from 'node:child_process';

import type { Ledger } from './syncLedger';

/**
 * Where a changed file comes from. A file made for one item names it; a file made from all the
 * items says what its content depends on: the changes (a font, a list of names), the records
 * (the manifest, which also records an item that only got a new date), or the Figma listing.
 */
export type FileExplanation =
  | { item: string; group?: string }
  | { derived: 'changes' | 'records' | 'listing' };

/** The files git sees as changed, each with a hash of its content (or `deleted`). */
export const snapshotChanges = (cwd: string, pathspecs: string[] = ['.']) => {
  const status = execFileSync(
    'git',
    ['status', '--porcelain=v1', '-z', '--untracked-files=all', '--', ...pathspecs],
    { cwd, encoding: 'utf-8', maxBuffer: 64 * 1024 * 1024 },
  );
  const files = status
    .split('\0')
    .filter((entry) => /^[ MADRCU?!]{2} /.test(entry))
    .map((entry) => ({ deleted: entry[0] === 'D' || entry[1] === 'D', file: entry.slice(3) }));
  const present = files.filter(({ deleted }) => !deleted).map(({ file }) => file);
  const hashes = present.length
    ? execFileSync('git', ['hash-object', '--stdin-paths'], {
        cwd,
        encoding: 'utf-8',
        input: present.join('\n'),
        maxBuffer: 64 * 1024 * 1024,
      })
        .trim()
        .split('\n')
    : [];
  const hashOf = new Map(present.map((file, index) => [file, hashes[index]]));
  return new Map(files.map(({ file, deleted }) => [file, deleted ? 'deleted' : hashOf.get(file)!]));
};

/** The files whose content differs between two snapshots, or that are in only one of them. */
export const changedBetween = (
  before: ReadonlyMap<string, string>,
  after: ReadonlyMap<string, string>,
) =>
  [...new Set([...before.keys(), ...after.keys()])]
    .filter((file) => before.get(file) !== after.get(file))
    .sort();

/**
 * The changed files that no entry of the ledger explains, such as a Code Connect file that changed
 * with no asset change, or a file the sync does not know. Listing them is how a change is kept from
 * going into a pull request without a reason.
 */
export const unexplainedFiles = ({
  changed,
  ledger,
  explain,
}: {
  changed: readonly string[];
  ledger: Ledger;
  explain: (file: string) => FileExplanation | undefined;
}) =>
  changed.filter((file) => {
    const explanation = explain(file);
    if (!explanation) return true;
    if ('item' in explanation) return !ledger.explains(explanation.item, explanation.group);
    if (explanation.derived === 'records') return !ledger.hasChanges() && !ledger.hasRefreshed();
    return !ledger.hasChanges();
  });
