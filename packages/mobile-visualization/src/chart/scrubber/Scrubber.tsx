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
import { useTheme } from '@coinbase/cds-mobile';
import { type AnimatedProp, Group, Rect, type SkParagraph } from '@shopify/react-native-skia';

import { useCartesianChartContext } from '../ChartProvider';
import {
  ReferenceLine,
  type ReferenceLineBaseProps,
  type ReferenceLineLabelComponentProps,
} from '../line';
import type { ChartTextProps } from '../text';
import {
  accessoryFadeTransitionDelay,
  accessoryFadeTransitionDuration,
  type ChartInset,
  getPointOnSerializableScale,
  type Series,
  useScrubberContext,
} from '../utils';
import type { Transition } from '../utils/transition';

import { DefaultScrubberBeacon } from './DefaultScrubberBeacon';
import { DefaultScrubberLabel } from './DefaultScrubberLabel';
import {
  ScrubberBeaconGroup,
  type ScrubberBeaconGroupBaseProps,
  type ScrubberBeaconGroupProps,
  type ScrubberBeaconGroupRef,
} from './ScrubberBeaconGroup';
import {
  ScrubberBeaconLabelGroup,
  type ScrubberBeaconLabelGroupBaseProps,
  type ScrubberBeaconLabelGroupProps,
} from './ScrubberBeaconLabelGroup';

export type ScrubberBeaconRef = {
  /**
   * Triggers a single pulse animation.
   * Only works when the beacon is in idle state (not actively scrubbing).
   */
  pulse: () => void;
};

export type ScrubberBeaconProps = {
  /**
   * Id of the series.
   */
  seriesId: Series['id'];
  /**
   * Color of the beacon.
   */
  color?: AnimatedProp<string>;
  /**
   * X coordinate in data space.
   */
  dataX: AnimatedProp<number>;
  /**
   * Y coordinate in data space.
   */
  dataY: AnimatedProp<number>;
  /**
   * Whether the beacon is in idle state (not actively scrubbing).
   */
  isIdle: AnimatedProp<boolean>;
  /**
   * Pulse the beacon while it is at rest.
   *
   * @note Only has an effect when `isIdle` is `true`. Pulse animations work
   * regardless of the chart's `animate` prop.
   */
  idlePulse?: boolean;
  /**
   * Whether position animations are enabled.
   * @default to ChartContext's animate value
   */
  animate?: boolean;
  /**
   * Transition configuration for beacon animations.
   */
  transitions?: {
    /**
     * Transition used for beacon position updates.
     * @default defaultTransition
     */
    update?: Transition;
    /**
     * Transition used for the pulse animation.
     * @default { type: 'timing', duration: 1600, easing: Easing.bezier(0.0, 0.0, 0.0, 1.0) }
     */
    pulse?: Transition;
    /**
     * Delay, in milliseconds between pulse transitions
     * when `idlePulse` is enabled.
     * @default 400
     */
    pulseRepeatDelay?: number;
  };
  /**
   * Opacity of the beacon.
   * @default 1
   */
  opacity?: AnimatedProp<number>;
  /**
   * Stroke color of the beacon circle.
   * @default theme.color.bg
   */
  stroke?: string;
};

export type ScrubberBeaconComponent = React.FC<
  ScrubberBeaconProps & { ref?: React.Ref<ScrubberBeaconRef> }
>;

export type ScrubberBeaconLabelProps = Pick<Series, 'color'> &
  Pick<
    ChartTextProps,
    'x' | 'y' | 'dx' | 'horizontalAlignment' | 'onDimensionsChange' | 'opacity' | 'font'
  > & {
    /**
     * Label for the series.
     */
    label: AnimatedProp<string>;
    /**
     * Id of the series.
     */
    seriesId: Series['id'];
  };
export type ScrubberBeaconLabelComponent = React.FC<ScrubberBeaconLabelProps>;

export type ScrubberLabelProps = ReferenceLineLabelComponentProps;
export type ScrubberLabelComponent = React.FC<ScrubberLabelProps>;

