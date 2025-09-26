import React, { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { Path } from 'react-native-svg';
import { useValueChanges } from '@coinbase/cds-common/hooks/useValueChanges';
import { getBarPath, useChartContext } from '@coinbase/cds-common/visualizations/charts';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';
import * as interpolate from 'd3-interpolate-path';

import type { BarComponentProps } from './Bar';

export type DefaultBarProps = BarComponentProps;

const calculateInitialPath = (
  x: number,
  originY: number,
  width: number,
  borderRadius: number,
  roundTop: boolean,
  roundBottom: boolean,
) => {
  const minHeight = 15;
  const initialY = originY - minHeight;
  return getBarPath(x, initialY, width, minHeight, borderRadius, roundTop, roundBottom);
};

/**
 * Default bar component that renders a solid bar with path animation.
 */
export const DefaultBar = memo<DefaultBarProps>(
  ({
    d,
    fill,
    fillOpacity = 1,
    stroke,
    strokeWidth,
    originY,
    x,
    width,
    borderRadius,
    roundTop,
    roundBottom,
  }) => {
    const theme = useTheme();
    const { animate } = useChartContext();
    const pathRef = useRef<Path | null>(null);

    const initialPath = useRef(
      calculateInitialPath(x, originY, width, borderRadius, roundTop, roundBottom),
    ).current;

    // Track path changes for animation
    const {
      previousValue: previousPath,
      newValue: newPath,
      hasChanged: shouldUpdatePath,
      addPreviousValue: addPreviousPath,
    } = useValueChanges(d || '');

    // Create path interpolator
    const pathInterpolator = useMemo(() => {
      const fromPath = (previousPath as string) || initialPath;
      const toPath = (newPath as string) || d;

      // Ensure both paths are valid strings
      if (!fromPath || !toPath) {
        return (t: number) => toPath || fromPath || '';
      }

      try {
        return interpolate.interpolatePath(fromPath, toPath);
      } catch (error) {
        // Fallback to simple transition if interpolation fails
        return (t: number) => (t < 1 ? fromPath : toPath);
      }
    }, [previousPath, initialPath, newPath, d]);

    const hasInitialized = useRef(false);

    // Update path without animation
    const updatePathWithoutAnimation = useCallback(() => {
      if (pathRef.current) {
        const finalPath = pathInterpolator(1);
        if (finalPath) {
          pathRef.current.setNativeProps({
            d: finalPath,
          });
        }
      }
    }, [pathInterpolator]);

    // Play animation with d3-interpolate + requestAnimationFrame
    const playAnimation = useCallback(() => {
      const startTime = Date.now();
      const duration = hasInitialized.current ? 300 : 1000;

      // Use pure JS easing functions instead of Reanimated for consistency with web
      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
      const easeInOutCubic = (t: number) =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      const easing = hasInitialized.current ? easeInOutCubic : easeOutCubic;

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easing(progress);

        if (pathRef.current) {
          const interpolatedPath = pathInterpolator(easedProgress);
          if (interpolatedPath) {
            pathRef.current.setNativeProps({
              d: interpolatedPath,
            });
          }
        }

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          hasInitialized.current = true;
        }
      };

      requestAnimationFrame(animate);
    }, [pathInterpolator]);

    // Handle path changes
    useEffect(() => {
      addPreviousPath(newPath);

      if (shouldUpdatePath || !hasInitialized.current) {
        if (animate) {
          playAnimation();
        } else {
          updatePathWithoutAnimation();
          hasInitialized.current = true;
        }
      }
    }, [
      shouldUpdatePath,
      animate,
      playAnimation,
      updatePathWithoutAnimation,
      addPreviousPath,
      newPath,
    ]);

    return (
      <Path
        ref={pathRef}
        d={hasInitialized.current ? d : initialPath}
        fill={fill ?? theme.color.fgPrimary}
        fillOpacity={fillOpacity}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
    );
  },
);
