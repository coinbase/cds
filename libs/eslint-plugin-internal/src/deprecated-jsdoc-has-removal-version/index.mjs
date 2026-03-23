import { ESLintUtils } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(() => null);

const EXPECTED_REMOVAL_TAG_PATTERN = /@deprecationExpectedRemoval\s+v(\d+(?:\.\d+\.\d+)?)/;
const FUTURE_MAJOR_RELEASE_SUFFIX = 'This will be removed in a future major release.';

/**
 * Rule: deprecated-jsdoc-has-removal-version
 *
 * Enforces that any JSDoc @deprecated tag:
 *   1. Has its text end with "This will be removed in a future major release."
 *   2. Is accompanied by a @deprecationExpectedRemoval vX[.Y.Z] tag in the same block.
 */
const rule = createRule({
  name: 'deprecated-jsdoc-has-removal-version',
  meta: {
    type: 'problem',
    docs: {
      description:
        'Require JSDoc @deprecated tags to end with the standard removal prose and include a @deprecationExpectedRemoval tag',
      recommended: 'error',
    },
    schema: [],
    messages: {
      missingRemovalProse:
        '@deprecated tag text must end with "This will be removed in a future major release."',
      missingRemovalTag:
        'JSDoc with @deprecated must include a @deprecationExpectedRemoval vX[.Y.Z] tag.',
    },
  },
  defaultOptions: [],
  create(context) {
    const sourceCode = context.sourceCode ?? context.getSourceCode?.();

    function checkComment(comment) {
      if (comment.type !== 'Block' || !comment.value.startsWith('*')) return;
      if (!comment.value.includes('@deprecated')) return;

      const hasRemovalTag = EXPECTED_REMOVAL_TAG_PATTERN.test(comment.value);

      // Extract the @deprecated line(s) to check the prose ending.
      // The @deprecated tag text runs from @deprecated to the next @ tag or end of comment.
      const deprecatedIndex = comment.value.indexOf('@deprecated');
      const afterDeprecated = comment.value.slice(deprecatedIndex + '@deprecated'.length);

      // Find where the @deprecated tag content ends (at the next @ tag or end of comment body)
      const nextTagMatch = afterDeprecated.match(/\n\s*\*\s*@/);
      const deprecatedContent = nextTagMatch
        ? afterDeprecated.slice(0, nextTagMatch.index)
        : afterDeprecated;

      // Strip leading/trailing whitespace and asterisks from each line, then join
      const deprecatedText = deprecatedContent
        .split('\n')
        .map((l) => l.replace(/^\s*\*?\s?/, '').trimEnd())
        .join(' ')
        .trim();

      const hasProse = deprecatedText.endsWith(FUTURE_MAJOR_RELEASE_SUFFIX);

      if (!hasProse || !hasRemovalTag) {
        // Point the error at the @deprecated token itself
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

        const loc = {
          start: { line: deprecatedLine, column: deprecatedColumn },
          end: { line: deprecatedLine, column: deprecatedColumn + '@deprecated'.length },
        };

        if (!hasProse) {
          context.report({ loc, messageId: 'missingRemovalProse' });
        }
        if (!hasRemovalTag) {
          context.report({ loc, messageId: 'missingRemovalTag' });
        }
      }
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
