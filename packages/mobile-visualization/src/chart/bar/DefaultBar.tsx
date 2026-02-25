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
    originY,
    transitions,
    transition,
  }) => {
    const { animate, drawingArea } = useCartesianChartContext();
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
      const baselineY = originY ?? y + height;
      return getBarPath(x, baselineY, width, 1, borderRadius, !!roundTop, !!roundBottom);
    }, [x, originY, y, height, width, borderRadius, roundTop, roundBottom]);

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
