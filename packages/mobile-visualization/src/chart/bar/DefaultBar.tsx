import React, { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import {
  Easing,
  runOnJS,
  useAnimatedReaction,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Path } from 'react-native-svg';
import { usePreviousValue } from '@coinbase/cds-common/hooks/usePreviousValue';
import { getBarPath } from '@coinbase/cds-common/visualizations/charts';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';
import * as interpolate from 'd3-interpolate-path';

import { useCartesianChartContext } from '../ChartProvider';

import type { BarComponentProps } from './Bar';

export type DefaultBarProps = BarComponentProps;

/**
 * Default bar component that renders a solid bar with animation.
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
    originY,
    d,
    fill,
    fillOpacity = 1,
    stroke,
    strokeWidth,
  }) => {
    const pathRef = useRef<Path | null>(null);
    const { animate } = useCartesianChartContext();
    const theme = useTheme();

    const animationProgress = useSharedValue(0);

    const targetPath = useMemo(() => {
      return d || getBarPath(x, y, width, height, borderRadius, roundTop, roundBottom);
    }, [d, x, y, width, height, borderRadius, roundTop, roundBottom]);

    const previousPath = usePreviousValue(targetPath);

    const baselinePath = useMemo(() => {
      const minHeight = 1;
      const initialY = originY ? originY - minHeight : y + height - minHeight;
      return getBarPath(x, initialY, width, minHeight, borderRadius, roundTop, roundBottom);
    }, [x, originY, y, height, width, borderRadius, roundTop, roundBottom]);

    const fromPath = useMemo(() => {
      if (!animate) return targetPath;
      return previousPath || baselinePath;
    }, [animate, previousPath, baselinePath, targetPath]);

    const pathInterpolator = useMemo(
      () => interpolate.interpolatePath(fromPath, targetPath),
      [fromPath, targetPath],
    );

    const updatePath = useCallback(
      (progress: number) => {
        const val = Number(progress.toFixed(4));
        pathRef.current?.setNativeProps({
          d: pathInterpolator(val),
        });
      },
      [pathInterpolator],
    );

    const defaultFill = fill || theme.color.fgPrimary;

    useAnimatedReaction(
      () => animationProgress.value,
      (progress) => {
        'worklet';
        runOnJS(updatePath)(progress);
      },
      [updatePath],
    );

    useEffect(() => {
      if (!pathRef.current) return;

      if (!animate) {
        pathRef.current.setNativeProps({
          d: targetPath,
        });
        animationProgress.value = 1;
        return;
      }

      animationProgress.value = 0;
      animationProgress.value = withTiming(1, {
        duration: 300,
      });
    }, [animate, animationProgress, targetPath, baselinePath]);

    return (
      <Path
        ref={pathRef}
        d={fromPath}
        fill={defaultFill}
        fillOpacity={fillOpacity}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
    );
  },
);
