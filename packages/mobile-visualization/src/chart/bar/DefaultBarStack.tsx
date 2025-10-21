import { memo, useEffect, useMemo } from 'react';
import { useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';
import { Group } from '@shopify/react-native-skia';
import { usePreviousValue } from '@coinbase/cds-common/hooks/usePreviousValue';
import * as interpolate from 'd3-interpolate-path';

import { useCartesianChartContext } from '../ChartProvider';
import { svgPathToSkiaPath } from '../utils/skia';
import { getBarPath } from '../utils';

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
  }) => {
    const { animate } = useCartesianChartContext();

    // Target clip path (full bar)
    const targetClipPathSvg = useMemo(() => {
      return getBarPath(x, y, width, height, borderRadius, roundTop, roundBottom);
    }, [x, y, width, height, borderRadius, roundTop, roundBottom]);

    // Initial clip path (bar at baseline with minimal height)
    const initialClipPathSvg = useMemo(() => {
      const baselineY = yOrigin ?? y + height;
      return getBarPath(x, baselineY, width, 1, borderRadius, roundTop, roundBottom);
    }, [x, yOrigin, y, height, width, borderRadius, roundTop, roundBottom]);

    const previousClipPathSvg = usePreviousValue(targetClipPathSvg);

    // From clip path (either previous state or initial state for new bars)
    const fromClipPathSvg = useMemo(() => {
      if (!animate) return targetClipPathSvg;
      return previousClipPathSvg || initialClipPathSvg;
    }, [animate, previousClipPathSvg, initialClipPathSvg, targetClipPathSvg]);

    // Clip path interpolator using d3-interpolate-path (runs on JS thread)
    const clipPathInterpolator = useMemo(
      () => interpolate.interpolatePath(fromClipPathSvg, targetClipPathSvg),
      [fromClipPathSvg, targetClipPathSvg],
    );

    // Store current clip path SVG string as shared value
    const currentClipPathSvg = useSharedValue(animate ? fromClipPathSvg : targetClipPathSvg);
    const animationProgress = useSharedValue(animate ? 0 : 1);

    // Convert SVG path to Skia path on UI thread
    const currentClipPath = useDerivedValue(() => {
      'worklet';
      const skiaPath = svgPathToSkiaPath(currentClipPathSvg.value);
      return skiaPath ?? { x: 0, y: 0, width: 0, height: 0 };
    }, [currentClipPathSvg]);

    // Trigger animation when target clip path changes
    useEffect(() => {
      if (!animate) {
        currentClipPathSvg.value = targetClipPathSvg;
        animationProgress.value = 1;
        return;
      }

      // Animate progress from 0 to 1
      animationProgress.value = 0;
      animationProgress.value = withTiming(
        1,
        {
          duration: 300,
        },
        (finished) => {
          'worklet';
          if (finished) {
            // Ensure we end on the exact target path
            currentClipPathSvg.value = targetClipPathSvg;
          }
        },
      );

      // Interpolate path on JS thread as animation progresses
      const intervalId = setInterval(() => {
        const progress = animationProgress.value;
        if (progress >= 1) {
          clearInterval(intervalId);
          currentClipPathSvg.value = targetClipPathSvg;
        } else {
          currentClipPathSvg.value = clipPathInterpolator(progress);
        }
      }, 16); // ~60fps

      return () => clearInterval(intervalId);
    }, [animate, animationProgress, targetClipPathSvg, clipPathInterpolator, currentClipPathSvg]);

    return <Group clip={currentClipPath}>{children}</Group>;
  },
);
