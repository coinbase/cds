import path from 'path';
import { $, fs } from 'zx';

export async function buildIOS({ profile, ios }) {
  const buildConfiguration = profile === 'debug' ? 'Debug' : 'Release';
  const iosProjectPath = path.resolve('ios');
  const workspacePath = path.join(iosProjectPath, 'CDS.xcworkspace');
  const scheme = 'CDS';

  console.log(`Building iOS app with configuration: ${buildConfiguration}`);

  // Build directory for output
  const buildDir = path.resolve('build');
  await fs.ensureDir(buildDir);

  // Build command for simulator
  await $`xcodebuild -workspace ${workspacePath} -scheme ${scheme} -configuration ${buildConfiguration} -derivedDataPath ./build -destination 'generic/platform=iOS Simulator' build`;

  // Find the built app
  const appPath = path.join(
    buildDir,
    'Build',
    'Products',
    `${buildConfiguration}-iphonesimulator`,
    'CDS.app',
  );

  // Create tarball
  console.log(`Creating tarball: ${ios.tarball}`);
  await $`cd ${path.dirname(appPath)} && tar -czf ${path.resolve(ios.tarball)} ${path.basename(
    appPath,
  )}`;

  // Clean up build directory
  await $`rm -rf ${buildDir}`;

  console.log(`iOS build completed: ${ios.tarball}`);
}
