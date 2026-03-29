import React, { memo, useMemo } from 'react';
import type { SharedProps, TextAlignProps } from '@coinbase/cds-common';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';

import { useCellSpacing } from '../hooks/useCellSpacing';
import { useComponentConfig } from '../hooks/useComponentConfig';
import { Box } from '../layout/Box';
import { Text } from '../typography/Text';

import { useTableCellSpacing } from './hooks/useTable';
import type { TableCellProps } from './TableCell';

type HTMLHeadingTags = 'h1' | 'h2' | 'h3' | 'h4';

type HTMLNonHeadingTextTags =
  | 'p'
  | 'strong'
  | 'span'
  | 'label'
  | 'time'
  | 'output'
  | 'code'
  | 'pre'
  | 's'
  | 'abbr'
  | 'q'
  | 'kbd'
  | 'del'
  | 'ins'
  | 'sup'
  | 'sub'
  | 'li'
  | 'dl'
  | 'dt'
  | 'dd'
  | 'div';

type HTMLTextTags = HTMLHeadingTags | HTMLNonHeadingTextTags;

export type TableCaptionBaseProps = SharedProps & {
  /**
   * The children to render, either as a React element or a string.
   */
  children: React.ReactElement | string;
  /**
   * Specify text alignment. Only applicable when `children` is a string.
   * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align)
   * @default 'start'
   */
  align?: TextAlignProps['align'];
  /**
   * Set the text color to a CDS palette foreground color name.
   */
  color?: ThemeVars.Color;
  /**
   * Set the background color to a CDS palette background color name.
   */
  backgroundColor?: ThemeVars.Color;
  /**
   * The spacing to use on the parent wrapper of the caption.
   * Overrides table cell spacing defaults.
   */
  outerSpacing?: TableCellProps['outerSpacing'];
  /**
   * The spacing to use on the inner content of the caption.
   * Overrides table cell spacing defaults.
   */
  innerSpacing?: TableCellProps['innerSpacing'];
};

export type TableCaptionProps = TableCaptionBaseProps &
  Omit<React.HTMLAttributes<HTMLTableCaptionElement>, 'dangerouslySetInnerHTML'> & {
    /**
     * A semantic HTML element or a React component to be rendered.
     * Only applicable when `children` is a string.
     * @default 'span'
     */
    as?: HTMLTextTags;
  };

export const TableCaption = memo((_props: TableCaptionProps) => {
  const mergedProps = useComponentConfig('TableCaption', _props);
  const {
    children,
    as = 'span',
    align = 'start',
    color,
    backgroundColor,
    outerSpacing,
    innerSpacing,
    testID,
    style,
    ...props
  } = mergedProps;
  const { outer, inner } = useTableCellSpacing({
    outer: outerSpacing,
    inner: innerSpacing,
    skipAsValidation: true,
  });

  const { outer: outerCaptionSpacing, inner: innerCaptionSpacing } = useCellSpacing({
    outerSpacing: outer,
    innerSpacing: inner,
  });

  const inlineStyles = useMemo(
    () => ({
      color: color && `var(--color-${color})`,
      backgroundColor: backgroundColor && `var(--color-${backgroundColor})`,
      ...style,
    }),
    [style, backgroundColor, color],
  );

  return (
    <caption data-testid={testID} style={inlineStyles} {...props}>
      <Box {...outerCaptionSpacing}>
        <Box alignContent="stretch" flexDirection="column" flexGrow={1} {...innerCaptionSpacing}>
          {typeof children === 'string' ? (
            <Text as={as} color="currentColor" font="title3" textAlign={align}>
              {children}
            </Text>
          ) : (
            children
          )}
        </Box>
      </Box>
    </caption>
  );
});

TableCaption.displayName = 'TableCaption';
