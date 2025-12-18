const isTypeAlias = require('./isTypeAlias');
const shouldAddToParentTypes = require('./shouldAddToParentTypes');

// This is a temporary fix to show onClick prop for polymorphic components on web. We could be having a docgen rewrite in the future to be more dynamic with these types.
function ensureWebPolymorphicOnClick(doc, props) {
  // Docgen runs across web + mobile. Only surface DOM props for web components.
  const isWeb = typeof doc.filePath === 'string' && doc.filePath.includes('/packages/web/');
  if (!isWeb) return props;

  // Only apply to polymorphic components; otherwise this would add "onClick" to everything on web.
  const isPolymorphic =
    props.some((p) => p.name === 'as') || props.some((p) => p.parent === 'polymorphism');
  if (!isPolymorphic) return props;

  if (props.some((p) => p.name === 'onClick')) return props;

  return [
    ...props,
    {
      name: 'onClick',
      required: false,
      defaultValue: undefined,
      description:
        'Click handler for the underlying element. This is exposed for polymorphic components, but support and event target typing depend on `as` (especially when `as` is a custom component).',
      parent: 'HTMLAttributes',
      tags: {},
      // String type is supported by the plugin pipeline (processed later by docgenParser).
      // For polymorphic components, the underlying element depends on `as`, so we intentionally use a
      // safe element-agnostic type to avoid implying a specific element like HTMLDivElement.
      type: 'React.MouseEventHandler<HTMLElement>',
    },
  ];
}

/**
 * Used in docgen plugin
 *
 * This is a callback function that gets called for each doc the plugin has parsed and allows us to transform
 * that data based on our needs. The only requirement is that we return the data in the same shape it was
 * provided to us.
 *
 * If you want to...
 * 1. show prop in the props table - include the prop in the doc's props array.
 * 2. hide prop in the props table - filter the prop from the doc's props array.
 * 3. show prop in parentTypes UI - call addToParentTypes with the prop in processDoc
 * 4. hide prop in the props table + show prop in parentTypes UI - do both #2 and #3 above
 */
function onProcessDoc(doc, { addToSharedTypeAliases, addToParentTypes, formatString }) {
  const props = doc.props
    .map((prop) => {
      let parentType = prop.parent;
      /** Let's minimize noise in "Extends from..." UI. Some parent types are redudant like
       * AccessibilityPropsIOS and AccessibilityPropsAndroid. We don't have to get that specific for
       * our documentation.
       */
      if (prop.parent.includes('AccessibilityProps')) parentType = 'AccessibilityProps';
      if (prop.parent.includes('HTMLAttributes')) parentType = 'HTMLAttributes';
      if (prop.parent.includes('TVViewProps')) parentType = 'TVViewProps';
      if (prop.parent.includes('ScrollViewProps')) parentType = 'ScrollViewProps';
      if (prop.parent.includes('ViewProps')) parentType = 'ViewProps';
      return { ...prop, parent: parentType };
    })
    .map((prop) => {
      if (isTypeAlias(prop)) {
        const { raw: alias, value } = prop.type;

        let formattedValue;

        // Format the value based on its structure
        if (alias && alias.includes('ResponsiveProp<')) {
          // Special handling for ResponsiveProp types
          formattedValue = formatResponsivePropValue(alias, value, formatString);
        } else if (Array.isArray(value)) {
          // Standard handling for array values
          formattedValue = formatString(value.map((item) => item.value).join(' | '));
        } else {
          // Fallback for other formats
          formattedValue = formatString(prop.type.raw);
        }

        addToSharedTypeAliases(alias, formattedValue);
        return { ...prop, type: alias };
      }
      return { ...prop, type: prop.type.raw };
    })
    /** Example of us filtering out parent types from surfacing in props table UI */
    .filter((prop) => {
      if (shouldAddToParentTypes(doc, prop)) {
        addToParentTypes(prop);
        // Exclude parentType from main props display
        return false;
      }
      return true;
    });

  return { ...doc, props: ensureWebPolymorphicOnClick(doc, props) };
}

/**
 * Special formatter for ResponsiveProp values to present them in a more structured way
 * Extracts only the actual token values, ignoring the responsive type structure
 */
function formatResponsivePropValue(typeName, value, formatString) {
  if (!Array.isArray(value)) {
    return formatString(String(value));
  }

  // Filter out all the responsive object structure items
  // (base, phone, tablet, desktop, undefined, etc.)
  const tokenValues = value.filter((item) => {
    const val = item.value || '';
    return (
      !val.includes('base?:') &&
      !val.includes('phone?:') &&
      !val.includes('tablet?:') &&
      !val.includes('desktop?:') &&
      !val.includes('undefined;') &&
      !val.includes('{') &&
      !val.includes('}')
    );
  });

  // Just return the token values as a pipe-separated list
  return tokenValues.map((item) => item.value.trim()).join(' | ');
}

module.exports = onProcessDoc;
