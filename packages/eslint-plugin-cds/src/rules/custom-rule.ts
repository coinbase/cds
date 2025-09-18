import { type TSESLint } from '@typescript-eslint/utils';

type MessageIds = 'messageOne' | 'messageTwo';

export const customRule: TSESLint.RuleModule<MessageIds> = {
  defaultOptions: [],
  meta: {
    type: 'problem',
    docs: {
      description: 'My custom rule description',
    },
    messages: {
      messageOne: 'Message one',
      messageTwo: 'Message two',
    },
    fixable: 'code',
    schema: [],
  },
  create(context) {
    return {
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
