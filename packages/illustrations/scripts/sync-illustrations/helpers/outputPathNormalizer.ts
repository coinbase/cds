import type { SyncTask } from '../utils';
import { getAbsolutePath } from '../utils';

function optionsIsObject(val: unknown): val is Record<string, string> {
  return typeof val === 'object';
}
/**
 * Normalize the output paths to be relative to generated manifest
 *
 * @filePath `Users/john-doe/cds/packages/illustrations/src/__generated__svg/heroSquare-test.svg`
 * @returns `./svg/heroSquare-test.svg`
 */
export function outputPathNormalizer(task: SyncTask) {
  const generatedDir = optionsIsObject(task.options)
    ? getAbsolutePath(task, task.options.generatedDirectory)
    : undefined;

  return function normalizeOutputPath(absoluteFilePath: string) {
    if (generatedDir) {
      return absoluteFilePath.replace(generatedDir, '.');
    }
    console.error(
      'You must provide a "generatedDirectory" option in the project.json task in order to properly normalize the path name for outputs',
    );
    return absoluteFilePath;
  };
}
