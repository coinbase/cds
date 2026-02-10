import React, { forwardRef, memo, useMemo } from 'react';
import type { CellPriority } from '@coinbase/cds-common/types';
import { hasCellPriority } from '@coinbase/cds-common/utils/cell';
import { css } from '@linaria/core';

import type { Polymorphic } from '../core/polymorphism';
import { cx } from '../cx';
import { useCellSpacing } from '../hooks/useCellSpacing';
import { Box, type BoxBaseProps } from '../layout/Box';
import { HStack } from '../layout/HStack';
import { VStack } from '../layout/VStack';
import { Pressable, type PressableProps } from '../system/Pressable';

import type { CellAccessoryProps } from './CellAccessory';

const COMPONENT_STATIC_CLASSNAME = 'cds-Cell';

const pressCss = css`
  border-style: hidden;
  padding: 0;
  align-items: stretch;
  flex-grow: 1;
  display: flex;
  width: 100%;
`;

const insetFocusRingCss = css`
  position: relative;
  &:focus {
    outline: none;
  }
  &:focus-visible {
    outline-style: solid;
    outline-width: 2px;
    outline-color: var(--color-bgPrimary);
    outline-offset: 0;
  }
`;

const baseCss = css`
  display: block;
`;

// Display and min-width are necessary for truncation to work:
// https://css-tricks.com/flexbox-truncated-text/
const truncationCss = css`
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
`;

export const cellDefaultElement = 'div';

export type CellDefaultElement = typeof cellDefaultElement;

export type CellSpacing = Pick<
  BoxBaseProps,
  | 'padding'
  | 'paddingX'
  | 'paddingY'
  | 'paddingTop'
  | 'paddingEnd'
  | 'paddingBottom'
  | 'paddingStart'
  | 'margin'
  | 'marginX'
  | 'marginY'
  | 'marginTop'
  | 'marginEnd'
  | 'marginBottom'
  | 'marginStart'
>;

export type CellBaseProps = Polymorphic.ExtendableProps<
  BoxBaseProps,
  Pick<PressableProps<'a'>, 'href' | 'target'> & {
    /**
     * @deprecated Use `classNames.contentContainer` instead. `contentClassName` will be removed in a future major release.
     */
    contentClassName?: string;
    /** Key down handler for keyboard interaction. */
    onKeyDown?: React.KeyboardEventHandler;
    /** Key up handler for keyboard interaction. */
    onKeyUp?: React.KeyboardEventHandler;
    /** Click handler. */
    onClick?: React.MouseEventHandler;
    /** Accessory element rendered at the end of the cell (e.g., chevron). */
    accessory?: React.ReactElement<CellAccessoryProps>;
    /** Custom accessory node rendered at the end of the cell. Takes precedence over `accessory`. */
    accessoryNode?: React.ReactNode;
    /** Main content of the cell; typically title/description content. */
    children: React.ReactNode;
    /**
     * End-aligned content (e.g., value, status).
     * Replaces the deprecated `detail` prop.
     */
    end?: React.ReactNode;
    /**
     * @deprecated Use `end` instead. `detail` will be removed in a future major release.
     */
    detail?: React.ReactNode;
    /** Middle content between main content and detail. */
    intermediary?: React.ReactNode;
    /** Media rendered at the start of the cell (icon, avatar, image, etc). */
    media?: React.ReactElement;
    /**
     * @deprecated Use `shouldTruncate` instead. `shouldOverflow` will be removed in a future release.
     */
    shouldOverflow?: boolean;
    /**
     * Controls whether the main content should truncate with an ellipsis.
     * Defaults to true (truncates) when not provided.
     * @default true
     */
    shouldTruncate?: boolean;
    /**
     * @deprecated Use `styles.end` instead. `detailWidth` will be removed in a future major release.
     */
    detailWidth?: number | string;
    /** Is the cell disabled? Will apply opacity and disable interaction. */
    disabled?: boolean;
    /** Which piece of content has the highest priority in regards to text truncation, growing, and shrinking. */
    priority?: CellPriority | CellPriority[];
    /** Is the cell selected? Will apply a background and selected accessory. */
    selected?: boolean;
    /** The spacing to use on the parent wrapper of Cell */
    outerSpacing?: CellSpacing;
    /** The spacing to use on the inner content of Cell */
    innerSpacing?: CellSpacing;
    /** The content to display below the main cell content */
    bottomContent?: React.ReactNode;
    /** Custom styles for individual elements of the Cell component */
    styles?: {
      /** Root element */
      root?: React.CSSProperties;
      /** Content container element */
      contentContainer?: React.CSSProperties;
      /** Top content element */
      topContent?: React.CSSProperties;
      /** Bottom content element */
      bottomContent?: React.CSSProperties;
      /** Pressable wrapper element */
      pressable?: React.CSSProperties;
      /** Media element */
      media?: React.CSSProperties;
      /** Children container wrapper, controls flex behavior */
      childrenContainer?: React.CSSProperties;
      /** Intermediary element */
      intermediary?: React.CSSProperties;
      /** End element (detail or action container) */
      end?: React.CSSProperties;
      /** Accessory element */
      accessory?: React.CSSProperties;
    };
    /** Custom class names for individual elements of the Cell component */
    classNames?: {
      /** Root element */
      root?: string;
      /** Content container element */
      contentContainer?: string;
      /** Top content element */
      topContent?: string;
      /** Bottom content element */
      bottomContent?: string;
      /** Pressable wrapper element */
      pressable?: string;
      /** Media element */
      media?: string;
      /** Children container wrapper, controls flex behavior */
      childrenContainer?: string;
      /** Intermediary element */
      intermediary?: string;
      /** End element (detail or action container) */
      end?: string;
      /** Accessory element */
      accessory?: string;
    };
  }
