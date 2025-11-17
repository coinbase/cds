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
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { useRefMap } from '@coinbase/cds-common/hooks/useRefMap';
import type { SharedProps } from '@coinbase/cds-common/types';
import { useTheme } from '@coinbase/cds-mobile';
import { Group, Rect, type SkParagraph } from '@shopify/react-native-skia';

import { useCartesianChartContext } from '../ChartProvider';
import { type LineComponent, ReferenceLine, type ReferenceLineProps } from '../line';
import {
  accessoryFadeTransitionDelay,
  accessoryFadeTransitionDuration,
  getPointOnSerializableScale,
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
    label?: string | SkParagraph | ((dataIndex: number) => string | SkParagraph);
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
        maxDataLength,
      } = useCartesianChartContext();

      const xAxis = useMemo(() => getXAxis(), [getXAxis]);
      const xScale = useMemo(() => getXSerializableScale(), [getXSerializableScale]);

      // Animation state for delayed scrubber rendering (matches web timing)
      const scrubberOpacity = useSharedValue(animate ? 0 : 1);

      // Delay scrubber appearance until after path enter animation completes
      useEffect(() => {
        if (animate) {
          scrubberOpacity.value = withDelay(
            accessoryFadeTransitionDelay,
            withTiming(1, { duration: accessoryFadeTransitionDuration }),
          );
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
        if (seriesIds === undefined) return series;
        return series?.filter((s) => seriesIds.includes(s.id)) ?? [];
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

      const scrubberBeaconLabels: ScrubberBeaconLabelGroupBaseProps['labels'] = useMemo(
        () =>
          filteredSeries
            .filter((s) => s.label !== undefined && s.label.length > 0)
            .map((s) => ({
              seriesId: s.id,
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
              <ReferenceLine
                LineComponent={LineComponent}
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
                stroke={lineStroke}
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
          {scrubberBeaconLabels.length > 0 && (
            <ScrubberBeaconLabelGroup
              BeaconLabelComponent={BeaconLabelComponent}
              labelHorizontalOffset={labelHorizontalOffset}
              labelMinGap={labelMinGap}
              labels={scrubberBeaconLabels}
            />
          )}
        </Group>
      );
    },
  ),
);
