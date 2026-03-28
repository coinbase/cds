import React, { forwardRef, memo, useMemo } from 'react';

import type { Polymorphic } from '../core/polymorphism';

import { Box, type BoxBaseProps } from './Box';

type GridColumnSpan = number | -1;

export const gridColumnDefaultElement = 'div';

export type GridColumnDefaultElement = typeof gridColumnDefaultElement;

export type GridColumnBaseProps = Polymorphic.ExtendableProps<
  BoxBaseProps,
  {
    /**
     * Number of grid lines you want the GridColumn to span
     * @link https://www.w3.org/TR/css-grid-1/#grid-line-concept
     * You should also provide a `colStart`, otherwise it will default to 'auto' placement
     * @link https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column
     * @note you cannot use `colSpan` with the `gridColumn` shorthand prop
     */
    colSpan?: number;
    /**
     * @default 'auto' (automatically placed with a span of 1)
     * @description Grid columns are 1 indexed
     * @link https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column-start
     * @note you cannot use `colStart` with the `gridColumn` shorthand prop
     */
    colStart?: number | 'auto';
    /**
     * @default 'auto' (span 1, eg: the next grid line over from colStart)
     * @description Grid columns are 1 indexed
     * That means the end of the row will be the number of columns + 1
     * eg: you have a 3 column grid and you want a GridColumn to span the entire row
     * you could use colStart: 1 and colEnd: 4
     * or alternatively, colStart: 1 and colEnd: -1 which will span all columns in a row
     * @link https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column-end
     * @note you cannot use `colEnd` with the `gridColumn` shorthand prop
     */
    colEnd?: number | -1 | 'auto';
    /**
     * Specify the GridColumn's size and location
     * Shorthand for colStart and colEnd which specify which grid lines the GridColumn will span
     * @link https://www.w3.org/TR/css-grid-1/#grid-line-concept
     * eg: you have a 3 column grid and you want a GridColumn to span the entire row
     * you could use gridColumn: 1 / 4
     * or gridColumn: 1 / span 3
     * or gridColumn: 1 / -1 where -1 is always the last grid line in the row
     * @link https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column
     * @note you cannot use `gridColumn` with `colSpan`, `colStart`, or `colEnd`
     */
    gridColumn?: `${number} / ${GridColumnSpan}` | `${number} / span ${GridColumnSpan}`;
  }
>;

export type GridColumnProps<AsComponent extends React.ElementType> = Polymorphic.Props<
  AsComponent,
  GridColumnBaseProps
>;

type GridColumnComponent = (<AsComponent extends React.ElementType = GridColumnDefaultElement>(
  props: GridColumnProps<AsComponent>,
) => Polymorphic.ReactReturn) &
  Polymorphic.ReactNamed;

export const GridColumn: GridColumnComponent = memo(
  forwardRef<React.ReactElement<GridColumnBaseProps>, GridColumnBaseProps>(
    <AsComponent extends React.ElementType>(
      {
        as,
        gridColumn,
        colSpan,
        colStart = 'auto',
        colEnd = 'auto',
        ...props
      }: GridColumnProps<AsComponent>,
      forwardedRef: Polymorphic.Ref<AsComponent>,
    ) => {
      const Component = (as ?? gridColumnDefaultElement) satisfies React.ElementType;
      const gridColumnValue = useMemo(
        () => gridColumn ?? (colSpan ? `${colStart} / span ${colSpan}` : undefined),
        [colSpan, colStart, gridColumn],
      );

      return (
        <Box
          ref={forwardedRef}
          as={Component}
          gridColumn={gridColumnValue}
          gridColumnEnd={colEnd}
          gridColumnStart={colStart}
          {...props}
        />
      );
    },
  ),
);

GridColumn.displayName = 'GridColumn';
