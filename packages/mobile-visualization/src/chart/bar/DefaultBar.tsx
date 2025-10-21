import { memo, useEffect, useMemo } from 'react';
import { useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';
import { usePreviousValue } from '@coinbase/cds-common/hooks/usePreviousValue';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';
import * as interpolate from 'd3-interpolate-path';

import { useCartesianChartContext } from '../ChartProvider';
import { Path } from '../Path';
import { getBarPath } from '../utils';

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
  }) => {
    const { animate } = useCartesianChartContext();
    const theme = useTheme();

    // Target path (full bar)
    const targetPath = useMemo(() => {
      return (
        d ||
        getBarPath(x, y, width, height, borderRadius ?? 0, roundTop ?? true, roundBottom ?? true)
      );
    }, [d, x, y, width, height, borderRadius, roundTop, roundBottom]);

    // Initial path (bar at baseline with minimal height)
    const initialPath = useMemo(() => {
      const baselineY = originY ?? y + height;
      return getBarPath(
        x,
        baselineY,
        width,
        1,
        borderRadius ?? 0,
        roundTop ?? true,
        roundBottom ?? true,
      );
    }, [x, originY, y, height, width, borderRadius, roundTop, roundBottom]);

    const previousPath = usePreviousValue(targetPath);

    // From path (either previous state or initial state for new bars)
    const fromPath = useMemo(() => {
      if (!animate) return targetPath;
      return previousPath || initialPath;
    }, [animate, previousPath, initialPath, targetPath]);

    // Path interpolator using d3-interpolate-path (runs on JS thread)
    const pathInterpolator = useMemo(
      () => interpolate.interpolatePath(fromPath, targetPath),
      [fromPath, targetPath],
    );

    // Store current path as shared value that can be read on UI thread
    const currentPathString = useSharedValue(animate ? fromPath : targetPath);
    const animationProgress = useSharedValue(animate ? 0 : 1);

    const defaultFill = fill || theme.color.fgPrimary;

    // Trigger animation when target path changes
    useEffect(() => {
      if (!animate) {
        currentPathString.value = targetPath;
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
            currentPathString.value = targetPath;
          }
        },
      );

      // Interpolate path on JS thread as animation progresses
      const intervalId = setInterval(() => {
        const progress = animationProgress.value;
        if (progress >= 1) {
          clearInterval(intervalId);
          currentPathString.value = targetPath;
        } else {
          currentPathString.value = pathInterpolator(progress);
        }
      }, 16); // ~60fps

      return () => clearInterval(intervalId);
    }, [animate, animationProgress, targetPath, pathInterpolator, currentPathString]);

    return (
      <Path
        animate={false}
        d={currentPathString}
        fill={defaultFill}
        fillOpacity={fillOpacity}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
    );
  },
);
