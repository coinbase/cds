import fs from 'node:fs';
import { spawnSync } from 'node:child_process';

import { getChangedFiles } from './getChangedFiles.mjs';
import { getCurrentCIBranch } from './getCurrentCIBranch.mjs';
import { logInfo as logInfoBase, logSuccess } from './logging.mjs';
import { getAffectedPackages } from './getAffectedPackages.mjs';

const TEMPLATE_TOKEN = '<!-- template-start -->';

function hasUnversionedTemplateContent(changelogPath) {
  if (!fs.existsSync(changelogPath)) return false;
  const content = fs.readFileSync(changelogPath, 'utf8');

  const templateIndex = content.indexOf(TEMPLATE_TOKEN);
  if (templateIndex === -1) return false;

  const afterTemplate = content.slice(templateIndex + TEMPLATE_TOKEN.length);
  const nextSectionMatch = afterTemplate.match(/\n## /);
  const templateContent = nextSectionMatch
    ? afterTemplate.slice(0, nextSectionMatch.index)
    : afterTemplate;

  return templateContent.trim().length > 0;
}

function getPendingChangedFiles() {
  const result = spawnSync('git', ['--no-pager', 'diff', '--name-only', '--relative', 'HEAD'], {
    encoding: 'utf-8',
  });

  if (result.status !== 0) {
    return [];
  }

  return result.stdout.trim().split('\n').filter(Boolean);
}

export async function projectsNeedingVersion(logInfo, options = {}) {
  if (getCurrentCIBranch() === 'master') {
    logInfo('Skipping version check on master branch');
    return [];
  }

  logInfo('Checking for packages that need versioning');

  const changedFiles = await getChangedFiles(false);
  const pendingChangedFiles = getPendingChangedFiles();
  const changedPackages = await getAffectedPackages({
    ...options,
    onlyPublishable: true,
    changedFiles,
  });
  const pendingChangedPackages = pendingChangedFiles.length
    ? await getAffectedPackages({
        ...options,
        onlyPublishable: true,
        changedFiles: pendingChangedFiles,
      })
    : {};

  if (Object.keys(changedPackages).length === 0) {
    logSuccess('No changes within packages');
    return [];
  }

  const unversionedPackages = Object.keys(changedPackages).filter((projectName) => {
    const projectRoot = changedPackages[projectName].data.root;
    const changelogPath = `${projectRoot}/CHANGELOG.md`;
    const changelogChanged = changedFiles.includes(changelogPath);

    if (!changelogChanged) {
      return true;
    }

    if (hasUnversionedTemplateContent(changelogPath)) {
      return true;
    }

    // Prerelease branches can already differ from master because package.json and CHANGELOG.md
    // were updated for the last RC. If the user now has local source changes and has not
    // touched the changelog for them yet, the package still needs a new version entry.
    return (
      Boolean(pendingChangedPackages[projectName]) && !pendingChangedFiles.includes(changelogPath)
    );
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
