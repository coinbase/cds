import fs from 'node:fs';
import path from 'node:path';

const createdDirectories: Record<string, true> = {};

/**
 * Ensures the directory for `filePath` exists, creating it when needed.
 *
 * `filePath` may be either a directory or a file; when it looks like a file (it has an extension)
 * only its parent directory is created, leaving the file itself to the caller.
 *
 * Returns whether the path already existed.
 */
export async function existsOrCreateDir(filePath: string): Promise<boolean> {
  const { ext, dir } = path.parse(filePath);
  const isDir = !ext;
  const dirname = isDir ? filePath : dir;

  if (isDir) {
    if (createdDirectories[dirname] || fs.existsSync(dirname)) return true;
    await fs.promises.mkdir(dirname, { recursive: true });
    createdDirectories[dirname] = true;
    return false;
  }

  if (fs.existsSync(filePath)) return true;
  await fs.promises.mkdir(dirname, { recursive: true });
  return false;
}
