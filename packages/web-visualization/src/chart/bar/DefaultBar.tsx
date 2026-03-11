import React, { memo, useMemo } from 'react';

import { useCartesianChartContext } from '../ChartProvider';
import { Path } from '../Path';
import {
  defaultBarEnterTransition,
  defaultTransition,
  getBarPath,
  getTransition,
  withStaggerDelayTransition,
} from '../utils';

import type { BarComponentProps } from './Bar';

export type DefaultBarProps = BarComponentProps & {
  /**
   * Custom class name for the bar.
   */
  className?: string;
  /**
   * Custom styles for the bar.
   */
  style?: React.CSSProperties;
};

/**
 * Default bar component that renders a solid bar with animation.
 */
export const DefaultBar = memo<DefaultBarProps>(
  ({
    x,
    y,
    width,
    height,
    borderRadius = 4,
    roundTop,
    roundBottom,
    origin,
    d,
    fill = 'var(--color-fgPrimary)',
    fillOpacity = 1,
    dataX,
    dataY,
    seriesId,
    transitions,
    transition,
    ...props
  }) => {
    const { animate, drawingArea, layout } = useCartesianChartContext();

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

    const initialPath = useMemo(() => {
      if (!animate) return undefined;

      const minSize = 1;
      const barsGrowVertically = layout !== 'horizontal';

      const initialX = barsGrowVertically ? x : (origin ?? x);
      const initialY = barsGrowVertically ? (origin ?? y + height) : y;
      const initialWidth = barsGrowVertically ? width : minSize;
      const initialHeight = barsGrowVertically ? minSize : height;

      return getBarPath(
        initialX,
        initialY,
        initialWidth,
        initialHeight,
        borderRadius ?? 0,
        !!roundTop,
        !!roundBottom,
        layout,
      );
    }, [animate, layout, x, y, origin, width, height, borderRadius, roundTop, roundBottom]);

    return (
      <Path
        {...props}
        animate={animate}
        clipRect={null}
        d={d}
        fill={fill}
        fillOpacity={fillOpacity}
        initialPath={initialPath}
        transitions={{
          enter: enterTransition,
          update: updateTransition,
        }}
      />
    );
  },
);
