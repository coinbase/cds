import React, { forwardRef, memo } from 'react';

import type { Polymorphic } from '../../core/polymorphism';
import { type BoxBaseProps, HStack } from '../../layout';

export const contentCardFooterDefaultElement = 'footer';
export type ContentCardFooterDefaultElement = typeof contentCardFooterDefaultElement;

export type ContentCardFooterBaseProps = BoxBaseProps;

export type ContentCardFooterProps<AsComponent extends React.ElementType> = Polymorphic.Props<
  AsComponent,
  ContentCardFooterBaseProps
>;

type ContentCardFooterComponent = (<
  AsComponent extends React.ElementType = ContentCardFooterDefaultElement,
>(
  props: ContentCardFooterProps<AsComponent>,
) => Polymorphic.ReactReturn) &
  Polymorphic.ReactNamed;

export const ContentCardFooter: ContentCardFooterComponent = memo(
  forwardRef<React.ReactElement<ContentCardFooterBaseProps>, ContentCardFooterBaseProps>(
    <AsComponent extends React.ElementType>(
      {
        as,
        children,
        justifyContent = 'space-between',
        ...props
      }: ContentCardFooterProps<AsComponent>,
      ref?: Polymorphic.Ref<AsComponent>,
    ) => {
      const Component = (as ?? contentCardFooterDefaultElement) satisfies React.ElementType;
      return (
        <HStack ref={ref} as={Component} justifyContent={justifyContent} {...props}>
          {children}
        </HStack>
      );
    },
  ),
);
