import { argv } from 'zx';

import { getBuildInfo } from './utils/getBuildInfo.mjs';
import { setEnvVars } from './utils/setEnvVars.mjs';

setEnvVars();
const { ios, android } = getBuildInfo();

if (argv.platform === 'ios') await ios.patchBundle();
if (argv.platform === 'android') await android.patchBundle();
