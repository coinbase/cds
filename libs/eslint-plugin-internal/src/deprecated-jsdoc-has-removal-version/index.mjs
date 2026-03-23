import { ESLintUtils } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(() => null);

const REMOVAL_VERSION_PATTERN = /Targeting removal in v(\d+\.\d+\.\d+|\d+)/;

/**
 * Rule: deprecated-jsdoc-has-removal-version
 *
 * Enforces that any JSDoc @deprecated tag also contains a sentence of the form
 * "Targeting removal in vX" where X is a semver (e.g. 7.0.0) or integer (e.g. 7).
 */
const rule = createRule({
  name: 'deprecated-jsdoc-has-removal-version',
  meta: {
    type: 'problem',
    docs: {
      description: 'Require JSDoc @deprecated tags to include a "Targeting removal in vX" sentence',
      recommended: 'error',
    },
    schema: [],
    messages: {
      missingRemovalVersion:
        '@deprecated tag must include a removal target, e.g. "Targeting removal in v7.0.0".',
    },
  },
  defaultOptions: [],
  create(context) {
    const sourceCode = context.sourceCode ?? context.getSourceCode?.();

    /**
     * If the comment has @deprecated but no removal version sentence, report at
     * the @deprecated token location.
     */
    function checkComment(comment) {
      if (comment.type !== 'Block' || !comment.value.startsWith('*')) return;
      if (!comment.value.includes('@deprecated')) return;
      if (REMOVAL_VERSION_PATTERN.test(comment.value)) return;

      // Point the error at the @deprecated token itself
      const deprecatedIndex = comment.value.indexOf('@deprecated');
      const textBefore = comment.value.slice(0, deprecatedIndex);
      const linesBeforeDeprecated = textBefore.split('\n').length - 1;
      const deprecatedLine = comment.loc.start.line + linesBeforeDeprecated;

      const lastNewlineIndex = textBefore.lastIndexOf('\n');
      let deprecatedColumn;
      if (lastNewlineIndex === -1) {
        deprecatedColumn = comment.loc.start.column + 2 + deprecatedIndex;
      } else {
        deprecatedColumn = deprecatedIndex - lastNewlineIndex - 1;
      }

      context.report({
        loc: {
          start: { line: deprecatedLine, column: deprecatedColumn },
          end: { line: deprecatedLine, column: deprecatedColumn + '@deprecated'.length },
        },
        messageId: 'missingRemovalVersion',
      });
    }

    function getJsDocComment(node) {
      const comments = sourceCode.getCommentsBefore(node);
      if (!comments || comments.length === 0) return null;
      for (let i = comments.length - 1; i >= 0; i--) {
        const comment = comments[i];
        if (comment.type === 'Block' && comment.value.startsWith('*')) return comment;
      }
      return null;
    }

    function checkNode(node) {
      const comment = getJsDocComment(node);
      if (comment) checkComment(comment);
    }

    function checkTypeProperties(node) {
      const members = node.body?.body || node.members || [];
      for (const member of members) {
        checkNode(member);
      }
    }

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
          if (typeNode.typeAnnotation) checkTypeAnnotationForLiterals(typeNode.typeAnnotation);
          if (typeNode.trueType) checkTypeAnnotationForLiterals(typeNode.trueType);
          if (typeNode.falseType) checkTypeAnnotationForLiterals(typeNode.falseType);
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
        if (comment) checkComment(comment);
      },

      ExportDefaultDeclaration: checkNode,
    };
  },
});

export default rule;
