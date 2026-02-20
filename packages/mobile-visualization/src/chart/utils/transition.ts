import { useEffect, useMemo, useRef } from 'react';
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
export type Transition = (
  | ({ type: 'timing' } & WithTimingConfig)
  | ({ type: 'spring' } & WithSpringConfig)
) & {
  /**
   * Delay in milliseconds (ms) before the animation starts.
   *
   * @example
   * // Wait 2 seconds before animating
   * { type: 'timing', duration: 500, delay: 2000 }
   */
  delay?: number;
};

/**
 * Default update transition used across all chart components.
 * `{ type: 'spring', stiffness: 900, damping: 120 }`
 */
export const defaultTransition: Transition = {
  type: 'spring',
  stiffness: 900,
  damping: 120,
};

/**
 * Instant transition that completes immediately with no animation.
 * Used when a transition is set to `null`.
 */
export const instantTransition: Transition = {
  type: 'timing',
  duration: 0,
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
 * Default enter transition for accessory elements (Point, Scrubber beacons).
 * `{ type: 'timing', duration: 150, delay: 350 }`
 */
export const defaultAccessoryEnterTransition: Transition = {
  type: 'timing',
  duration: accessoryFadeTransitionDuration,
  delay: accessoryFadeTransitionDelay,
};

/**
 * Resolves a transition value based on the animation state and a default.
 * @note Passing in null will disable an animation.
 * @note Passing in undefined will use the provided default.
 */
export const getTransition = (
  value: Transition | null | undefined,
  animate: boolean,
  defaultValue: Transition,
): Transition => {
  if (!animate || value === null) return instantTransition;
  return value ?? defaultValue;
};

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

  // Store interpolators in shared values so the worklet always has fresh data.
  // Without this, the useAnimatedReaction dependency array re-registers the
  // worklet asynchronously, causing instant transitions to use stale interpolators
  // for one frame (visible as growing bars using the old smaller clip path).
  const i0Shared = useSharedValue(i0);
  const i1Shared = useSharedValue(i1);
  const toSkiaPathShared = useSharedValue(toSkiaPath);

  useEffect(() => {
    i0Shared.value = i0;
    i1Shared.value = i1;
    toSkiaPathShared.value = toSkiaPath;
  }, [i0, i1, toSkiaPath, i0Shared, i1Shared, toSkiaPathShared]);

  const result = useSharedValue(fromSkiaPath);

  // Track both progress AND toSkiaPathShared so the reaction fires when either changes.
  // This ensures instant transitions (which skip progress changes) still update the result
  // when the target path changes.
  useAnimatedReaction(
    () => ({ p: progress.value, to: toSkiaPathShared.value }),
    ({ p }) => {
      'worklet';
      result.value = i1Shared.value.interpolate(i0Shared.value, p) ?? toSkiaPathShared.value;
      notifyChange(result);
    },
    [],
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
  const { delay: delayMs, ...config } = transition;

  let animation: number;
  switch (config.type) {
    case 'timing': {
      animation = withTiming(targetValue, config);
      break;
    }
    case 'spring': {
      animation = withSpring(targetValue, config);
      break;
    }
    default: {
      animation = withSpring(targetValue, defaultTransition);
      break;
    }
  }

  if (delayMs && delayMs > 0) {
    return withDelay(delayMs, animation);
  }

  return animation;
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
  enterTransition,
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
   * Transition configuration for subsequent data update animations.
   */
  transition?: Transition;
  /**
   * Transition configuration for the initial enter animation (initialPath → currentPath).
   * Only used when `initialPath` is provided (e.g. bars animating from baseline).
   * If not provided, falls back to `transition`.
   */
  enterTransition?: Transition;
}): SharedValue<SkPath> => {
  // Track the previous path - updated in useEffect AFTER render,
  // so during render it naturally holds the "from" path value
  const previousPathRef = useRef(initialPath ?? currentPath);
  const progress = useSharedValue(0);
  // Only true when initialPath is provided (e.g. bars), so enter transition
  // is never accidentally used for line/area data updates.
  const isFirstAnimation = useRef(!!initialPath);

  // During render: previousPathRef still has old value, currentPath is new
  const fromPath = previousPathRef.current;
  const toPath = currentPath;

  useEffect(() => {
    const shouldAnimate = previousPathRef.current !== currentPath;

    if (shouldAnimate) {
      previousPathRef.current = currentPath;

      // Use enter transition for the first animation (initialPath → currentPath),
      // then switch to update transition for subsequent data changes.
      const activeTransition =
        isFirstAnimation.current && enterTransition !== undefined ? enterTransition : transition;

      isFirstAnimation.current = false;

      progress.value = 0;
      progress.value = buildTransition(1, activeTransition);
    }
  }, [currentPath, transition, enterTransition, progress]);

  return useD3PathInterpolation(progress, fromPath, toPath);
};
