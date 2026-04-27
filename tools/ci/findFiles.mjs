import glob from 'fast-glob';
import { logInfo as logInfoBase, logPlain } from './logging.mjs';

export function printFileList(list, logInfo = logInfoBase) {
  list.forEach((item) => {
    logInfo(`  - ${item}`);
  });
}

export async function findFiles(projectRoot, globs) {
  logPlain(`Finding files within ${projectRoot} using glob: ${globs.join(', ')}`);

  const files = await glob(globs, {
    absolute: false,
    cwd: projectRoot,
    ignore: ['**/node_modules/**'],
  });

  logPlain(`::group::Found ${files.length} files in ${projectRoot}`);
  printFileList(files);
  logPlain(`::endgroup::`);

  return files;
}
