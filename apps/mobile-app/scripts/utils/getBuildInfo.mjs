import path from 'node:path';
import { $, argv, glob } from 'zx'; // https://github.com/google/zx

import credentials from '../../credentials.json' with { type: 'json' };

$.verbose = true;

const outputDirectory = 'prebuilds';
const filePath = new URL(import.meta.url).pathname;
const scriptUtilsDirectory = path.dirname(filePath);
const { platform, profile, jsEngine, newArchEnabled = false } = argv;

async function patchBundleForPlatform({ platform: platformParam, fileToPatch }) {
  await $`expo export --output-dir lib -p ${platformParam}`;
  const matches = await glob([`lib/_expo/static/js/${platformParam}/index-*`]);
  if (matches.length) {
    const jsBundle = matches[0];
    await $`mv ${jsBundle} ${fileToPatch}`;
    await $`rm -rf lib`;
  } else {
    throw new Error(`Unable to find jsbundle for ${platformParam}`);
  }
}

export function getBuildInfo() {
  const kebabCaseId = `${platform}-${profile}-${jsEngine}${newArchEnabled ? '-newArch' : ''}`;
  const snakeCaseId = kebabCaseId.replaceAll('-', '_');
  const outputName = `${outputDirectory}/${kebabCaseId}`;

  const ios = {
    tarball: `${outputName}.tar.gz`,
    bundleIdentifier: `com.ui-systems.${kebabCaseId}`,
    app: `${outputName}.app`,
    unzip: async function unzip() {
      await $`rm -rf ${this.app}`;
      await $`tar -zxvf ${this.tarball}`;
      await $`mv CDS.app ${this.app}`;
    },
    patchBundle: async function patchBundle() {
      if (process.env.SKIP_PATCH_BUNDLE) return;
      await this.unzip();
      if (profile !== 'debug') {
        await patchBundleForPlatform({
          platform: 'ios',
          fileToPatch: `${this.app}/main.jsbundle`,
        });
      }
    },
  };

  const android = {
    sdkVersions: {
      platform: '34',
      buildTools: '35.0.0',
      systemImage: '30',
    },
    zipFile: `${outputName}.zip`,
    packageIdentifier: `com.ui_systems.${snakeCaseId}`,
    keystore: credentials.android.keystore,
    apk: {
      contents: `${outputName}/build`,
      rebuilt: `${outputName}/binary-rebuilt.apk`,
      rebuiltAligned: `${outputName}/binary-rebuilt-aligned.apk`,
      signed: `${outputName}/binary.apk`,
    },
    testApk: `${outputName}/testBinary.apk`,
    // https://expo.canny.io/feature-requests/p/add-reactnativearchitecture-support-in-expo-build-properties
    // There archs are also set in eas.json, ORG_GRADLE_PROJECT_reactNativeArchitectures env variable
    architectures: {
      ubuntu: 'x86_64',
      m1: 'arm64-v8a',
    },
    getBuildTool: async function getBuildTool(name) {
      return path.join(
        process.env.ANDROID_SDK_ROOT,
        'build-tools',
        this.sdkVersions.buildTools,
        name,
      );
    },
    unzip: async function unzip() {
      await $`rm -rf ${outputName}`;
      await $`mkdir -p ${outputName}`;
      const testFolder = `${outputName}/androidTest/${profile}`;
      const buildFolder = `${outputName}/${profile}`;
      await $`tar -xf ${this.zipFile} -C ${outputName}`;
      await $`mv ${testFolder}/app-${profile}-androidTest.apk ${this.testApk}`;
      await $`mv ${buildFolder}/app-${profile}.apk ${this.apk.signed}`;
      await $`rm -rf ${path.dirname(testFolder)} && rm -rf ${buildFolder}`;
    },
    /**
     * What's java -jar?
     * https://bitbucket.org/iBotPeaches/apktool/downloads/
     * Instead of installing apktool locally and in CI, we commit the apktool.jar and
     * run executable via java -jar and point to the .jar file we commit.
     *
     * Why String.split?
     * https://github.com/google/zx/blob/main/docs/quotes.md#array-of-arguments
     * zx escapes and adds quotes to any interpolations used in a $ command.
     * Because this string as command + args we have to convert it into an array of args
     * to avoid it being treated as one single string when used in zx's $ template literal.
     */
    apktool: `java -jar ${scriptUtilsDirectory}/apktool.jar`.split(' '),
    decodeApk: async function decode() {
      await this.unzip();
      await $`${this.apktool} decode -f ${this.apk.signed} --output ${this.apk.contents}`;
    },
    rebuildApk: async function rebuildApk() {
      const [apksigner, zipalign] = await Promise.all([
        this.getBuildTool('apksigner'),
        this.getBuildTool('zipalign'),
      ]);
      const ksPass = `pass:${this.keystore.keystorePassword}`;
      const keyPass = `pass:${this.keystore.keyPassword}`;
      await $`${this.apktool} build ${this.apk.contents} --output ${this.apk.rebuilt}`;
      await $`${zipalign} 4 ${this.apk.rebuilt} ${this.apk.rebuiltAligned}`;
      await $`${apksigner} sign --ks ${this.keystore.keystorePath} --ks-key-alias ${this.keystore.keyAlias} --ks-pass ${ksPass} --key-pass ${keyPass} --out ${this.apk.signed} ${this.apk.rebuiltAligned}`;
      await Promise.all([$`rm -rf ${this.apk.rebuilt}`, $`rm -rf ${this.apk.rebuiltAligned}`]);
    },
    patchBundle: async function patchBundle() {
      if (process.env.SKIP_PATCH_BUNDLE) return;
      if (profile === 'debug') {
        await this.unzip();
        return;
      }

      await this.decodeApk();
      await patchBundleForPlatform({
        platform: 'android',
        fileToPatch: `${this.apk.contents}/assets/index.android.bundle`,
      });
      await this.rebuildApk();
      await $`rm -rf ${this.apk.contents}`;
    },
  };

  return {
    ios,
    android,
    outputDirectory,
  };
}
