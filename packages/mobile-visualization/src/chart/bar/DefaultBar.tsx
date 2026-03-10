import { memo, useMemo } from 'react';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';

import { useCartesianChartContext } from '../ChartProvider';
import { Path } from '../Path';
import { defaultBarEnterTransition, getBarPath, withStaggerDelayTransition } from '../utils';
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
    transitions,
    transition,
  }) => {
    const { animate, drawingArea, layout } = useCartesianChartContext();
    const theme = useTheme();

    const defaultFill = fill || theme.color.fgPrimary;

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
      if (!animate) return undefined;

      const minSize = 1;
      const barsGrowVertically = layout !== 'horizontal';
      const baseline = origin ?? (barsGrowVertically ? y + height : x);

      const initialX = barsGrowVertically ? x : baseline;
      const initialY = barsGrowVertically ? baseline : y;
      const initialWidth = barsGrowVertically ? width : minSize;
      const initialHeight = barsGrowVertically ? minSize : height;

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
          enter: enterTransition,
          update: updateTransition,
        }}
      />
    );
  },
);
