import { forwardRef, memo, useMemo } from 'react';
import type { StyleProp, View, ViewStyle } from 'react-native';
import type { SharedProps } from '@coinbase/cds-common/types';
import { Box, type BoxProps } from '@coinbase/cds-mobile/layout';

import { useChartContext } from '../ChartProvider';

import { DefaultLegendItem, type LegendItemComponent } from './DefaultLegendItem';
import type { LegendShapeComponent } from './DefaultLegendShape';

export type LegendBaseProps = SharedProps & {
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

export type LegendProps = BoxProps &
  LegendBaseProps & {
    /**
     * Custom styles for the component parts.
     */
    styles?: {
      /**
       * Custom styles for the root element.
       */
      root?: StyleProp<ViewStyle>;
      /**
       * Custom styles for each item element.
       */
      item?: StyleProp<ViewStyle>;
      /**
       * Custom styles for the shape wrapper element within each item.
       */
      itemShapeWrapper?: StyleProp<ViewStyle>;
      /**
       * Custom styles for the shape element within each item.
       */
      itemShape?: StyleProp<ViewStyle>;
      /**
       * Custom styles for the label element within each item.
       * @note not applied when label is a ReactNode.
       */
      itemLabel?: StyleProp<ViewStyle>;
    };
  };

export const Legend = memo(
  forwardRef<View, LegendProps>(function Legend(
    {
      flexDirection = 'row',
      justifyContent = 'center',
      alignItems = flexDirection === 'row' ? 'center' : 'flex-start',
      flexWrap = 'wrap',
      rowGap = 0.75,
      columnGap = 2,
      seriesIds,
      ItemComponent = DefaultLegendItem,
      ShapeComponent,
      style,
      styles,
      ...props
    },
    ref,
  ) {
    const { series } = useChartContext();

    const filteredSeries = useMemo(() => {
      if (seriesIds === undefined) return series.filter((s) => s.label !== undefined);
      return series.filter((s) => seriesIds.includes(s.id) && s.label !== undefined);
    }, [series, seriesIds]);

    if (filteredSeries.length === 0) return;

    return (
      <Box
        ref={ref}
        alignItems={alignItems}
        columnGap={columnGap}
        flexDirection={flexDirection}
        flexWrap={flexWrap}
        justifyContent={justifyContent}
        rowGap={rowGap}
        style={[style, styles?.root]}
        {...props}
      >
        {filteredSeries.map((s) => (
          <ItemComponent
            key={s.id}
            ShapeComponent={ShapeComponent}
            color={s.color}
            label={s.label}
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
  }),
);
