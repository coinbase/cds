import React, { forwardRef, memo } from 'react';
import { css } from '@linaria/core';

import type { Polymorphic } from '../core/polymorphism';
import { cx } from '../cx';
import { useComponentConfig } from '../hooks/useComponentConfig';
import { Avatar, type AvatarBaseProps } from '../media';
import { Pressable, type PressableBaseProps } from '../system';

import type { ButtonBaseProps } from './Button';

export const avatarButtonDefaultElement = 'button';

type DeprecatedAvatarButtonBorderProps = {
  /**
   * @deprecated Border props on `AvatarButton` have no effect. This will be removed in a future major release.
   * @deprecationExpectedRemoval v10
   */
  borderBottomLeftRadius?: PressableBaseProps['borderBottomLeftRadius'];
  /**
   * @deprecated Border props on `AvatarButton` have no effect. This will be removed in a future major release.
   * @deprecationExpectedRemoval v10
   */
  borderBottomRightRadius?: PressableBaseProps['borderBottomRightRadius'];
  /**
   * @deprecated Border props on `AvatarButton` have no effect. This will be removed in a future major release.
   * @deprecationExpectedRemoval v10
   */
  borderTopLeftRadius?: PressableBaseProps['borderTopLeftRadius'];
  /**
   * @deprecated Border props on `AvatarButton` have no effect. This will be removed in a future major release.
   * @deprecationExpectedRemoval v10
   */
  borderTopRightRadius?: PressableBaseProps['borderTopRightRadius'];
  /**
   * @deprecated Border props on `AvatarButton` have no effect. This will be removed in a future major release.
   * @deprecationExpectedRemoval v10
   */
  borderRadius?: PressableBaseProps['borderRadius'];
  /**
   * @deprecated Border props on `AvatarButton` have no effect. This will be removed in a future major release.
   * @deprecationExpectedRemoval v10
   */
  borderWidth?: PressableBaseProps['borderWidth'];
  /**
   * @deprecated Border props on `AvatarButton` have no effect. This will be removed in a future major release.
   * @deprecationExpectedRemoval v10
   */
  borderTopWidth?: PressableBaseProps['borderTopWidth'];
  /**
   * @deprecated Border props on `AvatarButton` have no effect. This will be removed in a future major release.
   * @deprecationExpectedRemoval v10
   */
  borderEndWidth?: PressableBaseProps['borderEndWidth'];
  /**
   * @deprecated Border props on `AvatarButton` have no effect. This will be removed in a future major release.
   * @deprecationExpectedRemoval v10
   */
  borderBottomWidth?: PressableBaseProps['borderBottomWidth'];
  /**
   * @deprecated Border props on `AvatarButton` have no effect. This will be removed in a future major release.
   * @deprecationExpectedRemoval v10
   */
  borderStartWidth?: PressableBaseProps['borderStartWidth'];
  /**
   * @deprecated Border props on `AvatarButton` have no effect. This will be removed in a future major release.
   * @deprecationExpectedRemoval v10
   */
  bordered?: PressableBaseProps['bordered'];
  /**
   * @deprecated Border props on `AvatarButton` have no effect. This will be removed in a future major release.
   * @deprecationExpectedRemoval v10
   */
  borderedBottom?: PressableBaseProps['borderedBottom'];
  /**
   * @deprecated Border props on `AvatarButton` have no effect. This will be removed in a future major release.
   * @deprecationExpectedRemoval v10
   */
  borderedEnd?: PressableBaseProps['borderedEnd'];
  /**
   * @deprecated Border props on `AvatarButton` have no effect. This will be removed in a future major release.
   * @deprecationExpectedRemoval v10
   */
  borderedHorizontal?: PressableBaseProps['borderedHorizontal'];
  /**
   * @deprecated Border props on `AvatarButton` have no effect. This will be removed in a future major release.
   * @deprecationExpectedRemoval v10
   */
  borderedStart?: PressableBaseProps['borderedStart'];
  /**
   * @deprecated Border props on `AvatarButton` have no effect. This will be removed in a future major release.
   * @deprecationExpectedRemoval v10
   */
  borderedTop?: PressableBaseProps['borderedTop'];
  /**
   * @deprecated Border props on `AvatarButton` have no effect. This will be removed in a future major release.
   * @deprecationExpectedRemoval v10
   */
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
        borderColor,
        selected,
        name,
        ...props
      } = mergedProps;
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
