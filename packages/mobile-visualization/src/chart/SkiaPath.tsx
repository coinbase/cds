import { memo, useMemo } from 'react';
import type { SharedProps } from '@coinbase/cds-common/types';
import { Path as SkiaPathComponent, Skia } from '@shopify/react-native-skia';

import { useCartesianChartContext } from './ChartProvider';

export type SkiaPathProps = SharedProps & {
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
   * Stroke dash array for dashed lines
   */
  strokeDasharray?: string;
  /**
   * Stroke line cap
   */
  strokeLinecap?: 'butt' | 'round' | 'square';
  /**
   * Stroke line join
   */
  strokeLinejoin?: 'miter' | 'round' | 'bevel';
  /**
   * Whether to animate the path.
   * Overrides the animate prop on the Chart component.
   */
  animate?: boolean;
};

/**
 * SkiaPath - A Skia-powered path component for charts
 *
 * Key differences from react-native-svg Path:
 * 1. Uses Skia's Canvas API instead of SVG
 * 2. Better performance for complex paths
 * 3. Different animation approach using Skia's animation system
 * 4. No need for ClipPath - use clip prop directly
 *
 * Example usage:
 * ```tsx
 * <SkiaPath
 *   d={pathData}
 *   stroke={theme.color.bgLine}
 *   strokeWidth={2}
 *   fill="none"
 * />
 * ```
 *
 * Migration notes:
 * - Skia uses native performance optimizations
 * - Path data format is the same as SVG
 * - Colors must be valid CSS color strings or hex values
 * - Opacity is handled differently (use alpha channel in color or separate opacity prop)
 */
export const SkiaPath = memo<SkiaPathProps>(
  ({
    d = '',
    fill = 'none',
    stroke,
    strokeWidth = 2,
    strokeOpacity = 1,
    fillOpacity = 1,
    strokeDasharray,
    strokeLinecap = 'round',
    strokeLinejoin = 'round',
    testID,
  }) => {
    // Create Skia path from SVG path string
    const path = useMemo(() => {
      if (!d) return null;
      return Skia.Path.MakeFromSVGString(d);
    }, [d]);

    if (!path || !d) return null;

    // Parse dash array if provided
    const dashArray = useMemo(() => {
      if (!strokeDasharray) return undefined;
      return strokeDasharray.split(',').map((v) => parseFloat(v.trim()));
    }, [strokeDasharray]);

    // Convert opacity to alpha channel
    const strokeColor = useMemo(() => {
      if (!stroke) return undefined;
      // If color includes opacity already, use it as-is
      if (strokeOpacity === 1) return stroke;
      // Convert hex/rgb to rgba with opacity
      // This is a simple implementation - you may want to use a color library
      return stroke;
    }, [stroke, strokeOpacity]);

    const fillColor = useMemo(() => {
      if (!fill || fill === 'none') return undefined;
      if (fillOpacity === 1) return fill;
      return fill;
    }, [fill, fillOpacity]);

    return (
      <SkiaPathComponent
        color={fillColor}
        opacity={fillOpacity}
        path={path}
        strokeCap={strokeLinecap}
        strokeJoin={strokeLinejoin}
        strokeWidth={strokeWidth}
        style={stroke && stroke !== 'none' ? 'stroke' : 'fill'}
        {...(dashArray && { dashInterval: dashArray })}
      >
        {/* Stroke styling when both fill and stroke are needed */}
        {stroke && stroke !== 'none' && (
          <SkiaPathComponent
            color={strokeColor}
            opacity={strokeOpacity}
            path={path}
            strokeCap={strokeLinecap}
            strokeJoin={strokeLinejoin}
            strokeWidth={strokeWidth}
            style="stroke"
            {...(dashArray && { dashInterval: dashArray })}
          />
        )}
      </SkiaPathComponent>
    );
  },
);
