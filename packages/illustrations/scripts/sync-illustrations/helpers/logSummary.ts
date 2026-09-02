import chalk from 'chalk';

import type { Manifest, ManifestTaskOptions } from '../tools/Manifest';
import type { SyncTask } from '../utils';

export function logSummary(
  manifest: Manifest,
  task: SyncTask<ManifestTaskOptions>,
  options: { ignoreBreakingChanges?: boolean } = {},
) {
  if (manifest.renames.size) {
    console.log(`
/* -------------------------------------------------------------------------- */
/*                                   RENAMED                                  */
/* -------------------------------------------------------------------------- */
`);
    console.table(
      [...manifest.renames.entries()].map(([previous, next]) => ({
        type: previous.type,
        previous: previous.name,
        new: next.name,
      })),
    );
  }

  if (manifest.updates.size) {
    console.log(`
/* -------------------------------------------------------------------------- */
/*                                   UPDATED                                  */
/* -------------------------------------------------------------------------- */
`);
    console.table(
      [...manifest.updates.values()].map((item) => ({ type: item.type, name: item.name })),
    );
  }

  if (manifest.additions.size) {
    console.log(`
/* -------------------------------------------------------------------------- */
/*                                    ADDED                                   */
/* -------------------------------------------------------------------------- */
`);
    console.table(
      [...manifest.additions.values()].map((item) => ({ type: item.type, name: item.name })),
    );
  }

  if (manifest.deletions.size) {
    console.log(`
/* -------------------------------------------------------------------------- */
/*                                   DELETED                                  */
/* -------------------------------------------------------------------------- */
`);
    console.table(
      [...manifest.deletions.values()].map((item) => ({ type: item.type, name: item.name })),
    );
  }

  if (!options.ignoreBreakingChanges && (manifest.renames.size || manifest.deletions.size)) {
    if (task.options.exitOnBreakingChanges) {
      throw new Error('Renames and deletions are breaking changes');
    }

    console.warn(
      `\n${chalk.yellow('warning')} Renames and deletions are breaking changes.`,
      '\nPlease ensure that you publish a migration guide and a migrator script along with this release.\n',
    );
  }
}
