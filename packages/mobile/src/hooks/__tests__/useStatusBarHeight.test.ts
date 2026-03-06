import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { renderHook } from '@testing-library/react-native';

import { useStatusBarHeight } from '../useStatusBarHeight';

const safeAreaInitialMetrics = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 20, left: 0, right: 0, bottom: 0 },
};

describe('useStatusBarHeight.test', () => {
  it('returns the safe area top inset', () => {
    const { result } = renderHook(() => useStatusBarHeight(), {
      wrapper: ({ children }) =>
        React.createElement(SafeAreaProvider, { initialMetrics: safeAreaInitialMetrics }, children),
    });

    expect(result.current).toBe(20);
  });
});
