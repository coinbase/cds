import { spawnSync } from 'node:child_process';

const WEB_PACKAGES = ['common', 'web', 'web-visualization', 'icons', 'illustrations'];

const getChangedFilesOnBranch = (branch, baseBranch) => {
  const command = `git diff --name-only ${branch} $(git merge-base ${branch} ${baseBranch})`.split(
    ' ',
  );
  const changedFiles = spawnSync(command.shift() ?? '', command, { encoding: 'utf8', shell: true });
  return changedFiles.stdout.split('\n').filter(Boolean);
};

const checkIfPackagesHaveChanged = async () => {
  const baseBranch = process.env.BUILDKITE_PULL_REQUEST_BASE_BRANCH || 'master';
  const changedFiles = getChangedFilesOnBranch('HEAD', baseBranch);
  return changedFiles.some((file) => {
    return WEB_PACKAGES.some((packageName) => file.includes(`packages/${packageName}/`));
  });
};

const checkIfStorybookHasChanged = async () => {
  const baseBranch = process.env.BUILDKITE_PULL_REQUEST_BASE_BRANCH || 'master';
  const changedFiles = getChangedFilesOnBranch('HEAD', baseBranch);
  return changedFiles.some((file) => file.includes('apps/storybook/'));
};

const havePackagesChanged = await checkIfPackagesHaveChanged();
const hasStorybookChanged = await checkIfStorybookHasChanged();

if (!havePackagesChanged && !hasStorybookChanged) process.exit(1);

process.exit(0);
