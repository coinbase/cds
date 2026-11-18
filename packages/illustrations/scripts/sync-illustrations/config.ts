import path from 'node:path';

import { AndroidVectorDrawableSink } from './sinks/AndroidVectorDrawableSink';
import { IllustrationsPackageSink } from './sinks/IllustrationsPackageSink';
import { IosAssetCatalogSink } from './sinks/IosAssetCatalogSink';
import type { Sink } from './sinks/Sink';
import { WebStoriesSink } from './sinks/WebStoriesSink';
import { figmaNodeUrl } from './source/fetchComponents';
import { FigmaSource } from './source/FigmaSource';
import type { IllustrationSource } from './source/IllustrationSource';
import type { Illustration } from './illustration';
import { nativeLayout, nativeModules } from './nativeRepo';

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
  /* Whether to run on a fresh `illustrations/YYYY-MM-DD` branch and push it. Off for scratch runs; `--no-git` turns it off for a run. */
  git: boolean;
  /* The native CDS checkout (mobile-skunkworks) the native sinks write into, when it is synced too. Unset for scratch runs, which write the native output under the scratch directory instead. */
  nativeRepo?: string;
  /* The sinks among `sinks` that write into the native checkout; empty when none is configured. */
  nativeSinks: Sink[];
};

const MONOREPO_ROOT = process.env.PROJECT_CWD ?? process.env.NX_MONOREPO_ROOT;
if (!MONOREPO_ROOT) throw Error('MONOREPO_ROOT is undefined');

/**
 * Scratch runs exercise the sync without touching the package: everything is written under
 * SYNC_ILLUSTRATIONS_SCRATCH_DIR, optionally from a different Figma file such as the test fixture
 * file. See DOCS.md.
 */
const SCRATCH_DIR = process.env.SYNC_ILLUSTRATIONS_SCRATCH_DIR;

/**
 * The checkout of the native CDS repository (mobile-skunkworks), which is machine specific. When
 * set, the iOS and Android sinks join the run; when unset, the sync does exactly what it did
 * before they existed. See DOCS.md.
 */
const NATIVE_REPO = process.env.SYNC_ILLUSTRATIONS_NATIVE_REPO;

const FIGMA_FILE_ID = process.env.SYNC_ILLUSTRATIONS_FIGMA_FILE_ID ?? 'LmkJatvMRVzNgfiIkJDb99';

const ILLUSTRATIONS_PKG = path.resolve(MONOREPO_ROOT, 'packages/illustrations');
const OUTPUT_ROOT = SCRATCH_DIR ? path.resolve(SCRATCH_DIR) : ILLUSTRATIONS_PKG;
const GENERATED_DIR = path.resolve(
  OUTPUT_ROOT,
  SCRATCH_DIR ? '__generated__' : 'src/__generated__',
);
const WEB_STORIES_DIR = SCRATCH_DIR
  ? path.resolve(OUTPUT_ROOT, 'web-stories')
  : path.resolve(MONOREPO_ROOT, 'packages/web/src/illustrations/__stories__');
/** Scratch runs mirror the native repository's layout under the scratch directory. */
const NATIVE_ROOT =
  NATIVE_REPO && (SCRATCH_DIR ? path.resolve(OUTPUT_ROOT, 'native') : path.resolve(NATIVE_REPO));

const componentUrl = (illustration: Illustration) =>
  figmaNodeUrl(FIGMA_FILE_ID, illustration.nodeId);

const nativeSinks = NATIVE_ROOT
  ? [
      new IosAssetCatalogSink({
        catalogDir: path.join(NATIVE_ROOT, nativeModules.ios, nativeLayout.ios.catalog),
        generatedDir: path.join(NATIVE_ROOT, nativeModules.ios, nativeLayout.ios.generated),
        componentUrl,
      }),
      new AndroidVectorDrawableSink({
        drawableDir: path.join(NATIVE_ROOT, nativeModules.android, nativeLayout.android.drawable),
        kotlinDir: path.join(NATIVE_ROOT, nativeModules.android, nativeLayout.android.kotlin),
        componentUrl,
      }),
    ]
  : [];

export const config: SyncIllustrationsConfig = {
  source: new FigmaSource({
    fileId: FIGMA_FILE_ID,
    colorsFileId: 'AH4N0fma2EvI30IltjBGPy',
    paletteVariablePrefix: 'illustration',
  }),
  repoRoot: MONOREPO_ROOT,
  versionPlansPath: SCRATCH_DIR
    ? path.resolve(OUTPUT_ROOT, 'version-plans')
    : path.resolve(MONOREPO_ROOT, '.nx/version-plans'),
  manifestPath: path.resolve(OUTPUT_ROOT, 'manifest.json'),
  sinks: [
    new IllustrationsPackageSink({ dir: GENERATED_DIR, cssVariablePrefix: 'illustration' }),
    new WebStoriesSink({ dir: WEB_STORIES_DIR }),
    ...nativeSinks,
  ],
  syncAll: false,
  git: !SCRATCH_DIR,
  nativeSinks,
  nativeRepo: NATIVE_REPO && !SCRATCH_DIR ? path.resolve(NATIVE_REPO) : undefined,
};
