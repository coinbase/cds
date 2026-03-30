import { shouldRunVisreg } from '../../../scripts/ci/shouldRunVisreg.mjs';

const RELEVANT_ROOTS = ['packages/common', 'packages/mobile', 'packages/mobile-visualization'];

if (!shouldRunVisreg(RELEVANT_ROOTS)) process.exit(1);
process.exit(0);
