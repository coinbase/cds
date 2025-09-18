import { type TSESTree } from '@typescript-eslint/utils';

export const getSimpleNameFromJSX = (node: TSESTree.JSXOpeningElement): string | null => {
  if (node.name.type === 'JSXIdentifier') {
    // Directly return the name for simple identifiers
    return node.name.name;
  }

  // Return null if the component name is accessed via a member expression
  // or if it's a type not handled
  return null;
};
