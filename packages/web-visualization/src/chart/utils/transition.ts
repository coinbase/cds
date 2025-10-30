import { useEffect, useRef } from 'react';
import { interpolatePath } from 'd3-interpolate-path';
import {
  animate as framerAnimate,
  type AnimationPlaybackControls,
  type MotionValue,
  type Transition,
  useMotionValue,
  useTransform,
} from 'framer-motion';

/**
 * Default transition configuration used across all chart components.
 * Uses a smooth spring animation with balanced stiffness and damping.
 */
export const defaultTransition: Transition = {
  type: 'spring',
  stiffness: 900,
  damping: 120,
  mass: 4,
};

export type UsePathTransitionParams = {
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
   * Transition configurations for different animation phases.
   */
  transitionConfigs?: {
    /**
     * Transition used when the path first enters/mounts.
     */
    enter?: Transition;
    /**
     * Transition used when the path morphs to new data.
     */
    update?: Transition;
  };
};

/**
 * Custom hook that manages path animation state and transitions using d3-interpolate-path
 * with framer-motion's transition system (supports springs, tweens, etc.).
 *
 * This provides smooth path morphing with configurable transition types.
 * When the path changes, the animation will start from the previous completed position to the new path.
 *
 * @param params - Configuration for path transitions
 * @returns MotionValue containing the current interpolated path string
 *
 * @example
 * // Simple path transition with spring
 * const animatedPath = usePathTransition({
 *   currentPath: d ?? '',
 *   animate: true,
 *   transitionConfigs: {
 *     update: { type: 'spring', stiffness: 300, damping: 20 }
 *   }
 * });
 *
 * @example
 * // Enter animation with different initial config
 * const animatedPath = usePathTransition({
 *   currentPath: targetPath,
 *   initialPath: baselinePath,
 *   animate: true,
 *   transitionConfigs: {
 *     enter: { type: 'spring', duration: 0.6 },
 *     update: { type: 'tween', duration: 0.3, ease: 'easeInOut' }
 *   }
 * });
 */
export const usePathTransition = ({
  currentPath,
  initialPath,
  animate = true,
  transitionConfigs,
}: UsePathTransitionParams): MotionValue<string> => {
  const isInitialRender = useRef(true);
  const previousPathRef = useRef(initialPath ?? currentPath);
  const animationRef = useRef<AnimationPlaybackControls | null>(null);
  const progress = useMotionValue(0);
  const targetPathRef = useRef(currentPath);

  // Derive the interpolated path from progress using useTransform
  const interpolatedPath = useTransform(progress, (latest) => {
    const pathInterpolator = interpolatePath(previousPathRef.current, targetPathRef.current);
    return pathInterpolator(latest);
  });

  useEffect(() => {
    // Cancel any ongoing animation
    if (animationRef.current) {
      animationRef.current.cancel();
    }

    if (previousPathRef.current !== currentPath) {
      targetPathRef.current = currentPath;

      if (animate) {
        // Determine which transition config to use
        const configToUse =
          isInitialRender.current && transitionConfigs?.enter
            ? transitionConfigs.enter
            : (transitionConfigs?.update ?? defaultTransition);

        // Animate progress from 0 to 1 using framer-motion
        progress.set(0);
        animationRef.current = framerAnimate(progress, 1, {
          ...(configToUse as any),
          onComplete: () => {
            previousPathRef.current = currentPath;
          },
        } as any);
      } else {
        // No animation, just update refs immediately
        progress.set(1);
        previousPathRef.current = currentPath;
      }

      isInitialRender.current = false;
    }

    return () => {
      if (animationRef.current) {
        animationRef.current.cancel();
      }
    };
  }, [currentPath, animate, transitionConfigs, progress]);

  return interpolatedPath;
};
