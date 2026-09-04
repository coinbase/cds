import { useMemo } from 'react';
import type { Animated } from 'react-native';
import { nux } from '@coinbase/cds-lottie-files/nux';
import { renderHook } from '@testing-library/react-native';
import uniqBy from 'lodash/uniqBy';

import { createLottie } from '../createLottie';

const animations = [nux, nux, nux];

function getAnimatedValue(val: Animated.Value) {
  // @ts-expect-error: I know what I'm doing.
  return val._value as unknown;
}

describe('useLottieCreator', () => {
  it('ensures each progress value is unique', () => {
    const result = renderHook(() => {
      return useMemo(() => {
        return animations.map((tutorial) => createLottie(tutorial));
      }, []);
    }).result.current;
    expect(uniqBy(result, 'progress')).toHaveLength(animations.length);
  });

  it('ensures each Lottie component is unique', () => {
    const result = renderHook(() => {
      return useMemo(() => {
        return animations.map((tutorial) => createLottie(tutorial));
      }, []);
    }).result.current;

    expect(uniqBy(result, 'Lottie')).toHaveLength(animations.length);
  });

  it('ensures progress value updates are registered correctly', () => {
    const result = renderHook(() => {
      return useMemo(() => {
        return animations.map((tutorial) => createLottie(tutorial));
      }, []);
    }).result.current;

    const [firstItem, secondItem, thirdItem] = result;
    firstItem.progress.value.setValue(1);
    expect(getAnimatedValue(firstItem.progress.value)).toBe(1);
    expect(getAnimatedValue(secondItem.progress.value)).toBe(0);
    expect(getAnimatedValue(thirdItem.progress.value)).toBe(0);
    expect(firstItem.progress).not.toBe(secondItem.progress);
  });
});
