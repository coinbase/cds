import { useMemo } from 'react';
import type { ElevationLevels } from '@cbhq/cds-common/types/ElevationLevels';

import { useTheme } from '../hooks/useTheme';

import { ThemeProvider } from './ThemeProvider';
import { coinbaseTheme } from '@cbhq/cds-web/themes/coinbaseTheme';

const elevationThemeConfig = {
  1: {
    darkColor: {
      bg: `rgb(${coinbaseTheme.darkSpectrum.gray5})`,
      transparent: `rgb(${coinbaseTheme.darkSpectrum.gray5})`,
      secondary: `rgb(${coinbaseTheme.darkSpectrum.gray20})`,
    },
  },
  2: {
    darkColor: {
      bg: `rgb(${coinbaseTheme.darkSpectrum.gray10})`,
      transparent: `rgb(${coinbaseTheme.darkSpectrum.gray10})`,
      line: `rgb(${coinbaseTheme.darkSpectrum.gray60}, 0.68)`,
    },
  },
};

type ElevationThemeProviderBackwardCompatProps = {
  elevation?: ElevationLevels;
  children?: React.ReactNode;
};

export const ElevationThemeProviderBackwardCompat = ({
  children,
  elevation,
}: ElevationThemeProviderBackwardCompatProps) => {
  const theme = useTheme();
  const elevatedTheme = useMemo(() => {
    if (!elevation) return theme;
    return {
      ...theme,
      ...(theme.darkColor && {
        darkColor: {
          ...theme.darkColor,
          ...elevationThemeConfig[elevation].darkColor,
        },
      }),
    };
  }, [theme, elevation]);
  if (!elevation) return children;
  return (
    <ThemeProvider activeColorScheme={theme.activeColorScheme} theme={elevatedTheme}>
      {children}
    </ThemeProvider>
  );
};

// Cody Nova
//   1:20 PM
// <TrayV7>
//   <BoxV7 />
// </TrayV7>

// <TrayV7>
//   <BoxV8 />
// </TrayV7>

// <ThemeProviderV8WithElevation>
//   <TrayV8>
//     <BoxV8 />
//   </TrayV8>
// <ThemeProviderV8WithElevation>

// <TrayV8>
//   <ThemeProviderV7WithElevation>
//     <BoxV7 />
//   </ThemeProviderV7WithElevation>
// </TrayV8>
