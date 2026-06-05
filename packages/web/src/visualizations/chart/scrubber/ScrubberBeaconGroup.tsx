import { forwardRef, memo, useCallback, useImperativeHandle, useMemo } from 'react';
import { useRefMap } from '@coinbase/cds-common/hooks/useRefMap';
import type { SharedProps } from '@coinbase/cds-common/types';

import { useCartesianChartContext } from '../ChartProvider';
import {
  type ChartScaleFunction,
  evaluateGradientAtValue,
  getGradientAxis,
  getGradientConfig,
  useScrubberContext,
} from '../utils';

import { DefaultScrubberBeacon } from './DefaultScrubberBeacon';
import type { ScrubberBeaconComponent, ScrubberBeaconProps, ScrubberBeaconRef } from './Scrubber';

type BeaconWithDataProps = Pick<
  ScrubberBeaconProps,
  'seriesId' | 'idlePulse' | 'animate' | 'transitions' | 'stroke' | 'className' | 'style' | 'testID'
> & {
  dataIndex: number;
  dataIndexValue: number;
  isIdle: boolean;
  BeaconComponent: ScrubberBeaconComponent;
  beaconRef: (ref: ScrubberBeaconRef | null) => void;
};

// Helper component to calculate beacon data for a specific series
const BeaconWithData = memo<BeaconWithDataProps>(
  ({
    seriesId,
    dataIndex,
    dataIndexValue,
    isIdle,
    BeaconComponent,
    idlePulse,
    animate,
    transitions,
    className,
    style,
    testID,
    beaconRef,
    stroke,
  }) => {
    const { layout, getSeries, getSeriesData, getXScale, getYScale, getXAxis, getYAxis } =
      useCartesianChartContext();

    const series = useMemo(() => getSeries(seriesId), [getSeries, seriesId]);
    const sourceData = useMemo(() => getSeriesData(seriesId), [getSeriesData, seriesId]);
    const gradient = series?.gradient;

    // Get dataValue from series data
    const dataValue = useMemo(() => {
      if (sourceData && dataIndex >= 0 && dataIndex < sourceData.length) {
        const value = sourceData[dataIndex];

        if (typeof value === 'number') {
          return value;
        } else if (Array.isArray(value)) {
          const validValues = value.filter((val): val is number => val !== null);
          if (validValues.length >= 1) {
            return validValues[validValues.length - 1];
          }
        }
      }
      return undefined;
    }, [sourceData, dataIndex]);

    // Evaluate gradient color
    const color = useMemo(() => {
      if (dataValue === undefined) return series?.color ?? 'var(--color-fgPrimary)';

      if (gradient) {
        const xScale = getXScale(series?.xAxisId);
        const yScale = getYScale(series?.yAxisId);

        if (xScale && yScale) {
          const categoryAxisIsX = layout !== 'horizontal';
          const gradientAxis = getGradientAxis(gradient, layout);
          const gradientScale = gradientAxis === 'x' ? xScale : yScale;
          const stops = getGradientConfig(gradient, xScale, yScale, layout);

          if (stops) {
            // Determine the correct data value to evaluate against based on gradient axis and layout
            let evalValue: number;
            if (gradientAxis === 'x') {
              // X-axis gradient: In vertical it's the index, in horizontal it's the value.
              evalValue = categoryAxisIsX ? dataIndexValue : dataValue;
            } else {
              // Y-axis gradient: In vertical it's the value, in horizontal it's the index.
              evalValue = categoryAxisIsX ? dataValue : dataIndexValue;
            }

            const evaluatedColor = evaluateGradientAtValue(
              stops,
              evalValue,
              gradientScale as ChartScaleFunction,
            );
            if (evaluatedColor) {
              return evaluatedColor;
            }
          }
        }
      }

      return series?.color ?? 'var(--color-fgPrimary)';
    }, [
      gradient,
      dataIndexValue,
      dataValue,
      series?.color,
      series?.xAxisId,
      series?.yAxisId,
      getXScale,
      getYScale,
      layout,
    ]);

    if (dataValue === undefined) return null;
    const categoryAxisIsX = layout !== 'horizontal';

    return (
      <BeaconComponent
        ref={beaconRef}
        animate={animate}
        className={className}
        color={color}
        dataX={categoryAxisIsX ? dataIndexValue : dataValue}
        dataY={categoryAxisIsX ? dataValue : dataIndexValue}
        idlePulse={idlePulse}
        isIdle={isIdle}
        seriesId={seriesId}
        stroke={stroke}
        style={style}
        testID={testID}
        transitions={transitions}
      />
    );
  },
);

