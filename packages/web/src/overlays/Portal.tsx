import React, { memo } from 'react';
import { createPortal } from 'react-dom';

import { useTheme } from '../hooks/useTheme';
import { ThemeProvider } from '../system/ThemeProvider';
import { isSSR } from '../utils/browser';

export type PortalProps = {
  /** When true, renders children in place without creating a React portal. */
  disablePortal?: boolean;
  /** The DOM element ID to render the portal content into. */
  containerId?: string;
  children: React.ReactNode;
};

/**
 * Internal component used by CDS overlay components (Modal, Toast, Alert, etc.) to
 * render content into the container elements created by PortalProvider. Wraps
 * `createPortal` and automatically re-establishes the current theme in the portal's
 * DOM tree via an isolated ThemeProvider.
 */
export const Portal = memo(function Portal({
  disablePortal,
  children,
  containerId = '',
}: PortalProps) {
  const theme = useTheme();

  if (disablePortal || isSSR() || !document.getElementById(containerId)) {
    return <>{children}</>;
  }

  return createPortal(
    <ThemeProvider isolated activeColorScheme={theme.activeColorScheme} theme={theme}>
      {children}
    </ThemeProvider>,
    document.getElementById(containerId) as HTMLElement,
  );
});
