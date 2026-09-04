import type { TSESTree } from '@typescript-eslint/utils';
import { AST_NODE_TYPES } from '@typescript-eslint/utils';

/**
 * Checks if a JSXAttribute is a truthy boolean attribute.
 *
 * @param {TSESTree.JSXAttribute} attribute - The JSXAttribute to check.
 * @returns {boolean} True if the attribute is a truthy boolean attribute, false otherwise.
 */
export const isTruthyJSXBooleanAttribute = (attribute: TSESTree.JSXAttribute) => {
  if (attribute.value === null) {
    return true;
  }

  if (attribute.value.type === AST_NODE_TYPES.Literal) {
    return attribute.value.value === true;
  }

  if (
    attribute.value.type === AST_NODE_TYPES.JSXExpressionContainer &&
    attribute.value.expression.type === AST_NODE_TYPES.Literal
  ) {
    return attribute.value.expression.value === true;
  }

  return true;
};
