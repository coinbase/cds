import React, { forwardRef, memo } from 'react';
import { css } from '@linaria/core';

import type { Polymorphic } from '../core/polymorphism';
import { cx } from '../cx';
import { Avatar, type AvatarBaseProps } from '../media';
import { Pressable, type PressableBaseProps } from '../system';

import type { ButtonBaseProps } from './Button';

export const avatarButtonDefaultElement = 'button';

export type AvatarButtonDefaultElement = typeof avatarButtonDefaultElement;

export type AvatarButtonBaseProps = Polymorphic.ExtendableProps<
  Omit<PressableBaseProps, 'children'>,
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

// fixed sizes to match the child avatar size
// without this, the button's border-box sizing would add default 1px border around the avatar's inherent size
const compactCss = css`
  width: var(--avatarSize-xl);
  height: var(--avatarSize-xl);
`;

const regularCss = css`
  width: var(--avatarSize-xxxl);
  height: var(--avatarSize-xxxl);
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
          className={cx(baseCss, className, compact ? compactCss : regularCss)}
          {...props}
        >
          <Avatar
            alt={alt}
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
