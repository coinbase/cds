import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { LottieSource } from '@coinbase/cds-common/types/LottieSource';
import type { AnyObject } from '@coinbase/cds-utils';
import type { AnimationConfigWithData } from 'lottie-web';
import lottie from 'lottie-web';

import { isBrowser } from '../utils/browser';

import type { LottieAnimationRef, LottieProps } from './types';

export const useLottieLoader = <Marker extends string, Source extends LottieSource<Marker>>({
  source,
  loop,
  autoplay,
  resizeMode,
  filterSize,
}: LottieProps<Marker, Source>) => {
  const sourceWidth = source.w;
  const sourceHeight = source.h;

  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef: LottieAnimationRef = useRef(undefined);
  const [, setAnimationLoaded] = useState(false);

  const preserveAspectRatio = useMemo(() => {
    switch (resizeMode) {
      case 'contain':
        return 'xMidYMid meet';
      case 'cover':
      default:
        return 'xMidYMid slice';
    }
  }, [resizeMode]);

  const loadAnimation = useCallback(
    (forcedConfigs: AnyObject = {}) => {
      // Return if the container ref is null
      if (!containerRef.current) {
        return;
      }

      // Destroy any previous instance
      animationRef.current?.destroy();

      // Build the animation configuration
      const config: AnimationConfigWithData = {
        renderer: 'svg',
        rendererSettings: {
          preserveAspectRatio,
          viewBoxSize: `0 0 ${sourceWidth} ${sourceHeight}`,
          progressiveLoad: true,
          filterSize,
        },
        autoplay,
        animationData: source,
        ...forcedConfigs,
        container: containerRef.current,
      };

      // Save the animation instance
      animationRef.current = lottie.loadAnimation(config);

      setAnimationLoaded(!!animationRef.current);
    },
    [autoplay, preserveAspectRatio, source, sourceHeight, sourceWidth, filterSize],
  );

  /**
   * Initialize and listen for changes that affect the animation state.
   * Reinitialize when animation data changedes
   */
  useEffect(() => {
    // Don't load lottie if SSR
    if (isBrowser()) {
      loadAnimation();
    }
  }, [loadAnimation]);

  // Update the autoplay state
  useEffect(() => {
    if (animationRef.current) {
      animationRef.current.autoplay = !!autoplay;
    }
  }, [animationRef, autoplay]);

  // Update the loop state
  useEffect(() => {
    if (animationRef.current) {
      animationRef.current.loop = !!loop;

      if (loop && animationRef.current.autoplay && animationRef.current.isPaused) {
        animationRef.current.play();
      }
    }
  }, [animationRef, loop]);

  return {
    containerRef,
    animationRef,
    loadAnimation,
  };
};
