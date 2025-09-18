import { $, argv } from 'zx'; // https://github.com/google/zx

import { getBuildInfo } from './utils/getBuildInfo.mjs';
import { setEnvVars } from './utils/setEnvVars.mjs';

$.verbose = true;

const { android, ios } = getBuildInfo();
const { platform } = argv;

setEnvVars();

const archivePath = platform === 'android' ? android.apk.signed : ios.app;

if (platform === 'android') {
  await android.patchBundle();
}

if (platform === 'ios') {
  await ios.patchBundle();
}

// Install and run the built app using platform-specific tools
if (platform === 'ios') {
  await $`xcrun simctl install booted ${archivePath}`;
  const bundleId = ios.bundleIdentifier;
  await $`xcrun simctl launch booted ${bundleId}`;
} else {
  // For Android, install the APK
  await $`adb install ${archivePath}`;
  // Launch the app
  const packageId = android.packageIdentifier;
  await $`adb shell monkey -p ${packageId} -c android.intent.category.LAUNCHER 1`;
}
