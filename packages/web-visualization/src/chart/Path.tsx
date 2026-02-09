import { memo, useEffect, useId, useMemo, useRef } from 'react';
import type { SVGProps } from 'react';
import type { Rect, SharedProps } from '@coinbase/cds-common/types';
import { m as motion, type Transition } from 'framer-motion';

import {
  type PathTransitionConfig,
  resolvePathTransitions,
  usePathTransition,
} from './utils/transition';
import { useCartesianChartContext } from './ChartProvider';

/**
 * Duration in seconds for path enter transition.
 */
export { pathEnterTransitionDuration } from './utils/transition';

export type PathBaseProps = SharedProps & {
  /**
   * Whether to animate this path. Overrides the animate prop on the Chart component.
   * @deprecated Use `transition` to control enter/update animations.
   */
  animate?: boolean;
};

export type PathProps = PathBaseProps &
  Omit<
    SVGProps<SVGPathElement>,
    | 'onAnimationStart'
    | 'onAnimationEnd'
    | 'onAnimationIteration'
    | 'onAnimationStartCapture'
    | 'onAnimationEndCapture'
    | 'onAnimationIterationCapture'
    | 'onDrag'
    | 'onDragEnd'
    | 'onDragStart'
    | 'onDragCapture'
    | 'onDragEndCapture'
    | 'onDragStartCapture'
  > & {
    /**
     * Offset added to the clip rect boundaries.
     */
    clipOffset?: number;
    /**
     * Custom clip path rect. If provided, this overrides the default chart rect for clipping.
     * Pass null to disable clipping.
     * @default drawingArea of chart + clipOffset
     */
    clipRect?: Rect | null;
    /**
     * Transition configuration for path.
     *
     * @example
     * // Timing based animation
     * transition={{ type: 'tween', duration: 0.2, ease: 'easeOut' }}
     *
     * @example
     * // Spring animation
     * transition={{ type: 'spring', damping: 20, stiffness: 300 }}
     *
     * @deprecated Passing a single Transition is deprecated. Use { enter, update }.
     *
     * @example
     * // Enter/update transitions
     * transition={{
     *   enter: { duration: 0.3 },
     *   update: { type: 'spring', damping: 20, stiffness: 300 },
     * }}
     *
     * @example
     * // Disable enter animation
     * transition={{ enter: null }}
     */
    transition?: PathTransitionConfig;
  };

type AnimatedPathProps = Omit<PathProps, 'animate'> & {
  transition?: Transition;
};

const AnimatedPath = memo<AnimatedPathProps>(({ d = '', transition, ...pathProps }) => {
  const interpolatedPath = usePathTransition({
    currentPath: d,
    transition,
  });

  return <motion.path d={interpolatedPath} {...pathProps} />;
});

export const Path = memo<PathProps>(
  ({ animate: animateProp, clipRect, clipOffset = 0, d = '', transition, ...pathProps }) => {
    const clipPathId = useId();
    const context = useCartesianChartContext();
    const rect = clipRect !== undefined ? clipRect : context.drawingArea;
    const animate = animateProp ?? context.animate;
    const transitionConfig: PathTransitionConfig | undefined = transition ?? context.transition;
    const resolvedTransitions = useMemo(
      () => resolvePathTransitions(transitionConfig),
      [transitionConfig],
    );
    const shouldAnimateEnter = animate && resolvedTransitions.enter !== null;
    const shouldAnimateUpdate = animate && resolvedTransitions.update !== null;
    const enterTransitionRef = useRef<Transition | null>(resolvedTransitions.enter);
    const hasAnimatedEnterRef = useRef(false);

    // The clip offset provides extra padding to prevent path from being cut off
    // Area charts typically use offset=0 for exact clipping, while lines use offset=2 for breathing room
    const totalOffset = clipOffset * 2; // Applied on both sides

    const clipPathAnimation = useMemo(() => {
      if (rect === null) return;
      return {
        hidden: { width: 0 },
        visible: {
          width: rect.width + totalOffset,
        },
      };
    }, [rect, totalOffset]);

    useEffect(() => {
      enterTransitionRef.current = resolvedTransitions.enter;
    }, [resolvedTransitions.enter]);

    useEffect(() => {
      if (!shouldAnimateEnter) {
        hasAnimatedEnterRef.current = false;
      }
    }, [shouldAnimateEnter]);

    const clipPath = useMemo(
      () => (rect !== null ? `url(#${clipPathId})` : undefined),
      [rect, clipPathId],
    );

    return (
      <>
        {rect !== null && (
          <defs>
            <clipPath id={clipPathId}>
              {!shouldAnimateEnter ? (
                <rect
                  height={rect.height + totalOffset}
                  width={rect.width + totalOffset}
                  x={rect.x - clipOffset}
                  y={rect.y - clipOffset}
                />
              ) : (
                <motion.rect
                  animate="visible"
                  height={rect.height + totalOffset}
                  initial={hasAnimatedEnterRef.current ? false : 'hidden'}
                  onAnimationComplete={() => {
                    hasAnimatedEnterRef.current = true;
                  }}
                  transition={enterTransitionRef.current ?? undefined}
                  variants={clipPathAnimation}
                  x={rect.x - clipOffset}
                  y={rect.y - clipOffset}
                />
              )}
            </clipPath>
          </defs>
        )}
        {!shouldAnimateUpdate ? (
          <path clipPath={clipPath} d={d} {...pathProps} />
        ) : (
          <AnimatedPath
            clipPath={clipPath}
            d={d}
            transition={resolvedTransitions.update ?? undefined}
            {...pathProps}
          />
        )}
      </>
    );
  },
);
