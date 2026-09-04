import type { TSESTree } from '@typescript-eslint/utils';
import { AST_NODE_TYPES } from '@typescript-eslint/utils';

/**
 * Gets an attribute from a JSXOpeningElement's attributes.
 *
 * @param {TSESTree.JSXOpeningElement['attributes']} attributes - The attributes of the JSXOpeningElement.
 * @param {string} name - The name of the attribute to get.
 * @returns {TSESTree.JSXAttribute | undefined} The attribute if it exists, otherwise undefined.
 */
export const getAttribute = (
  attributes: TSESTree.JSXOpeningElement['attributes'],
  name: string,
) => {
  return attributes.find(
    (attribute): attribute is TSESTree.JSXAttribute =>
      attribute.type === AST_NODE_TYPES.JSXAttribute && attribute.name.name === name,
  );
};
