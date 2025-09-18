import { act } from 'react';
import { Animated } from 'react-native';
import { renderHook } from '@testing-library/react-hooks';

import { usePressAnimation } from '../usePressAnimation';

describe('usePressAnimation.test', () => {
  it('triggers animation', () => {
    const { result } = renderHook(() => usePressAnimation());
    const [down, up] = result.current;

    const animationSpy = jest.spyOn(Animated, 'spring');

    void act(() => down());
    expect(animationSpy).toHaveBeenCalledTimes(1);

    void act(() => up());
    expect(animationSpy).toHaveBeenCalledTimes(2);
  });
});