export type ScrubberBaseProps = Pick<ScrubberBeaconGroupBaseProps, 'idlePulse'> &
  Pick<ReferenceLineBaseProps, 'LineComponent' | 'LabelComponent' | 'labelElevated'> &
  Pick<ScrubberBeaconGroupProps, 'BeaconComponent'> &
  Pick<ScrubberBeaconLabelGroupProps, 'BeaconLabelComponent'> & {
    /**
     * Array of series IDs to highlight when scrubbing with scrubber beacons.
     * By default, all series will be highlighted.
     */
    seriesIds?: string[];
    /**
     * Hides the scrubber line.
     * @note This hides Scrubber's ReferenceLine including the label.
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
    /**
     * Minimum gap between beacon labels to prevent overlap.
     * Measured in pixels.
     */
    beaconLabelMinGap?: ScrubberBeaconLabelGroupBaseProps['labelMinGap'];
    /**
     * Horizontal offset for beacon labels from their beacon position.
     * Measured in pixels.
     */
    beaconLabelHorizontalOffset?: ScrubberBeaconLabelGroupBaseProps['labelHorizontalOffset'];
    /**
     * Label text displayed above the scrubber line.
     * Can be a static string or a function that receives the current dataIndex.
     */
    label?: string | SkParagraph | ((dataIndex: number) => string | SkParagraph);
    /**
     * Font style for the scrubber line label.
     */
    labelFont?: ChartTextProps['font'];
    /**
     * Bounds inset for the scrubber line label to prevent cutoff at chart edges.
     * @default { top: 4, bottom: 20, left: 12, right: 12 } when labelElevated is true, otherwise none
     */
    labelBoundsInset?: number | ChartInset;
    /**
     * Font style for the beacon labels.
     */
    beaconLabelFont?: ChartTextProps['font'];
    /**
     * Stroke color for the scrubber line.
     */
    lineStroke?: ReferenceLineBaseProps['stroke'];
    /**
     * Transition configuration for the scrubber beacon.
     */
    beaconTransitions?: ScrubberBeaconProps['transitions'];
    /**
     * Stroke color of the scrubber beacon circle.
     * @default theme.color.bg
     */
    beaconStroke?: string;
  };

export type ScrubberProps = ScrubberBaseProps;

export type ScrubberRef = ScrubberBeaconGroupRef;

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
        BeaconComponent = DefaultScrubberBeacon,
        BeaconLabelComponent,
        LineComponent,
        LabelComponent = DefaultScrubberLabel,
        labelElevated,
        hideOverlay,
        overlayOffset = 2,
        beaconLabelMinGap,
        beaconLabelHorizontalOffset,
        labelFont,
        labelBoundsInset,
        beaconLabelFont,
        idlePulse,
        beaconTransitions,
        beaconStroke,
      },
      ref,
    ) => {
      const theme = useTheme();
      const beaconGroupRef = React.useRef<ScrubberBeaconGroupRef>(null);

      const { scrubberPosition } = useScrubberContext();
      const { getXSerializableScale, getXAxis, series, drawingArea, animate, dataLength } =
        useCartesianChartContext();

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
          beaconGroupRef.current?.pulse();
        },
      }));

      const filteredSeriesIds = useMemo(() => {
        if (seriesIds === undefined) {
          return series?.map((s) => s.id) ?? [];
        }
        return seriesIds;
      }, [series, seriesIds]);

      const dataIndex = useDerivedValue(() => {
        return scrubberPosition.value ?? Math.max(0, dataLength - 1);
      }, [scrubberPosition, dataLength]);

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

      const beaconLabels: ScrubberBeaconLabelGroupBaseProps['labels'] = useMemo(
        () =>
          series
            ?.filter((s) => filteredSeriesIds.includes(s.id))
            .filter((s) => s.label !== undefined && s.label.length > 0)
            .map((s) => ({
              seriesId: s.id,
              label: s.label!,
              color: s.color,
            })) ?? [],
        [series, filteredSeriesIds],
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
            <ReferenceLine
              LabelComponent={LabelComponent}
              LineComponent={LineComponent}
              dataX={dataX}
              label={resolvedLabelValue}
              labelBoundsInset={labelBoundsInset}
              labelElevated={labelElevated}
              labelFont={labelFont}
              opacity={lineOpacity}
              stroke={lineStroke}
            />
          )}
          <ScrubberBeaconGroup
            ref={beaconGroupRef}
            BeaconComponent={BeaconComponent}
            idlePulse={idlePulse}
            seriesIds={filteredSeriesIds}
            stroke={beaconStroke}
            transitions={beaconTransitions}
          />
          {beaconLabels.length > 0 && (
            <ScrubberBeaconLabelGroup
              BeaconLabelComponent={BeaconLabelComponent}
              labelFont={beaconLabelFont}
              labelHorizontalOffset={beaconLabelHorizontalOffset}
              labelMinGap={beaconLabelMinGap}
              labels={beaconLabels}
            />
          )}
        </Group>
      );
    },
  ),
);
