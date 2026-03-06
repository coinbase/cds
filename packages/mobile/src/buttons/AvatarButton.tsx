import React, { memo } from 'react';

import { Avatar, type AvatarBaseProps } from '../media';
import { Pressable, type PressableBaseProps } from '../system/Pressable';

import type { ButtonBaseProps } from './Button';

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

export type AvatarButtonProps = PressableBaseProps &
  DeprecatedAvatarButtonBorderProps &
  Pick<ButtonBaseProps, 'compact'> &
  Pick<AvatarBaseProps, 'src' | 'shape' | 'colorScheme' | 'borderColor' | 'name'>;

export const AvatarButton = memo(function AvatarButton({
  accessibilityLabel,
  feedback = 'light',
  src,
  compact,
  shape,
  colorScheme,
  borderColor,
  name,
  ...pressableProps
}: AvatarButtonProps) {
  return (
    <Pressable
      accessibilityHint={accessibilityLabel}
      accessibilityLabel={accessibilityLabel}
      background="transparent"
      borderWidth={0} // remove Pressable's default transparent border
      feedback={feedback}
      {...pressableProps}
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
