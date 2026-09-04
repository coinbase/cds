import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

import type { ProcessedDoc, ProcessedPropItem } from '../types';

export type EntryPointCacheEntry = {
  /** Combined hash of all source file contents + tsconfig for this entry point */
  hash: string;
  /** The parsed docs for this entry point */
  docs: ProcessedDoc[];
  /** Parent type props contributed by this entry point (replayed on cache hit) */
  parentTypeProps: ProcessedPropItem[];
  /** Type alias entries contributed by this entry point (replayed on cache hit) */
  typeAliases: [string, unknown][];
};

type CacheData = {
  version: string;
  entryPoints: Record<string, EntryPointCacheEntry>;
};

/**
 * Bump this when the parser output format changes to invalidate all caches.
 * A cache version mismatch causes a full re-parse on the next run.
 */
const CACHE_VERSION = '1';

/**
 * Compute a content hash for all source files in an entry point plus its tsconfig.
 * Changes to any file or the tsconfig will produce a different hash, triggering a re-parse.
 */
export function computeEntryPointHash(absoluteFilePaths: string[], tsconfigPath: string): string {
  const hash = crypto.createHash('md5');
  try {
    hash.update(fs.readFileSync(tsconfigPath, 'utf-8'));
  } catch {
    hash.update(`missing-tsconfig:${tsconfigPath}`);
  }
  for (const filePath of absoluteFilePaths.sort()) {
    try {
      hash.update(filePath);
      hash.update(fs.readFileSync(filePath, 'utf-8'));
    } catch {
      hash.update(`missing:${filePath}`);
    }
  }
  return hash.digest('hex');
}

export function loadDocgenCache(pluginDir: string): CacheData | null {
  const cachePath = path.join(pluginDir, '.docgen-cache.json');
  try {
    const raw = fs.readFileSync(cachePath, 'utf-8');
    const data: CacheData = JSON.parse(raw);
    if (data.version !== CACHE_VERSION) return null;
    return data;
  } catch {
    return null;
  }
}

export function saveDocgenCache(
  pluginDir: string,
  entryPoints: Record<string, EntryPointCacheEntry>,
): void {
  const cachePath = path.join(pluginDir, '.docgen-cache.json');
  fs.mkdirSync(path.dirname(cachePath), { recursive: true });
  const data: CacheData = { version: CACHE_VERSION, entryPoints };
  fs.writeFileSync(cachePath, JSON.stringify(data));
}
