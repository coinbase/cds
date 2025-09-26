import React, { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import type { SVGProps } from 'react';
import { useValueChanges } from '@coinbase/cds-common/hooks/useValueChanges';
import { getBarPath } from '@coinbase/cds-common/visualizations/charts';
import * as interpolate from 'd3-interpolate-path';

import { useChartContext } from '../ChartProvider';
import type { BarComponentProps } from './Bar';

export type DefaultBarProps = BarComponentProps;

/**
 * Default bar component that renders a solid bar with d3-interpolate animation.
 */
export const DefaultBar = memo<DefaultBarProps>(
  ({
    x,
    width,
    borderRadius,
    roundTop,
    roundBottom,
    originY,
    d,
    fill = 'var(--color-fgPrimary)',
    fillOpacity = 1,
    stroke,
    strokeWidth,
  }) => {
    const { animate } = useChartContext();
    const pathRef = useRef<SVGPathElement | null>(null);

    const hasInitialized = useRef(false);

    const initialPath = useMemo(() => {
      // Need a minimum height to allow for animation
      const minHeight = 1;
      const initialY = originY - minHeight;
      return getBarPath(x, initialY, width, minHeight, borderRadius, roundTop, roundBottom);
    }, [x, originY, width, borderRadius, roundTop, roundBottom]);

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
        // Fallback to simple transition
        return (t: number) => (t < 1 ? fromPath : toPath);
      }
    }, [previousPath, initialPath, newPath, d]);

    // Update path without animation
    const updatePathWithoutAnimation = useCallback(() => {
      if (pathRef.current) {
        const finalPath = pathInterpolator(1);
        if (finalPath) {
          pathRef.current.setAttribute('d', finalPath);
        }
      }
    }, [pathInterpolator]);

    // Play animation with d3-interpolate + requestAnimationFrame
    const playAnimation = useCallback(() => {
      const startTime = Date.now();
      const duration = hasInitialized.current ? 300 : 1000;

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
            pathRef.current.setAttribute('d', interpolatedPath);
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

    const pathProps: SVGProps<SVGPathElement> = {
      fill,
      fillOpacity,
      stroke,
      strokeWidth,
    };

    // After initialization, use the current path instead of undefined
    // This prevents clearing the animated path
    const renderPath = hasInitialized.current ? d : initialPath;

    return <path ref={pathRef} {...pathProps} d={renderPath} />;
  },
);
