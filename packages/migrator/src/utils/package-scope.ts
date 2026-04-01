import type { Options } from 'jscodeshift';

export function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Normalize user input: `coinbase` or `@coinbase` → `@coinbase`
 */
export function normalizePackageScope(scope: string): string {
  const t = scope.trim();
  if (!t) {
    return '';
  }
  return t.startsWith('@') ? t : `@${t}`;
}

/**
 * Reads `--packageScope` from jscodeshift options (forwarded by cds-migrate CLI).
 * When set, scope-targeted transforms only rewrite that npm scope.
 */
export function getPackageScopeFromOptions(options: Options): string | undefined {
  const raw = (options as Record<string, unknown>).packageScope;
  if (typeof raw !== 'string' || raw.trim() === '') {
    return undefined;
  }
  const n = normalizePackageScope(raw);
  return n || undefined;
}
