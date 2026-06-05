import { useCallback } from 'react';
import type React from 'react';

type OptionalRef<T> = React.Ref<T> | undefined;

function getReactElementRef<T = unknown>(element: React.ReactElement): React.Ref<T> | null {
  // React 19: refs are on props
  if (
    typeof element.props === 'object' &&
    element.props !== null &&
    'ref' in (element.props as object)
  ) {
    return (element.props as { ref?: React.Ref<T> }).ref ?? null;
  }

  // React 18 and earlier: refs are on the element
  if ('ref' in (element as any)) {
    return ((element as any).ref as React.Ref<T> | undefined) ?? null;
  }

  return null;
}

/**
 * Merge multiple refs into a single ref callback.
 *
 * - Supports callback refs and object refs.
 * - Ignores `null`/`undefined` refs.
 * - Intentionally does not support legacy string refs.
 */
export const mergeRefs = <T = unknown>(...refs: OptionalRef<T>[]): React.RefCallback<T> => {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref != null) {
        (ref as { current: T | null }).current = value;
      }
    });
  };
};

/**
 * Like `mergeRefs`, but also includes an existing ref already present on a React element.
 *
 * This is React 18/19 compatible:
 * - React 19 stores refs on `element.props.ref`
 * - React 18 and earlier store refs on `element.ref`
 */
export const mergeReactElementRef = <T = unknown>(
  element: React.ReactElement,
  ...refs: OptionalRef<T>[]
): React.RefCallback<T> => {
  const existingRef = getReactElementRef<T>(element);
  return mergeRefs(...refs, existingRef);
};

/**
 * @deprecated Prefer `mergeRefs` function instead. This will be removed in a future major release.
 * @deprecationExpectedRemoval v10
 */
export const useMergeRefs = <T = unknown>(...refs: OptionalRef<T>[]): React.RefCallback<T> => {
  /**
   * Merges multiple refs into a single ref callback. Supports both callback refs
   * and object refs. `null`/`undefined` refs are ignored.
   *
   * The returned callback is referentially stable across renders as long as the
   * underlying refs themselves are stable. This is critical under React 19,
   * which schedules a detach (`oldRef(null)`) followed by an attach
   * (`newRef(node)`) every time a ref-callback's identity changes. Without
   * `useCallback` here, every render would create a new merged callback,
   * triggering React 19's detach/attach lifecycle and — when one of the merged
   * refs synchronously sets state during attach/detach — an infinite update
   * loop ending in `Maximum update depth exceeded`.
   */
  return useCallback(
    (value) => {
      mergeRefs(...refs)(value);
    },
    // The deps are the individual refs, not the rest-parameter array.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    refs,
  );
};
