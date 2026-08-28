import { access, readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const workspaceRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

async function exists(filePath) {
  return access(filePath)
    .then(() => true)
    .catch(() => false);
}

async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, 'utf8'));
}

async function getWorkspaceDirectories() {
  const rootPackage = await readJson(path.join(workspaceRoot, 'package.json'));
  const directories = [];

  for (const workspacePattern of rootPackage.workspaces) {
    if (workspacePattern.endsWith('/*')) {
      const parent = workspacePattern.slice(0, -2);
      const parentPath = path.join(workspaceRoot, parent);

      if (!(await exists(parentPath))) {
        continue;
      }

      const entries = await readdir(parentPath, { withFileTypes: true });

      directories.push(
        ...entries
          .filter((entry) => entry.isDirectory())
          .map((entry) => path.join(parentPath, entry.name)),
      );
    } else {
      directories.push(path.join(workspaceRoot, workspacePattern));
    }
  }

  return directories;
}

async function readProject(directory) {
  const projectJsonPath = path.join(directory, 'project.json');
  const packageJsonPath = path.join(directory, 'package.json');
  const hasProjectJson = await exists(projectJsonPath);
  const hasPackageJson = await exists(packageJsonPath);

  if (!hasProjectJson && !hasPackageJson) {
    return null;
  }

  const projectJson = hasProjectJson ? await readJson(projectJsonPath) : {};
  const packageJson = hasPackageJson ? await readJson(packageJsonPath) : {};
  const tags = [...(projectJson.tags ?? []), ...(packageJson.nx?.tags ?? [])];

  return {
    name: projectJson.name ?? packageJson.name ?? path.basename(directory),
    root: path.relative(workspaceRoot, directory),
    tags: [...new Set(tags)],
    targets: projectJson.targets ?? packageJson.nx?.targets ?? {},
  };
}

export async function readWorkspaceProjects() {
  return (await Promise.all((await getWorkspaceDirectories()).map(readProject))).filter(Boolean);
}
