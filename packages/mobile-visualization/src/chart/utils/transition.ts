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
import * as interpolate from 'd3-interpolate-path';

/**
 * Transition configuration for animations.
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
export type TransitionConfig =
  | ({ type: 'timing' } & WithTimingConfig)
  | ({ type: 'spring' } & WithSpringConfig);

/**
 * Default transition configuration used across all chart components.
 * Uses a smooth spring animation with balanced stiffness and damping.
 */
export const defaultTransition: TransitionConfig = {
  type: 'spring',
  stiffness: 900,
  damping: 120,
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
export const buildTransition = (targetValue: number, config: TransitionConfig): number => {
  switch (config.type) {
    case 'timing': {
      const { type, ...timingConfig } = config;
      return withTiming(targetValue, timingConfig);
    }
    case 'spring': {
      const { type, ...springConfig } = config;
      return withSpring(targetValue, springConfig);
    }
    default: {
      // Fallback to default transition config
      const { type, ...springConfig } = defaultTransition;
      return withSpring(targetValue, springConfig);
    }
  }
};

/**
 * Custom hook that manages path animation state and transitions.
 * Handles both simple path-to-path transitions and enter animations with different configs.
 * When path changes, the animation will start from the previous completed position to the new path.
 *
 * @param currentPath - Current target path to animate to
 * @param initialPath - Initial path for enter animation. When provided, the first animation will go from initialPath to currentPath. If not provided, defaults to currentPath (no enter animation)
 * @param animate - Whether to animate path transitions (default: true)
 * @param transitionConfig - Transition configuration for path updates (default: defaultTransition)
 * @param initialTransitionConfig - Transition configuration specifically for the initial/enter animation. If provided, this will be used for the first animation only. Subsequent animations will use the regular transitionConfig
 * @returns Animated SkPath as a shared value
 *
 * @example
 * // Simple path transition (like SolidLine)
 * const path = usePathTransition({
 *   currentPath: d ?? '',
 *   animate: shouldAnimate,
 *   transitionConfig: { type: 'timing', duration: 3000 }
 * });
 *
 * @example
 * // Enter animation with different initial config (like DefaultBar)
 * const path = usePathTransition({
 *   currentPath: targetPath,
 *   initialPath: baselinePath,
 *   animate: true,
 *   transitionConfig: { type: 'timing', duration: 300 },
 *   initialTransitionConfig: { type: 'timing', duration: 1000 }
 * });
 */
export const usePathTransition = ({
  currentPath,
  initialPath,
  animate = true,
  transitionConfig = defaultTransition,
  initialTransitionConfig,
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
   * Whether to animate path transitions.
   * @default true
   */
  animate?: boolean;
  /**
   * Transition configuration for path updates.
   * @default defaultTransition
   */
  transitionConfig?: TransitionConfig;
  /**
   * Transition configuration specifically for the initial/enter animation.
   * If provided, this will be used for the first animation only.
   * Subsequent animations will use the regular transitionConfig.
   */
  initialTransitionConfig?: TransitionConfig;
}): SharedValue<SkPath> => {
  const isInitialRender = useRef(true);
  const previousPathRef = useRef(initialPath ?? currentPath);
  const progress = useSharedValue(animate && initialPath ? 0 : 1);

  useEffect(() => {
    if (previousPathRef.current !== currentPath) {
      if (animate) {
        progress.value = 0;
        // Use initialTransitionConfig for first render if provided, otherwise use regular config
        const configToUse =
          isInitialRender.current && initialTransitionConfig
            ? initialTransitionConfig
            : transitionConfig;
        progress.value = buildTransition(1, configToUse);
      } else {
        progress.value = 1;
      }
      previousPathRef.current = currentPath;
      isInitialRender.current = false;
    }
    // progress is a SharedValue and should not trigger re-renders
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPath, animate, transitionConfig, initialTransitionConfig]);

  return useD3PathInterpolation(progress, previousPathRef.current, currentPath);
};
