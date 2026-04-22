import { memo, useEffect, useMemo, useRef } from 'react';
import { useDerivedValue, useSharedValue } from 'react-native-reanimated';
import { LinearGradient } from '@shopify/react-native-skia';

import { useCartesianChartContext } from '../ChartProvider';
import { buildTransition, defaultTransition, instantTransition, type Transition } from '../utils';
import {
  getColorWithOpacity,
  getGradientAxis,
  getGradientConfig,
  type GradientDefinition,
} from '../utils/gradient';

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
   */
  xAxisId?: string;
  /**
   * Y-axis ID to use for gradient processing.
   * When provided, the gradient will align with the specified y-axis range.
   * This ensures gradients work correctly when the axis has a custom range configuration.
   */
  yAxisId?: string;
};

export type GradientProps = GradientBaseProps & {
  /**
   * Transition configuration for animation.
   * @default defaultTransition
   */
  transition?: Transition;
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
export const Gradient = memo<GradientProps>(
  ({ gradient, xAxisId, yAxisId, animate: animateProp, transition: transitionProp }) => {
    const {
      animate: animateContext,
      getXScale,
      getYScale,
      drawingArea,
      layout,
    } = useCartesianChartContext();
    const animate = animateProp ?? animateContext;
    const transition = useMemo(() => {
      if (!animate) return instantTransition;
      return transitionProp ?? defaultTransition;
    }, [transitionProp, animate]);

    const xScale = getXScale(xAxisId);
    const yScale = getYScale(yAxisId);

    // Process gradient definition into stops
    const stops = useMemo(() => {
      if (!xScale || !yScale) return;
      return getGradientConfig(gradient, xScale, yScale, layout);
    }, [gradient, xScale, yScale, layout]);

    const axis = getGradientAxis(gradient, layout);
    const scale = axis === 'x' ? xScale : yScale;
    const shouldRender = !!stops && !!scale;

    const range = scale?.range() ?? [0, 0];
    const [rangeStart = 0, rangeEnd = 0] = range;
    const targetStart =
      axis === 'x' ? { x: rangeStart, y: drawingArea.y } : { x: drawingArea.x, y: rangeStart };
    const targetEnd =
      axis === 'x' ? { x: rangeEnd, y: drawingArea.y } : { x: drawingArea.x, y: rangeEnd };

    // Extract colors and positions for LinearGradient.
    const colors = useMemo(
      () => (stops ?? []).map((stop) => getColorWithOpacity(stop.color, stop.opacity ?? 1)),
      [stops],
    );
    const targetPositions = useMemo(() => (stops ?? []).map((stop) => stop.offset), [stops]);

    const startX = useSharedValue(targetStart.x);
    const startY = useSharedValue(targetStart.y);
    const endX = useSharedValue(targetEnd.x);
    const endY = useSharedValue(targetEnd.y);

    const fromPositions = useSharedValue(targetPositions);
    const toPositions = useSharedValue(targetPositions);
    const positionsProgress = useSharedValue(1);

    const hasRendered = useRef(false);

    useEffect(() => {
      if (!shouldRender) {
        hasRendered.current = false;
        return;
      }

      if (!hasRendered.current) {
        hasRendered.current = true;

        startX.value = targetStart.x;
        startY.value = targetStart.y;
        endX.value = targetEnd.x;
        endY.value = targetEnd.y;

        fromPositions.value = [...targetPositions];
        toPositions.value = [...targetPositions];
        positionsProgress.value = 1;
        return;
      }

      startX.value = buildTransition(targetStart.x, transition);
      startY.value = buildTransition(targetStart.y, transition);
      endX.value = buildTransition(targetEnd.x, transition);
      endY.value = buildTransition(targetEnd.y, transition);

      const canAnimatePositions = toPositions.value.length === targetPositions.length;
      if (canAnimatePositions) {
        fromPositions.value = [...toPositions.value];
        toPositions.value = [...targetPositions];
        positionsProgress.value = 0;
        positionsProgress.value = buildTransition(1, transition);
      } else {
        fromPositions.value = [...targetPositions];
        toPositions.value = [...targetPositions];
        positionsProgress.value = 1;
      }
    }, [
      transition,
      targetStart.x,
      targetStart.y,
      targetEnd.x,
      targetEnd.y,
      targetPositions,
      startX,
      startY,
      endX,
      endY,
      fromPositions,
      toPositions,
      positionsProgress,
      shouldRender,
    ]);

    const start = useDerivedValue(() => {
      return {
        x: startX.value,
        y: startY.value,
      };
    }, [startX, startY]);

    const end = useDerivedValue(() => {
      return {
        x: endX.value,
        y: endY.value,
      };
    }, [endX, endY]);

    const positions = useDerivedValue(() => {
      const from = fromPositions.value;
      const to = toPositions.value;
      const progress = positionsProgress.value;

      if (to.length === 0) return [];

      const count = Math.max(from.length, to.length);
      const interpolated = Array.from({ length: count }, (_, index) => {
        const fromValue = from[Math.min(index, from.length - 1)] ?? 0;
        const toValue = to[Math.min(index, to.length - 1)] ?? fromValue;
        return fromValue + (toValue - fromValue) * progress;
      });

      return interpolated;
    }, [fromPositions, toPositions, positionsProgress]);

    if (!shouldRender) return null;

    return <LinearGradient colors={colors} end={end} positions={positions} start={start} />;
  },
);
