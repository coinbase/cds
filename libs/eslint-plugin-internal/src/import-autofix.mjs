import { AST_NODE_TYPES } from '@typescript-eslint/utils';

const knownReactImports = {
  useRef: {
    source: 'react',
    type: 'ImportSpecifier',
  },
  useLayoutEffect: {
    source: 'react',
    type: 'ImportSpecifier',
  },
  useEffect: {
    source: 'react',
    type: 'ImportSpecifier',
  },
  useCallback: {
    source: 'react',
    type: 'ImportSpecifier',
  },
  useState: {
    source: 'react',
    type: 'ImportSpecifier',
  },
  useMemo: {
    source: 'react',
    type: 'ImportSpecifier',
  },
  useContext: {
    source: 'react',
    type: 'ImportSpecifier',
  },
  memo: {
    source: 'react',
    type: 'ImportSpecifier',
  },
  cloneElement: {
    source: 'react',
    type: 'ImportSpecifier',
  },
  createContext: {
    source: 'react',
    type: 'ImportSpecifier',
  },
  useTransition: {
    source: 'react',
    type: 'ImportSpecifier',
  },
  useId: {
    source: 'react',
    type: 'ImportSpecifier',
  },
};

const knownReactIntlImports = {
  defineMessages: {
    source: 'react-intl',
    type: 'ImportSpecifier',
  },
  useIntl: {
    source: 'react-intl',
    type: 'ImportSpecifier',
  },
};

const knownStyledComponentsImports = {
  styled: {
    source: 'styled-components',
    type: 'ImportDefaultSpecifier',
  },
  css: {
    source: 'styled-components',
    type: 'ImportSpecifier',
  },
};

const knownReactRouterImports = {
  useHistory: {
    source: 'react-router-dom',
    type: 'ImportSpecifier',
  },
  useParams: {
    source: 'react-router-dom',
    type: 'ImportSpecifier',
  },
  useLocation: {
    source: 'react-router-dom',
    type: 'ImportSpecifier',
  },
  useRouteMatch: {
    source: 'react-router-dom',
    type: 'ImportSpecifier',
  },
};

const knownRelayImports = {
  graphql: {
    source: '@cbhq/data-layer',
    type: 'ImportSpecifier',
  },
  useRelayEnvironment: {
    source: '@cbhq/data-layer',
    type: 'ImportSpecifier',
  },
  useQueryLoader: {
    source: '@cbhq/data-layer',
    type: 'ImportSpecifier',
  },
  usePreloadedQuery: {
    source: '@cbhq/data-layer',
    type: 'ImportSpecifier',
  },
  useLazyLoadQuery: {
    source: '@cbhq/data-layer',
    type: 'ImportSpecifier',
  },
  useFragment: {
    source: '@cbhq/data-layer',
    type: 'ImportSpecifier',
  },
  useRefetchableFragment: {
    source: '@cbhq/data-layer',
    type: 'ImportSpecifier',
  },
  usePaginationFragment: {
    source: '@cbhq/data-layer',
    type: 'ImportSpecifier',
  },
  useBlockingPaginationFragment: {
    source: '@cbhq/data-layer',
    type: 'ImportSpecifier',
  },
  useMutation: {
    source: '@cbhq/data-layer',
    type: 'ImportSpecifier',
  },
  useSubscription: {
    source: '@cbhq/data-layer',
    type: 'ImportSpecifier',
  },
  loadQuery: {
    source: '@cbhq/data-layer',
    type: 'ImportSpecifier',
  },
  fetchQuery: {
    source: '@cbhq/data-layer',
    type: 'ImportSpecifier',
  },
  readInlineData: {
    source: '@cbhq/data-layer',
    type: 'ImportSpecifier',
  },
};

const knownImports = {
  ...knownReactImports,
  ...knownReactIntlImports,
  ...knownReactRouterImports,
  ...knownRelayImports,
  ...knownStyledComponentsImports,
};

