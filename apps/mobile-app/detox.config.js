function isBuildkite() {
  return !!process.env.BUILDKITE;
}

function isGithubActions() {
  return !!process.env.GITHUB_ACTIONS;
}

function isCI() {
  return !!process.env.CI || isBuildkite() || isGithubActions();
}

/**
 * TODO: handle config automatically based on eas build profiles
 */
/** @type {Detox.DetoxConfig} */
const config = {
  testRunner: {
    args: {
      $0: 'jest',
      config: 'e2e/jest.config.js',
    },
  },
  apps: {
    'ios-debug': {
      type: 'ios.app',
      binaryPath: 'prebuilds/ios-debug-hermes.app',
    },
    'android-debug': {
      type: 'android.apk',
      binaryPath: 'prebuilds/android-debug-hermes/binary.apk',
      testBinaryPath: 'prebuilds/android-debug-hermes/testBinary.apk',
    },
    'ios-release': {
      type: 'ios.app',
      binaryPath: 'prebuilds/ios-release-hermes.app',
    },
    'android-release': {
      type: 'android.apk',
      binaryPath: 'prebuilds/android-release-hermes/binary.apk',
      testBinaryPath: 'prebuilds/android-release-hermes/testBinary.apk',
    },
  },
  devices: {
    simulator: {
      type: 'ios.simulator',
      device: {
        type: 'iPhone 16',
      },
    },
    emulator: {
      type: 'android.emulator',
      device: {
        avdName: isCI() ? 'cds_detox' : 'cds_detox_local',
      },
      bootArgs: isCI() ? '-skin 600x5000' : undefined,
    },
  },
  configurations: {
    'ios-debug': {
      device: 'simulator',
      app: 'ios-debug',
    },
    'android-debug': {
      device: 'emulator',
      app: 'android-debug',
    },
    'ios-release': {
      device: 'simulator',
      app: 'ios-release',
    },
    'android-release': {
      device: 'emulator',
      app: 'android-release',
    },
  },
};

module.exports = config;
