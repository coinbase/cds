import { forwardRef, memo } from 'react';
import type { View } from 'react-native';
import type { ThemeVars } from '@coinbase/cds-common';

import { CardRoot, type CardRootProps } from '../CardRoot';

import { MediaCardLayout, type MediaCardLayoutProps } from './MediaCardLayout';

export type MediaCardBaseProps = MediaCardLayoutProps;

export type MediaCardProps = Omit<CardRootProps, 'children'> & MediaCardBaseProps;

const mediaCardContainerProps = {
  borderRadius: 500 as ThemeVars.BorderRadius,
  background: 'bgAlternate' as ThemeVars.Color,
  overflow: 'hidden' as const,
};

export const MediaCard = memo(
  forwardRef<View, MediaCardProps>(
    (
      { title, subtitle, description, thumbnail, media, tag, actionable, overrides = {}, ...props },
      ref,
    ) => (
      <CardRoot ref={ref} actionable={actionable} {...mediaCardContainerProps} {...props}>
        <MediaCardLayout
          description={description}
          media={media}
          overrides={overrides}
          subtitle={subtitle}
          tag={tag}
          thumbnail={thumbnail}
          title={title}
        />
      </CardRoot>
    ),
  ),
);

MediaCard.displayName = 'MediaCard';
