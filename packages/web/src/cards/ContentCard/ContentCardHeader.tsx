import React, { forwardRef, memo, useMemo } from 'react';
import type { SharedProps } from '@coinbase/cds-common/types';

import type { Polymorphic } from '../../core/polymorphism';
import { cx } from '../../cx';
import { type BoxBaseProps, HStack, VStack } from '../../layout';
import { Avatar } from '../../media';
import { Text } from '../../typography/Text';

export const contentCardHeaderDefaultElement = 'div';
export type ContentCardHeaderDefaultElement = typeof contentCardHeaderDefaultElement;

export type ContentCardHeaderBaseProps = Polymorphic.ExtendableProps<
  BoxBaseProps,
  SharedProps & {
    /** @deprecated Use `thumbnail` instead. `avatar` will be removed in a future major release. */
    avatar?: React.ReactNode;
    /** A media object like an image, avatar, illustration, or cryptocurrency asset. */
    thumbnail?: React.ReactNode;
    title: React.ReactNode;
    /** @deprecated Use `subtitle` instead. `meta` will be removed in a future major release. */
    meta?: React.ReactNode;
    subtitle?: React.ReactNode;
    /** @deprecated Use `action` instead. `end` will be removed in a future major release. */
    end?: React.ReactNode;
    /** Slot for action buttons. */
    actions?: React.ReactNode;
    styles?: {
      /**
       * Root container style
       */
      root?: React.CSSProperties;
      /**
       * Container for the text content (title + subtitle)
       */
      textContainer?: React.CSSProperties;
      /**
       * Container for the content (thumbnail + text content)
       */
      contentContainer?: React.CSSProperties;
    };
    classNames?: {
      /**
       * Root container class name
       */
      root?: string;
      /**
       * Container for the text content (title + subtitle)
       */
      textContainer?: string;
      /**
       * Container for the content (thumbnail + text content)
       */
      contentContainer?: string;
    };
  }
>;

export type ContentCardHeaderProps<AsComponent extends React.ElementType> = Polymorphic.Props<
  AsComponent,
  ContentCardHeaderBaseProps
>;

type ContentCardHeaderComponent = (<
  AsComponent extends React.ElementType = ContentCardHeaderDefaultElement,
>(
  props: ContentCardHeaderProps<AsComponent>,
) => Polymorphic.ReactReturn) &
  Polymorphic.ReactNamed;

export const ContentCardHeader: ContentCardHeaderComponent = memo(
  forwardRef<React.ReactElement<ContentCardHeaderBaseProps>, ContentCardHeaderBaseProps>(
    <AsComponent extends React.ElementType>(
      {
        as,
        avatar,
        title,
        meta,
        end,
        subtitle = meta,
        actions = end,
        thumbnail,
        styles,
        style,
        classNames,
        className,
        gap = 1.5,
        paddingX = 2,
        paddingTop = 2,
        ...props
      }: ContentCardHeaderProps<AsComponent>,
      ref?: Polymorphic.Ref<AsComponent>,
    ) => {
      const Component = (as ?? contentCardHeaderDefaultElement) satisfies React.ElementType;
      const titleNode = useMemo(() => {
        if (typeof title === 'string') {
          return (
            <Text font="label1" numberOfLines={1}>
              {title}
            </Text>
          );
        }
        return title;
      }, [title]);

      const subtitleNode = useMemo(() => {
        if (typeof subtitle === 'string') {
          return (
            <Text color="fgMuted" font="legal" numberOfLines={1}>
              {subtitle}
            </Text>
          );
        }
        return subtitle;
      }, [subtitle]);

      const thumbnailNode = useMemo(() => {
        // Handle new thumbnail prop (string URL or ReactNode)
        if (typeof thumbnail === 'string') {
          return (
            <Avatar
              alt={typeof title === 'string' ? title : undefined}
              name={typeof title === 'string' ? title : undefined}
              shape="circle"
              size="l"
              src={thumbnail}
            />
          );
        }
        if (thumbnail) return thumbnail;
        // Fallback to deprecated avatar prop
        if (typeof avatar === 'string') {
          return (
            <Avatar
              alt={typeof title === 'string' ? title : undefined}
              name={typeof title === 'string' ? title : undefined}
              shape="circle"
              size="l"
              src={avatar}
            />
          );
        }
        return avatar;
      }, [thumbnail, avatar, title]);

      return (
        <HStack
          ref={ref}
          alignItems="center"
          as={Component}
          className={cx(classNames?.root, className)}
          gap={gap}
          justifyContent="space-between"
          paddingTop={paddingTop}
          paddingX={paddingX}
          style={{ ...style, ...styles?.root }}
          {...props}
        >
          <HStack
            alignItems="center"
            className={classNames?.contentContainer}
            gap={1.5}
            style={styles?.contentContainer}
          >
            {thumbnailNode}
            <VStack
              className={classNames?.textContainer}
              flexGrow={1}
              justifyContent="flex-start"
              style={styles?.textContainer}
            >
              {titleNode}
              {subtitleNode}
            </VStack>
          </HStack>
          {actions}
        </HStack>
      );
    },
  ),
);
