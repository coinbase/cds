import { type CSSProperties, memo, useCallback, useMemo, useState } from 'react';
import { usePreviousValue } from '@coinbase/cds-common/hooks/usePreviousValue';
import type { SharedProps } from '@coinbase/cds-common/types';
import type { Transition } from 'framer-motion';

import { useCartesianChartContext } from '../ChartProvider';
import type { ChartTextChildren, ChartTextProps } from '../text';
import { type ChartScaleFunction, getPointOnScale, useScrubberContext } from '../utils';
import {
  calculateLabelStackedPositions,
  getLabelPosition,
  type LabelDimensions,
  type LabelPosition,
  type ScrubberLabelPosition,
} from '../utils/scrubber';
import { defaultTransition, getTransition, instantTransition } from '../utils/transition';

import { DefaultScrubberBeaconLabel } from './DefaultScrubberBeaconLabel';
import type {
  ScrubberBeaconLabelComponent,
  ScrubberBeaconLabelProps,
  ScrubberBeaconProps,
} from './Scrubber';

const PositionedLabel = memo<{
  index: number;
  positions: (LabelPosition | null)[];
  position: ScrubberLabelPosition;
  label: ChartTextChildren;
  color?: string;
  seriesId: string;
  onDimensionsChange: (id: string, dimensions: LabelDimensions) => void;
  BeaconLabelComponent: ScrubberBeaconLabelComponent;
  labelHorizontalOffset: number;
  labelFont?: ChartTextProps['font'];
  updateTransition: Transition | null;
  className?: string;
  style?: CSSProperties;
}>(
  ({
    index,
    positions,
    position,
    label,
    color,
    seriesId,
    onDimensionsChange,
    BeaconLabelComponent,
    labelHorizontalOffset,
    labelFont,
    updateTransition,
    className,
    style,
  }) => {
    const pos = positions[index];

    // Don't render if position is null (invalid data)
    if (!pos) {
      return null;
    }

    const x = pos.x;
    const y = pos.y;
    const dx = position === 'right' ? labelHorizontalOffset : -labelHorizontalOffset;
    const horizontalAlignment = position === 'right' ? 'left' : 'right';

    return (
      <BeaconLabelComponent
        className={className}
        color={color}
        dx={dx}
        font={labelFont}
        horizontalAlignment={horizontalAlignment}
        label={label}
        onDimensionsChange={(d) => onDimensionsChange(seriesId, d)}
        seriesId={seriesId}
        style={style}
        transition={updateTransition ?? instantTransition}
        x={x}
        y={y}
      />
    );
  },
);

export type ScrubberBeaconLabelGroupBaseProps = SharedProps & {
  /**
   * Labels to be displayed.
   */
  labels: Array<Pick<ScrubberBeaconLabelProps, 'seriesId' | 'label' | 'color'>>;
  /**
   * Minimum gap between labels in pixels.
   * @default 4
   */
  labelMinGap?: number;
  /**
   * Horizontal offset of labels from the scrubber line in pixels.
   * @default 16
   */
  labelHorizontalOffset?: number;
  /**
   * Font style for the beacon labels.
   */
  labelFont?: ChartTextProps['font'];
  /**
   * Preferred side for labels.
   * @note labels will switch to the opposite side if there's not enough space on the preferred side.
   * @default 'right'
   */
  labelPreferredSide?: ScrubberLabelPosition;
};

export type ScrubberBeaconLabelGroupProps = ScrubberBeaconLabelGroupBaseProps & {
  /**
   * Custom component to render as a scrubber beacon label.
   * @default DefaultScrubberBeaconLabel
   * @note Beacon labels are only supported in vertical layout.
   */
  BeaconLabelComponent?: ScrubberBeaconLabelComponent;
  /**
   * Transition configuration for beacon label animations.
   */
  transitions?: ScrubberBeaconProps['transitions'];
  /**
   * Custom class name for each beacon label.
   */
  className?: string;
  /**
   * Custom inline styles for each beacon label.
   */
  style?: CSSProperties;
};

