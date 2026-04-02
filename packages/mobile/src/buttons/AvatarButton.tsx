import React, { memo } from 'react';
import { interactableHeight } from '@coinbase/cds-common/tokens/interactableHeight';
import type { SharedProps } from '@coinbase/cds-common/types';

import { useComponentConfig } from '../hooks/useComponentConfig';
import { Avatar, type AvatarBaseProps } from '../media';
import { Pressable, type PressableBaseProps, type PressableProps } from '../system/Pressable';

import type { ButtonBaseProps } from './Button';

export type AvatarButtonBaseProps = PressableBaseProps &
  SharedProps &
  Pick<ButtonBaseProps, 'accessibilityLabel' | 'compact'> &
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
