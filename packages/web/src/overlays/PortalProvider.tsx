import React, { memo, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { PortalContext } from '@coinbase/cds-common/overlays/PortalContext';
import type { ToastProviderProps } from '@coinbase/cds-common/overlays/ToastProvider';
import { ToastProvider } from '@coinbase/cds-common/overlays/ToastProvider';
import { usePortal } from '@coinbase/cds-common/overlays/usePortal';
import type { PortalNode } from '@coinbase/cds-common/overlays/usePortalState';
import { usePortalState } from '@coinbase/cds-common/overlays/usePortalState';
import { zIndex } from '@coinbase/cds-common/tokens/zIndex';

import { IsoHexagonClipPath } from '../media/Hexagon';
import { BrowserOnly } from '../system/BrowserOnly';
import { getBrowserGlobals } from '../utils/browser';

export type PortalProviderProps = ToastProviderProps & {
  /**
   * By default the PortalProvider will render portal nodes. Disable this if you want to use the PortalNodes component to render the nodes instead.
   * @default true
   */
  renderPortals?: boolean;
};

export const portalRootId = 'portalRoot';
export const modalContainerId = 'modalsContainer';
export const alertContainerId = 'alertsContainer';
export const toastContainerId = 'toastsContainer';
export const tooltipContainerId = 'tooltipContainer';
export const trayContainerId = 'trayContainer';

const safeDocument = getBrowserGlobals()?.document;

export const PortalHost: React.FC = memo(() => {
  const portalRoot = useMemo(
    // prevent duplicate portal root
    () => safeDocument?.createElement('div'),
    [],
  );

  useEffect(() => {
    const target = safeDocument?.body;

    // prevent duplicate host
    if (safeDocument?.getElementById(portalRootId) || !portalRoot) return undefined;

    portalRoot.id = portalRootId;
    portalRoot.style.zIndex = zIndex.portal.toString();
    // enable stack order
    portalRoot.style.position = 'relative';
    // enable stack order on children
    portalRoot.style.display = 'flex';

    // Append element to dom
    target?.appendChild(portalRoot);

    // Avoid removing child from other provider
    // This happens when multiple PortalProvider are defined
    return () => {
      // Remove element from dom
      portalRoot.remove();
    };
  }, [portalRoot]);

  if (!portalRoot) return null;

  return createPortal(
    <>
      <div
        data-testid="portal-modal-container"
        id={modalContainerId}
        style={{ zIndex: zIndex.modal }}
      />
      <div
        data-testid="portal-toast-container"
        id={toastContainerId}
        style={{ zIndex: zIndex.toast }}
      />
      <div
        data-testid="portal-alert-container"
        id={alertContainerId}
        style={{ zIndex: zIndex.alert }}
      />
      <div
        data-testid="portal-tooltip-container"
        id={tooltipContainerId}
        style={{ zIndex: zIndex.tooltip }}
      />
      <div
        data-testid="portal-tray-container"
        id={trayContainerId}
        style={{ zIndex: zIndex.tray }}
      />
    </>,
    portalRoot,
  );
});

export const PortalProvider: React.FC<React.PropsWithChildren<PortalProviderProps>> = memo(
  ({ children, toastBottomOffset = 0, renderPortals = true }) => {
    const portalState = usePortalState();

    return (
      <PortalContext.Provider value={portalState}>
        <ToastProvider toastBottomOffset={toastBottomOffset}>
          {renderPortals && (
            <>
              <BrowserOnly>
                <PortalHost />
              </BrowserOnly>
              {portalState.nodes.map((node: PortalNode) => node.element)}
            </>
          )}
          {children}
          <IsoHexagonClipPath />
        </ToastProvider>
      </PortalContext.Provider>
    );
  },
);

export const PortalNodes = () => {
  const { nodes } = usePortal();
  return (
    <>
      <BrowserOnly>
        <PortalHost />
      </BrowserOnly>
      {nodes.map((node: PortalNode) => node.element)}
    </>
  );
};
