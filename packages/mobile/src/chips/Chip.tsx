import React, { forwardRef, Fragment, memo, useMemo } from 'react';
import type { View } from 'react-native';
import { getChipsSpacingProps } from '@coinbase/cds-common/chips/getChipsSpacingProps';
import { chipMaxWidth } from '@coinbase/cds-common/tokens/chip';

import { Box, HStack } from '../layout';
import { InvertedThemeProvider, Pressable } from '../system';
import { Text } from '../typography/Text';

import type { ChipProps } from './ChipProps';

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
      inverted,
      maxWidth = chipMaxWidth,
      compact,
      gap,
      paddingX,
      paddingY,
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
      font = compact ? 'label1' : 'headline',
      ...props
    }: ChipProps,
    ref: React.ForwardedRef<View>,
  ) {
    const WrapperComponent = inverted ? InvertedThemeProvider : Fragment;
    const containerProps = {
      testID,
      background,
      borderRadius,
      ref,
      alignSelf,
      style: [style, styles?.root],
    };

    const spacingProps = useMemo(() => {
      const defaults = getChipsSpacingProps({
        compact: !!compact,
        start: !!start,
        end: !!end,
        children: !!children,
      });
      return {
        gap: gap ?? defaults.gap,
        padding: padding ?? defaults.padding,
        paddingBottom: paddingBottom ?? defaults.paddingBottom,
        paddingEnd: paddingEnd ?? defaults.paddingEnd,
        paddingStart: paddingStart ?? defaults.paddingStart,
        paddingTop: paddingTop ?? defaults.paddingTop,
        paddingX: paddingX ?? defaults.paddingX,
        paddingY: paddingY ?? defaults.paddingY,
      };
    }, [
      children,
      compact,
      end,
      gap,
      padding,
      paddingBottom,
      paddingEnd,
      paddingStart,
      paddingTop,
      paddingX,
      paddingY,
      start,
    ]);

    const content = (
      <HStack
        alignItems={alignItems}
        justifyContent={justifyContent}
        maxWidth={maxWidth}
        style={[contentStyle, styles?.content]}
        {...spacingProps}
      >
        {start}
        {typeof children === 'string' ? (
          <Text flexShrink={1} font={font} numberOfLines={numberOfLines}>
            {children}
          </Text>
        ) : children ? (
          <Box flexShrink={1}>{children}</Box>
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
