import { memo, useEffect, useMemo } from 'react';
import { useSharedValue } from 'react-native-reanimated';
import {
  Mask,
  Path as SkiaPath,
  Shader,
  Skia,
  type SkPath,
  usePathInterpolation,
  vec,
} from '@shopify/react-native-skia';

import { useTheme } from '../../../hooks/useTheme';
import { useCartesianChartContext } from '../ChartProvider';
import { Gradient } from '../gradient';
import { Path, type PathProps } from '../Path';
import { createGradient, getBaseline } from '../utils';
import { defaultPathEnterTransition } from '../utils/path';
import { buildTransition, getTransition } from '../utils/transition';

import type { AreaComponentProps } from './Area';

const getRectPath = (rect: { x: number; y: number; width: number; height: number }): SkPath => {
  const path = Skia.Path.Make();
  path.addRect(rect);
  return path;
};

/**
 * Repeating dot grid with soft edges for anti-aliasing, sampled as alpha for Mask.
 * @see https://shopify.github.io/react-native-skia/docs/shaders/overview
 */
const dotMaskShaderSource = `
uniform float2 origin;
uniform float patternSize;
uniform float dotSize;

half4 main(float2 xy) {
  float2 local = xy - origin;
  float2 cell = float2(mod(local.x, patternSize), mod(local.y, patternSize));
  float2 center = float2(patternSize * 0.5, patternSize * 0.5);
  float distanceFromCenter = distance(cell, center);

  float radius = max(dotSize, 0.0);
  float softness = min(0.12, radius);
  float edgeStart = max(radius - softness, 0.0);
  float edgeEnd = radius + softness;
  float alpha = 1.0 - smoothstep(edgeStart, edgeEnd, distanceFromCenter);

  return half4(half(alpha));
}
`;

export type DottedAreaProps = Pick<
  PathProps,
  | 'initialPath'
  | 'children'
  | 'stroke'
  | 'strokeOpacity'
  | 'strokeWidth'
  | 'strokeCap'
  | 'strokeJoin'
  | 'clipRect'
  | 'clipPath'
  | 'clipOffset'
> &
  AreaComponentProps & {
    /**
     * Size of the pattern unit (width and height).
     * @default 4
     */
    patternSize?: number;
    /**
     * Size of the dots within the pattern.
     * @default 1
     */
    dotSize?: number;
    /**
     * Opacity at the peak values (top/bottom of gradient).
     * @note only used when no gradient is provided
     * @default 1
     */
    peakOpacity?: number;
    /**
     * Opacity at the baseline (0 or edge closest to 0).
     * @note only used when no gradient is provided
     * @default 0
     */
    baselineOpacity?: number;
  };

/**
 * Dotted area using a Skia shader alpha mask over the series area path (same `d` as solid/gradient areas).
 */
export const DottedArea = memo<DottedAreaProps>(
  ({
    d,
    fill: fillProp,
    patternSize = 4,
    dotSize = 1,
    peakOpacity = 1,
    baselineOpacity = 0,
    baseline,
    xAxisId,
    yAxisId,
    gradient: gradientProp,
    animate: animateProp,
    transitions,
    transition,
    clipOffset = 0,
    clipRect,
    clipPath,
    ...pathProps
  }) => {
    const theme = useTheme();
    const { drawingArea, animate, layout, getXAxis, getYAxis, getXScale } =
      useCartesianChartContext();
    const dotMaskShader = useMemo(() => Skia.RuntimeEffect.Make(dotMaskShaderSource), []);

    const shouldAnimate = animateProp ?? animate;
    const isReady = !!getXScale();

    const enterTransition = useMemo(
      () => getTransition(transitions?.enter, shouldAnimate, defaultPathEnterTransition),
      [shouldAnimate, transitions?.enter],
    );

    const shouldAnimateMaskClip = shouldAnimate && enterTransition !== null;
    const totalOffset = clipOffset * 2;

    const rect = clipRect ?? drawingArea;

    const clipProgress = useSharedValue(shouldAnimateMaskClip ? 0 : 1);

    useEffect(() => {
      if (shouldAnimateMaskClip && isReady) {
        clipProgress.value = buildTransition(1, enterTransition);
      }
    }, [shouldAnimateMaskClip, isReady, clipProgress, enterTransition]);

    const { initialClipPath, targetClipPath } = useMemo(() => {
      if (!rect) return { initialClipPath: null, targetClipPath: null };

      const categoryAxisIsX = layout !== 'horizontal';
      const fullWidth = rect.width + totalOffset;
      const fullHeight = rect.height + totalOffset;
      const x = rect.x - clipOffset;
      const y = rect.y - clipOffset;

      const initialClipPath = getRectPath({
        x,
        y,
        width: categoryAxisIsX ? 0 : fullWidth,
        height: categoryAxisIsX ? fullHeight : 0,
      });

      const targetClipPath = getRectPath({
        x,
        y,
        width: fullWidth,
        height: fullHeight,
      });

      return { initialClipPath, targetClipPath };
    }, [rect, clipOffset, totalOffset, layout]);

    const animatedMaskClipPath = usePathInterpolation(
      clipProgress,
      [0, 1],
      shouldAnimateMaskClip && initialClipPath && targetClipPath
        ? [initialClipPath, targetClipPath]
        : targetClipPath
          ? [targetClipPath, targetClipPath]
          : [Skia.Path.Make(), Skia.Path.Make()],
    );

    const valueAxisConfig = layout !== 'horizontal' ? getYAxis(yAxisId) : getXAxis(xAxisId);
    const gradientAxis = layout !== 'horizontal' ? 'y' : 'x';

    const fill = useMemo(
      () => fillProp ?? theme.color.fgPrimary,
      [fillProp, theme.color.fgPrimary],
    );

    const gradient = useMemo(() => {
      if (gradientProp) return gradientProp;
      if (!valueAxisConfig) return;

      const baselineValue = getBaseline(valueAxisConfig.domain, baseline);
      return createGradient(
        valueAxisConfig.domain,
        baselineValue,
        fill,
        peakOpacity,
        baselineOpacity,
        gradientAxis,
      );
    }, [gradientProp, valueAxisConfig, fill, baseline, peakOpacity, baselineOpacity, gradientAxis]);

    const shaderUniforms = useMemo(
      () => ({
        origin: vec(drawingArea?.x ?? 0, drawingArea?.y ?? 0),
        patternSize,
        dotSize,
      }),
      [drawingArea?.x, drawingArea?.y, patternSize, dotSize],
    );

    if (!dotMaskShader || !drawingArea) return null;

    return (
      <Mask
        mask={
          <SkiaPath path={animatedMaskClipPath} style="fill">
            <Shader source={dotMaskShader} uniforms={shaderUniforms} />
          </SkiaPath>
        }
        mode="alpha"
      >
        <Path
          animate={shouldAnimate}
          clipOffset={clipOffset}
          clipPath={clipPath}
          clipRect={clipRect}
          d={d}
          fill={fill}
          transition={transition}
          transitions={transitions}
          {...pathProps}
        >
          {gradient && <Gradient gradient={gradient} xAxisId={xAxisId} yAxisId={yAxisId} />}
        </Path>
      </Mask>
    );
  },
);
