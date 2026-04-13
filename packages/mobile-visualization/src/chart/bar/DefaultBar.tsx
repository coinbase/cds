import { memo, useEffect, useMemo, useRef } from 'react';
import { useSharedValue } from 'react-native-reanimated';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';
import { Group } from '@shopify/react-native-skia';

import { useCartesianChartContext } from '../ChartProvider';
import { Path } from '../Path';
import {
  defaultBarEnterOpacityTransition,
  defaultBarEnterTransition,
  getBarPath,
  withStaggerDelayTransition,
} from '../utils';
import { getNormalizedStagger } from '../utils/bar';
import { buildTransition, defaultTransition, getTransition } from '../utils/transition';

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
        withStaggerDelayTransition(
          getTransition(transitions?.enter, animate, defaultBarEnterTransition),
          normalizedStagger,
        ),
      [transitions?.enter, animate, normalizedStagger],
    );
    const rawEnterOpacityTransition = useMemo(() => {
      if (transitions?.enterOpacity === undefined) {
        return enterTransition === null ? null : defaultBarEnterOpacityTransition;
      }
      return getTransition(transitions.enterOpacity, animate, defaultBarEnterOpacityTransition);
    }, [transitions?.enterOpacity, animate, enterTransition]);
    const enterOpacityTransition = useMemo(
      () => withStaggerDelayTransition(rawEnterOpacityTransition, normalizedStagger),
      [rawEnterOpacityTransition, normalizedStagger],
    );
    const resolvedEnterOpacityTransition = useMemo(() => {
      if (!enterOpacityTransition) return null;
      if (!enterTransition) return enterOpacityTransition;
      // Keep opacity aligned with geometry staggering when fade delay isn't explicitly set.
      return {
        ...enterOpacityTransition,
        delay: enterOpacityTransition.delay ?? enterTransition.delay,
      };
    }, [enterOpacityTransition, enterTransition]);
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

    const enterOpacity = useSharedValue(animate && resolvedEnterOpacityTransition !== null ? 0 : 1);
    const hasAnimatedEnterOpacity = useRef(false);

    useEffect(() => {
      if (hasAnimatedEnterOpacity.current) {
        return;
      }
      hasAnimatedEnterOpacity.current = true;

      if (!animate || resolvedEnterOpacityTransition === null) {
        enterOpacity.value = 1;
        return;
      }

      enterOpacity.value = buildTransition(1, resolvedEnterOpacityTransition);
    }, [animate, resolvedEnterOpacityTransition, enterOpacity]);

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
      <Group opacity={enterOpacity}>
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
      </Group>
    );
  },
);
