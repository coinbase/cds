import { memo, useCallback, useEffect, useId, useMemo } from 'react';
import { cx } from '@coinbase/cds-web';
import { css } from '@linaria/core';
import { AnimatePresence, m as motion } from 'framer-motion';

import { useCartesianChartContext } from '../ChartProvider';
import { DottedLine } from '../line/DottedLine';
import { ReferenceLine } from '../line/ReferenceLine';
import { SmartChartTextGroup, type TextLabelData } from '../text/SmartChartTextGroup';
import { getAxisTicksData, isCategoricalScale } from '../utils';

import {
  type AxisBaseProps,
  axisLineStyles,
  type AxisProps,
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
    const registrationId = useId();
    const { animate, getXScale, getXAxis, registerAxis, unregisterAxis, getAxisBounds } =
      useCartesianChartContext();

    const xScale = getXScale();
    const xAxis = getXAxis();

    const axisBounds = getAxisBounds(registrationId);

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

      let possibleTickValues: number[];

      // If we have discrete data, we can use the indices as possible tick values
      if (
        axisData &&
        Array.isArray(axisData) &&
        (typeof axisData[0] === 'string' ||
          (typeof axisData[0] === 'number' && isCategoricalScale(xScale)))
      )
        possibleTickValues = Array.from({ length: axisData.length }, (_, i) => i);

      return getAxisTicksData({
        scaleFunction: xScale,
        ticks,
        requestedTickCount,
        categories,
        possibleTickValues:
          axisData && Array.isArray(axisData) && typeof axisData[0] === 'string'
            ? Array.from({ length: axisData.length }, (_, i) => i)
            : undefined,
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
          label: formatTick(tick.tick),
          chartTextProps: {
            className: classNames?.tickLabel,
            color: 'var(--color-fgMuted)',
            verticalAlignment: 'middle',
            style: styles?.tickLabel,
            horizontalAlignment: 'center',
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

    if (!xScale) return;

    return (
      <g
        className={cx(className, classNames?.root)}
        data-axis="x"
        data-position={position}
        style={{ ...style, ...styles?.root }}
        {...props}
      >
        {showGrid && (
          <AnimatePresence initial={false}>
            {ticksData.map((tick, index) => {
              const verticalLine = (
                <ReferenceLine LineComponent={GridLineComponent} dataX={tick.tick} />
              );

              return animate ? (
                <motion.g
                  key={`grid-${tick.tick}-${index}`}
                  animate="animate"
                  exit="exit"
                  initial="initial"
                  variants={axisUpdateAnimationVariants}
                >
                  {verticalLine}
                </motion.g>
              ) : (
                <g key={`grid-${tick.tick}-${index}`}>{verticalLine}</g>
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
              const tickY = position === 'bottom' ? axisBounds.y : axisBounds.y + axisBounds.height;
              const tickMarkSizePixels = tickMarkSize;
              const tickY2 =
                position === 'bottom'
                  ? axisBounds.y + tickMarkSizePixels
                  : axisBounds.y + axisBounds.height - tickMarkSizePixels;

              return (
                <line
                  key={`tick-mark-${tick.tick}-${index}`}
                  className={cx(axisTickMarkCss, classNames?.tickMark)}
                  style={styles?.tickMark}
                  x1={tick.position}
                  x2={tick.position}
                  y1={tickY}
                  y2={tickY2}
                />
              );
            })}
          </g>
        )}
        {axisBounds && showLine && (
          <line
            className={cx(axisLineCss, classNames?.line)}
            style={styles?.line}
            x1={axisBounds.x}
            x2={axisBounds.x + axisBounds.width}
            y1={position === 'bottom' ? axisBounds.y : axisBounds.y + axisBounds.height}
            y2={position === 'bottom' ? axisBounds.y : axisBounds.y + axisBounds.height}
          />
        )}
      </g>
    );
  },
);
