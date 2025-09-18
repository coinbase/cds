import { renderHook } from '@testing-library/react-hooks';

import type { MotionConfigs } from '../types';
import { useMotionProps } from '../useMotionProps';

describe('useMotionProps', () => {
  it('populates motion props', () => {
    const mockEnterConfigs: MotionConfigs = [
      { property: 'opacity', easing: 'enterFunctional', duration: 'fast1', toValue: 1 },
      {
        property: 'scale',
        easing: 'enterFunctional',
        duration: 'moderate3',
        toValue: 1,
      },
    ];

    const mockExitConfigs: MotionConfigs = [
      { property: 'opacity', easing: 'global', duration: 'fast1', toValue: 0 },
      {
        property: 'scale',
        easing: 'global',
        duration: 'fast1',
        toValue: 0.98,
      },
    ];
    const { result } = renderHook(() =>
      useMotionProps({
        enterConfigs: mockEnterConfigs,
        exitConfigs: mockExitConfigs,
      }),
    );

    expect(result.current).toEqual({
      variants: {
        enter: {
          transition: {
            opacity: { ease: [0, 0, 0.15, 1], duration: 0, delay: 0 },
            scale: { ease: [0, 0, 0.15, 1], duration: 0, delay: 0 },
          },
          opacity: 1,
          scale: 1,
        },
        exit: {
          transition: {
            opacity: { ease: [0.6, 0, 0.15, 1], duration: 0, delay: 0 },
            scale: { ease: [0.6, 0, 0.15, 1], duration: 0, delay: 0 },
          },
          opacity: 0,
          scale: 0.98,
        },
      },
      initial: 'exit',
      animate: 'enter',
      transition: undefined,
    });
  });

  it('converts transition for keyframe animations', () => {
    const { result } = renderHook(() =>
      useMotionProps({
        animate: {
          opacity: [0, 0.5, 1],
        },
        transition: { easing: 'exitExpressive', duration: 'moderate2' },
      }),
    );

    expect(result.current).toEqual({
      animate: {
        opacity: [0, 0.5, 1],
      },
      transition: { ease: [1, 0, 0.67, 1], delay: 0, duration: 0 },
      variants: undefined,
      initial: 'exit',
    });
  });
});
