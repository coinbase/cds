import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Easing } from 'react-native';
import Reanimated, { useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated';
import {
  ClipPath,
  Defs,
  G,
  Path as SvgPath,
  type PathProps as SvgPathProps,
  Rect,
  type RectProps,
} from 'react-native-svg';
import type { Rect as RectType, SharedProps } from '@coinbase/cds-common/types';
import * as interpolate from 'd3-interpolate-path';

import { useCartesianChartContext } from './ChartProvider';

const AnimatedRect = Reanimated.createAnimatedComponent(Rect);

const AnimatedSvgRect = memo(({ width, rectProps }: { width: number; rectProps: RectProps }) => {
  const animatedWidth = useSharedValue(0);

  const animatedProps = useAnimatedProps(() => {
    return {
      width: animatedWidth.value,
    };
  });

  React.useEffect(() => {
    animatedWidth.value = withTiming(width + 4, {
      duration: 1000,
    });
  }, [animatedWidth, width]);

  return <AnimatedRect animatedProps={animatedProps} {...rectProps} />;
});

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
    const { animate: animateContext, drawingArea: contextRect } = useCartesianChartContext();
    const rect = clipRect ?? contextRect;
    const animate = animateProp ?? animateContext;

    const clipPathId = useMemo(() => `clip-path-${Math.random().toString(36).substr(2, 9)}`, []);

    // Refs for path animation
    const pathRef = useRef<SvgPath | null>(null);
    const [isInitialized, setIsInitialized] = useState(false);
    // Store the initial path - this never changes and is what we render
    const initialPathRef = useRef<string>(d);
    const currentPathRef = useRef<string>(d); // Track current actual path
    const isAnimatingRef = useRef(false);
    const animationRef = useRef<Animated.CompositeAnimation | null>(null);

    // Animation progress using React Native's Animated API
    const animationProgress = useRef(new Animated.Value(0)).current;

    // Spring-like easing to match ScrubberHead
    const springEasing = Easing.bezier(0.5, 0, 0.25, 1);

    // Animation listener callback
    const animationListener = useCallback(
      (interpolator: (t: number) => string) =>
        ({ value }: { value: number }) => {
          const val = Number(value.toFixed(4));
          pathRef.current?.setNativeProps({
            d: interpolator(val),
          });
        },
      [],
    );

    // Handle animation completion
    const onFinishAnimation = useCallback(
      (targetPath: string) =>
        ({ finished }: { finished: boolean }) => {
          if (finished) {
            animationProgress.removeAllListeners();
            animationProgress.setValue(0);
            isAnimatingRef.current = false;
            currentPathRef.current = targetPath;
            // Ensure final path is set
            pathRef.current?.setNativeProps({
              d: targetPath,
            });
          }
        },
      [animationProgress],
    );

    // Initialize path on mount
    useEffect(() => {
      if (pathRef.current && !isInitialized) {
        pathRef.current.setNativeProps({ d });
        currentPathRef.current = d;
        setIsInitialized(true);
      }
    }, [d, isInitialized]);

    // Handle path changes after initialization
    useEffect(() => {
      if (!d || !isInitialized) return;

      const pathChanged = currentPathRef.current !== d;
      if (!pathChanged) return;

      // Create interpolator for animation
      if (animate && currentPathRef.current) {
        try {
          // Create interpolator from current path to new path
          const interpolator = interpolate.interpolatePath(currentPathRef.current, d);

          // Stop any running animation
          if (isAnimatingRef.current && animationRef.current) {
            animationRef.current.stop();
            animationProgress.removeAllListeners();
          }

          isAnimatingRef.current = true;

          // Reset and start animation
          animationProgress.setValue(0);
          animationProgress.addListener(animationListener(interpolator));

          // Create spring-like timing animation to match ScrubberHead
          animationRef.current = Animated.timing(animationProgress, {
            toValue: 1,
            duration: 300, // Approximately matches spring timing
            easing: springEasing,
            useNativeDriver: true,
          });

          animationRef.current.start(onFinishAnimation(d));
        } catch (error) {
          // If interpolation fails, update immediately
          pathRef.current?.setNativeProps({ d });
          currentPathRef.current = d;
        }
      } else {
        // No animation - update immediately via setNativeProps only
        pathRef.current?.setNativeProps({ d });
        currentPathRef.current = d;
      }
    }, [
      d,
      animate,
      isInitialized,
      animationProgress,
      animationListener,
      onFinishAnimation,
      springEasing,
    ]);

    useEffect(() => {
      return () => {
        animationProgress.removeAllListeners();
        if (animationRef.current) {
          animationRef.current.stop();
        }
      };
    }, [animationProgress]);

    if (!d || !rect) {
      return null;
    }

    return (
      <G>
        <Defs>
          {animate && (
            <ClipPath id={clipPathId}>
              <AnimatedSvgRect
                rectProps={{ height: rect.height, x: rect.x, y: rect.y }}
                width={rect.width}
              />
            </ClipPath>
          )}
        </Defs>
        <SvgPath
          ref={pathRef}
          clipPath={`url(#${clipPathId})`}
          clipRule="nonzero"
          d={initialPathRef.current}
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
