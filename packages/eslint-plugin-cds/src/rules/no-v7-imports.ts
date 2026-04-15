import type { TSESLint, TSESTree } from '@typescript-eslint/utils';

export const RULE_NAME = 'no-v7-imports';

type MessageIds = 'noV7Imports';

const CDS_PACKAGES = [
  '@cbhq/cds-common',
  '@cbhq/cds-icons',
  '@cbhq/cds-illustrations',
  '@cbhq/cds-mobile-visualization',
  '@cbhq/cds-mobile',
  '@cbhq/cds-web-visualization',
  '@cbhq/cds-web',
  '@cbhq/cds-lottie-files',
  '@cbhq/ui-mobile-playground',
  '@cbhq/cds-utils',
];

export const noV7Imports: TSESLint.RuleModule<MessageIds> = {
  meta: {
    docs: {
      description:
        'Disallow CDS v7 backward-compatibility imports that will be removed in CDS 9',
    },
    messages: {
      noV7Imports:
        'CDS v7 imports are deprecated and will be removed in CDS 9. Please migrate to the current CDS API.',
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

        const isV7Import = sourceValue.includes('/v7/') || sourceValue.endsWith('/v7');
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
