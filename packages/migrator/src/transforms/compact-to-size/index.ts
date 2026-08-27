/**
 * Compact → Size Transform
 *
 * Replaces the deprecated `compact` boolean with the t-shirt `size` prop on the components
 * where `compact` was deprecated in favour of `size` (expected removal in v11):
 *
 *   - `size="s"`  → Button, IconButton, SlideButton, TextInput, SearchInput, DateInput,
 *                   DatePicker, and the alpha Select / Combobox controls
 *   - `size="xs"` → Chip, InputChip, MediaChip, SelectChip (chips + alpha), TabbedChips (alpha)
 *
 * Matching is keyed on **(import path, component name)** pairs, never on the prop name alone,
 * because `compact` also exists — with an unrelated meaning — on `AvatarButton`, `NativeInput`,
 * `NativeTextArea`, `InputIcon`, the legacy `controls/Select`, `ContentCell`/`ListCell`
 * (v9 → `spacingVariant`), `Table`, `CardBody`, `LikeButton`, `StickyFooter`, the sparklines,
 * and the alpha `SelectDropdown`/`SelectOption`/`SelectOptionGroup`. Several of those are
 * exported from the very same barrels as the components above, so an allowlist is the only
 * safe way to target this migration.
 *
 * Use CLI `-ps` / `--package-scope` to limit to one scope, or omit to match every scope.
 * Use `--import-mapping` (or `cds-migrator.config.json`) to cover wrapper packages that
 * re-export CDS.
 *
 * Behaviour preserved beyond the size swap:
 *   - `IconButton`'s `compact` defaults to `true`, so `compact={false}` becomes `size="l"`
 *     rather than being dropped.
 *   - On the input and select families `compact` (set *without* `size`) also forced the label
 *     into the inline start slot. When the element has a label, `labelVariant="inside"` is added
 *     so placement is unchanged. Multi-select (`type="multi"`) is excluded because legacy
 *     compact deliberately kept its label outside.
 *
 * Not handled (flagged with a TODO where detectable, otherwise out of scope):
 *   - `compact` arriving through a spread (`{...props}`) — undetectable statically.
 *   - Namespace imports (`import * as CDS`), `require`, dynamic `import()`, and
 *     `export … from` re-exports.
 *   - `compact` in plain object literals, `ComponentConfigProvider` defaults, or props typed
 *     against the component's `…Props` type rather than written as JSX.
 *   - The web `data-compact` DOM attribute emitted by Button/IconButton/TextInput disappears
 *     once `compact` is removed; consumers styling off `[data-compact]` must switch to
 *     `[data-size]`.
 *   - `getMediaChipSpacingProps({ compact })` — a function call, not JSX.
 */
import type {
  API,
  ASTPath,
  FileInfo,
  JSXAttribute,
  JSXElement,
  JSXSpreadAttribute,
  Options,
} from 'jscodeshift';

import { applyImportMappings, getImportMappingsFromOptions } from '../../utils/import-mapping';
import { getPackageScopeFromOptions, scopedModulePathRegexPrefix } from '../../utils/package-scope';
import { addTodoComment, hasMigrationTodo, transformLogger } from '../../utils/transform-utils';

const TRANSFORM_NAME = 'compact-to-size';

/**
 * How `compact` affected label placement, which decides whether `labelVariant="inside"` has to
 * be added to preserve the legacy rendering.
 *
 * - `none`   — `compact` only ever drove geometry.
 * - `input`  — TextInput family: `compact` alone forced an inside label.
 * - `select` — alpha Select family: same, except for `type="multi"`.
 */
type LabelBehavior = 'none' | 'input' | 'select';

type CompactRule = {
  /** Size literal the deprecated `compact` maps to. */
  compactSize: string;
  /** Size the component resolves to when `compact` is absent or `false`. */
  defaultSize: string;
  /** Whether `compact` also moved the label, and which exception applies. */
  labelBehavior: LabelBehavior;
  /** `compact` defaults to `true` in the component's own destructuring (IconButton only). */
  compactDefaultsTrue?: boolean;
};

