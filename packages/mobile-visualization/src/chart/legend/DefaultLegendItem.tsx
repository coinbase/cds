import { memo } from 'react';
import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import type { SharedProps } from '@coinbase/cds-common/types';
import { Box, HStack, type HStackProps } from '@coinbase/cds-mobile/layout';
import { TextLabel2 } from '@coinbase/cds-mobile/typography';

import type { Series } from '../utils';

import { DefaultLegendShape, type LegendShapeComponent } from './DefaultLegendShape';

const styles = StyleSheet.create({
  shapeWrapper: {
    width: 10,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  legendItem: {
    alignItems: 'center',
  },
});

export type LegendItemBaseProps = Omit<HStackProps, 'children' | 'color'> &
  SharedProps & {
    /**
     * Id of the series.
     */
    seriesId: string;
    /**
     * Display label for the legend item.
     * Can be a string or a custom ReactNode.
     * If a ReactNode is provided, it replaces the default Text component.
     */
    label: React.ReactNode;
    /**
     * Color associated with the series.
     * This is a raw string color value (e.g. 'rgb(...)' or hex).
     */
    color?: string;
    /**
     * Shape to display in the legend.
     */
    shape?: Series['legendShape'];
    /**
     * Custom component to render the legend shape.
     * @default DefaultLegendShape
     */
    ShapeComponent?: LegendShapeComponent;
  };

export type LegendItemProps = LegendItemBaseProps & {
  /**
   * Custom styles for the component parts.
   */
  styles?: {
    /**
     * Custom styles for the root element.
     */
    root?: StyleProp<ViewStyle>;
    /**
     * Custom styles for the shape wrapper element.
     */
    shapeWrapper?: StyleProp<ViewStyle>;
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

export const DefaultLegendItem = memo<LegendItemProps>(function DefaultLegendItem({
  label,
  color,
  shape,
  ShapeComponent = DefaultLegendShape,
  gap = 1,
  style,
  styles: stylesProp,
  testID,
  ...props
}) {
  return (
    <HStack
      gap={gap}
      style={[styles.legendItem, style, stylesProp?.root]}
      testID={testID}
      {...props}
    >
      <Box style={[styles.shapeWrapper, stylesProp?.shapeWrapper]}>
        <ShapeComponent color={color} shape={shape} style={stylesProp?.shape} />
      </Box>
      {typeof label === 'string' ? (
        <TextLabel2 style={stylesProp?.label}>{label}</TextLabel2>
      ) : (
        label
      )}
    </HStack>
  );
});
