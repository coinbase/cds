import fs from 'node:fs';

import {
  commitTitle,
  renderCompareUrl,
  renderRejections,
  renderSummary,
  renderVersionPlan,
} from './renderSyncReport';
import type { SyncReport } from './syncReport';

/**
 * Prints one rendering of the sync report for the workflow. Run it with `tsx`:
 *
 *   renderSyncReportCli.ts <version-plan|commit-title|compare-url|rejections|summary-slack>
 *     <report.json> [--option value]...
 *
 * A missing report is allowed for `summary-slack`, which then describes a sync that crashed.
 */
const [command, reportPath, ...rest] = process.argv.slice(2);

const option = (name: string) => {
  const index = rest.indexOf(`--${name}`);
  return index >= 0 ? rest[index + 1] : undefined;
};
const required = (name: string) => {
  const value = option(name);
  if (value === undefined) {
    console.error(`Missing --${name}`);
    process.exit(1);
  }
  return value;
};

const report =
  reportPath && fs.existsSync(reportPath)
    ? (JSON.parse(fs.readFileSync(reportPath, 'utf-8')) as SyncReport)
    : undefined;

if (command === 'summary-slack') {
  const logFile = option('log-file');
  console.log(
    JSON.stringify(
      renderSummary(report, {
        target: required('target'),
        jobStatus: option('job-status'),
        syncOutcome: option('sync-outcome'),
        skipped: option('skipped') === 'true',
        pushed: option('pushed') === 'true',
        branch: option('branch'),
        compareUrl: option('compare-url'),
        openPullRequestUrl: option('open-pull-request-url'),
        failedStep: option('failed-step'),
        failureLog:
          logFile && fs.existsSync(logFile) ? fs.readFileSync(logFile, 'utf-8') : undefined,
        runUrl: option('run-url'),
      }),
    ),
  );
} else if (report && command === 'version-plan') {
  process.stdout.write(renderVersionPlan(report, required('date')));
} else if (report && command === 'commit-title') {
  console.log(commitTitle(report, required('date')));
} else if (report && command === 'compare-url') {
  console.log(
    renderCompareUrl(report, {
      serverUrl: required('server-url'),
      repository: required('repository'),
      branch: required('branch'),
      title: required('title'),
    }),
  );
} else if (report && command === 'rejections') {
  console.log(renderRejections(report));
} else {
  console.error(
    'Usage: renderSyncReportCli.ts <version-plan|commit-title|compare-url|rejections|summary-slack> <report.json> [--option value]...',
  );
  process.exit(1);
}
