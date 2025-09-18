import React, { forwardRef } from 'react';

import type { Polymorphic } from '../core/polymorphism';

import { Text, type TextBaseProps } from './Text';

export const textDisplay1DefaultElement = 'span';

export type TextDisplay1DefaultElement = typeof textDisplay1DefaultElement;

export type TextDisplay1BaseProps = TextBaseProps;

export type TextDisplay1Props<AsComponent extends React.ElementType> = Polymorphic.Props<
  AsComponent,
  TextDisplay1BaseProps
>;

type TextDisplay1Component = (<AsComponent extends React.ElementType = TextDisplay1DefaultElement>(
  props: TextDisplay1Props<AsComponent>,
) => Polymorphic.ReactReturn) &
  Polymorphic.ReactNamed;

export const TextDisplay1: TextDisplay1Component = forwardRef<
  React.ReactElement<TextDisplay1BaseProps>,
  TextDisplay1BaseProps
>(
  <AsComponent extends React.ElementType>(
    { as, font = 'display1', ...props }: TextDisplay1Props<AsComponent>,
    ref?: Polymorphic.Ref<AsComponent>,
  ) => {
    const Component = (as ?? textDisplay1DefaultElement) satisfies React.ElementType;
    return <Text ref={ref} as={Component} font={font} {...props} />;
  },
);

TextDisplay1.displayName = 'TextDisplay1';
