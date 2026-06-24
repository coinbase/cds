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
 * Function names that compose classnames. Their arguments are traversed when
 * resolving the `css` blocks referenced by an element's `className`.
 */
const CLASSNAME_COMBINERS = new Set(['cx', 'cn', 'clsx', 'classnames', 'classNames']);

/**
 * cds-web style props that map 1:1 to a single CSS property. The value is the
 * CSS property the style prop emits (see packages/web/src/styles/responsive/
 * base.ts and DynamicStyleProps in styleProps.ts). Derived so the css-block
 * side and the style-prop side share the exact same property strings.
 */
const stylePropToCssProperty = {
  // Dynamic style props
  width: 'width',
  height: 'height',
  minWidth: 'min-width',
  minHeight: 'min-height',
  maxWidth: 'max-width',
  maxHeight: 'max-height',
  aspectRatio: 'aspect-ratio',
  top: 'top',
  bottom: 'bottom',
  left: 'left',
  right: 'right',
  transform: 'transform',
  flexBasis: 'flex-basis',
  flexGrow: 'flex-grow',
  flexShrink: 'flex-shrink',
  gridTemplateColumns: 'grid-template-columns',
  gridTemplateRows: 'grid-template-rows',
  gridTemplateAreas: 'grid-template-areas',
  gridTemplate: 'grid-template',
  gridAutoColumns: 'grid-auto-columns',
  gridAutoRows: 'grid-auto-rows',
  gridAutoFlow: 'grid-auto-flow',
  grid: 'grid',
  gridRowStart: 'grid-row-start',
  gridColumnStart: 'grid-column-start',
  gridRowEnd: 'grid-row-end',
  gridColumnEnd: 'grid-column-end',
  gridRow: 'grid-row',
  gridColumn: 'grid-column',
  gridArea: 'grid-area',
  opacity: 'opacity',
  zIndex: 'z-index',

  // Static (themed) style props
  color: 'color',
  background: 'background-color',
  elevation: 'box-shadow',
  borderColor: 'border-color',
  borderWidth: 'border-width',
  borderTopWidth: 'border-top-width',
  borderBottomWidth: 'border-bottom-width',
  borderStartWidth: 'border-inline-start-width',
  borderEndWidth: 'border-inline-end-width',
  borderRadius: 'border-radius',
  borderTopLeftRadius: 'border-top-left-radius',
  borderTopRightRadius: 'border-top-right-radius',
  borderBottomLeftRadius: 'border-bottom-left-radius',
  borderBottomRightRadius: 'border-bottom-right-radius',
  fontFamily: 'font-family',
  fontSize: 'font-size',
  fontWeight: 'font-weight',
  lineHeight: 'line-height',
  textDecoration: 'text-decoration',
  textTransform: 'text-transform',
  textAlign: 'text-align',
  userSelect: 'user-select',
  display: 'display',
  overflow: 'overflow',
  visibility: 'visibility',
  position: 'position',
  gap: 'gap',
  columnGap: 'column-gap',
  rowGap: 'row-gap',
  justifyContent: 'justify-content',
  alignContent: 'align-content',
  alignItems: 'align-items',
  alignSelf: 'align-self',
  flexDirection: 'flex-direction',
  flexWrap: 'flex-wrap',
};

/**
 * Padding/margin style props and CSS properties don't map 1:1: the shorthand
 * props expand to several physical sides, and the `padding`/`margin` style
 * props emit four longhands. We compare them via shared "atom" tokens (one per
 * physical side) so e.g. a css `padding-top` conflicts with a `padding`,
 * `paddingY`, or `paddingTop` style prop.
 */
const PADDING_ATOMS = {
  top: 'padding:top',
  bottom: 'padding:bottom',
  start: 'padding:inline-start',
  end: 'padding:inline-end',
};
const MARGIN_ATOMS = {
  top: 'margin:top',
  bottom: 'margin:bottom',
  start: 'margin:inline-start',
  end: 'margin:inline-end',
};

