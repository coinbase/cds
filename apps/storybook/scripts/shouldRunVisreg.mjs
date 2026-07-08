/**
 * Exits 0 (run visreg) if any non-test TypeScript source file in the
 * web packages changed since the merge-base with master.
 * Exits 1 (skip visreg) otherwise.
 *
 * Watched: packages/web/src, packages/common/src, packages/icons/src,
 *          packages/illustrations/src (all TypeScript source only).
 * Excluded: test, spec, figma, and story files.
 * Not watched: apps/storybook — storybook config changes don't affect
 *              what components look like visually.
 */
import { spawnSync } from 'node:child_process';

const baseBranch = process.env.BASE_BRANCH ?? 'master';

function git(...args) {
  return spawnSync('git', args, { encoding: 'utf8' }).stdout.trim();
}

const mergeBase = git('merge-base', 'HEAD', baseBranch);
const changedFiles = git('diff', '--name-only', 'HEAD', mergeBase).split('\n').filter(Boolean);

const WEB_SRC_PREFIXES = [
  'packages/web/src/',
  'packages/common/src/',
  'packages/icons/src/',
  'packages/illustrations/src/',
];

const TS_EXT = /\.(ts|tsx)$/;
const EXCLUDED = /\.(spec|test|figma|stories)\.[jt]sx?/;

const relevant = changedFiles.some(
  (f) =>
    WEB_SRC_PREFIXES.some((prefix) => f.startsWith(prefix)) && TS_EXT.test(f) && !EXCLUDED.test(f),
);

process.exit(relevant ? 0 : 1);
