import React, { forwardRef, memo, useMemo } from 'react';
import type { StyleProp, View, ViewStyle } from 'react-native';
import { type SharedProps } from '@coinbase/cds-common/types';

import type { VStackProps } from '../../layout';
import { Box, VStack } from '../../layout';
import { Text } from '../../typography/Text';

const mapMediaPositionToMediaPlacement: Record<
  'top' | 'bottom' | 'right' | 'left',
  'top' | 'bottom' | 'start' | 'end'
> = {
  top: 'top',
  bottom: 'bottom',
  right: 'end',
  left: 'start',
};

export type ContentCardBodyBaseProps = SharedProps & {
  /** Text or React node to display as the card title. Use a Text component to override default color and font. */
  title?: React.ReactNode;
  /**
   * @deprecated Use description instead
   * Main body copy
   */
  body?: React.ReactNode;
  /** Text or React node to display as the card description. Use a Text component to override default color and font. */
  description?: React.ReactNode;
  /**
   * @deprecated Use a ReactNode as `description` instead if you need to display content below the description.
   * Use for supplemental data.
   */
  label?: React.ReactNode;
  /** React node to display as media content (e.g., Image or RemoteImage). */
  media?: React.ReactNode;
  /**
   * @deprecated Use mediaPlacement instead
   * The position of the media within the card.
   * Can be one of: 'top', 'bottom', 'right' or 'left'.
   */
  mediaPosition?: 'top' | 'bottom' | 'right' | 'left';
  /** Placement of the media content relative to the text content.
   * @default 'top'
   */
  mediaPlacement?: 'top' | 'bottom' | 'start' | 'end';
  /**
   * Custom content to display below the main content box (title/description/media).
   * Use this when you need to render custom content that doesn't fit the standard media/title/description layout.
   */
  children?: React.ReactNode;
  styles?: {
    /**
     * Root container style (wrapper around the content container + children)
     */
    root?: StyleProp<ViewStyle>;
    /**
     * Container for the content (media + text content)
     */
    contentContainer?: StyleProp<ViewStyle>;
    /**
     * Container for the text content (title + description + label)
     */
    textContainer?: StyleProp<ViewStyle>;
    /**
     * Container for the media
     */
    mediaContainer?: StyleProp<ViewStyle>;
  };
};

export type ContentCardBodyProps = ContentCardBodyBaseProps & VStackProps;

export const ContentCardBody = memo(
  forwardRef(function ContentCardBody(
    {
      body,
      label,
      media,
      mediaPosition = 'top',
      mediaPlacement = mapMediaPositionToMediaPlacement[mediaPosition],
      title,
      description = body,
      children,
      gap = 1,
      testID,
      style,
      styles,
      ...props
    }: ContentCardBodyProps,
    ref: React.ForwardedRef<View>,
  ) {
    const hasMedia = !!media;
    const isHorizontal = mediaPlacement === 'start' || mediaPlacement === 'end';
    const isMediaFirst = hasMedia && (mediaPlacement === 'top' || mediaPlacement === 'start');
    const isMediaLast = hasMedia && (mediaPlacement === 'bottom' || mediaPlacement === 'end');

    const titleNode = useMemo(() => {
      if (typeof title === 'string') {
        return (
          <Text font="headline" numberOfLines={2}>
            {title}
          </Text>
        );
      }
      return title;
    }, [title]);

    const descriptionNode = useMemo(() => {
      if (typeof description === 'string') {
        return (
          <Text color="fgMuted" font="label2" numberOfLines={3}>
            {description}
          </Text>
        );
      }
      return description;
    }, [description]);

    const labelNode = useMemo(() => {
      if (typeof label === 'string') {
        return <Text font="label2">{label}</Text>;
      }
      return label;
    }, [label]);

    const textNode = useMemo(() => {
      if (!titleNode && !descriptionNode && !labelNode) {
        return null;
      }
      return (
        <VStack flexShrink={1} gap={isHorizontal ? 1 : 0} style={styles?.textContainer}>
          {titleNode}
          {descriptionNode}
          {labelNode}
        </VStack>
      );
    }, [titleNode, descriptionNode, labelNode, isHorizontal, styles?.textContainer]);

    const mediaBox = isHorizontal ? (
      <Box
        borderRadius={500}
        flexShrink={0}
        height={96}
        overflow="hidden"
        style={styles?.mediaContainer}
        width={96}
      >
        {media}
      </Box>
    ) : (
      <Box borderRadius={500} overflow="hidden">
        {media}
      </Box>
    );

    return (
      <VStack ref={ref} gap={gap} style={[styles?.root, style]} testID={testID} {...props}>
        {(mediaBox || textNode) && (
          <Box
            flexDirection={isHorizontal ? 'row' : 'column'}
            gap={isHorizontal ? 2 : 1}
            justifyContent={mediaPlacement === 'end' ? 'space-between' : 'flex-start'}
            style={styles?.contentContainer}
          >
            {isMediaFirst && mediaBox}
            {textNode}
            {isMediaLast && mediaBox}
          </Box>
        )}
        {children}
      </VStack>
    );
  }),
);
