import React, { memo, useMemo } from 'react';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { compactListHeight, listHeight } from '@coinbase/cds-common/tokens/cell';

import { VStack } from '../layout/VStack';
import { Text, type TextProps } from '../typography/Text';

import { Cell, type CellBaseProps, type CellProps, type CellSpacing } from './Cell';
import { CellAccessory, type CellAccessoryType } from './CellAccessory';
import { CellDetail, type CellDetailProps } from './CellDetail';

export const condensedInnerSpacing = {
  paddingX: 3,
  paddingY: 1,
  marginX: 0,
} as const satisfies CellSpacing;

// no padding outside of the pressable area
export const condensedOuterSpacing = {
  paddingX: 0,
  paddingY: 0,
  marginX: 0,
} as const satisfies CellSpacing;

export type ListCellBaseProps = CellDetailProps &
  Omit<CellBaseProps, 'accessory' | 'children'> & {
    /** Accessory to display at the end of the cell. */
    accessory?: CellAccessoryType;
    /** Custom accessory node rendered at the end of the cell. Takes precedence over `accessory`. */
    accessoryNode?: React.ReactNode;
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
     * @deprecated Use `spacingVariant="compact"`. `compact` will be removed in a release.
     */
    compact?: boolean;
    /**
     * Spacing variant configuration.
     * Deprecated value: 'compact'. Prefer 'condensed'.
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
    /** Description of content. Max 1 line (with title) or 2 lines (without), otherwise will truncate. This prop is only intended to accept a string or Text component; other use cases, while allowed, are not supported and may result in unexpected behavior. For arbitrary content, use `descriptionNode`. */
    description?: React.ReactNode;
    /** React node to render description. Takes precedence over `description`. */
    descriptionNode?: React.ReactNode;
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
    /** Title of content. Max 1 line (with description) or 2 lines (without), otherwise will truncate. This prop is only intended to accept a string or Text component; other use cases, while allowed, are not supported and may result in unexpected behavior. For arbitrary content, use `titleNode`. */
    title?: React.ReactNode;
    /** React node to render title. Takes precedence over `title`. */
    titleNode?: React.ReactNode;
    /** Subtitle to display below the title and above the description. This prop is only intended to accept a string or Text component; other use cases, while allowed, are not supported and may result in unexpected behavior. For arbitrary content, use `subtitleNode`. */
    subtitle?: React.ReactNode;
    /** React node to render subtitle. Takes precedence over `subtitle`. */
    subtitleNode?: React.ReactNode;
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
      subtitle?: StyleProp<TextStyle>;
      description?: StyleProp<TextStyle>;
    };
  };

export type ListCellProps = ListCellBaseProps & Omit<CellProps, 'accessory' | 'children'>;

export const ListCell = memo(function ListCell({
  accessory,
  accessoryNode,
  end: endProp,
  action,
  compact,
  title,
  titleNode,
  disableMultilineTitle = false,
  description,
  descriptionNode,
  subtitle,
  subtitleNode,
  detail,
  detailNode,
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
  subdetailNode,
  variant,
  onPress,
  spacingVariant = compact ? 'compact' : 'normal',
  style,
  styles,
  ...props
}: ListCellProps) {
  const minHeight =
    spacingVariant === 'compact'
      ? compactListHeight
      : spacingVariant === 'normal'
        ? listHeight
        : undefined;
  const accessoryType = selected && !disableSelectionAccessory ? 'selected' : accessory;
  const hasDetails = Boolean(detail || subdetail || detailNode || subdetailNode);

  const end = useMemo(
    () =>
      endProp ||
      action ||
      (hasDetails && (
        <CellDetail
          adjustsFontSizeToFit={!!detailWidth}
          detail={detail}
          detailNode={detailNode}
          subdetail={subdetail}
          subdetailFont={spacingVariant === 'condensed' ? 'label2' : 'body'}
          subdetailNode={subdetailNode}
          variant={variant}
        />
      )),
    [
      endProp,
      action,
      hasDetails,
      detail,
      detailNode,
      subdetail,
      subdetailNode,
      detailWidth,
      spacingVariant,
      variant,
    ],
  );

  return (
    <Cell
      accessory={accessoryType ? <CellAccessory type={accessoryType} /> : undefined}
      accessoryNode={accessoryNode}
      borderRadius={props.borderRadius ?? (spacingVariant === 'condensed' ? 0 : undefined)}
      bottomContent={helperText}
      detailWidth={detailWidth}
      disabled={disabled}
      end={end}
      innerSpacing={
        innerSpacing ?? (spacingVariant === 'condensed' ? condensedInnerSpacing : undefined)
      }
      intermediary={intermediary}
      media={media}
      minHeight={minHeight}
      onPress={onPress}
      outerSpacing={
        outerSpacing ?? (spacingVariant === 'condensed' ? condensedOuterSpacing : undefined)
      }
      priority={priority}
      selected={selected}
      style={[style, styles?.root]}
      styles={{
        accessory: styles?.accessory,
        bottomContent: styles?.helperText,
        contentContainer: styles?.contentContainer,
        end: styles?.end,
        intermediary: styles?.intermediary,
        media: styles?.media,
        pressable: [
          // for the condensed spacing, we need to offset the margin vertical to remove the strange gap between the pressable area
          spacingVariant === 'condensed' && Boolean(onPress) && { marginVertical: -1 },
          styles?.pressable,
        ],
        topContent: styles?.mainContent,
      }}
      {...props}
    >
      <VStack justifyContent="center">
        {titleNode ? (
          titleNode
        ) : title ? (
          <Text
            ellipsize="tail"
            font="headline"
            numberOfLines={
              disableMultilineTitle
                ? 1
                : // wrap at 2 lines in condensed spacingVariant regardless of description
                  spacingVariant === 'condensed'
                  ? 2
                  : description
                    ? 1
                    : 2
            }
            style={styles?.title}
          >
            {title}
          </Text>
        ) : null}

        {subtitleNode ? (
          subtitleNode
        ) : subtitle ? (
          <Text
            color="fgMuted"
            ellipsize="tail"
            font="label1"
            numberOfLines={1}
            style={styles?.subtitle}
          >
            {subtitle}
          </Text>
        ) : null}

        {descriptionNode ? (
          descriptionNode
        ) : description ? (
          <Text
            color="fgMuted"
            ellipsize={multiline ? undefined : 'tail'}
            font={spacingVariant === 'condensed' ? 'label2' : 'body'}
            numberOfLines={multiline ? undefined : title ? 1 : 2}
            style={styles?.description}
          >
            {description}
          </Text>
        ) : null}
      </VStack>
    </Cell>
  );
});
