import React, { forwardRef, memo } from 'react';
import { css } from '@linaria/core';

import type { Polymorphic } from '../core/polymorphism';
import { cx } from '../cx';
import { Avatar, type AvatarBaseProps } from '../media';
import { Pressable, type PressableBaseProps } from '../system';

import type { ButtonBaseProps } from './Button';

export const avatarButtonDefaultElement = 'button';

// Avatar is opinioned on border styles, so Pressable's border props will have no effect
// see CDS-1611
type BorderProps = Pick<
  PressableBaseProps,
  | 'borderBottomLeftRadius'
  | 'borderBottomRightRadius'
  | 'borderTopLeftRadius'
  | 'borderTopRightRadius'
  | 'borderRadius'
  | 'borderColor'
  | 'borderWidth'
  | 'borderTopWidth'
  | 'borderEndWidth'
  | 'borderBottomWidth'
  | 'borderStartWidth'
  | 'bordered'
  | 'borderedBottom'
  | 'borderedEnd'
  | 'borderedHorizontal'
  | 'borderedStart'
  | 'borderedTop'
  | 'borderedVertical'
>;

export type AvatarButtonDefaultElement = typeof avatarButtonDefaultElement;

export type AvatarButtonBaseProps = Polymorphic.ExtendableProps<
  Omit<PressableBaseProps, 'children' | keyof BorderProps>,
  Pick<ButtonBaseProps, 'compact'> &
    Pick<
      AvatarBaseProps,
      'alt' | 'src' | 'colorScheme' | 'shape' | 'borderColor' | 'name' | 'selected'
    >
>;

export type AvatarButtonProps<AsComponent extends React.ElementType> = Polymorphic.Props<
  AsComponent,
  AvatarButtonBaseProps
>;

type AvatarButtonComponent = (<AsComponent extends React.ElementType = AvatarButtonDefaultElement>(
  props: AvatarButtonProps<AsComponent>,
) => Polymorphic.ReactReturn) &
  Polymorphic.ReactNamed;

const baseCss = css`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: unset;
`;

export const AvatarButton: AvatarButtonComponent = memo(
  forwardRef<React.ReactElement<AvatarButtonBaseProps>, AvatarButtonBaseProps>(
    <AsComponent extends React.ElementType>(
      {
        accessibilityLabel,
        as,
        className,
        alt,
        src,
        compact,
        colorScheme,
        shape,
        borderColor,
        selected,
        name,
        ...props
      }: AvatarButtonProps<AsComponent>,
      ref?: Polymorphic.Ref<AsComponent>,
    ) => {
      const Component = (as ?? avatarButtonDefaultElement) satisfies React.ElementType;

      return (
        <Pressable
          ref={ref}
          aria-label={accessibilityLabel}
          as={Component}
          background="transparent"
          borderWidth={0} // remove Pressable's default transparent border
          className={cx(baseCss, className)}
          {...props}
        >
          <Avatar
            alt={alt}
            borderColor={borderColor}
            colorScheme={colorScheme}
            name={name}
            selected={selected}
            shape={shape}
            size={compact ? 'xl' : 'xxxl'}
            src={src}
          />
        </Pressable>
      );
    },
  ),
);
