const docusaurusPreset = require('@docusaurus/core/lib/babel/preset');

const isTestEnv = process.env.NODE_ENV === 'test';

module.exports = {
  presets: isTestEnv
    ? [['@babel/preset-env', { modules: 'commonjs' }], '@babel/preset-typescript']
    : [docusaurusPreset],
};
