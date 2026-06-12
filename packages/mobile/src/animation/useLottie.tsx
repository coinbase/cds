import { useMemo, useRef } from 'react';
import { Animated } from 'react-native';
import type { LottieSource } from '@coinbase/cds-common/types/LottieSource';

import { createLottie } from './createLottie';

export function useLottie<T extends LottieSource>(source: T, startProgressValue = 0) {
  const progressOverride = useRef(new Animated.Value(startProgressValue));
  return useMemo(() => createLottie(source, progressOverride.current), [source]);
}
