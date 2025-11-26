import { memo, useMemo } from 'react';
import { m as motion, type Transition } from 'framer-motion';

import { useCartesianChartContext } from '../ChartProvider';
import type { GradientDefinition } from '../utils';
import { getGradientConfig } from '../utils/gradient';

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

export type GradientProps = GradientBaseProps & {
  /**
   * Unique ID for the gradient definition.
   * Will be used in `url(#${id})` references.
   */
  id: string;
  /**
   * Whether to animate gradient changes.
   */
  animate?: boolean;
  /**
   * Transition configuration for animation.
   */
  transition?: Transition;
};

/**
 * Renders an SVG linearGradient element based on a GradientDefinition.
 * The gradient can be referenced via `fill="url(#${id})"` or `stroke="url(#${id})"`.
 */
export const Gradient = memo<GradientProps>(
  ({ id, gradient, yAxisId, animate: animateProp, transition }) => {
    const context = useCartesianChartContext();
    const animate = animateProp ?? context.animate;

    const xScale = context.getXScale();
    const yScale = context.getYScale(yAxisId);

    // Process gradient definition into stops
    const stops = useMemo(() => {
      if (!xScale || !yScale) return;
      return getGradientConfig(gradient, xScale, yScale);
    }, [gradient, xScale, yScale]);

    const drawingArea = context.drawingArea;
    const yAxis = context.getYAxis(yAxisId);
    const xAxis = context.getXAxis();

    // If gradient processing failed, don't render
    if (!stops) return null;

    const axis = gradient.axis ?? 'y';

    let coordinates: Record<string, number>;

    if (axis === 'y') {
      const yRange = yAxis?.range;
      if (yRange) {
        coordinates = {
          x1: drawingArea.x,
          y1: yRange.max,
          x2: drawingArea.x,
          y2: yRange.min,
        };
      } else {
        coordinates = {
          x1: drawingArea.x,
          y1: drawingArea.y + drawingArea.height,
          x2: drawingArea.x,
          y2: drawingArea.y,
        };
      }
    } else {
      const xRange = xAxis?.range;
      if (xRange) {
        coordinates = {
          x1: xRange.min,
          y1: drawingArea.y,
          x2: xRange.max,
          y2: drawingArea.y,
        };
      } else {
        coordinates = {
          x1: drawingArea.x,
          y1: drawingArea.y,
          x2: drawingArea.x + drawingArea.width,
          y2: drawingArea.y,
        };
      }
    }

    return (
      <linearGradient gradientUnits="userSpaceOnUse" id={id} {...coordinates}>
        {stops.map((stop, index) => {
          const offset = `${stop.offset * 100}%`;
          const opacity = stop.opacity;

          if (!animate) {
            return (
              <stop
                key={`${id}-stop-${index}`}
                offset={offset}
                stopColor={stop.color}
                stopOpacity={opacity ?? 1}
              />
            );
          }

          return (
            <motion.stop
              key={`${id}-stop-${index}`}
              animate={{
                offset,
              }}
              initial={{
                offset,
              }}
              stopColor={stop.color}
              stopOpacity={opacity ?? 1}
              transition={transition}
            />
          );
        })}
      </linearGradient>
    );
  },
);
