import React, { forwardRef, Fragment, memo } from 'react';
import type { View } from 'react-native';
import { chipMaxWidth } from '@coinbase/cds-common/tokens/chip';

import { Box, HStack } from '../layout';
import { InvertedThemeProvider, Pressable } from '../system';
import { Text } from '../typography/Text';

import type { ChipProps } from './ChipProps';
export type { ChipProps };

/**
 * This is a basic Chip component used to create all Chip components.
 */
export const Chip = memo(
  forwardRef(function Chip(
    {
      alignSelf = 'flex-start',
      children,
      start,
      end,
      invertColorScheme,
      inverted,
      maxWidth = chipMaxWidth,
      compact,
      gap = 1,
      paddingX = compact ? 1.5 : 2,
      paddingY = compact ? 0.5 : 1,
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
      borderRadius = 700,
      background = 'bgSecondary',
      style,
      styles,
      onPress,
      color = 'fg',
      font = compact ? 'label1' : 'headline',
      ...props
    }: ChipProps,
    ref: React.ForwardedRef<View>,
  ) {
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
  }),
);
