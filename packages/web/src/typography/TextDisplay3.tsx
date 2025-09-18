import React, { forwardRef } from 'react';

import type { Polymorphic } from '../core/polymorphism';

import { Text, type TextBaseProps } from './Text';

export const textDisplay3DefaultElement = 'span';

export type TextDisplay3DefaultElement = typeof textDisplay3DefaultElement;

export type TextDisplay3BaseProps = TextBaseProps;

export type TextDisplay3Props<AsComponent extends React.ElementType> = Polymorphic.Props<
  AsComponent,
  TextDisplay3BaseProps
>;

type TextDisplay3Component = (<AsComponent extends React.ElementType = TextDisplay3DefaultElement>(
  props: TextDisplay3Props<AsComponent>,
) => Polymorphic.ReactReturn) &
  Polymorphic.ReactNamed;

export const TextDisplay3: TextDisplay3Component = forwardRef<
  React.ReactElement<TextDisplay3BaseProps>,
  TextDisplay3BaseProps
>(
  <AsComponent extends React.ElementType>(
    { as, font = 'display3', ...props }: TextDisplay3Props<AsComponent>,
    ref?: Polymorphic.Ref<AsComponent>,
  ) => {
    const Component = (as ?? textDisplay3DefaultElement) satisfies React.ElementType;
    return <Text ref={ref} as={Component} font={font} {...props} />;
  },
);

TextDisplay3.displayName = 'TextDisplay3';
