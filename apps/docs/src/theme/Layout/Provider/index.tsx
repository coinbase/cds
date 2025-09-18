import React from 'react';
import { cx } from '@cbhq/cds-web';
import { PortalProvider } from '@cbhq/cds-web/overlays/PortalProvider';
import { defaultFontStyles } from '@cbhq/cds-web/styles/defaultFont';
import { globalStyles } from '@cbhq/cds-web/styles/global';
import { MediaQueryProvider } from '@cbhq/cds-web/system/MediaQueryProvider';
import { ThemeProvider } from '@cbhq/cds-web/system/ThemeProvider';
import { DocsPreferredVersionContextProvider } from '@docusaurus/plugin-content-docs/client';
import { composeProviders } from '@docusaurus/theme-common';
import {
  AnnouncementBarProvider,
  ColorModeProvider,
  NavbarProvider,
  PluginHtmlClassNameProvider,
  ScrollControllerProvider,
} from '@docusaurus/theme-common/internal';
import KBarProvider from '@site/src/components/kbar/KBarProvider';
import { useInternalCDSTheme } from '@site/src/hooks/useInternalCDSTheme';
import type { Props } from '@theme/Layout/Provider';

import { UnifiedThemeProvider, useDocsTheme } from './UnifiedThemeContext';

const CDSContainer = ({ children }: { children: React.ReactNode }) => {
  const { colorScheme, theme } = useDocsTheme();

  return (
    <div className={cx(globalStyles, defaultFontStyles)}>
      <ThemeProvider activeColorScheme={colorScheme} display="contents" theme={theme}>
        <PortalProvider>
          <KBarProvider>{children}</KBarProvider>
        </PortalProvider>
      </ThemeProvider>
    </div>
  );
};

const Provider = composeProviders([
  ColorModeProvider,
  AnnouncementBarProvider,
  ScrollControllerProvider,
  DocsPreferredVersionContextProvider,
  PluginHtmlClassNameProvider,
  NavbarProvider,
  MediaQueryProvider,
  UnifiedThemeProvider,
]);

export default function LayoutProvider({ children }: Props): JSX.Element {
  useInternalCDSTheme();
  return (
    <Provider>
      <CDSContainer>{children}</CDSContainer>
    </Provider>
  );
}
