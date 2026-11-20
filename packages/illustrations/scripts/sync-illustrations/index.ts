import { versionPlansDirectory, writeVersionPlan } from '@cds/figma-api/renderSyncReport';
import {
  isBreaking,
  type RejectedAsset,
  type SyncChanges,
  type SyncReport,
  writeSyncReport,
} from '@cds/figma-api/syncReport';

import { approximationSummary, notExportableSummary } from './artifacts/nativeSvg';
import { type Sink } from './sinks/Sink';
import { config } from './config';
import { hasChanges, hasChangesToRecord, type SyncResults } from './diffIllustrations';
import { type Release, ReleaseBranch, runOnReleaseBranches } from './git';
import { type Component, type Illustration, illustrationKey } from './illustration';
import { readManifest, writeManifest } from './manifest';
import { assertNativeCheckout } from './nativeRepo';
import { chooseSinks } from './selectSinks';
import { runSync, type SinkResult } from './sync';
import { duplicateAssets, rejectedAssets } from './syncReport';

const args = process.argv.slice(2);
const syncAll = config.syncAll || args.includes('--sync-all');
const reportPath = process.env.SYNC_REPORT_PATH;
const dryRun = args.includes('--dry-run');
const allOrNothing = args.includes('--all-or-nothing');
const useGit = config.git && !args.includes('--no-git') && !dryRun;
const selectSinks = args.includes('--select-sinks');
const todaysDate = new Date().toISOString().slice(0, 10);
/** Only date-derived content: illustration names come from Figma and must never reach the shell. */
const nativeCommitMessage = `feat: Sync CDS illustrations ${todaysDate}`;

/** The order of illustration types in the changelog; other types follow alphabetically. */
const changelogTypeOrder = ['pictogram', 'heroSquare', 'spotIcon', 'spotRectangle', 'spotSquare'];

const logTable = (heading: string, illustrations: (Illustration | Component)[]) => {
  console.log(`\n${heading} (${illustrations.length}):`);
  if (illustrations.length) {
    console.table(illustrations.map(({ nodeId, type, name }) => ({ nodeId, type, name })));
  }
};

const logSummary = (results: SyncResults) => {
  console.log('\n\nChange summary:');
  logTable('New illustrations', results.added);
  logTable('Deleted illustrations', results.deleted);
  console.log(`\nRenamed illustrations (${results.renamed.length}):`);
  if (results.renamed.length) {
    console.table(
      results.renamed.map(({ nodeId, type, oldName, name }) => ({
        nodeId,
        type,
        oldName,
        newName: name,
      })),
    );
  }
  logTable('Updated illustrations', results.updated);

  const breaking = [...results.deleted, ...results.renamed];
  if (breaking.length > 0) {
    console.log(
      `\n⚠️ Warning: ${breaking.length} breaking changes detected (${breaking
        .map(illustrationKey)
        .join(', ')}). Publish a migration guide and migrator script with this release.`,
    );
  }
};

const failedIllustrations: SinkResult['failures'] = [];
const rejected: RejectedAsset[] = [];
let changes: SyncResults | undefined;

const logSinkResults = (results: SinkResult[]) => {
  console.log(dryRun ? '\nDry run: nothing was written.' : '\nSink results:');
  for (const { sink, written, removed, failures, published } of results) {
    const done = published && !dryRun;
    console.log(
      `  ${sink}: ${done ? 'wrote' : 'would write'} ${written.length}, ` +
        `${done ? 'removed' : 'would remove'} ${removed.length}, rejected ${failures.length}` +
        (!dryRun && !published ? ' (all-or-nothing: this sink published nothing)' : ''),
    );
  }
  const failures = results.flatMap(({ sink, failures: sinkFailures }) =>
    sinkFailures.map((failure) => ({ sink, ...failure })),
  );
  if (failures.length) {
    console.error(`\n❌ ${failures.length} illustration(s) were rejected:`);
    for (const { sink, message } of failures) console.error(`\n[${sink}] ${message}`);
  }
};