export type ScrubberBeaconGroupRef = {
  /**
   * Triggers a pulse animation on all beacons.
   */
  pulse: () => void;
};

export type ScrubberBeaconGroupBaseProps = SharedProps & {
  /**
   * Array of series IDs to render beacons for.
   */
  seriesIds: string[];
  /**
   * Pulse the beacons while at rest.
   */
  idlePulse?: boolean;
};

export type ScrubberBeaconGroupProps = ScrubberBeaconGroupBaseProps & {
  /**
   * Transition configuration for beacon animations.
   */
  transitions?: ScrubberBeaconProps['transitions'];
  /**
   * Custom component for the scrubber beacon.
   * @default DefaultScrubberBeacon
   */
  BeaconComponent?: ScrubberBeaconComponent;
  /**
   * Custom className for beacon styling.
   */
  className?: string;
  /**
   * Custom inline styles for beacons.
   */
  style?: React.CSSProperties;
  /**
   * Stroke color of the beacon circle.
   * @default 'var(--color-bg)'
   */
  stroke?: string;
};

export const ScrubberBeaconGroup = memo(
  forwardRef<ScrubberBeaconGroupRef, ScrubberBeaconGroupProps>(
    (
      {
        seriesIds,
        idlePulse,
        transitions,
        BeaconComponent = DefaultScrubberBeacon,
        className,
        style,
        testID,
        stroke,
      },
      ref,
    ) => {
      const ScrubberBeaconRefs = useRefMap<ScrubberBeaconRef>();
      const { scrubberPosition } = useScrubberContext();
      const { layout, getXScale, getYScale, getXAxis, getYAxis, dataLength, series, animate } =
        useCartesianChartContext();

      // Expose imperative handle with pulse method
      useImperativeHandle(ref, () => ({
        pulse: () => {
          Object.values(ScrubberBeaconRefs.refs).forEach((beaconRef) => {
            beaconRef?.pulse();
          });
        },
      }));

      const filteredSeries = useMemo(() => {
        return series?.filter((s) => seriesIds.includes(s.id)) ?? [];
      }, [series, seriesIds]);

      const { dataIndexValue, dataIndex } = useMemo(() => {
        const categoryAxisIsX = layout !== 'horizontal';
        const indexScale = (categoryAxisIsX ? getXScale() : getYScale()) as ChartScaleFunction;
        const indexAxis = categoryAxisIsX ? getXAxis() : getYAxis();
        if (!indexScale) return { dataIndexValue: undefined, dataIndex: undefined };

        const dataIndex = scrubberPosition ?? Math.max(0, dataLength - 1);

        // Convert index to actual data value if axis has data
        let dataIndexValue: number;
        if (
          indexAxis?.data &&
          Array.isArray(indexAxis.data) &&
          indexAxis.data[dataIndex] !== undefined
        ) {
          const val = indexAxis.data[dataIndex];
          dataIndexValue = typeof val === 'string' ? dataIndex : val;
        } else {
          dataIndexValue = dataIndex;
        }

        return { dataIndexValue, dataIndex };
      }, [getXScale, getYScale, getXAxis, getYAxis, scrubberPosition, dataLength, layout]);

      const isIdle = scrubberPosition === undefined;

      const createBeaconRef = useCallback(
        (seriesId: string) => {
          return (beaconRef: ScrubberBeaconRef | null) => {
            if (beaconRef) {
              ScrubberBeaconRefs.registerRef(seriesId, beaconRef);
            }
          };
        },
        [ScrubberBeaconRefs],
      );

      if (dataIndexValue === undefined || dataIndex === undefined) return null;

      return filteredSeries.map((s) => (
        <BeaconWithData
          key={s.id}
          BeaconComponent={BeaconComponent}
          animate={animate}
          beaconRef={createBeaconRef(s.id)}
          className={className}
          dataIndex={dataIndex}
          dataIndexValue={dataIndexValue}
          idlePulse={idlePulse}
          isIdle={isIdle}
          seriesId={s.id}
          stroke={stroke}
          style={style}
          testID={testID ? `${testID ?? 'beacon'}-${s.id}` : undefined}
          transitions={transitions}
        />
      ));
    },
  ),
);