function getVariables({ context, node }) {
  /**
   * Provides all available variables within a given node.
   */
  const variables = [];
  const { scopeManager } = context.getSourceCode();
  let scope;
  let scopeNode = node;

  if (!scopeManager) {
    return [];
  }

  while (!scope && scopeNode) {
    scope = scopeManager.acquire(scopeNode, true);
    scopeNode = scopeNode?.parent;
  }

  while (scope) {
    variables.push(scope.variables.filter((variable) => variable.defs.length > 0));
    scope = scope.upper;
  }

  return variables.flat();
}

function getVariable({ context, node, name }) {
  /*
   * Get variable matching name
   */

  const variables = getVariables({ context, node });
  return variables.find((variable) => variable.name === name);
}

function getVariableReferences({ context, node, name }) {
  /*
   * Return all references to a variable excluding definitions.
   */

  const variable = getVariable({ context, node, name });
  return (
    variable?.references
      .filter((reference) => !reference.init)
      .map((reference) => reference.identifier)
      .filter(Boolean) ?? []
  );
}

function fixRemoveNodeWithComma({ node, fixer, context }) {
  /*
   * Remove node with trailing comma so removing an import
   * specifier does not lead to accumulating multiple commas (, , ,).
   *
   * import { useRef, useEffect } from 'react';
   * import { useEffect } from 'react';
   */

  const sourceCode = context.getSourceCode();

  const isEmpty = (string) => /^[\s]+$/.test(string);

  const endsWithCommaOrLineBreak = (string) => /[,\n]$/.test(string);

  const getCodeAfter = (index) => sourceCode.getText(node, 0, index).substr(0 - index);

  const codeAfterIsValid = (index) => {
    const code = getCodeAfter(index);
    return endsWithCommaOrLineBreak(code) || isEmpty(code);
  };

  let nextIndex = 0;
  while (codeAfterIsValid(nextIndex + 1)) {
    nextIndex += 1;
  }

  const rangeStart = node.range[0];
  const rangeStop = node.range[1] + nextIndex;
  return fixer.replaceTextRange([rangeStart, rangeStop], '');
}

function fixRemoveNodeWithBrackets({ node, fixer, context }) {
  /*
   * Remove node with the brackets and comma surrounding it so
   * we can remove all import specifiers before a default
   * import specifier.
   *
   * import React, { useRef, useEffect } from 'react';
   * import React from 'react';
   */

  const sourceCode = context.getSourceCode();

  const endsRight = (string) => /^[\s\n,]*\}?$/.test(string);
  const startsRight = (string) => /^(,?\s*\{)?\s*$/.test(string);

  const getCodeBefore = (index) => sourceCode.getText(node, index).substr(0, index);
  const getCodeAfter = (index) => sourceCode.getText(node, 0, index).substr(0 - index);

  const codeAfterIsValid = (index) => {
    const code = getCodeAfter(index);
    return endsRight(code);
  };
  const codeBeforeIsValid = (index) => {
    const code = getCodeBefore(index);
    return startsRight(code);
  };

  let nextIndex = 0;
  while (codeAfterIsValid(nextIndex + 1)) {
    nextIndex += 1;
  }
  let prevIndex = 0;
  while (codeBeforeIsValid(prevIndex + 1)) {
    prevIndex += 1;
  }

  const rangeStart = node.range[0] - prevIndex;
  const rangeStop = node.range[1] + nextIndex;

  return fixer.replaceTextRange([rangeStart, rangeStop], '');
}

