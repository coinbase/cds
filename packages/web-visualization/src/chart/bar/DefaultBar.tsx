import React, { memo, useMemo } from 'react';

import { useCartesianChartContext } from '../ChartProvider';
import { Path } from '../Path';
import {
  defaultBarEnterOpacityTransition,
  defaultBarEnterTransition,
  defaultTransition,
  getBarPath,
  getTransition,
  withStaggerDelayTransition,
} from '../utils';
import { type BarTransition, getNormalizedStagger } from '../utils/bar';

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
    minSize = 1,
    transitions,
    transition,
    ...props
  }) => {
    const { animate, drawingArea, layout } = useCartesianChartContext();

    const normalizedStagger = useMemo(
      () => getNormalizedStagger(layout, x, y, drawingArea),
      [layout, x, y, drawingArea],
    );

    const enterTransition = useMemo(
      () =>
        getTransition(
          transitions?.enter,
          animate,
          defaultBarEnterTransition,
        ) as BarTransition | null,
      [transitions?.enter, animate],
    );
    const enterTransitionWithStagger = useMemo(
      () => withStaggerDelayTransition(enterTransition, normalizedStagger),
      [enterTransition, normalizedStagger],
    );
    const enterOpacityTransition = useMemo(() => {
      if (transitions?.enterOpacity === undefined && enterTransition === null) return null;

      const enterOpacityTransition: BarTransition | null = getTransition(
        transitions?.enterOpacity,
        animate,
        defaultBarEnterOpacityTransition,
      );

      if (!enterOpacityTransition) return null;

      return {
        ...enterOpacityTransition,
        delay: enterOpacityTransition.delay ?? enterTransition?.delay,
        staggerDelay: enterOpacityTransition.staggerDelay ?? enterTransition?.staggerDelay,
      };
    }, [transitions?.enterOpacity, animate, enterTransition]);
    const enterOpacityTransitionWithStagger = useMemo(
      () => withStaggerDelayTransition(enterOpacityTransition, normalizedStagger),
      [enterOpacityTransition, normalizedStagger],
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
      if (!animate) return;
      const isHorizontalLayout = layout === 'horizontal';
      const baseline = origin ?? (isHorizontalLayout ? x : y + height);

      const initialX = isHorizontalLayout ? baseline : x;
      const initialY = isHorizontalLayout ? y : baseline;
      const initialWidth = isHorizontalLayout ? minSize : width;
      const initialHeight = isHorizontalLayout ? height : minSize;

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
    }, [
      animate,
      layout,
      x,
      y,
      origin,
      width,
      height,
      borderRadius,
      roundTop,
      roundBottom,
      minSize,
    ]);

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
          enter: enterTransitionWithStagger,
          enterOpacity: enterOpacityTransitionWithStagger,
          update: updateTransition,
        }}
      />
    );
  },
);
