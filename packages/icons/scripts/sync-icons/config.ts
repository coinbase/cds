import path from 'node:path';

type SyncIconsConfig = {
  /* The figma file id to sync icons from. */
  figmaFileId: string;
  /* The absolute path of the repo root. */
  repoRoot: string;
  /* The absolute path of the manifest file. */
  manifestPath: string;
  /* The absolute path of the svg output directory. */
  outputSvgPath: string;
  /* The absolute path of the data output directory. */
  outputDataPath: string;
  /* The absolute path of the output font directory. */
  outputFontPath: string;
  /* The name of the output icon font. */
  outputFontName: string;
  /* The name of the output font css file. */
  outputFontCssFileName: string;
  /* Whether to download and compare every icon set regardless of when it was last updated. Can also be passed as an argument to the script with --full-compare. */
  fullCompare: boolean;
};

const MONOREPO_ROOT = process.env.PROJECT_CWD ?? process.env.NX_MONOREPO_ROOT;
if (!MONOREPO_ROOT) throw Error('MONOREPO_ROOT is undefined');

const ICONS_PKG = path.resolve(MONOREPO_ROOT, 'packages/icons');

export const config: SyncIconsConfig = {
  figmaFileId: '1J3XC4iA2xRzlnC3y0pl1N',
  repoRoot: MONOREPO_ROOT,
  manifestPath: path.resolve(ICONS_PKG, 'manifest.json'),
  outputSvgPath: path.resolve(ICONS_PKG, 'src/svgs'),
  outputDataPath: path.resolve(ICONS_PKG, 'src'),
  outputFontPath: path.resolve(ICONS_PKG, 'src/fonts'),
  outputFontName: 'CoinbaseIcons',
  outputFontCssFileName: 'icon-font',
  fullCompare: false,
};
