/**
 * Utilities for transforms (CommonJS-compatible)
 *
 * This module re-exports utilities in a way that jscodeshift transforms can use.
 * It avoids complex dependencies and ES module issues.
 */

import { TODO_PREFIX } from './constants';

// Re-export just the essential constants transforms need
export { TODO_PREFIX };

/**
 * Simple logger for transforms
 * Note: This is a simplified version that just console.logs since
 * the full logger isn't available in jscodeshift workers
 */
export const transformLogger = {
  success: (message: string, file?: string, line?: number) => {
    const location = file ? ` [${file}${line ? `:${line}` : ''}]` : '';
    console.log(`✓ ${message}${location}`);
  },
  warn: (message: string, file?: string, line?: number) => {
    const location = file ? ` [${file}${line ? `:${line}` : ''}]` : '';
    console.warn(`⚠ ${message}${location}`);
  },
  info: (message: string, file?: string, line?: number) => {
    const location = file ? ` [${file}${line ? `:${line}` : ''}]` : '';
    console.log(`ℹ ${message}${location}`);
  },
};

/**
 * Add a TODO comment to a node.
 *
 * - **Non-JSX context**: attaches a `// line comment` as a leading comment on
 *   the node, which is the standard jscodeshift approach.
 * - **JSX context** (JSXElement / JSXFragment / JSXExpressionContainer child):
 *   inserts a `{/* … *\/}` sibling node immediately before the target element.
 *   Plain line or block comments placed directly inside JSX markup are either
 *   invalid (line comments) or render as text (bare block comments), so the
 *   only correct form is a JSXExpressionContainer wrapping a JSXEmptyExpression
 *   whose `innerComments` carry the block comment text.
 */
export function addTodoComment(
  j: any,
  path: any,
  transformName: string,
  message: string,
  context?: string,
): void {
  const isJsxNode =
    j.JSXElement.check(path.value) ||
    j.JSXExpressionContainer.check(path.value) ||
    j.JSXFragment.check(path.value);

  const parentIsJsxElement = path.parent != null && j.JSXElement.check(path.parent.value);

  if (isJsxNode && parentIsJsxElement) {
    // Recast does not print innerComments on synthetic JSXEmptyExpression nodes,
    // so we parse the {/* */} string from source to get a node recast will print.
    const makeJsxComment = (text: string) => {
      const parsed = j(`<>{/* ${text} */}</>`);
      return parsed.find(j.JSXExpressionContainer).paths()[0].value;
    };

    const children: any[] = path.parent.value.children;
    const index = children.indexOf(path.value);
    if (index !== -1) {
      const insertions = [makeJsxComment(`${TODO_PREFIX}:${transformName}]: ${message}`)];
      if (context) insertions.push(makeJsxComment(context));
      children.splice(index, 0, ...insertions);
    }
    return;
  }

  // Non-JSX: attach leading line comments to the node itself
  const comments = [j.commentLine(` ${TODO_PREFIX}:${transformName}]: ${message}`, true, false)];
  if (context) {
    comments.push(j.commentLine(` ${context}`, true, false));
  }
  path.value.comments = [...comments, ...(path.value.comments || [])];
}

/**
 * Check if a node already has a migration TODO comment, in either form:
 * - a leading `// TODO(cds-migration)…` line comment on the node itself, or
 * - a `{/* TODO(cds-migration)… *\/}` JSXExpressionContainer sibling that
 *   immediately precedes the node inside a JSX parent.
 */
export function hasMigrationTodo(path: any): boolean {
  // Non-JSX: check leading comments on the node
  const nodeComments: any[] = path.value.comments || [];
  if (nodeComments.some((c: any) => c.value?.includes(TODO_PREFIX))) return true;

  // JSX: check for a preceding {/* TODO … */} sibling
  const parentNode = path.parent?.value;
  if (parentNode?.type === 'JSXElement') {
    const children: any[] = parentNode.children ?? [];
    const index = children.indexOf(path.value);
    if (index > 0) {
      const prev = children[index - 1];
      const innerComments: any[] =
        (prev?.type === 'JSXExpressionContainer' && prev.expression?.innerComments) || [];
      if (innerComments.some((c: any) => c.value?.includes(TODO_PREFIX))) return true;
    }
  }

  return false;
}
