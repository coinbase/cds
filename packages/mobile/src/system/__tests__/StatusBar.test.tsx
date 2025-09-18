import { StatusBar as RNStatusBar } from 'react-native';
import { renderHook } from '@testing-library/react-hooks';

import { defaultTheme } from '../../themes/defaultTheme';
import { DefaultThemeProvider } from '../../utils/testHelpers';
import { useStatusBarStyle, useStatusBarUpdater } from '../StatusBar';
import { ThemeProvider } from '../ThemeProvider';

jest.mock('react-native/Libraries/Components/StatusBar/StatusBar', () => ({
  ...jest.requireActual<Record<string, unknown>>(
    'react-native/Libraries/Components/StatusBar/StatusBar',
  ),
  setBarStyle: jest.fn(),
  setBackgroundColor: jest.fn(),
  setTranslucent: jest.fn(),
}));

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

describe('useStatusBarUpdater', () => {
  it('correctly updates React Native StatusBar bar style', () => {
    const { result } = renderHook(() => useStatusBarUpdater(), {
      wrapper: DefaultThemeProvider,
    });
    result.current();
    expect(RNStatusBar.setBarStyle).toHaveBeenCalledWith('dark-content', true);
  });

  it('does not call setBackgroundColor or setTranslucent on iOS', () => {
    const { result } = renderHook(() => useStatusBarUpdater(), {
      wrapper: DefaultThemeProvider,
    });
    result.current();
    expect(RNStatusBar.setBarStyle).toHaveBeenCalledWith('dark-content', true);
    expect(RNStatusBar.setBackgroundColor).not.toHaveBeenCalled();
    expect(RNStatusBar.setTranslucent).not.toHaveBeenCalled();
  });

  it('does call setBackgroundColor or setTranslucent on Android', () => {
    jest.mock('react-native/Libraries/Utilities/Platform', () => ({
      ...jest.requireActual<Record<string, unknown>>('react-native/Libraries/Utilities/Platform'),
      OS: 'android',
    }));
    const { result } = renderHook(() => useStatusBarUpdater(), {
      wrapper: DefaultThemeProvider,
    });
    result.current();
    expect(RNStatusBar.setBarStyle).toHaveBeenCalledWith('dark-content', true);
    expect(RNStatusBar.setBackgroundColor).toHaveBeenCalled();
    expect(RNStatusBar.setTranslucent).toHaveBeenCalled();
  });
});
