import { $, argv } from 'zx'; // https://github.com/google/zx

import { getBuildInfo } from './getBuildInfo.mjs';

export function setEnvVars() {
  const { debug = false, newArchEnabled = false, jsEngine, profile, platform } = argv;
  const { ios, android, outputDirectory } = getBuildInfo();

  /**
   * Environment variables for Expo CLI builds
   */
  $.prefix += `
  export RCT_NO_LAUNCH_PACKAGER=1;
  export APP_PROFILE=${profile};
  export APP_PLATFORM=${platform};
  export APP_JS_ENGINE=${jsEngine};
  export APP_IOS_BUNDLE_IDENTIFIER=${ios.bundleIdentifier};
  export APP_ANDROID_PACKAGE_IDENTIFIER=${android.packageIdentifier};
  export EXPO_NO_TELEMETRY=1;
  export EXPO_USE_CUSTOM_INSPECTOR_PROXY=1;
  export BUILD_ARTIFACTS_DIR=${outputDirectory};
  export EXPO_NO_REDIRECT_PAGE=1;
  export EXPO_USE_UPDATES=1;
  `;

  if (debug) {
    $.prefix += `
    export DEBUG=*;
    export APP_DEBUG=1;
    export BUILD_SKIP_CLEANUP=1;
    export EXPO_PROFILE=1;
    `;
  }

  if (newArchEnabled) {
    $.prefix += `export APP_NEW_ARCH_ENABLED=1;`;
  }
}
