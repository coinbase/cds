import { spawn } from 'node:child_process';
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

  async compile() {
    const { outputPath } = this.buildInfo;
    const isDebug = this.buildInfo.profile === 'debug';
    const buildType = isDebug ? 'Debug' : 'Release';
    const buildTypeLC = buildType.toLowerCase();

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
    const builtApkPath = path.join(builtApkDir, `app-${buildTypeLC}.apk`);

    try {
      await fs.access(builtApkPath);
      await fs.copyFile(builtApkPath, this.android.apk);
      console.log(`Android APK created: ${this.android.apk}`);
    } catch {
      throw new Error(`APK not found at ${builtApkPath}`);
    }
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
}
