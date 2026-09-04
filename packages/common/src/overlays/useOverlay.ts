import { cloneElement, useCallback, useId, useMemo } from 'react';

import { usePortal } from './usePortal';
import type { PortalNode } from './usePortalState';

export const useOverlay = (idPrefix?: string) => {
  const { addNode, removeNode } = usePortal();

  const randomId = useId();
  const id = useMemo(() => `${idPrefix}-${randomId}`, [idPrefix, randomId]);

  const open = useCallback(
    (content: PortalNode['element']): string => {
      const element = cloneElement(content, {
        // TODO react docs recommend _not_ using useId for keys
        // follow up with a solution that doesn't use useId
        // @link https://react.dev/reference/react/useId#usage
        key: id,
        visible: true,
      });

      addNode(id, element);
      return id;
    },
    [addNode, id],
  );

  const close = useCallback(() => {
    removeNode(id);
  }, [removeNode, id]);

  return useMemo(
    () => ({
      open,
      close,
    }),
    [open, close],
  );
};
