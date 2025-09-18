import React, { forwardRef } from 'react';

import type { Polymorphic } from '../core/polymorphism';

import { Text, type TextBaseProps } from './Text';

export const textInheritDefaultElement = 'span';

export type TextInheritDefaultElement = typeof textInheritDefaultElement;

export type TextInheritBaseProps = TextBaseProps;

export type TextInheritProps<AsComponent extends React.ElementType> = Polymorphic.Props<
  AsComponent,
  TextInheritBaseProps
>;

type TextInheritComponent = (<AsComponent extends React.ElementType = TextInheritDefaultElement>(
  props: TextInheritProps<AsComponent>,
) => Polymorphic.ReactReturn) &
  Polymorphic.ReactNamed;

export const TextInherited: TextInheritComponent = forwardRef<
  React.ReactElement<TextInheritBaseProps>,
  TextInheritBaseProps
>(
  <AsComponent extends React.ElementType>(
    { as, font = 'inherit', ...props }: TextInheritProps<AsComponent>,
    ref?: Polymorphic.Ref<AsComponent>,
  ) => {
    const Component = (as ?? textInheritDefaultElement) satisfies React.ElementType;
    return <Text ref={ref} as={Component} font={font} {...props} />;
  },
);

TextInherited.displayName = 'TextInherited';
