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
