import { useContext } from 'react';

import type { Theme } from '../core/theme';
import { ThemeContext } from '../system/ThemeProvider';

/** Returns the currently active Theme, determined by the ThemeProvider's `activeColorScheme`. */
export const useTheme = (): Theme => {
  const context = useContext(ThemeContext);
  if (!context) throw Error('useTheme must be used within a ThemeProvider');
  return context;
};
