const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.unstable_enablePackageExports = true;

// Force @react-spring/native to use its CJS entry point.
// The ESM (.modern.mjs) entry uses a __require("react-native") polyfill
// that Metro cannot resolve when package exports are enabled.
const originalResolveRequest = config.resolver.resolveRequest;
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === '@react-spring/native') {
    return {
      type: 'sourceFile',
      filePath: path.resolve(__dirname, 'node_modules/@react-spring/native/dist/cjs/index.js'),
    };
  }
  const resolve = originalResolveRequest ?? context.resolveRequest;
  return resolve(context, moduleName, platform);
};

module.exports = config;