const BUTTON_RULE: CompactRule = { compactSize: 's', defaultSize: 'l', labelBehavior: 'none' };
const CHIP_RULE: CompactRule = { compactSize: 'xs', defaultSize: 's', labelBehavior: 'none' };
const INPUT_RULE: CompactRule = { compactSize: 's', defaultSize: 'l', labelBehavior: 'input' };
const SELECT_RULE: CompactRule = { compactSize: 's', defaultSize: 'l', labelBehavior: 'select' };

/**
 * Allowlist of import-path groups → component names carrying the v11 `compact` → `size`
 * deprecation. `pathSuffix` is appended after `(cds-web|cds-mobile)` to build the import regex.
 */
const IMPORT_GROUPS: { pathSuffix: string; components: Record<string, CompactRule> }[] = [
  {
    // `AvatarButton` is intentionally absent: it maps `compact` onto the Avatar scale and has
    // no `size` prop of its own, despite inheriting Button's deprecation JSDoc.
    pathSuffix: '/buttons(?:/[^/]+)*$',
    components: {
      Button: BUTTON_RULE,
      IconButton: { ...BUTTON_RULE, compactDefaultsTrue: true },
      SlideButton: BUTTON_RULE,
    },
  },
  {
    // Legacy `chips/TabbedChips` has no `compact` prop, so it is not listed here.
    pathSuffix: '/chips(?:/[^/]+)*$',
    components: {
      Chip: CHIP_RULE,
      InputChip: CHIP_RULE,
      MediaChip: CHIP_RULE,
      SelectChip: CHIP_RULE,
    },
  },
  {
    // Only TextInput and SearchInput. The legacy `controls/Select`, `NativeInput`,
    // `NativeTextArea`, `InputIcon` and `SelectOption` all have a `compact` that is either
    // undeprecated or deprecated toward something other than `size`.
    // SearchInput exposes no `label`/`labelVariant`, so it needs no label handling.
    pathSuffix: '/controls(?:/[^/]+)*$',
    components: {
      TextInput: INPUT_RULE,
      SearchInput: { ...INPUT_RULE, labelBehavior: 'none' },
    },
  },
  {
    pathSuffix: '/dates(?:/[^/]+)*$',
    components: {
      DateInput: INPUT_RULE,
      DatePicker: INPUT_RULE,
    },
  },
  {
    // The optional group lets the bare `…/alpha` barrel match as well as the per-feature paths.
    // `DefaultSelectDropdown`, `DefaultSelectOption`, `DefaultSelectOptionGroup` and
    // `DefaultSelectAllOption` are excluded: their `compact` is not deprecated.
    pathSuffix: '/alpha(?:/(?:select|select-chip|tabbed-chips|combobox)(?:/[^/]+)*)?$',
    components: {
      Select: SELECT_RULE,
      Combobox: SELECT_RULE,
      DefaultSelectControl: SELECT_RULE,
      DefaultComboboxControl: SELECT_RULE,
      SelectChip: CHIP_RULE,
      SelectChipControl: CHIP_RULE,
      TabbedChips: CHIP_RULE,
    },
  },
];

function buildImportRegex(packageScope: string | undefined, pathSuffix: string): RegExp {
  const prefix = scopedModulePathRegexPrefix(packageScope);
  return new RegExp(`${prefix}/(cds-web|cds-mobile)${pathSuffix}`);
}

