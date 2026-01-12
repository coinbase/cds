import { memo, useCallback, useEffect, useId, useMemo } from 'react';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';
import { Group, vec } from '@shopify/react-native-skia';

import { useCartesianChartContext } from '../ChartProvider';
import { DottedLine } from '../line/DottedLine';
import { SolidLine } from '../line/SolidLine';
import { ChartText } from '../text/ChartText';
import { ChartTextGroup, type TextLabelData } from '../text/ChartTextGroup';
import {
  type CategoricalScale,
  getAxisTicksData,
  getPointOnScale,
  isCategoricalScale,
  lineToPath,
  toPointAnchor,
} from '../utils';

import { type AxisBaseProps, type AxisProps } from './Axis';
import { DefaultAxisTickLabel } from './DefaultAxisTickLabel';

const AXIS_WIDTH = 44;
const LABEL_SIZE = 20;

export type YAxisBaseProps = AxisBaseProps & {
  /**
   * The ID of the axis to render.
   * Defaults to defaultAxisId if not specified.
   */
  axisId?: string;
  /**
   * The position of the axis relative to the chart's drawing area.
   * @default 'right'
   */
  position?: 'left' | 'right';
  /**
   * Width of the axis. This value is inclusive of the padding.
   * @default 44 when no label is provided, 64 when a label is provided
   */
  width?: number;
};

export type YAxisProps = AxisProps & YAxisBaseProps;