/** Maps a style prop name to the set of atoms it controls. */
const stylePropToAtoms = (() => {
  const map = {};
  for (const [styleProp, cssProperty] of Object.entries(stylePropToCssProperty)) {
    map[styleProp] = [cssProperty];
  }
  Object.assign(map, {
    padding: [PADDING_ATOMS.top, PADDING_ATOMS.bottom, PADDING_ATOMS.start, PADDING_ATOMS.end],
    paddingX: [PADDING_ATOMS.start, PADDING_ATOMS.end],
    paddingY: [PADDING_ATOMS.top, PADDING_ATOMS.bottom],
    paddingTop: [PADDING_ATOMS.top],
    paddingBottom: [PADDING_ATOMS.bottom],
    paddingStart: [PADDING_ATOMS.start],
    paddingEnd: [PADDING_ATOMS.end],
    margin: [MARGIN_ATOMS.top, MARGIN_ATOMS.bottom, MARGIN_ATOMS.start, MARGIN_ATOMS.end],
    marginX: [MARGIN_ATOMS.start, MARGIN_ATOMS.end],
    marginY: [MARGIN_ATOMS.top, MARGIN_ATOMS.bottom],
    marginTop: [MARGIN_ATOMS.top],
    marginBottom: [MARGIN_ATOMS.bottom],
    marginStart: [MARGIN_ATOMS.start],
    marginEnd: [MARGIN_ATOMS.end],
  });
  return map;
})();

/** Maps a CSS property (as written in a `css` block) to the atoms it controls. */
const cssPropertyToAtoms = (() => {
  const map = {};
  for (const cssProperty of Object.values(stylePropToCssProperty)) {
    map[cssProperty] = [cssProperty];
  }
  Object.assign(map, {
    padding: [PADDING_ATOMS.top, PADDING_ATOMS.bottom, PADDING_ATOMS.start, PADDING_ATOMS.end],
    'padding-top': [PADDING_ATOMS.top],
    'padding-bottom': [PADDING_ATOMS.bottom],
    'padding-inline-start': [PADDING_ATOMS.start],
    'padding-inline-end': [PADDING_ATOMS.end],
    margin: [MARGIN_ATOMS.top, MARGIN_ATOMS.bottom, MARGIN_ATOMS.start, MARGIN_ATOMS.end],
    'margin-top': [MARGIN_ATOMS.top],
    'margin-bottom': [MARGIN_ATOMS.bottom],
    'margin-inline-start': [MARGIN_ATOMS.start],
    'margin-inline-end': [MARGIN_ATOMS.end],
  });
  return map;
})();

const isOwnedCssProperty = (property) =>
  Object.prototype.hasOwnProperty.call(cssPropertyToAtoms, property);

