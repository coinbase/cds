import { memo, useMemo } from 'react';
import type { SharedProps } from '@coinbase/cds-common/types';
import {
  HStack,
  type HStackBaseProps,
  type HStackDefaultElement,
  type HStackProps,
} from '@coinbase/cds-web/layout';
import { Text } from '@coinbase/cds-web/typography';

import { DefaultLegendItem, type LegendItemComponent } from './legend/DefaultLegendItem';
import type { LegendShapeComponent } from './legend/DefaultLegendShape';
import { useCartesianChartContext } from './ChartProvider';
import type { CartesianSeries } from './utils';

export type ChartTooltipItemBaseProps = Omit<HStackBaseProps, 'children'> &
  SharedProps & {
    /**
     * The series to display.
     */
    series: CartesianSeries;
    /**
     * The current scrubber position (data index).
     */
    scrubberPosition: number;
    /**
     * Formatter function for series values.
     * Receives the numeric series value and should return a ReactNode.
     * String results will automatically be wrapped in Text.
     */
    valueFormatter?: (value: number) => React.ReactNode;
    /**
     * Custom component to render the legend item (shape + label).
     * @default DefaultLegendItem
     */
    LegendItemComponent?: LegendItemComponent;
    /**
     * Custom component to render the legend shape.
     * Only used when LegendItemComponent is DefaultLegendItem.
     * @default DefaultLegendShape
     */
    ShapeComponent?: LegendShapeComponent;
  };

export type ChartTooltipItemProps = Omit<HStackProps<HStackDefaultElement>, 'children'> &
  ChartTooltipItemBaseProps & {
    /**
     * Custom class names for the component parts.
     */
    classNames?: {
      /**
       * Custom class name for the root element.
       */
      root?: string;
      /**
       * Custom class name for the legend item element.
       */
      legendItem?: string;
      /**
       * Custom class name for the value element.
       * @note not applied when value is a ReactNode.
       */
      value?: string;
      /**
       * Custom class name for the shape wrapper element.
       */
      shapeWrapper?: string;
      /**
       * Custom class name for the shape element.
       */
      shape?: string;
      /**
       * Custom class name for the label element.
       * @note not applied when label is a ReactNode.
       */
      label?: string;
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
       * Custom styles for the legend item element.
       */
      legendItem?: React.CSSProperties;
      /**
       * Custom styles for the value element.
       * @note not applied when value is a ReactNode.
       */
      value?: React.CSSProperties;
      /**
       * Custom styles for the shape wrapper element.
       */
      shapeWrapper?: React.CSSProperties;
      /**
       * Custom styles for the shape element.
       */
      shape?: React.CSSProperties;
      /**
       * Custom styles for the label element.
       * @note not applied when label is a ReactNode.
       */
      label?: React.CSSProperties;
    };
  };

export type ChartTooltipItemComponent = React.FC<ChartTooltipItemProps>;

export const DefaultChartTooltipItem = memo<ChartTooltipItemProps>(
  ({
    alignItems = 'center',
    justifyContent = 'space-between',
    series,
    scrubberPosition,
    valueFormatter,
    LegendItemComponent = DefaultLegendItem,
    ShapeComponent,
    className,
    classNames,
    style,
    styles,
    testID,
    ...props
  }) => {
    const { getSeriesData } = useCartesianChartContext();

    const formattedValue: React.ReactNode = useMemo(() => {
      const data = getSeriesData(series.id);
      const dataPoint = data?.[scrubberPosition];
      let value: number | undefined;

      if (dataPoint && dataPoint !== null) {
        const [start, end] = dataPoint;
        value = end - start;
      } else if (series.data) {
        const rawPoint = series.data[scrubberPosition];
        if (rawPoint !== undefined && rawPoint !== null) {
          value = Array.isArray(rawPoint) ? rawPoint.at(-1) : rawPoint;
        }
      }

      if (value === undefined || value === null || Number.isNaN(value)) return;

      return valueFormatter ? valueFormatter(value) : value;
    }, [series.id, series.data, scrubberPosition, getSeriesData, valueFormatter]);

    if (formattedValue === undefined) return;

    return (
      <HStack
        alignItems={alignItems}
        className={classNames?.root ?? className}
        data-testid={testID}
        justifyContent={justifyContent}
        style={{ ...style, ...styles?.root }}
        {...props}
      >
        <LegendItemComponent
          ShapeComponent={ShapeComponent}
          classNames={{
            root: classNames?.legendItem,
            shapeWrapper: classNames?.shapeWrapper,
            shape: classNames?.shape,
            label: classNames?.label,
          }}
          color={series.color}
          label={series.label ?? series.id}
          seriesId={series.id}
          shape={series.legendShape}
          styles={{
            root: styles?.legendItem,
            shapeWrapper: styles?.shapeWrapper,
            shape: styles?.shape,
            label: styles?.label,
          }}
        />
        {typeof formattedValue === 'string' || typeof formattedValue === 'number' ? (
          <Text className={classNames?.value} color="fgMuted" font="label2" style={styles?.value}>
            {formattedValue}
          </Text>
        ) : (
          formattedValue
        )}
      </HStack>
    );
  },
);
