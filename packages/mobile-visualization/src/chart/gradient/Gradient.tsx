import { memo, useMemo } from 'react';
import { LinearGradient, vec } from '@shopify/react-native-skia';

import { useCartesianChartContext } from '../ChartProvider';
import type { GradientDefinition } from '../utils';
import { getColorWithOpacity, getGradientConfig } from '../utils/gradient';

export type GradientBaseProps = {
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

export type GradientProps = GradientBaseProps;

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

  const axis = gradient.axis ?? 'y';
  const scale = axis === 'x' ? xScale : yScale;

  // Process gradient definition into stops
  const stops = useMemo(() => {
    if (!xScale || !yScale) return;
    return getGradientConfig(gradient, xScale, yScale);
  }, [gradient, xScale, yScale]);

  if (!stops || !scale) return;

  const range = scale.range();

  // Determine gradient direction based on axis
  // For y-axis, we need to flip the gradient direction because y-scales are inverted
  // (higher data values have smaller pixel values, appearing at the top)
  const start = axis === 'x' ? vec(range[0], 0) : vec(0, range[0]);
  const end = axis === 'x' ? vec(range[1], 0) : vec(0, range[1]);

  // Extract colors and positions for LinearGradient
  const colors = stops.map((s) => getColorWithOpacity(s.color, s.opacity ?? 1));
  const positions = stops.map((s) => s.offset);

  return <LinearGradient colors={colors} end={end} positions={positions} start={start} />;
});
