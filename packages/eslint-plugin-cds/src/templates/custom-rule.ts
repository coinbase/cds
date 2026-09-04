/**
 * Template for creating a new ESLint rule.
 *
 * To use this template:
 * 1. Copy this file and rename it to match your rule (e.g. `no-foo-bar.ts`).
 * 2. Update the exported constant name, MessageIds, and rule logic.
 * 3. Register the rule in `src/rules.ts`.
 * 4. Add the rule to the appropriate config in `src/configs/`.
 * 5. Write tests in `tests/<rule-name>.test.ts` (see `tests/custom-rule.test.ts` for a template).
 * 6. Document the rule in the README.
 *
 * Alternatively, run the generator script:
 *   yarn node packages/eslint-plugin-cds/scripts/scaffold-new-rule.mjs <rule-name>
 */
import { type TSESLint } from '@typescript-eslint/utils';

/**
 * Union type of all message IDs this rule can report.
 * Each key must have a corresponding entry in `meta.messages`.
 */
type MessageIds = 'messageOne' | 'messageTwo';

export const customRule: TSESLint.RuleModule<MessageIds> = {
  defaultOptions: [],
  meta: {
    /**
     * Rule type:
     * - 'problem':    the rule identifies code that will cause an error or unexpected behavior
     * - 'suggestion': the rule identifies code that could be improved but won't cause errors
     * - 'layout':     the rule enforces stylistic conventions (whitespace, semicolons, etc.)
     */
    type: 'problem',
    docs: {
      description: 'A short description of what this rule enforces',
    },
    messages: {
      messageOne: 'First error message shown to the user',
      messageTwo: 'Second error message shown to the user',
    },
    /**
     * Set to 'code' if the rule provides automatic fixes via `context.report({ fix })`.
     * Set to undefined/remove if the rule does not provide fixes.
     */
    fixable: 'code',
    schema: [],
  },
  create(context) {
    return {
      /**
       * AST visitor methods. The method name corresponds to an AST node type.
       * Use https://astexplorer.net/ (with @typescript-eslint/parser) to find
       * the right node types for the code patterns you want to lint.
       *
       * Common node types:
       * - ImportDeclaration: import statements
       * - JSXOpeningElement: JSX tags like <Button />
       * - CallExpression: function calls like foo()
       * - Identifier: variable/function names
       * - MemberExpression: property access like obj.prop
       */
      Identifier(node) {
        if (node.name === 'foo') {
          context.report({
            node,
            messageId: 'messageOne',
            data: { nodeName: node.name },
          });
        } else if (node.name === 'bar') {
          context.report({
            node,
            messageId: 'messageTwo',
            data: { nodeName: node.name },
          });
        }
      },
    };
  },
};