>;

export type CellProps<AsComponent extends React.ElementType> = Polymorphic.Props<
  AsComponent,
  CellBaseProps
>;

type CellComponent = (<AsComponent extends React.ElementType = CellDefaultElement>(
  props: CellProps<AsComponent>,
) => Polymorphic.ReactReturn) &
  Polymorphic.ReactNamed;

export const Cell: CellComponent = memo(
  forwardRef<React.ReactElement<CellBaseProps>, CellBaseProps>(
    <AsComponent extends React.ElementType>(
      {
        as,
        accessory,
        accessoryNode,
        alignItems = 'center',
        borderRadius = 200,
        children,
        style,
        styles,
        classNames,
        className,
        contentClassName,
        end,
        detail,
        detailWidth,
        disabled,
        gap = 2,
        columnGap,
        rowGap = 1,
        intermediary,
        media,
        minHeight,
        maxHeight,
        onClick,
        onKeyDown,
        onKeyUp,
        priority,
        selected,
        testID,
        target,
        href,
        tabIndex,
        /**
         * For TableCell, we don't want to apply an
         * overflow class unless we've defined overflow
         * as either `'truncate' | 'clip'`.
         *
         * */
        shouldOverflow,
        shouldTruncate = !shouldOverflow,
        accessibilityLabel,
        accessibilityLabelledBy,
        accessibilityHint,
        innerSpacing: innerSpacingProp,
        outerSpacing: outerSpacingProp,
        bottomContent: bottom,
        background = 'bgAlternate',
        ...props
      }: CellProps<AsComponent>,
      ref?: Polymorphic.Ref<AsComponent>,
    ) => {
      const Component = (as ?? cellDefaultElement) satisfies React.ElementType;

      const { inner: innerSpacing, outer: outerSpacing } = useCellSpacing({
        innerSpacing: innerSpacingProp,
        outerSpacing: outerSpacingProp,
      });
      const { marginX: innerSpacingMarginX, ...innerSpacingWithoutMarginX } = innerSpacing;
      const isAnchor = Boolean(href);
      const isButton = Boolean(onClick ?? onKeyDown ?? onKeyUp);
      const linkable = isAnchor || isButton;
      const contentTruncationStyle = cx(baseCss, shouldTruncate && truncationCss);
      const content = useMemo(() => {
        // props for the entire inner container that wraps the top content
        // (media, children, intermediary, detail, accessory) and the bottom content
        const contentContainerProps = {
          borderRadius,
          className: cx(contentClassName, classNames?.contentContainer),
          testID,
          ...(selected ? { background } : {}),
          ...(linkable ? innerSpacingWithoutMarginX : innerSpacing),
          style: styles?.contentContainer,
        };

        // props for the container of the top content only(media, children, intermediary, detail, accessory)
        const topContentProps = {
          alignItems: alignItems,
          flexGrow: 1,
          gap: columnGap || gap,
          width: '100%',
          className: classNames?.topContent,
          style: styles?.topContent,
        } as const;

        const endWidth = styles?.end?.width ?? detailWidth;

        // content that is displayed horizontally above the bottom content
        const topContent = (
          <>
            {media && (
              <Box className={classNames?.media} flexGrow={0} flexShrink={0} style={styles?.media}>
                {media}
              </Box>
            )}

            <Box
              className={cx(contentTruncationStyle, classNames?.childrenContainer)}
              flexGrow={1}
              flexShrink={hasCellPriority('start', priority) ? 0 : 1}
              justifyContent="flex-start"
              style={styles?.childrenContainer}
            >
              {children}
            </Box>

            {!!intermediary && (
              <Box
                className={cx(contentTruncationStyle, classNames?.intermediary)}
                flexGrow={0}
                flexShrink={hasCellPriority('middle', priority) ? 0 : 1}
                justifyContent="center"
                style={styles?.intermediary}
              >
                {intermediary}
              </Box>
            )}

            {!!(end ?? detail) && (
              <Box
                alignItems="flex-end"
                className={cx(contentTruncationStyle, classNames?.end)}
                flexDirection="column"
                flexGrow={endWidth ? undefined : 1}
                flexShrink={endWidth ? undefined : hasCellPriority('end', priority) ? 0 : 1}
                justifyContent="flex-end"
                style={styles?.end}
                width={detailWidth}
              >
                {end ?? detail}
              </Box>
            )}

            {!!(accessoryNode ?? accessory) && (
              <Box
                className={classNames?.accessory}
                flexGrow={0}
                flexShrink={0}
                style={styles?.accessory}
              >
                {accessoryNode ?? accessory}
              </Box>
            )}
          </>
        );

        if (!bottom) {
          return (
            <HStack {...topContentProps} {...contentContainerProps}>
              {topContent}
            </HStack>
          );
        }

        return (
          <VStack
            alignItems="stretch"
            flexGrow={1}
            gap={rowGap}
            width="100%"
            {...contentContainerProps}
          >
            <HStack {...topContentProps}>{topContent}</HStack>
            <Box className={classNames?.bottomContent} style={styles?.bottomContent}>
              {bottom}
            </Box>
          </VStack>
        );
      }, [
        borderRadius,
        contentClassName,
        classNames?.contentContainer,
        classNames?.topContent,
        classNames?.media,
        classNames?.childrenContainer,
        classNames?.intermediary,
        classNames?.end,
        classNames?.accessory,
        classNames?.bottomContent,
        testID,
        selected,
        background,
        linkable,
        innerSpacingWithoutMarginX,
        innerSpacing,
        styles?.contentContainer,
        styles?.topContent,
        styles?.media,
        styles?.childrenContainer,
        styles?.intermediary,
        styles?.end,
        styles?.accessory,
        styles?.bottomContent,
        alignItems,
        columnGap,
        gap,
        media,
        contentTruncationStyle,
        priority,
        children,
        intermediary,
        end,
        detail,
        detailWidth,
        accessory,
        accessoryNode,
        bottom,
        rowGap,
      ]);

      const pressableWrappedContent = useMemo(() => {
        const pressableSharedProps = {
          noScaleOnPress: true,
          transparentWhileInactive: true,
          accessibilityHint,
          accessibilityLabel,
          accessibilityLabelledBy,
          background: 'bg' as const,
          borderRadius,
          className: cx(pressCss, insetFocusRingCss, classNames?.pressable),
          disabled,
          marginX: innerSpacingMarginX,
          onClick,
          onKeyDown,
          onKeyUp,
          tabIndex,
          testID: testID && `${testID}-cell-pressable`,
          style: styles?.pressable,
        };
        if (isAnchor)
          return (
            <Pressable as="a" href={href} target={target} {...pressableSharedProps}>
              {content}
            </Pressable>
          );

        if (isButton)
          return (
            <Pressable as="button" {...pressableSharedProps}>
              {content}
            </Pressable>
          );

        return content;
      }, [
        accessibilityHint,
        accessibilityLabel,
        accessibilityLabelledBy,
        borderRadius,
        classNames?.pressable,
        disabled,
        innerSpacingMarginX,
        onClick,
        onKeyDown,
        onKeyUp,
        tabIndex,
        testID,
        styles?.pressable,
        isAnchor,
        href,
        target,
        content,
        isButton,
      ]);

      return (
        <Box
          ref={ref}
          alignItems="stretch"
          as={Component}
          className={cx(COMPONENT_STATIC_CLASSNAME, className, classNames?.root)}
          maxHeight={maxHeight}
          minHeight={minHeight}
          style={{ ...style, ...styles?.root }}
          width="100%"
          {...outerSpacing}
          {...props}
        >
          {pressableWrappedContent}
        </Box>
      );
    },
  ),
);
