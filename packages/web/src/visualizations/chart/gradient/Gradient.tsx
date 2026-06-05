import { memo, useMemo } from 'react';
import { m as motion, type Transition } from 'framer-motion';

import { useCartesianChartContext } from '../ChartProvider';
import { defaultTransition, type GradientDefinition, instantTransition } from '../utils';
import { getGradientAxis, getGradientConfig } from '../utils/gradient';

export type GradientBaseProps = {
  /**
   * Whether to animate gradient changes.
   */
  animate?: boolean;
  /**
   * Gradient definition with stops, axis, and other configuration.
   */
  gradient: GradientDefinition;
  /**
   * X-axis ID to use for gradient processing.
   * When provided, the gradient will align with the specified x-axis range.
   * @note Only used for axis selection when layout is 'horizontal'. Vertical layout uses a single x-axis.
   */
  xAxisId?: string;
  /**
   * Y-axis ID to use for gradient processing.
   * When provided, the gradient will align with the specified y-axis range.
   * This ensures gradients work correctly when the axis has a custom range configuration.
   * @note Only used for axis selection when layout is 'vertical'. Horizontal layout supports a single y-axis.
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
   * Transition configuration for animation.
   * @default defaultTransition
   */
  transition?: Transition;
};

/**
 * Renders an SVG linearGradient element based on a GradientDefinition.
 * The gradient can be referenced via `fill="url(#${id})"` or `stroke="url(#${id})"`.
 */
export const Gradient = memo<GradientProps>(
  ({ id, gradient, xAxisId, yAxisId, animate: animateProp, transition: transitionProp }) => {
    const {
      animate: animateContext,
      getXScale,
      getYScale,
      drawingArea,
      getYAxis,
      getXAxis,
      layout,
    } = useCartesianChartContext();
    const animate = animateProp ?? animateContext;
    const transition = useMemo(() => {
      if (!animate) return instantTransition;
      return transitionProp ?? defaultTransition;
    }, [transitionProp, animate]);

    const xScale = getXScale(xAxisId);
    const yScale = getYScale(yAxisId);
    const xAxis = getXAxis(xAxisId);
    const yAxis = getYAxis(yAxisId);

    // Process gradient definition into stops
    const stops = useMemo(() => {
      if (!xScale || !yScale) return;
      return getGradientConfig(gradient, xScale, yScale, layout);
    }, [gradient, xScale, yScale, layout]);

    // If gradient processing failed, don't render
    if (!stops) return null;

    const axis = getGradientAxis(gradient, layout);

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
      <motion.linearGradient
        animate={coordinates}
        gradientUnits="userSpaceOnUse"
        id={id}
        initial={coordinates}
        transition={transition}
      >
        {stops.map((stop, index) => {
          const offset = `${stop.offset * 100}%`;
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
              stopOpacity={stop.opacity ?? 1}
              transition={transition}
            />
          );
        })}
      </motion.linearGradient>
    );
  },
);
