import { useCallback, useEffect } from 'react';

import type { TableRowRef } from '../TableRow';

/** Call an event handler on Enter and Space keypress */
export const useTableRowListener = (ref: TableRowRef, handler?: () => void) => {
  const handleEvent = useCallback(
    ({ target, key, code }: KeyboardEvent) => {
      // Do not trigger handler if keydown event originates from a child
      if (ref.current === target && (key === 'Enter' || code === 'Space')) {
        handler?.();
      }
    },
    [handler, ref],
  );

  useEffect(() => {
    // Create a reference to the reference for unmounting
    const target = ref.current;
    target?.addEventListener('keydown', handleEvent);

    // Remove event listeners on cleanup
    return () => {
      target?.removeEventListener('keydown', handleEvent);
    };
  }, [ref, handleEvent]);
};
