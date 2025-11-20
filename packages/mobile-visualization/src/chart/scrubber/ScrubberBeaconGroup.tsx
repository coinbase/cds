import { forwardRef, memo, useCallback, useImperativeHandle, useMemo } from 'react';
import type { SharedValue } from 'react-native-reanimated';
import { useDerivedValue } from 'react-native-reanimated';
import { useRefMap } from '@coinbase/cds-common/hooks/useRefMap';
import { useTheme } from '@coinbase/cds-mobile';

import { useCartesianChartContext } from '../ChartProvider';
import { evaluateGradientAtValue, getGradientStops, useScrubberContext } from '../utils';
import { convertToSerializableScale } from '../utils/scale';

import { DefaultScrubberBeacon } from './DefaultScrubberBeacon';
import type { ScrubberBeaconComponent, ScrubberBeaconProps, ScrubberBeaconRef } from './Scrubber';

// Helper component to calculate beacon data for a specific series
const BeaconWithData = memo<{
  seriesId: string;
  dataIndex: SharedValue<number>;
  dataX: SharedValue<number>;
  isIdle: SharedValue<boolean>;
  BeaconComponent: ScrubberBeaconComponent;
  idlePulse?: boolean;
  animate?: boolean;
  transitions?: ScrubberBeaconProps['transitions'];
  beaconRef: (ref: ScrubberBeaconRef | null) => void;
}>(
  ({
    seriesId,
    dataIndex,
    dataX,
    isIdle,
    BeaconComponent,
    idlePulse,
    animate,
    transitions,
    beaconRef,
  }) => {
    const { getSeries, getSeriesData, getXScale, getYScale } = useCartesianChartContext();
    const theme = useTheme();

    const series = useMemo(() => getSeries(seriesId), [getSeries, seriesId]);
    const sourceData = useMemo(() => getSeriesData(seriesId), [getSeriesData, seriesId]);
    const gradient = series?.gradient;

    const dataY = useDerivedValue(() => {
      if (
        sourceData &&
        dataIndex.value !== undefined &&
        dataIndex.value >= 0 &&
        dataIndex.value < sourceData.length
      ) {
        const dataValue = sourceData[dataIndex.value];

        if (typeof dataValue === 'number') {
          return dataValue;
        } else if (Array.isArray(dataValue)) {
          const validValues = dataValue.filter((val): val is number => val !== null);
          if (validValues.length >= 1) {
            return validValues[validValues.length - 1];
          }
        }
      }
      return 0;
    }, [sourceData, dataIndex]);

    // Get scales for gradient evaluation
    const gradientScale = useMemo(() => {
      if (!gradient) return undefined;
      const scale = gradient.axis === 'x' ? getXScale() : getYScale(series?.yAxisId);
      if (!scale) return undefined;
      return convertToSerializableScale(scale);
    }, [gradient, getXScale, getYScale, series?.yAxisId]);

    const gradientStops = useMemo(() => {
      if (!gradient || !gradientScale) return undefined;
      const domain = { min: gradientScale.domain[0], max: gradientScale.domain[1] };
      return getGradientStops(gradient.stops, domain);
    }, [gradient, gradientScale]);

    // Evaluate gradient color on UI thread
    const color = useDerivedValue(() => {
      'worklet';

      // Evaluate gradient if present
      if (gradient && gradientScale && gradientStops) {
        const axis = gradient.axis ?? 'y';
        const dataValue = axis === 'x' ? dataX.value : dataY.value;

        if (dataValue !== undefined) {
          const evaluatedColor = evaluateGradientAtValue(gradientStops, dataValue, gradientScale);
          if (evaluatedColor) {
            return evaluatedColor;
          }
        }
      }

      // Fallback to series color
      return series?.color ?? theme.color.fgPrimary;
    }, [
      gradient,
      gradientScale,
      gradientStops,
      dataX,
      dataY,
      series?.color,
      theme.color.fgPrimary,
    ]);

    return (
      <BeaconComponent
        ref={beaconRef}
        animate={animate}
        color={color}
        dataX={dataX}
        dataY={dataY}
        idlePulse={idlePulse}
        isIdle={isIdle}
        seriesId={seriesId}
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

export type ScrubberBeaconGroupBaseProps = {
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
};

export const ScrubberBeaconGroup = memo(
  forwardRef<ScrubberBeaconGroupRef, ScrubberBeaconGroupProps>(
    ({ seriesIds, idlePulse, transitions, BeaconComponent = DefaultScrubberBeacon }, ref) => {
      const ScrubberBeaconRefs = useRefMap<ScrubberBeaconRef>();
      const { scrubberPosition } = useScrubberContext();
      const { getXAxis, series, dataLength, animate } = useCartesianChartContext();

      const xAxis = useMemo(() => getXAxis(), [getXAxis]);

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

      const dataIndex = useDerivedValue(() => {
        return scrubberPosition.value ?? Math.max(0, dataLength - 1);
      }, [scrubberPosition, dataLength]);

      const dataX = useDerivedValue(() => {
        // Convert index to actual x value if axis has data
        if (xAxis?.data && Array.isArray(xAxis.data) && xAxis.data[dataIndex.value] !== undefined) {
          const dataValue = xAxis.data[dataIndex.value];
          return typeof dataValue === 'string' ? dataIndex.value : dataValue;
        }
        return dataIndex.value;
      }, [xAxis, dataIndex]);

      const isIdle = useDerivedValue(() => {
        return scrubberPosition.value === undefined;
      }, [scrubberPosition]);

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

      return filteredSeries.map((s) => (
        <BeaconWithData
          key={s.id}
          BeaconComponent={BeaconComponent}
          animate={animate}
          beaconRef={createBeaconRef(s.id)}
          dataIndex={dataIndex}
          dataX={dataX}
          idlePulse={idlePulse}
          isIdle={isIdle}
          seriesId={s.id}
          transitions={transitions}
        />
      ));
    },
  ),
);