function fixRemoveImportSpecifier({ node, fixer, context }) {
  if (!node?.parent?.parent) {
    return null;
  }

  /*
   * Remove unused import for a given node.
   */
  const { specifiers = [] } = node.parent.parent;

  if (specifiers.length > 1) {
    const defaultSpecifiers = specifiers.filter(
      (n) => n.type === AST_NODE_TYPES.ImportDefaultSpecifier,
    );
    const namedSpecifiers = specifiers.filter((n) => n.type === AST_NODE_TYPES.ImportSpecifier);

    const shouldRemoveAllNamedSpecifiers = Boolean(
      node.parent?.type === AST_NODE_TYPES.ImportSpecifier &&
        defaultSpecifiers.length === 1 &&
        namedSpecifiers.length === 1,
    );

    if (shouldRemoveAllNamedSpecifiers) {
      return fixRemoveNodeWithBrackets({ context, node: node.parent, fixer });
    }
    return fixRemoveNodeWithComma({ context, node: node.parent, fixer });
  }
  return fixer.remove(node.parent.parent);
}

/*
 * Returns the node at the root of the program.
 */
function getProgramRootNode(startNode) {
  let node = startNode;

  while (node) {
    if (node.type === AST_NODE_TYPES.Program) {
      return node;
    }
    node = node.parent;
  }

  throw new Error('Could not find root Program node');
}

function getContentBeforeNode({ node, offset, context }) {
  /*
   * Return code source content before a given code
   * node with a given offset.
   */
  const sourceCode = context.getSourceCode();
  return sourceCode.getText(node, offset).substr(0, offset);
}

function getRangeStartingBeforeSpecifiers({ node, context }) {
  /*
   * Return range of node starting before the { in
   * the import specifier.
   *
   * import { useRef } from 'react';
   */
  let offset = 0;
  const isStartingBeforeSpecifiers = () =>
    getContentBeforeNode({ node, offset, context }).startsWith('{');
  while (!isStartingBeforeSpecifiers()) {
    offset += 1;
  }
  return [node.range[0] - offset, node.range[1]];
}

function getImportDeclarationNode({ node, source }) {
  const program = getProgramRootNode(node);
  /*
   * Return import declaration node matching a given source.
   *
   * import { useRef } from 'react';
   */

  return program.body.find((n) =>
    Boolean(
      n.type === AST_NODE_TYPES.ImportDeclaration &&
        n.source &&
        n.source.value === source &&
        n.importKind === 'value',
    ),
  );
}

function fixAddImportSpecifier({ node, source, name, type, fixer, context }) {
  /*
   * Add missing import for a given identifier node.
   */

  const importNode = getImportDeclarationNode({ node, source });

  if (!importNode) {
    if (type === AST_NODE_TYPES.ImportDefaultSpecifier) {
      return fixer.insertTextBeforeRange([0, 0], `import ${name} from '${source}';\n`);
    }
    if (type === AST_NODE_TYPES.ImportSpecifier) {
      return fixer.insertTextBeforeRange([0, 0], `import { ${name} } from '${source}';\n`);
    }
    throw new Error(`Unknown type ${type}`);
  }

  if (type === AST_NODE_TYPES.ImportDefaultSpecifier) {
    const firstSpecifier = importNode.specifiers[0];
    if (firstSpecifier.type !== AST_NODE_TYPES.ImportSpecifier) {
      return null;
    }
    return fixer.insertTextBeforeRange(
      getRangeStartingBeforeSpecifiers({ node: firstSpecifier, context }),
      `${name}, `,
    );
  }

  if (type === AST_NODE_TYPES.ImportSpecifier) {
    const firstSpecifier = importNode.specifiers.find(
      (n) => n.type === AST_NODE_TYPES.ImportSpecifier,
    );
    if (firstSpecifier) {
      return fixer.insertTextBefore(firstSpecifier, `${name}, `);
    }
    const firstDefaultSpecifier = importNode.specifiers.find(
      (n) => n.type === AST_NODE_TYPES.ImportDefaultSpecifier,
    );
    if (firstDefaultSpecifier) {
      return fixer.insertTextAfter(firstDefaultSpecifier, `, { ${name} }`);
    }
    return null;
  }

  throw new Error(`Unknown type ${type}`);
}

/**
 * This method exists to provide a convienece for rule types and can also
 * be used later to apply default values to rules if needed.
 */
function createRule({ meta, create, defaultOptions }) {
  return { defaultOptions: defaultOptions ?? [], meta, create };
}

