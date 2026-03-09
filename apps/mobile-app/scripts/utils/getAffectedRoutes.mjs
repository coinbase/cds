import { spawnSync } from 'node:child_process';
import path from 'node:path';

import pkg from '../../package.json' with { type: 'json' };

import { routes } from './routes.mjs';

const IGNORE_CHANGED_FILES_REGEX =
  /^((CHANGELOG|README|MIGRATION|CONTRIBUTING)(\.md)?|[^/]+\.yml|OWNERS|project\.json|[^/]+\.[dD]ockerfile|tsconfig\.json|jest\.config\.js|\.?eslint.*)$/;
const DEV_FILES_REGEX = /(\.(spec|test|figma)\.[jt]sx?(\.snap)?$)/;

/**
 * Returns an array of changed filepaths between a branch and another base branch
 */
const getChangedFilesOnBranch = (branch, baseBranch) => {
  const command = `git diff --name-only ${branch} $(git merge-base ${branch} ${baseBranch})`.split(
    ' ',
  );
  const changedFiles = spawnSync(command.shift() ?? '', command, { encoding: 'utf8', shell: true });
  return changedFiles.stdout.split('\n').filter(Boolean);
};

/**
 * Returns an array of workspace dependency package names
 */
const getWorkspaceDependencies = (dependencies) =>
  Object.entries(dependencies)
    .filter(([, version]) => version.startsWith('workspace:'))
    .map(([dependency]) => dependency);

/**
 * Returns a map of workspace dependencies to their directories resolved from tsconfig paths
 */
const getWorkspaceDirectoryMap = (workspaceDependencies, tsconfigPaths) =>
  Object.fromEntries(
    workspaceDependencies.map((dependency) => {
      if (!tsconfigPaths[dependency])
        throw Error(`Missing dependency in tsconfig "paths": ${dependency}`);
      return [
        dependency,
        tsconfigPaths[dependency].map((dependencyPath) => dependencyPath.replace('/*', '')),
      ];
    }),
  );

/**
 * Returns the workspace dependency that maps to the given directory
 */
const getWorkspaceDependencyByDirectory = (workspaceDirectory, workspaceDirectoryMap) =>
  Object.entries(workspaceDirectoryMap).find(([, directories]) =>
    directories.includes(workspaceDirectory),
  )[0];

/**
 * Returns an array of objects with playground route keys and import paths
 */
const getRoutesData = (generatedRoutes) =>
  generatedRoutes.map((route) => ({
    key: route.key,
    importPath: route.getComponent.toString().split("'")[1],
  }));

/**
 * Returns an array of import paths for the changed files
 */
const getImportPathsFromFiles = (files, sourceDirectories, workspaceDirectoryMap) =>
  files.map((file) => {
    const matchingDirectory = sourceDirectories.find((directory) => file.startsWith(directory));
    const workspaceDependency = getWorkspaceDependencyByDirectory(
      matchingDirectory,
      workspaceDirectoryMap,
    );
    const matchingDirectoryPathsLength = matchingDirectory.split('/').length;
    const filePaths = file.split('/');
    const truncatedFilepath = filePaths.slice(0, matchingDirectoryPathsLength + 1).join('/');
    return truncatedFilepath.replace(matchingDirectory, workspaceDependency);
  });

/**
 * Returns true when a changed file should impact mobile visreg.
 */
const isFileVisregRelevant = (file, sourceDirectories) => {
  const matchingDirectory = sourceDirectories.find((directory) => file.startsWith(directory));
  if (!matchingDirectory) {
    return false;
  }

  const relativeFilePath = file.slice(matchingDirectory.length + 1);
  return (
    !DEV_FILES_REGEX.test(relativeFilePath) && !IGNORE_CHANGED_FILES_REGEX.test(relativeFilePath)
  );
};

/**
 * Returns an object with a boolean for whether the common package changed and an array of
 * ui-mobile-playground route keys that were affected by the changed files.
 */
export const getAffectedRoutes = async (log = false) => {
  const baseBranch = process.env.BUILDKITE_PULL_REQUEST_BASE_BRANCH || 'master';
  const changedFiles = getChangedFilesOnBranch('HEAD', baseBranch);
  const workspaceDependencies = getWorkspaceDependencies(pkg.dependencies);

  const MONOREPO_ROOT = process.env.PROJECT_CWD ?? process.env.NX_MONOREPO_ROOT;
  const tsconfigPath = path.resolve(MONOREPO_ROOT, 'tsconfig.base.json');
  const tsconfig = (await import(tsconfigPath, { assert: { type: 'json' } })).default;
  const tsconfigPaths = tsconfig.compilerOptions.paths;

  const workspaceDirectoryMap = getWorkspaceDirectoryMap(workspaceDependencies, tsconfigPaths);
  const sourceDirectories = Object.values(workspaceDirectoryMap).flat();

  const relevantChangedFiles = changedFiles.filter((file) =>
    isFileVisregRelevant(file, sourceDirectories),
  );
  const commonChanged = relevantChangedFiles.some((file) => file.startsWith('packages/common/'));

  const affectedImportPaths = getImportPathsFromFiles(
    relevantChangedFiles,
    sourceDirectories,
    workspaceDirectoryMap,
  );

  const routesData = getRoutesData(routes);

  const affectedRoutesData = routesData.filter((routeData) =>
    affectedImportPaths.some((changedImportPath) =>
      routeData.importPath.startsWith(changedImportPath),
    ),
  );

  const affectedRouteKeys = affectedRoutesData.map((routeData) => routeData.key);

  if (log) {
    console.log('changedFiles', changedFiles);
    console.log('commonChanged', commonChanged);
    console.log('workspaceDependencies', workspaceDependencies);
    console.log('workspaceDirectoryMap', workspaceDirectoryMap);
    console.log('sourceDirectories', sourceDirectories);
    console.log('relevantChangedFiles', relevantChangedFiles);
    console.log('affectedImportPaths', affectedImportPaths);
    console.log('routesData', routesData);
    console.log('affectedRoutesData', affectedRoutesData);
    console.log('affectedRouteKeys', affectedRouteKeys);
  }

  return { commonChanged, affectedRouteKeys };
};
