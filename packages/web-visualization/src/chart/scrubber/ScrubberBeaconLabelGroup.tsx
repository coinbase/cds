import { memo, useCallback, useMemo, useState } from 'react';
import type { SharedProps } from '@coinbase/cds-common/types';

import { useCartesianChartContext } from '../ChartProvider';
import type { ChartTextProps } from '../text';
import { getPointOnScale, type Series, useScrubberContext } from '../utils';
import {
  calculateLabelYPositions,
  getLabelPosition,
  type LabelDimensions,
  type LabelPosition,
  type ScrubberLabelPosition,
} from '../utils/scrubber';

import { DefaultScrubberBeaconLabel } from './DefaultScrubberBeaconLabel';

export type ScrubberBeaconLabelProps = Pick<Series, 'color'> &
  Pick<ChartTextProps, 'x' | 'y' | 'dx' | 'horizontalAlignment' | 'onDimensionsChange'> & {
    /**
     * Label for the series.
     */
    label: string;
    /**
     * Id of the series.
     */
    seriesId: Series['id'];
  };
export type ScrubberBeaconLabelComponent = React.FC<ScrubberBeaconLabelProps>;

const PositionedLabel = memo<{
  index: number;
  positions: LabelPosition[];
  position: ScrubberLabelPosition;
  label: string;
  color?: string;
  seriesId: string;
  onDimensionsChange: (id: string, dimensions: LabelDimensions) => void;
  BeaconLabelComponent: ScrubberBeaconLabelComponent;
  labelHorizontalOffset: number;
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
  }) => {
    const x = positions[index]?.x ?? 0;
    const y = positions[index]?.y ?? 0;
    const dx = position === 'right' ? labelHorizontalOffset : -labelHorizontalOffset;
    const horizontalAlignment = position === 'right' ? 'left' : 'right';

    return (
      <BeaconLabelComponent
        color={color}
        dx={dx}
        horizontalAlignment={horizontalAlignment}
        label={label}
        onDimensionsChange={(d) => onDimensionsChange(seriesId, d)}
        seriesId={seriesId}
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
};

export type ScrubberBeaconLabelGroupProps = ScrubberBeaconLabelGroupBaseProps & {
  /**
   * Custom component to render as a scrubber beacon label.
   * @default DefaultScrubberBeaconLabel
   */
  BeaconLabelComponent?: ScrubberBeaconLabelComponent;
};

export const ScrubberBeaconLabelGroup = memo<ScrubberBeaconLabelGroupProps>(
  ({
    labels,
    labelMinGap = 4,
    labelHorizontalOffset = 16,
    BeaconLabelComponent = DefaultScrubberBeaconLabel,
  }) => {
    const { getSeries, getSeriesData, getXScale, getYScale, getXAxis, drawingArea, maxDataLength } =
      useCartesianChartContext();
    const { scrubberPosition } = useScrubberContext();

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
      return scrubberPosition ?? Math.max(0, maxDataLength - 1);
    }, [scrubberPosition, maxDataLength]);

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

            if (typeof dataValue === 'number') {
              dataY = dataValue;
            } else if (Array.isArray(dataValue)) {
              const validValues = dataValue.filter((val): val is number => val !== null);
              if (validValues.length >= 1) {
                dataY = validValues[validValues.length - 1];
              }
            }
          }
        }

        const desiredY =
          dataY !== undefined && info.yScale ? getPointOnScale(dataY, info.yScale) : 0;

        return {
          seriesId: info.seriesId,
          x: sharedPixelX,
          desiredY,
        };
      });

      const maxLabelHeight = Math.max(...Object.values(labelDimensions).map((dim) => dim.height));

      const maxLabelWidth = Math.max(...Object.values(labelDimensions).map((dim) => dim.width));

      // Step 3: Complete collision detection using utility function
      // Convert to LabelDimension format expected by utility
      const dimensions = desiredPositions.map((pos) => {
        const trackedDimensions = labelDimensions[pos.seriesId];
        return {
          seriesId: pos.seriesId,
          width: trackedDimensions?.width ?? maxLabelWidth, // Use actual width or max width
          height: trackedDimensions?.height ?? maxLabelHeight, // Use actual height or default
          preferredX: pos.x,
          preferredY: pos.desiredY,
        };
      });

      // Calculate Y positions with collision resolution
      const yPositions = calculateLabelYPositions(
        dimensions,
        drawingArea,
        maxLabelHeight,
        labelMinGap,
      );

      // Return final positions (strategy calculated separately)
      return desiredPositions.map((pos) => ({
        seriesId: pos.seriesId,
        x: pos.x,
        y: yPositions.get(pos.seriesId) ?? pos.desiredY, // Use Y from collision resolution
      }));
    }, [seriesInfo, dataIndex, dataX, xScale, labelDimensions, drawingArea, labelMinGap]);

    const currentPosition = useMemo(() => {
      if (!xScale || dataX === undefined) return 'right';

      const pixelX = getPointOnScale(dataX, xScale);
      const maxWidth = Math.max(...Object.values(labelDimensions).map((dim) => dim.width));

      return getLabelPosition(pixelX, maxWidth, drawingArea, labelHorizontalOffset);
    }, [dataX, xScale, labelDimensions, drawingArea, labelHorizontalOffset]);

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
          labelHorizontalOffset={labelHorizontalOffset}
          onDimensionsChange={handleDimensionsChange}
          position={currentPosition}
          positions={allLabelPositions}
          seriesId={info.seriesId}
        />
      );
    });
  },
);
