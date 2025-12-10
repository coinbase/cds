import React, { useEffect, useMemo } from 'react';
import {
  Divider,
  VStack,
  type VStackBaseProps,
  type VStackDefaultElement,
  type VStackProps,
} from '@coinbase/cds-web/layout';
import { Portal } from '@coinbase/cds-web/overlays/Portal';
import { tooltipContainerId } from '@coinbase/cds-web/overlays/PortalProvider';
import { Text } from '@coinbase/cds-web/typography';
import { flip, offset, shift, useFloating, type VirtualElement } from '@floating-ui/react-dom';

import type { LegendShapeComponent } from './legend/DefaultLegendShape';
import { useCartesianChartContext } from './ChartProvider';
import { type ChartTooltipItemComponent, DefaultChartTooltipItem } from './DefaultChartTooltipItem';
import { useScrubberContext } from './utils';

export type ChartTooltipBaseProps = VStackBaseProps & {
  /**
   * Label text displayed at the top of the tooltip.
   * Can be a static string, a custom ReactNode, or a function that receives the current dataIndex.
   * If not provided, defaults to the x-axis data value at the current index.
   * If null is returned, the label is omitted.
   */
  label?: React.ReactNode | ((dataIndex: number) => React.ReactNode);
  /**
   * Array of series IDs to include in the tooltip.
   * By default, all series will be included.
   */
  seriesIds?: string[];
  /**
   * Formatter function for series values.
   * Receives the numeric series value and should return a ReactNode.
   * String results will automatically be wrapped in Text with font="label2".
   */
  valueFormatter?: (value: number) => React.ReactNode;
  /**
   * Custom component to render each tooltip item.
   * @default DefaultChartTooltipItem
   */
  ItemComponent?: ChartTooltipItemComponent;
  /**
   * Custom component to render the legend shape within each item.
   * Only used when ItemComponent is DefaultChartTooltipItem.
   * @default DefaultLegendShape
   */
  ShapeComponent?: LegendShapeComponent;
};

export type ChartTooltipProps = VStackProps<VStackDefaultElement> &
  ChartTooltipBaseProps & {
    /**
     * Custom class names for the component parts.
     */
    classNames?: {
      /**
       * Custom class name for the root element.
       */
      root?: string;
      /**
       * Custom class name for the label element.
       * @note not applied when label is a ReactNode.
       */
      label?: string;
      /**
       * Custom class name for the divider element.
       */
      divider?: string;
      /**
       * Custom class name for each item element.
       */
      item?: string;
      /**
       * Custom class name for the legend item element within each item.
       */
      itemLegendItem?: string;
      /**
       * Custom class name for the value element within each item.
       */
      itemValue?: string;
      /**
       * Custom class name for the shape wrapper element within each item.
       */
      itemShapeWrapper?: string;
      /**
       * Custom class name for the shape element within each item.
       */
      itemShape?: string;
      /**
       * Custom class name for the label element within each item.
       * @note not applied when label is a ReactNode.
       */
      itemLabel?: string;
    };
    /**
     * Custom styles for the component parts.
     */
    styles?: {
      /**
       * Custom styles for the root element.
       */
      root?: React.CSSProperties;
      /**
       * Custom styles for the label element.
       * @note not applied when label is a ReactNode.
       */
      label?: React.CSSProperties;
      /**
       * Custom styles for the divider element.
       */
      divider?: React.CSSProperties;
      /**
       * Custom styles for each item element.
       */
      item?: React.CSSProperties;
      /**
       * Custom styles for the legend item element within each item.
       */
      itemLegendItem?: React.CSSProperties;
      /**
       * Custom styles for the value element within each item.
       */
      itemValue?: React.CSSProperties;
      /**
       * Custom styles for the shape wrapper element within each item.
       */
      itemShapeWrapper?: React.CSSProperties;
      /**
       * Custom styles for the shape element within each item.
       */
      itemShape?: React.CSSProperties;
      /**
       * Custom styles for the label element within each item.
       * @note not applied when label is a ReactNode.
       */
      itemLabel?: React.CSSProperties;
    };
  };

