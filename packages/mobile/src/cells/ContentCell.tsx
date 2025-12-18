import React, { memo, useMemo } from 'react';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { compactListHeight, listHeight } from '@coinbase/cds-common/tokens/cell';
import { isProduction } from '@coinbase/cds-utils';

import { Box, HStack, VStack } from '../layout';
import { Text } from '../typography/Text';

import { Cell, type CellProps } from './Cell';
import { CellAccessory, type CellAccessoryType } from './CellAccessory';
import { condensedInnerSpacing, condensedOuterSpacing } from './ListCell';

/**
 * @deprecated this component will be removed in a future version. Use ListCell instead.
 */
export type ContentCellBaseProps = {
  /** Accessory to display at the end of the cell. */
  accessory?: CellAccessoryType;
  /**
   * @deprecated Use `spacingVariant="compact"` instead. `compact` will be removed in a future major release.
   */
  compact?: boolean;
  /**
   * Spacing variant configuration.
   * Deprecated value: 'compact'. Prefer 'condensed'.
   *
   * When `spacingVariant="normal"`:
   * 1. `min-height` is `80px`
   * 2. padding is `var(--space-2) var(--space-3)`
   * 3. `border-radius` is `var(--borderRadius-200)`
   *
   * When `spacingVariant="compact"`:
   * 1. same as `spacingVariant="normal"`, except `min-height` is `40px`
   *
   * When `spacingVariant="condensed"`:
   * 1. `min-height` is undefined
   * 2. padding is `var(--space-1) var(--space-2)`
   * 3. `border-radius` is `var(--borderRadius-0)`
   * 4. subtitle uses `label1`
   * 5. title wraps to 2 lines regardless of description content
   *
   * @default 'normal'
   */
  spacingVariant?: 'normal' | 'compact' | 'condensed';
  /** Description of content. Content will wrap accordingly. */
  description?: React.ReactNode;
  /**
   * React node to render description. Takes precedence over `description`.
   * When provided, `styles.description` is not applied.
   */
  descriptionNode?: React.ReactNode;
  /** Media (icon, asset, image, etc) to display at the start of the cell. */
  media?: React.ReactElement;
  /** Meta information to display at the end of the title. */
  meta?: React.ReactNode;
  /**
   * React node to render meta. Takes precedence over `meta`.
   * When provided, `styles.meta` and `styles.metaContainer` are not applied.
   */
  metaNode?: React.ReactNode;
  /** Subtitle of content. Max 1 line, otherwise will truncate. */
  subtitle?: React.ReactNode;
  /**
   * React node to render subtitle. Takes precedence over `subtitle`.
   * When provided, `styles.subtitle` is not applied.
   */
  subtitleNode?: React.ReactNode;
  /** Title of content. Up to 2 lines depending on spacing variant. */
  title?: React.ReactNode;
  /**
   * React node to render title. Takes precedence over `title`.
   * When provided, `styles.title` is not applied.
   */
  titleNode?: React.ReactNode;
  /**
   * Styles for the default subcomponents. Ignored when the corresponding `xxNode` prop is used.
   */
  styles?: {
    root?: StyleProp<ViewStyle>;
    media?: StyleProp<ViewStyle>;
    accessory?: StyleProp<ViewStyle>;
    contentContainer?: StyleProp<ViewStyle>;
    pressable?: StyleProp<ViewStyle>;
    mainContent?: StyleProp<ViewStyle>;
    title?: StyleProp<TextStyle>;
    subtitle?: StyleProp<TextStyle>;
    metaContainer?: StyleProp<ViewStyle>;
    meta?: StyleProp<TextStyle>;
    description?: StyleProp<TextStyle>;
  };
};

export type ContentCellProps = Omit<CellProps, 'children' | 'accessory' | 'styles'> &
  ContentCellBaseProps;

function generateAccessibilityLabels(
  userLabel?: string,
  title?: React.ReactNode,
  subtitle?: React.ReactNode,
) {
  let computedLabel = userLabel ?? '';
  if (computedLabel === '') {
    // title has higher priority
    if (typeof title === 'string') {
      computedLabel = title;
    } else if (typeof subtitle === 'string') {
      computedLabel = subtitle;
    }
  }

  return computedLabel;
}

/**
 * @deprecated this component will be removed in a future version. Use ListCell instead.
 */
