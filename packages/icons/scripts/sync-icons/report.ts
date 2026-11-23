import { versionPlansDirectory, writeVersionPlan } from '@cds/figma-api/renderSyncReport';
import {
  type ExaminedSummary,
  figmaNodeUrl,
  isBreaking,
  type RejectedAsset,
  type SyncChanges,
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

export const toChanges = (results?: IconSyncResults): SyncChanges => ({
  added: results?.newIconSets.map(({ name }) => ({ name })) ?? [],
  updated: results?.updatedIconSets.map(({ name }) => ({ name })) ?? [],
  renamed: results?.renamedIconSets.map(({ name, oldName }) => ({ name, oldName })) ?? [],
  deleted: results?.deletedIconSets.map(({ name }) => ({ name })) ?? [],
});

export const buildSyncReport = ({
  results,
  rejected,
  examined,
}: {
  results?: IconSyncResults;
  rejected: RejectedAsset[];
  examined: ExaminedSummary;
}): SyncReport => {
  const changes = toChanges(results);
  return {
    target: 'icons',
    bump: isBreaking(changes) ? 'major' : 'minor',
    changes,
    rejected,
    examined,
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
