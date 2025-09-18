import path from 'node:path';
import { execSync } from 'node:child_process';

import { getFileHash } from '../getFileHash';
import {
  LogOutStream,
  LogParam,
  color,
  logInfo as logInfoBase,
  logSuccess,
  logError as logErrorBase,
} from '../logging';

const LOCK_PATH = path.join(process.cwd(), 'yarn.lock');

export async function validateLockfile(outputStream: LogOutStream) {
  const logInfo = (msg: LogParam) => {
    logInfoBase(msg, outputStream);
  };
  const logError = (msg: LogParam) => {
    logErrorBase(msg, outputStream);
  };

  logInfo('Validating the lockfile has been deduped');

  const before = await getFileHash(LOCK_PATH);

  await execSync('yarn dedupe');

  const after = await getFileHash(LOCK_PATH);

  if (after !== before) {
    logError(`Lockfile contains duplicates. Please run ${color.shell('yarn dedupe')} to resolve.`);
    process.exit(1);
  }

  logSuccess('Lockfile has been deduped');
}

void validateLockfile(process.stdout);
