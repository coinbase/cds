import fs from 'node:fs';
import path from 'node:path';

/** An asset the sync could not publish, described for the designer who can fix it in Figma. */
export type RejectedAsset = {
  name: string;
  nodeId: string;
  /** Deep link to the asset in Figma. */
  url: string;
  /** What is wrong and how to fix it. */
  message: string;
  /** For a name clash: where the asset it clashes with is in Figma. */
  duplicateOf?: { url: string };
};

export type ChangedAsset = {
  name: string;
  /** Sub-heading in the changelog, such as an illustration's type. */
  group?: string;
};

export type RenamedAsset = ChangedAsset & { oldName: string };

export type SyncChanges = {
  added: ChangedAsset[];
  updated: ChangedAsset[];
  renamed: RenamedAsset[];
  deleted: ChangedAsset[];
};

export type ReleaseBump = 'major' | 'minor' | 'patch';

/**
 * What a sync run leaves for the workflow: the changes it made and the assets design has to fix.
 * The sync only writes files and this report. The workflow owns the branch, the version plan, the
 * release, the push and the notifications.
 */
export type SyncReport = {
  /** The package the sync updates. It is also the `nx release` project and the branch prefix. */
  target: string;
  /** What the commit title and the version plan call the target, when it is not `target`. */
  label?: string;
  /** What the version plan asks `nx release` for. */
  bump: ReleaseBump;
  /** The order of `group` headings in the changelog; other groups follow alphabetically. */
  groupOrder?: string[];
  changes: SyncChanges;
  rejected: RejectedAsset[];
};

export const emptyChanges = (): SyncChanges => ({
  added: [],
  updated: [],
  renamed: [],
  deleted: [],
});

export const hasChanges = (changes: SyncChanges) =>
  Object.values(changes).some((assets) => assets.length > 0);

/** Renaming or deleting an asset breaks consumers, who reference assets by name. */
export const isBreaking = (changes: SyncChanges) =>
  changes.renamed.length + changes.deleted.length > 0;

export const figmaNodeUrl = (fileKey: string, nodeId: string) =>
  `https://www.figma.com/design/${fileKey}?node-id=${nodeId.replace(':', '-')}`;

/** Writes the report when a path is given; local and scratch runs pass none. */
export const writeSyncReport = (reportPath: string | undefined, report: SyncReport) => {
  if (!reportPath) return;
  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
};
