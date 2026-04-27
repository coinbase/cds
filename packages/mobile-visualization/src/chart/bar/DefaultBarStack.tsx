import { memo, useMemo } from 'react';
import { Group, Skia } from '@shopify/react-native-skia';

import { useCartesianChartContext } from '../ChartProvider';
import { getBarPath } from '../utils';
import {
  type BarTransition,
  defaultBarEnterTransition,
  getNormalizedStagger,
  getStackInitialClipRect,
  withStaggerDelayTransition,
} from '../utils/bar';
import { defaultTransition, getTransition, usePathTransition } from '../utils/transition';

import type { BarStackComponentProps } from './BarStack';

export type DefaultBarStackProps = BarStackComponentProps;

/**
 * Default stack component that renders children in a group with animated clip path.
 */
export const DefaultBarStack = memo<DefaultBarStackProps>(
  ({
    children,
    width,
    height,
    x,
    y,
    borderRadius = 4,
    roundTop = true,
    roundBottom = true,
    origin,
    transitions,
    transition,
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
      [animate, transitions?.update, transition, normalizedStagger],
    );

    // Generate target clip path (full bar)
    const targetPath = useMemo(() => {
      return getBarPath(x, y, width, height, borderRadius, roundTop, roundBottom, layout);
    }, [x, y, width, height, borderRadius, roundTop, roundBottom, layout]);

    // Initial clip path for entry animation (bar at baseline with minimal height)
    const initialPath = useMemo(() => {
      if (!animate) return;

      const initialClipRect = getStackInitialClipRect({ x, y, width, height }, layout, origin);

      return getBarPath(
        initialClipRect.x,
        initialClipRect.y,
        initialClipRect.width,
        initialClipRect.height,
        borderRadius,
        roundTop,
        roundBottom,
        layout,
      );
    }, [animate, layout, x, y, height, width, borderRadius, roundTop, roundBottom, origin]);

    const animatedClipPath = usePathTransition({
      currentPath: targetPath,
      initialPath,
      transitions: { enter: enterTransitionWithStagger, update: updateTransition },
    });

    const staticClipPath = useMemo(
      () => Skia.Path.MakeFromSVGString(targetPath) ?? Skia.Path.Make(),
      [targetPath],
    );

    const clipPath = animate ? animatedClipPath : staticClipPath;

    return <Group clip={clipPath}>{children}</Group>;
  },
);
