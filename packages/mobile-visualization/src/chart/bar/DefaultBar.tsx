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
    borderRadius,
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

    // Compute normalized x position for stagger delay calculation
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

    const targetPath = useMemo(() => {
      const effectiveBorderRadius = borderRadius ?? 0;
      const effectiveRoundTop = roundTop ?? true;
      const effectiveRoundBottom = roundBottom ?? true;

      return (
        d ||
        getBarPath(
          x,
          y,
          width,
          height,
          effectiveBorderRadius,
          effectiveRoundTop,
          effectiveRoundBottom,
        )
      );
    }, [x, y, width, height, borderRadius, roundTop, roundBottom, d]);

    const initialPath = useMemo(() => {
      const effectiveBorderRadius = borderRadius ?? 0;
      const effectiveRoundTop = roundTop ?? true;
      const effectiveRoundBottom = roundBottom ?? true;
      const baselineY = originY ?? y + height;

      return getBarPath(
        x,
        baselineY,
        width,
        1,
        effectiveBorderRadius,
        effectiveRoundTop,
        effectiveRoundBottom,
      );
    }, [x, originY, y, height, width, borderRadius, roundTop, roundBottom]);

    return (
      <Path
        animate={animate}
        clipPath={null}
        d={targetPath}
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
