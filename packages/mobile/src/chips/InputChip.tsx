import React, { memo } from 'react';
import type { View } from 'react-native';

import { useComponentConfig } from '../hooks/useComponentConfig';
import { Icon } from '../icons/Icon';

import type { InputChipProps } from './ChipProps';
import { MediaChip } from './MediaChip';

export const InputChip = memo(
  ({
    ref,
    ..._props
  }: InputChipProps & {
    ref?: React.Ref<View>;
  }) => {
    const { active: activeProp, invertColorScheme, inverted, ...restProps } = _props;
    // Default before component config so state-aware resolvers (active borders) see the
    // same active semantics as the rendered chip.
    const active =
      activeProp ?? (invertColorScheme === undefined && inverted === undefined ? true : false);
    const mergedProps = useComponentConfig('InputChip', {
      ...restProps,
      active,
      invertColorScheme,
      inverted,
    });
    const {
      value,
      children = value,
      accessibilityLabel = typeof children === 'string' ? `Remove ${children}` : 'Remove option',
      testID = 'input-chip',
      active: _active,
      invertColorScheme: mergedInvertColorScheme,
      inverted: mergedInverted,
      ...props
    } = mergedProps;
    return (
      <MediaChip
        ref={ref}
        accessibilityLabel={accessibilityLabel}
        active={active}
        end={
          <Icon
            active
            color="fg"
            name="close"
            size="xs"
            testID={testID ? `${testID}-close-icon` : 'input-chip-close-icon'}
          />
        }
        invertColorScheme={mergedInvertColorScheme}
        inverted={mergedInverted}
        testID={testID}
        {...props}
      >
        {children}
      </MediaChip>
    );
  },
);
