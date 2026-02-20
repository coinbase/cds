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

export type AccessoryTransitionProps = {
  /**
   * Transition configuration for enter and update animations.
   * @note Disable an animation by passing in null.
   *
   * @default transitions = {{
   *   enter: { type: 'tween', duration: 0.15, delay: 0.35 },
   *   update: { type: 'spring', stiffness: 900, damping: 120, mass: 4 }
   * }}
   *
   * @example
   * // Custom enter and update transitions
   * transitions={{ enter: { type: 'tween', duration: 0.3 }, update: { type: 'spring', damping: 20 } }}
   *
   * @example
   * // Disable enter animation
   * transitions={{ enter: null }}
   */
  transitions?: {
    /**
     * Transition for the initial enter/reveal animation.
     * Set to `null` to disable.
     */
    enter?: Transition | null;
    /**
     * Transition for subsequent data update animations.
     * Set to `null` to disable.
     */
    update?: Transition | null;
  };
  /**
   * Transition for updates.
   * @deprecated Use `transitions.update` instead.
   */
  transition?: Transition;
};

/**
 * Hook for path animation state and transitions.
 *
 * @param currentPath - Current target path to animate to
 * @param initialPath - Initial path for enter animation. When provided, the first animation will go from initialPath to currentPath.
 * @param transition - Transition configuration
 * @returns MotionValue containing the current interpolated path string
 *
 * @example
 * // Simple path transition
 * const animatedPath = usePathTransition({
 *   currentPath: d ?? '',
 *   transition: {
 *     type: 'spring',
 *     stiffness: 300,
 *     damping: 20
 *   }
 * });
 *
 * @example
 * // Time based animation
 * const animatedPath = usePathTransition({
 *   currentPath: targetPath,
 *   initialPath: baselinePath,
 *   transition: {
 *     type: 'tween',
 *     duration: 0.3,
 *     ease: 'easeInOut'
 *   }
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
}): MotionValue<string> => {
  const previousPathRef = useRef(initialPath ?? currentPath);
  const targetPathRef = useRef(currentPath);
  const animationRef = useRef<AnimationPlaybackControls | null>(null);

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

      const pathInterpolator = interpolatePath(previousPathRef.current, currentPath);

      animationRef.current = animate(0, 1, {
        ...(transition as ValueAnimationTransition<number>),
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
  }, [currentPath, transition, animatedPath]);

  return animatedPath;
};
