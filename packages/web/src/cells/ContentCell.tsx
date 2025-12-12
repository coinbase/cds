import React, { forwardRef, memo, useMemo } from 'react';
import { compactListHeight, listHeight } from '@coinbase/cds-common/tokens/cell';
import { isProduction } from '@coinbase/cds-utils';
import { css } from '@linaria/core';

import type { Polymorphic } from '../core/polymorphism';
import { cx } from '../cx';
import { Box } from '../layout/Box';
import { HStack } from '../layout/HStack';
import { VStack } from '../layout/VStack';
import { Text } from '../typography/Text';

import { Cell, type CellBaseProps } from './Cell';
import { CellAccessory, type CellAccessoryType } from './CellAccessory';
import { condensedInnerSpacing, condensedOuterSpacing } from './ListCell';

const overflowCss = css`
  overflow: auto;
  text-overflow: unset;
  white-space: normal;
`;

const truncationCss = css`
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
`;

export const contentCellDefaultElement = 'div';

export type ContentCellDefaultElement = typeof contentCellDefaultElement;

/**
 * @deprecated this component will be removed in a future version. Use ListCell instead.
 */
export type ContentCellBaseProps = Polymorphic.ExtendableProps<
  Omit<CellBaseProps, 'children'>,
  {
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
     * 2. `padding` is `'var(--space-2) var(--space-3)'`
     * 3. `border-radius` is `'var(--borderRadius-200)'`
     *
     * When `spacingVariant="compact"`:
     * 1. same as `spacingVariant="normal"`, except `min-height` is `40px`
     *
     * When `spacingVariant="condensed"`:
     * 1. `min-height` is undefined
     * 2. `padding` is `'var(--space-1) var(--space-2)'`
     * 3. `border-radius` is `'var(--borderRadius-0)'`
     * 4. subtitle uses `label1`
     * 5. title wraps to 2 lines regardless of description content
     * 6. meta is placed alongside the accessory
     *
     * @default 'normal'
     */
    spacingVariant?: 'normal' | 'compact' | 'condensed';
    /**
     * React node to render description. Takes precedence over `description`.
     * When provided, `classNames.description` and `styles.description` are not applied.
     */
    descriptionNode?: React.ReactNode;
    /** Description of content. Content will wrap accordingly. */
    description?: React.ReactNode;
    /**
     * React node to render meta. Takes precedence over `meta`.
     * When provided, `classNames.meta` and `styles.meta` are not applied.
     */
    metaNode?: React.ReactNode;
    /** Media (icon, asset, image, etc) to display at the start of the cell. */
    media?: React.ReactElement;
    /** Meta information to display at the end of the title. */
    meta?: React.ReactNode;
    /**
     * React node to render subtitle. Takes precedence over `subtitle`.
     * When provided, `classNames.subtitle` and `styles.subtitle` are not applied.
     */
    subtitleNode?: React.ReactNode;
    /** Subtitle of content. Max 1 line, otherwise will truncate. */
    subtitle?: React.ReactNode;
    /**
     * React node to render title. Takes precedence over `title`.
     * When provided, `classNames.title` and `styles.title` are not applied.
     */
    titleNode?: React.ReactNode;
    /** Title of content. Up to 2 lines depending on spacing variant. */
    title?: React.ReactNode;
    /**
     * Class names for default subcomponents. Ignored when the corresponding `xxNode` prop is used.
     */
    classNames?: {
      root?: string;
      media?: string;
      accessory?: string;
      contentContainer?: string;
      pressable?: string;
      mainContent?: string;
      title?: string;
      subtitle?: string;
      end?: string;
      metaContainer?: string;
      meta?: string;
      description?: string;
    };
    /**
     * Styles for default subcomponents. Ignored when the corresponding `xxNode` prop is used.
     */
    styles?: {
      root?: React.CSSProperties;
      media?: React.CSSProperties;
      accessory?: React.CSSProperties;
      contentContainer?: React.CSSProperties;
      pressable?: React.CSSProperties;
      mainContent?: React.CSSProperties;
      title?: React.CSSProperties;
      subtitle?: React.CSSProperties;
      end?: React.CSSProperties;
      metaContainer?: React.CSSProperties;
      meta?: React.CSSProperties;
      description?: React.CSSProperties;
    };
  }
>;

export type ContentCellProps<AsComponent extends React.ElementType> = Polymorphic.Props<
  AsComponent,
  ContentCellBaseProps
>;

type ContentCellComponent = (<AsComponent extends React.ElementType = ContentCellDefaultElement>(
  props: ContentCellProps<AsComponent>,
) => Polymorphic.ReactReturn) &
  Polymorphic.ReactNamed;

/**
 * @deprecated this component will be removed in a future version. Use ListCell instead.
 */
