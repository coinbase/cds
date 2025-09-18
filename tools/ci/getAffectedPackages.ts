import { getChangedFiles } from './getChangedFiles';
import { getCurrentCIBranch } from './getCurrentCIBranch';
import { getPublishableProjects } from './getPublishableProjects';

// WARNING: This list is not comprehensive and may be missing configuration files
const BUMP_REGEX =
  /\/(android|assets|ios|src|templates|package\.json|linaria\.config\.js|babel\.config\.js)/;

// NOTE: project.json technically may have changes to the build artifacts, but unrelated configuration changes are more common
const IGNORE_CHANGED_FILES_REGEX =
  /^((CHANGELOG|README|MIGRATION|CONTRIBUTING)(\.md)?|[^/]+\.yml|OWNERS|project\.json|[^/]+\.[dD]ockerfile|tsconfig\.json|jest\.config\.js|\.?eslint.*)$/;

const TEST_REGEX = /(\.(spec|test)\.[jt]sx?(\.snap)?$|__stories__)/;

export type PackageVersionCheckOptions = {
  projectsWithNoSrcFolder: string[];
  exclude: string[];
  onlyPublishable: boolean;
  changedFiles?: string[];
};

export async function getAffectedPackages(options: Partial<PackageVersionCheckOptions> = {}) {
  if (getCurrentCIBranch() === 'master') {
    return {};
  }

  const projectsWithNoSrcFolder: string[] = options.projectsWithNoSrcFolder ?? [];
  const excludedProjects: string[] = options.exclude ?? [];

  const [changedFiles, projects] = await Promise.all([
    options.changedFiles ?? getChangedFiles(false),
    getPublishableProjects(),
  ]);

  // Filter projects down to only those that have changed:
  return Object.fromEntries(
    Object.entries(projects).filter(([project, projectConfig]) => {
      // Ignore excluded projects
      if (excludedProjects.includes(project)) {
        return false;
      }

      return changedFiles.some((file) => {
        // Ignore unrelated code changes and test files
        if (!file.startsWith(`${projectConfig.data.root}/`) || TEST_REGEX.test(file)) {
          return false;
        }

        // Specific list of patterns to check
        if (BUMP_REGEX.test(file)) {
          return true;
        }

        // If the package has no src/ folder, filter out non-src code changes
        if (projectsWithNoSrcFolder.includes(project)) {
          const relativeFilePath = file.substr(projectConfig.data.root.length + 1);
          if (!IGNORE_CHANGED_FILES_REGEX.test(relativeFilePath)) {
            return true;
          }
        }
        return false;
      });
    }),
  );
}
