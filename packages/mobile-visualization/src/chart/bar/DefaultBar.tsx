import React, { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import { Path } from 'react-native-svg';
import { animatedPathConfig } from '@coinbase/cds-common/animation/sparkline';
import { getBarPath } from '@coinbase/cds-common/visualizations/charts';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';
import * as interpolate from 'd3-interpolate-path';

import { useChartContext } from '../ChartProvider';

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
    const { animate } = useChartContext();
    const theme = useTheme();
    const animationProgress = useRef(new Animated.Value(0)).current;

    const initialPath = useMemo(() => {
      if (!animate) return d;
      // Need a minimum height to allow for animation
      const minHeight = 1;
      const initialY = originY ? originY - minHeight : y + height - minHeight;
      return getBarPath(x, initialY, width, minHeight, borderRadius, roundTop, roundBottom);
    }, [animate, x, y, height, originY, width, borderRadius, roundTop, roundBottom, d]);

    const targetPath = useMemo(() => {
      return d || getBarPath(x, y, width, height, borderRadius, roundTop, roundBottom);
    }, [d, x, y, width, height, borderRadius, roundTop, roundBottom]);

    const pathInterpolator = useMemo(
      () => interpolate.interpolatePath(initialPath, targetPath),
      [initialPath, targetPath],
    );

    const animationListener = useCallback(
      ({ value }: { value: number }) => {
        const val = Number(value.toFixed(4));
        pathRef.current?.setNativeProps({
          d: pathInterpolator(val),
        });
      },
      [pathInterpolator],
    );

    const defaultFill = fill || theme.color.fgPrimary;

    useEffect(() => {
      if (!animate || !pathRef.current) {
        // If not animating, just set the target path
        pathRef.current?.setNativeProps({
          d: targetPath,
        });
        return;
      }

      // Reset animation progress
      animationProgress.setValue(0);

      // Add listener for animation updates
      const listenerId = animationProgress.addListener(animationListener);

      // Start the animation immediately
      Animated.timing(animationProgress, {
        toValue: 1,
        duration: animatedPathConfig.duration,
        easing: animatedPathConfig.easing,
        useNativeDriver: false, // Path animation can't use native driver
      }).start(() => {
        // Clean up listener when animation completes
        animationProgress.removeListener(listenerId);
      });

      // Cleanup on unmount or when dependencies change
      return () => {
        animationProgress.removeListener(listenerId);
        animationProgress.stopAnimation();
      };
    }, [animate, animationListener, animationProgress, targetPath]);

    return (
      <Path
        ref={pathRef}
        d={animate ? initialPath : targetPath}
        fill={defaultFill}
        fillOpacity={fillOpacity}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
    );
  },
);

DefaultBar.displayName = 'DefaultBar';
