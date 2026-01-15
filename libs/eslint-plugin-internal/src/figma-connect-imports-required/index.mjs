import { ESLintUtils } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(() => null);

/**
 * Rule: figma-connect-imports-required
 *
 * Ensures that figma.connect() calls have a non-empty imports array.
 */
const rule = createRule({
  name: 'figma-connect-imports-required',
  meta: {
    type: 'problem',
    docs: {
      description: 'Require figma.connect() calls to have a non-empty imports array',
      recommended: 'error',
    },
    schema: [],
    messages: {
      missingImports: 'figma.connect() must have an "imports" property.',
      importsNotArray: 'The "imports" property must be an array.',
      emptyImports: 'The "imports" array must not be empty.',
    },
  },
  defaultOptions: [],
  create(context) {
    /**
     * Checks if a node is a figma.connect() call expression
     * @param {Object} node - The CallExpression node
     * @returns {boolean}
     */
    function isFigmaConnectCall(node) {
      const callee = node.callee;
      return (
        callee.type === 'MemberExpression' &&
        callee.object.type === 'Identifier' &&
        callee.object.name === 'figma' &&
        callee.property.type === 'Identifier' &&
        callee.property.name === 'connect'
      );
    }

    /**
     * Finds the imports property in a config object
     * @param {Object} configNode - The ObjectExpression node
     * @returns {Object|null} The imports property node if found
     */
    function findImportsProperty(configNode) {
      if (configNode.type !== 'ObjectExpression') {
        return null;
      }

      return configNode.properties.find(
        (prop) =>
          prop.type === 'Property' && prop.key.type === 'Identifier' && prop.key.name === 'imports',
      );
    }

    return {
      CallExpression(node) {
        if (!isFigmaConnectCall(node)) {
          return;
        }

        // figma.connect takes 3 arguments: Component, URL, config
        const configArg = node.arguments[2];
        if (!configArg || configArg.type !== 'ObjectExpression') {
          return;
        }

        const importsProperty = findImportsProperty(configArg);

        // Check if imports property exists
        if (!importsProperty) {
          context.report({
            node: configArg,
            messageId: 'missingImports',
          });
          return;
        }

        const importsValue = importsProperty.value;

        // Check if imports is an array
        if (importsValue.type !== 'ArrayExpression') {
          context.report({
            node: importsProperty,
            messageId: 'importsNotArray',
          });
          return;
        }

        // Check if array is empty
        if (importsValue.elements.length === 0) {
          context.report({
            node: importsProperty,
            messageId: 'emptyImports',
          });
        }
      },
    };
  },
});

export default rule;
