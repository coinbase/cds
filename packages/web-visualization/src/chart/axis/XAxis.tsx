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

const AXIS_HEIGHT = 32;
const LABEL_SIZE = 20;

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
    style,
    className,
    styles,
    classNames,
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
    testID = 'x-axis',
    bandGridLinePlacement = 'edges',
    bandTickMarkPlacement = 'middle',
    ...props
  }) => {
    const registrationId = useId();
    const {
      animate,
      getXScale,
      getXAxis,
      registerAxis,
      unregisterAxis,
      getAxisBounds,
      drawingArea,
    } = useCartesianChartContext();

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

    const isBandScale = useMemo(() => {
      if (!xScale) return false;
      return isCategoricalScale(xScale);
    }, [xScale]);

    // Compute grid line positions (including bounds closing line for band scales)
    const gridLinePositions = useMemo((): Array<{ x: number; key: string }> => {
      if (!xScale) return [];

      return ticksData.flatMap((tick, index) => {
        if (!isBandScale) {
          return [{ x: tick.position, key: `grid-${tick.tick}-${index}` }];
        }

        const bandScale = xScale as CategoricalScale;
        const isLastTick = index === ticksData.length - 1;
        const isEdges = bandGridLinePlacement === 'edges';

        const startX = getPointOnScale(tick.tick, bandScale, toPointAnchor(bandGridLinePlacement));
        const positions = [{ x: startX, key: `grid-${tick.tick}-${index}` }];

        // For edges on last tick, add the closing line at stepEnd
        if (isLastTick && isEdges) {
          const endX = getPointOnScale(tick.tick, bandScale, 'stepEnd');
          positions.push({ x: endX, key: `grid-${tick.tick}-${index}-end` });
        }

        return positions;
      });
    }, [ticksData, xScale, isBandScale, bandGridLinePlacement]);

    // Compute tick mark positions (including bounds closing tick mark for band scales)
    const tickMarkPositions = useMemo((): Array<{ x: number; key: string }> => {
      if (!xScale) return [];

      return ticksData.flatMap((tick, index) => {
        if (!isBandScale) {
          return [{ x: tick.position, key: `tick-mark-${tick.tick}-${index}` }];
        }

        const bandScale = xScale as CategoricalScale;
        const isLastTick = index === ticksData.length - 1;
        const isEdges = bandTickMarkPlacement === 'edges';

        const startX = getPointOnScale(tick.tick, bandScale, toPointAnchor(bandTickMarkPlacement));
        const positions = [{ x: startX, key: `tick-mark-${tick.tick}-${index}` }];

        // For edges on last tick, add the closing tick mark at stepEnd
        if (isLastTick && isEdges) {
          const endX = getPointOnScale(tick.tick, bandScale, 'stepEnd');
          positions.push({ x: endX, key: `tick-mark-${tick.tick}-${index}-end` });
        }

        return positions;
      });
    }, [ticksData, xScale, isBandScale, bandTickMarkPlacement]);

    const chartTextData: TextLabelData[] | null = useMemo(() => {
      if (!axisBounds) return null;

      return ticksData.map((tick) => {
        const tickOffset = tickMarkLabelGap + (showTickMarks ? tickMarkSize : 0);

        const availableSpace = AXIS_HEIGHT - tickOffset;
        const labelOffset = availableSpace / 2;

        const labelY =
          position === 'top'
            ? axisBounds.y + axisBounds.height - tickOffset - labelOffset
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

    if (!xScale || !axisBounds || !drawingArea) return;

    const labelX = axisBounds.x + axisBounds.width / 2;
    const labelY =
      position === 'bottom'
        ? axisBounds.y + axisBounds.height - LABEL_SIZE / 2
        : axisBounds.y + LABEL_SIZE / 2;

    const tickYTop = axisBounds.y;
    const tickYBottom = axisBounds.y + axisBounds.height;
    const tickYStart = position === 'bottom' ? tickYTop : tickYBottom;
    const tickYEnd = position === 'bottom' ? tickYTop + tickMarkSize : tickYBottom - tickMarkSize;

    return (
      <g
        className={cx(className, classNames?.root)}
        data-axis="x"
        data-position={position}
        style={{ ...style, ...styles?.root }}
        {...props}
      >
        {showGrid && (
          <g data-testid={`${testID}-grid`}>
            {gridLinePositions.map(({ x, key }) =>
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
                    d={lineToPath(x, drawingArea.y, x, drawingArea.y + drawingArea.height)}
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
                  d={lineToPath(x, drawingArea.y, x, drawingArea.y + drawingArea.height)}
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
        {axisBounds && showTickMarks && (
          <g data-testid={`${testID}-tick-marks`}>
            {tickMarkPositions.map(({ x, key }) =>
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
                    d={lineToPath(x, tickYEnd, x, tickYStart)}
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
                  d={lineToPath(x, tickYEnd, x, tickYStart)}
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
              axisBounds.x,
              position === 'bottom' ? axisBounds.y : axisBounds.y + axisBounds.height,
              axisBounds.x + axisBounds.width,
              position === 'bottom' ? axisBounds.y : axisBounds.y + axisBounds.height,
            )}
            data-testid={`${testID}-line`}
            stroke="var(--color-fg)"
            strokeLinecap="square"
            strokeWidth={1}
            style={styles?.line}
          />
        )}
        {label && (
          <ChartText
            disableRepositioning
            className={classNames?.label}
            horizontalAlignment="center"
            style={styles?.label}
            testID={`${testID}-label`}
            verticalAlignment="middle"
            x={labelX}
            y={labelY}
          >
            {label}
          </ChartText>
        )}
      </g>
    );
  },
);
