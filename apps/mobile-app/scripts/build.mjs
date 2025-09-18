import { $, argv, fs } from 'zx';

import { buildAndroid } from './utils/buildAndroid.mjs';
import { buildIOS } from './utils/buildIOS.mjs';
import { getBuildInfo } from './utils/getBuildInfo.mjs';
import { setEnvVars } from './utils/setEnvVars.mjs';

$.verbose = true;

const { platform, profile } = argv;
const { ios, android, outputDirectory } = getBuildInfo();

setEnvVars();

// Ensure output directory exists
await fs.ensureDir(outputDirectory);

// Run prebuild to generate native projects
console.log(`Running prebuild for ${platform}...`);
await $`npx expo prebuild --platform ${platform} --clean`;

// Build for the specific platform
if (platform === 'ios') {
  await buildIOS({ profile, ios });
  await ios.unzip();
}

if (platform === 'android') {
  await buildAndroid({ profile, android });
  await android.unzip();
}
