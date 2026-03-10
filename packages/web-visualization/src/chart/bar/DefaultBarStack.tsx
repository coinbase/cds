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
    transitions,
    transition,
  }) => {
    const { animate, drawingArea, layout } = useCartesianChartContext();
    const clipPathId = useId();

    // For vertical layout, stagger by x (category axis). For horizontal, stagger by y (category axis).
    const normalizedStagger = useMemo(() => {
      const barsGrowVertically = layout !== 'horizontal';
      if (barsGrowVertically) {
        return drawingArea.width > 0 ? (x - drawingArea.x) / drawingArea.width : 0;
      }
      return drawingArea.height > 0 ? (y - drawingArea.y) / drawingArea.height : 0;
    }, [layout, x, y, drawingArea.x, drawingArea.y, drawingArea.width, drawingArea.height]);

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
      const initialX = barsGrowVertically ? x : (yOrigin ?? x);
      const initialY = barsGrowVertically ? (yOrigin ?? y + height) : y;
      const initialWidth = barsGrowVertically ? width : 1;
      const initialHeight = barsGrowVertically ? 1 : height;

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
    }, [animate, layout, x, yOrigin, y, height, width, borderRadius, roundTop, roundBottom]);

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
