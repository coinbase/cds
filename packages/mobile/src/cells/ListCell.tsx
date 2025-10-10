import React, { memo, useMemo } from 'react';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { compactListHeight, listHeight } from '@coinbase/cds-common/tokens/cell';

import { VStack } from '../layout/VStack';
import { Text, type TextProps } from '../typography/Text';

import { Cell, type CellBaseProps, type CellProps, type CellSpacing } from './Cell';
import { CellAccessory, type CellAccessoryType } from './CellAccessory';
import { CellDetail, type CellDetailProps } from './CellDetail';

export const hugInnerSpacing = {
  paddingX: 2,
  paddingY: 0.5,
  marginX: 0,
} as const satisfies CellSpacing;

// no padding outside of the pressable area
export const hugOuterSpacing = {
  paddingX: 0,
  paddingY: 0,
  marginX: 0,
} as const satisfies CellSpacing;

export type ListCellBaseProps = CellDetailProps &
  Omit<CellBaseProps, 'accessory' | 'children'> & {
    /** Accessory to display at the end of the cell. */
    accessory?: CellAccessoryType;
    /**
     * End-aligned content (e.g., CTA, form element, metric). Replacement for the deprecated action prop, and takes precedence over it.
     * If the content is a action (like button, link, etc), we recommand avoid using alongside `onPress`.
     * If used alongside `onClick`, the end action is triggered first and then the `onClick` handler.
     */
    end?: React.ReactNode;
    /**
     * @deprecated Use `end` instead. `action` will be removed in a release.
     */
    action?: React.ReactNode;
    /**
     * @deprecated Use `layoutSpacing="compact"`. `compact` will be removed in a release.
     */
    compact?: boolean;
    /**
     * Layout spacing configuration.
     * Deprecated values: 'spacious' and 'compact'. Prefer 'hug'.
     * This prop will be removed in the next major release, new list cell will only have 'hug' spacing.
     *
     * When `spacingVariant="normal"`:
     * 1. `min-height` is `80px`
     * 2. `padding` is `'var(--space-2) var(--space-3)'`
     * 3. `border-radius` is `'var(--borderRadius-200)'`
     * 4. when there is a description, title's `numberOfLines={1}` otherwise title's `numberOfLines={2}`
     * 5. description and subdetail have font `body`
     *
     * When `spacingVariant="compact"`:
     * 1. same as `spacingVariant="normal"`, except `min-height` is `40px`
     *
     * When `spacingVariant="condensed"`:
     * 1. `min-height` is undefined
     * 2. `padding` is `'var(--space-1) var(--space-2)'`
     * 3. `border-radius` is `--borderRadius-0`
     * 4. title's `numberOfLines={2}`
     * 5. description and subdetail have font `label2`
     *
     * @default 'normal'
     */
    spacingVariant?: 'normal' | 'compact' | 'condensed';
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
    /** Assistive message to display below the cell content. */
    helperText?: React.ReactNode;
    /** For internal use only. */
    intermediary?: React.ReactNode;
    /* Media (icon, asset, image, etc) to display at the start of the cell. */
    media?: React.ReactElement;
    /** Allow the description to span multiple lines. This *will* break fixed height requirements, so should not be used in a `FlatList`. */
    multiline?: boolean;
    /** Title of content. Max 1 line (with description) or 2 lines (without), otherwise will truncate. */
    title?: React.ReactNode;
    /** Styles for the components */
    styles?: {
      root?: StyleProp<ViewStyle>;
      media?: StyleProp<ViewStyle>;
      intermediary?: StyleProp<ViewStyle>;
      end?: StyleProp<ViewStyle>;
      accessory?: StyleProp<ViewStyle>;
      contentContainer?: StyleProp<ViewStyle>;
      pressable?: StyleProp<ViewStyle>;
      mainContent?: StyleProp<ViewStyle>;
      helperText?: StyleProp<ViewStyle>;
      title?: StyleProp<TextStyle>;
      description?: StyleProp<TextStyle>;
    };
  };

export type ListCellProps = ListCellBaseProps & Omit<CellProps, 'accessory' | 'children'>;

export const ListCell = memo(function ListCell({
  accessory,
  end: endProp,
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
  layoutSpacing = compact ? 'compact' : 'spacious',
  style,
  styles,
  ...props
}: ListCellProps) {
  const minHeight =
    layoutSpacing === 'compact'
      ? compactListHeight
      : layoutSpacing === 'spacious'
        ? listHeight
        : undefined;
  const accessoryType = selected && !disableSelectionAccessory ? 'selected' : accessory;
  const hasDetails = Boolean(detail || subdetail);

  const end = useMemo(
    () =>
      endProp ||
      action ||
      (hasDetails && (
        <CellDetail
          adjustsFontSizeToFit={!!detailWidth}
          detail={detail}
          subdetail={subdetail}
          subdetailFont={layoutSpacing === 'hug' ? 'label2' : 'body'}
          variant={variant}
        />
      )),
    [endProp, action, hasDetails, detail, subdetail, detailWidth, layoutSpacing, variant],
  );

  return (
    <Cell
      accessory={accessoryType ? <CellAccessory type={accessoryType} /> : undefined}
      borderRadius={props.borderRadius ?? (layoutSpacing === 'hug' ? 0 : undefined)}
      bottomContent={helperText}
      detailWidth={detailWidth}
      disabled={disabled}
      end={end}
      innerSpacing={innerSpacing ?? (layoutSpacing === 'hug' ? hugInnerSpacing : undefined)}
      intermediary={intermediary}
      media={media}
      minHeight={minHeight}
      onPress={onPress}
      outerSpacing={outerSpacing ?? (layoutSpacing === 'hug' ? hugOuterSpacing : undefined)}
      priority={priority}
      selected={selected}
      style={[style, styles?.root]}
      styles={{
        media: styles?.media,
        intermediary: styles?.intermediary,
        end: styles?.end,
        accessory: styles?.accessory,
        topContent: styles?.mainContent,
        bottomContent: styles?.helperText,
        contentContainer: styles?.contentContainer,
        pressable: [
          // for the hug spacing, we need to offset the margin vertical to remove the strange gap between the pressable area
          layoutSpacing === 'hug' && !!onPress && { marginVertical: -1 },
          styles?.pressable,
        ],
      }}
      {...props}
    >
      <VStack justifyContent="center">
        {!!title && (
          <Text
            ellipsize="tail"
            font="headline"
            numberOfLines={
              disableMultilineTitle
                ? 1
                : // wrap at 2 lines in hug layoutSpacing regardless of description
                  layoutSpacing === 'hug'
                  ? 2
                  : description
                    ? 1
                    : 2
            }
            style={styles?.title}
          >
            {title}
          </Text>
        )}

        {!!description && (
          <Text
            color="fgMuted"
            ellipsize={multiline ? undefined : 'tail'}
            font={layoutSpacing === 'hug' ? 'label2' : 'body'}
            numberOfLines={multiline ? undefined : title ? 1 : 2}
            style={styles?.description}
          >
            {description}
          </Text>
        )}
      </VStack>
    </Cell>
  );
});
