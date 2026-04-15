/**
 * Injects the add-cds7-exports.js build step into every package's
 * project.json build:prod configuration. Run this after syncing from
 * upstream (coinbase/cds) to ensure new packages or reset project.json
 * files include the v7 export injection step.
 *
 * Note: add-cds7-exports.js has a version gate that automatically
 * no-ops for packages beyond the v7 compatibility window (CDS 9+),
 * so it is safe to leave these references in place indefinitely.
 *
 * TODO: Remove this file and the project.json references to
 * add-cds7-exports.js once CDS 8.x is fully end-of-life.
 */
import fs from 'fs';
import { globSync } from 'glob';

const MONOREPO_ROOT = process.env.PROJECT_CWD ?? process.env.NX_MONOREPO_ROOT;

const ignoredPackages = ['eslint-plugin-cds', 'ui-mobile-visreg', 'vscode-plugin', 'mcp-server'];

const projectJsonFilepaths = globSync('packages/*/project.json', { cwd: MONOREPO_ROOT });

for (const projectJsonPath of projectJsonFilepaths) {
  if (ignoredPackages.some((packageName) => projectJsonPath.includes(packageName))) continue;
  console.log('Updating', projectJsonPath);
  const projectJson = JSON.parse(fs.readFileSync(projectJsonPath, 'utf8'));
  const name = projectJson.name.startsWith('ui-') ? projectJson.name : `cds-${projectJson.name}`;
  projectJson.targets.build.configurations.prod.commands.push(
    `node ../../add-cds7-exports.js @cbhq/${name}`,
  );
  fs.writeFileSync(projectJsonPath, JSON.stringify(projectJson, null, 2) + '\n');
}
