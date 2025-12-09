import React, { forwardRef } from 'react';

import type { Polymorphic } from '../core/polymorphism';
import { Text, type TextBaseProps } from '../typography/Text';

export const cardDescriptionDefaultElement = 'p';

export type CardDescriptionDefaultElement = typeof cardDescriptionDefaultElement;

export type CardDescriptionBaseProps = TextBaseProps;

export type CardDescriptionProps<AsComponent extends React.ElementType> = Polymorphic.Props<
  AsComponent,
  CardDescriptionBaseProps
>;

type CardDescriptionComponent = (<
  AsComponent extends React.ElementType = CardDescriptionDefaultElement,
>(
  props: CardDescriptionProps<AsComponent>,
) => Polymorphic.ReactReturn) &
  Polymorphic.ReactNamed;

export const CardDescription: CardDescriptionComponent = forwardRef<
  React.ReactElement<CardDescriptionBaseProps>,
  CardDescriptionBaseProps
>(
  <AsComponent extends React.ElementType>(
    { as, font = 'label2', color = 'fgMuted', ...props }: CardDescriptionProps<AsComponent>,
    ref?: Polymorphic.Ref<AsComponent>,
  ) => {
    const Component = (as ?? cardDescriptionDefaultElement) satisfies React.ElementType;
    return <Text ref={ref} as={Component} color={color} font={font} {...props} />;
  },
);

CardDescription.displayName = 'CardDescription';
