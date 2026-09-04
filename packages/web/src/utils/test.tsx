import React from 'react';
import type { ColorScheme } from '@coinbase/cds-common/core/theme';
import type { waitForOptions } from '@testing-library/react';
import { waitFor } from '@testing-library/react';

import type { ThemeConfig } from '../core/theme';
import { ThemeProvider } from '../system/ThemeProvider';
import { defaultTheme } from '../themes/defaultTheme';

type DefaultThemeProviderProps = {
  children?: React.ReactNode;
  theme?: ThemeConfig;
  activeColorScheme?: ColorScheme;
};

export const DefaultThemeProvider = ({
  children,
  theme = defaultTheme,
  activeColorScheme = 'light',
}: DefaultThemeProviderProps): React.ReactElement => (
  <ThemeProvider activeColorScheme={activeColorScheme} theme={theme}>
    {children}
  </ThemeProvider>
);

// Test util that allows for us to test that an async thing does NOT occur within a timeframe
export async function waitForNotToHappen<T>(callback: () => Promise<T> | T, opts?: waitForOptions) {
  return expect(waitFor(callback, { ...opts, timeout: opts?.timeout ?? 100 })).rejects.toThrow();
}
