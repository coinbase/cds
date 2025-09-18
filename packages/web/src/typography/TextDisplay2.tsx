import React, { forwardRef } from 'react';

import type { Polymorphic } from '../core/polymorphism';

import { Text, type TextBaseProps } from './Text';

export const textDisplay2DefaultElement = 'span';

export type TextDisplay2DefaultElement = typeof textDisplay2DefaultElement;

export type TextDisplay2BaseProps = TextBaseProps;

export type TextDisplay2Props<AsComponent extends React.ElementType> = Polymorphic.Props<
  AsComponent,
  TextDisplay2BaseProps
>;

type TextDisplay2Component = (<AsComponent extends React.ElementType = TextDisplay2DefaultElement>(
  props: TextDisplay2Props<AsComponent>,
) => Polymorphic.ReactReturn) &
  Polymorphic.ReactNamed;

export const TextDisplay2: TextDisplay2Component = forwardRef<
  React.ReactElement<TextDisplay2BaseProps>,
  TextDisplay2BaseProps
>(
  <AsComponent extends React.ElementType>(
    { as, font = 'display2', ...props }: TextDisplay2Props<AsComponent>,
    ref?: Polymorphic.Ref<AsComponent>,
  ) => {
    const Component = (as ?? textDisplay2DefaultElement) satisfies React.ElementType;
    return <Text ref={ref} as={Component} font={font} {...props} />;
  },
);

TextDisplay2.displayName = 'TextDisplay2';
