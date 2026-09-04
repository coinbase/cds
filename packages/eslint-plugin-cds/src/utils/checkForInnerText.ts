import { AST_NODE_TYPES, type TSESTree } from '@typescript-eslint/utils';

export const tryTrim = (value: unknown) => {
  return typeof value === 'string' ? value.trim() : value;
};

export const checkElement = (
  parent: TSESTree.JSXElement | TSESTree.JSXFragment,
  depth: number,
  maxDepth: number,
): boolean => {
  if (depth > maxDepth) {
    return false;
  }

  const evaluateExpression = (
    expressionContainer: TSESTree.Expression | TSESTree.JSXEmptyExpression,
  ): boolean => {
    switch (expressionContainer.type) {
      case AST_NODE_TYPES.Literal:
        return (
          expressionContainer.value !== undefined &&
          expressionContainer.value !== null &&
          expressionContainer.value !== ''
        );

      case AST_NODE_TYPES.Identifier:
        return expressionContainer.name !== undefined && expressionContainer.name !== null;

      case AST_NODE_TYPES.LogicalExpression:
        return (
          evaluateExpression(expressionContainer.left) ||
          evaluateExpression(expressionContainer.right)
        );

      case AST_NODE_TYPES.JSXEmptyExpression:
        return false;

      case AST_NODE_TYPES.CallExpression:
        // Assuming any function call or specific function is valid content
        return true;

      case AST_NODE_TYPES.JSXElement:
      case AST_NODE_TYPES.JSXFragment:
        return checkElement(expressionContainer, 0, 5);

      default:
        return true;
    }
  };

  for (const child of parent.children) {
    switch (child.type) {
      case AST_NODE_TYPES.JSXSpreadChild:
        return true;

      case AST_NODE_TYPES.JSXText:
        if (tryTrim(child.value)) {
          return true;
        }
        break;

      case AST_NODE_TYPES.JSXExpressionContainer:
        if (evaluateExpression(child.expression)) {
          return true;
        }
        break;

      case AST_NODE_TYPES.JSXFragment:
      case AST_NODE_TYPES.JSXElement:
        if (checkElement(child, depth + 1, maxDepth)) {
          return true;
        }
        break;

      default:
        break;
    }
  }
  return false;
};

export const checkForInnerText = (parent: TSESTree.JSXElement, maxDepth = 5) => {
  return checkElement(parent, 0, maxDepth);
};
