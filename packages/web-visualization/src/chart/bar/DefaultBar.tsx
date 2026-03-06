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
    width,
    borderRadius = 4,
    roundTop,
    roundBottom,
    originY,
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
    const { animate, drawingArea } = useCartesianChartContext();

    const normalizedX = useMemo(
      () => (drawingArea.width > 0 ? (x - drawingArea.x) / drawingArea.width : 0),
      [x, drawingArea.x, drawingArea.width],
    );

    const enterTransition = useMemo(
      () =>
        withStaggerDelayTransition(
          getTransition(transitions?.enter, animate, defaultBarEnterTransition),
          normalizedX,
        ),
      [transitions?.enter, animate, normalizedX],
    );
    const updateTransition = useMemo(
      () =>
        withStaggerDelayTransition(
          getTransition(
            transitions?.update !== undefined ? transitions.update : transition,
            animate,
            defaultTransition,
          ),
          normalizedX,
        ),
      [transitions?.update, transition, animate, normalizedX],
    );

    const initialPath = useMemo(() => {
      const minHeight = 1;
      const initialY = (originY ?? 0) - minHeight;
      return getBarPath(
        x,
        initialY,
        width,
        minHeight,
        borderRadius ?? 0,
        !!roundTop,
        !!roundBottom,
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
