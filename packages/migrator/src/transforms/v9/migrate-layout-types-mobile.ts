/**
 * Mobile: migrate deprecated layout types from `@<scope>/cds-common` to CDS Mobile (same scope) + React Native.
 *
 * - `PositionStyles` → `import type { PositionStyles } from '@<scope>/cds-mobile/styles/styleProps'`.
 * - `DimensionValue` → `import type { DimensionValue } from 'react-native'` (RN’s `DimensionValue`;
 *   review usages that relied on CDS-common’s distinct union).
 *
 * Matches any npm scope on `cds-common`. Use CLI `-ps` / `--package-scope` to limit to one scope,
 * like `migrate-use-merge-refs`.
 *
 * Idempotent: second run is a no-op when common no longer supplies these imports.
 *
 * Not handled: `export { ... } from 'cds-common'`, `require()`, dynamic imports, versioned entrypoints
 * (e.g. `@scope/cds-common/v7`) — migrate by hand or extend the path matcher below.
 */

import type { API, FileInfo, Options } from 'jscodeshift';

import { ensureImportSpecifiers } from '../../utils/ensure-import-specifiers';
import { getPackageScopeFromOptions, scopedModulePathRegexPrefix } from '../../utils/package-scope';
import { transformLogger } from '../../utils/transform-utils';

const REACT_NATIVE_MODULE = 'react-native';

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

function mobileStylePropsModule(fromImportSource: string): string {
  const scope = cdsPackageScopeFromCommonImport(fromImportSource);
  return scope ? `${scope}/cds-mobile/styles/styleProps` : '@coinbase/cds-mobile/styles/styleProps';
}

export default function transformer(file: FileInfo, api: API, options: Options) {
  const j = api.jscodeshift;
  const root = j(file.source);

  const packageScope = getPackageScopeFromOptions(options);

  const alreadyImportsRnDimensionValue =
    root
      .find(j.ImportDeclaration, { source: { value: REACT_NATIVE_MODULE } })
      .filter((path) =>
        (path.value.specifiers ?? []).some(
          (spec) =>
            j.ImportSpecifier.check(spec) &&
            j.Identifier.check(spec.imported) &&
            spec.imported.name === 'DimensionValue',
        ),
      ).length > 0;

  const hasLocalDimensionValueType =
    root.find(j.TSTypeAliasDeclaration, { id: { name: 'DimensionValue' } }).length > 0;

  let sampleCdsCommonSource: string | null = null;

  let needsMigration = false;
  root.find(j.ImportDeclaration).forEach((path) => {
    const src = path.value.source;
    if (!j.StringLiteral.check(src) || !isCommonLayoutTypeSource(src.value, packageScope)) {
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
  let mobileTarget: string | null = null;

  root.find(j.ImportDeclaration).forEach((path) => {
    const src = path.value.source;
    if (!j.StringLiteral.check(src) || !isCommonLayoutTypeSource(src.value, packageScope)) {
      return;
    }

    if (!sampleCdsCommonSource) {
      sampleCdsCommonSource = src.value;
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
        if (!mobileTarget) {
          mobileTarget = mobileStylePropsModule(src.value);
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

  if (stripPositionStyles) {
    const target =
      mobileTarget ?? mobileStylePropsModule(sampleCdsCommonSource ?? '@coinbase/cds-common');
    if (ensureImportSpecifiers(j, root, target, ['PositionStyles'])) {
      fileChanged = true;
      transformLogger.success(`Ensured type import PositionStyles from ${target}`, file.path);
    }
  }

  if (stripDimensionValue && !hasLocalDimensionValueType && !alreadyImportsRnDimensionValue) {
    if (ensureImportSpecifiers(j, root, REACT_NATIVE_MODULE, ['DimensionValue'])) {
      fileChanged = true;
      transformLogger.success('Ensured type import DimensionValue from react-native', file.path);
    }
  } else if (stripDimensionValue && alreadyImportsRnDimensionValue) {
    fileChanged = true;
    transformLogger.success('DimensionValue already imported from react-native', file.path);
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
