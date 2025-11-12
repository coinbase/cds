import { memo, useEffect, useMemo } from 'react';
import { useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';
import type { Rect, SharedProps } from '@coinbase/cds-common/types';
import {
  type AnimatedProp,
  Group,
  Path as SkiaPath,
  type PathProps as SkiaPathProps,
  Skia,
  usePathInterpolation,
} from '@shopify/react-native-skia';

import type { Transition } from './utils/transition';
import { usePathTransition } from './utils/transition';
import { useCartesianChartContext } from './ChartProvider';
import { unwrapAnimatedValue } from './utils';

export type PathProps = SharedProps &
  Pick<
    SkiaPathProps,
    | 'antiAlias'
    | 'blendMode'
    | 'children'
    | 'dither'
    | 'invertClip'
    | 'origin'
    | 'matrix'
    | 'strokeCap'
    | 'strokeJoin'
    | 'strokeMiter'
    | 'strokeWidth'
    | 'style'
    | 'transform'
  > & {
    /**
     * Whether to animate this path. Overrides the animate prop on the Chart component.
     */
    animate?: boolean;
    /**
     * The SVG path data string.
     */
    d?: AnimatedProp<string | undefined>;
    /**
     * Initial path for enter animation.
     * When provided, the first animation will go from initialPath to d.
     * If not provided, defaults to d (no enter animation).
     */
    initialPath?: string;
    /**
     * Fill color for the path.
     * When provided, will render a fill with the given color.
     * If not provided, will not render a fill.
     */
    fill?: string;
    /**
     * Opacity for the path fill.
     */
    fillOpacity?: number;
    /**
     * Stroke color for the path.
     * When provided, will render a fill with the given color.
     * If not provided, will not render a fill.
     */
    stroke?: string;
    /**
     * Opacity for the path stroke.
     */
    strokeOpacity?: number;
    /**
     * Custom clip path rect. If provided, this overrides the default chart rect for clipping.
     * Will be overridden by clipPath if set.
     */
    clipRect?: Rect;
    /**
     * Custom clip path.
     * When set, overrides clipRect.
     * @note pass undefined to disable clipping.
     */
    clipPath?: string | undefined;
    /**
     * The offset to add to the clip rect boundaries.
     */
    clipOffset?: number;
    /**
     * Animation transition
     *
     * @example
     * // Duration based
     * transition={{ type: 'timing', duration: 300 }}
     *
     * @example
     * // Spring based
     * transition={{ type: 'spring', damping: 20, stiffness: 300 }}
     */
    transition?: Transition;
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
    strokeCap,
    strokeJoin,
    children,
    transition,
    ...pathProps
  }) => {
    const isDAnimated = typeof d !== 'string';

    const animatedPath = usePathTransition({
      currentPath: isDAnimated ? (d.value ?? '') : d,
      initialPath,
      transition,
    });

    const isFilled = fill !== undefined && fill !== 'none';
    const isStroked = stroke !== undefined && stroke !== 'none';

    const activePath = useDerivedValue(() => {
      if (isDAnimated) {
        return d.value ?? Skia.Path.Make();
      }
      return animatedPath.value;
    });

    return (
      <>
        {isFilled && (
          <SkiaPath
            color={fill}
            opacity={fillOpacity}
            path={activePath}
            style="fill"
            {...pathProps}
          >
            {children}
          </SkiaPath>
        )}
        {isStroked && (
          <SkiaPath
            color={stroke}
            opacity={strokeOpacity}
            path={activePath}
            strokeCap={strokeCap}
            strokeJoin={strokeJoin}
            strokeWidth={strokeWidth}
            style="stroke"
            {...pathProps}
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
    strokeCap,
    strokeJoin,
    children,
    transition,
    ...pathProps
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
    const dValue = unwrapAnimatedValue(d);
    if (!dValue) return Skia.Path.Make();
    return Skia.Path.MakeFromSVGString(dValue) ?? Skia.Path.Make();
  }, [d]);

  const isFilled = fill !== undefined && fill !== 'none';
  const isStroked = stroke !== undefined && stroke !== 'none';

  const content = !animate ? (
    <>
      {isFilled && (
        <SkiaPath color={fill} opacity={fillOpacity} path={staticPath} style="fill" {...pathProps}>
          {children}
        </SkiaPath>
      )}
      {isStroked && (
        <SkiaPath
          color={stroke}
          opacity={strokeOpacity}
          path={staticPath}
          strokeCap={strokeCap}
          strokeJoin={strokeJoin}
          strokeWidth={strokeWidth}
          style="stroke"
          {...pathProps}
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
      strokeCap={strokeCap}
      strokeJoin={strokeJoin}
      strokeOpacity={strokeOpacity}
      strokeWidth={strokeWidth}
      transition={transition}
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
