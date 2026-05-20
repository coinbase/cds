/**
 * Migrate `useMergeRefs` from the deprecated hooks entry to `mergeRefs` on `utils/mergeRefs`.
 *
 * Goal: use `…/utils/mergeRefs` and the `mergeRefs` binding (the deprecated `useMergeRefs` export is
 * identical at runtime to `mergeRefs`). Matches `@<scope>/cds-common/…`; use CLI `-ps` / `--package-scope`
 * to limit to one scope, or omit to match every scope.
 *
 * Cases handled:
 * - A: `import { useMergeRefs } from '…hooks/useMergeRefs'` → `import { mergeRefs } from '…utils/mergeRefs'`.
 * - B: `import { useMergeRefs as x } from '…'` → `import { mergeRefs as x } from '…utils/mergeRefs'`.
 * - C: `export { useMergeRefs } from '…hooks/useMergeRefs'` → path + `export { mergeRefs } from '…utils/mergeRefs'`.
 * - D: Any string literal exactly equal to the deprecated module path → new path.
 * - E: Call sites and other references `useMergeRefs` → `mergeRefs` when they refer to CDS (see below).
 * - F: After rewrites, multiple `import … from '…utils/mergeRefs'` → merged; named specifiers deduped.
 *
 * Reference rename safety:
 * - Global `useMergeRefs` → `mergeRefs` renames run only if this file touched a CDS mergeRefs
 *   module (deprecated path, mock string, or `useMergeRefs` in a CDS import/re-export). Files that
 *   only import `useMergeRefs` from other packages are left unchanged.
 * - Skips non-computed object literal keys (`{ useMergeRefs: 1 }`), TS property keys, class method
 *   names, and non-computed member expression properties (`obj.useMergeRefs`).
 * - Renames object shorthand `{ useMergeRefs }` (value/key are the same binding).
 *
 * Not handled:
 * - Relative paths (e.g. `../hooks/useMergeRefs`).
 * - Dynamic `import()` / `require()` for this module.
 *
 * Idempotency: second run leaves the file unchanged.
 *
 * @see packages/common/src/hooks/useMergeRefs.ts — re-exports from ../utils/mergeRefs
 */

import type { API, ASTPath, FileInfo, Identifier, Options } from 'jscodeshift';

import { applyImportMappings, getImportMappingsFromOptions } from '../../utils/import-mapping';
import {
  escapeRegExp,
  getPackageScopeFromOptions,
  scopedModulePathRegexPrefix,
} from '../../utils/package-scope';
import { transformLogger } from '../../utils/transform-utils';

/** Regex source for `@scope/cds-common` (capture) — merge-refs module paths only. */
function cdsCommonPackageRootRegexSource(packageScope: string | undefined): string {
  if (packageScope) {
    return `${escapeRegExp(packageScope)}/cds-common`;
  }
  return '@[^/]+/cds-common';
}

/** `…/hooks/useMergeRefs` → `…/utils/mergeRefs` under the same `@scope/cds-common`. */
function rewriteCdsCommonHooksUseMergeRefsToUtils(
  modulePath: string,
  packageScope: string | undefined,
): string | null {
  const base = cdsCommonPackageRootRegexSource(packageScope);
  const m = modulePath.match(new RegExp(`^(${base})/hooks/useMergeRefs$`));
  return m ? `${m[1]}/utils/mergeRefs` : null;
}

function isCdsMergeRefsModuleSource(
  j: API['jscodeshift'],
  source: unknown,
  moduleRe: RegExp,
): source is { value: string } {
  return j.StringLiteral.check(source) && moduleRe.test(source.value);
}

/**
 * Unique `import … from '@<scope>/cds-common/utils/mergeRefs'` sources in the file (for consolidation).
 */
function collectCdsCommonMergeRefsUtilsModulePaths(
  j: API['jscodeshift'],
  root: ReturnType<API['jscodeshift']>,
  utilsModuleRe: RegExp,
): string[] {
  const seen = new Set<string>();
  root.find(j.ImportDeclaration).forEach((path) => {
    const src = path.value.source;
    if (j.StringLiteral.check(src) && utilsModuleRe.test(src.value)) {
      seen.add(src.value);
    }
  });
  return [...seen];
}

/**
 * `import { useMergeRefs }` / `as x` → `mergeRefs` / `as x` when from CDS mergeRefs modules.
 */
function renameUseMergeRefsInImportSpecifiers(
  j: API['jscodeshift'],
  root: ReturnType<API['jscodeshift']>,
  moduleRe: RegExp,
): boolean {
  let changed = false;
  root.find(j.ImportDeclaration).forEach((path) => {
    const src = path.value.source;
    if (!isCdsMergeRefsModuleSource(j, src, moduleRe)) {
      return;
    }
    path.value.specifiers?.forEach((spec) => {
      if (!j.ImportSpecifier.check(spec)) {
        return;
      }
      if (j.Identifier.check(spec.imported) && spec.imported.name === 'useMergeRefs') {
        spec.imported.name = 'mergeRefs';
        changed = true;
      }
      if (spec.local && j.Identifier.check(spec.local) && spec.local.name === 'useMergeRefs') {
        spec.local.name = 'mergeRefs';
        changed = true;
      }
    });
  });
  return changed;
}

