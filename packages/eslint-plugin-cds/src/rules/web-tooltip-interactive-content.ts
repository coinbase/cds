import type { TSESTree } from '@typescript-eslint/utils';
import { AST_NODE_TYPES, ESLintUtils } from '@typescript-eslint/utils';

import { getSimpleNameFromJSX } from '../utils/getSimpleNameFromJSX';
import { isTruthyJSXBooleanAttribute } from '../utils/isTruthyJSXBooleanAttribute';

const ruleCreator = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/coinbase/cds/blob/master/packages/eslint-plugin-cds/README.md#${name}`,
);

type MessageIds = 'missingHasInteractiveContent';

const config = {
  allowedPackages: ['@coinbase/cds-common', '@coinbase/cds-web'],
  tooltipComponents: ['Tooltip'],
  interactiveElementNames: [
    'a',
    'button',
    'input',
    'select',
    'textarea',
    'Button',
    'IconButton',
    'Pressable',
    'Link',
    'Text',
  ],
};

const hasInteractiveAttributes = (attributes: TSESTree.JSXOpeningElement['attributes']) => {
  return attributes.some((attribute) => {
    if (attribute.type !== AST_NODE_TYPES.JSXAttribute) {
      return false;
    }

    const attributeName = attribute.name.name;
    return attributeName === 'onClick' || attributeName === 'onPress' || attributeName === 'href';
  });
};

const isInteractiveJSXNode = (
  node: TSESTree.JSXElement | TSESTree.JSXFragment | TSESTree.Expression,
): boolean => {
  if (node.type === AST_NODE_TYPES.JSXElement) {
    const elementName = getSimpleNameFromJSX(node.openingElement);
    if (elementName && config.interactiveElementNames.includes(elementName)) {
      return true;
    }

    if (hasInteractiveAttributes(node.openingElement.attributes)) {
      return true;
    }

    return node.children.some((child) => {
      if (child.type === AST_NODE_TYPES.JSXElement || child.type === AST_NODE_TYPES.JSXFragment) {
        return isInteractiveJSXNode(child);
      }
      if (child.type === AST_NODE_TYPES.JSXExpressionContainer) {
        const childExpression = child.expression;
        if (
          childExpression.type === AST_NODE_TYPES.JSXElement ||
          childExpression.type === AST_NODE_TYPES.JSXFragment
        ) {
          return isInteractiveJSXNode(childExpression);
        }
      }
      return false;
    });
  }

  if (node.type === AST_NODE_TYPES.JSXFragment) {
    return node.children.some((child) => {
      if (child.type === AST_NODE_TYPES.JSXElement || child.type === AST_NODE_TYPES.JSXFragment) {
        return isInteractiveJSXNode(child);
      }
      if (child.type === AST_NODE_TYPES.JSXExpressionContainer) {
        const childExpression = child.expression;
        if (
          childExpression.type === AST_NODE_TYPES.JSXElement ||
          childExpression.type === AST_NODE_TYPES.JSXFragment
        ) {
          return isInteractiveJSXNode(childExpression);
        }
      }
      return false;
    });
  }

  return false;
};

export const webTooltipInteractiveContent = ruleCreator({
  name: 'web-tooltip-interactive-content',
  defaultOptions: [],
  meta: {
    type: 'problem',
    docs: {
      description:
        'Requires hasInteractiveContent when Tooltip content contains interactive elements.',
    },
    messages: {
      missingHasInteractiveContent: `Missing 'hasInteractiveContent' on <{{componentName}}> when tooltip content is interactive.`,
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
        if (!componentName || !config.tooltipComponents.includes(componentName)) {
          return;
        }

        if (!importedComponents[componentName]) {
          return;
        }

        const attributes = node.openingElement.attributes;
        const contentAttribute = attributes.find(
          (attribute): attribute is TSESTree.JSXAttribute =>
            attribute.type === AST_NODE_TYPES.JSXAttribute && attribute.name.name === 'content',
        );

        if (!contentAttribute || !contentAttribute.value) {
          return;
        }

        const hasInteractiveContentAttribute = attributes.some((attribute) => {
          if (
            attribute.type !== AST_NODE_TYPES.JSXAttribute ||
            attribute.name.name !== 'hasInteractiveContent'
          ) {
            return false;
          }
          return isTruthyJSXBooleanAttribute(attribute);
        });

        if (hasInteractiveContentAttribute) {
          return;
        }

        if (contentAttribute.value.type === AST_NODE_TYPES.Literal) {
          return;
        }

        if (contentAttribute.value.type === AST_NODE_TYPES.JSXExpressionContainer) {
          const expression = contentAttribute.value.expression;

          if (
            expression.type !== AST_NODE_TYPES.JSXElement &&
            expression.type !== AST_NODE_TYPES.JSXFragment
          ) {
            return;
          }

          const isInteractive = isInteractiveJSXNode(expression);
          if (!isInteractive) {
            return;
          }

          context.report({
            node,
            messageId: 'missingHasInteractiveContent',
            data: { componentName },
          });
        }
      },
    };
  },
});