const rule = createRule({
  meta: {
    fixable: 'code',
    messages: {
      importMissing: 'An import is missing for {{ name }}.',
      unusedImport: 'Import for {{ name }} is unused and can be removed.',
    },
    schema: [
      {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            source: { type: 'string' },
            type: { type: 'string', enum: ['named', 'default'] },
          },
          required: ['name', 'source', 'type'],
          additionalProperties: false,
        },
      },
    ],
    type: 'suggestion',
  },
  create(context) {
    const fixableImports = {
      ...knownImports,
    };

    let hasReported = false;

    (context.options[0] || []).forEach((customImport) => {
      fixableImports[customImport.name] = {
        source: customImport.source,
        type: customImport.type === 'default' ? 'ImportDefaultSpecifier' : 'ImportSpecifier',
      };
    });

    function isReferenced(node) {
      /*
       * Return true whenever the identifier node is part of
       * a call expression or member expression where it is
       * references to like a variable.
       *
       * useRef()
       * styled.div``
       * graphql``
       */
      if (node.parent?.type === AST_NODE_TYPES.CallExpression) {
        return node.parent.callee === node;
      }
      if (node.parent?.type === AST_NODE_TYPES.MemberExpression) {
        return node.parent.object === node;
      }
      if (node.parent?.type === AST_NODE_TYPES.TaggedTemplateExpression) {
        return node.parent.tag === node;
      }
      return false;
    }

    function isImportSpecifier(node) {
      /*
       * Return true if this identifier node is part of
       * an import specifier.
       *
       * import { useRef } from 'react';
       */
      return Boolean(
        node.parent &&
          (node.parent.type === AST_NODE_TYPES.ImportSpecifier ||
            node.parent.type === AST_NODE_TYPES.ImportDefaultSpecifier) &&
          node.parent.local &&
          node.parent.local === node &&
          node.parent.parent &&
          node.parent.parent.type === AST_NODE_TYPES.ImportDeclaration &&
          node.parent.parent.specifiers.includes(node.parent),
      );
    }

    function hasReferences(node) {
      /*
       * Return true if the variable assigned to the identifier
       * node is used anywhere (so we know to drop this import or not).
       */
      const references = getVariableReferences({
        context,
        node,
        name: node.name,
      });
      return references.some((ref) => Boolean(ref !== node));
    }

    function needsAddImport(node) {
      /*
       * Return true if identifier node is a variable that
       * we know we can import but isn't yet imported.
       */
      return Boolean(
        fixableImports[node.name] &&
          isReferenced(node) &&
          !getVariable({ context, node, name: node.name }),
      );
    }

    function needsRemoveImport(node) {
      /*
       * Return true if identifier node is a known variable
       * that is imported and unused.
       */
      return Boolean(fixableImports[node.name] && isImportSpecifier(node) && !hasReferences(node));
    }

    function fixAddImport(node, fixer) {
      /*
       * Add missing import for a given identifier node.
       */
      const { name } = node;
      const { source, type } = fixableImports[name];

      return fixAddImportSpecifier({
        node,
        source,
        name,
        type,
        fixer,
        context,
      });
    }

    function reportOnce(data) {
      /*
       * Report and fix one issue at the time so text editors
       * do not apply multiple fixes on top of each other, which
       * can result in broken import syntax.
       */
      if (hasReported) return;
      hasReported = true;
      context.report(data);
    }

    return {
      Identifier(node) {
        if (needsAddImport(node)) {
          reportOnce({
            node,
            messageId: 'importMissing',
            data: {
              name: node.name,
            },
            fix: (fixer) => fixAddImport(node, fixer),
          });
        }
        if (needsRemoveImport(node)) {
          reportOnce({
            node,
            messageId: 'unusedImport',
            data: {
              name: node.name,
            },
            fix: (fixer) => fixRemoveImportSpecifier({ node, fixer, context }),
          });
        }
      },
    };
  },
});

export { knownImports };
export default rule;
