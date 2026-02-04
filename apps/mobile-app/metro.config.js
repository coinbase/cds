const { getDefaultConfig } = require('expo/metro-config');
const path = require('node:path');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Local package aliases for development (enables hot reload from source)
const aliases = {
  '@coinbase/cds-common': path.resolve(__dirname, '../../packages/common/src'),
  '@coinbase/cds-icons': path.resolve(__dirname, '../../packages/icons/src'),
  '@coinbase/cds-illustrations': path.resolve(__dirname, '../../packages/illustrations/src'),
  '@coinbase/cds-lottie-files': path.resolve(__dirname, '../../packages/lottie-files/src'),
  '@coinbase/cds-mobile': path.resolve(__dirname, '../../packages/mobile/src'),
  '@coinbase/cds-mobile-visualization': path.resolve(
    __dirname,
    '../../packages/mobile-visualization/src',
  ),
  '@coinbase/cds-utils': path.resolve(__dirname, '../../packages/utils/src'),
  '@coinbase/ui-mobile-playground': path.resolve(
    __dirname,
    '../../packages/ui-mobile-playground/src',
  ),
  '@coinbase/ui-mobile-visreg': path.resolve(__dirname, '../../packages/ui-mobile-visreg/src'),
};

// Detox source extension support
// https://github.com/wix/Detox/blob/master/docs/Guide.Mocking.md#Configuration
if (process.env.RN_SRC_EXT) {
  config.resolver.sourceExts = [
    ...process.env.RN_SRC_EXT.split(','),
    ...config.resolver.sourceExts,
  ];
}

// Development alias resolver for local packages
config.resolver.resolveRequest = (context, moduleName, platform) => {
  // Only use aliases in development
  if (process.env.CI !== 'true' && process.env.NODE_ENV !== 'production') {
    for (const [alias, aliasPath] of Object.entries(aliases)) {
      if (moduleName === alias || moduleName.startsWith(`${alias}/`)) {
        const resolvedPath = moduleName.replace(alias, aliasPath);
        return context.resolveRequest(context, resolvedPath, platform);
      }
    }
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
