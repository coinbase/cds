import fs from 'node:fs';
import path from 'node:path';

import { config } from './config';
import { hasChanges, type SyncResults } from './diffIllustrations';
import { generateVersionPlan } from './generateVersionPlan';
import { type Component, type Illustration, illustrationKey } from './illustration';
import { readManifest, writeManifest } from './manifest';
import { runSync } from './sync';

const args = process.argv.slice(2);
const syncAll = config.syncAll || args.includes('--sync-all');
const todaysDate = new Date().toISOString().slice(0, 10);

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

const main = async () => {
  console.log('Starting illustration sync...');

  if (!fs.existsSync(config.versionPlansPath))
    fs.mkdirSync(config.versionPlansPath, { recursive: true });

  console.log('Loading manifest file...');
  const manifest = readManifest(config.manifestPath);

  const outcome = await runSync({
    source: config.source,
    manifest,
    sinks: config.sinks,
    syncAll,
    log: console.log,
  });

  if (outcome.duplicates.length) {
    console.warn('\n⚠️ Skipping components whose type/name is already taken by another component:');
    console.table(outcome.duplicates.map(({ nodeId, type, name }) => ({ nodeId, type, name })));
  }

  if (outcome.status === 'nothing-to-sync') {
    console.log(`Figma file has no updates since ${manifest.lastUpdated}, skipping sync...`);
    return;
  }
  if (outcome.status === 'no-changes') {
    console.log('Downloaded illustrations are identical to the last sync, skipping sync...');
    return;
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
};

main().then(
  () => console.log('\n✅ Success: Illustration sync completed successfully!'),
  (error: unknown) => {
    console.error(`\n❌ Illustration sync failed, nothing was published.\n`);
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  },
);
