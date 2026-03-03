import { ESLintUtils } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator((name) => null);

const hasWorkletDirective = (functionNode) => {
  if (!functionNode?.body || functionNode.body.type !== 'BlockStatement') {
    return false;
  }

  const firstStatement = functionNode.body.body[0];
  return (
    firstStatement?.type === 'ExpressionStatement' &&
    firstStatement.expression?.type === 'Literal' &&
    firstStatement.expression.value === 'worklet'
  );
};

const isInsideWorkletFunction = (node) => {
  let current = node.parent;

  while (current) {
    if (
      current.type === 'FunctionDeclaration' ||
      current.type === 'FunctionExpression' ||
      current.type === 'ArrowFunctionExpression'
    ) {
      return hasWorkletDirective(current);
    }
    current = current.parent;
  }

  return false;
};

const rule = createRule({
  name: 'no-object-rest-spread-in-worklet',
  meta: {
    type: 'problem',
    docs: {
      description:
        'Disallow object rest/spread inside Reanimated worklets to avoid non-worklet helper calls on the UI thread',
      recommended: 'error',
    },
    schema: [],
    messages: {
      noObjectRestSpreadInWorklet:
        'Do not use object rest/spread inside a worklet. Reanimated may transpile this into non-worklet helpers and crash on the UI thread.',
    },
  },
  defaultOptions: [],
  create(context) {
    const reportIfWorklet = (node) => {
      if (!isInsideWorkletFunction(node)) {
        return;
      }

      context.report({
        node,
        messageId: 'noObjectRestSpreadInWorklet',
      });
    };

    return {
      'ObjectPattern > RestElement': reportIfWorklet,
      'ObjectExpression > SpreadElement': reportIfWorklet,
    };
  },
});

export default rule;
