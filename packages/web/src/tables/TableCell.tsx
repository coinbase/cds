import React, { memo, useMemo } from 'react';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import type { FlexAxisValue, FlexSpaceCommon } from '@coinbase/cds-common/types/BoxBaseProps';
import type { SharedProps } from '@coinbase/cds-common/types/SharedProps';
import { isDevelopment } from '@coinbase/cds-utils';
import { css } from '@linaria/core';

import { Cell, type CellBaseProps } from '../cells/Cell';
import { cx } from '../cx';
import { useComponentConfig } from '../hooks/useComponentConfig';
import { Box } from '../layout/Box';
import { Text, type TextBaseProps } from '../typography/Text';

import {
  useTableCellSpacing,
  useTableCellTag,
  useTableContext,
  useTableSectionTag,
} from './hooks/useTable';

export type TableCellTag = 'td' | 'th' | 'div';

type TableCellSharedProps = (React.TdHTMLAttributes<HTMLTableCellElement> &
  React.ThHTMLAttributes<HTMLTableCellElement>) &
  SharedProps;

export type TableCellBaseProps = TableCellSharedProps & {
  /**
   * Element (icon, asset, image, etc) to display at the start of the cell
   * @default undefined
   */
  start?: React.ReactElement;
  /**
   * Element (icon, asset, image, etc) to display at the end of the cell
   * @default undefined
   */
  end?: React.ReactElement;
  /**
   * The color for all text components rendered inside the TableCell.
   * Use titleColor and subtitleColor if you need to be more specific
   * @default undefined
   */
  color?: ThemeVars.Color | 'currentColor';
  /**
   * This prop us useful for right-aligning the last column
   * @default 'flex-start'
   */
  justifyContent?: FlexAxisValue | FlexSpaceCommon | 'space-evenly';
  /**
   * This prop us useful for aligning the last item to the right, or top-aligning cells
   * @default 'center'
   */
  alignItems?: CellBaseProps['alignItems'];
  /**
   * The colSpan attribute defines the number of columns a cell should span
   * @default 1
   */
  colSpan?: number;
  /**
   * Used for <th> elements. Defines the cells that the header element relates to
   */
  scope?: 'col' | 'row' | 'colgroup' | 'rowgroup';
  /**
   * Should the title/subtitle text truncate
   * @default false
   */
  overflow?: TextBaseProps['overflow'];
  /**
   * Direction provides content flow control.
   * Use vertical to inherit a VStask, horizontal for an HStack
   * @default vertical
   */
  direction?: 'vertical' | 'horizontal';
  /**
   * As a convenience, the width prop will set the css width and maxWidth props
   * @default undefined
   */
  width?: TableCellSharedProps['width'];
  /**
   * The spacing to use on the parent wrapper of Cell
   */
  outerSpacing?: CellBaseProps['outerSpacing'];
  /**
   * The spacing to use on the inner content of Cell
   * @default { spacingHorizontal: 0 }
   */
  innerSpacing?: CellBaseProps['innerSpacing'];
};

type TableCellPropsWithInputs = TableCellBaseProps & {
  /** Children to render within the cell. */
  children?: never;
  /**
   * If a title is provided, the default type style
   * will be inferred from context. If the cell is rendered
   * in a TableHeader, it will render with font="headline". But when
   * rendered in a TableBody the text will render with font="body".
   * @default undefined
   */
  title: string;
  titleColor?: ThemeVars.Color | 'currentColor';
  /**
   * A subtitle will appear below the title with font="label2".
   * @default undefined
   */
  subtitle?: string;
  subtitleColor?: ThemeVars.Color | 'currentColor';
};

type TableCellPropsWithChildren = TableCellBaseProps & {
  /**
   * If children are provided, title, subtitle and description MUST be unset
   * @default undefined
   */
  children: NonNullable<React.ReactNode | React.ReactNode[]>;
  title?: never;
  titleColor?: never;
  subtitle?: never;
  subtitleColor?: never;
};

export type TableCellProps = (TableCellPropsWithInputs | TableCellPropsWithChildren) & {
  /**
   * Callback to fire when pressed
   * @default noop
   */
  onClick?: React.MouseEventHandler;
  /**
   * Use as="th" to mark this cell as a header for screen readers
   * @default `th` when rendered inside a TableHeader, `td` when rendered inside a TableBody or TableFooter
   */
  as?: 'td' | 'th';
  /**
   * @danger This is a migration escape hatch. It is not intended to be used normally.
   */
  className?: string;
  /**
   * @deprecated. This will be removed in a future major release.
   * @deprecationExpectedRemoval v9
   * HTML width attribute to help with column layout.
   * This prop should _only_ be used to unblock migration efforts
   * @default undefined
   */
  dangerouslySetHtmlWidth?: TableCellSharedProps['width'];
};

const truncationCss = css`
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
`;

const tableCellCss = css`
  padding: 0;
  margin: 0;
  vertical-align: middle;
  border: none;
`;

const tableHeaderCellCss = css`
  color: var(--color-fgMuted);
`;

const tableFooterCellCss = css`
  color: var(--color-fgMuted);
`;

