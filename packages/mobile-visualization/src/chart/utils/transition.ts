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
 * @param transitions - Transition configuration for enter and update animations
 * @returns Animated SkPath as a shared value
 *
 * @example
 * // Simple path transition
 * const path = usePathTransition({
 *   currentPath: d ?? '',
 *   transitions: {
 *     update: { type: 'timing', duration: 3000 },
 *   },
 * });
 *
 * @example
 * // Enter animation with different initial config (like DefaultBar)
 * const path = usePathTransition({
 *   currentPath: targetPath,
 *   initialPath: baselinePath,
 *   transitions: {
 *     enter: { type: 'tween', duration: 500 },
 *     update: { type: 'spring', stiffness: 900, damping: 120 },
 *   },
 * });
 */
export const usePathTransition = ({
  currentPath,
  initialPath,
  transitions,
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
   * Transition configuration for enter and update animations.
   */
  transitions?: {
    /**
     * Transition for the initial enter animation (initialPath → currentPath).
     * Only used when `initialPath` is provided.
     * If not provided, falls back to `update`.
     */
    enter?: Transition;
    /**
     * Transition for subsequent data update animations.
     * @default defaultTransition
     */
    update?: Transition;
  };
  /**
   * Transition for updates.
   * @deprecated Use `transitions.update` instead.
   */
  transition?: Transition;
}): SharedValue<SkPath> => {
  const updateTransition = transitions?.update ?? transition;
  const enterTransition = transitions?.enter;

  const targetPathRef = useRef(initialPath ?? currentPath);
  const isFirstAnimation = useRef(!!initialPath);
  const interpolatorRef = useRef<((t: number) => string) | null>(null);
  const progress = useSharedValue(0);

  const initialSkiaPath =
    Skia.Path.MakeFromSVGString(initialPath ?? currentPath) ?? Skia.Path.Make();
  const normalizedStartShared = useSharedValue(initialSkiaPath);
  const normalizedEndShared = useSharedValue(initialSkiaPath);
  const fallbackPathShared = useSharedValue(initialSkiaPath);
  const result = useSharedValue(initialSkiaPath);

  useEffect(() => {
    if (targetPathRef.current !== currentPath) {
      let fromPath = targetPathRef.current;
      if (interpolatorRef.current) {
        const p = Math.min(Math.max(progress.value, 0), 1);
        fromPath = interpolatorRef.current(p);
      }

      targetPathRef.current = currentPath;

      const pathInterpolator = interpolatePath(fromPath, currentPath);
      interpolatorRef.current = pathInterpolator;

      normalizedStartShared.value =
        Skia.Path.MakeFromSVGString(pathInterpolator(0)) ?? Skia.Path.Make();
      normalizedEndShared.value =
        Skia.Path.MakeFromSVGString(pathInterpolator(1)) ?? Skia.Path.Make();
      fallbackPathShared.value = Skia.Path.MakeFromSVGString(currentPath) ?? Skia.Path.Make();

      const activeTransition =
        isFirstAnimation.current && enterTransition !== undefined
          ? enterTransition
          : updateTransition;

      isFirstAnimation.current = false;

      progress.value = 0;
      progress.value = buildTransition(1, activeTransition);
    }
  }, [
    currentPath,
    updateTransition,
    enterTransition,
    progress,
    normalizedStartShared,
    normalizedEndShared,
    fallbackPathShared,
  ]);

  useAnimatedReaction(
    () => ({ p: progress.value, to: fallbackPathShared.value }),
    ({ p }) => {
      'worklet';
      result.value =
        normalizedEndShared.value.interpolate(normalizedStartShared.value, p) ??
        fallbackPathShared.value;
      notifyChange(result);
    },
    [],
  );

  return result;
};
