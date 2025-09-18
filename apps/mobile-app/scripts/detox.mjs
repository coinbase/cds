import { $, argv, within } from 'zx'; // https://github.com/google/zx

import detoxConfig from '../detox.config.js';

import { isCI } from './utils/env.mjs';
import { getAffectedRoutes } from './utils/getAffectedRoutes.mjs';
import { getBuildInfo } from './utils/getBuildInfo.mjs';
import { setEnvVars } from './utils/setEnvVars.mjs';

$.verbose = true;

const { platform, profile, jsEngine } = argv;

const { commonChanged, affectedRouteKeys } = await getAffectedRoutes();

const runAll = process.env.DETOX_RUN_ALL === 'true';

// Only run detox if packages/common or code in a route's parent directory changed, or DETOX_RUN_ALL is true
if (!runAll && !commonChanged && !affectedRouteKeys.length) {
  console.log('No relevant changes to test, skipping detox');
  process.exit(0);
}

// Set the affected route keys for playgroundRoutes.e2e.ts, and flag as Percy partial build
if (!runAll && !commonChanged) {
  console.log('Only testing routes affected by changes:', affectedRouteKeys);
  process.env.DETOX_AFFECTED_ROUTE_KEYS = affectedRouteKeys.join(',');
  process.env.PERCY_PARTIAL_BUILD = '1';
} else console.log('Testing all routes');

const { ios, android } = getBuildInfo();

setEnvVars();

if (platform === 'android') {
  const targetAvd = detoxConfig.devices.emulator.device.avdName;
  const { stdout: platformsAsString } = await $`ls ${process.env.ANDROID_SDK_ROOT}/platforms`;
  const { stdout: buildToolsAsString } = await $`ls ${process.env.ANDROID_SDK_ROOT}/build-tools`;
  const { stdout: emulatorsAsString } = await $`avdmanager list avd --compact`;
  const platforms = platformsAsString.split('\n');
  const buildTools = buildToolsAsString.split('\n');
  const emulators = emulatorsAsString.split('\n');
  const doesNotHavePlatform = !platforms.includes(`android-${android.sdkVersions.platform}`);
  const doesNotHaveBuildTools = !buildTools.includes(android.sdkVersions.buildTools);
  const doesNotHaveEmulator = !emulators.includes(targetAvd);

  if (doesNotHavePlatform) {
    await $`sdkmanager "platforms;android-${android.sdkVersions.platform}"`;
  }

  if (doesNotHaveBuildTools) {
    await $`sdkmanager "build-tools;${android.sdkVersions.buildTools}"`;
  }

  if (doesNotHaveEmulator) {
    const architecture = isCI ? android.architectures.ubuntu : android.architectures.m1;
    const androidSdk = `system-images;android-${android.sdkVersions.systemImage};default;${architecture}`;

    await $`sdkmanager ${androidSdk}`;
    await $`echo no | avdmanager create avd --force --name ${targetAvd} --package ${androidSdk}`;
  }
}

if (profile === 'debug') {
  within(async () => {
    await $`cd ../../ && yarn nx run mobile-app:launch --profile ${profile} --jsEngine ${jsEngine} --platform ${platform}`;
    await $`cd ../../ && yarn nx run mobile-app:start --profile ${profile} --jsEngine ${jsEngine} --platform ${platform}`;
  });
}

if (profile === 'release') {
  if (platform === 'android') await android.patchBundle();
  if (platform === 'ios') await ios.patchBundle();
}

// Rebuild Detox cache on MacOS to mitigate errors from Xcode updates
if (platform === 'ios') {
  await $`yarn workspace mobile-app detox rebuild-framework-cache`;
}

// Clear Jest cache
await $`yarn workspace mobile-app detox test --configuration ${platform}-${profile} --clearCache`;

const platformOptions = platform === 'android' ? '--force-adb-install' : '';

if (isCI) {
  await $`yarn workspace mobile-app detox test --configuration ${platform}-${profile} --headless --cleanup ${platformOptions}`;
} else {
  await $`yarn workspace mobile-app detox test --loglevel verbose --configuration ${platform}-${profile} --cleanup ${platformOptions}`;
}
