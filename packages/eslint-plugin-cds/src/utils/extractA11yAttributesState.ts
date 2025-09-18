import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/utils';

import { checkForInnerText } from './checkForInnerText';

/**
 * Extracts a11y attribute presence information from a JSXOpeningElement.
 *
 * @param {TSESTree.JSXOpeningElement} node - The JSX opening element node.
 * @returns An object containing the states of required a11y attributes and the component name.
 */
export const extractA11yAttributesState = (
  parent: TSESTree.JSXElement,
  node: TSESTree.JSXOpeningElement,
) => {
  let componentName: string | undefined;

  // a11y JSX attributes for checking only JSX attribute in component
  const a11yJSXAttributes = {
    hasLabel: false,
    hasAccessibilityLabel: false,
    hasHandleBarAccessibilityLabelProps: false,
    hasHelperTextErrorIconAccessibilityLabel: false,
    hasCalendarIconButtonAccessibilityLabel: false,
    hasMissingNextArrowAccessibilityLabel: false,
    hasMissingPreviousArrowAccessibilityLabel: false,
    hasOnDismissPressProp: false,
    hasMissingStartIconAccessibilityLabel: false,
    hasMissingClearIconAccessibilityLabel: false,
  };

  // Complex checks involving spread props
  let hasControlledElementAccessibilityProps = false;
  let hasSpreadProps = false;

  // Map attribute names to corresponding state properties for JSXAttribute non spread checks only
  const a11yAttributeMap: Record<string, keyof typeof a11yJSXAttributes> = {
    label: 'hasLabel',
    accessibilityLabel: 'hasAccessibilityLabel',
    handleBarAccessibilityLabel: 'hasHandleBarAccessibilityLabelProps',
    helperTextErrorIconAccessibilityLabel: 'hasHelperTextErrorIconAccessibilityLabel',
    calendarIconButtonAccessibilityLabel: 'hasCalendarIconButtonAccessibilityLabel',
    nextArrowAccessibilityLabel: 'hasMissingNextArrowAccessibilityLabel',
    previousArrowAccessibilityLabel: 'hasMissingPreviousArrowAccessibilityLabel',
    onDismissPress: 'hasOnDismissPressProp',
    startIconAccessibilityLabel: 'hasMissingStartIconAccessibilityLabel',
    clearIconAccessibilityLabel: 'hasMissingClearIconAccessibilityLabel',
  };

  // Complex inner text check
  const hasInnerText = checkForInnerText(parent);

  // Identify component name based on node type
  if (node.name.type === AST_NODE_TYPES.JSXIdentifier) {
    componentName = node.name.name;
  } else if (node.name.type === AST_NODE_TYPES.JSXMemberExpression) {
    componentName = node.name.property.name;
  }

  if (!componentName) {
    throw Error('Component name not found for node');
  }

  const allNodes = node.attributes;

  // Loop through all the JSX from the initial JSXOpeningElement
  allNodes.forEach((attr) => {
    // General check involving only single JSX a11y Attribute presence
    if (attr.type === AST_NODE_TYPES.JSXAttribute) {
      const attributeName = attr.name.name as string;
      if (a11yAttributeMap[attributeName]) {
        a11yJSXAttributes[a11yAttributeMap[attributeName]] = true;
      }
    }

    // Complex checks involving presence of spread props
    else if (
      attr.type === AST_NODE_TYPES.JSXSpreadAttribute &&
      attr.argument.type === AST_NODE_TYPES.Identifier &&
      attr.argument.name === 'controlledElementAccessibilityProps'
    ) {
      hasControlledElementAccessibilityProps = true;
    } else if (attr.type === AST_NODE_TYPES.JSXSpreadAttribute) {
      hasSpreadProps = true;
    }
  });

  return {
    ...a11yJSXAttributes,
    hasControlledElementAccessibilityProps,
    hasSpreadProps,
    componentName,
    hasInnerText,
  };
};
