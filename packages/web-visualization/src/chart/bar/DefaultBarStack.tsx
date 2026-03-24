import { memo, useId, useMemo } from 'react';
import { m as motion } from 'framer-motion';

import { useCartesianChartContext } from '../ChartProvider';
import {
  defaultBarEnterTransition,
  defaultTransition,
  getBarPath,
  getTransition,
  withStaggerDelayTransition,
} from '../utils';
import { getNormalizedStagger } from '../utils/bar';
import { usePathTransition } from '../utils/transition';

import type { BarStackComponentProps } from './BarStack';

export type DefaultBarStackProps = BarStackComponentProps & {
  /**
   * Custom class name for the stack group.
   */
  className?: string;
  /**
   * Custom styles for the stack group.
   */
  style?: React.CSSProperties;
};

/**
 * Default stack component that renders children in a group with animated clip path.
 */
export const DefaultBarStack = memo<DefaultBarStackProps>(
  ({
    children,
    className,
    style,
    width,
    height,
    x,
    y,
    borderRadius = 4,
    roundTop = true,
    roundBottom = true,
    yOrigin,
    minSize,
    initialValueRange,
    transitions,
    transition,
  }) => {
    const { animate, drawingArea, layout } = useCartesianChartContext();
    const clipPathId = useId();

    const normalizedStagger = useMemo(
      () => getNormalizedStagger(layout !== 'horizontal', x, y, drawingArea),
      [layout, x, y, drawingArea],
    );

    const enterTransition = useMemo(
      () =>
        withStaggerDelayTransition(
          getTransition(transitions?.enter, animate, defaultBarEnterTransition),
          normalizedStagger,
        ),
      [transitions?.enter, animate, normalizedStagger],
    );
    const updateTransition = useMemo(
      () =>
        withStaggerDelayTransition(
          getTransition(
            transitions?.update !== undefined ? transitions.update : transition,
            animate,
            defaultTransition,
          ),
          normalizedStagger,
        ),
      [transitions?.update, transition, animate, normalizedStagger],
    );

    const clipPathData = useMemo(() => {
      return getBarPath(x, y, width, height, borderRadius, roundTop, roundBottom, layout);
    }, [x, y, width, height, borderRadius, roundTop, roundBottom, layout]);

    const initialClipPathData = useMemo(() => {
      if (!animate) return undefined;
      const barsGrowVertically = layout !== 'horizontal';

      let initialX: number;
      let initialY: number;
      let initialWidth: number;
      let initialHeight: number;

      if (initialValueRange) {
        // When minSize is set, the initial clip covers the bounding box of all bars at their
        // stacked starting positions so the clip and the individual bar animations are in sync.
        const [rangeStart, rangeEnd] = initialValueRange;
        if (barsGrowVertically) {
          initialX = x;
          initialY = rangeStart;
          initialWidth = width;
          initialHeight = rangeEnd - rangeStart;
        } else {
          initialX = rangeStart;
          initialY = y;
          initialWidth = rangeEnd - rangeStart;
          initialHeight = height;
        }
      } else {
        // Default: clip starts at 1px from the baseline and grows to full size.
        const initialSize = 1;
        if (barsGrowVertically) {
          const baseline = yOrigin ?? y + height;
          const isPositive = Math.abs(y + height - baseline) <= Math.abs(y - baseline);
          initialX = x;
          initialY = isPositive ? baseline - initialSize : baseline;
          initialWidth = width;
          initialHeight = initialSize;
        } else {
          const baseline = yOrigin ?? x;
          const isPositive = Math.abs(x - baseline) <= Math.abs(x + width - baseline);
          initialX = isPositive ? baseline : baseline - initialSize;
          initialY = y;
          initialWidth = initialSize;
          initialHeight = height;
        }
      }

      return getBarPath(
        initialX,
        initialY,
        initialWidth,
        initialHeight,
        borderRadius,
        roundTop,
        roundBottom,
        layout,
      );
    }, [
      animate,
      layout,
      x,
      yOrigin,
      y,
      height,
      width,
      borderRadius,
      roundTop,
      roundBottom,
      initialValueRange,
    ]);

    const animatedClipPath = usePathTransition({
      currentPath: clipPathData,
      initialPath: initialClipPathData,
      transitions: {
        enter: enterTransition,
        update: updateTransition,
      },
    });

    return (
      <>
        <defs>
          <clipPath id={clipPathId}>
            <motion.path d={animatedClipPath} />
          </clipPath>
        </defs>
        <g className={className} clipPath={`url(#${clipPathId})`} style={style}>
          {children}
        </g>
      </>
    );
  },
);
