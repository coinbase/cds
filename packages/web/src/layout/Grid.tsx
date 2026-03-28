import React, { forwardRef, useMemo } from 'react';
import { type DimensionValue } from '@coinbase/cds-common/types/DimensionStyles';

import type { Polymorphic } from '../core/polymorphism';

import { Box, type BoxBaseProps } from './Box';

export const gridDefaultElement = 'div';

export type GridDefaultElement = typeof gridDefaultElement;

export type GridBaseProps = Polymorphic.ExtendableProps<
  BoxBaseProps,
  {
    rows?: number;
    /**
     * Explicitly declare the number of columns per row
     * columns will divide up the available space within the parent equally
     * @note `columns` cannot be used in conjunction with `templateColumns` or `columnMin` or `columnMax`
     */
    columns?: number;
    /**
     * Explicitly declare the width of each column per row,
     * @example '100px 20% 1fr 1rem max-content'
     * @link https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns
     * @note `templateColumns` cannot be used in conjunction with `columns` or `columnMin` or `columnMax`
     */
    templateColumns?: string;
    /**
     * if neither `columns` or `templateColumns` are declared, Grid will implicitly lay out tracks based on available space
     * You will need to provide a minimum width for each column via `columnMin`
     * @link https://developer.mozilla.org/en-US/docs/Web/CSS/minmax
     * @link https://www.w3.org/TR/css-grid-1/#grid-line-concept
     * Grid can take a minimum column dimension that will clamp it to be no less than the value
     * @note `columnMin` cannot be used in conjunction with `columns` or `templateColumns`
     */
    columnMin?: DimensionValue;
    /**
     * if neither `columns` or `templateColumns` are declared, Grid will implicitly lay out grid lines based on available space
     * You can cap the maximum width of each column by passing `columnMax`
     * @link https://developer.mozilla.org/en-US/docs/Web/CSS/minmax
     * @link https://www.w3.org/TR/css-grid-1/#grid-line-concept
     * Grid can take a maximum column dimension that will clamp it to be no greater than the value
     * @default 1fr
     * @note `columnMax` cannot be used in conjunction with `columns` or `templateColumns`
     */
    columnMax?: DimensionValue;
  }
>;

export type GridProps<AsComponent extends React.ElementType> = Polymorphic.Props<
  AsComponent,
  GridBaseProps
>;

type GridComponent = (<AsComponent extends React.ElementType = GridDefaultElement>(
  props: GridProps<AsComponent>,
) => Polymorphic.ReactReturn) &
  Polymorphic.ReactNamed;

export const Grid: GridComponent = forwardRef<React.ReactElement<GridBaseProps>, GridBaseProps>(
  <AsComponent extends React.ElementType>(
    {
      as,
      rows,
      columns,
      columnMin,
      columnMax = '1fr',
      display = 'grid',
      templateColumns,
      ...props
    }: GridProps<AsComponent>,
    ref?: Polymorphic.Ref<AsComponent>,
  ) => {
    const Component = (as ?? gridDefaultElement) satisfies React.ElementType;
    const isImplicit = !columns && !templateColumns && !!columnMin;

    const templateColumnsValue = useMemo(() => {
      if (isImplicit) {
        return `repeat(auto-fill, minmax(${columnMin}, ${columnMax}))`;
      }
      return (
        templateColumns ??
        (typeof columns !== 'undefined' ? `repeat(${columns}, minmax(0, 1fr))` : undefined)
      );
    }, [columnMax, columnMin, columns, isImplicit, templateColumns]);

    return (
      <Box
        ref={ref}
        as={Component}
        display={display}
        gridTemplateColumns={templateColumnsValue}
        gridTemplateRows={
          typeof rows !== 'undefined' ? `repeat(${rows},  minmax(0, 1fr))` : undefined
        }
        {...props}
      />
    );
  },
);

Grid.displayName = 'Grid';
