import React, { forwardRef } from 'react';

import type { Polymorphic } from '../core/polymorphism';

import { Text, type TextBaseProps } from './Text';

export const textTitle2DefaultElement = 'span';

export type TextTitle2DefaultElement = typeof textTitle2DefaultElement;

export type TextTitle2BaseProps = TextBaseProps;

export type TextTitle2Props<AsComponent extends React.ElementType> = Polymorphic.Props<
  AsComponent,
  TextTitle2BaseProps
>;

type TextTitle2Component = (<AsComponent extends React.ElementType = TextTitle2DefaultElement>(
  props: TextTitle2Props<AsComponent>,
) => Polymorphic.ReactReturn) &
  Polymorphic.ReactNamed;

export const TextTitle2: TextTitle2Component = forwardRef<
  React.ReactElement<TextTitle2BaseProps>,
  TextTitle2BaseProps
>(
  <AsComponent extends React.ElementType>(
    { as, font = 'title2', ...props }: TextTitle2Props<AsComponent>,
    ref?: Polymorphic.Ref<AsComponent>,
  ) => {
    const Component = (as ?? textTitle2DefaultElement) satisfies React.ElementType;
    return <Text ref={ref} as={Component} font={font} {...props} />;
  },
);

TextTitle2.displayName = 'TextTitle2';
