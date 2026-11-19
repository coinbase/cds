import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

/**
 * Picks the Figma sync branches that nobody is going to use any more, for the
 * cleanup-figma-sync-branches workflow. A sync pushes `icons/YYYY-MM-DD` or
 * `illustrations/YYYY-MM-DD`; when its pull request is closed without merging, or never opened,
 * the branch stays behind. Merged branches are already deleted by the repository.
 */

/** Only the names the sync scripts create. Anything else, such as a hand-named branch, is left alone. */
export const SYNC_BRANCH_PATTERN = /^(icons|illustrations)\/\d{4}-\d{2}-\d{2}$/;

/** Long enough for an engineer to open a pull request from the Slack link after a sync. */
export const DEFAULT_STALE_DAYS = 14;

const MS_PER_DAY = 24 * 60 * 60 * 1000;

/**
 * @param {object} input
 * @param {{ name: string, lastCommitAt: string }[]} input.branches remote branches with the date of their last commit
 * @param {Iterable<string>} input.openPullRequestBranches head branches of the open pull requests
 * @param {Date} [input.now]
 * @param {number} [input.staleDays]
 * @returns {string[]} the branches to delete, sorted
 */
export const selectStaleBranches = ({
  branches,
  openPullRequestBranches,
  now = new Date(),
  staleDays = DEFAULT_STALE_DAYS,
}) => {
  const open = new Set(openPullRequestBranches);
  const cutoff = now.getTime() - staleDays * MS_PER_DAY;
  return branches
    .filter(({ name }) => SYNC_BRANCH_PATTERN.test(name))
    .filter(({ name }) => !open.has(name))
    .filter(({ lastCommitAt }) => {
      const time = Date.parse(lastCommitAt);
      return Number.isFinite(time) && time < cutoff;
    })
    .map(({ name }) => name)
    .sort();
};

const readLines = (path) =>
  readFileSync(path, 'utf-8')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

const main = () => {
  const args = process.argv.slice(2);
  const option = (name) => {
    const index = args.indexOf(`--${name}`);
    return index >= 0 ? args[index + 1] : undefined;
  };
  const branchesPath = option('branches');
  const openPullRequestsPath = option('open-prs');
  const staleDays = Number(option('days') ?? DEFAULT_STALE_DAYS);
  if (!branchesPath || !openPullRequestsPath || !Number.isInteger(staleDays) || staleDays < 1) {
    console.error(
      'Usage: staleSyncBranches.mjs --branches <name<TAB>iso-date lines> --open-prs <branch names> [--days <whole number, at least 1>]',
    );
    process.exit(1);
  }
  const branches = readLines(branchesPath).map((line) => {
    const [name, lastCommitAt] = line.split('\t');
    return { name, lastCommitAt };
  });
  const stale = selectStaleBranches({
    branches,
    openPullRequestBranches: readLines(openPullRequestsPath),
    staleDays,
  });
  process.stdout.write(stale.map((name) => `${name}\n`).join(''));
};

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) main();
