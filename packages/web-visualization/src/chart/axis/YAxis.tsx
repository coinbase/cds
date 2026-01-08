import { memo, useCallback, useEffect, useId, useMemo } from 'react';
import { cx } from '@coinbase/cds-web';
import { css } from '@linaria/core';
import { m as motion } from 'framer-motion';

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

import {
  type AxisBaseProps,
  axisLineStyles,
  type AxisProps,
  axisTickMarkStyles,
  axisUpdateAnimationTransition,
} from './Axis';
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
    testID = 'y-axis',
    bandGridLinePlacement = 'edges',
    bandTickMarkPlacement = 'middle',
    ...props
  }) => {
    const registrationId = useId();
    const {
      animate,
      getYScale,
      getYAxis,
      registerAxis,
      unregisterAxis,
      getAxisBounds,
      drawingArea,
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

    // Compute tick mark positions (including bounds closing tick mark for band scales)
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

    if (!yScale || !axisBounds || !drawingArea) return;

    const labelX =
      position === 'left'
        ? axisBounds.x + LABEL_SIZE / 2
        : axisBounds.x + axisBounds.width - LABEL_SIZE / 2;
    const labelY = axisBounds.y + axisBounds.height / 2;

    const tickXLeft = axisBounds.x;
    const tickXRight = axisBounds.x + axisBounds.width;
    const tickXStart = position === 'left' ? tickXRight : tickXLeft;
    const tickXEnd = position === 'left' ? tickXRight - tickMarkSize : tickXLeft + tickMarkSize;

    return (
      <g
        className={cx(className, classNames?.root)}
        data-axis="y"
        data-position={position}
        style={{ ...style, ...styles?.root }}
        {...props}
      >
        {showGrid && (
          <g data-testid={`${testID}-grid`}>
            {gridLinePositions.map(({ y, key }) =>
              animate ? (
                <motion.g
                  key={key}
                  animate={{ opacity: 1 }}
                  initial={{ opacity: 0 }}
                  transition={axisUpdateAnimationTransition}
                >
                  <GridLineComponent
                    animate={false}
                    className={classNames?.gridLine}
                    clipRect={null}
                    d={lineToPath(drawingArea.x, y, drawingArea.x + drawingArea.width, y)}
                    stroke="var(--color-bgLine)"
                    style={styles?.gridLine}
                  />
                </motion.g>
              ) : (
                <GridLineComponent
                  key={key}
                  animate={false}
                  className={classNames?.gridLine}
                  clipRect={null}
                  d={lineToPath(drawingArea.x, y, drawingArea.x + drawingArea.width, y)}
                  stroke="var(--color-bgLine)"
                  style={styles?.gridLine}
                />
              ),
            )}
          </g>
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
          <g data-testid={`${testID}-tick-marks`}>
            {tickMarkPositions.map(({ y, key }) =>
              animate ? (
                <motion.g
                  key={key}
                  animate={{ opacity: 1 }}
                  initial={{ opacity: 0 }}
                  transition={axisUpdateAnimationTransition}
                >
                  <TickMarkLineComponent
                    animate={false}
                    className={cx(axisTickMarkCss, classNames?.tickMark)}
                    clipRect={null}
                    d={lineToPath(tickXStart, y, tickXEnd, y)}
                    stroke="var(--color-fg)"
                    strokeLinecap="square"
                    strokeWidth={1}
                    style={styles?.tickMark}
                  />
                </motion.g>
              ) : (
                <TickMarkLineComponent
                  key={key}
                  animate={false}
                  className={cx(axisTickMarkCss, classNames?.tickMark)}
                  clipRect={null}
                  d={lineToPath(tickXStart, y, tickXEnd, y)}
                  stroke="var(--color-fg)"
                  strokeLinecap="square"
                  strokeWidth={1}
                  style={styles?.tickMark}
                />
              ),
            )}
          </g>
        )}
        {showLine && (
          <LineComponent
            animate={false}
            className={cx(axisLineCss, classNames?.line)}
            clipRect={null}
            d={lineToPath(
              position === 'left' ? axisBounds.x + axisBounds.width : axisBounds.x,
              axisBounds.y,
              position === 'left' ? axisBounds.x + axisBounds.width : axisBounds.x,
              axisBounds.y + axisBounds.height,
            )}
            data-testid={`${testID}-line`}
            stroke="var(--color-fg)"
            strokeLinecap="square"
            strokeWidth={1}
            style={styles?.line}
          />
        )}
        {label && (
          <g
            data-testid={`${testID}-label`}
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
              testID={`${testID}-label-text`}
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
