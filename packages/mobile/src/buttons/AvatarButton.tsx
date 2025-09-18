import React, { memo } from 'react';
import { interactableHeight } from '@cbhq/cds-common/tokens/interactableHeight';
import type { SharedProps } from '@cbhq/cds-common/types';

import { Avatar, type AvatarBaseProps } from '../media';
import { Pressable, type PressableBaseProps } from '../system/Pressable';

import type { ButtonBaseProps } from './Button';

export type AvatarButtonProps = PressableBaseProps &
  SharedProps &
  Pick<ButtonBaseProps, 'accessibilityLabel' | 'compact'> &
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
  ...props
}: AvatarButtonProps) {
  const height = compact ? interactableHeight.compact : interactableHeight.regular;

  return (
    <Pressable
      accessibilityHint={accessibilityLabel}
      accessibilityLabel={accessibilityLabel}
      background="transparent"
      feedback={feedback}
      {...props}
    >
      <Avatar
        borderColor={borderColor}
        colorScheme={colorScheme}
        dangerouslySetSize={height}
        name={name}
        shape={shape}
        src={src}
      />
    </Pressable>
  );
});
