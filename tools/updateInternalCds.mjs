/**
 * ONE-TIME SETUP TOOL (historical)
 *
 * This script was used to inject the add-cds7-exports.js build step into
 * every package's project.json build:prod configuration. It only needed to
 * run once when CDS 8 introduced v7 backward-compatibility exports.
 *
 * The add-cds7-exports.js script has its own version gate and will
 * automatically no-op for packages beyond the v7 compatibility window.
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
