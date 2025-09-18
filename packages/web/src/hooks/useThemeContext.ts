import { useContext } from 'react';

import { ThemeContext, type ThemeContextValue } from '../system/ThemeProvider';

/**
 * Fetches the ThemeContextValue and verifies it is defined, so it must be used inside a ThemeProvider.
 *
 * If you instead need to fetch the ThemeContextValue without throwing an error when the context is undefined, you can use `useContext(ThemeContext)` instead.
 */
export const useThemeContext = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) throw Error('useThemeContext must be used within a ThemeProvider');
  return context;
};
