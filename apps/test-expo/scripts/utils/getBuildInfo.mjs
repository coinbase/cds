import path from 'node:path';

const OUTPUT_DIRECTORY = 'builds';
const APP_NAME = 'testexpo';
const IOS_SCHEME = 'testexpo';
const IOS_BUNDLE_ID = 'com.anonymous.test-expo';
const ANDROID_PACKAGE_ID = 'com.anonymous.testexpo';

export function getBuildInfo({ platform, profile, target = 'simulator' }) {
  const isDevice = target === 'device';
  // Default builds are for simulator/emulator, device builds get -device suffix
  const buildId = isDevice ? `${platform}-${profile}-device` : `${platform}-${profile}`;
  const outputPath = `${OUTPUT_DIRECTORY}/${buildId}`;

  const ios = {
    scheme: IOS_SCHEME,
    bundleId: IOS_BUNDLE_ID,
    workspace: path.resolve('ios', 'testexpo.xcworkspace'),
    isDevice,
    destination: isDevice ? 'generic/platform=iOS' : 'generic/platform=iOS Simulator',
    archivePath: `${outputPath}/${APP_NAME}.xcarchive`,
    app: `${outputPath}/${APP_NAME}.app`,
    appTarball: `${outputPath}/${APP_NAME}.tar.gz`,
    ipa: `${outputPath}/${APP_NAME}.ipa`,
    exportOptionsPlist: path.resolve('scripts/utils/exportOptions.plist'),
  };

  const android = {
    packageId: ANDROID_PACKAGE_ID,
    projectPath: path.resolve('android'),
    apk: `${outputPath}/${APP_NAME}.apk`,
    testApk: `${outputPath}/${APP_NAME}-androidTest.apk`,
  };

  return {
    platform,
    profile,
    target,
    buildId,
    outputDirectory: OUTPUT_DIRECTORY,
    outputPath,
    ios,
    android,
  };
}
