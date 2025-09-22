import React, { forwardRef, Fragment, memo } from 'react';
import type { View } from 'react-native';
import { chipMaxWidth } from '@cbhq/cds-common/tokens/chip';

import { HStack } from '../layout';
import { InvertedThemeProvider, Pressable } from '../system';
import { Text } from '../typography/Text';

import type { ChipProps } from './ChipProps';

/**
 * This is a basic Chip component used to create all Chip components.
 */
export const Chip = memo(
  forwardRef(function Chip(
    {
      children,
      start,
      end,
      inverted,
      maxWidth = chipMaxWidth,
      compact,
      numberOfLines = 1,
      onPress,
      testID,
      contentStyle,
      borderRadius = 700,
      background = 'bgSecondary',
      ...props
    }: ChipProps,
    ref: React.ForwardedRef<View>,
  ) {
    const WrapperComponent = inverted ? InvertedThemeProvider : Fragment;

    const content = (
      <HStack
        alignItems="center"
        background={onPress ? undefined : background}
        borderRadius={borderRadius}
        gap={1}
        maxWidth={maxWidth}
        minWidth={0}
        paddingX={compact ? 1 : 2}
        paddingY={compact ? 0.5 : 1}
        style={contentStyle}
        testID={!onPress ? testID : undefined}
      >
        {start}
        <HStack flexShrink={1}>
          {typeof children === 'string' ? (
            <Text font="headline" numberOfLines={numberOfLines}>
              {children}
            </Text>
          ) : (
            children
          )}
        </HStack>
        {end}
      </HStack>
    );

    return (
      <WrapperComponent>
        {/* this ensures that when a Chip is wrapped in a VStack it won't fill the entire width of the parent */}
        <HStack>
          {onPress ? (
            <Pressable
              ref={ref}
              background={background}
              borderRadius={borderRadius}
              onPress={onPress}
              testID={testID}
              {...props}
            >
              {content}
            </Pressable>
          ) : (
            content
          )}
        </HStack>
      </WrapperComponent>
    );
  }),
);
