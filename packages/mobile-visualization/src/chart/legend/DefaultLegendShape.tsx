import { memo } from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';
import { useTheme } from '@coinbase/cds-mobile';
import { Box, type BoxProps } from '@coinbase/cds-mobile/layout';

import type { LegendShape, LegendShapeVariant } from '../utils/chart';

import type { LegendShapeProps } from './Legend';

const styles = StyleSheet.create({
  container: {
    width: 10,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
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

export type DefaultLegendShapeProps = LegendShapeProps & Omit<BoxProps, 'children' | 'color'>;

export const DefaultLegendShape = memo<DefaultLegendShapeProps>(
  ({ color, shape = 'circle', style, testID, ...props }) => {
    const theme = useTheme();

    if (!isVariantShape(shape)) return shape;

    const variantStyle = stylesByVariant[shape];

    return (
      <Box style={[styles.container, style]} testID={testID} {...props}>
        <View style={[variantStyle, { backgroundColor: color ?? theme.color.fgPrimary }]} />
      </Box>
    );
  },
);
