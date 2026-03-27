import { execSync } from 'child_process';
import { mkdirSync, readdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

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
const { appId, scheme, output = './visreg-screenshots', route, platform = 'ios' } = parsed;
const platformSuffix = parsed['platform-suffix'] ?? '';

if (!appId) {
  console.error('Error: --appId is required');
  process.exit(1);
}
if (!scheme) {
  console.error('Error: --scheme is required');
  process.exit(1);
}

const outputDir = resolve(output);
mkdirSync(outputDir, { recursive: true });

let flowPath;
if (route) {
  flowPath = resolve(packageRoot, 'flows/capture-route.yaml');
  console.log(`Running single-route capture: ${route}`);
} else {
  console.log('Generating capture-all.yaml...');
  execSync(`node src/generate-flows.mjs ${platform}`, { cwd: packageRoot, stdio: 'inherit' });
  flowPath = resolve(packageRoot, 'flows/capture-all.yaml');
  console.log('Running full visreg capture...');
}

const envFlags = [`APP_ID=${appId}`, `SCHEME=${scheme}`, `PLATFORM_SUFFIX=${platformSuffix}`];
if (route) {
  envFlags.push(`ROUTE_NAME=${route}`);
}

const cmd = ['maestro', 'test', flowPath, ...envFlags.map((e) => `--env ${e}`)].join(' ');

console.log(`\nRunning: ${cmd}\n`);
execSync(cmd, { stdio: 'inherit', cwd: outputDir });

const screenshots = readdirSync(outputDir).filter((f) => f.endsWith('.png'));
console.log(`\nCapture complete: ${screenshots.length} screenshots in ${outputDir}`);
