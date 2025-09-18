import React, { forwardRef } from 'react';

import type { Polymorphic } from '../core/polymorphism';

import { Text, type TextBaseProps } from './Text';

export const textTitle4DefaultElement = 'span';

export type TextTitle4DefaultElement = typeof textTitle4DefaultElement;

export type TextTitle4BaseProps = TextBaseProps;

export type TextTitle4Props<AsComponent extends React.ElementType> = Polymorphic.Props<
  AsComponent,
  TextTitle4BaseProps
>;

type TextTitle4Component = (<AsComponent extends React.ElementType = TextTitle4DefaultElement>(
  props: TextTitle4Props<AsComponent>,
) => Polymorphic.ReactReturn) &
  Polymorphic.ReactNamed;

export const TextTitle4: TextTitle4Component = forwardRef<
  React.ReactElement<TextTitle4BaseProps>,
  TextTitle4BaseProps
>(
  <AsComponent extends React.ElementType>(
    { as, font = 'title4', ...props }: TextTitle4Props<AsComponent>,
    ref?: Polymorphic.Ref<AsComponent>,
  ) => {
    const Component = (as ?? textTitle4DefaultElement) satisfies React.ElementType;
    return <Text ref={ref} as={Component} font={font} {...props} />;
  },
);

TextTitle4.displayName = 'TextTitle4';
