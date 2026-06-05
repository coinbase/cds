import React, { forwardRef } from 'react';

import type { Polymorphic } from '../core/polymorphism';

import { Text, type TextBaseProps } from './Text';

export const textLabel1DefaultElement = 'span';

export type TextLabel1DefaultElement = typeof textLabel1DefaultElement;

/**
 * @deprecated Use `Text` with `font="label1"` instead. This will be removed in a future major release.
 * @deprecationExpectedRemoval v10
 */
export type TextLabel1BaseProps = TextBaseProps;

/**
 * @deprecated Use `Text` with `font="label1"` instead. This will be removed in a future major release.
 * @deprecationExpectedRemoval v10
 */
export type TextLabel1Props<AsComponent extends React.ElementType> = Polymorphic.Props<
  AsComponent,
  TextLabel1BaseProps
>;

type TextLabel1Component = (<AsComponent extends React.ElementType = TextLabel1DefaultElement>(
  props: TextLabel1Props<AsComponent>,
) => Polymorphic.ReactReturn) &
  Polymorphic.ReactNamed;

/**
 * @deprecated Use `Text` with `font="label1"` instead. This will be removed in a future major release.
 * @deprecationExpectedRemoval v10
 */
export const TextLabel1: TextLabel1Component = forwardRef<
  React.ReactElement<TextLabel1BaseProps>,
  TextLabel1BaseProps
>(
  <AsComponent extends React.ElementType>(
    { as, font = 'label1', ...props }: TextLabel1Props<AsComponent>,
    ref?: Polymorphic.Ref<AsComponent>,
  ) => {
    const Component = (as ?? textLabel1DefaultElement) satisfies React.ElementType;
    return <Text ref={ref} as={Component} font={font} {...props} />;
  },
);

TextLabel1.displayName = 'TextLabel1';
