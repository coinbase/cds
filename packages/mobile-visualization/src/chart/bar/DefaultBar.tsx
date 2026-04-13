import { memo, useMemo } from 'react';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';

import { useCartesianChartContext } from '../ChartProvider';
import { Path } from '../Path';
import {
  defaultBarEnterOpacityTransition,
  defaultBarEnterTransition,
  getBarPath,
  withStaggerDelayTransition,
} from '../utils';
import { type BarTransition, getNormalizedStagger } from '../utils/bar';
import { defaultTransition, getTransition } from '../utils/transition';

import type { BarComponentProps } from './Bar';

export type DefaultBarProps = BarComponentProps;

/**
 * Default bar component that renders a solid bar with animation support.
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
    d,
    fill,
    fillOpacity = 1,
    stroke,
    strokeWidth,
    origin,
    minSize = 1,
    transitions,
    transition,
  }) => {
    const { animate, drawingArea, layout } = useCartesianChartContext();
    const theme = useTheme();

    const defaultFill = fill || theme.color.fgPrimary;

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
        animate={animate}
        clipPath={null}
        d={d}
        fill={stroke ? 'none' : defaultFill}
        fillOpacity={fillOpacity}
        initialPath={initialPath}
        stroke={stroke}
        strokeWidth={strokeWidth}
        transitions={{
          enter: enterTransitionWithStagger,
          enterOpacity: enterOpacityTransitionWithStagger,
          update: updateTransition,
        }}
      />
    );
  },
);
