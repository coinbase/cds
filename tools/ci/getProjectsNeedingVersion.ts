import { getChangedFiles } from './getChangedFiles';
import { getCurrentCIBranch } from './getCurrentCIBranch';
import { logInfo as logInfoBase, logSuccess } from './logging';
import { getAffectedPackages, PackageVersionCheckOptions } from './getAffectedPackages';

export async function projectsNeedingVersion(
  logInfo: typeof logInfoBase,
  options: Partial<PackageVersionCheckOptions> = {},
) {
  if (getCurrentCIBranch() === 'master') {
    logInfo('Skipping version check on master branch');
    return [];
  }

  logInfo('Checking for packages that need versioning');

  const changedFiles = await getChangedFiles(false);
  const changedPackages = await getAffectedPackages({
    ...options,
    onlyPublishable: true,
    changedFiles,
  });

  if (Object.keys(changedPackages).length === 0) {
    logSuccess('No changes within packages');
    return [];
  }

  const unversionedPackages = Object.keys(changedPackages).filter((projectName) => {
    const changelogPath = `${changedPackages[projectName].data.root}/CHANGELOG.md`;
    // Already bumped!
    return !changedFiles.includes(changelogPath);
  });

  if (unversionedPackages.length > 0) {
    logInfo(
      `Found ${
        unversionedPackages.length
      } package(s) that need versioning: ${unversionedPackages.join(', ')}`,
    );
  }

  return unversionedPackages;
}
