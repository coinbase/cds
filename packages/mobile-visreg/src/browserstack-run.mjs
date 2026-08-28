/**
 * Runs the mobile-visreg Maestro suite on BrowserStack App Automate.
 *
 * Uploads the app + zipped flows to BrowserStack, triggers a Maestro build on a
 * real device, waits for it to finish, and downloads the captured screenshots
 * into `maestro-test-output/screenshots/` — the same directory `upload.mjs`
 * reads — so the Percy upload step is unchanged.
 *
 * Usage:
 *   node src/browserstack-run.mjs \
 *     --platform ios \
 *     --appPath ../../apps/expo-app/prebuilds/ios-release-device/expoapp.ipa \
 *     --devices "iPhone 16-18" \
 *     --appId com.anonymous.expo-app \
 *     --scheme expoapp \
 *     --platform-suffix _ios
 *
 * Requires BROWSERSTACK_USERNAME and BROWSERSTACK_ACCESS_KEY in the environment.
 */
import { execFileSync } from 'node:child_process';
import { cpSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  downloadScreenshots,
  pollBuild,
  triggerBuild,
  uploadApp,
  uploadTestSuite,
} from './browserstack.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const packageRoot = resolve(__dirname, '..');

function parseArgs() {
  const args = process.argv.slice(2);
  const result = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith('--')) {
      result[args[i].slice(2)] = args[i + 1];
      i++;
    }
  }
  return result;
}

const parsed = parseArgs();
const { platform = 'ios', appPath, devices, appId, scheme, project = 'CDS Mobile Visreg' } = parsed;
const platformSuffix = parsed['platform-suffix'] ?? '';

const required = { appPath, devices, appId, scheme };
for (const [name, value] of Object.entries(required)) {
  if (!value) {
    console.error(`Error: --${name} is required`);
    process.exit(1);
  }
}

const deviceList = devices
  .split(',')
  .map((d) => d.trim())
  .filter(Boolean);
const resolvedAppPath = resolve(packageRoot, appPath);

const fmt = (ms) =>
  `${Math.floor(ms / 60000)}m${String(Math.round((ms % 60000) / 1000)).padStart(2, '0')}s`;

async function main() {
  // 1. Generate the combined capture-all.yaml flow.
  console.log('Generating capture-all.yaml...');
  execFileSync('node', ['src/generate-flows.mjs'], {
    cwd: packageRoot,
    stdio: 'inherit',
  });

  // 2. Zip the flows into a single parent folder (BrowserStack requirement).
  const stageRoot = resolve(packageRoot, 'maestro-test-output', 'suite');
  const parentDir = resolve(stageRoot, 'maestro-flows');
  const zipPath = resolve(stageRoot, 'flows.zip');
  rmSync(stageRoot, { recursive: true, force: true });
  mkdirSync(parentDir, { recursive: true });
  cpSync(resolve(packageRoot, 'flows'), parentDir, { recursive: true });
  // -r recurse, -q quiet; produces flows.zip containing maestro-flows/*.yaml
  execFileSync('zip', ['-qr', zipPath, 'maestro-flows'], { cwd: stageRoot, stdio: 'inherit' });

  // 3. Upload app + test suite.
  const appUrl = await uploadApp(resolvedAppPath, `cds-${platform}-release`);
  const testSuiteUrl = await uploadTestSuite(zipPath, 'cds-maestro-flows');

  // 4. Trigger the build. Env vars mirror the --env flags run.mjs passes locally.
  const buildId = await triggerBuild(platform, {
    app: appUrl,
    testSuite: testSuiteUrl,
    devices: deviceList,
    project,
    // Paths in `execute` are relative to the single parent folder (maestro-flows).
    execute: ['capture-all.yaml'],
    setEnvVariables: {
      APP_ID: appId,
      SCHEME: scheme,
      PLATFORM_SUFFIX: platformSuffix,
    },
  });

  // 5. Wait for completion. The dashboard URL is printed before the wait, not
  //    just on success, so a run that dies mid-poll still leaves behind
  //    everything needed to inspect or recover it.
  const dashboardUrl = `https://app-automate.browserstack.com/dashboard/v2/builds/${buildId}`;
  console.log(`\nDashboard: ${dashboardUrl}`);
  console.log('Waiting for build to complete...');

  let build;
  try {
    build = await pollBuild(buildId);
  } catch (err) {
    console.error(`\n${err.message}`);
    console.error(
      `\nScreenshots may still be recoverable once the build settles:\n` +
        `  yarn nx run mobile-visreg:recover-screenshots --args="--buildId ${buildId}"`,
    );
    process.exit(1);
  }

  // 6. Download screenshots into the dir upload.mjs reads (always, even on
  //    failure, so partial results still reach Percy).
  const screenshotDir = resolve(packageRoot, 'maestro-test-output', 'screenshots');
  console.log(`\nDownloading screenshots to ${screenshotDir}...`);
  const downloadStartedAt = Date.now();
  const artifactCount = await downloadScreenshots(build, screenshotDir);
  const downloadMs = Date.now() - downloadStartedAt;
  const pngCount = readdirSync(screenshotDir).filter((f) => f.endsWith('.png')).length;
  console.log(
    `Downloaded ${artifactCount} screenshot artifact(s); ${pngCount} PNG(s) now in ${screenshotDir}`,
  );

  // 7. Report and set exit status from the build result. The timing breakdown
  //    is printed on every run so the CI log alone shows whether a slow run was
  //    spent queueing or executing.
  console.log(`\nBuild status: ${build.status}`);
  console.log(
    `Timing: queued ${fmt(build.timing.queuedMs)}, ran ${fmt(build.timing.ranMs)}, ` +
      `downloaded ${fmt(downloadMs)} (total ${fmt(build.timing.totalMs + downloadMs)})`,
  );
  console.log(`Dashboard: ${dashboardUrl}`);

  if (build.status !== 'passed') {
    console.error(`\nBuild did not pass (status: ${build.status}).`);
    process.exit(1);
  }
  if (pngCount === 0) {
    console.error('\nNo screenshots were downloaded — check the flow output on BrowserStack.');
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err.message ?? err);
  process.exit(1);
});
