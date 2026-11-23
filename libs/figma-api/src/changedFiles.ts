import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

import { hasChanges, type SyncChanges } from './syncReport';

/**
 * Where a changed file comes from. A file made for one item names it; a file made from all the
 * items says what its content depends on: the changes (a font, a list of names), the records
 * (the manifest, which also records an item that only got a new date), or the Figma listing.
 */
export type FileExplanation =
  | { item: string; group?: string }
  | { derived: 'changes' | 'records' | 'listing' };

/** Every file of a snapshot by its path, relative to the root, with a hash of its content. */
export type FileSnapshot = ReadonlyMap<string, string>;

const filesUnder = (target: string): string[] => {
  const stat = fs.statSync(target, { throwIfNoEntry: false });
  if (!stat) return [];
  if (stat.isFile()) return [target];
  return fs
    .readdirSync(target)
    .sort()
    .flatMap((entry) => filesUnder(path.join(target, entry)));
};

const hashOf = (file: string) =>
  crypto.createHash('sha1').update(fs.readFileSync(file)).digest('hex');

/**
 * Every file under the given paths (files or folders, relative to `root`) with a hash of its
 * content. A path that does not exist has no files. Comparing two snapshots shows what a run
 * wrote, without git: a file that was already changed before the run is only in the result when
 * the run changed it again.
 */
export const snapshotFiles = (root: string, paths: readonly string[]): FileSnapshot =>
  new Map(
    paths
      .flatMap((target) => filesUnder(path.join(root, target)))
      .map((file) => [path.relative(root, file).split(path.sep).join('/'), hashOf(file)]),
  );

/** The files whose content differs between two snapshots, or that are in only one of them. */
export const changedBetween = (
  before: ReadonlyMap<string, string>,
  after: ReadonlyMap<string, string>,
) =>
  [...new Set([...before.keys(), ...after.keys()])]
    .filter((file) => before.get(file) !== after.get(file))
    .sort();

const assetKey = (name: string, group?: string) => (group ? `${group}/${name}` : name);

/**
 * The changed files that no change of the report explains, such as a Code Connect file that
 * changed with no asset change, or a file the sync does not know. Listing them is how a change is
 * kept from going into a pull request without a reason. `refreshed` says that an item was only
 * recorded again (a new date), which explains the manifest.
 */
export const unexplainedFiles = ({
  changed,
  changes,
  refreshed = false,
  explain,
}: {
  changed: readonly string[];
  changes: SyncChanges;
  refreshed?: boolean;
  explain: (file: string) => FileExplanation | undefined;
}) => {
  const explained = new Set([
    ...[...changes.added, ...changes.updated, ...changes.deleted].map(({ name, group }) =>
      assetKey(name, group),
    ),
    ...changes.renamed.flatMap(({ name, oldName, group }) => [
      assetKey(name, group),
      assetKey(oldName, group),
    ]),
  ]);
  const changedAnything = hasChanges(changes);
  return changed.filter((file) => {
    const explanation = explain(file);
    if (!explanation) return true;
    if ('item' in explanation) return !explained.has(assetKey(explanation.item, explanation.group));
    if (explanation.derived === 'records') return !changedAnything && !refreshed;
    return !changedAnything;
  });
};
