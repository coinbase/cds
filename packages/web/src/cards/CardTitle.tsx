import React, { forwardRef } from 'react';

import type { Polymorphic } from '../core/polymorphism';
import { Text, type TextBaseProps } from '../typography/Text';

export const cardTitleDefaultElement = 'h3';

export type CardTitleDefaultElement = typeof cardTitleDefaultElement;

export type CardTitleBaseProps = TextBaseProps;

export type CardTitleProps<AsComponent extends React.ElementType> = Polymorphic.Props<
  AsComponent,
  CardTitleBaseProps
>;

type CardTitleComponent = (<AsComponent extends React.ElementType = CardTitleDefaultElement>(
  props: CardTitleProps<AsComponent>,
) => Polymorphic.ReactReturn) &
  Polymorphic.ReactNamed;

export const CardTitle: CardTitleComponent = forwardRef<
  React.ReactElement<CardTitleBaseProps>,
  CardTitleBaseProps
>(
  <AsComponent extends React.ElementType>(
    { as, font = 'headline', ...props }: CardTitleProps<AsComponent>,
    ref?: Polymorphic.Ref<AsComponent>,
  ) => {
    const Component = (as ?? cardTitleDefaultElement) satisfies React.ElementType;
    return <Text ref={ref} as={Component} font={font} {...props} />;
  },
);

CardTitle.displayName = 'CardTitle';
