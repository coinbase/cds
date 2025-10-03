import { memo, useCallback, useEffect, useId, useMemo } from 'react';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { G, Line } from 'react-native-svg';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';

import { useCartesianChartContext } from '../ChartProvider';
import { DottedLine } from '../line/DottedLine';
import { ReferenceLine } from '../line/ReferenceLine';
import { SmartChartTextGroup, type TextLabelData } from '../text/SmartChartTextGroup';
import { getAxisTicksData, isCategoricalScale } from '../utils';

import { type AxisBaseProps, type AxisProps } from './Axis';

const AnimatedG = Animated.createAnimatedComponent(G);

export type XAxisBaseProps = AxisBaseProps & {
  /**
   * The position of the axis relative to the chart's drawing area.
   * @default 'bottom'
   */
  position?: 'top' | 'bottom';
  /**
   * Height of the axis. This value is inclusive of the padding.
   * @default 32
   */
  height?: number;
};

export type XAxisProps = AxisProps & XAxisBaseProps;

export const XAxis = memo<XAxisProps>(
  ({
    position = 'bottom',
    showGrid,
    requestedTickCount,
    ticks,
    tickLabelFormatter,
    style,
    className,
    styles,
    classNames,
    GridLineComponent = DottedLine,
    tickMarkLabelGap = 2,
    height = 32,
    minTickLabelGap = 4,
    showTickMarks,
    showLine,
    tickMarkSize = 4,
    tickInterval = 32,
    tickMinStep = 1,
    tickMaxStep,
    ...props
  }) => {
    const theme = useTheme();
    const registrationId = useId();
    const { animate, getXScale, getXAxis, registerAxis, unregisterAxis, getAxisBounds } =
      useCartesianChartContext();

    const xScale = getXScale();
    const xAxis = getXAxis();
    const axisBounds = getAxisBounds(registrationId);

    const gridOpacity = useSharedValue(1);

    const axisLineProps = useMemo(
      () => ({
        stroke: theme.color.fg,
        strokeLinecap: 'square' as const,
        strokeWidth: 1,
      }),
      [theme.color.fg],
    );

    const axisTickMarkProps = useMemo(
      () => ({
        stroke: theme.color.fg,
        strokeLinecap: 'square' as const,
        strokeWidth: 1,
      }),
      [theme.color.fg],
    );

    useEffect(() => {
      registerAxis(registrationId, position, height);

      return () => unregisterAxis(registrationId);
    }, [registrationId, registerAxis, unregisterAxis, position, height]);

    const formatTick = useCallback(
      (value: any) => {
        // If we have string labels and no custom formatter, use the labels
        const axisData = xAxis?.data;
        const hasStringLabels =
          axisData && Array.isArray(axisData) && typeof axisData[0] === 'string';

        let finalValue = value;

        // For band scales with string data, value is an index
        if (hasStringLabels && typeof value === 'number' && axisData[value] !== undefined) {
          finalValue = axisData[value];
        }

        // Use the formatter (if provided) or the value itself
        return tickLabelFormatter?.(finalValue) ?? finalValue;
      },
      [xAxis?.data, tickLabelFormatter],
    );

    const ticksData = useMemo(() => {
      if (!xScale) return [];

      // Check if we have string labels
      const axisData = xAxis?.data;
      const hasStringLabels =
        axisData && Array.isArray(axisData) && typeof axisData[0] === 'string';

      // For band scales, we need categories
      let categories: string[] | undefined;
      if (hasStringLabels) {
        categories = axisData as string[];
      } else if (isCategoricalScale(xScale)) {
        // For band scales without explicit string data, generate numeric categories
        // based on the domain of the scale
        const domain = xScale.domain();
        categories = domain.map(String);
      }

      let possibleTickValues: number[] | undefined;

      // If we have discrete data, we can use the indices as possible tick values
      if (
        axisData &&
        Array.isArray(axisData) &&
        (typeof axisData[0] === 'string' ||
          (typeof axisData[0] === 'number' && isCategoricalScale(xScale)))
      ) {
        possibleTickValues = Array.from({ length: axisData.length }, (_, i) => i);
      }

      return getAxisTicksData({
        scaleFunction: xScale,
        ticks,
        requestedTickCount,
        categories,
        possibleTickValues,
        tickInterval: tickInterval,
        options: {
          minStep: tickMinStep,
          maxStep: tickMaxStep,
        },
      });
    }, [ticks, xScale, requestedTickCount, tickInterval, tickMinStep, tickMaxStep, xAxis?.data]);

    const chartTextData: TextLabelData[] | null = useMemo(() => {
      if (!axisBounds) return null;

      return ticksData.map((tick) => {
        const tickOffset = tickMarkLabelGap + (showTickMarks ? tickMarkSize : 0);

        const availableSpace = axisBounds.height - tickOffset;
        const labelOffset = availableSpace / 2;
        const labelY =
          position === 'top'
            ? axisBounds.y + labelOffset - tickOffset
            : axisBounds.y + labelOffset + tickOffset;

        return {
          x: tick.position,
          y: labelY,
          label: String(formatTick(tick.tick)),
          chartTextProps: {
            className: classNames?.tickLabel,
            color: theme.color.fgMuted,
            verticalAlignment: 'middle',
            style: styles?.tickLabel,
            horizontalAlignment: 'center',
          },
        };
      });
    }, [
      axisBounds,
      ticksData,
      theme.color.fgMuted,
      tickMarkLabelGap,
      showTickMarks,
      tickMarkSize,
      position,
      formatTick,
      classNames?.tickLabel,
      styles?.tickLabel,
    ]);

    const gridAnimatedStyle = useAnimatedStyle(() => ({
      opacity: gridOpacity.value,
    }));

    if (!xScale) return;

    return (
      <G data-axis="x" data-position={position} {...props}>
        {showGrid && (
          <AnimatedG animatedProps={gridAnimatedStyle}>
            {ticksData.map((tick, index) => {
              const verticalLine = (
                <ReferenceLine LineComponent={GridLineComponent} dataX={tick.tick} />
              );

              return <G key={`grid-${tick.tick}-${index}`}>{verticalLine}</G>;
            })}
          </AnimatedG>
        )}
        {chartTextData && (
          <SmartChartTextGroup
            prioritizeEndLabels
            labels={chartTextData}
            minGap={minTickLabelGap}
          />
        )}
        {axisBounds && showTickMarks && (
          <G data-testid="tick-marks">
            {ticksData.map((tick, index) => {
              const tickY = position === 'bottom' ? axisBounds.y : axisBounds.y + axisBounds.height;
              const tickMarkSizePixels = tickMarkSize;
              const tickY2 =
                position === 'bottom'
                  ? axisBounds.y + tickMarkSizePixels
                  : axisBounds.y + axisBounds.height - tickMarkSizePixels;

              return (
                <Line
                  key={`tick-mark-${tick.tick}-${index}`}
                  {...axisTickMarkProps}
                  x1={tick.position}
                  x2={tick.position}
                  y1={tickY}
                  y2={tickY2}
                />
              );
            })}
          </G>
        )}
        {axisBounds && showLine && (
          <Line
            {...axisLineProps}
            x1={axisBounds.x}
            x2={axisBounds.x + axisBounds.width}
            y1={position === 'bottom' ? axisBounds.y : axisBounds.y + axisBounds.height}
            y2={position === 'bottom' ? axisBounds.y : axisBounds.y + axisBounds.height}
          />
        )}
      </G>
    );
  },
);
