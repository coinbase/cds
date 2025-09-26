import React, { forwardRef, memo, useMemo } from 'react';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import type { CellPriority } from '@coinbase/cds-common/types';
import { hasCellPriority } from '@coinbase/cds-common/utils/cell';
import { css } from '@linaria/core';

import type { CellAccessoryProps } from '../../cells/CellAccessory';
import type { Polymorphic } from '../../core/polymorphism';
import { cx } from '../../cx';
import { Box, type BoxBaseProps } from '../../layout/Box';
import { HStack } from '../../layout/HStack';
import { VStack } from '../../layout/VStack';
import { Pressable, type PressableProps } from '../../system/Pressable';

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

export type CellBaseProps = Polymorphic.ExtendableProps<
  BoxBaseProps,
  Pick<PressableProps<'a'>, 'href' | 'target'> & {
    onKeyDown?: React.KeyboardEventHandler;
    onKeyUp?: React.KeyboardEventHandler;
    onClick?: React.MouseEventHandler;
    accessory?: React.ReactElement<CellAccessoryProps>;
    children: React.ReactNode;
    end?: React.ReactNode;
    intermediary?: React.ReactNode;
    start?: React.ReactElement;
    // TODO: consider renaming this to shouldTruncate. Since overflow gives people the sense that it will overflow and overlap with other content
    shouldOverflow?: boolean;
    borderRadius?: ThemeVars.BorderRadius;
    // TODO: consider removing this since we have styles.end
    /** Apply a fixed width to the end (end). */
    endWidth?: number | string;
    /** Is the cell disabled? Will apply opacity and disable interaction. */
    disabled?: boolean;
    /** Which piece of content has the highest priority in regards to text truncation, growing, and shrinking. */
    priority?: CellPriority | CellPriority[];
    /** Is the cell selected? Will apply a background and selected accessory. */
    selected?: boolean;
    /** The content to display below the main cell content */
    bottomContent?: React.ReactNode;
    styles?: {
      root?: React.CSSProperties;
      contentContainer?: React.CSSProperties;
      topContent?: React.CSSProperties;
      bottomContent?: React.CSSProperties;
      pressable?: React.CSSProperties;
      start?: React.CSSProperties;
      intermediary?: React.CSSProperties;
      end?: React.CSSProperties;
      accessory?: React.CSSProperties;
    };
    classNames?: {
      root?: string;
      contentContainer?: string;
      topContent?: string;
      bottomContent?: string;
      pressable?: string;
      start?: string;
      intermediary?: string;
      end?: string;
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
        className,
        end,
        endWidth,
        disabled,
        gap = 2,
        columnGap,
        rowGap = 1,
        intermediary,
        start,
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
        paddingX,
        paddingY,
        paddingTop,
        paddingEnd,
        paddingBottom,
        paddingStart,
        padding,
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
        bottomContent: bottom,
        classNames,
        styles,
        style,
        ...props
      }: CellProps<AsComponent>,
      ref?: Polymorphic.Ref<AsComponent>,
    ) => {
      const Component = (as ?? cellDefaultElement) satisfies React.ElementType;
      const isAnchor = Boolean(href);
      const isButton = Boolean(onClick ?? onKeyDown ?? onKeyUp);
      const contentTruncationStyle = cx(baseCss, !shouldOverflow && truncationCss);
      const paddingProps = useMemo(() => {
        return {
          paddingX,
          paddingY,
          paddingTop,
          paddingEnd,
          paddingBottom,
          paddingStart,
          padding,
        };
      }, [paddingX, paddingY, paddingTop, paddingEnd, paddingBottom, paddingStart, padding]);

      const content = useMemo(() => {
        // props for the entire inner container that wraps the top content
        // (start, children, intermediary, end, accessory) and the bottom content
        const contentContainerProps = {
          borderRadius,
          testID,
          ...(selected ? { background: 'bgAlternate' as const } : {}),
          // padding will be applied to the inner container so it is added to the pressable area
          ...paddingProps,
          className: classNames?.contentContainer,
          style: styles?.contentContainer,
        };

        // props for the container of the top content only(start, children, intermediary, end, accessory)
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
            {start && (
              <Box className={classNames?.start} flexGrow={0} flexShrink={0} style={styles?.start}>
                {start}
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

            {!!end && (
              <Box
                alignItems="flex-end"
                className={cx(contentTruncationStyle, classNames?.end)}
                flexDirection="column"
                flexGrow={endWidth ? undefined : 1}
                flexShrink={endWidth ? undefined : hasCellPriority('end', priority) ? 0 : 1}
                justifyContent="flex-end"
                style={styles?.end}
                width={endWidth}
              >
                {end}
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
        testID,
        selected,
        paddingProps,
        classNames?.contentContainer,
        classNames?.topContent,
        classNames?.start,
        classNames?.intermediary,
        classNames?.end,
        classNames?.accessory,
        classNames?.bottomContent,
        styles?.contentContainer,
        styles?.topContent,
        styles?.start,
        styles?.intermediary,
        styles?.end,
        styles?.accessory,
        styles?.bottomContent,
        alignItems,
        columnGap,
        gap,
        start,
        contentTruncationStyle,
        priority,
        children,
        intermediary,
        end,
        endWidth,
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
          {...props}
        >
          {pressableWrappedContent}
        </Box>
      );
    },
  ),
);
