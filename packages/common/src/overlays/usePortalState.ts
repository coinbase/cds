import { cloneElement, useCallback, useMemo, useState } from 'react';
import type React from 'react';

/**
 * This type defines the basic interface of a Component rendered through the PortalProvider.
 */
export type PortalNode = {
  id: string;
  element: React.ReactElement<{
    visible: boolean;
    onDidClose: () => void;
    children?: React.ReactNode;
    ref?: React.Ref<{ onRequestClose: () => void }>;
  }>;
};

/**
 * This hook is used to manage the state of a set of nodes rendered through the PortalProvider.
 */
export const usePortalState = () => {
  const [nodes, setNodes] = useState<PortalNode[]>([]);

  const addNode = useCallback((id: string, element: PortalNode['element']) => {
    setNodes((prevNodes) => {
      const index = prevNodes.findIndex((item) => item.id === id);
      // if the id already exists, replace the element
      if (index !== -1) {
        const copy = [...prevNodes];
        copy[index].element = element;
        return copy;
      }

      return [...prevNodes, { id, element }];
    });
  }, []);

  const filterInvisibleNodes = useCallback(() => {
    setNodes((prevNodes) => prevNodes.filter((node) => node.element.props.visible));
  }, []);

  const removeNode = useCallback(
    (id: string) => {
      setNodes((prevNodes) => {
        const index = prevNodes.findIndex((item) => item.id === id);
        if (index === -1) return prevNodes;

        const copy = [...prevNodes];
        const nodeMatch = prevNodes[index].element;
        const handleOnDidClose = () => {
          nodeMatch.props?.onDidClose?.();
          filterInvisibleNodes();
        };

        // set the visible prop to false to trigger exit animation
        copy[index].element = cloneElement(nodeMatch, {
          visible: false,
          onDidClose: handleOnDidClose,
        });
        return copy;
      });
    },
    [filterInvisibleNodes],
  );

  return useMemo(() => ({ nodes, addNode, removeNode }), [nodes, addNode, removeNode]);
};
