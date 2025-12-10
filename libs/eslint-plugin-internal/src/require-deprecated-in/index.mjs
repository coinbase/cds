import { ESLintUtils } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(() => null);

const versionPattern = /^v\d+$/;

/**
 * Rule: require-deprecated-in
 *
 * This rule enforces that any JSDoc comment containing @deprecated must also
 * contain a @deprecatedIn tag with a valid CDS major version number (format: v[INTEGER]).
 * This helps track how long things have been deprecated for.
 */
const rule = createRule({
  name: 'require-deprecated-in',
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Require @deprecatedIn tag with version number when @deprecated is used',
      recommended: 'warn',
    },
    schema: [],
    messages: {
      missingDeprecatedIn:
        '@deprecated tag requires a @deprecatedIn tag with a CDS major version (e.g., @deprecatedIn v9).',
      invalidVersionFormat:
        '@deprecatedIn tag must specify a valid CDS major version in the format v[INTEGER] (e.g., v9).',
    },
  },
  defaultOptions: [],
  create(context) {
    const sourceCode = context.sourceCode ?? context.getSourceCode?.();

    /**
     * Checks if a comment is a JSDoc comment containing @deprecated
     * @param {Object} comment - The comment node to check
     * @returns {boolean}
     */
    function hasDeprecatedTag(comment) {
      if (comment.type !== 'Block' || !comment.value.startsWith('*')) {
        return false;
      }
      return /@deprecated\b/.test(comment.value);
    }

    /**
     * Checks if a JSDoc comment has a valid @deprecatedIn tag
     * @param {Object} comment - The comment node to check
     * @returns {{ hasTag: boolean, version: string | null, isValid: boolean }}
     */
    function checkDeprecatedInTag(comment) {
      const deprecatedInMatch = comment.value.match(/@deprecatedIn\s+(\S*)/);

      if (!deprecatedInMatch) {
        return { hasTag: false, version: null, isValid: false };
      }

      const version = deprecatedInMatch[1]?.trim() || '';
      const isValid = versionPattern.test(version);

      return { hasTag: true, version, isValid };
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
     * Reports issues with @deprecatedIn tag
     * @param {Object} comment - The JSDoc comment node
     * @param {string} messageId - The message ID to report
     */
    function reportIssue(comment, messageId) {
      context.report({
        loc: comment.loc,
        messageId,
      });
    }

    /**
     * Checks a node for @deprecated tag and validates @deprecatedIn
     * @param {Object} node - The AST node to check
     */
    function checkNode(node) {
      const comment = getJsDocComment(node);
      if (!comment || !hasDeprecatedTag(comment)) {
        return;
      }

      const { hasTag, isValid } = checkDeprecatedInTag(comment);

      if (!hasTag) {
        reportIssue(comment, 'missingDeprecatedIn');
      } else if (!isValid) {
        reportIssue(comment, 'invalidVersionFormat');
      }
    }

    /**
     * Checks properties in type/interface declarations
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
     * @param {Object} typeNode - The type annotation node to search
     */
    function checkTypeAnnotationForLiterals(typeNode) {
      if (!typeNode) return;

      switch (typeNode.type) {
        case 'TSTypeLiteral':
          checkTypeProperties(typeNode);
          break;
        case 'TSIntersectionType':
        case 'TSUnionType':
          for (const type of typeNode.types || []) {
            checkTypeAnnotationForLiterals(type);
          }
          break;
        case 'TSParenthesizedType':
          checkTypeAnnotationForLiterals(typeNode.typeAnnotation);
          break;
        case 'TSTypeReference':
          for (const param of typeNode.typeArguments?.params ||
            typeNode.typeParameters?.params ||
            []) {
            checkTypeAnnotationForLiterals(param);
          }
          break;
        case 'TSMappedType':
        case 'TSConditionalType':
          if (typeNode.typeAnnotation) {
            checkTypeAnnotationForLiterals(typeNode.typeAnnotation);
          }
          if (typeNode.trueType) {
            checkTypeAnnotationForLiterals(typeNode.trueType);
          }
          if (typeNode.falseType) {
            checkTypeAnnotationForLiterals(typeNode.falseType);
          }
          break;
        case 'TSArrayType':
          checkTypeAnnotationForLiterals(typeNode.elementType);
          break;
        case 'TSTupleType':
          for (const element of typeNode.elementTypes || []) {
            checkTypeAnnotationForLiterals(element);
          }
          break;
      }
    }

    return {
      FunctionDeclaration: checkNode,
      VariableDeclaration: checkNode,

      TSTypeAliasDeclaration(node) {
        checkNode(node);
        checkTypeAnnotationForLiterals(node.typeAnnotation);
      },

      TSInterfaceDeclaration(node) {
        checkNode(node);
        checkTypeProperties(node);
      },

      ClassDeclaration(node) {
        checkNode(node);
        checkTypeProperties(node);
      },

      ExportNamedDeclaration(node) {
        const comment = getJsDocComment(node);
        if (comment && hasDeprecatedTag(comment)) {
          const { hasTag, isValid } = checkDeprecatedInTag(comment);

          if (!hasTag) {
            reportIssue(comment, 'missingDeprecatedIn');
          } else if (!isValid) {
            reportIssue(comment, 'invalidVersionFormat');
          }
        }
      },

      ExportDefaultDeclaration: checkNode,
    };
  },
});

export default rule;
