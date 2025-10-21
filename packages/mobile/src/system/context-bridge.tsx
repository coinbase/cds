/**
 * Simplified context bridge utilities for React Native.
 * Adapted from its-fine to enable context sharing across React renderers
 * https://github.com/pmndrs/its-fine/blob/598b81f02778c22ed21121c2b1a786bdefb14e23/src/index.tsx
 */

import * as React from 'react';
import type ReactReconciler from 'react-reconciler';

/**
 * Represents a react-internal Fiber node.
 */
export type Fiber<T = any> = Omit<ReactReconciler.Fiber, 'stateNode'> & { stateNode: T };

/**
 * Represents a Fiber node selector for traversal.
 */
export type FiberSelector<T = any> = (node: Fiber<T | null>) => boolean | void;

/**
 * Traverses up or down a Fiber tree, return `true` to stop and select a node.
 */
export function traverseFiber<T = any>(
  fiber: Fiber | undefined,
  ascending: boolean,
  selector: FiberSelector<T>,
): Fiber<T> | undefined {
  if (!fiber) return;
  if (selector(fiber) === true) return fiber;

  let child = ascending ? fiber.return : fiber.child;
  while (child) {
    const match = traverseFiber(child, ascending, selector);
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

const FiberContext = wrapContext(React.createContext<Fiber>(null!));

/**
 * A react-internal Fiber provider that binds React children to the React Fiber tree.
 */
export class FiberProvider extends React.Component<{ children?: React.ReactNode }> {
  private _reactInternals!: Fiber;

  render() {
    return (
      <FiberContext.Provider value={this._reactInternals}>
        {this.props.children}
      </FiberContext.Provider>
    );
  }
}

/**
 * Returns the current react-internal Fiber.
 */
export function useFiber(): Fiber<null> | undefined {
  const root = React.useContext(FiberContext);
  if (root === null) throw new Error('useFiber must be called within a <FiberProvider />!');

  const id = React.useId();
  const fiber = React.useMemo(() => {
    for (const maybeFiber of [root, root?.alternate]) {
      if (!maybeFiber) continue;
      const fiber = traverseFiber<null>(maybeFiber, false, (node) => {
        let state = node.memoizedState;
        while (state) {
          if (state.memoizedState === id) return true;
          state = state.next;
        }
      });
      if (fiber) return fiber;
    }
  }, [root, id]);

  return fiber;
}

export type ContextMap = Map<React.Context<any>, any> & {
  get<T>(context: React.Context<T>): T | undefined;
};

/**
 * Returns a map of all contexts and their values.
 */
export function useContextMap(): ContextMap {
  const fiber = useFiber();
  const [contextMap] = React.useState(() => new Map<React.Context<any>, any>());

  // Collect live context
  contextMap.clear();
  let node = fiber;
  while (node) {
    if (node.type && typeof node.type === 'object') {
      // https://github.com/facebook/react/pull/28226
      const enableRenderableContext =
        (node.type as any)._context === undefined && (node.type as any).Provider === node.type;
      const context = enableRenderableContext ? node.type : (node.type as any)._context;
      if (context && context !== FiberContext && !contextMap.has(context)) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        contextMap.set(context, React.useContext(wrapContext(context)));
      }
    }

    node = node.return!;
  }

  return contextMap;
}

/**
 * Represents a react-context bridge provider component.
 */
export type ContextBridge = React.FC<React.PropsWithChildren<object>>;

/**
 * Returns a ContextBridge of live context providers to pierce Context across renderers.
 * Pass ContextBridge as a component to a secondary renderer (e.g., Skia Canvas) to enable context-sharing.
 */
export function useContextBridge(): ContextBridge {
  const contextMap = useContextMap();

  // Flatten context and their memoized values into a `ContextBridge` provider
  return React.useMemo(
    () =>
      Array.from(contextMap.keys()).reduce(
        (Prev, context) => (props) => (
          <Prev>
            <context.Provider {...props} value={contextMap.get(context)} />
          </Prev>
        ),
        (props) => <FiberProvider {...props} />,
      ),
    [contextMap],
  );
}
