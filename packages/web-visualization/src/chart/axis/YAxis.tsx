import { memo, useCallback, useEffect, useId, useMemo } from 'react';
import { cx } from '@coinbase/cds-web';
import { css } from '@linaria/core';
import { AnimatePresence, m as motion } from 'framer-motion';

import { useCartesianChartContext } from '../ChartProvider';
import { DottedLine } from '../line/DottedLine';
import { ReferenceLine } from '../line/ReferenceLine';
import { SolidLine } from '../line/SolidLine';
import { ChartText } from '../text/ChartText';
import { ChartTextGroup, type TextLabelData } from '../text/ChartTextGroup';
import { getAxisTicksData, isCategoricalScale, lineToPath } from '../utils';

import type { AxisBaseProps, AxisProps } from './Axis';
import { axisLineStyles, axisTickMarkStyles, axisUpdateAnimationVariants } from './Axis';
import { DefaultAxisTickLabel } from './DefaultAxisTickLabel';

const AXIS_WIDTH = 44;
const LABEL_SIZE = 20;

const axisTickMarkCss = css`
  ${axisTickMarkStyles}
`;
const axisLineCss = css`
  ${axisLineStyles}
`;

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
    requestedTickCount,
    ticks,
    tickLabelFormatter,
    TickLabelComponent = DefaultAxisTickLabel,
    style,
    className,
    styles,
    classNames,
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
    ...props
  }) => {
    const registrationId = useId();
    const { animate, getYScale, getYAxis, registerAxis, unregisterAxis, getAxisBounds } =
      useCartesianChartContext();

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
        tickInterval: tickInterval,
      });
    }, [ticks, yScale, requestedTickCount, tickInterval, yAxis?.data]);

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
          label: formatTick(tick.tick),
          chartTextProps: {
            className: classNames?.tickLabel,
            color: 'var(--color-fgMuted)',
            verticalAlignment: 'middle',
            style: styles?.tickLabel,
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
      classNames?.tickLabel,
      styles?.tickLabel,
    ]);

    if (!yScale || !axisBounds) return;

    const labelX =
      position === 'left'
        ? axisBounds.x + LABEL_SIZE / 2
        : axisBounds.x + axisBounds.width - LABEL_SIZE / 2;
    const labelY = axisBounds.y + axisBounds.height / 2;

    return (
      <g
        className={cx(className, classNames?.root)}
        data-axis="y"
        data-position={position}
        style={{ ...style, ...styles?.root }}
        {...props}
      >
        {showGrid && (
          <AnimatePresence initial={false}>
            {ticksData.map((tick, index) => {
              const horizontalLine = (
                <ReferenceLine
                  LineComponent={GridLineComponent}
                  dataY={tick.tick}
                  yAxisId={axisId}
                />
              );

              return animate ? (
                <motion.g
                  key={`grid-${tick.tick}-${index}`}
                  animate="animate"
                  exit="exit"
                  initial="initial"
                  variants={axisUpdateAnimationVariants}
                >
                  {horizontalLine}
                </motion.g>
              ) : (
                <g key={`grid-${tick.tick}-${index}`}>{horizontalLine}</g>
              );
            })}
          </AnimatePresence>
        )}
        {chartTextData && (
          <ChartTextGroup
            prioritizeEndLabels
            LabelComponent={TickLabelComponent}
            labels={chartTextData}
            minGap={minTickLabelGap}
          />
        )}
        {showTickMarks && (
          <g data-testid="tick-marks">
            {ticksData.map((tick, index) => {
              const tickX = position === 'left' ? axisBounds.x + axisBounds.width : axisBounds.x;
              const tickMarkSizePixels = tickMarkSize;
              const tickX2 =
                position === 'left'
                  ? axisBounds.x + axisBounds.width - tickMarkSizePixels
                  : axisBounds.x + tickMarkSizePixels;

              return (
                <TickMarkLineComponent
                  key={`tick-mark-${tick.tick}-${index}`}
                  animate={false}
                  className={cx(axisTickMarkCss, classNames?.tickMark)}
                  clipRect={null}
                  d={lineToPath(tickX, tick.position, tickX2, tick.position)}
                  stroke="var(--color-fg)"
                  strokeLinecap="square"
                  strokeWidth={1}
                  style={styles?.tickMark}
                />
              );
            })}
          </g>
        )}
        {showLine && (
          <LineComponent
            animate={false}
            className={cx(axisLineCss, classNames?.line)}
            d={lineToPath(
              position === 'left' ? axisBounds.x + axisBounds.width : axisBounds.x,
              axisBounds.y,
              position === 'left' ? axisBounds.x + axisBounds.width : axisBounds.x,
              axisBounds.y + axisBounds.height,
            )}
            stroke="var(--color-fg)"
            strokeLinecap="square"
            strokeWidth={1}
            style={styles?.line}
          />
        )}
        {label && (
          <g
            style={{
              transformOrigin: `${labelX}px ${labelY}px`,
              transform: `rotate(${position === 'left' ? -90 : 90}deg)`,
            }}
          >
            <ChartText
              disableRepositioning
              className={classNames?.label}
              horizontalAlignment="center"
              style={styles?.label}
              verticalAlignment="middle"
              x={labelX}
              y={labelY}
            >
              {label}
            </ChartText>
          </g>
        )}
      </g>
    );
  },
);
