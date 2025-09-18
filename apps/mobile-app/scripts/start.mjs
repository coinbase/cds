import { $, argv } from 'zx'; // https://github.com/google/zx

import { getBuildInfo } from './utils/getBuildInfo.mjs';
import { setEnvVars } from './utils/setEnvVars.mjs';

$.verbose = true;

const { platform } = argv;
const { ios } = getBuildInfo();

setEnvVars();

if (platform === 'ios') {
  await $`expo start --${argv.platform} --dev-client --localhost --scheme ${ios.bundleIdentifier}`;
}

if (platform === 'android') {
  await $`expo start --${argv.platform} --dev-client --localhost`;
}
