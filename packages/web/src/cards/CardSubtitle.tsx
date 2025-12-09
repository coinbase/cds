import React, { forwardRef } from 'react';

import type { Polymorphic } from '../core/polymorphism';
import { Text, type TextBaseProps } from '../typography/Text';

export const cardSubtitleDefaultElement = 'p';

export type CardSubtitleDefaultElement = typeof cardSubtitleDefaultElement;

export type CardSubtitleBaseProps = TextBaseProps;

export type CardSubtitleProps<AsComponent extends React.ElementType> = Polymorphic.Props<
  AsComponent,
  CardSubtitleBaseProps
>;

type CardSubtitleComponent = (<AsComponent extends React.ElementType = CardSubtitleDefaultElement>(
  props: CardSubtitleProps<AsComponent>,
) => Polymorphic.ReactReturn) &
  Polymorphic.ReactNamed;

export const CardSubtitle: CardSubtitleComponent = forwardRef<
  React.ReactElement<CardSubtitleBaseProps>,
  CardSubtitleBaseProps
>(
  <AsComponent extends React.ElementType>(
    { as, font = 'label2', color = 'fgMuted', ...props }: CardSubtitleProps<AsComponent>,
    ref?: Polymorphic.Ref<AsComponent>,
  ) => {
    const Component = (as ?? cardSubtitleDefaultElement) satisfies React.ElementType;
    return <Text ref={ref} as={Component} color={color} font={font} {...props} />;
  },
);

CardSubtitle.displayName = 'CardSubtitle';
