import React, { memo } from 'react';
import { Platform } from 'react-native';
import { PortalContext } from '@coinbase/cds-common/overlays/PortalContext';
import type { ToastProviderProps } from '@coinbase/cds-common/overlays/ToastProvider';
import { ToastProvider } from '@coinbase/cds-common/overlays/ToastProvider';
import { usePortal } from '@coinbase/cds-common/overlays/usePortal';
import type { PortalNode } from '@coinbase/cds-common/overlays/usePortalState';
import { usePortalState } from '@coinbase/cds-common/overlays/usePortalState';

export type PortalProviderProps = ToastProviderProps & {
  /**
   * By default the PortalProvider will render portal nodes. Disable this if you want to use the PortalNodes component to render the nodes instead.
   * @default true
   */
  renderPortals?: boolean;
};

type PortalHostProps = { nodes: PortalNode[] };

export const PortalHost = memo(({ nodes }: PortalHostProps) => {
  if (!nodes.length) return null;

  const isAndroid = Platform.OS === 'android';

  const elements = nodes.map((node) => node.element);

  if (elements.length > 1) {
    // multiple modal doesn't work if they are at the same level
    // insert node into previous node as children to avoid it
    return elements.reduce((parent, child, index) => {
      // avoid injecting into itself
      if (index === 0) return parent;

      return React.cloneElement(parent, {
        children: (
          <>
            {!isAndroid && child}
            {parent.props.children as React.ReactElement}
            {isAndroid && child}
          </>
        ),
      });
    }, elements[0]);
  }

  return <>{elements}</>;
});

export const PortalProvider: React.FC<React.PropsWithChildren<PortalProviderProps>> = ({
  children,
  toastBottomOffset = 0,
  renderPortals = true,
}) => {
  const portalState = usePortalState();

  return (
    <PortalContext.Provider value={portalState}>
      <ToastProvider toastBottomOffset={toastBottomOffset}>
        {renderPortals && <PortalHost nodes={portalState.nodes} />}
        {children}
      </ToastProvider>
    </PortalContext.Provider>
  );
};

export const PortalNodes = () => {
  const { nodes } = usePortal();
  return <PortalHost nodes={nodes} />;
};