const stripComments = (raw) => raw.replace(/\/\*[\s\S]*?\*\//g, ' ');

/**
 * Scans the quasis (static chunks) of a `css` tagged template and returns the
 * set of owned CSS properties declared at the **top level** of the block — the
 * declarations that style the element the classname is applied to.
 *
 * Declarations nested inside selectors, pseudo-states, or at-rules (`&:hover`,
 * `@media`, descendant selectors) live at brace depth >= 1 and are skipped:
 * those cannot be expressed via static style props anyway. Interpolations
 * (`${...}`) are treated as opaque, brace-neutral tokens.
 */
const collectOwnedPropertiesFromTemplate = (templateLiteral) => {
  const properties = new Set();
  const quasis = templateLiteral.quasis;

  let depth = 0;
  let buffer = '';
  let stringQuote = null;

  const recordDeclaration = (declaration) => {
    const colonIndex = declaration.indexOf(':');
    if (colonIndex === -1) {
      return;
    }
    const property = declaration.slice(0, colonIndex).trim().toLowerCase();
    if (!property || property.startsWith('--') || !/^[a-z-]+$/.test(property)) {
      return;
    }
    if (isOwnedCssProperty(property)) {
      properties.add(property);
    }
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

    if (quasiIndex < quasis.length - 1) {
      buffer += '\u0000';
    }
  }

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
        'Disallow a Linaria `css` class from setting a CSS property that is also passed to the same element as a cds-web style prop, since the css class silently overrides the style prop',
      recommended: 'error',
    },
    schema: [],
    messages: {
      stylePropOverriddenByCss:
        'The `{{styleProp}}` style prop on this element is silently overridden by `{{property}}`, which is set in a Linaria `css` class applied to the same element via `className`. The css class is emitted after the style-prop class at equal specificity, so it wins the CSS source-order tiebreaker. Remove `{{property}}` from the css block (let the `{{styleProp}}` prop control it, defaulting it on the component if needed), or stop passing the `{{styleProp}}` style prop to this element.',
      stylePropOverriddenByCssViaSpread:
        'The `{{styleProp}}` style prop can reach this element through `{...{{spread}}}`, but `{{property}}` is set in a Linaria `css` class applied to the same element via `className` and silently overrides it. The css class is emitted after the style-prop class at equal specificity, so it wins the CSS source-order tiebreaker. Remove `{{property}}` from the css block (let the `{{styleProp}}` prop control it, defaulting it on the component if needed), or destructure `{{styleProp}}` out of the spread so it no longer reaches this element.',
    },
  },
  defaultOptions: [],
  create(context) {
    // This rule is type-aware: it resolves the type of `{...spread}` arguments
    // to discover which style props can reach an element without being written
    // as explicit attributes. Requires type information to be configured.
    const services = ESLintUtils.getParserServices(context);

    /** Local identifiers that the `css` tag is imported as from @linaria/core. */
    const cssLocalNames = new Set();
    /** Map of `const NAME = css\`...\`` variable name -> owned CSS properties. */
    const cssBlockProperties = new Map();

    const collectClassNameCssProperties = (expression, out) => {
      if (!expression) {
        return;
      }
      switch (expression.type) {
        case 'Identifier': {
          const blockProps = cssBlockProperties.get(expression.name);
          if (blockProps) {
            for (const property of blockProps) {
              out.add(property);
            }
          }
          break;
        }
        case 'TaggedTemplateExpression': {
          if (expression.tag.type === 'Identifier' && cssLocalNames.has(expression.tag.name)) {
            for (const property of collectOwnedPropertiesFromTemplate(expression.quasi)) {
              out.add(property);
            }
          }
          break;
        }
        case 'CallExpression': {
          const { callee } = expression;
          const calleeName =
            callee.type === 'Identifier'
              ? callee.name
              : callee.type === 'MemberExpression' && callee.property.type === 'Identifier'
                ? callee.property.name
                : null;
          if (calleeName && CLASSNAME_COMBINERS.has(calleeName)) {
            for (const argument of expression.arguments) {
              collectClassNameCssProperties(argument, out);
            }
          }
          break;
        }
        case 'LogicalExpression': {
          collectClassNameCssProperties(expression.left, out);
          collectClassNameCssProperties(expression.right, out);
          break;
        }
        case 'ConditionalExpression': {
          collectClassNameCssProperties(expression.consequent, out);
          collectClassNameCssProperties(expression.alternate, out);
          break;
        }
        case 'ArrayExpression': {
          for (const element of expression.elements) {
            collectClassNameCssProperties(element, out);
          }
          break;
        }
        case 'TemplateLiteral': {
          for (const subExpression of expression.expressions) {
            collectClassNameCssProperties(subExpression, out);
          }
          break;
        }
        default:
          break;
      }
    };

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
      VariableDeclarator(node) {
        if (
          node.id?.type === 'Identifier' &&
          node.init?.type === 'TaggedTemplateExpression' &&
          node.init.tag.type === 'Identifier' &&
          cssLocalNames.has(node.init.tag.name)
        ) {
          cssBlockProperties.set(node.id.name, collectOwnedPropertiesFromTemplate(node.init.quasi));
        }
      },
      JSXOpeningElement(node) {
        let classNameExpression = null;
        const explicitStyleProps = new Map();
        const spreadAttributes = [];

        for (const attribute of node.attributes) {
          if (attribute.type === 'JSXSpreadAttribute') {
            spreadAttributes.push(attribute);
            continue;
          }
          if (attribute.type !== 'JSXAttribute' || attribute.name?.type !== 'JSXIdentifier') {
            continue;
          }
          const attributeName = attribute.name.name;
          if (attributeName === 'className') {
            if (attribute.value?.type === 'JSXExpressionContainer') {
              classNameExpression = attribute.value.expression;
            }
          } else if (Object.prototype.hasOwnProperty.call(stylePropToAtoms, attributeName)) {
            explicitStyleProps.set(attributeName, attribute);
          }
        }

        if (!classNameExpression) {
          return;
        }

        const cssProperties = new Set();
        collectClassNameCssProperties(classNameExpression, cssProperties);
        if (cssProperties.size === 0) {
          return;
        }

        // Resolve which style props can land on this element, and how. Explicit
        // attributes take precedence over spreads (an explicit attribute is the
        // more actionable place to point the consumer). For each `{...spread}`,
        // the spread argument's type is inspected: any property whose name is a
        // style prop can reach the element through that spread.
        const landableStyleProps = new Map();
        for (const [styleProp, attribute] of explicitStyleProps) {
          landableStyleProps.set(styleProp, { node: attribute, viaSpread: false });
        }
        for (const spreadAttribute of spreadAttributes) {
          const spreadType = services.getTypeAtLocation(spreadAttribute.argument);
          // Unwrap `as`/`satisfies`/`!` so the label reads as the underlying
          // value (e.g. `props` rather than `props satisfies ValidateProps<…>`),
          // and collapse whitespace so a multiline argument stays on one line.
          let labelNode = spreadAttribute.argument;
          while (
            labelNode.type === 'TSAsExpression' ||
            labelNode.type === 'TSSatisfiesExpression' ||
            labelNode.type === 'TSNonNullExpression'
          ) {
            labelNode = labelNode.expression;
          }
          const spreadLabel =
            labelNode.type === 'Identifier'
              ? labelNode.name
              : context.sourceCode.getText(labelNode).replace(/\s+/g, ' ');
          for (const symbol of spreadType.getProperties()) {
            const styleProp = symbol.getName();
            if (
              Object.prototype.hasOwnProperty.call(stylePropToAtoms, styleProp) &&
              !landableStyleProps.has(styleProp)
            ) {
              landableStyleProps.set(styleProp, {
                node: spreadAttribute,
                viaSpread: true,
                spreadLabel,
              });
            }
          }
        }

        if (landableStyleProps.size === 0) {
          return;
        }

        // Index the css block's properties by atom so a style prop can be
        // matched back to the specific property/properties it conflicts with.
        const atomToCssProperties = new Map();
        for (const property of cssProperties) {
          for (const atom of cssPropertyToAtoms[property]) {
            if (!atomToCssProperties.has(atom)) {
              atomToCssProperties.set(atom, new Set());
            }
            atomToCssProperties.get(atom).add(property);
          }
        }

        for (const [styleProp, info] of landableStyleProps) {
          const conflictingProperties = new Set();
          for (const atom of stylePropToAtoms[styleProp]) {
            const matches = atomToCssProperties.get(atom);
            if (matches) {
              for (const property of matches) {
                conflictingProperties.add(property);
              }
            }
          }
          if (conflictingProperties.size === 0) {
            continue;
          }
          const property = [...conflictingProperties].sort().join(', ');
          if (info.viaSpread) {
            context.report({
              node: info.node,
              messageId: 'stylePropOverriddenByCssViaSpread',
              data: { styleProp, property, spread: info.spreadLabel },
            });
          } else {
            context.report({
              node: info.node,
              messageId: 'stylePropOverriddenByCss',
              data: { styleProp, property },
            });
          }
        }
      },
    };
  },
});

export default rule;
