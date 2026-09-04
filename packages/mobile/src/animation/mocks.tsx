import React, { useEffect } from 'react';
import { Animated } from 'react-native';
import { noop } from '@coinbase/cds-utils';

import { Box } from '../layout/Box';

import type { LottieProps } from './types';

export const LottieMock = ({
  autoplay = false,
  colorFilters,
  loop = false,
  progress,
  resizeMode = 'contain',
  source,
  onAnimationFinish,
  ...boxProps
}: LottieProps) => {
  useEffect(() => {
    onAnimationFinish?.();
  }, [onAnimationFinish]);

  return <Box {...boxProps} />;
};

export const createLottieMock = {
  play: noop,
  playMarkers: noop,
  pause: noop,
  resume: noop,
  reset: noop,
  progress: {
    value: new Animated.Value(0),
    timing: () => ({ start: (cb?: () => void) => cb?.() }),
    play: noop,
    pause: noop,
    reset: noop,
    addListener: noop,
    removeListener: noop,
  },
  lottieRef: { current: { play: noop } },
  Lottie: LottieMock,
};
