/**
 * ThemeProvider isolated prop transform (v8 → v9, web only)
 *
 * In v9, `ThemeProvider` gained an `isolated` prop. When `isolated` is omitted (default `false`),
 * the provider calls `diffThemes()` and only injects CSS variable **diffs** relative to the nearest
 * parent `ThemeProvider` in the React tree. This optimization breaks any usage where the
 * `ThemeProvider` DOM subtree is detached from its React parent (e.g. `createPortal`), because CSS
 * variable inheritance stops at the portal boundary.
 *
 * Setting `isolated={true}` restores the v8 behavior of always injecting the full set of theme CSS
 * variables. After running this codemod, teams can selectively remove `isolated` from
 * `ThemeProvider` instances that are NOT inside portals to opt into the new diffing optimization.
 *
 * Matches any import of `ThemeProvider` from `@<scope>/cds-web` (root barrel) or any sub-path
 * (e.g. `@<scope>/cds-web/system`, `@<scope>/cds-web/system/ThemeProvider`). Use CLI `-ps` /
 * `--packageScope` to restrict to a specific npm scope.
 *
 * Not handled:
 * - `export { ThemeProvider } from '…'` re-exports.
 * - `require(…)` imports.
 * - Dynamic `import(…)`.
 * - `InvertedThemeProvider` (not requested; add a separate codemod if needed).
 */
import type { API, FileInfo, Options } from 'jscodeshift';

import { applyImportMappings, getImportMappingsFromOptions } from '../../utils/import-mapping';
import { getPackageScopeFromOptions, scopedModulePathRegexPrefix } from '../../utils/package-scope';
import { transformLogger } from '../../utils/transform-utils';

const TARGET_COMPONENT = 'ThemeProvider';

function buildCdsWebImportRe(packageScope: string | undefined): RegExp {
  const prefix = scopedModulePathRegexPrefix(packageScope);
  return new RegExp(`${prefix}/cds-web(/.+)?$`);
}

export default function transformer(file: FileInfo, api: API, options: Options) {
  const j = api.jscodeshift;
  const root = j(file.source);

  const packageScope = getPackageScopeFromOptions(options);
  const rewrites = getImportMappingsFromOptions(options);
  const cdsWebRe = buildCdsWebImportRe(packageScope);

  const localNames = new Set<string>();

  root
    .find(j.ImportDeclaration)
    .filter((path) => {
      const src = path.value.source;
      if (!j.StringLiteral.check(src)) return false;
      return cdsWebRe.test(applyImportMappings(src.value, rewrites));
    })
    .forEach((path) => {
      path.value.specifiers?.forEach((specifier) => {
        if (j.ImportSpecifier.check(specifier) && specifier.imported.name === TARGET_COMPONENT) {
          localNames.add(specifier.local?.name ?? specifier.imported.name);
        }
      });
    });

  if (localNames.size === 0) {
    return null;
  }

  let hasChanges = false;

  root
    .find(j.JSXOpeningElement)
    .filter((path) => {
      const name = path.value.name;
      return j.JSXIdentifier.check(name) && localNames.has(name.name);
    })
    .forEach((path) => {
      const attrs = path.value.attributes ?? [];

      const alreadyHasIsolated = attrs.some(
        (attr) =>
          j.JSXAttribute.check(attr) &&
          j.JSXIdentifier.check(attr.name) &&
          attr.name.name === 'isolated',
      );

      if (alreadyHasIsolated) return;

      // JSX boolean shorthand: `isolated` is equivalent to `isolated={true}`.
      const isolatedAttr = j.jsxAttribute(j.jsxIdentifier('isolated'));
      path.value.attributes = [...attrs, isolatedAttr];
      hasChanges = true;

      transformLogger.success(
        `Added isolated prop to ThemeProvider`,
        file.path,
        path.value.loc?.start.line,
      );
    });

  if (!hasChanges) {
    return null;
  }

  return root.toSource();
}