export default function transformer(file: FileInfo, api: API, options: Options) {
  const j = api.jscodeshift;
  const root = j(file.source);

  const packageScope = getPackageScopeFromOptions(options);
  const rewrites = getImportMappingsFromOptions(options);
  const groupMatchers = IMPORT_GROUPS.map((group) => ({
    regex: buildImportRegex(packageScope, group.pathSuffix),
    components: group.components,
  }));

  /** Local JSX identifier → migration rule, so aliased imports are handled too. */
  const rulesByLocalName = new Map<string, CompactRule>();

  root.find(j.ImportDeclaration).forEach((path) => {
    const src = path.value.source;
    if (!j.StringLiteral.check(src)) return;

    const resolvedSource = applyImportMappings(src.value, rewrites);
    const group = groupMatchers.find((matcher) => matcher.regex.test(resolvedSource));
    if (!group) return;

    path.value.specifiers?.forEach((specifier) => {
      if (!j.ImportSpecifier.check(specifier)) return;
      const rule = group.components[specifier.imported.name];
      if (rule) {
        rulesByLocalName.set(specifier.local?.name ?? specifier.imported.name, rule);
      }
    });
  });

  if (rulesByLocalName.size === 0) {
    return null;
  }

  const isAttrNamed = (attr: JSXAttribute | JSXSpreadAttribute, name: string): boolean =>
    j.JSXAttribute.check(attr) && j.JSXIdentifier.check(attr.name) && attr.name.name === name;

  const findAttr = (element: JSXElement, name: string): JSXAttribute | undefined =>
    (element.openingElement.attributes ?? []).find((attr) => isAttrNamed(attr, name)) as
      | JSXAttribute
      | undefined;

  const hasSpread = (element: JSXElement): boolean =>
    (element.openingElement.attributes ?? []).some((attr) => j.JSXSpreadAttribute.check(attr));

  /** String value of a JSX attribute written as a plain literal, else `undefined`. */
  const literalValue = (attr: JSXAttribute | undefined): string | undefined =>
    attr && j.StringLiteral.check(attr.value) ? attr.value.value : undefined;

  /** Emits one combined TODO for the element. Returns whether a comment was inserted. */
  const emitTodo = (path: ASTPath<JSXElement>, notes: string[], componentName: string): boolean => {
    if (notes.length === 0 || hasMigrationTodo(path)) return false;
    addTodoComment(j, path, TRANSFORM_NAME, notes.join(' '));
    transformLogger.warn(
      `${componentName}: ${notes.join(' ')}`,
      file.path,
      path.value.loc?.start.line,
    );
    return true;
  };

  let hasChanges = false;

  root.find(j.JSXElement).forEach((path) => {
    const element = path.value;
    const opening = element.openingElement;
    if (!j.JSXIdentifier.check(opening.name)) return;

    const rule = rulesByLocalName.get(opening.name.name);
    if (!rule) return;

    const attributes = opening.attributes ?? [];
    const compactIndex = attributes.findIndex((attr) => isAttrNamed(attr, 'compact'));
    if (compactIndex === -1) return;

    const componentName = opening.name.name;
    const line = element.loc?.start.line;
    const compactAttr = attributes[compactIndex] as JSXAttribute;
    const sizeAttr = findAttr(element, 'size');
    const notes: string[] = [];

    // `size` already wins over `compact` at runtime, so the prop is redundant — except on the
    // select family, where `compact` is forwarded to the dropdown independently of `size`.
    if (sizeAttr) {
      if (!j.StringLiteral.check(sizeAttr.value)) {
        notes.push(
          '`size` is a dynamic expression here, so the deprecated `compact` still applies whenever it resolves to `undefined`. Remove `compact` once `size` is always set.',
        );
        hasChanges = emitTodo(path, notes, componentName) || hasChanges;
        return;
      }

      attributes.splice(compactIndex, 1);
      emitTodo(path, notes, componentName);
      transformLogger.success(
        `Removed redundant \`compact\` from ${componentName} (\`size\` already wins)`,
        file.path,
        line,
      );
      hasChanges = true;
      return;
    }

    const compactValue = compactAttr.value;
    const innerExpression = j.JSXExpressionContainer.check(compactValue)
      ? compactValue.expression
      : undefined;
    const isBooleanLiteral = innerExpression?.type === 'BooleanLiteral';
    const isStaticTrue =
      compactValue === null ||
      compactValue === undefined ||
      (isBooleanLiteral && innerExpression.value === true);
    const isStaticFalse = isBooleanLiteral && innerExpression.value === false;

    if (isStaticFalse) {
      if (rule.compactDefaultsTrue) {
        // Dropping the prop would fall back to the component's own `compact = true` default,
        // so the falsy branch has to be spelled out.
        compactAttr.name = j.jsxIdentifier('size');
        compactAttr.value = j.stringLiteral(rule.defaultSize);
        transformLogger.success(
          `${componentName}: compact={false} → size="${rule.defaultSize}"`,
          file.path,
          line,
        );
      } else {
        attributes.splice(compactIndex, 1);
        transformLogger.success(
          `${componentName}: removed compact={false} (already the default size)`,
          file.path,
          line,
        );
      }
      hasChanges = true;
      return;
    }

    if (!isStaticTrue) {
      // Anything that is not a boolean literal (identifier, member expression, call, …) becomes
      // the equivalent conditional so the deprecated prop disappears entirely.
      if (!innerExpression || innerExpression.type === 'JSXEmptyExpression') {
        notes.push('`compact` has an unexpected value; migrate it to `size` manually.');
        hasChanges = emitTodo(path, notes, componentName) || hasChanges;
        return;
      }

      compactAttr.name = j.jsxIdentifier('size');
      compactAttr.value = j.jsxExpressionContainer(
        j.conditionalExpression(
          innerExpression,
          j.stringLiteral(rule.compactSize),
          j.stringLiteral(rule.defaultSize),
        ),
      );

      if (rule.labelBehavior !== 'none') {
        notes.push(
          '`compact` also placed the label inline when truthy; add a matching `labelVariant` if that placement mattered.',
        );
      }
      emitTodo(path, notes, componentName);
      transformLogger.success(
        `${componentName}: dynamic compact → size={… ? '${rule.compactSize}' : '${rule.defaultSize}'}`,
        file.path,
        line,
      );
      hasChanges = true;
      return;
    }

    // Static truthy `compact`: the common case.
    compactAttr.name = j.jsxIdentifier('size');
    compactAttr.value = j.stringLiteral(rule.compactSize);

    if (rule.labelBehavior !== 'none') {
      const labelAttr = findAttr(element, 'label') ?? findAttr(element, 'labelNode');
      const labelVariantAttr = findAttr(element, 'labelVariant');
      const typeAttr = rule.labelBehavior === 'select' ? findAttr(element, 'type') : undefined;
      const typeLiteral = literalValue(typeAttr);
      const typeIsDynamic = Boolean(typeAttr) && typeLiteral === undefined;

      if (typeIsDynamic) {
        notes.push(
          '`type` is dynamic: legacy `compact` placed the label inline for single-select but left it outside for multi-select. Set `labelVariant` accordingly.',
        );
      } else if (typeLiteral === 'multi') {
        // Legacy compact discarded `labelVariant` entirely for multi-select and kept the label
        // outside, so a caller-supplied variant starts applying again after this rewrite.
        if (labelVariantAttr) {
          notes.push(
            '`compact` used to discard `labelVariant` on multi-select; it now takes effect again. Remove it to keep the label outside.',
          );
        }
      } else if (labelAttr) {
        if (!labelVariantAttr) {
          attributes.splice(
            attributes.indexOf(compactAttr) + 1,
            0,
            j.jsxAttribute(j.jsxIdentifier('labelVariant'), j.stringLiteral('inside')),
          );
        } else if (literalValue(labelVariantAttr) !== 'inside') {
          // Legacy `compact` overrode whatever `labelVariant` the caller passed, so preserving
          // behaviour means overwriting it rather than leaving it alone.
          labelVariantAttr.value = j.stringLiteral('inside');
          notes.push(
            '`labelVariant` was overwritten to "inside" because the deprecated `compact` ignored the value passed here.',
          );
        }
      } else if (hasSpread(element)) {
        notes.push(
          'If a `label` reaches this element through the spread, add `labelVariant="inside"` — `compact` used to force the label inline.',
        );
      }
    }

    emitTodo(path, notes, componentName);
    transformLogger.success(
      `${componentName}: compact → size="${rule.compactSize}"`,
      file.path,
      line,
    );
    hasChanges = true;
  });

  if (!hasChanges) {
    return null;
  }

  return root.toSource();
}
