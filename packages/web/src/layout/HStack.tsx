import React, { forwardRef } from 'react';

import type { Polymorphic } from '../core/polymorphism';
import { useComponentConfig } from '../hooks/useComponentConfig';

import { Box, type BoxBaseProps } from './Box';

export const hStackDefaultElement = 'div';

export type HStackDefaultElement = typeof hStackDefaultElement;

export type HStackBaseProps = BoxBaseProps;

export type HStackProps<AsComponent extends React.ElementType> = Polymorphic.Props<
  AsComponent,
  HStackBaseProps
>;

type HStackComponent = (<AsComponent extends React.ElementType = HStackDefaultElement>(
  props: HStackProps<AsComponent>,
) => Polymorphic.ReactReturn) &
  Polymorphic.ReactNamed;

export const HStack: HStackComponent = forwardRef<
  React.ReactElement<HStackBaseProps>,
  HStackBaseProps
>(
  <AsComponent extends React.ElementType>(
    _props: HStackProps<AsComponent>,
    ref?: Polymorphic.Ref<AsComponent>,
  ) => {
    const mergedProps = useComponentConfig('HStack', _props);
    const { as, flexDirection = 'row', ...props } = mergedProps;
    const Component = (as ?? hStackDefaultElement) satisfies React.ElementType;

    return <Box ref={ref} as={Component} flexDirection={flexDirection} {...props} />;
  },
);

HStack.displayName = 'HStack';
