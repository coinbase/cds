/**
 * For web codebases, our plugin includes jsx-a11y rules.
 * We override the jsx-a11y/control-has-associated-label rule since we provide our own implementation.
 *
 * Note: We list jsx-a11y as a plugin. This makes the plugin's rules available to be turned on or off in the configuration.
 * It's a more selective approach that requires you to manually specify which rules to enable.
 * (As opposed to extending which is used to inherit configurations from a set of predefined rules.)
 */
import jsxA11y from 'eslint-plugin-jsx-a11y';

/**
 * Builds the "web" shareable config in modern EsLint flat config format.
 *
 * @param plugin - The CDS plugin object, defined in src/index.ts
 */
export function buildWebConfig(plugin: Record<string, unknown>) {
  return {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      'jsx-a11y': jsxA11y,
      '@coinbase/cds': plugin,
    },
    rules: {
      '@coinbase/cds/control-has-associated-label-extended': 'warn',
      '@coinbase/cds/no-v7-imports': 'warn',
      '@coinbase/cds/web-chart-scrubbing-accessibility': 'warn',
      '@coinbase/cds/web-tooltip-interactive-content': 'warn',
      'jsx-a11y/control-has-associated-label': [
        'warn',
        {
          controlComponents: [
            'Button',
            'Checkbox',
            'InputChip',
            'IconButton',
            'IconCounterButton',
            'Pressable',
            'Switch',
            'TextInput',
          ],
          depth: 3,
          labelAttributes: ['label', 'accessibilityLabel'],
        },
      ],
    },
  };
}

export const legacyWebConfig = {
  plugins: ['jsx-a11y'],
  rules: {
    '@coinbase/cds/control-has-associated-label-extended': 'warn',
    '@coinbase/cds/no-v7-imports': 'warn',
    '@coinbase/cds/web-chart-scrubbing-accessibility': 'warn',
    '@coinbase/cds/web-tooltip-interactive-content': 'warn',
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      rules: {
        'jsx-a11y/control-has-associated-label': [
          'warn',
          {
            controlComponents: [
              'Button',
              'Checkbox',
              'InputChip',
              'IconButton',
              'IconCounterButton',
              'Pressable',
              'Switch',
              'TextInput',
            ],
            depth: 3,
            labelAttributes: ['label', 'accessibilityLabel'],
          },
        ],
      },
    },
  ],
};
