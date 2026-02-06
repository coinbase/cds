import fs from 'node:fs/promises';

import { run } from './shell.mjs';

/**
 * Abstract base class for platform-specific build operations.
 * iOS and Android implement the abstract methods differently.
 */
export class PlatformBuilder {
  constructor(buildInfo) {
    this.buildInfo = buildInfo;
  }

  // ─────────────────────────────────────────────────────────────────
  // Abstract methods - must be implemented by subclasses
  // ─────────────────────────────────────────────────────────────────

  /** Check if the build artifact exists */
  async hasBuildArtifact() {
    throw new Error('Not implemented');
  }

  /** Compile the native app (xcodebuild / gradle) */
  async compile() {
    throw new Error('Not implemented');
  }

  /** Check if a simulator/emulator is currently running */
  async isSimulatorRunning() {
    throw new Error('Not implemented');
  }

  /** Boot a simulator/emulator */
  async bootSimulator() {
    throw new Error('Not implemented');
  }

  /** Wait for the simulator/emulator to be fully ready */
  async waitForSimulator() {
    throw new Error('Not implemented');
  }

  /** Extract build artifact if needed (e.g., untar .tar.gz) */
  async extractArtifact() {
    throw new Error('Not implemented');
  }

  /** Install the app on the simulator/emulator */
  async install() {
    throw new Error('Not implemented');
  }

  /** Launch the app */
  async launch() {
    throw new Error('Not implemented');
  }

  // ─────────────────────────────────────────────────────────────────
  // Shared methods - common to both platforms
  // ─────────────────────────────────────────────────────────────────

  /** Run expo prebuild to generate native project files */
  async prebuild() {
    const { platform } = this.buildInfo;
    console.log(`Running prebuild for ${platform}...`);
    await run('npx', ['expo', 'prebuild', '--platform', platform, '--clean']);
  }

  /** Full build: prebuild + compile */
  async build() {
    const { platform, profile, outputPath } = this.buildInfo;
    console.log(`Building ${platform} (${profile})...`);

    await fs.mkdir(outputPath, { recursive: true });
    await this.prebuild();
    await this.compile();
  }

  /** Build only if artifact doesn't exist */
  async buildIfNeeded() {
    if (!(await this.hasBuildArtifact())) {
      console.log('No build artifact found, building...');
      await this.build();
    }
  }

  /** Ensure simulator is running, boot if needed */
  async ensureSimulatorRunning() {
    if (!(await this.isSimulatorRunning())) {
      await this.bootSimulator();
    }
    await this.waitForSimulator();
  }

  /** Start Metro bundler */
  async startMetro() {
    console.log('\nStarting Metro bundler...');
    await run('npx', ['expo', 'start'], { interactive: true });
  }
}
