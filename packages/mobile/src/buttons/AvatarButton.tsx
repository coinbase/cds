import React, { memo } from 'react';

import { Avatar, type AvatarBaseProps } from '../media';
import { Pressable, type PressableBaseProps } from '../system/Pressable';

import type { ButtonBaseProps } from './Button';

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

export type AvatarButtonProps = Omit<PressableBaseProps, keyof BorderProps> &
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
