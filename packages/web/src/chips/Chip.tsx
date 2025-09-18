import React, { forwardRef, Fragment, memo } from 'react';
import { curves, durations } from '@cbhq/cds-common/motion/tokens';
import { chipMaxWidth } from '@cbhq/cds-common/tokens/chip';
import { css } from '@linaria/core';

import { Box, HStack } from '../layout';
import { Pressable } from '../system/Pressable';
import { InvertedThemeProvider } from '../system/ThemeProvider';
import { Text } from '../typography/Text';

import type { ChipProps } from './ChipProps';

const contentCss = css`
  transition: background ${durations.fast3}ms cubic-bezier(${curves.global.join(',')});
`;

// styles that clamp the width and height of the Chip container
const containerCss = css`
  max-height: fit-content;
  min-width: min(fit-content, ${chipMaxWidth}px);
`;

/**
 * This is a basic Chip component used to create all Chip components.
 */
export const Chip = memo(
  forwardRef<HTMLButtonElement, ChipProps>(function Chip(
    {
      children,
      start,
      end,
      maxWidth = chipMaxWidth,
      inverted,
      compact,
      numberOfLines = 1,
      onClick,
      testID,
      accessibilityLabel,
      contentStyle,
      borderRadius = 700,
      background = 'bgSecondary',
      ...props
    },
    ref,
  ) {
    const WrapperComponent = inverted ? InvertedThemeProvider : Fragment;

    const content = (
      <HStack
        alignItems="center"
        background={onClick ? undefined : background}
        borderRadius={borderRadius}
        className={contentCss}
        gap={1}
        maxWidth={maxWidth}
        paddingX={compact ? 1 : 2}
        paddingY={compact ? 0.5 : 1}
        style={contentStyle}
        testID={!onClick ? testID : undefined}
      >
        {start}
        {typeof children === 'string' ? (
          <Text font="headline" numberOfLines={numberOfLines}>
            {children}
          </Text>
        ) : (
          children
        )}
        {end}
      </HStack>
    );

    // The wrapping Box ensures that the layout is consistent since the child pressable and provider child elements conditionally render
    return (
      <Box className={containerCss} display="block">
        <WrapperComponent>
          {onClick ? (
            <Pressable
              ref={ref}
              accessibilityLabel={accessibilityLabel}
              background={background}
              borderRadius={borderRadius}
              onClick={onClick}
              testID={testID}
              {...props}
            >
              {content}
            </Pressable>
          ) : (
            content
          )}
        </WrapperComponent>
      </Box>
    );
  }),
);
