import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { renderHook } from '@testing-library/react-native';

import { useDimensions } from '../useDimensions';

const safeAreaInitialMetrics = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 20, left: 0, right: 0, bottom: 0 },
};

describe('useDimensions.test', () => {
  it('returns screen dimensions', () => {
    const { result } = renderHook(() => useDimensions(), {
      wrapper: ({ children }) =>
        React.createElement(SafeAreaProvider, { initialMetrics: safeAreaInitialMetrics }, children),
    });

    expect(result.current.screenHeight).toBe(1334);
    expect(result.current.screenWidth).toBe(750);
    expect(result.current.statusBarHeight).toBe(20);
  });
});
