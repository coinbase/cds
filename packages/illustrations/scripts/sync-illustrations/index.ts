import fs from 'node:fs';
import path from 'node:path';

import { approximationSummary, notExportableSummary } from './artifacts/nativeSvg';
import { type Sink } from './sinks/Sink';
import { config } from './config';
import { hasChanges, type SyncResults } from './diffIllustrations';
import { generateVersionPlan } from './generateVersionPlan';
import { type Release, ReleaseBranch, runOnReleaseBranches } from './git';
import { type Component, type Illustration, illustrationKey } from './illustration';
import { readManifest, writeManifest } from './manifest';
import { assertNativeCheckout } from './nativeRepo';
import { chooseSinks } from './selectSinks';
import { runSync } from './sync';

const args = process.argv.slice(2);
const syncAll = config.syncAll || args.includes('--sync-all');
const useGit = config.git && !args.includes('--no-git');
const selectSinks = args.includes('--select-sinks');
const todaysDate = new Date().toISOString().slice(0, 10);
/** Only date-derived content: illustration names come from Figma and must never reach the shell. */
const commitMessage = `feat: Publish illustrations ${todaysDate}`;
const nativeCommitMessage = `feat: Sync CDS illustrations ${todaysDate}`;

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

/** Runs the sync into `sinks` and records it; returns whether anything was produced. */
const sync = async (sinks: Sink[]) => {
  if (!fs.existsSync(config.versionPlansPath))
    fs.mkdirSync(config.versionPlansPath, { recursive: true });

  console.log('Loading manifest file...');
  const manifest = readManifest(config.manifestPath);

  const outcome = await runSync({
    source: config.source,
    manifest,
    sinks,
    syncAll,
    log: console.log,
  });

  if (outcome.duplicates.length) {
    console.warn('\n⚠️ Skipping components whose type/name is already taken by another component:');
    console.table(outcome.duplicates.map(({ nodeId, type, name }) => ({ nodeId, type, name })));
  }

  if (outcome.status === 'nothing-to-sync') {
    console.log(`Figma file has no updates since ${manifest.lastUpdated}, skipping sync...`);
    return false;
  }
  if (outcome.status === 'no-changes') {
    console.log('Downloaded illustrations are identical to the last sync, skipping sync...');
    return false;
  }

  if (hasChanges(outcome.diff)) {
    console.log('Writing version plan...');
    fs.writeFileSync(
      path.join(config.versionPlansPath, `illustrations-${todaysDate}.md`),
      generateVersionPlan(outcome.diff.results, todaysDate),
    );

    console.log('Updating manifest...');
    writeManifest(config.manifestPath, {
      illustrations: outcome.diff.illustrations,
      palette: outcome.palette,
    });

    logSummary(outcome.diff.results);
  }

  if (outcome.backfilled.length) {
    logTable('Restored illustrations a destination was missing', outcome.backfilled);
  }
  if (sinks.some((sink) => config.nativeSinks.includes(sink))) {
    console.log('\nIllustrations the native packages draw with a known difference:');
    for (const line of approximationSummary()) console.log(`  ${line}`);
    console.log(
      '\n⚠️ Illustrations the native packages do not ship until the art is simplified in Figma:',
    );
    for (const line of notExportableSummary()) console.log(`  ${line}`);
  }
  return true;
};

/**
 * With git, the sync runs on a fresh `illustrations/YYYY-MM-DD` branch in this repo, and in the
 * native checkout when one is configured. Each is pushed when the run changed it and deleted when
 * it did not or the run failed, so a failed run never leaves a half-written tree behind. Pull
 * requests are opened by hand; `publish` prints the branch and the title to use.
 *
 * `--select-sinks` asks which configured sinks to write to before anything starts; the native
 * checkout is only touched when one of its sinks is selected.
 */
const main = async () => {
  console.log('Starting illustration sync...');
  if (config.nativeRepo) assertNativeCheckout(config.nativeRepo);
  const sinks = selectSinks ? await chooseSinks(config.sinks) : config.sinks;
  const writesNative = sinks.some((sink) => config.nativeSinks.includes(sink));
  if (!useGit) {
    await sync(sinks);
    return;
  }

  // The native checkout starts first, so a dirty native tree fails before this repo is touched.
  const releases: Release[] = [
    ...(config.nativeRepo && writesNative
      ? [
          {
            label: config.nativeRepo,
            branch: new ReleaseBranch(config.nativeRepo, todaysDate),
            commitMessage: nativeCommitMessage,
          },
        ]
      : []),
    {
      label: config.repoRoot,
      branch: new ReleaseBranch(config.repoRoot, todaysDate),
      commitMessage,
    },
  ];
  await runOnReleaseBranches(releases, () => sync(sinks));
};

main().then(
  () => console.log('\n✅ Success: Illustration sync completed successfully!'),
  (error: unknown) => {
    console.error(`\n❌ Illustration sync failed, nothing was published.\n`);
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  },
);
