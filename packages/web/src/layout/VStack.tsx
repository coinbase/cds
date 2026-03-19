import React, { forwardRef } from 'react';

import type { Polymorphic } from '../core/polymorphism';
import { useComponentConfig } from '../hooks/useComponentConfig';

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
    _props: VStackProps<AsComponent>,
    ref?: Polymorphic.Ref<AsComponent>,
  ) => {
    const mergedProps = useComponentConfig('VStack', _props);
    const { as, flexDirection = 'column', ...props } = mergedProps;
    const Component = (as ?? vStackDefaultElement) satisfies React.ElementType;

    return <Box ref={ref} as={Component} flexDirection={flexDirection} {...props} />;
  },
);

VStack.displayName = 'VStack';
