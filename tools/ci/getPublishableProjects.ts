import fs from 'node:fs';
import { createProjectGraphAsync } from '@nx/devkit';
import { logError } from './logging';

export async function getPublishableProjects() {
  try {
    const graph = await createProjectGraphAsync();
    const workspace = graph.nodes;

    const filtered = Object.entries(workspace).filter(([, projectConfig]) => {
      const packageJsonPath = `${projectConfig.data.root}/package.json`;
      return !JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8')).private;
    });

    return Object.fromEntries(filtered);
  } catch (error) {
    logError(`Error getting publishable projects: ${error}`);
    process.exit(1);
  }
}