/**
 * `export { useMergeRefs … } from '@coinbase/…/mergeRefs'`
 */
function renameUseMergeRefsInExportSpecifiersFromCds(
  j: API['jscodeshift'],
  root: ReturnType<API['jscodeshift']>,
  moduleRe: RegExp,
): boolean {
  let changed = false;
  root.find(j.ExportNamedDeclaration).forEach((path) => {
    const src = path.value.source;
    if (!src || !isCdsMergeRefsModuleSource(j, src, moduleRe)) {
      return;
    }
    path.value.specifiers?.forEach((spec) => {
      if (!j.ExportSpecifier.check(spec)) {
        return;
      }
      if (j.Identifier.check(spec.local) && spec.local.name === 'useMergeRefs') {
        spec.local.name = 'mergeRefs';
        changed = true;
      }
      if (j.Identifier.check(spec.exported) && spec.exported.name === 'useMergeRefs') {
        spec.exported.name = 'mergeRefs';
        changed = true;
      }
    });
  });
  return changed;
}

function isObjectLiteralKey(
  j: API['jscodeshift'],
  parent: unknown,
  idPath: ASTPath<Identifier>,
): boolean {
  if (!parent || typeof parent !== 'object') {
    return false;
  }

  const node = parent as { type?: string; key?: unknown; computed?: boolean; shorthand?: boolean };
  if (node.type !== 'ObjectProperty' && node.type !== 'Property') {
    return false;
  }
  if (node.key !== idPath.value || node.computed) {
    return false;
  }
  if (node.shorthand) {
    return false;
  }
  return true;
}

/**
 * Remaining `useMergeRefs` identifiers → `mergeRefs` (call sites, `export { useMergeRefs }` without from, etc.).
 * Only runs when this file participated in a CDS mergeRefs module migration (avoids renaming unrelated bindings).
 */
function renameRemainingUseMergeRefsIdentifiers(
  j: API['jscodeshift'],
  root: ReturnType<API['jscodeshift']>,
  enabled: boolean,
): boolean {
  if (!enabled) {
    return false;
  }

  let changed = false;

  root.find(j.Identifier, { name: 'useMergeRefs' }).forEach((path: ASTPath<Identifier>) => {
    const parent = path.parent?.node;

    if (j.ImportSpecifier.check(parent)) {
      return;
    }

    if (j.ExportSpecifier.check(parent)) {
      const spec = parent;
      let touched = false;
      if (j.Identifier.check(spec.local) && spec.local.name === 'useMergeRefs') {
        spec.local.name = 'mergeRefs';
        touched = true;
      }
      if (j.Identifier.check(spec.exported) && spec.exported.name === 'useMergeRefs') {
        spec.exported.name = 'mergeRefs';
        touched = true;
      }
      if (touched) {
        changed = true;
      }
      return;
    }

    if (isObjectLiteralKey(j, parent, path)) {
      return;
    }

    if (j.TSPropertySignature?.check(parent) && parent.key === path.value) {
      return;
    }

    if (j.MemberExpression.check(parent) && parent.property === path.value && !parent.computed) {
      return;
    }

    if (j.MethodDefinition.check(parent) && parent.key === path.value) {
      return;
    }

    path.value.name = 'mergeRefs';
    changed = true;
  });

  root.find(j.JSXIdentifier, { name: 'useMergeRefs' }).forEach((path) => {
    path.value.name = 'mergeRefs';
    changed = true;
  });

  return changed;
}

/**
 * Merge multiple `import … from targetModule` into a single declaration; dedupe named imports.
 */
