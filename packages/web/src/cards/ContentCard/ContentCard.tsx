import React, { forwardRef, memo } from 'react';
import { contentCardMaxWidth, contentCardMinWidth } from '@coinbase/cds-common/tokens/card';

import type { Polymorphic } from '../../core/polymorphism';
import { VStack, type VStackBaseProps } from '../../layout';

export const contentCardDefaultElement = 'article';
export type ContentCardDefaultElement = typeof contentCardDefaultElement;

export type ContentCardBaseProps = Polymorphic.ExtendableProps<VStackBaseProps, object>;

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
        borderRadius = 500,
        padding = 2,
        gap = 2,
        ...props
      }: ContentCardProps<AsComponent>,
      ref?: Polymorphic.Ref<AsComponent>,
    ) => {
      const Component = (as ?? contentCardDefaultElement) satisfies React.ElementType;
      return (
        <VStack
          ref={ref}
          as={Component}
          borderRadius={borderRadius}
          gap={gap}
          maxWidth={maxWidth}
          minWidth={minWidth}
          padding={padding}
          testID={testID}
          {...props}
        >
          {children}
        </VStack>
      );
    },
  ),
);
