import { getExpoSDKVersion } from '@expo/config';
import type { ExpoConfig } from '@expo/config-types';

const profile = process.env.APP_PROFILE ?? ('debug' as const);
const jsEngine = process.env.APP_JS_ENGINE ?? ('hermes' as const);
const newArchEnabled = process.env.APP_NEW_ARCH_ENABLED === '1';
const bundleIdentifier = process.env.APP_IOS_BUNDLE_IDENTIFIER ?? 'com.ui-systems.debug-ios-hermes';
const packageIdentifier =
  process.env.APP_ANDROID_PACKAGE_IDENTIFIER ?? 'com.ui_systems.debug_hermes';

const lookupKey = `${profile}-${jsEngine}` as const;
const iconName = `icon-${lookupKey}` as const;
const splashName = `splash-${lookupKey}` as const;
const splashColor = {
  'debug-jsc': '#44C28D',
  'debug-hermes': '#D058C1',
  'release-jsc': '#E7C95B',
  'release-hermes': '#06BEEC',
}[lookupKey];

const expo: ExpoConfig = {
  name: 'CDS',
  slug: 'cds', // we might need to change so it's unique across builds for deep linking
  scheme: 'cds',
  owner: 'ui-systems',
  extra: {},
  runtimeVersion: {
    policy: 'sdkVersion',
  },
  orientation: 'default' as const,
  icon: `./assets/${iconName}.png`,

  sdkVersion: getExpoSDKVersion(__dirname),
  jsEngine,
  userInterfaceStyle: 'automatic' as const,
  splash: {
    image: `./assets/${splashName}.png`, // TODO: dynamically generate based on jsEngine https://github.com/expo/fyi/blob/main/black-screen-before-splash.md
    resizeMode: 'contain',
    backgroundColor: splashColor,
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: splashColor,
    },
    package: packageIdentifier,
  },
  plugins: [
    [
      'expo-build-properties',
      {
        ios: {
          newArchEnabled,
        },
        android: {
          kotlinVersion: '1.8.0',
          newArchEnabled,
          /**
           * https://docs.expo.dev/build-reference/e2e-tests/#51-patch-buildgradle
           * Temporary patch required until detox integration is first class
           *
           * The Android build command that we use to produce the test build is ./gradlew :app:assembleRelease :app:assembleAndroidTest -DtestBuildType=release
           * Notice that it consists of two Gradle tasks. Unfortunately, when building the *AndroidTest task, some versions of the expo-modules-core module change
           * what native libraries are included in the app binary. Those settings don't work with settings for assembleRelease.
           * To fix the problem, add the pickFirsts list under android.packagingOptions in your android/app/build.gradle.
           * The pickFirsts property overrides the setting for your project.
           */
          packagingOptions: {
            /** https://docs.expo.dev/versions/latest/sdk/build-properties/#pluginconfigtypeandroidpackagingoptions */
            pickFirst: [
              'lib/**/libc++_shared.so',
              'lib/**/libreactnativejni.so',
              'lib/**/libreact_nativemodule_core.so',
              'lib/**/libglog.so',
              'lib/**/libjscexecutor.so',
              'lib/**/libfbjni.so',
              'lib/**/libfolly_json.so',
              'lib/**/libfolly_runtime.so',
              'lib/**/libhermes.so',
              'lib/**/libjsi.so',
            ],
          },
        },
      },
    ],
    '@config-plugins/detox',
    [
      'expo-gradle-ext-vars',
      {
        androidXBrowser: '1.5.0',
      },
    ],
  ],
};

export default {
  expo,
};
