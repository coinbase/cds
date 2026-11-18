import fs from 'node:fs';
import path from 'node:path';

/** Where the native CDS modules live inside the native repository. */
export const nativeModules = {
  ios: 'modules/ios/CDS/CDSDesignSystem',
  android: 'modules/android/cds',
};

/** Where, inside each module, the illustration assets and the generated names go. */
export const nativeLayout = {
  ios: {
    catalog: 'Sources/CDSDesignSystem/Resources/Illustrations.xcassets',
    generated: 'Sources/CDSDesignSystem/Illustrations/Generated',
  },
  android: {
    drawable: 'src/main/res/drawable',
    kotlin: 'illustrations/src/main/kotlin',
  },
};

/**
 * Fails unless `repo` is a git checkout containing both native CDS modules. Runs before anything
 * is fetched, so a wrong path never costs a download or leaves a branch behind.
 */
export function assertNativeCheckout(repo: string) {
  const problems = [
    !fs.existsSync(path.join(repo, '.git')) && 'it is not a git checkout',
    ...Object.values(nativeModules).map(
      (module) => !fs.existsSync(path.join(repo, module)) && `it has no ${module}`,
    ),
  ].filter(Boolean);
  if (problems.length) {
    throw new Error(
      `SYNC_ILLUSTRATIONS_NATIVE_REPO=${repo} is not a native CDS checkout: ${problems.join(', ')}`,
    );
  }
}
