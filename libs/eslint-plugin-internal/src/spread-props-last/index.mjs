import { ESLintUtils } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(() => null);
const componentWrapperNames = new Set(['memo', 'forwardRef']);

const isFunctionNode = (node) =>
  node?.type === 'FunctionDeclaration' ||
  node?.type === 'FunctionExpression' ||
  node?.type === 'ArrowFunctionExpression';

const isPascalCase = (name) => /^[A-Z]/.test(name);

const isComponentWrapperCall = (node) => {
  if (!node || node.type !== 'CallExpression') {
    return false;
  }

  if (node.callee.type === 'Identifier') {
    return componentWrapperNames.has(node.callee.name);
  }

  if (
    node.callee.type === 'MemberExpression' &&
    !node.callee.computed &&
    node.callee.property.type === 'Identifier'
  ) {
    return componentWrapperNames.has(node.callee.property.name);
  }

  return false;
};

const getNearestFunctionAncestor = (node) => {
  let current = node;

  while (current) {
    if (isFunctionNode(current)) {
      return current;
    }

    current = current.parent;
  }

  return null;
};

const getFirstParamSpreadablePropNames = (functionNode) => {
  const names = new Set();
  const firstParam = functionNode?.params?.[0];

  const collectNames = (paramNode) => {
    if (!paramNode) {
      return;
    }

    if (paramNode.type === 'Identifier') {
      names.add(paramNode.name);
      return;
    }

    if (paramNode.type === 'AssignmentPattern') {
      collectNames(paramNode.left);
      return;
    }

    if (paramNode.type === 'ObjectPattern') {
      for (const property of paramNode.properties) {
        if (property.type === 'RestElement') {
          collectNames(property.argument);
        }
      }
      return;
    }

    if (paramNode.type === 'RestElement') {
      collectNames(paramNode.argument);
    }
  };

  collectNames(firstParam);

  return names;
};

const isComponentFunction = (functionNode) => {
  if (!functionNode) {
    return false;
  }

  if (
    (functionNode.type === 'FunctionDeclaration' || functionNode.type === 'FunctionExpression') &&
    functionNode.id?.type === 'Identifier' &&
    isPascalCase(functionNode.id.name)
  ) {
    return true;
  }

  let current = functionNode;

  while (current?.parent) {
    const parent = current.parent;

    if (parent.type === 'VariableDeclarator' && parent.id.type === 'Identifier') {
      return isPascalCase(parent.id.name);
    }

    if (
      parent.type === 'CallExpression' &&
      parent.arguments.includes(current) &&
      isComponentWrapperCall(parent)
    ) {
      current = parent;
      continue;
    }

    if (parent.type === 'ExportDefaultDeclaration') {
      return true;
    }

    return false;
  }

  return false;
};

const resolveVariableFromIdentifier = (context, identifierNode) => {
  const sourceCode = context.sourceCode ?? context.getSourceCode?.();
  const scope = sourceCode?.getScope?.(identifierNode);

  if (!scope) {
    return null;
  }

  let currentScope = scope;
  while (currentScope) {
    const reference = currentScope.references.find((candidate) => {
      return candidate.identifier === identifierNode;
    });

    if (reference) {
      return reference.resolved ?? null;
    }

    currentScope = currentScope.upper;
  }

  return null;
};

const isSpreadFromComponentProps = (context, spreadAttribute) => {
  if (spreadAttribute.argument.type !== 'Identifier') {
    return false;
  }

  const variable = resolveVariableFromIdentifier(context, spreadAttribute.argument);
  if (!variable) {
    return false;
  }

  const parameterDef = variable.defs.find((definition) => definition.type === 'Parameter');
  if (!parameterDef?.name) {
    return false;
  }

  const definingFunction = getNearestFunctionAncestor(parameterDef.name);
  if (!isComponentFunction(definingFunction)) {
    return false;
  }

  const spreadablePropNames = getFirstParamSpreadablePropNames(definingFunction);
  return spreadablePropNames.has(variable.name);
};

const rule = createRule({
  name: 'spread-props-last',
  meta: {
    type: 'problem',
    fixable: 'code',
    docs: {
      description:
        "Require JSX spreads sourced from a component's own props to be listed after explicit props",
      recommended: 'error',
    },
    schema: [],
    messages: {
      spreadPropsMustBeLast:
        'Place JSX spread props at the end of the element so explicit props are defined first.',
    },
  },
  defaultOptions: [],
  create(context) {
    const sourceCode = context.sourceCode ?? context.getSourceCode?.();

    return {
      JSXOpeningElement(node) {
        const { attributes } = node;

        let lastNamedAttributeIndex = -1;
        for (let index = attributes.length - 1; index >= 0; index -= 1) {
          if (attributes[index].type === 'JSXAttribute') {
            lastNamedAttributeIndex = index;
            break;
          }
        }

        if (lastNamedAttributeIndex === -1) {
          return;
        }

        const offendingSpreadIndices = [];

        for (let index = 0; index <= lastNamedAttributeIndex; index += 1) {
          const attribute = attributes[index];
          if (attribute.type !== 'JSXSpreadAttribute') {
            continue;
          }

          if (!isSpreadFromComponentProps(context, attribute)) {
            continue;
          }
          offendingSpreadIndices.push(index);
        }

        if (offendingSpreadIndices.length === 0) {
          return;
        }

        const firstOffendingSpread = attributes[offendingSpreadIndices[0]];
        const firstAttribute = attributes[0];
        const lastAttribute = attributes[attributes.length - 1];

        context.report({
          node: firstOffendingSpread,
          messageId: 'spreadPropsMustBeLast',
          fix(fixer) {
            if (!sourceCode?.text || !firstAttribute?.range || !lastAttribute?.range) {
              return null;
            }

            const attributesText = sourceCode.text.slice(
              firstAttribute.range[0],
              lastAttribute.range[1],
            );
            // Skip autofix when comments are mixed into attributes because a safe reorder
            // would require comment-aware placement.
            if (attributesText.includes('/*') || attributesText.includes('//')) {
              return null;
            }

            const movedSpreadSet = new Set(offendingSpreadIndices);
            const fixedOrder = [];
            const movedSpreads = [];

            for (let index = 0; index < attributes.length; index += 1) {
              const attribute = attributes[index];
              if (movedSpreadSet.has(index)) {
                movedSpreads.push(sourceCode.getText(attribute));
                continue;
              }

              fixedOrder.push(sourceCode.getText(attribute));
            }

            fixedOrder.push(...movedSpreads);

            const multiline = attributesText.includes('\n');
            const indent = ' '.repeat(firstAttribute.loc.start.column);
            const joiner = multiline ? `\n${indent}` : ' ';
            const replacement = fixedOrder.join(joiner);

            return fixer.replaceTextRange(
              [firstAttribute.range[0], lastAttribute.range[1]],
              replacement,
            );
          },
        });
      },
    };
  },
});

export default rule;
