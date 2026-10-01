import path from 'node:path';

import { IllustrationsPackageSink } from './sinks/IllustrationsPackageSink';
import type { Sink } from './sinks/Sink';
import { FigmaSource } from './source/FigmaSource';
import type { IllustrationSource } from './source/IllustrationSource';

type SyncIllustrationsConfig = {
  /* Where illustrations come from; see source/. */
  source: IllustrationSource;
  /* The absolute path of the repo root. */
  repoRoot: string;
  /* The absolute path of the nx release version plans directory. */
  versionPlansPath: string;
  /* The absolute path of the manifest file. */
  manifestPath: string;
  /* The destinations synced illustrations are written to. Each sink owns one; see sinks/. */
  sinks: Sink[];
  /* Whether to force sync all illustrations regardless of when they were last updated. Can also be passed as an argument to the script with --sync-all. */
  syncAll: boolean;
};

const MONOREPO_ROOT = process.env.PROJECT_CWD ?? process.env.NX_MONOREPO_ROOT;
if (!MONOREPO_ROOT) throw Error('MONOREPO_ROOT is undefined');

/**
 * Scratch runs exercise the sync without touching the package: everything is written under
 * SYNC_ILLUSTRATIONS_SCRATCH_DIR, optionally from a different Figma file such as the test fixture
 * file. See DOCS.md.
 */
const SCRATCH_DIR = process.env.SYNC_ILLUSTRATIONS_SCRATCH_DIR;

const ILLUSTRATIONS_PKG = path.resolve(MONOREPO_ROOT, 'packages/illustrations');
const OUTPUT_ROOT = SCRATCH_DIR ? path.resolve(SCRATCH_DIR) : ILLUSTRATIONS_PKG;
const GENERATED_DIR = path.resolve(
  OUTPUT_ROOT,
  SCRATCH_DIR ? '__generated__' : 'src/__generated__',
);

export const config: SyncIllustrationsConfig = {
  source: new FigmaSource({
    fileId: process.env.SYNC_ILLUSTRATIONS_FIGMA_FILE_ID ?? 'LmkJatvMRVzNgfiIkJDb99',
    colorsFileId: 'AH4N0fma2EvI30IltjBGPy',
    paletteVariablePrefix: 'illustration',
  }),
  repoRoot: MONOREPO_ROOT,
  versionPlansPath: SCRATCH_DIR
    ? path.resolve(OUTPUT_ROOT, 'version-plans')
    : path.resolve(MONOREPO_ROOT, '.nx/version-plans'),
  manifestPath: path.resolve(OUTPUT_ROOT, 'manifest.json'),
  sinks: [new IllustrationsPackageSink({ dir: GENERATED_DIR, cssVariablePrefix: 'illustration' })],
  syncAll: false,
};
