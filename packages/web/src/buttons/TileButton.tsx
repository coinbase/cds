import React, { forwardRef, memo, useMemo } from 'react';
import { gutter } from '@coinbase/cds-common/tokens/sizing';
import { pictogramScaleMultiplier } from '@coinbase/cds-common/tokens/tile';
import type { IllustrationPictogramNames } from '@coinbase/cds-common/types';
import { isDevelopment } from '@coinbase/cds-utils';

import type { Polymorphic } from '../core/polymorphism';
import { useComponentConfig } from '../hooks/useComponentConfig';
import type { PictogramName } from '../illustrations/Pictogram';
import { Pictogram } from '../illustrations/Pictogram';
import { Pressable, type PressableBaseProps } from '../system/Pressable';

import { Tile, type TileBaseProps } from './Tile';

export const tileButtonDefaultElement = 'button';

export type TileButtonDefaultElement = typeof tileButtonDefaultElement;

export type TileButtonBaseProps = Polymorphic.ExtendableProps<
  Omit<PressableBaseProps, 'noScaleOnPress' | 'loading' | 'children'>,
  TileBaseProps & {
    /** Name of illustration as defined in Figma */
    pictogram?: IllustrationPictogramNames;
  }
>;
export type TileButtonProps<AsComponent extends React.ElementType> = Polymorphic.Props<
  AsComponent,
  TileButtonBaseProps
>;

type TileButtonComponent = (<AsComponent extends React.ElementType = TileButtonDefaultElement>(
  props: TileButtonProps<AsComponent>,
) => Polymorphic.ReactReturn) &
  Polymorphic.ReactNamed;

export const TileButton: TileButtonComponent = memo(
  forwardRef<React.ReactElement<TileButtonBaseProps>, TileButtonBaseProps>(
    <AsComponent extends React.ElementType>(
      _props: TileButtonProps<AsComponent>,
      ref?: Polymorphic.Ref<AsComponent>,
    ) => {
      const mergedProps = useComponentConfig('TileButton', _props);
      const { as, pictogram, title, count, children, showOverflow, ...props } = mergedProps;
      const Component = (as ?? tileButtonDefaultElement) satisfies React.ElementType;

      if (isDevelopment() && title.trim() === '') {
        console.warn(
          'Setting an empty title in TileButton violates accessibility and CDS usage guidelines.',
        );
      }

      const content = useMemo(
        () =>
          children || (
            <Pictogram
              name={pictogram as PictogramName}
              scaleMultiplier={pictogramScaleMultiplier}
            />
          ),
        [children, pictogram],
      );

      return (
        <div
          style={{
            height: 'var(--controlSize-tileSize)',
            /* add gutter to account for the border added by Pressable */
            width: `calc(var(--controlSize-tileSize) + ${gutter}px)`,
          }}
        >
          <Pressable
            ref={ref}
            noScaleOnPress
            transparentWhileInactive
            as={Component}
            background="bg"
            borderRadius={400}
            {...props}
          >
            <Tile count={count} showOverflow={showOverflow} title={title}>
              {content}
            </Tile>
          </Pressable>
        </div>
      );
    },
  ),
);
