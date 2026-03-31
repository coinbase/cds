import { useCallback, useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { animatedPathConfig } from '@coinbase/cds-common/animation/sparkline';

import { useSparklineInteractiveContext } from './SparklineInteractiveProvider';

const animationConfig = {
  ...animatedPathConfig,
  toValue: 1,
  useNativeDriver: true,
};

type Params = {
  animationListener: Animated.ValueListenerCallback;
  onInterrupt: () => void;
  ignoreMinMax?: boolean;
};

export const useInterruptiblePathAnimation = ({
  animationListener,
  onInterrupt,
  ignoreMinMax,
}: Params) => {
  const { animateMinMaxIn } = useSparklineInteractiveContext();
  const isRunning = useRef(false);
  const animationProgress = useRef(new Animated.Value(0)).current;

  const animations = [Animated.timing(animationProgress, animationConfig)];

  if (!ignoreMinMax) {
    animations.push(animateMinMaxIn);
  }

  const animation = Animated.sequence(animations);

  const onFinishAnimation = useCallback(
    ({ finished }: { finished: boolean }) => {
      if (finished) {
        animationProgress.removeAllListeners();
        animationProgress.setValue(0);
        isRunning.current = false;
      }
    },
    [animationProgress],
  );

  // Clean up listeners
  useEffect(() => {
    return () => {
      animationProgress.removeAllListeners();
    };
  }, [animationProgress]);

  return useCallback(() => {
    // If try to re-run animation while currently running
    // we should interrupt it and start new one
    if (isRunning.current) {
      animation.stop();
      onFinishAnimation({ finished: true });
      onInterrupt();
    } else {
      isRunning.current = true;
      animationProgress.addListener(animationListener);
      animation.start(onFinishAnimation);
    }
  }, [animation, animationListener, animationProgress, onFinishAnimation, onInterrupt]);
};
