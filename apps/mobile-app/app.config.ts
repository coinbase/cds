import type { ExpoConfig } from '@expo/config-types';

const expo: ExpoConfig = {
  name: 'CDS',
  slug: 'cds',
  scheme: 'cds',
  owner: 'ui-systems',
  orientation: 'default',
  icon: './assets/icon-debug-hermes.png',
  userInterfaceStyle: 'automatic',
  splash: {
    image: './assets/splash-debug-hermes.png',
    resizeMode: 'contain',
    backgroundColor: '#D058C1',
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.ui-systems.cds',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#D058C1',
    },
    package: 'com.ui_systems.cds',
  },
  plugins: [
    [
      'expo-build-properties',
      {
        android: {
          packagingOptions: {
            // Required for Detox Android test builds
            // https://docs.expo.dev/build-reference/e2e-tests/#51-patch-buildgradle
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
  ],
};

export default { expo };
