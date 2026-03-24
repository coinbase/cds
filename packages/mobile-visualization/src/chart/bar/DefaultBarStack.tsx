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
    initialValueRange,
    transitions,
    transition,
  }) => {
    const { animate, drawingArea, layout } = useCartesianChartContext();

    const normalizedStagger = useMemo(() => {
      if (layout === 'horizontal') {
        return drawingArea.height > 0 ? (y - drawingArea.y) / drawingArea.height : 0;
      }
      return drawingArea.width > 0 ? (x - drawingArea.x) / drawingArea.width : 0;
    }, [layout, x, y, drawingArea]);

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

      let initialX: number;
      let initialY: number;
      let initialWidth: number;
      let initialHeight: number;

      if (initialValueRange) {
        // When minSize is set, the initial clip covers the bounding box of all bars at their
        // stacked starting positions so the clip and the individual bar animations are in sync.
        const [rangeStart, rangeEnd] = initialValueRange;
        if (barsGrowVertically) {
          initialX = x;
          initialY = rangeStart;
          initialWidth = width;
          initialHeight = rangeEnd - rangeStart;
        } else {
          initialX = rangeStart;
          initialY = y;
          initialWidth = rangeEnd - rangeStart;
          initialHeight = height;
        }
      } else {
        // Default: clip starts at 1px from the baseline and grows to full size.
        const initialSize = 1;
        if (barsGrowVertically) {
          const baseline = yOrigin ?? y + height;
          const isPositive = Math.abs(y + height - baseline) <= Math.abs(y - baseline);
          initialX = x;
          initialY = isPositive ? baseline - initialSize : baseline;
          initialWidth = width;
          initialHeight = initialSize;
        } else {
          const baseline = yOrigin ?? x;
          const isPositive = Math.abs(x - baseline) <= Math.abs(x + width - baseline);
          initialX = isPositive ? baseline : baseline - initialSize;
          initialY = y;
          initialWidth = initialSize;
          initialHeight = height;
        }
      }

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
    }, [
      animate,
      layout,
      x,
      yOrigin,
      y,
      height,
      width,
      borderRadius,
      roundTop,
      roundBottom,
      initialValueRange,
    ]);

    const animatedClipPath = usePathTransition({
      currentPath: targetPath,
      initialPath,
      transitions: { enter: enterTransition, update: updateTransition },
    });

    const clipPath = animate ? animatedClipPath : targetPath;

    return <Group clip={clipPath}>{children}</Group>;
  },
);
