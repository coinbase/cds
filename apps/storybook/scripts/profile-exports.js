const path = require('node:path');
const fs = require('node:fs');
const { fork } = require('node:child_process');
const { globSync } = require('glob');
const { diffLines } = require('diff');

const isDiffReport = process.env.PROFILE_EXPORTS_DIFF === 'true';

const MONOREPO_ROOT = process.env.PROJECT_CWD ?? process.env.NX_MONOREPO_ROOT;

if (!MONOREPO_ROOT) throw Error('MONOREPO_ROOT is undefined');

const FORK_FILE = path.resolve(__dirname, 'profile-export.js');

const STATS_BASELINE_FILENAME = 'export-stats.md';

const BUILD_DIR = path.resolve(MONOREPO_ROOT, '.nx/dist/packages');

const TEMP_NODE_MODULES = path.resolve(__dirname, 'node_modules');

const WEB_EXPORTS = [
  './AccessibilityAnnouncer/AccessibilityAnnouncer',
  './accordion',
  './animation',
  './banner/Banner',
  './buttons',
  './buttons/buttonStyles',
  './cards',
  './cells',
  './chips',
  './collapsible',
  './color/useAccessibleForeground',
  './color/useAccessibleForegroundGradient',
  './color/usePaletteToCssVars',
  './color/usePaletteValueToRgbaString',
  './color/useSpectrumClassName',
  './controls',
  './dots',
  './dots/dotStyles',
  './dropdown',
  './hooks/internal/useInternalSpacingStyles',
  './hooks/useA11yControlledVisibility',
  './hooks/useA11yLabels',
  './hooks/useBoundingClientRect',
  './hooks/useBreakpoints',
  './hooks/useButtonSpacing',
  './hooks/useCheckboxGroupState',
  './hooks/useComputedStyleForClassName',
  './hooks/useDeviceSpectrum',
  './hooks/useDimensions',
  './hooks/useElevationStyles',
  './hooks/useEventHandler',
  './hooks/useFlushStyles',
  './hooks/useHasMounted',
  './hooks/useInterpolate',
  './hooks/useIsBrowser',
  './hooks/useIsoEffect',
  './hooks/useOffsetStyles',
  './hooks/usePalette',
  './hooks/usePinStyles',
  './hooks/usePopoverA11y',
  './hooks/useRemoteImageSrc',
  './hooks/useResponsiveCellSpacing',
  './hooks/useResponsiveConfig',
  './hooks/useScrollBlocker',
  './hooks/useSpacingScale',
  './hooks/useSpacingStyles',
  './hooks/useSpacingValue',
  './hooks/useTriggerFocus',
  './icons',
  './icons/iconStyles',
  './illustrations',
  './layout',
  './loaders',
  './loaders/styles',
  './media/Avatar',
  './media/Hexagon',
  './media/RemoteImage',
  './media/RemoteImageGroup',
  './motion/AnimatedCaret',
  './motion/ColorSurge',
  './motion/Pulse',
  './motion/Shake',
  './motion/types',
  './motion/useMotionProps',
  './motion/utils',
  './navigation',
  './overlays',
  './overlays/alertStyles',
  './overlays/Modal/fullscreenModalStyles',
  './overlays/Modal/modalStyles',
  './overlays/toastStyles',
  './overlays/tooltipStyles',
  './styles/backgroundColor',
  './styles/border',
  './styles/borderColor',
  './styles/borderRadius',
  './styles/borderWidth',
  './styles/disabledState',
  './styles/display',
  './styles/flex',
  './styles/focus',
  './styles/foregroundColor',
  './styles/gap',
  './styles/global',
  './styles/gradient',
  './styles/grid',
  './styles/margin',
  './styles/overflow',
  './styles/padding',
  './styles/pin',
  './styles/position',
  './styles/responsive',
  './styles/responsiveSpacing',
  './styles/scale',
  './styles/spectrum',
  './styles/typography',
  './styles/visibility',
  './styles/visuallyHidden',
  './system/BrowserOnly',
  './system/ButtonOrLink',
  './system/DevicePreferencesProvider',
  './system/EventHandlerProvider',
  './system/FeatureFlagContext',
  './system/FeatureFlagProvider',
  './system/Interactable',
  './system/interactableCSSProperties',
  './system/Pressable',
  './system/PressableOpacity',
  './system/RootScaleProvider',
  './system/RootSpectrumProvider',
  './system/ThemeProvider',
  './system/useFeatureFlag',
  './system/useFeatureFlags',
  './system/useFeatureFlagUpdater',
  './system/useThemeProviderStyles',
  './tables',
  './tabs',
  './tag/Tag',
  './tag/tagSpacingStyles',
  './tokens',
  './types',
  './typography',
  './typography/textStyles',
  './utils/browser',
  './utils/eventHandlers',
  './utils/getComputedStyleForClassName',
  './utils/getResponsiveSpacingStyles',
  './utils/globalMatchMediaListener',
  './utils/isRtl',
  './utils/linaria',
  './utils/mediaQueryListener',
  './utils/overflow',
  './utils/palette',
  './utils/storybook',
  './utils/types',
  './version',
  './visualizations',
];

