import { CodeConnectSink } from './sinks/CodeConnectSink';
import { ExpoSvgMapSink } from './sinks/ExpoSvgMapSink';
import { IconDataSink } from './sinks/IconDataSink';
import { IconFontSink } from './sinks/IconFontSink';
import { SvgFilesSink } from './sinks/SvgFilesSink';
import { config } from './config';
import { buildSyncReport, logRejections, logSummary, writeReport } from './report';
import { runSync } from './sync';

const args = process.argv.slice(2);
const fullCompare = config.fullCompare || args.includes('--full-compare');

const main = async () => {
  const { results, rejected, examined } = await runSync({
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

  logSummary(results);
  writeReport(buildSyncReport({ results, rejected, examined }), {
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
