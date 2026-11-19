import fs from 'node:fs';
import path from 'node:path';

import type { SyncResults } from './diffIllustrations';
import { type Illustration, illustrationKey } from './illustration';
import type { SinkResult } from './sync';

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

/** One entry per illustration and reason, however many sinks rejected it. */
export const rejectedAssets = (
  sinkResults: SinkResult[],
  componentUrl: (illustration: Illustration) => string,
): RejectedAsset[] => {
  const seen = new Set<string>();
  return sinkResults
    .flatMap(({ failures }) => failures)
    .flatMap(({ illustration, message }) => {
      const key = `${illustration.nodeId}:${message}`;
      if (seen.has(key)) return [];
      seen.add(key);
      return [
        {
          name: illustrationKey(illustration),
          nodeId: illustration.nodeId,
          url: componentUrl(illustration),
          message,
        },
      ];
    });
};

export const countChanges = (results?: SyncResults): SyncReport['counts'] => ({
  added: results?.added.length ?? 0,
  updated: results?.updated.length ?? 0,
  renamed: results?.renamed.length ?? 0,
  deleted: results?.deleted.length ?? 0,
});

/** Renames and deletions are breaking changes. */
export const isBreaking = (results?: SyncResults) =>
  (results?.renamed.length ?? 0) + (results?.deleted.length ?? 0) > 0;

/** Writes the report when a path is given; scratch and local runs pass none. */
export const writeSyncReport = (reportPath: string | undefined, report: SyncReport) => {
  if (!reportPath) return;
  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
};
