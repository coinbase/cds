import React, { memo, useCallback, useEffect, useId, useMemo } from 'react';
import { G, Line } from 'react-native-svg';
import type { ThemeVars } from '@coinbase/cds-common';
import {
  getAxisTicksData,
  isCategoricalScale,
  useChartContext,
} from '@coinbase/cds-common/visualizations/charts';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';

import { DottedLine } from '../line';
import { ReferenceLine } from '../line/ReferenceLine';
import { SmartChartTextGroup, type TextLabelData } from '../text/SmartChartTextGroup';

import type { AxisBaseProps, AxisProps } from './Axis';

export type YAxisBaseProps = AxisBaseProps;

export type YAxisProps = AxisProps & {
  /**
   * The ID of the axis to render.
   * Defaults to defaultAxisId if not specified.
   */
  axisId?: string;
};

// todo: see if we can have x and y axis be the same component
export const YAxis = memo<YAxisProps>(
  ({
    axisId,
    position = 'end',
    showGrid,
    requestedTickCount = 5,
    ticks,
    tickLabelFormatter,
    style,
    className,
    styles,
    classNames,
    GridLineComponent = DottedLine,
    tickMarkLabelGap = 1,
    dataKey,
    size = 44,
    minTickLabelGap = 0,
    showTickMarks,
    showLine,
    tickMarkSize = 0.5,
    tickInterval,
    ...props
  }) => {
    const theme = useTheme();
    // todo: probably switch to our own id generator, use id seems to be for accessibility
    const registrationId = useId();
    const { animate, getYScale, getYAxis, registerAxis, unregisterAxis, getAxisBounds } =
      useChartContext();

    const yScale = getYScale?.(axisId);
    const yAxis = getYAxis?.(axisId);

    const axisBounds = getAxisBounds(registrationId);

    // Define axis styling using theme
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
      registerAxis(registrationId, 'y', position, size);

      return () => unregisterAxis(registrationId);
    }, [registrationId, registerAxis, unregisterAxis, position, size]);

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
        return tickLabelFormatter?.(value) ?? value; // TODO the boolean condition above is really weird ... should it be ORs? When we can remove the nullish check on the function call here
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
        requestedTickCount,
        categories,
        possibleTickValues:
          axisData && Array.isArray(axisData) && typeof axisData[0] === 'number'
            ? (axisData as number[])
            : undefined,
        tickInterval: tickInterval ? theme.space[tickInterval] : undefined,
      });
    }, [ticks, yScale, requestedTickCount, tickInterval, theme.space, yAxis?.data]);

    const chartTextData: TextLabelData[] | null = useMemo(() => {
      if (!axisBounds) return null;

      return ticksData.map((tick) => {
        const tickOffset =
          theme.space[tickMarkLabelGap] + (showTickMarks ? theme.space[tickMarkSize] : 0);

        const labelX =
          position === 'start'
            ? axisBounds.x + axisBounds.width - tickOffset
            : axisBounds.x + tickOffset;

        return {
          x: labelX,
          y: tick.position,
          label: formatTick(tick.tick),
          chartTextProps: {
            className: classNames?.tickLabel,
            color: theme.color.fgMuted,
            dominantBaseline: 'central',
            style: styles?.tickLabel,
            textAnchor: position === 'start' ? 'end' : 'start',
          },
        };
      });
    }, [
      axisBounds,
      ticksData,
      theme.space,
      theme.color.fgMuted,
      tickMarkLabelGap,
      showTickMarks,
      tickMarkSize,
      position,
      formatTick,
      classNames?.tickLabel,
      styles?.tickLabel,
    ]);

    if (!yScale) return;

    return (
      <G data-axis="y" data-position={position} {...props}>
        {showGrid && (
          <G>
            {ticksData.map((tick, index) => {
              const horizontalLine = (
                <ReferenceLine
                  LineComponent={GridLineComponent}
                  dataY={tick.tick}
                  yAxisId={axisId}
                />
              );

              return <G key={`grid-${tick.tick}-${index}-${dataKey}`}>{horizontalLine}</G>;
            })}
          </G>
        )}
        {chartTextData && (
          <G>
            {/* TODO pass through styles */}
            <SmartChartTextGroup
              prioritizeEndLabels
              labels={chartTextData}
              minGap={minTickLabelGap}
            />
          </G>
        )}
        {axisBounds && showTickMarks && (
          <G data-testid="tick-marks">
            {ticksData.map((tick, index) => {
              const tickX = position === 'start' ? axisBounds.x + axisBounds.width : axisBounds.x;
              const tickMarkSizePixels = theme.space[tickMarkSize];
              const tickX2 =
                position === 'start'
                  ? axisBounds.x + axisBounds.width - tickMarkSizePixels
                  : axisBounds.x + tickMarkSizePixels;

              return (
                <Line
                  key={`tick-mark-${tick.tick}-${index}`}
                  {...axisTickMarkProps}
                  x1={tickX}
                  x2={tickX2}
                  y1={tick.position}
                  y2={tick.position}
                />
              );
            })}
          </G>
        )}
        {axisBounds && showLine && (
          <Line
            {...axisLineProps}
            x1={position === 'start' ? axisBounds.x + axisBounds.width : axisBounds.x}
            x2={position === 'start' ? axisBounds.x + axisBounds.width : axisBounds.x}
            y1={axisBounds.y}
            y2={axisBounds.y + axisBounds.height}
          />
        )}
      </G>
    );
  },
);
