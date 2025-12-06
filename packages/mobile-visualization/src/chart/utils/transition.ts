import { useEffect, useMemo, useRef } from 'react';
import {
  type ExtrapolationType,
  type SharedValue,
  useAnimatedReaction,
  useSharedValue,
  withSpring,
  type WithSpringConfig,
  withTiming,
  type WithTimingConfig,
} from 'react-native-reanimated';
import { notifyChange, Skia, type SkPath } from '@shopify/react-native-skia';
import { interpolatePath } from 'd3-interpolate-path';

/**
 * Transition for animations.
 * Supports timing and spring animation types.
 * Used for paths, positions, opacity, and any other animated properties.
 *
 * @example
 * // Spring animation
 * { type: 'spring', damping: 10, stiffness: 100 }
 *
 * @example
 * // Timing animation
 * { type: 'timing', duration: 500, easing: Easing.inOut(Easing.ease) }
 */
export type Transition =
  | ({ type: 'timing' } & WithTimingConfig)
  | ({ type: 'spring' } & WithSpringConfig);

/**
 * Default transition configuration used across all chart components.
 */
export const defaultTransition: Transition = {
  type: 'spring',
  stiffness: 900,
  damping: 120,
};

/**
 * Duration in milliseconds for accessory elements to fade in.
 */
export const accessoryFadeTransitionDuration = 150;

/**
 * Delay in milliseconds before accessory elements fade in.
 */
export const accessoryFadeTransitionDelay = 350;

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
    const pathInterpolator = interpolatePath(fromPath, toPath);
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
 * Builds a react-native-reanimated animation based on the configuration.
 *
 * @param targetValue - The target value to animate to
 * @param config - The transition configuration
 * @returns The animation value to assign to a shared value
 *
 * @example
 * // Use directly for animation
 * progress.value = 0;
 * progress.value = buildTransition(1, { type: 'spring', damping: 10, stiffness: 100 });
 *
 * @example
 * // Coordinate animations
 * animatedX.value = buildTransition(100, { type: 'spring', damping: 10, stiffness: 100 });
 * animatedY.value = buildTransition(200, { type: 'spring', damping: 10, stiffness: 100 });
 *
 * @example
 * // Timing animation
 * progress.value = buildTransition(1, { type: 'timing', duration: 500 });
 */
export const buildTransition = (targetValue: number, transition: Transition): number => {
  'worklet';
  switch (transition.type) {
    case 'timing': {
      return withTiming(targetValue, transition);
    }
    case 'spring': {
      return withSpring(targetValue, transition);
    }
    default: {
      // Fallback to default transition config
      return withSpring(targetValue, defaultTransition);
    }
  }
};

/**
 * Hook for path animation state and transitions.
 *
 * @param currentPath - Current target path to animate to
 * @param initialPath - Initial path for enter animation. When provided, the first animation will go from initialPath to currentPath.
 * @param transition - Transition configuration
 * @returns Animated SkPath as a shared value
 *
 * @example
 * // Simple path transition
 * const path = usePathTransition({
 *   currentPath: d ?? '',
 *   animate: shouldAnimate,
 *   transition: { type: 'timing', duration: 3000 }
 * });
 *
 * @example
 * // Enter animation with different initial config (like DefaultBar)
 * const path = usePathTransition({
 *   currentPath: targetPath,
 *   initialPath: baselinePath,
 *   animate: true,
 *   transition: { type: 'timing', duration: 300 }
 * });
 */
export const usePathTransition = ({
  currentPath,
  initialPath,
  transition = defaultTransition,
}: {
  /**
   * Current target path to animate to.
   */
  currentPath: string;
  /**
   * Initial path for enter animation.
   * When provided, the first animation will go from initialPath to currentPath.
   * If not provided, defaults to currentPath (no enter animation).
   */
  initialPath?: string;
  /**
   * Transition configuration
   */
  transition?: Transition;
}): SharedValue<SkPath> => {
  // Track the previous path - updated in useEffect AFTER render,
  // so during render it naturally holds the "from" path value
  const previousPathRef = useRef(initialPath ?? currentPath);
  const progress = useSharedValue(0);

  // During render: previousPathRef still has old value, currentPath is new
  const fromPath = previousPathRef.current;
  const toPath = currentPath;

  useEffect(() => {
    const shouldAnimate = previousPathRef.current !== currentPath;

    if (shouldAnimate) {
      // Update ref for next path change (happens after this render)
      previousPathRef.current = currentPath;

      // Animate from old path to new path
      progress.value = 0;
      progress.value = buildTransition(1, transition);
    }
  }, [currentPath, transition, progress]);

  return useD3PathInterpolation(progress, fromPath, toPath);
};