export const ScrubberBeaconLabelGroup = memo<ScrubberBeaconLabelGroupProps>(
  ({
    labels,
    labelMinGap = 4,
    labelHorizontalOffset = 16,
    labelFont,
    BeaconLabelComponent = DefaultScrubberBeaconLabel,
    transitions,
    className,
    style,
  }) => {
    const {
      layout,
      getSeries,
      getSeriesData,
      getXScale,
      getYScale,
      getXAxis,
      drawingArea,
      dataLength,
      animate,
    } = useCartesianChartContext();
    const { scrubberPosition } = useScrubberContext();

    const isIdle = scrubberPosition === undefined;

    const prevIsIdle = usePreviousValue(isIdle);
    const isIdleTransition = prevIsIdle !== undefined && isIdle !== prevIsIdle;

    const updateTransition = useMemo(() => {
      if (isIdleTransition) return instantTransition;
      if (!isIdle) return instantTransition;
      return getTransition(transitions?.update, animate, defaultTransition);
    }, [transitions?.update, isIdle, animate, isIdleTransition]);

    if (layout === 'horizontal') {
      return null;
    }

    const [labelDimensions, setLabelDimensions] = useState<Record<string, LabelDimensions>>({});

    const handleDimensionsChange = useCallback((seriesId: string, dimensions: LabelDimensions) => {
      setLabelDimensions((prev) => {
        const existing = prev[seriesId];

        if (
          existing &&
          existing.width === dimensions.width &&
          existing.height === dimensions.height
        ) {
          return prev;
        }

        return {
          ...prev,
          [seriesId]: dimensions,
        };
      });
    }, []);

    const seriesInfo = useMemo(() => {
      return labels
        .map((label) => {
          const series = getSeries(label.seriesId);
          if (!series) return null;

          const sourceData = getSeriesData(label.seriesId);
          const yScale = getYScale(series.yAxisId);

          return {
            seriesId: label.seriesId,
            sourceData,
            yScale,
          };
        })
        .filter((info): info is NonNullable<typeof info> => info !== null);
    }, [labels, getSeries, getSeriesData, getYScale]);

    const indexAxis = getXAxis();
    const indexScaleFallback = getXScale() as ChartScaleFunction;

    const dataIndex = useMemo(() => {
      return scrubberPosition ?? Math.max(0, dataLength - 1);
    }, [scrubberPosition, dataLength]);

    const dataIndexValue = useMemo(() => {
      if (
        indexAxis?.data &&
        Array.isArray(indexAxis.data) &&
        indexAxis.data[dataIndex] !== undefined
      ) {
        const val = indexAxis.data[dataIndex];
        return typeof val === 'string' ? dataIndex : val;
      }
      return dataIndex;
    }, [indexAxis, dataIndex]);

    const allLabelPositions = useMemo(() => {
      if (!indexScaleFallback || dataIndexValue === undefined) return [];

      const sharedIndexPixelPos = getPointOnScale(dataIndexValue, indexScaleFallback);

      const desiredPositions = seriesInfo.map((info) => {
        let dataValue: number | undefined;
        if (
          info.sourceData &&
          dataIndex !== undefined &&
          dataIndex >= 0 &&
          dataIndex < info.sourceData.length
        ) {
          const val = info.sourceData[dataIndex];

          if (Array.isArray(val)) {
            const validValues = val.filter((v): v is number => v !== null);
            if (validValues.length >= 1) {
              dataValue = validValues[validValues.length - 1];
            }
          } else if (typeof val === 'number') {
            dataValue = val;
          }
        }

        if (dataValue !== undefined && info.yScale) {
          const pixelValuePos = getPointOnScale(dataValue, info.yScale);
          return {
            seriesId: info.seriesId,
            indexPixelPos: sharedIndexPixelPos,
            desiredValuePixelPos: pixelValuePos,
          };
        }

        return null;
      });

      const maxLabelHeight = Math.max(
        ...Object.values(labelDimensions).map((dim) => dim.height),
        16,
      );
      const maxLabelWidth = Math.max(...Object.values(labelDimensions).map((dim) => dim.width), 40);

      const validPositions = desiredPositions.filter((pos) => pos !== null);

      // Collision detection logic for vertical charts:
      // labels are stacked along the Y/value axis.
      const dimensions = validPositions.map((pos) => {
        const trackedDimensions = labelDimensions[pos.seriesId];
        return {
          seriesId: pos.seriesId,
          width: trackedDimensions?.width ?? maxLabelWidth,
          height: trackedDimensions?.height ?? maxLabelHeight,
          preferredX: pos.indexPixelPos,
          preferredY: pos.desiredValuePixelPos,
        };
      });

      const resolvedPositions = calculateLabelStackedPositions(
        dimensions,
        drawingArea.y,
        drawingArea.height,
        maxLabelHeight,
        labelMinGap,
      );

      return desiredPositions.map((pos) => {
        if (!pos) return null;
        const resolvedValuePos = resolvedPositions.get(pos.seriesId) ?? pos.desiredValuePixelPos;
        return {
          seriesId: pos.seriesId,
          x: pos.indexPixelPos,
          y: resolvedValuePos,
        };
      });
    }, [
      seriesInfo,
      dataIndex,
      dataIndexValue,
      indexScaleFallback,
      labelDimensions,
      drawingArea,
      labelMinGap,
    ]);

    const currentPosition = useMemo(() => {
      if (!indexScaleFallback || dataIndexValue === undefined) return 'right';

      const maxWidth = Math.max(...Object.values(labelDimensions).map((dim) => dim.width), 40);
      const categoryPixelPos = getPointOnScale(dataIndexValue, indexScaleFallback);
      return getLabelPosition(categoryPixelPos, maxWidth, drawingArea.width, labelHorizontalOffset);
    }, [dataIndexValue, indexScaleFallback, labelDimensions, drawingArea, labelHorizontalOffset]);

    return seriesInfo.map((info, index) => {
      const labelInfo = labels.find((label) => label.seriesId === info.seriesId);
      if (!labelInfo) return;
      return (
        <PositionedLabel
          key={info.seriesId}
          BeaconLabelComponent={BeaconLabelComponent}
          className={className}
          color={labelInfo.color}
          index={index}
          label={labelInfo.label}
          labelFont={labelFont}
          labelHorizontalOffset={labelHorizontalOffset}
          onDimensionsChange={handleDimensionsChange}
          position={currentPosition}
          positions={allLabelPositions}
          seriesId={info.seriesId}
          style={style}
          updateTransition={updateTransition}
        />
      );
    });
  },
);
