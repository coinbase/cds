import React, { forwardRef, memo } from 'react';
import type { ThemeVars } from '@coinbase/cds-common';

import type { Polymorphic } from '../../core/polymorphism';
import { cx } from '../../cx';
import { CardRoot, type CardRootBaseProps } from '../CardRoot';

import { MediaCardLayout, type MediaCardLayoutProps } from './MediaCardLayout';

export type MediaCardBaseProps = Polymorphic.ExtendableProps<
  Omit<CardRootBaseProps, 'children'>,
  MediaCardLayoutProps & {
    classNames?: {
      root?: string;
    };
    styles?: {
      root?: React.CSSProperties;
    };
  }
>;

export type MediaCardProps<AsComponent extends React.ElementType = 'article'> = Polymorphic.Props<
  AsComponent,
  MediaCardBaseProps
>;

const mediaCardContainerProps = {
  borderRadius: 500 as ThemeVars.BorderRadius,
  flexDirection: 'row' as const,
  background: 'bgAlternate' as ThemeVars.Color,
  overflow: 'hidden' as const,
};

type MediaCardComponent = (<AsComponent extends React.ElementType = 'article'>(
  props: MediaCardProps<AsComponent>,
) => Polymorphic.ReactReturn) &
  Polymorphic.ReactNamed;

export const MediaCard: MediaCardComponent = memo(
  forwardRef<React.ReactElement<MediaCardBaseProps>, MediaCardBaseProps>(
    <AsComponent extends React.ElementType>(
      {
        title,
        subtitle,
        description,
        thumbnail,
        media,
        children,
        mediaPlacement = 'end',
        as,
        classNames: { root: rootClassName, ...layoutClassNames } = {},
        styles: { root: rootStyle, ...layoutStyles } = {},
        className,
        style,
        ...props
      }: MediaCardProps<AsComponent>,
      ref?: Polymorphic.Ref<AsComponent>,
    ) => (
      <CardRoot
        ref={ref}
        as={as as React.ElementType}
        className={cx(rootClassName, className)}
        style={{ ...rootStyle, ...style }}
        {...mediaCardContainerProps}
        {...props}
      >
        <MediaCardLayout
          classNames={layoutClassNames}
          description={description}
          media={media}
          mediaPlacement={mediaPlacement}
          styles={layoutStyles}
          subtitle={subtitle}
          thumbnail={thumbnail}
          title={title}
        />
      </CardRoot>
    ),
  ),
);
