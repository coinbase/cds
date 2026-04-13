import React, { forwardRef, memo, useMemo } from 'react';
import type { DimensionValue } from '@coinbase/cds-common/types/DimensionStyles';
import type { SharedAccessibilityProps } from '@coinbase/cds-common/types/SharedAccessibilityProps';
import type { SharedProps } from '@coinbase/cds-common/types/SharedProps';
import { css, type LinariaClassName } from '@linaria/core';

import type { CellSpacing } from '../cells/Cell';
import { cx } from '../cx';
import { useComponentConfig } from '../hooks/useComponentConfig';

import { TableContext } from './context/TableContext';

/**
 * The table variant will be provided via context and available
 * to any internal Table component (TableBody, TableCell, etc)
 * @default undefined
 */
export type TableVariant = 'default' | 'graph' | 'ruled';
export type TableLayout = 'auto' | 'fixed';
export type TableCellSpacing = {
  inner?: CellSpacing;
  outer?: CellSpacing;
};

export type TableBaseProps = SharedProps &
  Pick<SharedAccessibilityProps, 'accessibilityLabelledBy' | 'accessibilityLabel'> & {
    /**
     * The variant prop allows clients to use a
     * CDS approved style for their Table.
     * @default undefined
     */
    variant?: TableVariant;
    /**
     * Children are required, and should always include a TableBody.
     * TableHeader and TableFooter are both optional, and will magically
     * flow into the correct place in the table (top/bottom)
     */
    children: React.ReactNode;
    /**
     * When set, a border will be applied around the entire table
     */
    bordered?: boolean;
    /**
     * Use tableLayout='fixed' if you need full control over cell width
     * @default 'auto'
     */
    tableLayout?: TableLayout;
    /** Provide custom cell spacing for all child TableCells */
    cellSpacing?: TableCellSpacing;
    /** Use compact cell spacing. If set, cellSpacing will override these defaults */
    compact?: boolean;
    /** Set a fixed height. */
    height?: DimensionValue;
    /** Set a maximum height. */
    maxHeight?: DimensionValue;
  };

export type TableProps = TableBaseProps &
  Omit<React.HTMLAttributes<HTMLTableElement>, 'dangerouslySetInnerHTML'> & {
    /**
     * @danger This is an escape hatch. It is not intended to be used normally.
     */
    className?: string;
  };

const tableCss = css`
  display: table;
  width: 100%;
  margin: 0;
  padding: 0;
  border-collapse: collapse;
  border: none;

  thead,
  tbody,
  tfoot {
    padding: 0;
    margin: 0;
    border: none;
  }
`;

const tableFixedCss = css`
  table-layout: fixed;
`;

const tableContainerCss = css`
  overflow: auto;
  width: 100%;
  height: var(--table-height);
  max-height: var(--table-maxHeight);
  table {
    background-color: var(--color-bg);
    color: var(--color-fg);

    /* make sure table is as least as wide as its contents */
    min-width: fit-content;
  }
`;

const tableContainerBorderCss = css`
  border: var(--borderWidth-100) solid var(--color-bgLine);
  border-radius: var(--borderRadius-200);
`;

const tableVariantDefaultCss = css``;

const tableVariantGraphCss = css`
  table {
    & > caption {
      border-bottom: var(--borderWidth-100) solid var(--color-bgLine);
    }

    & > tfoot {
      border-top: var(--borderWidth-100) solid var(--color-bgLine);
    }

    & > tr > td,
    & > tbody > tr > td,
    & > tbody > tr > th,
    & > thead > .table-row,
    & > tfoot > tr > td {
      border-bottom: var(--borderWidth-100) solid var(--color-bgLine);
      border-right: var(--borderWidth-100) solid var(--color-bgLine);
    }

    & > tbody > tr > th,
    & > thead > tr > th {
      box-shadow: inset 0px -1px 0px 0px var(--color-bgLine);
      border-right: var(--borderWidth-100) solid var(--color-bgLine);
    }

    & > tbody > tr:last-child > th,
    & > tbody > tr:last-child > td,
    & > tfoot > tr:last-child > td {
      border-bottom: none;
    }

    & > thead > tr > th:last-child,
    & > tbody > tr > th:last-child,
    & > tbody > tr > td:last-child,
    & > thead > .table-row:last-child,
    & > tfoot > tr > td:last-child {
      border-right: none;
    }
  }
`;

const tableVariantRuledCss = css`
  table {
    & > caption {
      border-bottom: var(--borderWidth-100) solid var(--color-bgLine);
    }

    & > tfoot {
      border-top: var(--borderWidth-100) solid var(--color-bgLine);
    }

    & > tr > td,
    & > tbody > tr > th,
    & > tbody > tr > td,
    & > tfoot > tr > td {
      border-bottom: var(--borderWidth-100) solid var(--color-bgLine);
    }

    & > thead > tr > th {
      box-shadow: inset 0px -1px 0px 0px var(--color-bgLine);
    }

    & > tbody > tr:last-child > th,
    & > tbody > tr:last-child > td,
    & > tfoot > tr:last-child > td {
      border: none;
    }
  }
`;

const tableVariantStyles: Record<TableVariant, LinariaClassName> = {
  default: tableVariantDefaultCss,
  graph: tableVariantGraphCss,
  ruled: tableVariantRuledCss,
};

const TableWithRef = forwardRef<HTMLTableElement, TableProps>(function TableWithRef(
  _props: TableProps,
  ref,
) {
  const mergedProps = useComponentConfig('Table', _props);
  const {
    children,
    variant = 'default',
    bordered,
    cellSpacing,
    testID,
    tableLayout,
    compact,
    maxHeight,
    height,
    accessibilityLabelledBy,
    accessibilityLabel,
    className,
    ...props
  } = mergedProps;
  const api = useMemo(() => ({ variant, cellSpacing, compact }), [variant, cellSpacing, compact]);
  const fixed = tableLayout === 'fixed';
  const containerStyles = useMemo(
    () =>
      ({
        '--table-height': `${height}px`,
        '--table-maxHeight': `${maxHeight}px`,
      }) as React.CSSProperties,
    [height, maxHeight],
  );

  return (
    <TableContext.Provider value={api}>
      <div
        className={cx(
          tableContainerCss,
          bordered && tableContainerBorderCss,
          variant && tableVariantStyles[variant],
        )}
        style={containerStyles}
      >
        <table
          ref={ref}
          aria-label={accessibilityLabel}
          aria-labelledby={accessibilityLabelledBy}
          className={cx(tableCss, fixed && tableFixedCss, className)}
          data-testid={testID}
          {...props}
        >
          {children}
        </table>
      </div>
    </TableContext.Provider>
  );
});

export const Table = memo(TableWithRef);

Table.displayName = 'Table';
