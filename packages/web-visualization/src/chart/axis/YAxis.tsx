import { memo, useCallback, useEffect, useId, useMemo } from 'react';
import { cx } from '@coinbase/cds-web';
import { css } from '@linaria/core';
import { AnimatePresence, m as motion } from 'framer-motion';

import { useCartesianChartContext } from '../ChartProvider';
import { DottedLine } from '../line/DottedLine';
import { ReferenceLine } from '../line/ReferenceLine';
import { SmartChartTextGroup, type TextLabelData } from '../text/SmartChartTextGroup';
import { getAxisTicksData, isCategoricalScale } from '../utils';

import type { AxisBaseProps, AxisProps } from './Axis';
import {
  axisLineStyles,
  axisTickLabelsInitialAnimationVariants,
  axisTickMarkStyles,
  axisUpdateAnimationVariants,
} from './Axis';

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
   * @default 44
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
    style,
    className,
    styles,
    classNames,
    GridLineComponent = DottedLine,
    tickMarkLabelGap = 8,
    width = 44,
    minTickLabelGap = 0,
    showTickMarks,
    showLine,
    tickMarkSize = 4,
    tickInterval,
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

    if (!yScale) return;

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
          <AnimatePresence>
            <motion.g
              animate="animate"
              exit="exit"
              initial="initial"
              variants={animate ? axisTickLabelsInitialAnimationVariants : undefined}
            >
              <SmartChartTextGroup
                prioritizeEndLabels
                labels={chartTextData}
                minGap={minTickLabelGap}
              />
            </motion.g>
          </AnimatePresence>
        )}
        {axisBounds && showTickMarks && (
          <g data-testid="tick-marks">
            {ticksData.map((tick, index) => {
              const tickX = position === 'left' ? axisBounds.x + axisBounds.width : axisBounds.x;
              const tickMarkSizePixels = tickMarkSize;
              const tickX2 =
                position === 'left'
                  ? axisBounds.x + axisBounds.width - tickMarkSizePixels
                  : axisBounds.x + tickMarkSizePixels;

              return (
                <line
                  key={`tick-mark-${tick.tick}-${index}`}
                  className={cx(axisTickMarkCss, classNames?.tickMark)}
                  style={styles?.tickMark}
                  x1={tickX}
                  x2={tickX2}
                  y1={tick.position}
                  y2={tick.position}
                />
              );
            })}
          </g>
        )}
        {axisBounds && showLine && (
          <line
            className={cx(axisLineCss, classNames?.line)}
            style={styles?.line}
            x1={position === 'left' ? axisBounds.x + axisBounds.width : axisBounds.x}
            x2={position === 'left' ? axisBounds.x + axisBounds.width : axisBounds.x}
            y1={axisBounds.y}
            y2={axisBounds.y + axisBounds.height}
          />
        )}
      </g>
    );
  },
);
