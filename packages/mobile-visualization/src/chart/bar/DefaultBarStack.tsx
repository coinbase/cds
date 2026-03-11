import { memo, useMemo } from 'react';
import { Group } from '@shopify/react-native-skia';

import { useCartesianChartContext } from '../ChartProvider';
import { getBarPath } from '../utils';
import { defaultBarEnterTransition, withStaggerDelayTransition } from '../utils/bar';
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
    yOrigin,
    transitions,
    transition,
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
      [animate, transitions?.enter, normalizedStagger],
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
      if (!animate) return undefined;

      const barsGrowVertically = layout !== 'horizontal';
      const baseline = yOrigin ?? (barsGrowVertically ? y + height : x);
      const minSize = 1;

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
        roundTop,
        roundBottom,
        layout,
      );
    }, [animate, layout, x, yOrigin, y, height, width, borderRadius, roundTop, roundBottom]);

    const animatedClipPath = usePathTransition({
      currentPath: targetPath,
      initialPath,
      transitions: { enter: enterTransition, update: updateTransition },
    });

    const clipPath = animate ? animatedClipPath : targetPath;

    return <Group clip={clipPath}>{children}</Group>;
  },
);
