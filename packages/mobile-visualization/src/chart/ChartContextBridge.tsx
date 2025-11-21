/**
 * Simplified context bridge utilities for React Native.
 * Adapted from its-fine to enable context sharing across React renderers
 * https://github.com/pmndrs/its-fine/blob/598b81f02778c22ed21121c2b1a786bdefb14e23/src/index.tsx
 */

import * as React from 'react';
import type ReactReconciler from 'react-reconciler';

/**
 * Represents a react-internal tree node.
 */
type TreeNode<T = any> = Omit<ReactReconciler.Fiber, 'stateNode'> & { stateNode: T };

/**
 * Represents a tree node selector for traversal.
 */
type TreeNodeSelector<T = any> = (node: TreeNode<T | null>) => boolean | void;

/**
 * Traverses up or down a React tree, return `true` to stop and select a node.
 */
function traverseTreeNode<T = any>(
  node: TreeNode | undefined,
  ascending: boolean,
  selector: TreeNodeSelector<T>,
): TreeNode<T> | undefined {
  if (!node) return;
  if (selector(node) === true) return node;

  let child = ascending ? node.return : node.child;
  while (child) {
    const match = traverseTreeNode(child, ascending, selector);
    if (match) return match;

    child = ascending ? null : child.sibling;
  }
}

/**
 * Wraps context to hide React development warnings about using contexts between renderers.
 */
function wrapContext<T>(context: React.Context<T>): React.Context<T> {
  try {
    return Object.defineProperties(context, {
      _currentRenderer: {
        get() {
          return null;
        },
        set() {},
      },
      _currentRenderer2: {
        get() {
          return null;
        },
        set() {},
      },
    });
  } catch (_) {
    return context;
  }
}

// In development, React will warn about using contexts between renderers.
// Suppress the warning because our context bridge fixes this issue
const error = console.error;
console.error = function (...args: any[]) {
  const message = args.join('');
  if (message?.startsWith('Warning:') && message.includes('useContext')) {
    console.error = error;
    return;
  }

  return error.apply(this, args);
};

const TreeNodeContext = wrapContext(React.createContext<TreeNode>(null!));

/**
 * A react-internal tree node provider that binds React children to the React tree for chart context bridging.
 */
export class ChartBridgeProvider extends React.Component<{ children?: React.ReactNode }> {
  private _reactInternals!: TreeNode;

  render() {
    return (
      <TreeNodeContext.Provider value={this._reactInternals}>
        {this.props.children}
      </TreeNodeContext.Provider>
    );
  }
}

/**
 * Returns the current react-internal tree node.
 */
function useTreeNode(): TreeNode<null> | undefined {
  const root = React.useContext(TreeNodeContext);
  if (root === null)
    throw new Error('useTreeNode must be called within a <ChartBridgeProvider />!');

  const id = React.useId();
  const treeNode = React.useMemo(() => {
    for (const maybeNode of [root, root?.alternate]) {
      if (!maybeNode) continue;
      const node = traverseTreeNode<null>(maybeNode, false, (node) => {
        let state = node.memoizedState;
        while (state) {
          if (state.memoizedState === id) return true;
          state = state.next;
        }
      });
      if (node) return node;
    }
  }, [root, id]);

  return treeNode;
}

export type ContextMap = Map<React.Context<any>, any> & {
  get<T>(context: React.Context<T>): T | undefined;
};

/**
 * Returns a map of all contexts and their values.
 */
function useContextMap(): ContextMap {
  const treeNode = useTreeNode();
  const [contextMap] = React.useState(() => new Map<React.Context<any>, any>());

  // Collect live context
  contextMap.clear();
  let node = treeNode;
  while (node) {
    if (node.type && typeof node.type === 'object') {
      // https://github.com/facebook/react/pull/28226
      const enableRenderableContext =
        (node.type as any)._context === undefined && (node.type as any).Provider === node.type;
      const context = enableRenderableContext ? node.type : (node.type as any)._context;
      if (context && context !== TreeNodeContext && !contextMap.has(context)) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        contextMap.set(context, React.useContext(wrapContext(context)));
      }
    }

    node = node.return!;
  }

  return contextMap;
}

/**
 * Represents a chart context bridge provider component.
 */
export type ChartContextBridge = React.FC<React.PropsWithChildren<object>>;

/**
 * Returns a ChartContextBridge of live context providers to pierce Context across renderers.
 * Pass ChartContextBridge as a component to a secondary renderer (e.g., Skia Canvas) to enable context-sharing in charts.
 */
export function useChartContextBridge(): ChartContextBridge {
  const contextMap = useContextMap();

  // Flatten context and their memoized values into a `ChartContextBridge` provider
  return React.useMemo(
    () =>
      Array.from(contextMap.keys()).reduce(
        (Prev, context) => (props) => (
          <Prev>
            <context.Provider {...props} value={contextMap.get(context)} />
          </Prev>
        ),
        (props) => <ChartBridgeProvider {...props} />,
      ),
    [contextMap],
  );
}
