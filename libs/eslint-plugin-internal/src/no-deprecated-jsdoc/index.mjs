import { ESLintUtils } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(() => null);

/**
 * Rule: no-deprecated-jsdoc
 *
 * This rule detects JSDoc comments containing deprecated annotation tags.
 * It helps identify deprecated code that should be migrated or removed.
 */
const rule = createRule({
  name: 'no-deprecated-jsdoc',
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Detect JSDoc comments containing @deprecated tags',
      recommended: 'warn',
    },
    schema: [],
    messages: {
      deprecatedJsdoc: '{{ name }} is marked as deprecated{{ reason }}.',
    },
  },
  defaultOptions: [],
  create(context) {
    const sourceCode = context.sourceCode ?? context.getSourceCode?.();

    /**
     * Checks if a comment is a JSDoc comment containing deprecated annotation
     * @param {Object} comment - The comment node to check
     * @returns {{ isDeprecated: boolean, reason: string | null }}
     */
    function checkForDeprecated(comment) {
      if (comment.type !== 'Block' || !comment.value.startsWith('*')) {
        return { isDeprecated: false, reason: null };
      }

      const deprecatedMatch = comment.value.match(/@deprecated\s*([^\n@]*)/);
      if (!deprecatedMatch) {
        return { isDeprecated: false, reason: null };
      }

      const reason = deprecatedMatch[1]?.trim() || null;
      return { isDeprecated: true, reason };
    }

    /**
     * Gets the JSDoc comment associated with a node
     * @param {Object} node - The AST node to check
     * @returns {Object|null} The JSDoc comment if found
     */
    function getJsDocComment(node) {
      const comments = sourceCode.getCommentsBefore(node);
      if (!comments || comments.length === 0) {
        return null;
      }

      // Get the last block comment before the node (closest JSDoc)
      for (let i = comments.length - 1; i >= 0; i--) {
        const comment = comments[i];
        if (comment.type === 'Block' && comment.value.startsWith('*')) {
          return comment;
        }
      }

      return null;
    }

    /**
     * Determines what kind of code element is deprecated
     * @param {Object} node - The AST node
     * @returns {string} A human-readable description of the node kind
     */
    function getNodeKind(node) {
      switch (node.type) {
        case 'FunctionDeclaration':
          return 'function';
        case 'VariableDeclaration':
        case 'VariableDeclarator':
          return 'variable';
        case 'TSTypeAliasDeclaration':
          return 'type';
        case 'TSInterfaceDeclaration':
          return 'interface';
        case 'TSPropertySignature':
        case 'PropertyDefinition':
          return 'property';
        case 'ClassDeclaration':
          return 'class';
        case 'MethodDefinition':
        case 'TSMethodSignature':
          return 'method';
        case 'ExportNamedDeclaration':
        case 'ExportDefaultDeclaration':
          return 'export';
        default:
          return 'code';
      }
    }

    /**
     * Extracts the name of a deprecated entity from its AST node
     * @param {Object} node - The AST node
     * @returns {string} The entity name or a fallback description
     */
    function getNodeName(node) {
      switch (node.type) {
        case 'FunctionDeclaration':
          return node.id?.name || 'Anonymous function';
        case 'VariableDeclaration':
          // Get name from first declarator
          return node.declarations?.[0]?.id?.name || 'Variable';
        case 'VariableDeclarator':
          return node.id?.name || 'Variable';
        case 'TSTypeAliasDeclaration':
          return node.id?.name || 'Type';
        case 'TSInterfaceDeclaration':
          return node.id?.name || 'Interface';
        case 'TSPropertySignature':
        case 'PropertyDefinition':
          // Handle computed properties and regular identifiers
          if (node.key?.type === 'Identifier') {
            return `Property "${node.key.name}"`;
          }
          if (node.key?.type === 'Literal') {
            return `Property "${node.key.value}"`;
          }
          return 'Property';
        case 'ClassDeclaration':
          return node.id?.name || 'Class';
        case 'MethodDefinition':
        case 'TSMethodSignature':
          if (node.key?.type === 'Identifier') {
            return `Method "${node.key.name}"`;
          }
          return 'Method';
        case 'ExportNamedDeclaration':
        case 'ExportDefaultDeclaration':
          // Try to get name from the inner declaration
          if (node.declaration) {
            return getNodeName(node.declaration);
          }
          return 'Export';
        default:
          return 'This code';
      }
    }

    /**
     * Reports a deprecated JSDoc comment
     * @param {Object} comment - The JSDoc comment node to highlight
     * @param {Object} node - The node the comment is attached to (for kind detection)
     * @param {string} reason - The deprecation reason if provided
     */
    function reportDeprecated(comment, node, reason) {
      // Find the line and column of @deprecated within the comment
      const deprecatedIndex = comment.value.indexOf('@deprecated');
      const textBeforeDeprecated = comment.value.slice(0, deprecatedIndex);
      const linesBeforeDeprecated = textBeforeDeprecated.split('\n').length - 1;
      const deprecatedLine = comment.loc.start.line + linesBeforeDeprecated;

      // Calculate column: find position after last newline before @deprecated
      const lastNewlineIndex = textBeforeDeprecated.lastIndexOf('\n');
      let deprecatedColumn;
      if (lastNewlineIndex === -1) {
        // @deprecated is on the first line of the comment, add offset for "/*"
        deprecatedColumn = comment.loc.start.column + 2 + deprecatedIndex;
      } else {
        // @deprecated is on a subsequent line
        deprecatedColumn = deprecatedIndex - lastNewlineIndex - 1;
      }

      const deprecatedEndColumn = deprecatedColumn + '@deprecated'.length;

      context.report({
        loc: {
          start: { line: deprecatedLine, column: deprecatedColumn },
          end: { line: deprecatedLine, column: deprecatedEndColumn },
        },
        messageId: 'deprecatedJsdoc',
        data: {
          name: getNodeName(node),
          reason: reason ? `: ${reason}` : '',
        },
      });
    }

    /**
     * Checks a node for deprecated JSDoc and reports if found
     * @param {Object} node - The AST node to check
     */
    function checkNode(node) {
      const comment = getJsDocComment(node);
      if (comment) {
        const { isDeprecated, reason } = checkForDeprecated(comment);
        if (isDeprecated) {
          reportDeprecated(comment, node, reason);
        }
      }
    }

    /**
     * Checks properties in type/interface declarations for deprecated JSDoc
     * @param {Object} node - The type/interface declaration node
     */
    function checkTypeProperties(node) {
      const members = node.body?.body || node.members || [];
      for (const member of members) {
        checkNode(member);
      }
    }

    /**
     * Recursively finds and checks all TSTypeLiteral nodes within a type annotation.
     * Handles intersection types, union types, generic type arguments, and nested structures.
     * @param {Object} typeNode - The type annotation node to search
     */
    function checkTypeAnnotationForLiterals(typeNode) {
      if (!typeNode) return;

      switch (typeNode.type) {
        case 'TSTypeLiteral':
          // Found an object type literal - check its properties
          checkTypeProperties(typeNode);
          break;
        case 'TSIntersectionType':
        case 'TSUnionType':
          // Recursively check all types in the intersection/union
          for (const type of typeNode.types || []) {
            checkTypeAnnotationForLiterals(type);
          }
          break;
        case 'TSParenthesizedType':
          // Unwrap parenthesized types
          checkTypeAnnotationForLiterals(typeNode.typeAnnotation);
          break;
        case 'TSTypeReference':
          // Check type arguments in generic types like Foo<A, B>
          // e.g., Polymorphic.ExtendableProps<BoxBaseProps, { deprecated?: boolean }>
          for (const param of typeNode.typeArguments?.params ||
            typeNode.typeParameters?.params ||
            []) {
            checkTypeAnnotationForLiterals(param);
          }
          break;
        case 'TSMappedType':
        case 'TSConditionalType':
          // For mapped types, check the type annotation
          if (typeNode.typeAnnotation) {
            checkTypeAnnotationForLiterals(typeNode.typeAnnotation);
          }
          // For conditional types, check true/false branches
          if (typeNode.trueType) {
            checkTypeAnnotationForLiterals(typeNode.trueType);
          }
          if (typeNode.falseType) {
            checkTypeAnnotationForLiterals(typeNode.falseType);
          }
          break;
        case 'TSArrayType':
          // Check element type of arrays
          checkTypeAnnotationForLiterals(typeNode.elementType);
          break;
        case 'TSTupleType':
          // Check all element types in tuples
          for (const element of typeNode.elementTypes || []) {
            checkTypeAnnotationForLiterals(element);
          }
          break;
      }
    }

    return {
      // Function declarations: function foo() {}
      FunctionDeclaration: checkNode,

      // Variable declarations: const foo = ...
      VariableDeclaration: checkNode,

      // Type alias declarations: type Foo = ...
      TSTypeAliasDeclaration(node) {
        checkNode(node);
        // Check for deprecated properties in object types (including intersections)
        checkTypeAnnotationForLiterals(node.typeAnnotation);
      },

      // Interface declarations: interface Foo { ... }
      TSInterfaceDeclaration(node) {
        checkNode(node);
        checkTypeProperties(node);
      },

      // Class declarations: class Foo { ... }
      ClassDeclaration(node) {
        checkNode(node);
        checkTypeProperties(node);
      },

      // Export declarations: export const foo = ..., export function foo() {}
      ExportNamedDeclaration(node) {
        // Check the export itself for JSDoc
        const comment = getJsDocComment(node);
        if (comment) {
          const { isDeprecated, reason } = checkForDeprecated(comment);
          if (isDeprecated) {
            // Report on the comment, but use declaration for kind detection
            const targetNode = node.declaration || node;
            reportDeprecated(comment, targetNode, reason);
          }
        }
      },

      // Export default declarations: export default foo
      ExportDefaultDeclaration: checkNode,
    };
  },
});

export default rule;