// Required to handle truncation - this looks whack, but
// the table behavior will override this. We use `width`
// to explicitly define a table columns width
const tableOverflowWidthCss = css`
  max-width: 0;
`;

export const TableCell = memo((_props: TableCellProps) => {
  const mergedProps = useComponentConfig('TableCell', _props);
  const {
    alignItems,
    children,
    colSpan = 1,
    scope,
    color = 'currentColor',
    direction = 'vertical',
    end,
    justifyContent,
    onClick,
    start,
    testID,
    overflow,
    // Only available when children is null
    title,
    titleColor,
    subtitle,
    subtitleColor = 'fgMuted',
    width,
    innerSpacing,
    outerSpacing,
    as,
    className,
    ...props
  } = mergedProps;
  if (isDevelopment() && children && (title || subtitle)) {
    console.error('TableCell: Cannot use `title` or `subtitle` with `children`.');
  }

  /**
   * ===================================================
   * SIMPLE PROP DRIVEN VARIABLES
   * These variables get their default value from
   * component props, which are memoized
   * ===================================================
   */
  const defaultJustifyContent = direction === 'vertical' ? 'flex-start' : 'space-between';
  const defaultAlignItems = direction === 'vertical' ? 'flex-start' : 'center';
  const shouldHandleOverflow = !!overflow && !width;

  /**
   * ===================================================
   * CONDITIONALS VARIABLES
   * These variables get their default value from a hook
   * so need to be memoized and computed here
   * ===================================================
   */
  // Depending on compact value
  const { compact } = useTableContext();
  const textPaddingTop = !compact && title ? 0.5 : 0;
  const cellGap = compact ? 0.5 : 1;

  // Depends on tableSectionType value
  const tableSectionType = useTableSectionTag();
  const isInBody = tableSectionType === 'tbody';
  const defaultTitleColor = isInBody ? 'fg' : 'fgMuted';
  const smartTitleColor = titleColor ?? color ?? defaultTitleColor;

  // Spacing defined on the TableCell will override cellSpacing defined on the Table
  const { outer, inner } = useTableCellSpacing({ outer: outerSpacing, inner: innerSpacing });

  // Depends on prop infered variables
  const smartAlignItems = alignItems ?? defaultAlignItems;
  const smartJustifyContent = justifyContent ?? defaultJustifyContent;

  /**
   * ===================================================
   * CONDITIONALS COMPONENTS
   * These variables get their default value from a hook
   * so need to be memoized and computed here
   * ===================================================
   */
  const TableCellComponent = useTableCellTag(as);
  const cellScope = useMemo(() => {
    if (TableCellComponent !== 'th') return undefined;
    if (scope) return scope;
    return tableSectionType === 'thead' ? 'col' : 'row';
  }, [TableCellComponent, tableSectionType, scope]);
  const flexDirection = direction === 'vertical' ? 'column' : 'row';
  const textComponentFont = useMemo(
    () => (tableSectionType === 'thead' ? 'headline' : 'body'),
    [tableSectionType],
  );

  /**
   * ===================================================
   * STYLES
   * ===================================================
   */
  const inlineStyles = useMemo(() => ({ width, maxWidth: width }), [width]);

  return (
    <TableCellComponent
      className={cx(
        tableCellCss,
        tableSectionType === 'thead' && tableHeaderCellCss,
        tableSectionType === 'tfoot' && tableFooterCellCss,
        shouldHandleOverflow && tableOverflowWidthCss,
        className,
      )}
      colSpan={colSpan}
      data-testid={testID}
      scope={cellScope}
      style={inlineStyles}
      {...props}
    >
      <Cell
        accessory={end}
        alignItems={alignItems}
        gap={cellGap}
        innerSpacing={inner}
        media={start}
        onClick={onClick}
        outerSpacing={outer}
        shouldOverflow={!overflow}
      >
        {children ? (
          <Text
            as="div"
            color={color}
            display="block"
            font={textComponentFont}
            noWrap={!!overflow}
            overflow={overflow}
          >
            <Box
              alignItems={smartAlignItems}
              flexDirection={flexDirection}
              flexGrow={1}
              flexShrink={1}
              gap={0.5}
              justifyContent={smartJustifyContent}
            >
              {children}
            </Box>
          </Text>
        ) : (
          <Box
            alignItems={smartAlignItems}
            className={overflow ? truncationCss : undefined}
            flexDirection={flexDirection}
            flexGrow={1}
            flexShrink={1}
            justifyContent={smartJustifyContent}
          >
            <Text
              as="div"
              color={smartTitleColor}
              display="block"
              font={textComponentFont}
              noWrap={!!overflow}
              overflow={overflow}
            >
              {title}
            </Text>
            {subtitle ? (
              <Text
                as="div"
                color={subtitleColor}
                display="block"
                font="label2"
                overflow={overflow}
                paddingTop={textPaddingTop}
              >
                {subtitle}
              </Text>
            ) : null}
          </Box>
        )}
      </Cell>
    </TableCellComponent>
  );
});

TableCell.displayName = 'TableCell';
