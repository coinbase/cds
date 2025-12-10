import { memo } from 'react';
import { StyleSheet, type ViewStyle } from 'react-native';
import type { SharedProps } from '@coinbase/cds-common/types';
import { useTheme } from '@coinbase/cds-mobile';
import { Box, type BoxProps } from '@coinbase/cds-mobile/layout';

import type { LegendShape, LegendShapeVariant } from '../utils/chart';

const styles = StyleSheet.create({
  pill: {
    width: 6,
    height: 24,
    borderRadius: 3,
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  square: {
    width: 10,
    height: 10,
  },
  squircle: {
    width: 10,
    height: 10,
    borderRadius: 2,
  },
});

const stylesByVariant: Record<LegendShapeVariant, ViewStyle> = {
  pill: styles.pill,
  circle: styles.circle,
  square: styles.square,
  squircle: styles.squircle,
};

const isVariantShape = (shape: LegendShape): shape is LegendShapeVariant =>
  typeof shape === 'string' && shape in stylesByVariant;

export type LegendShapeBaseProps = SharedProps & {
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
};

export type LegendShapeProps = Omit<BoxProps, 'children' | 'color'> & LegendShapeBaseProps;

export type LegendShapeComponent = React.FC<LegendShapeProps>;

/**
 * Default shape component for chart legends.
 * Renders a colored shape (pill, circle, square, or squircle) or a custom ReactNode.
 */
export const DefaultLegendShape = memo<LegendShapeProps>(function DefaultLegendShape({
  color,
  shape = 'circle',
  style,
  testID,
  ...props
}) {
  const theme = useTheme();

  if (!isVariantShape(shape)) return shape;

  const variantStyle = stylesByVariant[shape];

  return (
    <Box
      style={[variantStyle, { backgroundColor: color ?? theme.color.fgPrimary }, style]}
      testID={testID}
      {...props}
    />
  );
});
