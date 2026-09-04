import { ESLintUtils } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(() => null);

const rule = createRule({
  name: 'example-screen-contains-example',
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Ensure ExampleScreen renders at least one <Example> (directly or via local components)',
      recommended: 'error',
    },
    schema: [],
    messages: {
      missingExample: 'Stories must render at least one <Example> inside <ExampleScreen>.',
    },
  },
  defaultOptions: [],
  create(context) {
    const sourceCode = context.sourceCode ?? context.getSourceCode?.();
    const componentMap = new Map();
    let defaultExportNode = null;
    let defaultExportName = null;

    function trackComponent(name, node) {
      if (!name || componentMap.has(name)) {
        return;
      }
      componentMap.set(name, node);
    }

    function resolveDefaultExportFunction() {
      if (defaultExportNode && isFunctionLike(defaultExportNode)) {
        return defaultExportNode;
      }

      if (defaultExportName && componentMap.has(defaultExportName)) {
        return componentMap.get(defaultExportName);
      }

      return null;
    }

    return {
      FunctionDeclaration(node) {
        if (node.id?.name) {
          trackComponent(node.id.name, node);
        }
      },
      VariableDeclarator(node) {
        if (
          node.id.type === 'Identifier' &&
          node.init &&
          (node.init.type === 'ArrowFunctionExpression' || node.init.type === 'FunctionExpression')
        ) {
          trackComponent(node.id.name, node.init);
        }
      },
      ExportDefaultDeclaration(node) {
        if (node.declaration.type === 'Identifier') {
          defaultExportName = node.declaration.name;
          return;
        }

        if (isFunctionLike(node.declaration)) {
          defaultExportNode = node.declaration;
        }
      },
      'Program:exit'(programNode) {
        if (!sourceCode) {
          return;
        }

        const defaultFunction = resolveDefaultExportFunction();
        if (!defaultFunction) {
          return;
        }

        const analysisContext = {
          componentMap,
          visited: new Set(),
        };

        const containsExampleScreen = functionContainsElement(defaultFunction, 'ExampleScreen');
        if (!containsExampleScreen) {
          return;
        }

        if (!functionContainsExample(defaultFunction, analysisContext)) {
          context.report({
            node: defaultFunction,
            messageId: 'missingExample',
          });
        }
      },
    };
  },
});

function isFunctionLike(node) {
  return (
    node.type === 'FunctionDeclaration' ||
    node.type === 'FunctionExpression' ||
    node.type === 'ArrowFunctionExpression'
  );
}

function functionContainsElement(fnNode, elementName) {
  const returnExpressions = getReturnExpressions(fnNode);

  return returnExpressions.some((expression) => expressionContainsElement(expression, elementName));
}

function functionContainsExample(fnNode, context) {
  const returnExpressions = getReturnExpressions(fnNode);

  return returnExpressions.some((expression) => expressionContainsExample(expression, context));
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

function expressionContainsElement(expression, elementName) {
  const expr = unwrapExpression(expression);
  if (!expr) {
    return false;
  }

  if (expr.type === 'JSXElement') {
    if (isJSXIdentifier(expr.openingElement.name, elementName)) {
      return true;
    }

    return expr.children.some((child) => jsxChildContainsElement(child, elementName));
  }

  if (expr.type === 'JSXFragment') {
    return expr.children.some((child) => jsxChildContainsElement(child, elementName));
  }

  if (expr.type === 'ConditionalExpression') {
    return (
      expressionContainsElement(expr.consequent, elementName) ||
      expressionContainsElement(expr.alternate, elementName)
    );
  }

  if (expr.type === 'LogicalExpression') {
    return (
      expressionContainsElement(expr.left, elementName) ||
      expressionContainsElement(expr.right, elementName)
    );
  }

  if (expr.type === 'ArrayExpression') {
    return expr.elements.some(
      (element) => element && expressionContainsElement(element, elementName),
    );
  }

  if (expr.type === 'CallExpression') {
    return (
      expr.arguments.some((arg) => expressionContainsElement(arg, elementName)) ||
      expressionContainsElement(expr.callee, elementName)
    );
  }

  return false;
}

function expressionContainsExample(expression, context) {
  const expr = unwrapExpression(expression);
  if (!expr) {
    return false;
  }

  if (expr.type === 'JSXElement') {
    if (isJSXIdentifier(expr.openingElement.name, 'Example')) {
      return true;
    }

    const childContainsExample = expr.children.some((child) =>
      jsxChildContainsExample(child, context),
    );
    if (childContainsExample) {
      return true;
    }

    const customComponentName = getComponentIdentifier(expr.openingElement.name);
    if (
      customComponentName &&
      context.componentMap.has(customComponentName) &&
      !context.visited.has(customComponentName)
    ) {
      context.visited.add(customComponentName);
      const componentNode = context.componentMap.get(customComponentName);
      if (functionContainsExample(componentNode, context)) {
        return true;
      }
    }

    return false;
  }

  if (expr.type === 'JSXFragment') {
    return expr.children.some((child) => jsxChildContainsExample(child, context));
  }

  if (expr.type === 'ConditionalExpression') {
    return (
      expressionContainsExample(expr.consequent, context) ||
      expressionContainsExample(expr.alternate, context)
    );
  }

  if (expr.type === 'LogicalExpression') {
    return (
      expressionContainsExample(expr.left, context) ||
      expressionContainsExample(expr.right, context)
    );
  }

  if (expr.type === 'ArrayExpression') {
    return expr.elements.some((element) => element && expressionContainsExample(element, context));
  }

  if (expr.type === 'CallExpression') {
    const callbackContainsExample = expr.arguments.some(
      (arg) => isFunctionLike(arg) && functionContainsExample(arg, context),
    );
    if (callbackContainsExample) {
      return true;
    }

    return (
      expressionContainsExample(expr.callee, context) ||
      expr.arguments.some((arg) => expressionContainsExample(arg, context))
    );
  }

  return false;
}

function jsxChildContainsElement(child, elementName) {
  if (child.type === 'JSXElement' || child.type === 'JSXFragment') {
    return expressionContainsElement(child, elementName);
  }

  if (child.type === 'JSXExpressionContainer') {
    return expressionContainsElement(child.expression, elementName);
  }

  return false;
}

function jsxChildContainsExample(child, context) {
  if (child.type === 'JSXElement' || child.type === 'JSXFragment') {
    return expressionContainsExample(child, context);
  }

  if (child.type === 'JSXExpressionContainer') {
    return expressionContainsExample(child.expression, context);
  }

  return false;
}

function isJSXIdentifier(nameNode, value) {
  return nameNode.type === 'JSXIdentifier' && nameNode.name === value;
}

function getComponentIdentifier(nameNode) {
  if (nameNode.type === 'JSXIdentifier') {
    return /^[A-Z]/.test(nameNode.name) ? nameNode.name : null;
  }

  return null;
}

function unwrapExpression(expression) {
  let current = expression;

  while (current) {
    if (current.type === 'ParenthesizedExpression') {
      current = current.expression;
      continue;
    }

    if (
      current.type === 'TSAsExpression' ||
      current.type === 'TSSatisfiesExpression' ||
      current.type === 'TSNonNullExpression'
    ) {
      current = current.expression;
      continue;
    }

    break;
  }

  return current;
}

export default rule;
