import { execSync, type ExecSyncOptions } from 'node:child_process';

/**
 * The git side of a release: a fresh `illustrations/YYYY-MM-DD` branch from the default branch,
 * committed and pushed when the sync changed something, deleted again when it did not or failed.
 * Only the shell (`index.ts`) uses this; the engine never touches git.
 */
export class ReleaseBranch {
  private readonly repoRoot: string;
  private readonly branchName: string;
  private defaultBranch = '';

  constructor(repoRoot: string, date: string) {
    this.repoRoot = repoRoot;
    this.branchName = `illustrations/${date}`;
  }

  private exec(command: string, options: ExecSyncOptions = {}) {
    return execSync(command, { cwd: this.repoRoot, encoding: 'utf-8', ...options })
      .toString()
      .trim();
  }

  private resolveDefaultBranch() {
    const remoteBranches = this.exec('git branch -r');
    if (remoteBranches.includes('origin/master')) return 'master';
    if (remoteBranches.includes('origin/main')) return 'main';
    throw new Error('Could not find a "master" or "main" branch on origin');
  }

  /** Requires a clean tree, then creates the release branch from the latest default branch. */
  start() {
    if (this.exec('git status --short')) {
      throw new Error('The working tree is not clean; commit or stash first');
    }
    console.log('Fetching origin...');
    this.exec('git fetch origin');
    this.defaultBranch = this.resolveDefaultBranch();
    try {
      this.exec(`git branch -D ${this.branchName}`);
    } catch {
      // The branch did not exist yet.
    }
    console.log(`Creating ${this.branchName} from origin/${this.defaultBranch}...`);
    this.exec(`git checkout -b ${this.branchName} origin/${this.defaultBranch}`);
  }

  /** Commits and pushes what the sync produced; returns false when there was nothing to commit. */
  publish(commitMessage: string) {
    this.exec('git add .');
    if (!this.exec('git status --short')) return false;
    this.exec(`git commit -m "${commitMessage}"`);
    this.exec(`git push origin ${this.branchName}`);
    console.log(`\nPushed ${this.branchName}. Open a PR titled "${commitMessage}".`);
    return true;
  }

  /** Discards everything the run produced; safe because the tree was clean at `start`. */
  abandon() {
    this.exec('git reset --hard');
    this.exec('git clean -fd');
    this.exec(`git checkout ${this.defaultBranch}`);
    this.exec(`git branch -D ${this.branchName}`);
  }
}
