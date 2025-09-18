import path from 'path';
import { $, fs } from 'zx';

export async function buildAndroid({ profile, android }) {
  const androidProjectPath = path.resolve('android');
  const isDebug = profile === 'debug';
  const buildType = isDebug ? 'Debug' : 'Release';

  console.log(`Building Android app with build type: ${buildType}`);

  // Set up gradle command based on profile
  let gradleTasks;
  if (isDebug) {
    gradleTasks = [':app:assembleDebug', ':app:assembleAndroidTest', '-DtestBuildType=debug'];
  } else {
    gradleTasks = [':app:assembleRelease', ':app:assembleAndroidTest', '-DtestBuildType=release'];
  }

  // Build the APK
  await $`cd ${androidProjectPath} && ./gradlew ${gradleTasks} --no-daemon`;

  // Find the built APKs
  const buildOutputDir = path.join(androidProjectPath, 'app', 'build', 'outputs', 'apk');
  const testOutputDir = path.join(buildOutputDir, 'androidTest', profile);
  const appOutputDir = path.join(buildOutputDir, profile);

  // Create output directory for our builds
  const outputDir = path.dirname(android.zipFile);
  await fs.ensureDir(outputDir);

  // Create a temporary directory for the zip contents
  const tempDir = path.join(outputDir, 'temp');
  await fs.ensureDir(tempDir);

  // Create the expected directory structure for the zip
  const testFolder = path.join(tempDir, 'androidTest', profile);
  const buildFolder = path.join(tempDir, profile);
  await fs.ensureDir(testFolder);
  await fs.ensureDir(buildFolder);

  // Copy APKs to the temporary directory with expected names
  const appApkName = `app-${profile}.apk`;
  const testApkName = `app-${profile}-androidTest.apk`;

  // Find and copy the actual APK files
  const appApkSource = path.join(appOutputDir, appApkName);
  const testApkSource = path.join(testOutputDir, testApkName);

  await fs.copy(appApkSource, path.join(buildFolder, appApkName));
  await fs.copy(testApkSource, path.join(testFolder, testApkName));

  // Create the zip file (tar format to match the original unzip logic)
  console.log(`Creating archive: ${android.zipFile}`);
  await $`cd ${tempDir} && zip -r ${path.resolve(android.zipFile)} .`;

  // Clean up temporary directory
  await $`rm -rf ${tempDir}`;

  console.log(`Android build completed: ${android.zipFile}`);
}
