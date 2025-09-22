import React, { forwardRef, memo, useMemo } from 'react';
import { compactListHeight, listHeight } from '@cbhq/cds-common/tokens/cell';
import { css } from '@linaria/core';

import type { Polymorphic } from '../core/polymorphism';
import { Box } from '../layout/Box';
import { VStack } from '../layout/VStack';
import { Text } from '../typography/Text';

import { Cell, type CellBaseProps } from './Cell';
import { CellAccessory, type CellAccessoryType } from './CellAccessory';
import { CellDetail, type CellDetailProps } from './CellDetail';

const overflowCss = css`
  overflow: auto;
  text-overflow: unset;
  white-space: normal;
`;

export const listCellDefaultElement = 'div';

export type ListCellDefaultElement = typeof listCellDefaultElement;

export type ListCellBaseProps = Polymorphic.ExtendableProps<
  Omit<CellBaseProps, 'children'>,
  CellDetailProps & {
    /** Accessory to display at the end of the cell. */
    accessory?: CellAccessoryType;
    /** Interactive action, like a CTA or form element. Cannot be used alongside `onPress`. */
    action?: React.ReactNode;
    /** enables compact spacing */
    compact?: boolean;
    /** Description of content. Max 1 line (with title) or 2 lines (without), otherwise will truncate. */
    description?: React.ReactNode;
    /**
     * When there is no description the title will take up two lines by default.
     * When this is set to true multiline title behavior is overwritten, and regardless of description text state
     * the title will take up a single line truncating with ellipses.
     */
    disableMultilineTitle?: boolean;
    /**
     * Disable the default accessory that is displayed when the cell is selected.
     * If `accessory` is provided, that will continue to be displayed, otherwise no accessory will be displayed when the cell is selected.
     */
    disableSelectionAccessory?: boolean;
    /** Assitive message to display below the cell content */
    helperText?: React.ReactNode;
    /** For internal use only. */
    intermediary?: React.ReactNode;
    /* Media (icon, asset, image, etc) to display at the start of the cell. */
    media?: React.ReactElement;
    /** Allow the description to span multiple lines. This *will* break fixed height requirements, so should not be used in a `FlatList`. */
    multiline?: boolean;
    /** Title of content. Max 1 line (with description) or 2 lines (without), otherwise will truncate. */
    title?: React.ReactNode;
  }
>;

export type ListCellProps<AsComponent extends React.ElementType> = Polymorphic.Props<
  AsComponent,
  ListCellBaseProps
>;

type ListCellComponent = (<AsComponent extends React.ElementType = ListCellDefaultElement>(
  props: ListCellProps<AsComponent>,
) => Polymorphic.ReactReturn) &
  Polymorphic.ReactNamed;

export const ListCell: ListCellComponent = memo(
  forwardRef<React.ReactElement<ListCellBaseProps>, ListCellBaseProps>(
    <AsComponent extends React.ElementType>(
      {
        as,
        accessory,
        action,
        compact,
        title,
        description,
        detail,
        disabled,
        disableMultilineTitle = false,
        disableSelectionAccessory,
        helperText,
        media,
        multiline,
        selected,
        subdetail,
        variant,
        intermediary,
        priority,
        innerSpacing,
        outerSpacing,
        detailWidth,
        ...props
      }: ListCellProps<AsComponent>,
      ref?: Polymorphic.Ref<AsComponent>,
    ) => {
      const Component = (as ?? listCellDefaultElement) satisfies React.ElementType;

      const minHeight = compact ? compactListHeight : listHeight;
      const accessoryType = selected && !disableSelectionAccessory ? 'selected' : accessory;

      const end = useMemo(() => {
        if (action) {
          return <Box justifyContent="flex-end">{action}</Box>;
        }
        if (detail || subdetail) {
          return <CellDetail detail={detail} subdetail={subdetail} variant={variant} />;
        }
        return undefined;
      }, [action, detail, subdetail, variant]);

      return (
        <Cell
          ref={ref}
          accessory={accessoryType && <CellAccessory type={accessoryType} />}
          as={Component}
          bottomContent={helperText}
          detail={end}
          detailWidth={detailWidth}
          disabled={disabled}
          innerSpacing={innerSpacing}
          intermediary={intermediary}
          media={media}
          minHeight={minHeight}
          outerSpacing={outerSpacing}
          priority={priority}
          selected={selected}
          {...props}
        >
          <VStack>
            {!!title && (
              <Text
                as="div"
                display="block"
                font="headline"
                numberOfLines={description || disableMultilineTitle ? 1 : 2}
                overflow="wrap"
              >
                {title}
              </Text>
            )}

            {!!description && (
              <Text
                as="div"
                className={multiline ? overflowCss : undefined}
                color="fgMuted"
                display="block"
                font="body"
                overflow={multiline ? undefined : 'truncate'}
              >
                {description}
              </Text>
            )}
          </VStack>
        </Cell>
      );
    },
  ),
);
