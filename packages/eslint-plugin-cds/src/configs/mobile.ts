/**
 * For mobile codebases, our plugin includes react-native-a11y rules.
 * We override the react-native-a11y/has-accessibility-hint rule since we provide our own implementation.
 *
 * Note: We list react-native-a11y as a plugin. This makes the plugin's rules available to be turned on or off in the configuration.
 * It's a more selective approach that requires you to manually specify which rules to enable.
 * (As opposed to extending which is used to inherit configurations from a set of predefined rules.)
 */
// @ts-expect-error there are not types for this eslint plugin
import reactNativeA11y from 'eslint-plugin-react-native-a11y';

/**
 * Builds the "mobile" shareable config in modern EsLint flat config format.
 *
 * @param plugin - The CDS plugin object, defined in src/index.ts
 */
export function buildMobileConfig(plugin: Record<string, unknown>) {
  return {
    plugins: {
      'react-native-a11y': reactNativeA11y,
      '@coinbase/cds': plugin,
    },
    rules: {
      'react-native-a11y/has-accessibility-hint': 'off',
      '@coinbase/cds/has-valid-accessibility-descriptors-extended': 'warn',
      '@coinbase/cds/mobile-chart-scrubbing-accessibility': 'warn',
    },
  };
}

export const legacyMobileConfig = {
  plugins: ['react-native-a11y'],
  rules: {
    'react-native-a11y/has-accessibility-hint': 'off',
    '@coinbase/cds/has-valid-accessibility-descriptors-extended': 'warn',
    '@coinbase/cds/mobile-chart-scrubbing-accessibility': 'warn',
  },
};
