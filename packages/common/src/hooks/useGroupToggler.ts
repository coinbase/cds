// internal to CDS, each platform customizes on top of this hook.
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export type GroupToggleState<T extends string> = {
  select: (value?: T) => void;
  unselect: (value?: T) => void;
  toggle: (value?: T) => void;
  isAllSelected: boolean | 'mixed';
};

/**
 *
 * @param values - An array of all possible options. Make sure the array doesn't change if it's the same values so that the handlers will also stay the same.
 * @param initialState - Initial checked option values.
 * @returns [
 *  selectedValues,
    {
      select,
      unselect,
      toggle,
      isAllSelected,
    }
  ]
 */

/** @deprecated Do not use this. */
export const useGroupToggler = <T extends string>(
  values: T[],
  initialState?: T[],
): [Set<T>, GroupToggleState<T>] => {
  // The function inside useState will still run on every render.
  // This makes sure that we are not creating new Sets on every render
  // and just throwing it away immediately.
  const initialStateSet = useMemo(() => new Set<T>(initialState), [initialState]);
  const [state, setState] = useState<Set<T>>(initialStateSet);
  const lastMixedStateRef = useRef<Set<T> | undefined>();

  useEffect(() => {
    const isStateMixed = state.size !== 0 && state.size !== values.length;
    if (isStateMixed) {
      lastMixedStateRef.current = state;
    }
  }, [state, values.length, lastMixedStateRef]);

  const select = useCallback<(value?: T) => void>(
    (value) => {
      setState((prevState) => {
        if (!value) {
          // select all
          return new Set(values);
        }
        const nextState = new Set(prevState).add(value);
        if (nextState.size === values.length) {
          lastMixedStateRef.current = undefined;
        }
        return nextState;
      });
    },
    [setState, values],
  );

  const unselect = useCallback<(value?: T) => void>(
    (value) => {
      setState((prevState) => {
        if (!value) {
          // unselect all
          return new Set();
        }
        const nextState = new Set(prevState);
        if (nextState.size === 0) {
          lastMixedStateRef.current = undefined;
        }
        return nextState;
      });
    },
    [setState],
  );

  const toggle = useCallback<(value?: T) => void>(
    (value) => {
      setState((prevState) => {
        // group
        if (!value) {
          const isAllSelected = prevState.size === values.length;
          const isAllUnSelected = prevState.size === 0;
          if (isAllSelected) {
            return new Set();
          }
          if (isAllUnSelected) {
            // last mixed values if any
            return lastMixedStateRef.current ? lastMixedStateRef.current : new Set(values);
          }
          // mixed
          return new Set(values);
        }

        // individual value
        const nextState = new Set(prevState);
        if (nextState.delete(value)) {
          if (nextState.size === 0) {
            lastMixedStateRef.current = undefined;
          }
          return nextState;
        }
        nextState.add(value);
        if (nextState.size === values.length) {
          lastMixedStateRef.current = undefined;
        }
        return nextState;
      });
    },
    [setState, values],
  );

  const isAllSelected = useMemo(() => {
    if (state.size === 0) {
      return false;
    }
    if (state.size === values.length) {
      return true;
    }
    return 'mixed';
  }, [state, values.length]);

  return [
    state,
    {
      select,
      unselect,
      toggle,
      isAllSelected,
    },
  ];
};
