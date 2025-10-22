import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
} from 'react';
import { useSharedValue } from 'react-native-reanimated';
import { useRefMap } from '@coinbase/cds-common/hooks/useRefMap';
import type { SharedProps } from '@coinbase/cds-common/types';
import { useTheme } from '@coinbase/cds-mobile';
import { Group, Rect } from '@shopify/react-native-skia';

import { useCartesianChartContext } from '../ChartProvider';
import { ReferenceLine, type ReferenceLineProps } from '../line';
import { type ChartScaleFunction, useScrubberContext } from '../utils';

import { ScrubberBeacon, type ScrubberBeaconProps, type ScrubberBeaconRef } from './ScrubberBeacon';

/**
 * Configuration for scrubber functionality across chart components.
 * Provides consistent API with smart defaults and component customization.
 */
export type ScrubberProps = SharedProps &
  Pick<ScrubberBeaconProps, 'idlePulse'> & {
    /**
     * An array of series IDs that will receive visual emphasis as the user scrubs through the chart.
     * Use this prop to restrict the scrubbing visual behavior to specific series.
     * By default, all series will be highlighted by the Scrubber.
     */
    seriesIds?: string[];

    /**
     * Hides the scrubber line
     */
    hideLine?: boolean;

    /**
     * Whether to hide the overlay rect which obscures future data.
     */
    hideOverlay?: boolean;

    /**
     * Offset of the overlay rect relative to the drawing area.
     * Useful for when scrubbing over lines, where the stroke width would cause part of the line to be visible.
     * @default 2
     */
    overlayOffset?: number;

    /**
     * Label text displayed above the scrubber line.
     */
    label?: ReferenceLineProps['label'] | ((dataIndex: number) => ReferenceLineProps['label']);

    /**
     * Props passed to the scrubber line's label.
     */
    labelProps?: ReferenceLineProps['labelProps'];

    /**
     * Stroke color for the scrubber line.
     */
    lineStroke?: ReferenceLineProps['stroke'];

    /**
     * Custom component for the scrubber beacon.
     */
    BeaconComponent?: React.ComponentType<ScrubberBeaconProps>;

    /**
     * Custom component for the scrubber line.
     */
    LineComponent?: React.ComponentType<ReferenceLineProps>;
  };

export type ScrubberRef = ScrubberBeaconRef;

/**
 * Unified component that manages all scrubber elements (beacons, line, labels)
 * with intelligent collision detection and consistent positioning.
 */
