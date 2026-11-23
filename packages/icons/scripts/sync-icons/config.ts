import path from 'node:path';

import { CodeConnectSink } from './sinks/CodeConnectSink';
import { ExpoSvgMapSink } from './sinks/ExpoSvgMapSink';
import { IconDataSink } from './sinks/IconDataSink';
import { IconFontSink } from './sinks/IconFontSink';
import type { Sink } from './sinks/Sink';
import { SvgFilesSink } from './sinks/SvgFilesSink';
import { FigmaSource } from './source/FigmaSource';
import type { IconSource } from './source/IconSource';

export type SyncIconsConfig = {
  /* Where icons come from; see source/. */
  source: IconSource;
  /* The Figma file the icons are published from. */
  figmaFileId: string;
  /* The absolute path of the repo root. */
  repoRoot: string;
  /* The absolute path of the manifest file. */
  manifestPath: string;
  /* The absolute path of the svg output directory. */
  outputSvgPath: string;
  /* The absolute path of the data output directory. */
  outputDataPath: string;
  /* The absolute path of the directory of the font file for native. */
  outputFontNativePath: string;
  /* The absolute path of the directory of the font file and the css file for web. */
  outputFontWebPath: string;
  /* The name of the output icon font. */
  outputFontName: string;
  /* The name of the output font css file. */
  outputFontCssFileName: string;
  /* Whether to download and compare every icon set regardless of when it was last updated. Can also be passed as an argument to the script with --full-compare. */
  fullCompare: boolean;
  /* Where the sync writes; see sinks/. */
  sinks: Sink[];
};

export const FIGMA_FILE_ID = '1J3XC4iA2xRzlnC3y0pl1N';

/** The configuration of the sync for a repository checkout; `overrides` replace any part of it. */
export const createConfig = (
  repoRoot: string,
  overrides: Partial<SyncIconsConfig> = {},
): SyncIconsConfig => {
  const packageDir = path.resolve(repoRoot, 'packages/icons');
  return {
    source: new FigmaSource({ fileId: FIGMA_FILE_ID }),
    figmaFileId: FIGMA_FILE_ID,
    repoRoot,
    manifestPath: path.resolve(packageDir, 'manifest.json'),
    outputSvgPath: path.resolve(packageDir, 'src/svgs'),
    outputDataPath: path.resolve(packageDir, 'src'),
    outputFontNativePath: path.resolve(packageDir, 'src/fonts/native'),
    outputFontWebPath: path.resolve(packageDir, 'src/fonts/web'),
    outputFontName: 'CoinbaseIcons',
    outputFontCssFileName: 'icon-font',
    fullCompare: false,
    sinks: [
      new SvgFilesSink(),
      new IconFontSink(),
      new IconDataSink(),
      new CodeConnectSink(),
      new ExpoSvgMapSink(),
    ],
    ...overrides,
  };
};
