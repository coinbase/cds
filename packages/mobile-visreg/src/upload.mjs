import { execSync } from 'child_process';
import { resolve } from 'path';

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

const { dir = './maestro-test-output/screenshots' } = parseArgs();

if (!process.env.PERCY_TOKEN) {
  console.error('Error: PERCY_TOKEN environment variable is not set');
  console.error('Set it with: export PERCY_TOKEN=app_xxxxxxxxxxxxxxxx');
  process.exit(1);
}

const screenshotDir = resolve(dir);
console.log(`Uploading screenshots from ${screenshotDir} to Percy...`);

execSync(`npx percy upload ${screenshotDir}`, { stdio: 'inherit' });

console.log('\nUpload complete. Visit percy.io to review the build.');
