import type { TSESLint } from '@typescript-eslint/utils';

import { controlHasAssociatedLabelExtended } from './rules/control-has-associated-label-extended';
import { hasValidA11yDescriptorsExtended } from './rules/has-valid-accessibility-descriptors-extended';
import { noV7Imports } from './rules/no-v7-imports';

export const rules = {
  'control-has-associated-label-extended': controlHasAssociatedLabelExtended,
  'has-valid-accessibility-descriptors-extended': hasValidA11yDescriptorsExtended,
  'no-v7-imports': noV7Imports,
} as const satisfies {
  [key: string]: TSESLint.RuleModule<string, []>;
};
