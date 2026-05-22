import { execSync, type ExecSyncOptions } from 'node:child_process';
import path from 'node:path';

export const todaysDate = new Date().toISOString().slice(0, 10);
const targetBranchName = `icons/${todaysDate}`;

const createExec = (dirname: string) => {
  return (command: string, options: ExecSyncOptions = {}) =>
    execSync(command, { cwd: dirname, encoding: 'utf-8', ...options })
      .toString()
      .trim();
};

const error = (message: string, ...args: unknown[]) => {
  console.error('\nERROR:', message, ...args);
  console.log('');
  process.exit(1);
};

/**
 * Resolves the default remote branch name (master or main) by checking which
 * one exists on origin.
 */
const resolveDefaultBranch = (exec: ReturnType<typeof createExec>, repoName: string): string => {
  const remoteBranches = exec('git branch -r');
  if (remoteBranches.includes('origin/master')) return 'master';
  if (remoteBranches.includes('origin/main')) return 'main';
  error(`Could not find "master" or "main" branch on origin for the "${repoName}" repo`);
  throw new Error('unreachable');
};

/**
 * Validates that the repo has a clean working tree, then creates a new
 * `icons/YYYY-MM-DD` branch from the latest `origin/<defaultBranch>`.
 * The caller does not need to be on master/main first.
 */
export const ensureCleanBranch = (dirname: string) => {
  const repoName = path.basename(dirname);
  const exec = createExec(dirname);

  console.log(`Checking the status of the "${repoName}" repo...`);
  const gitStatus = exec('git status --short');
  if (gitStatus.length > 0) error(`The "${repoName}" repo is not clean`);

  console.log(`Checking the diff of the "${repoName}" repo...`);
  const gitDiff = exec('git diff --exit-code');
  if (gitDiff.length > 0) error(`The "${repoName}" repo has changes`);

  try {
    console.log(`Checking the "origin" remote for the "${repoName}" repo...`);
    exec('git remote show origin');
  } catch (err) {
    error(`There was an error checking the "origin" remote for the "${repoName}" repo:`, err);
  }

  try {
    console.log(`Fetching the "origin" remote for the "${repoName}" repo...`);
    exec('git fetch origin');
  } catch (err) {
    error(`There was an error fetching the "origin" remote for the "${repoName}" repo:`, err);
  }

  const defaultBranch = resolveDefaultBranch(exec, repoName);
  console.log(`Using "${defaultBranch}" as the default branch for the "${repoName}" repo...`);

  // Create the target branch from the latest origin/<defaultBranch>
  try {
    console.log(`Attempting to delete branch ${targetBranchName}...`);
    exec(`git branch -D ${targetBranchName}`);
  } catch {
    // Branch may not exist, that's ok
  }
  console.log(`Creating new branch ${targetBranchName} from origin/${defaultBranch}...`);
  exec(`git checkout -b ${targetBranchName} origin/${defaultBranch}`);
  return { branchName: targetBranchName, defaultBranch };
};

export const commitAndPushChanges = (dirname: string, commitMessage: string) => {
  const exec = createExec(dirname);
  exec('git add .');
  const status = exec('git status --short');
  if (!status) {
    console.log('No changes to commit, skipping push.');
    return;
  }
  exec(`git commit -m "${commitMessage}"`);
  exec(`git push origin ${targetBranchName}`);
};
