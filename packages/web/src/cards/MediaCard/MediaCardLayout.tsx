import React, { memo, useMemo } from 'react';

import { Box, type BoxBaseProps } from '../../layout';
import { HStack, type HStackBaseProps } from '../../layout/HStack';
import { VStack, type VStackBaseProps } from '../../layout/VStack';
import { Tag, type TagBaseProps } from '../../tag/Tag';
import { CardDescription, type CardDescriptionBaseProps } from '../CardDescription';
import { CardSubtitle, type CardSubtitleBaseProps } from '../CardSubtitle';
import { CardTitle, type CardTitleBaseProps } from '../CardTitle';

export type CardOverrides = {
  layoutContainer?: Omit<HStackBaseProps, 'children'>;
  contentContainer?: Omit<VStackBaseProps, 'children'>;
  textContainer?: Omit<VStackBaseProps, 'children'>;
  headerContainer?: Omit<VStackBaseProps, 'children'>;
  title?: Omit<CardTitleBaseProps, 'children'>;
  subtitle?: Omit<CardSubtitleBaseProps, 'children'>;
  description?: Omit<CardDescriptionBaseProps, 'children'>;
  tag?: Omit<TagBaseProps, 'children'>;
  mediaContainer?: Omit<BoxBaseProps, 'children'>;
};

type MediaCardLayoutProps = {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  description?: React.ReactNode;
  thumbnail?: React.ReactNode;
  media?: React.ReactNode;
  tag?: React.ReactNode;
  actionable?: boolean;
  overrides?: CardOverrides;
};

export const MediaCardLayout = memo(
  ({
    title,
    subtitle,
    description,
    thumbnail,
    media,
    tag,
    actionable = false,
    overrides = {},
  }: MediaCardLayoutProps) => {
    const titleNode = useMemo(() => {
      if (typeof title === 'string') {
        return (
          <CardTitle as={actionable ? 'p' : 'h3'} {...overrides.title}>
            {title}
          </CardTitle>
        );
      }
      return title;
    }, [actionable, overrides.title, title]);

    const subtitleNode = useMemo(
      () =>
        typeof subtitle === 'string' ? (
          <CardSubtitle {...overrides.subtitle}>{subtitle}</CardSubtitle>
        ) : (
          subtitle
        ),
      [overrides?.subtitle, subtitle],
    );

    const headerNode = useMemo(
      () => (
        <VStack as={actionable ? undefined : 'header'} {...overrides.headerContainer}>
          {subtitleNode}
          {titleNode}
        </VStack>
      ),
      [actionable, subtitleNode, titleNode, overrides.headerContainer],
    );

    const descriptionNode = useMemo(
      () =>
        typeof description === 'string' ? (
          <CardDescription color="fgMuted" {...overrides.description}>
            {description}
          </CardDescription>
        ) : (
          description
        ),
      [overrides.description, description],
    );

    const tagNode = useMemo(
      () =>
        typeof tag === 'string' ? (
          <Tag position="absolute" right={20} top={16} {...overrides.tag}>
            {tag}
          </Tag>
        ) : (
          tag
        ),
      [overrides.tag, tag],
    );

    return (
      <HStack flexGrow={1} position="relative" {...overrides?.layoutContainer}>
        <VStack
          flexBasis="50%"
          gap={4}
          justifyContent="space-between"
          padding={2}
          {...overrides?.contentContainer}
        >
          {thumbnail}
          <VStack {...overrides?.textContainer}>
            {headerNode}
            {descriptionNode}
          </VStack>
        </VStack>
        {media && (
          <Box flexBasis="50%" {...overrides?.mediaContainer}>
            {media}
          </Box>
        )}
        {tagNode}
      </HStack>
    );
  },
);

MediaCardLayout.displayName = 'MediaCardLayout';
