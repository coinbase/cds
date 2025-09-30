import React, { forwardRef, memo, useMemo } from 'react';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
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
    contentClassName?: string;
    onKeyDown?: React.KeyboardEventHandler;
    onKeyUp?: React.KeyboardEventHandler;
    onClick?: React.MouseEventHandler;
    accessory?: React.ReactElement<CellAccessoryProps>;
    children: React.ReactNode;
    detail?: React.ReactNode;
    intermediary?: React.ReactNode;
    media?: React.ReactElement;
    // TODO: consider renaming this to shouldTruncate in next breaking change release. Since overflow gives people the sense that it will overflow and overlap with other content
    shouldOverflow?: boolean;
    /**
     * @deprecated Use `styles.detail.width` instead. This prop is kept for backward
     * compatibility and will be removed in a future major release.
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
    /** Styles for the components */
    styles?: {
      root?: React.CSSProperties;
      contentContainer?: React.CSSProperties;
      topContent?: React.CSSProperties;
      bottomContent?: React.CSSProperties;
      pressable?: React.CSSProperties;
      media?: React.CSSProperties;
      intermediary?: React.CSSProperties;
      detail?: React.CSSProperties;
      accessory?: React.CSSProperties;
    };
    /** Class names for the components */
    classNames?: {
      root?: string;
      contentContainer?: string;
      topContent?: string;
      bottomContent?: string;
      pressable?: string;
      media?: string;
      intermediary?: string;
      detail?: string;
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
        alignItems = 'center',
        borderRadius = 200,
        children,
        style,
        styles,
        classNames,
        className,
        contentClassName,
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
        accessibilityLabel,
        accessibilityLabelledBy,
        accessibilityHint,
        innerSpacing: innerSpacingProp,
        outerSpacing: outerSpacingProp,
        bottomContent: bottom,
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
      const contentTruncationStyle = cx(baseCss, !shouldOverflow && truncationCss);
      const content = useMemo(() => {
        // props for the entire inner container that wraps the top content
        // (media, children, intermediary, detail, accessory) and the bottom content
        const contentContainerProps = {
          borderRadius,
          className: cx(contentClassName, classNames?.contentContainer),
          testID,
          ...(selected ? { background: 'bgAlternate' as const } : {}),
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

        // content that is displayed horizontally above the bottom content
        const topContent = (
          <>
            {media && (
              <Box className={classNames?.media} flexGrow={0} flexShrink={0} style={styles?.media}>
                {media}
              </Box>
            )}

            <Box
              className={contentTruncationStyle}
              flexGrow={1}
              flexShrink={hasCellPriority('start', priority) ? 0 : 1}
              justifyContent="flex-start"
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

            {!!detail && (
              <Box
                alignItems="flex-end"
                className={cx(contentTruncationStyle, classNames?.detail)}
                flexDirection="column"
                flexGrow={styles?.detail?.width || detailWidth ? undefined : 1}
                flexShrink={
                  styles?.detail?.width || detailWidth
                    ? undefined
                    : hasCellPriority('end', priority)
                      ? 0
                      : 1
                }
                justifyContent="flex-end"
                style={styles?.detail}
                width={detailWidth}
              >
                {detail}
              </Box>
            )}

            {!!accessory && (
              <Box
                className={classNames?.accessory}
                flexGrow={0}
                flexShrink={0}
                style={styles?.accessory}
              >
                {accessory}
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
        classNames?.intermediary,
        classNames?.detail,
        classNames?.accessory,
        classNames?.bottomContent,
        testID,
        selected,
        linkable,
        innerSpacingWithoutMarginX,
        innerSpacing,
        styles?.contentContainer,
        styles?.topContent,
        styles?.media,
        styles?.intermediary,
        styles?.detail,
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
        detail,
        detailWidth,
        accessory,
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
          className={cx(className, classNames?.root)}
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
