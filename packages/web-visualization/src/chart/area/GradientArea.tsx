import { memo, useId, useMemo } from 'react';

import { useCartesianChartContext } from '../ChartProvider';
import { Gradient as GradientDef } from '../gradient';
import { Path, type PathProps } from '../Path';
import { getGradientScale, type Gradient, processGradient } from '../utils';

import type { AreaComponentProps } from './Area';

export type GradientAreaProps = Omit<PathProps, 'd' | 'fill' | 'fillOpacity'> &
  AreaComponentProps & {
    /**
     * The color at peak values (top/bottom of gradient).
     * @default fill or 'var(--color-fgPrimary)'
     */
    peakColor?: string;
    /**
     * The color at the baseline (0 or edge closest to 0).
     * @default peakColor or fill
     */
    baselineColor?: string;
    /**
     * Opacity at peak values.
     * @default 0.3
     */
    peakOpacity?: number;
    /**
     * Opacity at the baseline.
     * @default 0
     */
    baselineOpacity?: number;
    /**
     * Color gradient configuration.
     * When provided, overrides peakColor/baselineColor and creates a gradient-based gradient.
     * When not provided, creates an automatic diverging gradient around the baseline.
     */
    gradient?: Gradient;
    /**
     * Series ID - used to retrieve gradient from series if not provided directly.
     */
    seriesId?: string;
  };

/**
 * A customizable gradient area component which uses Path with SVG linearGradient.
 *
 * When no gradient is provided, automatically creates an appropriate gradient:
 * - For data crossing zero: Creates a diverging gradient with peak opacity at both extremes
 *   and baseline opacity at zero (or the specified baseline).
 * - For all-positive or all-negative data: Creates a simple gradient from baseline to peak.
 */
export const GradientArea = memo<GradientAreaProps>(
  ({
    d,
    fill = 'var(--color-fgPrimary)',
    fillOpacity = 1,
    peakColor,
    baselineColor,
    peakOpacity = 0.3,
    baselineOpacity = 0,
    baseline,
    yAxisId,
    gradient: gradientProp,
    seriesId,
    ...pathProps
  }) => {
    const context = useCartesianChartContext();
    const patternId = useId();

    // Get gradient from series if seriesId is provided and gradient is not
    const targetSeries = seriesId ? context.getSeries(seriesId) : undefined;
    const seriesGradient = targetSeries?.gradient;

    // Get scales and drawing area
    const xScale = context.getXScale();
    const yScale = context.getYScale(yAxisId);
    const yRange = yScale?.range();
    const yDomain = yScale?.domain();
    const drawingArea = context.drawingArea;

    // Calculate gradient configuration from gradient or create default
    const gradientConfig = useMemo(() => {
      // Use explicit gradient prop, or fall back to series gradient, or create default
      let effectiveGradient: Gradient | undefined = gradientProp ?? seriesGradient;

      console.log('[GradientArea] Starting gradient config', {
        seriesId,
        hasGradientProp: !!gradientProp,
        hasSeriesGradient: !!seriesGradient,
        hasYScale: !!yScale,
        yDomain,
      });

      if (!effectiveGradient && yScale && yDomain) {
        // Create default diverging gradient around baseline
        const [minValue, maxValue] = yDomain;

        let shouldDiverge = false;
        let baselineValue = 0;

        if (minValue >= 0) {
          // All positive: simple gradient from bottom
          baselineValue = minValue;
        } else if (maxValue <= 0) {
          // All negative: simple gradient from top
          baselineValue = maxValue;
        } else {
          // Crosses zero: use diverging gradient
          shouldDiverge = true;
          baselineValue = baseline ?? 0;
        }

        const effectivePeakColor = peakColor ?? fill;
        const effectiveBaselineColor = baselineColor ?? fill;

        // Create default gradient using gradient
        if (shouldDiverge) {
          effectiveGradient = {
            axis: 'y',
            stops: [
              { offset: minValue, color: effectivePeakColor, opacity: peakOpacity },
              { offset: baselineValue, color: effectiveBaselineColor, opacity: baselineOpacity },
              { offset: maxValue, color: effectivePeakColor, opacity: peakOpacity },
            ],
          };
        } else {
          // Simple gradient from baseline to peak
          effectiveGradient = {
            axis: 'y',
            stops: [
              { offset: baselineValue, color: effectiveBaselineColor, opacity: baselineOpacity },
              {
                offset: minValue >= 0 ? maxValue : minValue,
                color: effectivePeakColor,
                opacity: peakOpacity,
              },
            ],
          };
        }

        console.log('[GradientArea] Created default gradient', {
          seriesId,
          shouldDiverge,
          baselineValue,
          effectiveGradient,
        });
      }

      if (!effectiveGradient) {
        console.warn('[GradientArea] No effective gradient', { seriesId });
        return null;
      }

      console.log('[GradientArea] Processing gradient', {
        seriesId,
        gradient: effectiveGradient,
        hasXScale: !!xScale,
        hasYScale: !!yScale,
      });

      const scale = getGradientScale(effectiveGradient, xScale, yScale);
      if (!scale) {
        console.warn('[GradientArea] Gradient requires a valid numeric or categorical scale', {
          seriesId,
          gradient: effectiveGradient,
        });
        return null;
      }

      console.log('[GradientArea] Gradient scale obtained', {
        seriesId,
        scaleDomain: scale.domain(),
        scaleRange: scale.range(),
      });

      const processed = processGradient(effectiveGradient, scale);
      if (!processed) {
        console.warn('[GradientArea] Failed to process gradient', { seriesId });
        return null;
      }

      console.log('[GradientArea] Gradient processed successfully', {
        seriesId,
        config: processed,
      });

      return processed;
    }, [
      gradientProp,
      seriesGradient,
      yScale,
      yDomain,
      baseline,
      peakColor,
      baselineColor,
      peakOpacity,
      baselineOpacity,
      fill,
      xScale,
      seriesId,
    ]);

    // Determine gradient direction - always vertical for areas
    const gradientDirection = 'vertical';

    if (!gradientConfig) {
      // Fallback to simple solid fill if no gradient config
      return <Path d={d} fill={fill} fillOpacity={fillOpacity} {...pathProps} />;
    }

    return (
      <>
        <defs>
          <GradientDef
            config={gradientConfig}
            direction={gradientDirection}
            drawingArea={drawingArea}
            id={patternId}
          />
        </defs>
        <Path d={d} fill={`url(#${patternId})`} fillOpacity={fillOpacity} {...pathProps} />
      </>
    );
  },
);
