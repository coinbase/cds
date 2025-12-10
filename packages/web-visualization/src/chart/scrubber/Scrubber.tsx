import React, { forwardRef, memo, useImperativeHandle, useMemo } from 'react';
import type { SharedProps } from '@coinbase/cds-common/types';
import { m as motion, type Transition } from 'framer-motion';

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
  type ChartScaleFunction,
  getPointOnScale,
  type Series,
  useScrubberContext,
} from '../utils';

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

export type ScrubberBeaconProps = SharedProps & {
  /**
   * Id of the series.
   */
  seriesId: Series['id'];
  /**
   * Color of the series.
   */
  color?: string;
  /**
   * X coordinate in data space.
   */
  dataX: number;
  /**
   * Y coordinate in data space.
   */
  dataY: number;
  /**
   * Whether the beacon is in idle state (not actively scrubbing).
   */
  isIdle?: boolean;
  /**
   * Pulse the beacon while it is at rest.
   */
  idlePulse?: boolean;
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
     * @default { duration: 1.6, ease: 'easeInOut' }
     */
    pulse?: Transition;
    /**
     * Delay, in seconds between pulse transitions
     * when `idlePulse` is enabled.
     * @default 0.4
     */
    pulseRepeatDelay?: number;
  };
  /**
   * Opacity of the beacon.
   * @default 1
   */
  opacity?: number;
  /**
   * Custom className for styling.
   */
  className?: string;
  /**
   * Custom inline styles.
   */
  style?: React.CSSProperties;
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
    label: string;
    /**
     * Id of the series.
     */
    seriesId: Series['id'];
  };
export type ScrubberBeaconLabelComponent = React.FC<ScrubberBeaconLabelProps>;

export type ScrubberLabelProps = ReferenceLineLabelComponentProps;
export type ScrubberLabelComponent = React.FC<ScrubberLabelProps>;

export type ScrubberBaseProps = SharedProps &
  Pick<ScrubberBeaconGroupBaseProps, 'idlePulse'> &
  Pick<ReferenceLineBaseProps, 'LineComponent' | 'LabelComponent' | 'labelElevated'> &
  Pick<ScrubberBeaconGroupProps, 'BeaconComponent'> &
  Pick<ScrubberBeaconLabelGroupProps, 'BeaconLabelComponent'> & {
    /**
     * Array of series IDs to highlight when scrubbing with scrubber beacons.
     * By default, all series will be highlighted.
     */
    seriesIds?: string[];
    /**
     * Hides the beacon labels while keeping the line label visible (if provided).
     */
    hideBeaconLabels?: boolean;
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
    label?:
      | ReferenceLineBaseProps['label']
      | ((dataIndex: number) => ReferenceLineBaseProps['label']);
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
  };

export type ScrubberProps = ScrubberBaseProps & {
  /**
   * Accessibility label for the scrubber. Can be a static string or a function that receives the current dataIndex.
   * If not provided, label will be used if it resolves to a string.
   */
  accessibilityLabel?: string | ((dataIndex: number) => string);
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
};

export type ScrubberRef = ScrubberBeaconGroupRef;

/**
 * Unified component that manages all scrubber elements (beacons, line, labels).
 */
export const Scrubber = memo(
  forwardRef<ScrubberRef, ScrubberProps>(
    (
      {
        seriesIds,
        hideBeaconLabels,
        hideLine,
        label,
        accessibilityLabel,
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
        testID,
        idlePulse,
        beaconTransitions,
        styles,
        classNames,
      },
      ref,
    ) => {
      const beaconGroupRef = React.useRef<ScrubberBeaconGroupRef>(null);

      const { scrubberPosition } = useScrubberContext();
      const { getXScale, getXAxis, animate, series, drawingArea, dataLength } =
        useCartesianChartContext();

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

      const { dataX, dataIndex } = useMemo(() => {
        const xScale = getXScale() as ChartScaleFunction;
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
          {!hideOverlay && scrubberPosition !== undefined && pixelX !== undefined && (
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
          {!hideLine && scrubberPosition !== undefined && dataX !== undefined && (
            <ReferenceLine
              LabelComponent={LabelComponent}
              LineComponent={LineComponent}
              classNames={{ label: classNames?.line }}
              dataX={dataX}
              label={typeof label === 'function' ? label(dataIndex) : label}
              labelBoundsInset={labelBoundsInset}
              labelElevated={labelElevated}
              labelFont={labelFont}
              stroke={lineStroke}
              styles={{ label: styles?.line }}
            />
          )}
          <ScrubberBeaconGroup
            ref={beaconGroupRef}
            BeaconComponent={BeaconComponent}
            className={classNames?.beacon}
            idlePulse={idlePulse}
            seriesIds={filteredSeriesIds}
            style={styles?.beacon}
            testID={testID}
            transitions={beaconTransitions}
          />
          {!hideBeaconLabels && beaconLabels.length > 0 && (
            <ScrubberBeaconLabelGroup
              BeaconLabelComponent={BeaconLabelComponent}
              labelFont={beaconLabelFont}
              labelHorizontalOffset={beaconLabelHorizontalOffset}
              labelMinGap={beaconLabelMinGap}
              labels={beaconLabels}
            />
          )}
        </motion.g>
      );
    },
  ),
);
