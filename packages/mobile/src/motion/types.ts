import type { WithSpringConfig, WithTimingConfig } from 'react-native-reanimated';

export type HintMotionBaseProps = {
  /**
   * Disable animation on component mount
   * @default false
   */
  disableAnimateOnMount?: boolean;
};

/**
 * Transition configuration for Reanimated animations.
 * Supports timing and spring animation types.
 * Used for translations, opacity, color, and any other animated properties.
 *
 * @example
 * // Spring animation
 * { type: 'spring', damping: 18, stiffness: 280, mass: 0.3 }
 *
 * @example
 * // Timing animation with easing
 * { type: 'timing', duration: 300, easing: Easing.bezier(0.2, 0, 0, 1) }
 */
export type Transition =
  | ({ type: 'timing' } & WithTimingConfig)
  | ({ type: 'spring' } & WithSpringConfig);
