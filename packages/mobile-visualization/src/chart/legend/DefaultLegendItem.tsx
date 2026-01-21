import { memo } from 'react';
import { StyleSheet } from 'react-native';
import { HStack, type HStackProps } from '@coinbase/cds-mobile/layout';
import { Text } from '@coinbase/cds-mobile/typography/Text';

import { DefaultLegendShape } from './DefaultLegendShape';
import type { LegendItemProps } from './Legend';

const styles = StyleSheet.create({
  legendItem: {
    alignItems: 'center',
  },
});

export type DefaultLegendItemProps = LegendItemProps & Omit<HStackProps, 'children' | 'color'>;

export const DefaultLegendItem = memo<DefaultLegendItemProps>(
  ({
    label,
    color,
    shape,
    ShapeComponent = DefaultLegendShape,
    gap = 1,
    style,
    styles: stylesProp,
    testID,
    ...props
  }) => {
    return (
      <HStack
        gap={gap}
        style={[styles.legendItem, style, stylesProp?.root]}
        testID={testID}
        {...props}
      >
        <ShapeComponent color={color} shape={shape} style={stylesProp?.shape} />
        {typeof label === 'string' ? (
          <Text font="label1" style={stylesProp?.label}>
            {label}
          </Text>
        ) : (
          label
        )}
      </HStack>
    );
  },
);
