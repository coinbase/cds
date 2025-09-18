import depcheck from 'depcheck';
import { globSync } from 'glob';
import fs from 'node:fs';
import path from 'node:path';
import { diffLines } from 'diff';

// See the depcheck docs for info about ignoring files and deps https://www.npmjs.com/package/depcheck
const ignorePatterns = [];
const ignoreMatches = [];

const MONOREPO_ROOT = process.env.PROJECT_CWD;

if (!MONOREPO_ROOT) {
  throw new Error('MONOREPO_ROOT is not set, make sure to run this script with `yarn node`');
}

const isDiffReport = process.env.DEPCHECK_DIFF === 'true';

const RESULTS_BASELINE_FILENAME = 'depcheck-results.md';

const resultsBaselineFilePath = path.resolve(MONOREPO_ROOT, RESULTS_BASELINE_FILENAME);

if (isDiffReport && !fs.existsSync(resultsBaselineFilePath))
  throw Error(
    `No depcheck baseline results ${RESULTS_BASELINE_FILENAME} found at path "${resultsBaselineFilePath}"`,
  );

const rootPackageJsonData = fs.readFileSync(`${MONOREPO_ROOT}/package.json`, 'utf8');

const rootPackageJson = JSON.parse(rootPackageJsonData);

const packageFilepaths = globSync(`${MONOREPO_ROOT}/packages/*`);

const green = (message) => `\x1b[32m${message}\x1b[0m`;
const red = (message) => `\x1b[31m${message}\x1b[0m`;

const results = {};

for (const packageFilepath of packageFilepaths) {
  const packageName = path.basename(packageFilepath);
  results[packageName] = await depcheck(packageFilepath, { ignorePatterns, ignoreMatches });

  if (Object.values(results[packageName].invalidFiles).length > 0) {
    console.error(red(`Invalid files in ${packageName}:`));
    console.error(results[packageName].invalidFiles);
    process.exit(1);
  }

  if (Object.values(results[packageName].invalidDirs).length > 0) {
    console.error(red(`Invalid dirs in ${packageName}:`));
    console.error(results[packageName].invalidDirs);
    process.exit(1);
  }
}

let message = '';

for (const [packageName, result] of Object.entries(results)) {
  message += `\n📌 packages/${packageName}\n`;
  if (result.dependencies.length > 0) {
    message += `\n  Unused dependencies:\n\n    ${result.dependencies.join('\n    ')}\n`;
  }
  if (result.devDependencies.length > 0) {
    message += `\n  Unused devDependencies:\n\n    ${result.devDependencies.join('\n    ')}\n`;
  }
  if (Object.keys(result.missing).length > 0) {
    message += `\n  Missing dependencies:\n`;
    for (const [dependency, usedInFiles] of Object.entries(result.missing)) {
      message += `\n    ${dependency}\n`;
      if (rootPackageJson?.dependencies?.[dependency])
        message += `      Found in root package.json "dependencies"\n`;
      if (rootPackageJson?.devDependencies?.[dependency])
        message += `      Found in root package.json "devDependencies"\n`;
      const relativeUsedInFiles = usedInFiles.map((filepath) =>
        path.relative(MONOREPO_ROOT, filepath),
      );
      message += `      Used in ${usedInFiles.length} files:\n        ${relativeUsedInFiles.join(
        '\n        ',
      )}\n`;
    }
  }
}

// If this isn't a diff report we'll just use the exportStatsMessage for both the baseline and comparison
const baselineResultsMessage = isDiffReport
  ? fs.readFileSync(resultsBaselineFilePath, 'utf-8')
  : message;

const resultsMessageDiff = diffLines(baselineResultsMessage, message);

const BUILDKITE_EXPAND_PREFIX = '+++';

console.log(
  `${process.env.CI === 'true' ? `${BUILDKITE_EXPAND_PREFIX} ` : '\n'}🦍 Depcheck results:\n`,
);

resultsMessageDiff.forEach(({ value, added, removed }, index) => {
  const nextDiff = resultsMessageDiff[index + 1];
  const nextChanged = Boolean(nextDiff?.added || nextDiff?.removed);
  const message = added || nextChanged ? value.slice(0, -1) : value;
  if (added) return console.log(green(message));
  if (removed) return console.log(red(message));
  return console.log(message);
});

console.log('\n');

if (!isDiffReport) {
  if (fs.existsSync(resultsBaselineFilePath)) fs.rmSync(resultsBaselineFilePath);
  fs.writeFileSync(resultsBaselineFilePath, message);
}
