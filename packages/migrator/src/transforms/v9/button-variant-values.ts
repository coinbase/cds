/**
 * Button Variant Values Transform (v8 → v9)
 *
 * Remaps Button/IconButton `variant` prop values to reflect v9 naming:
 *   - "tertiary"        → "inverse"   (old tertiary used bgInverse; v9 gives tertiary new semantics)
 *   - "foregroundMuted"  → "secondary" (foregroundMuted deprecated per design)
 *
 * Only targets components imported from @coinbase/cds-web or @coinbase/cds-mobile.
 * Adds TODO comments for dynamic variant expressions that need manual review.
 */
import type { API, FileInfo } from 'jscodeshift';

import { addTodoComment, hasMigrationTodo, transformLogger } from '../utils/transform-utils';

const VARIANT_MAP: Record<string, string> = {
  tertiary: 'inverse',
  foregroundMuted: 'secondary',
};

const CDS_PACKAGES = ['@coinbase/cds-web', '@coinbase/cds-mobile'];
const TARGET_COMPONENTS = ['Button', 'IconButton'];

// eslint-disable-next-line no-restricted-exports -- jscodeshift requires default export
export default function transformer(file: FileInfo, api: API) {
  const j = api.jscodeshift;
  const root = j(file.source);

  const cdsComponentLocalNames = new Set<string>();

  root
    .find(j.ImportDeclaration)
    .filter((path) => CDS_PACKAGES.includes(path.value.source.value as string))
    .forEach((path) => {
      path.value.specifiers?.forEach((specifier) => {
        if (
          j.ImportSpecifier.check(specifier) &&
          TARGET_COMPONENTS.includes(specifier.imported.name)
        ) {
          cdsComponentLocalNames.add(specifier.local?.name ?? specifier.imported.name);
        }
      });
    });

  if (cdsComponentLocalNames.size === 0) {
    return null;
  }

  let hasChanges = false;

  root
    .find(j.JSXElement)
    .filter((path) => {
      const name = path.value.openingElement.name;
      return j.JSXIdentifier.check(name) && cdsComponentLocalNames.has(name.name);
    })
    .forEach((path) => {
      const variantAttr = path.value.openingElement.attributes?.find(
        (attr) =>
          j.JSXAttribute.check(attr) &&
          j.JSXIdentifier.check(attr.name) &&
          attr.name.name === 'variant',
      );

      if (!variantAttr || !j.JSXAttribute.check(variantAttr)) return;

      const value = variantAttr.value;

      if (j.StringLiteral.check(value)) {
        const oldVariant = value.value;
        const newVariant = VARIANT_MAP[oldVariant];
        if (newVariant) {
          value.value = newVariant;
          hasChanges = true;

          transformLogger.success(
            `Updated variant: ${oldVariant} → ${newVariant}`,
            file.path,
            path.value.loc?.start.line,
          );
        }
      } else if (j.JSXExpressionContainer.check(value)) {
        if (!hasMigrationTodo(path)) {
          addTodoComment(
            j,
            path,
            'Button variant values changed in v9: "tertiary" is now "inverse", "foregroundMuted" is now "secondary". Check if this dynamic value needs updating.',
          );

          transformLogger.warn(
            'Dynamic variant expression requires manual review',
            file.path,
            path.value.loc?.start.line,
          );

          hasChanges = true;
        }
      }
    });

  if (!hasChanges) {
    return null;
  }

  return root.toSource();
}
