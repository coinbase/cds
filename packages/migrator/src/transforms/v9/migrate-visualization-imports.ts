/**
 * Visualization package import migration (v8 → v9, web + mobile)
 *
 * Rewrites import (and re-export) paths from the deprecated standalone visualization
 * packages to the sub-paths now shipped directly inside `cds-web` and `cds-mobile`:
 *
 *   @<scope>/cds-web-visualization             → @<scope>/cds-web/visualizations
 *   @<scope>/cds-web-visualization/chart        → @<scope>/cds-web/visualizations/chart
 *   @<scope>/cds-web-visualization/sparkline    → @<scope>/cds-web/visualizations/sparkline
 *   @<scope>/cds-web-visualization/<deep/path>  → @<scope>/cds-web/visualizations/<deep/path>
 *
 *   @<scope>/cds-mobile-visualization           → @<scope>/cds-mobile/visualizations
 *   @<scope>/cds-mobile-visualization/chart     → @<scope>/cds-mobile/visualizations/chart
 *   @<scope>/cds-mobile-visualization/sparkline → @<scope>/cds-mobile/visualizations/sparkline
 *   @<scope>/cds-mobile-visualization/<deep>    → @<scope>/cds-mobile/visualizations/<deep>
 *
 * Handles:
 *   - `import { … } from '…'`          (ImportDeclaration)
 *   - `export { … } from '…'`          (ExportNamedDeclaration with source)
 *   - `export * from '…'`              (ExportAllDeclaration)
 *
 * Not handled:
 *   - `require('…')` calls
 *   - Dynamic `import('…')` expressions
 *
 * Use CLI `-ps` / `--packageScope` to restrict rewrites to a single npm scope (e.g. `@coinbase`).
 * Idempotent: second run is a no-op once paths have been updated.
 */
import type { API, FileInfo, Options } from 'jscodeshift';

import { applyImportMappings, getImportMappingsFromOptions } from '../../utils/import-mapping';
import { escapeRegExp, getPackageScopeFromOptions } from '../../utils/package-scope';
import { transformLogger } from '../../utils/transform-utils';

/**
 * Builds a regex that both enforces the scope filter (when set) and captures the
 * three parts needed for reconstruction: scope, platform (web|mobile), sub-path.
 *
 * Group 1 — npm scope  (e.g. `@coinbase`)
 * Group 2 — platform   (`web` or `mobile`)
 * Group 3 — sub-path   (e.g. `/chart`, or undefined when importing the root barrel)
 */
function buildVisualizationRe(packageScope: string | undefined): RegExp {
  const scopeCapture = packageScope ? escapeRegExp(packageScope) : '@[^/]+';
  return new RegExp(`^(${scopeCapture})/cds-(web|mobile)-visualization(/.+)?$`);
}

/**
 * Returns the rewritten module path, or `null` if the path does not match (or is
 * filtered out by the scope option).
 */
function rewritePath(modulePath: string, vizRe: RegExp): string | null {
  const m = modulePath.match(vizRe);
  if (!m) return null;
  const [, scope, platform, rest] = m;
  return `${scope}/cds-${platform}/visualizations${rest ?? ''}`;
}

function rewriteStringLiteralSource(
  j: API['jscodeshift'],
  node: { source?: unknown },
  vizRe: RegExp,
  filePath: string,
  line: number | undefined,
  rewrites: ReturnType<typeof getImportMappingsFromOptions>,
): boolean {
  const src = node.source;
  if (!j.StringLiteral.check(src)) return false;
  const srcLiteral = src as { value: string };
  const next = rewritePath(applyImportMappings(srcLiteral.value, rewrites), vizRe);
  if (!next) return false;
  transformLogger.success(`Updated import path: ${srcLiteral.value} → ${next}`, filePath, line);
  srcLiteral.value = next;
  return true;
}

export default function transformer(file: FileInfo, api: API, options: Options) {
  const j = api.jscodeshift;
  const root = j(file.source);

  const packageScope = getPackageScopeFromOptions(options);
  const rewrites = getImportMappingsFromOptions(options);
  const vizRe = buildVisualizationRe(packageScope);

  let hasChanges = false;

  root.find(j.ImportDeclaration).forEach((path) => {
    if (
      rewriteStringLiteralSource(
        j,
        path.value,
        vizRe,
        file.path,
        path.value.loc?.start.line,
        rewrites,
      )
    ) {
      hasChanges = true;
    }
  });

  root.find(j.ExportNamedDeclaration).forEach((path) => {
    if (
      path.value.source &&
      rewriteStringLiteralSource(
        j,
        path.value,
        vizRe,
        file.path,
        path.value.loc?.start.line,
        rewrites,
      )
    ) {
      hasChanges = true;
    }
  });

  root.find(j.ExportAllDeclaration).forEach((path) => {
    if (
      rewriteStringLiteralSource(
        j,
        path.value,
        vizRe,
        file.path,
        path.value.loc?.start.line,
        rewrites,
      )
    ) {
      hasChanges = true;
    }
  });

  if (!hasChanges) {
    return null;
  }

  return root.toSource();
}
