import React, { forwardRef } from 'react';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';

import type { Polymorphic } from '../core/polymorphism';

import { Box, type BoxBaseProps } from './Box';

export const spacerDefaultElement = 'span';

export type SpacerDefaultElement = typeof spacerDefaultElement;

export type SpacerBaseProps = Polymorphic.ExtendableProps<
  BoxBaseProps,
  {
    /** Space in the horizontal direction */
    horizontal?: ThemeVars.Space;
    /** Space in the vertical direction */
    vertical?: ThemeVars.Space;
    /** Max space in the horizontal direction */
    maxHorizontal?: ThemeVars.Space;
    /** Max space in the vertical direction */
    maxVertical?: ThemeVars.Space;
    /** Min space in the horizontal direction */
    minHorizontal?: ThemeVars.Space;
    /** Min space in the vertical direction */
    minVertical?: ThemeVars.Space;
  }
>;

export type SpacerProps<AsComponent extends React.ElementType> = Polymorphic.Props<
  AsComponent,
  SpacerBaseProps
>;

type SpacerComponent = (<AsComponent extends React.ElementType = SpacerDefaultElement>(
  props: SpacerProps<AsComponent>,
) => Polymorphic.ReactReturn) &
  Polymorphic.ReactNamed;

export const Spacer: SpacerComponent = forwardRef<
  React.ReactElement<SpacerBaseProps>,
  SpacerBaseProps
>(
  <AsComponent extends React.ElementType>(
    {
      as,
      flexGrow,
      flexShrink,
      flexBasis,
      horizontal,
      vertical,
      maxHorizontal,
      maxVertical,
      minHorizontal,
      minVertical,
      ...props
    }: SpacerProps<AsComponent>,
    ref?: Polymorphic.Ref<AsComponent>,
  ) => {
    const Component = (as ?? spacerDefaultElement) satisfies React.ElementType;
    const isFixedSize = horizontal !== undefined || vertical !== undefined;

    return (
      <Box
        ref={ref}
        aria-hidden="true"
        as={Component}
        flexBasis={flexBasis ?? (isFixedSize ? undefined : 1)}
        flexGrow={flexGrow ?? (isFixedSize ? 0 : 1)}
        flexShrink={flexShrink ?? (isFixedSize ? 0 : 1)}
        height={vertical && `calc(${vertical} * var(--space-1))`}
        maxHeight={maxVertical && `calc(${maxVertical} * var(--space-1))`}
        maxWidth={maxHorizontal && `calc(${maxHorizontal} * var(--space-1))`}
        minHeight={minVertical && `calc(${minVertical} * var(--space-1))`}
        minWidth={minHorizontal && `calc(${minHorizontal} * var(--space-1))`}
        role="presentation"
        width={horizontal && `calc(${horizontal} * var(--space-1))`}
        {...props}
      />
    );
  },
);

Spacer.displayName = 'Spacer';
