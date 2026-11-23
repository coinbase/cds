import { versionPlansDirectory, writeVersionPlan } from '@cds/figma-api/renderSyncReport';
import {
  figmaNodeUrl,
  isBreaking,
  type RejectedAsset,
  type SyncChanges,
  type SyncReport,
  writeSyncReport,
} from '@cds/figma-api/syncReport';

import { profile } from './profile';
import type { Rejection } from './rules';
import type { SyncOutcome } from './sync';

export const toRejectedAsset = (
  figmaFileId: string,
  { name, nodeId, message, category, duplicateNodeId }: Rejection,
): RejectedAsset => ({
  name,
  nodeId,
  url: figmaNodeUrl(figmaFileId, nodeId),
  message,
  category,
  ...(duplicateNodeId ? { duplicateOf: { url: figmaNodeUrl(figmaFileId, duplicateNodeId) } } : {}),
});

export const buildSyncReport = (
  { changes, rejected, ignored, seen }: SyncOutcome,
  { figmaFileId, unexplainedFiles }: { figmaFileId: string; unexplainedFiles?: string[] },
): SyncReport => ({
  target: profile.target,
  ...(profile.label ? { label: profile.label } : {}),
  ...(profile.figmaFile ? { figmaFile: profile.figmaFile(figmaFileId) } : {}),
  // A deletion or a rename removes a public `IconName` export, so it is a breaking change.
  bump: isBreaking(changes) ? profile.bump.breaking : profile.bump.otherwise,
  changes,
  rejected,
  examined: { seen, ignored },
  ...(unexplainedFiles?.length ? { unexplainedFiles } : {}),
});

/** Writes the report for the workflow, and the version plan when an icon changed. */
export const writeReport = (
  report: SyncReport,
  { repoRoot, reportPath }: { repoRoot: string; reportPath?: string },
) => {
  writeSyncReport(reportPath, report);
  writeVersionPlan(report, versionPlansDirectory(repoRoot));
};

const names = (assets: { name: string }[]) => assets.map(({ name }) => ({ name }));

export const logSummary = ({ added, deleted, renamed, updated }: SyncChanges) => {
  console.log('\n\nChange summary:');
  console.log(`\nNew icon sets (${added.length}):`);
  console.table(names(added));
  console.log(`\nDeleted icon sets (${deleted.length}):`);
  console.table(names(deleted));
  console.log(`\nRenamed icon sets (${renamed.length}):`);
  console.table(renamed.map(({ oldName, name }) => ({ oldName, newName: name })));
  console.log(`\nUpdated icon sets (${updated.length}):`);
  console.table(names(updated));
  if (deleted.length + renamed.length > 0) {
    console.log(`\n⚠️ Warning: ${deleted.length + renamed.length} breaking changes detected`);
  }
};

export const logRejections = (rejected: RejectedAsset[]) => {
  if (rejected.length === 0) return;
  console.error(`\n❌ ${rejected.length} problem(s) were found in the Figma file:`);
  for (const { message, url } of rejected) console.error(`\n${message}\n  ${url}`);
  console.error('\nThe icon sets with problems were skipped. Fix them in Figma and sync again.');
};
