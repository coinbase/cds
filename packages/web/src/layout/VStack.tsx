import React, { forwardRef } from 'react';

import type { Polymorphic } from '../core/polymorphism';

import { Box, type BoxBaseProps } from './Box';

export const vStackDefaultElement = 'div';

export type VStackDefaultElement = typeof vStackDefaultElement;

export type VStackBaseProps = BoxBaseProps;

export type VStackProps<AsComponent extends React.ElementType> = Polymorphic.Props<
  AsComponent,
  VStackBaseProps
>;

type VStackComponent = (<AsComponent extends React.ElementType = VStackDefaultElement>(
  props: VStackProps<AsComponent>,
) => Polymorphic.ReactReturn) &
  Polymorphic.ReactNamed;

export const VStack: VStackComponent = forwardRef<
  React.ReactElement<VStackBaseProps>,
  VStackBaseProps
>(
  <AsComponent extends React.ElementType>(
    { as, flexDirection = 'column', ...props }: VStackProps<AsComponent>,
    ref?: Polymorphic.Ref<AsComponent>,
  ) => {
    const Component = (as ?? vStackDefaultElement) satisfies React.ElementType;

    return <Box ref={ref} as={Component} flexDirection={flexDirection} {...props} />;
  },
);

VStack.displayName = 'VStack';
