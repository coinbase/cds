import { act } from 'react';
import { renderHook } from '@testing-library/react-hooks';

import { useScrollOffset } from '../useScrollOffset';

describe('useScrollOffset.test', () => {
  it('works', () => {
    const { result } = renderHook(() => useScrollOffset());

    void act(() =>
      result.current.onScroll({
        nativeEvent: { contentOffset: { x: 10, y: 20 }, layoutMeasurement: { width: 10 } },
      }),
    );

    expect(result.current.xOffset).toBeTruthy();
    expect(result.current.yOffset).toBeTruthy();
    expect(result.current.currentIndex).toBe(1);
  });

  it('return correct currentIndex when having negative xOffset', () => {
    const { result } = renderHook(() => useScrollOffset());

    void act(() =>
      result.current.onScroll({
        nativeEvent: { contentOffset: { x: -1, y: 20 }, layoutMeasurement: { width: 10 } },
      }),
    );

    expect(result.current.xOffset).toBeTruthy();
    expect(result.current.yOffset).toBeTruthy();
    expect(result.current.currentIndex).toBe(0);
  });
});
