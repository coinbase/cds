import { memo, useId, useMemo } from 'react';

import { useCartesianChartContext } from '../ChartProvider';
import { Gradient as GradientDef } from '../gradient';
import { Path, type PathProps } from '../Path';
import { getGradientScale, processGradient } from '../utils';

import type { AreaComponentProps } from './Area';

export type SolidAreaProps = Omit<PathProps, 'd' | 'fill' | 'fillOpacity'> & AreaComponentProps;

/**
 * A customizable solid area component which uses Path.
 * When a gradient is provided, renders with gradient fill.
 * Otherwise, renders with solid fill (no automatic fade).
 */
export const SolidArea = memo<SolidAreaProps>(
  ({
    d,
    fill = 'var(--color-fgPrimary)',
    fillOpacity = 1,
    yAxisId,
    baseline,
    gradient,
    seriesId,
    ...props
  }) => {
    const context = useCartesianChartContext();
    const patternId = useId();

    // Get gradient from series if seriesId is provided and gradient is not
    const targetSeries = seriesId ? context.getSeries(seriesId) : undefined;
    const seriesGradient = targetSeries?.gradient;
    const effectiveGradient = gradient ?? seriesGradient;

    // Get scales and drawing area
    const xScale = context.getXScale();
    const yScale = context.getYScale(yAxisId);
    const drawingArea = context.drawingArea;

    // Process gradient if provided
    const gradientConfig = useMemo(() => {
      if (!effectiveGradient) return null;

      const scale = getGradientScale(effectiveGradient, xScale, yScale);
      if (!scale) return null;

      return processGradient(effectiveGradient, scale);
    }, [effectiveGradient, xScale, yScale]);

    // If no gradient, render solid
    if (!gradientConfig) {
      return <Path d={d} fill={fill} fillOpacity={fillOpacity} {...props} />;
    }

    // Determine gradient direction based on gradient axis
    const gradientAxis = effectiveGradient?.axis ?? 'y';
    const gradientDirection = gradientAxis === 'x' ? 'horizontal' : 'vertical';

    // Render with gradient
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
        <Path d={d} fill={`url(#${patternId})`} fillOpacity={fillOpacity} {...props} />
      </>
    );
  },
);
