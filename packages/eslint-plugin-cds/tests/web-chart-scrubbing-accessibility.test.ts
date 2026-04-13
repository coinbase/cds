import { RuleTester } from '@typescript-eslint/rule-tester';

import { webChartScrubbingAccessibility as rule } from '../src/rules/web-chart-scrubbing-accessibility';

import { normalizeIndent } from './normalizeIndent';

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
});

// @ts-expect-error RuleTester types mismatch in current setup
ruleTester.run('web-chart-scrubbing-accessibility', rule, {
  valid: [
    normalizeIndent`
      import { LineChart } from '@coinbase/cds-web-visualization';
      const getScrubberAccessibilityLabel = (index) => String(index);
      const Component = () => {
        return (
          <LineChart
            enableScrubbing
            accessibilityLabel="Price chart"
            getScrubberAccessibilityLabel={getScrubberAccessibilityLabel}
          />
        );
      }
    `,
    normalizeIndent`
      import { LineChart, Scrubber } from '@coinbase/cds-web-visualization';
      const getScrubberAccessibilityLabel = (index) => String(index);
      const Component = () => {
        return (
          <LineChart enableScrubbing aria-labelledby="chart-header">
            <Scrubber accessibilityLabel={getScrubberAccessibilityLabel} />
          </LineChart>
        );
      }
    `,
    normalizeIndent`
      import { LineChart } from '@coinbase/cds-web-visualization';
      const Component = () => {
        return <LineChart enableScrubbing={false} />;
      }
    `,
  ],
  invalid: [
    {
      code: normalizeIndent`
        import { LineChart } from '@coinbase/cds-web-visualization';
        const getScrubberAccessibilityLabel = (index) => String(index);
        const Component = () => {
          return (
            <LineChart
              enableScrubbing
              getScrubberAccessibilityLabel={getScrubberAccessibilityLabel}
            />
          );
        }
      `,
      errors: [{ messageId: 'missingChartAccessibleName' as const }],
    },
    {
      code: normalizeIndent`
        import { LineChart } from '@coinbase/cds-web-visualization';
        const Component = () => {
          return (
            <LineChart
              enableScrubbing
              accessibilityLabel="Price chart"
            />
          );
        }
      `,
      errors: [{ messageId: 'missingScrubberAccessibilityLabel' as const }],
    },
  ],
});