export const ChartTooltip = ({
  label,
  seriesIds,
  valueFormatter,
  ItemComponent = DefaultChartTooltipItem,
  ShapeComponent,
  background = 'bgElevation2',
  borderRadius = 400,
  elevation = 2,
  gap = 1,
  minWidth = 320,
  paddingX = 2,
  paddingY = 1.5,
  className,
  classNames,
  style,
  styles,
  ...props
}: ChartTooltipProps) => {
  const { ref, series, getXAxis } = useCartesianChartContext();
  const { scrubberPosition, enableScrubbing } = useScrubberContext();

  const isTooltipVisible = enableScrubbing && scrubberPosition !== undefined;

  const { refs, floatingStyles } = useFloating({
    open: isTooltipVisible,
    placement: 'bottom-start',
    middleware: [
      offset(({ placement }) => {
        const mainAxis = placement.includes('bottom') ? 16 : 8;
        const crossAxis = placement.includes('start') ? 16 : -8;

        return { mainAxis, crossAxis };
      }),
      flip({
        fallbackPlacements: ['top-start', 'bottom-end', 'top-end'],
      }),
      shift({ padding: 8 }),
    ],
  });

  useEffect(() => {
    const element = ref?.current;
    if (!element || !enableScrubbing) return;

    const handleMouseMove = (event: Event) => {
      const { clientX, clientY } = event as MouseEvent;
      const virtualEl: VirtualElement = {
        getBoundingClientRect() {
          return {
            width: 0,
            height: 0,
            x: clientX,
            y: clientY,
            left: clientX,
            right: clientX,
            top: clientY,
            bottom: clientY,
          } as DOMRect;
        },
      };
      refs.setReference(virtualEl);
    };

    element.addEventListener('mousemove', handleMouseMove);

    return () => element.removeEventListener('mousemove', handleMouseMove);
  }, [enableScrubbing, refs, ref]);

  const filteredSeries = useMemo(() => {
    if (seriesIds === undefined) return series;
    return series.filter((s) => seriesIds.includes(s.id));
  }, [series, seriesIds]);

  const resolvedLabel = useMemo(() => {
    if (scrubberPosition === undefined) return;

    let resolved: React.ReactNode;
    if (label !== undefined) {
      resolved = typeof label === 'function' ? label(scrubberPosition) : label;
    } else {
      // Default to x-axis data value
      const xAxis = getXAxis();
      if (xAxis?.data && xAxis.data[scrubberPosition] !== undefined) {
        resolved = xAxis.data[scrubberPosition];
      } else {
        resolved = scrubberPosition;
      }
    }
    return resolved;
  }, [scrubberPosition, label, getXAxis]);

  if (!isTooltipVisible) return;

  return (
    <Portal containerId={tooltipContainerId}>
      <VStack
        ref={refs.setFloating}
        background={background}
        borderRadius={borderRadius}
        className={classNames?.root ?? className}
        elevation={elevation}
        gap={gap}
        minWidth={minWidth}
        paddingX={paddingX}
        paddingY={paddingY}
        style={{ ...floatingStyles, ...style, ...styles?.root }}
        {...props}
      >
        {resolvedLabel &&
          (typeof resolvedLabel === 'string' || typeof resolvedLabel === 'number' ? (
            <Text className={classNames?.label} font="label1" style={styles?.label}>
              {resolvedLabel}
            </Text>
          ) : (
            resolvedLabel
          ))}
        {resolvedLabel && filteredSeries.length > 0 && (
          <Divider className={classNames?.divider} style={styles?.divider} />
        )}
        {filteredSeries.length > 0 &&
          filteredSeries.map((s) => (
            <ItemComponent
              key={s.id}
              ShapeComponent={ShapeComponent}
              classNames={{
                root: classNames?.item,
                legendItem: classNames?.itemLegendItem,
                value: classNames?.itemValue,
                shapeWrapper: classNames?.itemShapeWrapper,
                shape: classNames?.itemShape,
                label: classNames?.itemLabel,
              }}
              scrubberPosition={scrubberPosition!}
              series={s}
              styles={{
                root: styles?.item,
                legendItem: styles?.itemLegendItem,
                value: styles?.itemValue,
                shapeWrapper: styles?.itemShapeWrapper,
                shape: styles?.itemShape,
                label: styles?.itemLabel,
              }}
              valueFormatter={valueFormatter}
            />
          ))}
      </VStack>
    </Portal>
  );
};
