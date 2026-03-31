import { shouldRunVisreg } from '../../../scripts/ci/shouldRunVisreg.mjs';

const RELEVANT_ROOTS = [
  'apps/storybook',
  'packages/common',
  'packages/web',
  'packages/web-visualization',
  'packages/icons',
  'packages/illustrations',
];

if (!shouldRunVisreg(RELEVANT_ROOTS)) process.exit(1);
process.exit(0);
