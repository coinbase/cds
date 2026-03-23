import linaria from '@linaria/rollup';
import type { StorybookConfig } from '@storybook/react-vite';
import path from 'node:path';
import { visualizer } from 'rollup-plugin-visualizer';
import { mergeConfig } from 'vite';

const MONOREPO_ROOT = process.env.PROJECT_CWD ?? process.env.NX_MONOREPO_ROOT;

if (!MONOREPO_ROOT) throw Error('MONOREPO_ROOT is undefined');

const invalidCharacters = '-0123456789';

const createClassName = (hash: string, title: string) => {
  const needsEscaping = invalidCharacters.includes(title.charAt(0));
  return `${needsEscaping ? '_' : ''}${title}-${hash}`;
};

const isAnalyze = process.env.ANALYZE === 'true';
const isAnalyzeModeJson = process.env.ANALYZE_MODE_JSON === 'true';
const isPercyBuild = process.env.STORYBOOK_PERCY === 'true';
const bundleStatsFilename = path.resolve(
  MONOREPO_ROOT,
  process.env.ANALYZE_REPORT_PATH || 'bundle-stats.json',
);
const addons = [
  // '@chromatic-com/storybook',
  '@storybook/addon-storysource',
  '@storybook-community/storybook-dark-mode',
  ...(!isPercyBuild ? ['@storybook/addon-a11y', '@storybook/addon-vitest'] : []),
];

if (isAnalyze) {
  console.log('Bundle analyzer enabled because process.env.ANALYZE === "true"');
  console.log(`Bundle analyzer running in ${isAnalyzeModeJson ? 'raw-data' : 'treemap'} mode`);
  if (isAnalyzeModeJson)
    console.log(`Bundle analyzer writing bundle stats json to ${bundleStatsFilename}`);
}

const config: StorybookConfig = {
  core: {
    builder: '@storybook/builder-vite',
    disableTelemetry: true,
  },
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  addons,
  stories: [
    '../../../packages/web/**/*.stories.@(tsx|mdx)',
    '../../../packages/web-visualization/**/*.stories.@(tsx|mdx)',
  ],
  staticDirs: [
    {
      from: path.resolve(MONOREPO_ROOT, 'packages/icons/src'),
      to: '@coinbase/cds-icons',
    },
    {
      from: path.resolve(MONOREPO_ROOT, 'packages/illustrations/src'),
      to: '@coinbase/cds-illustrations',
    },
  ],
  env: (config) => ({
    ...config,
    ...(process.env.CI ? { CI: process.env.CI } : {}),
  }),
  viteFinal: async (config, { configType }) => {
    return mergeConfig(config, {
      optimizeDeps: {
        include: ['storybook-dark-mode'],
      },
      plugins: [
        linaria({
          classNameSlug: createClassName,
          babelOptions: {
            configFile: true,
          },
        }),
        isAnalyze &&
          visualizer({
            filename: bundleStatsFilename,
            template: isAnalyzeModeJson ? 'raw-data' : 'treemap',
            gzipSize: true,
          }),
      ],
      resolve: {
        alias: {
          '@coinbase/cds-common': path.resolve(MONOREPO_ROOT, 'packages/common/src'),
          '@coinbase/cds-icons': path.resolve(MONOREPO_ROOT, 'packages/icons/src'),
          '@coinbase/cds-illustrations': path.resolve(MONOREPO_ROOT, 'packages/illustrations/src'),
          '@coinbase/cds-lottie-files': path.resolve(MONOREPO_ROOT, 'packages/lottie-files/src'),
          '@coinbase/cds-utils': path.resolve(MONOREPO_ROOT, 'packages/utils/src'),
          '@coinbase/cds-web': path.resolve(MONOREPO_ROOT, 'packages/web/src'),
          '@coinbase/cds-web-visualization': path.resolve(
            MONOREPO_ROOT,
            'packages/web-visualization/src',
          ),
        },
      },
    });
  },
};
export default config;
