import type { Animated, StyleProp, ViewStyle } from 'react-native';
import type { LottieSource } from '@coinbase/cds-common/types';

import type { BoxBaseProps, BoxProps } from '../layout';

export type LottieBaseProps<T extends LottieSource = LottieSource> = Omit<
  BoxBaseProps,
  'alignContent' | 'justifyContent' | 'flexWrap' | 'flexDirection'
> & {
  /**
   * A boolean flag indicating whether or not the animation should start automatically when
   * mounted. This only affects the imperative API.
   */
  autoplay?: boolean;
  /**
   * A boolean flag indicating whether or not the animation should loop.
   */
  loop?: boolean;
  /**
   * A callback function which will be called when animation is finished. Note that on mobile, this
   * callback will be called only when `loop` is set to false.
   */
  onAnimationFinish?: () => void;
  /**
   * Determines how to resize the animated view when the frame doesn't match the raw image
   * dimensions.
   * Refer to React Native docs [here](https://facebook.github.io/react-native/docs/image.html#resizemode)
   * @default contain
   */
  resizeMode?: 'cover' | 'contain' | 'center';
  /**
   * The source of animation. Should be pulled from @coinbase/cds-lottie-files.
   * For mobile, import the animation from the animations folder instead of from index so that unused animations are not included during build, `import { tradeStatus } from @coinbase/cds-lottie-files/tradeStatus`.
   */
  source: T;
  /**
   * A number between 0 and 1, or an `Animated` number between 0 and 1. This number
   * represents the normalized progress of the animation. If you update this prop, the
   * animation will correspondingly update to the frame at that progress value. This
   * prop is not required if you are using the imperative API.
   */
  progress?: number | Animated.Value | Animated.AnimatedInterpolation<number>;
  /**
   * An array of layers you want to override its color filter.
   */
  colorFilters?: { keypath: string; color: string }[];
  animated?: boolean;
  style?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;
};

export type LottieProps<T extends LottieSource = LottieSource> = LottieBaseProps<T> & BoxProps;
