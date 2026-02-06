import React, { memo, useMemo } from 'react';

import { Box } from '../../layout';
import { HStack } from '../../layout/HStack';
import { VStack } from '../../layout/VStack';
import { Text } from '../../typography/Text';

export type MediaCardLayoutBaseProps = {
  /** Text or React node to display as the card title. Use a Text component to override default color and font. */
  title?: React.ReactNode;
  /** Text or React node to display as the card subtitle. Use a Text component to override default color and font. */
  subtitle?: React.ReactNode;
  /** Text or React node to display as the card description. Use a Text component to override default color and font. */
  description?: React.ReactNode;
  /** React node to display as a thumbnail in the content area. */
  thumbnail: React.ReactNode;
  /** React node to display as the main media content. When provided, it will be rendered in a Box container taking up 50% of the card width. */
  media?: React.ReactNode;
  /** The position of the media within the card.
   * @default 'end'
   */
  mediaPlacement?: 'start' | 'end';
};

export type MediaCardLayoutProps = MediaCardLayoutBaseProps & {
  classNames?: {
    layoutContainer?: string;
    contentContainer?: string;
    textContainer?: string;
    headerContainer?: string;
    mediaContainer?: string;
  };
  styles?: {
    layoutContainer?: React.CSSProperties;
    contentContainer?: React.CSSProperties;
    textContainer?: React.CSSProperties;
    headerContainer?: React.CSSProperties;
    mediaContainer?: React.CSSProperties;
  };
};

export const MediaCardLayout = memo(
  ({
    title,
    subtitle,
    description,
    thumbnail,
    media,
    mediaPlacement = 'end',
    classNames = {},
    styles = {},
  }: MediaCardLayoutProps) => {
    const titleNode = useMemo(() => {
      if (typeof title === 'string') {
        return (
          <Text as="div" font="headline" numberOfLines={2}>
            {title}
          </Text>
        );
      }
      return title;
    }, [title]);

    const subtitleNode = useMemo(
      () =>
        typeof subtitle === 'string' ? (
          <Text as="div" color="fgMuted" font="legal" numberOfLines={1}>
            {subtitle}
          </Text>
        ) : (
          subtitle
        ),
      [subtitle],
    );

    const headerNode = useMemo(
      () => (
        <VStack className={classNames?.headerContainer} style={styles?.headerContainer}>
          {subtitleNode}
          {titleNode}
        </VStack>
      ),
      [subtitleNode, titleNode, styles?.headerContainer, classNames?.headerContainer],
    );

    const descriptionNode = useMemo(
      () =>
        typeof description === 'string' ? (
          <Text as="p" color="fgMuted" font="label2" numberOfLines={2}>
            {description}
          </Text>
        ) : (
          description
        ),
      [description],
    );

    const contentNode = useMemo(
      () => (
        <VStack
          className={classNames?.contentContainer}
          flexBasis="50%"
          gap={4}
          justifyContent="space-between"
          padding={2}
          style={styles?.contentContainer}
        >
          {thumbnail}
          <VStack className={classNames?.textContainer} style={styles?.textContainer}>
            {headerNode}
            {descriptionNode}
          </VStack>
        </VStack>
      ),
      [
        thumbnail,
        headerNode,
        descriptionNode,
        styles?.contentContainer,
        classNames?.contentContainer,
        classNames?.textContainer,
        styles?.textContainer,
      ],
    );

    const mediaNode = useMemo(() => {
      if (media) {
        return (
          <Box
            className={classNames?.mediaContainer}
            flexBasis="50%"
            style={styles?.mediaContainer}
          >
            {media}
          </Box>
        );
      }
    }, [media, styles?.mediaContainer, classNames?.mediaContainer]);

    return (
      <HStack className={classNames?.layoutContainer} flexGrow={1} style={styles?.layoutContainer}>
        {mediaPlacement === 'start' ? mediaNode : contentNode}
        {mediaPlacement === 'end' ? mediaNode : contentNode}
      </HStack>
    );
  },
);
