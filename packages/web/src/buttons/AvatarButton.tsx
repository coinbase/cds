import React, { forwardRef, memo, useMemo } from 'react';
import { interactableHeight } from '@coinbase/cds-common/tokens/interactableHeight';
import { css } from '@linaria/core';

import type { Polymorphic } from '../core/polymorphism';
import { cx } from '../cx';
import { useComponentConfig } from '../hooks/useComponentConfig';
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
  width: var(--interactable-height);
  height: var(--interactable-height);
  min-width: unset;
`;

export const AvatarButton: AvatarButtonComponent = memo(
  forwardRef<React.ReactElement<AvatarButtonBaseProps>, AvatarButtonBaseProps>(
    <AsComponent extends React.ElementType>(
      _props: AvatarButtonProps<AsComponent>,
      ref?: Polymorphic.Ref<AsComponent>,
    ) => {
      const mergedProps = useComponentConfig('AvatarButton', _props);
      const {
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
      } = mergedProps;
      const Component = (as ?? avatarButtonDefaultElement) satisfies React.ElementType;

      const height = compact ? interactableHeight.compact : interactableHeight.regular;
      const styles = useMemo(
        () => ({ '--interactable-height': `${height}px` }) as React.CSSProperties,
        [height],
      );

      return (
        <Pressable
          ref={ref}
          aria-label={accessibilityLabel}
          as={Component}
          background="transparent"
          className={cx(baseCss, className)}
          style={styles}
          {...props}
        >
          <Avatar
            alt={alt}
            colorScheme={colorScheme}
            dangerouslySetSize={height}
            name={name}
            selected={selected}
            shape={shape}
            src={src}
          />
        </Pressable>
      );
    },
  ),
);
