import React, { forwardRef, memo } from 'react';
import { contentCardMaxWidth, contentCardMinWidth } from '@cbhq/cds-common/tokens/card';

import type { Polymorphic } from '../../core/polymorphism';
import { type BoxBaseProps, VStack } from '../../layout';

export const contentCardDefaultElement = 'div';
export type ContentCardDefaultElement = typeof contentCardDefaultElement;

export type ContentCardBaseProps = BoxBaseProps;

export type ContentCardProps<AsComponent extends React.ElementType> = Polymorphic.Props<
  AsComponent,
  ContentCardBaseProps
>;

type ContentCardComponent = (<AsComponent extends React.ElementType = ContentCardDefaultElement>(
  props: ContentCardProps<AsComponent>,
) => Polymorphic.ReactReturn) &
  Polymorphic.ReactNamed;

export const ContentCard: ContentCardComponent = memo(
  forwardRef<React.ReactElement<ContentCardBaseProps>, ContentCardBaseProps>(
    <AsComponent extends React.ElementType>(
      {
        as,
        testID,
        children,
        maxWidth = contentCardMaxWidth,
        minWidth = contentCardMinWidth,
        paddingX = 3,
        paddingY = 2,
        ...props
      }: ContentCardProps<AsComponent>,
      ref?: Polymorphic.Ref<AsComponent>,
    ) => {
      const Component = (as ?? contentCardDefaultElement) satisfies React.ElementType;
      return (
        <VStack
          ref={ref}
          as={Component}
          gap={1}
          maxWidth={maxWidth}
          minWidth={minWidth}
          paddingX={paddingX}
          paddingY={paddingY}
          testID={testID}
          {...props}
        >
          {children}
        </VStack>
      );
    },
  ),
);