// Delete temp node_modules on exit to prevent any accidental misuse
const cleanup = () => {
  if (fs.existsSync(TEMP_NODE_MODULES)) fs.rmSync(TEMP_NODE_MODULES, { recursive: true });
};

process.on('exit', (message) => {
  console.log(message);
  cleanup();
});

process.on('uncaughtException', (error) => {
  console.log(error);
  cleanup();
  throw error;
});

cleanup();
fs.mkdirSync(TEMP_NODE_MODULES);

const builtPackagePaths = globSync(`${BUILD_DIR}/*/`);

const copyToTempNodeModules = (packagePath) => {
  const moduleName = `@cbhq/cds-${path.basename(packagePath)}`;
  const tempModulePath = path.resolve(TEMP_NODE_MODULES, moduleName);
  fs.cpSync(packagePath, tempModulePath, { recursive: true });
};

// Copy built packages from .nx/dist/packages/ into temp node_modules
builtPackagePaths.forEach(copyToTempNodeModules);

const jsFilePaths = globSync(`${TEMP_NODE_MODULES}/**/*.js`);

const removeCssRequires = (jsFilePath) => {
  const contents = fs.readFileSync(jsFilePath, 'utf-8');
  const newContents = contents.replaceAll(/^require\(".*\.css"\);$/gm, '');
  fs.writeFileSync(jsFilePath, newContents);
};

// Remove .css file require() from all .js files
jsFilePaths.forEach(removeCssRequires);

const median = (numbers) => {
  const sorted = [...numbers].sort((a, b) => a - b);
  const half = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[half] : (sorted[half - 1] + sorted[half]) / 2;
};

// Evaluate import runtime costs (e.g. the duration of any side effects)
const profileExport = async (exportPath) => {
  const exportName = exportPath.replace('./', '');
  const moduleName = `@cbhq/cds-web/${exportName}`;

  const timesInMs = [];

  for (let i = 0; i < 5; i++) {
    const childProcess = fork(FORK_FILE, [moduleName]);
    await new Promise((resolve) => {
      childProcess.on('message', (elapsedTimeInMs) => {
        timesInMs.push(elapsedTimeInMs);
        resolve();
      });
    });
  }

  const title = `${moduleName} `.padEnd(90, '.');
  const medianElapsedTime = Math.floor(median(timesInMs));
  const message = `${title} ${medianElapsedTime} ms`;
  return message;
};

const green = (message) => `\x1b[32m${message}\x1b[0m`;
const red = (message) => `\x1b[31m${message}\x1b[0m`;

const main = async () => {
  const statsBaselineFilePath = path.resolve(MONOREPO_ROOT, STATS_BASELINE_FILENAME);

  if (isDiffReport && !fs.existsSync(statsBaselineFilePath))
    throw Error(
      `No export baseline stats ${STATS_BASELINE_FILENAME} found at path "${statsBaselineFilePath}"`,
    );

  const exportStatsMessages = [];

  for (const webExport of WEB_EXPORTS) {
    const message = await profileExport(webExport);
    exportStatsMessages.push(message);
  }

  const exportStatsMessage = exportStatsMessages.join('\n');

  // If this isn't a diff report we'll just use the exportStatsMessage for both the baseline and comparison
  const baselineStatsMessage = isDiffReport
    ? fs.readFileSync(statsBaselineFilePath, 'utf-8')
    : exportStatsMessage;

  const statsMessageDiff = diffLines(baselineStatsMessage, exportStatsMessage);

  // https://buildkite.com/docs/pipelines/managing-log-output
  const BUILDKITE_EXPAND_PREFIX = '+++';

  console.log(
    `${process.env.CI === 'true' ? `${BUILDKITE_EXPAND_PREFIX} ` : '\n'}🐝 Export runtime costs:\n`,
  );

  statsMessageDiff.forEach(({ value, added, removed }, index) => {
    const nextDiff = statsMessageDiff[index + 1];
    const nextChanged = Boolean(nextDiff?.added || nextDiff?.removed);
    const message = added || nextChanged ? value.slice(0, -1) : value;
    if (added) return console.log(green(message));
    if (removed) return console.log(red(message));
    return console.log(message);
  });

  console.log('\n');

  if (!isDiffReport) {
    if (fs.existsSync(statsBaselineFilePath)) fs.rmSync(statsBaselineFilePath);
    fs.writeFileSync(statsBaselineFilePath, exportStatsMessage);
  }

  cleanup();
};

main();
