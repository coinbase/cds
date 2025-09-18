import React from 'react';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import { renderHook } from '@testing-library/react-hooks';

import { defaultTheme } from '../../themes/defaultTheme';
import { useAndroidNavigationBarUpdater } from '../AndroidNavigationBar';
import { ThemeProvider } from '../ThemeProvider';

const LightModeProvider = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider activeColorScheme="light" theme={defaultTheme}>
    {children}
  </ThemeProvider>
);

jest.useFakeTimers();
jest.mock('react-native-navigation-bar-color');
const mockPlatform = (OS: 'ios' | 'android', Version?: number) => {
  jest.runAllTimers();
  jest.resetModules();
  jest.doMock('react-native/Libraries/Utilities/Platform', () => ({ OS, Version }));
};

describe('useAndroidNavigationBarUpdater', () => {
  it('does not fire for iOS', () => {
    mockPlatform('ios');
    const { result } = renderHook(() => useAndroidNavigationBarUpdater(), {
      wrapper: LightModeProvider,
    });
    result.current();
    expect(changeNavigationBarColor).not.toHaveBeenCalled();
  });

  it('correctly fires for android version', () => {
    mockPlatform('android', 26);

    const { result } = renderHook(() => useAndroidNavigationBarUpdater(), {
      wrapper: LightModeProvider,
    });
    result.current();
    expect(changeNavigationBarColor).toHaveBeenCalled();
  });
});
