import { useEffect, useRef } from 'react';
import { interpolatePath } from 'd3-interpolate-path';
import {
  animate,
  type AnimationPlaybackControls,
  type MotionValue,
  type Transition,
  useMotionValue,
  type ValueAnimationTransition,
} from 'framer-motion';

/**
 * Default update transition used across all chart components.
 * `{ type: 'spring', stiffness: 900, damping: 120, mass: 4 }`
 */
export const defaultTransition: Transition = {
  type: 'spring',
  stiffness: 900,
  damping: 120,
  mass: 4,
};

/**
 * Instant transition that completes immediately with no animation.
 * Used when a transition is set to `null`.
 */
export const instantTransition: Transition = {
  type: 'tween',
  duration: 0,
};

/**
 * Duration in seconds for accessory elements to fade in.
 */
export const accessoryFadeTransitionDuration = 0.15;

/**
 * Delay in seconds before accessory elements fade in.
 */
export const accessoryFadeTransitionDelay = 0.35;

/**
 * Default enter transition for accessory elements (Point, Scrubber beacons).
 * `{ type: 'tween', duration: 0.15, delay: 0.35 }`
 */
export const defaultAccessoryEnterTransition: Transition = {
  type: 'tween',
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
 * Hook for path animation state and transitions.
 *
 * @param currentPath - Current target path to animate to
 * @param initialPath - Initial path for enter animation. When provided, the first animation will go from initialPath to currentPath.
 * @param transitions - Transition configuration for enter and update animations
 * @returns MotionValue containing the current interpolated path string
 *
 * @example
 * // Simple path transition
 * const animatedPath = usePathTransition({
 *   currentPath: d ?? '',
 *   transitions: {
 *     update: { type: 'spring', stiffness: 300, damping: 20 },
 *   },
 * });
 *
 * @example
 * // Enter animation with different initial config (like DefaultBar)
 * const animatedPath = usePathTransition({
 *   currentPath: targetPath,
 *   initialPath: baselinePath,
 *   transitions: {
 *     enter: { type: 'tween', duration: 0.5 },
 *     update: { type: 'spring', stiffness: 900, damping: 120, mass: 4 },
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
}): MotionValue<string> => {
  const updateTransition = transitions?.update ?? transition;
  const enterTransition = transitions?.enter;

  const previousPathRef = useRef(initialPath ?? currentPath);
  const targetPathRef = useRef(initialPath ?? currentPath);
  const animationRef = useRef<AnimationPlaybackControls | null>(null);
  const isFirstAnimation = useRef(!!initialPath);

  const animatedPath = useMotionValue(initialPath ?? currentPath);

  useEffect(() => {
    if (targetPathRef.current !== currentPath) {
      const currentVisualPath = animatedPath.get();

      if (animationRef.current) {
        animationRef.current.stop();
        animationRef.current = null;
        previousPathRef.current = currentVisualPath;
      }

      targetPathRef.current = currentPath;

      const activeTransition =
        isFirstAnimation.current && enterTransition !== undefined
          ? enterTransition
          : updateTransition;

      isFirstAnimation.current = false;

      const pathInterpolator = interpolatePath(previousPathRef.current, currentPath);

      animationRef.current = animate(0, 1, {
        ...(activeTransition as ValueAnimationTransition<number>),
        onUpdate: (latest) => {
          animatedPath.set(pathInterpolator(latest));
        },
        onComplete: () => {
          animatedPath.set(currentPath);
          previousPathRef.current = currentPath;
          animationRef.current = null;
        },
      });
    }

    return () => {
      if (animationRef.current) {
        animationRef.current.stop();
      }
    };
  }, [currentPath, updateTransition, enterTransition, animatedPath]);

  return animatedPath;
};
