import { spawnSync } from 'node:child_process';

const WEB_PACKAGES = ['common', 'web', 'web-visualization', 'icons', 'illustrations'];
const RELEVANT_ROOTS = [
  'apps/storybook',
  ...WEB_PACKAGES.map((packageName) => `packages/${packageName}`),
];

const IGNORE_CHANGED_FILES_REGEX =
  /^((CHANGELOG|README|MIGRATION|CONTRIBUTING)(\.md)?|[^/]+\.yml|OWNERS|project\.json|[^/]+\.[dD]ockerfile|tsconfig\.json|jest\.config\.js|\.?eslint.*)$/;
const DEV_FILES_REGEX = /(\.(spec|test|figma)\.[jt]sx?(\.snap)?$)/;
const VISREG_RELEVANT_EXTENSION_REGEX = /\.(mjs|cjs|js|jsx|ts|tsx|css|scss|sass|less)$/;

const getChangedFilesOnBranch = (branch, baseBranch) => {
  const command = `git diff --name-only ${branch} $(git merge-base ${branch} ${baseBranch})`.split(
    ' ',
  );
  const changedFiles = spawnSync(command.shift() ?? '', command, { encoding: 'utf8', shell: true });
  return changedFiles.stdout.split('\n').filter(Boolean);
};

const isFileVisregRelevant = (file) => {
  const matchingRoot = RELEVANT_ROOTS.find((root) => file.startsWith(`${root}/`));
  if (!matchingRoot) {
    return false;
  }

  const relativeFilePath = file.slice(matchingRoot.length + 1);
  const isDevFile = DEV_FILES_REGEX.test(relativeFilePath);
  const isIgnoredMetadataFile = IGNORE_CHANGED_FILES_REGEX.test(relativeFilePath);
  const hasRelevantExtension = VISREG_RELEVANT_EXTENSION_REGEX.test(relativeFilePath);

  return !isDevFile && !isIgnoredMetadataFile && hasRelevantExtension;
};

const checkIfVisregRelevantFilesHaveChanged = async () => {
  const baseBranch = process.env.BUILDKITE_PULL_REQUEST_BASE_BRANCH || 'master';
  const changedFiles = getChangedFilesOnBranch('HEAD', baseBranch);
  return changedFiles.some((file) => isFileVisregRelevant(file));
};

const hasRelevantFilesChanged = await checkIfVisregRelevantFilesHaveChanged();

if (!hasRelevantFilesChanged) process.exit(1);

process.exit(0);
