/**
 * Web: migrate deprecated layout types from `@<scope>/cds-common` to CDS Web (same scope).
 *
 * - `PositionStyles` → `import type { PositionStyles } from '@<scope>/cds-web/styles/styleProps'`.
 * - `DimensionValue` → remove from common import; add local
 *   `type DimensionValue = string | number | 'auto'` (matches former common `DimensionValue` union).
 *
 * Matches any npm scope on `cds-common`. Use CLI `-ps` / `--package-scope` to limit to one scope,
 * like `migrate-use-merge-refs`.
 *
 * Idempotent: second run is a no-op when common no longer exports these imports.
 *
 * Not handled: `export { ... } from 'cds-common'`, `require()`, dynamic imports, versioned entrypoints
 * (e.g. `@scope/cds-common/v7`) — migrate by hand or extend the path matcher below.
 */

import type { API, FileInfo, Options } from 'jscodeshift';

import { ensureImportSpecifiers } from '../../utils/ensure-import-specifiers';
import { applyImportMappings, getImportMappingsFromOptions } from '../../utils/import-mapping';
import { getPackageScopeFromOptions, scopedModulePathRegexPrefix } from '../../utils/package-scope';
import { transformLogger } from '../../utils/transform-utils';

const MIGRATED_TYPE_NAMES = new Set(['PositionStyles', 'DimensionValue']);

function buildCdsCommonLayoutSourceRe(packageScope: string | undefined): RegExp {
  const prefix = scopedModulePathRegexPrefix(packageScope);
  return new RegExp(
    `${prefix}/(?:cds-common|cds-common/types|cds-common/types/BoxBaseProps|cds-common/types/DimensionStyles)$`,
  );
}

function isCommonLayoutTypeSource(
  source: string | undefined | null,
  packageScope?: string | undefined,
): boolean {
  if (typeof source !== 'string') {
    return false;
  }
  return buildCdsCommonLayoutSourceRe(packageScope).test(source);
}

function cdsPackageScopeFromCommonImport(fromImportSource: string): string | null {
  const m = fromImportSource.match(/^(@[^/]+)\/cds-common(?:\/|$)/);
  return m ? m[1] : null;
}

function webStylePropsModule(fromImportSource: string): string {
  const scope = cdsPackageScopeFromCommonImport(fromImportSource);
  return scope ? `${scope}/cds-web/styles/styleProps` : '@coinbase/cds-web/styles/styleProps';
}

function parseDimensionValueAlias(j: API['jscodeshift']) {
  const parsed = j(`type DimensionValue = string | number | 'auto';`);
  return parsed.paths()[0].value.program.body[0];
}

function lastImportIndex(j: API['jscodeshift'], body: unknown[]): number {
  let idx = -1;
  for (let i = 0; i < body.length; i++) {
    if (j.ImportDeclaration.check(body[i])) {
      idx = i;
    }
  }
  return idx;
}

export default function transformer(file: FileInfo, api: API, options: Options) {
  const j = api.jscodeshift;
  const root = j(file.source);

  const packageScope = getPackageScopeFromOptions(options);
  const rewrites = getImportMappingsFromOptions(options);

  const hasLocalDimensionValueType =
    root.find(j.TSTypeAliasDeclaration, { id: { name: 'DimensionValue' } }).length > 0;

  let needsMigration = false;
  root.find(j.ImportDeclaration).forEach((path) => {
    const src = path.value.source;
    if (
      !j.StringLiteral.check(src) ||
      !isCommonLayoutTypeSource(applyImportMappings(src.value, rewrites), packageScope)
    ) {
      return;
    }
    for (const spec of path.value.specifiers ?? []) {
      if (
        j.ImportSpecifier.check(spec) &&
        j.Identifier.check(spec.imported) &&
        MIGRATED_TYPE_NAMES.has(spec.imported.name)
      ) {
        needsMigration = true;
      }
    }
  });

  if (!needsMigration) {
    return null;
  }

  let stripPositionStyles = false;
  let stripDimensionValue = false;
  let stylePropsTarget: string | null = null;

  root.find(j.ImportDeclaration).forEach((path) => {
    const src = path.value.source;
    if (
      !j.StringLiteral.check(src) ||
      !isCommonLayoutTypeSource(applyImportMappings(src.value, rewrites), packageScope)
    ) {
      return;
    }

    const specs = path.value.specifiers ?? [];
    const next: typeof specs = [];
    for (const spec of specs) {
      if (!j.ImportSpecifier.check(spec) || !j.Identifier.check(spec.imported)) {
        next.push(spec);
        continue;
      }
      const name = spec.imported.name;
      if (name === 'PositionStyles') {
        stripPositionStyles = true;
        if (!stylePropsTarget) {
          stylePropsTarget = webStylePropsModule(src.value);
        }
        continue;
      }
      if (name === 'DimensionValue') {
        if (hasLocalDimensionValueType) {
          next.push(spec);
          transformLogger.warn(
            'Skipped removing DimensionValue import: a local type DimensionValue already exists',
            file.path,
          );
        } else {
          stripDimensionValue = true;
        }
        continue;
      }
      next.push(spec);
    }
    path.value.specifiers = next;
  });

  root.find(j.ImportDeclaration).forEach((path) => {
    if (path.value.specifiers?.length === 0) {
      j(path).remove();
    }
  });

  if (!stripPositionStyles && !stripDimensionValue) {
    return null;
  }

  let fileChanged = false;

  const typeNamesToImport: string[] = [];
  if (stripPositionStyles) {
    typeNamesToImport.push('PositionStyles');
  }

  if (typeNamesToImport.length > 0 && stylePropsTarget) {
    if (ensureImportSpecifiers(j, root, stylePropsTarget, typeNamesToImport)) {
      fileChanged = true;
      transformLogger.success(
        `Ensured type import(s) from ${stylePropsTarget}: ${typeNamesToImport.join(', ')}`,
        file.path,
      );
    }
  }

  if (stripDimensionValue && !hasLocalDimensionValueType) {
    const body = root.get().value.program.body as object[];
    const insertAt = lastImportIndex(j, body) + 1;
    const aliasNode = parseDimensionValueAlias(j);
    body.splice(insertAt, 0, aliasNode);
    fileChanged = true;
    transformLogger.success(
      "Added local type alias DimensionValue (= string | number | 'auto')",
      file.path,
    );
  }

  if (stripPositionStyles || stripDimensionValue) {
    fileChanged = true;
    transformLogger.success(
      'Removed PositionStyles and/or DimensionValue from cds-common import(s)',
      file.path,
    );
  }

  if (!fileChanged) {
    return null;
  }

  return root.toSource();
}
