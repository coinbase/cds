import { memo, useCallback, useEffect, useId, useMemo } from 'react';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';
import { Group } from '@shopify/react-native-skia';

import { useCartesianChartContext } from '../ChartProvider';
import { DottedLine } from '../line/DottedLine';
import { ReferenceLine } from '../line/ReferenceLine';
import { SolidLine } from '../line/SolidLine';
import { ChartText } from '../text/ChartText';
import { ChartTextGroup, type TextLabelData } from '../text/ChartTextGroup';
import { getAxisTicksData, isCategoricalScale, lineToPath } from '../utils';

import { type AxisBaseProps, type AxisProps } from './Axis';
import { DefaultAxisTickLabel } from './DefaultAxisTickLabel';

const AXIS_HEIGHT = 32;
const LABEL_SIZE = 20;

export type XAxisBaseProps = AxisBaseProps & {
  /**
   * The position of the axis relative to the chart's drawing area.
   * @default 'bottom'
   */
  position?: 'top' | 'bottom';
  /**
   * Height of the axis. This value is inclusive of the padding.
   * @default 32 when no label is provided, 52 when a label is provided
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
    TickLabelComponent = DefaultAxisTickLabel,
    GridLineComponent = DottedLine,
    LineComponent = SolidLine,
    TickMarkLineComponent = SolidLine,
    tickMarkLabelGap = 2,
    minTickLabelGap = 4,
    showTickMarks,
    showLine,
    tickMarkSize = 4,
    tickInterval = 32,
    tickMinStep = 1,
    tickMaxStep,
    label,
    labelGap = 4,
    height = label ? AXIS_HEIGHT + LABEL_SIZE : AXIS_HEIGHT,
    ...props
  }) => {
    const theme = useTheme();
    const registrationId = useId();
    const { animate, getXScale, getXAxis, registerAxis, unregisterAxis, getAxisBounds } =
      useCartesianChartContext();

    const xScale = getXScale();
    const xAxis = getXAxis();
    const axisBounds = getAxisBounds(registrationId);

    // Note: gridOpacity not currently used in Skia version
    // const gridOpacity = useSharedValue(1);

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

        // Use AXIS_HEIGHT for centering, not full axisBounds.height
        // This ensures tick labels are centered in the axis area, not including label space
        const availableSpace = AXIS_HEIGHT - tickOffset;
        const labelOffset = availableSpace / 2;

        // For bottom position: start at axisBounds.y
        // For top position with label: start at axisBounds.y + LABEL_SIZE
        const baseY = position === 'top' && label ? axisBounds.y + LABEL_SIZE : axisBounds.y;

        const labelY =
          position === 'top' ? baseY + labelOffset - tickOffset : baseY + labelOffset + tickOffset;

        return {
          x: tick.position,
          y: labelY,
          label: String(formatTick(tick.tick)),
          chartTextProps: {
            color: theme.color.fgMuted,
            verticalAlignment: 'middle',
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
      label,
    ]);

    if (!xScale || !axisBounds) return;

    const labelX = axisBounds.x + axisBounds.width / 2;
    const labelY =
      position === 'bottom'
        ? axisBounds.y + axisBounds.height - LABEL_SIZE / 2
        : axisBounds.y + LABEL_SIZE / 2;

    return (
      <Group>
        {showGrid && (
          <Group>
            {ticksData.map((tick, index) => {
              const verticalLine = (
                <ReferenceLine LineComponent={GridLineComponent} dataX={tick.tick} />
              );

              return <Group key={`grid-${tick.tick}-${index}`}>{verticalLine}</Group>;
            })}
          </Group>
        )}
        {chartTextData && (
          <ChartTextGroup
            prioritizeEndLabels
            LabelComponent={TickLabelComponent}
            labels={chartTextData}
            minGap={minTickLabelGap}
          />
        )}
        {axisBounds && showTickMarks && (
          <Group>
            {ticksData.map((tick, index) => {
              const tickY = position === 'bottom' ? axisBounds.y : axisBounds.y + axisBounds.height;
              const tickY2 =
                position === 'bottom'
                  ? axisBounds.y + tickMarkSize
                  : axisBounds.y + axisBounds.height - tickMarkSize;

              return (
                <TickMarkLineComponent
                  key={`tick-mark-${tick.tick}-${index}`}
                  animate={false}
                  clipPath={null}
                  d={lineToPath(tick.position, tickY, tick.position, tickY2)}
                  stroke={theme.color.fg}
                  strokeCap="square"
                  strokeWidth={1}
                />
              );
            })}
          </Group>
        )}
        {showLine && (
          <LineComponent
            animate={false}
            d={lineToPath(
              axisBounds.x,
              position === 'bottom' ? axisBounds.y : axisBounds.y + axisBounds.height,
              axisBounds.x + axisBounds.width,
              position === 'bottom' ? axisBounds.y : axisBounds.y + axisBounds.height,
            )}
            stroke={theme.color.fg}
            strokeCap="square"
            strokeWidth={1}
          />
        )}
        {label && (
          <ChartText horizontalAlignment="center" verticalAlignment="middle" x={labelX} y={labelY}>
            {label}
          </ChartText>
        )}
      </Group>
    );
  },
);
