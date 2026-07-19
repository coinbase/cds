import { execSync, spawn } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';

import { PlatformBuilder } from './PlatformBuilder.mjs';
import { run, runCapture } from './shell.mjs';

export class AndroidBuilder extends PlatformBuilder {
  get android() {
    return this.buildInfo.android;
  }

  // ─────────────────────────────────────────────────────────────────
  // Build artifact management
  // ─────────────────────────────────────────────────────────────────

  async hasBuildArtifact() {
    try {
      await fs.access(this.android.apk);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Append release-size optimizations to the expo-prebuild-generated build.gradle.
   * expo prebuild regenerates this file on every build so we cannot commit edits
   * to it — patching after prebuild is the correct pattern.
   *
   * Appending a second android {} block is safe in Gradle (blocks are merged).
   */
  async #patchBuildGradle() {
    const buildGradlePath = path.join(this.android.projectPath, 'app', 'build.gradle');
    const patch = `
// Applied by apps/expo-app/scripts/utils/AndroidBuilder.mjs after expo prebuild.
// expo prebuild regenerates build.gradle, so edits must be re-applied here.
android {
    // arm64-v8a only: all BrowserStack Android devices are arm64.
    // Dropping x86/x86_64 native libs significantly reduces the APK size.
    splits {
        abi {
            enable true
            reset()
            include 'arm64-v8a'
            universalApk false
        }
    }
}
// Enable R8 code shrinking and resource shrinking for release builds.
android.buildTypes.release.minifyEnabled = true
android.buildTypes.release.shrinkResources = true
`;
    await fs.appendFile(buildGradlePath, patch, 'utf8');
    console.log('Patched android/app/build.gradle (ABI splits + R8).');
  }

  async compile() {
    const { outputPath } = this.buildInfo;
    const isDebug = this.buildInfo.profile === 'debug';
    const buildType = isDebug ? 'Debug' : 'Release';
    const buildTypeLC = buildType.toLowerCase();

    // Patch the freshly generated build.gradle before invoking Gradle.
    // Only needed for release — debug builds don't need size optimizations.
    if (!isDebug) {
      await this.#patchBuildGradle();
    }

    console.log(`Building Android app (${buildType})...`);

    await fs.mkdir(outputPath, { recursive: true });

    const gradleTask = isDebug ? 'assembleDebug' : 'assembleRelease';
    await run('./gradlew', [`:app:${gradleTask}`, '--no-daemon'], {
      cwd: this.android.projectPath,
    });

    // Copy the built APK to output directory
    const builtApkDir = path.join(
      this.android.projectPath,
      'app',
      'build',
      'outputs',
      'apk',
      buildTypeLC,
    );
    // ABI splits produce arm64-v8a-specific APKs; fall back to the universal name.
    const arm64ApkPath = path.join(builtApkDir, `app-arm64-v8a-${buildTypeLC}.apk`);
    const universalApkPath = path.join(builtApkDir, `app-${buildTypeLC}.apk`);

    let builtApkPath;
    try {
      await fs.access(arm64ApkPath);
      builtApkPath = arm64ApkPath;
    } catch {
      try {
        await fs.access(universalApkPath);
        builtApkPath = universalApkPath;
      } catch {
        throw new Error(`APK not found at ${arm64ApkPath} or ${universalApkPath}`);
      }
    }

    await fs.copyFile(builtApkPath, this.android.apk);
    console.log(`Android APK created: ${this.android.apk}`);
  }

  // ─────────────────────────────────────────────────────────────────
  // Emulator management
  // ─────────────────────────────────────────────────────────────────

  async isSimulatorRunning() {
    const output = await runCapture('adb', ['devices']);
    const lines = output.split('\n').slice(1); // Skip header
    return lines.some((line) => line.trim() && line.includes('\tdevice'));
  }

  async bootSimulator() {
    console.log('No Android emulator running, starting one...');

    const avdList = await runCapture('emulator', ['-list-avds']);
    const avds = avdList.trim().split('\n').filter(Boolean);

    if (avds.length === 0) {
      throw new Error('No Android Virtual Devices found. Create one in Android Studio first.');
    }

    const avd = avds[0];
    console.log(`Starting emulator: ${avd}`);

    // Start emulator in background (detached)
    spawn('emulator', ['-avd', avd], {
      detached: true,
      stdio: 'ignore',
    }).unref();

    console.log('Waiting for emulator to boot...');
    await run('adb', ['wait-for-device']);
  }

  async waitForSimulator() {
    const maxAttempts = 60;
    for (let i = 0; i < maxAttempts; i++) {
      try {
        const result = await runCapture('adb', ['shell', 'getprop', 'sys.boot_completed']);
        if (result.trim() === '1') return;
      } catch {
        // Device not ready yet
      }
      await new Promise((r) => setTimeout(r, 1000));
    }
    throw new Error('Emulator failed to boot within timeout');
  }

  // ─────────────────────────────────────────────────────────────────
  // App installation and launch
  // ─────────────────────────────────────────────────────────────────

  async extractArtifact() {
    // Android APKs don't need extraction
  }

  async install() {
    console.log('Installing on Android Emulator...');
    await run('adb', ['install', '-r', this.android.apk]);
  }

  async launch() {
    console.log(`Launching ${this.android.packageId}...`);
    await run('adb', ['shell', 'am', 'start', '-n', `${this.android.packageId}/.MainActivity`]);
  }

  async applyBundle(bundlePath) {
    const apk = path.resolve(this.android.apk);
    const patchDir = `/tmp/apk-patch-${Date.now()}`;
    const assetsDir = `${patchDir}/assets`;
    const patchedBundle = `${assetsDir}/index.android.bundle`;
    const alignedApk = `${apk}.aligned`;

    await fs.mkdir(assetsDir, { recursive: true });
    await fs.copyFile(bundlePath, patchedBundle);

    // Replace assets/index.android.bundle in the APK (cd into patchDir so zip path is correct)
    console.log(`\nPatching bundle into APK: ${apk}...`);
    execSync(`zip -u ${apk} assets/index.android.bundle`, { cwd: patchDir, stdio: 'inherit' });

    // Re-align (zip modification breaks alignment) then re-sign with debug keystore
    execSync(`zipalign -f 4 ${apk} ${alignedApk}`, { stdio: 'inherit' });
    await fs.rename(alignedApk, apk);

    const debugKeystore = path.resolve(process.env.HOME, '.android/debug.keystore');
    execSync(
      `apksigner sign --ks ${debugKeystore} --ks-pass pass:android --key-pass pass:android ${apk}`,
      { stdio: 'inherit' },
    );

    await fs.rm(patchDir, { recursive: true });

    console.log('Android bundle patched successfully.');
    console.log(`APK ready at: ${apk}`);
  }
}
