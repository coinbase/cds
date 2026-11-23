import { changedBetween, trySnapshotChanges, unexplainedFiles } from '@cds/figma-api/changedFiles';

import { CodeConnectSink } from './sinks/CodeConnectSink';
import { ExpoSvgMapSink } from './sinks/ExpoSvgMapSink';
import { IconDataSink } from './sinks/IconDataSink';
import { IconFontSink } from './sinks/IconFontSink';
import { SvgFilesSink } from './sinks/SvgFilesSink';
import { config } from './config';
import { explainIconFile, generatedPaths } from './explainFile';
import { buildSyncReport, logRejections, logSummary, writeReport } from './report';
import { runSync } from './sync';

const args = process.argv.slice(2);
const fullCompare = config.fullCompare || args.includes('--full-compare');

/** The files git sees as changed in the generated paths; a warning and none when git cannot say. */
const snapshot = () => trySnapshotChanges(config.repoRoot, generatedPaths);

const main = async () => {
  const before = snapshot();
  const { results, rejected, ledger, seen } = await runSync({
    config,
    fullCompare,
    sinks: [
      new SvgFilesSink(),
      new IconFontSink(),
      new IconDataSink(),
      new CodeConnectSink(),
      new ExpoSvgMapSink(),
    ],
  });

  const after = before && snapshot();
  const unexplained =
    before && after
      ? unexplainedFiles({
          changed: changedBetween(before, after),
          ledger,
          explain: explainIconFile,
        })
      : [];
  if (unexplained.length > 0) {
    console.warn(`\n⚠️ ${unexplained.length} changed file(s) have no entry in the report:`);
    for (const file of unexplained) console.warn(`  ${file}`);
  }

  logSummary(results);
  writeReport(buildSyncReport({ ledger, seen, unexplainedFiles: unexplained }), {
    repoRoot: config.repoRoot,
    reportPath: process.env.SYNC_REPORT_PATH,
  });
  logRejections(rejected);
};

process.on('exit', (code) => {
  if (code !== 0) return console.log('\n❌ Error: Something went wrong with the icon sync');
  console.log('\n✅ Success: Icon sync completed successfully!');
});

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
