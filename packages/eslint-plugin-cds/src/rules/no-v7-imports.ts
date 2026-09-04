import type { TSESLint, TSESTree } from '@typescript-eslint/utils';

export const RULE_NAME = 'no-v7-imports';

type MessageIds = 'noV7Imports';

const CDS_PACKAGES = [
  '@coinbase/cds-common',
  '@coinbase/cds-icons',
  '@coinbase/cds-illustrations',
  '@coinbase/cds-mobile-visualization',
  '@coinbase/cds-mobile',
  '@coinbase/cds-web-visualization',
  '@coinbase/cds-web',
  '@coinbase/cds-lottie-files',
  '@coinbase/ui-mobile-playground',
  '@coinbase/cds-utils',
];

export const noV7Imports: TSESLint.RuleModule<MessageIds> = {
  meta: {
    docs: {
      description: 'Disallow v7 imports',
    },
    messages: {
      noV7Imports: 'CDS v7 imports will be removed soon. Please finish migrating to v8.',
    },
    schema: [],
    type: 'problem',
  },
  defaultOptions: [],
  create(context: TSESLint.RuleContext<MessageIds, []>) {
    return {
      ImportDeclaration(node: TSESTree.ImportDeclaration) {
        const sourceValue = node.source.value;
        if (typeof sourceValue !== 'string') {
          return;
        }

        const isV7Import = sourceValue.includes('/v7/');
        const isCdsPackage = CDS_PACKAGES.some((pkg) => sourceValue.startsWith(pkg));

        if (isV7Import && isCdsPackage) {
          context.report({
            node,
            messageId: 'noV7Imports',
          });
        }
      },
    };
  },
};
