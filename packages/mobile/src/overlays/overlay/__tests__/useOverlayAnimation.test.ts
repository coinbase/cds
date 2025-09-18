import { Animated } from 'react-native';
import { renderHook } from '@testing-library/react-hooks';

import { useOverlayAnimation } from '../useOverlayAnimation';

jest.useFakeTimers();

function getAnimatedValue(val: Animated.Value) {
  // @ts-expect-error: I know what I'm doing.
  return val._value as unknown;
}

describe('useOverlayAnimation', () => {
  it('returns correct animated value', async () => {
    const { result } = renderHook(() => useOverlayAnimation());
    const [opacity] = result.current;
    expect(getAnimatedValue(opacity)).toBe(0);
  });

  it('handles animateIn animation', async () => {
    const { result } = renderHook(() => useOverlayAnimation());
    const [opacity, animateIn] = result.current;
    animateIn.start();
    jest.runAllTimers();
    expect(Animated.timing).toHaveBeenCalled();
    expect(getAnimatedValue(opacity)).toBe(1);
  });

  it('handles animateOut animation', async () => {
    const { result } = renderHook(() => useOverlayAnimation());
    const [opacity, , animateOut] = result.current;
    animateOut.start();
    expect(Animated.timing).toHaveBeenCalled();
    expect(getAnimatedValue(opacity)).toBe(0);
  });
});
