import { memo } from 'react';
import type { FallbackRectWidthProps } from '@coinbase/cds-common/types/FallbackBaseProps';
import type { SharedAccessibilityProps } from '@coinbase/cds-common/types/SharedAccessibilityProps';
import type { SharedProps } from '@coinbase/cds-common/types/SharedProps';
import { getRectWidthVariant } from '@coinbase/cds-common/utils/getRectWidthVariant';
import { css } from '@linaria/core';

import { Cell } from '../cells/Cell';
import type { CellMediaType } from '../cells/CellMedia';
import { MediaFallback } from '../cells/MediaFallback';
import { useComponentConfig } from '../hooks/useComponentConfig';
import { Fallback } from '../layout';

import { useTableCellSpacing, useTableCellTag, useTableContext } from './hooks/useTable';
import type { TableCellBaseProps, TableCellProps } from './TableCell';

const visuallyHiddenCss = css`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

export type TableCellFallbackBaseProps = {
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
  Pick<SharedAccessibilityProps, 'accessibilityLabel'> &
  Pick<TableCellBaseProps, 'width' | 'outerSpacing' | 'innerSpacing'>;

type TableCellFallbackSharedProps = React.TdHTMLAttributes<HTMLTableCellElement> &
  React.ThHTMLAttributes<HTMLTableCellElement>;

export type TableCellFallbackProps = TableCellFallbackBaseProps &
  Omit<TableCellFallbackSharedProps, 'dangerouslySetInnerHTML' | 'title'> &
  Pick<TableCellProps, 'as'>;

const tableCellCss = css`
  padding: 0;
  margin: 0;
  vertical-align: middle;
  border: none;
`;

export const TableCellFallback = memo((_props: TableCellFallbackProps) => {
  const mergedProps = useComponentConfig('TableCellFallback', _props);
  const {
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
    accessibilityLabel = 'Loading Cell',
    ...props
  } = mergedProps;
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
        accessory={
          end && <MediaFallback aria-hidden testID="table-cell-fallback-accessory" type={end} />
        }
        gap={cellGap}
        innerSpacing={cellInnerSpacing}
        media={
          start && <MediaFallback aria-hidden testID="table-cell-fallback-media" type={start} />
        }
        outerSpacing={cellOuterSpacing}
        position="relative"
      >
        {accessibilityLabel && <span className={visuallyHiddenCss}>{accessibilityLabel}</span>}
        {title && (
          <Fallback
            aria-hidden
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
            aria-hidden
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
});

TableCellFallback.displayName = 'TableCellFallback';
