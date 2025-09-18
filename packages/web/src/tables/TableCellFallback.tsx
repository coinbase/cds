import React, { memo } from 'react';
import type { FallbackRectWidthProps } from '@cbhq/cds-common/types/FallbackBaseProps';
import type { SharedProps } from '@cbhq/cds-common/types/SharedProps';
import { getRectWidthVariant } from '@cbhq/cds-common/utils/getRectWidthVariant';
import { css } from '@linaria/core';

import { Cell } from '../cells/Cell';
import type { CellMediaType } from '../cells/CellMedia';
import { MediaFallback } from '../cells/MediaFallback';
import { Fallback } from '../layout';

import { useTableCellSpacing, useTableCellTag, useTableContext } from './hooks/useTable';
import type { TableCellProps } from './TableCell';

export type TableCellFallbackProps = {
  /** Display title shimmer. */
  title?: boolean;
  /** Display subtitle shimmer. */
  subtitle?: boolean;
  /** Display start shimmer with a shape according to type. */
  start?: CellMediaType;
  /** Display end shimmer with a shape according to type. */
  end?: CellMediaType;
} & SharedProps &
  FallbackRectWidthProps &
  Pick<TableCellProps, 'width' | 'outerSpacing' | 'innerSpacing' | 'as'>;

const tableCellCss = css`
  padding: 0;
  margin: 0;
  vertical-align: middle;
  border: none;
`;

export const TableCellFallback = memo(
  ({
    title,
    start,
    end,
    subtitle,
    testID,
    as,
    outerSpacing,
    innerSpacing,
    disableRandomRectWidth,
    rectWidthVariant,
    ...props
  }: TableCellFallbackProps) => {
    const TableCellComponent = useTableCellTag(as);
    // Depending on compact value
    const { compact } = useTableContext();
    const textPaddingTop = !compact && title ? 1 : 0.5;
    const cellGap = compact ? 0.5 : 1;

    // Depends on tableSpacing value
    const tableCellSpacing = useTableCellSpacing();
    const cellOuterSpacing = outerSpacing ?? tableCellSpacing?.outer;
    const cellInnerSpacing = innerSpacing ?? tableCellSpacing?.inner;

    return (
      <TableCellComponent className={tableCellCss} data-testid={testID} {...props}>
        <Cell
          accessory={end && <MediaFallback testID="table-cell-fallback-accessory" type={end} />}
          gap={cellGap}
          innerSpacing={cellInnerSpacing}
          media={start && <MediaFallback testID="table-cell-fallback-media" type={start} />}
          outerSpacing={cellOuterSpacing}
        >
          {title && (
            <Fallback
              percentage
              disableRandomRectWidth={disableRandomRectWidth}
              height={24}
              rectWidthVariant={getRectWidthVariant(rectWidthVariant, 0)}
              testID="table-cell-fallback-title"
              width={45}
            />
          )}
          {subtitle && (
            <Fallback
              percentage
              disableRandomRectWidth={disableRandomRectWidth}
              height={16}
              paddingTop={textPaddingTop}
              rectWidthVariant={getRectWidthVariant(rectWidthVariant, 1)}
              testID="table-cell-fallback-subtitle"
              width={35}
            />
          )}
        </Cell>
      </TableCellComponent>
    );
  },
);

TableCellFallback.displayName = 'TableCellFallback';
