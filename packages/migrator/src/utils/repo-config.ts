/**
 * Repo-level config file loader (`cds-migrator.config.json`)
 *
 * When present at the root of the target path (or cwd), this file provides
 * standing defaults that are merged with CLI flags on every run. CLI flags
 * always win over config file values.
 *
 * Schema:
 * ```json
 * {
 *   "packageScope": "cbhq",
 *   "importMappings": [
 *     { "from": "@cbhq/shared/cds", "to": "@cbhq/cds-web" }
 *   ]
 * }
 * ```
 */

import fs from 'fs';
import path from 'path';

import type { ImportMapping } from './import-mapping';

export const REPO_CONFIG_FILENAME = 'cds-migrator.config.json';

export type RepoConfig = {
  /** Default package scope filter (same as CLI `-ps`). */
  packageScope?: string;
  /**
   * Import source prefix rewrites (same as CLI `--import-mapping`).
   * Declare these when a wrapper or re-exporting package stands between call
   * sites and CDS, so transforms process those call sites as if they imported
   * from CDS directly.
   * Each entry uses `from`/`to` keys (not the `<from>=<to>` string syntax).
   */
  importMappings?: ImportMapping[];
};

/**
 * Attempt to load `cds-migrator.config.json` from `targetPath` (the migration
 * target directory) or from `process.cwd()` as a fallback.
 *
 * Returns `null` when no config file is found (not an error).
 * Throws when a config file exists but is malformed JSON.
 */
export function loadRepoConfig(targetPath: string): RepoConfig | null {
  const candidates = [
    path.resolve(targetPath, REPO_CONFIG_FILENAME),
    path.resolve(process.cwd(), REPO_CONFIG_FILENAME),
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      const content = fs.readFileSync(candidate, 'utf-8');
      return JSON.parse(content) as RepoConfig;
    }
  }

  return null;
}
