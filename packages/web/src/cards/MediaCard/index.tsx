import React, { forwardRef, memo } from 'react';
import type { ThemeVars } from '@coinbase/cds-common';

import type { Polymorphic } from '../../core/polymorphism';
import {
  CardRoot,
  type CardRootBaseProps,
  type NonActionableCardRootDefaultElement,
} from '../CardRoot';

import { type CardOverrides, MediaCardLayout } from './MediaCardLayout';

type MediaCardBaseProps = Polymorphic.ExtendableProps<
  Omit<CardRootBaseProps, 'children'>,
  {
    title?: React.ReactNode;
    subtitle?: React.ReactNode;
    description?: React.ReactNode;
    thumbnail?: React.ReactNode;
    media?: React.ReactNode;
    tag?: React.ReactNode;
    overrides?: CardOverrides;
  }
>;

export type MediaCardProps<
  AsComponent extends React.ElementType = NonActionableCardRootDefaultElement,
> = Polymorphic.Props<AsComponent, MediaCardBaseProps>;

const mediaCardContainerProps = {
  borderRadius: 500 as ThemeVars.BorderRadius,
  flexDirection: 'row' as const,
  background: 'bgAlternate' as ThemeVars.Color,
  overflow: 'hidden' as const,
};

type MediaCardComponent = (<
  AsComponent extends React.ElementType = NonActionableCardRootDefaultElement,
>(
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
        tag,
        overrides,
        children,
        actionable,
        as,
        ...props
      }: MediaCardProps<AsComponent>,
      ref?: Polymorphic.Ref<AsComponent>,
    ) => (
      <CardRoot
        ref={ref}
        actionable={actionable}
        as={as as React.ElementType}
        {...mediaCardContainerProps}
        {...props}
      >
        <MediaCardLayout
          actionable={!!props.actionable}
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

export { MediaCardLayout };
