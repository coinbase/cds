import { renderHook } from '@testing-library/react-native';

import { defaultTheme } from '../../themes/defaultTheme';
import { DefaultThemeProvider } from '../../utils/testHelpers';
import { useStatusBarStyle } from '../StatusBar';
import { ThemeProvider } from '../ThemeProvider';

const MockDarkMode: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => (
  <ThemeProvider activeColorScheme="dark" theme={defaultTheme}>
    {children}
  </ThemeProvider>
);
const MockCustomPalette: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => (
  <ThemeProvider
    activeColorScheme="light"
    theme={{
      ...defaultTheme,
      lightColor: { ...defaultTheme.lightColor, bg: `rgb(${defaultTheme.lightSpectrum.orange60})` },
    }}
  >
    {children}
  </ThemeProvider>
);

/**
 * If bar-style is 'dark-content' that means app has a light background.
 * If bar-style is 'light-content' that means app has a dark background.
 */
describe('useStatusBarStyle', () => {
  it('correctly infers background color luminosity from context for light spectrum', () => {
    const { result } = renderHook(() => useStatusBarStyle(), {
      wrapper: DefaultThemeProvider,
    });
    expect(result.current).toBe('dark-content');
  });

  it('correctly infers background color luminosity from context for dark spectrum', () => {
    const { result } = renderHook(() => useStatusBarStyle(), {
      wrapper: MockDarkMode,
    });
    expect(result.current).toBe('light-content');
  });

  it('correctly infers background color luminosity for custom palette', () => {
    const { result } = renderHook(() => useStatusBarStyle(), {
      wrapper: MockCustomPalette,
    });
    expect(result.current).toBe('light-content');
  });
});
