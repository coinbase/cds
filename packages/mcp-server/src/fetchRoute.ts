import fs from 'node:fs';
import path from 'node:path';

const isWithinDirectory = (candidate: string, directory: string) =>
  candidate.startsWith(directory + path.sep);

const realPathOrSelf = (target: string) => {
  try {
    return fs.realpathSync(target);
  } catch {
    // The path does not exist (or is not readable); fall back to the lexical path so the caller
    // still performs the containment check and the read fails normally.
    return target;
  }
};

/**
 * Resolves a doc route to an absolute path, returning null when the route escapes `docsPath`.
 *
 * `path.resolve` collapses traversal sequences and lets an absolute route replace the base, so the
 * result is compared against the docs directory both lexically and after resolving symlinks.
 */
const resolveRoutePath = (docsPath: string, route: string) => {
  const docsRoot = path.resolve(docsPath);
  const filePath = path.resolve(docsRoot, route);

  if (!isWithinDirectory(filePath, docsRoot)) {
    return null;
  }

  if (!isWithinDirectory(realPathOrSelf(filePath), realPathOrSelf(docsRoot))) {
    return null;
  }

  return filePath;
};

/**
 * Reads a doc route from within `docsPath`. Returns null when the route is outside the docs
 * directory or cannot be read.
 */
export const fetchRoute = (docsPath: string, route: string) => {
  const filePath = resolveRoutePath(docsPath, route);

  if (!filePath) {
    return null;
  }

  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch {
    return null;
  }
};
