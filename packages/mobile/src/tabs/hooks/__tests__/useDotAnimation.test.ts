import { act } from 'react';
import { Animated } from 'react-native';
import { renderHook } from '@testing-library/react-hooks';

import { useDotAnimation } from '../useDotAnimation';

describe('useDotAnimation.test', () => {
  it('triggers animation', () => {
    const animatedSpy = jest.spyOn(Animated, 'parallel');

    const { result } = renderHook(() => useDotAnimation());

    void act(() => result.current.animateIn(10));

    expect(animatedSpy).toHaveBeenCalledTimes(1);

    void act(() => result.current.animateOut(10));

    expect(animatedSpy).toHaveBeenCalledTimes(2);
    expect(result.current.opacity).toBeTruthy();
    expect(result.current.width).toBeTruthy();
  });
});
