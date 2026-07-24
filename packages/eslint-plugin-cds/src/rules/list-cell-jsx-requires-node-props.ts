import type { TSESLint, TSESTree } from '@typescript-eslint/utils';
import { AST_NODE_TYPES, ESLintUtils } from '@typescript-eslint/utils';

import { getSimpleNameFromJSX } from '../utils/getSimpleNameFromJSX';

const ruleCreator = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/coinbase/cds/blob/master/packages/eslint-plugin-cds/README.md#${name}`,
);

type MessageIds = 'useNodeProp';

const NODE_PROPS = {
  title: 'titleNode',
  description: 'descriptionNode',
  subtitle: 'subtitleNode',
  detail: 'detailNode',
  subdetail: 'subdetailNode',
} as const;

type TextSlotProp = keyof typeof NODE_PROPS;

const ALLOWED_PACKAGES = ['@coinbase/cds-mobile', '@coinbase/cds-web', '@coinbase/cds-common'];

const isTextSlotProp = (name: string): name is TextSlotProp =>
  Object.prototype.hasOwnProperty.call(NODE_PROPS, name);

const isImportedElement = (node: TSESTree.JSXElement, names: Set<string>) => {
  const name = getSimpleNameFromJSX(node.openingElement);
  return name != null && names.has(name);
};

const containsJsx = (node: TSESTree.Node | null | undefined): boolean => {
  if (node == null) return false;

  if (node.type === AST_NODE_TYPES.JSXElement || node.type === AST_NODE_TYPES.JSXFragment) {
    return true;
  }

  if (node.type === AST_NODE_TYPES.ConditionalExpression) {
    return containsJsx(node.consequent) || containsJsx(node.alternate);
  }

  if (node.type === AST_NODE_TYPES.LogicalExpression) {
    return containsJsx(node.left) || containsJsx(node.right);
  }

  if (node.type === AST_NODE_TYPES.SequenceExpression) {
    return node.expressions.some(containsJsx);
  }

  if (node.type === AST_NODE_TYPES.ArrayExpression) {
    return node.elements.some((element) => containsJsx(element));
  }

  if (node.type === AST_NODE_TYPES.CallExpression) {
    return node.arguments.some((argument) => containsJsx(argument));
  }

  if (
    node.type === AST_NODE_TYPES.ArrowFunctionExpression ||
    node.type === AST_NODE_TYPES.FunctionExpression
  ) {
    return containsJsx(node.body);
  }

  if (
    node.type === AST_NODE_TYPES.TSAsExpression ||
    node.type === AST_NODE_TYPES.TSTypeAssertion ||
    node.type === AST_NODE_TYPES.TSNonNullExpression ||
    node.type === AST_NODE_TYPES.ChainExpression
  ) {
    return containsJsx(node.expression);
  }

  if (node.type === AST_NODE_TYPES.BlockStatement) {
    return node.body.some(containsJsx);
  }

  if (node.type === AST_NODE_TYPES.ReturnStatement) {
    return containsJsx(node.argument);
  }

  return false;
};

const containsUnsupportedJsx = (
  node: TSESTree.Node | null | undefined,
  textNames: Set<string>,
): boolean => {
  if (node == null) return false;

  if (node.type === AST_NODE_TYPES.JSXElement) {
    return !isImportedElement(node, textNames);
  }

  if (node.type === AST_NODE_TYPES.JSXFragment) {
    return true;
  }

  if (node.type === AST_NODE_TYPES.ConditionalExpression) {
    return (
      containsUnsupportedJsx(node.consequent, textNames) ||
      containsUnsupportedJsx(node.alternate, textNames)
    );
  }

  if (node.type === AST_NODE_TYPES.LogicalExpression) {
    return (
      containsUnsupportedJsx(node.left, textNames) || containsUnsupportedJsx(node.right, textNames)
    );
  }

  if (node.type === AST_NODE_TYPES.SequenceExpression) {
    return node.expressions.some((expression) => containsUnsupportedJsx(expression, textNames));
  }

  if (
    node.type === AST_NODE_TYPES.ArrayExpression ||
    node.type === AST_NODE_TYPES.CallExpression ||
    node.type === AST_NODE_TYPES.ArrowFunctionExpression ||
    node.type === AST_NODE_TYPES.FunctionExpression ||
    node.type === AST_NODE_TYPES.BlockStatement
  ) {
    return containsJsx(node);
  }

  if (
    node.type === AST_NODE_TYPES.TSAsExpression ||
    node.type === AST_NODE_TYPES.TSTypeAssertion ||
    node.type === AST_NODE_TYPES.TSNonNullExpression ||
    node.type === AST_NODE_TYPES.ChainExpression
  ) {
    return containsUnsupportedJsx(node.expression, textNames);
  }

  if (node.type === AST_NODE_TYPES.ReturnStatement) {
    return containsUnsupportedJsx(node.argument, textNames);
  }

  return false;
};

