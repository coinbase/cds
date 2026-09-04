const d3 = ['d3', 'd3-.+', 'internmap'];

const esModules = ['@coinbase', ...d3];

/** @type {import('jest').Config} */
const config = {
  preset: '../../jest.preset.js',
  displayName: 'cds-common',
  coveragePathIgnorePatterns: ['<rootDir>/src/tokens'],
  coverageReporters: ['json', 'text-summary', 'text', 'json-summary'],
  transformIgnorePatterns: [`node_modules/(?!(${esModules.join('|')}))`],
};

export default config;
