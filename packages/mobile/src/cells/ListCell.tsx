import React, { memo } from 'react';
import { compactListHeight, listHeight } from '@cbhq/cds-common/tokens/cell';

import { VStack } from '../layout/VStack';
import { Text } from '../typography/Text';

import { Cell, type CellBaseProps, type CellProps } from './Cell';
import { CellAccessory, type CellAccessoryType } from './CellAccessory';
import { CellDetail, type CellDetailProps } from './CellDetail';

export type ListCellBaseProps = CellDetailProps &
  Omit<CellBaseProps, 'accessory' | 'children'> & {
    /** Accessory to display at the end of the cell. */
    accessory?: CellAccessoryType;
    /** Interactive action, like a CTA or form element. Cannot be used alongside `onPress`. */
    action?: React.ReactNode;
    /** Enables compact spacing */
    compact?: boolean;
    /** Description of content. Max 1 line (with title) or 2 lines (without), otherwise will truncate. */
    description?: React.ReactNode;
    /**
     * Disable the default accessory that is displayed when the cell is selected.
     * If `accessory` is provided, that will continue to be displayed, otherwise no accessory will be displayed when the cell is selected.
     */
    disableSelectionAccessory?: boolean;
    /**
     * @default false
     * When there is no description the title will take up two lines by default.
     * When this is set to true multiline title behavior is overwritten, and regardless of description text state
     * the title will take up a single line truncating with ellipses.
     */
    disableMultilineTitle?: boolean;
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
  };

export type ListCellProps = ListCellBaseProps & Omit<CellProps, 'accessory' | 'children'>;

export const ListCell = memo(function ListCell({
  accessory,
  action,
  compact,
  title,
  disableMultilineTitle = false,
  description,
  detail,
  detailWidth,
  intermediary,
  priority,
  innerSpacing,
  outerSpacing,
  disabled,
  disableSelectionAccessory,
  helperText,
  media,
  multiline,
  selected,
  subdetail,
  variant,
  onPress,
  ...props
}: ListCellProps) {
  const minHeight = compact ? compactListHeight : listHeight;
  const accessoryType = selected && !disableSelectionAccessory ? 'selected' : accessory;
  const hasDetails = Boolean(detail || subdetail);

  return (
    <Cell
      accessory={accessoryType ? <CellAccessory type={accessoryType} /> : undefined}
      bottomContent={helperText}
      detail={
        action ||
        (hasDetails && (
          <CellDetail
            adjustsFontSizeToFit={!!detailWidth}
            detail={detail}
            subdetail={subdetail}
            variant={variant}
          />
        ))
      }
      detailWidth={detailWidth}
      disabled={disabled}
      innerSpacing={innerSpacing}
      intermediary={intermediary}
      media={media}
      minHeight={minHeight}
      onPress={onPress}
      outerSpacing={outerSpacing}
      priority={priority}
      selected={selected}
      {...props}
    >
      <VStack justifyContent="center">
        {!!title && (
          <Text
            ellipsize="tail"
            font="headline"
            numberOfLines={description || disableMultilineTitle ? 1 : 2}
          >
            {title}
          </Text>
        )}

        {!!description && (
          <Text
            color="fgMuted"
            ellipsize={multiline ? undefined : 'tail'}
            font="body"
            numberOfLines={multiline ? undefined : title ? 1 : 2}
          >
            {description}
          </Text>
        )}
      </VStack>
    </Cell>
  );
});
