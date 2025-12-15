import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import { animate as framerAnimate } from 'framer-motion';

import { usePolarChartContext } from '../ChartProvider';
import { defaultAxisId, getArcPath, useHighlightContext } from '../utils';
import { degreesToRadians } from '../utils/polar';

export type ArcBaseProps = {
  /**
   * Start angle in radians.
   */
  startAngle: number;
  /**
   * End angle in radians.
   */
  endAngle: number;
  /**
   * Inner radius in pixels (0 for pie chart).
   */
  innerRadius: number;
  /**
   * Outer radius in pixels.
   */
  outerRadius: number;
  /**
   * Padding angle in radians between adjacent arcs.
   */
  paddingAngle?: number;
  /**
   * Fill color for the arc.
   */
  fill?: string;
  /**
   * Fill opacity.
   * @default 1
   */
  fillOpacity?: number;
  /**
   * Stroke color.
   */
  stroke?: string;
  /**
   * Stroke width in pixels.
   */
  strokeWidth?: number;
  /**
   * Corner radius in pixels.
   */
  cornerRadius?: number;
  /**
   * Clip path ID to apply to this arc.
   * Should reference a clipPath element defined elsewhere in the SVG.
   */
  clipPathId?: string;
  /**
   * ID of the angular axis to use for determining the animation baseline.
   * If not provided, uses the default angular axis.
   */
  angularAxisId?: string;
  /**
   * Whether to animate the arc. Overrides the chart-level animate setting.
   * If not provided, uses the chart context's animate value.
   */
  animate?: boolean;
  /**
   * Click handler for the arc.
   */
  onClick?: React.MouseEventHandler<SVGPathElement>;
  /**
   * Mouse enter handler for the arc.
   */
  onMouseEnter?: React.MouseEventHandler<SVGPathElement>;
  /**
   * Mouse leave handler for the arc.
   */
  onMouseLeave?: React.MouseEventHandler<SVGPathElement>;
  /**
   * CSS cursor style for the arc.
   */
  cursor?: string;
  /**
   * Series ID for this arc. Used to determine if this arc is highlighted.
   */
  seriesId?: string;
  /**
   * Data index for this arc. Used to determine if this arc is highlighted.
   */
  dataIndex?: number;
};

export type ArcProps = ArcBaseProps;

/**
 * Renders an arc (slice) in a polar chart.
 * Used by PieChart and DonutChart components.
 */
