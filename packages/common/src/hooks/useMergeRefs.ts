import { useCallback } from 'react';

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
export const useMergeRefs = <T = any>(
  ...refs: (React.MutableRefObject<T> | React.LegacyRef<T> | undefined | null)[]
): React.RefCallback<T> => {
  return useCallback(
    (value) => {
      refs.forEach((ref) => {
        if (typeof ref === 'function') {
          ref(value);
        } else if (ref != null) {
          (ref as React.MutableRefObject<T | null>).current = value;
        }
      });
    },
    // The deps are the spread refs themselves. React's `useCallback` shallow-
    // compares each element of the deps array, so the returned callback stays
    // stable when each underlying ref keeps the same identity across renders.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    refs,
  );
};
