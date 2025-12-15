import { memo } from 'react';
import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import type { SharedProps } from '@coinbase/cds-common/types';
import { Box, HStack, type HStackProps } from '@coinbase/cds-mobile/layout';
import { Text } from '@coinbase/cds-mobile/typography/Text';

import type { LegendShape } from '../utils';

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
     * Label of the series.
     * @default label for the series.
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
     *
     */
    shape?: LegendShape;
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
        <Text font="label1" style={stylesProp?.label}>
          {label}
        </Text>
      ) : (
        label
      )}
    </HStack>
  );
});
