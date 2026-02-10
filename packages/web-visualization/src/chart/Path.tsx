import { memo, useId, useMemo } from 'react';
import type { SVGProps } from 'react';
import type { Rect, SharedProps } from '@coinbase/cds-common/types';
import { m as motion, type Transition } from 'framer-motion';

import {
  type ChartTransition,
  defaultEnterTransition,
  defaultTransition,
  instantTransition,
  usePathTransition,
} from './utils/transition';
import { useCartesianChartContext } from './ChartProvider';

/**
 * Duration in seconds for path enter transition.
 * @deprecated Use `transitions.enter` on the Path component instead.
 */
export const pathEnterTransitionDuration = 0.5;

export type PathBaseProps = SharedProps & {
  /**
   * Whether to animate this path. Overrides the animate prop on the Chart component.
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
     * Transition configuration for enter and update animations.
     *
     * @example
     * // Custom enter and update transitions
     * transitions={{ enter: { type: 'tween', duration: 0.3 }, update: { type: 'spring', damping: 20 } }}
     *
     * @example
     * // Disable enter animation
     * transitions={{ enter: null }}
     */
    transitions?: ChartTransition;
    /**
     * Transition for updates.
     *
     * @deprecated Use `transitions.update` instead.
     *
     * @example
     * // Timing based animation
     * transition={{ type: 'tween', duration: 0.2, ease: 'easeOut' }}
     *
     * @example
     * // Spring animation
     * transition={{ type: 'spring', damping: 20, stiffness: 300 }}
     */
    transition?: Transition;
  };

const AnimatedPath = memo<
  Omit<PathProps, 'animate' | 'transitions' | 'transition'> & { updateTransition: Transition }
>(({ d = '', updateTransition, ...pathProps }) => {
  const interpolatedPath = usePathTransition({
    currentPath: d,
    transition: updateTransition,
  });

  return <motion.path d={interpolatedPath} {...pathProps} />;
});

export const Path = memo<PathProps>(
  ({
    animate: animateProp,
    clipRect,
    clipOffset = 0,
    d = '',
    transitions,
    transition,
    ...pathProps
  }) => {
    const clipPathId = useId();
    const context = useCartesianChartContext();
    const rect = clipRect !== undefined ? clipRect : context.drawingArea;
    const animate = animateProp ?? context.animate;

    const enterTransition = transitions?.enter;
    const rawUpdateTransition =
      transitions?.update !== undefined ? transitions.update : (transition ?? defaultTransition);

    // Resolve null or duration:0 to instantTransition so we always use motion elements
    const resolvedEnterTransition =
      !animate || enterTransition === null ? instantTransition : (enterTransition ?? defaultEnterTransition);
    const resolvedUpdateTransition =
      !animate || rawUpdateTransition === null ? instantTransition : rawUpdateTransition;

    // The clip offset provides extra padding to prevent path from being cut off
    // Area charts typically use offset=0 for exact clipping, while lines use offset=2 for breathing room
    const totalOffset = clipOffset * 2; // Applied on both sides

    const clipPathAnimation = useMemo(() => {
      if (rect === null) return;
      return {
        hidden: { width: 0 },
        visible: {
          width: rect.width + totalOffset,
          transition: resolvedEnterTransition,
        },
      };
    }, [rect, totalOffset, resolvedEnterTransition]);

    const clipPath = useMemo(
      () => (rect !== null ? `url(#${clipPathId})` : undefined),
      [rect, clipPathId],
    );

    return (
      <>
        {rect !== null && (
          <defs>
            <clipPath id={clipPathId}>
              <motion.rect
                animate="visible"
                height={rect.height + totalOffset}
                initial="hidden"
                variants={clipPathAnimation}
                x={rect.x - clipOffset}
                y={rect.y - clipOffset}
              />
            </clipPath>
          </defs>
        )}
        <AnimatedPath
          clipPath={clipPath}
          d={d}
          updateTransition={resolvedUpdateTransition}
          {...pathProps}
        />
      </>
    );
  },
);
