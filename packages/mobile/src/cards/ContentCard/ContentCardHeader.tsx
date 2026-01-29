import React, { forwardRef, memo, useMemo } from 'react';
import type { StyleProp, View, ViewStyle } from 'react-native';
import type { SharedProps } from '@coinbase/cds-common/types';

import type { HStackProps } from '../../layout';
import { HStack, VStack } from '../../layout';
import { Avatar } from '../../media';
import { Text } from '../../typography/Text';

export type ContentCardHeaderBaseProps = SharedProps & {
  /** @deprecated Use `thumbnail` instead. `avatar` will be removed in a future major release. */
  avatar?: React.ReactNode;
  /** A media object like an image, avatar, illustration, or cryptocurrency asset. */
  thumbnail?: React.ReactNode;
  /** Text or React node to display as the header title. Use a Text component to override default color and font. */
  title: React.ReactNode;
  /** @deprecated Use `subtitle` instead. `meta` will be removed in a future major release. */
  meta?: React.ReactNode;
  /** Text or React node to display as the header subtitle. Use a Text component to override default color and font. */
  subtitle?: React.ReactNode;
  /** @deprecated Use `actions` instead. `end` will be removed in a future major release. */
  end?: React.ReactNode;
  /** Slot for action buttons. */
  actions?: React.ReactNode;
  styles?: {
    /**
     * Root container style
     */
    root?: StyleProp<ViewStyle>;
    /**
     * Container for the text content (title + subtitle)
     */
    textContainer?: StyleProp<ViewStyle>;
    /**
     * Container for the content (thumbnail + text content)
     */
    contentContainer?: StyleProp<ViewStyle>;
  };
};

export type ContentCardHeaderProps = ContentCardHeaderBaseProps & HStackProps;

export const ContentCardHeader = memo(
  forwardRef(function ContentCardHeader(
    {
      avatar,
      title,
      meta,
      end,
      subtitle = meta,
      actions = end,
      thumbnail,
      gap = 1.5,
      testID,
      styles,
      style,
      ...props
    }: ContentCardHeaderProps,
    ref: React.ForwardedRef<View>,
  ) {
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
      // Use new thumbnail prop if provided
      if (thumbnail) return thumbnail;
      // Fallback to deprecated avatar prop (supports string for backward compatibility)
      if (typeof avatar === 'string') {
        return (
          <Avatar
            accessibilityLabel={typeof title === 'string' ? title : undefined}
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
        gap={gap}
        justifyContent="space-between"
        style={[styles?.root, style]}
        testID={testID}
        {...props}
      >
        <HStack
          alignItems="center"
          flexGrow={1}
          flexShrink={1}
          gap={1.5}
          style={styles?.contentContainer}
        >
          {thumbnailNode}
          <VStack
            flexGrow={1}
            flexShrink={1}
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
  }),
);
