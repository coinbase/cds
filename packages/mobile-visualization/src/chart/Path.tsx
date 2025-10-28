import { memo, type ReactNode, useEffect, useMemo } from 'react';
import {
  type SharedValue,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import type { Rect as RectType, SharedProps } from '@coinbase/cds-common/types';
import {
  type Color,
  DashPathEffect,
  Group,
  Path as SkiaPath,
  Rect as SkiaRect,
  Skia,
  type SkShader,
} from '@shopify/react-native-skia';

import { svgPathToSkiaPath } from './utils/skia';
import { useCartesianChartContext } from './ChartProvider';

/**
 * Parses an SVG strokeDasharray string into a number array for Skia.
 * Examples:
 * - "5 5" -> [5, 5]
 * - "0 4" -> [0, 4] (dots with round caps)
 * - "10 5 2 5" -> [10, 5, 2, 5] (dash-dot pattern)
 */
const parseDashArray = (dashArray?: string): number[] | undefined => {
  if (!dashArray) return undefined;
  const values = dashArray
    .trim()
    .split(/[\s,]+/)
    .map(Number)
    .filter((n) => !isNaN(n));
  return values.length > 0 ? values : undefined;
};

export type PathBaseProps = SharedProps & {
  /**
   * The SVG path data string (can be animated using SharedValue)
   */
  d?: string | SharedValue<string>;
  /**
   * Children for declarative shaders (e.g., LinearGradient)
   */
  children?: ReactNode;
  /**
   * Path fill color
   */
  fill?: string;
  /**
   * Path stroke color (also accepts 'color' for compatibility)
   */
  stroke?: string;
  /**
   * Alternative to 'stroke' - path color
   */
  color?: Color;
  /**
   * Path stroke width
   */
  strokeWidth?: number;
  /**
   * Path stroke opacity
   */
  strokeOpacity?: number;
  /**
   * Path fill opacity (also accepts 'opacity' for compatibility)
   */
  fillOpacity?: number;
  /**
   * Alternative to fillOpacity - general opacity
   */
  opacity?: number;
  /**
   * Custom clip path rect. If provided, this overrides the default chart rect for clipping.
   */
  clipRect?: RectType;
  /**
   * Explicit clip path override (Skia SkPath).
   * If provided, this takes precedence over clipRect/clipOffset generation.
   * Pass undefined to explicitly disable clipping.
   * If not provided at all, defaults to generating clip path from clipRect/clipOffset.
   */
  clipPath?: any | null; // SkPath type from Skia, or undefined/null
  /**
   * Stroke dash array for dashed lines
   */
  strokeDasharray?: string;
  /**
   * Whether to animate the path.
   * Overrides the animate prop on the Chart component.
   */
  animate?: boolean;
  /**
   * The offset to add to the clip rect boundaries.
   * Ignored if clipPath is explicitly provided.
   */
  clipOffset?: number;
  /**
   * Stroke line cap
   * @default 'butt'
   */
  strokeCap?: 'butt' | 'round' | 'square';
  /**
   * Stroke line join
   * @default 'miter'
   */
  strokeJoin?: 'miter' | 'round' | 'bevel';
  /**
   * @deprecated Use strokeCap instead. Provided for backwards compatibility.
   */
  strokeLinecap?: 'butt' | 'round' | 'square';
  /**
   * @deprecated Use strokeJoin instead. Provided for backwards compatibility.
   */
  strokeLinejoin?: 'miter' | 'round' | 'bevel';
  /**
   * @deprecated SVG-specific prop, ignored in Skia. Provided for backwards compatibility.
   */
  vectorEffect?: string;
  /**
   * @deprecated SVG-specific prop, ignored in Skia. Provided for backwards compatibility.
   */
  mask?: string;
  /**
   * Skia shader for gradient or pattern fills/strokes
   */
  shader?: SkShader;
};

export type PathProps = PathBaseProps;

export const Path = memo<PathProps>((props) => {
  const {
    clipRect,
    clipPath: clipPathProp,
    clipOffset,
    d = '',
    fill,
    stroke,
    color,
    strokeWidth,
    strokeOpacity,
    fillOpacity,
    opacity,
    strokeDasharray,
    strokeCap,
    strokeJoin,
    strokeLinecap,
    strokeLinejoin,
    vectorEffect, // Ignored - SVG-specific
    mask, // Ignored - SVG-specific
    shader,
    children,
    testID,
    animate: animateProp,
  } = props;

  // Map deprecated props to new props for backwards compatibility
  const resolvedStrokeCap = strokeCap ?? strokeLinecap ?? 'butt';
  const resolvedStrokeJoin = strokeJoin ?? strokeLinejoin ?? 'miter';
  const { animate: animateContext, drawingArea: contextRect } = useCartesianChartContext();
  const rect = clipRect ?? contextRect;
  const animate = animateProp ?? animateContext;

  // Check if clipPath was explicitly provided (even if undefined)
  // We check 'clipPath' in props, not the value, because clipPath={undefined} is valid
  const hasExplicitClipPath = 'clipPath' in props;

  // Animated progress for path trimming (Skia's native animation)
  const animationProgress = useSharedValue(animate ? 0 : 1);

  // Check if d is a SharedValue or a plain string
  const isAnimatedPath = typeof d === 'object' && d !== null && 'value' in d;

  // Convert SVG path string to Skia path
  // If d is animated, convert it in a derived value (worklet)
  const skiaPath = useDerivedValue(() => {
    'worklet';
    const pathString = isAnimatedPath ? (d as SharedValue<string>).value : (d as string);
    const path = svgPathToSkiaPath(pathString || '');
    // Return a default empty path if null to satisfy Skia's type requirements
    return path ?? Skia.Path.Make();
  }, [d, isAnimatedPath]);

  // The clip offset provides extra padding to prevent path from being cut off
  // Area charts typically use offset=0 for exact clipping, while lines use offset=2 for breathing room
  const totalOffset = (clipOffset ?? 0) * 2; // Applied on both sides

  // Resolve the final clip path:
  // 1. If clipPath prop was explicitly provided, use it (even if undefined = no clipping)
  // 2. Otherwise, generate clip path from clipRect/clipOffset
  const resolvedClipPath = useMemo(() => {
    // If clipPath was explicitly provided (like on web with clipPath={undefined}), use it directly
    if (hasExplicitClipPath) {
      return clipPathProp; // Can be an SkPath or undefined (no clipping)
    }

    // Otherwise, generate clip path from rect and offset (default behavior)
    if (!rect) return null; // null means render nothing (invalid state)

    const generatedClipPath = Skia.Path.Make();
    generatedClipPath.addRect({
      x: rect.x - (clipOffset ?? 0),
      y: rect.y - (clipOffset ?? 0),
      width: rect.width + totalOffset,
      height: rect.height + totalOffset,
    });
    return generatedClipPath;
  }, [hasExplicitClipPath, clipPathProp, rect, clipOffset, totalOffset]);

  // Parse dash array for dashed/dotted lines
  const dashIntervals = useMemo(() => parseDashArray(strokeDasharray), [strokeDasharray]);

  // Trigger animation when path changes
  useEffect(() => {
    if (!animate) {
      animationProgress.value = 1;
      return;
    }

    // Animate from 0 to 1 for path reveal
    animationProgress.value = 0;
    animationProgress.value = withTiming(1, {
      duration: 200,
    });
  }, [animate, animationProgress, d]);

  // Don't render if resolvedClipPath is null (invalid state, not enough info to render)
  if (resolvedClipPath === null) {
    return null;
  }

  // Determine if we should use children (declarative gradients) or traditional fill/stroke
  const hasDeclarativeShader = children !== undefined && children !== null;

  // Determine rendering style
  // Note: Children can be used for both fill and stroke gradients, so we check the fill prop explicitly
  const isFilled = fill !== undefined && fill !== 'none';
  const isStroked = (stroke !== undefined && stroke !== 'none') || color !== undefined;

  // Resolve color (stroke or color prop)
  const pathColor = (stroke ?? color) as Color | undefined;

  // Resolve opacity
  const resolvedOpacity = strokeOpacity ?? fillOpacity ?? opacity;

  // Render content with or without clipping based on clipPath
  const content = (
    <>
      {/* Render filled path with declarative shader (children) */}
      {isFilled && hasDeclarativeShader && (
        <SkiaPath
          end={animationProgress}
          opacity={fillOpacity ?? opacity}
          path={skiaPath}
          style="fill"
        >
          {children}
        </SkiaPath>
      )}

      {/* Render filled path with solid color */}
      {isFilled && !hasDeclarativeShader && !shader && (
        <SkiaPath
          color={fill as Color}
          end={animationProgress}
          opacity={fillOpacity ?? opacity}
          path={skiaPath}
          style="fill"
        />
      )}

      {/* Render filled path with imperative shader */}
      {isFilled && !hasDeclarativeShader && shader && (
        <SkiaPath
          color={shader as any}
          end={animationProgress}
          opacity={fillOpacity ?? opacity}
          path={skiaPath}
          style="fill"
        />
      )}

      {/* Render stroked path with declarative shader (children) */}
      {isStroked && hasDeclarativeShader && (
        <SkiaPath
          end={animationProgress}
          opacity={resolvedOpacity}
          path={skiaPath}
          strokeCap={resolvedStrokeCap}
          strokeJoin={resolvedStrokeJoin}
          strokeWidth={strokeWidth}
          style="stroke"
        >
          {dashIntervals && <DashPathEffect intervals={dashIntervals} />}
          {children}
        </SkiaPath>
      )}

      {/* Render stroked path with solid color */}
      {isStroked && !hasDeclarativeShader && !shader && (
        <SkiaPath
          color={pathColor}
          end={animationProgress}
          opacity={resolvedOpacity}
          path={skiaPath}
          strokeCap={resolvedStrokeCap}
          strokeJoin={resolvedStrokeJoin}
          strokeWidth={strokeWidth}
          style="stroke"
        >
          {dashIntervals && <DashPathEffect intervals={dashIntervals} />}
        </SkiaPath>
      )}

      {/* Render stroked path with imperative shader */}
      {isStroked && !hasDeclarativeShader && shader && (
        <SkiaPath
          color={shader as any}
          end={animationProgress}
          opacity={resolvedOpacity}
          path={skiaPath}
          strokeCap={resolvedStrokeCap}
          strokeJoin={resolvedStrokeJoin}
          strokeWidth={strokeWidth}
          style="stroke"
        >
          {dashIntervals && <DashPathEffect intervals={dashIntervals} />}
        </SkiaPath>
      )}
    </>
  );

  // If resolvedClipPath is undefined, render without clipping (for elements that extend outside drawing area like tick marks)
  // If resolvedClipPath exists, wrap in Group with clipping
  if (resolvedClipPath === undefined) {
    return content;
  }

  return <Group clip={resolvedClipPath}>{content}</Group>;
});