export const ContentCell: ContentCellComponent = memo(
  forwardRef<React.ReactElement<ContentCellBaseProps>, ContentCellBaseProps>(
    <AsComponent extends React.ElementType>(
      {
        as,
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
        detailWidth,
        priority,
        innerSpacing,
        outerSpacing,
        compact: compactProp,
        spacingVariant = compactProp ? 'compact' : 'normal',
        alignItems = 'flex-start',
        className,
        classNames,
        style,
        styles,
        ...props
      }: ContentCellProps<AsComponent>,
      ref?: Polymorphic.Ref<AsComponent>,
    ) => {
      const Component = (as ?? contentCellDefaultElement) satisfies React.ElementType;
      const hasTitleContent = Boolean(titleNode ?? title);
      const hasSubtitleContent = Boolean(subtitleNode ?? subtitle);
      const hasMetaContent = Boolean(metaNode ?? meta);
      const hasDescriptionContent = Boolean(descriptionNode ?? description);
      if (!isProduction()) {
        if (hasMetaContent && !hasTitleContent && !hasSubtitleContent) {
          console.error('ContentCell: Cannot use meta content without a title or subtitle.');
        }
      }

      const accessoryType = selected ? 'selected' : accessory;
      const hasTitles = hasTitleContent || hasSubtitleContent;
      const minHeight =
        spacingVariant === 'compact'
          ? compactListHeight
          : spacingVariant === 'normal'
            ? listHeight
            : undefined;
      const subtitleFont = spacingVariant === 'condensed' ? 'label1' : 'label2';
      const titleNumberOfLines = spacingVariant === 'condensed' ? 2 : hasDescriptionContent ? 1 : 2;

      // This meta section will be placed alongside the accessory in the condensed variant,
      // when in other variants, it will be placed alongside the title and subtitle.
      const metaRender = useMemo(
        () =>
          metaNode ? (
            <Box
              className={cx(truncationCss, classNames?.metaContainer)}
              flexGrow={0}
              flexShrink={0}
              justifyContent="flex-end"
              paddingStart={2}
              paddingTop={0.5}
              style={styles?.metaContainer}
            >
              {metaNode}
            </Box>
          ) : meta ? (
            <Box
              className={cx(truncationCss, classNames?.metaContainer)}
              flexGrow={0}
              flexShrink={0}
              justifyContent="flex-end"
              paddingStart={2}
              paddingTop={0.5}
              style={styles?.metaContainer}
            >
              <Text
                className={classNames?.meta}
                color="fgMuted"
                font="label2"
                overflow="truncate"
                style={styles?.meta}
              >
                {meta}
              </Text>
            </Box>
          ) : null,
        [
          metaNode,
          meta,
          classNames?.metaContainer,
          styles?.metaContainer,
          classNames?.meta,
          styles?.meta,
        ],
      );

      const accessoryRender = useMemo(() => {
        if (spacingVariant !== 'condensed') {
          return accessoryType ? (
            <CellAccessory paddingTop={0.5} type={accessoryType} />
          ) : undefined;
        }

        if (!accessoryType && !metaRender) {
          return undefined;
        }

        return (
          <HStack alignItems="center" gap={2}>
            {metaRender}
            {accessoryType && <CellAccessory paddingTop={0.5} type={accessoryType} />}
          </HStack>
        );
      }, [spacingVariant, accessoryType, metaRender]);

      return (
        <Cell
          ref={ref}
          accessory={accessoryRender}
          accessoryNode={accessoryNode}
          alignItems={alignItems}
          as={Component}
          borderRadius={props.borderRadius ?? (spacingVariant === 'condensed' ? 0 : undefined)}
          className={cx(className, classNames?.root)}
          classNames={{
            accessory: classNames?.accessory,
            contentContainer: classNames?.contentContainer,
            media: classNames?.media,
            pressable: classNames?.pressable,
          }}
          detailWidth={detailWidth}
          disabled={disabled}
          innerSpacing={
            innerSpacing ?? (spacingVariant === 'condensed' ? condensedInnerSpacing : undefined)
          }
          media={media}
          minHeight={minHeight}
          outerSpacing={
            outerSpacing ?? (spacingVariant === 'condensed' ? condensedOuterSpacing : undefined)
          }
          priority={priority}
          selected={selected}
          style={{ ...style, ...styles?.root }}
          styles={{
            accessory: styles?.accessory,
            contentContainer: styles?.contentContainer,
            media: styles?.media,
            pressable: styles?.pressable,
          }}
          {...props}
        >
          {hasTitles && (
            <HStack alignItems="flex-start" justifyContent="space-between">
              <VStack
                className={cx(truncationCss, classNames?.mainContent)}
                flexGrow={1}
                flexShrink={1}
                style={styles?.mainContent}
              >
                {titleNode ? (
                  titleNode
                ) : title ? (
                  <Text
                    as="div"
                    className={classNames?.title}
                    display="block"
                    font="headline"
                    numberOfLines={titleNumberOfLines}
                    overflow={titleNumberOfLines === 1 ? 'truncate' : 'wrap'}
                    style={styles?.title}
                  >
                    {title}
                  </Text>
                ) : null}

                {subtitleNode ? (
                  subtitleNode
                ) : subtitle ? (
                  <Text
                    as="div"
                    className={classNames?.subtitle}
                    display="block"
                    font={subtitleFont}
                    overflow="truncate"
                    paddingBottom={hasDescriptionContent ? 0.5 : 0}
                    paddingTop={hasTitleContent ? 0.5 : 0}
                    style={styles?.subtitle}
                  >
                    {subtitle}
                  </Text>
                ) : null}
              </VStack>
              {spacingVariant !== 'condensed' && metaRender}
            </HStack>
          )}

          {descriptionNode ? (
            descriptionNode
          ) : description ? (
            <div className={overflowCss}>
              <Text
                as="div"
                className={classNames?.description}
                color="fgMuted"
                display="block"
                font="body"
                style={styles?.description}
              >
                {description}
              </Text>
            </div>
          ) : null}
        </Cell>
      );
    },
  ),
);
