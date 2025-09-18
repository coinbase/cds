import React, { forwardRef } from 'react';

import type { Polymorphic } from '../core/polymorphism';

import { Text, type TextBaseProps } from './Text';

export const textBodyDefaultElement = 'span';

export type TextBodyDefaultElement = typeof textBodyDefaultElement;

export type TextBodyBaseProps = TextBaseProps;

export type TextBodyProps<AsComponent extends React.ElementType> = Polymorphic.Props<
  AsComponent,
  TextBodyBaseProps
>;

type TextBodyComponent = (<AsComponent extends React.ElementType = TextBodyDefaultElement>(
  props: TextBodyProps<AsComponent>,
) => Polymorphic.ReactReturn) &
  Polymorphic.ReactNamed;

export const TextBody: TextBodyComponent = forwardRef<
  React.ReactElement<TextBodyBaseProps>,
  TextBodyBaseProps
>(
  <AsComponent extends React.ElementType>(
    { as, font = 'body', ...props }: TextBodyProps<AsComponent>,
    ref?: Polymorphic.Ref<AsComponent>,
  ) => {
    const Component = (as ?? textBodyDefaultElement) satisfies React.ElementType;
    return <Text ref={ref} as={Component} font={font} {...props} />;
  },
);

TextBody.displayName = 'TextBody';
