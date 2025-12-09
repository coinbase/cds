import React, { forwardRef, memo } from 'react';
import type { SharedAccessibilityProps, SharedProps } from '@coinbase/cds-common/types';

import type { Polymorphic } from '../core/polymorphism';
import { HStack } from '../layout/HStack';
import { Pressable, type PressableBaseProps } from '../system/Pressable';

export type CardRootBaseProps = Polymorphic.ExtendableProps<
  PressableBaseProps,
  {
    children?: React.ReactNode;
    actionable?: boolean;
  }
>;

export const nonActionableCardRootDefaultElement = 'article';
export const actionableCardRootDefaultElement = 'button';

export type NonActionableCardRootDefaultElement = typeof nonActionableCardRootDefaultElement;
export type ActionableCardRootDefaultElement = typeof actionableCardRootDefaultElement;

export type CardRootProps<
  AsComponent extends React.ElementType = NonActionableCardRootDefaultElement,
> = Polymorphic.Props<AsComponent, CardRootBaseProps>;

type CardRootComponent = (<
  AsComponent extends React.ElementType = NonActionableCardRootDefaultElement,
>(
  props: Polymorphic.Props<AsComponent, CardRootBaseProps>,
) => Polymorphic.ReactReturn) &
  Polymorphic.ReactNamed;

export const CardRoot: CardRootComponent = memo(
  forwardRef<React.ReactElement<CardRootBaseProps>, CardRootBaseProps>(
    <AsComponent extends React.ElementType>(
      { actionable, children, ...props }: CardRootProps<AsComponent>,
      ref?: Polymorphic.Ref<AsComponent>,
    ) => {
      if (actionable) {
        const { as, ...actionableRestProps } = props;
        return (
          <Pressable ref={ref} as={as ?? 'button'} {...(actionableRestProps as any)}>
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
