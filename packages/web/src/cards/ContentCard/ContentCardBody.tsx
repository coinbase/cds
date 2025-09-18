import React, { forwardRef, memo } from 'react';
import type { SharedProps } from '@cbhq/cds-common/types';

import type { Polymorphic } from '../../core/polymorphism';
import { Box, type BoxBaseProps, HStack, VStack } from '../../layout';
import { Text } from '../../typography/Text';

export const contentCardBodyDefaultElement = 'div';
export type ContentCardBodyDefaultElement = typeof contentCardBodyDefaultElement;

export type ContentCardBodyBaseProps = Polymorphic.ExtendableProps<
  BoxBaseProps,
  SharedProps & {
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
  }
>;

export type ContentCardBodyProps<AsComponent extends React.ElementType> = Polymorphic.Props<
  AsComponent,
  ContentCardBodyBaseProps
>;

type ContentCardBodyComponent = (<
  AsComponent extends React.ElementType = ContentCardBodyDefaultElement,
>(
  props: ContentCardBodyProps<AsComponent>,
) => Polymorphic.ReactReturn) &
  Polymorphic.ReactNamed;

export const ContentCardBody: ContentCardBodyComponent = memo(
  forwardRef<React.ReactElement<ContentCardBodyBaseProps>, ContentCardBodyBaseProps>(
    <AsComponent extends React.ElementType>(
      {
        as,
        body,
        label,
        media,
        mediaPosition = 'top',
        children,
        gap = 1,
        testID,
        ...props
      }: ContentCardBodyProps<AsComponent>,
      ref?: Polymorphic.Ref<AsComponent>,
    ) => {
      const Component = (as ?? contentCardBodyDefaultElement) satisfies React.ElementType;
      const isHorizontal = mediaPosition === 'right' || mediaPosition === 'left';
      const mediaBox = isHorizontal ? (
        <Box flexShrink={0} height={96} width={96}>
          {media}
        </Box>
      ) : (
        media
      );
      return (
        <VStack ref={ref} as={Component} gap={gap} testID={testID} {...props}>
          <Box
            flexDirection={isHorizontal ? 'row' : 'column'}
            gap={isHorizontal ? 2 : 1}
            justifyContent={mediaPosition === 'right' ? 'space-between' : 'flex-start'}
          >
            {(mediaPosition === 'top' || mediaPosition === 'left') && mediaBox}
            <VStack gap={1} maxWidth="100%">
              {typeof body === 'string' ? (
                <Text as="p" display="block" font="body">
                  {body}
                </Text>
              ) : (
                body
              )}
              {typeof label === 'string' ? <Text font="label2">{label}</Text> : label}
            </VStack>
            {(mediaPosition === 'bottom' || mediaPosition === 'right') && mediaBox}
          </Box>
          {children}
        </VStack>
      );
    },
  ),
);
