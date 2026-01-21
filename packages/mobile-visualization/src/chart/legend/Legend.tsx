import { forwardRef, memo, useMemo } from 'react';
import type { StyleProp, View, ViewStyle } from 'react-native';
import { Box, type BoxBaseProps, type BoxProps } from '@coinbase/cds-mobile/layout';

import { useCartesianChartContext } from '../ChartProvider';
import type { LegendShape } from '../utils';

import { DefaultLegendItem } from './DefaultLegendItem';
import { DefaultLegendShape } from './DefaultLegendShape';

export type LegendShapeProps = {
  /**
   * Color of the legend shape.
   * @default theme.color.fgPrimary
   */
  color?: string;
  /**
   * Shape to display. Can be a preset shape or a custom ReactNode.
   * @default 'circle'
   */
  shape?: LegendShape;
  /**
   * Custom styles for the shape element.
   */
  style?: StyleProp<ViewStyle>;
};

export type LegendShapeComponent = React.FC<LegendShapeProps>;

export type LegendItemProps = {
  /**
   * Id of the series.
   */
  seriesId: string;
  /**
   * Label of the series.
   * If a ReactNode is provided, it replaces the default Text component.
   */
  label: React.ReactNode;
  /**
   * Color of the series.
   * @default theme.color.fgPrimary
   */
  color?: string;
  /**
   * Shape of the series.
   */
  shape?: LegendShape;
  /**
   * Custom component to render the legend shape.
   * @default DefaultLegendShape
   */
  ShapeComponent?: LegendShapeComponent;
  /**
   * Custom styles for the root element.
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Custom styles for the component parts.
   */
  styles?: {
    /**
     * Custom styles for the root element.
     */
    root?: StyleProp<ViewStyle>;
    /**
     * Custom styles for the shape element.
     */
    shape?: StyleProp<ViewStyle>;
    /**
     * Custom styles for the label element.
     * @note not applied when label is a ReactNode.
     */
    label?: StyleProp<ViewStyle>;
  };
};

export type LegendItemComponent = React.FC<LegendItemProps>;

export type LegendBaseProps = Omit<BoxBaseProps, 'children'> & {
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
  /**
   * Accessibility label for the legend group.
   * @default 'Legend'
   */
  accessibilityLabel?: string;
};

export type LegendProps = Omit<BoxProps, 'children'> &
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
  forwardRef<View, LegendProps>(
    (
      {
        flexDirection = 'row',
        justifyContent = 'center',
        alignItems = flexDirection === 'row' ? 'center' : 'flex-start',
        flexWrap = 'wrap',
        rowGap = 0.75,
        columnGap = 2,
        seriesIds,
        ItemComponent = DefaultLegendItem,
        ShapeComponent = DefaultLegendShape,
        accessibilityLabel = 'Legend',
        style,
        styles,
        ...props
      },
      ref,
    ) => {
      const { series } = useCartesianChartContext();

      const filteredSeries = useMemo(() => {
        if (seriesIds === undefined) return series.filter((s) => s.label !== undefined);
        return series.filter((s) => seriesIds.includes(s.id) && s.label !== undefined);
      }, [series, seriesIds]);

      if (filteredSeries.length === 0) return;

      return (
        <Box
          ref={ref}
          accessibilityLabel={accessibilityLabel}
          accessibilityRole="summary"
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
