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
    const { layout, animate } = useCartesianChartContext();

    const initialPath = useMemo(() => {
      if (!animate) return undefined;
      const barsGrowVertically = layout !== 'horizontal';
      // Need a minimum size to allow for animation
      const minSize = 1;

      let initialX = x;
      let initialY = y;
      let initialWidth = width;
      let initialHeight = height;

      if (barsGrowVertically) {
        // Vertical growth: width is constant, height grows from origin
        initialY = origin ?? y + height;
        initialHeight = minSize;
      } else {
        // Horizontal growth: height is constant, width grows from origin
        initialX = origin ?? x;
        initialWidth = minSize;
      }

      return getBarPath(
        initialX,
        initialY,
        initialWidth,
        initialHeight,
        borderRadius,
        !!roundTop,
        !!roundBottom,
        layout,
      );
    }, [animate, layout, x, y, origin, width, height, borderRadius, roundTop, roundBottom]);

    if (animate && initialPath) {
      return (
        <motion.path
          {...props}
          animate={{ d }}
          fill={fill}
          fillOpacity={fillOpacity}
          initial={{ d: initialPath }}
          transition={transition}
        />
      );
    }, [x, originY, width, borderRadius, roundTop, roundBottom]);

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
