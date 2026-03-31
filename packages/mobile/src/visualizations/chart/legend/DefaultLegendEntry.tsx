import { memo } from 'react';
import { StyleSheet } from 'react-native';
import { HStack, type HStackProps } from '@coinbase/cds-mobile/layout';
import { Text } from '@coinbase/cds-mobile/typography/Text';

import { DefaultLegendShape } from './DefaultLegendShape';
import type { LegendEntryProps } from './Legend';

const styles = StyleSheet.create({
  legendEntry: {
    alignItems: 'center',
  },
});

export type DefaultLegendEntryProps = LegendEntryProps & Omit<HStackProps, 'children' | 'color'>;

export const DefaultLegendEntry = memo<DefaultLegendEntryProps>(
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
        style={[styles.legendEntry, style, stylesProp?.root]}
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
