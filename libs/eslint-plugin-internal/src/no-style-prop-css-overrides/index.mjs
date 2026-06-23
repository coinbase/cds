import { ESLintUtils } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(() => null);

/**
 * The Linaria module that exports the `css` tag used throughout cds-web. The
 * rule only inspects `css` tagged templates imported from here so unrelated
 * tagged templates (e.g. GraphQL `gql`, other `css` implementations) are left
 * alone.
 */
const LINARIA_MODULE = '@linaria/core';

/**
 * Maps a CSS property (as written inside a `css` block, lower-cased and
 * kebab-cased) to the cds-web style prop that already owns it. Derived from the
 * style maps in `packages/web/src/styles/responsive/base.ts` and the
 * `DynamicStyleProps` in `packages/web/src/styles/styleProps.ts`.
 *
 * Only properties that a consumer can set through a style prop are listed.
 * Shorthands that a single style prop cannot fully express (e.g. the
 * `background` / `border` / `font` shorthands) are intentionally omitted to
 * avoid false positives.
 */
const cssPropToStyleProp = {
  // Dynamic style props (inline CSS variables consumed by a classname)
  width: 'width',
  height: 'height',
  'min-width': 'minWidth',
  'min-height': 'minHeight',
  'max-width': 'maxWidth',
  'max-height': 'maxHeight',
  'aspect-ratio': 'aspectRatio',
  top: 'top',
  bottom: 'bottom',
  left: 'left',
  right: 'right',
  transform: 'transform',
  'flex-basis': 'flexBasis',
  'flex-grow': 'flexGrow',
  'flex-shrink': 'flexShrink',
  'grid-template-columns': 'gridTemplateColumns',
  'grid-template-rows': 'gridTemplateRows',
  'grid-template-areas': 'gridTemplateAreas',
  'grid-template': 'gridTemplate',
  'grid-auto-columns': 'gridAutoColumns',
  'grid-auto-rows': 'gridAutoRows',
  'grid-auto-flow': 'gridAutoFlow',
  grid: 'grid',
  'grid-row-start': 'gridRowStart',
  'grid-column-start': 'gridColumnStart',
  'grid-row-end': 'gridRowEnd',
  'grid-column-end': 'gridColumnEnd',
  'grid-row': 'gridRow',
  'grid-column': 'gridColumn',
  'grid-area': 'gridArea',
  opacity: 'opacity',
  'z-index': 'zIndex',

  // Static (themed) style props
  color: 'color',
  'background-color': 'background',
  'box-shadow': 'elevation',
  'border-color': 'borderColor',
  'border-width': 'borderWidth',
  'border-top-width': 'borderTopWidth',
  'border-bottom-width': 'borderBottomWidth',
  'border-inline-start-width': 'borderStartWidth',
  'border-inline-end-width': 'borderEndWidth',
  'border-radius': 'borderRadius',
  'border-top-left-radius': 'borderTopLeftRadius',
  'border-top-right-radius': 'borderTopRightRadius',
  'border-bottom-left-radius': 'borderBottomLeftRadius',
  'border-bottom-right-radius': 'borderBottomRightRadius',
  'font-family': 'fontFamily',
  'font-size': 'fontSize',
  'font-weight': 'fontWeight',
  'line-height': 'lineHeight',
  'text-decoration': 'textDecoration',
  'text-transform': 'textTransform',
  'text-align': 'textAlign',
  'user-select': 'userSelect',
  display: 'display',
  overflow: 'overflow',
  visibility: 'visibility',
  position: 'position',
  gap: 'gap',
  'column-gap': 'columnGap',
  'row-gap': 'rowGap',
  'justify-content': 'justifyContent',
  'align-content': 'alignContent',
  'align-items': 'alignItems',
  'align-self': 'alignSelf',
  'flex-direction': 'flexDirection',
  'flex-wrap': 'flexWrap',
  padding: 'padding',
  'padding-top': 'paddingTop',
  'padding-bottom': 'paddingBottom',
  'padding-inline-start': 'paddingStart',
  'padding-inline-end': 'paddingEnd',
  margin: 'margin',
  'margin-top': 'marginTop',
  'margin-bottom': 'marginBottom',
  'margin-inline-start': 'marginStart',
  'margin-inline-end': 'marginEnd',
};

/**
 * Shorthand properties whose matching style prop only accepts a single space
 * token. When the CSS value lists multiple values (e.g. `padding: 4px 8px`) the
 * style prop cannot express it, so the declaration is left alone.
 */
const singleValueOnlyProps = new Set(['padding', 'margin']);

