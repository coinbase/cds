import path from 'node:path';
import { execSync } from 'node:child_process';

import { getChangedFiles } from '../getChangedFiles.mjs';
import {
  color,
  logInfo as logInfoBase,
  logSuccess,
  logError as logErrorBase,
} from '../logging.mjs';

const ICON_SVG_PATH_PATTERN = /^packages\/icons\/src\/svgs\//;
const OUTPUT_PATH = 'apps/expo-app/src/__generated__/iconSvgMap.ts';

export async function validateIconSvgMap(outputStream) {
  const logInfo = (msg) => {
    logInfoBase(msg, outputStream);
  };
  const logError = (msg) => {
    logErrorBase(msg, outputStream);
  };

  const changedFiles = await getChangedFiles(false);
  const iconSvgsChanged = changedFiles.some((file) => ICON_SVG_PATH_PATTERN.test(file));

  if (!iconSvgsChanged) {
    logInfo('No changes under packages/icons/src/svgs. Skipping icon SVG map validation.');
    return;
  }

  logInfo('Icon SVGs changed — validating expo-app iconSvgMap is up to date');

  execSync('yarn nx run codegen:icon-svg-map', { stdio: 'inherit' });

  const outputFile = path.join(process.cwd(), OUTPUT_PATH);
  const diff = execSync(`git diff -- ${OUTPUT_PATH}`, { encoding: 'utf8' });

  if (diff) {
    logError(
      `iconSvgMap is out of date. Run ${color.shell('yarn nx run codegen:icon-svg-map')} and commit ${OUTPUT_PATH}.`,
    );
    process.exit(1);
  }

  logSuccess(`iconSvgMap is up to date (${outputFile})`);
}

void validateIconSvgMap(process.stdout);
