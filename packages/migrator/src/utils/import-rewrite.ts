/**
 * Import source rewrite utilities
 *
 * Allows consumers to declare that imports from one path prefix should be
 * treated as equivalent to another path prefix for migration purposes.
 * Transforms apply rewrites before running their import-path regexes, so
 * call sites that import from a wrapper or re-exporting package are processed
 * the same way as direct CDS imports.
 *
 * Rewriting is prefix-based with `/` boundary enforcement:
 *   rewrite { from: '@cbhq/shared/cds', to: '@cbhq/cds-web' }
 *   input    '@cbhq/shared/cds/buttons/Button'
 *   output   '@cbhq/cds-web/buttons/Button'
 */

import type { Options } from 'jscodeshift';

export type ImportRewrite = {
  /** The import source prefix to match (e.g. `@cbhq/shared/cds`). */
  from: string;
  /** The import source prefix to replace it with (e.g. `@cbhq/cds-web`). */
  to: string;
};

/**
 * Parse a raw `'<from>=<to>'` rewrite string into an `ImportRewrite`.
 * Returns `null` when the format is invalid (no `=` separator, or empty side).
 */
export function parseImportRewrite(raw: string): ImportRewrite | null {
  const eqIdx = raw.indexOf('=');
  if (eqIdx <= 0) return null;
  const from = raw.slice(0, eqIdx).trim();
  const to = raw.slice(eqIdx + 1).trim();
  if (!from || !to) return null;
  return { from, to };
}

/**
 * Parse an array of raw rewrite strings, silently dropping malformed entries.
 */
export function parseImportRewrites(raws: string[]): ImportRewrite[] {
  const result: ImportRewrite[] = [];
  for (const raw of raws) {
    const rewrite = parseImportRewrite(raw);
    if (rewrite) result.push(rewrite);
  }
  return result;
}

/**
 * Merge rewrite lists: `cli` takes precedence over `config` when both define
 * a rewrite for the same `from` path (last-wins within each list; CLI list
 * applied after config list so CLI always wins).
 */
export function mergeImportRewrites(
  config: ImportRewrite[],
  cli: ImportRewrite[],
): ImportRewrite[] {
  const map = new Map<string, ImportRewrite>();
  for (const rewrite of [...config, ...cli]) {
    map.set(rewrite.from, rewrite);
  }
  return [...map.values()];
}

/**
 * If `source` starts with any rewrite `from` prefix, rewrite it to use `to`.
 * Returns the rewritten string, or `source` unchanged when no rewrite matches.
 *
 * Matching respects `/` boundaries to avoid false prefix matches:
 *   - `@cbhq/shared/cds/buttons` → `@cbhq/cds-web/buttons`  ✓ (slash boundary)
 *   - `@cbhq/shared/cds`         → `@cbhq/cds-web`           ✓ (exact match)
 *   - `@cbhq/shared/cds-extra`   → no match                  ✗ (no boundary)
 */
export function applyImportRewrites(source: string, rewrites: ImportRewrite[]): string {
  for (const { from, to } of rewrites) {
    if (source === from) {
      return to;
    }
    if (source.startsWith(`${from}/`)) {
      return to + source.slice(from.length);
    }
  }
  return source;
}

/**
 * Reads import rewrites forwarded by the runner as a JSON-encoded array on
 * the jscodeshift `options` object.
 */
export function getImportRewritesFromOptions(options: Options): ImportRewrite[] {
  const raw = (options as Record<string, unknown>).importRewrites;
  if (!Array.isArray(raw)) return [];
  return raw as ImportRewrite[];
}
