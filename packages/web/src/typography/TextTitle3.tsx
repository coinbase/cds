import React, { forwardRef } from 'react';

import type { Polymorphic } from '../core/polymorphism';

import { Text, type TextBaseProps } from './Text';

export const textTitle3DefaultElement = 'span';

export type TextTitle3DefaultElement = typeof textTitle3DefaultElement;

/** @deprecated Use `Text` with `font="title3"` instead. This component will be removed in a future major release. */
export type TextTitle3BaseProps = TextBaseProps;

/** @deprecated Use `Text` with `font="title3"` instead. This component will be removed in a future major release. */
export type TextTitle3Props<AsComponent extends React.ElementType> = Polymorphic.Props<
  AsComponent,
  TextTitle3BaseProps
>;

type TextTitle3Component = (<AsComponent extends React.ElementType = TextTitle3DefaultElement>(
  props: TextTitle3Props<AsComponent>,
) => Polymorphic.ReactReturn) &
  Polymorphic.ReactNamed;

/** @deprecated Use `Text` with `font="title3"` instead. This component will be removed in a future major release. */
export const TextTitle3: TextTitle3Component = forwardRef<
  React.ReactElement<TextTitle3BaseProps>,
  TextTitle3BaseProps
>(
  <AsComponent extends React.ElementType>(
    { as, font = 'title3', ...props }: TextTitle3Props<AsComponent>,
    ref?: Polymorphic.Ref<AsComponent>,
  ) => {
    const Component = (as ?? textTitle3DefaultElement) satisfies React.ElementType;
    return <Text ref={ref} as={Component} font={font} {...props} />;
  },
);

TextTitle3.displayName = 'TextTitle3';
