import React, { forwardRef, memo, useCallback, useImperativeHandle, useMemo } from 'react';
import { useRefMap } from '@coinbase/cds-common/hooks/useRefMap';
import type { SharedProps } from '@coinbase/cds-common/types';
import { m as motion } from 'framer-motion';

import { useCartesianChartContext } from '../ChartProvider';
import { type LineComponent, ReferenceLine, type ReferenceLineProps } from '../line';
import {
  accessoryFadeTransitionDelay,
  accessoryFadeTransitionDuration,
  type ChartScaleFunction,
  evaluateGradientAtValue,
  getGradientConfig,
  getPointOnScale,
  useScrubberContext,
} from '../utils';

import { ScrubberBeacon, type ScrubberBeaconProps, type ScrubberBeaconRef } from './ScrubberBeacon';
import {
  ScrubberBeaconLabelGroup,
  type ScrubberBeaconLabelGroupBaseProps,
  type ScrubberBeaconLabelGroupProps,
} from './ScrubberBeaconLabelGroup';

export type ScrubberBaseProps = SharedProps &
  Pick<ScrubberBeaconLabelGroupBaseProps, 'labelMinGap' | 'labelHorizontalOffset'> & {
    /**
     * Array of series IDs to highlight when scrubbing with scrubber beacons.
     * By default, all series will be highlighted.
     */
    seriesIds?: string[];
    /**
     * Hides the scrubber line
     */
    hideLine?: boolean;
    /**
     * Hides the overlay rect which obscures data beyond the scrubber position.
     */
    hideOverlay?: boolean;
    /**
     * Offset of the overlay rect relative to the drawing area.
     * Useful for when scrubbing over lines, where the stroke width would cause part of the line to be visible.
     * @default 2
     */
    overlayOffset?: number;
  };

export type ScrubberProps = ScrubberBaseProps &
  Pick<ScrubberBeaconProps, 'idlePulse'> &
  Pick<ScrubberBeaconLabelGroupProps, 'BeaconLabelComponent'> & {
    /**
     * Label text displayed above the scrubber line.
     * Can be a static string or a function that receives the current dataIndex.
     */
    label?: ReferenceLineProps['label'] | ((dataIndex: number) => ReferenceLineProps['label']);
    /**
     * Accessibility label for the scrubber. Can be a static string or a function that receives the current dataIndex.
     * If not provided, label will be used if it resolves to a string.
     */
    accessibilityLabel?: string | ((dataIndex: number) => string);
    /**
     * Props passed to the scrubber line's label.
     * @todo can we get rid of this?
     */
    labelProps?: ReferenceLineProps['labelProps'];
    /**
     * Stroke color for the scrubber line.
     */
    lineStroke?: ReferenceLineProps['stroke'];
    /**
     * Custom styles for scrubber elements.
     */
    styles?: {
      overlay?: React.CSSProperties;
      beacon?: React.CSSProperties;
      line?: React.CSSProperties;
      beaconLabel?: React.CSSProperties;
    };
    /**
     * Custom class names for scrubber elements.
     */
    classNames?: {
      overlay?: string;
      beacon?: string;
      line?: string;
      beaconLabel?: string;
    };
    /**
     * Custom component for the scrubber beacon.
     */
    BeaconComponent?: React.ComponentType<ScrubberBeaconProps>;
    /**
     * Custom component for the scrubber line.
     */
    LineComponent?: LineComponent;
    /**
     * Transition configuration for the scrubber beacon.
     */
    beaconTransitions?: ScrubberBeaconProps['transitions'];
  };

export type ScrubberRef = ScrubberBeaconRef;

/**
 * Unified component that manages all scrubber elements (beacons, line, labels).
 */
