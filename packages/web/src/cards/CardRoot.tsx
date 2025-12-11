import React, { forwardRef, memo } from 'react';

import type { Polymorphic } from '../core/polymorphism';
import { HStack } from '../layout/HStack';
import { Pressable, type PressableBaseProps } from '../system/Pressable';

export type CardRootBaseProps = Polymorphic.ExtendableProps<
  PressableBaseProps,
  {
    children?: React.ReactNode;
    /** If true, the CardRoot will be rendered as a Pressable component. */
    renderAsPressable?: boolean;
  }
>;

export type CardRootProps<AsComponent extends React.ElementType = 'article'> = Polymorphic.Props<
  AsComponent,
  CardRootBaseProps
>;

type CardRootComponent = (<AsComponent extends React.ElementType = 'article'>(
  props: Polymorphic.Props<AsComponent, CardRootBaseProps>,
) => Polymorphic.ReactReturn) &
  Polymorphic.ReactNamed;

export const CardRoot: CardRootComponent = memo(
  forwardRef<React.ReactElement<CardRootBaseProps>, CardRootBaseProps>(
    <AsComponent extends React.ElementType>(
      { renderAsPressable, children, ...props }: CardRootProps<AsComponent>,
      ref?: Polymorphic.Ref<AsComponent>,
    ) => {
      if (renderAsPressable) {
        const { as, ...pressableRestProps } = props;
        return (
          <Pressable ref={ref} as={as ?? 'button'} {...(pressableRestProps as any)}>
            {children}
          </Pressable>
        );
      } else {
        const { as, ...hstackRestProps } = props;
        return (
          <HStack ref={ref} as={as ?? 'article'} {...(hstackRestProps as any)}>
            {children}
          </HStack>
        );
      }
    },
  ),
);

CardRoot.displayName = 'CardRoot';
