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

import { type AxisBaseProps, type AxisProps } from './Axis';

export type XAxisBaseProps = AxisBaseProps;

export type XAxisProps = AxisProps & XAxisBaseProps;

export const XAxis = memo<XAxisProps>(
  ({
    position = 'end',
    showGrid,
    requestedTickCount,
    ticks,
    tickLabelFormatter,
    style,
    className,
    styles,
    classNames,
    GridLineComponent = DottedLine,
    tickMarkLabelGap = 0.25,
    dataKey,
    size = 32,
    minTickLabelGap = 0.5,
    showTickMarks,
    showLine,
    tickMarkSize = 0.5,
    tickInterval = 8,
    ...props
  }) => {
    const theme = useTheme();
    const registrationId = useId();
    const { animate, getXScale, getXAxis, registerAxis, unregisterAxis, getAxisBounds } =
      useChartContext();

    const xScale = getXScale?.();
    const xAxis = getXAxis?.();
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
      registerAxis(registrationId, 'x', position, size);

      return () => unregisterAxis(registrationId);
    }, [registrationId, registerAxis, unregisterAxis, position, size]);

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

      return getAxisTicksData({
        scaleFunction: xScale,
        ticks,
        requestedTickCount,
        categories,
        possibleTickValues:
          axisData && Array.isArray(axisData) && typeof axisData[0] === 'number'
            ? (axisData as number[])
            : undefined,
        tickInterval: theme.space[tickInterval],
      });
    }, [ticks, xScale, requestedTickCount, tickInterval, theme.space, xAxis?.data]);

    const chartTextData: TextLabelData[] | null = useMemo(() => {
      if (!axisBounds) return null;

      return ticksData.map((tick) => {
        const tickOffset =
          theme.space[tickMarkLabelGap] + (showTickMarks ? theme.space[tickMarkSize] : 0);

        const availableSpace = axisBounds.height - tickOffset;
        const labelOffset = availableSpace / 2;
        const labelY =
          position === 'start'
            ? axisBounds.y + labelOffset - tickOffset
            : axisBounds.y + labelOffset + tickOffset;

        return {
          x: tick.position,
          y: labelY,
          label: formatTick(tick.tick),
          chartTextProps: {
            className: classNames?.tickLabel,
            color: theme.color.fgMuted,
            dominantBaseline: 'central',
            style: styles?.tickLabel,
            textAnchor: 'middle',
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

    if (!xScale) return;

    return (
      <G data-axis="x" data-position={position} {...props}>
        {showGrid && (
          <G>
            {ticksData.map((tick, index) => {
              const verticalLine = (
                <ReferenceLine LineComponent={GridLineComponent} dataX={tick.tick} />
              );

              return <G key={`grid-${tick.tick}-${index}-${dataKey}`}>{verticalLine}</G>;
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
              const tickY = position === 'end' ? axisBounds.y : axisBounds.y + axisBounds.height;
              const tickMarkSizePixels = theme.space[tickMarkSize];
              const tickY2 =
                position === 'end'
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
            y1={position === 'end' ? axisBounds.y : axisBounds.y + axisBounds.height}
            y2={position === 'end' ? axisBounds.y : axisBounds.y + axisBounds.height}
          />
        )}
      </G>
    );
  },
);
