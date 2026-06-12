import React, { memo } from 'react';

import { useComponentConfig } from '../hooks/useComponentConfig';
import { Avatar, type AvatarBaseProps } from '../media/Avatar';
import { Pressable, type PressableBaseProps, type PressableProps } from '../system/Pressable';

import type { ButtonBaseProps } from './Button';

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
   * @deprecated Border props on `AvatarButton` have no effect and will be removed in a future major release. This will be removed in a future major release.
   * @deprecationExpectedRemoval v10
   */
  borderTopWidth?: PressableBaseProps['borderTopWidth'];
  /**
   * @deprecated Border props on `AvatarButton` have no effect and will be removed in a future major release. This will be removed in a future major release.
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

export type AvatarButtonBaseProps = PressableBaseProps &
  DeprecatedAvatarButtonBorderProps &
  Pick<ButtonBaseProps, 'compact'> &
  Pick<AvatarBaseProps, 'src' | 'shape' | 'colorScheme' | 'borderColor' | 'name'>;

export type AvatarButtonProps = AvatarButtonBaseProps & PressableProps;

export const AvatarButton = memo((_props: AvatarButtonProps) => {
  const mergedProps = useComponentConfig('AvatarButton', _props);
  const {
    accessibilityLabel,
    feedback = 'light',
    src,
    compact,
    shape,
    colorScheme,
    borderColor,
    name,
    ...props
  } = mergedProps;

  return (
    <Pressable
      accessibilityHint={accessibilityLabel}
      accessibilityLabel={accessibilityLabel}
      background="transparent"
      borderWidth={0} // remove Pressable's default transparent border
      feedback={feedback}
      {...props}
    >
      <Avatar
        borderColor={borderColor}
        colorScheme={colorScheme}
        name={name}
        shape={shape}
        size={compact ? 'xl' : 'xxxl'}
        src={src}
      />
    </Pressable>
  );
});
