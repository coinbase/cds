import { execSync, type ExecSyncOptions } from 'node:child_process';
import path from 'node:path';

/**
 * Publishes the illustrations from Figma as a branch ready for a PR:
 *
 *   1. creates `illustrations/YYYY-MM-DD` from the latest `origin/<default branch>`
 *   2. `illustrations:sync-illustrations` — generated assets, manifest, version plan
 *   3. `web:generate-illustration-stories` — the docsite stories built from the new names
 *   4. commits and pushes, or deletes the branch again when nothing changed or a step failed
 *
 * Steps 2 and 3 are independent nx targets and can be run on their own; this script only chains
 * them with the git workflow. Run with `yarn sync-illustrations [--sync-all]`.
 */

const repoRoot = path.resolve(__dirname, '..');
const todaysDate = new Date().toISOString().slice(0, 10);
const branchName = `illustrations/${todaysDate}`;
/** Only date-derived content: illustration names come from Figma and must never reach the shell. */
const commitMessage = `feat: Publish illustrations ${todaysDate}`;

const syncArgs = process.argv.slice(2).filter((arg) => arg === '--sync-all');

const exec = (command: string, options: ExecSyncOptions = {}) =>
  execSync(command, { cwd: repoRoot, encoding: 'utf-8', ...options })
    .toString()
    .trim();

const run = (command: string) => {
  console.log(`\n> ${command}\n`);
  execSync(command, { cwd: repoRoot, stdio: 'inherit' });
};

const fail = (message: string): never => {
  console.error(`\nERROR: ${message}\n`);
  process.exit(1);
};

function resolveDefaultBranch() {
  const remoteBranches = exec('git branch -r');
  if (remoteBranches.includes('origin/master')) return 'master';
  if (remoteBranches.includes('origin/main')) return 'main';
  return fail('Could not find a "master" or "main" branch on origin');
}

/** Requires a clean tree, then creates the release branch from the latest default branch. */
function createBranch() {
  if (exec('git status --short')) fail('The working tree is not clean; commit or stash first');

  console.log('Fetching origin...');
  exec('git fetch origin');
  const defaultBranch = resolveDefaultBranch();

  try {
    exec(`git branch -D ${branchName}`);
  } catch {
    // The branch did not exist yet.
  }
  console.log(`Creating ${branchName} from origin/${defaultBranch}...`);
  exec(`git checkout -b ${branchName} origin/${defaultBranch}`);
  return defaultBranch;
}

/** Safe because the tree was clean before the run: anything here is what the run produced. */
function deleteBranch(defaultBranch: string) {
  exec('git reset --hard');
  exec('git clean -fd');
  exec(`git checkout ${defaultBranch}`);
  exec(`git branch -D ${branchName}`);
}

function main() {
  const defaultBranch = createBranch();

  try {
    run(`yarn nx run illustrations:sync-illustrations ${syncArgs.join(' ')}`.trim());
    run('yarn nx run web:generate-illustration-stories');
  } catch {
    console.log(`\nSync failed, deleting ${branchName}...`);
    deleteBranch(defaultBranch);
    fail('Illustration sync failed');
  }

  exec('git add .');
  if (!exec('git status --short')) {
    console.log('\nNothing changed since the last sync; nothing to publish.');
    deleteBranch(defaultBranch);
    return;
  }

  exec(`git commit -m "${commitMessage}"`);
  exec(`git push origin ${branchName}`);
  console.log(`\n✅ Pushed ${branchName}. Open a PR titled "${commitMessage}".`);
}

main();
