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
};

/** What the sync workflow reads to open the pull request and notify designers. */
export type SyncReport = {
  target: 'icons' | 'illustrations';
  /** The branch the sync pushes its changes to. */
  branch: string;
  /** Renames and deletions need a major release, so the reviewer must be told. */
  breaking: boolean;
  counts: { added: number; updated: number; renamed: number; deleted: number };
  rejected: RejectedAsset[];
};

export const figmaNodeUrl = (fileKey: string, nodeId: string) =>
  `https://www.figma.com/design/${fileKey}?node-id=${nodeId.replace(':', '-')}`;

/** Writes the report when a path is given; local runs pass none. */
export const writeSyncReport = (reportPath: string | undefined, report: SyncReport) => {
  if (!reportPath) return;
  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
};
