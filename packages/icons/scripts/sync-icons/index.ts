import { changedBetween, snapshotFiles, unexplainedFiles } from '@cds/figma-api/changedFiles';

import { createConfig } from './config';
import { explainIconFile } from './explainFile';
import { profile } from './profile';
import { buildSyncReport, logRejections, logSummary, writeReport } from './report';
import { runSync } from './sync';

const repoRoot = process.env.PROJECT_CWD ?? process.env.NX_MONOREPO_ROOT;
if (!repoRoot) throw Error('MONOREPO_ROOT is undefined');

const config = createConfig(repoRoot);
const args = process.argv.slice(2);
const fullCompare = config.fullCompare || args.includes('--full-compare');

/** Every file the sync can write, with a hash of its content, to find what a run changed. */
const snapshot = () => snapshotFiles(config.repoRoot, profile.generated.paths);

const main = async () => {
  const before = snapshot();
  const outcome = await runSync({ config, sinks: config.sinks, fullCompare });

  const unexplained = unexplainedFiles({
    changed: changedBetween(before, snapshot()),
    changes: outcome.changes,
    refreshed: outcome.refreshed,
    explain: explainIconFile,
  });
  if (unexplained.length > 0) {
    console.warn(`\n⚠️ ${unexplained.length} changed file(s) have no entry in the report:`);
    for (const file of unexplained) console.warn(`  ${file}`);
  }

  logSummary(outcome.changes);
  logRejections(outcome.rejected);
  writeReport(
    buildSyncReport(outcome, { figmaFileId: config.figmaFileId, unexplainedFiles: unexplained }),
    {
      repoRoot: config.repoRoot,
      reportPath: process.env.SYNC_REPORT_PATH,
    },
  );
};

process.on('exit', (code) => {
  if (code !== 0) return console.log('\n❌ Error: Something went wrong with the icon sync');
  console.log('\n✅ Success: Icon sync completed successfully!');
});

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
