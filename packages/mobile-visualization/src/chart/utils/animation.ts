import { useMemo } from 'react';
import {
  type ExtrapolationType,
  type SharedValue,
  useAnimatedReaction,
  useSharedValue,
  withDelay,
  withSpring,
  type WithSpringConfig,
  withTiming,
  type WithTimingConfig,
} from 'react-native-reanimated';
import { notifyChange, Skia, type SkPath } from '@shopify/react-native-skia';
import * as interpolate from 'd3-interpolate-path';

/**
 * Custom hook that uses d3-interpolate-path for more robust path interpolation.
 * then use Skia's native interpolation in the worklet.
 *
 * @param progress - Shared value between 0 and 1
 * @param fromPath - Starting path as SVG string
 * @param toPath - Ending path as SVG string
 * @returns Interpolated SkPath as a shared value
 */
export const useD3PathInterpolation = (
  progress: SharedValue<number>,
  fromPath: string,
  toPath: string,
): SharedValue<SkPath> => {
  // Pre-compute intermediate paths on JS thread using d3-interpolate-path
  const { fromSkiaPath, i0, i1, toSkiaPath } = useMemo(() => {
    const pathInterpolator = interpolate.interpolatePath(fromPath, toPath);
    const d = 1e-3;

    return {
      fromSkiaPath: Skia.Path.MakeFromSVGString(fromPath) ?? Skia.Path.Make(),
      i0: Skia.Path.MakeFromSVGString(pathInterpolator(d)) ?? Skia.Path.Make(),
      i1: Skia.Path.MakeFromSVGString(pathInterpolator(1 - d)) ?? Skia.Path.Make(),
      toSkiaPath: Skia.Path.MakeFromSVGString(toPath) ?? Skia.Path.Make(),
    };
  }, [fromPath, toPath]);

  const result = useSharedValue(fromSkiaPath);

  useAnimatedReaction(
    () => progress.value,
    (t) => {
      'worklet';
      result.value = i1.interpolate(i0, t) ?? toSkiaPath;
      notifyChange(result);
    },
    [fromSkiaPath, i0, i1, toSkiaPath],
  );

  return result;
};

// Interpolator and useInterpolator are brought over from non exported code in @shopify/react-native-skia
/**
 * @worklet
 */
type Interpolator<T> = (
  value: number,
  input: number[],
  output: T[],
  options: ExtrapolationType,
  result: T,
) => T;

export const useInterpolator = <T>(
  factory: () => T,
  value: SharedValue<number>,
  interpolator: Interpolator<T>,
  input: number[],
  output: T[],
  options?: ExtrapolationType,
) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const init = useMemo(() => factory(), []);
  const result = useSharedValue(init);
  useAnimatedReaction(
    () => value.value,
    (val) => {
      result.value = interpolator(val, input, output, options, result.value);
      notifyChange(result);
    },
    [input, output, options],
  );
  return result;
};

/**
 * Animation configuration for path transitions.
 * Supports different animation types with chaining capabilities.
 *
 * @example
 * // Spring animation
 * { type: 'spring', config: { damping: 10 } }
 *
 * @example
 * // Timing animation
 * { type: 'timing', config: { duration: 500 } }
 *
 * @example
 * // Delayed animation
 * { type: 'delay', delayMs: 200, then: { type: 'spring', config: { damping: 15 } } }
 *
 * @example
 * // Custom animation function
 * (target) => withDelay(100, withSpring(target, { damping: 10 }))
 */
export type PathAnimationConfig =
  | {
      type: 'timing';
      config?: WithTimingConfig;
    }
  | {
      type: 'spring';
      config?: WithSpringConfig;
    }
  | {
      type: 'delay';
      delayMs: number;
      then: PathAnimationConfig;
    }
  | ((targetValue: number) => number);

/**
 * Default animation configuration used across all chart components.
 * Uses a smooth spring animation with balanced stiffness and damping.
 */
export const defaultAnimationConfig: PathAnimationConfig = {
  type: 'spring',
  config: { stiffness: 900, damping: 120 },
};

/**
 * Recursively builds the animation chain based on configuration.
 *
 * @param targetValue - The target value to animate to
 * @param config - The animation configuration
 * @returns The animation value to assign to a shared value
 *
 * @example
 * // Use directly for animation
 * progress.value = 0;
 * progress.value = buildAnimation(1, { type: 'spring', config: { damping: 10 } });
 *
 * @example
 * // Coordinate animations
 * animatedX.value = buildAnimation(100, { type: 'spring', config: { damping: 10 } });
 * animatedY.value = buildAnimation(200, { type: 'spring', config: { damping: 10 } });
 *
 * @example
 * // Custom animation function
 * progress.value = buildAnimation(1, (target) => withDelay(100, withSpring(target)));
 */
export const buildAnimation = (targetValue: number, config: PathAnimationConfig): number => {
  if (typeof config === 'function') {
    return config(targetValue);
  }

  switch (config.type) {
    case 'timing':
      return withTiming(targetValue, config.config);
    case 'spring':
      return withSpring(targetValue, config.config);
    case 'delay':
      return withDelay(config.delayMs, buildAnimation(targetValue, config.then));
    default: // Fallback to default animation config
      return withSpring(targetValue, defaultAnimationConfig.config);
  }
};
