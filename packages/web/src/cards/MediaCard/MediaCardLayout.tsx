import React, { memo, useMemo } from 'react';

import { Box, type BoxBaseProps } from '../../layout';
import { HStack, type HStackBaseProps } from '../../layout/HStack';
import { VStack, type VStackBaseProps } from '../../layout/VStack';
import { Tag, type TagBaseProps } from '../../tag/Tag';
import { CardDescription, type CardDescriptionBaseProps } from '../CardDescription';
import { CardSubtitle, type CardSubtitleBaseProps } from '../CardSubtitle';
import { CardTitle, type CardTitleBaseProps } from '../CardTitle';

export type MediaCardSlotProps = {
  /** Props to pass to the root layout container (HStack). */
  layoutContainer?: Omit<HStackBaseProps, 'children'>;
  /** Props to pass to the content container (VStack) that wraps thumbnail and text content. */
  contentContainer?: Omit<VStackBaseProps, 'children'>;
  /** Props to pass to the text container (VStack) that wraps header and description. */
  textContainer?: Omit<VStackBaseProps, 'children'>;
  /** Props to pass to the header container (VStack) that wraps subtitle and title. */
  headerContainer?: Omit<VStackBaseProps, 'children'>;
  /** Props to pass to the CardTitle component. */
  title?: Omit<CardTitleBaseProps, 'children'>;
  /** Props to pass to the CardSubtitle component. */
  subtitle?: Omit<CardSubtitleBaseProps, 'children'>;
  /** Props to pass to the CardDescription component. */
  description?: Omit<CardDescriptionBaseProps, 'children'>;
  /** Props to pass to the Tag component. */
  tag?: Omit<TagBaseProps, 'children'>;
  /** Props to pass to the media container (Box) that wraps the media content. */
  mediaContainer?: Omit<BoxBaseProps, 'children'>;
};

export type MediaCardLayoutProps = {
  /** Text or React node to display as the card title. When a string is provided, it will be rendered in a CardTitle component. */
  title?: React.ReactNode;
  /** Text or React node to display as the card subtitle. When a string is provided, it will be rendered in a CardSubtitle component. */
  subtitle?: React.ReactNode;
  /** Text or React node to display as the card description. When a string is provided, it will be rendered in a CardDescription component. */
  description?: React.ReactNode;
  /** React node to display as a thumbnail in the content area. */
  thumbnail?: React.ReactNode;
  /** React node to display as the main media content. When provided, it will be rendered in a Box container taking up 50% of the card width. */
  media?: React.ReactNode;
  /** Text or React node to display as a tag. When a string is provided, it will be rendered in a Tag component positioned absolutely in the top-right corner. */
  tag?: React.ReactNode;
  /** Props to customize sub-components and containers within the MediaCard layout. */
  slotProps?: MediaCardSlotProps;
};

export const MediaCardLayout = memo(
  ({
    title,
    subtitle,
    description,
    thumbnail,
    media,
    tag,
    slotProps = {},
  }: MediaCardLayoutProps) => {
    const titleNode = useMemo(() => {
      if (typeof title === 'string') {
        return (
          <CardTitle as="h3" {...slotProps.title}>
            {title}
          </CardTitle>
        );
      }
      return title;
    }, [slotProps.title, title]);

    const subtitleNode = useMemo(
      () =>
        typeof subtitle === 'string' ? (
          <CardSubtitle {...slotProps.subtitle}>{subtitle}</CardSubtitle>
        ) : (
          subtitle
        ),
      [slotProps?.subtitle, subtitle],
    );

    const headerNode = useMemo(
      () => (
        <VStack as="header" {...slotProps.headerContainer}>
          {subtitleNode}
          {titleNode}
        </VStack>
      ),
      [subtitleNode, titleNode, slotProps.headerContainer],
    );

    const descriptionNode = useMemo(
      () =>
        typeof description === 'string' ? (
          <CardDescription color="fgMuted" {...slotProps.description}>
            {description}
          </CardDescription>
        ) : (
          description
        ),
      [slotProps.description, description],
    );

    const tagNode = useMemo(
      () =>
        typeof tag === 'string' ? (
          <Tag position="absolute" right={20} top={16} {...slotProps.tag}>
            {tag}
          </Tag>
        ) : (
          tag
        ),
      [slotProps.tag, tag],
    );

    return (
      <HStack flexGrow={1} position="relative" {...slotProps?.layoutContainer}>
        <VStack
          flexBasis="50%"
          gap={4}
          justifyContent="space-between"
          padding={2}
          {...slotProps?.contentContainer}
        >
          {thumbnail}
          <VStack {...slotProps?.textContainer}>
            {headerNode}
            {descriptionNode}
          </VStack>
        </VStack>
        {media && (
          <Box flexBasis="50%" {...slotProps?.mediaContainer}>
            {media}
          </Box>
        )}
        {tagNode}
      </HStack>
    );
  },
);