const stripComments = (raw) => raw.replace(/\/\*[\s\S]*?\*\//g, ' ');

const PLACEHOLDER = '\u0000';

/**
 * Returns true when the declaration's property is a single space token, or when
 * the property is not one of the shorthand props that require it.
 */
const valueIsExpressibleAsStyleProp = (property, value) => {
  if (!singleValueOnlyProps.has(property)) {
    return true;
  }
  const normalized = value.replace(/!important\s*$/i, '').trim();
  const tokens = normalized.split(/\s+/).filter(Boolean);
  return tokens.length <= 1;
};

/**
 * Scans the quasis (static chunks) of a `css` tagged template and collects the
 * names of CSS properties declared at the top level of the block — i.e. the
 * declarations that style the element the classname is applied to.
 *
 * Declarations nested inside selectors, pseudo-states, or at-rules (`&:hover`,
 * `@media`, descendant selectors, etc.) live at brace depth >= 1 and are
 * skipped, because those cannot be expressed via static style props anyway.
 *
 * Interpolations (`${...}`) are treated as opaque, brace-neutral tokens so that
 * dynamic values are still detected without their contents corrupting depth
 * tracking.
 */
const collectTopLevelProperties = (templateLiteral) => {
  const properties = new Set();
  const quasis = templateLiteral.quasis;

  let depth = 0;
  let buffer = '';
  let stringQuote = null;

  const flushDeclaration = () => {
    const colonIndex = buffer.indexOf(':');
    buffer = '';
    return colonIndex;
  };

  const recordDeclaration = (declaration) => {
    const colonIndex = declaration.indexOf(':');
    if (colonIndex === -1) {
      return;
    }
    const property = declaration.slice(0, colonIndex).trim().toLowerCase();
    const value = declaration.slice(colonIndex + 1).trim();

    if (!property || property.startsWith('--') || !/^[a-z-]+$/.test(property)) {
      return;
    }
    if (!Object.prototype.hasOwnProperty.call(cssPropToStyleProp, property)) {
      return;
    }
    if (!valueIsExpressibleAsStyleProp(property, value)) {
      return;
    }
    properties.add(property);
  };

  for (let quasiIndex = 0; quasiIndex < quasis.length; quasiIndex += 1) {
    const raw = stripComments(quasis[quasiIndex].value.raw ?? '');

    for (let i = 0; i < raw.length; i += 1) {
      const char = raw[i];

      if (stringQuote) {
        if (char === stringQuote && raw[i - 1] !== '\\') {
          stringQuote = null;
        }
        buffer += char;
        continue;
      }

      if (char === '"' || char === "'") {
        stringQuote = char;
        buffer += char;
        continue;
      }

      if (char === '{') {
        // The buffer was a selector / at-rule prelude; descend into it.
        depth += 1;
        buffer = '';
      } else if (char === '}') {
        if (depth > 0) {
          depth -= 1;
        }
        buffer = '';
      } else if (char === ';') {
        if (depth === 0) {
          recordDeclaration(buffer);
        }
        buffer = '';
      } else {
        buffer += char;
      }
    }

    // Between two quasis sits an interpolation. Represent it as an opaque,
    // brace-neutral token so a declaration value like `height: ${h}` is still
    // captured and depth tracking is unaffected.
    if (quasiIndex < quasis.length - 1) {
      buffer += PLACEHOLDER;
    }
  }

  // A final declaration may omit its trailing semicolon.
  if (depth === 0) {
    recordDeclaration(buffer);
  }

  return properties;
};

const rule = createRule({
  name: 'no-style-prop-css-overrides',
  meta: {
    type: 'problem',
    docs: {
      description:
        'Disallow setting CSS properties in a Linaria `css` block when a cds-web style prop already owns them, since the css class silently overrides consumer-provided style props',
      recommended: 'error',
    },
    schema: [],
    messages: {
      cssOverridesStyleProp:
        "Avoid setting `{{property}}` in a Linaria `css` block: it is owned by the `{{styleProp}}` style prop. Because the component's css class is emitted after the base style-prop classes at equal specificity, it wins the source-order tiebreaker and silently overrides values consumers pass via `{{styleProp}}`. Apply the default through the `{{styleProp}}` prop instead, or move this declaration into a nested selector/pseudo-state if it genuinely cannot be expressed as a style prop.",
    },
  },
  defaultOptions: [],
  create(context) {
    const cssLocalNames = new Set();

    return {
      ImportDeclaration(node) {
        if (node.source.value !== LINARIA_MODULE) {
          return;
        }
        for (const specifier of node.specifiers) {
          if (
            specifier.type === 'ImportSpecifier' &&
            specifier.imported.type === 'Identifier' &&
            specifier.imported.name === 'css'
          ) {
            cssLocalNames.add(specifier.local.name);
          }
        }
      },
      TaggedTemplateExpression(node) {
        if (node.tag.type !== 'Identifier' || !cssLocalNames.has(node.tag.name)) {
          return;
        }

        const offendingProperties = collectTopLevelProperties(node.quasi);

        for (const property of offendingProperties) {
          context.report({
            node,
            messageId: 'cssOverridesStyleProp',
            data: {
              property,
              styleProp: cssPropToStyleProp[property],
            },
          });
        }
      },
    };
  },
});

export default rule;
