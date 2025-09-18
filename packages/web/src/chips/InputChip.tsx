import React, { forwardRef, memo } from 'react';

import { Icon } from '../icons/Icon';

import { Chip } from './Chip';
import type { InputChipProps } from './ChipProps';

export const InputChip = memo(
  forwardRef(function InputChip(
    {
      value,
      accessibilityLabel = typeof value === 'string' ? `Remove ${value}` : 'Remove option',
      testID = 'input-chip',
      ...props
    }: InputChipProps,
    ref: React.ForwardedRef<HTMLButtonElement>,
  ) {
    return (
      <Chip
        ref={ref}
        inverted
        accessibilityLabel={accessibilityLabel}
        end={
          <Icon
            color="fg"
            name="close"
            size="s"
            testID={testID ? `${testID}-close-icon` : 'input-chip-close-icon'}
          />
        }
        {...props}
      >
        {value}
      </Chip>
    );
  }),
);
