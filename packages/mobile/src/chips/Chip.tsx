import React, { Fragment, memo } from 'react';
import type { View } from 'react-native';
import { chipMaxWidth } from '@coinbase/cds-common/tokens/chip';

import { useComponentConfig } from '../hooks/useComponentConfig';
import { Box } from '../layout/Box';
import { HStack } from '../layout/HStack';
import { Pressable } from '../system/Pressable';
import { InvertedThemeProvider } from '../system/ThemeProvider';
import { Text } from '../typography/Text';

import type { ChipProps, ChipSize } from './ChipProps';
export type { ChipProps, ChipSize };

const chipSizes = {
  xs: { paddingX: 1.5, paddingY: 0.75, font: 'label1', borderRadius: 700 },
  s: { paddingX: 2, paddingY: 1, font: 'headline', borderRadius: 700 },
} as const satisfies Record<
  ChipSize,
  {
    paddingX: NonNullable<ChipProps['paddingX']>;
    paddingY: NonNullable<ChipProps['paddingY']>;
    font: NonNullable<ChipProps['font']>;
    borderRadius: NonNullable<ChipProps['borderRadius']>;
  }
>;

const defaultChipSize: ChipSize = 's';

/**
 * This is a basic Chip component used to create all Chip components.
 */
export const Chip = memo(function Chip({
  ref,
  ..._props
}: ChipProps & {
  ref?: React.Ref<View>;
}) {
  const mergedProps = useComponentConfig('Chip', _props);
  // Geometry is driven by `size`; deprecated `compact` falls back to its legacy `xs` size.
  const sizeConfig = chipSizes[mergedProps.size ?? (mergedProps.compact ? 'xs' : defaultChipSize)];
  const {
    alignSelf = 'flex-start',
    children,
    start,
    end,
    invertColorScheme,
    inverted,
    maxWidth = chipMaxWidth,
    compact,
    size: _size,
    gap = 1,
    paddingX = sizeConfig.paddingX,
    paddingY = sizeConfig.paddingY,
    alignItems = 'center',
    justifyContent,
    padding,
    paddingTop,
    paddingBottom,
    paddingStart,
    paddingEnd,
    numberOfLines = 1,
    testID,
    contentStyle,
    borderRadius = sizeConfig.borderRadius,
    background = 'bgSecondary',
    style,
    styles,
    onPress,
    color = 'fg',
    font = sizeConfig.font,
    ...props
  } = mergedProps;
  const WrapperComponent = (invertColorScheme ?? inverted) ? InvertedThemeProvider : Fragment;
  const containerProps = {
    testID,
    background,
    borderRadius,
    ref,
    alignSelf,
    style: [style, styles?.root],
  };

  const content = (
    <HStack
      alignItems={alignItems}
      gap={gap}
      justifyContent={justifyContent}
      maxWidth={maxWidth}
      padding={padding}
      paddingBottom={paddingBottom}
      paddingEnd={paddingEnd}
      paddingStart={paddingStart}
      paddingTop={paddingTop}
      paddingX={paddingX}
      paddingY={paddingY}
      style={[contentStyle, styles?.content]}
      testID={testID ? `${testID}-content` : undefined}
    >
      {start}
      {typeof children === 'string' ? (
        <Text color={color} flexShrink={1} font={font} numberOfLines={numberOfLines}>
          {children}
        </Text>
      ) : children ? (
        <Box color={color} flexShrink={1}>
          {children}
        </Box>
      ) : null}
      {end}
    </HStack>
  );

  return (
    <WrapperComponent>
      {onPress ? (
        <Pressable onPress={onPress} {...containerProps} {...props}>
          {content}
        </Pressable>
      ) : (
        <HStack {...containerProps} {...props}>
          {content}
        </HStack>
      )}
    </WrapperComponent>
  );
});
