import { memo, useMemo } from 'react';
import { LinearGradient, Skia, vec } from '@shopify/react-native-skia';

import { useCartesianChartContext } from '../ChartProvider';
import type { GradientDefinition } from '../utils';
import { getGradientConfig } from '../utils/gradient';

export type GradientProps = {
  /**
   * Gradient definition with stops, axis, and other configuration.
   */
  gradient: GradientDefinition;
  /**
   * Y-axis ID to use for gradient processing.
   * When provided, the gradient will align with the specified y-axis range.
   * This ensures gradients work correctly when the axis has a custom range configuration.
   */
  yAxisId?: string;
};

/**
 * Interpolates between two colors using linear interpolation.
 * Returns an rgba string.
 */
const interpolateColor = (color1: string, opacity: number): string => {
  const c = Skia.Color(color1);
  return `rgba(${c[0] * 255}, ${c[1] * 255}, ${c[2] * 255}, ${opacity})`;
};

/**
 * Renders a Skia LinearGradient element based on a GradientDefinition.
 * The gradient should be used as a child of a Path component.
 *
 * @example
 * <Path d={pathString} stroke="red">
 *   {gradient && <Gradient gradient={gradient} yAxisId={yAxisId} />}
 * </Path>
 */
export const Gradient = memo<GradientProps>(({ gradient, yAxisId }) => {
  const context = useCartesianChartContext();

  const xScale = context.getXScale();
  const yScale = context.getYScale(yAxisId);

  // Process gradient definition into stops
  const stops = useMemo(() => {
    if (!xScale || !yScale) return;
    return getGradientConfig(gradient, xScale, yScale);
  }, [gradient, xScale, yScale]);

  // If gradient processing failed, don't render
  if (!stops) return null;

  const axis = gradient.axis ?? 'y';

  // Get the appropriate scale based on axis
  const scale = axis === 'x' ? xScale : yScale;
  if (!scale) return null;

  const range = scale.range();

  // Determine gradient direction based on axis
  // For y-axis, we need to flip the gradient direction because y-scales are inverted
  // (higher data values have smaller pixel values, appearing at the top)
  const start = axis === 'x' ? vec(range[0], 0) : vec(0, range[0]);
  const end = axis === 'x' ? vec(range[1], 0) : vec(0, range[1]);

  // Extract colors and positions for LinearGradient
  const colors = stops.map((s) => interpolateColor(s.color, s.opacity ?? 1));
  const positions = stops.map((s) => s.offset);

  return <LinearGradient colors={colors} end={end} positions={positions} start={start} />;
});
