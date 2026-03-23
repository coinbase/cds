import React, { forwardRef } from 'react';

import type { Polymorphic } from '../core/polymorphism';

import { Pressable, type PressableBaseProps } from './Pressable';

export const pressableOpacityDefaultElement = 'button';

export type PressableOpacityDefaultElement = typeof pressableOpacityDefaultElement;

/**
 * @deprecated Use `<Pressable background="transparent">` instead. This will be removed in a future major release.
 * @deprecationExpectedRemoval v9
 */
export type PressableOpacityBaseProps = Omit<
  PressableBaseProps,
  'background' | 'borderColor' | 'borderRadius' | 'borderWidth' | 'transparentWhileInactive'
>;

/**
 * @deprecated Use `<Pressable background="transparent">` instead. This will be removed in a future major release.
 * @deprecationExpectedRemoval v8
 */
export type PressableOpacityProps<AsComponent extends React.ElementType> = Polymorphic.Props<
  AsComponent,
  PressableOpacityBaseProps
>;

type PressableOpacityComponent = (<
  AsComponent extends React.ElementType = PressableOpacityDefaultElement,
>(
  props: PressableOpacityProps<AsComponent>,
) => Polymorphic.ReactReturn) &
  Polymorphic.ReactNamed;

/**
 * @deprecated Use `<Pressable background="transparent">` instead. This will be removed in a future major release.
 * @deprecationExpectedRemoval v8
 */
export const PressableOpacity: PressableOpacityComponent = forwardRef<
  React.ReactElement<PressableOpacityBaseProps>,
  PressableOpacityBaseProps
>(
  <AsComponent extends React.ElementType>(
    { children, as, ...props }: PressableOpacityProps<AsComponent>,
    ref: Polymorphic.Ref<AsComponent>,
  ) => {
    const Component = (as ?? pressableOpacityDefaultElement) satisfies React.ElementType;
    return (
      <Pressable ref={ref} as={Component} {...props} background="transparent">
        {children}
      </Pressable>
    );
  },
);
