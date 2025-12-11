import React, { memo, useMemo } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

import { HStack } from '../../layout/HStack';
import { VStack } from '../../layout/VStack';
import { Text } from '../../typography/Text';

export type MediaCardLayoutBaseProps = {
  /** Text or React node to display as the card title. When a string is provided, it will be rendered in a CardTitle component. */
  title?: React.ReactNode;
  /** Text or React node to display as the card subtitle. When a string is provided, it will be rendered in a CardSubtitle component. */
  subtitle?: React.ReactNode;
  /** Text or React node to display as the card description. When a string is provided, it will be rendered in a CardDescription component. */
  description?: React.ReactNode;
  /** React node to display as a thumbnail in the content area. */
  thumbnail: React.ReactNode;
  /** React node to display as the main media content. When provided, it will be rendered in an HStack container taking up 50% of the card width. */
  media?: React.ReactNode;
  /** The position of the media within the card. */
  mediaPlacement?: 'start' | 'end';
};

export type MediaCardLayoutProps = MediaCardLayoutBaseProps & {
  styles?: {
    layoutContainer?: StyleProp<ViewStyle>;
    contentContainer?: StyleProp<ViewStyle>;
    textContainer?: StyleProp<ViewStyle>;
    headerContainer?: StyleProp<ViewStyle>;
    mediaContainer?: StyleProp<ViewStyle>;
  };
};

const MediaCardLayout = memo(
  ({
    title,
    subtitle,
    description,
    thumbnail,
    media,
    mediaPlacement = 'end',
    styles = {},
  }: MediaCardLayoutProps) => {
    const titleNode = useMemo(() => {
      if (typeof title === 'string') {
        return (
          <Text font="headline" numberOfLines={1}>
            {title}
          </Text>
        );
      }
      return title;
    }, [title]);

    const subtitleNode = useMemo(
      () =>
        typeof subtitle === 'string' ? (
          <Text color="fgMuted" font="legal" numberOfLines={1}>
            {subtitle}
          </Text>
        ) : (
          subtitle
        ),
      [subtitle],
    );

    const headerNode = useMemo(
      () => (
        <VStack style={styles?.headerContainer}>
          {subtitleNode}
          {titleNode}
        </VStack>
      ),
      [subtitleNode, titleNode, styles?.headerContainer],
    );

    const descriptionNode = useMemo(
      () =>
        typeof description === 'string' ? (
          <Text color="fgMuted" font="label2" numberOfLines={2}>
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
          flexBasis="50%"
          gap={4}
          justifyContent="space-between"
          padding={2}
          style={styles?.contentContainer}
        >
          {thumbnail}
          <VStack style={styles?.textContainer}>
            {headerNode}
            {descriptionNode}
          </VStack>
        </VStack>
      ),
      [styles?.contentContainer, styles?.textContainer, thumbnail, headerNode, descriptionNode],
    );

    const mediaNode = useMemo(() => {
      if (media) {
        return (
          <HStack flexBasis="50%" style={styles?.mediaContainer}>
            {media}
          </HStack>
        );
      }
    }, [media, styles?.mediaContainer]);

    return (
      <HStack flexGrow={1} style={styles?.layoutContainer}>
        {mediaPlacement === 'start' ? mediaNode : contentNode}
        {mediaPlacement === 'end' ? mediaNode : contentNode}
      </HStack>
    );
  },
);

export { MediaCardLayout };
