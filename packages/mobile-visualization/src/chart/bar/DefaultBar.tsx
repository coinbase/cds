import React, { memo, useEffect, useMemo } from 'react';
import Reanimated, {
  interpolate,
  useAnimatedProps,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { Path } from 'react-native-svg';
import { getBarPath } from '@coinbase/cds-common/visualizations/charts';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';

import { useChartContext } from '../ChartProvider';

import type { BarComponentProps } from './Bar';

const AnimatedPath = Reanimated.createAnimatedComponent(Path);

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
    const { animate } = useChartContext();
    const theme = useTheme();
    const animationProgress = useSharedValue(animate ? 0 : 1);

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

    // Animate on mount or when target changes
    useEffect(() => {
      if (animate) {
        animationProgress.value = withSpring(1, {
          damping: 20,
          stiffness: 300,
        });
      } else {
        animationProgress.value = 1;
      }
    }, [animate, animationProgress, targetPath]);

    const animatedProps = useAnimatedProps(() => {
      // For path morphing, we need to interpolate between paths
      // Since React Native doesn't have built-in path interpolation,
      // we'll use the progress to control visibility/scale
      return {
        d: animationProgress.value === 1 ? targetPath : initialPath,
        opacity: interpolate(animationProgress.value, [0, 0.1, 1], [0, 1, 1]),
      };
    });

    const defaultFill = fill || theme?.color?.fgPrimary || '#000000';

    if (animate) {
      return (
        <AnimatedPath
          animatedProps={animatedProps}
          fill={defaultFill}
          fillOpacity={fillOpacity}
          stroke={stroke}
          strokeWidth={strokeWidth}
        />
      );
    }

    return (
      <Path
        d={targetPath}
        fill={defaultFill}
        fillOpacity={fillOpacity}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
    );
  },
);
