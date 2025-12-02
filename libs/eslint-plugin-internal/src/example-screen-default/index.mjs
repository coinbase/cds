import { ESLintUtils } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(() => null);

const rule = createRule({
  name: 'example-screen-default',
  meta: {
    type: 'problem',
    docs: {
      description:
        'Enforce that storybook files default-export a component whose root element is <ExampleScreen>',
      recommended: 'error',
    },
    schema: [],
    messages: {
      missingDefaultExport: 'Storybook files must have a default export.',
      defaultExportMustBeComponent:
        'The default export must be a component function that returns JSX.',
      defaultExportMustReturnExampleScreen:
        'The default export must return JSX whose top-level element is <ExampleScreen>.',
    },
  },
  defaultOptions: [],
  create(context) {
    const sourceCode = context.sourceCode ?? context.getSourceCode?.();
    let hasDefaultExport = false;

    return {
      ExportDefaultDeclaration(node) {
        hasDefaultExport = true;

        const functionLike = resolveFunctionLikeDeclaration(node.declaration, sourceCode);

        if (!functionLike) {
          context.report({
            node: node.declaration ?? node,
            messageId: 'defaultExportMustBeComponent',
          });
          return;
        }

        if (!returnsExampleScreen(functionLike)) {
          context.report({
            node:
              functionLike.type === 'FunctionDeclaration'
                ? functionLike
                : (node.declaration ?? node),
            messageId: 'defaultExportMustReturnExampleScreen',
          });
        }
      },
      'Program:exit'(programNode) {
        if (!hasDefaultExport) {
          context.report({
            node: programNode,
            messageId: 'missingDefaultExport',
          });
        }
      },
    };
  },
});

function resolveFunctionLikeDeclaration(declarationNode, sourceCode) {
  if (!declarationNode || !sourceCode) return null;
  if (isFunctionLike(declarationNode)) {
    return declarationNode;
  }

  if (declarationNode.type === 'Identifier') {
    return findFunctionLikeByName(sourceCode.ast.body, declarationNode.name);
  }

  return null;
}

function isFunctionLike(node) {
  return (
    node.type === 'FunctionDeclaration' ||
    node.type === 'FunctionExpression' ||
    node.type === 'ArrowFunctionExpression'
  );
}

function findFunctionLikeByName(programBody, identifierName) {
  for (const statement of programBody) {
    const result = extractFunctionLikeFromStatement(statement, identifierName);
    if (result) {
      return result;
    }
  }

  return null;
}

function extractFunctionLikeFromStatement(statement, identifierName) {
  if (!statement) return null;

  if (statement.type === 'FunctionDeclaration') {
    return statement.id?.name === identifierName ? statement : null;
  }

  if (statement.type === 'VariableDeclaration') {
    for (const declarator of statement.declarations) {
      const result = extractFunctionLikeFromDeclarator(declarator, identifierName);
      if (result) {
        return result;
      }
    }
    return null;
  }

  if (statement.type === 'ExportNamedDeclaration' && statement.declaration) {
    return extractFunctionLikeFromStatement(statement.declaration, identifierName);
  }

  return null;
}

function extractFunctionLikeFromDeclarator(declarator, identifierName) {
  if (
    declarator.id.type === 'Identifier' &&
    declarator.id.name === identifierName &&
    declarator.init &&
    isFunctionLike(unwrapExpression(declarator.init))
  ) {
    return unwrapExpression(declarator.init);
  }

  return null;
}

function returnsExampleScreen(functionNode) {
  const returnExpressions = getReturnExpressions(functionNode);

  if (returnExpressions.length === 0) {
    return false;
  }

  return returnExpressions.every((expression) => isExampleScreenElement(expression));
}

function getReturnExpressions(node) {
  if (node.type === 'ArrowFunctionExpression' && node.body.type !== 'BlockStatement') {
    return [node.body];
  }

  const bodyStatements = node.body?.body ?? [];

  return bodyStatements
    .filter((statement) => statement.type === 'ReturnStatement' && statement.argument)
    .map((statement) => statement.argument);
}

function isExampleScreenElement(expression) {
  const unwrappedExpression = unwrapExpression(expression);

  if (unwrappedExpression?.type === 'JSXElement') {
    return isExampleScreenName(unwrappedExpression.openingElement.name);
  }

  return false;
}

function unwrapExpression(expression) {
  let currentExpression = expression;

  while (currentExpression) {
    if (currentExpression.type === 'ParenthesizedExpression') {
      currentExpression = currentExpression.expression;
      continue;
    }

    if (
      currentExpression.type === 'TSAsExpression' ||
      currentExpression.type === 'TSSatisfiesExpression' ||
      currentExpression.type === 'TSNonNullExpression'
    ) {
      currentExpression = currentExpression.expression;
      continue;
    }

    break;
  }

  return currentExpression;
}

function isExampleScreenName(nameNode) {
  return nameNode.type === 'JSXIdentifier' && nameNode.name === 'ExampleScreen';
}

export default rule;
