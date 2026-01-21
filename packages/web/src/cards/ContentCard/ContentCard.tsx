import React, { forwardRef, memo } from 'react';
import { contentCardMaxWidth, contentCardMinWidth } from '@coinbase/cds-common/tokens/card';

import type { Polymorphic } from '../../core/polymorphism';
import { VStack } from '../../layout';
import { Pressable, type PressableBaseProps } from '../../system';

export const contentCardDefaultElement = 'div';
export type ContentCardDefaultElement = typeof contentCardDefaultElement;

export type ContentCardBaseProps = Polymorphic.ExtendableProps<
  PressableBaseProps,
  {
    renderAsPressable?: boolean;
  }
>;

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
        renderAsPressable = false,
        ...props
      }: ContentCardProps<AsComponent>,
      ref?: Polymorphic.Ref<AsComponent>,
    ) => {
      if (renderAsPressable) {
        return (
          <Pressable
            ref={ref}
            as={(as ?? 'button') satisfies React.ElementType}
            borderRadius={borderRadius}
            flexDirection="column"
            maxWidth={maxWidth}
            minWidth={minWidth}
            testID={testID}
            {...props}
          >
            {children}
          </Pressable>
        );
      }

      const Component = (as ?? contentCardDefaultElement) satisfies React.ElementType;
      return (
        <VStack
          ref={ref}
          as={Component}
          borderRadius={borderRadius}
          maxWidth={maxWidth}
          minWidth={minWidth}
          testID={testID}
          {...props}
        >
          {children}
        </VStack>
      );
    },
  ),
);
