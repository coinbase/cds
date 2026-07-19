/**
 * Decides whether a visual regression suite needs to run for the current branch.
 *
 * Exit codes:
 *   0 - run visreg: a non-test .ts/.tsx file under a watched directory changed
 *       since the merge-base with the base branch.
 *   1 - skip visreg: no watched changes.
 *   2 - misconfiguration: no directories were passed. Callers must treat this as
 *       a hard failure (see visreg-check.yml) rather than a skip.
 *
 * The watched directories are passed as CLI arguments so this single script can
 * serve every platform, e.g.:
 *   node tools/ci/shouldRunVisreg.mjs packages/mobile/src
 *   node tools/ci/shouldRunVisreg.mjs packages/web/src packages/common/src
 *
 * Excluded regardless of directory: test, spec, figma, and story files — they
 * don't affect what the suite screenshots.
 *
 * Paths are matched repo-root-relative, so this works from any cwd (CI runs it
 * from the repo root; the local nx/yarn wrappers run it from a package dir).
 */
import { spawnSync } from 'node:child_process';
import { getBase } from './getBase.mjs';

// Normalize to directory prefixes so `startsWith` can't match a sibling like
// `packages/web/src-other/` when the arg is `packages/web/src`.
const watchedPrefixes = process.argv.slice(2).map((dir) => (dir.endsWith('/') ? dir : `${dir}/`));

if (watchedPrefixes.length === 0) {
  // Exit 2, not 1: a missing paths argument is a wiring bug, not a legitimate
  // "no relevant changes" skip. Exiting 1 here would silently drop visual
  // regression coverage; the CI caller maps exit 2 to a job failure instead.
  console.error('shouldRunVisreg: expected at least one source directory argument');
  process.exit(2);
}

function git(...args) {
  return spawnSync('git', args, { encoding: 'utf8' }).stdout.trim();
}

const mergeBase = git('merge-base', getBase(), 'HEAD');
// No `--relative`: keep paths repo-root-relative so prefix matching is cwd-independent.
const changedFiles = git('diff', '--name-only', 'HEAD', mergeBase).split('\n').filter(Boolean);

const TS_EXT = /\.(ts|tsx)$/;
const EXCLUDED = /\.(spec|test|figma|stories)\.[jt]sx?/;

const relevant = changedFiles.some(
  (f) =>
    watchedPrefixes.some((prefix) => f.startsWith(prefix)) && TS_EXT.test(f) && !EXCLUDED.test(f),
);

process.exit(relevant ? 0 : 1);