export const ContentCell = memo(function ContentCell({
  accessory,
  accessoryNode,
  title,
  titleNode,
  description,
  descriptionNode,
  disabled,
  media,
  meta,
  metaNode,
  selected,
  subtitle,
  subtitleNode,
  accessibilityLabel,
  accessibilityHint,
  detailWidth,
  priority,
  innerSpacing,
  outerSpacing,
  compact: compactProp,
  spacingVariant = compactProp ? 'compact' : 'normal',
  alignItems = 'flex-start',
  style,
  styles,
  onPress,
  ...props
}: ContentCellProps) {
  const hasTitleContent = Boolean(titleNode ?? title);
  const hasSubtitleContent = Boolean(subtitleNode ?? subtitle);
  const hasMetaContent = Boolean(metaNode ?? meta);
  const hasDescriptionContent = Boolean(descriptionNode ?? description);

  if (!isProduction()) {
    if (hasMetaContent && !hasTitleContent && !hasSubtitleContent) {
      console.error('ContentCell: Cannot use `meta` without a `title` or `subtitle`.');
    }
  }

  const hasTitles = hasTitleContent || hasSubtitleContent;
  const accessoryType = selected ? 'selected' : accessory;

  const computedAccessibilityLabel = generateAccessibilityLabels(
    accessibilityLabel,
    title,
    subtitle,
  );
  const computedAccessibilityHint = generateAccessibilityLabels(accessibilityHint, title, subtitle);

  const minHeight =
    spacingVariant === 'compact'
      ? compactListHeight
      : spacingVariant === 'normal'
        ? listHeight
        : undefined;
  const subtitleFont = spacingVariant === 'condensed' ? 'label1' : 'label2';
  const titleNumberOfLines = spacingVariant === 'condensed' ? 2 : hasDescriptionContent ? 1 : 2;

  const metaRender = useMemo(() => {
    if (metaNode) {
      return (
        <Box
          justifyContent="flex-end"
          paddingStart={1}
          paddingTop={0.5}
          style={styles?.metaContainer}
        >
          {metaNode}
        </Box>
      );
    }

    if (meta) {
      return (
        <Box
          justifyContent="flex-end"
          paddingStart={1}
          paddingTop={0.5}
          style={styles?.metaContainer}
        >
          <Text color="fgMuted" font="label2" style={styles?.meta}>
            {meta}
          </Text>
        </Box>
      );
    }

    return null;
  }, [metaNode, meta, styles?.metaContainer, styles?.meta]);

  const accessoryRender = useMemo(() => {
    if (spacingVariant !== 'condensed') {
      return accessoryType ? <CellAccessory paddingTop={0.5} type={accessoryType} /> : undefined;
    }

    if (!accessoryType && !metaRender) {
      return undefined;
    }

    return (
      <HStack alignItems="center" gap={2}>
        {metaRender}
        {accessoryType ? <CellAccessory paddingTop={0.5} type={accessoryType} /> : null}
      </HStack>
    );
  }, [spacingVariant, accessoryType, metaRender]);

  return (
    <Cell
      accessibilityHint={computedAccessibilityHint}
      accessibilityLabel={computedAccessibilityLabel}
      accessory={accessoryRender}
      accessoryNode={accessoryNode}
      alignItems={alignItems}
      borderRadius={props.borderRadius ?? (spacingVariant === 'condensed' ? 0 : undefined)}
      detailWidth={detailWidth}
      disabled={disabled}
      innerSpacing={
        innerSpacing ?? (spacingVariant === 'condensed' ? condensedInnerSpacing : undefined)
      }
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
        contentContainer: styles?.contentContainer,
        media: styles?.media,
        pressable: styles?.pressable,
      }}
      {...props}
    >
      <VStack>
        {hasTitles && (
          <HStack alignItems="flex-start" justifyContent="space-between">
            <Box flexShrink={1} style={styles?.mainContent}>
              {titleNode ? (
                titleNode
              ) : title ? (
                <Text
                  ellipsize="tail"
                  font="headline"
                  numberOfLines={titleNumberOfLines}
                  style={styles?.title}
                >
                  {title}
                </Text>
              ) : null}

              {subtitleNode ? (
                subtitleNode
              ) : subtitle ? (
                <Text
                  font={subtitleFont}
                  paddingBottom={hasDescriptionContent ? 0.5 : 0}
                  paddingTop={hasTitleContent ? 0.5 : 0}
                  style={styles?.subtitle}
                >
                  {subtitle}
                </Text>
              ) : null}
            </Box>

            {spacingVariant !== 'condensed' ? metaRender : null}
          </HStack>
        )}

        {descriptionNode ? (
          descriptionNode
        ) : description ? (
          <Text color="fgMuted" font="body" style={styles?.description}>
            {description}
          </Text>
        ) : null}
      </VStack>
    </Cell>
  );
});
