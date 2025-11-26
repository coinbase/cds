import { memo, useCallback, useMemo, useState } from 'react';
import type { SharedValue } from 'react-native-reanimated';
import { useDerivedValue } from 'react-native-reanimated';
import type { AnimatedProp } from '@shopify/react-native-skia';

import { useCartesianChartContext } from '../ChartProvider';
import type { ChartTextProps } from '../text';
import { applySerializableScale, useScrubberContext } from '../utils';
import {
  calculateLabelYPositions,
  getLabelPosition,
  type LabelDimensions,
  type LabelPosition,
  type ScrubberLabelPosition,
} from '../utils/scrubber';

import { DefaultScrubberBeaconLabel } from './DefaultScrubberBeaconLabel';
import type { ScrubberBeaconLabelComponent, ScrubberBeaconLabelProps } from './Scrubber';

const PositionedLabel = memo<{
  index: number;
  positions: SharedValue<(LabelPosition | null)[]>;
  position: SharedValue<ScrubberLabelPosition>;
  label: AnimatedProp<string>;
  color?: string;
  seriesId: string;
  onDimensionsChange: (id: string, dimensions: LabelDimensions) => void;
  BeaconLabelComponent: ScrubberBeaconLabelComponent;
  labelHorizontalOffset: number;
  labelFont?: ChartTextProps['font'];
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
  }) => {
    const opacity = useDerivedValue(
      () => (positions.value[index] !== null ? 1 : 0),
      [positions, index],
    );
    const x = useDerivedValue(() => positions.value[index]?.x ?? 0, [positions, index]);
    const y = useDerivedValue(() => positions.value[index]?.y ?? 0, [positions, index]);

    const dx = useDerivedValue(() => {
      return position.value === 'right' ? labelHorizontalOffset : -labelHorizontalOffset;
    }, [position, labelHorizontalOffset]);

    const horizontalAlignment = useDerivedValue(
      () => (position.value === 'right' ? 'left' : 'right'),
      [position],
    );

    return (
      <BeaconLabelComponent
        color={color}
        dx={dx}
        font={labelFont}
        horizontalAlignment={horizontalAlignment}
        label={label}
        onDimensionsChange={(d) => onDimensionsChange(seriesId, d)}
        opacity={opacity}
        seriesId={seriesId}
        x={x}
        y={y}
      />
    );
  },
);

export type ScrubberBeaconLabelGroupBaseProps = {
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
    labelFont,
    BeaconLabelComponent = DefaultScrubberBeaconLabel,
  }) => {
    const {
      getSeries,
      getSeriesData,
      getXSerializableScale,
      getYSerializableScale,
      getXAxis,
      drawingArea,
      dataLength,
    } = useCartesianChartContext();
    const { scrubberPosition } = useScrubberContext();

    const [labelDimensions, setLabelDimensions] = useState<Record<string, LabelDimensions>>({});

    const handleDimensionsChange = useCallback((id: string, dimensions: LabelDimensions) => {
      setLabelDimensions((prev) => {
        const existing = prev[id];

        if (
          existing &&
          existing.width === dimensions.width &&
          existing.height === dimensions.height
        ) {
          return prev;
        }

        return {
          ...prev,
          [id]: dimensions,
        };
      });
    }, []);

    const seriesInfo = useMemo(() => {
      return labels
        .map((label) => {
          const series = getSeries(label.seriesId);
          if (!series) return null;

          const sourceData = getSeriesData(label.seriesId);
          const yScale = getYSerializableScale(series.yAxisId);

          return {
            seriesId: label.seriesId,
            sourceData,
            yScale,
          };
        })
        .filter((info): info is NonNullable<typeof info> => info !== null);
    }, [labels, getSeries, getSeriesData, getYSerializableScale]);

    const xScale = getXSerializableScale();
    const xAxis = getXAxis();

    const dataIndex = useDerivedValue(() => {
      return scrubberPosition.value ?? Math.max(0, dataLength - 1);
    }, [scrubberPosition, dataLength]);

    const dataX = useDerivedValue(() => {
      if (xAxis?.data && Array.isArray(xAxis.data) && xAxis.data[dataIndex.value] !== undefined) {
        const dataValue = xAxis.data[dataIndex.value];
        return typeof dataValue === 'string' ? dataIndex.value : dataValue;
      }
      return dataIndex.value;
    }, [xAxis, dataIndex]);

    const allLabelPositions = useDerivedValue(() => {
      const sharedPixelX =
        dataX.value !== undefined && xScale ? applySerializableScale(dataX.value, xScale) : 0;

      const desiredPositions = seriesInfo.map((info) => {
        let dataY: number | undefined;
        if (xScale && info.yScale) {
          if (
            info.sourceData &&
            dataIndex.value !== undefined &&
            dataIndex.value >= 0 &&
            dataIndex.value < info.sourceData.length
          ) {
            const dataValue = info.sourceData[dataIndex.value];

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
            desiredY: applySerializableScale(dataY, info.yScale),
          };
        }

        // Return null for invalid data
        return null;
      });

      const maxLabelHeight = Math.max(...Object.values(labelDimensions).map((dim) => dim.height));

      const maxLabelWidth = Math.max(...Object.values(labelDimensions).map((dim) => dim.width));

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
    }, [seriesInfo, dataIndex, dataX, xScale, labelDimensions, labelMinGap]);

    const currentPosition = useDerivedValue(() => {
      const pixelX =
        dataX.value !== undefined && xScale ? applySerializableScale(dataX.value, xScale) : 0;

      const maxWidth = Math.max(...Object.values(labelDimensions).map((dim) => dim.width));

      const position = getLabelPosition(pixelX, maxWidth, drawingArea, labelHorizontalOffset);
      return position;
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
          labelFont={labelFont}
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
