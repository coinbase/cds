import { memo, useCallback, useMemo, useState } from 'react';
import type { SharedProps } from '@coinbase/cds-common/types';

import { useCartesianChartContext } from '../ChartProvider';
import { getPointOnScale, useScrubberContext } from '../utils';

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
  positions: LabelPosition[];
  position: ScrubberLabelPosition;
  label: string;
  color?: string;
  seriesId: string;
  onDimensionsChange: (id: string, dimensions: LabelDimensions) => void;
}>(({ index, positions, position, label, color, seriesId, onDimensionsChange }) => {
  const x = positions[index]?.x ?? 0;
  const y = positions[index]?.y ?? 0;
  const dx = position === 'right' ? 16 : -16;
  const horizontalAlignment = position === 'right' ? 'left' : 'right';

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

export type ScrubberBeaconLabelGroupBaseProps = SharedProps & {
  labels: Array<{ id: string; label: string; color?: string }>;
  /**
   * Minimum gap between labels in pixels.
   * @default 4
   */
  minLabelGap?: number;
};

export type ScrubberBeaconLabelGroupProps = ScrubberBeaconLabelGroupBaseProps;

export const ScrubberBeaconLabelGroup = memo<ScrubberBeaconLabelGroupProps>(
  ({ labels, minLabelGap = 4 }) => {
    const { getSeries, getSeriesData, getXScale, getYScale, getXAxis, series, drawingArea } =
      useCartesianChartContext();
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
          const yScale = getYScale(series.yAxisId);

          return {
            id: label.id,
            sourceData,
            yScale,
          };
        })
        .filter((info): info is NonNullable<typeof info> => info !== null);
    }, [labels, getSeries, getSeriesData, getYScale]);

    const maxDataLength = useMemo(
      () =>
        series?.reduce((max: any, s: any) => {
          const seriesData = getSeriesData(s.id);
          return Math.max(max, seriesData?.length ?? 0);
        }, 0) ?? 0,
      [series, getSeriesData],
    );

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
      const yPositions = calculateLabelYPositions(
        dimensions,
        drawingArea,
        maxLabelHeight,
        minLabelGap,
      );

      // Return final positions (strategy calculated separately)
      return desiredPositions.map((pos) => ({
        id: pos.id,
        x: pos.x,
        y: yPositions.get(pos.id) ?? pos.desiredY, // Use Y from collision resolution
      }));
    }, [seriesInfo, dataIndex, dataX, xScale, labelDimensions, drawingArea, minLabelGap]);

    const currentPosition = useMemo(() => {
      if (!xScale || dataX === undefined) return 'right';

      const pixelX = getPointOnScale(dataX, xScale);
      const maxWidth = Math.max(...Object.values(labelDimensions).map((dim) => dim.width));

      return getLabelPosition(pixelX, maxWidth, drawingArea, 16);
    }, [dataX, xScale, labelDimensions, drawingArea]);

    return seriesInfo.map((info, index) => {
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
    });
  },
);
