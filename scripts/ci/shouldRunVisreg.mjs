import { spawnSync } from 'node:child_process';

const IGNORE_CHANGED_FILES_REGEX =
  /^((CHANGELOG|README|MIGRATION|CONTRIBUTING)(\.md)?|[^/]+\.yml|OWNERS|project\.json|[^/]+\.[dD]ockerfile|tsconfig\.json|jest\.config\.js|\.?eslint.*)$/;
const DEV_FILES_REGEX = /(\.(spec|test|figma)\.[jt]sx?(\.snap)?$)/;
const VISREG_RELEVANT_EXTENSION_REGEX = /\.(mjs|cjs|js|jsx|ts|tsx|css|scss|sass|less)$/;

const getChangedFilesOnBranch = (branch, baseBranch) => {
  const command = `git diff --name-only ${branch} $(git merge-base ${branch} ${baseBranch})`.split(
    ' ',
  );
  const result = spawnSync(command.shift() ?? '', command, { encoding: 'utf8', shell: true });
  return result.stdout.split('\n').filter(Boolean);
};

const isFileVisregRelevant = (file, relevantRoots) => {
  const matchingRoot = relevantRoots.find((root) => file.startsWith(`${root}/`));
  if (!matchingRoot) return false;

  const relativeFilePath = file.slice(matchingRoot.length + 1);
  return (
    !DEV_FILES_REGEX.test(relativeFilePath) &&
    !IGNORE_CHANGED_FILES_REGEX.test(relativeFilePath) &&
    VISREG_RELEVANT_EXTENSION_REGEX.test(relativeFilePath)
  );
};

export const shouldRunVisreg = (relevantRoots) => {
  const baseBranch = process.env.BASE_BRANCH ?? 'master';
  const changedFiles = getChangedFilesOnBranch('HEAD', baseBranch);
  return changedFiles.some((file) => isFileVisregRelevant(file, relevantRoots));
};