export const Scrubber = memo(
  forwardRef<ScrubberRef, ScrubberProps>(
    (
      {
        seriesIds,
        hideLine,
        label,
        accessibilityLabel,
        lineStroke,
        labelProps,
        BeaconComponent = ScrubberBeacon,
        BeaconLabelComponent,
        LineComponent,
        hideOverlay,
        overlayOffset = 2,
        labelMinGap,
        labelHorizontalOffset,
        testID,
        idlePulse,
        beaconTransitions,
        styles,
        classNames,
      },
      ref,
    ) => {
      const ScrubberBeaconRefs = useRefMap<ScrubberBeaconRef>();

      const { scrubberPosition } = useScrubberContext();
      const {
        getXScale,
        getYScale,
        getSeriesData,
        getXAxis,
        getYAxis,
        animate,
        series,
        drawingArea,
      } = useCartesianChartContext();
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

      const filteredSeries = useMemo(() => {
        if (seriesIds === undefined) return series;
        return series?.filter((s) => seriesIds.includes(s.id)) ?? [];
      }, [series, seriesIds]);

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

      const seriesGradients = useMemo(() => {
        const xScale = getXScale();
        if (!xScale) return [];

        return (
          filteredSeries
            ?.map((s) => {
              if (!s.gradient) return null;

              const yScale = getYScale(s.yAxisId);
              if (!yScale) return null;

              const gradientScale = s.gradient.axis === 'x' ? xScale : yScale;
              const stops = getGradientConfig(s.gradient, xScale, yScale);
              if (!stops) return null;

              return {
                seriesId: s.id,
                gradient: s.gradient,
                scale: gradientScale,
                stops,
              };
            })
            .filter((g): g is NonNullable<typeof g> => g !== null) ?? []
        );
      }, [getXScale, filteredSeries, getYScale]);

      const beaconPositions = useMemo(() => {
        const xScale = getXScale() as ChartScaleFunction;
        const xAxis = getXAxis();

        if (!xScale || dataX === undefined || dataIndex === undefined || !xAxis) return [];

        return (
          filteredSeries
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
                const yScale = getYScale(s.yAxisId) as ChartScaleFunction;
                const yAxis = getYAxis(s.yAxisId);

                if (!yScale || !yAxis) return;

                const pixelY = getPointOnScale(dataY, yScale);

                let evaluatedColor: string | undefined = s.color;
                const seriesGradientConfig = seriesGradients.find((g) => g.seriesId === s.id);
                if (seriesGradientConfig) {
                  const gradientAxis = seriesGradientConfig.gradient.axis ?? 'y';
                  const dataValue = gradientAxis === 'x' ? dataX : dataY;
                  const colorResult = evaluateGradientAtValue(
                    seriesGradientConfig.stops,
                    dataValue,
                    seriesGradientConfig.scale,
                  );
                  if (colorResult) {
                    evaluatedColor = colorResult;
                  }
                }

                return {
                  x: dataX,
                  y: dataY,
                  label,
                  pixelY,
                  targetSeries: { ...s, color: evaluatedColor },
                };
              }
            })
            .filter((beacon: any) => beacon !== undefined) ?? []
        );
      }, [
        getXScale,
        getXAxis,
        dataX,
        dataIndex,
        filteredSeries,
        getStackedSeriesData,
        getSeriesData,
        getYScale,
        getYAxis,
        seriesGradients,
        label,
      ]);

      // Compute resolved accessibility label
      const resolvedAccessibilityLabel = useMemo(() => {
        if (dataIndex === undefined) return undefined;

        // If accessibilityLabel is provided, use it
        if (accessibilityLabel) {
          return typeof accessibilityLabel === 'function'
            ? accessibilityLabel(dataIndex)
            : accessibilityLabel;
        }

        // Otherwise, if label resolves to a string, use that
        const resolvedLabel = typeof label === 'function' ? label(dataIndex) : label;
        return typeof resolvedLabel === 'string' ? resolvedLabel : undefined;
      }, [accessibilityLabel, label, dataIndex]);

      const scrubberBeaconLabels: Array<{ id: string; label: string; color?: string }> = useMemo(
        () =>
          filteredSeries
            .filter((s) => s.label !== undefined && s.label.length > 0)
            .map((s) => ({
              id: s.id,
              label: s.label!,
              color: s.color,
            })),
        [filteredSeries],
      );

      // Callback to create ref handlers for scrubber beacons
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

      // Check if we have at least the default X scale
      const defaultXScale = getXScale();
      if (!defaultXScale) return null;

      const pixelX =
        dataX !== undefined && defaultXScale ? getPointOnScale(dataX, defaultXScale) : undefined;

      return (
        <motion.g
          aria-atomic="true"
          aria-label={resolvedAccessibilityLabel}
          aria-live="polite"
          data-component="scrubber-group"
          data-testid={testID}
          role="status"
          {...(animate
            ? {
                animate: {
                  opacity: 1,
                  transition: {
                    duration: accessoryFadeTransitionDuration,
                    delay: accessoryFadeTransitionDelay,
                  },
                },
                exit: { opacity: 0, transition: { duration: accessoryFadeTransitionDuration } },
                initial: { opacity: 0 },
              }
            : {})}
        >
          {!hideOverlay && pixelX !== undefined && (
            <rect
              className={classNames?.overlay}
              fill="var(--color-bg)"
              height={drawingArea.height + overlayOffset * 2}
              opacity={0.8}
              style={styles?.overlay}
              width={drawingArea.x + drawingArea.width - pixelX + overlayOffset}
              x={pixelX}
              y={drawingArea.y - overlayOffset}
            />
          )}
          {!hideLine && dataX !== undefined && (
            <ReferenceLine
              LineComponent={LineComponent}
              className={classNames?.line}
              dataX={dataX}
              label={typeof label === 'function' ? label(dataIndex) : label}
              labelProps={{
                verticalAlignment: 'middle',
                // Place in the middle vertically by default
                dy: -0.5 * drawingArea.y,
                ...labelProps,
              }}
              stroke={lineStroke}
              style={styles?.line}
            />
          )}
          {beaconPositions.map((beacon: any) => {
            if (!beacon) return;

            return (
              <BeaconComponent
                key={beacon.targetSeries.id}
                ref={createScrubberBeaconRef(beacon.targetSeries.id) as any}
                className={classNames?.beacon}
                color={beacon.targetSeries?.color}
                dataX={beacon.x}
                dataY={beacon.y}
                idlePulse={idlePulse}
                seriesId={beacon.targetSeries.id}
                style={styles?.beacon}
                testID={testID ? `${testID}-${beacon.targetSeries.id}-dot` : undefined}
                transitions={beaconTransitions}
              />
            );
          })}
          {scrubberBeaconLabels.length > 0 && (
            <ScrubberBeaconLabelGroup
              BeaconLabelComponent={BeaconLabelComponent}
              labelHorizontalOffset={labelHorizontalOffset}
              labelMinGap={labelMinGap}
              labels={scrubberBeaconLabels}
            />
          )}
        </motion.g>
      );
    },
  ),
);
