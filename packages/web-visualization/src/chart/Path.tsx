import { memo, useId, useMemo } from 'react';
import type { SVGProps } from 'react';
import { useHasMounted } from '@coinbase/cds-common/hooks/useHasMounted';
import type { Rect, SharedProps } from '@coinbase/cds-common/types';
import { m as motion, type MotionValue, type Transition } from 'framer-motion';

import { defaultTransition, usePathTransition } from './utils/transition';
import { useCartesianChartContext } from './ChartProvider';

export type PathProps = SharedProps &
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
     * Whether to animate this path. Overrides the animate prop on the Chart component.
     */
    animate?: boolean;
    /**
     * Custom clip path rect. If provided, this overrides the default chart rect for clipping.
     */
    clipRect?: Rect;
    /**
     * The offset to add to the clip rect boundaries.
     */
    clipOffset?: number;
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
     */
    transition?: Transition;
  };

const AnimatedPath = memo<Omit<PathProps, 'animate'>>(({ d = '', transition, ...pathProps }) => {
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
    const rect = clipRect ?? context.drawingArea;
    const animate = animateProp ?? context.animate;

    // The clip offset provides extra padding to prevent path from being cut off
    // Area charts typically use offset=0 for exact clipping, while lines use offset=2 for breathing room
    const totalOffset = clipOffset * 2; // Applied on both sides

    // todo: likely do a set time based animation
    const clipPathAnimation = useMemo(
      () => ({
        hidden: { width: 0 },
        visible: {
          width: rect.width + totalOffset,
          transition,
        },
      }),
      [rect.width, totalOffset, transition],
    );

    return (
      <>
        <defs>
          <clipPath id={clipPathId}>
            {!animate ? (
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
                initial="hidden"
                variants={clipPathAnimation}
                x={rect.x - clipOffset}
                y={rect.y - clipOffset}
              />
            )}
          </clipPath>
        </defs>
        {!animate ? (
          <path clipPath={`url(#${clipPathId})`} d={d} {...pathProps} />
        ) : (
          <AnimatedPath
            clipPath={`url(#${clipPathId})`}
            d={d}
            transition={transition}
            {...pathProps}
          />
        )}
      </>
    );
  },
);
