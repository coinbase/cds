import path from 'node:path';

import type { SyncTask } from './types';

/**
 * Resolves a configured path to an absolute one: paths starting with `./` resolve against the
 * package, everything else against the repo root.
 *
 * `config.ts` already holds absolute paths, so this is a no-op for them (`path.resolve` returns an
 * absolute input unchanged). It is kept because the pipeline reads paths off the task object and
 * relative values remain valid config.
 */
export function getAbsolutePath<Options, PathValue extends string | undefined>(
  task: Partial<SyncTask<Options>>,
  pathValue: PathValue,
): PathValue {
  if (!pathValue) return undefined as PathValue;

  const base = pathValue.startsWith('./') ? task.projectRoot : task.workspace?.root;
  if (!base) return pathValue;

  return path.resolve(base, pathValue) as PathValue;
}
