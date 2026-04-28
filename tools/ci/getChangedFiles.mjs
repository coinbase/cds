import { spawnSync } from 'node:child_process';
import { logInfo as logInfoBase } from './logging.mjs';
import { printFileList } from './findFiles.mjs';
import { getBase } from './getBase.mjs';

export async function getChangedFiles(verbose = true, logInfo = logInfoBase) {
  if (verbose) {
    logInfo('Loading changed files:');
  }

  const base = getBase();
  let mergeBase = base;

  try {
    mergeBase = spawnSync(`git`, ['merge-base', base, 'HEAD']).stdout.toString().trim();
  } catch {
    mergeBase = spawnSync(`git`, ['merge-base', '--fork-point', base, 'HEAD'])
      .stdout.toString()
      .trim();
  }

  const files = spawnSync(`git`, ['--no-pager', 'diff', '--name-only', '--relative', mergeBase])
    .stdout.toString()
    .trim()
    .split('\n');

  if (verbose) {
    printFileList(files, logInfo);
  }

  return files;
}
