import { forwardRef, memo, useCallback, useImperativeHandle, useMemo } from 'react';
import { useRefMap } from '@coinbase/cds-common/hooks/useRefMap';
import type { SharedProps } from '@coinbase/cds-common/types';

import { useCartesianChartContext } from '../ChartProvider';
import {
  type ChartScaleFunction,
  evaluateGradientAtValue,
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
  dataX: number;
  isIdle: boolean;
  BeaconComponent: ScrubberBeaconComponent;
  beaconRef: (ref: ScrubberBeaconRef | null) => void;
};

// Helper component to calculate beacon data for a specific series
const BeaconWithData = memo<BeaconWithDataProps>(
  ({
    seriesId,
    dataIndex,
    dataX,
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
    const { getSeries, getSeriesData, getXScale, getYScale } = useCartesianChartContext();

    const series = useMemo(() => getSeries(seriesId), [getSeries, seriesId]);
    const sourceData = useMemo(() => getSeriesData(seriesId), [getSeriesData, seriesId]);
    const gradient = series?.gradient;

    // Get dataY from series data
    const dataY = useMemo(() => {
      if (sourceData && dataIndex >= 0 && dataIndex < sourceData.length) {
        const dataValue = sourceData[dataIndex];

        if (typeof dataValue === 'number') {
          return dataValue;
        } else if (Array.isArray(dataValue)) {
          const validValues = dataValue.filter((val): val is number => val !== null);
          if (validValues.length >= 1) {
            return validValues[validValues.length - 1];
          }
        }
      }
      return undefined;
    }, [sourceData, dataIndex]);

    // Evaluate gradient color
    const color = useMemo(() => {
      if (dataY === undefined) return series?.color ?? 'var(--color-fgPrimary)';

      if (gradient) {
        const xScale = getXScale();
        const yScale = getYScale(series?.yAxisId);

        if (xScale && yScale) {
          const gradientScale = gradient.axis === 'x' ? xScale : yScale;
          const stops = getGradientConfig(gradient, xScale, yScale);

          if (stops) {
            const gradientAxis = gradient.axis ?? 'y';
            const dataValue = gradientAxis === 'x' ? dataX : dataY;
            const evaluatedColor = evaluateGradientAtValue(
              stops,
              dataValue,
              gradientScale as ChartScaleFunction,
            );
            if (evaluatedColor) {
              return evaluatedColor;
            }
          }
        }
      }

      return series?.color ?? 'var(--color-fgPrimary)';
    }, [gradient, dataX, dataY, series?.color, series?.yAxisId, getXScale, getYScale]);

    if (dataY === undefined) return null;

    return (
      <BeaconComponent
        ref={beaconRef}
        animate={animate}
        className={className}
        color={color}
        dataX={dataX}
        dataY={dataY}
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
      const { getXScale, getXAxis, dataLength, series, animate } = useCartesianChartContext();

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

      const { dataX, dataIndex } = useMemo(() => {
        const xScale = getXScale();
        const xAxis = getXAxis();
        if (!xScale) return { dataX: undefined, dataIndex: undefined };

        const dataIndex = scrubberPosition ?? Math.max(0, dataLength - 1);

        // Convert index to actual x value if axis has data
        let dataX: number;
        if (xAxis?.data && Array.isArray(xAxis.data) && xAxis.data[dataIndex] !== undefined) {
          const dataValue = xAxis.data[dataIndex];
          dataX = typeof dataValue === 'string' ? dataIndex : dataValue;
        } else {
          dataX = dataIndex;
        }

        return { dataX, dataIndex };
      }, [getXScale, getXAxis, scrubberPosition, dataLength]);

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

      if (dataX === undefined || dataIndex === undefined) return null;

      return filteredSeries.map((s) => (
        <BeaconWithData
          key={s.id}
          BeaconComponent={BeaconComponent}
          animate={animate}
          beaconRef={createBeaconRef(s.id)}
          className={className}
          dataIndex={dataIndex}
          dataX={dataX}
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
