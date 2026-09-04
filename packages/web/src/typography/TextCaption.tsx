import React, { forwardRef } from 'react';

import type { Polymorphic } from '../core/polymorphism';

import { Text, type TextBaseProps } from './Text';

export const textCaptionDefaultElement = 'span';

export type TextCaptionDefaultElement = typeof textCaptionDefaultElement;

/**
 * @deprecated Use `Text` with `font="caption"` instead. This will be removed in a future major release.
 * @deprecationExpectedRemoval v10
 */
export type TextCaptionBaseProps = TextBaseProps;

/**
 * @deprecated Use `Text` with `font="caption"` instead. This will be removed in a future major release.
 * @deprecationExpectedRemoval v10
 */
export type TextCaptionProps<AsComponent extends React.ElementType> = Polymorphic.Props<
  AsComponent,
  TextCaptionBaseProps
>;

type TextCaptionComponent = (<AsComponent extends React.ElementType = TextCaptionDefaultElement>(
  props: TextCaptionProps<AsComponent>,
) => Polymorphic.ReactReturn) &
  Polymorphic.ReactNamed;

/**
 * @deprecated Use `Text` with `font="caption"` instead. This will be removed in a future major release.
 * @deprecationExpectedRemoval v10
 */
export const TextCaption: TextCaptionComponent = forwardRef<
  React.ReactElement<TextCaptionBaseProps>,
  TextCaptionBaseProps
>(
  <AsComponent extends React.ElementType>(
    { as, font = 'caption', ...props }: TextCaptionProps<AsComponent>,
    ref?: Polymorphic.Ref<AsComponent>,
  ) => {
    const Component = (as ?? textCaptionDefaultElement) satisfies React.ElementType;
    return <Text ref={ref} as={Component} font={font} {...props} />;
  },
);

TextCaption.displayName = 'TextCaption';