export const Arc = memo<ArcProps>(
  ({
    startAngle,
    endAngle,
    innerRadius,
    outerRadius,
    paddingAngle,
    fill,
    fillOpacity = 1,
    stroke,
    strokeWidth,
    cornerRadius,
    clipPathId,
    angularAxisId,
    animate: animateProp,
    onClick,
    onMouseEnter,
    onMouseLeave,
    cursor,
    seriesId,
    dataIndex,
  }) => {
    const highlightContext = useHighlightContext();
    const { animate: contextAnimate, drawingArea, getAngularAxis } = usePolarChartContext();
    const animate = animateProp !== undefined ? animateProp : contextAnimate;

    // Determine if this arc should be dimmed (something else is highlighted)
    const highlightedItem = highlightContext?.highlightedItem;
    const isHighlighted = seriesId !== undefined && highlightedItem?.seriesId === seriesId;
    const isDimmed = highlightedItem !== undefined && !isHighlighted;

    // Animated opacity for highlight dimming
    const [animatedOpacity, setAnimatedOpacity] = useState(fillOpacity);
    const currentOpacityRef = useRef(fillOpacity);

    useEffect(() => {
      const targetOpacity = isDimmed ? 0.5 : fillOpacity;

      if (animate) {
        const control = framerAnimate(currentOpacityRef.current, targetOpacity, {
          duration: 0.2,
          ease: 'easeOut',
          onUpdate: (value) => {
            currentOpacityRef.current = value;
            setAnimatedOpacity(value);
          },
        });
        return () => control.stop();
      } else {
        currentOpacityRef.current = targetOpacity;
        setAnimatedOpacity(targetOpacity);
      }
    }, [isDimmed, fillOpacity, animate]);

    // Get the angular axis to determine the baseline angle
    const angularAxis = getAngularAxis(angularAxisId ?? defaultAxisId);

    const baselineAngle = useMemo(() => {
      const startDegrees = angularAxis?.range?.min ?? 0;
      return degreesToRadians(startDegrees);
    }, [angularAxis?.range?.min]);

    const centerX = drawingArea.x + drawingArea.width / 2;
    const centerY = drawingArea.y + drawingArea.height / 2;

    // Track if this arc has completed its initial animation from baseline
    const hasInitialAnimationStartedRef = useRef(false);

    // Refs to track current animated values - these persist across renders
    // and allow us to animate from the current position when data changes
    const currentStartAngleRef = useRef(baselineAngle);
    const currentEndAngleRef = useRef(baselineAngle);

    // State for animated angles (drives the render)
    const [animatedStartAngle, setAnimatedStartAngle] = useState(baselineAngle);
    const [animatedEndAngle, setAnimatedEndAngle] = useState(baselineAngle);

    // Trigger animation when the component mounts or data changes
    useEffect(() => {
      // Don't start animation until axis is ready (has valid baseline)
      if (!angularAxis) return;

      if (animate) {
        // Determine the starting point for animation:
        // - Initial mount: start from baseline angle (e.g., -90° for semicircle)
        // - Data change: start from current animated position (smooth transition)
        const isInitialAnimation = !hasInitialAnimationStartedRef.current;

        if (isInitialAnimation) {
          // For initial animation, start from baseline
          currentStartAngleRef.current = baselineAngle;
          currentEndAngleRef.current = baselineAngle;
          setAnimatedStartAngle(baselineAngle);
          setAnimatedEndAngle(baselineAngle);
        }

        const fromStartAngle = currentStartAngleRef.current;
        const fromEndAngle = currentEndAngleRef.current;

        // Animate from current/baseline to target values
        const startControl = framerAnimate(fromStartAngle, startAngle, {
          duration: isInitialAnimation ? 1 : 0.5, // Slower for initial, faster for data updates
          ease: 'easeOut',
          onUpdate: (value) => {
            currentStartAngleRef.current = value;
            setAnimatedStartAngle(value);
          },
        });

        const endControl = framerAnimate(fromEndAngle, endAngle, {
          duration: isInitialAnimation ? 1 : 0.5,
          ease: 'easeOut',
          onUpdate: (value) => {
            currentEndAngleRef.current = value;
            setAnimatedEndAngle(value);
          },
        });

        // Mark that initial animation has started
        hasInitialAnimationStartedRef.current = true;

        return () => {
          startControl.stop();
          endControl.stop();
        };
      } else {
        currentStartAngleRef.current = startAngle;
        currentEndAngleRef.current = endAngle;
        setAnimatedStartAngle(startAngle);
        setAnimatedEndAngle(endAngle);
      }
    }, [startAngle, endAngle, animate, baselineAngle, angularAxis]);

    // Compute the current path
    const currentPath = useMemo(() => {
      return getArcPath({
        startAngle: animatedStartAngle,
        endAngle: animatedEndAngle,
        innerRadius,
        outerRadius,
        cornerRadius,
        paddingAngle,
      });
    }, [
      animatedStartAngle,
      animatedEndAngle,
      innerRadius,
      outerRadius,
      cornerRadius,
      paddingAngle,
    ]);

    // Don't render until axis is ready and we have valid radius
    if (!angularAxis || outerRadius <= 0) return;

    return (
      <g
        clipPath={clipPathId ? `url(#${clipPathId})` : undefined}
        transform={`translate(${centerX}, ${centerY})`}
      >
        <path
          d={currentPath}
          fill={fill}
          fillOpacity={animatedOpacity}
          onClick={onClick}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          stroke={stroke}
          strokeWidth={strokeWidth}
          style={cursor ? { cursor } : undefined}
        />
      </g>
    );
  },
);
