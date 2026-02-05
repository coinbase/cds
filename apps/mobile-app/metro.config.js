const exclusionList = require('metro-config/src/defaults/exclusionList');
const { resolve } = require('metro-resolver');
const { getDefaultConfig } = require('expo/metro-config');
const { mergeConfig } = require('@react-native/metro-config');
const path = require('node:path');
const { resolve: resolveExports } = require('resolve.exports');

// Learn more https://docs.expo.io/guides/customizing-metro
const expoConfig = getDefaultConfig(__dirname);
const defaultSourceExts = ['ts', 'tsx', 'js', 'jsx', 'json', 'd.ts', 'cjs'];

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
const pkgCache = {};

const getBaseModule = (moduleName) => {
  const parts = moduleName.split('/');
  if (!moduleName.startsWith('@')) return parts[0];
  return `${parts[0]}/${parts[1]}`;
};

function loadPackageJson(pkgPath) {
  if (!pkgCache[pkgPath]) {
    pkgCache[pkgPath] = require(pkgPath);
  }

  return pkgCache[pkgPath];
}

// This custom Metro resolver will try to use the aliases defined above.
const customResolveRequest = (context, baseModuleName, platform) => {
  const { resolveRequest: resolveRequestInner, ...ctx } = context;

  const moduleName = context.redirectModulePath(baseModuleName);
  const baseModule = moduleName && getBaseModule(moduleName);

  // Custom resolver to map local package aliases to exports
  if (
    process.env.CI !== 'true' &&
    process.env.NODE_ENV !== 'production' &&
    process.env.CDS_METRO_RESOLVER !== 'false' &&
    baseModule &&
    aliases[baseModule]
  ) {
    const aliasPath = moduleName.replace(baseModule, aliases[baseModule]);
    return context.resolveRequest(context, aliasPath, platform);
  }

  if (moduleName === false) {
    return {
      type: 'empty',
    };
  }

  /**
   * This custom resolver checks for an "exports" field in package.json and resolves accordingly.
   * NOTE: This mimics the behavior of unstable_enablePackageExports which is unable to be used by CDS for some reason.
   */
  if (moduleName.startsWith('@cb')) {
    const pkgPath = require.resolve(`${getBaseModule(moduleName)}/package.json`);
    const pkg = loadPackageJson(pkgPath);

    if ('exports' in pkg) {
      const entryPoint = resolveExports(pkg, moduleName, {
        conditions: ['react-native', 'browser', 'module', 'require', 'node', 'default'],
        unsafe: true,
      });

      if (entryPoint) {
        return {
          filePath: path.join(path.dirname(pkgPath), String(entryPoint)),
          type: 'sourceFile',
        };
      }
    }
  }

  if (resolveRequestInner) {
    // Nothing found, fallback to metro
    return resolveRequestInner(context, moduleName, platform);
  }

  return resolve(ctx, moduleName, platform);
};

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const metroConfig = mergeConfig(expoConfig, {
  resetCache: true,
  resolver: {
    blacklistRE: exclusionList([/dist\/@cb\/.*/]),
    // https://github.com/wix/Detox/blob/master/docs/Guide.Mocking.md#Configuration
    sourceExts: process.env.RN_SRC_EXT
      ? process.env.RN_SRC_EXT.split(',').concat(defaultSourceExts)
      : defaultSourceExts,
    resolveRequest: customResolveRequest,
  },
});

module.exports = metroConfig;
