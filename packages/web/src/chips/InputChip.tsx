import React, { forwardRef, memo } from 'react';

import { Icon } from '../icons/Icon';

import type { InputChipProps } from './ChipProps';
import { MediaChip } from './MediaChip';

export const InputChip = memo(
  forwardRef(function InputChip(
    {
      value,
      children = value,
      accessibilityLabel = typeof children === 'string' ? `Remove ${children}` : 'Remove option',
      invertColorScheme = true,
      testID = 'input-chip',
      ...props
    }: InputChipProps,
    ref: React.ForwardedRef<HTMLButtonElement>,
  ) {
    return (
      <MediaChip
        ref={ref}
        accessibilityLabel={accessibilityLabel}
        end={
          <Icon
            active
            color="fg"
            name="close"
            size="xs"
            testID={testID ? `${testID}-close-icon` : 'input-chip-close-icon'}
          />
        }
        invertColorScheme={invertColorScheme}
        {...props}
      >
        {children}
      </MediaChip>
    );
  }),
);
