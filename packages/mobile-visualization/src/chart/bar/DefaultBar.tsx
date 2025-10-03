import { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { runOnJS, useAnimatedReaction, useSharedValue, withTiming } from 'react-native-reanimated';
import { Path } from 'react-native-svg';
import { usePreviousValue } from '@coinbase/cds-common/hooks/usePreviousValue';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';
import * as interpolate from 'd3-interpolate-path';

import { useCartesianChartContext } from '../ChartProvider';
import { getBarPath } from '../utils';

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
      return (
        d ||
        getBarPath(x, y, width, height, borderRadius ?? 0, roundTop ?? true, roundBottom ?? true)
      );
    }, [d, x, y, width, height, borderRadius, roundTop, roundBottom]);

    const previousPath = usePreviousValue(targetPath);

    const fromPath = useMemo(() => {
      if (!animate) return targetPath;
      return previousPath || targetPath;
    }, [animate, previousPath, targetPath]);

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
        duration: 200,
      });
    }, [animate, animationProgress, targetPath]);

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
