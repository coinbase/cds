import React, { forwardRef, memo } from 'react';
import type { View } from 'react-native';

import { Icon } from '../icons';

import type { InputChipProps } from './ChipProps';
import { MediaChip } from './MediaChip';

export const InputChip = memo(
  forwardRef(function InputChip(
    {
      value,
      accessibilityLabel = typeof value === 'string' ? `Remove ${value}` : 'Remove option',
      testID = 'input-chip',
      ...props
    }: InputChipProps,
    ref: React.ForwardedRef<View>,
  ) {
    return (
      <MediaChip
        ref={ref}
        inverted
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
        {...props}
      >
        {value}
      </MediaChip>
    );
  }),
);
