import { AST_NODE_TYPES, ESLintUtils, TSESTree } from '@typescript-eslint/utils';

import { getSimpleNameFromJSX } from '../utils/getSimpleNameFromJSX';

const ruleCreator = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/coinbase/cds/blob/master/packages/eslint-plugin-cds/README.md#${name}`,
);

type MessageIds =
  | 'missingChartAccessibleName'
  | 'missingScrubberAccessibilityLabel';

const config = {
  allowedPackages: ['@coinbase/cds-common', '@coinbase/cds-web-visualization', '@coinbase/cds-web'],
  chartComponents: ['LineChart', 'BarChart', 'CartesianChart', 'AreaChart'],
};

const getAttribute = (attributes: TSESTree.JSXOpeningElement['attributes'], name: string) => {
  return attributes.find(
    (attribute): attribute is TSESTree.JSXAttribute =>
      attribute.type === AST_NODE_TYPES.JSXAttribute && attribute.name.name === name,
  );
};

const isTruthyJSXBooleanAttribute = (attribute: TSESTree.JSXAttribute) => {
  if (attribute.value === null) {
    return true;
  }

  if (attribute.value.type === AST_NODE_TYPES.Literal) {
    return attribute.value.value === true;
  }

  if (
    attribute.value.type === AST_NODE_TYPES.JSXExpressionContainer &&
    attribute.value.expression.type === AST_NODE_TYPES.Literal
  ) {
    return attribute.value.expression.value === true;
  }

  return true;
};

const hasScrubberWithAccessibilityLabel = (node: TSESTree.JSXElement) => {
  return node.children.some((child) => {
    if (child.type !== AST_NODE_TYPES.JSXElement) {
      return false;
    }

    const childComponentName = getSimpleNameFromJSX(child.openingElement);
    if (childComponentName !== 'Scrubber') {
      return false;
    }

    const scrubberAccessibilityLabelAttribute = getAttribute(
      child.openingElement.attributes,
      'accessibilityLabel',
    );

    return Boolean(scrubberAccessibilityLabelAttribute);
  });
};

export const webChartScrubbingAccessibility = ruleCreator({
  name: 'web-chart-scrubbing-accessibility',
  defaultOptions: [],
  meta: {
    type: 'problem',
    docs: {
      description:
        'Requires chart and scrubber accessibility labels when chart scrubbing is enabled on web charts.',
    },
    messages: {
      missingChartAccessibleName:
        "Missing chart accessible name on <{{componentName}}>. Add 'accessibilityLabel' or 'aria-labelledby'.",
      missingScrubberAccessibilityLabel:
        "Missing scrubber accessibility label on <{{componentName}}>. Add 'getScrubberAccessibilityLabel' or a <Scrubber accessibilityLabel={...}> child.",
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
          config.allowedPackages.some((pkg) => packageName === pkg || packageName.startsWith(`${pkg}/`))
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

        const hasChildScrubberAccessibilityLabel = hasScrubberWithAccessibilityLabel(node);
        if (!hasGetScrubberAccessibilityLabel && !hasChildScrubberAccessibilityLabel) {
          context.report({
            node,
            messageId: 'missingScrubberAccessibilityLabel',
            data: { componentName },
          });
        }
      },
    };
  },
});
