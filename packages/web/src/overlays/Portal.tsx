import React, { memo } from 'react';
import { createPortal } from 'react-dom';

import { useTheme } from '../hooks/useTheme';
import { ThemeProvider } from '../system/ThemeProvider';
import { isSSR } from '../utils/browser';

export type PortalProps = {
  /**
   * Disable React portal integration
   */
  disablePortal?: boolean;
  /**
   * Portal container element id
   */
  containerId?: string;
  children: React.ReactNode;
};

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
    <ThemeProvider activeColorScheme={theme.activeColorScheme} theme={theme}>
      {children}
    </ThemeProvider>,
    document.getElementById(containerId) as HTMLElement,
  );
});
