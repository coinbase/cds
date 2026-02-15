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
 * Default transition configuration used across all chart components.
 */
export const defaultTransition: Transition = {
  type: 'spring',
  stiffness: 900,
  damping: 120,
  mass: 4,
};

/**
 * Transition configuration for chart animations.
 * Allows separate configuration of enter (reveal) and update (data change) animations.
 * Set either key to `null` to disable that animation phase.
 *
 * @example
 * // Custom enter and update transitions
 * transitions={{ enter: { type: 'tween', duration: 0.3 }, update: { type: 'spring', damping: 20 } }}
 *
 * @example
 * // Disable enter animation, keep default update
 * transitions={{ enter: null }}
 *
 * @example
 * // Disable update animation, keep default enter
 * transitions={{ update: null }}
 */
export type ChartTransition = {
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
 * A bar-specific transition that extends Transition with stagger support.
 * When `staggerDelay` is provided, bars will animate with increasing delays
 * based on their horizontal position (leftmost starts first, rightmost last).
 *
 * @example
 * // Bars stagger in from left to right over 0.25s, each animating for 0.75s
 * { type: 'tween', duration: 0.75, staggerDelay: 0.25 }
 */
export type BarTransition = Transition & {
  /**
   * Maximum stagger delay (seconds) distributed across bars by x position.
   * Leftmost bar starts immediately, rightmost starts after this delay.
   */
  staggerDelay?: number;
};

/**
 * Transition configuration for bar chart animations.
 * Extends ChartTransition with bar-specific stagger support on enter and update.
 *
 * @example
 * // Staggered enter, no update animation
 * { enter: { type: 'tween', duration: 0.75, staggerDelay: 0.25 }, update: null }
 */
export type BarChartTransition = {
  /**
   * Transition for the initial enter/reveal animation.
   * Set to `null` to disable.
   */
  enter?: BarTransition | null;
  /**
   * Transition for subsequent data update animations.
   * Set to `null` to disable.
   */
  update?: BarTransition | null;
};

/**
 * Strips `staggerDelay` from a BarTransition and computes a positional delay.
 *
 * @param transition - The bar transition config (may include staggerDelay)
 * @param normalizedX - The bar's normalized x position (0 = left edge, 1 = right edge)
 * @returns A standard Transition with computed delay
 */
export const applyStaggerDelay = (transition: BarTransition, normalizedX: number): Transition => {
  const { staggerDelay, ...baseTransition } = transition;
  if (!staggerDelay) return baseTransition;
  return {
    ...baseTransition,
    delay: ((baseTransition as { delay?: number }).delay ?? 0) + normalizedX * staggerDelay,
  };
};

/**
 * Default bar enter transition. Uses the default spring with a stagger delay
 * so bars spring into place from left to right.
 */
export const defaultBarEnterTransition: BarTransition = {
  ...defaultTransition,
  staggerDelay: 0.25,
};

/**
 * Default enter transition used for path clip-path reveal animations.
 */
export const defaultEnterTransition: Transition = {
  type: 'tween',
  duration: 0.5,
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
  const isInitialRender = useRef(true);
  const previousPathRef = useRef(initialPath ?? currentPath);
  const targetPathRef = useRef(currentPath);
  const animationRef = useRef<AnimationPlaybackControls | null>(null);

  // Standalone motion value for the animated path string.
  // Driven by onUpdate callbacks rather than useTransform to avoid
  // observable intermediate states when progress resets to 0.
  const animatedPath = useMotionValue(initialPath ?? currentPath);

  useEffect(() => {
    // Only proceed if the target path has actually changed
    if (targetPathRef.current !== currentPath) {
      // Cancel any ongoing animation before starting a new one
      const wasAnimating = !!animationRef.current;
      if (animationRef.current) {
        animationRef.current.cancel();
        animationRef.current = null;
      }

      const currentVisualPath = animatedPath.get();

      // If we were animating and the visual path is different from both start and end,
      // use it as the starting point for the next animation (smooth interruption)
      const isInterpolatedPosition =
        currentVisualPath !== previousPathRef.current && currentVisualPath !== currentPath;

      if (wasAnimating && isInterpolatedPosition) {
        previousPathRef.current = currentVisualPath;
      }

      targetPathRef.current = currentPath;

      const pathInterpolator = interpolatePath(previousPathRef.current, currentPath);

      // Animate a plain number from 0 to 1 and drive the path via onUpdate.
      // This avoids the useTransform + progress.set(0) pattern which caused
      // an observable intermediate state (showing the stale previous path)
      // before the animation could resolve to the target.
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

      isInitialRender.current = false;
    }

    return () => {
      if (animationRef.current) {
        animationRef.current.cancel();
      }
    };
  }, [currentPath, transition, animatedPath]);

  return animatedPath;
};
