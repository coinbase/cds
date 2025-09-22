import React, { memo, useMemo, useRef } from 'react';
import type { ThemeVars } from '@cbhq/cds-common/core/theme';
import type { SharedProps } from '@cbhq/cds-common/types/SharedProps';
import { css } from '@linaria/core';

import { cx } from '../cx';
import { useIsBrowser } from '../hooks/useIsBrowser';

import { useTableSectionTag } from './hooks/useTable';
import { useTableRowListener } from './hooks/useTableRowListener';
import { TableCell, type TableCellProps } from './TableCell';

export type TableRowRef = React.MutableRefObject<HTMLTableRowElement | null>;

export type TableRowProps = SharedProps &
  Omit<React.HTMLAttributes<HTMLTableRowElement>, 'dangerouslySetInnerHTML'> & {
    /**
     * Children are required, and should always include TableCell | TableCell[].
     */
    children: NonNullable<React.ReactNode>;
    /**
     * Should this row span the entire width of the table?
     * Useful for treating a row as a Control Strip.
     * @default undefined
     */
    fullWidth?: boolean;
    /**
     * Set the background color for this entire row
     * to some CDS Palette background color name
     * @default undefined
     */
    backgroundColor?: ThemeVars.Color;
    /**
     * Set the text color for this entire row to some
     * CDS Palette foreground color name
     * @default undefined
     */
    color?: ThemeVars.Color;
    /**
     * By default, we set a hover background color of
     * palette.backgroundAlternate on hover for the row.
     * Use this prop to disable this behavior
     * @default false
     */
    disableHoverIndicator?: boolean;
    /**
     * Callback to fire when pressed
     * @default noop
     */
    onClick?: React.MouseEventHandler<Element> | (() => void);
    /**
     * The spacing to use on the parent wrapper of Cell.
     * Will only take effect when fullWidth is set to true
     */
    outerSpacing?: TableCellProps['outerSpacing'];
    /**
     * The spacing to use on the inner content of Cell.
     * Will only take effect when fullWidth is set to true
     */
    innerSpacing?: TableCellProps['innerSpacing'];
  };

const tableRowCss = css`
  /* Let us be specific */
  &:nth-child(1n) {
    background-color: var(--color-bg);
    padding: 0;
    border: 0;
  }

  /* Ensure sticky headers display properly */
  > th {
    background-color: inherit;
  }
`;

const tableRowHoverCss = css`
  /* Lest we be overridden */
  &:nth-child(1n) {
    &:focus,
    &:hover {
      background-color: rgba(var(--gray5), 0.35);
    }
  }
`;

export const TableRow = memo(
  ({
    fullWidth,
    disableHoverIndicator,
    children,
    backgroundColor,
    color,
    testID,
    onClick,
    outerSpacing,
    innerSpacing,
    ...props
  }: TableRowProps) => {
    const isBrowser = useIsBrowser();
    const tableSectionType = useTableSectionTag();
    const isCellInBody = tableSectionType === 'tbody';
    const shouldIndicateHover = isCellInBody && !disableHoverIndicator;

    // Listen for keyboard events
    const rowRef: TableRowRef = useRef(null);
    useTableRowListener(rowRef, onClick as () => void);

    const inlineStyles = useMemo(() => {
      return {
        color: color && `var(--color-${color})`,
        backgroundColor: backgroundColor && `var(--color-${backgroundColor})`,
        cursor: onClick ? 'pointer' : 'default',
      };
    }, [backgroundColor, color, onClick]);

    // @link https://nextjs.org/docs/messages/react-hydration-error
    const innerChildren = useMemo(() => (isBrowser ? children : ''), [children, isBrowser]);

    return (
      <tr
        ref={rowRef} // click/event support
        className={cx(tableRowCss, shouldIndicateHover && tableRowHoverCss)}
        data-testid={testID}
        onClick={onClick}
        style={inlineStyles}
        tabIndex={onClick && 0}
        {...props}
      >
        {fullWidth ? (
          <TableCell
            colSpan={1000}
            direction="horizontal"
            innerSpacing={innerSpacing}
            outerSpacing={outerSpacing}
          >
            {innerChildren}
          </TableCell>
        ) : (
          children
        )}
      </tr>
    );
  },
);

TableRow.displayName = 'TableRow';
