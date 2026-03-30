import type { TSESLint } from '@typescript-eslint/utils';

import { controlHasAssociatedLabelExtended } from './rules/control-has-associated-label-extended';
import { hasValidA11yDescriptorsExtended } from './rules/has-valid-accessibility-descriptors-extended';
import { mobileChartScrubbingAccessibility } from './rules/mobile-chart-scrubbing-accessibility';
import { noV7Imports } from './rules/no-v7-imports';
import { webChartScrubbingAccessibility } from './rules/web-chart-scrubbing-accessibility';
import { webTooltipInteractiveContent } from './rules/web-tooltip-interactive-content';

export const rules = {
  'control-has-associated-label-extended': controlHasAssociatedLabelExtended,
  'has-valid-accessibility-descriptors-extended': hasValidA11yDescriptorsExtended,
  'mobile-chart-scrubbing-accessibility': mobileChartScrubbingAccessibility,
  'no-v7-imports': noV7Imports,
  'web-chart-scrubbing-accessibility': webChartScrubbingAccessibility,
  'web-tooltip-interactive-content': webTooltipInteractiveContent,
} as const satisfies {
  [key: string]: TSESLint.RuleModule<string, []>;
};
