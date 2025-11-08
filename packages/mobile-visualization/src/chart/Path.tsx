import { memo, type ReactNode, useEffect, useMemo } from 'react';
import { useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';
import type { Rect, SharedProps } from '@coinbase/cds-common/types';
import {
  type AnimatedProp,
  Group,
  Path as SkiaPath,
  Skia,
  usePathInterpolation,
} from '@shopify/react-native-skia';

import type { TransitionConfig } from './utils/transition';
import { usePathTransition } from './utils/transition';
import { useCartesianChartContext } from './ChartProvider';
import { unwrapAnimatedValue } from './utils';

export type PathProps = SharedProps & {
  /**
   * The SVG path data string.
   */
  d?: AnimatedProp<string>;
  /**
   * Initial path for enter animation.
   * When provided, the first animation will go from initialPath to d.
   * If not provided, defaults to d (no enter animation).
   */
  initialPath?: string;
  /**
   * Children for declarative shaders (e.g., LinearGradient, ImageShader).
   */
  children?: ReactNode;
  /**
   * Path fill color.
   */
  fill?: string;
  /**
   * Path fill opacity.
   */
  fillOpacity?: number;
  /**
   * Path stroke color.
   */
  stroke?: string;
  /**
   * Path stroke opacity.
   */
  strokeOpacity?: number;
  /**
   * Path stroke width.
   */
  strokeWidth?: number;
  /**
   * Stroke line cap.
   */
  strokeLinecap?: 'butt' | 'round' | 'square';
  /**
   * Stroke line join.
   */
  strokeLinejoin?: 'miter' | 'round' | 'bevel';
  /**
   * Whether to animate this path. Overrides the animate prop on the Chart component.
   */
  animate?: boolean;
  /**
   * Custom clip path rect. If provided, this overrides the default chart rect for clipping.
   */
  clipRect?: Rect;
  /**
   * Explicit clip path override (Skia SkPath).
   * Pass undefined to explicitly disable clipping.
   */
  clipPath?: any;
  /**
   * The offset to add to the clip rect boundaries.
   */
  clipOffset?: number;
  /**
   * Transition configurations for different animation phases.
   * Allows separate control over enter and update animations.
   *
   * @example
   * // Fast update, slow enter
   * transitionConfigs={{
   *   enter: { type: 'spring', damping: 8, stiffness: 100 },
   *   update: { type: 'timing', duration: 300 }
   * }}
   *
   * @example
   * // Spring animation for all phases
   * transitionConfigs={{
   *   update: { type: 'spring', damping: 20, stiffness: 300 }
   * }}
   */
  transitionConfigs?: {
    /**
     * Transition used when the path first enters/mounts.
     */
    enter?: TransitionConfig;
    /**
     * Transition used when the path morphs to new data.
     */
    update?: TransitionConfig;
  };
};

const AnimatedPath = memo<Omit<PathProps, 'animate' | 'clipRect' | 'clipOffset' | 'clipPath'>>(
  ({
    d = '',
    initialPath,
    fill,
    fillOpacity,
    stroke,
    strokeOpacity,
    strokeWidth,
    strokeLinecap,
    strokeLinejoin,
    children,
    transitionConfigs,
  }) => {
    const isAnimatedValue = typeof d !== 'string';

    const animatedPath = usePathTransition({
      currentPath: isAnimatedValue ? d.value : d,
      initialPath,
      transitionConfigs,
    });

    const isFilled = fill !== undefined && fill !== 'none';
    const isStroked = stroke !== undefined && stroke !== 'none';

    const path = isAnimatedValue ? d : animatedPath;

    return (
      <>
        {isFilled && (
          <SkiaPath color={fill} opacity={fillOpacity} path={path} style="fill">
            {children}
          </SkiaPath>
        )}
        {isStroked && (
          <SkiaPath
            color={stroke}
            opacity={strokeOpacity}
            path={path}
            strokeCap={strokeLinecap}
            strokeJoin={strokeLinejoin}
            strokeWidth={strokeWidth}
            style="stroke"
          >
            {children}
          </SkiaPath>
        )}
      </>
    );
  },
);

export const Path = memo<PathProps>((props) => {
  const {
    animate: animateProp,
    clipRect,
    clipPath: clipPathProp,
    clipOffset = 0,
    d = '',
    initialPath,
    fill,
    fillOpacity,
    stroke,
    strokeOpacity,
    strokeWidth,
    strokeLinecap,
    strokeLinejoin,
    children,
    transitionConfigs,
  } = props;

  const context = useCartesianChartContext();
  const rect = clipRect ?? context.drawingArea;
  const animate = animateProp ?? context.animate;

  // Check if clipPath was explicitly provided (even if undefined)
  const hasExplicitClipPath = 'clipPath' in props;

  // The clip offset provides extra padding to prevent path from being cut off
  // Area charts typically use offset=0 for exact clipping, while lines use offset=2 for breathing room
  const totalOffset = clipOffset * 2; // Applied on both sides

  // Animation progress for clip path reveal
  const clipProgress = useSharedValue(animate ? 0 : 1);

  // Trigger clip path animation when component mounts and animate is true
  useEffect(() => {
    if (animate) {
      clipProgress.value = withTiming(1, { duration: 800 });
    }
  }, [animate, clipProgress]);

  // Create initial and target clip paths for animation
  const { initialClipPath, targetClipPath } = useMemo(() => {
    if (!rect) return { initialClipPath: null, targetClipPath: null };

    // Initial clip path (width = 0)
    const initial = Skia.Path.Make();
    initial.addRect({
      x: rect.x - clipOffset,
      y: rect.y - clipOffset,
      width: 0,
      height: rect.height + totalOffset,
    });

    // Target clip path (full width)
    const target = Skia.Path.Make();
    target.addRect({
      x: rect.x - clipOffset,
      y: rect.y - clipOffset,
      width: rect.width + totalOffset,
      height: rect.height + totalOffset,
    });

    return { initialClipPath: initial, targetClipPath: target };
  }, [rect, clipOffset, totalOffset]);

  // Use usePathInterpolation for animated clip path
  const animatedClipPath = usePathInterpolation(
    clipProgress,
    [0, 1],
    animate && initialClipPath && targetClipPath
      ? [initialClipPath, targetClipPath]
      : targetClipPath
        ? [targetClipPath, targetClipPath]
        : [Skia.Path.Make(), Skia.Path.Make()],
  );

  // Resolve the final clip path:
  // 1. If clipPath prop was explicitly provided, use it (even if undefined = no clipping)
  // 2. If animating, use the interpolated clip path
  // 3. Otherwise, use static target clip path
  const resolvedClipPath = useMemo(() => {
    // If clipPath was explicitly provided, use it directly
    if (hasExplicitClipPath) {
      return clipPathProp;
    }

    // If not animating or paths are null, return target clip path
    if (!animate || !targetClipPath) {
      return targetClipPath;
    }

    // Return null here since we'll use animatedClipPath directly
    return null;
  }, [hasExplicitClipPath, clipPathProp, animate, targetClipPath]);

  // Convert SVG path string to SkPath for static rendering
  const staticPath = useDerivedValue(() => {
    return Skia.Path.MakeFromSVGString(unwrapAnimatedValue(d)) ?? Skia.Path.Make();
  }, [d]);

  const isFilled = fill !== undefined && fill !== 'none';
  const isStroked = stroke !== undefined && stroke !== 'none';

  const content = !animate ? (
    <>
      {isFilled && (
        <SkiaPath color={fill} opacity={fillOpacity} path={staticPath} style="fill">
          {children}
        </SkiaPath>
      )}
      {isStroked && (
        <SkiaPath
          color={stroke}
          opacity={strokeOpacity}
          path={staticPath}
          strokeCap={strokeLinecap}
          strokeJoin={strokeLinejoin}
          strokeWidth={strokeWidth}
          style="stroke"
        >
          {children}
        </SkiaPath>
      )}
    </>
  ) : (
    <AnimatedPath
      d={d}
      fill={fill}
      fillOpacity={fillOpacity}
      initialPath={initialPath}
      stroke={stroke}
      strokeLinecap={strokeLinecap}
      strokeLinejoin={strokeLinejoin}
      strokeOpacity={strokeOpacity}
      strokeWidth={strokeWidth}
      transitionConfigs={transitionConfigs}
    >
      {children}
    </AnimatedPath>
  );

  // Determine which clip path to use
  const finalClipPath = animate && resolvedClipPath === null ? animatedClipPath : resolvedClipPath;

  // If finalClipPath is undefined, render without clipping
  if (finalClipPath === undefined) {
    return content;
  }

  // Don't render if finalClipPath is null (invalid state)
  if (finalClipPath === null) return null;

  return <Group clip={finalClipPath}>{content}</Group>;
});
