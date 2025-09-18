import React, { forwardRef } from 'react';

import type { Polymorphic } from '../core/polymorphism';

import { Text, type TextBaseProps } from './Text';

export const textLegalDefaultElement = 'span';

export type TextLegalDefaultElement = typeof textLegalDefaultElement;

export type TextLegalBaseProps = TextBaseProps;

export type TextLegalProps<AsComponent extends React.ElementType> = Polymorphic.Props<
  AsComponent,
  TextLegalBaseProps
>;

type TextLegalComponent = (<AsComponent extends React.ElementType = TextLegalDefaultElement>(
  props: TextLegalProps<AsComponent>,
) => Polymorphic.ReactReturn) &
  Polymorphic.ReactNamed;

export const TextLegal: TextLegalComponent = forwardRef<
  React.ReactElement<TextLegalBaseProps>,
  TextLegalBaseProps
>(
  <AsComponent extends React.ElementType>(
    { as, font = 'legal', ...props }: TextLegalProps<AsComponent>,
    ref?: Polymorphic.Ref<AsComponent>,
  ) => {
    const Component = (as ?? textLegalDefaultElement) satisfies React.ElementType;
    return <Text ref={ref} as={Component} font={font} {...props} />;
  },
);

TextLegal.displayName = 'TextLegal';
