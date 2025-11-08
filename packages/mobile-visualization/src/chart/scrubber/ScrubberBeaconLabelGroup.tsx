import { memo, useCallback, useMemo, useState } from 'react';
import type { SharedValue } from 'react-native-reanimated';
import { runOnJS, useDerivedValue } from 'react-native-reanimated';
import type { SharedProps } from '@coinbase/cds-common/types';
import { Group } from '@shopify/react-native-skia';

import { useCartesianChartContext } from '../ChartProvider';
import { applySerializableScale, useScrubberContext } from '../utils';

import { ScrubberBeaconLabel } from './ScrubberBeaconLabel';
import { calculateLabelSideStrategy, calculateLabelYPositions } from './utils';

type LabelPosition = {
  id: string;
  x: number;
  y: number;
};

type LabelDimensions = {
  width: number;
  height: number;
};

const PositionedLabel = memo<{
  index: number;
  positions: SharedValue<LabelPosition[]>;
  strategy: SharedValue<'left' | 'right'>; // Static strategy value
  label: string;
  color?: string;
  seriesId: string;
  onDimensionsChange: (id: string, dimensions: LabelDimensions) => void;
}>(({ index, positions, strategy, label, color, seriesId, onDimensionsChange }) => {
  const x = useDerivedValue(() => positions.value[index]?.x ?? 0, [positions, index]);
  const y = useDerivedValue(() => positions.value[index]?.y ?? 0, [positions, index]);

  // Calculate dynamic offset based on strategy (matches web implementation)
  const xOffset = useDerivedValue(() => {
    return strategy.value === 'right' ? 16 : -16;
  }, [strategy]);

  // Static horizontal alignment based on strategy
  const horizontalAlignment = useDerivedValue(
    () => (strategy.value === 'right' ? 'left' : 'right'),
    [strategy],
  );

  return (
    <ScrubberBeaconLabel
      color={color}
      horizontalAlignment={horizontalAlignment}
      onDimensionsChange={(d) => onDimensionsChange(seriesId, d)}
      x={x}
      xOffset={xOffset}
      y={y}
    >
      {label}
    </ScrubberBeaconLabel>
  );
});

type ScrubberBeaconLabelSeries = {
  id: string;
  label: string;
  color?: string;
};

export type ScrubberBeaconLabelGroupProps = SharedProps & {
  labels: ScrubberBeaconLabelSeries[];
};

/*
Algorithm for label positions (y based)
1. Get the 'desired' y value
2. Just to min and max values (factoring in height of the scrubber label) - we will base on a height of 21 for now, 11.5px above and below
3. Move labels up and down to be out of the way of each other, factoring in the height of each label and a customizable gap between labels
*/

const minLabelGap = 4;

/**
 * Simple component that positions labels at beacon locations.
 */
