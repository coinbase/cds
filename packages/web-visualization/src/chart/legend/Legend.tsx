import { forwardRef, memo, useMemo } from 'react';
import {
  Box,
  type BoxBaseProps,
  type BoxDefaultElement,
  type BoxProps,
} from '@coinbase/cds-web/layout';

import { useChartContext } from '../ChartProvider';

import { DefaultLegendItem, type LegendItemComponent } from './DefaultLegendItem';
import type { LegendShapeComponent } from './DefaultLegendShape';

export type LegendBaseProps = BoxBaseProps & {
  /**
   * Array of series IDs to display in the legend.
   * By default, all series will be displayed.
   */
  seriesIds?: string[];
  /**
   * Custom component to render each legend item.
   * @default DefaultLegendItem
   */
  ItemComponent?: LegendItemComponent;
  /**
   * Custom component to render the legend shape within each item.
   * Only used when ItemComponent is not provided or is DefaultLegendItem.
   * @default DefaultLegendShape
   */
  ShapeComponent?: LegendShapeComponent;
};

export type LegendProps = BoxProps<BoxDefaultElement> &
  LegendBaseProps & {
    /**
     * Custom class names for the component parts.
     */
    classNames?: {
      /**
       * Custom class name for the root element.
       */
      root?: string;
      /**
       * Custom class name for each item element.
       */
      item?: string;
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
       * Custom styles for each item element.
       */
      item?: React.CSSProperties;
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

export const Legend = memo(
  forwardRef<HTMLDivElement, LegendProps>(
    (
      {
        flexDirection = 'row',
        justifyContent = 'center',
        alignItems = flexDirection === 'row' ? 'center' : 'flex-start',
        flexWrap = 'wrap',
        columnGap = 2,
        rowGap = 0.75,
        seriesIds,
        ItemComponent = DefaultLegendItem,
        ShapeComponent,
        className,
        classNames,
        style,
        styles,
        ...props
      },
      ref,
    ) => {
      const { series } = useChartContext();

      const filteredSeries = useMemo(() => {
        if (seriesIds === undefined) return series;
        return series.filter((s) => seriesIds.includes(s.id));
      }, [series, seriesIds]);

      if (filteredSeries.length === 0) return;

      return (
        <Box
          ref={ref}
          alignItems={alignItems}
          className={classNames?.root ?? className}
          columnGap={columnGap}
          flexDirection={flexDirection}
          flexWrap={flexWrap}
          justifyContent={justifyContent}
          rowGap={rowGap}
          style={{ ...style, ...styles?.root }}
          {...props}
        >
          {filteredSeries.map((s) => (
            <ItemComponent
              key={s.id}
              ShapeComponent={ShapeComponent}
              classNames={{
                root: classNames?.item,
                shapeWrapper: classNames?.itemShapeWrapper,
                shape: classNames?.itemShape,
                label: classNames?.itemLabel,
              }}
              color={s.color}
              label={s.label ?? s.id}
              seriesId={s.id}
              shape={s.legendShape}
              styles={{
                root: styles?.item,
                shapeWrapper: styles?.itemShapeWrapper,
                shape: styles?.itemShape,
                label: styles?.itemLabel,
              }}
            />
          ))}
        </Box>
      );
    },
  ),
);