/** Runs the sync into `sinks` and records it; returns whether anything was produced. */
const sync = async (sinks: Sink[]) => {
  console.log('Loading manifest file...');
  const manifest = readManifest(config.manifestPath);

  const outcome = await runSync({
    source: config.source,
    manifest,
    sinks,
    syncAll,
    dryRun,
    allOrNothing,
    log: console.log,
  });

  rejected.push(...duplicateAssets(outcome.duplicates));
  if (outcome.duplicates.length) {
    console.warn('\n⚠️ Skipping components whose type/name is already taken by another component:');
    console.table(outcome.duplicates.map(({ nodeId, type, name }) => ({ nodeId, type, name })));
  }

  if (outcome.status === 'nothing-to-sync') {
    console.log('Every illustration matches the last sync, skipping sync...');
    return false;
  }
  if (outcome.status === 'no-changes') {
    console.log('Downloaded illustrations are identical to the last sync, skipping sync...');
    return false;
  }

  failedIllustrations.push(...outcome.sinkResults.flatMap(({ failures }) => failures));
  rejected.push(...rejectedAssets(outcome.sinkResults, config.componentUrl));
  changes = outcome.diff.results;

  if (hasChangesToRecord(outcome.diff) && !dryRun) {
    console.log('Updating manifest...');
    writeManifest(config.manifestPath, {
      illustrations: outcome.diff.illustrations,
      palette: outcome.palette,
    });
  }
  if (hasChanges(outcome.diff)) logSummary(outcome.diff.results);

  if (outcome.backfilled.length) {
    logTable('Restored illustrations a destination was missing', outcome.backfilled);
  }
  logSinkResults(outcome.sinkResults);
  if (sinks.some((sink) => config.nativeSinks.includes(sink))) {
    console.log('\nIllustrations the native packages draw with a known difference:');
    for (const line of approximationSummary()) console.log(`  ${line}`);
    console.log(
      '\n⚠️ Illustrations the native packages do not ship until the art is simplified in Figma:',
    );
    for (const line of notExportableSummary()) console.log(`  ${line}`);
  }
  return !dryRun;
};

/**
 * The sync writes into this repo's working tree and leaves the branch, the version plan, the
 * release and the push to the sync workflow (or to whoever runs it by hand, with `git diff`).
 *
 * With git, the native checkout runs on a fresh `illustrations/YYYY-MM-DD` branch that is pushed
 * when the run changed it and deleted when it did not or the run failed, so a failed run never
 * leaves a half-written tree behind. Pull requests are opened by hand; `publish` prints the branch
 * and the title to use.
 *
 * `--select-sinks` asks which configured sinks to write to before anything starts; the native
 * checkout is only touched when one of its sinks is selected.
 */
const main = async () => {
  console.log('Starting illustration sync...');
  if (config.nativeRepo) assertNativeCheckout(config.nativeRepo);
  const sinks = selectSinks ? await chooseSinks(config.sinks) : config.sinks;
  const writesNative = sinks.some((sink) => config.nativeSinks.includes(sink));
  if (!useGit || !config.nativeRepo || !writesNative) {
    await sync(sinks);
    return;
  }

  const release: Release = {
    label: config.nativeRepo,
    branch: new ReleaseBranch(config.nativeRepo, todaysDate),
    commitMessage: nativeCommitMessage,
  };
  await runOnReleaseBranches([release], () => sync(sinks));
};

const toSyncChanges = (results?: SyncResults): SyncChanges => ({
  added: results?.added.map(({ name, type }) => ({ name, group: type })) ?? [],
  updated: results?.updated.map(({ name, type }) => ({ name, group: type })) ?? [],
  renamed:
    results?.renamed.map(({ name, oldName, type }) => ({ name, oldName, group: type })) ?? [],
  deleted: results?.deleted.map(({ name, type }) => ({ name, group: type })) ?? [],
});

main().then(
  () => {
    const syncChanges = toSyncChanges(changes);
    const syncReport: SyncReport = {
      target: 'illustrations',
      bump: isBreaking(syncChanges) ? 'major' : 'minor',
      groupOrder: changelogTypeOrder,
      changes: syncChanges,
      rejected,
    };
    writeSyncReport(reportPath, syncReport);
    // Scratch runs and dry runs write nothing into the repository.
    if (config.git && !dryRun) writeVersionPlan(syncReport, versionPlansDirectory(config.repoRoot));
    if (failedIllustrations.length) {
      console.error(
        `\n❌ Illustration sync finished with ${failedIllustrations.length} rejected illustration(s); ` +
          'fix them in Figma and rerun.',
      );
      process.exitCode = 1;
      return;
    }
    console.log(
      dryRun
        ? '\n✅ Dry run passed: every illustration converts and validates.'
        : '\n✅ Success: Illustration sync completed successfully!',
    );
  },
  (error: unknown) => {
    console.error(`\n❌ Illustration sync failed, nothing was published.\n`);
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  },
);
