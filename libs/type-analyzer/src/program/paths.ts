import fs from 'node:fs';
import path from 'node:path';

function isFile(filePath: string): boolean {
  try {
    return fs.statSync(filePath).isFile();
  } catch {
    return false;
  }
}

function isDirectory(filePath: string): boolean {
  try {
    return fs.statSync(filePath).isDirectory();
  } catch {
    return false;
  }
}

export function findWorkspaceRoot(startPath: string): string {
  let current = isDirectory(startPath) ? startPath : path.dirname(startPath);

  while (true) {
    if (isFile(path.join(current, 'nx.json')) && isFile(path.join(current, 'package.json'))) {
      return current;
    }

    const parent = path.dirname(current);
    if (parent === current) {
      return startPath;
    }
    current = parent;
  }
}

export function resolveInputPath(inputPath: string, cwd = process.cwd()): string {
  if (path.isAbsolute(inputPath)) {
    return path.normalize(inputPath);
  }

  const cwdResolved = path.resolve(cwd, inputPath);
  if (fs.existsSync(cwdResolved)) {
    return cwdResolved;
  }

  const workspaceRoot = findWorkspaceRoot(cwd);
  return path.resolve(workspaceRoot, inputPath);
}

export function findNearestTsconfig(filePath: string): string | undefined {
  let current = path.dirname(filePath);

  while (true) {
    const candidate = path.join(current, 'tsconfig.json');
    if (isFile(candidate)) {
      return candidate;
    }

    const parent = path.dirname(current);
    if (parent === current) {
      return undefined;
    }
    current = parent;
  }
}

export function resolveTsconfigPath({
  filePath,
  tsconfigPath,
  cwd = process.cwd(),
}: {
  filePath: string;
  tsconfigPath?: string;
  cwd?: string;
}): string {
  if (tsconfigPath) {
    return resolveInputPath(tsconfigPath, cwd);
  }

  const nearestTsconfig = findNearestTsconfig(filePath);
  if (nearestTsconfig) {
    return nearestTsconfig;
  }

  const workspaceRoot = findWorkspaceRoot(filePath);
  const rootTsconfig = path.join(workspaceRoot, 'tsconfig.json');
  if (isFile(rootTsconfig)) {
    return rootTsconfig;
  }

  throw new Error(`Could not find a tsconfig.json for ${filePath}`);
}
