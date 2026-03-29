import React, { forwardRef, memo } from 'react';
import type { View } from 'react-native';

import { useComponentConfig } from '../hooks/useComponentConfig';
import { Icon } from '../icons';

import type { InputChipProps } from './ChipProps';
import { MediaChip } from './MediaChip';

export const InputChip = memo(
  forwardRef((_props: InputChipProps, ref: React.ForwardedRef<View>) => {
    const mergedProps = useComponentConfig('InputChip', _props);
    const {
      value,
      children = value,
      accessibilityLabel = typeof children === 'string' ? `Remove ${children}` : 'Remove option',
      invertColorScheme = true,
      testID = 'input-chip',
      ...props
    } = mergedProps;
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
