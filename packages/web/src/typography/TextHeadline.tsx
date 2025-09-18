import React, { forwardRef } from 'react';

import type { Polymorphic } from '../core/polymorphism';

import { Text, type TextBaseProps } from './Text';

export const textHeadlineDefaultElement = 'span';

export type TextHeadlineDefaultElement = typeof textHeadlineDefaultElement;

export type TextHeadlineBaseProps = TextBaseProps;

export type TextHeadlineProps<AsComponent extends React.ElementType> = Polymorphic.Props<
  AsComponent,
  TextHeadlineBaseProps
>;

type TextHeadlineComponent = (<AsComponent extends React.ElementType = TextHeadlineDefaultElement>(
  props: TextHeadlineProps<AsComponent>,
) => Polymorphic.ReactReturn) &
  Polymorphic.ReactNamed;

export const TextHeadline: TextHeadlineComponent = forwardRef<
  React.ReactElement<TextHeadlineBaseProps>,
  TextHeadlineBaseProps
>(
  <AsComponent extends React.ElementType>(
    { as, font = 'headline', ...props }: TextHeadlineProps<AsComponent>,
    ref?: Polymorphic.Ref<AsComponent>,
  ) => {
    const Component = (as ?? textHeadlineDefaultElement) satisfies React.ElementType;
    return <Text ref={ref} as={Component} font={font} {...props} />;
  },
);

TextHeadline.displayName = 'TextHeadline';
