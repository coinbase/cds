import React, { forwardRef, memo } from 'react';

import type { Polymorphic } from '../core/polymorphism';
import { HStack, type HStackProps } from '../layout/HStack';
import { Pressable, type PressableBaseProps, type PressableProps } from '../system/Pressable';

export type CardRootBaseProps = Polymorphic.ExtendableProps<
  PressableBaseProps,
  {
    /** Content to render inside the card. */
    children?: React.ReactNode;
    /**
     * If true, the CardRoot will be rendered as a Pressable component.
     * When false, renders as an HStack for layout purposes.
     * @default true if `as` is 'button' or 'a', otherwise false
     */
    renderAsPressable?: boolean;
  }
>;

export type CardRootProps<AsComponent extends React.ElementType = 'div'> = Polymorphic.Props<
  AsComponent,
  CardRootBaseProps
>;

type CardRootComponent = (<AsComponent extends React.ElementType = 'div'>(
  props: Polymorphic.Props<AsComponent, CardRootBaseProps>,
) => Polymorphic.ReactReturn) &
  Polymorphic.ReactNamed;

/**
 * CardRoot is the foundational wrapper component for card layouts.
 *
 * By default, it renders as a `<div>` element using HStack for horizontal layout.
 * When `renderAsPressable` is true, it renders as a Pressable component (defaults to `<button>`).
 *
 * Supports polymorphism via the `as` prop to change the underlying HTML element.
 */
export const CardRoot: CardRootComponent = memo(
  forwardRef<React.ReactElement<CardRootBaseProps>, CardRootBaseProps>(
    <AsComponent extends React.ElementType>(
      {
        as,
        renderAsPressable = as === 'button' || as === 'a' ? true : false,
        children,
        ...props
      }: CardRootProps<AsComponent>,
      ref?: Polymorphic.Ref<AsComponent>,
    ) => {
      if (renderAsPressable) {
        return (
          <Pressable ref={ref} as={as} {...(props as PressableProps<AsComponent>)}>
            {children}
          </Pressable>
        );
      } else {
        return (
          <HStack ref={ref} as={as} {...(props as HStackProps<AsComponent>)}>
            {children}
          </HStack>
        );
      }
    },
  ),
);

CardRoot.displayName = 'CardRoot';