export const ScrubberBeaconLabelGroup = memo<ScrubberBeaconLabelGroupProps>(({ labels }) => {
  const {
    getSeries,
    getSeriesData,
    getXSerializableScale,
    getYSerializableScale,
    getXAxis,
    series,
    drawingArea,
  } = useCartesianChartContext();
  const { scrubberPosition } = useScrubberContext();

  // Track label dimensions for accurate positioning
  const [labelDimensions, setLabelDimensions] = useState<Record<string, LabelDimensions>>({});

  // Callback for labels to register their dimensions
  const handleDimensionsChange = useCallback((id: string, dimensions: LabelDimensions) => {
    setLabelDimensions((prev) => {
      const existing = prev[id];

      // Only update if dimensions actually changed
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

  // Pre-calculate series information (non-reactive)
  const seriesInfo = useMemo(() => {
    return labels
      .map((label) => {
        const series = getSeries(label.id);
        if (!series) return null;

        const sourceData = getSeriesData(label.id);
        const yScale = getYSerializableScale(series.yAxisId);

        return {
          id: label.id,
          sourceData,
          yScale,
        };
      })
      .filter((info): info is NonNullable<typeof info> => info !== null);
  }, [labels, getSeries, getSeriesData, getYSerializableScale]);

  // Calculate max data length for fallback positioning (same as ScrubberBeacon)
  const maxDataLength = useMemo(
    () =>
      series?.reduce((max: any, s: any) => {
        const seriesData = getSeriesData(s.id);
        return Math.max(max, seriesData?.length ?? 0);
      }, 0) ?? 0,
    [series, getSeriesData],
  );

  const xScale = getXSerializableScale();
  const xAxis = getXAxis();

  // Calculate data index and x value (same logic as ScrubberBeacon)
  const dataIndex = useDerivedValue(() => {
    return scrubberPosition.value ?? Math.max(0, maxDataLength - 1);
  }, [scrubberPosition, maxDataLength]);

  const dataX = useDerivedValue(() => {
    if (xAxis?.data && Array.isArray(xAxis.data) && xAxis.data[dataIndex.value] !== undefined) {
      const dataValue = xAxis.data[dataIndex.value];
      return typeof dataValue === 'string' ? dataIndex.value : dataValue;
    }
    return dataIndex.value;
  }, [xAxis, dataIndex]);

  // Calculate all label positions in a single derived value with collision detection
  const allLabelPositions = useDerivedValue(() => {
    const sharedPixelX =
      dataX.value !== undefined && xScale ? applySerializableScale(dataX.value, xScale) : 0;

    // Step 1: Get the 'desired' y values for each label
    const desiredPositions = seriesInfo.map((info) => {
      // Calculate dataY for this series
      let dataY: number | undefined;
      if (xScale && info.yScale) {
        if (
          info.sourceData &&
          dataIndex.value !== undefined &&
          dataIndex.value >= 0 &&
          dataIndex.value < info.sourceData.length
        ) {
          const dataValue = info.sourceData[dataIndex.value];

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
        dataY !== undefined && info.yScale ? applySerializableScale(dataY, info.yScale) : 0;

      return {
        id: info.id,
        x: sharedPixelX,
        desiredY,
      };
    });

    // Step 2: Define label dimensions
    const labelHeight = 21;

    // Calculate max width from tracked dimensions, fallback to default if not available
    const maxLabelWidth = Math.max(
      60, // Minimum fallback width
      ...Object.values(labelDimensions).map((dim) => dim.width),
    );

    // Step 3: Complete collision detection using utility function
    // Convert to LabelDimension format expected by utility
    const dimensions = desiredPositions.map((pos) => {
      const trackedDimensions = labelDimensions[pos.id];
      return {
        id: pos.id,
        width: trackedDimensions?.width ?? maxLabelWidth, // Use actual width or max width
        height: trackedDimensions?.height ?? labelHeight, // Use actual height or default
        preferredX: pos.x,
        preferredY: pos.desiredY,
      };
    });

    // Calculate Y positions with collision resolution
    const yPositions = calculateLabelYPositions(dimensions, drawingArea, labelHeight, minLabelGap);

    // Return final positions (strategy calculated separately)
    return desiredPositions.map((pos) => ({
      id: pos.id,
      x: pos.x,
      y: yPositions.get(pos.id) ?? pos.desiredY, // Use Y from collision resolution
    }));
  }, [seriesInfo, dataIndex, dataX, xScale, labelDimensions]);

  const currentStrategy = useDerivedValue(() => {
    const pixelX =
      dataX.value !== undefined && xScale ? applySerializableScale(dataX.value, xScale) : 0;

    const maxWidth = Math.max(...Object.values(labelDimensions).map((dim) => dim.width));

    const strategy = calculateLabelSideStrategy(pixelX, maxWidth, drawingArea, 16);
    return strategy;
  }, [dataX, xScale, labelDimensions, drawingArea]);

  return (
    <Group>
      {seriesInfo.map((info, index) => {
        // Find the corresponding label from the original labels array
        const labelInfo = labels.find((label) => label.id === info.id);
        if (!labelInfo) return;
        return (
          <PositionedLabel
            key={info.id}
            color={labelInfo.color}
            index={index}
            label={labelInfo.label}
            onDimensionsChange={handleDimensionsChange}
            positions={allLabelPositions}
            seriesId={info.id}
            strategy={currentStrategy}
          />
        );
      })}
    </Group>
  );
});
