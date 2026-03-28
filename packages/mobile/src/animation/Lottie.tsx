import React, { forwardRef, memo, useMemo } from 'react';
import { Animated } from 'react-native';
import type { DimensionValue } from 'react-native';
import LottieView from 'lottie-react-native';

import { Box } from '../layout/Box';

import type { LottieProps } from './types';
import { useLottieColorFilters } from './useLottieColorFilters';

export type LottieMobileRef = React.ForwardedRef<LottieView>;

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

const LottieContent = memo(
  forwardRef(
    (
      {
        autoplay = false,
        colorFilters,
        loop = false,
        progress,
        resizeMode = 'contain',
        source,
        onAnimationFinish,
        ...boxProps
      }: LottieProps,
      forwardedRef: LottieMobileRef,
    ) => {
      const aspectRatio = source.w / source.h;
      const lottieStyles = useMemo(
        () => ({
          width: '100%' as DimensionValue,
          height: '100%' as DimensionValue,
          aspectRatio,
        }),
        [aspectRatio],
      );

      return (
        <Box aspectRatio={aspectRatio} {...boxProps}>
          <AnimatedLottieView
            ref={forwardedRef}
            autoPlay={autoplay}
            colorFilters={colorFilters}
            loop={loop}
            onAnimationFinish={onAnimationFinish}
            progress={progress}
            renderMode="AUTOMATIC" // TODO: If huawei device, force to use SOFTWARE renderMode
            resizeMode={resizeMode}
            source={source}
            style={lottieStyles}
          />
        </Box>
      );
    },
  ),
);

export const Lottie = memo(
  forwardRef((props: LottieProps, forwardedRef: React.ForwardedRef<LottieView>) => {
    const colorFilters = useLottieColorFilters(props.source, props.colorFilters);
    return <LottieContent ref={forwardedRef} {...props} colorFilters={colorFilters} />;
  }),
);

LottieContent.displayName = 'LottieContent';
Lottie.displayName = 'Lottie';
