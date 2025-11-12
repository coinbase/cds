import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
} from 'react';
import {
  runOnJS,
  useAnimatedReaction,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useRefMap } from '@coinbase/cds-common/hooks/useRefMap';
import type { SharedProps } from '@coinbase/cds-common/types';
import { useTheme } from '@coinbase/cds-mobile';
import { Group, Rect, type SkParagraph } from '@shopify/react-native-skia';

import { useCartesianChartContext } from '../ChartProvider';
import { ReferenceLine, type ReferenceLineProps } from '../line';
import type { ChartTextChildren } from '../text';
import { getPointOnSerializableScale, type Transition, useScrubberContext } from '../utils';

import { ScrubberBeacon, type ScrubberBeaconProps, type ScrubberBeaconRef } from './ScrubberBeacon';
import { ScrubberBeaconLabel, type ScrubberBeaconLabelProps } from './ScrubberBeaconLabel';
import { ScrubberBeaconLabelGroup } from './ScrubberBeaconLabelGroup';

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
     * Can be a static string or a function that receives the current dataIndex.
     */
    label?: string | SkParagraph | ((dataIndex: number) => string | SkParagraph);
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
     * Custom component for the scrubber beacon label.
     */
    BeaconLabelComponent?: React.ComponentType<ScrubberBeaconLabelProps>;
    /**
     * Custom component for the scrubber line.
     */
    LineComponent?: React.ComponentType<ReferenceLineProps>;
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
        lineStroke,
        labelProps,
        BeaconComponent = ScrubberBeacon,
        BeaconLabelComponent = ScrubberBeaconLabel,
        LineComponent = ReferenceLine,
        hideOverlay,
        overlayOffset = 2,
        testID,
        idlePulse,
        beaconTransitions,
      },
      ref,
    ) => {
      const theme = useTheme();

      const ScrubberBeaconRefs = useRefMap<ScrubberBeaconRef>();

      const { scrubberPosition } = useScrubberContext();
      const {
        getXSerializableScale,
        getSeriesData,
        getXAxis,
        series,
        drawingArea,
        animate,
        width: chartWidth,
        height: chartHeight,
      } = useCartesianChartContext();

      const xAxis = useMemo(() => getXAxis(), [getXAxis]);
      const xScale = useMemo(() => getXSerializableScale(), [getXSerializableScale]);

      // Animation state for delayed scrubber rendering (matches web timing)
      const scrubberOpacity = useSharedValue(animate ? 0 : 1);

      // todo: what is the best way we can handle the animation delay for this
      useEffect(() => {
        if (animate) {
          // Match web timing: 850ms delay + 150ms fade in
          setTimeout(() => {
            scrubberOpacity.value = withTiming(1, { duration: 150 });
          }, 850);
        }
      }, [animate, scrubberOpacity]);

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
        return (
          series?.filter((s) => {
            if (seriesIds === undefined) return true;
            return seriesIds.includes(s.id);
          }) ?? []
        );
      }, [series, seriesIds]);

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

      const maxDataLength = useMemo(
        () =>
          series?.reduce((max: any, s: any) => {
            const seriesData = getSeriesData(s.id);
            return Math.max(max, seriesData?.length ?? 0);
          }, 0) ?? 0,
        [series, getSeriesData],
      );

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

      const lineOpacity = useDerivedValue(() => {
        return scrubberPosition.value !== undefined ? 1 : 0;
      }, [scrubberPosition]);

      const overlayOpacity = useDerivedValue(() => {
        return scrubberPosition.value !== undefined ? 0.8 : 0;
      }, [scrubberPosition]);

      const overlayWidth = useDerivedValue(() => {
        const pixelX =
          dataX.value !== undefined && xScale
            ? getPointOnSerializableScale(dataX.value, xScale)
            : 0;
        return drawingArea.x + drawingArea.width - pixelX + overlayOffset;
      }, [dataX, xScale]);

      const overlayX = useDerivedValue(() => {
        const xValue =
          dataX.value !== undefined && xScale
            ? getPointOnSerializableScale(dataX.value, xScale)
            : 0;
        return xValue;
      }, [dataX, xScale]);

      // todo: see if we can simplify these three sections
      const resolvedLabelValue = useSharedValue<SkParagraph | string>('');

      const updateResolvedLabel = useCallback(
        (index: number) => {
          if (!label) {
            resolvedLabelValue.value = '';
            return;
          }

          if (typeof label === 'function') {
            const result = label(index);
            resolvedLabelValue.value = result ?? '';
          } else if (typeof label === 'string') {
            resolvedLabelValue.value = label;
          }
        },
        [label, resolvedLabelValue],
      );

      // Update resolved label when dataIndex changes
      useAnimatedReaction(
        () => dataIndex.value,
        (currentIndex) => {
          'worklet';
          runOnJS(updateResolvedLabel)(currentIndex);
        },
        [updateResolvedLabel],
      );

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

      if (!xScale) return;

      return (
        <Group opacity={scrubberOpacity}>
          {!hideOverlay && (
            <Rect
              color={theme.color.bg}
              height={drawingArea.height + overlayOffset * 2}
              opacity={overlayOpacity}
              width={overlayWidth}
              x={overlayX}
              y={drawingArea.y - overlayOffset}
            />
          )}
          {!hideLine && (
            <Group opacity={lineOpacity}>
              <LineComponent
                dataX={dataX}
                label={resolvedLabelValue}
                labelProps={{
                  verticalAlignment: 'middle',
                  dy: -0.5 * drawingArea.y,
                  ...labelProps,
                  bounds: {
                    // todo - how to bake this into the chart on web and on mobile
                    x: 16,
                    y: 16,
                    width: chartWidth - 32,
                    height: chartHeight - 32,
                  },
                }}
              />
            </Group>
          )}
          {filteredSeries.map((s) => (
            <BeaconComponent
              key={s.id}
              ref={createScrubberBeaconRef(s.id)}
              color={s.color}
              gradient={s.gradient}
              idlePulse={idlePulse}
              seriesId={s.id}
              testID={testID ? `${testID}-${s.id}-dot` : undefined}
              transitions={beaconTransitions}
            />
          ))}
          <ScrubberBeaconLabelGroup labels={scrubberBeaconLabels} />
        </Group>
      );
    },
  ),
);
