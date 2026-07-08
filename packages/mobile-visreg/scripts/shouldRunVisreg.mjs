/**
 * Exits 0 (run visreg) if any non-test TypeScript source file in
 * packages/mobile/src changed since the merge-base with master.
 * Exits 1 (skip visreg) otherwise.
 *
 * Deliberately narrow: only .ts / .tsx files under packages/mobile/src/.
 * Test, spec, figma, and story files are excluded — they don't affect
 * what the suite screenshots.
 */
import { spawnSync } from 'node:child_process';

const baseBranch = process.env.BASE_BRANCH ?? 'master';

function git(...args) {
  return spawnSync('git', args, { encoding: 'utf8' }).stdout.trim();
}

const mergeBase = git('merge-base', 'HEAD', baseBranch);
const changedFiles = git('diff', '--name-only', 'HEAD', mergeBase).split('\n').filter(Boolean);

const MOBILE_SRC_PREFIX = 'packages/mobile/src/';
const TS_EXT = /\.(ts|tsx)$/;
const EXCLUDED = /\.(spec|test|figma|stories)\.[jt]sx?/;

const relevant = changedFiles.some(
  (f) => f.startsWith(MOBILE_SRC_PREFIX) && TS_EXT.test(f) && !EXCLUDED.test(f),
);

process.exit(relevant ? 0 : 1);
