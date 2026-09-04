import os from 'os';

const d3 = ['d3', 'd3-.+', 'internmap'];

const esModules = ['@coinbase', ...d3];

const isCI = process.env.CI === 'true';

/** @type {import('jest').Config} */
const config = {
  preset: '../../jest.preset.js',
  displayName: 'cds-web',
  moduleNameMapper: {
    // Mock svgEsmMap modules — each entry's themeable() returns a Promise resolving to mock SVG.
    svgEsmMap: '<rootDir>/jest/svgEsmMapMock.js',
  },
  setupFiles: ['<rootDir>/jest/setup.js'],
  coveragePathIgnorePatterns: [
    '<rootDir>/src/styles',
    '<rootDir>/src/storybook-decorators',
    '.stories.tsx',
    '__stories__',
  ],
  testMatch: ['**//**/*.test.(ts|tsx)'],
  testTimeout: 10000,
  transformIgnorePatterns: [`node_modules/(?!(${esModules.join('|')}))`],
};

if (isCI) config.maxWorkers = Math.floor(os.availableParallelism() / 2);

export default config;
