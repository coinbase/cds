import React, { forwardRef } from 'react';

import type { Polymorphic } from '../core/polymorphism';

import { Text, type TextBaseProps } from './Text';

export const textTitle1DefaultElement = 'span';

export type TextTitle1DefaultElement = typeof textTitle1DefaultElement;

export type TextTitle1BaseProps = TextBaseProps;

export type TextTitle1Props<AsComponent extends React.ElementType> = Polymorphic.Props<
  AsComponent,
  TextTitle1BaseProps
>;

type TextTitle1Component = (<AsComponent extends React.ElementType = TextTitle1DefaultElement>(
  props: TextTitle1Props<AsComponent>,
) => Polymorphic.ReactReturn) &
  Polymorphic.ReactNamed;

export const TextTitle1: TextTitle1Component = forwardRef<
  React.ReactElement<TextTitle1BaseProps>,
  TextTitle1BaseProps
>(
  <AsComponent extends React.ElementType>(
    { as, font = 'title1', ...props }: TextTitle1Props<AsComponent>,
    ref?: Polymorphic.Ref<AsComponent>,
  ) => {
    const Component = (as ?? textTitle1DefaultElement) satisfies React.ElementType;
    return <Text ref={ref} as={Component} font={font} {...props} />;
  },
);

TextTitle1.displayName = 'TextTitle1';
