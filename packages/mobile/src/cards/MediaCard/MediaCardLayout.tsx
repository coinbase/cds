import React, { memo, useMemo } from 'react';

import { type BoxBaseProps } from '../../layout';
import { HStack } from '../../layout/HStack';
import { VStack } from '../../layout/VStack';
import { Tag, type TagBaseProps } from '../../tag/Tag';
import { CardDescription, type CardDescriptionProps } from '../CardDescription';
import { CardSubtitle, type CardSubtitleProps } from '../CardSubtitle';
import { CardTitle, type CardTitleProps } from '../CardTitle';

export type MediaCardOverrides = {
  layoutContainer?: Omit<BoxBaseProps, 'children'>;
  contentContainer?: Omit<BoxBaseProps, 'children'>;
  textContainer?: Omit<BoxBaseProps, 'children'>;
  headerContainer?: Omit<BoxBaseProps, 'children'>;
  title?: Omit<CardTitleProps, 'children'>;
  subtitle?: Omit<CardSubtitleProps, 'children'>;
  description?: Omit<CardDescriptionProps, 'children'>;
  tag?: Omit<TagBaseProps, 'children'>;
  mediaContainer?: Omit<BoxBaseProps, 'children'>;
};

export type MediaCardLayoutProps = {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  description?: React.ReactNode;
  thumbnail?: React.ReactNode;
  media?: React.ReactNode;
  tag?: React.ReactNode;
  overrides?: MediaCardOverrides;
};

const MediaCardLayout = memo(
  ({
    title,
    subtitle,
    description,
    thumbnail,
    media,
    tag,
    overrides = {},
  }: MediaCardLayoutProps) => {
    const titleNode = useMemo(() => {
      if (typeof title === 'string') {
        return <CardTitle {...overrides.title}>{title}</CardTitle>;
      }
      return title;
    }, [overrides.title, title]);

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
        <VStack {...overrides.headerContainer}>
          {subtitleNode}
          {titleNode}
        </VStack>
      ),
      [subtitleNode, titleNode, overrides.headerContainer],
    );

    const descriptionNode = useMemo(
      () =>
        typeof description === 'string' ? (
          <CardDescription {...overrides.description}>{description}</CardDescription>
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
          <HStack flexBasis="50%" {...overrides?.mediaContainer}>
            {media}
          </HStack>
        )}
        {tagNode}
      </HStack>
    );
  },
);

export { MediaCardLayout };
