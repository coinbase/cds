import { Animated } from 'react-native';
import { renderHook } from '@testing-library/react-hooks';

import { useInterruptiblePathAnimation } from './useInterruptiblePathAnimation';

jest.useFakeTimers({
  legacyFakeTimers: true,
});

describe('useInterruptiblePathAnimation', () => {
  const animationListenerSpy = jest.fn();
  const onInterruptSpy = jest.fn();

  it('plays correctly', () => {
    const { result } = renderHook(() => {
      return useInterruptiblePathAnimation({
        animationListener: animationListenerSpy,
        onInterrupt: onInterruptSpy,
      });
    });
    result.current();
    expect(Animated.timing).toHaveBeenCalled();
  });

  it('interrupts correctly if triggering play while already playing', () => {
    const { result } = renderHook(() => {
      return useInterruptiblePathAnimation({
        animationListener: animationListenerSpy,
        onInterrupt: onInterruptSpy,
      });
    });
    result.current();
    expect(Animated.timing).toHaveBeenCalled();
    result.current();
    expect(onInterruptSpy).toHaveBeenCalled();
    jest.runAllTimers();
  });
});
