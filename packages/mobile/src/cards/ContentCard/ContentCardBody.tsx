import React, { forwardRef, memo } from 'react';
import type { View } from 'react-native';
import { type SharedProps } from '@cbhq/cds-common/types';

import type { VStackProps } from '../../layout';
import { Box, HStack, VStack } from '../../layout';
import { Text } from '../../typography/Text';

export type ContentCardBodyBaseProps = SharedProps & {
  /** Main body copy */
  body?: React.ReactNode;
  /** Use for supplemental data */
  label?: React.ReactNode;
  /** Media, image or video to show */
  media?: React.ReactNode;
  /**
   * The position of the media within the card.
   * Can be one of: 'top', 'bottom', 'right' or 'left'.
   */
  mediaPosition?: 'top' | 'bottom' | 'right' | 'left';
  children?: React.ReactNode;
};

export type ContentCardBodyProps = ContentCardBodyBaseProps & VStackProps;

export const ContentCardBody = memo(
  forwardRef(function ContentCardBody(
    { body, label, media, mediaPosition = 'top', children, testID, ...props }: ContentCardBodyProps,
    ref: React.ForwardedRef<View>,
  ) {
    const isHorizontal = mediaPosition === 'right' || mediaPosition === 'left';
    const mediaBox = isHorizontal ? (
      <Box flexShrink={0} height={96} width={96}>
        {media}
      </Box>
    ) : (
      media
    );
    return (
      <VStack ref={ref} gap={1} testID={testID} {...props}>
        <Box
          flexDirection={isHorizontal ? 'row' : 'column'}
          gap={isHorizontal ? 2 : 1}
          justifyContent={mediaPosition === 'right' ? 'space-between' : 'flex-start'}
        >
          {(mediaPosition === 'top' || mediaPosition === 'left') && mediaBox}
          <VStack gap={1} maxWidth={isHorizontal ? '70%' : '100%'}>
            {typeof body === 'string' ? <Text font="body">{body}</Text> : body}
            {typeof label === 'string' ? <Text font="label2">{label}</Text> : label}
          </VStack>
          {(mediaPosition === 'bottom' || mediaPosition === 'right') && mediaBox}
        </Box>
        {children}
      </VStack>
    );
  }),
);
