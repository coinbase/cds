import os from 'os';

const d3 = ['d3', 'd3-.+', 'internmap'];

const esModules = ['@coinbase', ...d3];

const isCI = process.env.CI === 'true';

/** @type {import('jest').Config} */
const config = {
  preset: '../../jest.preset.js',
  displayName: 'web-visualization',
  setupFiles: ['<rootDir>/jest/setup.js'],
  testMatch: ['**//**/*.test.(ts|tsx)'],
  testTimeout: 10000,
  transformIgnorePatterns: [`node_modules/(?!(${esModules.join('|')}))`],
  moduleNameMapper: {
    '^@coinbase/cds-common/visualizations/charts$':
      '<rootDir>/../common/src/visualizations/charts/index.ts',
  },
};

if (isCI) config.maxWorkers = Math.floor(os.availableParallelism() / 2);

export default config;
