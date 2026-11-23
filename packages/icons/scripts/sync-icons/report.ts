import { versionPlansDirectory, writeVersionPlan } from '@cds/figma-api/renderSyncReport';
import type { Ledger } from '@cds/figma-api/syncLedger';
import {
  figmaNodeUrl,
  isBreaking,
  type RejectedAsset,
  type SyncReport,
  writeSyncReport,
} from '@cds/figma-api/syncReport';

import type { IconSyncResults, Rejection } from './diff';

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

export const buildSyncReport = ({
  ledger,
  seen,
  unexplainedFiles,
}: {
  ledger: Ledger;
  /** How many items the source listed. */
  seen: number;
  unexplainedFiles?: string[];
}): SyncReport => {
  const changes = ledger.changes();
  return {
    target: 'icons',
    bump: isBreaking(changes) ? 'major' : 'minor',
    changes,
    rejected: ledger.rejected(),
    examined: { seen, ignored: ledger.ignoredGroups() },
    ...(unexplainedFiles?.length ? { unexplainedFiles } : {}),
  };
};

/** Writes the report for the workflow, and the version plan when an icon changed. */
export const writeReport = (
  report: SyncReport,
  { repoRoot, reportPath }: { repoRoot: string; reportPath?: string },
) => {
  writeSyncReport(reportPath, report);
  writeVersionPlan(report, versionPlansDirectory(repoRoot));
};

export const logSummary = (results: IconSyncResults) => {
  console.log('\n\nChange summary:');
  console.log(`\nNew icon sets (${results.newIconSets.length}):`);
  console.table(results.newIconSets.map(({ nodeId, name }) => ({ nodeId, name })));
  console.log(`\nDeleted icon sets (${results.deletedIconSets.length}):`);
  console.table(results.deletedIconSets.map(({ nodeId, name }) => ({ nodeId, name })));
  console.log(`\nRenamed icon sets (${results.renamedIconSets.length}):`);
  console.table(
    results.renamedIconSets.map(({ nodeId, oldName, name }) => ({
      nodeId,
      oldName,
      newName: name,
    })),
  );
  console.log(`\nUpdated icon sets (${results.updatedIconSets.length}):`);
  console.table(results.updatedIconSets.map(({ nodeId, name }) => ({ nodeId, name })));

  const breakingChanges = results.deletedIconSets.length + results.renamedIconSets.length;
  if (breakingChanges > 0)
    console.log(`\n⚠️ Warning: ${breakingChanges} breaking changes detected`);
};

export const logRejections = (rejected: RejectedAsset[]) => {
  if (rejected.length === 0) return;
  console.error(`\n❌ ${rejected.length} problem(s) were found in the Figma file:`);
  for (const { message, url } of rejected) console.error(`\n${message}\n  ${url}`);
  console.error('\nThe icon sets with problems were skipped. Fix them in Figma and sync again.');
};