export const Scrubber = memo(
  forwardRef<ScrubberRef, ScrubberProps>(
    (
      {
        seriesIds,
        hideLine,
        label,
        lineStroke,
        labelProps,
        BeaconComponent = ScrubberBeacon,
        LineComponent = ReferenceLine,
        hideOverlay,
        overlayOffset = 2,
        testID,
        idlePulse,
      },
      ref,
    ) => {
      const theme = useTheme();
      const ScrubberBeaconRefs = useRefMap<ScrubberBeaconRef>();

      // Shared values for overlay and scrubber line positions
      const overlayX = useSharedValue(0);
      const overlayWidth = useSharedValue(0);
      const scrubberLineX = useSharedValue(0);

      const { scrubberPosition: scrubberPosition } = useScrubberContext();
      const { getXScale, getYScale, getSeriesData, getXAxis, series, drawingArea } =
        useCartesianChartContext();
      const getStackedSeriesData = getSeriesData; // getSeriesData now returns stacked data

      // Expose imperative handle with pulse method
      useImperativeHandle(ref, () => ({
        pulse: () => {
          // Pulse all registered scrubber beacons
          Object.values(ScrubberBeaconRefs.refs).forEach((beaconRef) => {
            beaconRef?.pulse();
          });
        },
      }));

      const { dataX, dataIndex } = useMemo(() => {
        const xScale = getXScale() as ChartScaleFunction;
        const xAxis = getXAxis();
        if (!xScale) return { dataX: undefined, dataIndex: undefined };

        const maxDataLength =
          series?.reduce((max: any, s: any) => {
            const seriesData = getStackedSeriesData(s.id) || getSeriesData(s.id);
            return Math.max(max, seriesData?.length ?? 0);
          }, 0) ?? 0;

        const dataIndex = scrubberPosition ?? Math.max(0, maxDataLength - 1);

        // Convert index to actual x value if axis has data
        let dataX: number;
        if (xAxis?.data && Array.isArray(xAxis.data) && xAxis.data[dataIndex] !== undefined) {
          const dataValue = xAxis.data[dataIndex];
          dataX = typeof dataValue === 'string' ? dataIndex : dataValue;
        } else {
          dataX = dataIndex;
        }

        return { dataX, dataIndex };
      }, [getXScale, getXAxis, series, scrubberPosition, getStackedSeriesData, getSeriesData]);

      const beaconPositions = useMemo(() => {
        const xScale = getXScale() as ChartScaleFunction;

        if (!xScale || dataX === undefined || dataIndex === undefined) return [];

        return (
          series
            ?.filter((s) => {
              if (seriesIds === undefined) return true;
              return seriesIds.includes(s.id);
            })
            ?.map((s) => {
              const sourceData = getStackedSeriesData(s.id) || getSeriesData(s.id);
              // Use dataIndex to get the y value from the series data array
              const stuff = sourceData?.[dataIndex];
              let dataY: number | undefined;
              if (Array.isArray(stuff)) {
                dataY = stuff[stuff.length - 1];
              } else if (typeof stuff === 'number') {
                dataY = stuff;
              }

              if (dataY !== undefined) {
                return {
                  x: dataX,
                  y: dataY,
                  targetSeries: s,
                  colorMap: s.colorMap,
                };
              }
            })
            .filter((beacon: any) => beacon !== undefined) ?? []
        );
      }, [getXScale, dataX, dataIndex, series, seriesIds, getStackedSeriesData, getSeriesData]);

      const createScrubberBeaconRef = useCallback(
        (seriesId: string) => {
          return (beaconRef: ScrubberBeaconRef | null) => {
            if (beaconRef) {
              ScrubberBeaconRefs.registerRef(seriesId, beaconRef);
            }
          };
        },
        [ScrubberBeaconRefs],
      );

      const defaultXScale = getXScale();

      const pixelX = dataX !== undefined && defaultXScale ? defaultXScale(dataX) : undefined;

      const memoizedScrubberLabel: ReferenceLineProps['label'] = useMemo(() => {
        if (typeof label === 'function') {
          if (dataIndex === undefined) return undefined;
          return label(dataIndex);
        }
        return label;
      }, [label, dataIndex]);

      useEffect(() => {
        if (pixelX !== undefined) {
          scrubberLineX.value = pixelX;
          overlayX.value = pixelX;
          overlayWidth.value = drawingArea.x + drawingArea.width - pixelX + overlayOffset;
        }
      }, [pixelX, drawingArea, overlayOffset, scrubberLineX, overlayX, overlayWidth]);

      if (!defaultXScale) return null;

      return (
        <>
          {!hideOverlay &&
            dataX !== undefined &&
            scrubberPosition !== undefined &&
            pixelX !== undefined && (
              <Rect
                color={theme.color.bg}
                height={drawingArea.height + overlayOffset * 2}
                opacity={0.8}
                width={overlayWidth}
                x={overlayX}
                y={drawingArea.y - overlayOffset}
              />
            )}
          {!hideLine && scrubberPosition !== undefined && dataX !== undefined && (
            <LineComponent
              dataX={dataX}
              label={memoizedScrubberLabel}
              labelProps={{
                verticalAlignment: 'middle',
                ...labelProps,
              }}
              stroke={lineStroke}
            />
          )}
          {beaconPositions
            .filter((beacon) => beacon !== undefined)
            .map((beacon) => (
              <Group key={beacon.targetSeries.id}>
                <BeaconComponent
                  ref={createScrubberBeaconRef(beacon.targetSeries.id)}
                  color={beacon.targetSeries?.color}
                  colorMap={beacon.colorMap}
                  dataX={beacon.x}
                  dataY={beacon.y}
                  idlePulse={idlePulse}
                  seriesId={beacon.targetSeries.id}
                  testID={testID ? `${testID}-${beacon.targetSeries.id}-dot` : undefined}
                />
              </Group>
            ))}
        </>
      );
    },
  ),
);
