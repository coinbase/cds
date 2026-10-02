import fs from 'node:fs';
import path from 'node:path';

/** Writes `content` to `filePath`, creating parent directories as needed. */
export async function writeFile(filePath: string, content: string | Buffer) {
  await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
  await fs.promises.writeFile(filePath, content);
}

/** Whether every one of `filePaths` exists. */
export async function allFilesExist(filePaths: string[]) {
  const checks = await Promise.all(
    filePaths.map((filePath) =>
      fs.promises.access(filePath).then(
        () => true,
        () => false,
      ),
    ),
  );
  return checks.every(Boolean);
}

/** Removes `filePath` if it exists. */
export async function removeFile(filePath: string) {
  await fs.promises.rm(filePath, { force: true });
}

/** `'../svgJs/cjs/light/foo-1'`: the import specifier for `to` from a module in `fromDir`, without extension. */
export function relativeImport(fromDir: string, to: string) {
  const relative = path.relative(fromDir, to).replace(/\.[jt]s$/, '');
  return relative.startsWith('.') ? relative : `./${relative}`;
}
