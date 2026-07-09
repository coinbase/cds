/**
 * Downloads screenshots from an existing BrowserStack build into the standard
 * output directory so `upload.mjs` can upload them to Percy.
 *
 * Usage:
 *   node src/recover-screenshots.mjs --buildId <build_id>
 *
 * If --buildId is omitted, lists the 5 most recent builds so you can pick one.
 *
 * Requires BROWSERSTACK_USERNAME and BROWSERSTACK_ACCESS_KEY in the environment.
 */
import { readdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { downloadScreenshots, getBuild, listRecentBuilds } from './browserstack.mjs';

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

async function main() {
  const { buildId } = parseArgs();

  if (!buildId) {
    console.log('No --buildId provided. Recent builds:\n');
    const builds = await listRecentBuilds();
    const list = Array.isArray(builds) ? builds : (builds.builds ?? []);
    for (const b of list) {
      console.log(`  ${b.id}  status=${b.status}  started=${b.start_time ?? 'unknown'}`);
    }
    console.log('\nRe-run with: node src/recover-screenshots.mjs --buildId <id>');
    return;
  }

  console.log(`Fetching build ${buildId}...`);
  const build = await getBuild(buildId);
  console.log(`  status: ${build.status}`);

  const screenshotDir = resolve(packageRoot, 'maestro-test-output', 'screenshots');
  console.log(`\nDownloading screenshots to ${screenshotDir}...`);
  const artifactCount = await downloadScreenshots(build, screenshotDir);
  const pngCount = readdirSync(screenshotDir).filter((f) => f.endsWith('.png')).length;
  console.log(`Downloaded ${artifactCount} artifact(s); ${pngCount} PNG(s) in ${screenshotDir}`);

  if (pngCount > 0) {
    console.log('\nNext step: upload to Percy');
    console.log('  export PERCY_TOKEN=app_xxxxxxxxxxxxxxxx');
    console.log('  yarn nx run mobile-visreg:upload');
  }
}

main().catch((err) => {
  console.error(err.message ?? err);
  process.exit(1);
});
