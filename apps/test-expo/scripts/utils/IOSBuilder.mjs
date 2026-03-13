import fs from 'node:fs/promises';
import path from 'node:path';

import { PlatformBuilder } from './PlatformBuilder.mjs';
import { run, runCapture } from './shell.mjs';

export class IOSBuilder extends PlatformBuilder {
  get ios() {
    return this.buildInfo.ios;
  }

  // ─────────────────────────────────────────────────────────────────
  // Build artifact management
  // ─────────────────────────────────────────────────────────────────

  async hasBuildArtifact() {
    try {
      await fs.access(this.ios.appTarball);
      return true;
    } catch {
      return false;
    }
  }

  async compile() {
    const { outputPath } = this.buildInfo;
    const configuration = this.buildInfo.profile === 'debug' ? 'Debug' : 'Release';

    if (this.ios.isDevice) {
      await this.#compileForDevice(configuration);
    } else {
      await this.#compileForSimulator(configuration, outputPath);
    }
  }

  async #compileForSimulator(configuration, outputPath) {
    const buildDir = path.resolve('build');

    console.log(`Building iOS app (${configuration}) for simulator...`);
    await run('xcodebuild', [
      '-workspace',
      this.ios.workspace,
      '-scheme',
      this.ios.scheme,
      '-configuration',
      configuration,
      '-destination',
      this.ios.destination,
      '-derivedDataPath',
      buildDir,
      'build',
    ]);

    // Find the built .app and create tarball
    const configFolder = `${configuration}-iphonesimulator`;
    const appPath = path.join(
      buildDir,
      'Build',
      'Products',
      configFolder,
      `${this.ios.scheme}.app`,
    );
    const appDir = path.dirname(appPath);
    const appName = path.basename(appPath);

    console.log(`Creating tarball: ${this.ios.appTarball}`);
    await run('tar', ['-czf', path.resolve(this.ios.appTarball), '-C', appDir, appName]);

    // Clean up
    await fs.rm(buildDir, { recursive: true, force: true });
    console.log(`iOS simulator build created: ${this.ios.appTarball}`);
  }

  async #compileForDevice(configuration) {
    const { outputPath } = this.buildInfo;

    console.log(`Archiving iOS app (${configuration}) for device...`);
    await run('xcodebuild', [
      '-workspace',
      this.ios.workspace,
      '-scheme',
      this.ios.scheme,
      '-configuration',
      configuration,
      '-destination',
      this.ios.destination,
      '-archivePath',
      this.ios.archivePath,
      'archive',
      'CODE_SIGN_IDENTITY=-',
      'AD_HOC_CODE_SIGNING_ALLOWED=YES',
    ]);

    console.log('Exporting IPA...');
    await run('xcodebuild', [
      '-exportArchive',
      '-archivePath',
      this.ios.archivePath,
      '-exportPath',
      outputPath,
      '-exportOptionsPlist',
      this.ios.exportOptionsPlist,
      '-allowProvisioningUpdates',
    ]);

    // Rename if needed
    const exportedIpa = path.join(outputPath, `${this.ios.scheme}.ipa`);
    try {
      await fs.access(exportedIpa);
      await fs.rename(exportedIpa, this.ios.ipa);
    } catch {
      // Already named correctly
    }

    // Clean up archive
    await fs.rm(this.ios.archivePath, { recursive: true, force: true });
    console.log(`iOS device build created: ${this.ios.ipa}`);
  }

  // ─────────────────────────────────────────────────────────────────
  // Simulator management
  // ─────────────────────────────────────────────────────────────────

  async isSimulatorRunning() {
    const output = await runCapture('xcrun', ['simctl', 'list', 'devices', 'booted', '-j']);
    const json = JSON.parse(output);
    const bootedDevices = Object.values(json.devices).flat();
    return bootedDevices.length > 0;
  }

  async bootSimulator() {
    console.log('No iOS Simulator running, booting one...');

    // Find an available iPhone
    const output = await runCapture('xcrun', ['simctl', 'list', 'devices', 'available', '-j']);
    const json = JSON.parse(output);

    let deviceUDID = null;
    let deviceName = null;

    for (const [runtime, devices] of Object.entries(json.devices)) {
      if (runtime.includes('iOS')) {
        const iphone = devices.find((d) => d.name.includes('iPhone') && d.isAvailable);
        if (iphone) {
          deviceUDID = iphone.udid;
          deviceName = iphone.name;
          break;
        }
      }
    }

    if (!deviceUDID) {
      throw new Error('No available iPhone simulator found.');
    }

    console.log(`Booting ${deviceName}...`);
    await run('xcrun', ['simctl', 'boot', deviceUDID]);
    await run('open', ['-a', 'Simulator']);
  }

  async waitForSimulator() {
    await run('xcrun', ['simctl', 'bootstatus', 'booted', '-b']);
  }

  // ─────────────────────────────────────────────────────────────────
  // App installation and launch
  // ─────────────────────────────────────────────────────────────────

  async extractArtifact() {
    try {
      await fs.access(this.ios.app);
    } catch {
      console.log(`Extracting ${this.ios.appTarball}...`);
      await run('tar', ['-xzf', this.ios.appTarball, '-C', this.buildInfo.outputPath]);
    }
  }

  async install() {
    await this.extractArtifact();
    console.log('Installing on iOS Simulator...');
    await run('xcrun', ['simctl', 'install', 'booted', this.ios.app]);
  }

  async launch() {
    console.log(`Launching ${this.ios.bundleId}...`);
    await run('xcrun', ['simctl', 'launch', 'booted', this.ios.bundleId]);
  }

  async applyBundle(bundlePath) {
    const outBundle = `${this.ios.app}/main.jsbundle`;
    console.log(`\nCopying bundle → ${outBundle}...`);
    await fs.copyFile(bundlePath, outBundle);
    console.log('iOS bundle patched successfully.');
    console.log(`App ready at: ${this.ios.app}`);
  }
}
