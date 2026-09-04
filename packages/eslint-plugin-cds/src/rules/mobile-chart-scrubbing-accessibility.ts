import type { TSESTree } from '@typescript-eslint/utils';
import { ESLintUtils } from '@typescript-eslint/utils';

import { getAttribute } from '../utils/getAttribute';
import { getSimpleNameFromJSX } from '../utils/getSimpleNameFromJSX';
import { isTruthyJSXBooleanAttribute } from '../utils/isTruthyJSXBooleanAttribute';

const ruleCreator = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/coinbase/cds/blob/master/packages/eslint-plugin-cds/README.md#${name}`,
);

type MessageIds = 'missingChartAccessibleName' | 'missingGetScrubberAccessibilityLabel';

const config = {
  allowedPackages: [
    '@coinbase/cds-common',
    '@coinbase/cds-mobile',
    '@coinbase/cds-mobile-visualization',
  ],
  chartComponents: ['LineChart', 'BarChart', 'CartesianChart', 'AreaChart'],
};

export const mobileChartScrubbingAccessibility = ruleCreator({
  name: 'mobile-chart-scrubbing-accessibility',
  defaultOptions: [],
  meta: {
    type: 'problem',
    docs: {
      description:
        'Requires chart and scrubber accessibility labels when chart scrubbing is enabled on mobile charts.',
    },
    messages: {
      missingChartAccessibleName:
        "Missing chart accessible name on <{{componentName}}>. Add 'accessibilityLabel' or 'aria-labelledby'.",
      missingGetScrubberAccessibilityLabel:
        "Missing 'getScrubberAccessibilityLabel' on <{{componentName}}> when scrubbing is enabled.",
    },
    schema: [],
  },
  create(context) {
    const importedComponents: Record<string, string> = {};

    return {
      ImportDeclaration(node: TSESTree.ImportDeclaration) {
        const packageName = node.source.value;

        if (
          typeof packageName === 'string' &&
          config.allowedPackages.some(
            (pkg) => packageName === pkg || packageName.startsWith(`${pkg}/`),
          )
        ) {
          node.specifiers.forEach((specifier) => {
            importedComponents[specifier.local.name] = packageName;
          });
        }
      },
      JSXElement(node) {
        const componentName = getSimpleNameFromJSX(node.openingElement);
        if (!componentName || !config.chartComponents.includes(componentName)) {
          return;
        }

        if (!importedComponents[componentName]) {
          return;
        }

        const attributes = node.openingElement.attributes;
        const enableScrubbingAttribute = getAttribute(attributes, 'enableScrubbing');
        if (!enableScrubbingAttribute || !isTruthyJSXBooleanAttribute(enableScrubbingAttribute)) {
          return;
        }

        const hasAccessibilityLabel = Boolean(getAttribute(attributes, 'accessibilityLabel'));
        const hasAriaLabelledBy = Boolean(getAttribute(attributes, 'aria-labelledby'));
        if (!hasAccessibilityLabel && !hasAriaLabelledBy) {
          context.report({
            node,
            messageId: 'missingChartAccessibleName',
            data: { componentName },
          });
        }

        const hasGetScrubberAccessibilityLabel = Boolean(
          getAttribute(attributes, 'getScrubberAccessibilityLabel'),
        );

        if (!hasGetScrubberAccessibilityLabel) {
          context.report({
            node,
            messageId: 'missingGetScrubberAccessibilityLabel',
            data: { componentName },
          });
        }
      },
    };
  },
});
