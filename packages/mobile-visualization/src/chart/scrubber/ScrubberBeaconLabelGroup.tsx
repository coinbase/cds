import { memo, useCallback, useMemo, useState } from 'react';
import type { SharedValue } from 'react-native-reanimated';
import { useDerivedValue } from 'react-native-reanimated';
import type { SharedProps } from '@coinbase/cds-common/types';
import { Group } from '@shopify/react-native-skia';

import { useCartesianChartContext } from '../ChartProvider';
import { applySerializableScale, useScrubberContext } from '../utils';

import { ScrubberBeaconLabel } from './ScrubberBeaconLabel';
import { calculateLabelYPositions, getLabelPosition, type ScrubberLabelPosition } from './utils';

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
  position: SharedValue<ScrubberLabelPosition>;
  label: string;
  color?: string;
  seriesId: string;
  onDimensionsChange: (id: string, dimensions: LabelDimensions) => void;
}>(({ index, positions, position, label, color, seriesId, onDimensionsChange }) => {
  const x = useDerivedValue(() => positions.value[index]?.x ?? 0, [positions, index]);
  const y = useDerivedValue(() => positions.value[index]?.y ?? 0, [positions, index]);

  const dx = useDerivedValue(() => {
    return position.value === 'right' ? 16 : -16;
  }, [position]);

  const horizontalAlignment = useDerivedValue(
    () => (position.value === 'right' ? 'left' : 'right'),
    [position],
  );

  return (
    <ScrubberBeaconLabel
      color={color}
      dx={dx}
      horizontalAlignment={horizontalAlignment}
      onDimensionsChange={(d) => onDimensionsChange(seriesId, d)}
      x={x}
      y={y}
    >
      {label}
    </ScrubberBeaconLabel>
  );
});

export type ScrubberBeaconLabelGroupProps = SharedProps & {
  labels: Array<{ id: string; label: string; color?: string }>;
};

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

    const maxLabelHeight = Math.max(...Object.values(labelDimensions).map((dim) => dim.height));

    const maxLabelWidth = Math.max(...Object.values(labelDimensions).map((dim) => dim.width));

    // Step 3: Complete collision detection using utility function
    // Convert to LabelDimension format expected by utility
    const dimensions = desiredPositions.map((pos) => {
      const trackedDimensions = labelDimensions[pos.id];
      return {
        id: pos.id,
        width: trackedDimensions?.width ?? maxLabelWidth, // Use actual width or max width
        height: trackedDimensions?.height ?? maxLabelHeight, // Use actual height or default
        preferredX: pos.x,
        preferredY: pos.desiredY,
      };
    });

    // Calculate Y positions with collision resolution
    const yPositions = calculateLabelYPositions(dimensions, drawingArea, maxLabelHeight);

    // Return final positions (strategy calculated separately)
    return desiredPositions.map((pos) => ({
      id: pos.id,
      x: pos.x,
      y: yPositions.get(pos.id) ?? pos.desiredY, // Use Y from collision resolution
    }));
  }, [seriesInfo, dataIndex, dataX, xScale, labelDimensions]);

  const currentPosition = useDerivedValue(() => {
    const pixelX =
      dataX.value !== undefined && xScale ? applySerializableScale(dataX.value, xScale) : 0;

    const maxWidth = Math.max(...Object.values(labelDimensions).map((dim) => dim.width));

    const position = getLabelPosition(pixelX, maxWidth, drawingArea, 16);
    return position;
  }, [dataX, xScale, labelDimensions, drawingArea]);

  return (
    <Group>
      {seriesInfo.map((info, index) => {
        const labelInfo = labels.find((label) => label.id === info.id);
        if (!labelInfo) return;
        return (
          <PositionedLabel
            key={info.id}
            color={labelInfo.color}
            index={index}
            label={labelInfo.label}
            onDimensionsChange={handleDimensionsChange}
            position={currentPosition}
            positions={allLabelPositions}
            seriesId={info.id}
          />
        );
      })}
    </Group>
  );
});
