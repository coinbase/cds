import React, { forwardRef, memo } from 'react';
import { css } from '@linaria/core';

import type { Polymorphic } from '../core/polymorphism';
import { cx } from '../cx';
import { Avatar, type AvatarBaseProps } from '../media';
import { Pressable, type PressableBaseProps } from '../system';

import type { ButtonBaseProps } from './Button';

export const avatarButtonDefaultElement = 'button';

type DeprecatedAvatarButtonBorderProps = {
  /** @deprecated Border props on `AvatarButton` have no effect and will be removed in a future major release. */
  borderBottomLeftRadius?: PressableBaseProps['borderBottomLeftRadius'];
  /** @deprecated Border props on `AvatarButton` have no effect and will be removed in a future major release. */
  borderBottomRightRadius?: PressableBaseProps['borderBottomRightRadius'];
  /** @deprecated Border props on `AvatarButton` have no effect and will be removed in a future major release. */
  borderTopLeftRadius?: PressableBaseProps['borderTopLeftRadius'];
  /** @deprecated Border props on `AvatarButton` have no effect and will be removed in a future major release. */
  borderTopRightRadius?: PressableBaseProps['borderTopRightRadius'];
  /** @deprecated Border props on `AvatarButton` have no effect and will be removed in a future major release. */
  borderRadius?: PressableBaseProps['borderRadius'];
  /** @deprecated Border props on `AvatarButton` have no effect and will be removed in a future major release. */
  borderWidth?: PressableBaseProps['borderWidth'];
  /** @deprecated Border props on `AvatarButton` have no effect and will be removed in a future major release. */
  borderTopWidth?: PressableBaseProps['borderTopWidth'];
  /** @deprecated Border props on `AvatarButton` have no effect and will be removed in a future major release. */
  borderEndWidth?: PressableBaseProps['borderEndWidth'];
  /** @deprecated Border props on `AvatarButton` have no effect and will be removed in a future major release. */
  borderBottomWidth?: PressableBaseProps['borderBottomWidth'];
  /** @deprecated Border props on `AvatarButton` have no effect and will be removed in a future major release. */
  borderStartWidth?: PressableBaseProps['borderStartWidth'];
  /** @deprecated Border props on `AvatarButton` have no effect and will be removed in a future major release. */
  bordered?: PressableBaseProps['bordered'];
  /** @deprecated Border props on `AvatarButton` have no effect and will be removed in a future major release. */
  borderedBottom?: PressableBaseProps['borderedBottom'];
  /** @deprecated Border props on `AvatarButton` have no effect and will be removed in a future major release. */
  borderedEnd?: PressableBaseProps['borderedEnd'];
  /** @deprecated Border props on `AvatarButton` have no effect and will be removed in a future major release. */
  borderedHorizontal?: PressableBaseProps['borderedHorizontal'];
  /** @deprecated Border props on `AvatarButton` have no effect and will be removed in a future major release. */
  borderedStart?: PressableBaseProps['borderedStart'];
  /** @deprecated Border props on `AvatarButton` have no effect and will be removed in a future major release. */
  borderedTop?: PressableBaseProps['borderedTop'];
  /** @deprecated Border props on `AvatarButton` have no effect and will be removed in a future major release. */
  borderedVertical?: PressableBaseProps['borderedVertical'];
};

export type AvatarButtonDefaultElement = typeof avatarButtonDefaultElement;

export type AvatarButtonBaseProps = Polymorphic.ExtendableProps<
  Omit<PressableBaseProps, 'children'>,
  DeprecatedAvatarButtonBorderProps &
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
