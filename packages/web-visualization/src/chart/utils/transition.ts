import { useEffect, useRef } from 'react';
import { interpolatePath } from 'd3-interpolate-path';
import {
  animate,
  type AnimationPlaybackControls,
  type MotionValue,
  type Transition,
  useMotionValue,
  useTransform,
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
  const progress = useMotionValue(0);

  // Derive the interpolated path from progress using useTransform
  const interpolatedPath = useTransform(progress, (latest) => {
    const pathInterpolator = interpolatePath(previousPathRef.current, targetPathRef.current);
    return pathInterpolator(latest);
  });

  useEffect(() => {
    // Only proceed if the target path has actually changed
    if (targetPathRef.current !== currentPath) {
      // Cancel any ongoing animation before starting a new one
      const wasAnimating = !!animationRef.current;
      if (animationRef.current) {
        animationRef.current.cancel();
        animationRef.current = null;
      }

      const currentInterpolatedPath = interpolatedPath.get();

      // If we were animating and the interpolated path is different from both start and end,
      // use it as the starting point for the next animation (smooth interruption)
      const isInterpolatedPosition =
        currentInterpolatedPath !== previousPathRef.current &&
        currentInterpolatedPath !== currentPath;

      if (wasAnimating && isInterpolatedPosition) {
        previousPathRef.current = currentInterpolatedPath;
      }

      targetPathRef.current = currentPath;

      progress.set(0);
      animationRef.current = animate(progress, 1, {
        ...(transition as ValueAnimationTransition<number>),
        onComplete: () => {
          previousPathRef.current = currentPath;
        },
      });

      isInitialRender.current = false;
    }

    return () => {
      if (animationRef.current) {
        animationRef.current.cancel();
      }
    };
  }, [currentPath, transition, progress, interpolatedPath]);

  return interpolatedPath;
};
