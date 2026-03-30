import { forwardRef, memo, useCallback, useMemo } from 'react';
import type { PressableStateCallbackType, StyleProp, View, ViewStyle } from 'react-native';
import type { ThemeVars } from '@coinbase/cds-common';

import { CardRoot, type CardRootProps } from '../CardRoot';

import { MediaCardLayout, type MediaCardLayoutProps } from './MediaCardLayout';

export type MediaCardBaseProps = MediaCardLayoutProps;

export type MediaCardProps = MediaCardBaseProps &
  Omit<CardRootProps, 'children'> & {
    styles?: {
      /** Root element */
      root?: StyleProp<ViewStyle>;
    };
  };

const mediaCardContainerProps = {
  borderRadius: 500 as ThemeVars.BorderRadius,
  background: 'bgAlternate' as ThemeVars.Color,
  overflow: 'hidden' as const,
};

export const MediaCard = memo(
  forwardRef<View, MediaCardProps>(
    (
      {
        title,
        subtitle,
        description,
        thumbnail,
        media,
        mediaPlacement = 'end',
        style,
        styles: { root: rootStyle, ...layoutStyles } = {},
        ...props
      },
      ref,
    ) => {
      return (
        <CardRoot ref={ref} {...mediaCardContainerProps} style={[style, rootStyle]} {...props}>
          <MediaCardLayout
            description={description}
            media={media}
            mediaPlacement={mediaPlacement}
            styles={layoutStyles}
            subtitle={subtitle}
            thumbnail={thumbnail}
            title={title}
          />
        </CardRoot>
      );
    },
  ),
);

MediaCard.displayName = 'MediaCard';
