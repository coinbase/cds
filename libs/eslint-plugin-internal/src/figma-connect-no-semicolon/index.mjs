import { ESLintUtils } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(() => null);

/**
 * Rule: figma-connect-no-semicolon
 *
 * Ensures that import strings in figma.connect() imports arrays do not contain trailing semicolons.
 * Code Connect parses semicolons incorrectly when they appear inside the import string.
 */
const rule = createRule({
  name: 'figma-connect-no-semicolon',
  meta: {
    type: 'problem',
    docs: {
      description:
        'Disallow semicolons inside Code Connect import strings. Code Connect parses semicolons incorrectly when they appear inside the import string.',
      recommended: 'error',
    },
    schema: [],
    messages: {
      noSemicolonInImportString:
        'Remove the semicolon from inside the import string. The semicolon should be outside the quotes.',
    },
    fixable: 'code',
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
        if (!importsProperty) {
          return;
        }

        const importsValue = importsProperty.value;
        if (importsValue.type !== 'ArrayExpression') {
          return;
        }

        // Check each element in the imports array
        importsValue.elements.forEach((element) => {
          if (element?.type === 'Literal' && typeof element.value === 'string') {
            const importString = element.value;

            // Check if the import string ends with a semicolon
            if (importString.endsWith(';')) {
              context.report({
                node: element,
                messageId: 'noSemicolonInImportString',
                fix(fixer) {
                  // Remove the trailing semicolon from the string literal
                  const sourceCode = context.sourceCode;
                  const text = sourceCode.getText(element);

                  // Handle both single and double quotes
                  const quote = text[0];
                  const withoutSemicolon = importString.slice(0, -1);
                  const fixedText = `${quote}${withoutSemicolon}${quote}`;

                  return fixer.replaceText(element, fixedText);
                },
              });
            }
          }
        });
      },
    };
  },
});

export default rule;