function consolidateImportsFromMergeRefsModule(
  j: API['jscodeshift'],
  root: ReturnType<API['jscodeshift']>,
  targetModule: string,
) {
  const declarations = root
    .find(j.ImportDeclaration, { source: { value: targetModule } })
    .filter((path) => (path.value.specifiers?.length ?? 0) > 0);

  if (declarations.length <= 1) {
    return;
  }

  const paths = declarations.paths();
  const first = paths[0];
  const mergedNamed = new Map<string, { imported: string; local: string }>();
  let defaultImport: string | null = null;
  let namespaceImport: string | null = null;

  for (const path of paths) {
    const specifiers = path.value.specifiers ?? [];
    for (const spec of specifiers) {
      if (j.ImportDefaultSpecifier.check(spec)) {
        const local = spec.local?.name;
        if (local) {
          defaultImport = local;
        }
      } else if (j.ImportNamespaceSpecifier.check(spec)) {
        const local = spec.local?.name;
        if (local) {
          namespaceImport = local;
        }
      } else if (j.ImportSpecifier.check(spec)) {
        const imported = j.Identifier.check(spec.imported)
          ? spec.imported.name
          : String((spec.imported as { value?: string }).value);
        const local = spec.local?.name ?? imported;
        if (!mergedNamed.has(imported)) {
          mergedNamed.set(imported, { imported, local });
        }
      }
    }
  }

  const newSpecifiers: typeof first.value.specifiers = [];

  if (namespaceImport) {
    newSpecifiers.push(j.importNamespaceSpecifier(j.identifier(namespaceImport)));
  } else if (defaultImport) {
    newSpecifiers.push(j.importDefaultSpecifier(j.identifier(defaultImport)));
  }

  const sortedNamed = [...mergedNamed.values()].sort((a, b) =>
    a.imported.localeCompare(b.imported),
  );
  for (const { imported, local } of sortedNamed) {
    newSpecifiers.push(
      j.importSpecifier(j.identifier(imported), local === imported ? null : j.identifier(local)),
    );
  }

  first.value.specifiers = newSpecifiers;

  for (let i = 1; i < paths.length; i++) {
    j(paths[i]).remove();
  }
}

export default function transformer(file: FileInfo, api: API, options: Options) {
  const j = api.jscodeshift;
  const root = j(file.source);

  const packageScope = getPackageScopeFromOptions(options);
  const rewrites = getImportMappingsFromOptions(options);
  const scopePrefix = scopedModulePathRegexPrefix(packageScope);
  const mergeRefsModuleRe = new RegExp(
    `${scopePrefix}/cds-common/(hooks\\/useMergeRefs|utils\\/mergeRefs)$`,
  );
  const mergeRefsUtilsModuleRe = new RegExp(`${scopePrefix}/cds-common/utils/mergeRefs$`);

  let hasChanges = false;
  let cdsMergeRefsMigration = false;

  root.find(j.ImportDeclaration).forEach((path) => {
    if (path.value.source && j.StringLiteral.check(path.value.source)) {
      const resolvedSource = applyImportMappings(path.value.source.value, rewrites);
      const next = rewriteCdsCommonHooksUseMergeRefsToUtils(resolvedSource, packageScope);
      if (next) {
        const prev = path.value.source.value;
        path.value.source = j.stringLiteral(next);
        hasChanges = true;
        cdsMergeRefsMigration = true;
        transformLogger.success(
          `Updated import: ${prev} → ${next}`,
          file.path,
          path.value.loc?.start.line,
        );
      }
    }
  });

  root.find(j.ExportNamedDeclaration).forEach((path) => {
    const src = path.value.source;
    if (src && j.StringLiteral.check(src)) {
      const next = rewriteCdsCommonHooksUseMergeRefsToUtils(
        applyImportMappings(src.value, rewrites),
        packageScope,
      );
      if (next) {
        const prev = src.value;
        path.value.source = j.stringLiteral(next);
        hasChanges = true;
        cdsMergeRefsMigration = true;
        transformLogger.success(
          `Updated export from: ${prev} → ${next}`,
          file.path,
          path.value.loc?.start.line,
        );
      }
    }
  });

  root.find(j.StringLiteral).forEach((path) => {
    const next = rewriteCdsCommonHooksUseMergeRefsToUtils(
      applyImportMappings(path.value.value, rewrites),
      packageScope,
    );
    if (next) {
      const prev = path.value.value;
      path.value.value = next;
      hasChanges = true;
      cdsMergeRefsMigration = true;
      transformLogger.success(
        `Updated module path string: ${prev} → ${next}`,
        file.path,
        path.value.loc?.start.line,
      );
    }
  });

  if (renameUseMergeRefsInImportSpecifiers(j, root, mergeRefsModuleRe)) {
    hasChanges = true;
    cdsMergeRefsMigration = true;
    transformLogger.success(`Renamed import useMergeRefs → mergeRefs`, file.path);
  }

  if (renameUseMergeRefsInExportSpecifiersFromCds(j, root, mergeRefsModuleRe)) {
    hasChanges = true;
    cdsMergeRefsMigration = true;
    transformLogger.success(`Renamed re-export useMergeRefs → mergeRefs`, file.path);
  }

  if (renameRemainingUseMergeRefsIdentifiers(j, root, cdsMergeRefsMigration)) {
    hasChanges = true;
    transformLogger.success(`Renamed remaining useMergeRefs → mergeRefs`, file.path);
  }

  if (hasChanges) {
    for (const targetModule of collectCdsCommonMergeRefsUtilsModulePaths(
      j,
      root,
      mergeRefsUtilsModuleRe,
    )) {
      consolidateImportsFromMergeRefsModule(j, root, targetModule);
    }
  }

  if (!hasChanges) {
    return null;
  }

  return root.toSource();
}
