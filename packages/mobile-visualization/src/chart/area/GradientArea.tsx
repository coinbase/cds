import { memo, useMemo } from 'react';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';
import { LinearGradient, Path as SkiaPath } from '@shopify/react-native-skia';

import { useCartesianChartContext } from '../ChartProvider';
import { type PathProps } from '../Path';
import {
  defaultTransition,
  type TransitionConfig,
  useTransitionAnimation,
} from '../utils/animation';
import { applyOpacityToColor, getGradientConfig, type Gradient } from '../utils/gradient';

import type { AreaComponentProps } from './Area';

export type GradientAreaProps = Omit<PathProps, 'd' | 'fill' | 'fillOpacity'> &
  AreaComponentProps & {
    /**
     * Color gradient configuration.
     * Supports smooth gradient transitions.
     * @example
     * gradient={{
     *   stops: [
     *     { offset: 0, color: 'green', opacity: 0.4 },
     *     { offset: 100, color: 'green', opacity: 0 }
     *   ]
     * }}
     */
    gradient?: Gradient;
    /**
     * Transition configuration for area transitions.
     * Allows customization of animation type, timing, and springs.
     *
     * @example
     * // Spring animation
     * transitionConfig={{ type: 'spring', damping: 10, stiffness: 100 }}
     *
     * @example
     * // Timing animation
     * transitionConfig={{ type: 'timing', duration: 500 }}
     */
    transitionConfig?: TransitionConfig;
  };

/**
 * A customizable gradient area component which uses Path with Skia linear gradient shader.
 *
 * When no gradient is provided, automatically creates an appropriate gradient:
 * - For data crossing zero: Creates a diverging gradient with peak opacity at both extremes
 *   and baseline opacity at zero (or the specified baseline).
 * - For all-positive or all-negative data: Creates a simple gradient from baseline to peak.
 */
export const GradientArea = memo<GradientAreaProps>(
  ({
    d,
    fill: fillProp,
    fillOpacity = 1,
    gradient: gradientProp,
    seriesId,
    baseline,
    yAxisId,
    clipRect,
    animate: animateProp,
    transitionConfig = defaultTransition,
    ...pathProps
  }) => {
    const context = useCartesianChartContext();
    const theme = useTheme();

    const fill = fillProp ?? theme.color.fgPrimary;

    // Use prop value if provided, otherwise fall back to context
    const shouldAnimate = animateProp ?? context.animate;

    const currentPath = d ?? '';

    const yScaleConfig = context.getYAxis(yAxisId);

    const gradient = useMemo((): Gradient | undefined => {
      if (gradientProp) return gradientProp;
      if (!yScaleConfig) return;

      const { min, max } = yScaleConfig.domain;
      const baselineValue = min >= 0 ? min : max <= 0 ? max : (baseline ?? 0);

      // Diverging gradient (data crosses zero)
      if (min < 0 && max > 0) {
        return {
          axis: 'y',
          stops: [
            { offset: min, color: fill, opacity: 0.4 },
            { offset: baselineValue, color: fill, opacity: 0 },
            { offset: max, color: fill, opacity: 0.4 },
          ],
        };
      }

      // Simple gradient (all positive or all negative)
      const peakValue = min >= 0 ? max : min;
      return {
        axis: 'y',
        stops:
          max <= 0
            ? [
                { offset: peakValue, color: fill, opacity: 0.4 },
                { offset: baselineValue, color: fill, opacity: 0 },
              ]
            : [
                { offset: baselineValue, color: fill, opacity: 0 },
                { offset: peakValue, color: fill, opacity: 0.4 },
              ],
      };
    }, [gradientProp, yScaleConfig, fill, baseline]);

    const xScale = context.getXScale();
    const yScale = context.getYScale(yAxisId);

    const gradientConfig = useMemo(() => {
      if (!gradient || !xScale || !yScale) return;

      const config = getGradientConfig(gradient, xScale, yScale);
      if (!config) return;

      if (fillOpacity < 1) {
        return {
          ...config,
          colors: config.colors.map((color: string) => applyOpacityToColor(color, fillOpacity)),
        };
      }

      return config;
    }, [gradient, xScale, yScale, fillOpacity]);

    const path = useTransitionAnimation({
      currentPath,
      animate: shouldAnimate,
      transitionConfig,
    });

    if (!gradientConfig) return null;

    return (
      <SkiaPath color={fill} path={path} style="fill">
        <LinearGradient
          colors={gradientConfig.colors}
          end={gradientConfig.end}
          mode="clamp"
          positions={gradientConfig.positions}
          start={gradientConfig.start}
        />
      </SkiaPath>
    );
  },
);
