import { existsSync } from 'node:fs';
import { readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { execSync } from 'node:child_process';

import {
  color,
  logInfo as logInfoBase,
  logSuccess,
  logError as logErrorBase,
} from '../logging.mjs';

const PATCHES_PATH = '.yarn/patches';

function parsePatchedDependenciesSet(str) {
  return str
    .replace(/"/g, '')
    .split('\n')
    .filter((dep) => {
      return dep.includes('@patch:');
    })
    .reduce((set, dependency) => {
      const [, , path] = dependency.split(/(?:@patch:)|#(?:\.\/|~\/)?|(?:::)/g);
      set.add(path);
      return set;
    }, new Set());
}

export async function validatePatches(outputStream) {
  const logInfo = (msg) => {
    logInfoBase(msg, outputStream);
  };
  const logError = (msg) => {
    logErrorBase(msg, outputStream);
  };
  logInfo('Validating that all yarn patches are being used');

  if (!existsSync(PATCHES_PATH)) {
    logSuccess('No patches found');
    return;
  }

  let result = '';
  try {
    result = execSync('yarn info --all --name-only --recursive --json').toString();
  } catch (error) {
    logError(error?.message);
    process.exit(1);
  }

  const dependenciesSet = parsePatchedDependenciesSet(result);

  const files = await readdir(PATCHES_PATH).catch((e) => {
    console.log(color.warning(e));
    return [];
  });

  const unusedPatches = files.filter((file) => !dependenciesSet.has(join(PATCHES_PATH, file)));

  if (unusedPatches.length > 0) {
    logError(`Unused patches found: \n- ${unusedPatches.join('\n- ')}`);
    process.exit(1);
  }

  logSuccess('All yarn patches are being used');
}

void validatePatches(process.stdout);