export const YAxis = memo<YAxisProps>(
  ({
    axisId,
    position = 'right',
    showGrid,
    requestedTickCount = 5,
    ticks,
    tickLabelFormatter,
    TickLabelComponent = DefaultAxisTickLabel,
    GridLineComponent = DottedLine,
    LineComponent = SolidLine,
    TickMarkLineComponent = SolidLine,
    tickMarkLabelGap = 8,
    minTickLabelGap = 0,
    showTickMarks,
    showLine,
    tickMarkSize = 4,
    tickInterval,
    label,
    labelGap = 4,
    width = label ? AXIS_WIDTH + LABEL_SIZE : AXIS_WIDTH,
    bandGridLinePlacement = 'edges',
    bandTickMarkPlacement = 'middle',
    ...props
  }) => {
    const theme = useTheme();
    const registrationId = useId();
    const {
      animate,
      drawingArea,
      getYScale,
      getYAxis,
      registerAxis,
      unregisterAxis,
      getAxisBounds,
    } = useCartesianChartContext();

    const yScale = getYScale(axisId);
    const yAxis = getYAxis(axisId);

    const axisBounds = getAxisBounds(registrationId);

    useEffect(() => {
      registerAxis(registrationId, position, width);

      return () => unregisterAxis(registrationId);
    }, [registrationId, registerAxis, unregisterAxis, position, width]);

    const formatTick = useCallback(
      (value: number) => {
        // If we have string labels and no custom formatter, use the labels
        const axisData = yAxis?.data;
        const hasStringLabels =
          axisData && Array.isArray(axisData) && typeof axisData[0] === 'string';

        if (hasStringLabels && !tickLabelFormatter && axisData[value] !== undefined) {
          // Use the string label from the data array
          return axisData[value];
        }

        // Otherwise use the formatter (if provided) or the value itself
        return tickLabelFormatter?.(value) ?? value;
      },
      [yAxis?.data, tickLabelFormatter],
    );

    // Use D3 to get the ticks data
    // Result contains each tick value and its axis position
    const ticksData = useMemo(() => {
      if (!yScale) return [];

      // Check if we have string labels
      const axisData = yAxis?.data;
      const hasStringLabels =
        axisData && Array.isArray(axisData) && typeof axisData[0] === 'string';

      // For band scales, we need categories
      let categories: string[] | undefined;
      if (hasStringLabels) {
        categories = axisData as string[];
      } else if (isCategoricalScale(yScale)) {
        // For band scales without explicit string data, generate numeric categories
        // based on the domain of the scale
        const domain = yScale.domain();
        categories = domain.map(String);
      }

      // For numeric data or no explicit data, use default tick generation
      return getAxisTicksData({
        scaleFunction: yScale as any,
        ticks,
        requestedTickCount: tickInterval !== undefined ? undefined : (requestedTickCount ?? 5),
        categories,
        possibleTickValues:
          axisData && Array.isArray(axisData) && typeof axisData[0] === 'number'
            ? (axisData as number[])
            : undefined,
        tickInterval: tickInterval,
      });
    }, [ticks, yScale, requestedTickCount, tickInterval, yAxis?.data]);

    const isBandScale = useMemo(() => {
      if (!yScale) return false;
      return isCategoricalScale(yScale);
    }, [yScale]);

    // Compute grid line positions (including bounds closing line for band scales)
    const gridLinePositions = useMemo((): Array<{ y: number; key: string }> => {
      if (!yScale) return [];

      return ticksData.flatMap((tick, index) => {
        if (!isBandScale) {
          return [{ y: tick.position, key: `grid-${tick.tick}-${index}` }];
        }

        const bandScale = yScale as CategoricalScale;
        const isLastTick = index === ticksData.length - 1;
        const isEdges = bandGridLinePlacement === 'edges';

        const startY = getPointOnScale(tick.tick, bandScale, toPointAnchor(bandGridLinePlacement));
        const positions = [{ y: startY, key: `grid-${tick.tick}-${index}` }];

        // For edges on last tick, add the closing line at stepEnd
        if (isLastTick && isEdges) {
          const endY = getPointOnScale(tick.tick, bandScale, 'stepEnd');
          positions.push({ y: endY, key: `grid-${tick.tick}-${index}-end` });
        }

        return positions;
      });
    }, [ticksData, yScale, isBandScale, bandGridLinePlacement]);

    // Compute tick mark positions (including bounds closing tick for band scales)
    const tickMarkPositions = useMemo((): Array<{ y: number; key: string }> => {
      if (!yScale) return [];

      return ticksData.flatMap((tick, index) => {
        if (!isBandScale) {
          return [{ y: tick.position, key: `tick-mark-${tick.tick}-${index}` }];
        }

        const bandScale = yScale as CategoricalScale;
        const isLastTick = index === ticksData.length - 1;
        const isEdges = bandTickMarkPlacement === 'edges';

        const startY = getPointOnScale(tick.tick, bandScale, toPointAnchor(bandTickMarkPlacement));
        const positions = [{ y: startY, key: `tick-mark-${tick.tick}-${index}` }];

        // For edges on last tick, add the closing tick mark at stepEnd
        if (isLastTick && isEdges) {
          const endY = getPointOnScale(tick.tick, bandScale, 'stepEnd');
          positions.push({ y: endY, key: `tick-mark-${tick.tick}-${index}-end` });
        }

        return positions;
      });
    }, [ticksData, yScale, isBandScale, bandTickMarkPlacement]);

    const chartTextData: TextLabelData[] | null = useMemo(() => {
      if (!axisBounds) return null;

      return ticksData.map((tick) => {
        const tickOffset = tickMarkLabelGap + (showTickMarks ? tickMarkSize : 0);

        const labelX =
          position === 'left'
            ? axisBounds.x + axisBounds.width - tickOffset
            : axisBounds.x + tickOffset;

        return {
          x: labelX,
          y: tick.position,
          label: String(formatTick(tick.tick)),
          chartTextProps: {
            color: theme.color.fgMuted,
            verticalAlignment: 'middle',
            horizontalAlignment: position === 'left' ? 'right' : 'left',
          },
        };
      });
    }, [
      axisBounds,
      ticksData,
      tickMarkLabelGap,
      showTickMarks,
      tickMarkSize,
      position,
      formatTick,
      theme.color.fgMuted,
    ]);

    if (!yScale || !axisBounds) return;

    const labelX =
      position === 'left'
        ? axisBounds.x + LABEL_SIZE / 2
        : axisBounds.x + axisBounds.width - LABEL_SIZE / 2;
    const labelY = axisBounds.y + axisBounds.height / 2;

    // Pre-compute tick mark X coordinates
    const tickXLeft = axisBounds.x;
    const tickXRight = axisBounds.x + axisBounds.width;
    const tickXStart = position === 'left' ? tickXRight : tickXLeft;
    const tickXEnd = position === 'left' ? tickXRight - tickMarkSize : tickXLeft + tickMarkSize;

    // Note: Unlike web, mobile renders grid lines and tick marks immediately without fade animation.
    // This is because Skia can measure text dimensions synchronously, so there's no need to hide
    // elements while waiting for measurements (web uses async ResizeObserver).
    return (
      <Group>
        {showGrid && (
          <Group>
            {gridLinePositions.map(({ y, key }) => (
              <GridLineComponent
                key={key}
                animate={false}
                clipPath={null}
                d={lineToPath(drawingArea.x, y, drawingArea.x + drawingArea.width, y)}
                stroke={theme.color.bgLine}
              />
            ))}
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
            {tickMarkPositions.map(({ y, key }) => (
              <TickMarkLineComponent
                key={key}
                animate={false}
                clipPath={null}
                d={lineToPath(tickXStart, y, tickXEnd, y)}
                stroke={theme.color.fg}
                strokeCap="square"
                strokeWidth={1}
              />
            ))}
          </Group>
        )}
        {showLine && (
          <LineComponent
            animate={false}
            clipPath={null}
            d={lineToPath(
              position === 'left' ? axisBounds.x + axisBounds.width : axisBounds.x,
              axisBounds.y,
              position === 'left' ? axisBounds.x + axisBounds.width : axisBounds.x,
              axisBounds.y + axisBounds.height,
            )}
            stroke={theme.color.fg}
            strokeCap="square"
            strokeWidth={1}
          />
        )}
        {label && (
          <Group
            origin={vec(labelX, labelY)}
            transform={[{ rotate: position === 'left' ? -Math.PI / 2 : Math.PI / 2 }]}
          >
            <ChartText
              horizontalAlignment="center"
              verticalAlignment="middle"
              x={labelX}
              y={labelY}
            >
              {label}
            </ChartText>
          </Group>
        )}
      </Group>
    );
  },
);
