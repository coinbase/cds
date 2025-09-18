import React, { forwardRef } from 'react';

import type { Polymorphic } from '../core/polymorphism';

import { Text, type TextBaseProps } from './Text';

export const textLabel2DefaultElement = 'span';

export type TextLabel2DefaultElement = typeof textLabel2DefaultElement;

export type TextLabel2BaseProps = TextBaseProps;

export type TextLabel2Props<AsComponent extends React.ElementType> = Polymorphic.Props<
  AsComponent,
  TextLabel2BaseProps
>;

type TextLabel2Component = (<AsComponent extends React.ElementType = TextLabel2DefaultElement>(
  props: TextLabel2Props<AsComponent>,
) => Polymorphic.ReactReturn) &
  Polymorphic.ReactNamed;

export const TextLabel2: TextLabel2Component = forwardRef<
  React.ReactElement<TextLabel2BaseProps>,
  TextLabel2BaseProps
>(
  <AsComponent extends React.ElementType>(
    { as, font = 'label2', ...props }: TextLabel2Props<AsComponent>,
    ref?: Polymorphic.Ref<AsComponent>,
  ) => {
    const Component = (as ?? textLabel2DefaultElement) satisfies React.ElementType;
    return <Text ref={ref} as={Component} font={font} {...props} />;
  },
);

TextLabel2.displayName = 'TextLabel2';
