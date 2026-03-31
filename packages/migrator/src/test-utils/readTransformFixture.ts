import fs from 'fs';
import path from 'path';

/**
 * Read a fixture file from `…/__testfixtures__/<suite>/<relativePath>` relative to a transform’s
 * `__tests__` directory (sibling of `__testfixtures__`).
 *
 * @param testFileDir - `__dirname` from the test file (the `__tests__` folder).
 * @param suite - Subfolder under `__testfixtures__` (e.g. `migrate-use-merge-refs`).
 * @param relativePath - File name within that folder, including extension (e.g. `basic.input.tsx`).
 */
export function readTransformFixture(
  testFileDir: string,
  suite: string,
  relativePath: string,
): string {
  return fs.readFileSync(
    path.join(testFileDir, '..', '__testfixtures__', suite, relativePath),
    'utf8',
  );
}
