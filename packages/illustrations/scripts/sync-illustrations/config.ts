import path from 'node:path';

import type { ManifestTaskOptions } from './tools/Manifest';
import type { SyncTask } from './utils';

type SyncIllustrationsConfig = SyncTask<ManifestTaskOptions> & {
  /** The absolute path of the repo root. */
  repoRoot: string;
  /** The absolute path of the nx release version plans directory. */
  versionPlansPath: string;
};

const MONOREPO_ROOT = process.env.PROJECT_CWD ?? process.env.NX_MONOREPO_ROOT;
if (!MONOREPO_ROOT) throw Error('MONOREPO_ROOT is undefined');

const ILLUSTRATIONS_PKG = path.resolve(MONOREPO_ROOT, 'packages/illustrations');

export const config: SyncIllustrationsConfig = {
  repoRoot: MONOREPO_ROOT,
  versionPlansPath: path.resolve(MONOREPO_ROOT, '.nx/version-plans'),
  projectRoot: ILLUSTRATIONS_PKG,
  projectName: 'illustrations',
  targetName: 'sync-illustrations',
  context: { targetName: 'sync-illustrations' },
  workspace: { root: MONOREPO_ROOT },
  options: {
    /** Figma file to sync illustrations from. */
    figmaApiFileId: 'LmkJatvMRVzNgfiIkJDb99',
    /** Tracks sync state and changes between runs. */
    manifestFile: path.resolve(ILLUSTRATIONS_PKG, 'manifest.json'),
    /** Root directory for all generated output (SVGs, PNGs, TypeScript). */
    generatedDirectory: path.resolve(ILLUSTRATIONS_PKG, 'src/__generated__'),
    /**
     * Figma file holding the illustration color variables, which carry light and dark modes.
     *
     * These are fetched through the Variables API: `getPublishedVariables()` lists the published
     * variables, `getLocalVariables()` supplies their values (the published endpoint omits them),
     * and the two are matched by variable ID. `ColorStyles` then uses the result to swap light hex
     * values for their dark equivalents and to substitute CSS variables for themeable SVGs.
     *
     * Requires Enterprise org access and the `file_variables:read` scope on the Figma token.
     */
    colorStylesFigmaFileId: 'AH4N0fma2EvI30IltjBGPy',
    /** Prefix for generated CSS variable names (`illustration` -> `--illustration-primary`). */
    colorStylesPrefix: 'illustration',
    /**
     * Sync every illustration regardless of when it last changed. Can also be passed to the
     * script as `--sync-all`.
     */
    syncAll: false,
    /** Renames and deletions warn rather than hard-fail; the version plan marks them major. */
    exitOnBreakingChanges: false,
  },
};
