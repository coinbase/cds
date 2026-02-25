import { memo, useCallback, useMemo, useState } from 'react';
import { usePreviousValue } from '@coinbase/cds-common/hooks/usePreviousValue';
import type { SharedProps } from '@coinbase/cds-common/types';
import type { Transition } from 'framer-motion';

import { useCartesianChartContext } from '../ChartProvider';
import type { ChartTextChildren, ChartTextProps } from '../text';
import {
  defaultTransition,
  getPointOnScale,
  getTransition,
  instantTransition,
  useScrubberContext,
} from '../utils';
import {
  calculateLabelYPositions,
  getLabelPosition,
  type LabelDimensions,
  type LabelPosition,
  type ScrubberLabelPosition,
} from '../utils/scrubber';

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
  updateTransition: Transition;
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
        color={color}
        dx={dx}
        font={labelFont}
        horizontalAlignment={horizontalAlignment}
        label={label}
        onDimensionsChange={(d) => onDimensionsChange(seriesId, d)}
        seriesId={seriesId}
        transition={updateTransition}
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
   */
  BeaconLabelComponent?: ScrubberBeaconLabelComponent;
  /**
   * Transition configuration for beacon label animations.
   */
  transitions?: ScrubberBeaconProps['transitions'];
};

export const ScrubberBeaconLabelGroup = memo<ScrubberBeaconLabelGroupProps>(
  ({
    labels,
    labelMinGap = 4,
    labelHorizontalOffset = 16,
    labelFont,
    labelPreferredSide = 'right',
    BeaconLabelComponent = DefaultScrubberBeaconLabel,
    transitions,
  }) => {
    const {
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

    const xScale = getXScale();
    const xAxis = getXAxis();

    const dataIndex = useMemo(() => {
      return scrubberPosition ?? Math.max(0, dataLength - 1);
    }, [scrubberPosition, dataLength]);

    const dataX = useMemo(() => {
      if (xAxis?.data && Array.isArray(xAxis.data) && xAxis.data[dataIndex] !== undefined) {
        const dataValue = xAxis.data[dataIndex];
        return typeof dataValue === 'string' ? dataIndex : dataValue;
      }
      return dataIndex;
    }, [xAxis, dataIndex]);

    const allLabelPositions = useMemo(() => {
      if (!xScale || dataX === undefined) return [];

      const sharedPixelX = getPointOnScale(dataX, xScale);

      const desiredPositions = seriesInfo.map((info) => {
        let dataY: number | undefined;
        if (info.yScale) {
          if (
            info.sourceData &&
            dataIndex !== undefined &&
            dataIndex >= 0 &&
            dataIndex < info.sourceData.length
          ) {
            const dataValue = info.sourceData[dataIndex];

            if (Array.isArray(dataValue)) {
              const validValues = dataValue.filter((val): val is number => val !== null);
              if (validValues.length >= 1) {
                dataY = validValues[validValues.length - 1];
              }
            }
          }
        }

        if (dataY !== undefined && info.yScale) {
          return {
            seriesId: info.seriesId,
            x: sharedPixelX,
            desiredY: getPointOnScale(dataY, info.yScale),
          };
        }

        // Return null for invalid data
        return null;
      });

      const maxLabelHeight = Math.max(...Object.values(labelDimensions).map((dim) => dim.height));

      const maxLabelWidth = Math.max(...Object.values(labelDimensions).map((dim) => dim.width));

      // Only apply collision detection to valid positions
      const validPositions = desiredPositions.filter((pos) => pos !== null);

      // Convert to LabelDimension format expected by utility
      const dimensions = validPositions.map((pos) => {
        const trackedDimensions = labelDimensions[pos.seriesId];
        return {
          seriesId: pos.seriesId,
          width: trackedDimensions?.width ?? maxLabelWidth,
          height: trackedDimensions?.height ?? maxLabelHeight,
          preferredX: pos.x,
          preferredY: pos.desiredY,
        };
      });

      // Calculate Y positions with collision resolution for valid positions only
      const yPositions = calculateLabelYPositions(
        dimensions,
        drawingArea,
        maxLabelHeight,
        labelMinGap,
      );

      // Return all positions (including null ones)
      return desiredPositions.map((pos) => {
        if (!pos) return null;
        return {
          seriesId: pos.seriesId,
          x: pos.x,
          y: yPositions.get(pos.seriesId) ?? pos.desiredY,
        };
      });
    }, [seriesInfo, dataIndex, dataX, xScale, labelDimensions, drawingArea, labelMinGap]);

    const currentPosition = useMemo(() => {
      if (!xScale || dataX === undefined) return labelPreferredSide;

      const pixelX = getPointOnScale(dataX, xScale);
      const maxWidth = Math.max(...Object.values(labelDimensions).map((dim) => dim.width));

      return getLabelPosition(
        pixelX,
        maxWidth,
        drawingArea,
        labelHorizontalOffset,
        labelPreferredSide,
      );
    }, [dataX, xScale, labelDimensions, drawingArea, labelHorizontalOffset, labelPreferredSide]);

    return seriesInfo.map((info, index) => {
      const labelInfo = labels.find((label) => label.seriesId === info.seriesId);
      if (!labelInfo) return;
      return (
        <PositionedLabel
          key={info.seriesId}
          BeaconLabelComponent={BeaconLabelComponent}
          color={labelInfo.color}
          index={index}
          label={labelInfo.label}
          labelFont={labelFont}
          labelHorizontalOffset={labelHorizontalOffset}
          onDimensionsChange={handleDimensionsChange}
          position={currentPosition}
          positions={allLabelPositions}
          seriesId={info.seriesId}
          updateTransition={updateTransition}
        />
      );
    });
  },
);