const findVariable = (scope: TSESLint.Scope.Scope | null, name: string) => {
  for (let currentScope = scope; currentScope; currentScope = currentScope.upper) {
    const variable = currentScope.set.get(name);
    if (variable) return variable;
  }
  return undefined;
};

const identifierContainsNonTextJsx = (
  sourceCode: TSESLint.SourceCode,
  node: TSESTree.Identifier,
  textNames: Set<string>,
) => {
  const variable = findVariable(sourceCode.getScope(node), node.name);
  return (
    variable?.defs.some(
      (definition) =>
        definition.type === 'Variable' &&
        definition.node.init != null &&
        containsUnsupportedJsx(definition.node.init, textNames),
    ) ?? false
  );
};

const valueContainsNonTextJsx = (
  sourceCode: TSESLint.SourceCode,
  attribute: TSESTree.JSXAttribute,
  textNames: Set<string>,
) => {
  const { value } = attribute;
  if (value?.type !== AST_NODE_TYPES.JSXExpressionContainer) return false;

  const { expression } = value;
  if (expression.type === AST_NODE_TYPES.JSXEmptyExpression) return false;
  if (containsUnsupportedJsx(expression, textNames)) return true;

  return (
    expression.type === AST_NODE_TYPES.Identifier &&
    identifierContainsNonTextJsx(sourceCode, expression, textNames)
  );
};

const hasAttribute = (node: TSESTree.JSXOpeningElement, name: string) =>
  node.attributes.some(
    (attribute) =>
      attribute.type === AST_NODE_TYPES.JSXAttribute &&
      attribute.name.type === AST_NODE_TYPES.JSXIdentifier &&
      attribute.name.name === name,
  );

export const listCellJsxRequiresNodeProps = ruleCreator({
  name: 'list-cell-jsx-requires-node-props',
  defaultOptions: [],
  meta: {
    type: 'problem',
    docs: {
      description:
        'Require ListCell node props when passing JSX so CDS applies the correct node layout.',
    },
    fixable: 'code',
    schema: [],
    messages: {
      useNodeProp:
        'Use `{{nodeProp}}` when passing JSX to ListCell; `{{prop}}` is for text values.',
    },
  },
  create(context) {
    const sourceCode = context.sourceCode;
    const listCellNames = new Set<string>();
    const textNames = new Set<string>();

    return {
      ImportDeclaration(node: TSESTree.ImportDeclaration) {
        const packageName = node.source.value;
        if (
          typeof packageName !== 'string' ||
          !ALLOWED_PACKAGES.some((pkg) => packageName === pkg || packageName.startsWith(`${pkg}/`))
        ) {
          return;
        }

        for (const specifier of node.specifiers) {
          if (
            specifier.type !== AST_NODE_TYPES.ImportSpecifier ||
            specifier.imported.type !== AST_NODE_TYPES.Identifier
          ) {
            continue;
          }

          if (specifier.imported.name === 'ListCell') {
            listCellNames.add(specifier.local.name);
          }
          if (specifier.imported.name === 'Text') {
            textNames.add(specifier.local.name);
          }
        }
      },
      JSXOpeningElement(node: TSESTree.JSXOpeningElement) {
        if (node.name.type !== AST_NODE_TYPES.JSXIdentifier || !listCellNames.has(node.name.name)) {
          return;
        }

        for (const attribute of node.attributes) {
          if (
            attribute.type !== AST_NODE_TYPES.JSXAttribute ||
            attribute.name.type !== AST_NODE_TYPES.JSXIdentifier
          ) {
            continue;
          }

          const prop = attribute.name.name;
          if (!isTextSlotProp(prop) || !valueContainsNonTextJsx(sourceCode, attribute, textNames)) {
            continue;
          }

          const nodeProp = NODE_PROPS[prop];
          const canAutofix = !hasAttribute(node, nodeProp);

          context.report({
            node: attribute.name,
            messageId: 'useNodeProp',
            data: { prop, nodeProp },
            fix: canAutofix ? (fixer) => fixer.replaceText(attribute.name, nodeProp) : undefined,
          });
        }
      },
    };
  },
});
