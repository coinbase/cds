import React, { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import Reanimated, { useAnimatedProps, useSharedValue, withSpring } from 'react-native-reanimated';
import {
  ClipPath,
  Defs,
  G,
  Path as SvgPath,
  type PathProps as SvgPathProps,
  Rect,
  type RectProps,
} from 'react-native-svg';
import { useValueChanges } from '@coinbase/cds-common/hooks/useValueChanges';
import type { Rect as RectType, SharedProps } from '@coinbase/cds-common/types';
import { useChartContext } from './ChartProvider';
import * as interpolate from 'd3-interpolate-path';

const AnimatedRect = Reanimated.createAnimatedComponent(Rect);

const AnimatedSvgRect = ({ width, rectProps }: { width: number; rectProps: RectProps }) => {
  const animatedWidth = useSharedValue(0);

  const animatedProps = useAnimatedProps(() => {
    return {
      width: animatedWidth.value,
    };
  });

  React.useEffect(() => {
    animatedWidth.value = withSpring(width + 4, {
      damping: 25,
      stiffness: 120,
    });
  }, [animatedWidth, width]);

  return <AnimatedRect animatedProps={animatedProps} {...rectProps} />;
};

export type PathProps = SharedProps &
  SvgPathProps & {
    /**
     * The SVG path data string
     */
    d?: string;
    /**
     * Path fill color
     */
    fill?: string;
    /**
     * Path stroke color
     */
    stroke?: string;
    /**
     * Path stroke width
     */
    strokeWidth?: number;
    /**
     * Path stroke opacity
     */
    strokeOpacity?: number;
    /**
     * Path fill opacity
     */
    fillOpacity?: number;
    /**
     * Custom clip path rect. If provided, this overrides the default chart rect for clipping.
     */
    clipRect?: RectType;
    /**
     * Stroke dash array for dashed lines
     */
    strokeDasharray?: string;
    /**
     * Whether to animate the path.
     * Overrides the animate prop on the Chart component.
     */
    animate?: boolean;
  };

export const Path = memo<PathProps>(
  ({
    clipRect,
    d = '',
    fill,
    stroke,
    strokeWidth,
    strokeOpacity,
    fillOpacity,
    strokeDasharray,
    testID,
    animate: animateProp,
    ...pathProps
  }) => {
    const { animate: animateContext, drawingArea: contextRect } = useChartContext();
    const rect = clipRect ?? contextRect;
    const animate = animateProp ?? animateContext;
    const pathRef = useRef<SvgPath | null>(null);

    const clipPathId = useMemo(() => `clip-path-${Math.random().toString(36).substr(2, 9)}`, []);

    // Track path changes for animation
    const {
      previousValue: previousPath,
      newValue: newPath,
      hasChanged: shouldUpdatePath,
      addPreviousValue: addPreviousPath,
    } = useValueChanges(d || '');

    // Create path interpolator
    const pathInterpolator = useMemo(() => {
      const fromPath = (previousPath as string) || d;
      const toPath = (newPath as string) || d;

      // If no previous path, no need to interpolate
      if (!previousPath || !fromPath || !toPath) {
        return null;
      }

      try {
        return interpolate.interpolatePath(fromPath, toPath);
      } catch (error) {
        // Fallback if interpolation fails
        return null;
      }
    }, [previousPath, newPath, d]);

    // Animation callback
    const animationCallback = useCallback(
      ({ value }: { value: number }) => {
        if (!pathInterpolator || !pathRef.current) return;

        const val = Number(value.toFixed(4));
        pathRef.current.setNativeProps({
          d: pathInterpolator(val),
        });
      },
      [pathInterpolator],
    );

    // Play animation
    const playAnimation = useCallback(() => {
      if (!pathInterpolator) return;

      const startTime = Date.now();
      const duration = 300; // Match DefaultBar animation duration

      const easeInOutCubic = (t: number) =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

      const runAnimation = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeInOutCubic(progress);

        animationCallback({ value: easedProgress });

        if (progress < 1) {
          requestAnimationFrame(runAnimation);
        }
      };

      requestAnimationFrame(runAnimation);
    }, [pathInterpolator, animationCallback]);

    // Handle path changes
    useEffect(() => {
      addPreviousPath(newPath);

      if (shouldUpdatePath && animate && pathInterpolator) {
        playAnimation();
      }
    }, [shouldUpdatePath, animate, pathInterpolator, playAnimation, addPreviousPath, newPath]);

    if (!d || !rect) {
      return null;
    }

    return (
      <G>
        <Defs>
          <ClipPath id={clipPathId}>
            {animate ? (
              <AnimatedSvgRect
                rectProps={{ height: rect.height, x: rect.x, y: rect.y }}
                width={rect.width}
              />
            ) : (
              <Rect height={rect.height} width={rect.width} x={rect.x} y={rect.y} />
            )}
          </ClipPath>
        </Defs>
        <SvgPath
          ref={pathRef}
          clipPath={`url(#${clipPathId})`}
          clipRule="nonzero"
          d={d}
          fill={fill}
          fillOpacity={fillOpacity}
          stroke={stroke}
          strokeDasharray={strokeDasharray}
          strokeOpacity={strokeOpacity}
          strokeWidth={strokeWidth}
          testID={testID}
          {...pathProps}
        />
      </G>
    );
  },
);
